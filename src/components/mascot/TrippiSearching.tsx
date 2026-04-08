'use client';

export default function TrippiSearching({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 검색 중">

      {/* 그림자 */}
      <ellipse cx="60" cy="114" rx="22" ry="3.5" fill="#000" opacity="0.12"/>

      {/* ── 몸통 (앞으로 기울기) ── */}
      <g transform="rotate(-6, 60, 85)">
        <path d="M35 77 C32 97 42 108 60 113 C78 108 88 97 85 77 C83 61 60 57 60 57 C60 57 37 61 35 77Z" fill="#0D2040"/>
        <path d="M42 69 Q60 64 78 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
        <ellipse cx="60" cy="85" rx="17" ry="21" fill="#1A3358"/>
        <ellipse cx="60" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>
        <path d="M50 84 Q60 81 70 84" stroke="#243F72" strokeWidth="0.8" fill="none" opacity="0.5"/>

        {/* 왼쪽 날개 (자연스럽게) */}
        <path d="M37 73 C24 77 20 93 22 104 C24 110 32 113 40 110 C46 107 48 97 46 79Z" fill="#0B1E3A"/>
        <path d="M24 86 Q31 89 38 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
        <path d="M22 94 Q29 97 37 97" stroke="#162840" strokeWidth="1.3" fill="none"/>
        <path d="M23 102 Q30 105 37 105" stroke="#162840" strokeWidth="1.3" fill="none"/>

        {/* 오른쪽 날개 (돋보기 들어올림) */}
        <path d="M83 73 C94 70 100 80 98 95 C96 106 88 111 80 108 C74 105 72 95 74 79Z" fill="#0B1E3A" transform="rotate(-15, 83, 90)"/>
        <path d="M94 76 Q89 80 84 81" stroke="#162840" strokeWidth="1.3" fill="none"/>
        <path d="M96 83 Q91 87 86 88" stroke="#162840" strokeWidth="1.3" fill="none"/>

        {/* 발 */}
        <path d="M50 109 Q47 113 44 116 M50 109 Q49 114 48 118 M50 109 Q51 114 54 117 M50 109 Q47 110 44 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
        <path d="M70 109 Q67 113 64 116 M70 109 Q69 114 68 118 M70 109 Q71 114 74 117 M70 109 Q73 110 76 110" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      </g>

      {/* ── 머리 (집중 표정, 앞으로 약간 기울임) ── */}
      <g transform="rotate(-4, 60, 43)">
        {/* 귀 뿔 */}
        <path d="M39 30 C39 22 42 15 45 12 C47 15 47 22 46 29 C43 30 40 30 39 30Z" fill="#0D2040"/>
        <path d="M41 23 C42 19 44 15 45 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>
        <path d="M81 30 C81 22 78 15 75 12 C73 15 73 22 74 29 C77 30 80 30 81 30Z" fill="#0D2040"/>
        <path d="M79 23 C78 19 76 15 75 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>

        {/* 머리 */}
        <circle cx="60" cy="43" r="24" fill="#0D2040"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="#122446"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="none" stroke="#1C3560" strokeWidth="1.5"/>
        <ellipse cx="60" cy="47" rx="17" ry="15.5" fill="#172F55"/>

        {/* 집중 눈썹 — V자형 굵게 */}
        <path d="M36 35 L45 40" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round"/>
        <path d="M54 40 L45 40" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round"/>
        <path d="M66 40 L75 40" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round"/>
        <path d="M75 40 L84 35" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round"/>

        {/* 왼쪽 눈 — 크게 뜬 집중 눈 */}
        <circle cx="48" cy="44" r="12" fill="#0A1828"/>
        <circle cx="48" cy="44" r="10.5" fill="#F0F4FF"/>
        <circle cx="48" cy="44" r="8" fill="#C9A84C" opacity="0.2"/>
        <circle cx="49" cy="45" r="7" fill="#FF6B35"/>
        <circle cx="49" cy="45" r="7" fill="none" stroke="#CC4A18" strokeWidth="1.3"/>
        <circle cx="49" cy="45" r="3.5" fill="#1A0800"/>
        <circle cx="46" cy="41.5" r="2.5" fill="rgba(255,255,255,0.93)"/>
        <circle cx="51.5" cy="46" r="1" fill="rgba(255,255,255,0.5)"/>

        {/* 오른쪽 눈 — 약간 좁힌 */}
        <circle cx="72" cy="44" r="10.5" fill="#0A1828"/>
        <circle cx="72" cy="44" r="9" fill="#F0F4FF"/>
        <circle cx="72" cy="44" r="6.5" fill="#C9A84C" opacity="0.2"/>
        <circle cx="73" cy="45" r="5.5" fill="#FF6B35"/>
        <circle cx="73" cy="45" r="5.5" fill="none" stroke="#CC4A18" strokeWidth="1.1"/>
        <circle cx="73" cy="45" r="2.8" fill="#1A0800"/>
        <circle cx="70.5" cy="42" r="1.9" fill="rgba(255,255,255,0.93)"/>

        {/* 부리 (다문 표정) */}
        <path d="M56 54 C57 51 60 50 63 51 C64 51 64 54 62 58 C61 60 59 60 58 58 C56 56 56 54 56 54Z" fill="#C9A84C"/>
        <path d="M57 54 Q60 52.5 63 54" stroke="#A88830" strokeWidth="0.9" fill="none"/>
        {/* 입 굳게 다문 선 */}
        <path d="M57 57 Q60 56 63 57" stroke="#A88830" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </g>

      {/* ── 돋보기 ── */}
      <g transform="translate(78, 52)">
        {/* 렌즈 테두리 */}
        <circle cx="12" cy="12" r="12" fill="#0A1828" opacity="0.4"/>
        <circle cx="12" cy="12" r="10.5" fill="rgba(201,168,76,0.08)" stroke="#C9A84C" strokeWidth="2.8"/>
        {/* 렌즈 반사 1 */}
        <circle cx="8.5" cy="8.5" r="3" fill="rgba(255,255,255,0.3)"/>
        {/* 렌즈 반사 2 (작은) */}
        <circle cx="15" cy="16" r="1.2" fill="rgba(255,255,255,0.2)"/>
        {/* 십자 초점선 */}
        <line x1="12" y1="6" x2="12" y2="18" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
        <line x1="6" y1="12" x2="18" y2="12" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
        {/* 손잡이 */}
        <path d="M19 19 L28 28" stroke="#C9A84C" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M19 19 L28 28" stroke="#A88830" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </g>
    </svg>
  );
}
