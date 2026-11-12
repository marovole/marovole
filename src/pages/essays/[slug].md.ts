import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

export const getStaticPaths: GetStaticPaths = async () => {
  const essays = await getCollection('essays');
  return essays.map((essay) => ({
    params: { slug: essay.slug },
    props: { essay },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const { essay } = props as { essay: Awaited<ReturnType<typeof getCollection<'essays'>>>[number] };
  const takeaways =
    essay.data.takeaways && essay.data.takeaways.length > 0
      ? '\n## 核心实测与核查结论 (Key Verified Findings)\n\n' +
        essay.data.takeaways.map((t) => `- ${t}`).join('\n') +
        '\n'
      : '';

  const md = [
    `# ${essay.data.title}`,
    `> ${essay.data.titleEn}`,
    '',
    `- Author: 翡冷翠 (marovole) — https://marovole.com/`,
    `- Date: ${essay.data.date}`,
    `- Category: ${essay.data.category} / ${essay.data.categoryEn}`,
    `- Canonical URL: https://marovole.com/essays/${essay.slug}/`,
    `- Summary: ${essay.data.description}`,
    takeaways,
    '---',
    '',
    essay.body.trim(),
    '',
  ].join('\n');

  return new Response(md, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
};
