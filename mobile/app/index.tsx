import { useEffect } from 'react'
import { router, useRootNavigationState } from 'expo-router'
import { View, ActivityIndicator } from 'react-native'
import { useAuthStore } from '@/stores/authStore'
import { colors } from '@/theme'

export default function Index() {
  const { user, loading } = useAuthStore()
  const navigationState = useRootNavigationState()

  useEffect(() => {
    if (loading) return
    if (!navigationState?.key) return

    if (user) {
      router.replace('/(tabs)/dashboard')
    } else {
      router.replace('/(auth)/login')
    }
  }, [user, loading, navigationState?.key])

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.gold} />
    </View>
  )
}
