import { NextRequest, NextResponse } from 'next/server';
import { unzipSync } from 'fflate';
import { syncHotelsFromCsvBytes } from '@/lib/agoda/sync';

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret');
  if (secret?.trim() !== process.env.CRON_SECRET?.trim()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const csvUrl = process.env.AGODA_CSV_DOWNLOAD_URL;
  if (!csvUrl) {
    return NextResponse.json({ error: 'AGODA_CSV_DOWNLOAD_URL not set' }, { status: 500 });
  }

  try {
    const res = await fetch(csvUrl);
    if (!res.ok) throw new Error(`다운로드 실패: ${res.status}`);

    const buffer = await res.arrayBuffer();
    let csvBytes: Uint8Array;

    if (csvUrl.endsWith('.zip')) {
      const unzipped = unzipSync(new Uint8Array(buffer));
      const csvFile = Object.keys(unzipped).find(
        (k) => k.endsWith('.csv') || k.endsWith('.txt')
      );
      if (!csvFile) throw new Error('ZIP 안에 CSV 파일 없음');
      csvBytes = unzipped[csvFile];
    } else {
      csvBytes = new Uint8Array(buffer);
    }

    // 전체 텍스트 변환 없이 Uint8Array 직접 스트리밍 처리
    const result = await syncHotelsFromCsvBytes(csvBytes);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
