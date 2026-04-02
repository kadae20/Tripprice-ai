import { NextRequest, NextResponse } from 'next/server';
import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

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

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = InputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const input = parsed.data;
  const supabase = createServiceClient();

  // 1. 후보 호텔 조회 (도시 + 예산 필터)
  const { data: hotelsRaw, error: dbError } = await supabase
    .from('hotels')
    .select('hotel_id, hotel_name, star_rating, agoda_rating, price_min, price_max, image_url, amenities, agoda_link')
    .ilike('city', `%${input.city}%`)
    .or(`price_min.is.null,price_min.lte.${input.budgetMax}`)
    .or(`price_max.is.null,price_max.gte.${input.budgetMin}`)
    .order('agoda_rating', { ascending: false })
    .limit(20);
  const hotels = hotelsRaw as HotelRow[] | null;

  if (dbError) {
    return NextResponse.json({ error: '호텔 조회 실패' }, { status: 500 });
  }

  // 2. 전환율 높은 호텔 우선 정렬
  const { data: stats } = await supabase
    .from('hotel_conversion_stats')
    .select('hotel_id, conversion_rate')
    .eq('travel_purpose', input.travelPurpose);

  const statsMap = new Map((stats as ConversionStat[] ?? []).map((s) => [s.hotel_id, s.conversion_rate ?? 0]));
  const candidates = (hotels ?? []).sort(
    (a: HotelRow, b: HotelRow) => (statsMap.get(b.hotel_id) ?? 0) - (statsMap.get(a.hotel_id) ?? 0)
  ).slice(0, 10);

  if (candidates.length === 0) {
    return NextResponse.json({ error: '조건에 맞는 호텔이 없습니다' }, { status: 404 });
  }

  // 3. decision_sessions 저장 (추천 전) — 실패해도 계속 진행
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
  } catch { /* 테이블 없어도 계속 진행 */ }

  // 4. Claude 스트리밍 호출
  const hotelData = JSON.stringify(candidates.slice(0, 10).map((h) => ({
    id: h.hotel_id,
    name: h.hotel_name,
    stars: h.star_rating,
    rating: h.agoda_rating,
    priceMin: h.price_min,
    priceMax: h.price_max,
    amenities: h.amenities,
  })));

  const purposeKo = PURPOSE_KO[input.travelPurpose];
  const priorityKo = PRIORITY_KO[input.priority];

  let result;
  try {
    result = streamText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: '한국 여행 전문가. 여행자 조건에 맞는 호텔 3개를 추천하고 이유를 설명해.',
      messages: [
        {
          role: 'user',
          content: `여행 목적: ${purposeKo}, 도시: ${input.city}, 예산: ${input.budgetMin.toLocaleString()}~${input.budgetMax.toLocaleString()}원, 중요 요소: ${priorityKo}\n\n후보 호텔:\n${hotelData}\n\n위 조건으로 호텔 3개를 추천해줘. 각 호텔마다: 추천 이유(2~3줄), 이 여행자에게 맞는 이유, 주의사항 1가지. JSON 형식:\n{"recommendations":[{"hotel_id":"...","reason":"...","fit":"...","caution":"..."}]}`,
        },
      ],
      maxOutputTokens: 1000,
    });
  } catch (e) {
    console.error('[recommend] streamText error:', e);
    return NextResponse.json({ error: 'AI 추천 실패' }, { status: 500 });
  }

  // 스트리밍 응답 + 호텔 데이터 헤더로 전달
  const hotelsJson = JSON.stringify(
    candidates.slice(0, 3).map((h) => ({
      hotel_id: h.hotel_id,
      hotel_name: h.hotel_name,
      star_rating: h.star_rating,
      agoda_rating: h.agoda_rating,
      price_min: h.price_min,
      price_max: h.price_max,
      image_url: h.image_url,
      agoda_link: h.agoda_link,
    }))
  );

  const response = result.toTextStreamResponse();
  const headers = new Headers(response.headers);
  headers.set('x-hotels-data', Buffer.from(hotelsJson).toString('base64'));

  return new Response(response.body, { status: response.status, headers });
}
