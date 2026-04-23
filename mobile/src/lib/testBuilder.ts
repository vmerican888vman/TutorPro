/**
 * Random Test Builder — assembles a fresh SAT practice test
 * from a question pool, ensuring proper difficulty distribution
 * and subcategory coverage per module.
 */

/** Minimal question shape accepted by the test builder */
export interface TestBuilderQuestion {
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
 * Returns { picked, remaining }.
 *
 * Distribution targets (per SAT module):
 *   Module 1 (easier): ~35% easy, 45% medium, 20% hard
 *   Module 2 (harder): ~20% easy, 45% medium, 35% hard
 */
function pickWithDifficulty<T extends TestBuilderQuestion>(
  pool: T[],
  count: number,
  difficultyWeights: DifficultyWeights
): { picked: T[]; remaining: T[] } {
  const shuffled = shuffle(pool)
  const byDifficulty: Record<string, T[]> = { easy: [], medium: [], hard: [] }
  for (const q of shuffled) {
    const d = q.difficulty || 'medium'
    if (byDifficulty[d]) byDifficulty[d].push(q)
    else byDifficulty.medium.push(q)
  }

  const targets = {
    easy: Math.round(count * (difficultyWeights.easy || 0.3)),
    hard: Math.round(count * (difficultyWeights.hard || 0.25)),
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

  const result = shuffle(picked)
  const leftover = pool.filter((q) => !usedIds.has(q.id))

  return { picked: result, remaining: leftover }
}

/**
 * Build a randomized SAT practice test from the question pools.
 *
 * If the pool is smaller than the SAT requires (98 questions), the builder
 * will use as many questions as available, distributing them evenly across modules.
 *
 * @param rwPool — Reading & Writing questions
 * @param mathPool — Math questions
 * @returns Record mapping section IDs to question arrays: { rw1, rw2, math1, math2 }
 */
export function buildRandomSATTest<T extends TestBuilderQuestion>(
  rwPool: T[],
  mathPool: T[]
): Record<string, T[]> {
  // Module 1 difficulty weights (easier)
  const mod1Weights: DifficultyWeights = { easy: 0.35, medium: 0.45, hard: 0.20 }
  // Module 2 difficulty weights (harder)
  const mod2Weights: DifficultyWeights = { easy: 0.20, medium: 0.45, hard: 0.35 }

  // Calculate how many questions we can actually use per module
  const rwTotal = rwPool.length
  const mathTotal = mathPool.length

  // SAT wants 27+27 RW and 22+22 Math, but use what we have
  const rw1Count = Math.min(27, Math.ceil(rwTotal / 2))
  const rw2Count = Math.min(27, rwTotal - rw1Count)
  const math1Count = Math.min(22, Math.ceil(mathTotal / 2))
  const math2Count = Math.min(22, mathTotal - math1Count)

  // --- Reading & Writing ---
  const rw1Result = pickWithDifficulty(rwPool, rw1Count, mod1Weights)
  const rw2Result = pickWithDifficulty(rw1Result.remaining, rw2Count, mod2Weights)

  // --- Math ---
  const math1Result = pickWithDifficulty(mathPool, math1Count, mod1Weights)
  const math2Result = pickWithDifficulty(math1Result.remaining, math2Count, mod2Weights)

  return {
    rw1: rw1Result.picked,
    rw2: rw2Result.picked,
    math1: math1Result.picked,
    math2: math2Result.picked,
  }
}
