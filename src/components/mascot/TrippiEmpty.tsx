'use client';

export default function TrippiEmpty({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 130 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="트립이 데이터 없음"
    >
      <style>{`
        @keyframes tripi-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.05); }
          96% { transform: scaleY(1); }
        }
        .tripi-eye {
          animation: tripi-blink 3s infinite;
          transform-origin: center center;
          transform-box: fill-box;
        }
      `}</style>
      {/* 말풍선 */}
      <rect x="70" y="4" width="54" height="30" rx="8" fill="#1E3A5F" stroke="rgba(255,107,53,0.3)" strokeWidth="1.5" />
      <polygon points="78,34 86,34 82,42" fill="#1E3A5F" />
      <text x="97" y="24" textAnchor="middle" fontSize="18" fill="#FF6B35">?</text>

      {/* 몸통 */}
      <ellipse cx="52" cy="74" rx="34" ry="36" fill="#0A192F" />
      <ellipse cx="52" cy="80" rx="20" ry="22" fill="#1E3A5F" />

      {/* 날개 — 으쓱 (위로 올라감) */}
      <ellipse cx="22" cy="60" rx="10" ry="18" fill="#0A192F" transform="rotate(-50, 22, 60)" />
      <ellipse cx="82" cy="60" rx="10" ry="18" fill="#0A192F" transform="rotate(50, 82, 60)" />

      {/* 귀 */}
      <ellipse cx="38" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(-10, 38, 38)" />
      <ellipse cx="66" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(10, 66, 38)" />

      {/* 머리 */}
      <ellipse cx="52" cy="50" rx="28" ry="26" fill="#0A192F" />
      <ellipse cx="52" cy="52" rx="22" ry="20" fill="#1E3A5F" opacity="0.5" />

      {/* 눈 흰자 */}
      <circle className="tripi-eye" cx="40" cy="48" r="10" fill="#F0F4FF" />
      <circle className="tripi-eye" cx="64" cy="48" r="10" fill="#F0F4FF" />

      {/* 눈동자 */}
      <circle cx="41" cy="49" r="6" fill="#FF6B35" />
      <circle cx="65" cy="49" r="6" fill="#FF6B35" />

      {/* 눈 하이라이트 */}
      <circle cx="39" cy="46" r="2" fill="#FFF" />
      <circle cx="63" cy="46" r="2" fill="#FFF" />

      {/* 눈썹 올라감 (당황) */}
      <path d="M32 36 Q40 31 48 36" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M56 36 Q64 31 72 36" stroke="#FF6B35" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 부리 (ㅜ모양 당황) */}
      <path d="M46 59 Q52 55 58 59" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* 발 */}
      <rect x="40" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
      <rect x="56" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
      <rect x="36" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="43" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="52" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
      <rect x="59" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
    </svg>
  );
}
