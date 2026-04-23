import { useState, useRef } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Keyboard,
} from 'react-native'
import { router } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { colors, spacing, radius } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

export default function SignupScreen() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const signUp = useAuthStore((s) => s.signUp)
  const emailRef = useRef<TextInput>(null)
  const passwordRef = useRef<TextInput>(null)

  const handleSignup = async () => {
    if (!fullName || !email || !password) return Alert.alert('Error', 'Please fill in all fields')
    if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert('Error', 'Please enter a valid email address')
    if (password.length < 6) return Alert.alert('Error', 'Password must be at least 6 characters')
    Keyboard.dismiss()
    setLoading(true)
    const { error } = await signUp({ email, password, fullName })
    setLoading(false)
    if (error) return Alert.alert('Sign Up Failed', error.message)
    Alert.alert('Success', 'Check your email to confirm your account', [
      { text: 'OK', onPress: () => router.replace('/(auth)/login') },
    ])
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing.lg }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ alignItems: 'center', marginBottom: spacing.xxl }}>
          <Text style={{ color: colors.white, fontSize: 28, fontWeight: '700' }}>Create Account</Text>
          <Text style={{ color: colors.muted, fontSize: 14, marginTop: spacing.xs }}>
            Start your 7-day free trial
          </Text>
        </View>

        <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 6, marginLeft: 4 }}>Full Name</Text>
        <TextInput
          style={inputStyle}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          value={fullName}
          onChangeText={setFullName}
          autoComplete="name"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 6, marginLeft: 4, marginTop: spacing.md }}>Email</Text>
        <TextInput
          style={inputStyle}
          ref={emailRef}
          placeholder="you@example.com"
          placeholderTextColor={colors.muted}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />

        <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 6, marginLeft: 4, marginTop: spacing.md }}>Password</Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            ref={passwordRef}
            style={inputStyle}
            placeholder="6+ characters"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="new-password"
            returnKeyType="go"
            onSubmitEditing={handleSignup}
          />
          <TouchableOpacity
            style={{ position: 'absolute', right: 14, top: 14 }}
            onPress={() => setShowPassword(!showPassword)}
            accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
            accessibilityRole="button"
          >
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.muted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 14,
            alignItems: 'center', marginTop: spacing.lg, opacity: loading ? 0.6 : 1,
          }}
          onPress={handleSignup}
          disabled={loading}
          accessibilityLabel={loading ? 'Creating account' : 'Start free trial'}
          accessibilityRole="button"
        >
          <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>
            {loading ? 'Creating account...' : 'Start Free Trial'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginTop: spacing.lg, alignItems: 'center' }}
          onPress={() => router.push('/(auth)/login')}
          accessibilityRole="button"
        >
          <Text style={{ color: colors.muted, fontSize: 13 }}>
            Already have an account?{' '}
            <Text style={{ color: colors.gold, fontWeight: '600' }}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const inputStyle = {
  backgroundColor: colors.bgLight,
  borderWidth: 1,
  borderColor: colors.border,
  borderRadius: radius.md,
  paddingHorizontal: 16,
  paddingVertical: 14,
  color: colors.white,
  fontSize: 15,
} as const
