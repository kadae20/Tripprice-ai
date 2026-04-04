import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = createServiceClient();
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: sessions, error } = await supabase
    .from('decision_sessions')
    .select(
      'session_id, travel_purpose, city, selected_hotel_id, converted, recommended_hotels, created_at'
    )
    .gte('created_at', since);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  interface SessionRow {
    session_id: string;
    travel_purpose: string | null;
    city: string | null;
    selected_hotel_id: string | null;
    converted: boolean | null;
    recommended_hotels: string[] | null;
    created_at: string;
  }

  const rows: SessionRow[] = sessions ?? [];
  const total = rows.length;
  const conversions = rows.filter((r) => r.converted).length;
  const overallCvr = total > 0 ? ((conversions / total) * 100).toFixed(1) : '0.0';

  // 목적별
  const purposeMap = new Map<string, { sessions: number; conversions: number; cities: Map<string, number> }>();
  for (const r of rows) {
    const p = r.travel_purpose ?? 'unknown';
    if (!purposeMap.has(p)) purposeMap.set(p, { sessions: 0, conversions: 0, cities: new Map() });
    const entry = purposeMap.get(p)!;
    entry.sessions++;
    if (r.converted) entry.conversions++;
    const city = r.city ?? '';
    if (city) entry.cities.set(city, (entry.cities.get(city) ?? 0) + 1);
  }

  const byPurpose = Array.from(purposeMap.entries()).map(([purpose, v]) => {
    const topCityEntry = [...v.cities.entries()].sort((a, b) => b[1] - a[1])[0];
    return {
      purpose,
      sessions: v.sessions,
      conversions: v.conversions,
      cvr: v.sessions > 0 ? ((v.conversions / v.sessions) * 100).toFixed(1) + '%' : '0.0%',
      top_city: topCityEntry ? topCityEntry[0] : '-',
    };
  }).sort((a, b) => b.conversions - a.conversions);

  // 도시별
  const cityMap = new Map<string, { sessions: number; conversions: number }>();
  for (const r of rows) {
    const city = r.city ?? 'unknown';
    if (!cityMap.has(city)) cityMap.set(city, { sessions: 0, conversions: 0 });
    const entry = cityMap.get(city)!;
    entry.sessions++;
    if (r.converted) entry.conversions++;
  }

  const byCity = Array.from(cityMap.entries())
    .map(([city, v]) => ({
      city,
      sessions: v.sessions,
      conversions: v.conversions,
      cvr: v.sessions > 0 ? ((v.conversions / v.sessions) * 100).toFixed(1) + '%' : '0.0%',
    }))
    .sort((a, b) => b.conversions - a.conversions)
    .slice(0, 10);

  // 호텔별 (selected_hotel_id 기준)
  const hotelMap = new Map<string, { conversions: number; sessions: number }>();
  for (const r of rows) {
    if (!r.selected_hotel_id) continue;
    const id = r.selected_hotel_id;
    if (!hotelMap.has(id)) hotelMap.set(id, { conversions: 0, sessions: 0 });
    const entry = hotelMap.get(id)!;
    entry.sessions++;
    if (r.converted) entry.conversions++;
  }

  // 호텔명 조회
  const topHotelIds = Array.from(hotelMap.entries())
    .sort((a, b) => b[1].conversions - a[1].conversions)
    .slice(0, 10)
    .map(([id]) => id);

  let hotelNames: Record<string, string> = {};
  if (topHotelIds.length > 0) {
    const { data: hotelRows } = await supabase
      .from('hotels')
      .select('hotel_id, hotel_name')
      .in('hotel_id', topHotelIds);
    hotelNames = Object.fromEntries(
      (hotelRows ?? []).map((h: { hotel_id: string; hotel_name: string }) => [h.hotel_id, h.hotel_name])
    );
  }

  const topHotels = topHotelIds.map((id) => {
    const v = hotelMap.get(id)!;
    return {
      hotel_id: id,
      hotel_name: hotelNames[id] ?? id,
      conversions: v.conversions,
      cvr: v.sessions > 0 ? ((v.conversions / v.sessions) * 100).toFixed(1) + '%' : '0.0%',
    };
  });

  return NextResponse.json({
    period: '최근 7일',
    total_sessions: total,
    total_conversions: conversions,
    overall_cvr: `${overallCvr}%`,
    by_purpose: byPurpose,
    by_city: byCity,
    top_hotels: topHotels,
  });
}
