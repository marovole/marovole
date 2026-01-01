# marovole Portfolio

AIfirst 产品经理 & Vibecoder 的个人作品集网站。

## Tech Stack

- **Astro** - 静态站点生成器
- **Tailwind CSS** - 样式框架
- **Cloudflare Pages** - 部署平台

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Preview

```bash
pnpm preview
```

## Deployment

Push to `main` branch to trigger automatic deployment to Cloudflare Pages.

## Project Structure

```
src/
├── components/    # UI 组件
├── content/       # 项目内容 (Markdown)
├── layouts/       # 页面布局
├── pages/         # 页面路由
└── styles/        # 全局样式
```

## Customization

1. Edit `src/pages/index.astro` to update personal info
2. Add/update projects in `src/content/projects/`
3. Update social links in `src/components/Footer.astro`
4. Customize colors in `src/styles/global.css`
