/**
 * SAT Question Pool Types
 * Compatible with the mobile app's DiagnosticQuestion interface.
 */

export interface SATQuestionOption {
  letter: string
  text: string
}

export interface SATQuestion {
  id: string
  question: string
  passage?: string | null
  options: SATQuestionOption[]
  correct: string
  category: string
  subcategory?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  explanation?: string
  /** Only present in test1 files; stripped by pool aggregators */
  section?: string
}
