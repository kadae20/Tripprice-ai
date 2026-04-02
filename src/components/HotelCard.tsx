'use client';

import { motion } from 'framer-motion';

export interface Hotel {
  hotel_id: string;
  hotel_name: string;
  star_rating?: number;
  agoda_rating?: number;
  price_min?: number;
  price_max?: number;
  image_url?: string;
  agoda_link: string;
  reason?: string;
  fit?: string;
  caution?: string;
}

interface Props {
  hotel: Hotel;
  rank: number;
  sessionId: string;
  onTrack: (hotelId: string, eventType: 'hotel_click' | 'agoda_link_click') => void;
}

export default function HotelCard({ hotel, rank, onTrack }: Props) {
  const stars = hotel.star_rating ?? 0;
  const fmt = (n?: number) =>
    n ? (n / 10000).toLocaleString() + '만' : '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
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
        (e.currentTarget as HTMLDivElement).style.borderColor =
          'rgba(255,107,53,0.35)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 0 30px rgba(255,107,53,0.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          'var(--border)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* 16:9 image with gradient overlay */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '56.25%', /* 16:9 */
          background: 'var(--bg-elevated)',
          overflow: 'hidden',
        }}
      >
        {hotel.image_url ? (
          <img
            src={hotel.image_url}
            alt={hotel.hotel_name}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = 'none';
              const fallback = img.nextElementSibling as HTMLElement | null;
              if (fallback) fallback.style.display = 'flex';
            }}
          />
        ) : null}

        {/* fallback */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: hotel.image_url ? 'none' : 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            background: 'linear-gradient(135deg, #1a2a4a 0%, #0d1f35 100%)',
          }}
        >
          🏨
        </div>

        {/* gradient overlay — bottom 60% */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(10,22,40,0.96) 0%, rgba(10,22,40,0.5) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* rank badge */}
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
          #{rank}
        </div>

        {/* hotel name + stars + score over image */}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
            }}
          >
            {stars > 0 && (
              <span style={{ color: 'var(--accent-gold)', fontSize: '14px' }}>
                {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
              </span>
            )}
            {hotel.agoda_rating && (
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
            <span style={{ color: 'rgba(240,244,255,0.7)', fontSize: '13px' }}>
              {fmt(hotel.price_min)}~{fmt(hotel.price_max)}원/박
            </span>
          </div>
        </div>
      </div>

      {/* content panel */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* price prominent */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
            1박 기준
          </span>
          <span
            style={{
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '18px',
            }}
          >
            {fmt(hotel.price_min)}
            <span style={{ color: 'var(--text-secondary)', fontWeight: 400, fontSize: '14px' }}>
              {' '}~ {fmt(hotel.price_max)}원
            </span>
          </span>
        </div>

        {/* reason with large quote marks */}
        {hotel.reason && (
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

        {/* fit — mint checkmark */}
        {hotel.fit && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              background: 'rgba(77,255,210,0.06)',
              border: '1px solid rgba(77,255,210,0.12)',
              borderRadius: '12px',
              padding: '10px 14px',
            }}
          >
            <span
              style={{
                color: 'var(--accent-mint)',
                fontSize: '15px',
                fontWeight: 700,
                flexShrink: 0,
                marginTop: '1px',
              }}
            >
              ✓
            </span>
            <span style={{ color: 'var(--accent-mint)', fontSize: '13px', lineHeight: 1.6 }}>
              {hotel.fit}
            </span>
          </div>
        )}

        {/* caution */}
        {hotel.caution && (
          <p
            style={{
              color: 'var(--text-muted)',
              fontSize: '12px',
              lineHeight: 1.6,
            }}
          >
            ⚠ {hotel.caution}
          </p>
        )}

        {/* CTA */}
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
            (e.currentTarget as HTMLAnchorElement).style.transform =
              'translateY(-1px)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              'var(--accent-orange)';
            (e.currentTarget as HTMLAnchorElement).style.transform =
              'translateY(0)';
          }}
        >
          아고다에서 현재 가격 확인하기 →
        </a>
      </div>
    </motion.div>
  );
}
