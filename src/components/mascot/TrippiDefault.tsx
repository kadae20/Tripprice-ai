'use client';

// 기본 표정: 동그랗고 반짝이는 정상 눈, 살짝 기울어진 머리, 여행가방
export default function TrippiDefault({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 기본">
      <style>{`
        @keyframes tripi-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.05); }
          96% { transform: scaleY(1); }
        }
        .tripi-eye-l { animation: tripi-blink 3s infinite; transform-origin: center center; transform-box: fill-box; }
        .tripi-eye-r { animation: tripi-blink 3s infinite; transform-origin: center center; transform-box: fill-box; }
      `}</style>

      <ellipse cx="58" cy="114" rx="22" ry="3.5" fill="#000" opacity="0.12"/>

      {/* 몸통 */}
      <path d="M35 77 C32 97 42 108 60 113 C78 108 88 97 85 77 C83 61 60 57 60 57 C60 57 37 61 35 77Z" fill="#0D2040"/>
      <path d="M42 69 Q60 64 78 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <path d="M39 78 Q60 72 81 78" stroke="#162D52" strokeWidth="1" fill="none" opacity="0.35"/>
      <ellipse cx="60" cy="85" rx="17" ry="21" fill="#1A3358"/>
      <ellipse cx="60" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>
      <path d="M50 84 Q60 81 70 84" stroke="#243F72" strokeWidth="0.8" fill="none" opacity="0.5"/>

      {/* 왼쪽 날개 */}
      <path d="M37 73 C24 77 20 93 22 104 C24 110 32 113 40 110 C46 107 48 97 46 79Z" fill="#0B1E3A"/>
      <path d="M24 86 Q31 89 38 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M22 94 Q29 97 37 97" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M23 102 Q30 105 37 105" stroke="#162840" strokeWidth="1.3" fill="none"/>

      {/* 오른쪽 날개 */}
      <path d="M83 73 C96 77 100 93 98 104 C96 110 88 113 80 110 C74 107 72 97 74 79Z" fill="#0B1E3A"/>
      <path d="M96 86 Q89 89 82 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M98 94 Q91 97 83 97" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M97 102 Q90 105 83 105" stroke="#162840" strokeWidth="1.3" fill="none"/>

      {/* 타론 발 */}
      <path d="M50 109 Q47 113 44 116 M50 109 Q49 114 48 118 M50 109 Q51 114 54 117 M50 109 Q47 110 44 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M70 109 Q67 113 64 116 M70 109 Q69 114 68 118 M70 109 Q71 114 74 117 M70 109 Q73 110 76 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>

      {/* 머리 — 7도 기울임 */}
      <g transform="rotate(7, 60, 43)">
        <path d="M39 30 C39 22 42 15 45 12 C47 15 47 22 46 29 C43 30 40 30 39 30Z" fill="#0D2040"/>
        <path d="M41 23 C42 19 44 15 45 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>
        <path d="M81 30 C81 22 78 15 75 12 C73 15 73 22 74 29 C77 30 80 30 81 30Z" fill="#0D2040"/>
        <path d="M79 23 C78 19 76 15 75 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>
        <circle cx="60" cy="43" r="24" fill="#0D2040"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="#122446"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="none" stroke="#1C3560" strokeWidth="1.5"/>
        <ellipse cx="60" cy="47" rx="17" ry="15.5" fill="#172F55"/>

        {/* 눈썹 — 호기심 살짝 올라감 */}
        <path d="M37 33 Q42 29 48 32" stroke="#4A7AAF" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <path d="M72 32 Q78 29 83 33" stroke="#4A7AAF" strokeWidth="2.2" strokeLinecap="round" fill="none"/>

        {/* 왼쪽 눈 — 정상 동그란 눈 */}
        <g className="tripi-eye-l">
          <circle cx="48" cy="42" r="11.5" fill="#0A1828"/>
          <circle cx="48" cy="42" r="10" fill="#F0F4FF"/>
          <circle cx="48" cy="42" r="7.5" fill="#C9A84C" opacity="0.2"/>
          <circle cx="49" cy="43" r="6.5" fill="#FF6B35"/>
          <circle cx="49" cy="43" r="6.5" fill="none" stroke="#CC4A18" strokeWidth="1.2"/>
          <circle cx="49" cy="43" r="3.2" fill="#1A0800"/>
          <circle cx="46" cy="40" r="2.5" fill="rgba(255,255,255,0.95)"/>
          <circle cx="51" cy="44.5" r="1" fill="rgba(255,255,255,0.55)"/>
          {/* 반짝임 별 */}
          <circle cx="52.5" cy="39.5" r="0.8" fill="rgba(255,255,255,0.7)"/>
        </g>

        {/* 오른쪽 눈 — 정상 동그란 눈 */}
        <g className="tripi-eye-r">
          <circle cx="72" cy="42" r="11.5" fill="#0A1828"/>
          <circle cx="72" cy="42" r="10" fill="#F0F4FF"/>
          <circle cx="72" cy="42" r="7.5" fill="#C9A84C" opacity="0.2"/>
          <circle cx="73" cy="43" r="6.5" fill="#FF6B35"/>
          <circle cx="73" cy="43" r="6.5" fill="none" stroke="#CC4A18" strokeWidth="1.2"/>
          <circle cx="73" cy="43" r="3.2" fill="#1A0800"/>
          <circle cx="70" cy="40" r="2.5" fill="rgba(255,255,255,0.95)"/>
          <circle cx="75" cy="44.5" r="1" fill="rgba(255,255,255,0.55)"/>
          <circle cx="76.5" cy="39.5" r="0.8" fill="rgba(255,255,255,0.7)"/>
        </g>

        {/* 부리 — 살짝 미소 */}
        <path d="M56 53 C57 50 60 49 63 50 C64 50 64 53 62 57 C61 59 59 59 58 57 C56 55 56 53 56 53Z" fill="#C9A84C"/>
        <path d="M57 53 Q60 51.5 63 53" stroke="#A88830" strokeWidth="0.9" fill="none"/>
        <path d="M57 57 Q60 59 63 57" stroke="#A88830" strokeWidth="1" strokeLinecap="round" fill="none"/>
      </g>

      {/* 여행 가방 */}
      <g transform="translate(78, 75)">
        <path d="M5 2 C5 -2 9 -4 11 -4 C13 -4 17 -2 17 2" stroke="#E85A25" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <rect x="1" y="3" width="20" height="15" rx="3.5" fill="#FF6B35"/>
        <rect x="1" y="10" width="20" height="2.5" fill="#E85A25"/>
        <line x1="11" y1="3" x2="11" y2="18" stroke="#E85A25" strokeWidth="1" opacity="0.4"/>
        <rect x="8.5" y="8" width="5" height="6" rx="1.5" fill="#C9A84C"/>
        <rect x="9.5" y="9" width="3" height="2" rx="0.5" fill="#A88830"/>
        <circle cx="4" cy="6" r="1.2" fill="#E85A25"/>
        <circle cx="4" cy="15" r="1.2" fill="#E85A25"/>
      </g>
    </svg>
  );
}
