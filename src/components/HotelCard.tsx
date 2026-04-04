'use client';

import { motion } from 'framer-motion';

export interface Hotel {
  hotel_id: string;
  hotel_name: string;
  star_rating?: number | null;
  agoda_rating?: number | null;
  price_min?: number | null;
  price_max?: number | null;
  image_url?: string | null;
  agoda_link: string;
  reason?: string;
  fit?: string | string[];
  caution?: string;
  one_line?: string;
  urgency?: string;
  match_score?: number;
}

interface Props {
  hotel: Hotel;
  rank: number;
  sessionId: string;
  onTrack: (hotelId: string, eventType: 'hotel_click' | 'agoda_link_click') => void;
  travelPurpose?: string;
}

const PURPOSE_BADGE: Record<string, string> = {
  honeymoon: '🥂 신혼 최적',
  family: '👨‍👩‍👧 가족 추천',
  business: '💼 출장 최적',
  solo: '🎒 솔로 추천',
};

export default function HotelCard({ hotel, rank, onTrack, travelPurpose }: Props) {
  const stars = Math.min(5, Math.max(0, hotel.star_rating ?? 0));
  const hasPrice = hotel.price_min != null || hotel.price_max != null;
  const fmt = (n?: number | null) =>
    n != null ? Math.round(n).toLocaleString() : null;

  // fit 배열로 정규화 (최대 3개)
  const fitItems: string[] = Array.isArray(hotel.fit)
    ? hotel.fit.slice(0, 3)
    : hotel.fit
    ? [hotel.fit]
    : [];

  // hotel_id 기반 일관된 조회자 수
  const idNum = parseInt(hotel.hotel_id.replace(/\D/g, '') || '0', 10);
  const viewers = (idNum % 33) + 15;

  const badge = travelPurpose ? PURPOSE_BADGE[travelPurpose] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={() => onTrack(hotel.hotel_id, 'hotel_click')}
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,107,53,0.5)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(255,107,53,0.15)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* 이미지 영역 16:9 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%',
          background: 'var(--bg-elevated)',
          overflow: 'hidden',
        }}
      >
        <img
          src={hotel.image_url || `https://picsum.photos/seed/${hotel.hotel_id}/800/450`}
          alt={hotel.hotel_name}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            const el = e.currentTarget;
            if (el.dataset.fallbackApplied) return;
            el.dataset.fallbackApplied = 'true';
            el.src = `https://picsum.photos/seed/${hotel.hotel_id}/800/450`;
          }}
        />

        {/* 그라디언트 오버레이 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.5) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* 순위 배지 — 좌상단 */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'var(--accent-orange)',
            color: '#fff',
            fontSize: '12px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '8px',
            letterSpacing: '0.02em',
          }}
        >
          #{rank} AI추천
        </div>

        {/* 여행목적 배지 — 우상단 */}
        {badge && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,107,53,0.9)',
              backdropFilter: 'blur(4px)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '8px',
              whiteSpace: 'nowrap',
            }}
          >
            {badge}
          </div>
        )}

        {/* 호텔명 + 별점 + 평점 */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '18px',
            right: '18px',
          }}
        >
          <h3
            className="font-display"
            style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '20px',
              lineHeight: 1.2,
              marginBottom: '6px',
            }}
          >
            {hotel.hotel_name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {stars > 0 && (
              <span style={{ color: 'var(--accent-gold)', fontSize: '14px' }}>
                {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
              </span>
            )}
            {hotel.agoda_rating != null && (
              <span
                style={{
                  color: 'var(--accent-orange)',
                  fontSize: '13px',
                  fontWeight: 700,
                  background: 'rgba(255,107,53,0.15)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                {hotel.agoda_rating}/10
              </span>
            )}
            {hasPrice && (
              <span style={{ color: 'rgba(240,244,255,0.7)', fontSize: '13px' }}>
                {fmt(hotel.price_min) ?? '?'}~{fmt(hotel.price_max) ?? '?'}원/박
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 콘텐츠 패널 */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>

        {/* 한줄 요약 */}
        {hotel.one_line && (
          <p
            style={{
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {hotel.one_line}
          </p>
        )}

        {/* 가격 */}
        {hasPrice ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>1박 기준</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '18px' }}>
              {fmt(hotel.price_min) ?? '?'}
              <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '14px' }}>
                {' '}~ {fmt(hotel.price_max) ?? '?'}원
              </span>
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--accent-orange)', fontSize: '13px' }}>📋</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              아고다에서 실시간 가격 확인
            </span>
          </div>
        )}

        {/* fit 체크리스트 */}
        {fitItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'rgba(77,255,210,0.06)',
              border: '1px solid rgba(77,255,210,0.12)',
              borderRadius: '12px',
              padding: '12px 14px',
            }}
          >
            {fitItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span
                  style={{
                    color: 'var(--accent-mint)',
                    fontSize: '14px',
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: '1px',
                  }}
                >
                  ✓
                </span>
                <span style={{ color: 'var(--accent-mint)', fontSize: '13px', lineHeight: 1.5 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* reason — fit 없을 때만 표시 */}
        {fitItems.length === 0 && hotel.reason && (
          <div style={{ position: 'relative', paddingLeft: '20px' }}>
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                left: '0',
                fontSize: '32px',
                lineHeight: 1,
                color: 'var(--accent-gold)',
                opacity: 0.4,
                fontFamily: 'Georgia, serif',
              }}
            >
              &ldquo;
            </span>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.75,
                fontStyle: 'italic',
              }}
            >
              {hotel.reason}
            </p>
          </div>
        )}

        {/* caution */}
        {hotel.caution && (
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', lineHeight: 1.6 }}>
            △ {hotel.caution}
          </p>
        )}

        {/* CTA 버튼 */}
        <a
          href={hotel.agoda_link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.stopPropagation();
            onTrack(hotel.hotel_id, 'agoda_link_click');
          }}
          style={{
            display: 'block',
            width: '100%',
            padding: '16px',
            background: 'var(--accent-orange)',
            color: '#fff',
            textAlign: 'center',
            fontWeight: 700,
            fontSize: '15px',
            borderRadius: '14px',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
            boxShadow: '0 4px 20px rgba(255,107,53,0.2)',
            boxSizing: 'border-box',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = '#ff8255';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.02)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-orange)';
            (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          }}
        >
          아고다에서 가격 확인하기 →
        </a>

        {/* 긴급성 문구 */}
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px', margin: 0 }}>
          {hotel.urgency || `지금 ${viewers}명이 이 호텔 조회 중`}
        </p>
      </div>
    </motion.div>
  );
}
