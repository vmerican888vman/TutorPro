import { create } from 'zustand'

export const useDiagnosticStore = create((set, get) => ({
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
    const timeSpentMs = now - get().questionStartTime

    set((state) => ({
      answers: [
        ...state.answers,
        { question_id: questionId, selected, correct, category, time_spent_ms: timeSpentMs },
      ],
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
      time_spent_seconds: Math.round((Date.now() - startTime) / 1000),
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
