---
title: HearthBulter
description: Dynamic diet engine based on health data and e-commerce inventory. AI nutrition planning, smart recipe generation, and automated e-commerce purchasing for family health management.
tags: ["Next.js", "AI", "Health Management", "Cloudflare Pages", "Supabase"]
image: "/images/projects/hearthbulter.jpg"
demoUrl: "https://healthbutler.life/"
repoUrl: "https://github.com/marovole/HearthBulter"
featured: true
date: 2025-01-03
lang: en
otherLocaleSlug: hearthbulter-zh
---

## The Problem I Was Trying to Solve

Every year, millions of people get their annual health check. The report lands in a folder and stays there. Not because they don't care — because there's no bridge between "your triglycerides are elevated" and "here's what to eat on Tuesday."

I've watched this play out in my own family. Health data exists, the intention to change exists, but the friction is enormous: interpret the report, learn which foods help, plan a week of meals, figure out what to buy, actually go buy it. Each step is a separate cognitive load. Most people collapse somewhere in the middle.

Nutrition apps tell you calories. Recipe apps tell you what to cook. Grocery apps tell you what to buy. None of them talk to each other, and none of them know about your bloodwork.

HearthBulter is my attempt to close that loop.

## What I Built and Why

**Role:** Solo designer and developer — responsible for the entire product: data architecture, AI integration, UX, and deployment infrastructure.

The core idea: if you feed the system your health data (lab reports, wearable metrics), it should be able to reason about your nutritional gaps, generate a meal plan calibrated to your actual numbers, and then produce a shopping list that maps directly to purchasable SKUs.

That's three systems that normally live in separate worlds — health analytics, meal planning, and e-commerce — stitched together through a shared data model.

### Why 71 Database Tables

The database schema is the part I'm most proud of, and also the part that took the longest to get right. Seventy-one tables isn't bloat — it's what honest health data modeling looks like.

Consider what you need to represent properly:

- Health markers have units, reference ranges, trend history, and source credibility
- Nutrients exist at the ingredient level, the recipe level, and the meal-plan level — with different precision at each
- Recipes must know about substitutions, seasonal availability, and cooking method impacts on nutrition
- Shopping items need to map to real SKUs across different e-commerce platforms with price variance
- User profiles carry preferences, allergies, household size, and budget constraints that affect every recommendation

Each of these domains has its own internal complexity. The 71 tables reflect that complexity rather than hiding it behind a leaky abstraction. I made a deliberate choice to model the domain correctly rather than shipping something fast that would need to be rebuilt in six months.

### AI Integration Choices

I used OpenAI GPT-4 for the reasoning layer, with Upstash Redis for caching repeated nutritional lookups. The AI's job is interpretation and personalization — not data retrieval, which stays in Postgres.

Key decision: the AI never invents nutritional data. All nutrient values are pre-loaded from verified sources. The AI's role is to reason over that data and your health markers, not to hallucinate calorie counts. This matters in health contexts where wrong information has real consequences.

### Infrastructure: Why Cloudflare + Supabase

Cloudflare Pages for deployment because the target users are families — meaning multiple household members in potentially different locations. Edge distribution matters for perceived latency. Cloudflare Functions handle the API layer without cold-start penalties.

Supabase for the database layer because the combination of Postgres (correctness, complex queries), Row Level Security (per-user data isolation), and real-time subscriptions (for the health data feed) covers the requirements without requiring a separate auth service or WebSocket infrastructure.

NextAuth.js handles authentication because families need shared-but-separate profiles — one account, multiple health contexts.

## The Hardest Parts

**The meal-to-SKU mapping problem.** Generating a recipe is tractable. Mapping "200g boneless chicken thigh, preferably organic" to a purchasable product in a user's preferred grocery chain, accounting for regional availability and price, is genuinely hard. The current approach uses structured search against product catalogs with a fallback to approximate matching. It works, but it's the part of the system most likely to produce a mildly wrong answer.

**Health data normalization.** Lab reports arrive in different formats with different units and reference ranges. A hemoglobin value from one lab isn't directly comparable to another without knowing the lab's methodology. I built a normalization layer, but I was careful to surface uncertainty rather than paper over it. The system shows users which data points it's confident about and which it's treating as approximate.

**Avoiding overclaiming.** It would be easy to say "this AI will transform your health." I was deliberate about framing — the system helps you eat more consistently with your health data, not cure anything. That framing constraint shaped product decisions throughout: every recommendation comes with a source, every plan comes with an edit button.

## Results and Current State

HearthBulter is live at [healthbutler.life](https://healthbutler.life/) as a working prototype. The core loop — health data in, meal plan out, shopping list generated — functions end-to-end.

What I can say concretely:

- The data architecture supports the full feature set without schema compromises
- The AI integration produces nutritionally coherent meal plans when given well-structured health data
- The e-commerce matching covers major product categories for a standard household

This is not yet a consumer-scale product. It's a proof of concept that the loop is closable — that the technical problem is solved. Scaling it to handle diverse lab formats, more e-commerce integrations, and higher traffic would be the next phase.

## What I Learned

The biggest lesson: **complexity that serves the user is different from complexity that serves the engineer.** Seventy-one database tables can be an engineering ego trip or a genuine attempt to model a domain accurately. The test is whether simplifying any part of it would break something real.

The second lesson: **health is a domain where honest uncertainty is a feature, not a bug.** The temptation to make the AI sound authoritative is high. The right product decision is to surface what the system doesn't know as clearly as what it does.

If I were building this again, I'd spend less time on the AI reasoning layer (GPT-4 handles it fine) and more time on the data ingestion layer — getting health data in cleanly is the actual bottleneck, not the intelligence applied to it.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 + React 18 + TypeScript + Tailwind CSS + shadcn/ui |
| Backend | Cloudflare Functions + Prisma + NextAuth.js |
| Database | Supabase PostgreSQL (71 tables) |
| AI | OpenAI GPT-4 |
| Caching | Upstash Redis |
