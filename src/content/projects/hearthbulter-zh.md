---
title: 健康管家 (HearthBulter)
description: "把家庭健康管理从主观感性拉到数据驱动：AI 营养规划、智能食谱、Instacart 补给闭环。"
tags: ["Next.js", "AI", "健康管理", "Cloudflare Pages", "Convex"]
image: "/images/projects/hearthbulter.jpg"
demoUrl: "https://healthbutler.life/"
repoUrl: "https://github.com/marovole/HearthBulter"
featured: true
date: 2025-01-03
lang: zh
otherLocaleSlug: hearthbulter
---

## 背景：为什么做这个

个人和家庭的健康管理，长期卡在“主观感性”——凭感觉吃、凭印象买、体检报告看完就忘。我想做一个把健康决策落到数据上的引擎：从健康指标，到每天吃什么，再到买什么补给，连成一个闭环。这是一个真实的个人公开项目，不是命题作业。

## 我的角色

全程 AI 协作——从产品定义、76 张表的数据建模，到前后端、CI/CD 与部署，我作为独立开发者一手包办。

## 过程与关键决策

- **Serverless 优先、跑在免费额度内**：选 Cloudflare Pages + OpenNext，让一个全栈应用尽量零成本跑起来——个人项目的可持续性，比规模更优先。
- **数据层是“边做边换底座”的取舍**：仓库历史里能看到从 Prisma 到 Supabase、Neon Postgres，再到 Convex 的演进。现行 schema 在 Convex 上定义了 76 张表，横跨家庭档案、健康数据、营养库、食谱、库存、预算、购物、通知、社区等约 30 个业务域。真实项目不是一次做对。
- **个人项目按团队标准来**：7 步 GitHub Actions 流水线（代码质量 -> 类型检查 -> 单测 -> 构建 -> Cloudflare 构建 -> 安全审计 -> 汇总），接入 Sentry 错误监控、Upstash Redis 缓存、Clerk 鉴权、Zod 校验。
- **AI 落到具体环节，而非贴标签**：用 OpenAI 做营养分析与食谱生成；体检报告走 Tesseract.js OCR 提取指标；购物补给对接 Instacart。

## 结果与边界

- **线上可访问**：[healthbutler.life](https://healthbutler.life/)（返回 200，zh-CN）；**源码公开**：[github.com/marovole/HearthBulter](https://github.com/marovole/HearthBulter)。
- **建模规模可查**：`convex/schema.ts` 共 76 张表，覆盖约 30 个业务模块。
- **诚实边界**：这是个人公开项目，暂无公开的用户量、留存或营收数据——不编造增长数字。可穿戴同步、体检 OCR、Instacart 下单等能力在代码与文档中已具备模块/集成；它们是“已实现的能力”，不是“已验证的成效”。

## 证据来源

- Demo（200）：healthbutler.life
- 源码（公开仓库）：github.com/marovole/HearthBulter
- 技术栈与表数：`package.json`、`convex/schema.ts`、`.github/workflows/ci.yml`、README、git commit history
