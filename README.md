# 孟珍珍 · AI-Native 创新作品集

个人产品体验设计作品集，使用 React 与 Vite 构建。

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址由 Vite 输出；当前设计校对使用 `http://localhost:4177/`。

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

