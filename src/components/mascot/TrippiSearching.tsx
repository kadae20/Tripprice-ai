'use client';

// 검색 중 표정: 왼쪽 왕눈(크게 부릅뜸) + 오른쪽 찡그린 눈 — 비대칭이 핵심
export default function TrippiSearching({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 검색 중">

      <ellipse cx="60" cy="114" rx="22" ry="3.5" fill="#000" opacity="0.12"/>

      {/* 몸통 — 앞으로 기울기 */}
      <g transform="rotate(-5, 60, 90)">
        <path d="M35 77 C32 97 42 108 60 113 C78 108 88 97 85 77 C83 61 60 57 60 57 C60 57 37 61 35 77Z" fill="#0D2040"/>
        <path d="M42 69 Q60 64 78 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
        <ellipse cx="60" cy="85" rx="17" ry="21" fill="#1A3358"/>
        <ellipse cx="60" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>

        {/* 왼쪽 날개 */}
        <path d="M37 73 C24 77 20 93 22 104 C24 110 32 113 40 110 C46 107 48 97 46 79Z" fill="#0B1E3A"/>
        <path d="M24 86 Q31 89 38 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
        <path d="M22 94 Q29 97 37 97" stroke="#162840" strokeWidth="1.3" fill="none"/>
        <path d="M23 102 Q30 105 37 105" stroke="#162840" strokeWidth="1.3" fill="none"/>

        {/* 오른쪽 날개 (돋보기 쪽으로 들어올림) */}
        <path d="M83 73 C94 67 102 72 102 83 C102 94 96 104 88 108 C81 111 74 106 74 96 C74 84 80 74 83 73Z" fill="#0B1E3A"/>
        <path d="M98 79 Q93 82 87 83" stroke="#162840" strokeWidth="1.3" fill="none"/>
        <path d="M101 87 Q96 90 90 91" stroke="#162840" strokeWidth="1.3" fill="none"/>

        {/* 발 */}
        <path d="M50 109 Q47 113 44 116 M50 109 Q49 114 48 118 M50 109 Q51 114 54 117" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
        <path d="M70 109 Q67 113 64 116 M70 109 Q69 114 68 118 M70 109 Q71 114 74 117" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      </g>

      {/* 머리 */}
      <g transform="rotate(-3, 60, 43)">
        <path d="M39 30 C39 22 42 15 45 12 C47 15 47 22 46 29 C43 30 40 30 39 30Z" fill="#0D2040"/>
        <path d="M81 30 C81 22 78 15 75 12 C73 15 73 22 74 29 C77 30 80 30 81 30Z" fill="#0D2040"/>
        <circle cx="60" cy="43" r="24" fill="#0D2040"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="#122446"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="none" stroke="#1C3560" strokeWidth="1.5"/>
        <ellipse cx="60" cy="47" rx="17" ry="15.5" fill="#172F55"/>

        {/* 눈썹 — 강한 V자 (집중/화남) */}
        <path d="M33 34 L45 40" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M55 40 L45 34" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M65 34 L75 40" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M85 34 L75 40" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round"/>

        {/* ★ 왼쪽 눈 — 크게 부릅뜬 왕눈 (r=13) */}
        <circle cx="46" cy="43" r="14" fill="#0A1828"/>
        <circle cx="46" cy="43" r="12.5" fill="#F0F4FF"/>
        <circle cx="46" cy="43" r="9.5" fill="#C9A84C" opacity="0.2"/>
        <circle cx="47" cy="44" r="8.5" fill="#FF6B35"/>
        <circle cx="47" cy="44" r="8.5" fill="none" stroke="#CC4A18" strokeWidth="1.5"/>
        {/* 크게 열린 동공 */}
        <circle cx="47" cy="44" r="5" fill="#0D0500"/>
        <circle cx="44" cy="41" r="3" fill="rgba(255,255,255,0.95)"/>
        <circle cx="50" cy="46" r="1.2" fill="rgba(255,255,255,0.6)"/>
        {/* 집중 빛 반사 */}
        <circle cx="51.5" cy="40" r="1" fill="rgba(255,255,255,0.8)"/>

        {/* ★ 오른쪽 눈 — 찡그린 실눈 (납작한 타원) */}
        <ellipse cx="74" cy="44" r="10" ry="5" fill="#0A1828"/>
        <ellipse cx="74" cy="44" rx="8.5" ry="4" fill="#F0F4FF"/>
        <ellipse cx="75" cy="44.5" rx="5.5" ry="2.5" fill="#FF6B35"/>
        <ellipse cx="75" cy="44.5" rx="5.5" ry="2.5" fill="none" stroke="#CC4A18" strokeWidth="0.8"/>
        <ellipse cx="75" cy="44.5" rx="2.5" ry="1.2" fill="#0D0500"/>
        <ellipse cx="72.5" cy="43.5" rx="1.5" ry="0.8" fill="rgba(255,255,255,0.9)"/>
        {/* 찡그림 주름 */}
        <path d="M65 47 Q70 49 76 49" stroke="#0D2040" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M66 50 Q70 52 75 51" stroke="#0D2040" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.6"/>

        {/* 부리 — 다문 긴장 */}
        <path d="M56 54 C57 51 60 50 63 51 C64 51 64 54 62 58 C61 60 59 60 58 58 C56 55 56 54 56 54Z" fill="#C9A84C"/>
        <path d="M56.5 55 Q60 53.5 63.5 55" stroke="#A88830" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* 긴장된 입 꼬리 내려감 */}
        <path d="M55.5 59 Q56 61 57.5 60" stroke="#A88830" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
        <path d="M64.5 59 Q64 61 62.5 60" stroke="#A88830" strokeWidth="1.2" strokeLinecap="round" fill="none"/>

        {/* 집중 땀방울 */}
        <path d="M83 30 C83 27 85 25 87 27 C89 25 91 27 91 30 C91 33 87 37 87 37 C87 37 83 33 83 30Z" fill="#4A9EDB" opacity="0.8"/>
      </g>

      {/* 돋보기 (크고 상세하게) */}
      <g transform="translate(76, 50)">
        <circle cx="13" cy="13" r="13" fill="#0A1828" opacity="0.5"/>
        <circle cx="13" cy="13" r="11.5" fill="rgba(77,180,255,0.08)" stroke="#C9A84C" strokeWidth="3"/>
        {/* 렌즈 내부 빛 */}
        <circle cx="9" cy="9" r="4" fill="rgba(255,255,255,0.2)"/>
        <circle cx="16" cy="17" r="2" fill="rgba(255,255,255,0.12)"/>
        {/* 초점선 */}
        <line x1="13" y1="5" x2="13" y2="21" stroke="#C9A84C" strokeWidth="0.7" opacity="0.35"/>
        <line x1="5" y1="13" x2="21" y2="13" stroke="#C9A84C" strokeWidth="0.7" opacity="0.35"/>
        {/* 손잡이 */}
        <path d="M21 21 L31 31" stroke="#C9A84C" strokeWidth="4" strokeLinecap="round"/>
        <path d="M22 22 L30 30" stroke="#A88830" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      </g>
    </svg>
  );
}
