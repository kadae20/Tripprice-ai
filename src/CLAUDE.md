# FRONTEND RULES
# 경로: /tripprice-ai/src/CLAUDE.md
# 상위: /tripprice-ai/CLAUDE.md

---

## 컴포넌트 원칙
- 컴포넌트 단일 책임 원칙
- Props 타입 항상 명시 (TypeScript interface)
- 서버 컴포넌트 기본, `'use client'`는 필요할 때만
- `useState` / `useEffect` 필요 없으면 서버 컴포넌트 유지

## 스타일 원칙
- Tailwind CSS 우선 사용
- 인라인 `style` 속성은 동적 값(CSS 변수, 계산값)에만 허용
- 반응형 기본 (모바일 퍼스트)
- CSS 변수 사용: `var(--bg-primary)`, `var(--accent-orange)` 등

## 핵심 컴포넌트 규칙

### HotelCard
- `fitItems` 항상 3개 보장 — 폴백값 필수
- `fitItems.length > 0` 조건부 렌더링 금지 → 항상 체크리스트 표시
- `urgency` 없으면 `hotel_id` 기반 일관된 조회자 수 표시
- 이미지 오류 시 자동 picsum 폴백

### SearchForm
- `initialStep` / `initialPurpose` / `initialBudgetMax` 등 편집 진입 props 지원
- `highlightAlternativePurposes=true` 시 현재 목적 흐리게, 나머지 민트 강조
- `initialCheckin` / `initialCheckout` 로 날짜 pre-fill 지원

### ResultList
- 비교 테이블: 호텔 2개 이상일 때만 표시
- `scoreToStars()`: 90+→★5, 75+→★4, 60+→★3, 45+→★2

## UX 원칙
- 로딩 상태: `LoadingState` + `StreamingText` 조합
- 에러: `alert()` 대신 인라인 에러 메시지 (추후 교체 예정)
- 공유: URL pushState로 검색 조건 반영, 클립보드 복사
- 조건 변경 버튼: "예산 높이면?" / "목적 바꾸면?" — 기존 조건 유지하며 폼 재진입

## 이미지 처리
- `<img>` 태그 직접 사용 가능 (agoda 이미지 도메인 다양)
- `next/image`는 remotePatterns에 등록된 도메인만 가능
- `onError` 폴백 항상 포함

## 애니메이션
- `framer-motion` 사용
- 카드 진입: `initial={{ opacity: 0, y: 24 }}` 패턴
- 호버: `whileHover={{ y: -4 }}` + box-shadow 강화
