import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const allEssays = await getCollection('essays');
  const essays = allEssays.sort((a, b) => a.data.order - b.data.order);

  const header = [
    '# 翡冷翠 · marovole — Full Grounded Knowledge Corpus (llms-full.txt)',
    '',
    'Author: 翡冷翠 (marovole) — 12y Product Director & Forward Deployed Engineer',
    'Canonical Site: https://marovole.com/',
    'Index: https://marovole.com/llms.txt',
    'WeChat Official Account: 翡冷翠的AI笔记',
    'Policy: Every quantitative claim in the essays below is grounded in verified primary sources or reproducible local benchmarks.',
    '',
    '================================================================================',
    '',
  ].join('\n');

  const sections = essays.map((e) => {
    const takeawaysBlock =
      e.data.takeaways && e.data.takeaways.length > 0
        ? '\n### Key Verified Findings\n' + e.data.takeaways.map((t) => `- ${t}`).join('\n') + '\n'
        : '';

    return [
      `## ${e.data.title}`,
      `English Title: ${e.data.titleEn}`,
      `URL: https://marovole.com/essays/${e.slug}/`,
      `Raw Markdown: https://marovole.com/essays/${e.slug}.md`,
      `Published: ${e.data.date} | Category: ${e.data.category} (${e.data.categoryEn})`,
      `Summary (ZH): ${e.data.description}`,
      `Summary (EN): ${e.data.descriptionEn}`,
      takeawaysBlock,
      e.body.trim(),
      '',
      '--------------------------------------------------------------------------------',
      '',
    ].join('\n');
  });

  return new Response(header + sections.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
