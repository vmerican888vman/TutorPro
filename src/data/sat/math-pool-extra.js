export const satMathPoolExtra = [
  // ═══════════════════════════════════════════════════════════════════════
  // ALGEBRA (~9 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_045',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 3x + 5 = 20, what is the value of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '15' },
    ],
    correct: 'B',
    explanation:
      'Subtract 5 from both sides: 3x = 15. Divide both sides by 3: x = 5.',
  },
  {
    id: 'sat_math_046',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question:
      'What is the value of 4a − 2b when a = 3 and b = −1?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '14' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '12' },
    ],
    correct: 'B',
    explanation:
      'Substitute: 4(3) − 2(−1) = 12 − (−2) = 12 + 2 = 14.',
  },
  {
    id: 'sat_math_047',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question:
      'Which expression is equivalent to 2(x + 5) − 3(x − 1)?',
    options: [
      { letter: 'A', text: '−x + 13' },
      { letter: 'B', text: '−x + 7' },
      { letter: 'C', text: 'x + 13' },
      { letter: 'D', text: '5x + 7' },
    ],
    correct: 'A',
    explanation:
      'Distribute: 2x + 10 − 3x + 3 = −x + 13.',
  },
  {
    id: 'sat_math_048',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question:
      'If (x/4) + (x/6) = 5, what is the value of x?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '15' },
      { letter: 'D', text: '20' },
    ],
    correct: 'B',
    explanation:
      'Find a common denominator of 12: (3x/12) + (2x/12) = 5, so 5x/12 = 5. Multiply both sides by 12: 5x = 60. Divide by 5: x = 12.',
  },
  {
    id: 'sat_math_049',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question:
      'If 3(2x − 1) = 4x + 9, what is the value of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '6' },
      { letter: 'D', text: '8' },
    ],
    correct: 'C',
    explanation:
      'Distribute: 6x − 3 = 4x + 9. Subtract 4x: 2x − 3 = 9. Add 3: 2x = 12. Divide by 2: x = 6.',
  },
  {
    id: 'sat_math_050',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question:
      'If |4x − 3| = 13, what is the greater of the two possible values of x?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '−2.5' },
      { letter: 'D', text: '2.5' },
    ],
    correct: 'A',
    explanation:
      'Case 1: 4x − 3 = 13, so 4x = 16, x = 4. Case 2: 4x − 3 = −13, so 4x = −10, x = −2.5. The greater value is 4.',
  },
  {
    id: 'sat_math_051',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question:
      'If (2x + 3)/(x − 1) = 5, what is the value of x?',
    options: [
      { letter: 'A', text: '8/3' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '4/3' },
    ],
    correct: 'A',
    explanation:
      'Cross multiply: 2x + 3 = 5(x − 1) = 5x − 5. Subtract 2x: 3 = 3x − 5. Add 5: 8 = 3x. Divide by 3: x = 8/3.',
  },
  {
    id: 'sat_math_052',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question:
      'If 5/(x + 2) + 3/(x + 2) = 2, what is the value of x?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '6' },
    ],
    correct: 'B',
    explanation:
      'Since the denominators are the same, combine: 8/(x + 2) = 2. Multiply both sides by (x + 2): 8 = 2(x + 2) = 2x + 4. Subtract 4: 4 = 2x. Divide by 2: x = 2.',
  },
  {
    id: 'sat_math_053',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question:
      'If a = 2b + 1 and 3a − 4b = 7, what is the value of b?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '4' },
    ],
    correct: 'B',
    explanation:
      'Substitute a = 2b + 1 into the second equation: 3(2b + 1) − 4b = 7. Distribute: 6b + 3 − 4b = 7. Combine: 2b + 3 = 7. Subtract 3: 2b = 4. Divide by 2: b = 2.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // LINEAR EQUATIONS (~9 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_054',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'easy',
    passage: null,
    question:
      'What is the slope of the line y = −3x + 7?',
    options: [
      { letter: 'A', text: '7' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '−3' },
      { letter: 'D', text: '−7' },
    ],
    correct: 'C',
    explanation:
      'The equation is in slope-intercept form y = mx + b. The slope m is the coefficient of x, which is −3.',
  },
  {
    id: 'sat_math_055',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'easy',
    passage: null,
    question:
      'A line has a y-intercept of 4 and passes through the point (2, 10). What is the slope of the line?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '5' },
    ],
    correct: 'B',
    explanation:
      'The y-intercept gives the point (0, 4). Slope = (10 − 4)/(2 − 0) = 6/2 = 3.',
  },
  {
    id: 'sat_math_056',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'easy',
    passage: null,
    question:
      'A plumber charges a flat fee of $75 plus $50 per hour of work. Which equation represents the total charge C for h hours?',
    options: [
      { letter: 'A', text: 'C = 75h + 50' },
      { letter: 'B', text: 'C = 50h + 75' },
      { letter: 'C', text: 'C = 125h' },
      { letter: 'D', text: 'C = 50h − 75' },
    ],
    correct: 'B',
    explanation:
      'The hourly rate is $50 per hour (the slope), and the flat fee is $75 (the y-intercept). So C = 50h + 75.',
  },
  {
    id: 'sat_math_057',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'medium',
    passage: null,
    question:
      'Line m has a slope of 2/5. Which of the following lines is perpendicular to line m?',
    options: [
      { letter: 'A', text: 'y = (2/5)x + 3' },
      { letter: 'B', text: 'y = −(2/5)x + 1' },
      { letter: 'C', text: 'y = (5/2)x − 4' },
      { letter: 'D', text: 'y = −(5/2)x + 6' },
    ],
    correct: 'D',
    explanation:
      'Perpendicular lines have slopes that are negative reciprocals. The negative reciprocal of 2/5 is −5/2. The line y = −(5/2)x + 6 has slope −5/2.',
  },
  {
    id: 'sat_math_058',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'medium',
    passage: null,
    question:
      'What is the equation of the line that passes through (1, 3) and (4, 12)?',
    options: [
      { letter: 'A', text: 'y = 3x' },
      { letter: 'B', text: 'y = 3x + 1' },
      { letter: 'C', text: 'y = 3x − 1' },
      { letter: 'D', text: 'y = 4x − 1' },
    ],
    correct: 'A',
    explanation:
      'Slope = (12 − 3)/(4 − 1) = 9/3 = 3. Using point-slope form with (1, 3): y − 3 = 3(x − 1) = 3x − 3. So y = 3x.',
  },
  {
    id: 'sat_math_059',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'medium',
    passage: null,
    question:
      'The line 2x + 3y = 12 is graphed in the xy-plane. What is the y-intercept of this line?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '6' },
    ],
    correct: 'C',
    explanation:
      'Set x = 0: 2(0) + 3y = 12, so 3y = 12, y = 4. The y-intercept is 4.',
  },
  {
    id: 'sat_math_060',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'medium',
    passage: null,
    question:
      'Line p passes through (−1, 5) and is parallel to the line y = 4x − 2. What is the equation of line p?',
    options: [
      { letter: 'A', text: 'y = 4x + 9' },
      { letter: 'B', text: 'y = 4x + 1' },
      { letter: 'C', text: 'y = −(1/4)x + 5' },
      { letter: 'D', text: 'y = 4x − 9' },
    ],
    correct: 'A',
    explanation:
      'Parallel lines have the same slope, so the slope is 4. Using point-slope form: y − 5 = 4(x − (−1)) = 4(x + 1) = 4x + 4. So y = 4x + 9.',
  },
  {
    id: 'sat_math_061',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'hard',
    passage: null,
    question:
      'A line passes through the points (−2, k) and (6, 3k). If the slope of the line is 3/4, what is the value of k?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '6' },
    ],
    correct: 'B',
    explanation:
      'Slope = (3k − k)/(6 − (−2)) = 2k/8 = k/4. Set k/4 = 3/4, so k = 3.',
  },
  {
    id: 'sat_math_062',
    category: 'math',
    subcategory: 'linear-equations',
    difficulty: 'hard',
    passage: null,
    question:
      'The lines y = ax + 4 and y = 2x + b intersect at the point (3, 10). What is the value of a + b?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '10' },
    ],
    correct: 'B',
    explanation:
      'Since (3, 10) is on y = ax + 4: 10 = 3a + 4, so 3a = 6, a = 2. Since (3, 10) is on y = 2x + b: 10 = 2(3) + b = 6 + b, so b = 4. Therefore a + b = 2 + 4 = 6.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SYSTEMS OF EQUATIONS (~8 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_063',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'easy',
    passage: null,
    question:
      'If x + y = 10 and x = 3, what is the value of y?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '13' },
    ],
    correct: 'B',
    explanation:
      'Substitute x = 3 into x + y = 10: 3 + y = 10. Subtract 3: y = 7.',
  },
  {
    id: 'sat_math_064',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'easy',
    passage: null,
    question:
      'If x + y = 8 and x − y = 2, what is the value of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '6' },
    ],
    correct: 'C',
    explanation:
      'Add the two equations: (x + y) + (x − y) = 8 + 2, so 2x = 10, x = 5.',
  },
  {
    id: 'sat_math_065',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'medium',
    passage: null,
    question:
      'A movie theater sold 150 tickets. Adult tickets cost $12 and child tickets cost $8. If the total revenue was $1,400, how many adult tickets were sold?',
    options: [
      { letter: 'A', text: '50' },
      { letter: 'B', text: '75' },
      { letter: 'C', text: '100' },
      { letter: 'D', text: '125' },
    ],
    correct: 'A',
    explanation:
      'Let a = adult tickets, c = child tickets. a + c = 150 and 12a + 8c = 1400. From the first equation, c = 150 − a. Substitute: 12a + 8(150 − a) = 1400, so 12a + 1200 − 8a = 1400. Simplify: 4a = 200, a = 50.',
  },
  {
    id: 'sat_math_066',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'medium',
    passage: null,
    question:
      'If 3x + 2y = 16 and x − 2y = 0, what is the value of y?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '4' },
    ],
    correct: 'B',
    explanation:
      'Add the equations: (3x + 2y) + (x − 2y) = 16 + 0, so 4x = 16, x = 4. Substitute into x − 2y = 0: 4 − 2y = 0, so 2y = 4, y = 2.',
  },
  {
    id: 'sat_math_067',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'medium',
    passage: null,
    question:
      'If 2x − y = 5 and 3x + 2y = 18, what is the value of x + y?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '9' },
    ],
    correct: 'B',
    explanation:
      'From the first equation: y = 2x − 5. Substitute into the second: 3x + 2(2x − 5) = 18, so 3x + 4x − 10 = 18. Combine: 7x = 28, x = 4. Then y = 2(4) − 5 = 3. So x + y = 4 + 3 = 7.',
  },
  {
    id: 'sat_math_068',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'hard',
    passage: null,
    question:
      'For what value of k does the system x + 2y = 5 and 2x + 4y = k have infinitely many solutions?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '10' },
      { letter: 'D', text: '20' },
    ],
    correct: 'C',
    explanation:
      'For infinitely many solutions, the second equation must be a constant multiple of the first. Multiply the first by 2: 2x + 4y = 10. So k = 10.',
  },
  {
    id: 'sat_math_069',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'hard',
    passage: null,
    question:
      'A farmer has chickens and cows. Together they have 30 heads and 80 legs. How many cows does the farmer have?',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '10' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '20' },
    ],
    correct: 'B',
    explanation:
      'Let c = chickens, w = cows. c + w = 30 and 2c + 4w = 80. From the first equation, c = 30 − w. Substitute: 2(30 − w) + 4w = 80, so 60 − 2w + 4w = 80. Combine: 2w = 20, w = 10.',
  },
  {
    id: 'sat_math_070',
    category: 'math',
    subcategory: 'systems',
    difficulty: 'hard',
    passage: null,
    question:
      'If 5x − 3y = 1 and −10x + 6y = c, for what value of c does the system have infinitely many solutions?',
    options: [
      { letter: 'A', text: '−5' },
      { letter: 'B', text: '−2' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '5' },
    ],
    correct: 'B',
    explanation:
      'Multiply the first equation by −2: −10x + 6y = −2. For infinitely many solutions, the second equation must be identical: −10x + 6y = c requires c = −2.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // QUADRATICS (~7 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_071',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'easy',
    passage: null,
    question:
      'What are the solutions to x² − 5x + 6 = 0?',
    options: [
      { letter: 'A', text: 'x = 1 and x = 6' },
      { letter: 'B', text: 'x = 2 and x = 3' },
      { letter: 'C', text: 'x = −2 and x = −3' },
      { letter: 'D', text: 'x = −1 and x = −6' },
    ],
    correct: 'B',
    explanation:
      'Factor: x² − 5x + 6 = (x − 2)(x − 3) = 0. So x = 2 or x = 3.',
  },
  {
    id: 'sat_math_072',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'easy',
    passage: null,
    question:
      'Which of the following is equivalent to (x + 5)²?',
    options: [
      { letter: 'A', text: 'x² + 25' },
      { letter: 'B', text: 'x² + 5x + 25' },
      { letter: 'C', text: 'x² + 10x + 25' },
      { letter: 'D', text: 'x² + 10x + 10' },
    ],
    correct: 'C',
    explanation:
      'Use the perfect square formula: (x + 5)² = x² + 2(5)(x) + 5² = x² + 10x + 25.',
  },
  {
    id: 'sat_math_073',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'medium',
    passage: null,
    question:
      'The equation x² + 6x + k = 0 has exactly one real solution. What is the value of k?',
    options: [
      { letter: 'A', text: '6' },
      { letter: 'B', text: '9' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '36' },
    ],
    correct: 'B',
    explanation:
      'For exactly one real solution, the discriminant must equal 0: b² − 4ac = 0. Here a = 1, b = 6, c = k. So 36 − 4k = 0, giving k = 9.',
  },
  {
    id: 'sat_math_074',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'medium',
    passage: null,
    question:
      'What is the vertex of the parabola y = x² − 8x + 12?',
    options: [
      { letter: 'A', text: '(4, −4)' },
      { letter: 'B', text: '(−4, −4)' },
      { letter: 'C', text: '(4, 12)' },
      { letter: 'D', text: '(8, 12)' },
    ],
    correct: 'A',
    explanation:
      'The x-coordinate of the vertex is −b/(2a) = −(−8)/(2·1) = 8/2 = 4. The y-coordinate: y = (4)² − 8(4) + 12 = 16 − 32 + 12 = −4. The vertex is (4, −4).',
  },
  {
    id: 'sat_math_075',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'medium',
    passage: null,
    question:
      'Using the quadratic formula, what are the solutions to 2x² − 7x + 3 = 0?',
    options: [
      { letter: 'A', text: 'x = 1/2 and x = 3' },
      { letter: 'B', text: 'x = 1 and x = 3/2' },
      { letter: 'C', text: 'x = 2 and x = 3/4' },
      { letter: 'D', text: 'x = 3/2 and x = 2' },
    ],
    correct: 'A',
    explanation:
      'Using the quadratic formula: x = (7 ± √(49 − 24))/4 = (7 ± √25)/4 = (7 ± 5)/4. So x = 12/4 = 3 or x = 2/4 = 1/2.',
  },
  {
    id: 'sat_math_076',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'hard',
    passage: null,
    question:
      'A rocket is launched and its height h in meters after t seconds is given by h(t) = −5t² + 40t. At what time does the rocket reach its maximum height?',
    options: [
      { letter: 'A', text: '2 seconds' },
      { letter: 'B', text: '4 seconds' },
      { letter: 'C', text: '5 seconds' },
      { letter: 'D', text: '8 seconds' },
    ],
    correct: 'B',
    explanation:
      'The maximum occurs at t = −b/(2a) = −40/(2 × −5) = −40/(−10) = 4 seconds.',
  },
  {
    id: 'sat_math_077',
    category: 'math',
    subcategory: 'quadratics',
    difficulty: 'medium',
    passage: null,
    question:
      'If x² − 2x − 8 = 0, what is the product of the solutions?',
    options: [
      { letter: 'A', text: '−8' },
      { letter: 'B', text: '−2' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '8' },
    ],
    correct: 'A',
    explanation:
      'By Vieta\'s formulas, for ax² + bx + c = 0, the product of the solutions is c/a = −8/1 = −8. Alternatively, factor: (x − 4)(x + 2) = 0, so x = 4 or x = −2. Product = 4 × (−2) = −8.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // POLYNOMIALS (~6 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_078',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'easy',
    passage: null,
    question:
      'If p(x) = x³ + 2x² − x + 3, what is the value of p(1)?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '9' },
    ],
    correct: 'B',
    explanation:
      'p(1) = (1)³ + 2(1)² − (1) + 3 = 1 + 2 − 1 + 3 = 5.',
  },
  {
    id: 'sat_math_079',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'medium',
    passage: null,
    question:
      'Which of the following is equivalent to (x² + 3x + 2)(x − 1)?',
    options: [
      { letter: 'A', text: 'x³ + 2x² − x − 2' },
      { letter: 'B', text: 'x³ + 4x² + 5x + 2' },
      { letter: 'C', text: 'x³ + 2x² + x − 2' },
      { letter: 'D', text: 'x³ + 3x² − x − 2' },
    ],
    correct: 'A',
    explanation:
      'Multiply: x²(x − 1) + 3x(x − 1) + 2(x − 1) = x³ − x² + 3x² − 3x + 2x − 2 = x³ + 2x² − x − 2.',
  },
  {
    id: 'sat_math_080',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'medium',
    passage: null,
    question:
      'What is the remainder when x³ − 7x + 6 is divided by x − 2?',
    options: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '6' },
      { letter: 'D', text: '−4' },
    ],
    correct: 'A',
    explanation:
      'By the Remainder Theorem, substitute x = 2: (2)³ − 7(2) + 6 = 8 − 14 + 6 = 0. The remainder is 0, which means (x − 2) is a factor.',
  },
  {
    id: 'sat_math_081',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'medium',
    passage: null,
    question:
      'What is the remainder when x³ + 2x² − 5x + 1 is divided by x − 1?',
    options: [
      { letter: 'A', text: '−1' },
      { letter: 'B', text: '0' },
      { letter: 'C', text: '−3' },
      { letter: 'D', text: '1' },
    ],
    correct: 'A',
    explanation:
      'By the Remainder Theorem, substitute x = 1: (1)³ + 2(1)² − 5(1) + 1 = 1 + 2 − 5 + 1 = −1.',
  },
  {
    id: 'sat_math_082',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'hard',
    passage: null,
    question:
      'If p(x) = x⁴ − 5x² + 4, how many distinct real zeros does p(x) have?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '0' },
    ],
    correct: 'C',
    explanation:
      'Let u = x²: u² − 5u + 4 = (u − 1)(u − 4) = 0, so u = 1 or u = 4. Since u = x²: x² = 1 gives x = ±1, and x² = 4 gives x = ±2. That is 4 distinct real zeros.',
  },
  {
    id: 'sat_math_083',
    category: 'math',
    subcategory: 'polynomials',
    difficulty: 'hard',
    passage: null,
    question:
      'If (x + 2) is a factor of x³ + ax² − 4x − 12, what is the value of a?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '−1' },
    ],
    correct: 'B',
    explanation:
      'If (x + 2) is a factor, then p(−2) = 0. Substitute x = −2: (−2)³ + a(−2)² − 4(−2) − 12 = 0. This gives −8 + 4a + 8 − 12 = 0, so 4a − 12 = 0, a = 3.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // EXPONENTIAL (~5 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_084',
    category: 'math',
    subcategory: 'exponential',
    difficulty: 'easy',
    passage: null,
    question:
      'A savings account earns 5% interest compounded annually. If $1,000 is deposited, which expression gives the balance after t years?',
    options: [
      { letter: 'A', text: '1000 + 50t' },
      { letter: 'B', text: '1000(1.05)ᵗ' },
      { letter: 'C', text: '1000(0.05)ᵗ' },
      { letter: 'D', text: '1000(1.5)ᵗ' },
    ],
    correct: 'B',
    explanation:
      'Compound interest formula: A = P(1 + r)ᵗ = 1000(1 + 0.05)ᵗ = 1000(1.05)ᵗ.',
  },
  {
    id: 'sat_math_085',
    category: 'math',
    subcategory: 'exponential',
    difficulty: 'medium',
    passage: null,
    question:
      'A radioactive substance decays so that the amount remaining is halved every 3 years. If there are initially 80 grams, how many grams remain after 9 years?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '10' },
      { letter: 'C', text: '20' },
      { letter: 'D', text: '40' },
    ],
    correct: 'B',
    explanation:
      'After 3 years: 80/2 = 40. After 6 years: 40/2 = 20. After 9 years: 20/2 = 10 grams.',
  },
  {
    id: 'sat_math_086',
    category: 'math',
    subcategory: 'exponential',
    difficulty: 'easy',
    passage: null,
    question:
      'If 2ˣ = 32, what is the value of x?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '6' },
      { letter: 'D', text: '16' },
    ],
    correct: 'B',
    explanation:
      'Since 2⁵ = 32, x = 5.',
  },
  {
    id: 'sat_math_087',
    category: 'math',
    subcategory: 'exponential',
    difficulty: 'hard',
    passage: null,
    question:
      'A population of 500 organisms triples every 4 hours. Which expression represents the population after t hours?',
    options: [
      { letter: 'A', text: '500(3)^(t/4)' },
      { letter: 'B', text: '500(3)^(4t)' },
      { letter: 'C', text: '500(4)^(t/3)' },
      { letter: 'D', text: '1500(3)ᵗ' },
    ],
    correct: 'A',
    explanation:
      'The population triples every 4 hours, so the growth factor is 3 per 4-hour period. The number of 4-hour periods in t hours is t/4. Population = 500(3)^(t/4).',
  },
  {
    id: 'sat_math_088',
    category: 'math',
    subcategory: 'exponential',
    difficulty: 'hard',
    passage: null,
    question:
      'An investment of $2,000 earns 6% annual interest compounded annually. What is the value of the investment after 2 years, to the nearest dollar?',
    options: [
      { letter: 'A', text: '$2,120' },
      { letter: 'B', text: '$2,240' },
      { letter: 'C', text: '$2,247' },
      { letter: 'D', text: '$2,260' },
    ],
    correct: 'C',
    explanation:
      'A = 2000(1.06)² = 2000(1.1236) = 2247.20, which rounds to $2,247.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // ADVANCED MATH (~8 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_089',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'easy',
    passage: null,
    question:
      'If f(x) = x² + 1, what is the value of f(3)?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '7' },
      { letter: 'C', text: '9' },
      { letter: 'D', text: '10' },
    ],
    correct: 'D',
    explanation:
      'f(3) = (3)² + 1 = 9 + 1 = 10.',
  },
  {
    id: 'sat_math_090',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'easy',
    passage: null,
    question:
      'If g(x) = 2x − 7, what value of x makes g(x) = 0?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '3.5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '−3.5' },
    ],
    correct: 'B',
    explanation:
      'Set g(x) = 0: 2x − 7 = 0. Add 7: 2x = 7. Divide by 2: x = 3.5.',
  },
  {
    id: 'sat_math_091',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'medium',
    passage: null,
    question:
      'If f(x) = x + 3 and g(x) = 2x², what is g(f(1))?',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '18' },
      { letter: 'C', text: '32' },
      { letter: 'D', text: '50' },
    ],
    correct: 'C',
    explanation:
      'First, f(1) = 1 + 3 = 4. Then g(4) = 2(4)² = 2(16) = 32.',
  },
  {
    id: 'sat_math_092',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'medium',
    passage: null,
    question:
      'The function f is defined by f(x) = (x + 1)/(x − 3). What is the domain of f?',
    options: [
      { letter: 'A', text: 'All real numbers' },
      { letter: 'B', text: 'All real numbers except −1' },
      { letter: 'C', text: 'All real numbers except 3' },
      { letter: 'D', text: 'All real numbers except −1 and 3' },
    ],
    correct: 'C',
    explanation:
      'The denominator cannot equal zero. x − 3 = 0 when x = 3. So the domain is all real numbers except x = 3.',
  },
  {
    id: 'sat_math_093',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'medium',
    passage: null,
    question:
      'If f(x) = 3x − 2, what is f(f(2))?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '10' },
      { letter: 'C', text: '16' },
      { letter: 'D', text: '22' },
    ],
    correct: 'B',
    explanation:
      'f(2) = 3(2) − 2 = 4. Then f(4) = 3(4) − 2 = 10.',
  },
  {
    id: 'sat_math_094',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'medium',
    passage: null,
    question:
      'The graph of y = f(x) is shifted 3 units to the right and 2 units up. Which equation represents the transformed graph?',
    options: [
      { letter: 'A', text: 'y = f(x + 3) + 2' },
      { letter: 'B', text: 'y = f(x − 3) + 2' },
      { letter: 'C', text: 'y = f(x − 3) − 2' },
      { letter: 'D', text: 'y = f(x + 3) − 2' },
    ],
    correct: 'B',
    explanation:
      'A shift 3 units right replaces x with (x − 3). A shift 2 units up adds 2 to the output. The equation is y = f(x − 3) + 2.',
  },
  {
    id: 'sat_math_095',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'hard',
    passage: null,
    question:
      'If f(x) = √(2x + 6), for what values of x is f(x) defined?',
    options: [
      { letter: 'A', text: 'x ≥ 0' },
      { letter: 'B', text: 'x ≥ −3' },
      { letter: 'C', text: 'x ≥ 3' },
      { letter: 'D', text: 'x > −3' },
    ],
    correct: 'B',
    explanation:
      'The expression under the square root must be non-negative: 2x + 6 ≥ 0. Subtract 6: 2x ≥ −6. Divide by 2: x ≥ −3.',
  },
  {
    id: 'sat_math_096',
    category: 'math',
    subcategory: 'advanced-math',
    difficulty: 'hard',
    passage: null,
    question:
      'If f(x) = 2x + 1 and g(x) = (x − 1)/2, what is f(g(x))?',
    options: [
      { letter: 'A', text: 'x' },
      { letter: 'B', text: 'x + 1' },
      { letter: 'C', text: '2x' },
      { letter: 'D', text: 'x − 1' },
    ],
    correct: 'A',
    explanation:
      'f(g(x)) = f((x − 1)/2) = 2·((x − 1)/2) + 1 = (x − 1) + 1 = x. The functions are inverses.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // RATIOS (~4 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_097',
    category: 'math',
    subcategory: 'ratios',
    difficulty: 'easy',
    passage: null,
    question:
      'If the ratio of boys to girls in a class is 3:5 and there are 15 boys, how many girls are in the class?',
    options: [
      { letter: 'A', text: '20' },
      { letter: 'B', text: '25' },
      { letter: 'C', text: '30' },
      { letter: 'D', text: '9' },
    ],
    correct: 'B',
    explanation:
      'The ratio is 3:5. The scale factor is 15/3 = 5. Number of girls = 5 × 5 = 25.',
  },
  {
    id: 'sat_math_098',
    category: 'math',
    subcategory: 'ratios',
    difficulty: 'easy',
    passage: null,
    question:
      'A car travels 180 miles in 3 hours. At the same rate, how many miles will the car travel in 5 hours?',
    options: [
      { letter: 'A', text: '250' },
      { letter: 'B', text: '280' },
      { letter: 'C', text: '300' },
      { letter: 'D', text: '360' },
    ],
    correct: 'C',
    explanation:
      'Rate = 180/3 = 60 miles per hour. In 5 hours: 60 × 5 = 300 miles.',
  },
  {
    id: 'sat_math_099',
    category: 'math',
    subcategory: 'ratios',
    difficulty: 'medium',
    passage: null,
    question:
      'A blueprint uses a scale of 1 cm : 4 feet. A room on the blueprint measures 6 cm by 3.5 cm. What is the actual area of the room?',
    options: [
      { letter: 'A', text: '84 square feet' },
      { letter: 'B', text: '168 square feet' },
      { letter: 'C', text: '252 square feet' },
      { letter: 'D', text: '336 square feet' },
    ],
    correct: 'D',
    explanation:
      'Actual length = 6 × 4 = 24 feet. Actual width = 3.5 × 4 = 14 feet. Area = 24 × 14 = 336 square feet.',
  },
  {
    id: 'sat_math_100',
    category: 'math',
    subcategory: 'ratios',
    difficulty: 'medium',
    passage: null,
    question:
      'A mixture requires cement, sand, and gravel in a ratio of 1:3:5. If 270 pounds of the mixture are needed, how many pounds of sand are required?',
    options: [
      { letter: 'A', text: '30' },
      { letter: 'B', text: '60' },
      { letter: 'C', text: '90' },
      { letter: 'D', text: '150' },
    ],
    correct: 'C',
    explanation:
      'Total parts = 1 + 3 + 5 = 9. Each part = 270/9 = 30 pounds. Sand = 3 × 30 = 90 pounds.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PERCENTAGES (~4 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_101',
    category: 'math',
    subcategory: 'percentages',
    difficulty: 'easy',
    passage: null,
    question:
      'A jacket originally costs $80. If the price is reduced by 30%, what is the sale price?',
    options: [
      { letter: 'A', text: '$24' },
      { letter: 'B', text: '$50' },
      { letter: 'C', text: '$56' },
      { letter: 'D', text: '$66' },
    ],
    correct: 'C',
    explanation:
      '30% of $80 = 0.30 × 80 = $24 discount. Sale price = $80 − $24 = $56.',
  },
  {
    id: 'sat_math_102',
    category: 'math',
    subcategory: 'percentages',
    difficulty: 'medium',
    passage: null,
    question:
      'A town\'s population grew from 8,000 to 10,000 over 5 years. What was the percent increase?',
    options: [
      { letter: 'A', text: '20%' },
      { letter: 'B', text: '25%' },
      { letter: 'C', text: '30%' },
      { letter: 'D', text: '80%' },
    ],
    correct: 'B',
    explanation:
      'Increase = 10,000 − 8,000 = 2,000. Percent increase = (2,000/8,000) × 100 = 25%.',
  },
  {
    id: 'sat_math_103',
    category: 'math',
    subcategory: 'percentages',
    difficulty: 'medium',
    passage: null,
    question:
      'A store marks up the wholesale price of an item by 60%. If the retail price is $48, what was the wholesale price?',
    options: [
      { letter: 'A', text: '$28.80' },
      { letter: 'B', text: '$30' },
      { letter: 'C', text: '$32' },
      { letter: 'D', text: '$19.20' },
    ],
    correct: 'B',
    explanation:
      'Let w = wholesale price. Then 1.60w = 48. So w = 48/1.60 = 30. The wholesale price was $30.',
  },
  {
    id: 'sat_math_104',
    category: 'math',
    subcategory: 'percentages',
    difficulty: 'medium',
    passage: null,
    question:
      'An item\'s price is increased by 10% and then increased again by 20%. What is the overall percent increase from the original price?',
    options: [
      { letter: 'A', text: '28%' },
      { letter: 'B', text: '30%' },
      { letter: 'C', text: '32%' },
      { letter: 'D', text: '34%' },
    ],
    correct: 'C',
    explanation:
      'Let the original price be $100. After 10% increase: $110. After 20% increase: $110 × 1.20 = $132. Overall increase = $32, which is 32% of the original.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // STATISTICS (~4 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_105',
    category: 'math',
    subcategory: 'statistics',
    difficulty: 'easy',
    passage: null,
    question:
      'The test scores of 7 students are: 72, 85, 85, 88, 90, 93, 97. What is the median score?',
    options: [
      { letter: 'A', text: '85' },
      { letter: 'B', text: '87' },
      { letter: 'C', text: '88' },
      { letter: 'D', text: '90' },
    ],
    correct: 'C',
    explanation:
      'There are 7 values, so the median is the 4th value when sorted: 72, 85, 85, 88, 90, 93, 97. The median is 88.',
  },
  {
    id: 'sat_math_106',
    category: 'math',
    subcategory: 'statistics',
    difficulty: 'medium',
    passage: null,
    question:
      'The data set {4, 7, 10, x, 18} has a mean of 10. What is the value of x?',
    options: [
      { letter: 'A', text: '9' },
      { letter: 'B', text: '11' },
      { letter: 'C', text: '13' },
      { letter: 'D', text: '15' },
    ],
    correct: 'B',
    explanation:
      'Mean = (4 + 7 + 10 + x + 18)/5 = 10. So 39 + x = 50. Therefore x = 11.',
  },
  {
    id: 'sat_math_107',
    category: 'math',
    subcategory: 'statistics',
    difficulty: 'medium',
    passage: null,
    question:
      'A data set has values: 3, 5, 5, 7, 8, 12. If the value 12 is replaced by 30, which measure of central tendency changes the most?',
    options: [
      { letter: 'A', text: 'Mean' },
      { letter: 'B', text: 'Median' },
      { letter: 'C', text: 'Mode' },
      { letter: 'D', text: 'All change equally' },
    ],
    correct: 'A',
    explanation:
      'The mode (5) does not change. The median is the average of the 3rd and 4th values (5 and 7), which remains 6. The mean changes from (3+5+5+7+8+12)/6 = 40/6 ≈ 6.67 to (3+5+5+7+8+30)/6 = 58/6 ≈ 9.67. The mean changes the most.',
  },
  {
    id: 'sat_math_108',
    category: 'math',
    subcategory: 'statistics',
    difficulty: 'hard',
    passage: null,
    question:
      'Two data sets both have 5 values. Set A has a standard deviation of 2 and Set B has a standard deviation of 8. Which statement is true?',
    options: [
      { letter: 'A', text: 'Set A has a larger mean' },
      { letter: 'B', text: 'Set B has a larger mean' },
      { letter: 'C', text: 'Set B\'s values are more spread out from their mean' },
      { letter: 'D', text: 'Set A\'s values are more spread out from their mean' },
    ],
    correct: 'C',
    explanation:
      'Standard deviation measures how spread out data values are from the mean. A larger standard deviation (8 > 2) means Set B\'s values are more spread out from their mean. Standard deviation does not tell us which mean is larger.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // DATA ANALYSIS (~3 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_109',
    category: 'math',
    subcategory: 'data-analysis',
    difficulty: 'easy',
    passage: null,
    question:
      'A table shows the number of books read by students: 0 books (5 students), 1 book (8 students), 2 books (12 students), 3 books (5 students). How many students read at least 2 books?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '17' },
      { letter: 'D', text: '25' },
    ],
    correct: 'C',
    explanation:
      'Students who read at least 2 books: 12 (who read 2) + 5 (who read 3) = 17.',
  },
  {
    id: 'sat_math_110',
    category: 'math',
    subcategory: 'data-analysis',
    difficulty: 'medium',
    passage: null,
    question:
      'A survey asked 200 people about their favorite season. Spring: 50, Summer: 70, Fall: 45, Winter: 35. What percent of people chose Summer?',
    options: [
      { letter: 'A', text: '25%' },
      { letter: 'B', text: '30%' },
      { letter: 'C', text: '35%' },
      { letter: 'D', text: '40%' },
    ],
    correct: 'C',
    explanation:
      'Percent who chose Summer = (70/200) × 100 = 35%.',
  },
  {
    id: 'sat_math_111',
    category: 'math',
    subcategory: 'data-analysis',
    difficulty: 'medium',
    passage: null,
    question:
      'A scatterplot shows a strong positive linear association between hours studied and test scores. The line of best fit is y = 5x + 50, where x is hours studied and y is the test score. Based on this model, what score would you predict for a student who studied 8 hours?',
    options: [
      { letter: 'A', text: '80' },
      { letter: 'B', text: '85' },
      { letter: 'C', text: '90' },
      { letter: 'D', text: '95' },
    ],
    correct: 'C',
    explanation:
      'Substitute x = 8: y = 5(8) + 50 = 40 + 50 = 90.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // PROBABILITY (~3 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_112',
    category: 'math',
    subcategory: 'probability',
    difficulty: 'easy',
    passage: null,
    question:
      'A standard six-sided die is rolled once. What is the probability of rolling a number greater than 4?',
    options: [
      { letter: 'A', text: '1/6' },
      { letter: 'B', text: '1/3' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '2/3' },
    ],
    correct: 'B',
    explanation:
      'Numbers greater than 4 are 5 and 6. That is 2 outcomes out of 6. Probability = 2/6 = 1/3.',
  },
  {
    id: 'sat_math_113',
    category: 'math',
    subcategory: 'probability',
    difficulty: 'medium',
    passage: null,
    question:
      'A jar contains 3 red, 5 blue, and 2 green marbles. If two marbles are drawn at random without replacement, what is the probability that both are blue?',
    options: [
      { letter: 'A', text: '1/4' },
      { letter: 'B', text: '2/9' },
      { letter: 'C', text: '5/18' },
      { letter: 'D', text: '1/5' },
    ],
    correct: 'B',
    explanation:
      'Total marbles = 10. P(first blue) = 5/10 = 1/2. After removing one blue marble, P(second blue) = 4/9. P(both blue) = (1/2)(4/9) = 4/18 = 2/9.',
  },
  {
    id: 'sat_math_114',
    category: 'math',
    subcategory: 'probability',
    difficulty: 'hard',
    passage: null,
    question:
      'In a group of 100 students, 60 play basketball, 40 play soccer, and 20 play both. If a student is randomly selected, what is the probability that the student plays basketball or soccer?',
    options: [
      { letter: 'A', text: '3/5' },
      { letter: 'B', text: '4/5' },
      { letter: 'C', text: '1' },
      { letter: 'D', text: '7/10' },
    ],
    correct: 'B',
    explanation:
      'Using inclusion-exclusion: P(basketball or soccer) = P(B) + P(S) − P(B and S) = 60/100 + 40/100 − 20/100 = 80/100 = 4/5.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // GEOMETRY (~8 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_115',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'easy',
    passage: null,
    question:
      'A square has a perimeter of 36 cm. What is the area of the square?',
    options: [
      { letter: 'A', text: '9 cm²' },
      { letter: 'B', text: '36 cm²' },
      { letter: 'C', text: '81 cm²' },
      { letter: 'D', text: '144 cm²' },
    ],
    correct: 'C',
    explanation:
      'Side length = 36/4 = 9 cm. Area = 9² = 81 cm².',
  },
  {
    id: 'sat_math_116',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'easy',
    passage: null,
    question:
      'A triangle has a base of 10 inches and a height of 6 inches. What is the area of the triangle?',
    options: [
      { letter: 'A', text: '16 square inches' },
      { letter: 'B', text: '30 square inches' },
      { letter: 'C', text: '60 square inches' },
      { letter: 'D', text: '36 square inches' },
    ],
    correct: 'B',
    explanation:
      'Area = (1/2) × base × height = (1/2)(10)(6) = 30 square inches.',
  },
  {
    id: 'sat_math_117',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'medium',
    passage: null,
    question:
      'Two similar triangles have a scale factor of 2:5. If the area of the smaller triangle is 12 cm², what is the area of the larger triangle?',
    options: [
      { letter: 'A', text: '30 cm²' },
      { letter: 'B', text: '48 cm²' },
      { letter: 'C', text: '60 cm²' },
      { letter: 'D', text: '75 cm²' },
    ],
    correct: 'D',
    explanation:
      'For similar figures, the ratio of areas is the square of the scale factor. Area ratio = (2/5)² = 4/25. So 12/A = 4/25. Cross multiply: 4A = 300, A = 75 cm².',
  },
  {
    id: 'sat_math_118',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'medium',
    passage: null,
    question:
      'A rectangular box has dimensions 3 cm × 4 cm × 5 cm. What is the volume of the box?',
    options: [
      { letter: 'A', text: '12 cm³' },
      { letter: 'B', text: '47 cm³' },
      { letter: 'C', text: '60 cm³' },
      { letter: 'D', text: '94 cm³' },
    ],
    correct: 'C',
    explanation:
      'Volume = length × width × height = 3 × 4 × 5 = 60 cm³.',
  },
  {
    id: 'sat_math_119',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'medium',
    passage: null,
    question:
      'In a triangle, the angles are in the ratio 2:3:4. What is the measure of the largest angle?',
    options: [
      { letter: 'A', text: '60°' },
      { letter: 'B', text: '70°' },
      { letter: 'C', text: '80°' },
      { letter: 'D', text: '90°' },
    ],
    correct: 'C',
    explanation:
      'Total parts = 2 + 3 + 4 = 9. Each part = 180°/9 = 20°. Largest angle = 4 × 20° = 80°.',
  },
  {
    id: 'sat_math_120',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'hard',
    passage: null,
    question:
      'A sphere has a volume of 36π cubic inches. What is the radius of the sphere?',
    options: [
      { letter: 'A', text: '3 inches' },
      { letter: 'B', text: '4 inches' },
      { letter: 'C', text: '6 inches' },
      { letter: 'D', text: '9 inches' },
    ],
    correct: 'A',
    explanation:
      'Volume of a sphere = (4/3)πr³. Set (4/3)πr³ = 36π. Divide by π: (4/3)r³ = 36. Multiply by 3/4: r³ = 27. So r = 3 inches.',
  },
  {
    id: 'sat_math_121',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'hard',
    passage: null,
    question:
      'A regular hexagon has a side length of 6 cm. What is the area of the hexagon?',
    options: [
      { letter: 'A', text: '36√3 cm²' },
      { letter: 'B', text: '54√3 cm²' },
      { letter: 'C', text: '72√3 cm²' },
      { letter: 'D', text: '108√3 cm²' },
    ],
    correct: 'B',
    explanation:
      'A regular hexagon is composed of 6 equilateral triangles. Area of one equilateral triangle with side s = (√3/4)s² = (√3/4)(36) = 9√3. Total area = 6 × 9√3 = 54√3 cm².',
  },
  {
    id: 'sat_math_122',
    category: 'math',
    subcategory: 'geometry',
    difficulty: 'medium',
    passage: null,
    question:
      'An isosceles right triangle has legs of length 8. What is the length of the hypotenuse?',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '8√2' },
      { letter: 'C', text: '16' },
      { letter: 'D', text: '8√3' },
    ],
    correct: 'B',
    explanation:
      'In a 45-45-90 triangle, the hypotenuse = leg × √2. Hypotenuse = 8√2.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // CIRCLES (~5 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_123',
    category: 'math',
    subcategory: 'circles',
    difficulty: 'easy',
    passage: null,
    question:
      'A circle has a diameter of 10 cm. What is the circumference of the circle?',
    options: [
      { letter: 'A', text: '5π cm' },
      { letter: 'B', text: '10π cm' },
      { letter: 'C', text: '25π cm' },
      { letter: 'D', text: '100π cm' },
    ],
    correct: 'B',
    explanation:
      'Circumference = πd = π(10) = 10π cm.',
  },
  {
    id: 'sat_math_124',
    category: 'math',
    subcategory: 'circles',
    difficulty: 'medium',
    passage: null,
    question:
      'What is the length of an arc that subtends a central angle of 90° in a circle with radius 8?',
    options: [
      { letter: 'A', text: '2π' },
      { letter: 'B', text: '4π' },
      { letter: 'C', text: '8π' },
      { letter: 'D', text: '16π' },
    ],
    correct: 'B',
    explanation:
      'Arc length = (θ/360°) × 2πr = (90/360) × 2π(8) = (1/4)(16π) = 4π.',
  },
  {
    id: 'sat_math_125',
    category: 'math',
    subcategory: 'circles',
    difficulty: 'medium',
    passage: null,
    question:
      'A circle has center (2, −3) and passes through the point (6, −3). What is the equation of this circle?',
    options: [
      { letter: 'A', text: '(x − 2)² + (y + 3)² = 4' },
      { letter: 'B', text: '(x − 2)² + (y + 3)² = 16' },
      { letter: 'C', text: '(x + 2)² + (y − 3)² = 16' },
      { letter: 'D', text: '(x − 2)² + (y + 3)² = 8' },
    ],
    correct: 'B',
    explanation:
      'The radius is the distance from center (2, −3) to (6, −3): r = √((6−2)² + (−3−(−3))²) = √(16 + 0) = 4. Equation: (x − 2)² + (y + 3)² = 16.',
  },
  {
    id: 'sat_math_126',
    category: 'math',
    subcategory: 'circles',
    difficulty: 'hard',
    passage: null,
    question:
      'A sector of a circle has a central angle of 120° and a radius of 9. What is the area of the sector?',
    options: [
      { letter: 'A', text: '9π' },
      { letter: 'B', text: '27π' },
      { letter: 'C', text: '54π' },
      { letter: 'D', text: '81π' },
    ],
    correct: 'B',
    explanation:
      'Area of a sector = (θ/360°) × πr² = (120/360) × π(81) = (1/3)(81π) = 27π.',
  },
  {
    id: 'sat_math_127',
    category: 'math',
    subcategory: 'circles',
    difficulty: 'hard',
    passage: null,
    question:
      'The equation x² + y² − 6x + 4y − 12 = 0 represents a circle. What is the radius of the circle?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '5' },
      { letter: 'D', text: '25' },
    ],
    correct: 'C',
    explanation:
      'Complete the square: (x² − 6x + 9) + (y² + 4y + 4) = 12 + 9 + 4. So (x − 3)² + (y + 2)² = 25. The radius is √25 = 5.',
  },

  // ═══════════════════════════════════════════════════════════════════════
  // TRIGONOMETRY (~5 questions)
  // ═══════════════════════════════════════════════════════════════════════
  {
    id: 'sat_math_128',
    category: 'math',
    subcategory: 'trigonometry',
    difficulty: 'easy',
    passage: null,
    question:
      'In a right triangle, the side opposite to angle θ is 3 and the hypotenuse is 5. What is cos(θ)?',
    options: [
      { letter: 'A', text: '3/5' },
      { letter: 'B', text: '4/5' },
      { letter: 'C', text: '3/4' },
      { letter: 'D', text: '5/3' },
    ],
    correct: 'B',
    explanation:
      'The adjacent side = √(5² − 3²) = √(25 − 9) = √16 = 4. cos(θ) = adjacent/hypotenuse = 4/5.',
  },
  {
    id: 'sat_math_129',
    category: 'math',
    subcategory: 'trigonometry',
    difficulty: 'easy',
    passage: null,
    question:
      'What is the value of sin(30°)?',
    options: [
      { letter: 'A', text: '1/2' },
      { letter: 'B', text: '√2/2' },
      { letter: 'C', text: '√3/2' },
      { letter: 'D', text: '1' },
    ],
    correct: 'A',
    explanation:
      'sin(30°) = 1/2. This is a standard unit circle value from the 30-60-90 triangle.',
  },
  {
    id: 'sat_math_130',
    category: 'math',
    subcategory: 'trigonometry',
    difficulty: 'medium',
    passage: null,
    question:
      'Convert 270° to radians.',
    options: [
      { letter: 'A', text: 'π/2' },
      { letter: 'B', text: 'π' },
      { letter: 'C', text: '3π/2' },
      { letter: 'D', text: '2π' },
    ],
    correct: 'C',
    explanation:
      'To convert degrees to radians, multiply by π/180. 270 × π/180 = 270π/180 = 3π/2.',
  },
  {
    id: 'sat_math_131',
    category: 'math',
    subcategory: 'trigonometry',
    difficulty: 'hard',
    passage: null,
    question:
      'If sin(θ) = 5/13 and θ is in the first quadrant, what is the value of tan(θ)?',
    options: [
      { letter: 'A', text: '5/12' },
      { letter: 'B', text: '12/5' },
      { letter: 'C', text: '5/13' },
      { letter: 'D', text: '12/13' },
    ],
    correct: 'A',
    explanation:
      'If sin(θ) = 5/13, then opposite = 5 and hypotenuse = 13. Adjacent = √(13² − 5²) = √(169 − 25) = √144 = 12. tan(θ) = opposite/adjacent = 5/12.',
  },
  {
    id: 'sat_math_132',
    category: 'math',
    subcategory: 'trigonometry',
    difficulty: 'medium',
    passage: null,
    question:
      'Which of the following is equivalent to sin²(θ) + cos²(θ)?',
    options: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: 'tan²(θ)' },
      { letter: 'D', text: '2sin(θ)cos(θ)' },
    ],
    correct: 'B',
    explanation:
      'The Pythagorean identity states that sin²(θ) + cos²(θ) = 1 for all values of θ. This is a fundamental trigonometric identity.',
  },
];
