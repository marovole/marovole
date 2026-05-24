---
id: hearthbulter.zh
title: 健康管家 (HearthBulter)
description: 把家庭健康从"凭感觉"变成"能动手"。健康追踪、AI 营养规划、智能食谱生成和电商采购。
tags: ["Next.js", "AI", "健康管理", "Cloudflare Pages", "Neon PostgreSQL"]
image: "/images/projects/hearthbulter.jpg"
demoUrl: "https://hearthbulter.pages.dev"
repoUrl: "https://github.com/marovole/HearthBulter"
featured: true
date: 2025-01-03
lang: zh
otherLocaleSlug: hearthbulter
---

**健康管家（HearthBulter）— hearthbulter.pages.dev**
*把家庭健康从"凭感觉"变成"能动手"。*

## 问题

大多数家庭健康管理都靠感觉：你大概知道谁该吃好点，但这话从来变不成"这周做什么菜""该买什么"。从"我该健康一点"到一份具体计划之间的那道坎，正是所有人放弃的地方。

## 真正重要的几个决定

- **闭环，而不只是记录。** 记体重、记步数的 App 一抓一大把。这个产品跑通了整条链——健康数据进来、算出营养目标、生成食谱、产出购物清单——让数据真正改变端上桌的东西。
- **先把领域建模做对。** 家庭健康牵扯的环节多，数据结构也得跟上：72 张 PostgreSQL 表，按用户、健康数据、营养食谱、购物预算、库存、通知、AI 拆成几大域。前期把数据模型搭对，后面的功能才拼得起来。
- **零成本上线。** Next.js 跑在 Cloudflare Pages，Neon serverless Postgres，认证用 Clerk——整套月成本 $0，没有融资压力也能让项目活着。
- **深集成，而不是广集成。** 电商这块，一个平台做透（Instacart）胜过五个平台做浅，结算直接交回平台，而不是在 App 里重造一遍。

## 它能做什么

家庭档案、健康追踪（体重、体脂、血压、血糖、心率、睡眠）、5000+ 条 USDA 营养数据库、按 7/30/90 天周期的 AI 食谱生成、带 SKU 匹配和预算控制的智能购物、带保质期提醒的库存管理、AI 健康顾问，以及数据报告。

## 工程量

约 377 次提交撑起一个不小的系统——72 张数据表、117+ 服务模块、180+ React 组件、198+ API 端点，全部走一条七阶段的 GitHub Actions 流水线。产品的演进也有据可查：42 个已归档的 OpenSpec 提案，包括从 NextAuth 和 Prisma 的两次迁移。

## 目前进展

在 hearthbulter.pages.dev 上线，跑在 Cloudflare Pages，后端 Neon Postgres，CI/CD 活跃。14 个核心模块里约一半已完整，其余在 70–90% 之间。接下来：Instacart 智能下单、更深的营养报告、家庭健康趋势预测。

## 我的角色

Solo——需求、数据架构、全栈开发到发布流程。
