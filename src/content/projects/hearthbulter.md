---
title: HearthBulter
description: Family health, run on data instead of guesswork. Health tracking, AI nutrition planning, smart recipe generation, and e-commerce purchasing.
tags: ["Next.js", "AI", "Health Management", "Cloudflare Pages", "Neon PostgreSQL"]
image: "/images/projects/hearthbulter.jpg"
demoUrl: "https://hearthbulter.pages.dev"
repoUrl: "https://github.com/marovole/HearthBulter"
featured: true
date: 2025-01-03
lang: en
otherLocaleSlug: hearthbulter-zh
---

**HearthBulter — hearthbulter.pages.dev**
*Family health, run on data instead of guesswork.*

## The problem

Most family health management runs on vibes: you sort of know someone should eat better, but it never turns into what to cook this week or what to buy. The gap between "I should be healthier" and a specific plan is where everyone quits.

## The decisions that mattered

- **Close the loop, don't just track.** Plenty of apps log weight and steps. This one runs the whole chain — health data in, nutrition targets calculated, meal plans generated, shopping list out — so the data actually changes what lands on the table.
- **Model the domain properly.** Family health touches a lot of moving parts, so the schema does too: 72 PostgreSQL tables split across users, health data, nutrition and recipes, shopping and budget, inventory, notifications, and AI. Getting the data model right up front is what made the features composable.
- **Ship at zero cost.** Next.js on Cloudflare Pages, Neon serverless Postgres, Clerk for auth — a stack that runs at $0/month, so the project stays alive without funding pressure.
- **Integrate deep, not wide.** For e-commerce, one platform done properly (Instacart) beats five done shallowly, with checkout handed back to the platform rather than rebuilt in-app.

## What it does

Family profiles, health tracking (weight, body fat, blood pressure, glucose, heart rate, sleep), a 5,000+ item USDA nutrition database, AI recipe generation on 7/30/90-day cycles, smart shopping with SKU matching and budget control, inventory with expiry reminders, an AI health advisor, and reporting.

## The build

Around 377 commits powering a large system — 72 database tables, 117+ service modules, 180+ React components, 198+ API endpoints, all moving through a seven-stage GitHub Actions pipeline. The product's evolution is on the record too: 42 archived OpenSpec proposals, including the migrations off NextAuth and off Prisma.

## Where it stands

Running at hearthbulter.pages.dev on Cloudflare Pages with a Neon Postgres backend and active CI/CD. Of 14 core modules, about half are fully done and the rest are 70–90% there. Next up: Instacart smart ordering, deeper nutrition reporting, and family health-trend prediction.

## My role

Solo — requirements, data architecture, full-stack build, and release process.
