import { useState, useRef } from 'react'
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { updateProfile } from '@/lib/database'
import { updatePassword } from '@/lib/auth'
import { colors, spacing, radius } from '@/theme'
import { Ionicons } from '@expo/vector-icons'

export default function SettingsScreen() {
  const { profile, user, signOut, isPro, isTrialActive, trialDaysRemaining } = useAuthStore()
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [saving, setSaving] = useState(false)
  const newPasswordRef = useRef<TextInput>(null)
  const confirmPasswordRef = useRef<TextInput>(null)

  const handleSaveName = async () => {
    if (!fullName.trim() || !user?.id) return
    Keyboard.dismiss()
    setSaving(true)
    try {
      await updateProfile(user.id, { full_name: fullName.trim() })
      Alert.alert('Saved', 'Your name has been updated')
    } catch (e) {
      Alert.alert('Error', 'Could not save your name. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword.length < 6) return Alert.alert('Error', 'Password must be at least 6 characters')
    if (newPassword !== confirmPassword) return Alert.alert('Error', 'Passwords do not match')
    setSaving(true)
    const { error } = await updatePassword(newPassword)
    setSaving(false)
    if (error) return Alert.alert('Error', error.message)
    setNewPassword('')
    setConfirmPassword('')
    Alert.alert('Success', 'Password updated successfully')
  }

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => {
        await signOut()
        router.replace('/(auth)/login')
      }},
    ])
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={{ color: colors.white, fontSize: 24, fontWeight: '700', marginBottom: spacing.lg }}>
          Settings
        </Text>

        {/* Account info */}
        <View style={{
          backgroundColor: colors.cardBg, padding: spacing.lg, borderRadius: radius.md,
          marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}>
            <View style={{
              width: 48, height: 48, borderRadius: 24, backgroundColor: colors.goldDim,
              justifyContent: 'center', alignItems: 'center', marginRight: spacing.md,
            }}>
              <Text style={{ color: colors.gold, fontSize: 20, fontWeight: '700' }}>
                {(profile?.full_name || 'U').charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600' }}>
                {profile?.full_name || 'Student'}
              </Text>
              <Text style={{ color: colors.muted, fontSize: 13 }}>{profile?.email}</Text>
            </View>
          </View>

          {/* Subscription status */}
          <View style={{
            backgroundColor: isPro() ? colors.green + '15' : colors.goldDim,
            paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.full, alignSelf: 'flex-start',
          }}>
            <Text style={{ color: isPro() ? colors.green : colors.gold, fontSize: 12, fontWeight: '600' }}>
              {profile?.subscription_status === 'pro' ? 'Pro Member' :
               isTrialActive() ? `Trial (${trialDaysRemaining()} days left)` : 'Free'}
            </Text>
          </View>
        </View>

        {/* Edit name */}
        <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600', marginBottom: spacing.sm }}>
          Full Name
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.border,
            borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 14,
            color: colors.white, fontSize: 15, marginBottom: spacing.sm,
          }}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your name"
          placeholderTextColor={colors.muted}
          returnKeyType="done"
          onSubmitEditing={handleSaveName}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.gold, borderRadius: radius.md, paddingVertical: 12,
            alignItems: 'center', marginBottom: spacing.xl, opacity: saving ? 0.6 : 1,
          }}
          onPress={handleSaveName}
          disabled={saving}
          accessibilityRole="button"
        >
          <Text style={{ color: colors.bg, fontWeight: '700' }}>Save Name</Text>
        </TouchableOpacity>

        {/* Change password */}
        <Text style={{ color: colors.white, fontSize: 16, fontWeight: '600', marginBottom: spacing.sm }}>
          Change Password
        </Text>
        <TextInput
          style={{
            backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.border,
            borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 14,
            color: colors.white, fontSize: 15, marginBottom: spacing.sm,
          }}
          ref={newPasswordRef}
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New password (6+ chars)"
          placeholderTextColor={colors.muted}
          secureTextEntry
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => confirmPasswordRef.current?.focus()}
        />
        <TextInput
          style={{
            backgroundColor: colors.bgLight, borderWidth: 1, borderColor: colors.border,
            borderRadius: radius.md, paddingHorizontal: 16, paddingVertical: 14,
            color: colors.white, fontSize: 15, marginBottom: spacing.sm,
          }}
          ref={confirmPasswordRef}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm password"
          placeholderTextColor={colors.muted}
          secureTextEntry
          returnKeyType="go"
          onSubmitEditing={handleChangePassword}
        />
        <TouchableOpacity
          style={{
            backgroundColor: colors.cardBg, borderRadius: radius.md, paddingVertical: 12,
            alignItems: 'center', marginBottom: spacing.xl, borderWidth: 1, borderColor: colors.border,
          }}
          onPress={handleChangePassword}
          accessibilityRole="button"
        >
          <Text style={{ color: colors.white, fontWeight: '600' }}>Update Password</Text>
        </TouchableOpacity>

        {/* Sign out */}
        <TouchableOpacity
          style={{
            borderRadius: radius.md, paddingVertical: 14, alignItems: 'center',
            borderWidth: 1, borderColor: colors.red + '40', marginTop: spacing.lg,
          }}
          onPress={handleSignOut}
          accessibilityLabel="Sign out of your account"
          accessibilityRole="button"
        >
          <Text style={{ color: colors.red, fontSize: 15, fontWeight: '600' }}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={{ color: colors.muted, fontSize: 11, textAlign: 'center', marginTop: spacing.xl }}>
          TutorPro.ai v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}
