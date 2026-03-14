-- ============================================================
-- TutorPro.ai — Initial Database Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- ── Table: profiles ──────────────────────────────────────────
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'pro', 'cancelled')),
  subscription_id TEXT,
  subscription_end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- ── Table: diagnostic_results ────────────────────────────────
CREATE TABLE diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT,
  total_score INTEGER NOT NULL,
  math_score INTEGER NOT NULL,
  reading_score INTEGER NOT NULL,
  writing_score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 20,
  math_questions INTEGER NOT NULL,
  reading_questions INTEGER NOT NULL,
  writing_questions INTEGER NOT NULL,
  answers JSONB NOT NULL,
  time_spent_seconds INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ── Table: practice_sessions ─────────────────────────────────
CREATE TABLE practice_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  session_type TEXT NOT NULL CHECK (session_type IN ('practice', 'full_test', 'targeted')),
  category TEXT CHECK (category IN ('math', 'reading', 'writing', 'mixed')),
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  answers JSONB NOT NULL,
  time_spent_seconds INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ── Table: tutor_conversations ───────────────────────────────
CREATE TABLE tutor_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  category TEXT CHECK (category IN ('math', 'reading', 'writing', 'general')),
  messages JSONB NOT NULL DEFAULT '[]',
  question_context JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER tutor_conversations_updated_at
  BEFORE UPDATE ON tutor_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- ── Table: user_progress ─────────────────────────────────────
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  math_mastery JSONB DEFAULT '{}',
  reading_mastery JSONB DEFAULT '{}',
  writing_mastery JSONB DEFAULT '{}',
  total_questions_answered INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  last_active_date DATE,
  estimated_sat_score INTEGER,
  estimated_act_score INTEGER,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


-- ============================================================
-- Row Level Security
-- ============================================================

-- Profiles: users can only read/update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);
CREATE POLICY "Users update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Diagnostic results: users see their own, anonymous insert allowed
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own diagnostics"
  ON diagnostic_results FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert diagnostic"
  ON diagnostic_results FOR INSERT
  WITH CHECK (true);

-- Practice sessions: authenticated users only
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own sessions"
  ON practice_sessions FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users create own sessions"
  ON practice_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Tutor conversations: authenticated users only
ALTER TABLE tutor_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own conversations"
  ON tutor_conversations FOR ALL
  USING (auth.uid() = user_id);

-- User progress: authenticated users only
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress"
  ON user_progress FOR ALL
  USING (auth.uid() = user_id);


-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX idx_diagnostic_results_user_id ON diagnostic_results(user_id);
CREATE INDEX idx_diagnostic_results_email ON diagnostic_results(email);
CREATE INDEX idx_practice_sessions_user_id ON practice_sessions(user_id);
CREATE INDEX idx_tutor_conversations_user_id ON tutor_conversations(user_id);
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
