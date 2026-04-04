import { config } from 'dotenv';
config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log('이미지 URL 현황 조회 중...\n');

  const [{ count: badCount }, { count: nullCount }, { count: totalCount }] =
    await Promise.all([
      supabase.from('hotels').select('hotel_id', { count: 'exact', head: true })
        .ilike('image_url', '%source.unsplash.com%'),
      supabase.from('hotels').select('hotel_id', { count: 'exact', head: true })
        .is('image_url', null),
      supabase.from('hotels').select('hotel_id', { count: 'exact', head: true }),
    ]);

  console.log('=== 호텔 이미지 URL 현황 ===');
  console.log(`전체 호텔 수      : ${(totalCount ?? 0).toLocaleString()}개`);
  console.log(`deprecated URL    : ${(badCount ?? 0).toLocaleString()}개 (source.unsplash.com — 서비스 종료)`);
  console.log(`image_url null    : ${(nullCount ?? 0).toLocaleString()}개`);
  console.log(`유효 image_url    : ${((totalCount ?? 0) - (badCount ?? 0) - (nullCount ?? 0)).toLocaleString()}개`);
  console.log('');
  console.log('✅ /api/recommend에서 런타임에 picsum.photos 폴백 자동 적용 중');
  console.log('   → DB 대규모 업데이트 없이 즉시 이미지 표시 가능');
  console.log(`\n업데이트 대상 총 호텔 수: ${((badCount ?? 0) + (nullCount ?? 0)).toLocaleString()}개`);
}

main().catch(console.error);
