-- 签历数据库表结构
-- 在 Supabase SQL Editor 中执行此脚本

-- 1. 签卡表
CREATE TABLE IF NOT EXISTS signs (
  id INTEGER PRIMARY KEY,
  number INTEGER NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('上签', '中签', '下签')),
  title TEXT NOT NULL,
  poem TEXT NOT NULL,
  interpretation TEXT NOT NULL,
  career TEXT,
  love TEXT,
  health TEXT,
  wealth TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 抽签记录表
CREATE TABLE IF NOT EXISTS draw_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  sign_id INTEGER REFERENCES signs(id),
  question TEXT,
  ai_interpretation TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 黄历缓存表（可选，用于减少计算）
CREATE TABLE IF NOT EXISTS almanac_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_draw_records_user_id ON draw_records(user_id);
CREATE INDEX IF NOT EXISTS idx_draw_records_created_at ON draw_records(created_at);
CREATE INDEX IF NOT EXISTS idx_almanac_cache_date ON almanac_cache(date);

-- 启用 RLS (Row Level Security)
ALTER TABLE signs ENABLE ROW LEVEL SECURITY;
ALTER TABLE draw_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE almanac_cache ENABLE ROW LEVEL SECURITY;

-- 设置公开访问策略（签卡数据公开）
CREATE POLICY "Signs are viewable by everyone" ON signs
  FOR SELECT USING (true);

-- 黄历缓存公开访问
CREATE POLICY "Almanac cache is viewable by everyone" ON almanac_cache
  FOR SELECT USING (true);

-- 抽签记录：用户只能看自己的记录
CREATE POLICY "Users can view own draw records" ON draw_records
  FOR SELECT USING (auth.uid()::text = user_id OR user_id IS NULL);

-- 抽签记录：任何人可以创建
CREATE POLICY "Anyone can create draw records" ON draw_records
  FOR INSERT WITH CHECK (true);
