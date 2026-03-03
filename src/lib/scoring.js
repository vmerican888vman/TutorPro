/**
 * Shared scoring utilities for SAT & ACT practice tests.
 * Used by FullTest (score report + DB save) and Progress (test history dashboard).
 */

/**
 * Compute estimated SAT score from an answer array.
 * SAT: 400-1600 total, 200-800 per section (RW + Math).
 * @param {Array} answers - Array of { selected, correct, category, ... }
 * @returns {{ total: number, rw: number, math: number }}
 */
export function computeSATScore(answers) {
  const rwAnswers = answers.filter(a => a.category === 'reading')
  const mathAnswers = answers.filter(a => a.category === 'math')
  const rwPct = rwAnswers.length > 0
    ? rwAnswers.filter(a => a.selected === a.correct).length / rwAnswers.length
    : 0
  const mathPct = mathAnswers.length > 0
    ? mathAnswers.filter(a => a.selected === a.correct).length / mathAnswers.length
    : 0
  const rwScore = Math.round(200 + rwPct * 600)
  const mathScore = Math.round(200 + mathPct * 600)
  return { total: rwScore + mathScore, rw: rwScore, math: mathScore }
}

/**
 * Compute estimated ACT score from an answer array.
 * ACT: 1-36 composite (average of section scores).
 * @param {Array} answers - Array of { selected, correct, category, ... }
 * @returns {{ total: number, sections: Object }}
 */
export function computeACTScore(answers) {
  const sections = {}
  answers.forEach(a => {
    const cat = a.category
    if (!sections[cat]) sections[cat] = { correct: 0, total: 0 }
    sections[cat].total++
    if (a.selected === a.correct) sections[cat].correct++
  })
  const sectionScores = Object.entries(sections).map(([key, v]) => ({
    key,
    score: v.total > 0 ? Math.round(1 + (v.correct / v.total) * 35) : 1,
  }))
  const composite = sectionScores.length > 0
    ? Math.round(sectionScores.reduce((a, b) => a + b.score, 0) / sectionScores.length)
    : 1
  return { total: composite, sections }
}

/**
 * Determine test type (SAT or ACT) from answer categories.
 * Presence of 'english' or 'science' categories implies ACT.
 * @param {Array} answers
 * @returns {'sat' | 'act'}
 */
export function inferTestType(answers) {
  const categories = new Set(answers.map(a => a.category))
  if (categories.has('english') || categories.has('science')) return 'act'
  return 'sat'
}

/**
 * Compute category and subcategory breakdown from answers.
 * @param {Array} answers
 * @returns {Object} { [category]: { correct, total, pct, subcategories: { [sub]: { correct, total, pct } } } }
 */
export function computeCategoryBreakdown(answers) {
  const result = {}
  answers.forEach(a => {
    const cat = a.category
    if (!result[cat]) result[cat] = { correct: 0, total: 0, pct: 0, subcategories: {} }
    result[cat].total++
    if (a.selected === a.correct) result[cat].correct++
    const sub = a.subcategory
    if (sub) {
      if (!result[cat].subcategories[sub]) {
        result[cat].subcategories[sub] = { correct: 0, total: 0, pct: 0 }
      }
      result[cat].subcategories[sub].total++
      if (a.selected === a.correct) result[cat].subcategories[sub].correct++
    }
  })
  // Calculate percentages
  for (const stats of Object.values(result)) {
    stats.pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    for (const subStats of Object.values(stats.subcategories)) {
      subStats.pct = subStats.total > 0 ? Math.round((subStats.correct / subStats.total) * 100) : 0
    }
  }
  return result
}

/**
 * Parse a full test session's answers field (handles both legacy array and new meta+questions format).
 * @param {Object} session - A practice_sessions row
 * @returns {{ meta: Object|null, questions: Array }}
 */
export function parseTestAnswers(session) {
  if (Array.isArray(session.answers)) {
    return { meta: null, questions: session.answers }
  }
  return {
    meta: session.answers?.meta || null,
    questions: session.answers?.questions || [],
  }
}

/**
 * Compute score for a full test session (auto-detects SAT vs ACT).
 * @param {Object} session - A practice_sessions row
 * @returns {{ testType: string, score: Object }}
 */
export function computeSessionScore(session) {
  const { meta, questions } = parseTestAnswers(session)
  if (meta?.estimatedScore) {
    return {
      testType: meta.testType || inferTestType(questions),
      score: meta.estimatedScore,
    }
  }
  const testType = inferTestType(questions)
  const score = testType === 'sat' ? computeSATScore(questions) : computeACTScore(questions)
  return { testType, score }
}
