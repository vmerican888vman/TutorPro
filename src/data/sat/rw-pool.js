/**
 * SAT Reading & Writing Question Pool
 * Combines all available RW questions into one pool for random test assembly.
 * The `section` field is stripped — the test builder assigns sections randomly.
 */
import { satTest1RW } from './test1-rw.js'
import { satRWPoolExtra } from './rw-pool-extra.js'

// Strip the `section` field from existing questions (they had fixed section assignments)
const existingQuestions = satTest1RW.map(({ section, ...rest }) => rest)

// Combine existing + new questions into one pool
export const satRWPool = [...existingQuestions, ...satRWPoolExtra]
