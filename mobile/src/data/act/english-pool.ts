import { ACTQuestion } from './types'
import { actEnglishPart1 } from './english-pool-part1'
import { actEnglishPart2 } from './english-pool-part2'
import { actEnglishPart3 } from './english-pool-part3'

export const actEnglishPool: ACTQuestion[] = [
  ...actEnglishPart1,
  ...actEnglishPart2,
  ...actEnglishPart3,
]

export default actEnglishPool
