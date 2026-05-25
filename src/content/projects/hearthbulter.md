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

I built HearthBulter because I was frustrated by a specific problem: health data lives in silos. Your lab report is in one app, your shopping list is in another, and your nutritionist's advice is in a PDF you haven't opened in two months. Nobody connects what you *should* eat to what actually ends up in your refrigerator.

HearthBulter is a diet engine that reads your health baseline—lab reports, wearable data, or manual input—and translates it into a weekly meal plan, recipe instructions, and a one-click grocery order. The loop closes when food arrives.

## The Problem

Family health management has a coordination failure at its core. Tracking what you should eat is a solved problem. Tracking what you did eat is solved. Getting the right food into your house automatically, based on your actual health data—nobody had done that end-to-end.

## My Role

Solo developer and product owner. Designed the schema, built the API layer, connected the AI generation pipeline, and deployed to production at [healthbutler.life](https://healthbutler.life/).

## Key Decisions

**71-table schema from day one.**
Health data is relational, not flat. A meal plan links to nutritional targets, which link to health baselines, which link to household members—each with their own medical history and dietary restrictions. The temptation in early projects is to store everything in JSON blobs and figure out structure "later." I resisted that. The upfront schema complexity paid off in the AI generation layer: the LLM has structured context to reason against, not free-form text.

**Cloudflare Functions over traditional server.**
The target user checks meal plans on a phone in a supermarket. Edge deployment means the API responds from the nearest datacenter. Combined with Upstash Redis caching for calculated values (BMR/TDEE don't change daily), the app feels fast on mobile even under load.

**GPT-4 for recipe generation, not template filling.**
Early prototypes used rule-based meal generation—pick a protein, a carb, a vegetable, done. The plans were technically correct but joyless. Switching to GPT-4 with structured health context injected into the prompt produced plans that adapt to seasons, local cuisine, and pantry availability. The meals feel designed, not computed.

## What Ships

- **Nutritional onboarding**: input lab results, wearable data, or manual health parameters
- **AI-generated meal plans**: 7-day, 30-day, or 90-day horizons with full nutritional breakdown
- **Shopping list automation**: plan-to-cart in one click, SKU-matched to supported e-commerce platforms
- **Health trend visualization**: track actuals against targets over time

## What I Learned

71 tables taught me that data model decisions compound. The tables added in week one constrained what was possible in week twelve. I would spend more time on the schema before writing a single line of application code.

The AI-to-e-commerce bridge is where users' eyes light up. That "click and food appears" moment is the product's core value—everything before it is setup.
