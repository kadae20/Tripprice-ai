'use client';

export default function TrippiHoneymoon({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 신혼여행 모드">

      {/* 떠다니는 하트들 */}
      <path d="M12 26 C12 22.5 16 21 18 24 C20 21 24 22.5 24 26 C24 30 18 35 18 35 C18 35 12 30 12 26Z" fill="#FF6B35" opacity="0.65"/>
      <path d="M96 20 C96 17.5 99 16.5 100.5 19 C102 16.5 105 17.5 105 20 C105 23 100.5 27 100.5 27 C100.5 27 96 23 96 20Z" fill="#FF6B35" opacity="0.55"/>
      <path d="M106 38 C106 36.5 108 36 108.8 37.5 C109.6 36 111.6 36.5 111.6 38 C111.6 40 108.8 42.5 108.8 42.5 C108.8 42.5 106 40 106 38Z" fill="#FF6B35" opacity="0.4"/>

      {/* 그림자 */}
      <ellipse cx="60" cy="114" rx="22" ry="3.5" fill="#000" opacity="0.12"/>

      {/* ── 몸통 ── */}
      <path d="M35 77 C32 97 42 108 60 113 C78 108 88 97 85 77 C83 61 60 57 60 57 C60 57 37 61 35 77Z" fill="#0D2040"/>
      <path d="M42 69 Q60 64 78 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <ellipse cx="60" cy="85" rx="17" ry="21" fill="#1A3358"/>
      <ellipse cx="60" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>
      <path d="M50 84 Q60 81 70 84" stroke="#243F72" strokeWidth="0.8" fill="none" opacity="0.5"/>

      {/* ── 왼쪽 날개 ── */}
      <path d="M37 73 C24 77 20 93 22 104 C24 110 32 113 40 110 C46 107 48 97 46 79Z" fill="#0B1E3A"/>
      <path d="M24 86 Q31 89 38 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M22 94 Q29 97 37 97" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M23 102 Q30 105 37 105" stroke="#162840" strokeWidth="1.3" fill="none"/>

      {/* ── 오른쪽 날개 (반지 들고 있음) ── */}
      <path d="M83 73 C96 77 100 93 98 104 C96 110 88 113 80 110 C74 107 72 97 74 79Z" fill="#0B1E3A"/>
      <path d="M96 86 Q89 89 82 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M98 94 Q91 97 83 97" stroke="#162840" strokeWidth="1.3" fill="none"/>

      {/* 발 */}
      <path d="M50 109 Q47 113 44 116 M50 109 Q49 114 48 118 M50 109 Q51 114 54 117 M50 109 Q47 110 44 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M70 109 Q67 113 64 116 M70 109 Q69 114 68 118 M70 109 Q71 114 74 117 M70 109 Q73 110 76 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>

      {/* ── 반지 (오른쪽 날개 끝) ── */}
      <g transform="translate(82, 80)">
        <circle cx="10" cy="10" r="9" stroke="#C9A84C" strokeWidth="3" fill="none"/>
        <circle cx="10" cy="10" r="9" stroke="#A88830" strokeWidth="1" fill="none" opacity="0.4"/>
        {/* 다이아몬드 보석 */}
        <path d="M10 1 L14 6 L10 9 L6 6Z" fill="#FF6B35"/>
        <path d="M10 1 L6 6 L10 9 L14 6Z" fill="#E85A25" opacity="0.7"/>
        <path d="M6 6 L10 9 L14 6" stroke="#C9A84C" strokeWidth="0.8" fill="none"/>
        {/* 보석 반짝임 */}
        <line x1="10" y1="-1" x2="10" y2="1" stroke="#FFF" strokeWidth="1.2" opacity="0.8"/>
        <line x1="14" y1="1" x2="12.5" y2="2.5" stroke="#FFF" strokeWidth="1.2" opacity="0.6"/>
      </g>

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

        {/* 볼 홍조 (진하게) */}
        <ellipse cx="36" cy="54" rx="9" ry="6" fill="#FF6B35" opacity="0.28"/>
        <ellipse cx="84" cy="54" rx="9" ry="6" fill="#FF6B35" opacity="0.28"/>
        {/* 볼 홍조 안쪽 */}
        <ellipse cx="36" cy="54" rx="5" ry="3.5" fill="#FF6B35" opacity="0.15"/>
        <ellipse cx="84" cy="54" rx="5" ry="3.5" fill="#FF6B35" opacity="0.15"/>

        {/* ── 왼쪽 눈 — 하트 ── */}
        <circle cx="48" cy="42" r="11.5" fill="#0A1828"/>
        <circle cx="48" cy="42" r="10" fill="#F0F4FF"/>
        {/* 하트 path */}
        <path d="M42 41 C42 37.5 45 36 47 38.5 C49 36 52 37.5 52 41 C52 45 47 50 47 50 C47 50 42 45 42 41Z" fill="#FF6B35"/>
        {/* 하트 하이라이트 */}
        <path d="M44 39.5 C44 38 45.5 37 47 38.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>

        {/* ── 오른쪽 눈 — 하트 ── */}
        <circle cx="72" cy="42" r="11.5" fill="#0A1828"/>
        <circle cx="72" cy="42" r="10" fill="#F0F4FF"/>
        <path d="M66 41 C66 37.5 69 36 71 38.5 C73 36 76 37.5 76 41 C76 45 71 50 71 50 C71 50 66 45 66 41Z" fill="#FF6B35"/>
        <path d="M68 39.5 C68 38 69.5 37 71 38.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" strokeLinecap="round" fill="none"/>

        {/* 부리 (행복한 큰 미소) */}
        <path d="M56 53 C57 50 60 49 63 50 C64 50 64 53 62 58 C61 60 59 60 58 58 C56 55 56 53 56 53Z" fill="#C9A84C"/>
        <path d="M57 53 Q60 51.5 63 53" stroke="#A88830" strokeWidth="0.9" fill="none"/>
        {/* 큰 미소 */}
        <path d="M54 60 Q60 68 66 60" stroke="#A88830" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* 작은 볼 보조개 */}
        <path d="M53 58 Q54 60 55 59" stroke="#FF6B35" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M67 58 Q66 60 65 59" stroke="#FF6B35" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5"/>
      </g>
    </svg>
  );
}
