/**
 * SAT Math Question Pool
 * Combines all available Math questions into one pool for random test assembly.
 * The `section` field is stripped — the test builder assigns sections randomly.
 */
import { satTest1Math } from './test1-math.js'
import { satMathPoolExtra } from './math-pool-extra.js'

// Strip the `section` field from existing questions (they had fixed section assignments)
const existingQuestions = satTest1Math.map(({ section, ...rest }) => rest)

// Combine existing + new questions into one pool
export const satMathPool = [...existingQuestions, ...satMathPoolExtra]
