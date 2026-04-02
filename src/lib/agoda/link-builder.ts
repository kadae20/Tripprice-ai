const PARTNER_CODE = process.env.AGODA_PARTNER_CODE;

export function buildAgodaLink(hotelId: string): string {
  if (!PARTNER_CODE) {
    throw new Error('AGODA_PARTNER_CODE 환경변수가 설정되지 않았습니다');
  }

  if (!validateHotelId(hotelId)) {
    throw new Error(`유효하지 않은 hotel_id 형식: ${hotelId}`);
  }

  // 아고다 공식 파트너 딥링크 포맷 (cid=파트너코드, hid=호텔ID)
  const url = new URL('https://www.agoda.com/partners/partnersearch.aspx');
  url.searchParams.set('cid', PARTNER_CODE);
  url.searchParams.set('hid', hotelId);
  url.searchParams.set('currency', 'KRW');
  url.searchParams.set('hl', 'ko-kr');

  return url.toString();
}

export function validateHotelId(hotelId: string): boolean {
  // 아고다 hotel_id: 숫자만, 1~10자리
  return /^\d{1,10}$/.test(hotelId);
}

export function validateAgodaLink(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === 'www.agoda.com' &&
      parsed.pathname.includes('/hotel/') &&
      parsed.searchParams.has('cid')
    );
  } catch {
    return false;
  }
}
