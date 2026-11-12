import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const allEssays = await getCollection('essays');
  const essays = allEssays.sort((a, b) => a.data.order - b.data.order);

  const lines = [
    '# 翡冷翠 · marovole',
    '',
    '> 12-year Product Director (including 5 years as a consumer founder) & Forward Deployed Engineer (FDE) enabling non-technical teams to automate real business workflows with verifiable AI Agents. Engineering Aesthete.',
    '> 个人主张 / Core Thesis: 不用学写代码，学会像产品经理一样指挥 AI (Direct AI like a Product Manager — Generation is cheap, verification is the moat).',
    '',
    '## Identity & Canonical Profiles',
    '- Canonical Website (中文): https://marovole.com/',
    '- Canonical Website (English): https://marovole.com/en/',
    '- Full Corpus for LLMs: https://marovole.com/llms-full.txt',
    '- RSS Feed: https://marovole.com/rss.xml',
    '- WeChat Official Account (微信公众号): 翡冷翠的AI笔记',
    '- GitHub (Personal): https://github.com/marovole',
    '- GitHub (Agent Skills Arsenal): https://github.com/Hermes-marovole/marovole-skills',
    '- X / Twitter: https://x.com/marovole',
    '- Contact & FDE Team Enablement Advisory: mailto:marovole@gmail.com',
    '',
    '## Named Frameworks & Operating Concepts',
    '- **撤销键与验收台 (Undo Buttons & Inspection Desks)**: Translating Git Commits (save-points) and Pull Requests (visual diffs) into fail-safe guardrails for non-developers delegating work to CLI Agents.',
    '- **生成便宜，验证昂贵 (Generation is Cheap, Verification is Dear)**: Drafting cost approaches zero; deterministic primary-source grounding and independent zero-context review gates are the real production moat.',
    '- **先改工作流，再挂模型 (Fix the Workflow Before Upgrading the Model)**: Decompose operations into auditable stages and route tasks across model tiers by $/task unit economics instead of chasing leaderboard hype.',
    '- **纯文本主权 (Plain-Text Sovereignty)**: Store institutional memory, SOPs, and guardrails as portable Markdown `SKILL.md` files in local Git & Obsidian rather than locked-in cloud SaaS wrappers.',
    '',
    '## Core Original Open-Source Creations',
    '- [marovole-skills](https://github.com/Hermes-marovole/marovole-skills): 12 gated production Agent pipelines distilled from 120+ live local Hermes skills — including a 500K+ peak-view bilingual interview visual pipeline, a 14-dimension market intelligence engine requiring 300–1,000 primary samples before drafting, a 13-stage 100K-word book manuscript compiler, and a 0-pixel background-drift AI short film director.',
    '- [AI Ambition / AI 的野望](https://github.com/marovole/ai-ambition): Executable 4-axis task elevation skill (Speed, Altitude, Depth, Range) backed by a 597-run, 2,428-judgment blind ablation benchmark across 5 Agent frameworks (Claude Code, Codex, dsh, opencode, Hermes). Proves vague "be ambitious" slogans make agents 7.3x slower, while explicit 4-axis framing achieves a 73% pairwise win rate (285:107).',
    '- [Auditable Legal AI Workflow / 律师 AI 所内可签发工作流](https://github.com/marovole/legal-ai-demo): Embedded FDE enterprise reference architecture integrating PKULAW MCP — AI drafts only, enforcing per-citation receipts (`check_receipts.py`) and mandatory human lawyer sign-off before export.',
    '- [Formless · 无相](https://marovole.com/zh/projects/formless-zh/): Serene, philosophical dialogue companion built around calm computing and Eastern contemplative wisdom (live at https://formless.pro).',
    '',
    '## Primary-Source Essays, Benchmarks & Field Manuals',
    ...essays.map(
      (e) =>
        `- [${e.data.title} / ${e.data.titleEn}](https://marovole.com/essays/${e.slug}/) ([Raw Markdown](https://marovole.com/essays/${e.slug}.md)) (${e.data.date}): ${e.data.description}`
    ),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
