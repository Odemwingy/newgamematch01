import { Solar, Lunar } from 'lunar-typescript';

export interface DailyAlmanac {
  // 公历
  solarDate: string;           // 2026-03-10
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  weekDay: string;             // 星期一
  
  // 农历
  lunarDate: string;           // 正月廿一
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  lunarMonthName: string;      // 正月
  lunarDayName: string;        // 廿一
  yearGanZhi: string;          // 丙午年
  monthGanZhi: string;         // 辛卯月
  dayGanZhi: string;           // 甲寅日
  
  // 黄历信息
  ganZhiYear: string;          // 丙午
  ganZhiMonth: string;         // 辛卯
  ganZhiDay: string;           // 甲寅
  zodiac: string;              // 马
  constellation: string;       // 双鱼座
  festival: string;            // 节日（如果有）
  
  // 宜忌
  yi: string[];                // 宜
  ji: string[];                // 忌
  
  // 其他
  pengZu: string;              // 彭祖百忌
  chongSha: string;            // 冲煞
  taiShen: string;             // 胎神
  wuXing: string;              // 五行（纳音）
}

/**
 * 获取指定日期的黄历信息
 */
export function getDailyAlmanac(date: Date = new Date()): DailyAlmanac {
  const solar = Solar.fromDate(date);
  const lunar = solar.getLunar();
  
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  
  // 获取宜忌（使用 getDayYi 和 getDayJi）
  const yiList: string[] = [];
  const jiList: string[] = [];
  
  try {
    const yi = lunar.getDayYi();
    const ji = lunar.getDayJi();
    
    if (yi && yi.length > 0) {
      yi.forEach((item: string) => yiList.push(item));
    }
    if (ji && ji.length > 0) {
      ji.forEach((item: string) => jiList.push(item));
    }
  } catch (e) {
    // 某些日期可能无法获取宜忌，忽略错误
  }
  
  // 获取节日
  let festival = '';
  try {
    const festivals = lunar.getFestivals();
    if (festivals && festivals.length > 0) {
      festival = festivals.join(' ');
    }
    const solarFestivals = solar.getFestivals();
    if (solarFestivals && solarFestivals.length > 0) {
      festival = festival ? `${festival} ${solarFestivals.join(' ')}` : solarFestivals.join(' ');
    }
  } catch (e) {
    // 忽略错误
  }
  
  // 获取彭祖百忌、冲煞等
  let pengZu = '';
  let chongSha = '';
  let taiShen = '';
  let wuXing = '';
  
  try {
    // 冲煞
    const chong = lunar.getChong();
    const sha = lunar.getSha();
    if (chong || sha) {
      chongSha = `冲${chong || ''} ${sha || ''}`.trim();
    }
    
    // 彭祖百忌
    pengZu = lunar.getPengZuGan() || '';
    const pengZuZhi = lunar.getPengZuZhi();
    if (pengZuZhi) {
      pengZu = pengZu ? `${pengZu} ${pengZuZhi}` : pengZuZhi;
    }
    
    // 胎神
    taiShen = lunar.getDayPositionTai() || '';
    
    // 五行（纳音）
    wuXing = lunar.getDayNaYin() || '';
  } catch (e) {
    // 忽略错误
  }
  
  return {
    // 公历
    solarDate: `${solar.getYear()}-${String(solar.getMonth()).padStart(2, '0')}-${String(solar.getDay()).padStart(2, '0')}`,
    solarYear: solar.getYear(),
    solarMonth: solar.getMonth(),
    solarDay: solar.getDay(),
    weekDay: weekDays[date.getDay()],
    
    // 农历
    lunarDate: lunar.toString(),
    lunarYear: lunar.getYear(),
    lunarMonth: lunar.getMonth(),
    lunarDay: lunar.getDay(),
    lunarMonthName: lunar.getMonthInChinese(),
    lunarDayName: lunar.getDayInChinese(),
    yearGanZhi: lunar.getYearInGanZhi() + '年',
    monthGanZhi: lunar.getMonthInGanZhi() + '月',
    dayGanZhi: lunar.getDayInGanZhi() + '日',
    
    // 黄历信息
    ganZhiYear: lunar.getYearInGanZhi(),
    ganZhiMonth: lunar.getMonthInGanZhi(),
    ganZhiDay: lunar.getDayInGanZhi(),
    zodiac: lunar.getYearShengXiao(),
    constellation: solar.getXingZuo(),
    festival,
    
    // 宜忌
    yi: yiList,
    ji: jiList,
    
    // 其他
    pengZu,
    chongSha,
    taiShen,
    wuXing,
  };
}

/**
 * 获取今天的黄历信息
 */
export function getTodayAlmanac(): DailyAlmanac {
  return getDailyAlmanac(new Date());
}
