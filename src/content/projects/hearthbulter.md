---
title: 健康管家 (HearthBulter)
description: 基于健康数据与电商库存的动态饮食引擎。AI 营养规划、智能食谱生成和电商自动采购的家庭健康管理平台
tags: ["Next.js", "AI", "健康管理", "Cloudflare Pages", "Supabase"]
demoUrl: "https://hearthbulter.pages.dev"
repoUrl: "https://github.com/marovole/HearthBulter"
featured: false
date: 2025-01-03
---

## 核心功能

- **数据驱动的营养规划**: 接入体检报告和可穿戴设备数据，BMR/TDEE 自动计算
- **智能食谱生成**: 7 天/30 天/90 天周期性食谱计划，动态适配季节和库存
- **电商自动采购**: 一键生成购物清单并匹配 SKU
- **健康数据闭环**: 可视化趋势，AI 分析营养失衡

## 技术栈

- **前端**: Next.js 14 + React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **后端**: Cloudflare Functions + Prisma + NextAuth.js
- **数据库**: Supabase PostgreSQL (71 张数据表)
- **AI**: OpenAI GPT-4
- **缓存**: Upstash Redis
