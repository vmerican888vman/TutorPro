/**
 * Random Test Builder — assembles a fresh ACT practice test
 * from question pools, ensuring proper difficulty distribution.
 *
 * 2025 Enhanced ACT format:
 *   English: 50 questions
 *   Math: 45 questions
 *   Reading: 36 questions
 *   Science (optional): 40 questions
 */

/** Minimal question shape accepted by the ACT test builder */
export interface ACTBuilderQuestion {
  id: string
  question: string
  passage?: string | null
  options: { letter: string; text: string }[]
  correct: string
  category: string
  subcategory?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  explanation?: string
}

interface DifficultyWeights {
  easy: number
  medium: number
  hard: number
}

export interface ACTTestResult<T extends ACTBuilderQuestion> {
  english: T[]
  math: T[]
  reading: T[]
  science?: T[]
}

/**
 * Fisher-Yates shuffle (returns shuffled copy).
 */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Pick `count` items from `pool`, preferring the given difficulty distribution.
 */
function pickWithDifficulty<T extends ACTBuilderQuestion>(
  pool: T[],
  count: number,
  weights: DifficultyWeights
): T[] {
  const shuffled = shuffle(pool)
  const byDifficulty: Record<string, T[]> = { easy: [], medium: [], hard: [] }
  for (const q of shuffled) {
    const d = q.difficulty || 'medium'
    if (byDifficulty[d]) byDifficulty[d].push(q)
    else byDifficulty.medium.push(q)
  }

  const targets = {
    easy: Math.round(count * weights.easy),
    hard: Math.round(count * weights.hard),
    medium: 0,
  }
  targets.medium = count - targets.easy - targets.hard

  const picked: T[] = []
  const usedIds = new Set<string>()

  for (const diff of ['easy', 'medium', 'hard'] as const) {
    const target = targets[diff]
    const available = byDifficulty[diff]
    const take = Math.min(target, available.length)
    for (let i = 0; i < take; i++) {
      picked.push(available[i])
      usedIds.add(available[i].id)
    }
  }

  // Fill from remaining if short
  if (picked.length < count) {
    const remaining = shuffled.filter((q) => !usedIds.has(q.id))
    const needed = count - picked.length
    for (let i = 0; i < needed && i < remaining.length; i++) {
      picked.push(remaining[i])
      usedIds.add(remaining[i].id)
    }
  }

  return shuffle(picked)
}

/**
 * Build a randomized ACT practice test from question pools.
 *
 * ACT difficulty is distributed roughly evenly across sections:
 *   ~30% easy, ~40% medium, ~30% hard
 *
 * @param englishPool — English questions
 * @param mathPool — Math questions
 * @param readingPool — Reading questions
 * @param sciencePool — Science questions (optional)
 * @returns { english, math, reading, science? }
 */
export function buildRandomACTTest<T extends ACTBuilderQuestion>(
  englishPool: T[],
  mathPool: T[],
  readingPool: T[],
  sciencePool?: T[]
): ACTTestResult<T> {
  const weights: DifficultyWeights = { easy: 0.3, medium: 0.4, hard: 0.3 }

  const englishCount = Math.min(50, englishPool.length)
  const mathCount = Math.min(45, mathPool.length)
  const readingCount = Math.min(36, readingPool.length)

  const result: ACTTestResult<T> = {
    english: pickWithDifficulty(englishPool, englishCount, weights),
    math: pickWithDifficulty(mathPool, mathCount, weights),
    reading: pickWithDifficulty(readingPool, readingCount, weights),
  }

  if (sciencePool && sciencePool.length > 0) {
    const scienceCount = Math.min(40, sciencePool.length)
    result.science = pickWithDifficulty(sciencePool, scienceCount, weights)
  }

  return result
}
