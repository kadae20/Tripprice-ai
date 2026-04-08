'use client';

export default function TrippiSearching({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="트립이 검색 중"
    >
      {/* 몸통 (앞으로 기울임) */}
      <g transform="rotate(-5, 60, 70)">
        {/* 몸통 메인 */}
        <ellipse cx="60" cy="74" rx="34" ry="36" fill="#0A192F" />
        {/* 배 */}
        <ellipse cx="60" cy="80" rx="20" ry="22" fill="#1E3A5F" />

        {/* 날개 왼쪽 */}
        <ellipse cx="30" cy="76" rx="10" ry="18" fill="#0A192F" transform="rotate(-20, 30, 76)" />
        {/* 날개 오른쪽 (돋보기 들기) */}
        <ellipse cx="90" cy="72" rx="10" ry="18" fill="#0A192F" transform="rotate(25, 90, 72)" />

        {/* 귀 */}
        <ellipse cx="46" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(-10, 46, 38)" />
        <ellipse cx="74" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(10, 74, 38)" />

        {/* 머리 */}
        <ellipse cx="60" cy="50" rx="28" ry="26" fill="#0A192F" />
        <ellipse cx="60" cy="52" rx="22" ry="20" fill="#1E3A5F" opacity="0.5" />

        {/* 눈 흰자 — 왼쪽 크게 (집중) */}
        <circle cx="48" cy="50" r="11" fill="#F0F4FF" />
        {/* 오른쪽은 돋보기 뒤 */}
        <circle cx="72" cy="50" r="9" fill="#F0F4FF" />

        {/* 눈동자 왼쪽 (아래 집중 시선) */}
        <circle cx="49" cy="53" r="7" fill="#FF6B35" />
        <circle cx="73" cy="52" r="5" fill="#FF6B35" />

        {/* 눈 하이라이트 */}
        <circle cx="47" cy="49" r="2.5" fill="#FFF" />
        <circle cx="71" cy="48" r="2" fill="#FFF" />

        {/* 집중 눈썹 왼쪽 (V자) */}
        <path d="M40 40 L48 44" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M56 44 L48 44" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
        {/* 집중 눈썹 오른쪽 */}
        <path d="M64 44 L72 44" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M72 44 L80 40" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" />

        {/* 부리 (다문 표정) */}
        <path d="M55 60 Q60 58 65 60" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* 발 */}
        <g>
          <rect x="48" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
          <rect x="64" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
          <rect x="44" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
          <rect x="51" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
          <rect x="60" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
          <rect x="67" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
        </g>
      </g>

      {/* 돋보기 (오른쪽 날개 앞) */}
      <g transform="translate(78, 55)">
        {/* 렌즈 */}
        <circle cx="10" cy="10" r="10" stroke="#C9A84C" strokeWidth="3" fill="rgba(201,168,76,0.15)" />
        {/* 손잡이 */}
        <line x1="17" y1="17" x2="25" y2="25" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" />
        {/* 렌즈 반사 */}
        <circle cx="7" cy="7" r="2.5" fill="rgba(255,255,255,0.4)" />
      </g>
    </svg>
  );
}
