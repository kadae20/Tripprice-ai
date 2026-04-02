import { buildAgodaLink } from './link-builder';
import { createServiceClient } from '../supabase/server';

interface HotelRow {
  hotel_id: string;
  hotel_name: string;
  city: string;
  country: string;
  star_rating?: number;
  agoda_rating?: number;
  price_min?: number;
  price_max?: number;
  image_url?: string;
  amenities?: Record<string, unknown>;
  agoda_link: string;
}

const CHUNK_SIZE = 1000;
const BATCH_DELAY_MS = 100;

export interface SyncOptions {
  /** 이 날짜 이후 변경된 행만 처리 (delta sync용) */
  updatedAfter?: Date;
}

/** Yields lines from a Uint8Array without decoding the whole buffer to a string */
function* readLines(bytes: Uint8Array): Generator<string> {
  const decoder = new TextDecoder('utf-8');
  const LF = 10;
  const CR = 13;
  let start = 0;

  while (start < bytes.length) {
    let end = bytes.indexOf(LF, start);
    if (end === -1) end = bytes.length;

    const lineEnd = end > start && bytes[end - 1] === CR ? end - 1 : end;
    if (lineEnd > start) {
      // subarray is zero-copy (view into same buffer)
      yield decoder.decode(bytes.subarray(start, lineEnd));
    }
    start = end + 1;
  }
}

export async function syncHotelsFromCsvBytes(
  csvBytes: Uint8Array,
  options: SyncOptions = {}
): Promise<{
  upserted: number;
  skipped: number;
  filtered: number;
  errors: string[];
}> {
  const supabase = createServiceClient();
  const lineGen = readLines(csvBytes);

  const headerResult = lineGen.next();
  if (headerResult.done || !headerResult.value) throw new Error('CSV 헤더 없음');
  const headers = headerResult.value.split(',').map((h) => h.trim().replace(/^"|"$/g, ''));

  // updated_at 컬럼 인덱스 탐지 (대소문자 변형 포함)
  const updatedAtKey = headers.find((h) =>
    ['updated_at', 'updatedat', 'UpdatedAt', 'last_modified', 'LastModified'].includes(h)
  );

  const results = { upserted: 0, skipped: 0, filtered: 0, errors: [] as string[] };
  let batch: HotelRow[] = [];
  let rowCount = 0;

  for (const line of lineGen) {
    if (!line.trim()) continue;
    rowCount++;

    const values = parseCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => { row[h] = values[idx] ?? ''; });

    // delta 필터: updatedAfter가 설정된 경우 오래된 행 스킵
    if (options.updatedAfter && updatedAtKey) {
      const updatedAt = new Date(row[updatedAtKey]);
      if (!isNaN(updatedAt.getTime()) && updatedAt < options.updatedAfter) {
        results.filtered++;
        continue;
      }
    }

    const hotelId = row['hotel_id'] || row['HotelId'] || row['hotelId'];
    if (!hotelId) { results.skipped++; continue; }

    let agodaLink: string;
    try {
      agodaLink = buildAgodaLink(hotelId);
    } catch {
      results.errors.push(`hotel_id ${hotelId}: 링크 생성 실패`);
      results.skipped++;
      continue;
    }

    batch.push({
      hotel_id: hotelId,
      hotel_name: row['hotel_name'] || row['HotelName'] || '',
      city: row['city'] || row['City'] || '',
      country: row['country'] || row['Country'] || 'Korea',
      star_rating: parseInt(row['star_rating'] || row['StarRating'] || '0') || undefined,
      agoda_rating: parseFloat(row['agoda_rating'] || row['Rating'] || '0') || undefined,
      price_min: parseInt(row['price_min'] || row['PriceMin'] || '0') || undefined,
      price_max: parseInt(row['price_max'] || row['PriceMax'] || '0') || undefined,
      image_url: resolveImage(row['image_url'] || row['ImageUrl'] || '', row['hotel_name'] || row['HotelName'] || ''),
      amenities: parseAmenities(row['amenities'] || ''),
      agoda_link: agodaLink,
    });

    if (batch.length >= CHUNK_SIZE) {
      const { error } = await supabase.from('hotels').upsert(batch, { onConflict: 'hotel_id' });
      if (error) {
        results.errors.push(error.message);
      } else {
        results.upserted += batch.length;
      }
      const filteredMsg = results.filtered > 0 ? `, filtered: ${results.filtered}` : '';
      console.log(`${rowCount} 처리 완료... (upserted: ${results.upserted}, skipped: ${results.skipped}${filteredMsg})`);
      batch = [];
      await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY_MS));
    }
  }

  if (batch.length > 0) {
    const { error } = await supabase.from('hotels').upsert(batch, { onConflict: 'hotel_id' });
    if (error) {
      results.errors.push(error.message);
    } else {
      results.upserted += batch.length;
    }
    console.log(`${rowCount} 처리 완료 (최종)`);
  }

  return results;
}

function resolveImage(imageUrl: string, hotelName: string): string {
  if (imageUrl && imageUrl.startsWith('http')) return imageUrl;
  const query = encodeURIComponent(`${hotelName} hotel`);
  return `https://source.unsplash.com/800x600/?${query}`;
}

function parseAmenities(raw: string): Record<string, boolean> | undefined {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    const items = raw.split('|').map((s) => s.trim()).filter(Boolean);
    return Object.fromEntries(items.map((item) => [item, true]));
  }
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (const char of line) {
    if (char === '"') { inQuotes = !inQuotes; }
    else if (char === ',' && !inQuotes) { result.push(current); current = ''; }
    else { current += char; }
  }
  result.push(current);
  return result;
}
