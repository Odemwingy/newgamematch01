import { useState, useEffect, useCallback } from 'react';
import { getDailyAlmanac, DailyAlmanac } from '../services/almanacService';

export function useAlmanac(date: Date = new Date()) {
  const [almanac, setAlmanac] = useState<DailyAlmanac | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAlmanac = useCallback(() => {
    try {
      setLoading(true);
      setError(null);
      
      // 使用本地黄历服务
      const data = getDailyAlmanac(date);
      setAlmanac(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchAlmanac();
  }, [fetchAlmanac]);

  return { almanac, loading, error, refetch: fetchAlmanac };
}
