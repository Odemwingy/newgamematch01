import { getRandomSign, SignCard } from '../data/signs';

export interface DrawResult {
  sign: SignCard;
  drawnAt: Date;
  question?: string;
}

/**
 * 执行抽签
 */
export function drawSign(question?: string): DrawResult {
  const sign = getRandomSign();
  return {
    sign,
    drawnAt: new Date(),
    question,
  };
}

/**
 * 保存抽签记录到本地
 */
export async function saveDrawResult(result: DrawResult): Promise<void> {
  try {
    const history = await getDrawHistory();
    history.unshift({
      ...result,
      drawnAt: result.drawnAt.toISOString(),
    });
    
    // 只保留最近50条记录
    const trimmed = history.slice(0, 50);
    
    // 使用 localStorage (Web) 或 AsyncStorage (Native)
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('draw_history', JSON.stringify(trimmed));
    }
  } catch (error) {
    console.error('Failed to save draw result:', error);
  }
}

/**
 * 获取抽签历史
 */
export async function getDrawHistory(): Promise<any[]> {
  try {
    if (typeof localStorage !== 'undefined') {
      const data = localStorage.getItem('draw_history');
      return data ? JSON.parse(data) : [];
    }
    return [];
  } catch (error) {
    console.error('Failed to get draw history:', error);
    return [];
  }
}

/**
 * 清除抽签历史
 */
export async function clearDrawHistory(): Promise<void> {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('draw_history');
    }
  } catch (error) {
    console.error('Failed to clear draw history:', error);
  }
}
