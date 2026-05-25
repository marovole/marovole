---
title: Web3search
description: AI research platform for crypto due diligence. Deep Research with visible reasoning chains, multi-model routing, real-time on-chain data.
tags: ["AI/LLM", "Web3", "Cloudflare Workers", "React", "Convex"]
image: "/images/projects/web3search.jpg"
demoUrl: "https://web3search.pages.dev"
repoUrl: "https://github.com/marovole/Web3search"
featured: true
date: 2025-01-03
lang: en
otherLocaleSlug: web3search-zh
---

## The Problem

Crypto due diligence means a dozen browser tabs: price here, holder distribution there, unlock schedule somewhere else — and the "AI research" tools that promise to fix this hand you a confident paragraph with no citations. For money decisions, that's worse than useless.

## My Role

Solo — product concept, architecture, and full-stack build. I designed the core UX logic, chose the infra stack, and shipped the CI/CD pipeline.

## Key Decisions

**Show the work.** The main feature, Deep Research, runs as a glass box: you watch the reasoning chain and the sources in real time. Trust comes from being auditable, not from sounding confident.

**Route models by task, not brand loyalty.** One OpenRouter gateway, different models for different jobs — fast responses for chat, research-tuned models for deep dives, with fallback routing so a single provider outage doesn't kill the product.

**Edge-native from day one.** Cloudflare Workers for the API, Convex for real-time data. Low ops overhead; scales without me babysitting servers.

## What It Does

Deep Research with visible source citations, quick chat with context memory, a ScamMeter risk score, a red-flag dashboard, token holder concentration analysis, a vesting calendar, and adversarial Q&A that surfaces the bear case on any project.

## Build Facts

Around 423 commits — the most active project in my repos. React + TypeScript frontend, Cloudflare Workers + Hono backend, Convex for data, multi-source search (Brave, Tavily, Serper) with fallback. GitHub Actions ships to production on every push to main.

## Status

Live at [web3search.pages.dev](https://web3search.pages.dev). Active development. No query volumes published.
