# marovole

## 中文

**AI-First 产品经理 & Vibecoder**  
关键词：**AI Agent / 0-1 / 产品策略**

专注于 AI 产品策略与落地交付，将 AI 深度融入工作流。  
我既能做方向判断、定位与路线规划，也能把事情推进到可用、可上线、可迭代的状态。

### 关于我
我是一名专注于 AI 的产品经理，同时也是一位热爱代码的 Vibecoder。  
我有多年工作经验，其中 **5 年自主创业**，主要在 **内容 / 电商 / C 端产品** 方向；后续多年担任 **团队管理与产品管理** 相关角色，因此在策略与执行两端都积累了扎实的方法论与实战经验。

我相信 AI 正在改变我们工作和生活的方式，而好的 AI 产品需要兼具技术深度与人文关怀。

### 我在做什么
- 深入研究、探索与实践 **AI Agent** 的不同方向与应用形态
- 用“产品策略 + 快速验证”推进 0-1：定义问题、建立假设、设计实验、推动 MVP 上线并迭代
- 把“策略—产品—交付”串成闭环：目标拆解、跨团队对齐、节奏管理与质量把控

### 联系我
- Email: `marovole@gmail.com`
- GitHub: https://github.com/marovole
- X(Twitter): https://twitter.com/marovole
- LinkedIn: https://linkedin.com/in/marovole

### 发布 HTML 文章

站点支持把本地写好的 **standalone HTML** 文件直接发布为文章，无需改写成 Markdown。

1. 将 `.html` 文件放入 `content/articles/`（文件名即 slug，仅允许小写字母、数字和连字符，例如 `my-post.html` → `/articles/my-post/`）。
2. 文章标题默认读取 HTML 的 `<title>`；摘要优先读 `<meta name="description">`，否则取正文前 200 字。
3. 可选：在同目录添加 `{slug}.yml` 旁路配置，覆盖 `title`、`description`、`date`（ISO 日期）、`lang`（`en` 或 `zh`）、`otherLocaleSlug`（另一语言版本的 slug，用于双语 hreflang）。
4. 本地预览：`npm run dev`，访问 `/articles`（英文）或 `/zh/articles`（中文）；单语文章只出现在对应语言列表。
5. 构建发布：`npm run build`（构建时将 HTML 复制到内部路径 `public/article-frames/` 供 iframe 加载，并注入 `noindex` + canonical 指回详情页；sitemap 只收录详情页 URL）。

---

## English

**AI-First Product Manager & Vibecoder**  
Keywords: **AI Agents / 0-to-1 / Product Strategy**

Focused on AI product strategy and real-world delivery, deeply integrating AI into my workflow.  
I’m strong at both direction-setting (positioning, roadmap, alignment) and execution (shipping MVPs, iterating fast).

### About Me
I’m an AI-focused product manager and a Vibecoder who loves building.  
I have years of experience, including **5 years as a founder** building **consumer products in content and e-commerce**, followed by multiple years in **team leadership and product management** roles—giving me a balanced edge in strategy and delivery.

I believe AI is reshaping how we work and live, and great AI products require both technical depth and human touch.

### What I’m Working On
- Exploring and building across different directions of **AI Agents**
- Driving 0-to-1 with strategy + rapid validation: problem framing, hypotheses, experiments, MVP launch, iteration
- Closing the loop from strategy to delivery: goals, alignment, cadence, and quality

### Contact
- Email: `marovole@gmail.com`
- GitHub: https://github.com/marovole
- X(Twitter): https://twitter.com/marovole
- LinkedIn: https://linkedin.com/in/marovole

### Publishing HTML articles

Drop standalone `.html` files into `content/articles/` — no Markdown rewrite required.

1. Filename becomes the slug (ASCII lowercase, digits, hyphens only; e.g. `my-post.html` → `/articles/my-post/`).
2. Title defaults to the HTML `<title>`; description uses `<meta name="description">` or the first ~200 characters of body text.
3. Optional sidecar `{slug}.yml` can override `title`, `description`, `date` (ISO), `lang` (`en` / `zh`), and `otherLocaleSlug` (paired article slug for bilingual hreflang).
4. Preview locally with `npm run dev` at `/articles` (English) or `/zh/articles` (Chinese); monolingual articles appear only in their locale list.
5. Ship with `npm run build` — HTML is copied to internal `public/article-frames/` for iframe embedding (with `noindex` + canonical back to the detail page); sitemap lists detail URLs only.
