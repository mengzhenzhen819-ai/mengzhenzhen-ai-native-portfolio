# 孟珍珍 · AI-Native 创新作品集

个人产品体验设计作品集，使用 React 与 Vite 构建。

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址由 Vite 输出；当前确认版预览使用 `http://127.0.0.1:4186/`。

## 构建

```bash
npm run build
```

前端静态文件输出到 `dist/client`。

## 测试

```bash
npm run test:sites
```

## 部署

仓库包含 `vercel.json`，可直接导入 Vercel。项目详情页使用 SPA 路由回退到根入口。

## 项目结构

- `index.html`：唯一网页入口
- `src/`：React 页面和样式源码
- `public/`：图片、字体与媒体素材
- `tests/`：站点构建测试
- `AGENTS.md`：后续使用 Codex 时的项目说明


## 当前首页版本（2026-10-25）

纯黑背景与整页黄色动态颗粒，头部显示 Magic。底部为左侧中文文案与联系方式、右侧 15 张个人照片的双向波浪动画，支持悬停反馈和边缘淡出。动画在页面隐藏或减少动态效果设置开启时暂停。

首屏颗粒原始范围已保存在 `source-assets/particle-checkpoints/2026-10-25-hero-only/`。如需恢复首屏限定效果，移除 `src/App.jsx` 首页根节点上的 `home-page--full-particles` 类名并重新构建；无需覆盖其他页面改动。

2026-10-26 更新：底部左侧按最新 Figma 排版并上移、左移；两张人物照使用更近的裁切。所有项目在当前标签内跳转；首页首次打开及刷新均显示首屏，明确从详情返回时才恢复项目卡片位置。

首页能力标签已更新为深色描边样式：AI产品使用 #FFC400 文字、小圆点和 0.5px 描边，手机端采用两列布局。
