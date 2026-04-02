# TripPrice AI

아고다 제휴 호텔 가격 비교 서비스

## 개발 서버

```bash
npm run dev
```

---

## 운영 가이드 — Hotel 데이터 동기화

### 동기화 전략

| 상황 | 방법 | 소요 시간 |
|---|---|---|
| 초기 세팅 | 로컬에서 `npm run full-sync` | ~8분 (35만 건) |
| 매주 자동 | Vercel Cron → `/api/sync/delta` | ~1분 (1~5% 변경분) |
| 대규모 변경 | 로컬에서 `npm run full-sync` | ~8분 |

---

### 초기 세팅 (최초 1회)

1. `.env.local` 설정:
   ```
   AGODA_CSV_DOWNLOAD_URL=...   # 아고다 전체 CSV URL
   AGODA_DELTA_URL=...          # 변경분 전용 URL (Feed 32, 없으면 폴백)
   AGODA_PARTNER_CODE=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXT_PUBLIC_SUPABASE_URL=...
   CRON_SECRET=...
   ```

2. 패키지 설치 후 전체 sync:
   ```bash
   npm install
   npm run full-sync
   ```

---

### 매주 자동 동기화 (Vercel Cron)

스케줄: **매주 일요일 23:00 UTC** (`vercel.json` 설정)

동작 우선순위:
1. `AGODA_DELTA_URL` 있음 → 변경분 전용 CSV upsert
2. 없음 → 전체 CSV에서 `updated_at >= 7일 이내` 행만 upsert

수동 트리거:
```bash
curl -X POST http://localhost:3000/api/sync/delta \
  -H "x-cron-secret: <CRON_SECRET>"
```

---

### 대규모 업데이트 (수동 full sync)

개발 서버 없이 직접 Supabase 연결:
```bash
npm run full-sync
```

---

### API 엔드포인트

| 엔드포인트 | 용도 | Vercel |
|---|---|---|
| `POST /api/sync` | 전체 sync (로컬 전용) | 타임아웃 초과 |
| `POST /api/sync/delta` | 변경분 sync | Cron 대상 ✅ |
