---
title: HearthBulter
description: "A full-stack engine that moves family health management from gut feeling to data: AI nutrition planning, smart recipes, and Instacart-backed grocery resupply in one loop."
tags: ["Next.js", "AI", "Health Management", "Cloudflare Pages", "Convex"]
image: "/images/projects/hearthbulter.jpg"
demoUrl: "https://healthbutler.life/"
repoUrl: "https://github.com/marovole/HearthBulter"
featured: true
date: 2025-01-03
lang: en
otherLocaleSlug: hearthbulter-zh
---

## Background

Personal and family health management gets stuck on gut feeling: you eat by instinct, shop by impression, and forget the checkup report the day after. I wanted an engine that turns health decisions into data: from health metrics, to what to eat each day, to what to buy, closing the loop. This is a real personal public project, not a toy assignment.

## My Role

Solo developer, AI-assisted throughout: product definition, a 76-table data model, frontend/backend, CI/CD, and deployment.

## Process & Key Decisions

- **Serverless-first, runs on free tiers**: Cloudflare Pages + OpenNext to keep a full-stack app running at near-zero hosting cost; for a personal project, sustainability beats scale.
- **The data layer was a moving target**: the repo history shows the evolution from Prisma to Supabase, Neon Postgres, and Convex. The current schema defines 76 tables on Convex, spanning family profiles, health data, a nutrition database, recipes, inventory, budgeting, shopping, notifications, and community across roughly 30 domains. Real projects are not done right on the first pass.
- **A personal project held to team standards**: a 7-stage GitHub Actions pipeline (quality -> type-check -> unit tests -> build -> Cloudflare build -> security audit -> summary), plus Sentry monitoring, Upstash Redis caching, Clerk auth, and Zod validation.
- **AI wired into real steps, not a label**: OpenAI for nutrition analysis and recipe generation; Tesseract.js OCR to extract metrics from checkup reports; Instacart for grocery resupply.

## Results & Boundaries

- **Live**: [healthbutler.life](https://healthbutler.life/) (returns 200, zh-CN); **source public**: [github.com/marovole/HearthBulter](https://github.com/marovole/HearthBulter).
- **Verifiable modeling scale**: `convex/schema.ts` defines 76 tables across roughly 30 modules.
- **Honest boundaries**: a personal public project with no public user, retention, or revenue numbers, so there are no fabricated growth metrics. Wearable sync, checkup-report OCR, and Instacart ordering exist as modules/integrations in code and docs; they are implemented capabilities, not proven outcomes.

## Evidence

- Demo (200): healthbutler.life
- Source (public repo): github.com/marovole/HearthBulter
- Stack & table count: `package.json`, `convex/schema.ts`, `.github/workflows/ci.yml`, README, git commit history
