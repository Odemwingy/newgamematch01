import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { useAlmanac } from '../../src/hooks/useAlmanac';
import { AlmanacSkeleton } from '../../src/components/Skeleton';
import { theme } from '../../src/theme';

export default function HomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { almanac, loading, error } = useAlmanac();

  if (loading) {
    return (
      <ScrollView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
        <AlmanacSkeleton />
      </ScrollView>
    );
  }

  if (error || !almanac) {
    return (
      <View style={[styles.centerContainer, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
        <Text style={styles.errorText}>加载失败，请下拉重试</Text>
      </View>
    );
  }

  const formatSolarDate = () => {
    return `${almanac.solarYear}年${almanac.solarMonth}月${almanac.solarDay}日 ${almanac.weekDay}`;
  };

  const formatLunarDate = () => {
    return `农历${almanac.lunarMonthName}${almanac.lunarDayName}`;
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
      {/* 日期卡片区 */}
      <View style={[styles.dateCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <View style={styles.dateHeader}>
          <Text style={[styles.solarDate, { color: isDark ? '#fff' : theme.colors.text }]}>
            {formatSolarDate()}
          </Text>
          <View style={[styles.zodiacBadge, { backgroundColor: isDark ? '#2a2a2a' : theme.colors.primaryLight }]}>
            <Text style={styles.zodiacText}>🐲 {almanac.zodiac}</Text>
          </View>
        </View>
        
        <View style={styles.lunarSection}>
          <Text style={[styles.lunarDate, { color: isDark ? '#aaa' : theme.colors.textSecondary }]}>
            {formatLunarDate()}
          </Text>
          <Text style={[styles.ganZhiDate, { color: isDark ? '#888' : theme.colors.textMuted }]}>
            {almanac.yearGanZhi} {almanac.monthGanZhi} {almanac.dayGanZhi}
          </Text>
        </View>
        
        <View style={styles.extraInfo}>
          <Text style={[styles.infoTag, { backgroundColor: isDark ? '#333' : '#f0f0f0' }]}>
            {almanac.constellation}
          </Text>
          {almanac.festival ? (
            <Text style={[styles.infoTag, { backgroundColor: isDark ? '#3a2a1a' : '#fff3e0' }]}>
              🎉 {almanac.festival}
            </Text>
          ) : null}
        </View>
      </View>

      {/* 宜忌卡片区 */}
      <View style={[styles.yiJiCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <View style={styles.yiSection}>
          <View style={styles.yiHeader}>
            <Text style={styles.yiTitle}>宜</Text>
          </View>
          <View style={styles.yiJiList}>
            {almanac.yi.length > 0 ? (
              almanac.yi.map((item, index) => (
                <View key={index} style={[styles.yiTag, { backgroundColor: isDark ? '#1a3a1a' : '#e8f5e9' }]}>
                  <Text style={[styles.yiTagText, { color: isDark ? '#81c784' : '#2e7d32' }]}>{item}</Text>
                </View>
              ))
            ) : (
              <Text style={[styles.emptyText, { color: isDark ? '#666' : '#999' }]}>诸事皆宜</Text>
            )}
          </View>
        </View>
        
        <View style={[styles.divider, { backgroundColor: isDark ? '#333' : theme.colors.border }]} />
        
        <View style={styles.jiSection}>
          <View style={styles.jiHeader}>
            <Text style={styles.jiTitle}>忌</Text>
          </View>
          <View style={styles.yiJiList}>
            {almanac.ji.length > 0 ? (
              almanac.ji.map((item, index) => (
                <View key={index} style={[styles.jiTag, { backgroundColor: isDark ? '#3a1a1a' : '#ffebee' }]}>
                  <Text style={[styles.jiTagText, { color: isDark ? '#e57373' : '#c62828' }]}>{item}</Text>
                </View>
              ))
            ) : (
              <Text style={[styles.emptyText, { color: isDark ? '#666' : '#999' }]}>诸事皆宜</Text>
            )}
          </View>
        </View>
      </View>

      {/* 其他信息卡片区 */}
      <View style={[styles.infoCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <Text style={[styles.infoCardTitle, { color: isDark ? '#fff' : theme.colors.text }]}>
          今日详情
        </Text>
        
        {almanac.chongSha ? (
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>冲煞</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#ccc' : theme.colors.text }]}>{almanac.chongSha}</Text>
          </View>
        ) : null}
        
        {almanac.pengZu ? (
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>彭祖百忌</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#ccc' : theme.colors.text }]}>{almanac.pengZu}</Text>
          </View>
        ) : null}
        
        {almanac.taiShen ? (
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>胎神</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#ccc' : theme.colors.text }]}>{almanac.taiShen}</Text>
          </View>
        ) : null}
        
        {almanac.wuXing ? (
          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: isDark ? '#888' : theme.colors.textMuted }]}>五行</Text>
            <Text style={[styles.infoValue, { color: isDark ? '#ccc' : theme.colors.text }]}>{almanac.wuXing}</Text>
          </View>
        ) : null}
      </View>

      {/* 去抽签按钮 */}
      <TouchableOpacity
        style={[styles.drawButton, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('/draw' as any)}
      >
        <Text style={styles.drawButtonText}>🔮 去抽签</Text>
      </TouchableOpacity>
      
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  
  // 日期卡片
  dateCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  solarDate: {
    fontSize: 22,
    fontWeight: '700',
  },
  zodiacBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  zodiacText: {
    fontSize: 14,
    color: '#666',
  },
  lunarSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  lunarDate: {
    fontSize: 18,
    fontWeight: '500',
  },
  ganZhiDate: {
    fontSize: 14,
    marginTop: 4,
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    gap: 8,
  },
  infoTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 14,
  },
  
  // 宜忌卡片
  yiJiCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  yiSection: {
    marginBottom: 16,
  },
  jiSection: {},
  yiHeader: {
    marginBottom: 8,
  },
  jiHeader: {
    marginBottom: 8,
  },
  yiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32',
  },
  jiTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#c62828',
  },
  yiJiList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  yiTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  yiTagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  jiTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  jiTagText: {
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  
  // 信息卡片
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  // 抽签按钮
  drawButton: {
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  drawButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  
  bottomSpace: {
    height: 32,
  },
  
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
  },
});
