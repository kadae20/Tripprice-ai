import { NextRequest, NextResponse } from 'next/server';
import { streamText, generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const AGODA_PARTNER_CODE = process.env.AGODA_PARTNER_CODE ?? '1926938';

const InputSchema = z.object({
  travelPurpose: z.enum(['honeymoon', 'family', 'business', 'solo']),
  budgetMin: z.number().int().min(0),
  budgetMax: z.number().int().min(0),
  city: z.string().min(1),
  priority: z.enum(['location', 'facility', 'breakfast', 'view']),
  checkinDate: z.string(),
  checkoutDate: z.string(),
  sessionId: z.string().min(1),
});

interface HotelRow {
  hotel_id: string;
  hotel_name: string;
  star_rating: number | null;
  agoda_rating: number | null;
  price_min: number | null;
  price_max: number | null;
  image_url: string | null;
  amenities: Record<string, unknown> | null;
  agoda_link: string;
}

interface ConversionStat {
  hotel_id: string;
  conversion_rate: number | null;
}

const PURPOSE_KO: Record<string, string> = {
  honeymoon: '신혼여행',
  family: '가족여행',
  business: '비즈니스',
  solo: '혼자여행',
};
const PRIORITY_KO: Record<string, string> = {
  location: '위치',
  facility: '시설',
  breakfast: '조식',
  view: '뷰',
};

/**
 * Claude Haiku로 도시/국가명을 영문으로 변환.
 * 국가명 입력("태국")이면 isCountry=true, countryEn="Thailand"
 * 도시명 입력("방콕")이면 isCountry=false, cityEn="Bangkok"
 */
async function translateDestination(city: string): Promise<{
  cityEn: string;
  countryEn: string;
  isCountry: boolean;
}> {
  try {
    const { text } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      messages: [
        {
          role: 'user',
          content:
            `여행지 이름을 영문으로 변환해줘. JSON만 답해. ` +
            `도시명이면: {"cityEn":"Bangkok","countryEn":"Thailand","isCountry":false} ` +
            `국가/지역명이면: {"cityEn":"","countryEn":"Thailand","isCountry":true} ` +
            `입력: "${city}"`,
        },
      ],
      maxOutputTokens: 80,
    });
    const match = text.match(/\{[^{}]+\}/);
    if (match) {
      const p = JSON.parse(match[0]);
      return {
        cityEn: (p.cityEn as string) || city,
        countryEn: (p.countryEn as string) || '',
        isCountry: !!(p.isCountry),
      };
    }
  } catch { /* 변환 실패 시 원본 사용 */ }
  return { cityEn: city, countryEn: '', isCountry: false };
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = InputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = createServiceClient();
  const purposeKo = PURPOSE_KO[input.travelPurpose];
  const priorityKo = PRIORITY_KO[input.priority];

  // ─── 1. 도시/국가명 영문 변환 ─────────────────────────────
  const { cityEn, countryEn, isCountry } = await translateDestination(input.city);
  const searchTerm = isCountry ? countryEn : cityEn;

  // ─── 2. Supabase 검색 ─────────────────────────────────────
  const baseQuery = supabase
    .from('hotels')
    .select(
      'hotel_id, hotel_name, star_rating, agoda_rating, price_min, price_max, image_url, amenities, agoda_link'
    )
    .or(`price_min.is.null,price_min.lte.${input.budgetMax}`)
    .or(`price_max.is.null,price_max.gte.${input.budgetMin}`)
    .order('agoda_rating', { ascending: false })
    .limit(20);

  const { data: hotelsRaw, error: dbError } = isCountry
    ? await baseQuery.ilike('country', `%${searchTerm}%`)
    : await baseQuery.ilike('city', `%${searchTerm}%`);

  const hotels = hotelsRaw as HotelRow[] | null;

  if (dbError) {
    return NextResponse.json({ error: '호텔 조회 실패' }, { status: 500 });
  }

  // ─── 3. 전환율 정렬 ───────────────────────────────────────
  const { data: stats } = await supabase
    .from('hotel_conversion_stats')
    .select('hotel_id, conversion_rate')
    .eq('travel_purpose', input.travelPurpose);

  const statsMap = new Map(
    (stats as ConversionStat[] ?? []).map((s) => [s.hotel_id, s.conversion_rate ?? 0])
  );
  const candidates = (hotels ?? [])
    .sort(
      (a: HotelRow, b: HotelRow) =>
        (statsMap.get(b.hotel_id) ?? 0) - (statsMap.get(a.hotel_id) ?? 0)
    )
    .slice(0, 10);

  // ─── 4a. DB 결과 있음 → 정상 추천 ─────────────────────────
  if (candidates.length > 0) {
    try {
      await supabase.from('decision_sessions').insert({
        session_id: input.sessionId,
        travel_purpose: input.travelPurpose,
        budget_min: input.budgetMin,
        budget_max: input.budgetMax,
        city: input.city,
        priority: input.priority,
        checkin_date: input.checkinDate,
        checkout_date: input.checkoutDate,
        recommended_hotels: candidates.slice(0, 3).map((h) => h.hotel_id),
      });
    } catch { /* 테이블 없어도 계속 */ }

    const hotelData = JSON.stringify(
      candidates.slice(0, 10).map((h) => ({
        id: h.hotel_id,
        name: h.hotel_name,
        stars: h.star_rating,
        rating: h.agoda_rating,
        priceMin: h.price_min,
        priceMax: h.price_max,
        amenities: h.amenities,
      }))
    );

    const result = streamText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: '한국 여행 전문가. 여행자 조건에 맞는 호텔 3개를 추천하고 이유를 설명해.',
      messages: [
        {
          role: 'user',
          content:
            `여행 목적: ${purposeKo}, 도시: ${input.city}, ` +
            `예산: ${input.budgetMin.toLocaleString()}~${input.budgetMax.toLocaleString()}원, ` +
            `중요 요소: ${priorityKo}\n\n후보 호텔:\n${hotelData}\n\n` +
            `위 조건으로 호텔 3개를 추천해줘. 각 호텔마다: 추천 이유(2~3줄), ` +
            `이 여행자에게 맞는 이유, 주의사항 1가지. JSON 형식:\n` +
            `{"recommendations":[{"hotel_id":"...","reason":"...","fit":"...","caution":"..."}]}`,
        },
      ],
      maxOutputTokens: 1000,
    });

    const hotelsJson = JSON.stringify(
      candidates.slice(0, 3).map((h) => ({
        hotel_id: h.hotel_id,
        hotel_name: h.hotel_name,
        star_rating: h.star_rating,
        agoda_rating: h.agoda_rating,
        price_min: h.price_min,
        price_max: h.price_max,
        // DB image_url 없으면 hotel_id를 seed로 사용 → 호텔마다 고유하고 일관된 이미지
        image_url: h.image_url ?? `https://picsum.photos/seed/${h.hotel_id}/800/450`,
        agoda_link: h.agoda_link,
      }))
    );

    const response = result.toTextStreamResponse();
    const headers = new Headers(response.headers);
    headers.set('x-hotels-data', Buffer.from(hotelsJson).toString('base64'));
    return new Response(response.body, { status: response.status, headers });
  }

  // ─── 4b. DB 결과 없음 → Claude 지식 기반 추천 ─────────────
  const agodaSearchUrl =
    `https://www.agoda.com/ko-kr/search?city=${encodeURIComponent(cityEn || countryEn || input.city)}` +
    `&cid=${AGODA_PARTNER_CODE}&hl=ko&currency=KRW`;

  try {
    const { text: aiText } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system:
        `한국 여행 전문가. 주어진 여행지의 실제 존재하는 유명 호텔 3개를 추천해줘.\n` +
        `JSON만 답해 (설명 없이):\n` +
        `{"recommendations":[` +
        `{"hotel_id":"ai_1","hotel_name":"실제호텔명","star_rating":4,"agoda_rating":8.5,` +
        `"reason":"한국어 추천이유 2~3줄","fit":"한국어 이여행자에게맞는이유","caution":"한국어 주의사항"}` +
        `],"ai_mode":true}`,
      messages: [
        {
          role: 'user',
          content:
            `여행지: ${cityEn || countryEn || input.city}, ` +
            `목적: ${purposeKo}, 예산: ${input.budgetMax.toLocaleString()}원, ` +
            `우선순위: ${priorityKo}`,
        },
      ],
      maxOutputTokens: 1000,
    });

    // JSON 파싱 후 Hotel 객체 구성
    const jsonMatch = aiText.match(/\{[\s\S]*"recommendations"[\s\S]*\}/);
    if (!jsonMatch) throw new Error('AI JSON 파싱 실패');

    const aiData = JSON.parse(jsonMatch[0]) as {
      recommendations: Array<{
        hotel_id: string;
        hotel_name: string;
        star_rating?: number;
        agoda_rating?: number;
      }>;
    };

    const aiHotels = aiData.recommendations.map((r) => ({
      hotel_id: r.hotel_id,
      hotel_name: r.hotel_name,
      star_rating: r.star_rating ?? null,
      agoda_rating: r.agoda_rating ?? null,
      price_min: null,
      price_max: null,
      image_url: null,
      agoda_link: agodaSearchUrl,
    }));

    const hotelsBase64 = Buffer.from(JSON.stringify(aiHotels)).toString('base64');
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(aiText));
        controller.close();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-hotels-data': hotelsBase64,
      },
    });
  } catch {
    // 최후 폴백: 아고다 검색 링크만 제공
    const fallbackMsg =
      `"${input.city}" 지역의 호텔 데이터가 없습니다.\n\n` +
      `아고다에서 직접 검색하시면 ${input.city} 호텔을 찾을 수 있어요:\n${agodaSearchUrl}\n\n` +
      `{"recommendations":[],"fallback":true,"agodaUrl":"${agodaSearchUrl}"}`;

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(fallbackMsg));
        controller.close();
      },
    });
    return new Response(stream, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-hotels-data': Buffer.from('[]').toString('base64'),
      },
    });
  }
}
