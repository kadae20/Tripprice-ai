# DB 스키마 / Migration 규칙

## 현재 스키마 (2026-04-04 기준)

### `hotels` 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | SERIAL PK | 내부 ID |
| hotel_id | VARCHAR(50) UNIQUE | Agoda 호텔 ID |
| hotel_name | VARCHAR(200) | 호텔명 |
| city / country | VARCHAR(100) | 위치 |
| star_rating | INTEGER | 성급 (1~5) |
| agoda_rating | DECIMAL(3,1) | 아고다 평점 |
| price_min / price_max | INTEGER | 가격 범위 (원) |
| image_url | TEXT | 호텔 이미지 URL |
| amenities | JSONB | 편의시설 목록 |
| agoda_link | TEXT | 어필리에이트 링크 |

### `decision_sessions` 테이블 (독점 데이터 핵심)
| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | UUID PK | 세션 고유 ID |
| session_id | VARCHAR(100) | 프론트엔드 세션 키 |
| travel_purpose | VARCHAR(50) | honeymoon / family / business / solo |
| budget_min / budget_max | INTEGER | 예산 범위 |
| city | VARCHAR(100) | 목적지 도시 |
| priority | VARCHAR(50) | 우선순위 (location / amenity / price) |
| checkin_date / checkout_date | DATE | 여행 일정 |
| recommended_hotels | JSONB | AI 추천 결과 전체 |
| selected_hotel_id | VARCHAR(50) | 사용자가 클릭한 호텔 |
| converted | BOOLEAN | 아고다 링크 클릭 여부 |

### `hotel_conversion_stats` 뷰
`decision_sessions` 집계: hotel_id × travel_purpose별 추천/전환 횟수 및 전환율.

## Migration 규칙

### 파일 위치 및 명명
```
migrations/
  001_init.sql          ← 초기 스키마
  002_add_users.sql     ← 추가 변경
  003_add_reviews.sql   ← 추가 변경
```

- **기존 파일 절대 수정 금지** — 새 파일 추가만 허용
- 번호는 3자리 제로패딩: `001`, `002`, ...

### Migration 파일 형식
```sql
-- Migration: 001_init
-- Created: YYYY-MM-DD
-- Description: 변경 내용 한 줄 요약

-- ↑ UP (적용)
ALTER TABLE ...;

-- ↓ DOWN (롤백) — 주석 처리
-- ALTER TABLE ... DROP COLUMN ...;
```

### 적용 전 필수 확인 쿼리
```sql
-- 현재 스키마 확인
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = '{테이블명}';

-- 인덱스 확인
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = '{테이블명}';
```

### 순서
1. 스테이징 Supabase에서 UP 쿼리 실행
2. 애플리케이션 정상 동작 확인
3. 프로덕션 적용
4. 이상 시 DOWN 쿼리로 즉시 롤백
