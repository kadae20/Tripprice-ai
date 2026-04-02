import { NextRequest, NextResponse } from 'next/server';
import { unzipSync } from 'fflate';
import { syncHotelsFromCsvBytes } from '@/lib/agoda/sync';

export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-cron-secret');
  if (secret?.trim() !== process.env.CRON_SECRET?.trim()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    let csvBytes: Uint8Array;
    let mode: 'delta_feed' | 'full_filtered';

    const deltaUrl = process.env.AGODA_DELTA_URL;
    const fullUrl = process.env.AGODA_CSV_DOWNLOAD_URL;

    if (deltaUrl) {
      // Feed 32: 아고다에서 최근 변경 호텔만 제공하는 전용 URL
      mode = 'delta_feed';
      const res = await fetch(deltaUrl);
      if (!res.ok) throw new Error(`Delta 다운로드 실패: ${res.status}`);
      const buffer = await res.arrayBuffer();
      csvBytes = deltaUrl.endsWith('.zip')
        ? extractZipCsv(new Uint8Array(buffer))
        : new Uint8Array(buffer);

      const result = await syncHotelsFromCsvBytes(csvBytes);
      return NextResponse.json({ ok: true, mode, ...result });

    } else if (fullUrl) {
      // 폴백: 전체 CSV에서 7일 이내 updated_at 행만 필터링
      mode = 'full_filtered';
      const updatedAfter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

      const res = await fetch(fullUrl);
      if (!res.ok) throw new Error(`CSV 다운로드 실패: ${res.status}`);
      const buffer = await res.arrayBuffer();
      csvBytes = fullUrl.endsWith('.zip')
        ? extractZipCsv(new Uint8Array(buffer))
        : new Uint8Array(buffer);

      const result = await syncHotelsFromCsvBytes(csvBytes, { updatedAfter });
      return NextResponse.json({ ok: true, mode, updatedAfter: updatedAfter.toISOString(), ...result });

    } else {
      return NextResponse.json(
        { error: 'AGODA_DELTA_URL 또는 AGODA_CSV_DOWNLOAD_URL 환경변수가 필요합니다' },
        { status: 500 }
      );
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function extractZipCsv(bytes: Uint8Array): Uint8Array {
  const unzipped = unzipSync(bytes);
  const csvFile = Object.keys(unzipped).find(
    (k) => k.endsWith('.csv') || k.endsWith('.txt')
  );
  if (!csvFile) throw new Error('ZIP 안에 CSV 파일 없음');
  return unzipped[csvFile];
}
