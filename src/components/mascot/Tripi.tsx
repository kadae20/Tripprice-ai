'use client';

import { motion, AnimatePresence } from 'framer-motion';
import TrippiDefault from './TrippiDefault';
import TrippiSearching from './TrippiSearching';
import TrippiSuccess from './TrippiSuccess';
import TrippiEmpty from './TrippiEmpty';
import TrippiHoneymoon from './TrippiHoneymoon';

export type TrippiMood = 'default' | 'searching' | 'success' | 'empty' | 'honeymoon';

const SIZE_MAP = { sm: 64, md: 96, lg: 140 };

interface Props {
  mood?: TrippiMood;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

/* ─── 각 mood별 애니메이션 설정 ─── */
const IDLE_ANIM = {
  /* 몸통 숨쉬기 */
  body: {
    animate: { y: [0, -4, 0] },
    transition: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
  },
};

const BAG_ANIM = {
  animate: { rotate: [-4, 4, -4] },
  transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
};

const SEARCH_BODY_ANIM = {
  animate: { x: [-3, 3, -3] },
  transition: { repeat: Infinity, duration: 1.2, ease: 'easeInOut' },
};

const MAGNIFIER_ANIM = {
  animate: { x: [-8, 8, -8] },
  transition: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
};

const JUMP_ANIM = {
  animate: { y: [0, -18, 0] },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const STAR_ANIM = (delay: number) => ({
  animate: { opacity: [0, 1, 0.5, 1, 0] },
  transition: { repeat: Infinity, duration: 2, delay, ease: 'easeInOut' },
});

/* ─── Mood별 렌더 ─── */
function MoodSVG({ mood, px }: { mood: TrippiMood; px: number }) {
  switch (mood) {
    case 'searching': return <TrippiSearching size={px} />;
    case 'success':   return <TrippiSuccess size={px} />;
    case 'empty':     return <TrippiEmpty size={px} />;
    case 'honeymoon': return <TrippiHoneymoon size={px} />;
    default:          return <TrippiDefault size={px} />;
  }
}

/* ─── 애니메이션 래퍼 ─── */
function AnimatedTripi({ mood, px }: { mood: TrippiMood; px: number }) {
  if (mood === 'searching') {
    return (
      <motion.div
        style={{ display: 'inline-block', position: 'relative' }}
        {...SEARCH_BODY_ANIM}
      >
        {/* 돋보기 오버레이 애니메이션 */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '18%',
            right: '-5%',
            width: '30%',
            height: '30%',
          }}
          {...MAGNIFIER_ANIM}
        />
        <TrippiSearching size={px} />
      </motion.div>
    );
  }

  if (mood === 'success') {
    return (
      <motion.div style={{ display: 'inline-block', position: 'relative' }}>
        {/* 별 애니메이션 */}
        <motion.span
          style={{ position: 'absolute', top: '2%', left: '4%', fontSize: px * 0.12, color: '#C9A84C' }}
          {...STAR_ANIM(0)}
        >★</motion.span>
        <motion.span
          style={{ position: 'absolute', top: '0', right: '4%', fontSize: px * 0.1, color: '#C9A84C' }}
          {...STAR_ANIM(0.5)}
        >★</motion.span>
        <motion.span
          style={{ position: 'absolute', top: '5%', left: '42%', fontSize: px * 0.09, color: '#C9A84C' }}
          {...STAR_ANIM(1)}
        >★</motion.span>
        {/* 점프 */}
        <motion.div {...JUMP_ANIM}>
          <TrippiSuccess size={px} />
        </motion.div>
      </motion.div>
    );
  }

  /* default / honeymoon / empty — idle 숨쉬기 (눈 깜빡임은 SVG 내부 CSS로 처리) */
  return (
    <motion.div
      style={{ display: 'inline-block', position: 'relative' }}
      {...IDLE_ANIM.body}
    >
      {/* 가방 흔들림 (default만) */}
      {mood === 'default' && (
        <motion.div
          style={{
            position: 'absolute',
            bottom: '8%',
            right: '-2%',
            width: '25%',
            height: '20%',
            transformOrigin: 'top center',
          }}
          {...BAG_ANIM}
        />
      )}
      <MoodSVG mood={mood} px={px} />
    </motion.div>
  );
}

/* ─── 메인 Tripi 컴포넌트 ─── */
export default function Tripi({ mood = 'default', size = 'md', animated = false, className }: Props) {
  const px = SIZE_MAP[size];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mood}
        className={className}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ duration: 0.25 }}
        style={{ display: 'inline-block' }}
      >
        {animated ? (
          <AnimatedTripi mood={mood} px={px} />
        ) : (
          <MoodSVG mood={mood} px={px} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
