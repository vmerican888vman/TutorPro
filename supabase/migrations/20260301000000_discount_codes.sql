-- ============================================================
-- Migration 002: Discount Codes + Admin Role
-- ============================================================

-- 1. Add role column to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- 2. Create update_updated_at function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3. Discount codes table
CREATE TABLE IF NOT EXISTS discount_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  affiliate_name TEXT NOT NULL,
  affiliate_email TEXT,
  commission_percent NUMERIC(5,2) DEFAULT 0,
  discount_percent INTEGER NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  max_uses INTEGER,
  times_used INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  stripe_coupon_id TEXT,
  stripe_promotion_code_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER discount_codes_updated_at
  BEFORE UPDATE ON discount_codes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX IF NOT EXISTS idx_discount_codes_code ON discount_codes(code);

-- 4. Discount code usage tracking
CREATE TABLE IF NOT EXISTS discount_code_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  discount_code_id UUID REFERENCES discount_codes(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  user_email TEXT,
  stripe_session_id TEXT,
  used_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discount_code_usage_code ON discount_code_usage(discount_code_id);
CREATE INDEX IF NOT EXISTS idx_discount_code_usage_user ON discount_code_usage(user_id);

-- 5. RLS policies
ALTER TABLE discount_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE discount_code_usage ENABLE ROW LEVEL SECURITY;

-- Anyone can read active discount codes (needed for promo code validation on pricing page)
CREATE POLICY "Anyone can read active discount codes"
  ON discount_codes FOR SELECT
  USING (is_active = true);

-- Users can read their own usage records
CREATE POLICY "Users read own usage"
  ON discount_code_usage FOR SELECT
  USING (auth.uid() = user_id);

-- Allow inserts via service role (webhook writes usage records)
CREATE POLICY "Allow insert usage"
  ON discount_code_usage FOR INSERT
  WITH CHECK (true);

-- 6. RPC to atomically increment usage count
CREATE OR REPLACE FUNCTION increment_discount_uses(code_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE discount_codes SET times_used = times_used + 1 WHERE id = code_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
