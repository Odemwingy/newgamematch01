/**
 * AI 服务测试用例
 * 测试文件：src/services/aiService.ts
 */

import { getAIInterpretation, AIInterpretationRequest, AIConfig } from '../services/aiService';

// Mock fetch for API tests
const mockFetch = (response: any, ok = true, status = 200) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    json: async () => response,
  });
};

// 测试数据
const mockSignRequest: AIInterpretationRequest = {
  signNumber: 1,
  signTitle: '钟离成道',
  signType: '上签',
  poem: '开天辟地作良缘，吉日良时万物全',
  interpretation: '此签大吉，诸事顺遂',
};

const mockAIResponse = {
  summary: '此签大吉，天时地利俱备',
  guidance: '珍惜当下机遇，把握良机',
  advice: '近期可大胆行动',
  luckyDirection: '东南',
  luckyColor: '红色',
  luckyNumber: 8,
};

describe('AI Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ==========================================
  // 测试用例 1: 本地模式 - 无配置时使用本地解读
  // ==========================================
  describe('本地模式测试', () => {
    test('无配置时应返回本地解读', async () => {
      const result = await getAIInterpretation(mockSignRequest);
      
      expect(result).toBeDefined();
      expect(result.summary).toContain('钟离成道');
      expect(result.guidance).toBeDefined();
      expect(result.advice).toBeDefined();
    });

    test('provider 为 local 时应返回本地解读', async () => {
      const config: AIConfig = { provider: 'local' };
      const result = await getAIInterpretation(mockSignRequest, config);
      
      expect(result).toBeDefined();
      expect(result.summary).toContain('钟离成道');
    });

    test('无 apiKey 时应返回本地解读', async () => {
      const config: AIConfig = { provider: 'qianfan', apiKey: undefined };
      const result = await getAIInterpretation(mockSignRequest, config);
      
      expect(result).toBeDefined();
    });

    test('上签应返回吉利内容', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        signType: '上签',
      });
      
      expect(result.summary).toContain('大吉');
      expect(result.luckyNumber).toBe(8);
    });

    test('中签应返回平稳内容', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        signType: '中签',
      });
      
      expect(result.summary).toContain('平稳');
      expect(result.luckyNumber).toBe(6);
    });

    test('下签应返回警示内容', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        signType: '下签',
      });
      
      expect(result.summary).toContain('多阻');
      expect(result.luckyNumber).toBe(4);
    });

    test('未知签类型应默认中签', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        signType: '未知类型' as any,
      });
      
      expect(result).toBeDefined();
      expect(result.summary).toBeDefined();
    });
  });

  // ==========================================
  // 测试用例 2: 百度千帆 API 测试
  // ==========================================
  describe('百度千帆 API 测试', () => {
    const qianfanConfig: AIConfig = {
      provider: 'qianfan',
      apiKey: 'test-api-key',
      baseUrl: 'https://qianfan.baidubce.com/v2/coding',
    };

    test('成功调用千帆 API', async () => {
      mockFetch({
        choices: [{ message: { content: JSON.stringify(mockAIResponse) } }],
      });

      const result = await getAIInterpretation(mockSignRequest, qianfanConfig);
      
      expect(result.summary).toBe(mockAIResponse.summary);
      expect(result.guidance).toBe(mockAIResponse.guidance);
      expect(result.luckyDirection).toBe('东南');
    });

    test('API 返回非 JSON 时应降级到本地解读', async () => {
      mockFetch({
        choices: [{ message: { content: '这不是JSON格式' } }],
      });

      const result = await getAIInterpretation(mockSignRequest, qianfanConfig);
      
      expect(result).toBeDefined();
      expect(result.summary).toContain('钟离成道');
    });

    test('API 返回 500 错误时应降级到本地解读', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
      });

      const result = await getAIInterpretation(mockSignRequest, qianfanConfig);
      
      expect(result).toBeDefined();
      expect(result.summary).toContain('钟离成道');
    });

    test('API 返回 401 认证错误时应降级到本地解读', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 401,
      });

      const result = await getAIInterpretation(mockSignRequest, qianfanConfig);
      
      expect(result).toBeDefined();
    });

    test('网络超时应降级到本地解读', async () => {
      global.fetch = jest.fn().mockImplementation(() => 
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Network timeout')), 100)
        )
      );

      const result = await getAIInterpretation(mockSignRequest, qianfanConfig);
      
      expect(result).toBeDefined();
    });

    test('带用户问题的请求应包含问题内容', async () => {
      const mockFetchFn = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: JSON.stringify(mockAIResponse) } }],
        }),
      });
      global.fetch = mockFetchFn;

      await getAIInterpretation(
        { ...mockSignRequest, question: '我的事业运势如何？' },
        qianfanConfig
      );
      
      const callArgs = mockFetchFn.mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      const userMessage = body.messages.find((m: any) => m.role === 'user');
      
      expect(userMessage.content).toContain('我的事业运势如何？');
    });
  });

  // ==========================================
  // 测试用例 3: OpenAI API 测试
  // ==========================================
  describe('OpenAI API 测试', () => {
    const openaiConfig: AIConfig = {
      provider: 'openai',
      apiKey: 'sk-test-key',
    };

    test('成功调用 OpenAI API', async () => {
      mockFetch({
        choices: [{ message: { content: JSON.stringify(mockAIResponse) } }],
      });

      const result = await getAIInterpretation(mockSignRequest, openaiConfig);
      
      expect(result.summary).toBe(mockAIResponse.summary);
    });

    test('自定义 baseUrl 应正确使用', async () => {
      const mockFetchFn = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          choices: [{ message: { content: JSON.stringify(mockAIResponse) } }],
        }),
      });
      global.fetch = mockFetchFn;

      await getAIInterpretation(mockSignRequest, {
        ...openaiConfig,
        baseUrl: 'https://custom-api.example.com',
      });
      
      const callUrl = mockFetchFn.mock.calls[0][0];
      expect(callUrl).toContain('custom-api.example.com');
    });
  });

  // ==========================================
  // 测试用例 4: DeepSeek API 测试
  // ==========================================
  describe('DeepSeek API 测试', () => {
    const deepseekConfig: AIConfig = {
      provider: 'deepseek',
      apiKey: 'ds-test-key',
    };

    test('成功调用 DeepSeek API', async () => {
      mockFetch({
        choices: [{ message: { content: JSON.stringify(mockAIResponse) } }],
      });

      const result = await getAIInterpretation(mockSignRequest, deepseekConfig);
      
      expect(result.summary).toBe(mockAIResponse.summary);
    });
  });

  // ==========================================
  // 测试用例 5: 边界条件测试
  // ==========================================
  describe('边界条件测试', () => {
    test('签诗为空字符串', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        poem: '',
      });
      
      expect(result).toBeDefined();
    });

    test('签号为 0', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        signNumber: 0,
      });
      
      expect(result).toBeDefined();
    });

    test('签号为负数', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        signNumber: -1,
      });
      
      expect(result).toBeDefined();
    });

    test('签题为超长字符串', async () => {
      const longTitle = '这是一个非常非常长的签题'.repeat(100);
      const result = await getAIInterpretation({
        ...mockSignRequest,
        signTitle: longTitle,
      });
      
      expect(result).toBeDefined();
    });

    test('用户问题包含特殊字符', async () => {
      const result = await getAIInterpretation({
        ...mockSignRequest,
        question: '我的运势如何？<script>alert("xss")</script>',
      });
      
      expect(result).toBeDefined();
    });

    test('API 返回部分字段缺失', async () => {
      mockFetch({
        choices: [{ 
          message: { 
            content: JSON.stringify({
              summary: '测试',
              // 缺少其他字段
            }) 
          } 
        }],
      });

      const result = await getAIInterpretation(mockSignRequest, {
        provider: 'qianfan',
        apiKey: 'test',
      });
      
      expect(result.summary).toBe('测试');
      expect(result.guidance).toBe('');
      expect(result.advice).toBe('');
    });

    test('luckyNumber 为非数字字符串', async () => {
      mockFetch({
        choices: [{ 
          message: { 
            content: JSON.stringify({
              summary: '测试',
              guidance: '指引',
              advice: '建议',
              luckyNumber: '不是数字',
            }) 
          } 
        }],
      });

      const result = await getAIInterpretation(mockSignRequest, {
        provider: 'qianfan',
        apiKey: 'test',
      });
      
      expect(result).toBeDefined();
    });
  });

  // ==========================================
  // 测试用例 6: 性能测试
  // ==========================================
  describe('性能测试', () => {
    test('本地解读应在 10ms 内完成', async () => {
      const start = Date.now();
      await getAIInterpretation(mockSignRequest);
      const duration = Date.now() - start;
      
      expect(duration).toBeLessThan(10);
    });

    test('并发请求应正确处理', async () => {
      const requests = Array(10).fill(null).map((_, i) => 
        getAIInterpretation({ ...mockSignRequest, signNumber: i + 1 })
      );
      
      const results = await Promise.all(requests);
      
      expect(results).toHaveLength(10);
      results.forEach(result => {
        expect(result).toBeDefined();
      });
    });
  });
});
