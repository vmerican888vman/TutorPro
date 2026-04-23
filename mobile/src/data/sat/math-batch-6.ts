import type { SATQuestion } from './types'

// SAT Math Batch 6 - Algebra II (120 questions)
// Topics: Linear equations, systems, inequalities, absolute value, word problems, functions

export const mathBatch6: SATQuestion[] = [
  {
    id: 'sat_math_b6_001',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 3x + 7 = 22, what is the value of x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '10' }
    ],
    correct: 'B',
    explanation: '3x + 7 = 22 → 3x = 15 → x = 5.'
  },
  {
    id: 'sat_math_b6_002',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is the slope of the line y = -4x + 9?',
    options: [
      { letter: 'A', text: '-4' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '9' },
      { letter: 'D', text: '-9' }
    ],
    correct: 'A',
    explanation: 'In y = mx + b form, the slope m = -4.'
  },
  {
    id: 'sat_math_b6_003',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Simplify: 5(2x - 3) + 4x',
    options: [
      { letter: 'A', text: '14x - 15' },
      { letter: 'B', text: '14x - 3' },
      { letter: 'C', text: '10x - 15' },
      { letter: 'D', text: '14x + 15' }
    ],
    correct: 'A',
    explanation: '5(2x - 3) + 4x = 10x - 15 + 4x = 14x - 15.'
  },
  {
    id: 'sat_math_b6_004',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If f(x) = 2x² - 1, what is f(3)?',
    options: [
      { letter: 'A', text: '11' },
      { letter: 'B', text: '17' },
      { letter: 'C', text: '15' },
      { letter: 'D', text: '35' }
    ],
    correct: 'B',
    explanation: 'f(3) = 2(3)² - 1 = 2(9) - 1 = 18 - 1 = 17.'
  },
  {
    id: 'sat_math_b6_005',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Solve for y: 2y - 8 = 3y + 1',
    options: [
      { letter: 'A', text: '-9' },
      { letter: 'B', text: '9' },
      { letter: 'C', text: '-7' },
      { letter: 'D', text: '7' }
    ],
    correct: 'A',
    explanation: '2y - 8 = 3y + 1 → -8 - 1 = 3y - 2y → -9 = y.'
  },
  {
    id: 'sat_math_b6_006',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'A taxi charges $3.50 plus $0.75 per mile. Which expression represents the cost for m miles?',
    options: [
      { letter: 'A', text: '3.50m + 0.75' },
      { letter: 'B', text: '0.75m + 3.50' },
      { letter: 'C', text: '4.25m' },
      { letter: 'D', text: '3.50 + 0.75' }
    ],
    correct: 'B',
    explanation: 'The cost is the flat fee $3.50 plus $0.75 times the number of miles: 0.75m + 3.50.'
  },
  {
    id: 'sat_math_b6_007',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is the y-intercept of the line 3x - 2y = 12?',
    options: [
      { letter: 'A', text: '6' },
      { letter: 'B', text: '-6' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '-4' }
    ],
    correct: 'B',
    explanation: 'Set x = 0: -2y = 12 → y = -6. The y-intercept is -6.'
  },
  {
    id: 'sat_math_b6_008',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If |x| = 7, what are the possible values of x?',
    options: [
      { letter: 'A', text: '7 only' },
      { letter: 'B', text: '-7 only' },
      { letter: 'C', text: '7 and -7' },
      { letter: 'D', text: '0 and 7' }
    ],
    correct: 'C',
    explanation: '|x| = 7 means x = 7 or x = -7.'
  },
  {
    id: 'sat_math_b6_009',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Simplify: (3x²)(4x³)',
    options: [
      { letter: 'A', text: '12x⁵' },
      { letter: 'B', text: '12x⁶' },
      { letter: 'C', text: '7x⁵' },
      { letter: 'D', text: '7x⁶' }
    ],
    correct: 'A',
    explanation: '(3x²)(4x³) = 12x^(2+3) = 12x⁵.'
  },
  {
    id: 'sat_math_b6_010',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Which inequality represents "x is at least 5"?',
    options: [
      { letter: 'A', text: 'x > 5' },
      { letter: 'B', text: 'x ≥ 5' },
      { letter: 'C', text: 'x < 5' },
      { letter: 'D', text: 'x ≤ 5' }
    ],
    correct: 'B',
    explanation: '"At least 5" means 5 or more, which is x ≥ 5.'
  },
  {
    id: 'sat_math_b6_011',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 4(x + 2) = 28, what is x?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '8' }
    ],
    correct: 'A',
    explanation: '4(x + 2) = 28 → x + 2 = 7 → x = 5.'
  },
  {
    id: 'sat_math_b6_012',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is the value of 2³ + 3²?',
    options: [
      { letter: 'A', text: '13' },
      { letter: 'B', text: '17' },
      { letter: 'C', text: '15' },
      { letter: 'D', text: '12' }
    ],
    correct: 'B',
    explanation: '2³ + 3² = 8 + 9 = 17.'
  },
  {
    id: 'sat_math_b6_013',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'A store sells shirts for $15 each. If there is a 20% discount, what is the sale price?',
    options: [
      { letter: 'A', text: '$10' },
      { letter: 'B', text: '$12' },
      { letter: 'C', text: '$13' },
      { letter: 'D', text: '$3' }
    ],
    correct: 'B',
    explanation: '20% of $15 = $3. Sale price = $15 - $3 = $12.'
  },
  {
    id: 'sat_math_b6_014',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Solve: x/4 + 3 = 8',
    options: [
      { letter: 'A', text: '12' },
      { letter: 'B', text: '20' },
      { letter: 'C', text: '44' },
      { letter: 'D', text: '32' }
    ],
    correct: 'B',
    explanation: 'x/4 + 3 = 8 → x/4 = 5 → x = 20.'
  },
  {
    id: 'sat_math_b6_015',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Which point lies on the line y = 2x - 1?',
    options: [
      { letter: 'A', text: '(0, 1)' },
      { letter: 'B', text: '(1, 1)' },
      { letter: 'C', text: '(2, 5)' },
      { letter: 'D', text: '(3, 7)' }
    ],
    correct: 'B',
    explanation: 'At x = 1: y = 2(1) - 1 = 1. So (1, 1) is on the line.'
  },
  {
    id: 'sat_math_b6_016',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If a = 3 and b = -2, what is the value of a² - b²?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '13' },
      { letter: 'C', text: '-5' },
      { letter: 'D', text: '1' }
    ],
    correct: 'A',
    explanation: 'a² - b² = 9 - 4 = 5.'
  },
  {
    id: 'sat_math_b6_017',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is the domain of f(x) = √(x - 3)?',
    options: [
      { letter: 'A', text: 'x ≥ 0' },
      { letter: 'B', text: 'x ≥ 3' },
      { letter: 'C', text: 'x > 3' },
      { letter: 'D', text: 'All real numbers' }
    ],
    correct: 'B',
    explanation: 'The expression under the square root must be non-negative: x - 3 ≥ 0 → x ≥ 3.'
  },
  {
    id: 'sat_math_b6_018',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Simplify: -2(3x - 4) + 5x',
    options: [
      { letter: 'A', text: '-x + 8' },
      { letter: 'B', text: '-x - 8' },
      { letter: 'C', text: 'x + 8' },
      { letter: 'D', text: '-11x + 8' }
    ],
    correct: 'A',
    explanation: '-2(3x - 4) + 5x = -6x + 8 + 5x = -x + 8.'
  },
  {
    id: 'sat_math_b6_019',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If the perimeter of a square is 36, what is its area?',
    options: [
      { letter: 'A', text: '81' },
      { letter: 'B', text: '36' },
      { letter: 'C', text: '144' },
      { letter: 'D', text: '9' }
    ],
    correct: 'A',
    explanation: 'Side = 36/4 = 9. Area = 9² = 81.'
  },
  {
    id: 'sat_math_b6_020',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Convert 0.6 to a fraction in simplest form.',
    options: [
      { letter: 'A', text: '6/10' },
      { letter: 'B', text: '3/5' },
      { letter: 'C', text: '2/3' },
      { letter: 'D', text: '1/6' }
    ],
    correct: 'B',
    explanation: '0.6 = 6/10 = 3/5 in simplest form.'
  },
  {
    id: 'sat_math_b6_021',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 5x - 10 = 0, what is x?',
    options: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '-2' },
      { letter: 'D', text: '10' }
    ],
    correct: 'B',
    explanation: '5x - 10 = 0 → 5x = 10 → x = 2.'
  },
  {
    id: 'sat_math_b6_022',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'A number decreased by 7 is 15. What is the number?',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '22' },
      { letter: 'C', text: '105' },
      { letter: 'D', text: '-22' }
    ],
    correct: 'B',
    explanation: 'x - 7 = 15 → x = 22.'
  },
  {
    id: 'sat_math_b6_023',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is the range of the function f(x) = x² + 1?',
    options: [
      { letter: 'A', text: 'y ≥ 0' },
      { letter: 'B', text: 'y ≥ 1' },
      { letter: 'C', text: 'All real numbers' },
      { letter: 'D', text: 'y > 1' }
    ],
    correct: 'B',
    explanation: 'Since x² ≥ 0 for all real x, f(x) = x² + 1 ≥ 1. The range is y ≥ 1.'
  },
  {
    id: 'sat_math_b6_024',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Simplify: (x + 3)(x - 3)',
    options: [
      { letter: 'A', text: 'x² - 9' },
      { letter: 'B', text: 'x² + 9' },
      { letter: 'C', text: 'x² - 6x + 9' },
      { letter: 'D', text: 'x² + 6x - 9' }
    ],
    correct: 'A',
    explanation: '(x + 3)(x - 3) = x² - 9 (difference of squares).'
  },
  {
    id: 'sat_math_b6_025',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If y varies directly with x and y = 12 when x = 4, what is y when x = 7?',
    options: [
      { letter: 'A', text: '21' },
      { letter: 'B', text: '28' },
      { letter: 'C', text: '15' },
      { letter: 'D', text: '3' }
    ],
    correct: 'A',
    explanation: 'y = kx. 12 = k(4) → k = 3. When x = 7: y = 3(7) = 21.'
  },
  {
    id: 'sat_math_b6_026',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is 15% of 80?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '15' },
      { letter: 'D', text: '8' }
    ],
    correct: 'B',
    explanation: '15% of 80 = 0.15 × 80 = 12.'
  },
  {
    id: 'sat_math_b6_027',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Solve: 3(x - 1) = 2(x + 4)',
    options: [
      { letter: 'A', text: '11' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '-5' }
    ],
    correct: 'A',
    explanation: '3x - 3 = 2x + 8 → x = 11.'
  },
  {
    id: 'sat_math_b6_028',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'The sum of two consecutive integers is 37. What is the smaller integer?',
    options: [
      { letter: 'A', text: '17' },
      { letter: 'B', text: '18' },
      { letter: 'C', text: '19' },
      { letter: 'D', text: '20' }
    ],
    correct: 'B',
    explanation: 'Let the integers be n and n+1. n + (n+1) = 37 → 2n + 1 = 37 → 2n = 36 → n = 18.'
  },
  {
    id: 'sat_math_b6_029',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If g(x) = 3x - 5, what is g(-2)?',
    options: [
      { letter: 'A', text: '-11' },
      { letter: 'B', text: '-1' },
      { letter: 'C', text: '1' },
      { letter: 'D', text: '11' }
    ],
    correct: 'A',
    explanation: 'g(-2) = 3(-2) - 5 = -6 - 5 = -11.'
  },
  {
    id: 'sat_math_b6_030',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Factor: x² + 5x + 6',
    options: [
      { letter: 'A', text: '(x + 1)(x + 6)' },
      { letter: 'B', text: '(x + 2)(x + 3)' },
      { letter: 'C', text: '(x - 2)(x - 3)' },
      { letter: 'D', text: '(x + 5)(x + 1)' }
    ],
    correct: 'B',
    explanation: 'We need two numbers that multiply to 6 and add to 5: 2 and 3. So x² + 5x + 6 = (x + 2)(x + 3).'
  },
  {
    id: 'sat_math_b6_031',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is the x-intercept of y = 3x - 9?',
    options: [
      { letter: 'A', text: '(3, 0)' },
      { letter: 'B', text: '(-3, 0)' },
      { letter: 'C', text: '(9, 0)' },
      { letter: 'D', text: '(0, -9)' }
    ],
    correct: 'A',
    explanation: 'Set y = 0: 0 = 3x - 9 → 3x = 9 → x = 3. The x-intercept is (3, 0).'
  },
  {
    id: 'sat_math_b6_032',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Simplify: (2x³)²',
    options: [
      { letter: 'A', text: '4x⁶' },
      { letter: 'B', text: '2x⁶' },
      { letter: 'C', text: '4x⁵' },
      { letter: 'D', text: '2x⁵' }
    ],
    correct: 'A',
    explanation: '(2x³)² = 2² · (x³)² = 4x⁶.'
  },
  {
    id: 'sat_math_b6_033',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'A recipe calls for 2 cups of flour for every 3 cups of sugar. How many cups of flour are needed for 12 cups of sugar?',
    options: [
      { letter: 'A', text: '6' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '18' },
      { letter: 'D', text: '4' }
    ],
    correct: 'B',
    explanation: '2/3 = x/12 → x = (2 × 12)/3 = 8 cups of flour.'
  },
  {
    id: 'sat_math_b6_034',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 2x + y = 10 and y = 4, what is x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '2' }
    ],
    correct: 'A',
    explanation: '2x + 4 = 10 → 2x = 6 → x = 3.'
  },
  {
    id: 'sat_math_b6_035',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'What is the value of (-3)³?',
    options: [
      { letter: 'A', text: '27' },
      { letter: 'B', text: '-27' },
      { letter: 'C', text: '9' },
      { letter: 'D', text: '-9' }
    ],
    correct: 'B',
    explanation: '(-3)³ = (-3)(-3)(-3) = 9(-3) = -27.'
  },
  {
    id: 'sat_math_b6_036',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'A car travels 180 miles in 3 hours. What is its average speed in miles per hour?',
    options: [
      { letter: 'A', text: '50' },
      { letter: 'B', text: '55' },
      { letter: 'C', text: '60' },
      { letter: 'D', text: '540' }
    ],
    correct: 'C',
    explanation: 'Speed = Distance/Time = 180/3 = 60 mph.'
  },
  {
    id: 'sat_math_b6_037',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Solve for x: x² = 49',
    options: [
      { letter: 'A', text: '7 only' },
      { letter: 'B', text: '-7 only' },
      { letter: 'C', text: '7 and -7' },
      { letter: 'D', text: '24.5' }
    ],
    correct: 'C',
    explanation: 'x² = 49 → x = ±7.'
  },
  {
    id: 'sat_math_b6_038',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Which equation is parallel to y = 2x + 5?',
    options: [
      { letter: 'A', text: 'y = 2x - 3' },
      { letter: 'B', text: 'y = -2x + 5' },
      { letter: 'C', text: 'y = x/2 + 5' },
      { letter: 'D', text: 'y = -x/2 + 3' }
    ],
    correct: 'A',
    explanation: 'Parallel lines have the same slope. y = 2x + 5 has slope 2, and y = 2x - 3 also has slope 2.'
  },
  {
    id: 'sat_math_b6_039',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'If 3x = 24, then x/2 = ?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '12' }
    ],
    correct: 'A',
    explanation: '3x = 24 → x = 8. Then x/2 = 8/2 = 4.'
  },
  {
    id: 'sat_math_b6_040',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'easy',
    passage: null,
    question: 'Simplify: (4x - 2) - (x + 5)',
    options: [
      { letter: 'A', text: '3x - 7' },
      { letter: 'B', text: '3x + 3' },
      { letter: 'C', text: '5x - 7' },
      { letter: 'D', text: '3x + 7' }
    ],
    correct: 'A',
    explanation: '(4x - 2) - (x + 5) = 4x - 2 - x - 5 = 3x - 7.'
  },
  {
    id: 'sat_math_b6_041',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve the system: x + y = 10 and 2x - y = 5. What is x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '15' }
    ],
    correct: 'B',
    explanation: 'Adding the equations: 3x = 15 → x = 5.'
  },
  {
    id: 'sat_math_b6_042',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = x² - 4x + 3, for which value of x does f(x) = 0?',
    options: [
      { letter: 'A', text: '1 and 3' },
      { letter: 'B', text: '-1 and -3' },
      { letter: 'C', text: '2 and 6' },
      { letter: 'D', text: '-1 and 3' }
    ],
    correct: 'A',
    explanation: 'x² - 4x + 3 = 0 → (x - 1)(x - 3) = 0 → x = 1 or x = 3.'
  },
  {
    id: 'sat_math_b6_043',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'A phone plan costs $25/month plus $0.10 per text. If the monthly bill is $37, how many texts were sent?',
    options: [
      { letter: 'A', text: '120' },
      { letter: 'B', text: '100' },
      { letter: 'C', text: '370' },
      { letter: 'D', text: '12' }
    ],
    correct: 'A',
    explanation: '25 + 0.10t = 37 → 0.10t = 12 → t = 120.'
  },
  {
    id: 'sat_math_b6_044',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'What is the vertex of the parabola y = (x - 3)² + 2?',
    options: [
      { letter: 'A', text: '(3, 2)' },
      { letter: 'B', text: '(-3, 2)' },
      { letter: 'C', text: '(3, -2)' },
      { letter: 'D', text: '(-3, -2)' }
    ],
    correct: 'A',
    explanation: 'In vertex form y = (x - h)² + k, the vertex is (h, k) = (3, 2).'
  },
  {
    id: 'sat_math_b6_045',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve: |2x - 3| = 7',
    options: [
      { letter: 'A', text: 'x = 5 or x = -2' },
      { letter: 'B', text: 'x = 5 or x = 2' },
      { letter: 'C', text: 'x = -5 or x = 2' },
      { letter: 'D', text: 'x = 5 only' }
    ],
    correct: 'A',
    explanation: '2x - 3 = 7 → x = 5, or 2x - 3 = -7 → x = -2.'
  },
  {
    id: 'sat_math_b6_046',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If the line passes through (2, 5) and (6, 13), what is its slope?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '1/2' },
      { letter: 'D', text: '8' }
    ],
    correct: 'A',
    explanation: 'Slope = (13 - 5)/(6 - 2) = 8/4 = 2.'
  },
  {
    id: 'sat_math_b6_047',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve: 2x² - 8 = 0',
    options: [
      { letter: 'A', text: 'x = 2 and x = -2' },
      { letter: 'B', text: 'x = 4 only' },
      { letter: 'C', text: 'x = 2 only' },
      { letter: 'D', text: 'x = √8' }
    ],
    correct: 'A',
    explanation: '2x² = 8 → x² = 4 → x = ±2.'
  },
  {
    id: 'sat_math_b6_048',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = 2x + 1 and g(x) = x², what is f(g(3))?',
    options: [
      { letter: 'A', text: '19' },
      { letter: 'B', text: '49' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '37' }
    ],
    correct: 'A',
    explanation: 'g(3) = 9. f(9) = 2(9) + 1 = 19.'
  },
  {
    id: 'sat_math_b6_049',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'The price of an item after a 30% increase is $65. What was the original price?',
    options: [
      { letter: 'A', text: '$45.50' },
      { letter: 'B', text: '$50' },
      { letter: 'C', text: '$84.50' },
      { letter: 'D', text: '$35' }
    ],
    correct: 'B',
    explanation: '1.30 × p = 65 → p = 65/1.30 = 50.'
  },
  {
    id: 'sat_math_b6_050',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve for x: (x + 2)/3 = (x - 1)/2',
    options: [
      { letter: 'A', text: '7' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '8' }
    ],
    correct: 'A',
    explanation: 'Cross multiply: 2(x + 2) = 3(x - 1) → 2x + 4 = 3x - 3 → 7 = x.'
  },
  {
    id: 'sat_math_b6_051',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'A rectangle has a length that is 3 more than twice its width. If the perimeter is 42, what is the width?',
    options: [
      { letter: 'A', text: '6' },
      { letter: 'B', text: '9' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '15' }
    ],
    correct: 'A',
    explanation: 'Let w = width, l = 2w + 3. Perimeter: 2(w + 2w + 3) = 42 → 2(3w + 3) = 42 → 6w + 6 = 42 → 6w = 36 → w = 6.'
  },
  {
    id: 'sat_math_b6_052',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Which expression is equivalent to (x² - 9)/(x + 3)?',
    options: [
      { letter: 'A', text: 'x - 3' },
      { letter: 'B', text: 'x + 3' },
      { letter: 'C', text: 'x² - 3' },
      { letter: 'D', text: 'x - 9' }
    ],
    correct: 'A',
    explanation: '(x² - 9)/(x + 3) = (x + 3)(x - 3)/(x + 3) = x - 3 (for x ≠ -3).'
  },
  {
    id: 'sat_math_b6_053',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If 3ˣ = 81, what is x?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '27' },
      { letter: 'D', text: '9' }
    ],
    correct: 'B',
    explanation: '81 = 3⁴, so 3ˣ = 3⁴ → x = 4.'
  },
  {
    id: 'sat_math_b6_054',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve the system: 3x + 2y = 16 and x - y = 2. What is y?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '5' }
    ],
    correct: 'A',
    explanation: 'From the second equation: x = y + 2. Substitute: 3(y + 2) + 2y = 16 → 3y + 6 + 2y = 16 → 5y = 10 → y = 2.'
  },
  {
    id: 'sat_math_b6_055',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'The function f(x) = -2(x + 1)² + 8 has a maximum value of:',
    options: [
      { letter: 'A', text: '8' },
      { letter: 'B', text: '-1' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '6' }
    ],
    correct: 'A',
    explanation: 'Since the coefficient of the squared term is negative, the parabola opens downward. The vertex is at (-1, 8), so the maximum value is 8.'
  },
  {
    id: 'sat_math_b6_056',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Simplify: (2x + 3)² ',
    options: [
      { letter: 'A', text: '4x² + 12x + 9' },
      { letter: 'B', text: '4x² + 9' },
      { letter: 'C', text: '2x² + 6x + 9' },
      { letter: 'D', text: '4x² + 6x + 9' }
    ],
    correct: 'A',
    explanation: '(2x + 3)² = (2x)² + 2(2x)(3) + 3² = 4x² + 12x + 9.'
  },
  {
    id: 'sat_math_b6_057',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'A population doubles every 5 years. If it starts at 1,000, what is it after 15 years?',
    options: [
      { letter: 'A', text: '3,000' },
      { letter: 'B', text: '4,000' },
      { letter: 'C', text: '6,000' },
      { letter: 'D', text: '8,000' }
    ],
    correct: 'D',
    explanation: 'After 15 years = 3 doubling periods. 1,000 × 2³ = 1,000 × 8 = 8,000.'
  },
  {
    id: 'sat_math_b6_058',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = x³ - 2x, what is f(-1)?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '-1' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '-3' }
    ],
    correct: 'A',
    explanation: 'f(-1) = (-1)³ - 2(-1) = -1 + 2 = 1.'
  },
  {
    id: 'sat_math_b6_059',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Which ordered pair is a solution to y > 2x - 1?',
    options: [
      { letter: 'A', text: '(3, 5)' },
      { letter: 'B', text: '(1, 0)' },
      { letter: 'C', text: '(0, 0)' },
      { letter: 'D', text: '(2, 2)' }
    ],
    correct: 'C',
    explanation: 'Check (0, 0): 0 > 2(0) - 1 → 0 > -1. True. Check (3, 5): 5 > 5. False. Check (1, 0): 0 > 1. False. Check (2, 2): 2 > 3. False.'
  },
  {
    id: 'sat_math_b6_060',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Simplify: √50 + √18',
    options: [
      { letter: 'A', text: '8√2' },
      { letter: 'B', text: '√68' },
      { letter: 'C', text: '5√2 + 3√2' },
      { letter: 'D', text: '8√2' }
    ],
    correct: 'A',
    explanation: '√50 = 5√2 and √18 = 3√2. So 5√2 + 3√2 = 8√2.'
  },
  {
    id: 'sat_math_b6_061',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If the roots of a quadratic are x = -2 and x = 5, which equation has those roots?',
    options: [
      { letter: 'A', text: 'x² - 3x - 10 = 0' },
      { letter: 'B', text: 'x² + 3x - 10 = 0' },
      { letter: 'C', text: 'x² - 3x + 10 = 0' },
      { letter: 'D', text: 'x² + 7x + 10 = 0' }
    ],
    correct: 'A',
    explanation: '(x + 2)(x - 5) = x² - 5x + 2x - 10 = x² - 3x - 10 = 0.'
  },
  {
    id: 'sat_math_b6_062',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Two trains leave from the same station in opposite directions. One travels at 60 mph and the other at 80 mph. After how many hours are they 420 miles apart?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '5' }
    ],
    correct: 'B',
    explanation: 'Combined rate = 60 + 80 = 140 mph. Time = 420/140 = 3 hours.'
  },
  {
    id: 'sat_math_b6_063',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = 4x - 7, what is f⁻¹(x) (the inverse function)?',
    options: [
      { letter: 'A', text: '(x + 7)/4' },
      { letter: 'B', text: '(x - 7)/4' },
      { letter: 'C', text: '4x + 7' },
      { letter: 'D', text: '7 - 4x' }
    ],
    correct: 'A',
    explanation: 'y = 4x - 7 → x = 4y - 7 → x + 7 = 4y → y = (x + 7)/4.'
  },
  {
    id: 'sat_math_b6_064',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve: x² - 6x + 9 = 0',
    options: [
      { letter: 'A', text: 'x = 3 (double root)' },
      { letter: 'B', text: 'x = -3 (double root)' },
      { letter: 'C', text: 'x = 3 and x = -3' },
      { letter: 'D', text: 'No real solutions' }
    ],
    correct: 'A',
    explanation: 'x² - 6x + 9 = (x - 3)² = 0 → x = 3 (double root).'
  },
  {
    id: 'sat_math_b6_065',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'A line perpendicular to y = 3x + 1 passes through (0, 4). What is its equation?',
    options: [
      { letter: 'A', text: 'y = -x/3 + 4' },
      { letter: 'B', text: 'y = 3x + 4' },
      { letter: 'C', text: 'y = -3x + 4' },
      { letter: 'D', text: 'y = x/3 + 4' }
    ],
    correct: 'A',
    explanation: 'Perpendicular slope = -1/3 (negative reciprocal of 3). Using point (0, 4): y = -x/3 + 4.'
  },
  {
    id: 'sat_math_b6_066',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If 2ˣ⁺¹ = 32, what is x?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '16' }
    ],
    correct: 'A',
    explanation: '32 = 2⁵. So 2^(x+1) = 2⁵ → x + 1 = 5 → x = 4.'
  },
  {
    id: 'sat_math_b6_067',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Factor completely: 2x² - 18',
    options: [
      { letter: 'A', text: '2(x + 3)(x - 3)' },
      { letter: 'B', text: '(2x + 6)(x - 3)' },
      { letter: 'C', text: '2(x² - 9)' },
      { letter: 'D', text: '(x + 3)(2x - 6)' }
    ],
    correct: 'A',
    explanation: '2x² - 18 = 2(x² - 9) = 2(x + 3)(x - 3).'
  },
  {
    id: 'sat_math_b6_068',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve: 5/(x - 1) = 3/(x + 1)',
    options: [
      { letter: 'A', text: '-4' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '-2' }
    ],
    correct: 'A',
    explanation: 'Cross multiply: 5(x + 1) = 3(x − 1). 5x + 5 = 3x − 3. 2x = −8. x = −4.',
  },
  {
    id: 'sat_math_b6_069',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'A mixture of 20% salt solution and 50% salt solution makes 30 liters of 40% solution. How many liters of the 50% solution are used?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '15' },
      { letter: 'C', text: '20' },
      { letter: 'D', text: '25' }
    ],
    correct: 'C',
    explanation: 'Let x = liters of 50% solution. Then 30 - x = liters of 20%. 0.20(30 - x) + 0.50x = 0.40(30) → 6 - 0.20x + 0.50x = 12 → 0.30x = 6 → x = 20.'
  },
  {
    id: 'sat_math_b6_070',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = x² + 2x - 3, what is the axis of symmetry?',
    options: [
      { letter: 'A', text: 'x = -1' },
      { letter: 'B', text: 'x = 1' },
      { letter: 'C', text: 'x = -3' },
      { letter: 'D', text: 'x = 3' }
    ],
    correct: 'A',
    explanation: 'Axis of symmetry = -b/(2a) = -2/(2·1) = -1.'
  },
  {
    id: 'sat_math_b6_071',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve: |3x + 1| ≤ 10',
    options: [
      { letter: 'A', text: '-11/3 ≤ x ≤ 3' },
      { letter: 'B', text: '-3 ≤ x ≤ 3' },
      { letter: 'C', text: 'x ≤ 3 or x ≥ -11/3' },
      { letter: 'D', text: '-10 ≤ x ≤ 10' }
    ],
    correct: 'A',
    explanation: '-10 ≤ 3x + 1 ≤ 10 → -11 ≤ 3x ≤ 9 → -11/3 ≤ x ≤ 3.'
  },
  {
    id: 'sat_math_b6_072',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'What is the sum of the solutions of x² - 5x + 6 = 0?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '-5' },
      { letter: 'D', text: '11' }
    ],
    correct: 'A',
    explanation: 'By Vieta\'s formulas, the sum of roots = -(-5)/1 = 5. (Or factor: (x-2)(x-3) = 0, roots are 2 and 3, sum = 5.)'
  },
  {
    id: 'sat_math_b6_073',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Simplify: (x² - 4x + 4)/(x - 2)',
    options: [
      { letter: 'A', text: 'x - 2' },
      { letter: 'B', text: 'x + 2' },
      { letter: 'C', text: 'x² - 2' },
      { letter: 'D', text: '(x - 4)' }
    ],
    correct: 'A',
    explanation: 'x² - 4x + 4 = (x - 2)². So (x - 2)²/(x - 2) = x - 2 (for x ≠ 2).'
  },
  {
    id: 'sat_math_b6_074',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If y = 3(2)ˣ, what is y when x = 4?',
    options: [
      { letter: 'A', text: '24' },
      { letter: 'B', text: '48' },
      { letter: 'C', text: '96' },
      { letter: 'D', text: '36' }
    ],
    correct: 'B',
    explanation: 'y = 3(2)⁴ = 3(16) = 48.'
  },
  {
    id: 'sat_math_b6_075',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'The graph of y = f(x) is shifted 3 units right and 2 units up. The new equation is:',
    options: [
      { letter: 'A', text: 'y = f(x - 3) + 2' },
      { letter: 'B', text: 'y = f(x + 3) + 2' },
      { letter: 'C', text: 'y = f(x - 3) - 2' },
      { letter: 'D', text: 'y = f(x + 3) - 2' }
    ],
    correct: 'A',
    explanation: 'Shifting right by 3: replace x with (x - 3). Shifting up by 2: add 2. Result: y = f(x - 3) + 2.'
  },
  {
    id: 'sat_math_b6_076',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If the discriminant of ax² + bx + c = 0 is negative, how many real solutions are there?',
    options: [
      { letter: 'A', text: '0' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: 'Infinitely many' }
    ],
    correct: 'A',
    explanation: 'When the discriminant b² - 4ac < 0, there are no real solutions (only complex solutions).'
  },
  {
    id: 'sat_math_b6_077',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve for x: 2/(x + 1) + 3/(x + 1) = 1',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '6' },
      { letter: 'D', text: '-4' }
    ],
    correct: 'A',
    explanation: '5/(x + 1) = 1 → x + 1 = 5 → x = 4.'
  },
  {
    id: 'sat_math_b6_078',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'A car depreciates by 15% each year. If it was worth $20,000 new, what is it worth after 2 years?',
    options: [
      { letter: 'A', text: '$14,000' },
      { letter: 'B', text: '$14,450' },
      { letter: 'C', text: '$17,000' },
      { letter: 'D', text: '$15,000' }
    ],
    correct: 'B',
    explanation: 'After 1 year: 20,000 × 0.85 = 17,000. After 2 years: 17,000 × 0.85 = 14,450.'
  },
  {
    id: 'sat_math_b6_079',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If log₂(x) = 5, what is x?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '25' },
      { letter: 'C', text: '32' },
      { letter: 'D', text: '64' }
    ],
    correct: 'C',
    explanation: 'log₂(x) = 5 means 2⁵ = x = 32.'
  },
  {
    id: 'sat_math_b6_080',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'The sum of three consecutive even integers is 72. What is the largest?',
    options: [
      { letter: 'A', text: '22' },
      { letter: 'B', text: '24' },
      { letter: 'C', text: '26' },
      { letter: 'D', text: '28' }
    ],
    correct: 'C',
    explanation: 'Let the integers be n, n+2, n+4. n + (n+2) + (n+4) = 72 → 3n + 6 = 72 → 3n = 66 → n = 22. Largest = 22 + 4 = 26.'
  },
  {
    id: 'sat_math_b6_081',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve the system: y = x² and y = 2x + 3. Find the positive x value.',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '4' }
    ],
    correct: 'A',
    explanation: 'x² = 2x + 3 → x² - 2x - 3 = 0 → (x - 3)(x + 1) = 0. The positive value is x = 3.'
  },
  {
    id: 'sat_math_b6_082',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Simplify: (3x⁻²y³)/(9x⁴y⁻¹)',
    options: [
      { letter: 'A', text: 'y⁴/(3x⁶)' },
      { letter: 'B', text: '3y⁴/x⁶' },
      { letter: 'C', text: 'y²/(3x²)' },
      { letter: 'D', text: 'y⁴/(3x²)' }
    ],
    correct: 'A',
    explanation: '(3/9) · x^(-2-4) · y^(3-(-1)) = (1/3) · x⁻⁶ · y⁴ = y⁴/(3x⁶).'
  },
  {
    id: 'sat_math_b6_083',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = 2x - 1 and g(x) = x + 3, for what value of x does f(x) = g(x)?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '-2' },
      { letter: 'D', text: '1' }
    ],
    correct: 'A',
    explanation: '2x - 1 = x + 3 → x = 4.'
  },
  {
    id: 'sat_math_b6_084',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Which inequality has the solution set x < -2 or x > 5?',
    options: [
      { letter: 'A', text: '(x + 2)(x - 5) > 0' },
      { letter: 'B', text: '(x + 2)(x - 5) < 0' },
      { letter: 'C', text: '(x - 2)(x + 5) > 0' },
      { letter: 'D', text: '(x - 2)(x + 5) < 0' }
    ],
    correct: 'A',
    explanation: '(x + 2)(x - 5) > 0 when both factors are positive (x > 5) or both negative (x < -2).'
  },
  {
    id: 'sat_math_b6_085',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'What is the product of the solutions of x² + x - 12 = 0?',
    options: [
      { letter: 'A', text: '-12' },
      { letter: 'B', text: '12' },
      { letter: 'C', text: '-1' },
      { letter: 'D', text: '1' }
    ],
    correct: 'A',
    explanation: 'By Vieta\'s formulas, the product of roots = c/a = -12/1 = -12. (Or: (x+4)(x-3) = 0, roots are -4 and 3, product = -12.)'
  },
  {
    id: 'sat_math_b6_086',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve: √(2x + 1) = 5',
    options: [
      { letter: 'A', text: '12' },
      { letter: 'B', text: '13' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '3' }
    ],
    correct: 'A',
    explanation: 'Square both sides: 2x + 1 = 25 → 2x = 24 → x = 12.'
  },
  {
    id: 'sat_math_b6_087',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'A company\'s profit P (in thousands) is modeled by P = -x² + 10x - 16, where x is units sold (in thousands). What is the maximum profit?',
    options: [
      { letter: 'A', text: '$9,000' },
      { letter: 'B', text: '$10,000' },
      { letter: 'C', text: '$16,000' },
      { letter: 'D', text: '$25,000' }
    ],
    correct: 'A',
    explanation: 'Maximum at x = -b/(2a) = -10/(-2) = 5. P(5) = -25 + 50 - 16 = 9 (thousands) = $9,000.'
  },
  {
    id: 'sat_math_b6_088',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If g(x) = (x - 2)/(x + 4), what value of x makes g(x) undefined?',
    options: [
      { letter: 'A', text: '-4' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '-2' }
    ],
    correct: 'A',
    explanation: 'g(x) is undefined when the denominator is 0: x + 4 = 0 → x = -4.'
  },
  {
    id: 'sat_math_b6_089',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'Solve: 4x - 3 > 2x + 7',
    options: [
      { letter: 'A', text: 'x > 5' },
      { letter: 'B', text: 'x > 2' },
      { letter: 'C', text: 'x < 5' },
      { letter: 'D', text: 'x < 2' }
    ],
    correct: 'A',
    explanation: '4x - 3 > 2x + 7 → 2x > 10 → x > 5.'
  },
  {
    id: 'sat_math_b6_090',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'medium',
    passage: null,
    question: 'If f(x) = x² and g(x) = √x, what is g(f(5))?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '25' },
      { letter: 'C', text: '√5' },
      { letter: 'D', text: '10' }
    ],
    correct: 'A',
    explanation: 'f(5) = 25. g(25) = √25 = 5.'
  },
  {
    id: 'sat_math_b6_091',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = ax² + bx + c, f(0) = 3, f(1) = 6, and f(-1) = 4, what is the value of a?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '1' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '-1' }
    ],
    correct: 'A',
    explanation: 'f(0) = c = 3. f(1) = a + b + 3 = 6, so a + b = 3. f(-1) = a - b + 3 = 4, so a - b = 1. Adding: 2a = 4, so a = 2.',
  },
  {
    id: 'sat_math_b6_092',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'The equation x² - kx + 16 = 0 has exactly one real solution. What is the positive value of k?',
    options: [
      { letter: 'A', text: '4' },
      { letter: 'B', text: '8' },
      { letter: 'C', text: '16' },
      { letter: 'D', text: '32' }
    ],
    correct: 'B',
    explanation: 'For exactly one solution, discriminant = 0: k² - 4(1)(16) = 0 → k² = 64 → k = ±8. Positive value: k = 8.'
  },
  {
    id: 'sat_math_b6_093',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'Solve: √(3x + 7) = x - 1',
    options: [
      { letter: 'A', text: 'x = 6' },
      { letter: 'B', text: 'x = -1 and x = 6' },
      { letter: 'C', text: 'x = -1' },
      { letter: 'D', text: 'x = 3' }
    ],
    correct: 'A',
    explanation: 'Square both sides: 3x + 7 = x² - 2x + 1 → x² - 5x - 6 = 0 → (x - 6)(x + 1) = 0. Check x = 6: √25 = 5 = 6 - 1. ✓ Check x = -1: √4 = 2 ≠ -2. ✗ Only x = 6 works.'
  },
  {
    id: 'sat_math_b6_094',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = x³ - 3x² + 2x, how many distinct real zeros does f have?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '0' }
    ],
    correct: 'C',
    explanation: 'f(x) = x(x² - 3x + 2) = x(x - 1)(x - 2). The zeros are x = 0, 1, and 2—three distinct zeros.'
  },
  {
    id: 'sat_math_b6_095',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'The system y = x² - 2x and y = mx has exactly one solution. What are the possible values of m?',
    options: [
      { letter: 'A', text: 'm = -2 only' },
      { letter: 'B', text: 'm = 0 only' },
      { letter: 'C', text: 'm = -2 or m = 0' },
      { letter: 'D', text: 'm = 2 only' }
    ],
    correct: 'A',
    explanation: 'x² - 2x = mx → x² - (2+m)x = 0 → x(x - (2+m)) = 0. Solutions: x = 0 and x = 2+m. For exactly one solution, these must be equal: 2 + m = 0 → m = -2.'
  },
  {
    id: 'sat_math_b6_096',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If 2^(2x) - 5·2^x + 4 = 0, what is the sum of all values of x?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '5' }
    ],
    correct: 'A',
    explanation: 'Let u = 2^x. Then u² - 5u + 4 = 0 → (u - 1)(u - 4) = 0 → u = 1 or u = 4. So 2^x = 1 → x = 0, or 2^x = 4 → x = 2. Sum = 0 + 2 = 2.'
  },
  {
    id: 'sat_math_b6_097',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = (2x - 1)/(x + 3), what is the horizontal asymptote?',
    options: [
      { letter: 'A', text: 'y = 2' },
      { letter: 'B', text: 'y = -3' },
      { letter: 'C', text: 'y = 1/3' },
      { letter: 'D', text: 'y = 0' }
    ],
    correct: 'A',
    explanation: 'For rational functions where the degree of numerator equals the degree of denominator, the horizontal asymptote is the ratio of leading coefficients: 2/1 = 2.'
  },
  {
    id: 'sat_math_b6_098',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'A ball is thrown upward. Its height in feet is h(t) = -16t² + 64t + 5. What is the maximum height?',
    options: [
      { letter: 'A', text: '69 feet' },
      { letter: 'B', text: '64 feet' },
      { letter: 'C', text: '85 feet' },
      { letter: 'D', text: '53 feet' }
    ],
    correct: 'A',
    explanation: 'Max at t = -64/(2·(-16)) = 2. h(2) = -16(4) + 64(2) + 5 = -64 + 128 + 5 = 69 feet.'
  },
  {
    id: 'sat_math_b6_099',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If log(x) + log(x + 3) = 1, what is x?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '7' },
      { letter: 'D', text: '10' }
    ],
    correct: 'A',
    explanation: 'log(x(x+3)) = 1 → x(x+3) = 10 → x² + 3x - 10 = 0 → (x+5)(x-2) = 0. Since x must be positive (log domain), x = 2.'
  },
  {
    id: 'sat_math_b6_100',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = 2x + 3 and f(g(x)) = 6x - 1, what is g(x)?',
    options: [
      { letter: 'A', text: '3x - 2' },
      { letter: 'B', text: '3x + 1' },
      { letter: 'C', text: '6x - 4' },
      { letter: 'D', text: '3x - 1' }
    ],
    correct: 'A',
    explanation: 'f(g(x)) = 2g(x) + 3 = 6x - 1 → 2g(x) = 6x - 4 → g(x) = 3x - 2.'
  },
  {
    id: 'sat_math_b6_101',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'Solve: |2x - 1| > |x + 3|',
    options: [
      { letter: 'A', text: 'x < -2/3 or x > 4' },
      { letter: 'B', text: '-2/3 < x < 4' },
      { letter: 'C', text: 'x > 4 only' },
      { letter: 'D', text: 'x < -2 or x > 4' }
    ],
    correct: 'A',
    explanation: 'Square both sides: (2x-1)² > (x+3)² → 4x²-4x+1 > x²+6x+9 → 3x²-10x-8 > 0 → (3x+2)(x-4) > 0. Solution: x < -2/3 or x > 4.'
  },
  {
    id: 'sat_math_b6_102',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'A geometric sequence has first term 3 and common ratio 2. What is the sum of the first 6 terms?',
    options: [
      { letter: 'A', text: '189' },
      { letter: 'B', text: '192' },
      { letter: 'C', text: '96' },
      { letter: 'D', text: '63' }
    ],
    correct: 'A',
    explanation: 'Sum = a(r^n - 1)/(r - 1) = 3(2⁶ - 1)/(2 - 1) = 3(64 - 1)/1 = 3(63) = 189.'
  },
  {
    id: 'sat_math_b6_103',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If x + 1/x = 5, what is x² + 1/x²?',
    options: [
      { letter: 'A', text: '23' },
      { letter: 'B', text: '25' },
      { letter: 'C', text: '27' },
      { letter: 'D', text: '10' }
    ],
    correct: 'A',
    explanation: 'Square both sides: (x + 1/x)² = 25 → x² + 2 + 1/x² = 25 → x² + 1/x² = 23.'
  },
  {
    id: 'sat_math_b6_104',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'The polynomial p(x) = x³ - 6x² + 11x - 6. If p(1) = 0, factor p(x) completely.',
    options: [
      { letter: 'A', text: '(x - 1)(x - 2)(x - 3)' },
      { letter: 'B', text: '(x - 1)(x + 2)(x + 3)' },
      { letter: 'C', text: '(x + 1)(x - 2)(x - 3)' },
      { letter: 'D', text: '(x - 1)(x - 2)(x + 3)' }
    ],
    correct: 'A',
    explanation: 'Since p(1) = 0, (x-1) is a factor. Dividing: x³-6x²+11x-6 = (x-1)(x²-5x+6) = (x-1)(x-2)(x-3).'
  },
  {
    id: 'sat_math_b6_105',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'Solve: (x - 1)/(x + 2) < 0',
    options: [
      { letter: 'A', text: '-2 < x < 1' },
      { letter: 'B', text: 'x < -2 or x > 1' },
      { letter: 'C', text: 'x < 1' },
      { letter: 'D', text: 'x > -2' }
    ],
    correct: 'A',
    explanation: 'The expression is negative when numerator and denominator have opposite signs. x - 1 < 0 and x + 2 > 0 → -2 < x < 1.'
  },
  {
    id: 'sat_math_b6_106',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = 2ˣ and g(x) = log₂(x), what is f(g(16))?',
    options: [
      { letter: 'A', text: '16' },
      { letter: 'B', text: '4' },
      { letter: 'C', text: '8' },
      { letter: 'D', text: '256' }
    ],
    correct: 'A',
    explanation: 'g(16) = log₂(16) = 4. f(4) = 2⁴ = 16. (f and g are inverse functions, so f(g(x)) = x.)'
  },
  {
    id: 'sat_math_b6_107',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If the quadratic equation x² − 6x + k = 0 has exactly one real solution, what is k?',
    options: [
      { letter: 'A', text: '9' },
      { letter: 'B', text: '6' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '12' }
    ],
    correct: 'A',
    explanation: 'For exactly one real solution, the discriminant equals zero: b² − 4ac = 36 − 4k = 0. Solving: k = 9.',
  },
  {
    id: 'sat_math_b6_108',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = |x - 2| + |x + 3|, what is the minimum value of f(x)?',
    options: [
      { letter: 'A', text: '5' },
      { letter: 'B', text: '0' },
      { letter: 'C', text: '1' },
      { letter: 'D', text: '3' }
    ],
    correct: 'A',
    explanation: 'By the triangle inequality, |x - 2| + |x + 3| ≥ |(x-2) - (x+3)| = 5 when x is between -3 and 2. The minimum value is 5.'
  },
  {
    id: 'sat_math_b6_109',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'How many integer solutions does the inequality x² - 5x + 6 ≤ 0 have?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: 'Infinitely many' }
    ],
    correct: 'B',
    explanation: 'x² - 5x + 6 = (x-2)(x-3) ≤ 0. Solution: 2 ≤ x ≤ 3. Integer solutions: x = 2 and x = 3, so 2 integers.'
  },
  {
    id: 'sat_math_b6_110',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = x² - 4 and g(x) = √(x + 4), what is the domain of g(f(x))?',
    options: [
      { letter: 'A', text: 'All real numbers' },
      { letter: 'B', text: 'x ≥ 0' },
      { letter: 'C', text: 'x ≥ 2' },
      { letter: 'D', text: 'x ≥ -2' }
    ],
    correct: 'A',
    explanation: 'g(f(x)) = √(x² - 4 + 4) = √(x²) = |x|. This is defined for all real numbers.'
  },
  {
    id: 'sat_math_b6_111',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'A worker can complete a job in 6 hours. Another worker can complete it in 4 hours. Working together, how long will it take (in hours)?',
    options: [
      { letter: 'A', text: '2.4' },
      { letter: 'B', text: '5' },
      { letter: 'C', text: '3' },
      { letter: 'D', text: '10' }
    ],
    correct: 'A',
    explanation: 'Combined rate = 1/6 + 1/4 = 2/12 + 3/12 = 5/12. Time = 12/5 = 2.4 hours.'
  },
  {
    id: 'sat_math_b6_112',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If x² + y² = 25 and xy = 12, what is (x + y)²?',
    options: [
      { letter: 'A', text: '49' },
      { letter: 'B', text: '37' },
      { letter: 'C', text: '1' },
      { letter: 'D', text: '169' }
    ],
    correct: 'A',
    explanation: '(x + y)² = x² + 2xy + y² = 25 + 2(12) = 25 + 24 = 49.'
  },
  {
    id: 'sat_math_b6_113',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'The sum of an arithmetic sequence with 20 terms is 420. If the first term is 2, what is the common difference?',
    options: [
      { letter: 'A', text: '2' },
      { letter: 'B', text: '3' },
      { letter: 'C', text: '4' },
      { letter: 'D', text: '1' }
    ],
    correct: 'A',
    explanation: 'S = n/2(2a + (n−1)d). 420 = 10(4 + 19d). 42 = 4 + 19d. 19d = 38. d = 2.',
  },
  {
    id: 'sat_math_b6_114',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If 3^(x+2) = 9^(2x-1), what is x?',
    options: [
      { letter: 'A', text: '4/3' },
      { letter: 'B', text: '2' },
      { letter: 'C', text: '1' },
      { letter: 'D', text: '3' }
    ],
    correct: 'A',
    explanation: '9 = 3², so 9^(2x-1) = 3^(2(2x-1)) = 3^(4x-2). Then x + 2 = 4x - 2 → 4 = 3x → x = 4/3.'
  },
  {
    id: 'sat_math_b6_115',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'A parabola passes through (0, 0), (2, 0), and (1, -3). What is the equation?',
    options: [
      { letter: 'A', text: 'y = 3x² - 6x' },
      { letter: 'B', text: 'y = -3x² + 6x' },
      { letter: 'C', text: 'y = 3x(x - 2)' },
      { letter: 'D', text: 'Both A and C' }
    ],
    correct: 'D',
    explanation: 'Since the parabola passes through (0,0) and (2,0), y = a·x(x-2). Using (1, -3): -3 = a(1)(-1) → a = 3. So y = 3x(x-2) = 3x² - 6x. A and C are the same.'
  },
  {
    id: 'sat_math_b6_116',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'Solve: 1/(x-1) + 1/(x+1) = 4/(x²-1)',
    options: [
      { letter: 'A', text: 'x = 2' },
      { letter: 'B', text: 'x = 1' },
      { letter: 'C', text: 'No solution' },
      { letter: 'D', text: 'x = -1' }
    ],
    correct: 'A',
    explanation: 'Note x² - 1 = (x-1)(x+1). Multiply both sides by (x²-1): (x+1) + (x-1) = 4 → 2x = 4 → x = 2. Check: x = 2 doesn\'t make any denominator zero, so it\'s valid.'
  },
  {
    id: 'sat_math_b6_117',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If f(x) = x/(x-1) and g(x) = 1/(x-1), what is f(x) - g(x)?',
    options: [
      { letter: 'A', text: '1' },
      { letter: 'B', text: '(x-1)/(x-1)' },
      { letter: 'C', text: 'x-1' },
      { letter: 'D', text: '(x+1)/(x-1)' }
    ],
    correct: 'A',
    explanation: 'f(x) - g(x) = x/(x-1) - 1/(x-1) = (x-1)/(x-1) = 1 (for x ≠ 1).'
  },
  {
    id: 'sat_math_b6_118',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'The function f(x) = (x² - 9)/(x² - x - 6) has a hole at what x-value?',
    options: [
      { letter: 'A', text: '3' },
      { letter: 'B', text: '-3' },
      { letter: 'C', text: '2' },
      { letter: 'D', text: '-2' }
    ],
    correct: 'A',
    explanation: 'f(x) = (x+3)(x-3)/((x-3)(x+2)). The factor (x-3) cancels, creating a hole at x = 3. At x = -2, there is a vertical asymptote.'
  },
  {
    id: 'sat_math_b6_119',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'If a + b = 7 and a² + b² = 29, what is ab?',
    options: [
      { letter: 'A', text: '10' },
      { letter: 'B', text: '20' },
      { letter: 'C', text: '12' },
      { letter: 'D', text: '15' }
    ],
    correct: 'A',
    explanation: '(a + b)² = a² + 2ab + b² → 49 = 29 + 2ab → 2ab = 20 → ab = 10.'
  },
  {
    id: 'sat_math_b6_120',
    category: 'math',
    subcategory: 'algebra',
    difficulty: 'hard',
    passage: null,
    question: 'A ball is dropped from 64 feet and bounces to 50% of its previous height each time. What is the total distance traveled when the ball hits the ground for the 4th time?',
    options: [
      { letter: 'A', text: '176 feet' },
      { letter: 'B', text: '160 feet' },
      { letter: 'C', text: '128 feet' },
      { letter: 'D', text: '192 feet' }
    ],
    correct: 'A',
    explanation: 'Drop: 64. Bounce 1: up 32 + down 32 = 64. Bounce 2: up 16 + down 16 = 32. Bounce 3: up 8 + down 8 = 16. Total = 64 + 64 + 32 + 16 = 176 feet.',
  }
];
