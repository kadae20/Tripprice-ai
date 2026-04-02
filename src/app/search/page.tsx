'use client';

import { useState, useCallback } from 'react';
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
          const jsonMatch = fullText.match(/\{[\s\S]*"recommendations"[\s\S]*\}/);
          if (jsonMatch) {
            const aiData = JSON.parse(jsonMatch[0]) as {
              recommendations: Array<{
                hotel_id: string;
                hotel_name?: string;
                star_rating?: number;
                agoda_rating?: number;
                reason?: string;
                fit?: string;
                caution?: string;
              }>;
              ai_mode?: boolean;
              fallback?: boolean;
              agodaUrl?: string;
            };

            if (aiData.fallback && aiData.agodaUrl) {
              // 최후 폴백: 아고다 검색 링크만
              setFallbackUrl(aiData.agodaUrl);
            } else if (aiData.ai_mode) {
              // AI 지식 기반 추천: x-hotels-data의 기본 호텔 정보에 reason/fit/caution 병합
              const recs = Object.fromEntries(
                aiData.recommendations.map((r) => [r.hotel_id, r])
              );
              // baseHotels에 hotel_id "ai_1","ai_2","ai_3"가 있으면 병합,
              // 없으면 recommendations를 직접 Hotel 객체로 변환
              if (baseHotels.length > 0) {
                aiHotels = baseHotels.map((h) => ({ ...h, ...recs[h.hotel_id] }));
              } else {
                aiHotels = aiData.recommendations.map((r) => ({
                  hotel_id: r.hotel_id,
                  hotel_name: r.hotel_name ?? '',
                  star_rating: r.star_rating,
                  agoda_rating: r.agoda_rating,
                  agoda_link: '',
                  reason: r.reason,
                  fit: r.fit,
                  caution: r.caution,
                }));
              }
            } else {
              // 정상 DB 기반 추천
              const recs = Object.fromEntries(
                aiData.recommendations.map((r) => [r.hotel_id, r])
              );
              aiHotels = baseHotels.map((h) => ({ ...h, ...recs[h.hotel_id] }));
            }
          }
        } catch {
          /* 기본 데이터 사용 */
        }

        setHotels(aiHotels);
        setStage('result');
      } catch (err) {
        setStage('input');
        alert(`오류: ${err instanceof Error ? err.message : String(err)}`);
      }
    },
    [sessionId]
  );

  const handleTrack = useCallback(
    async (hotelId: string, eventType: 'hotel_click' | 'agoda_link_click') => {
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          selectedHotelId: hotelId,
          eventType,
        }),
      }).catch(() => {});
    },
    [sessionId]
  );

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      {/* nav bar */}
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
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--text-primary)',
          }}
        >
          Tripprice
          <span style={{ color: 'var(--accent-orange)' }}>·</span>
        </span>

        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '14px',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              'var(--text-primary)')
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              'var(--text-secondary)')
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
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'center',
          }}>
            <div style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              padding: '40px 24px',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
              <h2 style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>
                {lastInput?.city} 데이터 준비 중
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>
                현재 이 도시의 호텔 데이터가 없습니다.<br />
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
                  marginBottom: '16px',
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
          <ResultList
            hotels={hotels}
            sessionId={sessionId}
            onTrack={handleTrack}
            onReset={() => setStage('input')}
            city={lastInput?.city}
            purpose={PURPOSE_KO[lastInput?.travelPurpose ?? '']}
          />
        )}
      </div>
    </div>
  );
}
