/**
 * SAT Reading & Writing Question Pool
 * Combines all available RW questions into one pool for random test assembly.
 * The `section` field is stripped — the test builder assigns sections randomly.
 */
import { satTest1RW } from './test1-rw.js'
import { satRWPoolExtra } from './rw-pool-extra.js'
import { rwBatch1 } from './rw-batch-1.js'
import { rwBatch2 } from './rw-batch-2.js'
import { rwBatch3 } from './rw-batch-3.js'
import { rwBatch4 } from './rw-batch-4.js'
import { rwBatch5 } from './rw-batch-5.js'
import { rwBatch6 } from './rw-batch-6.js'
import { rwBatch7 } from './rw-batch-7.js'
import { rwBatch8 } from './rw-batch-8.js'

// Strip the `section` field from existing questions (they had fixed section assignments)
const existingQuestions = satTest1RW.map(({ section, ...rest }) => rest)

// Combine existing + new questions into one pool
export const satRWPool = [
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
