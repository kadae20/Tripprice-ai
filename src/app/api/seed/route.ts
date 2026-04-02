import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

const CID = process.env.AGODA_PARTNER_CODE ?? '1926938';
const agodaUrl = (slug: string) =>
  `https://www.agoda.com/${slug}/hotel/`;

// 실제 아고다 슬러그 기반 링크 — partnersearch보다 정확한 호텔 페이지로 연결
const SAMPLE_HOTELS = [
  {
    hotel_id: 'seed_grand_hyatt_seoul',
    hotel_name: '그랜드 하얏트 서울',
    city: '서울',
    country: 'Korea',
    star_rating: 5,
    agoda_rating: 8.7,
    price_min: 250000,
    price_max: 600000,
    image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    amenities: { pool: true, gym: true, spa: true, breakfast: true, parking: true },
    agoda_link: `https://www.agoda.com/grand-hyatt-seoul/hotel/seoul-kr.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_lotte_hotel_seoul',
    hotel_name: '롯데호텔 서울',
    city: '서울',
    country: 'Korea',
    star_rating: 5,
    agoda_rating: 8.5,
    price_min: 200000,
    price_max: 500000,
    image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    amenities: { pool: true, gym: true, spa: true, breakfast: true, restaurant: true },
    agoda_link: `https://www.agoda.com/lotte-hotel-seoul/hotel/seoul-kr.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_josun_palace_seoul',
    hotel_name: '조선 팰리스 서울 강남',
    city: '서울',
    country: 'Korea',
    star_rating: 5,
    agoda_rating: 9.1,
    price_min: 350000,
    price_max: 800000,
    image_url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',
    amenities: { pool: true, gym: true, spa: true, breakfast: true, bar: true },
    agoda_link: `https://www.agoda.com/josun-palace-a-luxury-collection-hotel-seoul-gangnam/hotel/seoul-kr.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_intercontinental_coex',
    hotel_name: '호텔 인터컨티넨탈 서울 코엑스',
    city: '서울',
    country: 'Korea',
    star_rating: 5,
    agoda_rating: 8.3,
    price_min: 180000,
    price_max: 450000,
    image_url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    amenities: { pool: true, gym: true, breakfast: true, parking: true },
    agoda_link: `https://www.agoda.com/intercontinental-seoul-coex/hotel/seoul-kr.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_westin_josun_seoul',
    hotel_name: '웨스틴 조선 서울',
    city: '서울',
    country: 'Korea',
    star_rating: 5,
    agoda_rating: 8.6,
    price_min: 220000,
    price_max: 520000,
    image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80',
    amenities: { gym: true, spa: true, breakfast: true, wifi: true },
    agoda_link: `https://www.agoda.com/the-westin-chosun-seoul/hotel/seoul-kr.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_mandarin_oriental_bkk',
    hotel_name: '만다린 오리엔탈 방콕',
    city: '방콕',
    country: 'Thailand',
    star_rating: 5,
    agoda_rating: 9.4,
    price_min: 400000,
    price_max: 1200000,
    image_url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=800&q=80',
    amenities: { pool: true, spa: true, breakfast: true, river_view: true },
    agoda_link: `https://www.agoda.com/mandarin-oriental-bangkok/hotel/bangkok-th.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_ambassador_bkk',
    hotel_name: '앰배서더 호텔 방콕',
    city: '방콕',
    country: 'Thailand',
    star_rating: 4,
    agoda_rating: 7.6,
    price_min: 60000,
    price_max: 150000,
    image_url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    amenities: { pool: true, gym: true, breakfast: true },
    agoda_link: `https://www.agoda.com/ambassador-hotel-bangkok/hotel/bangkok-th.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_park_hyatt_tokyo',
    hotel_name: '파크 하얏트 도쿄',
    city: '도쿄',
    country: 'Japan',
    star_rating: 5,
    agoda_rating: 9.2,
    price_min: 500000,
    price_max: 1500000,
    image_url: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    amenities: { pool: true, gym: true, spa: true, breakfast: true, city_view: true },
    agoda_link: `https://www.agoda.com/park-hyatt-tokyo/hotel/tokyo-jp.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_shinjuku_washington',
    hotel_name: '신주쿠 워싱턴 호텔 도쿄',
    city: '도쿄',
    country: 'Japan',
    star_rating: 3,
    agoda_rating: 7.9,
    price_min: 80000,
    price_max: 200000,
    image_url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    amenities: { wifi: true, restaurant: true },
    agoda_link: `https://www.agoda.com/shinjuku-washington-hotel-main-building/hotel/tokyo-jp.html?cid=${CID}`,
  },
  {
    hotel_id: 'seed_shilla_jeju',
    hotel_name: '신라호텔 제주',
    city: '제주',
    country: 'Korea',
    star_rating: 5,
    agoda_rating: 9.0,
    price_min: 300000,
    price_max: 700000,
    image_url: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
    amenities: { pool: true, spa: true, breakfast: true, beach: true, golf: true },
    agoda_link: `https://www.agoda.com/the-shilla-jeju/hotel/jeju-kr.html?cid=${CID}`,
  },
];

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret');
  if (secret !== process.env.CRON_SECRET?.trim()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();

  // 기존 가짜 데이터 삭제 (숫자 hotel_id 또는 이전 seed_ 아닌 ID)
  await supabase
    .from('hotels')
    .delete()
    .not('hotel_id', 'like', 'seed_%');

  const { error } = await supabase
    .from('hotels')
    .upsert(SAMPLE_HOTELS, { onConflict: 'hotel_id' });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, inserted: SAMPLE_HOTELS.length });
}
