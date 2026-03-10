// 订阅与付费墙服务

export type SubscriptionTier = 'free' | 'premium';

export interface SubscriptionStatus {
  tier: SubscriptionTier;
  expiresAt?: Date;
  features: string[];
}

export interface PremiumFeature {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
}

// 功能列表
export const FEATURES: PremiumFeature[] = [
  {
    id: 'daily_almanac',
    name: '每日黄历',
    description: '查看每日黄历宜忌',
    isPremium: false,
  },
  {
    id: 'basic_draw',
    name: '基础抽签',
    description: '每日3次免费抽签',
    isPremium: false,
  },
  {
    id: 'ai_interpretation',
    name: 'AI 解读',
    description: 'AI 深度解读签文',
    isPremium: true,
  },
  {
    id: 'unlimited_draw',
    name: '无限抽签',
    description: '不限次数抽签',
    isPremium: true,
  },
  {
    id: 'history_export',
    name: '历史导出',
    description: '导出抽签历史记录',
    isPremium: true,
  },
  {
    id: 'remove_ads',
    name: '去除广告',
    description: '享受纯净无广告体验',
    isPremium: true,
  },
];

// 订阅价格（示例）
export const SUBSCRIPTION_PRICES = {
  monthly: {
    price: 12,
    currency: 'CNY',
    period: '月',
  },
  yearly: {
    price: 68,
    currency: 'CNY',
    period: '年',
    discount: '省 ¥76',
  },
  lifetime: {
    price: 128,
    currency: 'CNY',
    period: '终身',
  },
};

/**
 * 获取当前订阅状态
 */
export async function getSubscriptionStatus(): Promise<SubscriptionStatus> {
  // TODO: 从本地存储或服务器获取订阅状态
  // 目前返回免费用户
  return {
    tier: 'free',
    features: FEATURES.filter(f => !f.isPremium).map(f => f.id),
  };
}

/**
 * 检查是否有某功能的权限
 */
export async function hasFeatureAccess(featureId: string): Promise<boolean> {
  const status = await getSubscriptionStatus();
  const feature = FEATURES.find(f => f.id === featureId);
  
  if (!feature) return false;
  if (!feature.isPremium) return true;
  
  return status.tier === 'premium';
}

/**
 * 获取今日剩余抽签次数
 */
export async function getRemainingDrawsToday(): Promise<number> {
  const status = await getSubscriptionStatus();
  
  // 付费用户无限抽签
  if (status.tier === 'premium') {
    return 999;
  }
  
  // 免费用户每日3次
  // TODO: 从本地存储获取今日已抽签次数
  const today = new Date().toDateString();
  const storedDate = typeof localStorage !== 'undefined' 
    ? localStorage.getItem('draw_date') 
    : null;
  
  if (storedDate !== today) {
    // 新的一天，重置计数
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('draw_date', today);
      localStorage.setItem('draw_count', '0');
    }
    return 3;
  }
  
  const countStr = typeof localStorage !== 'undefined'
    ? localStorage.getItem('draw_count')
    : '0';
  const count = parseInt(countStr || '0', 10);
  
  return Math.max(0, 3 - count);
}

/**
 * 记录一次抽签
 */
export async function recordDraw(): Promise<void> {
  const status = await getSubscriptionStatus();
  
  // 付费用户无需记录
  if (status.tier === 'premium') return;
  
  const countStr = typeof localStorage !== 'undefined'
    ? localStorage.getItem('draw_count')
    : '0';
  const count = parseInt(countStr || '0', 10);
  
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('draw_count', String(count + 1));
  }
}

/**
 * 发起订阅购买
 */
export async function purchaseSubscription(
  plan: 'monthly' | 'yearly' | 'lifetime'
): Promise<{ success: boolean; error?: string }> {
  // TODO: 对接应用内购买 (IAP)
  // 目前返回模拟结果
  console.log(`Purchasing ${plan} subscription...`);
  
  return {
    success: false,
    error: '应用内购买功能即将上线',
  };
}

/**
 * 恢复购买
 */
export async function restorePurchases(): Promise<{ success: boolean }> {
  // TODO: 实现恢复购买逻辑
  console.log('Restoring purchases...');
  
  return {
    success: true,
  };
}
