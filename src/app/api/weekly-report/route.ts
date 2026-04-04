import { NextRequest, NextResponse } from 'next/server';

const PURPOSE_KO: Record<string, string> = {
  honeymoon: '🥂 신혼여행',
  family: '👨‍👩‍👧 가족여행',
  business: '💼 비즈니스',
  solo: '🎒 혼자여행',
};

interface PurposeStat {
  purpose: string;
  sessions: number;
  conversions: number;
  cvr: string;
  top_city: string;
}

interface CityStat {
  city: string;
  sessions: number;
  conversions: number;
  cvr: string;
}

interface HotelStat {
  hotel_id: string;
  hotel_name: string;
  conversions: number;
  cvr: string;
}

interface AnalyticsData {
  period: string;
  total_sessions: number;
  total_conversions: number;
  overall_cvr: string;
  by_purpose: PurposeStat[];
  by_city: CityStat[];
  top_hotels: HotelStat[];
}

async function sendTelegram(message: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('TELEGRAM_BOT_TOKEN 또는 TELEGRAM_CHAT_ID 미설정');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API 오류: ${err}`);
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // analytics 데이터 호출
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tripprice.ai';
  const analyticsRes = await fetch(
    `${baseUrl}/api/analytics?secret=${process.env.CRON_SECRET}`
  );
  if (!analyticsRes.ok) {
    return NextResponse.json({ error: '분석 데이터 조회 실패' }, { status: 500 });
  }

  const data: AnalyticsData = await analyticsRes.json();

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // 목적별 라인
  const purposeLines = data.by_purpose
    .slice(0, 4)
    .map((p) => {
      const label = PURPOSE_KO[p.purpose] ?? p.purpose;
      return `${label}: ${p.cvr} (${p.top_city} 최고)`;
    })
    .join('\n');

  // 도시별 TOP3
  const cityLines = data.by_city
    .slice(0, 3)
    .map((c, i) => `${i + 1}위 ${c.city}: ${c.cvr}`)
    .join('\n');

  // 호텔 TOP3
  const hotelLines = data.top_hotels
    .slice(0, 3)
    .map((h, i) => `${i + 1}. ${h.hotel_name}: 전환 ${h.conversions}건 (${h.cvr})`)
    .join('\n');

  const message =
    `📊 <b>Tripprice AI 주간 리포트</b>\n\n` +
    `📅 기간: ${data.period} (${today} 기준)\n` +
    `👥 총 세션: ${data.total_sessions.toLocaleString()}건\n` +
    `✅ 전환: ${data.total_conversions.toLocaleString()}건 (CVR ${data.overall_cvr})\n\n` +
    `🏆 <b>목적별 전환율:</b>\n${purposeLines || '데이터 없음'}\n\n` +
    `🌏 <b>도시별 TOP3:</b>\n${cityLines || '데이터 없음'}\n\n` +
    `🏨 <b>인기 호텔 TOP3:</b>\n${hotelLines || '데이터 없음'}`;

  try {
    await sendTelegram(message);
    return NextResponse.json({ ok: true, message });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
