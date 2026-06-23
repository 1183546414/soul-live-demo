# Soul 直播功能 Demo

基于 [Soul APP 直播功能板块产品需求文档](https://soulapp.feishu.cn/wiki/ATFSwPgHciMa6ykzQqgc4sYGnGe) 实现的交互式原型，使用 **Next.js 15** 构建，可一键部署到 **Vercel**。

## 功能覆盖（PRD 对应）

| PRD 模块 | Demo 页面 | 说明 |
|---------|----------|------|
| 底部导航「直播」Tab | `/` | 动态 LIVE 角标、直播广场 |
| 首次引导浮层 | `/` | 「发现灵魂直播间」三卡片引导 |
| 广场流 Live 卡片 | `/feed` | 瞬间流中插入直播卡片 |
| 开播模式选择器 | `/go-live` | 虚拟形象 / 真人 / 语音三种模式 |
| 开播配置面板 | `/go-live` | AI 标题、引力签、可见范围 |
| 直播间核心界面 | `/room/[id]` | 匹配度、弹幕、礼物、连麦入口 |
| Soul 专属礼物体系 | `/room/[id]` | 灵魂补给 / 共鸣 / 守护三类礼物 |
| 灵魂共鸣特效 | `/room/[id]` | 送共鸣礼物触发紫色边框特效 |

## 本地运行

```bash
cd soul-live-demo
npm install
npm run dev
```

访问 https://soul-live-demo-git-main-nana7mi1.vercel.app/

## 部署到 Vercel

### 方式一：Vercel CLI

```bash
npm i -g vercel
cd soul-live-demo
vercel
```

### 方式二：GitHub 导入

1. 将 `soul-live-demo` 目录推送到 GitHub 仓库
2. 登录 [vercel.com](https://vercel.com)，点击 **Add New Project**
3. 导入仓库，Framework Preset 选择 **Next.js**
4. Root Directory 设为 `soul-live-demo`（如在子目录）
5. 点击 **Deploy**

Vercel 会自动检测 Next.js 并完成构建部署。

## 技术栈

- Next.js 15 (App Router)
- React 19
- TypeScript
- 纯 CSS（无额外 UI 库，移动端优先）

## 页面路由

- `/` — 直播广场（推荐/关注/分类 Tab）
- `/feed` — 广场瞬间流 + 直播卡片插入
- `/go-live` — 开播流程（模式选择 → 配置 → 直播中）
- `/room/[id]` — 直播间互动（弹幕、送礼、灵魂共鸣）
