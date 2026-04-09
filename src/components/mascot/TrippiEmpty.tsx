'use client';

// 데이터 없음 표정: 소용돌이 눈 (dizzy) — 홍채 대신 나선형이 핵심
export default function TrippiEmpty({ size = 120 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="트립이 데이터 없음">

      {/* 말풍선 */}
      <rect x="73" y="4" width="50" height="34" rx="10" fill="#122446"/>
      <rect x="73" y="4" width="50" height="34" rx="10" fill="none" stroke="rgba(255,107,53,0.4)" strokeWidth="1.5"/>
      <path d="M81 38 L87 38 L83 47Z" fill="#122446"/>
      <path d="M81 38 L83 47" stroke="rgba(255,107,53,0.35)" strokeWidth="1.2"/>
      <text x="98" y="27" textAnchor="middle" fontSize="20" fontWeight="700" fill="#FF6B35" fontFamily="sans-serif">?</text>

      <ellipse cx="52" cy="114" rx="22" ry="3.5" fill="#000" opacity="0.12"/>

      {/* 몸통 */}
      <path d="M27 77 C24 97 34 108 52 113 C70 108 80 97 77 77 C75 61 52 57 52 57 C52 57 29 61 27 77Z" fill="#0D2040"/>
      <path d="M34 69 Q52 64 70 69" stroke="#162D52" strokeWidth="1.2" fill="none" opacity="0.45"/>
      <ellipse cx="52" cy="85" rx="17" ry="21" fill="#1A3358"/>
      <ellipse cx="52" cy="89" rx="11" ry="14" fill="#1E3D68" opacity="0.7"/>

      {/* 왼쪽 날개 — 으쓱 (위로 대각) */}
      <path d="M30 70 C18 60 10 55 10 66 C10 75 16 84 24 86 C32 87 36 80 34 70Z" fill="#0B1E3A"/>
      <path d="M12 67 Q18 71 26 73" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M11 74 Q17 78 24 79" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M13 80 Q18 83 24 84" stroke="#162840" strokeWidth="1.3" fill="none"/>
      {/* 날개 끝 깃털 */}
      <path d="M10 58 C8 53 11 50 13 52 C11 48 14 46 16 49 C14 45 18 44 19 47 C17 43 21 42 22 46" stroke="#0E2340" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* 오른쪽 날개 — 으쓱 (위로 대각) */}
      <path d="M74 70 C86 60 94 55 94 66 C94 75 88 84 80 86 C72 87 68 80 70 70Z" fill="#0B1E3A"/>
      <path d="M92 67 Q86 71 78 73" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M93 74 Q87 78 80 79" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M91 80 Q86 83 80 84" stroke="#162840" strokeWidth="1.3" fill="none"/>
      <path d="M94 58 C96 53 93 50 91 52 C93 48 90 46 88 49 C90 45 86 44 85 47 C87 43 83 42 82 46" stroke="#0E2340" strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* 발 */}
      <path d="M42 109 Q39 113 36 116 M42 109 Q41 114 40 118 M42 109 Q43 114 46 117" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>
      <path d="M62 109 Q59 113 56 116 M62 109 Q61 114 60 118 M62 109 Q63 114 66 117" stroke="#C9A84C" strokeWidth="2.4" strokeLinecap="round" fill="none"/>

      {/* 머리 */}
      <g>
        <path d="M31 30 C31 22 34 15 37 12 C39 15 39 22 38 29 C35 30 32 30 31 30Z" fill="#0D2040"/>
        <path d="M33 23 C34 19 36 15 37 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>
        <path d="M73 30 C73 22 70 15 67 12 C65 15 65 22 66 29 C69 30 72 30 73 30Z" fill="#0D2040"/>
        <path d="M71 23 C70 19 68 15 67 12" stroke="#0A1830" strokeWidth="1.2" fill="none"/>
        <circle cx="52" cy="43" r="24" fill="#0D2040"/>
        <ellipse cx="52" cy="46" rx="21" ry="19.5" fill="#122446"/>
        <ellipse cx="52" cy="46" rx="21" ry="19.5" fill="none" stroke="#1C3560" strokeWidth="1.5"/>
        <ellipse cx="52" cy="47" rx="17" ry="15.5" fill="#172F55"/>

        {/* 당황 눈썹 — 안쪽 치켜올림 */}
        <path d="M31 33 Q38 27 45 33" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <path d="M59 33 Q66 27 73 33" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" fill="none"/>

        {/* ★ 왼쪽 눈 — 소용돌이 (dizzy spiral) */}
        <circle cx="40" cy="43" r="11.5" fill="#0A1828"/>
        <circle cx="40" cy="43" r="10" fill="#F0F4FF"/>
        {/* 소용돌이 나선 */}
        <circle cx="40" cy="43" r="1.5" fill="#FF6B35"/>
        <path d="M40 41.5 C41.5 41.5 42.5 42.5 42.5 44 C42.5 45.8 41 47 39.5 47 C37.5 47 36 45.5 36 43.5 C36 41 38 39 40.5 39 C43.5 39 45.5 41.5 45.5 44.5 C45.5 48 43 50 40 50 C36.5 50 34 47.5 34 44" stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* 나선 추가 바깥 고리 */}
        <path d="M33 43 C33 38.5 36.5 35 40.5 35 C45 35 48.5 38.5 48.5 43 C48.5 47 46 50 43 51" stroke="#FF6B35" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>

        {/* ★ 오른쪽 눈 — 소용돌이 (dizzy spiral) */}
        <circle cx="64" cy="43" r="11.5" fill="#0A1828"/>
        <circle cx="64" cy="43" r="10" fill="#F0F4FF"/>
        <circle cx="64" cy="43" r="1.5" fill="#FF6B35"/>
        <path d="M64 41.5 C65.5 41.5 66.5 42.5 66.5 44 C66.5 45.8 65 47 63.5 47 C61.5 47 60 45.5 60 43.5 C60 41 62 39 64.5 39 C67.5 39 69.5 41.5 69.5 44.5 C69.5 48 67 50 64 50 C60.5 50 58 47.5 58 44" stroke="#FF6B35" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M57 43 C57 38.5 60.5 35 64.5 35 C69 35 72.5 38.5 72.5 43 C72.5 47 70 50 67 51" stroke="#FF6B35" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.5"/>

        {/* 부리 — 슬프게 처짐 */}
        <path d="M48 53 C49 50 52 49 55 50 C56 50 56 53 54 57 C53 59 51 59 50 57 C48 55 48 53 48 53Z" fill="#C9A84C"/>
        <path d="M49 53 Q52 51.5 55 53" stroke="#A88830" strokeWidth="0.9" fill="none"/>
        {/* 처진 입꼬리 */}
        <path d="M47 59 Q48 63 50 62" stroke="#A88830" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M57 59 Q56 63 54 62" stroke="#A88830" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        {/* 슬픔 파장선 */}
        <path d="M46 61 Q52 57 58 61" stroke="#A88830" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5"/>

        {/* 식은땀 */}
        <path d="M73 30 C73 27 75 25 77 27 C79 25 81 27 81 30 C81 33 77 37 77 37 C77 37 73 33 73 30Z" fill="#4A9EDB" opacity="0.85"/>
        <path d="M74 30 C74 28 77 26.5 77 27" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none"/>
      </g>
    </svg>
  );
}
