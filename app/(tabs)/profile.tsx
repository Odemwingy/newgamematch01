import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, useColorScheme, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { getDrawHistory, clearDrawHistory } from '../../src/services/drawService';
import { theme } from '../../src/theme';

type MenuItemType = 'switch' | 'danger' | 'default';

interface MenuItem {
  icon: string;
  label: string;
  value?: string | boolean;
  type?: MenuItemType;
  onPress?: () => void;
  onValueChange?: (value: boolean) => void;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [notifications, setNotifications] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  const handleClearAllData = async () => {
    Alert.alert(
      '清空数据',
      '确定要清空所有抽签记录吗？此操作不可恢复。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: async () => {
            await clearDrawHistory();
            Alert.alert('成功', '数据已清空');
          },
        },
      ]
    );
  };

  const menuItems: MenuSection[] = [
    {
      title: '数据统计',
      items: [
        {
          icon: '📊',
          label: '抽签统计',
          value: '查看详情',
          onPress: async () => {
            const history = await getDrawHistory();
            Alert.alert(
              '抽签统计',
              `总抽签次数：${history.length} 次\n上签：${history.filter(h => h.sign.type === '上签').length} 次\n中签：${history.filter(h => h.sign.type === '中签').length} 次\n下签：${history.filter(h => h.sign.type === '下签').length} 次`
            );
          },
        },
      ],
    },
    {
      title: '偏好设置',
      items: [
        {
          icon: '🔔',
          label: '通知提醒',
          type: 'switch',
          value: notifications,
          onValueChange: setNotifications,
        },
        {
          icon: '📳',
          label: '触觉反馈',
          type: 'switch',
          value: hapticFeedback,
          onValueChange: setHapticFeedback,
        },
      ],
    },
    {
      title: '数据管理',
      items: [
        {
          icon: '🗑️',
          label: '清空所有数据',
          type: 'danger',
          onPress: handleClearAllData,
        },
      ],
    },
    {
      title: '关于',
      items: [
        {
          icon: 'ℹ️',
          label: '版本',
          value: '1.0.0',
        },
        {
          icon: '📱',
          label: '关于签历',
          onPress: () => {
            Alert.alert(
              '关于签历',
              '签历是一款传统黄历与抽签应用，融合现代科技与传统智慧。\n\n愿您每日好运常伴。',
              [{ text: '确定' }]
            );
          },
        },
        {
          icon: '⭐',
          label: '给个好评',
          onPress: () => {
            Alert.alert('感谢支持', '应用商店评分功能即将上线');
          },
        },
      ],
    },
  ];

  const renderItem = (item: MenuItem, index: number, totalItems: number) => {
    const isSwitch = item.type === 'switch';
    const isDanger = item.type === 'danger';
    const hasValue = item.value !== undefined;
    
    return (
      <TouchableOpacity
        key={index}
        style={[styles.menuItem, index < totalItems - 1 && styles.menuItemBorder]}
        onPress={item.onPress}
        disabled={!item.onPress && !isSwitch}
      >
        <Text style={styles.menuIcon}>{item.icon}</Text>
        <Text style={[
          styles.menuLabel,
          isDanger && styles.dangerLabel,
          { color: isDark ? (isDanger ? '#e57373' : '#fff') : theme.colors.text }
        ]}>
          {item.label}
        </Text>
        
        {isSwitch && typeof item.value === 'boolean' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#ccc', true: theme.colors.primary + '80' }}
            thumbColor={item.value ? theme.colors.primary : '#f4f3f4'}
          />
        ) : hasValue && typeof item.value === 'string' ? (
          <Text style={[styles.menuValue, { color: isDark ? '#888' : theme.colors.textMuted }]}>
            {item.value}
          </Text>
        ) : !isDanger ? (
          <Text style={styles.menuArrow}>›</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
      {/* 用户信息卡片 */}
      <View style={[styles.userCard, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>🙏</Text>
        </View>
        <Text style={[styles.userName, { color: isDark ? '#fff' : theme.colors.text }]}>
          用户
        </Text>
        <Text style={[styles.userSubtitle, { color: isDark ? '#888' : theme.colors.textMuted }]}>
          每日签到，好运常伴
        </Text>
      </View>

      {/* 菜单项 */}
      {menuItems.map((section, sIndex) => (
        <View key={sIndex} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#888' : theme.colors.textMuted }]}>
            {section.title}
          </Text>
          <View style={[styles.sectionContent, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}>
            {section.items.map((item, iIndex) => renderItem(item, iIndex, section.items.length))}
          </View>
        </View>
      ))}

      {/* 底部信息 */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: isDark ? '#444' : '#ccc' }]}>
          签历 v1.0.0
        </Text>
        <Text style={[styles.footerText, { color: isDark ? '#333' : '#ddd' }]}>
          © 2026 Qianli App
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userCard: {
    margin: 16,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
  },
  dangerLabel: {
    color: '#c62828',
  },
  menuValue: {
    fontSize: 15,
  },
  menuArrow: {
    fontSize: 20,
    color: '#ccc',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 4,
  },
  footerText: {
    fontSize: 12,
  },
});
