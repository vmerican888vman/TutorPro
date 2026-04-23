import { useEffect, useRef, useState } from 'react'
import {
  View, Text, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/stores/authStore'
import { useTutorStore } from '@/stores/tutorStore'
import { colors, spacing, radius, categoryColor } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

export default function TutorScreen() {
  const [input, setInput] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const scrollRef = useRef<ScrollView>(null)
  const user = useAuthStore((s) => s.user)
  const {
    conversations, messages, category, sending, loading, error,
    setCategory, loadConversations, selectConversation, sendMessage, clearChat, startNewConversation,
  } = useTutorStore()

  useEffect(() => {
    if (user?.id) loadConversations(user.id)
  }, [user?.id])

  useEffect(() => {
    const timer = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100)
    return () => clearTimeout(timer)
  }, [messages.length])

  const handleSend = () => {
    const text = input.trim()
    if (!text || sending || !user?.id) return
    Keyboard.dismiss()
    setInput('')
    sendMessage(user.id, text)
  }

  const categories = ['math', 'reading', 'writing', 'general']

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
        {/* Header */}
        <View style={{
          flexDirection: 'row', alignItems: 'center', padding: spacing.md,
          borderBottomWidth: 1, borderBottomColor: colors.border,
        }}>
          <TouchableOpacity
            onPress={() => setShowSidebar(!showSidebar)}
            style={{ marginRight: spacing.md }}
            accessibilityLabel="Open conversation menu"
            accessibilityRole="button"
          >
            <Ionicons name="menu" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={{ color: colors.white, fontSize: 18, fontWeight: '700', flex: 1 }}>AI Tutor</Text>
          <TouchableOpacity
            onPress={() => { clearChat(); user?.id && startNewConversation(user.id) }}
            accessibilityLabel="Start new chat"
            accessibilityRole="button"
          >
            <Ionicons name="add-circle-outline" size={24} color={colors.gold} />
          </TouchableOpacity>
        </View>

        {/* Category pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ maxHeight: 48, borderBottomWidth: 1, borderBottomColor: colors.border }} contentContainerStyle={{ padding: spacing.sm, gap: spacing.sm }}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={{
                paddingHorizontal: 14, paddingVertical: 6, borderRadius: radius.full,
                backgroundColor: category === cat ? categoryColor(cat) + '20' : colors.cardBg,
                borderWidth: 1, borderColor: category === cat ? categoryColor(cat) : colors.border,
              }}
              onPress={() => setCategory(cat)}
            >
              <Text style={{
                color: category === cat ? categoryColor(cat) : colors.muted,
                fontSize: 13, fontWeight: '600', textTransform: 'capitalize',
              }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Sidebar overlay */}
        {showSidebar && (
          <View style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10,
            flexDirection: 'row',
          }}>
            <View style={{
              width: 280, backgroundColor: colors.bgLight, borderRightWidth: 1,
              borderRightColor: colors.border, paddingTop: 60,
            }}>
              <View style={{ padding: spacing.md, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600' }}>Conversations</Text>
                <TouchableOpacity
                  onPress={() => setShowSidebar(false)}
                  accessibilityLabel="Close sidebar"
                  accessibilityRole="button"
                >
                  <Ionicons name="close" size={22} color={colors.muted} />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ flex: 1 }}>
                {conversations.map((conv) => (
                  <TouchableOpacity
                    key={conv.id}
                    style={{
                      padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
                    }}
                    onPress={() => { selectConversation(conv.id); setShowSidebar(false) }}
                  >
                    <Text style={{ color: colors.white, fontSize: 14 }} numberOfLines={1}>
                      {conv.category || 'General'} chat
                    </Text>
                    <Text style={{ color: colors.muted, fontSize: 11, marginTop: 2 }}>
                      {new Date(conv.updated_at || conv.created_at).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>
                ))}
                {conversations.length === 0 && (
                  <Text style={{ color: colors.muted, fontSize: 13, padding: spacing.md }}>No conversations yet</Text>
                )}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
              onPress={() => setShowSidebar(false)}
              accessibilityRole="button"
            />
          </View>
        )}

        {/* Messages */}
        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ padding: spacing.md }}>
          {messages.length === 0 && !loading && (
            <View style={{ alignItems: 'center', paddingTop: 80 }}>
              <View style={{
                width: 64, height: 64, borderRadius: 32, backgroundColor: colors.goldDim,
                justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md,
              }}>
                <Text style={{ fontSize: 28 }}>&#9733;</Text>
              </View>
              <Text style={{ color: colors.white, fontSize: 18, fontWeight: '600', marginBottom: spacing.xs }}>
                SAT & ACT AI Tutor
              </Text>
              <Text style={{ color: colors.muted, fontSize: 14, textAlign: 'center', lineHeight: 20 }}>
                Ask me anything about Math, Reading,{'\n'}or Writing. I'm here to help!
              </Text>

              {/* Quick prompts */}
              {['Explain quadratic equations', 'Help me with reading comprehension', 'Grammar rules for commas'].map((prompt) => (
                <TouchableOpacity
                  key={prompt}
                  style={{
                    backgroundColor: colors.cardBg, borderWidth: 1, borderColor: colors.border,
                    borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 10,
                    marginTop: spacing.sm, width: '90%',
                  }}
                  onPress={() => { setInput(prompt); }}
                >
                  <Text style={{ color: colors.gold, fontSize: 14 }}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {messages.map((msg, i) => (
            <View
              key={i}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%', marginBottom: spacing.md,
              }}
            >
              {msg.role === 'assistant' && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{
                    width: 22, height: 22, borderRadius: 11, backgroundColor: colors.goldDim,
                    justifyContent: 'center', alignItems: 'center', marginRight: 6,
                  }}>
                    <Text style={{ fontSize: 12 }}>&#9733;</Text>
                  </View>
                  <Text style={{ color: colors.gold, fontSize: 12, fontWeight: '600' }}>TutorPro</Text>
                </View>
              )}
              <View style={{
                backgroundColor: msg.role === 'user' ? colors.gold : colors.cardBg,
                padding: spacing.md, borderRadius: radius.md,
                borderWidth: msg.role === 'assistant' ? 1 : 0,
                borderColor: colors.border,
              }}>
                <Text style={{
                  color: msg.role === 'user' ? colors.bg : colors.white,
                  fontSize: 15, lineHeight: 22,
                }}>{msg.content}</Text>
              </View>
            </View>
          ))}

          {sending && (
            <View style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
              <View style={{
                backgroundColor: colors.cardBg, padding: spacing.md, borderRadius: radius.md,
                borderWidth: 1, borderColor: colors.border, flexDirection: 'row', gap: 4,
              }}>
                {[0, 1, 2].map((i) => (
                  <View key={i} style={{
                    width: 8, height: 8, borderRadius: 4, backgroundColor: colors.gold,
                    opacity: 0.5,
                  }} />
                ))}
              </View>
            </View>
          )}

          {error && !sending && (
            <View style={{
              alignSelf: 'flex-start', maxWidth: '85%', backgroundColor: colors.red + '15',
              padding: spacing.md, borderRadius: radius.md, borderWidth: 1, borderColor: colors.red + '30',
            }}>
              <Text style={{ color: colors.red, fontSize: 13 }}>Failed to send. Please try again.</Text>
            </View>
          )}
        </ScrollView>

        {/* Input bar */}
        <View style={{
          flexDirection: 'row', padding: spacing.md, borderTopWidth: 1,
          borderTopColor: colors.border, backgroundColor: colors.bgLight, alignItems: 'flex-end',
        }}>
          <TextInput
            style={{
              flex: 1, backgroundColor: colors.cardBg, borderRadius: radius.md,
              paddingHorizontal: 16, paddingVertical: 12, color: colors.white, fontSize: 15,
              maxHeight: 100, borderWidth: 1, borderColor: colors.border,
            }}
            placeholder="Ask your tutor..."
            placeholderTextColor={colors.muted}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={2000}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity
            style={{
              width: 44, height: 44, borderRadius: 22, backgroundColor: input.trim() ? colors.gold : colors.cardBg,
              justifyContent: 'center', alignItems: 'center', marginLeft: spacing.sm,
            }}
            onPress={handleSend}
            disabled={!input.trim() || sending}
            accessibilityLabel="Send message"
            accessibilityRole="button"
          >
            <Ionicons name="send" size={18} color={input.trim() ? colors.bg : colors.muted} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
