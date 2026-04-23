/**
 * SAT Reading & Writing Question Pool
 * Combines all available RW questions into one pool for random test assembly.
 * The `section` field is stripped — the test builder assigns sections randomly.
 */
import type { SATQuestion } from './types'
import { satTest1RW } from './test1-rw'
import { satRWPoolExtra } from './rw-pool-extra'
import { rwBatch1 } from './rw-batch-1'
import { rwBatch2 } from './rw-batch-2'
import { rwBatch3 } from './rw-batch-3'
import { rwBatch4 } from './rw-batch-4'
import { rwBatch5 } from './rw-batch-5'
import { rwBatch6 } from './rw-batch-6'
import { rwBatch7 } from './rw-batch-7'
import { rwBatch8 } from './rw-batch-8'

// Strip the `section` field from existing questions (they had fixed section assignments)
const existingQuestions: SATQuestion[] = satTest1RW.map(({ section, ...rest }) => rest)

// Combine existing + new questions into one pool
export const satRWPool: SATQuestion[] = [
  ...existingQuestions,
  ...satRWPoolExtra,
  ...rwBatch1,
  ...rwBatch2,
  ...rwBatch3,
  ...rwBatch4,
  ...rwBatch5,
  ...rwBatch6,
  ...rwBatch7,
  ...rwBatch8,
]
