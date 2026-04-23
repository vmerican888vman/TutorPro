import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { resetPassword } from '@/lib/auth'
import { colors, spacing, radius } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    if (!email) return Alert.alert('Error', 'Please enter your email')
    Keyboard.dismiss()
    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) return Alert.alert('Error', error.message)
    Alert.alert('Check your email', 'We sent you a password reset link', [
      { text: 'OK', onPress: () => router.back() },
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', padding: spacing.lg }}>
      <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', top: spacing.lg, left: spacing.lg }} accessibilityLabel="Go back" accessibilityRole="button">
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </TouchableOpacity>

      <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700', marginBottom: spacing.sm }}>
        Reset Password
      </Text>
      <Text style={{ color: colors.muted, fontSize: 14, marginBottom: spacing.xl }}>
        Enter your email and we'll send you a reset link.
      </Text>

      <TextInput
        style={{
          backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.border,
          borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 14,
          color: colors.white, fontSize: 15,
        }}
        placeholder="you@example.com"
        placeholderTextColor={colors.muted}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        returnKeyType="go"
        onSubmitEditing={handleReset}
      />

      <TouchableOpacity
        style={{
          backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 14,
          alignItems: 'center', marginTop: spacing.lg, opacity: loading ? 0.6 : 1,
        }}
        onPress={handleReset}
        disabled={loading}
        accessibilityLabel={loading ? 'Sending reset link' : 'Send reset link'}
        accessibilityRole="button"
      >
        <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
