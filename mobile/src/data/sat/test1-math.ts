import type { SATQuestion } from './types'

export const satTest1Math: SATQuestion[] = [
  // ═══════════════════════════════════════════════════════════════════
  // MODULE 1 — math1 (questions 1–22, leans slightly easier)
  // ═══════════════════════════════════════════════════════════════════

  // ── Algebra & Linear Equations ─────────────────────────────────────
  {
    id: 'sat1_math_001',
    section: 'math1',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 5x − 3 = 17, what is the value of x?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '7' },
    ],
    correct: 'B',
    explanation:
      'Add 3 to both sides: 5x = 20. Divide both sides by 5: x = 4.',
  },
  {
    id: 'sat1_math_002',
    section: 'math1',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'easy',
    passage: null,
    question:
      'A line passes through the points (0, 5) and (3, 11). What is the slope of this line?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '6' },
    ],
    correct: 'A',
    explanation:
      'Slope = (y₂ − y₁) / (x₂ − x₁) = (11 − 5) / (3 − 0) = 6/3 = 2.',
  },
  {
    id: 'sat1_math_003',
    section: 'math1',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question:
      'Which of the following is equivalent to 3(2x − 4) + 5?',
    options: [
      { letter: 'A', text: '6x − 7' },
      { letter: 'B', text: '6x − 12' },
      { letter: 'C', text: '6x + 1' },
      { letter: 'D', text: '6x − 17' },
    ],
    correct: 'A',
    explanation:
      'Distribute: 3(2x − 4) + 5 = 6x − 12 + 5 = 6x − 7.',
  },
  {
    id: 'sat1_math_004',
    section: 'math1',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'easy',
    passage: null,
    question:
      'A gym charges a one-time enrollment fee of $50 plus $30 per month. Which equation represents the total cost C, in dollars, after m months?',
    options: [
      { letter: 'A', text: 'C = 50m + 30' },
      { letter: 'B', text: 'C = 30m + 50' },
      { letter: 'C', text: 'C = 80m' },
      { letter: 'D', text: 'C = 30m − 50' },
    ],
    correct: 'B',
    explanation:
      'The monthly cost is $30 per month (the rate), so the variable term is 30m. The enrollment fee of $50 is a one-time fixed cost. Total: C = 30m + 50.',
  },
  {
    id: 'sat1_math_005',
    section: 'math1',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If 2(x + 3) = 5x − 9, what is the value of x?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '15' },
    ],
    correct: 'C',
    explanation:
      'Distribute: 2x + 6 = 5x − 9. Subtract 2x: 6 = 3x − 9. Add 9: 15 = 3x. Divide by 3: x = 5.',
  },
  {
    id: 'sat1_math_006',
    section: 'math1',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'medium',
    passage: null,
    question:
      'If 2x + y = 10 and x − y = 2, what is the value of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '6' },
    ],
    correct: 'B',
    explanation:
      'Add the two equations: (2x + y) + (x − y) = 10 + 2, which gives 3x = 12, so x = 4.',
  },
  {
    id: 'sat1_math_007',
    section: 'math1',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'medium',
    passage: null,
    question:
      'The line y = −(2/3)x + 8 is graphed in the xy-plane. What is the x-intercept of this line?',
    options: [
      { letter: 'A', text: '(8, 0)' },
      { letter: 'B', text: '(12, 0)' },
      { letter: 'C', text: '(6, 0)' },
      { letter: 'D', text: '(0, 8)' },
    ],
    correct: 'B',
    explanation:
      'Set y = 0: 0 = −(2/3)x + 8. Then (2/3)x = 8, so x = 8 × (3/2) = 12. The x-intercept is (12, 0).',
  },

  // ── Advanced Math ──────────────────────────────────────────────────
  {
    id: 'sat1_math_008',
    section: 'math1',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'easy',
    passage: null,
    question: 'What are the solutions to x² − 9 = 0?',
    options: [
      { letter: 'A', text: 'x = 3 only' },
      { letter: 'B', text: 'x = −3 only' },
      { letter: 'C', text: 'x = 3 or x = −3' },
      { letter: 'D', text: 'x = 9 or x = −9' },
    ],
    correct: 'C',
    explanation:
      'Factor as a difference of squares: (x − 3)(x + 3) = 0. So x = 3 or x = −3.',
  },
  {
    id: 'sat1_math_009',
    section: 'math1',
    category: 'math',
    subcategory: 'exponential',
    difficulty: 'easy',
    passage: null,
    question:
      'A bacteria population doubles every hour. If there are 200 bacteria at time t = 0, how many bacteria are there at t = 3 hours?',
    options: [
      { letter: 'A', text: '600' },
      { letter: 'B', text: '800' },
      { letter: 'C', text: '1,200' },
      { letter: 'D', text: '1,600' },
    ],
    correct: 'D',
    explanation:
      'The population doubles each hour: after 1 hour: 400, after 2 hours: 800, after 3 hours: 1,600. Or use the formula: 200 × 2³ = 200 × 8 = 1,600.',
  },
  {
    id: 'sat1_math_010',
    section: 'math1',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'easy',
    passage: null,
    question:
      'Which of the following is equivalent to (x + 4)(x − 6)?',
    options: [
      { letter: 'A', text: 'x² − 2x − 24' },
      { letter: 'B', text: 'x² + 2x − 24' },
      { letter: 'C', text: 'x² − 2x + 24' },
      { letter: 'D', text: 'x² − 10x − 24' },
    ],
    correct: 'A',
    explanation:
      'FOIL: x·x + x·(−6) + 4·x + 4·(−6) = x² − 6x + 4x − 24 = x² − 2x − 24.',
  },
  {
    id: 'sat1_math_011',
    section: 'math1',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'medium',
    passage: null,
    question:
      'If f(x) = x³ − 4x, what is the value of f(−2)?',
    options: [
      { letter: 'A', text: '−16' },
      { letter: 'B', text: '0' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '16' },
    ],
    correct: 'B',
    explanation:
      'f(−2) = (−2)³ − 4(−2) = −8 − (−8) = −8 + 8 = 0.',
  },
  {
    id: 'sat1_math_012',
    section: 'math1',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'medium',
    passage: null,
    question:
      'If f(x) = 3x + 2 and g(x) = x² − 1, what is the value of f(g(2))?',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '11' },
      { letter: 'C', text: '14' },
      { letter: 'D', text: '23' },
    ],
    correct: 'B',
    explanation:
      'First find g(2) = 2² − 1 = 4 − 1 = 3. Then f(3) = 3(3) + 2 = 9 + 2 = 11.',
  },
  {
    id: 'sat1_math_013',
    section: 'math1',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'hard',
    passage: null,
    question:
      'A ball is thrown upward from the top of a building. Its height h, in feet, after t seconds is modeled by h(t) = −16t² + 48t + 64. What is the maximum height of the ball?',
    options: [
      { letter: 'A', text: '96 feet' },
      { letter: 'B', text: '100 feet' },
      { letter: 'C', text: '112 feet' },
      { letter: 'D', text: '128 feet' },
    ],
    correct: 'B',
    explanation:
      'The vertex occurs at t = −b/(2a) = −48/(2 × −16) = −48/(−32) = 1.5 seconds. h(1.5) = −16(1.5)² + 48(1.5) + 64 = −16(2.25) + 72 + 64 = −36 + 72 + 64 = 100. The maximum height is 100 feet.',
  },

  // ── Problem Solving & Data Analysis ────────────────────────────────
  {
    id: 'sat1_math_014',
    section: 'math1',
    category: 'math',
    subcategory: 'ratios',
    difficulty: 'easy',
    passage: null,
    question:
      'A recipe calls for flour and sugar in a ratio of 5:2. If a baker uses 15 cups of flour, how many cups of sugar are needed?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '10' },
    ],
    correct: 'B',
    explanation:
      'The ratio is 5:2. If flour = 15, then 15/5 = 3 is the scale factor. Sugar = 2 × 3 = 6 cups.',
  },
  {
    id: 'sat1_math_015',
    section: 'math1',
    category: 'math',
    subcategory: 'percentages',
    difficulty: 'easy',
    passage: null,
    question:
      'A shirt originally costs $40. It is on sale for 25% off. What is the sale price?',
    options: [
      { letter: 'A', text: '$10' },
      { letter: 'B', text: '$15' },
      { letter: 'C', text: '$25' },
      { letter: 'D', text: '$30' },
    ],
    correct: 'D',
    explanation:
      '25% of $40 = 0.25 × 40 = $10 discount. Sale price = $40 − $10 = $30.',
  },
  {
    id: 'sat1_math_016',
    section: 'math1',
    category: 'math',
    subcategory: 'statistics',
    difficulty: 'medium',
    passage: null,
    question:
      'The ages of five employees are 24, 28, 31, 35, and 42. What is the mean age of the employees?',
    options: [
      { letter: 'A', text: '28' },
      { letter: 'B', text: '31' },
      { letter: 'C', text: '32' },
      { letter: 'D', text: '35' },
    ],
    correct: 'C',
    explanation:
      'Mean = (24 + 28 + 31 + 35 + 42) / 5 = 160 / 5 = 32.',
  },
  {
    id: 'sat1_math_017',
    section: 'math1',
    category: 'math',
    subcategory: 'data-analysis',
    difficulty: 'medium',
    passage: null,
    question:
      'A survey of 200 students found that 120 play a sport and 90 are in a club. If 50 students both play a sport and are in a club, how many students do neither?',
    options: [
      { letter: 'A', text: '30' },
      { letter: 'B', text: '40' },
      { letter: 'C', text: '50' },
      { letter: 'D', text: '60' },
    ],
    correct: 'B',
    explanation:
      'Using inclusion-exclusion: students in at least one activity = 120 + 90 − 50 = 160. Students doing neither = 200 − 160 = 40.',
  },

  // ── Geometry & Trigonometry ────────────────────────────────────────
  {
    id: 'sat1_math_018',
    section: 'math1',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'easy',
    passage: null,
    question:
      'A rectangle has a length of 12 cm and a width of 5 cm. What is the area of the rectangle?',
    options: [
      { letter: 'A', text: '17 cm²' },
      { letter: 'B', text: '34 cm²' },
      { letter: 'C', text: '60 cm²' },
      { letter: 'D', text: '120 cm²' },
    ],
    correct: 'C',
    explanation: 'Area = length × width = 12 × 5 = 60 cm².',
  },
  {
    id: 'sat1_math_019',
    section: 'math1',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'medium',
    passage: null,
    question:
      'In a right triangle, one leg is 6 and the hypotenuse is 10. What is the length of the other leg?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '12' },
    ],
    correct: 'C',
    explanation:
      'By the Pythagorean theorem: a² + b² = c². So 6² + b² = 10², meaning 36 + b² = 100, b² = 64, b = 8.',
  },
  {
    id: 'sat1_math_020',
    section: 'math1',
    category: 'math',
    subcategory: 'circles',
    difficulty: 'medium',
    passage: null,
    question:
      'A circle has a radius of 7 inches. What is the area of the circle?',
    options: [
      { letter: 'A', text: '14π square inches' },
      { letter: 'B', text: '49π square inches' },
      { letter: 'C', text: '7π square inches' },
      { letter: 'D', text: '98π square inches' },
    ],
    correct: 'B',
    explanation: 'Area = πr² = π(7)² = 49π square inches.',
  },
  {
    id: 'sat1_math_021',
    section: 'math1',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'easy',
    passage: null,
    question:
      'Two angles of a triangle measure 55° and 70°. What is the measure of the third angle?',
    options: [
      { letter: 'A', text: '45°' },
      { letter: 'B', text: '55°' },
      { letter: 'C', text: '65°' },
      { letter: 'D', text: '125°' },
    ],
    correct: 'B',
    explanation:
      'The sum of angles in a triangle is 180°. Third angle = 180° − 55° − 70° = 55°.',
  },
  {
    id: 'sat1_math_022',
    section: 'math1',
    category: 'math',
    subcategory: 'trigonometry',
    difficulty: 'hard',
    passage: null,
    question:
      'In right triangle ABC, angle C is the right angle, AC = 5, and BC = 12. What is the value of sin(A)?',
    options: [
      { letter: 'A', text: '5/13' },
      { letter: 'B', text: '12/13' },
      { letter: 'C', text: '5/12' },
      { letter: 'D', text: '12/5' },
    ],
    correct: 'B',
    explanation:
      'First find the hypotenuse AB: AB = √(5² + 12²) = √(25 + 144) = √169 = 13. sin(A) = opposite/hypotenuse = BC/AB = 12/13.',
  },

  // ═══════════════════════════════════════════════════════════════════
  // MODULE 2 — math2 (questions 23–44, leans slightly harder)
  // ═══════════════════════════════════════════════════════════════════

  // ── Algebra & Linear Equations ─────────────────────────────────────
  {
    id: 'sat1_math_023',
    section: 'math2',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question:
      'If (3/4)x − 2 = 7, what is the value of x?',
    options: [
      { letter: 'A', text: '6' },
      { letter: 'B', text: '9' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '15' },
    ],
    correct: 'C',
    explanation:
      'Add 2 to both sides: (3/4)x = 9. Multiply both sides by 4/3: x = 9 × (4/3) = 36/3 = 12.',
  },
  {
    id: 'sat1_math_024',
    section: 'math2',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'medium',
    passage: null,
    question:
      'At a bookstore, Maya buys 3 notebooks and 2 pens for $14. Noah buys 1 notebook and 4 pens for $12. What is the cost of one notebook?',
    options: [
      { letter: 'A', text: '$2' },
      { letter: 'B', text: '$2.20' },
      { letter: 'C', text: '$3' },
      { letter: 'D', text: '$3.20' },
    ],
    correct: 'D',
    explanation:
      'Let n = cost of notebook, p = cost of pen. 3n + 2p = 14 and n + 4p = 12. From the second equation: n = 12 − 4p. Substitute into the first: 3(12 − 4p) + 2p = 14, so 36 − 12p + 2p = 14, giving −10p = −22, so p = 2.20. Then n = 12 − 4(2.20) = 12 − 8.80 = 3.20. The cost of one notebook is $3.20.',
  },
  {
    id: 'sat1_math_025',
    section: 'math2',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'hard',
    passage: null,
    question:
      'The equation 4x − 2y = 10 and the equation 6x − 3y = k represent the same line. What is the value of k?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '15' },
      { letter: 'D', text: '20' },
    ],
    correct: 'C',
    explanation:
      'For the lines to be the same, one equation must be a scalar multiple of the other. Multiply the first equation by 3/2: (3/2)(4x − 2y) = (3/2)(10) gives 6x − 3y = 15. So k = 15.',
  },
  {
    id: 'sat1_math_026',
    section: 'math2',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question:
      'If |2x − 5| = 11, what is the sum of all possible values of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '11' },
    ],
    correct: 'B',
    explanation:
      'Case 1: 2x − 5 = 11, so 2x = 16, x = 8. Case 2: 2x − 5 = −11, so 2x = −6, x = −3. Sum = 8 + (−3) = 5.',
  },
  {
    id: 'sat1_math_027',
    section: 'math2',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'hard',
    passage: null,
    question:
      'For what value of a does the system of equations 2x + 3y = 7 and 4x + ay = 14 have infinitely many solutions?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '14' },
    ],
    correct: 'B',
    explanation:
      'For infinitely many solutions, the second equation must be a multiple of the first. Multiply the first by 2: 4x + 6y = 14. This matches 4x + ay = 14 when a = 6.',
  },
  {
    id: 'sat1_math_028',
    section: 'math2',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'easy',
    passage: null,
    question:
      'A car rental company charges $45 per day plus $0.20 per mile driven. If a customer was charged $105 for a one-day rental, how many miles did the customer drive?',
    options: [
      { letter: 'A', text: '200' },
      { letter: 'B', text: '300' },
      { letter: 'C', text: '525' },
      { letter: 'D', text: '750' },
    ],
    correct: 'B',
    explanation:
      'Total = 45 + 0.20m = 105. So 0.20m = 60, m = 60 / 0.20 = 300 miles.',
  },

  // ── Advanced Math ──────────────────────────────────────────────────
  {
    id: 'sat1_math_029',
    section: 'math2',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'easy',
    passage: null,
    question:
      'What is the vertex of the parabola y = (x − 3)² + 5?',
    options: [
      { letter: 'A', text: '(3, 5)' },
      { letter: 'B', text: '(−3, 5)' },
      { letter: 'C', text: '(3, −5)' },
      { letter: 'D', text: '(−3, −5)' },
    ],
    correct: 'A',
    explanation:
      'The equation is in vertex form y = (x − h)² + k, where the vertex is (h, k). Here h = 3 and k = 5, so the vertex is (3, 5).',
  },
  {
    id: 'sat1_math_030',
    section: 'math2',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'hard',
    passage: null,
    question:
      'For what values of x is x² − 5x + 6 ≤ 0?',
    options: [
      { letter: 'A', text: 'x ≤ 2 or x ≥ 3' },
      { letter: 'B', text: '2 ≤ x ≤ 3' },
      { letter: 'C', text: 'x ≤ −3 or x ≥ −2' },
      { letter: 'D', text: '−3 ≤ x ≤ −2' },
    ],
    correct: 'B',
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3). The roots are x = 2 and x = 3. Since the parabola opens upward, the expression is ≤ 0 between the roots: 2 ≤ x ≤ 3.',
  },
  {
    id: 'sat1_math_031',
    section: 'math2',
    category: 'math',
    subcategory: 'exponential',
    difficulty: 'medium',
    passage: null,
    question:
      'The value of a car depreciates by 15% each year. If the car is worth $20,000 today, which expression gives its value after t years?',
    options: [
      { letter: 'A', text: '20000(0.15)ᵗ' },
      { letter: 'B', text: '20000(0.85)ᵗ' },
      { letter: 'C', text: '20000(1.15)ᵗ' },
      { letter: 'D', text: '20000 − 0.15t' },
    ],
    correct: 'B',
    explanation:
      'Depreciation of 15% means the car retains 85% of its value each year. The decay factor is 1 − 0.15 = 0.85. Value = 20000(0.85)ᵗ.',
  },
  {
    id: 'sat1_math_032',
    section: 'math2',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'hard',
    passage: null,
    question:
      'If x² + bx + 10 = (x + 2)(x + c) for all values of x, what is the value of b?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '20' },
    ],
    correct: 'B',
    explanation:
      'Expand the right side: (x + 2)(x + c) = x² + cx + 2x + 2c = x² + (c + 2)x + 2c. Matching the constant term: 2c = 10, so c = 5. Then b = c + 2 = 5 + 2 = 7.',
  },
  {
    id: 'sat1_math_033',
    section: 'math2',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'hard',
    passage: null,
    question:
      'Which of the following is equivalent to (x² − 4) / (x + 2) for x ≠ −2?',
    options: [
      { letter: 'A', text: 'x − 2' },
      { letter: 'B', text: 'x + 2' },
      { letter: 'C', text: 'x² − 2' },
      { letter: 'D', text: '(x − 4) / 2' },
    ],
    correct: 'A',
    explanation:
      'Factor the numerator: x² − 4 = (x − 2)(x + 2). Then (x − 2)(x + 2) / (x + 2) = x − 2, for x ≠ −2.',
  },
  {
    id: 'sat1_math_034',
    section: 'math2',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'medium',
    passage: null,
    question:
      'If f(x) = 2x² − 3x + 1, what is f(−1)?',
    options: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '6' },
      { letter: 'D', text: '−4' },
    ],
    correct: 'C',
    explanation:
      'f(−1) = 2(−1)² − 3(−1) + 1 = 2(1) + 3 + 1 = 2 + 3 + 1 = 6.',
  },

  // ── Problem Solving & Data Analysis ────────────────────────────────
  {
    id: 'sat1_math_035',
    section: 'math2',
    category: 'math',
    subcategory: 'percentages',
    difficulty: 'medium',
    passage: null,
    question:
      'A store increases the price of an item by 20%, then offers a 20% discount on the new price. Compared to the original price, the final price is:',
    options: [
      { letter: 'A', text: 'Equal to the original' },
      { letter: 'B', text: '4% less than the original' },
      { letter: 'C', text: '4% more than the original' },
      { letter: 'D', text: '2% less than the original' },
    ],
    correct: 'B',
    explanation:
      'Let the original price be $100. After a 20% increase: $120. After a 20% discount: $120 × 0.80 = $96. That is $4 less than the original, or 4% less.',
  },
  {
    id: 'sat1_math_036',
    section: 'math2',
    category: 'math',
    subcategory: 'probability',
    difficulty: 'medium',
    passage: null,
    question:
      'A bag contains 4 red marbles, 6 blue marbles, and 5 green marbles. If one marble is chosen at random, what is the probability that it is NOT blue?',
    options: [
      { letter: 'A', text: '2/5' },
      { letter: 'B', text: '3/5' },
      { letter: 'C', text: '2/3' },
      { letter: 'D', text: '1/3' },
    ],
    correct: 'B',
    explanation:
      'Total marbles = 4 + 6 + 5 = 15. Non-blue marbles = 4 + 5 = 9. Probability = 9/15 = 3/5.',
  },
  {
    id: 'sat1_math_037',
    section: 'math2',
    category: 'math',
    subcategory: 'statistics',
    difficulty: 'hard',
    passage: null,
    question:
      'The median of a data set of 9 values is 15. If a new value of 30 is added to the set, which of the following must be true about the new median?',
    options: [
      { letter: 'A', text: 'The median increases' },
      { letter: 'B', text: 'The median stays the same' },
      { letter: 'C', text: 'The median is ≥ 15' },
      { letter: 'D', text: 'The median is 22.5' },
    ],
    correct: 'C',
    explanation:
      'With 9 values, the median is the 5th value. Adding a value of 30 (which is above the median) gives 10 values, so the new median is the average of the 5th and 6th values. Since 30 is placed above the current median, the 5th value stays at least 15, and the 6th value is ≥ 15. Their average is ≥ 15.',
  },
  {
    id: 'sat1_math_038',
    section: 'math2',
    category: 'math',
    subcategory: 'data-analysis',
    difficulty: 'medium',
    passage: null,
    question:
      'In a class of 30 students, 18 study Spanish and 10 study French. If 5 students study both languages, what fraction of the class studies exactly one language?',
    options: [
      { letter: 'A', text: '13/30' },
      { letter: 'B', text: '23/30' },
      { letter: 'C', text: '3/5' },
      { letter: 'D', text: '7/30' },
    ],
    correct: 'C',
    explanation:
      'Students studying only Spanish = 18 − 5 = 13. Students studying only French = 10 − 5 = 5. Students studying exactly one language = 13 + 5 = 18. Fraction = 18/30 = 3/5.',
  },
  {
    id: 'sat1_math_039',
    section: 'math2',
    category: 'math',
    subcategory: 'ratios',
    difficulty: 'medium',
    passage: null,
    question:
      'A map uses a scale of 1 inch : 25 miles. If two cities are 3.5 inches apart on the map, what is the actual distance between the cities?',
    options: [
      { letter: 'A', text: '75 miles' },
      { letter: 'B', text: '82.5 miles' },
      { letter: 'C', text: '87.5 miles' },
      { letter: 'D', text: '100 miles' },
    ],
    correct: 'C',
    explanation:
      'Actual distance = 3.5 × 25 = 87.5 miles.',
  },

  // ── Geometry & Trigonometry ────────────────────────────────────────
  {
    id: 'sat1_math_040',
    section: 'math2',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'medium',
    passage: null,
    question:
      'A cylinder has a radius of 4 cm and a height of 9 cm. What is the volume of the cylinder?',
    options: [
      { letter: 'A', text: '36π cm³' },
      { letter: 'B', text: '72π cm³' },
      { letter: 'C', text: '144π cm³' },
      { letter: 'D', text: '324π cm³' },
    ],
    correct: 'C',
    explanation:
      'Volume = πr²h = π(4)²(9) = π(16)(9) = 144π cm³.',
  },
  {
    id: 'sat1_math_041',
    section: 'math2',
    category: 'math',
    subcategory: 'circles',
    difficulty: 'medium',
    passage: null,
    question:
      'The equation of a circle in the xy-plane is (x − 3)² + (y + 2)² = 25. What is the length of the diameter of this circle?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '10' },
      { letter: 'C', text: '25' },
      { letter: 'D', text: '50' },
    ],
    correct: 'B',
    explanation:
      'The equation is in standard form (x − h)² + (y − k)² = r². Here r² = 25, so r = 5. Diameter = 2r = 10.',
  },
  {
    id: 'sat1_math_042',
    section: 'math2',
    category: 'math',
    subcategory: 'trigonometry',
    difficulty: 'hard',
    passage: null,
    question:
      'A 20-foot ladder leans against a wall, making a 60° angle with the ground. How high up the wall does the ladder reach?',
    options: [
      { letter: 'A', text: '10 feet' },
      { letter: 'B', text: '10√3 feet' },
      { letter: 'C', text: '20√3 feet' },
      { letter: 'D', text: '40 feet' },
    ],
    correct: 'B',
    explanation:
      'The height is the side opposite the 60° angle. sin(60°) = opposite/hypotenuse = height/20. sin(60°) = √3/2, so height = 20 × (√3/2) = 10√3 feet.',
  },
  {
    id: 'sat1_math_043',
    section: 'math2',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'hard',
    passage: null,
    question:
      'In the xy-plane, what is the distance between the points (−2, 3) and (4, −5)?',
    options: [
      { letter: 'A', text: '6' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '14' },
    ],
    correct: 'C',
    explanation:
      'Distance = √[(4 − (−2))² + (−5 − 3)²] = √[(6)² + (−8)²] = √[36 + 64] = √100 = 10.',
  },
  {
    id: 'sat1_math_044',
    section: 'math2',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'hard',
    passage: null,
    question:
      'A cone has a base radius of 6 cm and a slant height of 10 cm. What is the lateral surface area of the cone?',
    options: [
      { letter: 'A', text: '36π cm²' },
      { letter: 'B', text: '60π cm²' },
      { letter: 'C', text: '96π cm²' },
      { letter: 'D', text: '120π cm²' },
    ],
    correct: 'B',
    explanation:
      'Lateral surface area of a cone = πrl, where r is the radius and l is the slant height. Lateral area = π(6)(10) = 60π cm².',
  },
];
