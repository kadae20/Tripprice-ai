-- Migration: 001_init
-- Created: 2026-04-04
-- Description: 초기 스키마 생성 (hotels, decision_sessions, hotel_conversion_stats)

-- ↑ UP (적용)

-- 호텔 데이터 테이블
CREATE TABLE IF NOT EXISTS hotels (
  id SERIAL PRIMARY KEY,
  hotel_id VARCHAR(50) UNIQUE NOT NULL,
  hotel_name VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL,
  star_rating INTEGER,
  agoda_rating DECIMAL(3,1),
  price_min INTEGER,
  price_max INTEGER,
  image_url TEXT,
  amenities JSONB,
  agoda_link TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hotels_updated_at
  BEFORE UPDATE ON hotels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 여행자 의사결정 세션 (독점 데이터 핵심)
CREATE TABLE IF NOT EXISTS decision_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id VARCHAR(100) NOT NULL,
  travel_purpose VARCHAR(50),
  budget_min INTEGER,
  budget_max INTEGER,
  city VARCHAR(100),
  priority VARCHAR(50),
  checkin_date DATE,
  checkout_date DATE,
  recommended_hotels JSONB,
  selected_hotel_id VARCHAR(50),
  converted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_decision_sessions_session_id
  ON decision_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_decision_sessions_city
  ON decision_sessions(city);
CREATE INDEX IF NOT EXISTS idx_decision_sessions_travel_purpose
  ON decision_sessions(travel_purpose);

-- 호텔별 전환율 집계 뷰
CREATE OR REPLACE VIEW hotel_conversion_stats AS
SELECT
  selected_hotel_id AS hotel_id,
  travel_purpose,
  COUNT(*) AS recommendation_count,
  SUM(CASE WHEN converted THEN 1 ELSE 0 END) AS conversion_count,
  ROUND(
    SUM(CASE WHEN converted THEN 1 ELSE 0 END)::DECIMAL
    / NULLIF(COUNT(*), 0) * 100, 2
  ) AS conversion_rate
FROM decision_sessions
WHERE selected_hotel_id IS NOT NULL
GROUP BY selected_hotel_id, travel_purpose;

-- ↓ DOWN (롤백)
-- DROP VIEW IF EXISTS hotel_conversion_stats;
-- DROP TRIGGER IF EXISTS hotels_updated_at ON hotels;
-- DROP FUNCTION IF EXISTS update_updated_at();
-- DROP INDEX IF EXISTS idx_decision_sessions_travel_purpose;
-- DROP INDEX IF EXISTS idx_decision_sessions_city;
-- DROP INDEX IF EXISTS idx_decision_sessions_session_id;
-- DROP TABLE IF EXISTS decision_sessions;
-- DROP TABLE IF EXISTS hotels;
