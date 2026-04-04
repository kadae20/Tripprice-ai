import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';

const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const AGODA_PARTNER_CODE = process.env.AGODA_PARTNER_CODE ?? '1926938';

// 도시별 정적 이미지 (Unsplash API 키 없거나 DB 이미지 없을 때 폴백)
const CITY_IMAGES: Record<string, string> = {
  Bangkok:     'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800',
  Tokyo:       'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
  Seoul:       'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800',
  Bali:        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  Singapore:   'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800',
  Paris:       'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
  'New York':  'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=800',
  'Hong Kong': 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?w=800',
  Osaka:       'https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800',
  Phuket:      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800',
  'Da Nang':   'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800',
  Cancun:      'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=800',
  Dubai:       'https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800',
  Barcelona:   'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800',
  London:      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
  default:     'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
};

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

type AiRec = {
  hotel_id: string;
  hotel_name?: string;
  star_rating?: number;
  agoda_rating?: number;
  rank?: number;
  match_score?: number;
  fit?: string[];
  caution?: string;
  one_line?: string;
  urgency?: string;
};

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

// ─── Unsplash 이미지 배치 조회 ─────────────────────────────
async function fetchUnsplashImages(
  query: string,
  hotelIds: string[]
): Promise<Record<string, string>> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  console.log('UNSPLASH_ACCESS_KEY exists:', !!accessKey);
  if (!accessKey || !hotelIds.length) return {};

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' hotel')}&per_page=10&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    );
    if (!res.ok) return {};
    const data = (await res.json()) as { results: Array<{ urls: { regular: string } }> };
    const results = data.results;
    if (!results.length) return {};

    return Object.fromEntries(
      hotelIds.map((id) => {
        const idNum = parseInt(id.replace(/\D/g, '') || '0', 10);
        const idx = idNum % results.length;
        return [id, results[idx].urls.regular];
      })
    );
  } catch {
    return {};
  }
}

// ─── 도시/국가명 영문 변환 ────────────────────────────────
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

// ─── AI 추천 JSON 파싱 헬퍼 ──────────────────────────────
function parseAiRecs(text: string): AiRec[] {
  try {
    const jsonMatch = text.match(/\{[\s\S]*"(?:hotels|recommendations)"[\s\S]*\}/);
    if (!jsonMatch) return [];
    const aiData = JSON.parse(jsonMatch[0]) as { hotels?: AiRec[]; recommendations?: AiRec[] };
    return aiData.hotels ?? aiData.recommendations ?? [];
  } catch {
    return [];
  }
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

    const PURPOSE_CRITERIA: Record<string, string> = {
      honeymoon: '프라이버시·뷰·로맨틱 시설·조식 포함 여부',
      family: '공간 크기·키즈시설·안전·수영장',
      business: '도심 위치·와이파이 품질·조식·체크인 편의',
      solo: '가성비·교통 접근성·안전·커뮤니티',
    };

    // generateText로 검증 가능한 응답 얻기
    const { text: aiText } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: '한국 여행 전문가. 데이터 기반 호텔 의사결정. 감언이설 금지. JSON만 출력.',
      messages: [
        {
          role: 'user',
          content:
            `여행자 프로파일:\n` +
            `목적: ${purposeKo}, 예산: ${input.budgetMin.toLocaleString()}~${input.budgetMax.toLocaleString()}원/박\n` +
            `도시: ${input.city}, 우선순위: ${priorityKo}, 기간: ${input.checkinDate}~${input.checkoutDate}\n\n` +
            `판단 기준 (${purposeKo}): ${PURPOSE_CRITERIA[input.travelPurpose]}\n\n` +
            `후보 호텔:\n${hotelData}\n\n` +
            `중요: hotels 배열의 모든 항목에 반드시 fit 3개, caution 1개, one_line을 포함해야 함. 누락 시 재출력 요청됨.\n` +
            `최적 호텔 3개 선정. 반드시 아래 JSON만 출력:\n` +
            `{"hotels":[{"hotel_id":"...","rank":1,"match_score":95,` +
            `"fit":["이유1","이유2","이유3"],"caution":"주의사항1가지",` +
            `"one_line":"한줄요약","urgency":"예약 긴급도 문구"}]}`,
        },
      ],
      maxOutputTokens: 1200,
    });

    // 파싱 및 검증
    console.log('Claude raw response:', aiText.slice(0, 500));
    let recsList = parseAiRecs(aiText);
    console.log('Parsed hotels:', JSON.stringify(recsList.map(r => ({ hotel_id: r.hotel_id, fit: r.fit, caution: r.caution, one_line: r.one_line }))));

    // 누락 필드 확인 + 1회 재요청
    const incompleteIds = recsList
      .filter((r) => !r.fit?.length || !r.caution || !r.one_line)
      .map((r) => r.hotel_id);

    if (incompleteIds.length > 0) {
      console.error('호텔 데이터 누락:', incompleteIds);
      try {
        const fixCandidates = candidates.filter((h) => incompleteIds.includes(h.hotel_id));
        const { text: fixText } = await generateText({
          model: anthropic('claude-haiku-4-5-20251001'),
          system: '한국 여행 전문가. JSON만 출력.',
          messages: [
            {
              role: 'user',
              content:
                `다음 호텔들의 fit(3개), caution(1개), one_line을 반드시 채워서 JSON으로 출력:\n` +
                `${JSON.stringify(fixCandidates.map((h) => ({ id: h.hotel_id, name: h.hotel_name, rating: h.agoda_rating })))}\n` +
                `목적: ${purposeKo}, 도시: ${input.city}\n` +
                `{"hotels":[{"hotel_id":"...","fit":["...","...","..."],"caution":"...","one_line":"..."}]}`,
            },
          ],
          maxOutputTokens: 600,
        });
        const fixRecs = parseAiRecs(fixText);
        const fixMap = Object.fromEntries(fixRecs.map((r) => [r.hotel_id, r]));
        recsList = recsList.map((r) => ({ ...r, ...(fixMap[r.hotel_id] ?? {}) }));
      } catch (e) {
        console.error('재요청 실패:', e);
      }
    }

    // 최종 폴백 적용
    const defaultFit = (city: string, purpose: string) => [
      `${city} 중심부 접근 용이`,
      `${purpose} 여행자 선호 호텔`,
      '아고다 검증 숙소',
    ];
    recsList = recsList.map((r) => ({
      ...r,
      fit: r.fit?.length ? r.fit.slice(0, 3) : defaultFit(input.city, purposeKo),
      one_line:
        r.one_line ??
        candidates.find((h) => h.hotel_id === r.hotel_id)?.hotel_name ??
        '',
    }));

    // Unsplash 이미지 (null 또는 구버전 URL 대체)
    const top3 = candidates.slice(0, 3);
    const needsImage = top3
      .filter((h) => !h.image_url || h.image_url.includes('source.unsplash.com'))
      .map((h) => h.hotel_id);
    const unsplashImages =
      needsImage.length > 0
        ? await fetchUnsplashImages(cityEn || input.city, needsImage)
        : {};

    const recsMap = Object.fromEntries(recsList.map((r) => [r.hotel_id, r]));

    const hotelsJson = JSON.stringify(
      top3.map((h) => {
        // AiRec 필드만 추출 (hotel_id 제외 — 중복 방지)
        const { hotel_id: _id, ...aiExtra } = recsMap[h.hotel_id] ?? { hotel_id: h.hotel_id };
        void _id;
        return {
          hotel_id: h.hotel_id,
          hotel_name: h.hotel_name,
          star_rating: h.star_rating,
          agoda_rating: h.agoda_rating,
          price_min: h.price_min,
          price_max: h.price_max,
          image_url:
            h.image_url && !h.image_url.includes('source.unsplash.com')
              ? h.image_url
              : unsplashImages[h.hotel_id] ??
                CITY_IMAGES[cityEn] ??
                CITY_IMAGES['default'],
          agoda_link: h.agoda_link,
          ...aiExtra,
        };
      })
    );

    // 스트림으로 AI JSON 전송 (클라이언트 호환 유지)
    const finalJson = JSON.stringify({ hotels: recsList });
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(finalJson));
        controller.close();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
        'x-hotels-data': Buffer.from(hotelsJson).toString('base64'),
      },
    });
  }

  // ─── 4b. DB 결과 없음 → Claude 지식 기반 추천 ─────────────
  const agodaSearchUrl =
    `https://www.agoda.com/ko-kr/search?city=${encodeURIComponent(cityEn || countryEn || input.city)}` +
    `&cid=${AGODA_PARTNER_CODE}&hl=ko&currency=KRW`;

  try {
    const { text: aiText } = await generateText({
      model: anthropic('claude-haiku-4-5-20251001'),
      system: '한국 여행 전문가. 데이터 기반 호텔 의사결정. 감언이설 금지. JSON만 출력.',
      messages: [
        {
          role: 'user',
          content:
            `여행지: ${cityEn || countryEn || input.city}, 목적: ${purposeKo}, ` +
            `예산: ${input.budgetMax.toLocaleString()}원/박, 우선순위: ${priorityKo}\n\n` +
            `실제 존재하는 유명 호텔 3개 추천. 반드시 모든 항목에 fit 3개, caution 1개, one_line 포함. JSON만 출력:\n` +
            `{"hotels":[{"hotel_id":"ai_1","hotel_name":"실제호텔명","star_rating":4,"agoda_rating":8.5,` +
            `"fit":["이유1","이유2","이유3"],"caution":"주의사항","one_line":"한줄요약","urgency":"긴급도"}` +
            `],"ai_mode":true}`,
        },
      ],
      maxOutputTokens: 1200,
    });

    const recs = parseAiRecs(aiText);
    if (!recs.length) throw new Error('AI JSON 파싱 실패');

    // 폴백 적용
    const validatedRecs = recs.map((r) => ({
      ...r,
      fit: r.fit?.length
        ? r.fit.slice(0, 3)
        : [`${input.city} 인기 호텔`, `${purposeKo} 적합`, '아고다 예약 가능'],
      one_line: r.one_line ?? r.hotel_name ?? '추천 호텔',
    }));

    // Unsplash 이미지 (AI 추천 호텔)
    const hotelIds = validatedRecs.map((r) => r.hotel_id);
    const unsplashImages = await fetchUnsplashImages(cityEn || input.city, hotelIds);

    const aiHotels = validatedRecs.map((r) => ({
      hotel_id: r.hotel_id,
      hotel_name: r.hotel_name ?? '',
      star_rating: r.star_rating ?? null,
      agoda_rating: r.agoda_rating ?? null,
      price_min: null,
      price_max: null,
      image_url:
        unsplashImages[r.hotel_id] ??
        CITY_IMAGES[cityEn] ??
        CITY_IMAGES['default'],
      agoda_link: agodaSearchUrl,
      fit: r.fit,
      caution: r.caution,
      one_line: r.one_line,
      urgency: r.urgency,
      match_score: r.match_score,
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
