export interface ACTQuestionOption {
  letter: string
  text: string
}

export interface ACTQuestion {
  id: string
  question: string
  passage?: string
  options: ACTQuestionOption[]
  correct: string
  category: string
  subcategory?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  explanation?: string
}
