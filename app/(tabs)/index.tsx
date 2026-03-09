import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAlmanac } from '../../src/hooks/useAlmanac';
import { theme } from '../../src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { almanac, loading, error } = useAlmanac();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>加载失败，请重试</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* 日期区 */}
      <View style={styles.dateSection}>
        <Text style={styles.solarDate}>{almanac?.solarLabel || '2026年3月9日'}</Text>
        <Text style={styles.lunarDate}>{almanac?.lunarLabel || '农历二月初十'}</Text>
        {almanac?.buddhistLabel && (
          <Text style={styles.extraDate}>佛历 {almanac.buddhistLabel}</Text>
        )}
        {almanac?.taoistLabel && (
          <Text style={styles.extraDate}>道历 {almanac.taoistLabel}</Text>
        )}
      </View>

      {/* 今日卡片区 */}
      <View style={styles.card}>
        {almanac?.jieqi && (
          <View style={styles.tagRow}>
            <Text style={styles.tag}>{almanac.jieqi}</Text>
          </View>
        )}
        
        <View style={styles.yiJiSection}>
          <View style={styles.yiColumn}>
            <Text style={styles.yiTitle}>宜</Text>
            <Text style={styles.yiText}>{almanac?.yi || '祈福 出行 签约'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.jiColumn}>
            <Text style={styles.jiTitle}>忌</Text>
            <Text style={styles.jiText}>{almanac?.ji || '动土 安葬'}</Text>
          </View>
        </View>

        <Text style={styles.dailyTip}>
          {almanac?.dailyTip || '今日宜静心思考，适合做重要决定。'}
        </Text>
      </View>

      {/* 去抽签按钮 */}
      <TouchableOpacity
        style={styles.drawButton}
        onPress={() => router.push('/draw')}
      >
        <Text style={styles.drawButtonText}>去抽签</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  },
  dateSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.lg,
  },
  solarDate: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text,
  },
  lunarDate: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  extraDate: {
    fontSize: 14,
    color: theme.colors.textMuted,
    marginTop: theme.spacing.xs,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  tagRow: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  tag: {
    backgroundColor: theme.colors.primaryLight,
    color: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.radius.sm,
    fontSize: 14,
  },
  yiJiSection: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  yiColumn: {
    flex: 1,
  },
  jiColumn: {
    flex: 1,
  },
  divider: {
    width: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.md,
  },
  yiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.success,
    marginBottom: theme.spacing.xs,
  },
  yiText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  jiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.warning,
    marginBottom: theme.spacing.xs,
  },
  jiText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  dailyTip: {
    fontSize: 15,
    color: theme.colors.text,
    lineHeight: 24,
    textAlign: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  drawButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  drawButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
  },
});
