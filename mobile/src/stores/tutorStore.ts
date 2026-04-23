import { create } from 'zustand'
import { createConversation, getConversations, getConversation } from '../lib/database'
import { sendTutorMessage } from '../lib/tutor'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  user_id: string
  category: string
  messages: Message[]
  created_at: string
  updated_at: string
}

interface TutorState {
  conversations: Conversation[]
  activeConversationId: string | null
  messages: Message[]
  category: string
  loading: boolean
  sending: boolean
  error: string | null
  setCategory: (category: string) => void
  loadConversations: (userId: string) => Promise<void>
  selectConversation: (conversationId: string) => Promise<void>
  startNewConversation: (userId: string, category?: string) => Promise<any>
  sendMessage: (userId: string, text: string, questionContext?: any) => Promise<void>
  clearChat: () => void
}

export const useTutorStore = create<TutorState>((set, get) => ({
  conversations: [],
  activeConversationId: null,
  messages: [],
  category: 'general',
  loading: false,
  sending: false,
  error: null,

  setCategory: (category) => set({ category }),

  loadConversations: async (userId) => {
    const { data } = await getConversations(userId)
    set({ conversations: data || [] })
  },

  selectConversation: async (conversationId) => {
    set({ loading: true, error: null })
    try {
      const { data } = await getConversation(conversationId)
      if (data) {
        set({
          activeConversationId: conversationId,
          messages: data.messages || [],
          category: data.category || 'general',
          loading: false,
        })
      } else {
        set({ loading: false })
      }
    } catch (err: any) {
      set({ loading: false, error: err.message || 'Failed to load conversation' })
    }
  },

  startNewConversation: async (userId, category?) => {
    set({ loading: true, error: null })
    const cat = category || get().category
    try {
      const { data } = await createConversation(userId, cat)
      if (data) {
        set((state) => ({
          activeConversationId: data.id,
          messages: [],
          category: cat,
          conversations: [data, ...state.conversations],
          loading: false,
        }))
      } else {
        set({ loading: false })
      }
      return data
    } catch (err: any) {
      set({ loading: false, error: err.message || 'Failed to create conversation' })
      return null
    }
  },

  sendMessage: async (userId, text, questionContext?) => {
    const currentCategory = get().category
    let convId = get().activeConversationId
    if (!convId) {
      const conv = await get().startNewConversation(userId, currentCategory)
      if (!conv) return
      convId = conv.id
    }

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date().toISOString() }
    set((state) => ({
      messages: [...state.messages, userMsg],
      sending: true,
      error: null,
    }))

    try {
      const response = await sendTutorMessage({
        conversationId: convId!,
        message: text,
        category: currentCategory,
        questionContext,
      })
      const assistantMsg: Message = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
      }
      set((state) => ({
        messages: [...state.messages, assistantMsg],
        sending: false,
      }))
    } catch (err: any) {
      set({ sending: false, error: err.message })
    }
  },

  clearChat: () => {
    set({ activeConversationId: null, messages: [], error: null })
  },
}))
