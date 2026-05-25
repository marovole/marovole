---
title: Web3search
description: AI-driven Web3 research platform for decentralized data retrieval and analysis. Supports deep research, real-time price data, and multi-model AI routing.
tags: ["AI/LLM", "Web3", "Cloudflare Workers", "React", "Convex"]
image: "/images/projects/web3search.jpg"
demoUrl: "https://web3search.pages.dev"
repoUrl: "https://github.com/marovole/Web3search"
featured: true
date: 2025-01-03
lang: en
otherLocaleSlug: web3search-zh
---

Researching a Web3 project in 2024 meant opening twelve tabs simultaneously: CoinGecko for price history, Etherscan for on-chain activity, Twitter for sentiment, the project's own docs, and at least two audit reports you couldn't evaluate without a Solidity background. Existing research tools aggregated data but hid their reasoning. You got a score, not an argument.

Web3search is a research platform that shows its work. Every source consulted, every query run, every confidence signal—visible in real time as the research unfolds. Online at [web3search.pages.dev](https://web3search.pages.dev).

## The Problem

Trust in Web3 is cheap to fake and expensive to verify. The gap between what project teams know and what retail investors can find out is enormous. The tools that existed either oversimplified the risk picture or required expert knowledge to interpret. I wanted to build something that made rigorous analysis accessible without dumbing it down—transparent by design, not by accident.

## My Role

Solo developer and product designer. Architected the multi-source search pipeline, designed the Glass Box UX pattern, and built the risk assessment framework from scratch.

## Key Decisions

**Glass Box UX as a first-class principle.**
Most AI research tools are black boxes: you ask, they answer. In Web3, where rug pulls and coordinated manipulation are documented risks, that trust model is broken. Glass Box means the interface exposes every step of its reasoning in real time—which queries it ran, which sources it read, how it weighted conflicting signals. Users can challenge the process, not just the conclusion. This is the core differentiator and the hardest thing to build correctly.

**Multi-model routing via OpenRouter.**
Different research tasks need different models. Synthesizing a 50-page whitepaper benefits from extended context. Quick factual lookups don't justify the cost. OpenRouter lets me route specific task types to specific models—DeepSeek for cost-sensitive queries, GPT-4 for synthesis—without the client knowing or caring about the routing logic. The abstraction makes model iteration cheap.

**Cloudflare Workers + Hono for the backend.**
Edge deployment matters for a research tool where latency kills momentum. Hono is TypeScript-first with near-zero overhead—the right choice for a Workers environment where cold starts and bundle size are real constraints.

## What Ships

- **Deep Research**: transparent AI pipeline with real-time process display; users see every source and reasoning step as it happens
- **Red Flag Dashboard**: automatic risk signal detection across project fundamentals
- **ScamMeter**: multi-dimensional scam risk score with per-factor breakdown
- **Token Distribution Analysis**: whale concentration and insider share detection
- **Token Unlock Calendar**: vesting schedule tracking with alert system
- **Real-time price feeds**: low-latency data via edge caching

## What I Learned

The Glass Box pattern is more than a UX choice—it's an accountability structure. When the research process is visible, users engage differently. They catch errors. They ask follow-up questions about specific sources. They trust conclusions more because they can trace the reasoning.

The hardest engineering problem was maintaining conversation context across turns in a stateless edge environment. Workers KV session state solved it, but the design required thinking through what "session" means when a user closes and reopens a tab mid-research.
