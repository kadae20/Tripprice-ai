'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tripi, { type TrippiMood } from './mascot/Tripi';

function purposeToMood(p: string): TrippiMood {
  if (p === 'honeymoon') return 'honeymoon';
  return 'default';
}

export interface SearchInput {
  travelPurpose: 'honeymoon' | 'family' | 'business' | 'solo';
  budgetMin: number;
  budgetMax: number;
  city: string;
  priority: 'location' | 'facility' | 'breakfast' | 'view';
  checkinDate: string;
  checkoutDate: string;
}

const PURPOSES = [
  {
    value: 'honeymoon' as const,
    icon: '🥂',
    label: '신혼여행',
    sub: '로맨틱하게',
  },
  {
    value: 'family' as const,
    icon: '👨‍👩‍👧',
    label: '가족여행',
    sub: '편안하게',
  },
  {
    value: 'business' as const,
    icon: '💼',
    label: '비즈니스',
    sub: '효율적으로',
  },
  {
    value: 'solo' as const,
    icon: '🎒',
    label: '혼자여행',
    sub: '자유롭게',
  },
] as const;

const PRIORITIES = [
  { value: 'location' as const, icon: '📍', label: '위치' },
  { value: 'facility' as const, icon: '🏊', label: '시설' },
  { value: 'breakfast' as const, icon: '🍳', label: '조식' },
  { value: 'view' as const, icon: '🌅', label: '뷰' },
] as const;

const BUDGET_STEPS = [
  50000, 100000, 150000, 200000, 300000, 500000, 700000, 1000000, 1500000,
  2000000,
];

function findBudgetIdx(maxBudget?: number): number {
  if (!maxBudget) return BUDGET_STEPS.length - 1;
  for (let i = 0; i < BUDGET_STEPS.length; i++) {
    if (BUDGET_STEPS[i] >= maxBudget) return i;
  }
  return BUDGET_STEPS.length - 1;
}

interface Props {
  onSubmit: (input: SearchInput) => void;
  loading: boolean;
  // 편집 진입용 초기값
  initialStep?: 1 | 2;
  initialPurpose?: SearchInput['travelPurpose'];
  initialBudgetMax?: number;
  initialCity?: string;
  initialPriority?: SearchInput['priority'];
  initialCheckin?: string;
  initialCheckout?: string;
  /** true 이면 현재 목적(initialPurpose)을 흐리고 나머지를 강조 */
  highlightAlternativePurposes?: boolean;
}

const slideVariants = {
  enterFromRight: { x: 60, opacity: 0 },
  enterFromLeft: { x: -60, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exitToLeft: { x: -60, opacity: 0 },
  exitToRight: { x: 60, opacity: 0 },
};

export default function SearchForm({
  onSubmit,
  loading,
  initialStep,
  initialPurpose,
  initialBudgetMax,
  initialCity,
  initialPriority,
  initialCheckin,
  initialCheckout,
  highlightAlternativePurposes,
}: Props) {
  const [step, setStep] = useState<1 | 2>(initialStep ?? 1);
  // highlightAlternativePurposes 모드: 목적을 미선택 상태로 시작해 다른 것 선택 유도
  const [purpose, setPurpose] = useState<SearchInput['travelPurpose'] | ''>(
    highlightAlternativePurposes ? '' : (initialPurpose ?? '')
  );
  const [city, setCity] = useState(initialCity ?? '');
  const [budgetIdx, setBudgetIdx] = useState(findBudgetIdx(initialBudgetMax));
  const [priority, setPriority] = useState<SearchInput['priority'] | ''>(
    initialPriority ?? ''
  );
  const [checkin, setCheckin] = useState(initialCheckin ?? '');
  const [checkout, setCheckout] = useState(initialCheckout ?? '');

  const fmt = (n: number) => (n / 10000).toLocaleString() + '만원';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purpose || !city || !priority) return;
    onSubmit({
      travelPurpose: purpose,
      budgetMin: 0,
      budgetMax: BUDGET_STEPS[budgetIdx],
      city,
      priority,
      checkinDate: checkin,
      checkoutDate: checkout,
    });
  };

  const canProceed = purpose !== '' && city.trim() !== '';

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', overflow: 'hidden' }}>
      {/* step indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '32px',
          justifyContent: 'center',
        }}
      >
        {[1, 2].map((s) => {
          const isActive = step === s;
          const isDone = step > s;
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isDone ? '14px' : '13px',
                  fontWeight: 700,
                  background: isActive
                    ? '#FF6B35'
                    : isDone
                    ? 'rgba(77,255,210,0.12)'
                    : 'var(--bg-elevated)',
                  color: isActive
                    ? '#FFFFFF'
                    : isDone
                    ? '#4DFFD2'
                    : '#3D5070',
                  border: `2px solid ${isActive ? '#FF6B35' : isDone ? '#4DFFD2' : 'var(--border)'}`,
                  transition: 'all 0.3s',
                  boxShadow: isActive ? '0 0 16px rgba(255,107,53,0.4)' : 'none',
                }}
              >
                {isDone ? '✓' : s}
              </div>
              {s < 2 && (
                <div
                  style={{
                    width: '48px',
                    height: '2px',
                    background: isDone ? '#4DFFD2' : 'var(--border)',
                    transition: 'background 0.3s',
                    borderRadius: '1px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {step === 1 && (
          <motion.div
            key="step1"
            initial="enterFromLeft"
            animate="center"
            exit="exitToLeft"
            variants={slideVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Step 1 headline + 트립이 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: highlightAlternativePurposes ? '12px' : '28px' }}>
              <Tripi mood={purposeToMood(purpose)} size="sm" animated />
              <h2
                className="font-display"
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginTop: '10px',
                  textAlign: 'center',
                }}
              >
                어떤 여행인가요?
              </h2>
            </div>

            {/* 목적 변경 힌트 */}
            {highlightAlternativePurposes && initialPurpose && (
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '13px',
                  color: 'var(--accent-mint)',
                  marginBottom: '20px',
                }}
              >
                다른 목적을 선택해보세요 →
              </p>
            )}

            {/* purpose grid 2×2 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              {PURPOSES.map(({ value, icon, label, sub }) => {
                const selected = purpose === value;
                // 목적 변경 모드: initialPurpose(현재 목적)는 흐리게, 나머지는 민트 강조
                const isCurrentPurpose = highlightAlternativePurposes && value === initialPurpose;
                const isAlternative = highlightAlternativePurposes && !isCurrentPurpose && !selected;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPurpose(value)}
                    style={{
                      position: 'relative',
                      padding: '24px 16px',
                      borderRadius: '16px',
                      border: selected
                        ? '1px solid var(--accent-orange)'
                        : isAlternative
                        ? '1px solid rgba(77,255,210,0.5)'
                        : '1px solid var(--border)',
                      background: selected
                        ? 'var(--bg-elevated)'
                        : isAlternative
                        ? 'rgba(77,255,210,0.05)'
                        : 'var(--bg-surface)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      opacity: isCurrentPurpose ? 0.35 : (!selected && purpose !== '' && !highlightAlternativePurposes ? 0.4 : 1),
                      transition: 'all 0.2s',
                      boxShadow: selected
                        ? '0 0 20px rgba(255,107,53,0.15)'
                        : isAlternative
                        ? '0 0 12px rgba(77,255,210,0.1)'
                        : 'none',
                    }}
                  >
                    {selected && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                          color: 'var(--accent-mint)',
                          fontSize: '14px',
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                    )}
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                      {icon}
                    </div>
                    <div
                      style={{
                        color: selected
                          ? 'var(--text-primary)'
                          : isAlternative
                          ? 'var(--accent-mint)'
                          : 'var(--text-secondary)',
                        fontWeight: 600,
                        fontSize: '15px',
                        marginBottom: '4px',
                      }}
                    >
                      {label}
                    </div>
                    <div
                      style={{
                        color: selected
                          ? 'var(--accent-orange)'
                          : isAlternative
                          ? 'rgba(77,255,210,0.7)'
                          : 'var(--text-muted)',
                        fontSize: '12px',
                      }}
                    >
                      {sub}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* city input */}
            <div style={{ marginBottom: '28px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                  letterSpacing: '0.05em',
                }}
              >
                목적지 도시
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="예: 서울, 방콕, 도쿄..."
                style={{
                  width: '100%',
                  background: 'var(--bg-elevated)',
                  border: `1px solid ${city ? 'rgba(255,107,53,0.3)' : 'var(--border)'}`,
                  borderRadius: '14px',
                  padding: '14px 18px',
                  color: 'var(--text-primary)',
                  fontSize: '15px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  boxSizing: 'border-box',
                }}
                onFocus={e =>
                  (e.currentTarget.style.borderColor =
                    'rgba(255,107,53,0.5)')
                }
                onBlur={e =>
                  (e.currentTarget.style.borderColor = city
                    ? 'rgba(255,107,53,0.3)'
                    : 'var(--border)')
                }
              />
            </div>

            {/* next step button */}
            <button
              type="button"
              disabled={!canProceed}
              onClick={() => setStep(2)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '14px',
                border: 'none',
                background: '#FF6B35',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '16px',
                cursor: canProceed ? 'pointer' : 'not-allowed',
                transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
                opacity: canProceed ? 1 : 0.4,
                boxShadow: canProceed ? '0 0 30px rgba(255,107,53,0.3)' : 'none',
              }}
              onMouseEnter={e => {
                if (!canProceed) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = '#E85A25';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 0 40px rgba(255,107,53,0.45)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = '#FF6B35';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = canProceed ? '0 0 30px rgba(255,107,53,0.3)' : 'none';
              }}
            >
              다음 단계 →
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial="enterFromRight"
            animate="center"
            exit="exitToRight"
            variants={slideVariants}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}
          >
            {/* back button */}
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                padding: '0',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  'var(--text-primary)')
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  'var(--text-secondary)')
              }
            >
              ← 뒤로
            </button>

            {/* budget slider */}
            <div>
              <label
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                  letterSpacing: '0.05em',
                }}
              >
                <span>최대 1박 예산</span>
                <span style={{ color: 'var(--accent-orange)', fontWeight: 600 }}>
                  {fmt(BUDGET_STEPS[budgetIdx])}
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={BUDGET_STEPS.length - 1}
                value={budgetIdx}
                onChange={(e) => setBudgetIdx(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  marginTop: '4px',
                }}
              >
                <span>{fmt(BUDGET_STEPS[0])}</span>
                <span>{fmt(BUDGET_STEPS[BUDGET_STEPS.length - 1])}</span>
              </div>
            </div>

            {/* dates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                  }}
                >
                  체크인
                </label>
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    colorScheme: 'dark',
                  }}
                  onFocus={e =>
                    (e.currentTarget.style.borderColor =
                      'rgba(255,107,53,0.4)')
                  }
                  onBlur={e =>
                    (e.currentTarget.style.borderColor = 'var(--border)')
                  }
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                  }}
                >
                  체크아웃
                </label>
                <input
                  type="date"
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '12px 14px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    colorScheme: 'dark',
                  }}
                  onFocus={e =>
                    (e.currentTarget.style.borderColor =
                      'rgba(255,107,53,0.4)')
                  }
                  onBlur={e =>
                    (e.currentTarget.style.borderColor = 'var(--border)')
                  }
                />
              </div>
            </div>

            {/* priority */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  marginBottom: '12px',
                  letterSpacing: '0.05em',
                }}
              >
                가장 중요한 것
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                }}
              >
                {PRIORITIES.map(({ value, icon, label }) => {
                  const selected = priority === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPriority(value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: `1px solid ${selected ? 'var(--accent-orange)' : 'var(--border)'}`,
                        background: selected
                          ? 'var(--bg-elevated)'
                          : 'var(--bg-surface)',
                        color: selected
                          ? 'var(--text-primary)'
                          : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: selected ? 600 : 400,
                        transition: 'all 0.2s',
                        boxShadow: selected
                          ? '0 0 16px rgba(255,107,53,0.12)'
                          : 'none',
                      }}
                    >
                      <span style={{ fontSize: '18px' }}>{icon}</span>
                      {label}
                      {selected && (
                        <span
                          style={{
                            marginLeft: 'auto',
                            color: 'var(--accent-mint)',
                            fontSize: '13px',
                          }}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 트립이 + submit */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Tripi mood={purposeToMood(purpose)} size="sm" animated />
              <button
                type="submit"
              disabled={!purpose || !city || !priority || loading}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '14px',
                border: 'none',
                background: '#FF6B35',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '16px',
                cursor: purpose && city && priority && !loading ? 'pointer' : 'not-allowed',
                transition: 'opacity 0.2s, transform 0.2s, box-shadow 0.2s',
                opacity: purpose && city && priority && !loading ? 1 : 0.4,
                boxShadow: purpose && city && priority && !loading ? '0 0 30px rgba(255,107,53,0.3)' : 'none',
              }}
              onMouseEnter={e => {
                if (!purpose || !city || !priority || loading) return;
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = '#E85A25';
                el.style.transform = 'translateY(-2px)';
                el.style.boxShadow = '0 0 40px rgba(255,107,53,0.45)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = '#FF6B35';
                el.style.transform = 'translateY(0)';
              }}
            >
                {loading ? 'AI 분석 중...' : '최적 호텔 추천받기 →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
