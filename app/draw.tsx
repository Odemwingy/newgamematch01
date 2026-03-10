import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, useColorScheme, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { drawSign, saveDrawResult } from '../src/services/drawService';
import { getRemainingDrawsToday, recordDraw, hasFeatureAccess } from '../src/services/subscriptionService';
import { theme } from '../src/theme';

export default function DrawScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [remainingDraws, setRemainingDraws] = useState<number>(3);
  const [rotation] = useState(new Animated.Value(0));

  useEffect(() => {
    loadRemainingDraws();
  }, []);

  const loadRemainingDraws = async () => {
    const remaining = await getRemainingDrawsToday();
    setRemainingDraws(remaining);
  };

  const handleDraw = async () => {
    if (isDrawing) return;
    
    // 检查抽签次数
    if (remainingDraws <= 0) {
      const hasPremium = await hasFeatureAccess('unlimited_draw');
      if (!hasPremium) {
        Alert.alert(
          '今日抽签次数已用完',
          '升级高级会员可无限抽签',
          [
            { text: '取消', style: 'cancel' },
            { 
              text: '了解会员', 
              onPress: () => {
                // TODO: 打开付费墙
                Alert.alert('会员功能即将上线');
              }
            },
          ]
        );
        return;
      }
    }
    
    setIsDrawing(true);
    
    // 记录抽签
    await recordDraw();
    
    // 摇签动画
    Animated.sequence([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // 延迟后跳转到结果页
    setTimeout(async () => {
      const result = drawSign();
      await saveDrawResult(result);
      
      router.push({
        pathname: '/result' as any,
        params: { sign: JSON.stringify(result.sign) },
      });
      
      setIsDrawing(false);
      setRemainingDraws(prev => Math.max(0, prev - 1));
    }, 1500);
  };

  const spin = rotation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-15deg', '15deg'],
  });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
      <View style={styles.content}>
        <Animated.View style={[styles.signContainer, { transform: [{ rotate: spin }] }]}>
          <View style={[styles.signBox, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            <Text style={styles.signEmoji}>🎋</Text>
            <Text style={[styles.signLabel, { color: isDark ? '#fff' : theme.colors.text }]}>
              签筒
            </Text>
          </View>
        </Animated.View>

        <Text style={[styles.hint, { color: isDark ? '#888' : theme.colors.textMuted }]}>
          {isDrawing ? '正在摇签...' : '诚心祈愿，摇动签筒'}
        </Text>
        
        {/* 显示剩余次数 */}
        {!isDrawing && (
          <Text style={[styles.remainingText, { color: isDark ? '#666' : '#999' }]}>
            今日剩余 {remainingDraws} 次
          </Text>
        )}

        <TouchableOpacity
          style={[
            styles.drawButton,
            { backgroundColor: theme.colors.primary },
            isDrawing && styles.drawButtonDisabled,
          ]}
          onPress={handleDraw}
          disabled={isDrawing}
        >
          <Text style={styles.drawButtonText}>
            {isDrawing ? '摇签中...' : '摇签'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.historyButton}
          onPress={() => router.push('/(tabs)/history' as any)}
        >
          <Text style={[styles.historyText, { color: isDark ? '#888' : theme.colors.textMuted }]}>
            查看历史记录
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  signContainer: {
    marginBottom: 40,
  },
  signBox: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  signEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  signLabel: {
    fontSize: 24,
    fontWeight: '700',
  },
  hint: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  remainingText: {
    fontSize: 14,
    marginBottom: 24,
  },
  drawButton: {
    width: '80%',
    maxWidth: 300,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  drawButtonDisabled: {
    opacity: 0.7,
  },
  drawButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  historyButton: {
    marginTop: 24,
  },
  historyText: {
    fontSize: 16,
  },
});
