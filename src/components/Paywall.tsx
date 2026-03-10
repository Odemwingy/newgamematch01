import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { SUBSCRIPTION_PRICES, purchaseSubscription } from '../services/subscriptionService';
import { theme } from '../theme';

interface PaywallProps {
  onClose: () => void;
  featureName?: string;
}

export function Paywall({ onClose, featureName }: PaywallProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('yearly');
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const result = await purchaseSubscription(selectedPlan);
      if (!result.success) {
        alert(result.error || '购买失败，请重试');
      }
    } finally {
      setLoading(false);
    }
  };

  const plans: Array<{
    id: 'monthly' | 'yearly' | 'lifetime';
    price: number;
    currency: string;
    period: string;
    discount?: string;
    recommended?: boolean;
  }> = [
    { id: 'monthly', ...SUBSCRIPTION_PRICES.monthly },
    { id: 'yearly', ...SUBSCRIPTION_PRICES.yearly, recommended: true },
    { id: 'lifetime', ...SUBSCRIPTION_PRICES.lifetime },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : '#fff' }]}>
      {/* 关闭按钮 */}
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* 标题 */}
      <Text style={[styles.title, { color: isDark ? '#fff' : theme.colors.text }]}>
        升级高级会员
      </Text>
      
      {featureName && (
        <Text style={[styles.subtitle, { color: isDark ? '#888' : theme.colors.textMuted }]}>
          解锁「{featureName}」功能
        </Text>
      )}

      {/* 特权列表 */}
      <View style={styles.featuresContainer}>
        {[
          { icon: '🤖', text: 'AI 深度解读签文' },
          { icon: '♾️', text: '无限次数抽签' },
          { icon: '📤', text: '导出历史记录' },
          { icon: '🚫', text: '去除广告打扰' },
        ].map((feature, index) => (
          <View key={index} style={styles.featureRow}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={[styles.featureText, { color: isDark ? '#ccc' : theme.colors.textSecondary }]}>
              {feature.text}
            </Text>
          </View>
        ))}
      </View>

      {/* 计划选择 */}
      <View style={styles.plansContainer}>
        {plans.map((plan) => (
          <TouchableOpacity
            key={plan.id}
            style={[
              styles.planCard,
              { backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' },
              selectedPlan === plan.id && styles.planCardSelected,
              plan.recommended && styles.planCardRecommended,
            ]}
            onPress={() => setSelectedPlan(plan.id)}
          >
            {plan.recommended && (
              <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedText}>推荐</Text>
              </View>
            )}
            <Text style={[styles.planPeriod, { color: isDark ? '#fff' : theme.colors.text }]}>
              {plan.period}
            </Text>
            <Text style={[styles.planPrice, { color: isDark ? '#fff' : theme.colors.text }]}>
              ¥{plan.price}
            </Text>
            {'discount' in plan && (
              <Text style={styles.planDiscount}>{plan.discount}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* 购买按钮 */}
      <TouchableOpacity
        style={[styles.purchaseButton, loading && styles.purchaseButtonDisabled]}
        onPress={handlePurchase}
        disabled={loading}
      >
        <Text style={styles.purchaseButtonText}>
          {loading ? '处理中...' : `订阅 ¥${SUBSCRIPTION_PRICES[selectedPlan].price}`}
        </Text>
      </TouchableOpacity>

      {/* 说明 */}
      <Text style={[styles.disclaimer, { color: isDark ? '#666' : '#999' }]}>
        订阅将通过应用内购买完成，支持随时取消
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  closeText: {
    fontSize: 18,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 28,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 16,
  },
  plansContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  planCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  planCardSelected: {
    borderColor: theme.colors.primary,
  },
  planCardRecommended: {
    position: 'relative',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  recommendedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  planPeriod: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: '800',
  },
  planDiscount: {
    fontSize: 11,
    color: theme.colors.success,
    marginTop: 2,
  },
  purchaseButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    opacity: 0.7,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
});
