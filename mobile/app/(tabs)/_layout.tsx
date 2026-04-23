import { Tabs, Redirect } from 'expo-router'
import { useAuthStore } from '@/stores/authStore'
import { colors } from '@/theme'
import { Ionicons } from '@expo/vector-icons'
import { View, ActivityIndicator } from 'react-native'

export default function TabsLayout() {
  const { user, loading } = useAuthStore()

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    )
  }

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.bgLight,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: 85,
          paddingBottom: 25,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
          tabBarAccessibilityLabel: 'Home tab',
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: 'Practice',
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
          tabBarAccessibilityLabel: 'Practice tab',
        }}
      />
      <Tabs.Screen
        name="fulltest"
        options={{
          title: 'Full Tests',
          tabBarIcon: ({ color, size }) => <Ionicons name="document-text" size={size} color={color} />,
          tabBarAccessibilityLabel: 'Full Tests tab',
        }}
      />
      <Tabs.Screen
        name="tutor"
        options={{
          title: 'AI Tutor',
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-ellipses" size={size} color={color} />,
          tabBarAccessibilityLabel: 'AI Tutor tab',
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart" size={size} color={color} />,
          tabBarAccessibilityLabel: 'Progress tab',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} />,
          tabBarAccessibilityLabel: 'Settings tab',
        }}
      />
    </Tabs>
  )
}
