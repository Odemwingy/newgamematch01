import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { getDrawHistory, clearDrawHistory } from '../../src/services/drawService';
import { SignCard } from '../../src/data/signs';
import { theme } from '../../src/theme';

interface HistoryItem {
  sign: SignCard;
  drawnAt: string;
  question?: string;
}

export default function HistoryScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadHistory = useCallback(async () => {
    try {
      const data = await getDrawHistory();
      setHistory(data);
    } catch (error) {
      console.error('Failed to load history:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadHistory();
  }, [loadHistory]);

  const handleClearHistory = async () => {
    await clearDrawHistory();
    setHistory([]);
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      return `${month}月${day}日 ${hour}:${String(minute).padStart(2, '0')}`;
    } catch {
      return dateStr;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '上签': return '#2e7d32';
      case '中签': return '#f57c00';
      case '下签': return '#c62828';
      default: return '#666';
    }
  };

  const handleItemPress = (item: HistoryItem) => {
    router.push({
      pathname: '/result' as any,
      params: { sign: JSON.stringify(item.sign) },
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: isDark ? '#888' : theme.colors.textMuted }]}>
          加载中...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0a0a0a' : theme.colors.background }]}>
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>📜</Text>
          <Text style={[styles.emptyTitle, { color: isDark ? '#fff' : theme.colors.text }]}>
            暂无历史记录
          </Text>
          <Text style={[styles.emptySubtitle, { color: isDark ? '#888' : theme.colors.textMuted }]}>
            抽签记录将在这里显示
          </Text>
          <TouchableOpacity
            style={[styles.drawButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => router.push('/draw' as any)}
          >
            <Text style={styles.drawButtonText}>去抽签</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: isDark ? '#fff' : theme.colors.text }]}>
              历史记录
            </Text>
            <TouchableOpacity onPress={handleClearHistory}>
              <Text style={[styles.clearButton, { color: theme.colors.error }]}>
                清空
              </Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            style={styles.list}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {history.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.item, { backgroundColor: isDark ? '#1a1a1a' : '#fff' }]}
                onPress={() => handleItemPress(item)}
              >
                <View style={styles.itemHeader}>
                  <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.sign.type) + '20' }]}>
                    <Text style={[styles.typeText, { color: getTypeColor(item.sign.type) }]}>
                      {item.sign.type}
                    </Text>
                  </View>
                  <Text style={[styles.itemDate, { color: isDark ? '#888' : theme.colors.textMuted }]}>
                    {formatDate(item.drawnAt)}
                  </Text>
                </View>
                
                <View style={styles.itemBody}>
                  <Text style={[styles.itemNumber, { color: isDark ? '#fff' : theme.colors.text }]}>
                    第 {item.sign.number} 签
                  </Text>
                  <Text style={[styles.itemTitle, { color: isDark ? '#ccc' : theme.colors.textSecondary }]}>
                    {item.sign.title}
                  </Text>
                </View>
                
                {item.question && (
                  <Text style={[styles.itemQuestion, { color: isDark ? '#666' : '#999' }]} numberOfLines={1}>
                    问：{item.question}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
            
            <View style={styles.bottomSpace} />
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  drawButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  drawButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  clearButton: {
    fontSize: 14,
    fontWeight: '500',
  },
  list: {
    flex: 1,
    padding: 16,
  },
  item: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemDate: {
    fontSize: 13,
  },
  itemBody: {
    marginBottom: 4,
  },
  itemNumber: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 15,
  },
  itemQuestion: {
    fontSize: 13,
    marginTop: 8,
    fontStyle: 'italic',
  },
  bottomSpace: {
    height: 24,
  },
});
