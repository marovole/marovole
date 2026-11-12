#!/usr/bin/env node
/**
 * Sync a verified WeChat longform Markdown file from ai-kuaixun-content into src/content/essays/
 * Usage: node scripts/sync-essay.mjs <path-to-article.md> --slug <slug> --title-en "<English Title>"
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
if (args.length < 1) {
  console.log('Usage: node scripts/sync-essay.mjs <article.md> [--slug custom-slug] [--title-en "English Title"]');
  process.exit(1);
}

const srcFile = path.resolve(args[0]);
const raw = fs.readFileSync(srcFile, 'utf8');
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n+([\s\S]*)$/);
if (!fmMatch) {
  console.error('No YAML frontmatter found in source markdown.');
  process.exit(1);
}

const [, fmRaw, body] = fmMatch;
const getField = (k) => {
  const m = fmRaw.match(new RegExp(`^${k}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : '';
};

const dirName = path.basename(path.dirname(srcFile));
const dateMatch = dirName.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
const date = dateMatch ? dateMatch[1] : new Date().toISOString().slice(0, 10);
const slugIdx = args.indexOf('--slug');
const slug = slugIdx !== -1 ? args[slugIdx + 1] : (dateMatch ? dateMatch[2] : dirName);
const enIdx = args.indexOf('--title-en');
const title = getField('title') || slug;
const titleEn = enIdx !== -1 ? args[enIdx + 1] : title;
const digest = getField('digest') || title;
const category = getField('cover_kicker') || '深度判断';

const outFile = path.resolve(process.cwd(), `src/content/essays/${slug}.md`);
const outContent = [
  '---',
  `title: ${JSON.stringify(title)}`,
  `titleEn: ${JSON.stringify(titleEn)}`,
  `description: ${JSON.stringify(digest)}`,
  `descriptionEn: ${JSON.stringify(digest)}`,
  `category: ${JSON.stringify(category)}`,
  `categoryEn: "Field Note"`,
  `date: ${JSON.stringify(date)}`,
  `cover: "/images/essays/card-undo.jpg"`,
  `order: 10`,
  '---',
  '',
  body.trim(),
  '',
].join('\n');

fs.writeFileSync(outFile, outContent, 'utf8');
console.log(`Synced essay -> ${outFile}`);
