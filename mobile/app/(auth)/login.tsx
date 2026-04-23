import { useState, useRef } from 'react'
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert, Keyboard,
} from 'react-native'
import { router } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { colors, spacing, radius } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const signIn = useAuthStore((s) => s.signIn)
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle)
  const passwordRef = useRef<TextInput>(null)

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert('Error', 'Please fill in all fields')
    if (!/\S+@\S+\.\S+/.test(email)) return Alert.alert('Error', 'Please enter a valid email address')
    Keyboard.dismiss()
    setLoading(true)
    const { error } = await signIn({ email, password })
    setLoading(false)
    if (error) return Alert.alert('Login Failed', error.message)
    router.replace('/(tabs)/dashboard')
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: spacing.lg }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={{ alignItems: 'center', marginBottom: spacing.xxl }}>
          <View style={{
            width: 64, height: 64, borderRadius: radius.lg, backgroundColor: colors.goldDim,
            justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md,
          }}>
            <Text style={{ fontSize: 28 }}>&#9733;</Text>
          </View>
          <Text style={{ color: colors.white, fontSize: 28, fontWeight: '700' }}>TutorPro.ai</Text>
          <Text style={{ color: colors.muted, fontSize: 14, marginTop: spacing.xs }}>
            Your AI-powered SAT & ACT tutor
          </Text>
        </View>

        {/* Email */}
        <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 6, marginLeft: 4 }}>Email</Text>
        <TextInput
          style={inputStyle}
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

        {/* Password */}
        <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 6, marginLeft: 4, marginTop: spacing.md }}>
          Password
        </Text>
        <View style={{ position: 'relative' }}>
          <TextInput
            ref={passwordRef}
            style={inputStyle}
            placeholder="Enter password"
            placeholderTextColor={colors.muted}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="password"
            returnKeyType="go"
            onSubmitEditing={handleLogin}
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

        {/* Forgot password */}
        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} style={{ alignSelf: 'flex-end', marginTop: spacing.sm }} accessibilityRole="button">
          <Text style={{ color: colors.gold, fontSize: 13 }}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login button */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 14,
            alignItems: 'center', marginTop: spacing.lg, opacity: loading ? 0.6 : 1,
          }}
          onPress={handleLogin}
          disabled={loading}
          accessibilityLabel={loading ? 'Signing in' : 'Sign in'}
          accessibilityRole="button"
        >
          <Text style={{ color: colors.bg, fontSize: 16, fontWeight: '700' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: spacing.lg }}>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
          <Text style={{ color: colors.muted, marginHorizontal: spacing.md, fontSize: 12 }}>or</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
        </View>

        {/* Google */}
        <TouchableOpacity
          style={{
            borderWidth: 1, borderColor: colors.borderLight, borderRadius: radius.md,
            paddingVertical: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'center',
          }}
          onPress={signInWithGoogle}
          accessibilityRole="button"
        >
          <Ionicons name="logo-google" size={18} color={colors.white} style={{ marginRight: 8 }} />
          <Text style={{ color: colors.white, fontSize: 15, fontWeight: '500' }}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Diagnostic CTA */}
        <TouchableOpacity
          style={{ marginTop: spacing.lg, alignItems: 'center' }}
          onPress={() => router.push('/diagnostic')}
          accessibilityRole="button"
        >
          <Text style={{ color: colors.muted, fontSize: 13 }}>
            New here?{' '}
            <Text style={{ color: colors.gold, fontWeight: '600' }}>Take a free diagnostic test</Text>
          </Text>
        </TouchableOpacity>

        {/* Sign up */}
        <TouchableOpacity
          style={{ marginTop: spacing.md, alignItems: 'center' }}
          onPress={() => router.push('/(auth)/signup')}
          accessibilityRole="button"
        >
          <Text style={{ color: colors.muted, fontSize: 13 }}>
            Don't have an account?{' '}
            <Text style={{ color: colors.gold, fontWeight: '600' }}>Sign Up</Text>
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
