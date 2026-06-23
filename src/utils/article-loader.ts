import fs from 'node:fs';
import path from 'node:path';

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: Date;
  lang: 'en' | 'zh';
  filename: string;
  /** Internal iframe asset path — not a public canonical URL */
  htmlPath: string;
  /** Slug of the paired article in the other locale, if any */
  otherLocaleSlug?: string;
}

const ARTICLES_DIR = path.join(process.cwd(), 'content/articles');
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const ARTICLE_SITE = 'https://marovole.com';

function filenameToSlug(filename: string): string {
  return filename.replace(/\.html$/i, '');
}

function validateSlug(slug: string, filename: string): void {
  if (!SLUG_RE.test(slug)) {
    throw new Error(
      `Invalid article slug "${slug}" from file "${filename}". Use ASCII lowercase letters, digits, and hyphens only (e.g. my-post.html).`
    );
  }
}

function extractTitle(html: string, fallback: string): string {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1]?.replace(/\s+/g, ' ').trim() || fallback;
}

function extractDescription(html: string): string {
  const metaNameFirst = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i
  );
  if (metaNameFirst?.[1]) return metaNameFirst[1].trim();

  const metaContentFirst = html.match(
    /<meta\s+[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i
  );
  if (metaContentFirst?.[1]) return metaContentFirst[1].trim();

  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const source = articleMatch?.[1] ?? html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? '';

  const text = source
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<button[\s\S]*?<\/button>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return '';
  return text.length > 200 ? `${text.slice(0, 200)}…` : text;
}

function detectLang(html: string): 'en' | 'zh' {
  const htmlLang = html.match(/<html[^>]*\slang=["']([^"']+)["']/i)?.[1]?.toLowerCase() ?? '';
  if (htmlLang.startsWith('zh')) return 'zh';
  return 'en';
}

function parseSidecar(yamlPath: string): Record<string, string> {
  if (!fs.existsSync(yamlPath)) return {};

  const overrides: Record<string, string> = {};
  const yaml = fs.readFileSync(yamlPath, 'utf-8');
  for (const line of yaml.split('\n')) {
    const match = line.match(/^([a-zA-Z_]+):\s*(.+)$/);
    if (!match) continue;
    overrides[match[1]] = match[2].trim().replace(/^["']|["']$/g, '');
  }
  return overrides;
}

export function loadArticles(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.html'));
  const articles: ArticleMeta[] = [];
  const slugs = new Set<string>();

  for (const filename of files) {
    const slug = filenameToSlug(filename);
    validateSlug(slug, filename);

    if (slugs.has(slug)) {
      throw new Error(`Duplicate article slug: ${slug}`);
    }
    slugs.add(slug);

    const filePath = path.join(ARTICLES_DIR, filename);
    const html = fs.readFileSync(filePath, 'utf-8');
    const stat = fs.statSync(filePath);
    const overrides = parseSidecar(path.join(ARTICLES_DIR, `${slug}.yml`));

    const lang = overrides.lang === 'en' || overrides.lang === 'zh'
      ? overrides.lang
      : detectLang(html);

    articles.push({
      slug,
      title: overrides.title || extractTitle(html, slug),
      description: overrides.description || extractDescription(html),
      date: overrides.date ? new Date(overrides.date) : stat.mtime,
      lang,
      filename,
      htmlPath: `/article-frames/${filename}`,
      otherLocaleSlug: overrides.otherLocaleSlug || undefined,
    });
  }

  return articles.sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function loadArticlesForLocale(locale: 'en' | 'zh'): ArticleMeta[] {
  return loadArticles().filter((article) => article.lang === locale);
}

export function articleDetailPath(article: ArticleMeta): string {
  const prefix = article.lang === 'zh' ? '/zh' : '';
  return `${prefix}/articles/${article.slug}`;
}

export function getArticleLangPaths(
  article: ArticleMeta,
  articles: ArticleMeta[] = loadArticles()
): { en: string; zh: string } | undefined {
  if (!article.otherLocaleSlug) return undefined;

  const other = articles.find((candidate) => candidate.slug === article.otherLocaleSlug);
  if (!other || other.lang === article.lang) return undefined;

  const enArticle = article.lang === 'en' ? article : other;
  const zhArticle = article.lang === 'zh' ? article : other;

  return {
    en: articleDetailPath(enArticle),
    zh: articleDetailPath(zhArticle),
  };
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return loadArticles().find((article) => article.slug === slug);
}
