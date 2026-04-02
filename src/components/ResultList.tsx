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
}

export default function ResultList({
  hotels,
  sessionId,
  onTrack,
  onReset,
  city,
  purpose,
}: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* header */}
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
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
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
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              'rgba(255,107,53,0.3)';
            (e.currentTarget as HTMLButtonElement).style.color =
              'var(--text-primary)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor =
              'var(--border)';
            (e.currentTarget as HTMLButtonElement).style.color =
              'var(--text-secondary)';
          }}
        >
          ← 다시 검색하기
        </button>
      </motion.div>

      {/* staggered cards */}
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
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
