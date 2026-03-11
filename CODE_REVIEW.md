# 签历项目代码审查报告

## 审查日期：2026-03-11

---

## 🔴 严重问题

### 1. AI 服务缺少超时处理
**文件**: `src/services/aiService.ts`

**问题**: 所有 API 调用（`callQianfan`, `callOpenAI`, `callDeepSeek`）都没有设置超时。如果 API 响应缓慢或挂起，用户界面会无限等待。

**建议修复**:
```typescript
// 添加 AbortController 支持
async function callQianfan(prompt: string, apiKey: string, baseUrl: string) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30秒超时
  
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      signal: controller.signal,
      // ...其他配置
    });
    // ...
  } finally {
    clearTimeout(timeoutId);
  }
}
```

### 2. useEffect 依赖数组不完整
**文件**: `app/result.tsx`

**问题**: 
```typescript
useEffect(() => {
  if (sign) {
    loadAIInterpretation();
  }
}, [sign]); // 缺少 params.question 依赖
```

`loadAIInterpretation` 使用了 `params.question`，但依赖数组中缺少它。这可能导致问题变化时不会重新加载解读。

**建议修复**:
```typescript
useEffect(() => {
  if (sign) {
    loadAIInterpretation();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [sign, params.question]);
```

### 3. 环境变量可能为 undefined
**文件**: `src/lib/config.ts`

**问题**: 
```typescript
supabase: {
  url: process.env.EXPO_PUBLIC_SUPABASE_URL!,  // 使用 ! 断言
  anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
},
```

如果环境变量未设置，运行时会抛出 `Cannot read property of undefined` 错误。

**建议修复**:
```typescript
supabase: {
  url: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
},

// 添加配置验证
export function validateConfig() {
  if (!config.supabase.url) {
    throw new Error('Missing EXPO_PUBLIC_SUPABASE_URL');
  }
  if (!config.supabase.anonKey) {
    throw new Error('Missing EXPO_PUBLIC_SUPABASE_ANON_KEY');
  }
}
```

---

## 🟡 中等问题

### 4. 错误处理信息不足
**文件**: `src/services/aiService.ts`

**问题**: 
```typescript
if (!response.ok) {
  throw new Error(`AI API error: ${response.status}`);
}
```

只记录了状态码，没有记录响应体内容，难以调试。

**建议修复**:
```typescript
if (!response.ok) {
  const errorBody = await response.text();
  console.error('API Error:', response.status, errorBody);
  throw new Error(`AI API error: ${response.status} - ${errorBody}`);
}
```

### 5. JSON 解析失败静默降级
**文件**: `src/services/aiService.ts`

**问题**: 当 API 返回非 JSON 格式时，静默降级到本地解读，用户不知道发生了什么。

**建议修复**: 添加降级提示
```typescript
catch {
  console.warn('AI response parse failed, using local interpretation');
  return {
    ...generateLocalInterpretation(request),
    _isLocal: true, // 标记为本地解读
  };
}
```

### 6. 缺少请求重试机制
**文件**: `src/services/aiService.ts`

**问题**: API 调用失败时直接降级，没有重试。对于临时性网络问题，重试可能成功。

**建议修复**:
```typescript
async function fetchWithRetry(url: string, options: any, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1))); // 指数退避
    }
  }
}
```

### 7. 组件状态管理问题
**文件**: `app/result.tsx`

**问题**: `sign` 在组件函数体内定义，不在 state 中，每次渲染都会重新解析 JSON。

**建议修复**:
```typescript
const [sign, setSign] = useState<SignCard | null>(null);

useEffect(() => {
  try {
    const parsed = params.sign ? JSON.parse(params.sign) : null;
    setSign(parsed);
  } catch (e) {
    setSign(null);
  }
}, [params.sign]);
```

---

## 🟢 改进建议

### 8. 添加加载状态骨架屏
**文件**: `app/result.tsx`

当前只有简单的 ActivityIndicator，建议使用 Skeleton 组件提升用户体验。

### 9. 添加错误边界
建议添加 React Error Boundary 捕获渲染错误。

### 10. API 响应类型定义
添加 API 响应的 TypeScript 类型：
```typescript
interface QianfanResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}
```

### 11. 添加 API 调用日志
在开发环境下记录 API 调用详情，便于调试。

### 12. 优化 prompt 模板
当前 prompt 模板有重复代码，可以抽取为常量：
```typescript
const SYSTEM_PROMPT = `你是一位精通中国传统文化的签文解读大师...`;
```

---

## 测试覆盖建议

| 模块 | 当前覆盖率 | 建议覆盖率 |
|------|-----------|-----------|
| aiService.ts | 0% | 80%+ |
| config.ts | 0% | 90%+ |
| result.tsx | 0% | 70%+ |

---

## 行动计划

1. **立即修复** (P0)
   - 添加 API 超时处理
   - 修复 useEffect 依赖
   - 添加环境变量验证

2. **短期修复** (P1)
   - 改进错误处理和日志
   - 添加重试机制
   - 修复组件状态管理

3. **中期改进** (P2)
   - 添加测试用例
   - 添加错误边界
   - 优化用户体验

---

*审查人: AI Assistant*
*审查时间: 2026-03-11 14:00*
