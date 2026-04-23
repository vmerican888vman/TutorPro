export const colors = {
  bg: '#07070F',
  bgLight: '#0E0E1A',
  cardBg: '#0C0C18',
  gold: '#F5C842',
  goldDim: 'rgba(245,200,66,0.15)',
  goldBorder: 'rgba(245,200,66,0.25)',
  white: '#FAFAF9',
  muted: '#9B9BAD',
  green: '#34D399',
  red: '#F87171',
  mathPurple: '#818CF8',
  readingGreen: '#34D399',
  writingYellow: '#FBBF24',
  flame: '#FF6B35',
  border: 'rgba(255,255,255,0.06)',
  borderLight: 'rgba(255,255,255,0.12)',
}

// NOTE: These fonts require loading via expo-font/useFonts before use.
// If the font packages (@expo-google-fonts/*) are not installed, these
// will fall back to the system default font.
export const fonts = {
  heading: 'PlayfairDisplay_700Bold',
  body: 'DMSans_400Regular',
  bodyMedium: 'DMSans_500Medium',
  bodySemiBold: 'DMSans_600SemiBold',
  bodyBold: 'DMSans_700Bold',
  mono: 'JetBrainsMono_400Regular',
}

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  full: 999,
}

export const categoryColor = (cat: string) => {
  switch (cat) {
    case 'math': return colors.mathPurple
    case 'reading': return colors.readingGreen
    case 'writing': return colors.writingYellow
    default: return colors.gold
  }
}
