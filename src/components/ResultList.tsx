'use client';

import { motion } from 'framer-motion';
import HotelCard, { type Hotel } from './HotelCard';

interface Props {
  hotels: Hotel[];
  sessionId: string;
  onTrack: (hotelId: string, eventType: 'hotel_click' | 'agoda_link_click') => void;
  onReset: () => void;
  city?: string;
  purpose?: string;
  travelPurpose?: string;
}

function scoreToStars(score: number): string {
  const n = score >= 90 ? 5 : score >= 75 ? 4 : score >= 60 ? 3 : score >= 45 ? 2 : 1;
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

export default function ResultList({
  hotels,
  sessionId,
  onTrack,
  onReset,
  city,
  purpose,
  travelPurpose,
}: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '20px',
                background: 'var(--accent-orange)',
                borderRadius: '2px',
                flexShrink: 0,
              }}
            />
            <h2
              className="font-display"
              style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}
            >
              AI 추천 결과
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'var(--accent-orange)',
                  marginLeft: '8px',
                  fontFamily: 'var(--font-noto-sans-kr), sans-serif',
                }}
              >
                {hotels.length}개
              </span>
            </h2>
          </div>
          {(city || purpose) && (
            <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
              {[city, purpose].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>

        <button
          onClick={onReset}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '8px 14px',
            color: 'var(--text-secondary)',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,107,53,0.3)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
        >
          ← 다시 검색하기
        </button>
      </motion.div>

      {/* 호텔 카드 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {hotels.map((hotel, i) => (
          <motion.div
            key={hotel.hotel_id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <HotelCard
              hotel={hotel}
              rank={i + 1}
              sessionId={sessionId}
              onTrack={onTrack}
              travelPurpose={travelPurpose}
            />
          </motion.div>
        ))}
      </div>

      {/* 비교 테이블 (2개 이상일 때) */}
      {hotels.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '12px',
            }}
          >
            📊 한눈에 비교
          </p>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' as 'touch' }}>
            <table
              style={{
                width: '100%',
                minWidth: '460px',
                borderCollapse: 'collapse',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                overflow: 'hidden',
                fontSize: '13px',
              }}
            >
              <thead>
                <tr style={{ background: 'var(--bg-elevated)' }}>
                  <th
                    style={{
                      padding: '12px 16px',
                      textAlign: 'left',
                      color: 'var(--text-muted)',
                      fontWeight: 600,
                      width: '72px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  />
                  {hotels.map((h) => (
                    <th
                      key={h.hotel_id}
                      style={{
                        padding: '12px 16px',
                        textAlign: 'center',
                        color: 'var(--accent-orange)',
                        fontWeight: 700,
                        borderBottom: '1px solid var(--border)',
                      }}
                    >
                      {h.hotel_name.length > 12
                        ? h.hotel_name.slice(0, 12) + '…'
                        : h.hotel_name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* 종합 */}
                <tr style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>종합</td>
                  {hotels.map((h) => (
                    <td key={h.hotel_id} style={{ padding: '10px 16px', textAlign: 'center', color: 'var(--accent-gold)' }}>
                      {scoreToStars(h.match_score ?? 75)}
                    </td>
                  ))}
                </tr>
                {/* 위치 */}
                <tr style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>위치</td>
                  {hotels.map((h) => {
                    const score = h.agoda_rating != null
                      ? Math.min(100, h.agoda_rating * 10 + 5)
                      : (h.match_score ?? 70);
                    return (
                      <td key={h.hotel_id} style={{ padding: '10px 16px', textAlign: 'center', color: 'var(--accent-gold)' }}>
                        {scoreToStars(score)}
                      </td>
                    );
                  })}
                </tr>
                {/* 가성비 */}
                <tr style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>가성비</td>
                  {hotels.map((h) => {
                    const score = h.price_min != null
                      ? Math.max(40, Math.min(100, 100 - h.price_min / 3000))
                      : Math.max(50, (h.match_score ?? 70) - 10);
                    return (
                      <td key={h.hotel_id} style={{ padding: '10px 16px', textAlign: 'center', color: 'var(--accent-gold)' }}>
                        {scoreToStars(score)}
                      </td>
                    );
                  })}
                </tr>
                {/* 시설 */}
                <tr style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>시설</td>
                  {hotels.map((h) => {
                    const score = h.star_rating != null
                      ? h.star_rating * 20
                      : (h.match_score ?? 70) - 5;
                    return (
                      <td key={h.hotel_id} style={{ padding: '10px 16px', textAlign: 'center', color: 'var(--accent-gold)' }}>
                        {scoreToStars(score)}
                      </td>
                    );
                  })}
                </tr>
                {/* 추천 */}
                <tr style={{ borderTop: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 16px', color: 'var(--text-muted)', fontWeight: 600 }}>추천</td>
                  {hotels.map((h) => (
                    <td
                      key={h.hotel_id}
                      style={{
                        padding: '10px 16px',
                        textAlign: 'center',
                        color: 'var(--text-secondary)',
                        fontSize: '11px',
                        lineHeight: 1.4,
                      }}
                    >
                      {h.one_line
                        ? h.one_line.slice(0, 14) + (h.one_line.length > 14 ? '…' : '')
                        : '-'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
