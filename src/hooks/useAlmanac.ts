import { useState, useEffect } from 'react';

interface Almanac {
  solarLabel: string;
  lunarLabel: string;
  buddhistLabel?: string;
  taoistLabel?: string;
  jieqi?: string;
  yi: string;
  ji: string;
  dailyTip?: string;
}

export function useAlmanac() {
  const [almanac, setAlmanac] = useState<Almanac | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAlmanac();
  }, []);

  const fetchAlmanac = async () => {
    try {
      setLoading(true);
      // TODO: 调用 Supabase Edge Function
      // 暂时返回 mock 数据
      const mockData: Almanac = {
        solarLabel: formatDate(new Date()),
        lunarLabel: '农历二月初十',
        buddhistLabel: '2569年',
        taoistLabel: '4723年',
        jieqi: '惊蛰',
        yi: '祈福 出行 签约 学习',
        ji: '动土 安葬',
        dailyTip: '今日宜静心思考，适合做重要决定。',
      };
      setAlmanac(mockData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { almanac, loading, error, refetch: fetchAlmanac };
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekdays = ['日', '一', '二', '三', '四', '五', '六'];
  const weekday = weekdays[date.getDay()];
  return `${year}年${month}月${day}日 周${weekday}`;
}
