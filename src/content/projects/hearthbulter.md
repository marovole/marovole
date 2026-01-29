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
---

## Core Features

- **Data-Driven Nutrition Planning**: Integration with health reports and wearable device data, automatic BMR/TDEE calculation
- **Smart Recipe Generation**: 7-day/30-day/90-day periodic meal plans, dynamically adapting to seasons and inventory
- **E-commerce Automated Purchasing**: One-click shopping list generation with SKU matching
- **Health Data Loop**: Visualized trends, AI analysis of nutritional imbalances

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: Cloudflare Functions + Prisma + NextAuth.js
- **Database**: Supabase PostgreSQL (71 tables)
- **AI**: OpenAI GPT-4
- **Caching**: Upstash Redis
