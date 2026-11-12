---
title: "戒掉蓝紫与圆角卡：用 2000 份 DESIGN.md 去 AI 味"
titleEn: "Curing Purple AI Slop with 2,000 Real-World DESIGN.md Specs"
description: "为什么 AI 写出的网页总像同一个模板？拆解去 AI 味规范与 2,000+ 真实产品设计令牌库，给 Agent 装上前端审美验收台。"
descriptionEn: "Why AI-generated UIs converge on generic purple cards, and how design-token specs enforce taste at the gate."
category: "工程审美"
categoryEn: "Engineering Aesthetics"
date: "2026-11-08"
cover: "/images/essays/card-design-md.jpg"
order: 4
takeaways: ["AI 前端「一眼假」源于 9 个高频视觉指纹：默认 #6366f1 蓝紫色、万物皆圆角阴影卡、不分场景默认暗色及伪杂志斜体套路。", "将 Refero Styles 收录的 2,000+ 知名产品 DESIGN.md（锁死色值、字阶与圆角/阴影禁令）放入仓库根目录，可直接约束 Agent 样式边界。", "配合 MIT 开源的 refero-design 工艺规范，免注册即可在本地建立零成本的前端去 AI 味验收台。"]
takeawaysEn: ["Generic AI UI slop stems from 9 recurring fingerprints: default #6366f1 indigo palettes, cards-everywhere layout, unprompted dark mode, and autopilot serif italics.", "Placing a concrete DESIGN.md token & constraint spec (from 2,000+ real-world product systems) in the repo root gives coding agents enforceable visual boundaries.", "Pairing DESIGN.md with the MIT-licensed anti-ai-slop craft checklist creates a zero-cost local design QA gate."]
---

用 Claude Code、Codex 或 Cursor 写前端页面时，很多人都有过同一种挫败感：功能跑通只要五分钟，但打开浏览器一看，满屏都是同一种蓝紫色按钮、带阴影的圆角卡片和千篇一律的三栏排布——哪怕不懂代码的人扫一眼，也能立刻认出「这是 AI 写的网页」。

11 月 7 日，[X 创作者 @amananimates 发了一条「UI/UX 设计师必存 5 大网站」的帖子](https://x.com/amananimates/status/2119024322325217293)。我把帖子里隐藏在短链背后的 5 个站点（以及评论区补充的实战画廊）全部解开、逐页核对了它们的真实库存与收费条款。

实测下来，这份清单里既有数据注水近一倍的付费模板站，也藏着真正能零成本治好「AI 网页廉价感」的纯文本武器。遵循**「纯文本主权」**与**「生成便宜，验证昂贵」**的原则，这篇实操把这批设计资源按真实含金量重新排个序，教你用一行命令和一份 `DESIGN.md`，给你的编程 Agent 装上一台前端审美验收台。

---

## 一、为什么 AI 写的网页「一眼假」？先看 9 个视觉指纹

在急着找模板之前，先得搞清楚大模型写前端到底错在哪。

在原帖排第 5 的 Refero 生态里，[其官方 GitHub 仓库 `referodesign/refero_skill` 开源了一份名为 `anti-ai-slop.md` 的工艺规范](https://raw.githubusercontent.com/referodesign/refero_skill/master/skills/refero-design/references/anti-ai-slop.md)。这份文档把 AI 生成界面的廉价感（AI Slop）拆成了 9 个极其具体的视觉指纹：

1. **默认蓝紫色（Indigo / Violet）**：[规范直接点名](https://raw.githubusercontent.com/referodesign/refero_skill/master/skills/refero-design/references/anti-ai-slop.md)，几乎所有 AI 模型默认都会输出 `#6366f1`、`#8b5cf6` 或 `#7c3aed`（因为训练数据被 Tailwind 默认色板严重污染），这是 AI 生成设计最通用的指纹。
2. **万物皆圆角阴影卡片（Cards Everywhere）**：[规范指出](https://raw.githubusercontent.com/referodesign/refero_skill/master/skills/refero-design/references/anti-ai-slop.md)，卡片是第二常见的 AI 偷懒套路——AI 喜欢把所有内容都塞进带阴影的圆角盒子里，因为这样最「安全」；而真正的设计师极少滥用卡片，更多用间距、分割线和排版建立层级。
3. **不分场景默认暗黑模式（Dark Mode by Default）**：[规范提醒](https://raw.githubusercontent.com/referodesign/refero_skill/master/skills/refero-design/references/anti-ai-slop.md)，AI 模型默认偏爱深色背景，因为深色加发光渐变看起来很有「科技感」，但在大多数非开发工具场景下，浅色模式才是更克制的选择。
4. **自动驾驶式的「伪杂志衬线风（Calm Editorial Serif on Autopilot）」**：当提示词要求「有品味、编辑感、奢华」时，AI 又会集体滑向另一个模板——暖米白底色、衬线大标题，并且**故意把标题里的某一个词换成另一种字体、改成斜体或换个颜色**。
5. **其余 5 项高频翻车点**：还包括拿 Emoji 当功能图标、在卡片或引用块左侧加一条毫无业务含义的 `4px` 彩色竖条、把多个参考站风格揉成平庸的平均值、色彩语义角色漂移，以及用劣质的 CSS 渐变圆球冒充插画。

搞清楚病根就会明白：如果你不给 Agent 明确的色彩 Token 边界与禁用清单，只跟它说「帮我把页面改得好看一点」，它只会从一个默认模板跳进另一个默认模板。

---

## 二、最值得零成本拿走的金矿：2,000+ 大厂 `DESIGN.md` 与开源 Skill

整份清单里含金量最高、且核心能力完全免费开放的，是排在第 5 位的 **Refero Styles（`styles.refero.design`）** 与它的开源工艺库。

### 1. 直接把 2,000+ 知名产品的 `DESIGN.md` 放进项目根目录

[按 Refero Styles 官网说明](https://styles.refero.design/)，它整理了来自领先产品网站的 **2,000 多份 AI 可读的设计系统（AI-readable design systems）**。点开任意一套风格，都能直接查看它的颜色、字体排印、间距、组件，并导出成一份标准的 `DESIGN.md`，直接放进 **Cursor、Claude Code、Codex、v0 或 Lovable** 里使用。

这到底比自己写提示词强在哪？[我们以该站收录的硬件与工业设计标杆 `teenage engineering` 设计系统为例](https://styles.refero.design/style/aecf9dda-5cba-4dc7-9e73-59b65d895cdf)：
- 它不是笼统地写一句「极简工业风」，而是直接把精确的工程约束写进文档：画布背景色锁死近白 `#f6f8f7`（Canvas Mist），主黑色 `#000000` 在整个系统中出现约 1017 次，链接色使用标准蓝 `#0071bb`；
- 更有价值的是它的硬性边界声明：[文档明确写死](https://styles.refero.design/style/aecf9dda-5cba-4dc7-9e73-59b65d895cdf)——**「零圆角、零投影、零渐变——每一条边缘都是利落的直切，每一个表面都是纯平的（Zero rounded corners, zero drop shadows, zero gradients — every edge is a straight cut, every surface is flat）」**。

把这样一份纯文本 `DESIGN.md` 放进项目仓库，Agent 写 CSS 时就有了明确的红线，不可能再给你塞满屏圆角阴影卡片。

### 2. 一行命令免账号安装 `refero-design` 开源验收规范

除了网页端的 `DESIGN.md` 库，[Refero 团队在 GitHub 上以 MIT 协议开源了 `referodesign/refero_skill`](https://github.com/referodesign/refero_skill)。只需要在终端执行一行命令：

```bash
npx skills add https://github.com/referodesign/refero_skill --skill refero-design
```

[正如其官方 README 明确说明的](https://github.com/referodesign/refero_skill)：**使用仓库内置的设计工艺参考文档（包括前面提到的 `anti-ai-slop.md`、字体排印、色彩、布局与组件规范）完全不需要注册账号（No account is required for the bundled craft references）**。只有当你需要让客户端连接 `https://api.refero.design/mcp`、去实时检索 [Refero MCP 提供的 145,000 多张真实产品界面与 12,000 多条用户流](https://refero.design/mcp)时，[才需要开通其付费的 Pro 计划](https://refero.design/mcp)。

对于绝大多数独立开发者和业务团队来说，「从 `styles.refero.design` 拷一份目标风格的 `DESIGN.md` + 用 `npx skills add` 装上免费的本地去 AI 味规范」，就已经构成了零成本的完整闭环。

---

## 三、三个专治局部平庸的免费组件画廊

解决了全局配色、字体和卡片纪律后，网页最容易露怯的地方通常集中在三个局部：**顶部导航栏、页面中段的转化按钮（CTA），以及底部的页脚**。原帖的第 2、3、4 项正好对应这三个局部画廊，全部可以免费浏览：

1. **导航栏灵感库 `navbar.gallery`**：[该站专门收录各类网站顶部导航设计](https://www.navbar.gallery/)，并按 8 种结构分类——静态/吸顶（Static/Sticky）、下拉菜单（Dropdown）、大型展开菜单（Mega Menu）、侧边栏（Side Bar）、搜索栏（Search Bar）、顶部公告条（Announcement）、全屏菜单（Full Screen）以及面包屑导航（Breadcrumbs）。
2. **转化区块库 `cta.gallery`（原帖第 4 项）**：[专门收集高转化的 Call-to-Action 模块设计](https://www.cta.gallery/)，支持按不同行业与亮暗模式筛选。
3. **页脚设计库 `footer.design`（原帖第 3 项）**：[号称收录全球顶尖网站的页脚设计](https://www.footer.design/)。当你不知道页脚除了干巴巴排四列链接还能怎么排时，可以直接按大字排版（Typography）、网格（Grid）、插画（Illustration）等风格筛选参考。

实操用法很简单：在这些免费画廊里挑中一个具体的导航或页脚布局，把截图连同 `DESIGN.md` 一起丢给 Claude Code 或 Codex，让它在严格遵守你项目 Token 的前提下还原该布局结构。

---

## 四、实测脱水：为什么排第 1 的 Scrolltide 只建议看免费项？

最后说说原帖排在第 1 位、也是讨论度最高的 **Scrolltide（`scrolltide.co`）**。

[在 @amananimates 的主帖里](https://x.com/amananimates/status/2119024322325217293)，它被宣传成拥有「600+ 设计提示词和 200+ 带完整源码的 3D 与滚动驱动组件」。但只要看一眼[@amananimates 自己的 X 个人简介](https://x.com/amananimates/status/2119024322325217293)，就会发现他本人就是 `Co-founder @ http://scrolltide.co`，且简介里写的数字其实是 `300+ prompts & websites`。

我们逐一打开 Scrolltide 官网的 5 个分类页面做了实测清点，真实家底如下：
- **模板（Templates）**：[共 143 个模板，其中仅 7 个免费](https://www.scrolltide.co/templates)；
- **组件（Components）**：[共 85 个组件](https://www.scrolltide.co/components)；
- **着色器（Shaders）**：[共 55 个着色器](https://www.scrolltide.co/shaders)；
- **页面区块（Sections）**：[共 23 个区块](https://www.scrolltide.co/sections)；
- **应用界面（UI Screens）**：[共 14 个界面](https://www.scrolltide.co/ui)。

5 个栏目全部加起来共 **320 项**，远没有推文里说的「600+ 提示词和 200+ 组件」那么多。

更需要留心的是它的定价与条款限制：[按 Scrolltide 官方定价页说明](https://www.scrolltide.co/pricing)，月付档为每月 39 美元、年付档为每年 144 美元（自动续费），终身买断档为 299 美元；但**月付 39 美元的计划并不包含 3D 模板、85 个组件、55 个着色器、14 个 UI 界面以及面向 Claude/Cursor/Codex 的 MCP 服务（这些全部限定在年付或终身档）**，且[按官方 FAQ 说明，月付档每周最多只能解锁 10 个新付费模板](https://www.scrolltide.co/faq)。同时，[定价页明确写着「所有销售均为最终销售——我们不提供退款，包括忘记取消的自动续费」](https://www.scrolltide.co/pricing)。

因此，我对 Scrolltide 的判断非常明确：**不要冲动掏钱开会员**。如果你需要练习带物理微交互或滚动视差的展示页，直接去拿它公开的 **7 个免费模板**，或者参考它列表页上公开的几十词动效描述就够了（评论区里展示的 [`shipped.gallery` 案例站](https://www.shipped.gallery/build/spider-verse)，同样演示了如何用 Antigravity 配合 Gemini 4 Argon 把这类视觉设定一步步落地成真实网页）。

---

## 五、最小落地闭环：今天就能改的 3 个动作

把工具看明白之后，真正能留在你团队里的只有工作流。下次让 AI 写前端页面前，建议直接按这三步走：

1. **先立规矩再写代码**：去 `styles.refero.design` 挑一份最接近你产品气质的 `DESIGN.md` 放进项目根目录，让色彩、字重和圆角半径变成纯文本铁律。
2. **挂上本地验收清单**：跑一行 `npx skills add https://github.com/referodesign/refero_skill --skill refero-design`，把 `anti-ai-slop.md` 里的 9 条廉价指纹当成每次前端 PR 的必检项。
3. **局部结构看真站**：导航栏去 `navbar.gallery`、页脚去 `footer.design`、转化区去 `cta.gallery` 找真实结构参考，彻底戒掉让大模型自己「自由发挥」排版的习惯。

你平时用 AI 写界面时，最受不了它的哪个默认审美习惯？欢迎在评论区聊聊。
