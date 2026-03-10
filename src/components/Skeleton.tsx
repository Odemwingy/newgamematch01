import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 4, style }: SkeletonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          backgroundColor: isDark ? '#333' : '#e0e0e0',
        },
        style,
      ]}
    />
  );
}

export function AlmanacSkeleton() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={styles.container}>
      {/* 日期卡片骨架 */}
      <View style={[styles.dateCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <View style={styles.dateHeader}>
          <Skeleton width={80} height={24} />
          <Skeleton width={60} height={20} />
        </View>
        <View style={styles.dateBody}>
          <Skeleton width={120} height={36} />
          <Skeleton width={100} height={24} style={{ marginTop: 8 }} />
        </View>
      </View>
      
      {/* 宜忌卡片骨架 */}
      <View style={[styles.yiJiCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <View style={styles.yiJiSection}>
          <Skeleton width={40} height={28} />
          <View style={styles.yiJiItems}>
            <Skeleton width={80} height={20} style={{ marginRight: 8 }} />
            <Skeleton width={60} height={20} style={{ marginRight: 8 }} />
            <Skeleton width={70} height={20} />
          </View>
        </View>
        <View style={[styles.yiJiSection, { marginTop: 16 }]}>
          <Skeleton width={40} height={28} />
          <View style={styles.yiJiItems}>
            <Skeleton width={60} height={20} style={{ marginRight: 8 }} />
            <Skeleton width={80} height={20} />
          </View>
        </View>
      </View>
      
      {/* 其他信息骨架 */}
      <View style={[styles.infoCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <Skeleton width={80} height={20} />
        <View style={styles.infoRow}>
          <Skeleton width={100} height={16} />
          <Skeleton width={120} height={16} />
        </View>
        <View style={styles.infoRow}>
          <Skeleton width={80} height={16} />
          <Skeleton width={140} height={16} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    opacity: 0.7,
  },
  container: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  dateCard: {
    borderRadius: 16,
    padding: 20,
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
  dateBody: {
    alignItems: 'center',
    marginTop: 16,
  },
  yiJiCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  yiJiSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  yiJiItems: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 12,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
});
