/**
 * Shared scoring utilities for SAT & ACT practice tests.
 * Used by FullTest (score report + DB save) and Progress (test history dashboard).
 */

export interface TestAnswer {
  question_id: string
  selected: string | null
  correct: string
  category: string
  subcategory?: string
  question_text?: string
}

export interface SATScore {
  total: number
  rw: number
  math: number
}

export interface ACTScore {
  composite: number
  english: number
  math: number
  reading: number
  science?: number
  sections: Record<string, { correct: number; total: number; scaled: number }>
}

/**
 * Compute estimated SAT score from an answer array.
 * SAT: 400-1600 total, 200-800 per section (RW + Math).
 */
export function computeSATScore(answers: TestAnswer[]): SATScore {
  const rwAnswers = answers.filter((a) => a.category === 'reading' || a.category === 'writing')
  const mathAnswers = answers.filter((a) => a.category === 'math')
  const rwPct =
    rwAnswers.length > 0
      ? rwAnswers.filter((a) => a.selected === a.correct).length / rwAnswers.length
      : 0
  const mathPct =
    mathAnswers.length > 0
      ? mathAnswers.filter((a) => a.selected === a.correct).length / mathAnswers.length
      : 0
  const rwScore = Math.round(200 + rwPct * 600)
  const mathScore = Math.round(200 + mathPct * 600)
  return { total: rwScore + mathScore, rw: rwScore, math: mathScore }
}

/**
 * Compute estimated ACT score from an answer array.
 * ACT 2025 Enhanced: composite = average of English, Math, Reading (1-36).
 * Science is scored separately but NOT included in composite.
 */
export function computeACTScore(answers: TestAnswer[]): ACTScore {
  const rawSections: Record<string, { correct: number; total: number }> = {}
  answers.forEach((a) => {
    const cat = a.category
    if (!rawSections[cat]) rawSections[cat] = { correct: 0, total: 0 }
    rawSections[cat].total++
    if (a.selected === a.correct) rawSections[cat].correct++
  })

  // Scale each section to 1-36
  const sections: Record<string, { correct: number; total: number; scaled: number }> = {}
  for (const [key, v] of Object.entries(rawSections)) {
    const scaled = v.total > 0 ? Math.round(1 + (v.correct / v.total) * 35) : 1
    sections[key] = { ...v, scaled }
  }

  const englishScore = sections.english?.scaled ?? 1
  const mathScore = sections.math?.scaled ?? 1
  const readingScore = sections.reading?.scaled ?? 1
  const scienceScore = sections.science?.scaled

  // Composite = average of English, Math, Reading only (2025 Enhanced ACT)
  const coreSections = [englishScore, mathScore, readingScore].filter((s) => s > 0)
  const composite =
    coreSections.length > 0
      ? Math.round(coreSections.reduce((a, b) => a + b, 0) / coreSections.length)
      : 1

  return {
    composite,
    english: englishScore,
    math: mathScore,
    reading: readingScore,
    science: scienceScore,
    sections,
  }
}

/**
 * Determine test type (SAT or ACT) from answer categories.
 * Presence of 'english' or 'science' categories implies ACT.
 */
export function inferTestType(answers: TestAnswer[]): 'sat' | 'act' {
  const categories = new Set(answers.map((a) => a.category))
  if (categories.has('english') || categories.has('science')) return 'act'
  return 'sat'
}

/**
 * Compute category and subcategory breakdown from answers.
 */
export function computeCategoryBreakdown(
  answers: TestAnswer[]
): Record<
  string,
  {
    correct: number
    total: number
    pct: number
    subcategories: Record<string, { correct: number; total: number; pct: number }>
  }
> {
  const result: Record<
    string,
    {
      correct: number
      total: number
      pct: number
      subcategories: Record<string, { correct: number; total: number; pct: number }>
    }
  > = {}
  answers.forEach((a) => {
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
  for (const stats of Object.values(result)) {
    stats.pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0
    for (const subStats of Object.values(stats.subcategories)) {
      subStats.pct = subStats.total > 0 ? Math.round((subStats.correct / subStats.total) * 100) : 0
    }
  }
  return result
}
