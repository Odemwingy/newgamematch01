// AI 服务配置
// 支持多种 AI 提供商

export interface AIConfig {
  provider: 'deepseek' | 'openai' | 'anthropic' | 'local';
  apiKey?: string;
  baseUrl?: string;
  model?: string;
}

export interface AIInterpretationRequest {
  signNumber: number;
  signTitle: string;
  signType: string;
  poem: string;
  interpretation: string;
  question?: string;
  userName?: string;
}

export interface AIInterpretation {
  summary: string;
  guidance: string;
  advice: string;
  luckyDirection?: string;
  luckyColor?: string;
  luckyNumber?: number;
}

// DeepSeek API 调用
async function callDeepSeek(
  prompt: string,
  apiKey: string,
  baseUrl: string = 'https://api.deepseek.com'
): Promise<string> {
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: `你是一位精通中国传统文化的签文解读大师。你的解读要：
1. 结合签文的典故和寓意
2. 给出温暖、积极的指引
3. 语言优美，富有诗意
4. 实事求是，不夸大其词
5. 给出具体可行的建议
回复格式为 JSON：
{
  "summary": "签文总体寓意（50字内）",
  "guidance": "人生指引（100字内）",
  "advice": "具体建议（80字内）",
  "luckyDirection": "吉利方位",
  "luckyColor": "吉利颜色",
  "luckyNumber": 吉利数字
}`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// OpenAI API 调用
async function callOpenAI(
  prompt: string,
  apiKey: string,
  baseUrl: string = 'https://api.openai.com'
): Promise<string> {
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `你是一位精通中国传统文化的签文解读大师。用温暖的语调解读签文，给出积极的人生指引。
回复格式为 JSON，包含 summary, guidance, advice, luckyDirection, luckyColor, luckyNumber 字段。`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 500,
    }),
  });

  if (!response.ok) {
    throw new Error(`AI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

// 本地模拟解读（无 API 时使用）
function generateLocalInterpretation(request: AIInterpretationRequest): AIInterpretation {
  const { signType, signTitle, question } = request;
  
  const interpretations: Record<string, AIInterpretation> = {
    '上签': {
      summary: '此签大吉，天时地利人和俱备，诸事顺遂。',
      guidance: '珍惜当下机遇，把握良机。贵人相助，前途光明。保持谦逊，善缘自来。',
      advice: '近期可大胆行动，把握机会。多与贵人交流，广结善缘。',
      luckyDirection: '东南',
      luckyColor: '红色',
      luckyNumber: 8,
    },
    '中签': {
      summary: '此签平稳，循序渐进，不可急躁。',
      guidance: '稳步前行，耐心等待。守得云开见月明，时机未到需静候。',
      advice: '保持平常心，踏实做事。不宜冒进，稳中求进为上策。',
      luckyDirection: '正南',
      luckyColor: '黄色',
      luckyNumber: 6,
    },
    '下签': {
      summary: '此签多阻，宜静待时，不宜躁动。',
      guidance: '人生起伏乃常态，暂时的困难是成长的契机。保持乐观，转机将至。',
      advice: '暂时收敛锋芒，养精蓄锐。多行善事，积累福报。等待时机，切勿强求。',
      luckyDirection: '正北',
      luckyColor: '蓝色',
      luckyNumber: 4,
    },
  };

  const base = interpretations[signType] || interpretations['中签'];
  
  return {
    ...base,
    summary: `【${signTitle}】${base.summary}`,
  };
}

/**
 * 获取 AI 解读
 */
export async function getAIInterpretation(
  request: AIInterpretationRequest,
  config?: AIConfig
): Promise<AIInterpretation> {
  // 如果没有配置或选择本地模式，使用本地解读
  if (!config || config.provider === 'local' || !config.apiKey) {
    return generateLocalInterpretation(request);
  }

  try {
    const prompt = `请解读这支签：
签号：第${request.signNumber}签
签题：${request.signTitle}
类型：${request.signType}
签诗：${request.poem}
传统解读：${request.interpretation}
${request.question ? `求签者问题：${request.question}` : ''}

请给出深度解读和人生指引。`;

    let response: string;

    switch (config.provider) {
      case 'deepseek':
        response = await callDeepSeek(prompt, config.apiKey, config.baseUrl);
        break;
      case 'openai':
        response = await callOpenAI(prompt, config.apiKey, config.baseUrl);
        break;
      default:
        return generateLocalInterpretation(request);
    }

    // 解析 JSON 响应
    try {
      const parsed = JSON.parse(response);
      return {
        summary: parsed.summary || '',
        guidance: parsed.guidance || '',
        advice: parsed.advice || '',
        luckyDirection: parsed.luckyDirection,
        luckyColor: parsed.luckyColor,
        luckyNumber: parsed.luckyNumber,
      };
    } catch {
      // 如果解析失败，使用本地解读
      return generateLocalInterpretation(request);
    }
  } catch (error) {
    console.error('AI interpretation error:', error);
    // 出错时使用本地解读
    return generateLocalInterpretation(request);
  }
}
