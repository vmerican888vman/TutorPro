import { useState, useEffect, useRef } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Animated,
  KeyboardAvoidingView, Platform, Dimensions, ActivityIndicator,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuthStore } from '@/stores/authStore'
import { sendTutorMessage } from '@/lib/tutor'
import { createConversation } from '@/lib/database'
import { colors, spacing, radius } from '@/theme'

interface Question {
  id: string
  question: string
  passage?: string
  options: Array<{ letter: string; text: string }>
  category: string
  correct: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function FloatingTutorChat({ question }: { question?: Question }) {
  const user = useAuthStore((s) => s.user)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)

  const scrollRef = useRef<ScrollView>(null)
  const slideAnim = useRef(new Animated.Value(0)).current
  const screenHeight = Dimensions.get('window').height

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: open ? 1 : 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start()
  }, [open])

  useEffect(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
  }, [messages, sending])

  const buildContext = () => {
    if (!question) return undefined
    let ctx = `Current question: ${question.question}\n`
    if (question.passage) ctx += `Passage: ${question.passage}\n`
    if (question.options) {
      ctx += `Options:\n`
      question.options.forEach((o) => { ctx += `  ${o.letter}) ${o.text}\n` })
    }
    ctx += `Category: ${question.category}\n`
    ctx += `Correct answer: ${question.correct}`
    return ctx
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || sending || !user) return

    setInput('')
    setError(null)
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setSending(true)

    try {
      let convId = conversationId
      if (!convId) {
        const { data } = await createConversation(user.id, question?.category || 'general')
        if (!data) throw new Error('Failed to start conversation')
        convId = data.id
        setConversationId(convId)
      }

      const response = await sendTutorMessage({
        conversationId: convId,
        message: text,
        category: question?.category || 'general',
        questionContext: buildContext(),
      })

      setMessages((prev) => [...prev, { role: 'assistant', content: response.message }])
    } catch (err: any) {
      setError(err.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, 0],
  })

  return (
    <>
      {/* Chat Panel */}
      <Animated.View
        pointerEvents={open ? 'auto' : 'none'}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: screenHeight * 0.65,
          backgroundColor: colors.bg,
          borderTopLeftRadius: 20, borderTopRightRadius: 20,
          borderWidth: 1, borderColor: colors.border, borderBottomWidth: 0,
          transform: [{ translateY }],
          zIndex: 900,
          shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.3, shadowRadius: 12, elevation: 20,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={0}
        >
          {/* Header */}
          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
            paddingHorizontal: 18, paddingVertical: 14,
            borderBottomWidth: 1, borderBottomColor: colors.border,
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{
                width: 32, height: 32, borderRadius: 16,
                backgroundColor: colors.goldDim,
                justifyContent: 'center', alignItems: 'center',
              }}>
                <Ionicons name="star" size={16} color={colors.gold} />
              </View>
              <View>
                <Text style={{ color: colors.white, fontWeight: '700', fontSize: 15 }}>AI Tutor</Text>
                <Text style={{ color: colors.muted, fontSize: 11 }}>Ask about this question</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setOpen(false)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={22} color={colors.muted} />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: 16 }}
            keyboardShouldPersistTaps="handled"
          >
            {messages.length === 0 && !sending ? (
              <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                <View style={{
                  width: 48, height: 48, borderRadius: 24,
                  backgroundColor: colors.goldDim,
                  justifyContent: 'center', alignItems: 'center', marginBottom: 14,
                }}>
                  <Ionicons name="chatbubble-outline" size={22} color={colors.gold} />
                </View>
                <Text style={{ color: colors.muted, fontSize: 14, textAlign: 'center', lineHeight: 20, maxWidth: 260 }}>
                  Need help? Ask me about this question and I'll guide you through it.
                </Text>
                <View style={{ marginTop: 16, width: '100%', gap: 8 }}>
                  {['Give me a hint', 'Explain this concept', 'Why is my answer wrong?'].map((prompt) => (
                    <TouchableOpacity
                      key={prompt}
                      onPress={() => setInput(prompt)}
                      style={{
                        paddingVertical: 10, paddingHorizontal: 16,
                        borderRadius: 20, backgroundColor: colors.cardBg,
                        borderWidth: 1, borderColor: colors.border,
                      }}
                    >
                      <Text style={{ color: colors.gold, fontSize: 13 }}>{prompt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <View key={i} style={{
                    flexDirection: 'row',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: 12,
                  }}>
                    {msg.role === 'assistant' && (
                      <View style={{
                        width: 26, height: 26, borderRadius: 13,
                        backgroundColor: colors.goldDim,
                        justifyContent: 'center', alignItems: 'center',
                        marginRight: 8, marginTop: 2,
                      }}>
                        <Ionicons name="star" size={11} color={colors.gold} />
                      </View>
                    )}
                    <View style={{
                      maxWidth: '80%', padding: 12,
                      borderRadius: 14,
                      backgroundColor: msg.role === 'user' ? colors.goldDim : colors.cardBg,
                      borderWidth: 1,
                      borderColor: msg.role === 'user' ? colors.goldBorder : colors.border,
                    }}>
                      <Text style={{
                        color: colors.white, fontSize: 14, lineHeight: 20,
                      }}>{msg.content}</Text>
                    </View>
                  </View>
                ))}
                {sending && (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <View style={{
                      width: 26, height: 26, borderRadius: 13,
                      backgroundColor: colors.goldDim,
                      justifyContent: 'center', alignItems: 'center',
                    }}>
                      <Ionicons name="star" size={11} color={colors.gold} />
                    </View>
                    <View style={{
                      padding: 12, borderRadius: 14,
                      backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.border,
                    }}>
                      <ActivityIndicator size="small" color={colors.gold} />
                    </View>
                  </View>
                )}
              </>
            )}
          </ScrollView>

          {/* Error */}
          {error && (
            <View style={{
              marginHorizontal: 16, marginBottom: 6, padding: 10, borderRadius: 8,
              backgroundColor: 'rgba(248,113,113,0.08)', borderWidth: 1, borderColor: 'rgba(248,113,113,0.25)',
            }}>
              <Text style={{ color: '#F87171', fontSize: 13 }}>{error}</Text>
            </View>
          )}

          {/* Input */}
          <View style={{
            flexDirection: 'row', alignItems: 'center', gap: 8,
            paddingHorizontal: 14, paddingVertical: 12,
            borderTopWidth: 1, borderTopColor: colors.border,
          }}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder={sending ? 'Thinking...' : 'Ask about this question...'}
              placeholderTextColor={colors.muted}
              editable={!sending}
              style={{
                flex: 1, paddingVertical: 10, paddingHorizontal: 16,
                borderRadius: 20, backgroundColor: colors.cardBg,
                borderWidth: 1.5, borderColor: colors.border,
                color: colors.white, fontSize: 14,
              }}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSend}
              disabled={sending || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: 19,
                backgroundColor: input.trim() && !sending ? colors.gold : colors.cardBg,
                justifyContent: 'center', alignItems: 'center',
              }}
            >
              <Ionicons
                name="send"
                size={16}
                color={input.trim() && !sending ? colors.bg : colors.muted}
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>

      {/* Floating Toggle Button */}
      {!open && (
        <TouchableOpacity
          onPress={() => setOpen(true)}
          style={{
            position: 'absolute', bottom: 24, right: 24,
            width: 56, height: 56, borderRadius: 28,
            backgroundColor: colors.gold,
            justifyContent: 'center', alignItems: 'center',
            shadowColor: colors.gold, shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3, shadowRadius: 12, elevation: 8,
            zIndex: 901,
          }}
        >
          <Ionicons name="chatbubble" size={24} color={colors.bg} />
        </TouchableOpacity>
      )}
    </>
  )
}
