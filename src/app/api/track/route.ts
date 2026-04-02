import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createServiceClient } from '@/lib/supabase/server';

const TrackSchema = z.object({
  sessionId: z.string().min(1),
  selectedHotelId: z.string().min(1),
  eventType: z.enum(['hotel_click', 'agoda_link_click']),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = TrackSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { sessionId, selectedHotelId, eventType } = parsed.data;
  const supabase = createServiceClient();

  const update: Record<string, unknown> = { selected_hotel_id: selectedHotelId };
  if (eventType === 'agoda_link_click') update.converted = true;

  const { error } = await supabase
    .from('decision_sessions')
    .update(update)
    .eq('session_id', sessionId)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
