import { create } from 'zustand'
import { createConversation, getConversations, getConversation } from '../lib/database'
import { sendTutorMessage } from '../lib/tutor'

export const useTutorStore = create((set, get) => ({
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
  },

  startNewConversation: async (userId, category) => {
    set({ loading: true, error: null })
    const cat = category || get().category
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
  },

  sendMessage: async (userId, text, questionContext) => {
    const { activeConversationId, category } = get()

    // If no active conversation, create one
    let convId = activeConversationId
    if (!convId) {
      const conv = await get().startNewConversation(userId, category)
      if (!conv) return
      convId = conv.id
    }

    // Optimistically add user message
    const userMsg = { role: 'user', content: text, timestamp: new Date().toISOString() }
    set((state) => ({
      messages: [...state.messages, userMsg],
      sending: true,
      error: null,
    }))

    try {
      const response = await sendTutorMessage({
        conversationId: convId,
        message: text,
        category,
        questionContext,
      })

      const assistantMsg = {
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
      }
      set((state) => ({
        messages: [...state.messages, assistantMsg],
        sending: false,
      }))
    } catch (err) {
      set({ sending: false, error: err.message })
    }
  },

  clearChat: () => {
    set({
      activeConversationId: null,
      messages: [],
      error: null,
    })
  },
}))
