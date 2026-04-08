'use client';

export default function TrippiDefault({ size = 120 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="트립이 기본"
    >
      {/* 몸통 (살짝 우측 기울임) */}
      <g transform="rotate(8, 60, 70)">
        {/* 몸통 메인 */}
        <ellipse cx="60" cy="72" rx="34" ry="38" fill="#0A192F" />
        {/* 배 부분 */}
        <ellipse cx="60" cy="78" rx="20" ry="24" fill="#1E3A5F" />

        {/* 날개 왼쪽 */}
        <ellipse cx="30" cy="74" rx="10" ry="18" fill="#0A192F" transform="rotate(-15, 30, 74)" />
        {/* 날개 오른쪽 */}
        <ellipse cx="90" cy="74" rx="10" ry="18" fill="#0A192F" transform="rotate(15, 90, 74)" />

        {/* 귀 (뿔깃) 왼쪽 */}
        <ellipse cx="46" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(-10, 46, 38)" />
        {/* 귀 (뿔깃) 오른쪽 */}
        <ellipse cx="74" cy="38" rx="6" ry="10" fill="#0A192F" transform="rotate(10, 74, 38)" />

        {/* 머리 */}
        <ellipse cx="60" cy="50" rx="28" ry="26" fill="#0A192F" />

        {/* 얼굴 흰 테두리 */}
        <ellipse cx="60" cy="52" rx="22" ry="20" fill="#1E3A5F" opacity="0.5" />

        {/* 눈 흰자 왼쪽 */}
        <circle cx="48" cy="50" r="10" fill="#F0F4FF" />
        {/* 눈 흰자 오른쪽 */}
        <circle cx="72" cy="50" r="10" fill="#F0F4FF" />

        {/* 눈동자 왼쪽 */}
        <circle cx="49" cy="51" r="6" fill="#FF6B35" />
        {/* 눈동자 오른쪽 */}
        <circle cx="73" cy="51" r="6" fill="#FF6B35" />

        {/* 눈 하이라이트 왼쪽 */}
        <circle cx="51" cy="48" r="2" fill="#FFF" />
        {/* 눈 하이라이트 오른쪽 */}
        <circle cx="75" cy="48" r="2" fill="#FFF" />

        {/* 부리 */}
        <polygon points="60,57 55,63 65,63" fill="#C9A84C" />

        {/* 발 */}
        <g>
          <rect x="48" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
          <rect x="64" y="106" width="8" height="5" rx="2" fill="#C9A84C" />
          {/* 발가락 */}
          <rect x="44" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
          <rect x="51" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
          <rect x="60" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
          <rect x="67" y="109" width="5" height="3" rx="1.5" fill="#C9A84C" />
        </g>
      </g>

      {/* 여행 가방 (오른쪽 날개 앞) */}
      <g transform="translate(80, 80)">
        {/* 가방 몸통 */}
        <rect x="0" y="4" width="20" height="15" rx="3" fill="#FF6B35" />
        {/* 가방 손잡이 */}
        <rect x="5" y="1" width="10" height="5" rx="2" fill="none" stroke="#FF6B35" strokeWidth="2" />
        {/* 가방 버클 */}
        <rect x="0" y="10" width="20" height="2" fill="#E85A25" />
        {/* 가방 잠금 */}
        <rect x="8" y="8" width="4" height="6" rx="1" fill="#C9A84C" />
      </g>
    </svg>
  );
}
