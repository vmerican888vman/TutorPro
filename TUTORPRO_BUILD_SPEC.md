# TutorPro.ai — Full Application Build Spec

**Date:** March 2, 2026
**Type:** AI-Powered SAT & ACT Tutoring Web Application
**Domain:** tutorpro.ai (Cloudflare Pages)
**Stack:** Vite + React, Supabase (Auth + DB), Stripe, Claude API

---

## Table of Contents

1. Project Overview
2. Tech Stack & Architecture
3. Design System
4. Database Schema (Supabase)
5. Page Routes & Components
6. Phase 1: Landing Page (DONE)
7. Phase 2: Free Diagnostic Test
8. Phase 3: Auth & User Accounts
9. Phase 4: Stripe Payments
10. Phase 5: AI Tutoring Engine
11. Phase 6: Practice & Progress Dashboard
12. Question Bank
13. Deployment
14. Legal Notes

---

## 1. Project Overview

TutorPro.ai is a premium AI-powered SAT & ACT tutoring platform positioned between Khan Academy (free/generic) and Kaplan/Princeton Review ($450–999). Pricing: Free diagnostic (no credit card) → $39/month Pro plan.

**User Journey:**
1. Land on tutorpro.ai (marketing page)
2. Click "Start Free Diagnostic"
3. Take 20-question adaptive assessment (no account needed)
4. See score breakdown with strengths/weaknesses
5. Enter email to save results (lead capture)
6. Prompted to create account and start Pro
7. Pro users get unlimited AI tutoring, practice tests, progress tracking

---

## 2. Tech Stack & Architecture

### Frontend
- **Vite + React** (not Next.js — static deploy to Cloudflare Pages)
- **React Router** for client-side routing
- **Zustand** for state management (lightweight, no Redux boilerplate)
- **Inline styles or CSS Modules** (matching existing landing page approach)

### Backend
- **Supabase** — Auth, PostgreSQL database, Row Level Security, Edge Functions
- **Supabase Auth** — Email/password + Google OAuth
- **Supabase Realtime** — Not needed initially

### Payments
- **Stripe Checkout** — Redirect-based (not embedded)
- **Stripe Customer Portal** — For subscription management/cancellation
- **Webhook** — Supabase Edge Function to handle `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

### AI Tutoring
- **Claude API** (Anthropic) — claude-sonnet-4-5-20250929 for tutoring conversations
- **Supabase Edge Function** as API proxy (keeps API key server-side)
- **System prompt** engineering for Socratic method tutoring

### Deployment
- **Cloudflare Pages** — Static site hosting (already configured)
- `tutorpro.ai` domain already connected

---

## 3. Design System

### Colors
```
Background:        #07070F (near-black)
Background Light:  #0E0E1A
Card Background:   #0C0C18
Gold Accent:       #F5C842
Gold Dim:          rgba(245,200,66,0.15)
Gold Border:       rgba(245,200,66,0.25)
White:             #FAFAF9
Muted:             #9B9BAD
Green (correct):   #34D399
Red (incorrect):   #F87171
Math Purple:       #818CF8
Reading Green:     #34D399
Writing Yellow:    #FBBF24
```

### Typography
- **Headlines:** Playfair Display (serif) — 700/800 weight
- **Body:** DM Sans — 400/500/600 weight
- **Code/Math:** JetBrains Mono
- Load via Google Fonts

### Component Patterns
- Border radius: 14px (cards), 8px (inputs), 100px (buttons/pills)
- Card borders: 1.5px solid rgba(255,255,255,0.06), hover → gold-border
- Buttons: Gold (#F5C842) with dark text, 100px border-radius
- Transitions: all 0.35s cubic-bezier(0.4, 0, 0.2, 1)
- Noise texture overlay on sections (SVG data URI)

### Design Rules
- NO purple gradients
- NO Inter font
- NO generic AI aesthetics
- Dark editorial luxury tone throughout
- Consistent with existing landing page

---

## 4. Database Schema (Supabase)

### Table: `profiles`
```sql
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
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Table: `diagnostic_results`
```sql
CREATE TABLE diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT, -- for anonymous users who enter email
  total_score INTEGER NOT NULL,
  math_score INTEGER NOT NULL,
  reading_score INTEGER NOT NULL,
  writing_score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL DEFAULT 20,
  math_questions INTEGER NOT NULL,
  reading_questions INTEGER NOT NULL,
  writing_questions INTEGER NOT NULL,
  answers JSONB NOT NULL, -- [{question_id, selected, correct, category, time_spent_ms}]
  time_spent_seconds INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `practice_sessions`
```sql
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
```

### Table: `tutor_conversations`
```sql
CREATE TABLE tutor_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  category TEXT CHECK (category IN ('math', 'reading', 'writing', 'general')),
  messages JSONB NOT NULL DEFAULT '[]', -- [{role, content, timestamp}]
  question_context JSONB, -- optional: the question being discussed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Table: `user_progress`
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  math_mastery JSONB DEFAULT '{}', -- {topic: {correct, total, mastery_pct}}
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
```

### Row Level Security
```sql
-- Profiles: users can only read/update their own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Diagnostic results: users see their own, anonymous allowed for insert
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own diagnostics" ON diagnostic_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can insert diagnostic" ON diagnostic_results FOR INSERT WITH CHECK (true);

-- Practice sessions: authenticated users only
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own sessions" ON practice_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own sessions" ON practice_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Tutor conversations: authenticated users only
ALTER TABLE tutor_conversations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own conversations" ON tutor_conversations FOR ALL USING (auth.uid() = user_id);

-- User progress: authenticated users only
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own progress" ON user_progress FOR ALL USING (auth.uid() = user_id);
```

---

## 5. Page Routes & Components

```
/                     → Landing page (existing index.html)
/diagnostic           → Free diagnostic test (no auth required)
/diagnostic/results   → Score breakdown + email capture
/login                → Login page
/signup               → Signup page
/dashboard            → Main dashboard (Pro users)
/dashboard/practice   → Practice question sets
/dashboard/tutor      → AI tutor chat
/dashboard/progress   → Progress analytics
/dashboard/settings   → Account & subscription management
/pricing              → Pricing page (can also live on landing page)
```

### Layout Components
- `<AppShell>` — Authenticated layout with sidebar nav
- `<AuthGuard>` — Redirects unauthenticated users to /login
- `<ProGuard>` — Redirects free users to /pricing

---

## 6. Phase 1: Landing Page ✅ DONE

The landing page is deployed at tutorpro.ai as a static HTML file. It includes:
- Nav, Hero, Ticker, Stats, How It Works, Price Anchor, Testimonials, Pricing, FAQ, Final CTA, Footer
- All CTA buttons should link to `/diagnostic`

---

## 7. Phase 2: Free Diagnostic Test

### Flow
1. User clicks "Start Free Diagnostic" → `/diagnostic`
2. Intro screen: explains the test (20 questions, ~15 min, 3 categories)
3. Questions presented one at a time with:
   - Category badge (Math / Reading / Writing)
   - Progress bar + question counter
   - Timer (counts up, shown in nav)
   - 4 answer choices (A/B/C/D)
   - After selecting: reveal correct/incorrect + explanation
   - "Next Question" button
4. After question 20 → Results screen
5. Results show:
   - Overall score (X/20)
   - Category breakdown with bar charts (Math: X/7, Reading: X/7, Writing: X/6)
   - Strengths & weaknesses analysis
   - Estimated SAT score range
   - Email capture form: "Save your results and get a personalized study plan"
   - CTA: "Start Pro — Unlock Full Access"

### Question Structure
```javascript
{
  id: "math_001",
  category: "math", // "math" | "reading" | "writing"
  subcategory: "algebra", // for progress tracking
  difficulty: "medium", // "easy" | "medium" | "hard"
  passage: null, // reading passages shown above question
  question: "If 3x + 7 = 22, what is the value of x?",
  options: [
    { letter: "A", text: "3" },
    { letter: "B", text: "5" },
    { letter: "C", text: "7" },
    { letter: "D", text: "15" }
  ],
  correct: "B",
  explanation: "Subtract 7 from both sides: 3x = 15. Divide both sides by 3: x = 5."
}
```

### Question Distribution
- Math: 7 questions (algebra, geometry, data analysis, advanced math)
- Reading: 7 questions (comprehension, vocabulary in context, evidence-based)
- Writing: 6 questions (grammar, sentence structure, expression of ideas)

---

## 8. Phase 3: Auth & User Accounts

### Supabase Auth Setup
- Email/password signup with email confirmation
- Google OAuth (optional, nice to have)
- Password reset flow
- Session management with `supabase.auth.onAuthStateChange()`

### Login Page (`/login`)
- Email + password form
- "Forgot password?" link
- "Don't have an account? Sign up" link
- Google OAuth button
- Same dark luxury design

### Signup Page (`/signup`)
- Full name, email, password
- "Already have an account? Log in" link
- After signup → redirect to /dashboard
- If user came from diagnostic, link their results to new account

---

## 9. Phase 4: Stripe Payments

### Setup
- Stripe product: "TutorPro.ai Pro" — $39/month recurring
- Stripe Checkout (redirect mode, not embedded)
- Stripe Customer Portal for self-service cancellation

### Flow
1. User clicks "Start Pro" → call Supabase Edge Function
2. Edge Function creates Stripe Checkout Session with user's email
3. User redirected to Stripe Checkout
4. On success → redirected to `/dashboard?session_id=xxx`
5. Stripe webhook fires → Edge Function updates `profiles.subscription_status = 'pro'`

### Supabase Edge Function: `create-checkout`
```
POST /functions/v1/create-checkout
Body: { priceId, userId, email }
Returns: { url: "https://checkout.stripe.com/..." }
```

### Supabase Edge Function: `stripe-webhook`
```
POST /functions/v1/stripe-webhook
Handles:
  - checkout.session.completed → set subscription_status = 'pro'
  - customer.subscription.updated → update status
  - customer.subscription.deleted → set subscription_status = 'cancelled'
```

### Supabase Edge Function: `customer-portal`
```
POST /functions/v1/customer-portal
Body: { customerId }
Returns: { url: "https://billing.stripe.com/..." }
```

---

## 10. Phase 5: AI Tutoring Engine

### Architecture
- Frontend sends message to Supabase Edge Function
- Edge Function calls Claude API with system prompt + conversation history
- Response streamed back to frontend

### Supabase Edge Function: `tutor-chat`
```
POST /functions/v1/tutor-chat
Body: {
  conversationId,
  message,
  category, // "math" | "reading" | "writing" | "general"
  questionContext // optional: specific question being discussed
}
Returns: streaming text response
```

### Claude System Prompt
```
You are TutorPro, an expert SAT and ACT tutor. Your teaching style:

1. SOCRATIC METHOD: Guide students to answers through questions, don't just give answers
2. PATIENT & ENCOURAGING: Never make students feel dumb. Celebrate small wins
3. STEP-BY-STEP: Break complex problems into manageable steps
4. ADAPTIVE: If a student is struggling, simplify. If they're excelling, challenge them
5. FOCUSED: Keep conversations on-topic (SAT/ACT prep)
6. EXPLAIN WHY: Don't just say "the answer is B" — explain the reasoning

When discussing specific questions:
- First ask the student what they think and why
- Identify their misconception
- Guide them to the correct approach
- Verify understanding with a follow-up

IMPORTANT: Never guarantee specific score improvements. Use "score improvement" language.
You cover: SAT Math, SAT Reading & Writing, ACT Math, ACT English, ACT Reading, ACT Science.

Keep responses concise (2-4 paragraphs max). Use markdown for math expressions.
```

### Tutor UI (`/dashboard/tutor`)
- Chat interface with message bubbles
- User messages on right (gold accent)
- AI messages on left (card background)
- Category selector at top (Math / Reading / Writing / General)
- Optional: "Discuss this question" button on practice questions
- Conversation history in sidebar
- Typing indicator while AI responds
- Markdown rendering for math expressions

---

## 11. Phase 6: Practice & Progress Dashboard

### Dashboard Home (`/dashboard`)
- Welcome message with user's name
- Quick stats: streak days, questions answered, estimated score
- "Continue where you left off" — last practice set or tutor convo
- Category cards showing mastery percentage
- Quick actions: "Start Practice", "Talk to Tutor", "Full Practice Test"

### Practice (`/dashboard/practice`)
- Choose category or mixed
- Choose # of questions (5, 10, 20)
- Same question UI as diagnostic (but with AI tutor "Help" button)
- After completion: results + option to discuss wrong answers with tutor

### Progress (`/dashboard/progress`)
- Line chart: estimated score over time
- Category breakdown with mastery bars
- Topics mastered vs. needs work
- Recent activity feed
- Streak calendar

### Settings (`/dashboard/settings`)
- Profile info (name, email)
- Subscription status + manage button (→ Stripe Customer Portal)
- Change password
- Delete account

---

## 12. Question Bank

### IMPORTANT
The diagnostic and practice features need a real question bank. Below is a starter set of 20 questions for the diagnostic. The full app will need 200+ questions.

**LEGAL NOTE:** All questions must be ORIGINAL. Do not copy from College Board, ACT Inc., Kaplan, or any copyrighted source. Write original questions that test the same skills.

### Diagnostic Questions (20)

#### Math (7 questions)

**MATH-001** (Algebra — Easy)
- Question: If 3x + 7 = 22, what is the value of x?
- A) 3  B) 5  C) 7  D) 15
- Correct: B
- Explanation: Subtract 7 from both sides: 3x = 15. Divide by 3: x = 5.

**MATH-002** (Algebra — Medium)
- Question: A phone plan charges $25 per month plus $0.10 per text message. If Jamie's bill was $43 last month, how many text messages did Jamie send?
- A) 18  B) 43  C) 180  D) 430
- Correct: C
- Explanation: 43 - 25 = 18 dollars on texts. 18 ÷ 0.10 = 180 messages.

**MATH-003** (Geometry — Medium)
- Question: A circle has an area of 64π square units. What is the circumference of the circle?
- A) 8π  B) 16π  C) 32π  D) 64π
- Correct: B
- Explanation: Area = πr² = 64π, so r² = 64 and r = 8. Circumference = 2πr = 2π(8) = 16π.

**MATH-004** (Data Analysis — Easy)
- Question: The mean of five numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?
- A) 10  B) 12  C) 14  D) 16
- Correct: B
- Explanation: Sum of all five = 5 × 12 = 60. Sum of four = 8 + 10 + 14 + 16 = 48. Fifth number = 60 - 48 = 12.

**MATH-005** (Advanced Math — Medium)
- Question: If f(x) = 2x² - 3x + 1, what is f(-2)?
- A) 3  B) 7  C) 11  D) 15
- Correct: D
- Explanation: f(-2) = 2(-2)² - 3(-2) + 1 = 2(4) + 6 + 1 = 8 + 6 + 1 = 15.

**MATH-006** (Algebra — Hard)
- Question: The system of equations 2x + y = 10 and x - y = 2 has a solution (x, y). What is the value of x + y?
- A) 2  B) 6  C) 8  D) 12
- Correct: C
- Explanation: Add the equations: 3x = 12, so x = 4. Then y = 10 - 2(4) = 2. x + y = 4 + 2 = 6. Wait — let me recalculate. From x - y = 2 and x = 4: 4 - y = 2, y = 2. So x + y = 6. But we need to verify: 2(4) + 2 = 10 ✓ and 4 - 2 = 2 ✓. x + y = 6. Correct answer is B.
- **CORRECTION:** Correct: B (x + y = 6)
- Explanation: Adding the equations gives 3x = 12, so x = 4. Substituting: 4 - y = 2, so y = 2. Therefore x + y = 6.

**MATH-007** (Geometry — Hard)
- Question: In a right triangle, one leg measures 5 and the hypotenuse measures 13. What is the area of the triangle?
- A) 30  B) 32.5  C) 60  D) 65
- Correct: A
- Explanation: Using the Pythagorean theorem: other leg = √(13² - 5²) = √(169 - 25) = √144 = 12. Area = ½ × 5 × 12 = 30.

#### Reading (7 questions)

**READ-001** (Comprehension — Easy)
- Passage: "The octopus is widely considered one of the most intelligent invertebrates. Studies have shown that octopuses can solve complex puzzles, navigate mazes, and even open jars from the inside. Their problem-solving abilities rival those of some mammals, despite having a fundamentally different nervous system, with roughly two-thirds of their neurons located in their arms rather than a central brain."
- Question: According to the passage, what makes the octopus's intelligence particularly remarkable?
- A) They can live longer than most invertebrates
- B) They achieve complex cognition with a very different neural structure
- C) Their arms function independently from their brain
- D) They can outsmart most mammals
- Correct: B
- Explanation: The passage emphasizes that octopuses show intelligence "despite having a fundamentally different nervous system," making their cognitive abilities remarkable given their brain structure.

**READ-002** (Vocabulary in Context — Easy)
- Passage: "After decades of decline, the small fishing village began to experience a modest revival. New restaurants opened along the waterfront, and young families were drawn to the area's affordable housing and tight-knit community."
- Question: As used in the passage, "revival" most nearly means:
- A) Religious awakening
- B) Return to prosperity
- C) Historical preservation
- D) Population explosion
- Correct: B
- Explanation: In context, "revival" refers to the town's economic and social recovery after a period of decline, indicated by new businesses and incoming residents.

**READ-003** (Evidence-Based — Medium)
- Passage: "Coral reefs, often called the 'rainforests of the sea,' support approximately 25% of all marine species despite covering less than 1% of the ocean floor. However, rising ocean temperatures have triggered widespread coral bleaching events. When water temperatures exceed normal ranges, corals expel the symbiotic algae living in their tissues, turning white and becoming vulnerable to disease. Without intervention, scientists estimate that 90% of coral reefs could be severely degraded by 2050."
- Question: Which claim about coral reefs is best supported by the passage?
- A) Coral reefs are the largest ecosystems in the ocean
- B) Coral bleaching is caused exclusively by pollution
- C) The loss of coral reefs would disproportionately affect marine biodiversity
- D) Scientists have found effective ways to reverse coral bleaching
- Correct: C
- Explanation: Since reefs support 25% of marine species while covering less than 1% of the ocean, their loss would have a disproportionately large impact on biodiversity.

**READ-004** (Comprehension — Medium)
- Passage: "In 1928, Alexander Fleming returned from vacation to find mold growing on a petri dish of Staphylococcus bacteria. Rather than discarding the contaminated sample, he noticed something extraordinary: the bacteria surrounding the mold had been destroyed. This accidental observation led to the discovery of penicillin, which would go on to save an estimated 200 million lives. Fleming later remarked that his finding was a matter of chance, but as Louis Pasteur once noted, 'Fortune favors the prepared mind.'"
- Question: The author includes the Pasteur quote primarily to:
- A) Compare Fleming and Pasteur's scientific achievements
- B) Argue that luck plays no role in scientific discovery
- C) Suggest that Fleming's expertise enabled him to recognize the significance of what he saw
- D) Demonstrate that all major discoveries happen by accident
- Correct: C
- Explanation: The Pasteur quote about "the prepared mind" suggests that while Fleming's discovery involved chance, his scientific training allowed him to understand its importance rather than dismissing it.

**READ-005** (Vocabulary in Context — Medium)
- Passage: "The senator's proposal was met with a measured response from her colleagues. While several expressed cautious support, others noted that the plan's ambitious scope could make implementation challenging without significant bipartisan cooperation."
- Question: As used in the passage, "measured" most nearly means:
- A) Quantified
- B) Restrained and deliberate
- C) Enthusiastic
- D) Hostile
- Correct: B
- Explanation: "Measured" here means careful and restrained, as indicated by the "cautious support" and qualified criticism that followed.

**READ-006** (Evidence-Based — Hard)
- Passage: "The concept of 'flow state' — a condition of deep immersion in an activity — was popularized by psychologist Mihaly Csikszentmihalyi. During flow, individuals report losing track of time, feeling a sense of effortless control, and experiencing deep satisfaction. Research suggests that flow occurs when the challenge of a task closely matches the individual's skill level. If the task is too easy, boredom results; too difficult, and anxiety takes over. This balance point, Csikszentmihalyi argued, is where peak human performance and happiness converge."
- Question: Based on the passage, a student would most likely experience flow while:
- A) Reviewing material they already know perfectly
- B) Attempting a test far above their current skill level
- C) Working on challenging problems that stretch but don't exceed their abilities
- D) Watching a lecture on a familiar topic
- Correct: C
- Explanation: The passage states flow occurs when "the challenge of a task closely matches the individual's skill level" — too easy causes boredom, too hard causes anxiety.

**READ-007** (Comprehension — Hard)
- Passage: "In her landmark 1962 book Silent Spring, Rachel Carson documented the devastating environmental effects of widespread pesticide use, particularly DDT. The chemical industry attacked Carson personally, questioning her credentials and motives. Despite the fierce opposition, her work catalyzed the modern environmental movement and led directly to the creation of the Environmental Protection Agency. Carson, who died of cancer just two years after publication, did not live to see the full impact of her work — a fact that lends her story both its power and its tragedy."
- Question: The author's tone toward Rachel Carson is best described as:
- A) Objective and detached
- B) Admiring but tinged with sadness
- C) Critical of her methods
- D) Indifferent to her legacy
- Correct: B
- Explanation: The author praises Carson's impact ("landmark," "catalyzed") while noting the tragic element that she died before seeing her work's full effects, creating an admiring but somber tone.

#### Writing (6 questions)

**WRIT-001** (Grammar — Easy)
- Question: Choose the sentence that is grammatically correct.
- A) Me and my friend went to the store.
- B) My friend and I went to the store.
- C) Myself and my friend went to the store.
- D) My friend and me went to the store.
- Correct: B
- Explanation: When the pronoun is the subject, use "I" not "me" or "myself." "My friend and I" is the correct subject form.

**WRIT-002** (Sentence Structure — Easy)
- Question: Which version of the sentence uses a comma correctly?
- A) The students who studied for the exam, passed with high scores.
- B) The students, who studied for the exam passed with high scores.
- C) The students who studied for the exam passed with high scores.
- D) The students who studied, for the exam passed with high scores.
- Correct: C
- Explanation: "Who studied for the exam" is a restrictive clause (it identifies which students), so it should NOT be set off by commas.

**WRIT-003** (Expression of Ideas — Medium)
- Question: "The city council voted to approve the new park. _______ residents had expressed overwhelming support at the public hearing."
Which transition best fills the blank?
- A) However,
- B) Nevertheless,
- C) After all,
- D) In contrast,
- Correct: C
- Explanation: "After all" introduces a supporting reason for the council's decision. "However," "Nevertheless," and "In contrast" would indicate a contradiction, which doesn't fit the context.

**WRIT-004** (Grammar — Medium)
- Question: Select the sentence with correct subject-verb agreement.
- A) The group of students are preparing their presentations.
- B) The group of students is preparing their presentations.
- C) The group of students is preparing its presentations.
- D) The group of students are preparing its presentations.
- Correct: C
- Explanation: "Group" is a singular collective noun, so it takes the singular verb "is" and the singular pronoun "its."

**WRIT-005** (Sentence Structure — Hard)
- Question: Which sentence is punctuated correctly?
- A) The research paper, which was published last month was widely discussed.
- B) The research paper which was published last month, was widely discussed.
- C) The research paper, which was published last month, was widely discussed.
- D) The research paper which was published last month was widely discussed.
- Correct: C
- Explanation: "Which was published last month" is a nonrestrictive clause (it adds extra info, not essential to identifying the paper), so it must be set off by commas on both sides.

**WRIT-006** (Expression of Ideas — Hard)
- Question: A student is writing about renewable energy adoption. Which sentence most effectively conveys the urgency of the topic while maintaining an academic tone?
- A) Everyone needs to start using solar panels right now or we're all in trouble.
- B) The accelerating pace of climate change demands a correspondingly rapid transition to renewable energy infrastructure.
- C) Renewable energy is pretty important and we should probably use more of it soon.
- D) Scientists say renewable energy is good for the planet.
- Correct: B
- Explanation: Option B conveys urgency ("accelerating," "demands," "rapid") while maintaining formal academic language and specific vocabulary, striking the right balance for an academic essay.

---

## 13. Deployment

### Cloudflare Pages (current setup)
- Domain: tutorpro.ai (already configured)
- Worker: tutorproai
- DNS: Cloudflare nameservers (dara.ns.cloudflare.com, keanu.ns.cloudflare.com)

### Build Command
```bash
npm run build
# Output: dist/
```

### Environment Variables (Cloudflare Pages)
```
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
```

### Supabase Edge Function Environment Variables
```
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
ANTHROPIC_API_KEY=sk-ant-xxx
```

---

## 14. Legal Notes

- **NEVER guarantee specific point increases** — use "score improvement" language only
- Market as "score improvement" not "guaranteed 200 points"
- All questions in the question bank must be ORIGINAL — never copy from College Board, ACT Inc., Kaplan, Princeton Review, or any copyrighted test prep material
- Include 7-day money-back guarantee language
- Privacy policy and Terms of Service pages needed
- Compliant with children's privacy (COPPA) since minors may use the service

---

## Build Order for Claude Code

1. **Scaffold project:** `npm create vite@latest tutorpro -- --template react` + install dependencies
2. **Set up routing:** React Router with all page routes
3. **Port landing page:** Convert existing index.html into React component at `/`
4. **Build diagnostic:** Question engine + UI at `/diagnostic`
5. **Set up Supabase:** Create tables, RLS policies, auth
6. **Build auth pages:** Login, signup, password reset
7. **Build dashboard layout:** Sidebar nav + protected routes
8. **Integrate Stripe:** Edge functions + checkout flow
9. **Build AI tutor:** Claude API edge function + chat UI
10. **Build practice engine:** Question sets + results
11. **Build progress tracking:** Charts + analytics
12. **Polish & deploy:** Animations, mobile optimization, Cloudflare Pages deploy
