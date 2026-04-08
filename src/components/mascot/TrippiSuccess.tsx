'use client';

export default function TrippiSuccess({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="트립이 추천 완료"
    >
      {/* 별 3개 */}
      <text x="8" y="22" fontSize="14" fill="#C9A84C">★</text>
      <text x="96" y="18" fontSize="12" fill="#C9A84C">★</text>
      <text x="52" y="10" fontSize="10" fill="#C9A84C">★</text>

      {/* 몸통 */}
      <ellipse cx="60" cy="72" rx="34" ry="38" fill="#0A192F" />
      <ellipse cx="60" cy="78" rx="20" ry="24" fill="#1E3A5F" />

      {/* 날개 왼쪽 — 엄지척 올림 */}
      <ellipse cx="28" cy="66" rx="10" ry="18" fill="#0A192F" transform="rotate(-40, 28, 66)" />
      {/* 엄지 */}
      <ellipse cx="20" cy="54" rx="5" ry="7" fill="#0A192F" />
      <ellipse cx="20" cy="54" rx="3.5" ry="5.5" fill="#1E3A5F" />
      <rect x="17" y="60" width="6" height="8" rx="3" fill="#0A192F" />

      {/* 날개 오른쪽 */}
      <ellipse cx="92" cy="74" rx="10" ry="18" fill="#0A192F" transform="rotate(15, 92, 74)" />

      {/* 귀 */}
      <ellipse cx="46" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(-10, 46, 38)" />
      <ellipse cx="74" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(10, 74, 38)" />

      {/* 머리 */}
      <ellipse cx="60" cy="50" rx="28" ry="26" fill="#0A192F" />
      <ellipse cx="60" cy="52" rx="22" ry="20" fill="#1E3A5F" opacity="0.5" />

      {/* 눈 — 왼쪽 정상, 오른쪽 윙크 */}
      <circle cx="48" cy="50" r="10" fill="#F0F4FF" />
      <circle cx="49" cy="51" r="6" fill="#FF6B35" />
      <circle cx="47" cy="48" r="2" fill="#FFF" />

      {/* 윙크 오른쪽 */}
      <path d="M63 50 Q72 46 81 50" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M65 51 Q72 55 79 51" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* 볼 홍조 왼쪽 */}
      <ellipse cx="40" cy="58" rx="7" ry="4" fill="#FF6B35" opacity="0.2" />
      {/* 볼 홍조 오른쪽 */}
      <ellipse cx="80" cy="58" rx="7" ry="4" fill="#FF6B35" opacity="0.2" />

      {/* 부리 (활짝 웃음) */}
      <path d="M54 61 Q60 68 66 61" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 발 */}
      <rect x="48" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
      <rect x="64" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
      <rect x="44" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="51" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="60" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="67" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
    </svg>
  );
}
