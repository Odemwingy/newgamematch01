import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, useColorScheme } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SignCard } from '../src/data/signs';
import { getAIInterpretation, AIInterpretation } from '../src/services/aiService';
import { getAIConfig } from '../src/lib/config';
import { theme } from '../src/theme';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ sign: string; question?: string }>();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [aiLoading, setAiLoading] = useState(false);
  const [aiInterpretation, setAiInterpretation] = useState<AIInterpretation | null>(null);

  let sign: SignCard | null = null;
  try {
    sign = params.sign ? JSON.parse(params.sign) : null;
  } catch (e) {
    // ignore
  }

  useEffect(() => {
    if (sign) {
      loadAIInterpretation();
    }
  }, [sign]);

  const loadAIInterpretation = async () => {
    if (!sign) return;
    
    setAiLoading(true);
    try {
      const result = await getAIInterpretation(
        {
          signNumber: sign.number,
          signTitle: sign.title,
          signType: sign.type,
          poem: sign.poem,
          interpretation: sign.interpretation,
          question: params.question,
        },
        getAIConfig() // 使用环境变量配置
      );
      setAiInterpretation(result);
    } catch (error) {
      console.error('Failed to load AI interpretation:', error);
    } finally {
      setAiLoading(false);
    }
  };

  if (!sign) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
        <Text style={styles.errorText}>签文加载失败</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>返回</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const getTypeColor = () => {
    switch (sign!.type) {
      case '上签': return isDark ? '#81c784' : '#2e7d32';
      case '中签': return isDark ? '#ffb74d' : '#f57c00';
      case '下签': return isDark ? '#e57373' : '#c62828';
    }
  };

  const getTypeEmoji = () => {
    switch (sign!.type) {
      case '上签': return '🌟';
      case '中签': return '🌙';
      case '下签': return '🌑';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
      {/* 签号和类型 */}
      <View style={[styles.headerCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <View style={[styles.typeBadge, { backgroundColor: getTypeColor() + '20' }]}>
          <Text style={[styles.typeText, { color: getTypeColor() }]}>
            {getTypeEmoji()} {sign.type}
          </Text>
        </View>
        <Text style={[styles.signNumber, { color: isDark ? '#fff' : theme.colors.text }]}>
          第 {sign.number} 签
        </Text>
        <Text style={[styles.signTitle, { color: isDark ? '#ccc' : theme.colors.textSecondary }]}>
          {sign.title}
        </Text>
      </View>

      {/* 签诗 */}
      <View style={[styles.poemCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : theme.colors.text }]}>
          📜 签诗
        </Text>
        <Text style={[styles.poemText, { color: isDark ? '#ddd' : theme.colors.text }]}>
          {sign.poem}
        </Text>
      </View>

      {/* 传统解签 */}
      <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : theme.colors.text }]}>
          💡 传统解签
        </Text>
        <Text style={[styles.interpretationText, { color: isDark ? '#ccc' : theme.colors.textSecondary }]}>
          {sign.interpretation}
        </Text>
      </View>

      {/* AI 深度解读 */}
      <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : theme.colors.text }]}>
          🤖 AI 深度解读
        </Text>
        
        {aiLoading ? (
          <View style={styles.aiLoading}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <Text style={[styles.aiLoadingText, { color: isDark ? '#888' : theme.colors.textMuted }]}>
              正在为您解读...
            </Text>
          </View>
        ) : aiInterpretation ? (
          <View>
            <Text style={[styles.aiSummary, { color: isDark ? '#ddd' : theme.colors.text }]}>
              {aiInterpretation.summary}
            </Text>
            
            <View style={styles.aiSection}>
              <Text style={[styles.aiLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>
                人生指引
              </Text>
              <Text style={[styles.aiContent, { color: isDark ? '#ccc' : theme.colors.textSecondary }]}>
                {aiInterpretation.guidance}
              </Text>
            </View>
            
            <View style={styles.aiSection}>
              <Text style={[styles.aiLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>
                建议行动
              </Text>
              <Text style={[styles.aiContent, { color: isDark ? '#ccc' : theme.colors.textSecondary }]}>
                {aiInterpretation.advice}
              </Text>
            </View>
            
            {/* 吉利信息 */}
            <View style={styles.luckyInfo}>
              {aiInterpretation.luckyDirection && (
                <View style={[styles.luckyBadge, { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }]}>
                  <Text style={styles.luckyEmoji}>🧭</Text>
                  <Text style={[styles.luckyText, { color: isDark ? '#aaa' : '#666' }]}>
                    {aiInterpretation.luckyDirection}
                  </Text>
                </View>
              )}
              {aiInterpretation.luckyColor && (
                <View style={[styles.luckyBadge, { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }]}>
                  <Text style={styles.luckyEmoji}>🎨</Text>
                  <Text style={[styles.luckyText, { color: isDark ? '#aaa' : '#666' }]}>
                    {aiInterpretation.luckyColor}
                  </Text>
                </View>
              )}
              {aiInterpretation.luckyNumber && (
                <View style={[styles.luckyBadge, { backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5' }]}>
                  <Text style={styles.luckyEmoji}>🔢</Text>
                  <Text style={[styles.luckyText, { color: isDark ? '#aaa' : '#666' }]}>
                    {aiInterpretation.luckyNumber}
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <TouchableOpacity onPress={loadAIInterpretation}>
            <Text style={[styles.aiRetryText, { color: theme.colors.primary }]}>
              点击重新获取解读
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 详细解读 */}
      <View style={[styles.card, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#fff' : theme.colors.text }]}>
          🔮 传统详解
        </Text>
        
        {sign.career && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>
              事业
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#ccc' : theme.colors.text }]}>
              {sign.career}
            </Text>
          </View>
        )}
        
        {sign.love && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>
              爱情
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#ccc' : theme.colors.text }]}>
              {sign.love}
            </Text>
          </View>
        )}
        
        {sign.health && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>
              健康
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#ccc' : theme.colors.text }]}>
              {sign.health}
            </Text>
          </View>
        )}
        
        {sign.wealth && (
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>
              财运
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#ccc' : theme.colors.text }]}>
              {sign.wealth}
            </Text>
          </View>
        )}
      </View>

      {/* 操作按钮 */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => router.push('/draw' as any)}
        >
          <Text style={styles.actionButtonText}>再抽一签</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.secondaryButton, { borderColor: theme.colors.primary }]}
          onPress={() => router.push('/' as any)}
        >
          <Text style={[styles.actionButtonText, { color: theme.colors.primary }]}>返回首页</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  typeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  typeText: {
    fontSize: 18,
    fontWeight: '700',
  },
  signNumber: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 8,
  },
  signTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  poemCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  poemText: {
    fontSize: 18,
    lineHeight: 32,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  interpretationText: {
    fontSize: 16,
    lineHeight: 28,
  },
  aiLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  aiLoadingText: {
    marginLeft: 12,
    fontSize: 15,
  },
  aiSummary: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 12,
  },
  aiSection: {
    marginBottom: 12,
  },
  aiLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  aiContent: {
    fontSize: 15,
    lineHeight: 24,
  },
  luckyInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  luckyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  luckyEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  luckyText: {
    fontSize: 13,
    fontWeight: '500',
  },
  aiRetryText: {
    fontSize: 15,
    textAlign: 'center',
    paddingVertical: 8,
  },
  detailRow: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    lineHeight: 24,
  },
  actions: {
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  bottomSpace: {
    height: 32,
  },
  errorText: {
    fontSize: 18,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: theme.colors.primary,
    textAlign: 'center',
  },
});
