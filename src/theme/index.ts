export const theme = {
  colors: {
    // Background
    background: '#F5F0E8',
    card: '#FFFFFF',
    
    // Text
    text: '#1A1A1A',
    textSecondary: '#666666',
    textMuted: '#999999',
    
    // Primary
    primary: '#8B4513',
    primaryLight: '#FFF5E6',
    
    // Status
    success: '#2E7D32',
    warning: '#D84315',
    error: '#C62828',
    
    // UI
    border: '#E0E0E0',
    divider: '#EEEEEE',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 28,
      fontWeight: '700' as const,
    },
    h2: {
      fontSize: 22,
      fontWeight: '600' as const,
    },
    h3: {
      fontSize: 18,
      fontWeight: '600' as const,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    caption: {
      fontSize: 14,
      fontWeight: '400' as const,
    },
  },
};
