# Blog Post Writing Prompt for Claude Opus — TutorPro.ai

Use this prompt template when writing new blog posts for tutorpro.ai.
Copy, fill in the variables, and paste into Claude (Opus).

---

## The Prompt

```
You are writing a blog post for TutorPro.ai, an AI-powered SAT & ACT
tutoring platform that costs $39.99/month. The product offers a free
20-question diagnostic test, AI tutoring powered by Claude, personalized
study plans, and adaptive practice across all SAT/ACT sections.

The audience: high school students (juniors/seniors) and their parents.
Write primarily to the student, with asides for parents where relevant.

TOPIC: [INSERT TOPIC — e.g. "How to improve your SAT Math score by
100+ points"]

TARGET KEYWORD: [INSERT — e.g. "improve SAT math score"]

SECONDARY KEYWORDS: [INSERT 3–5 — e.g. "SAT math tips, SAT math
strategies, SAT algebra help, raise SAT score"]

POST TYPE: [pick one]
- Pillar guide (2000–2500 words, comprehensive, evergreen)
- Section deep-dive (1500–2000 words, focused on one SAT/ACT section)
- Study strategy (1200–1800 words, specific technique or schedule)
- Comparison (1500–2000 words, SAT vs ACT, or TutorPro vs competitors)
- Parent guide (1200–1800 words, written for parents, actionable)

WRITING RULES — follow these exactly:

1. STRUCTURE
   - Open with a 2–3 sentence hook that names the specific problem or
     goal. No "In today's competitive..." or "Standardized tests can be
     daunting..." filler.
   - Use ## H2 headings every 200–300 words. Use ### H3 under H2s when
     breaking into sub-strategies or sub-sections.
   - Include at least one concrete example with real numbers: "If you're
     scoring 520 in Math and missing 8 algebra questions, fixing those
     alone could push you to 580–600."
   - End with a single CTA: [Take the Free Diagnostic →](/diagnostic)
     or [See Pricing →](/pricing).

2. SUBSTANCE
   - Use real SAT/ACT scoring data. SAT is 400–1600 (two sections,
     200–800 each). ACT is 1–36 composite. Digital SAT is adaptive
     with two modules per section.
   - Name specific question types: "heart of algebra", "passport to
     advanced math", "problem solving and data analysis" for SAT Math.
     "Data Representation", "Research Summaries", "Conflicting
     Viewpoints" for ACT Science.
   - Include actionable practice strategies with time estimates: "Spend
     20 minutes per day on algebra drill sets for 2 weeks."
   - When comparing to competitors, use real prices: Khan Academy (free
     but no personalization), Kaplan ($450–999 courses), Princeton
     Review ($900–2400), private tutors ($60–150/hr). Position
     TutorPro at $39.99/mo as the smart middle ground.
   - NEVER guarantee specific point increases. Use "score improvement"
     framing only. Say "students typically see" or "designed to help
     you improve", never "guaranteed 200-point increase."

3. INTERNAL LINKING
   - Link to [free diagnostic test](/diagnostic) at least once in the
     body (not just the CTA).
   - Link to at least 2 other TutorPro blog posts using the format
     [anchor text](/blog/slug-here). Pick posts that are topically
     related from the existing blog.
   - Link to [pricing](/pricing) once, naturally, when discussing cost
     or value.

4. TONE
   - Write like a tutor who's helped 500 students, talking to the next
     one. Encouraging but direct. No condescension, no hype.
   - Use "you" and "your" liberally. The student should feel spoken to.
   - OK to use first person ("we" or "at TutorPro") when describing
     the product. Keep it brief — the post is about the student's
     success, not the product.
   - Do NOT use these words/phrases: "game-changer", "streamline",
     "leverage", "empower", "harness", "dive into", "in today's
     landscape", "at the end of the day", "daunting", "equipped with
     the right tools". These are LLM tells that hurt credibility.

5. SEO METADATA (return these separately at the top)
   - title: 50–60 chars, keyword near the front, no brand suffix
   - meta_description: 140–160 chars, includes the primary keyword,
     reads as a complete sentence
   - slug: lowercase, hyphens, keyword-rich, under 60 chars
   - keywords: JSON array of 4–6 keywords
   - category: one of ["sat-prep", "act-prep", "study-skills",
     "sat-math", "test-comparison", "parent-resources"]
   - topic: a short label for the topic (e.g. "SAT Math Strategies")

6. FORMAT
   Return the metadata as a fenced YAML block, then the post body as
   markdown (using # for the title, ## for H2s, ### for H3s). Example:

   ---yaml
   title: "How to Improve Your SAT Math Score by 100+ Points"
   meta_description: "Proven strategies to raise your SAT Math score by 100 points or more through targeted practice and smart study habits."
   slug: "improve-sat-math-score-100-points"
   keywords: ["improve SAT math score", "SAT math tips", "raise SAT score", "SAT math strategies"]
   category: "sat-math"
   topic: "SAT Math Score Improvement"
   ---

   # How to Improve Your SAT Math Score by 100+ Points

   You're staring at a 520 in Math and your target school wants 620...

Write the complete post now.
```

---

## After writing: how to publish

1. Insert a new row in Supabase `blog_posts` table:
   - `site`: `tutorpro`
   - `status`: `published`
   - `title`, `slug`, `meta_description`, `content`, `keywords`,
     `category`, `topic`: from the YAML metadata
   - `author`: `TutorPro Team`
   - `published_at`: current timestamp
   - `word_count`: count the words in the body

2. Rebuild and deploy:
   ```bash
   cd ~/Downloads/tutorpro-deploy
   npm run build && npx wrangler pages deploy dist --project-name tutorpro --branch main
   ```
   Or just `git push origin main` (GitHub Actions auto-deploys).

## Quality checklist before publishing

- [ ] Word count ≥ 1200 (≥ 1800 for pillar/comparison posts)
- [ ] At least 5 H2 headings with meaningful content below each
- [ ] At least 2 internal links to other /blog/ posts
- [ ] Links to /diagnostic and /pricing included
- [ ] No "game-changer", "streamline", "leverage", or other LLM-tell words
- [ ] Real SAT/ACT scoring data cited (scales, section names, question types)
- [ ] At least 1 concrete worked example with real numbers
- [ ] No guaranteed score increases — "improvement" framing only
- [ ] Meta description is 140–160 chars and reads as a sentence
- [ ] Slug is keyword-rich and under 60 chars
- [ ] Category matches one of the 6 defined categories
- [ ] Not a near-duplicate of an existing post title
