---
title: Web3search
description: AI-driven Web3 research platform for decentralized data retrieval and analysis. Supports deep research, real-time price data, and multi-model AI routing.
tags: ["AI/LLM", "Web3", "Cloudflare Workers", "React", "Supabase"]
image: "/images/projects/web3search.jpg"
demoUrl: "https://lulaai.xyz"
repoUrl: "https://github.com/marovole/Web3search"
featured: true
date: 2025-01-03
lang: en
otherLocaleSlug: web3search-zh
---

## The Problem I Was Trying to Solve

Web3 research is hostile by design.

The data exists — blockchain transactions are public, token distributions are on-chain, team histories are traceable — but extracting signal from noise is brutal. Real research on a new protocol takes hours: scraping docs, reading whitepapers, cross-referencing tokenomics, checking whale wallet behavior, verifying vesting schedules, judging the credibility of the team.

Most people don't do this. They read Twitter threads and make decisions based on social momentum. Scammers know this and exploit it systematically.

The existing tools don't help much. Price trackers show you lagging indicators. On-chain explorers show you raw data with no interpretation. AI assistants hallucinate token facts with alarming confidence. The gap between "I want to understand this project" and "I have enough signal to make a decision" remains large.

Web3search is my attempt to compress that gap — to make rigorous research accessible in minutes rather than hours, and to surface red flags automatically rather than hoping users know what to look for.

## What I Built and Why

**Role:** Solo designer and developer — responsible for the product concept, UX architecture, AI integration, backend infrastructure, and deployment.

The product has three core components that solve different parts of the research problem:

**Deep Research** answers "what is this project?" — it runs multi-source queries, synthesizes documentation, and produces a structured briefing with citations.

**ScamMeter** answers "should I trust this?" — it scores a project across multiple risk dimensions: team anonymity, token concentration, vesting cliff timing, contract verification, social proof quality.

**Token Distribution Analysis** answers "who actually holds this?" — whale concentration, exchange vs. retail balance, unlock schedule pressure.

### The Glass Box UX Decision

The defining design choice in Web3search is what I call Glass Box UX: the AI shows its thinking chain in real time as it researches.

In most AI products, the answer appears after a loading spinner. You get the conclusion without the reasoning. In a domain where trust is scarce and mistakes are expensive, that's the wrong tradeoff.

Showing the thinking chain does several things:

1. Users can catch errors in real time — if the AI misidentifies a token ticker, they see it happen and know to correct the query
2. The research process itself is educational — users learn what questions matter by watching which ones the AI pursues
3. Transparency is a credibility signal — in Web3, opacity is a red flag, so the product being transparent about its own process reinforces the right instinct

The implementation uses streaming responses with structured state — each reasoning step emits as it completes, and the UI renders them progressively with source attribution.

### Multi-Model AI Routing

I route across three different AI backends via OpenRouter: DeepSeek, GPT, and Tongyi Qianwen. The routing logic isn't random — different query types get different models based on cost-quality tradeoffs.

Factual lookups and data extraction go to cheaper, faster models. Complex reasoning about a project's economic design or team credibility signals go to stronger models. The user doesn't see this routing — they just see consistent quality at reasonable cost.

This was an architecture call against using a single model for everything. Single-model approaches either overspend on simple queries or underspend on complex ones. Multi-model routing lets the system optimize per-query rather than per-session.

### Search Layer: Multiple Sources, Not One

I use Brave Search, Tavily, and Serper in combination rather than a single search provider. Each has different indexing characteristics:

- Brave skews toward newer content and has less SEO spam in Web3 results
- Tavily is better at finding technical documentation and GitHub content
- Serper gives broader coverage for news and social mentions

The orchestration layer queries multiple sources simultaneously and deduplicates before passing to the reasoning model. This produces richer research than any single source would.

### Infrastructure: Why Cloudflare Workers + Hono

Web3search has latency requirements that don't play well with traditional server deployments. Real-time price data means sub-second API calls. Streaming reasoning chains mean long-lived connections. Users are globally distributed.

Cloudflare Workers run at the edge in 300+ locations, eliminating geographic latency. Hono is a lightweight router with first-class TypeScript support that runs natively on Workers — the combination handles high-concurrency streaming without cold-start penalties.

Supabase manages conversation history and user sessions. Multi-round context preservation (remembering what was asked three questions ago) is important for exploratory research workflows — users drill down, not just query once.

## The Hardest Parts

**Preventing confident hallucinations.** AI models that have ingested Web3 content often have stale or incorrect token data from training. The naive approach — just ask the model about a token — produces plausible-sounding wrong answers.

The solution is enforced retrieval: the model cannot answer from training data alone. Every factual claim must be grounded in real-time retrieved content. The model's job is interpretation and synthesis, not recall. This required careful prompt architecture and output validation to catch cases where the model slipped back into training-data mode.

**ScamMeter calibration.** A scam score is a strong claim. Getting the dimensions right — what actually predicts a rug pull versus a legitimate project with aggressive tokenomics — required studying real cases. The current model is explicit about what it's measuring and what it's not, and it outputs a breakdown rather than a single number, precisely because a single number would imply more precision than the system has.

**Streaming UX under variable latency.** The research pipeline has multiple async stages with different completion times. Getting the streaming UX right so that partial results are useful rather than confusing required careful state management. A user shouldn't stare at a half-rendered analysis and not know whether the system is stuck or still working.

## Results and Current State

Web3search is live at [lulaai.xyz](https://lulaai.xyz) as a working research tool. The core research loop — query in, multi-source research, Glass Box reasoning, structured output — functions end-to-end.

What's demonstrated concretely:

- Multi-model routing reduces per-query cost while maintaining quality on complex analysis
- Glass Box UX increases user engagement with the research process — anecdotally, users spend more time reading the reasoning chain than the summary
- The ScamMeter framework surfaces structured risk signals that single-indicator tools miss

This is a working prototype with real utility, not a polished consumer product. The AI routing and search layer architecture would scale; the UX and coverage would need iteration based on real user feedback.

## What I Learned

The central insight: **in low-trust environments, the process of arriving at an answer matters as much as the answer itself.**

Web3 is a domain where people have been burned by confident, wrong information — from influencers, from projects, from each other. A tool that shows its work isn't just being transparent; it's offering a different relationship with AI output. The user becomes a collaborator in the research rather than a consumer of conclusions.

The second lesson: **multi-model routing is underrated.** The cost difference between running everything on a strong model versus routing by query complexity is significant at volume. Building that routing layer is more engineering work upfront, but it's the right long-term architecture for any AI product that needs to be economically sustainable.

If I were building this again, I'd prioritize the ScamMeter calibration earlier. Getting that scoring model right is the hardest and most valuable part of the product — and it's also the part where wrong answers are most consequential.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Vite + TailwindCSS + Radix UI |
| Backend | Cloudflare Workers + Hono + TypeScript |
| Database | Supabase PostgreSQL |
| AI | OpenRouter multi-model routing (DeepSeek, GPT, Tongyi) |
| Search | Brave Search + Tavily + Serper |
