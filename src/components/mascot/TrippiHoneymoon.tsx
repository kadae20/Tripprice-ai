'use client';

export default function TrippiHoneymoon({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="트립이 신혼여행 모드"
    >
      {/* 몸통 */}
      <ellipse cx="60" cy="72" rx="34" ry="38" fill="#0A192F" />
      <ellipse cx="60" cy="78" rx="20" ry="24" fill="#1E3A5F" />

      {/* 날개 */}
      <ellipse cx="30" cy="74" rx="10" ry="18" fill="#0A192F" transform="rotate(-15, 30, 74)" />
      <ellipse cx="90" cy="74" rx="10" ry="18" fill="#0A192F" transform="rotate(15, 90, 74)" />

      {/* 귀 */}
      <ellipse cx="46" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(-10, 46, 38)" />
      <ellipse cx="74" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(10, 74, 38)" />

      {/* 머리 */}
      <ellipse cx="60" cy="50" rx="28" ry="26" fill="#0A192F" />
      <ellipse cx="60" cy="52" rx="22" ry="20" fill="#1E3A5F" opacity="0.5" />

      {/* 눈 — 하트 왼쪽 */}
      <circle cx="48" cy="50" r="10" fill="#F0F4FF" />
      <path d="M43 48 C43 44 48 44 48 48 C48 44 53 44 53 48 C53 52 48 56 48 56 C48 56 43 52 43 48Z" fill="#FF6B35" />

      {/* 눈 — 하트 오른쪽 */}
      <circle cx="72" cy="50" r="10" fill="#F0F4FF" />
      <path d="M67 48 C67 44 72 44 72 48 C72 44 77 44 77 48 C77 52 72 56 72 56 C72 56 67 52 67 48Z" fill="#FF6B35" />

      {/* 볼 빨개짐 */}
      <ellipse cx="38" cy="60" rx="9" ry="5" fill="#FF6B35" opacity="0.35" />
      <ellipse cx="82" cy="60" rx="9" ry="5" fill="#FF6B35" opacity="0.35" />

      {/* 부리 (행복한 미소) */}
      <path d="M53 63 Q60 70 67 63" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 발 */}
      <rect x="48" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
      <rect x="64" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
      <rect x="44" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="51" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="60" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="67" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />

      {/* 반지 (오른쪽 날개 앞) */}
      <g transform="translate(84, 85)">
        <circle cx="10" cy="10" r="8" stroke="#C9A84C" strokeWidth="2.5" fill="none" />
        {/* 보석 */}
        <polygon points="10,4 13,8 10,10 7,8" fill="#FF6B35" />
        <polygon points="10,4 7,8 10,10 13,8" fill="#E85A25" opacity="0.7" />
      </g>

      {/* 작은 하트 떠다니기 */}
      <path d="M16 30 C16 27 20 27 20 30 C20 27 24 27 24 30 C24 33 20 37 20 37 C20 37 16 33 16 30Z"
        fill="#FF6B35" opacity="0.6" />
      <path d="M96 24 C96 21.5 99 21.5 99 24 C99 21.5 102 21.5 102 24 C102 26.5 99 29 99 29 C99 29 96 26.5 96 24Z"
        fill="#FF6B35" opacity="0.5" />
    </svg>
  );
}
