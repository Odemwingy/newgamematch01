# 签历 - 每日黄历与抽签应用

一款融合传统智慧与现代科技的黄历抽签应用。

## 功能特性

### 📅 每日黄历
- 公历/农历日期展示
- 天干地支、生肖星座
- 每日宜忌、冲煞彭祖
- 节日节气提醒

### 🔮 签筒抽签
- 36 张观音灵签
- 抽签动画体验
- 签文详细解读
- 事业/爱情/健康/财运指引

### 🤖 AI 深度解读
- AI 个性化解读签文
- 人生指引与建议
- 吉利方位/颜色/数字

### 📜 历史记录
- 抽签记录保存
- 历史回顾查看
- 数据统计展示

### ⭐ 高级会员
- 无限抽签次数
- AI 深度解读
- 去除广告
- 历史导出

## 技术栈

- **框架**: React Native + Expo
- **路由**: Expo Router
- **黄历**: lunar-typescript
- **后端**: Supabase
- **AI**: DeepSeek / OpenAI (可选)

## 开始使用

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npx expo start
```

### 构建

```bash
# iOS
npx expo build:ios

# Android
npx expo build:android

# Web
npx expo build:web
```

## 项目结构

```
qianli/
├── app/                    # 页面路由
│   ├── (tabs)/            # Tab 页面
│   │   ├── index.tsx      # 首页（黄历）
│   │   ├── history.tsx    # 历史记录
│   │   └── profile.tsx    # 个人中心
│   ├── draw.tsx           # 抽签页
│   └── result.tsx         # 结果页
├── src/
│   ├── components/        # 组件
│   ├── data/              # 数据（签卡）
│   ├── hooks/             # Hooks
│   ├── lib/               # 库配置
│   ├── services/          # 服务
│   └── theme/             # 主题
├── supabase/              # 数据库
└── assets/                # 静态资源
```

## 环境变量

创建 `.env` 文件：

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## 开发进度

- [x] Milestone 0: 仓库初始化
- [x] Milestone 1: 首页黄历
- [x] Milestone 2: 抽签与结果页
- [x] Milestone 3: AI 深度解读
- [x] Milestone 4: 历史记录与备注
- [x] Milestone 5: 订阅与付费墙
- [ ] Milestone 6: 发布准备

## License

MIT
