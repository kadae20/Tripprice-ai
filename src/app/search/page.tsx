'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Link from 'next/link';
import SearchForm, { type SearchInput } from '@/components/SearchForm';
import LoadingState from '@/components/LoadingState';
import ResultList from '@/components/ResultList';
import StreamingText from '@/components/StreamingText';
import { type Hotel } from '@/components/HotelCard';

type Stage = 'input' | 'loading' | 'result';

const PURPOSE_KO: Record<string, string> = {
  honeymoon: '신혼여행',
  family: '가족여행',
  business: '비즈니스',
  solo: '혼자여행',
};

export default function SearchPage() {
  const [stage, setStage] = useState<Stage>('input');
  const [sessionId] = useState(
    () => `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
  );
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [streamText, setStreamText] = useState('');
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const [lastInput, setLastInput] = useState<SearchInput | null>(null);
  const [copied, setCopied] = useState(false);
  const autoSearched = useRef(false);

  const handleSearch = useCallback(
    async (input: SearchInput) => {
      setLastInput(input);
      setStage('loading');
      setStreamText('');
      setHotels([]);
      setFallbackUrl(null);

      try {
        const res = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...input, sessionId }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(
            (err as { error?: string }).error || `HTTP ${res.status}`
          );
        }

        const hotelsHeader = res.headers.get('x-hotels-data');
        const baseHotels: Hotel[] = hotelsHeader
          ? (() => {
              const bytes = Uint8Array.from(atob(hotelsHeader), (c) =>
                c.charCodeAt(0)
              );
              return JSON.parse(new TextDecoder('utf-8').decode(bytes));
            })()
          : [];

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          fullText += decoder.decode(value, { stream: true });
          setStreamText(fullText);
        }

        let aiHotels = baseHotels;
        try {
          // 신규 포맷("hotels") + 구포맷("recommendations") 모두 지원
          const jsonMatch = fullText.match(
            /\{[\s\S]*"(?:hotels|recommendations)"[\s\S]*\}/
          );
          if (jsonMatch) {
            type AiRec = {
              hotel_id: string;
              hotel_name?: string;
              star_rating?: number;
              agoda_rating?: number;
              rank?: number;
              match_score?: number;
              reason?: string;
              fit?: string | string[];
              caution?: string;
              one_line?: string;
              urgency?: string;
            };
            const aiData = JSON.parse(jsonMatch[0]) as {
              hotels?: AiRec[];
              recommendations?: AiRec[];
              ai_mode?: boolean;
              fallback?: boolean;
              agodaUrl?: string;
            };

            const recsList: AiRec[] =
              aiData.hotels ?? aiData.recommendations ?? [];

            if (aiData.fallback && aiData.agodaUrl) {
              setFallbackUrl(aiData.agodaUrl);
            } else if (aiData.ai_mode) {
              const recs = Object.fromEntries(
                recsList.map((r) => [r.hotel_id, r])
              );
              if (baseHotels.length > 0) {
                aiHotels = baseHotels.map((h) => ({ ...h, ...recs[h.hotel_id] }));
              } else {
                aiHotels = recsList.map((r) => ({
                  hotel_id: r.hotel_id,
                  hotel_name: r.hotel_name ?? '',
                  star_rating: r.star_rating,
                  agoda_rating: r.agoda_rating,
                  agoda_link: '',
                  reason: r.reason,
                  fit: r.fit,
                  caution: r.caution,
                  one_line: r.one_line,
                  urgency: r.urgency,
                  match_score: r.match_score,
                }));
              }
            } else {
              const recs = Object.fromEntries(
                recsList.map((r) => [r.hotel_id, r])
              );
              aiHotels = baseHotels.map((h) => ({ ...h, ...recs[h.hotel_id] }));
            }
          }
        } catch {
          /* 기본 데이터 사용 */
        }

        setHotels(aiHotels);
        setStage('result');

        // URL에 검색 조건 반영 (공유 가능)
        const url = new URL(window.location.href);
        url.searchParams.set('purpose', input.travelPurpose);
        url.searchParams.set('city', input.city);
        url.searchParams.set('budgetMin', String(input.budgetMin));
        url.searchParams.set('budgetMax', String(input.budgetMax));
        url.searchParams.set('priority', input.priority);
        url.searchParams.set('checkin', input.checkinDate);
        url.searchParams.set('checkout', input.checkoutDate);
        window.history.pushState({}, '', url.toString());
      } catch (err) {
        setStage('input');
        alert(`오류: ${err instanceof Error ? err.message : String(err)}`);
      }
    },
    [sessionId]
  );

  // URL 파라미터로 자동 검색 (공유 링크 진입 시)
  useEffect(() => {
    if (autoSearched.current) return;
    autoSearched.current = true;

    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    const travelPurpose = params.get('purpose') as SearchInput['travelPurpose'];
    const priority = params.get('priority') as SearchInput['priority'];

    if (city && travelPurpose && priority) {
      handleSearch({
        city,
        travelPurpose,
        budgetMin: parseInt(params.get('budgetMin') || '50000'),
        budgetMax: parseInt(params.get('budgetMax') || '300000'),
        priority,
        checkinDate: params.get('checkin') || new Date().toISOString().split('T')[0],
        checkoutDate:
          params.get('checkout') ||
          new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      });
    }
  }, [handleSearch]);

  const handleTrack = useCallback(
    async (hotelId: string, eventType: 'hotel_click' | 'agoda_link_click') => {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, selectedHotelId: hotelId, eventType }),
      }).catch(() => {});
    },
    [sessionId]
  );

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* nav */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          height: '64px',
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <span
          className="font-display"
          style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}
        >
          Tripprice<span style={{ color: 'var(--accent-orange)' }}>·</span>
        </span>
        <Link
          href="/"
          style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)')
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)')
          }
        >
          ← 홈으로
        </Link>
      </nav>

      {/* content */}
      <div className="max-w-lg mx-auto px-4 py-10">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1
            className="font-display"
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            AI 호텔 추천
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            여행 목적과 예산을 입력하면 AI가 최적의 호텔을 추천해드려요
          </p>
        </div>

        {stage === 'input' && (
          <SearchForm onSubmit={handleSearch} loading={false} />
        )}

        {stage === 'loading' && (
          <>
            <LoadingState
              city={lastInput?.city ?? ''}
              purpose={PURPOSE_KO[lastInput?.travelPurpose ?? ''] ?? ''}
            />
            {streamText && <StreamingText text={streamText} />}
          </>
        )}

        {stage === 'result' && hotels.length === 0 && fallbackUrl && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '40px 24px',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
              <h2
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
              >
                {lastInput?.city} 데이터 준비 중
              </h2>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '14px',
                  lineHeight: 1.7,
                  marginBottom: '24px',
                }}
              >
                현재 이 도시의 호텔 데이터가 없습니다.
                <br />
                아고다에서 직접 검색하시면 최저가 호텔을 찾을 수 있어요.
              </p>
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FF6B35',
                  color: '#FFFFFF',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '15px',
                  textDecoration: 'none',
                }}
              >
                아고다에서 {lastInput?.city} 호텔 검색 →
              </a>
            </div>
            <button
              onClick={() => setStage('input')}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '10px 20px',
                color: 'var(--text-secondary)',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              ← 다시 검색하기
            </button>
          </div>
        )}

        {stage === 'result' && hotels.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 공유 + 조건 변경 바 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {/* 공유 버튼 */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleShare}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '9px 14px',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  🔗 이 추천 공유하기
                </button>
                <a
                  href={`https://story.kakao.com/share?url=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.href : ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#FEE500',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '9px 14px',
                    color: '#191600',
                    fontSize: '13px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  💬 카카오
                </a>
              </div>

              {/* 복사 완료 토스트 */}
              {copied && (
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    color: 'var(--accent-mint)',
                    background: 'rgba(77,255,210,0.08)',
                    border: '1px solid rgba(77,255,210,0.2)',
                    borderRadius: '8px',
                    padding: '8px',
                  }}
                >
                  ✓ 링크가 복사됐어요!
                </div>
              )}

              {/* 조건 변경 버튼 */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setStage('input')}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  예산 높이면? →
                </button>
                <button
                  onClick={() => setStage('input')}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    color: 'var(--text-muted)',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  목적 바꾸면? →
                </button>
              </div>
            </div>

            <ResultList
              hotels={hotels}
              sessionId={sessionId}
              onTrack={handleTrack}
              onReset={() => setStage('input')}
              city={lastInput?.city}
              purpose={PURPOSE_KO[lastInput?.travelPurpose ?? '']}
              travelPurpose={lastInput?.travelPurpose}
            />
          </div>
        )}
      </div>
    </div>
  );
}
