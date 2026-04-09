'use client';

// 추천 완료 표정: 눈 감은 초승달 ^^ + 활짝 열린 부리 + 날개 벌림 — 홍채 없음이 핵심
export default function TrippiSuccess({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 추천 완료">

      {/* 5각 별 3개 */}
      <path d="M14 20 L15.8 14.5 L17.6 20 L22.5 20 L18.5 23.5 L20 29 L15.8 25.5 L11.6 29 L13.1 23.5 L9 20Z" fill="#C9A84C" opacity="0.9"/>
      <path d="M102 15 L103.5 10.5 L105 15 L109.5 15 L106 18 L107.3 22.5 L103.5 19.5 L99.7 22.5 L101 18 L97.5 15Z" fill="#C9A84C" opacity="0.8"/>
      <path d="M59 7 L60 4 L61 7 L64.5 7 L61.8 9 L62.7 12.5 L60 10.5 L57.3 12.5 L58.2 9 L55.5 7Z" fill="#C9A84C" opacity="0.7"/>

      <ellipse cx="60" cy="114" rx="24" ry="3.5" fill="#000" opacity="0.12"/>

      {/* 몸통 */}
      <path d="M35 77 C32 97 42 108 60 113 C78 108 88 97 85 77 C83 61 60 57 60 57 C60 57 37 61 35 77Z" fill="#0D2040"/>
      <path d="M42 69 Q60 64 78 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <ellipse cx="60" cy="85" rx="17" ry="21" fill="#1A3358"/>
      <ellipse cx="60" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>

      {/* 왼쪽 날개 — 위로 활짝 (만세 포즈) */}
      <path d="M40 75 C30 62 18 54 14 62 C10 70 14 84 24 90 C34 95 42 88 44 78Z" fill="#0B1E3A"/>
      <path d="M16 68 Q22 73 30 76" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M14 76 Q20 81 28 83" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M15 84 Q21 88 28 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      {/* 날개 끝 깃털 (만세 위) */}
      <path d="M14 61 C12 55 15 51 17 54 C15 49 18 47 20 51 C19 46 23 45 24 49 C23 44 27 44 28 48" stroke="#0E2340" strokeWidth="3" strokeLinecap="round" fill="none"/>

      {/* 오른쪽 날개 — 위로 활짝 (만세 포즈) */}
      <path d="M80 75 C90 62 102 54 106 62 C110 70 106 84 96 90 C86 95 78 88 76 78Z" fill="#0B1E3A"/>
      <path d="M104 68 Q98 73 90 76" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M106 76 Q100 81 92 83" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M105 84 Q99 88 92 89" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M106 61 C108 55 105 51 103 54 C105 49 102 47 100 51 C101 46 97 45 96 49 C97 44 93 44 92 48" stroke="#0E2340" strokeWidth="3" strokeLinecap="round" fill="none"/>

      {/* 발 */}
      <path d="M50 109 Q47 113 44 116 M50 109 Q49 114 48 118 M50 109 Q51 114 54 117" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M70 109 Q67 113 64 116 M70 109 Q69 114 68 118 M70 109 Q71 114 74 117" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>

      {/* 머리 */}
      <g>
        <path d="M39 30 C39 22 42 15 45 12 C47 15 47 22 46 29 C43 30 40 30 39 30Z" fill="#0D2040"/>
        <path d="M81 30 C81 22 78 15 75 12 C73 15 73 22 74 29 C77 30 80 30 81 30Z" fill="#0D2040"/>
        <circle cx="60" cy="43" r="24" fill="#0D2040"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="#122446"/>
        <ellipse cx="60" cy="46" rx="21" ry="19.5" fill="none" stroke="#1C3560" strokeWidth="1.5"/>
        <ellipse cx="60" cy="47" rx="17" ry="15.5" fill="#172F55"/>

        {/* 볼 홍조 */}
        <ellipse cx="37" cy="53" rx="9" ry="6" fill="#FF6B35" opacity="0.25"/>
        <ellipse cx="83" cy="53" rx="9" ry="6" fill="#FF6B35" opacity="0.25"/>

        {/* ★ 눈 — 완전히 감긴 초승달 ^^ (홍채/동공 없음) */}
        {/* 왼쪽 눈 소켓 (흰 배경) */}
        <circle cx="48" cy="43" r="11.5" fill="#0A1828"/>
        <circle cx="48" cy="43" r="10" fill="#F0F4FF"/>
        {/* 눈 감긴 호 — 머리색으로 위를 덮음 */}
        <path d="M37 43 Q48 30 59 43 Z" fill="#0D2040"/>
        {/* 눈 초승달 윤곽선 (주황) */}
        <path d="M38 43 Q48 56 58 43" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        {/* 속눈썹 */}
        <path d="M40 41 L38 37" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M46 39 L45 35" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M52 40 L54 36" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round"/>

        {/* 오른쪽 눈 소켓 */}
        <circle cx="72" cy="43" r="11.5" fill="#0A1828"/>
        <circle cx="72" cy="43" r="10" fill="#F0F4FF"/>
        <path d="M61 43 Q72 30 83 43 Z" fill="#0D2040"/>
        <path d="M62 43 Q72 56 82 43" stroke="#FF6B35" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        {/* 속눈썹 */}
        <path d="M64 41 L62 37" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M70 39 L69 35" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M76 40 L78 36" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round"/>

        {/* ★ 부리 — 활짝 열림 (내부 보임) */}
        <path d="M54 53 C55 50 60 48 65 50 C66 50 66 53 65 57 C63 62 57 62 55 57 C54 55 54 53 54 53Z" fill="#C9A84C"/>
        {/* 부리 내부 */}
        <path d="M55 55 C56 52 60 51 64 52 C64 55 63 59 60 60 C57 59 56 57 55 55Z" fill="#A06020"/>
        {/* 혀 */}
        <path d="M57 59 Q60 62 63 59" stroke="#C8604A" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* 이 (작은 흰색 선) */}
        <path d="M56.5 54 Q60 52.5 63.5 54" stroke="#F5E5C0" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      </g>
    </svg>
  );
}
