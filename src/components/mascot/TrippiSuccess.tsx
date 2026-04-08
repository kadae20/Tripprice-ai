'use client';

export default function TrippiSuccess({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 추천 완료">

      {/* 별 3개 (5각별 path) */}
      <path d="M12 18 L13.5 14 L15 18 L19 18 L16 20.5 L17 24.5 L13.5 22 L10 24.5 L11 20.5 L8 18Z" fill="#C9A84C" opacity="0.9"/>
      <path d="M104 14 L105.2 10.5 L106.4 14 L110 14 L107.2 16.2 L108.2 19.8 L105.2 17.5 L102.2 19.8 L103.2 16.2 L100.4 14Z" fill="#C9A84C" opacity="0.8"/>
      <path d="M58 8 L59 5 L60 8 L63 8 L60.5 10 L61.5 13 L59 11.5 L56.5 13 L57.5 10 L55 8Z" fill="#C9A84C" opacity="0.7"/>

      {/* 그림자 */}
      <ellipse cx="60" cy="114" rx="22" ry="3.5" fill="#000" opacity="0.12"/>

      {/* ── 몸통 ── */}
      <path d="M35 77 C32 97 42 108 60 113 C78 108 88 97 85 77 C83 61 60 57 60 57 C60 57 37 61 35 77Z" fill="#0D2040"/>
      <path d="M42 69 Q60 64 78 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <ellipse cx="60" cy="85" rx="17" ry="21" fill="#1A3358"/>
      <ellipse cx="60" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>
      <path d="M50 84 Q60 81 70 84" stroke="#243F72" strokeWidth="0.8" fill="none" opacity="0.5"/>

      {/* ── 왼쪽 날개 (엄지척 — 위로) ── */}
      <path d="M37 73 C26 65 18 68 16 78 C14 88 20 98 30 100 C38 101 44 94 44 80Z" fill="#0B1E3A"/>
      <path d="M20 80 Q26 82 34 81" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M18 87 Q24 90 32 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M19 94 Q25 97 32 96" stroke="#162840" strokeWidth="1.3" fill="none"/>
      {/* 엄지 모양 */}
      <path d="M16 68 C14 61 17 54 22 54 C25 54 27 57 26 62 C28 59 31 58 32 61 C33 58 36 57 37 60 C38 57 41 57 41 61 C43 58 45 59 44 63 C44 68 40 73 36 75 C30 76 22 74 18 71 C16 70 16 68 16 68Z" fill="#0D2040"/>
      <path d="M20 60 C20 56 22 54 25 54" stroke="#162840" strokeWidth="1" fill="none"/>
      {/* 엄지 손톱 */}
      <ellipse cx="19" cy="64" rx="2" ry="4" fill="#122440" transform="rotate(-10, 19, 64)"/>

      {/* ── 오른쪽 날개 ── */}
      <path d="M83 73 C96 77 100 93 98 104 C96 110 88 113 80 110 C74 107 72 97 74 79Z" fill="#0B1E3A"/>
      <path d="M96 86 Q89 89 82 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M98 94 Q91 97 83 97" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M97 102 Q90 105 83 105" stroke="#162840" strokeWidth="1.3" fill="none"/>

      {/* 발 */}
      <path d="M50 109 Q47 113 44 116 M50 109 Q49 114 48 118 M50 109 Q51 114 54 117 M50 109 Q47 110 44 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M70 109 Q67 113 64 116 M70 109 Q69 114 68 118 M70 109 Q71 114 74 117 M70 109 Q73 110 76 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>

      {/* ── 머리 ── */}
      <g>
        {/* 귀 뿔 */}
        <path d="M39 30 C39 22 42 15 45 12 C47 15 47 22 46 29 C43 30 40 30 39 30Z" fill="#0D2040"/>
        <path d="M41 23 C42 19 44 15 45 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>
        <path d="M81 30 C81 22 78 15 75 12 C73 15 73 22 74 29 C77 30 80 30 81 30Z" fill="#0D2040"/>
        <path d="M79 23 C78 19 76 15 75 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>

        <circle cx="60" cy="43" r="24" fill="#0D2040"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="#122446"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="none" stroke="#1C3560" strokeWidth="1.5"/>
        <ellipse cx="60" cy="47" rx="17" ry="15.5" fill="#172F55"/>

        {/* 볼 홍조 */}
        <ellipse cx="38" cy="54" rx="8" ry="5" fill="#FF6B35" opacity="0.18"/>
        <ellipse cx="82" cy="54" rx="8" ry="5" fill="#FF6B35" opacity="0.18"/>

        {/* 왼쪽 눈 — 정상 */}
        <circle cx="48" cy="42" r="11.5" fill="#0A1828"/>
        <circle cx="48" cy="42" r="10" fill="#F0F4FF"/>
        <circle cx="48" cy="42" r="7.5" fill="#C9A84C" opacity="0.22"/>
        <circle cx="49" cy="43" r="6.5" fill="#FF6B35"/>
        <circle cx="49" cy="43" r="6.5" fill="none" stroke="#CC4A18" strokeWidth="1.2"/>
        <circle cx="49" cy="43" r="3.2" fill="#1A0800"/>
        <circle cx="46.5" cy="40" r="2.3" fill="rgba(255,255,255,0.93)"/>
        <circle cx="51" cy="44.5" r="0.9" fill="rgba(255,255,255,0.5)"/>

        {/* 오른쪽 눈 — 윙크 */}
        <circle cx="72" cy="42" r="11.5" fill="#0A1828"/>
        <circle cx="72" cy="42" r="10" fill="#F0F4FF"/>
        {/* 윙크 닫힌 눈 */}
        <path d="M63 41 Q72 36 81 41" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <path d="M64 43 Q72 48 80 43" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.4"/>
        {/* 윙크 속눈썹 */}
        <path d="M65 40 L64 37" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M72 38 L72 35" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M79 40 L80 37" stroke="#FF6B35" strokeWidth="1.5" strokeLinecap="round"/>

        {/* 웃는 부리 */}
        <path d="M56 53 C57 50 60 49 63 50 C64 50 64 53 62 58 C61 60 59 60 58 58 C56 55 56 53 56 53Z" fill="#C9A84C"/>
        <path d="M57 53 Q60 51.5 63 53" stroke="#A88830" strokeWidth="0.9" fill="none"/>
        {/* 활짝 웃음 (부리 아래 곡선) */}
        <path d="M55 60 Q60 66 65 60" stroke="#A88830" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      </g>
    </svg>
  );
}
