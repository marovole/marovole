---
id: web3search.zh
title: Web3search
description: 会把推理过程摊开给你看的加密研究台。深度研究、ScamMeter 风险评估、多模型 AI 路由。
tags: ["AI/LLM", "Web3", "Cloudflare Workers", "React", "Convex"]
image: "/images/projects/web3search.jpg"
demoUrl: "https://web3search.pages.dev"
repoUrl: "https://github.com/marovole/Web3search"
featured: true
date: 2025-01-03
lang: zh
otherLocaleSlug: web3search
---

**Web3search — web3search.pages.dev**
*会把推理过程摊开给你看的加密研究台。*

## 问题

加密尽调散落在十几个标签页里——价格在这、持币数据在那、解锁时间表又在别处——而那些号称能解决这事的"AI 研究"工具，丢给你一段语气笃定却无从核实的话。在和钱有关的决策里，这比没有还糟。

## 真正重要的几个决定

- **把过程摊开。** 核心功能 Deep Research 用玻璃盒方式跑：你能实时看到推理链和数据来源，而不是收到一个黑盒结论。信任来自可核查。
- **按任务选模型，而不是按偏好。** 一个 OpenRouter 网关，不同任务用不同模型——快问快答用快的，深度研究用研究型的，再加一层 fallback，单家供应商挂了产品不至于跟着挂。
- **边缘 Serverless。** API 跑在 Cloudflare Workers 上，实时数据用 Convex。成本低，扩容也不用我盯着服务器。

## 它能做什么

带可见来源的深度研究、保留上下文的快问快答、ScamMeter 诈骗评分、红牌风险面板、持币集中度分析、代币解锁日历，还有一个会站在反方挑刺的对抗性问答，让你看到看空的理由。

## 工程量

约 423 次提交，是我所有仓库里最活跃的一个。前端 React + TypeScript，后端 Cloudflare Workers + Hono，数据用 Convex，多源搜索（Brave、Tavily、Serper）带 fallback，GitHub Actions 在每次合入 main 时自动发到生产。

## 目前进展

在 web3search.pages.dev 上线，API 跑在 Cloudflare Workers；状态为活跃开发中。

## 我的角色

Solo——架构、全栈开发到 CI/CD。
