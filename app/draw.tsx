import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';

export default function DrawScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <Text style={[styles.title, { color: isDark ? '#fff' : theme.colors.text }]}>
          🔮 签筒
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#888' : theme.colors.textMuted }]}>
          诚心祈愿，求得签文指引
        </Text>
        
        <TouchableOpacity
          style={[styles.drawButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => {
            // TODO: 实现抽签逻辑
            alert('抽签功能开发中...');
          }}
        >
          <Text style={styles.drawButtonText}>摇签</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={[styles.backText, { color: isDark ? '#888' : theme.colors.textMuted }]}>
          返回首页
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  drawButton: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  drawButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  backText: {
    marginTop: 24,
    fontSize: 16,
  },
});
