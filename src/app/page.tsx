'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

/* ─────────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────────── */
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

/* ─────────────────────────────────────────────
   Mock hotel card data for preview section
───────────────────────────────────────────── */
const MOCK_HOTELS = [
  {
    name: 'Park Hyatt Tokyo',
    stars: 5,
    score: 9.2,
    price: '28만원',
    reason: '신주쿠 고층에서 바라보는 후지산 뷰. 신혼부부에게 압도적인 지지를 받는 호텔.',
    fit: '로맨틱한 분위기 최상급',
    badge: '#1',
  },
  {
    name: 'The Capitol Hotel Tokyu',
    stars: 5,
    score: 8.9,
    price: '22만원',
    reason: '일본 전통미와 현대 럭셔리의 완벽한 조화. 히비야 공원 뷰가 일품.',
    fit: '조식 퀄리티 도쿄 최상위',
    badge: '#2',
  },
  {
    name: 'Cerulean Tower Tokyu Hotel',
    stars: 5,
    score: 8.7,
    price: '18만원',
    reason: '시부야 중심부, 도심 파노라마 뷰. 가성비와 위치를 동시에 잡은 선택.',
    fit: '위치 접근성 최고',
    badge: '#3',
  },
];

/* ─────────────────────────────────────────────
   Section: Hero
───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      style={{ background: 'var(--bg-primary)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
      className="flex items-center"
    >
      {/* grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />
      {/* orange glow bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full py-20 flex flex-col lg:flex-row items-center gap-16 lg:gap-0">
        {/* Left 60% */}
        <div className="flex-1 lg:pr-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{
                display: 'inline-block',
                border: '1px solid rgba(255,107,53,0.4)',
                borderRadius: '100px',
                padding: '6px 16px',
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: 'var(--accent-orange)',
                marginBottom: '28px',
                background: 'rgba(255,107,53,0.06)',
              }}
            >
              AI-POWERED HOTEL DECISIONS
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display"
            style={{ lineHeight: 1.15, marginBottom: '24px' }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(36px, 5vw, 68px)',
                fontWeight: 400,
                color: 'var(--text-primary)',
                fontStyle: 'italic',
              }}
            >
              당신의 여행,
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(40px, 5.5vw, 76px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
              }}
            >
              완벽한 호텔 하나로
            </span>
            <span
              style={{
                display: 'block',
                fontSize: 'clamp(36px, 4.5vw, 62px)',
                fontWeight: 400,
                color: 'var(--accent-gold)',
                fontStyle: 'italic',
              }}
            >
              달라집니다.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '17px',
              lineHeight: 1.8,
              maxWidth: '480px',
              marginBottom: '40px',
            }}
          >
            신혼여행, 가족여행, 비즈니스 출장… 여행 목적과 예산을 입력하면
            AI가 수천 개의 호텔 중 당신에게 딱 맞는 3곳을 추천해드려요.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}
          >
            <Link
              href="/search"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FF6B35',
                color: '#FFFFFF',
                padding: '16px 32px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '16px',
                textDecoration: 'none',
                boxShadow: '0 0 40px rgba(255,107,53,0.35)',
                transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#E85A25';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 0 56px rgba(255,107,53,0.55)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = '#FF6B35';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = '0 0 40px rgba(255,107,53,0.35)';
              }}
            >
              지금 무료로 추천받기 →
            </Link>
            <a
              href="#how"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--text-secondary)',
                padding: '16px 32px',
                borderRadius: '14px',
                fontWeight: 500,
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.3)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.12)';
                (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
              }}
            >
              어떻게 작동하나요?
            </a>
          </motion.div>
        </div>

        {/* Right 40% — floating card preview */}
        <motion.div
          initial={{ opacity: 0, x: 40, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: -6 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ rotateY: 0, scale: 1.02 }}
          style={{
            perspective: '1200px',
            flexShrink: 0,
            width: '340px',
            background: 'var(--bg-elevated)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(255,107,53,0.08)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* mock image */}
          <div
            style={{
              width: '100%',
              height: '180px',
              background: 'linear-gradient(135deg, #1a2a4a 0%, #0d1f35 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
            }}
          >
            🏯
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(15,31,61,0.9) 0%, transparent 60%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'var(--accent-orange)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '8px',
              }}
            >
              #1 AI 추천
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '16px',
                right: '16px',
              }}
            >
              <div
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: 'var(--font-playfair), serif',
                }}
              >
                Park Hyatt Tokyo
              </div>
              <div style={{ color: 'var(--accent-gold)', fontSize: '12px', marginTop: '2px' }}>
                ★★★★★ &nbsp; 9.2/10
              </div>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '13px',
                lineHeight: 1.7,
                marginBottom: '12px',
              }}
            >
              신주쿠 고층에서 바라보는 후지산 뷰. 신혼부부에게 압도적인 지지를 받는 호텔.
            </p>
            <div
              style={{
                background: 'rgba(77,255,210,0.08)',
                border: '1px solid rgba(77,255,210,0.15)',
                borderRadius: '10px',
                padding: '8px 12px',
                color: 'var(--accent-mint)',
                fontSize: '12px',
                marginBottom: '12px',
              }}
            >
              ✓ 로맨틱한 분위기 최상급
            </div>
            <div
              style={{
                background: 'var(--accent-orange)',
                color: '#fff',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              아고다에서 가격 확인 →
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll bounce arrow */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          fontSize: '12px',
          letterSpacing: '0.1em',
        }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>SCROLL</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: How It Works
───────────────────────────────────────────── */
const STEPS = [
  {
    num: '01',
    icon: '🎯',
    title: '여행 목적 선택',
    desc: '신혼여행, 가족여행, 비즈니스, 혼자여행 중 여행 성격을 선택해요. AI가 목적에 맞는 기준으로 분석을 시작합니다.',
  },
  {
    num: '02',
    icon: '⚙️',
    title: '조건 입력',
    desc: '도시, 예산, 날짜, 우선순위를 입력하세요. 복잡한 필터 없이 간단한 몇 가지만으로 충분해요.',
  },
  {
    num: '03',
    icon: '✨',
    title: 'AI 맞춤 추천',
    desc: '수천 개의 호텔 데이터를 실시간 분석해 당신의 여행 스타일에 최적화된 3개의 호텔을 추천해드려요.',
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how"
      style={{ background: 'var(--bg-surface)', padding: '120px 0', overflow: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: 'var(--accent-orange)',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
          >
            HOW IT WORKS
          </span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}
          >
            단 3단계로 완성되는
            <br />
            <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>완벽한 호텔 선택</span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '48px',
                flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
              }}
            >
              {/* large number */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: 'clamp(80px, 12vw, 160px)',
                    fontWeight: 900,
                    color: 'var(--accent-gold)',
                    opacity: 0.15,
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  {step.num}
                </span>
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '48px',
                  }}
                >
                  {step.icon}
                </div>
              </div>

              {/* text */}
              <div style={{ flex: 1 }}>
                <h3
                  className="font-display"
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '16px',
                    lineHeight: 1.8,
                    maxWidth: '480px',
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Trust / Stats
───────────────────────────────────────────── */
const TAGS = [
  '#신혼여행', '#도쿄', '#방콕', '#가족여행', '#비즈니스',
  '#발리', '#싱가포르', '#제주', '#파리', '#하와이',
  '#혼자여행', '#유럽배낭', '#럭셔리', '#가성비', '#오사카',
  '#하노이', '#다낭', '#홍콩', '#타이베이', '#뉴욕',
];

function CounterItem({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(target, 1800, active);
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        className="font-display"
        style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        {count.toLocaleString()}{suffix}
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>{label}</div>
    </div>
  );
}

function TrustSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      style={{ background: 'var(--bg-primary)', padding: '120px 0', overflow: 'hidden' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 60px)',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '72px',
            lineHeight: 1.2,
          }}
        >
          이미 수만 명이 선택한
          <br />
          <span style={{ color: 'var(--accent-orange)', fontStyle: 'italic' }}>AI 호텔 큐레이션</span>
        </motion.h2>

        <div
          ref={ref}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'clamp(40px, 8vw, 120px)',
            flexWrap: 'wrap',
            marginBottom: '100px',
          }}
        >
          <CounterItem target={10000} suffix="+" label="누적 추천 건수" active={inView} />
          <CounterItem target={95} suffix="%" label="만족도 비율" active={inView} />
          <CounterItem target={3} suffix="초" label="평균 추천 시간" active={inView} />
        </div>

        {/* tag cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center',
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          {TAGS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '13px',
                cursor: 'default',
                transition: 'all 0.2s',
              }}
              whileHover={{
                borderColor: 'rgba(255,107,53,0.4)',
                color: 'var(--accent-orange)',
                scale: 1.05,
              }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: Preview (mock hotel cards)
───────────────────────────────────────────── */
function MockCard({ hotel, index }: { hotel: typeof MOCK_HOTELS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* image area */}
      <div
        style={{
          position: 'relative',
          height: '200px',
          background: `linear-gradient(135deg, hsl(${210 + index * 20}, 40%, 18%) 0%, hsl(${210 + index * 20}, 50%, 10%) 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '52px',
        }}
      >
        {index === 0 ? '🏯' : index === 1 ? '🌸' : '🗼'}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15,31,61,0.95) 0%, transparent 50%)',
          }}
        />
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
          }}
        >
          {hotel.badge}
        </div>
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', right: '16px' }}>
          <div
            className="font-display"
            style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}
          >
            {hotel.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
            <span style={{ color: 'var(--accent-gold)', fontSize: '13px' }}>
              {'★'.repeat(hotel.stars)}
            </span>
            <span style={{ color: 'var(--accent-orange)', fontSize: '13px', fontWeight: 600 }}>
              {hotel.score}/10
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
              {hotel.price}/박
            </span>
          </div>
        </div>
      </div>

      {/* content */}
      <div style={{ padding: '20px' }}>
        <p
          style={{
            color: 'var(--text-secondary)',
            fontSize: '14px',
            lineHeight: 1.7,
            marginBottom: '16px',
            fontStyle: 'italic',
          }}
        >
          &ldquo;{hotel.reason}&rdquo;
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--accent-mint)',
            fontSize: '13px',
            marginBottom: '16px',
          }}
        >
          <span style={{ fontSize: '16px' }}>✓</span>
          {hotel.fit}
        </div>
        <div
          style={{
            background: 'var(--accent-orange)',
            color: '#fff',
            borderRadius: '12px',
            padding: '12px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          아고다에서 현재 가격 확인 →
        </div>
      </div>
    </motion.div>
  );
}

function PreviewSection() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '120px 0',
        background: 'var(--bg-surface)',
        overflow: 'hidden',
      }}
    >
      {/* diagonal divider background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'var(--bg-primary)',
          clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              padding: '8px 20px',
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginBottom: '20px',
            }}
          >
            도쿄 신혼여행 · 예산 30만원
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            이런 결과를 받아보게 됩니다
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {MOCK_HOTELS.map((hotel, i) => (
            <MockCard key={hotel.name} hotel={hotel} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Section: CTA
───────────────────────────────────────────── */
function CTASection() {
  return (
    <section
      style={{
        background: 'var(--bg-primary)',
        padding: '140px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* radial orange glow center */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center" style={{ position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            style={{
              display: 'inline-block',
              border: '1px solid rgba(255,107,53,0.4)',
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--accent-orange)',
              marginBottom: '28px',
              background: 'rgba(255,107,53,0.06)',
            }}
          >
            START NOW
          </span>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 68px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            다음 여행의 호텔,
            <br />
            <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>
              지금 바로 결정하세요.
            </span>
          </h2>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '17px',
              lineHeight: 1.8,
              marginBottom: '48px',
              maxWidth: '500px',
              margin: '0 auto 48px',
            }}
          >
            3초 안에 AI가 당신의 여행 스타일을 분석하고
            완벽한 호텔을 골라드립니다.
          </p>

          <Link
            href="/search"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FF6B35',
              color: '#FFFFFF',
              padding: '20px 48px',
              borderRadius: '16px',
              fontWeight: 700,
              fontSize: '18px',
              textDecoration: 'none',
              boxShadow: '0 0 60px rgba(255,107,53,0.4)',
              transition: 'background 0.2s, transform 0.2s, box-shadow 0.2s',
              marginBottom: '20px',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = '#E85A25';
              el.style.transform = 'translateY(-3px)';
              el.style.boxShadow = '0 0 80px rgba(255,107,53,0.55)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = '#FF6B35';
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 0 60px rgba(255,107,53,0.4)';
            }}
          >
            무료로 호텔 추천받기 →
          </Link>

          <div style={{ marginTop: '20px' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px', letterSpacing: '0.05em' }}>
              가입 불필요 · 완전 무료
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   Footer
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        padding: '32px 24px',
        textAlign: 'center',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="font-display"
          style={{ color: 'var(--text-secondary)', fontSize: '14px' }}
        >
          Tripprice AI
          <span style={{ color: 'var(--accent-orange)' }}>·</span>
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
          © 2026 Tripprice AI · 아고다 공식 파트너
          <a
            href="https://www.agoda.com/partners/partnersearch.aspx?cid=1926938&pcs=8"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://sherpa.agoda.com/Badge/GetBadge?badgetype=1&refkey=aD9U0V6icRJDnb7ui2lFyA%3D%3D"
              alt="아고다 공식 파트너"
              style={{ height: '22px', width: 'auto', verticalAlign: 'middle', opacity: 0.85 }}
            />
          </a>
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
          All rights reserved
        </span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main style={{ background: 'var(--bg-primary)' }}>
      <HeroSection />
      <HowItWorksSection />
      <TrustSection />
      <PreviewSection />
      <CTASection />
      <Footer />
    </main>
  );
}
