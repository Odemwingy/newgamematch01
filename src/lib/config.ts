// 应用配置
// 从环境变量读取配置信息

import { AIConfig } from '../services/aiService';

export const config = {
  // Supabase
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
  },
  
  // LLM 配置
  llm: {
    apiKey: process.env.LLM_API_KEY,
    baseUrl: process.env.LLM_BASE_URL,
    provider: (process.env.LLM_PROVIDER || 'local') as AIConfig['provider'],
  },
  
  // 环境标识
  env: process.env.APP_ENV || 'dev',
};

// 获取 AI 配置
export function getAIConfig(): AIConfig | undefined {
  const { llm } = config;
  
  if (!llm.apiKey) {
    return undefined;
  }
  
  return {
    provider: llm.provider,
    apiKey: llm.apiKey,
    baseUrl: llm.baseUrl,
  };
}
