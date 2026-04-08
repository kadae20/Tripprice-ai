'use client';

export default function TrippiEmpty({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 데이터 없음">
      <style>{`
        @keyframes tripi-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          93% { transform: scaleY(0.05); }
          96% { transform: scaleY(1); }
        }
        .tripi-eye-l { animation: tripi-blink 3s infinite; transform-origin: center center; transform-box: fill-box; }
        .tripi-eye-r { animation: tripi-blink 3s infinite; transform-origin: center center; transform-box: fill-box; }
      `}</style>

      {/* 말풍선 */}
      <rect x="72" y="4" width="50" height="34" rx="10" fill="#122446"/>
      <rect x="72" y="4" width="50" height="34" rx="10" fill="none" stroke="rgba(255,107,53,0.4)" strokeWidth="1.5"/>
      {/* 말풍선 꼬리 */}
      <path d="M80 38 L86 38 L82 46Z" fill="#122446"/>
      <path d="M80 38 L82 46" stroke="rgba(255,107,53,0.4)" strokeWidth="1.2"/>
      {/* ? 문자 */}
      <text x="97" y="27" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FF6B35" fontFamily="sans-serif">?</text>

      {/* 그림자 */}
      <ellipse cx="52" cy="114" rx="22" ry="3.5" fill="#000" opacity="0.12"/>

      {/* ── 몸통 ── */}
      <path d="M27 77 C24 97 34 108 52 113 C70 108 80 97 77 77 C75 61 52 57 52 57 C52 57 29 61 27 77Z" fill="#0D2040"/>
      <path d="M34 69 Q52 64 70 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <ellipse cx="52" cy="85" rx="17" ry="21" fill="#1A3358"/>
      <ellipse cx="52" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>
      <path d="M42 84 Q52 81 62 84" stroke="#243F72" strokeWidth="0.8" fill="none" opacity="0.5"/>

      {/* ── 날개 — 으쓱 포즈 (양쪽 위로 올림) ── */}
      {/* 왼쪽 날개 (대각선 위-왼쪽) */}
      <path d="M30 70 C18 60 10 55 10 66 C10 75 16 84 24 86 C32 87 36 80 34 70Z" fill="#0B1E3A"/>
      <path d="M12 67 Q18 71 26 73" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M11 74 Q17 78 24 79" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M13 80 Q18 83 24 84" stroke="#162840" strokeWidth="1.3" fill="none"/>
      {/* 왼쪽 날개 끝 깃털 */}
      <path d="M10 58 C8 53 11 50 13 52 C11 48 14 46 16 49 C14 45 18 44 19 47 C17 43 21 42 22 46" stroke="#0B1E3A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* 오른쪽 날개 (대각선 위-오른쪽) */}
      <path d="M74 70 C86 60 94 55 94 66 C94 75 88 84 80 86 C72 87 68 80 70 70Z" fill="#0B1E3A"/>
      <path d="M92 67 Q86 71 78 73" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M93 74 Q87 78 80 79" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M91 80 Q86 83 80 84" stroke="#162840" strokeWidth="1.3" fill="none"/>
      {/* 오른쪽 날개 끝 깃털 */}
      <path d="M94 58 C96 53 93 50 91 52 C93 48 90 46 88 49 C90 45 86 44 85 47 C87 43 83 42 82 46" stroke="#0B1E3A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* 발 */}
      <path d="M42 109 Q39 113 36 116 M42 109 Q41 114 40 118 M42 109 Q43 114 46 117 M42 109 Q39 110 36 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M62 109 Q59 113 56 116 M62 109 Q61 114 60 118 M62 109 Q63 114 66 117 M62 109 Q65 110 68 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>

      {/* ── 머리 ── */}
      <g>
        {/* 귀 뿔 */}
        <path d="M31 30 C31 22 34 15 37 12 C39 15 39 22 38 29 C35 30 32 30 31 30Z" fill="#0D2040"/>
        <path d="M33 23 C34 19 36 15 37 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>
        <path d="M73 30 C73 22 70 15 67 12 C65 15 65 22 66 29 C69 30 72 30 73 30Z" fill="#0D2040"/>
        <path d="M71 23 C70 19 68 15 67 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>

        <circle cx="52" cy="43" r="24" fill="#0D2040"/>
        <ellipse cx="52" cy="46" rx="21" ry="19.5" fill="#122446"/>
        <ellipse cx="52" cy="46" rx="21" ry="19.5" fill="none" stroke="#1C3560" strokeWidth="1.5"/>
        <ellipse cx="52" cy="47" rx="17" ry="15.5" fill="#172F55"/>

        {/* 당황 눈썹 — 위로 올라간 아치형 */}
        <path d="M33 36 Q40 28 47 34" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M57 34 Q64 28 71 36" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none"/>

        {/* 왼쪽 눈 */}
        <g className="tripi-eye-l">
          <circle cx="40" cy="43" r="11.5" fill="#0A1828"/>
          <circle cx="40" cy="43" r="10" fill="#F0F4FF"/>
          <circle cx="40" cy="43" r="7.5" fill="#C9A84C" opacity="0.22"/>
          <circle cx="41" cy="44" r="6.5" fill="#FF6B35"/>
          <circle cx="41" cy="44" r="6.5" fill="none" stroke="#CC4A18" strokeWidth="1.2"/>
          <circle cx="41" cy="44" r="3.2" fill="#1A0800"/>
          <circle cx="38.5" cy="41" r="2.3" fill="rgba(255,255,255,0.93)"/>
          <circle cx="43" cy="45.5" r="0.9" fill="rgba(255,255,255,0.5)"/>
        </g>

        {/* 오른쪽 눈 */}
        <g className="tripi-eye-r">
          <circle cx="64" cy="43" r="11.5" fill="#0A1828"/>
          <circle cx="64" cy="43" r="10" fill="#F0F4FF"/>
          <circle cx="64" cy="43" r="7.5" fill="#C9A84C" opacity="0.22"/>
          <circle cx="65" cy="44" r="6.5" fill="#FF6B35"/>
          <circle cx="65" cy="44" r="6.5" fill="none" stroke="#CC4A18" strokeWidth="1.2"/>
          <circle cx="65" cy="44" r="3.2" fill="#1A0800"/>
          <circle cx="62.5" cy="41" r="2.3" fill="rgba(255,255,255,0.93)"/>
          <circle cx="67" cy="45.5" r="0.9" fill="rgba(255,255,255,0.5)"/>
        </g>

        {/* 부리 — 당황 (아래로 처진) */}
        <path d="M48 53 C49 50 52 49 55 50 C56 50 56 53 54 57 C53 59 51 59 50 57 C48 55 48 53 48 53Z" fill="#C9A84C"/>
        <path d="M49 53 Q52 51.5 55 53" stroke="#A88830" strokeWidth="0.9" fill="none"/>
        <path d="M48 58 Q52 55 56 58" stroke="#A88830" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* 처진 입 꼬리 */}
        <path d="M47 60 Q48 62 50 61" stroke="#A88830" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        <path d="M57 60 Q56 62 54 61" stroke="#A88830" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </g>
    </svg>
  );
}
