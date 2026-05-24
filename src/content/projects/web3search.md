---
title: Web3search
description: Crypto research that shows its work. Deep Research with visible sourcing, ScamMeter risk scores, and multi-model AI routing.
tags: ["AI/LLM", "Web3", "Cloudflare Workers", "React", "Convex"]
image: "/images/projects/web3search.jpg"
demoUrl: "https://web3search.pages.dev"
repoUrl: "https://github.com/marovole/Web3search"
featured: true
date: 2025-01-03
lang: en
otherLocaleSlug: web3search-zh
---

**Web3search — web3search.pages.dev**
*Crypto research that shows its work.*

## The problem

Crypto due diligence is scattered across a dozen tabs — price here, holder data there, unlock schedule somewhere else — and the "AI research" tools that promise to fix this hand you a confident paragraph with no way to check it. For money decisions, that's worse than useless.

## The decisions that mattered

- **Show the work.** The core feature, Deep Research, runs as a glass box: you watch the reasoning chain and the sources in real time instead of getting a black-box verdict. Trust comes from being able to check.
- **Route models by job, not loyalty.** One OpenRouter gateway, different models for different tasks — a fast one for quick chat, a research-tuned one for deep dives, and a fallback so a single provider's outage doesn't take the product down.
- **Serverless on the edge.** Cloudflare Workers for the API, Convex for real-time data. It runs cheap and scales without me babysitting servers.

## What it does

Deep Research with visible sourcing, quick chat that keeps context, a ScamMeter risk score, a red-flag dashboard, holder-concentration analysis, a token-unlock calendar, and adversarial Q&A that argues against a project so you see the bear case.

## The build

Around 423 commits — the most active project in my repos. React + TypeScript front end, Cloudflare Workers + Hono back end, Convex for data, multi-source search (Brave, Tavily, Serper) with fallback, and GitHub Actions shipping to production on every push to main.

## Where it stands

Live at web3search.pages.dev with the API on Cloudflare Workers; status is active development.

## My role

Solo — architecture, full-stack build, and CI/CD.
