---
id: web3search.zh
title: Web3search
description: 加密研究 AI 平台，专注尽调质量。Deep Research 透明推理链、多模型路由、实时链上数据。
tags: ["AI/LLM", "Web3", "Cloudflare Workers", "React", "Convex"]
image: "/images/projects/web3search.jpg"
demoUrl: "https://web3search.pages.dev"
repoUrl: "https://github.com/marovole/Web3search"
featured: true
date: 2025-01-03
lang: zh
otherLocaleSlug: web3search
---

## 问题背景

加密尽调意味着十几个浏览器标签：价格在这边、持币分布在那边、解锁计划又在另一个地方——而那些号称解决这个问题的"AI 研究工具"，给你一段听起来自信的话，没有任何来源引用。对于涉及真实资金的决策，这比没有工具还糟糕。

## 我的角色

独立开发——产品概念、架构设计、全栈交付。我设计了核心 UX 逻辑，选定了基础设施栈，并搭建了 CI/CD 流水线。

## 关键决策

**让推理过程可见。** 核心功能 Deep Research 以玻璃箱模式运行：你能实时看到推理链和信息来源。信任来自可审查，而不是来自听起来自信。

**按任务路由模型，而非品牌忠诚。** 一个 OpenRouter 网关，不同任务用不同模型——快速响应用于对话，研究调优模型用于深度分析，带兜底路由，单个供应商故障不会让产品崩溃。

**从一开始就选边缘原生。** Cloudflare Workers 处理 API，Convex 处理实时数据。运维开销低，无需守着服务器扩容。

## 功能清单

Deep Research（带可见来源引用）、保持上下文的快速对话、ScamMeter 风险评分、红牌仪表盘、代币持币集中度分析、Vesting 日历、以及会主动提出空头论点的对抗性问答。

## 构建事实

约 423 个 commits——仓库中最活跃的项目。React + TypeScript 前端，Cloudflare Workers + Hono 后端，Convex 存储数据，多源搜索（Brave、Tavily、Serper）带降级兜底。GitHub Actions 每次推送 main 分支即自动部署上线。

## 当前状态

已上线：[web3search.pages.dev](https://web3search.pages.dev)。持续开发中，不公布查询量数据。
