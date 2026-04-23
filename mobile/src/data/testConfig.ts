/**
 * Test Configuration — SAT & ACT 2026 Format
 *
 * SAT: 2h 14m testing (2h 34m with breaks)
 *   - 98 questions: 54 Reading & Writing + 44 Math
 *   - 4 modules: RW1 (27q/32m), RW2 (27q/32m), Math1 (22q/35m), Math2 (22q/35m)
 *   - 10-min break between RW and Math sections
 *
 * ACT (2025 Enhanced): ~2h 5m core (2h 45m with Science)
 *   - Core: 131 questions — 50 English + 45 Math + 36 Reading
 *   - Optional Science: 40 questions, 40 min (not in composite)
 *   - Optional Writing: 40-min essay scored 2–12
 *   - 10-min break after Math section
 *   - Composite: average of English, Math, Reading (1-36)
 */

export interface TestSection {
  id: string
  name: string
  shortName?: string
  category?: string
  questionCount?: number
  timeMinutes: number
  type?: 'break' | 'essay'
  optional?: boolean
  scoring?: {
    domains: string[]
    scalePerDomain: { min: number; max: number }
    overallScale: { min: number; max: number }
  }
}

export interface TestConfig {
  name: string
  totalQuestions: number
  totalTimeMinutes: number
  scoreRange: { min: number; max: number }
  sections: TestSection[]
}

export interface AvailableTest {
  id: string
  name: string
  config: string
  description: string
  repeatable: boolean
}

export const SAT_CONFIG: TestConfig = {
  name: 'SAT',
  totalQuestions: 98,
  totalTimeMinutes: 134,
  scoreRange: { min: 400, max: 1600 },
  sections: [
    {
      id: 'rw1',
      name: 'Reading & Writing — Module 1',
      shortName: 'RW Module 1',
      category: 'reading',
      questionCount: 27,
      timeMinutes: 32,
    },
    {
      id: 'rw2',
      name: 'Reading & Writing — Module 2',
      shortName: 'RW Module 2',
      category: 'reading',
      questionCount: 27,
      timeMinutes: 32,
    },
    {
      id: 'break1',
      name: 'Break',
      type: 'break',
      timeMinutes: 10,
    },
    {
      id: 'math1',
      name: 'Math — Module 1',
      shortName: 'Math Module 1',
      category: 'math',
      questionCount: 22,
      timeMinutes: 35,
    },
    {
      id: 'math2',
      name: 'Math — Module 2',
      shortName: 'Math Module 2',
      category: 'math',
      questionCount: 22,
      timeMinutes: 35,
    },
  ],
}

export const ACT_CONFIG: TestConfig = {
  name: 'ACT',
  totalQuestions: 131, // Core: 50 English + 45 Math + 36 Reading (171 with Science)
  totalTimeMinutes: 125, // Core: 35 + 50 + 40 (165 with Science)
  scoreRange: { min: 1, max: 36 },
  sections: [
    {
      id: 'english',
      name: 'English',
      shortName: 'English',
      category: 'english',
      questionCount: 50,
      timeMinutes: 35,
    },
    {
      id: 'math',
      name: 'Mathematics',
      shortName: 'Math',
      category: 'math',
      questionCount: 45,
      timeMinutes: 50,
    },
    {
      id: 'break1',
      name: 'Break',
      type: 'break',
      timeMinutes: 10,
    },
    {
      id: 'reading',
      name: 'Reading',
      shortName: 'Reading',
      category: 'reading',
      questionCount: 36,
      timeMinutes: 40,
    },
    {
      id: 'science',
      name: 'Science (Optional)',
      shortName: 'Science',
      category: 'science',
      questionCount: 40,
      timeMinutes: 40,
      optional: true,
    },
    {
      id: 'break2',
      name: 'Break',
      type: 'break',
      timeMinutes: 5,
      optional: true,
    },
    {
      id: 'writing',
      name: 'Writing (Optional)',
      shortName: 'Writing',
      category: 'writing',
      type: 'essay',
      timeMinutes: 40,
      optional: true,
      scoring: {
        domains: ['Ideas & Analysis', 'Development & Support', 'Organization', 'Language Use & Conventions'],
        scalePerDomain: { min: 2, max: 12 },
        overallScale: { min: 2, max: 12 },
      },
    },
  ],
}

export const AVAILABLE_TESTS: Record<string, AvailableTest[]> = {
  sat: [
    {
      id: 'sat-random',
      name: 'SAT Practice Test',
      config: 'SAT',
      description: 'Randomized from the question pool — every attempt is unique.',
      repeatable: true,
    },
  ],
  act: [
    {
      id: 'act-random',
      name: 'ACT Practice Test',
      config: 'ACT',
      description: 'Enhanced ACT format — every attempt is unique.',
      repeatable: true,
    },
  ],
}
