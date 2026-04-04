# 아고다 링크 / 어필리에이트 규칙

## 링크 형식

아고다 어필리에이트 링크는 반드시 파트너 코드를 포함해야 한다.

```
https://www.agoda.com/partners/partnersearch.aspx?pcs=1&cid={AGODA_PARTNER_CODE}&hid={hotel_id}
```

- `AGODA_PARTNER_CODE` — 환경변수에서만 읽기, 하드코딩 금지
- `hotel_id` — Agoda 호텔 고유 ID (DB의 `hotel_id` 컬럼)

## 링크 생성 위치

- **생성**: `src/app/api/recommend/route.ts` 서버에서만 생성
- **노출**: `HotelCard.tsx`의 `agoda_link` prop으로 전달
- **클라이언트에서 링크 조합 금지** — 파트너 코드 노출 위험

## 클릭 추적

아고다 링크 클릭 시 반드시 `onTrack(hotel_id, 'agoda_link_click')` 호출:
- `decision_sessions.converted = true` 업데이트
- `hotel_conversion_stats` 뷰에 집계

클릭 → 전환 추적이 데이터 독점의 핵심 측정 지표다.

## 링크 검증

- `agoda_link`가 빈 문자열이면 카드 렌더링 차단 (빈 링크로 어필리에이트 수익 누락 방지)
- `rel="noopener noreferrer"` 항상 포함
- `target="_blank"` 항상 포함 (이탈 없이 새 탭)
