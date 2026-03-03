/**
 * Test Configuration — SAT & ACT 2026 Format
 *
 * SAT: 2h 14m testing (2h 34m with breaks)
 *   - 98 questions: 54 Reading & Writing + 44 Math
 *   - 4 modules: RW1 (27q/32m), RW2 (27q/32m), Math1 (22q/35m), Math2 (22q/35m)
 *   - 10-min break between RW and Math sections
 *
 * ACT: 2h 15m core (3h 25m with optional Writing)
 *   - 171 questions: 50 English + 45 Math + 36 Reading + 40 Science
 *   - Optional Writing: 40-min essay scored 2–12
 *   - 10-min break after Math section
 */

export const SAT_CONFIG = {
  name: 'SAT',
  totalQuestions: 98,
  totalTimeMinutes: 134, // 2h 14m
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

export const ACT_CONFIG = {
  name: 'ACT',
  totalQuestions: 171,
  totalTimeMinutes: 135, // 2h 15m (core)
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
      timeMinutes: 30,
    },
    {
      id: 'science',
      name: 'Science',
      shortName: 'Science',
      category: 'science',
      questionCount: 40,
      timeMinutes: 30,
    },
    {
      id: 'break2',
      name: 'Break',
      type: 'break',
      timeMinutes: 5,
      optional: true, // only if taking writing
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

/** Lookup table for available full tests.
 *  SAT uses a randomized question pool — every attempt draws fresh questions.
 *  ACT is not yet available (needs question pool).
 */
export const AVAILABLE_TESTS = {
  sat: [
    {
      id: 'sat-random',
      name: 'SAT Practice Test',
      config: 'SAT',
      description: 'Randomized from a pool of 300+ questions — every attempt is unique.',
      repeatable: true,
    },
  ],
  act: [],
}
