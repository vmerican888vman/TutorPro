/**
 * SAT Math Question Pool
 * Combines all available Math questions into one pool for random test assembly.
 * The `section` field is stripped — the test builder assigns sections randomly.
 */
import type { SATQuestion } from './types'
import { satTest1Math } from './test1-math'
import { satMathPoolExtra } from './math-pool-extra'
import { mathBatch1 } from './math-batch-1'
import { mathBatch2 } from './math-batch-2'
import { mathBatch3 } from './math-batch-3'
import { mathBatch4 } from './math-batch-4'
import { mathBatch5 } from './math-batch-5'
import { mathBatch6 } from './math-batch-6'
import { mathBatch7 } from './math-batch-7'
import { mathBatch8 } from './math-batch-8'
import { mathBatch9 } from './math-batch-9'
import { mathBatch10 } from './math-batch-10'

// Strip the `section` field from existing questions (they had fixed section assignments)
const existingQuestions: SATQuestion[] = satTest1Math.map(({ section, ...rest }) => rest)

// Combine existing + new questions into one pool
export const satMathPool: SATQuestion[] = [
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
