import { create } from 'zustand'

interface Answer {
  question_id: string
  selected: string
  correct: string
  category: string
  time_spent_ms: number
}

interface DiagnosticResults {
  total_score: number
  total_questions: number
  math_score: number
  math_questions: number
  reading_score: number
  reading_questions: number
  writing_score: number
  writing_questions: number
  time_spent_seconds: number
  answers: Answer[]
}

interface DiagnosticState {
  currentQuestionIndex: number
  answers: Answer[]
  startTime: number | null
  questionStartTime: number | null
  isComplete: boolean
  startTest: () => void
  submitAnswer: (questionId: string, selected: string, correct: string, category: string) => void
  nextQuestion: (totalQuestions: number) => void
  getResults: () => DiagnosticResults
  reset: () => void
}

export const useDiagnosticStore = create<DiagnosticState>((set, get) => ({
  currentQuestionIndex: 0,
  answers: [],
  startTime: null,
  questionStartTime: null,
  isComplete: false,

  startTest: () => {
    set({
      currentQuestionIndex: 0,
      answers: [],
      startTime: Date.now(),
      questionStartTime: Date.now(),
      isComplete: false,
    })
  },

  submitAnswer: (questionId, selected, correct, category) => {
    const now = Date.now()
    const timeSpentMs = now - (get().questionStartTime || now)
    set((state) => ({
      answers: [...state.answers, { question_id: questionId, selected, correct, category, time_spent_ms: timeSpentMs }],
      questionStartTime: now,
    }))
  },

  nextQuestion: (totalQuestions) => {
    const { currentQuestionIndex } = get()
    if (currentQuestionIndex + 1 >= totalQuestions) {
      set({ isComplete: true })
    } else {
      set({ currentQuestionIndex: currentQuestionIndex + 1 })
    }
  },

  getResults: () => {
    const { answers, startTime } = get()
    const totalCorrect = answers.filter((a) => a.selected === a.correct).length
    const mathAnswers = answers.filter((a) => a.category === 'math')
    const readingAnswers = answers.filter((a) => a.category === 'reading')
    const writingAnswers = answers.filter((a) => a.category === 'writing')

    return {
      total_score: totalCorrect,
      total_questions: answers.length,
      math_score: mathAnswers.filter((a) => a.selected === a.correct).length,
      math_questions: mathAnswers.length,
      reading_score: readingAnswers.filter((a) => a.selected === a.correct).length,
      reading_questions: readingAnswers.length,
      writing_score: writingAnswers.filter((a) => a.selected === a.correct).length,
      writing_questions: writingAnswers.length,
      time_spent_seconds: Math.round((Date.now() - (startTime || Date.now())) / 1000),
      answers,
    }
  },

  reset: () => {
    set({
      currentQuestionIndex: 0,
      answers: [],
      startTime: null,
      questionStartTime: null,
      isComplete: false,
    })
  },
}))
