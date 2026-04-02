/**
 * 로컬 전체 sync 스크립트
 * 사용법: npm run full-sync
 * 용도: 초기 세팅 또는 대규모 업데이트 시 로컬에서만 실행
 */
import { config } from 'dotenv';
config({ path: '.env.local' });

import { unzipSync } from 'fflate';
import { syncHotelsFromCsvBytes } from '../src/lib/agoda/sync';

async function main() {
  const csvUrl = process.env.AGODA_CSV_DOWNLOAD_URL;
  if (!csvUrl) {
    console.error('❌ AGODA_CSV_DOWNLOAD_URL 환경변수가 설정되지 않았습니다');
    process.exit(1);
  }

  console.log('📥 CSV 다운로드 중...');
  const res = await fetch(csvUrl);
  if (!res.ok) {
    console.error(`❌ 다운로드 실패: ${res.status}`);
    process.exit(1);
  }

  const buffer = await res.arrayBuffer();
  let csvBytes: Uint8Array;

  if (csvUrl.endsWith('.zip')) {
    console.log('📦 ZIP 압축 해제 중...');
    const unzipped = unzipSync(new Uint8Array(buffer));
    const csvFile = Object.keys(unzipped).find(
      (k) => k.endsWith('.csv') || k.endsWith('.txt')
    );
    if (!csvFile) {
      console.error('❌ ZIP 안에 CSV 파일 없음');
      process.exit(1);
    }
    csvBytes = unzipped[csvFile];
  } else {
    csvBytes = new Uint8Array(buffer);
  }

  console.log(`✅ 다운로드 완료 (${(csvBytes.length / 1024 / 1024).toFixed(1)} MB)`);
  console.log('🔄 Supabase 동기화 시작...\n');

  const startTime = Date.now();
  const result = await syncHotelsFromCsvBytes(csvBytes);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n========== 완료 ==========');
  console.log(`✅ upserted : ${result.upserted.toLocaleString()}`);
  console.log(`⏭️  skipped  : ${result.skipped.toLocaleString()}`);
  if (result.errors.length > 0) {
    console.log(`❌ errors   : ${result.errors.length}`);
    result.errors.slice(0, 5).forEach((e) => console.log(`   - ${e}`));
  }
  console.log(`⏱️  소요 시간: ${elapsed}초`);
}

main().catch((err) => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
