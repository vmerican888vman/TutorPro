/**
 * SAT Math Question Pool
 * Combines all available Math questions into one pool for random test assembly.
 * The `section` field is stripped — the test builder assigns sections randomly.
 */
import { satTest1Math } from './test1-math.js'
import { satMathPoolExtra } from './math-pool-extra.js'
import { mathBatch1 } from './math-batch-1.js'
import { mathBatch2 } from './math-batch-2.js'
import { mathBatch3 } from './math-batch-3.js'
import { mathBatch4 } from './math-batch-4.js'
import { mathBatch5 } from './math-batch-5.js'
import { mathBatch6 } from './math-batch-6.js'
import { mathBatch7 } from './math-batch-7.js'
import { mathBatch8 } from './math-batch-8.js'
import { mathBatch9 } from './math-batch-9.js'
import { mathBatch10 } from './math-batch-10.js'

// Strip the `section` field from existing questions (they had fixed section assignments)
const existingQuestions = satTest1Math.map(({ section, ...rest }) => rest)

// Combine existing + new questions into one pool
export const satMathPool = [
  ...existingQuestions,
  ...satMathPoolExtra,
  ...mathBatch1,
  ...mathBatch2,
  ...mathBatch3,
  ...mathBatch4,
  ...mathBatch5,
  ...mathBatch6,
  ...mathBatch7,
  ...mathBatch8,
  ...mathBatch9,
  ...mathBatch10,
]
