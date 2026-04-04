# BACKEND RULES
# 경로: /tripprice-ai/src/app/api/CLAUDE.md
# 상위: /tripprice-ai/src/CLAUDE.md

---

## API 원칙
- 인증 확인 먼저 — `secret` 파라미터 또는 Authorization 헤더 검증 후 로직 실행
- 통일된 응답 형식: `{ success: boolean, data: any, error: string | null }`
- HTTP 상태 코드 엄수: 200 OK / 400 Bad Request / 401 Unauthorized / 500 Internal Server Error
- 모든 에러는 `console.error` 후 JSON 응답 반환 — throw로 터뜨리지 않기

## Supabase 원칙
- 클라이언트 사이드: `NEXT_PUBLIC_SUPABASE_ANON_KEY` (RLS 적용)
- 서버 사이드 (API Route): `SUPABASE_SERVICE_ROLE_KEY` (RLS 우회, 관리용)
- RLS로 사용자 데이터 격리 — service role은 cron·통계 API에서만 사용
- 쿼리 후 `error` 객체 항상 체크: `if (error) throw error`

## Claude API 원칙
- 서버(API Route)에서만 사용 — 클라이언트에서 직접 호출 금지
- Structured Outputs 사용: 프롬프트에 JSON 스키마 명시
- 타임아웃: 30초 (`maxRetries: 0` + AbortSignal)
- fallback 응답 항상 준비 — AI 실패 시 DB 데이터로 대체
- 모델: `claude-haiku-4-5-20251001` (비용 효율), 복잡한 분석만 Sonnet

## Migration 원칙
- 마이그레이션 전 현재 스키마 확인:
  ```sql
  SELECT column_name, data_type FROM information_schema.columns
  WHERE table_name = '{테이블명}';
  ```
- 롤백 쿼리 주석으로 반드시 포함:
  ```sql
  -- ROLLBACK: ALTER TABLE ... DROP COLUMN ...;
  ```
- 스테이징(개발 Supabase 프로젝트)에서 먼저 테스트 후 프로덕션 적용
