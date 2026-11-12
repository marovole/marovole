import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export const GET: APIRoute = async () => {
  const allEssays = await getCollection('essays');
  const essays = allEssays.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  const items = essays
    .map((e) => {
      const url = `https://marovole.com/essays/${e.slug}/`;
      const pubDate = new Date(`${e.data.date}T08:00:00+08:00`).toUTCString();
      return `    <item>
      <title>${escapeXml(e.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(e.data.category)}</category>
      <description>${escapeXml(e.data.description)}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>翡冷翠 · marovole — 说明书与判断</title>
    <link>https://marovole.com/</link>
    <description>12 年产品经理与一线 FDE。不用学写代码，学会像产品经理一样指挥 AI。</description>
    <language>zh-CN</language>
    <atom:link href="https://marovole.com/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
