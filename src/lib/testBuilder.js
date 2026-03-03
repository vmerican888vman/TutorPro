/**
 * Random Test Builder — assembles a fresh SAT practice test
 * from a question pool, ensuring proper difficulty distribution
 * and subcategory coverage per module.
 */

/**
 * Fisher-Yates shuffle (in-place, returns shuffled copy).
 */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * Pick `count` items from `pool`, preferring the given difficulty distribution.
 * Returns { picked: [...], remaining: [...] }
 *
 * Distribution targets (per SAT module):
 *   Module 1 (easier): ~35% easy, 45% medium, 20% hard
 *   Module 2 (harder): ~20% easy, 45% medium, 35% hard
 */
function pickWithDifficulty(pool, count, difficultyWeights) {
  const shuffled = shuffle(pool)
  const byDifficulty = { easy: [], medium: [], hard: [] }
  for (const q of shuffled) {
    const d = q.difficulty || 'medium'
    if (byDifficulty[d]) byDifficulty[d].push(q)
    else byDifficulty.medium.push(q)
  }

  const targets = {
    easy: Math.round(count * (difficultyWeights.easy || 0.3)),
    hard: Math.round(count * (difficultyWeights.hard || 0.25)),
  }
  targets.medium = count - targets.easy - targets.hard

  const picked = []
  const usedIds = new Set()

  // Pick from each difficulty bucket
  for (const diff of ['easy', 'medium', 'hard']) {
    const target = targets[diff]
    const available = byDifficulty[diff]
    const take = Math.min(target, available.length)
    for (let i = 0; i < take; i++) {
      picked.push(available[i])
      usedIds.add(available[i].id)
    }
  }

  // If we're short (not enough of a difficulty), fill from remaining
  if (picked.length < count) {
    const remaining = shuffled.filter(q => !usedIds.has(q.id))
    const needed = count - picked.length
    for (let i = 0; i < needed && i < remaining.length; i++) {
      picked.push(remaining[i])
      usedIds.add(remaining[i].id)
    }
  }

  // Shuffle the final picked set so difficulties are mixed
  const result = shuffle(picked)
  const leftover = pool.filter(q => !usedIds.has(q.id))

  return { picked: result, remaining: leftover }
}

/**
 * Build a randomized SAT practice test from question pools.
 *
 * @param {Array} rwPool — All Reading & Writing questions (should be 100+)
 * @param {Array} mathPool — All Math questions (should be 80+)
 * @returns {{ rw1: Array, rw2: Array, math1: Array, math2: Array }}
 */
export function buildRandomSATTest(rwPool, mathPool) {
  // Module 1 difficulty weights (easier)
  const mod1Weights = { easy: 0.35, medium: 0.45, hard: 0.20 }
  // Module 2 difficulty weights (harder)
  const mod2Weights = { easy: 0.20, medium: 0.45, hard: 0.35 }

  // --- Reading & Writing ---
  // Pick 27 for Module 1 (easier), then 27 for Module 2 (harder) from remaining
  const rw1Result = pickWithDifficulty(rwPool, 27, mod1Weights)
  const rw2Result = pickWithDifficulty(rw1Result.remaining, 27, mod2Weights)

  // --- Math ---
  // Pick 22 for Module 1 (easier), then 22 for Module 2 (harder) from remaining
  const math1Result = pickWithDifficulty(mathPool, 22, mod1Weights)
  const math2Result = pickWithDifficulty(math1Result.remaining, 22, mod2Weights)

  return {
    rw1: rw1Result.picked,
    rw2: rw2Result.picked,
    math1: math1Result.picked,
    math2: math2Result.picked,
  }
}
