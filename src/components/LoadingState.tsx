'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  '조건을 분석하고 있어요...',
  '후보 호텔을 검토하고 있어요...',
  '여행 목적에 맞는 호텔을 찾고 있어요...',
  '최적 조합을 계산하고 있어요...',
  'AI가 최종 선택을 하고 있어요...',
];

export default function LoadingState({
  city,
  purpose,
}: {
  city: string;
  purpose: string;
}) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setMsgIdx((i) => (i + 1) % MESSAGES.length),
      1800
    );
    return () => clearInterval(t);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 0',
        gap: '32px',
      }}
    >
      {/* rotating ring */}
      <div style={{ position: 'relative', width: '72px', height: '72px' }}>
        {/* static track */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(255,255,255,0.06)',
          }}
        />
        {/* spinning arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: 'var(--accent-orange)',
            borderRightColor: 'rgba(255,107,53,0.25)',
          }}
        />
        {/* inner pulsing dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'var(--accent-orange)',
            boxShadow: '0 0 12px rgba(255,107,53,0.6)',
          }}
        />
      </div>

      {/* branding */}
      <div style={{ textAlign: 'center' }}>
        <div
          className="font-display"
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          Tripprice
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            style={{ color: 'var(--accent-orange)' }}
          >
            ·
          </motion.span>
        </div>

        {(city || purpose) && (
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              padding: '5px 14px',
              fontSize: '13px',
              color: 'var(--accent-orange)',
              marginBottom: '16px',
            }}
          >
            {[city, purpose].filter(Boolean).join(' · ')}
          </div>
        )}

        {/* cycling messages */}
        <div
          style={{
            minHeight: '28px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '90vw',
            width: '280px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                textAlign: 'center',
                wordBreak: 'keep-all',
                overflowWrap: 'break-word',
                margin: 0,
                lineHeight: 1.6,
                width: '100%',
              }}
            >
              {MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* subtle progress bar */}
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'var(--bg-elevated)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{
            width: '60%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent, var(--accent-orange), transparent)',
            borderRadius: '1px',
          }}
        />
      </div>
    </div>
  );
}
