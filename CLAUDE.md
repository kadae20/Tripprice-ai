# Tripprice AI

**우리는 호텔 검색 서비스가 아니다. 여행자의 의사결정을 소유하는 플랫폼이다.**
사용자가 선택할수록 추천이 정확해지고, 경쟁자가 복사할 수 없는 데이터 해자가 쌓인다.

---

## 절대 금지 (이유와 함께)

1. **`.env` 파일 커밋 금지** — 유출 시 전체 서비스 탈취 가능. 발견 즉시 키 교체.
2. **기존 DB 테이블 `DROP` 금지** — 되돌릴 수 없다. `migrations/` 파일로만 변경.
3. **API 키 하드코딩 금지** — 코드베이스는 공개될 수 있다. 항상 환경변수 사용.
4. **프로덕션 DB 직접 수정 금지** — 스테이징 검증 → migration SQL → 적용 순서 필수.
5. **`console.log`에 민감 데이터 출력 금지** — 세션 ID, 유저 데이터, API 응답 전체 노출 금지.

---

## 하위 규칙 참조

| 범위 | 파일 |
|------|------|
| 서비스 철학 / 독점 전략 | `.claude/agents/editor-in-chief.md` |
| AI 추천 엔진 원칙 | `.claude/agents/recommender.md` |
| 아고다 링크 / 어필리에이트 | `.claude/rules/agoda-link.md` |
| DB 스키마 / migration 규칙 | `.claude/rules/data-schema.md` |
| 프론트엔드 컴포넌트 규칙 | `src/CLAUDE.md` |
| 백엔드 API 규칙 | `src/app/api/CLAUDE.md` |
