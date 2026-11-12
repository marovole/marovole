#!/usr/bin/env node
/**
 * Ping IndexNow (Bing / ChatGPT Search / Yandex shared index) with all URLs from dist/sitemap-0.xml
 * Usage: node scripts/indexnow-ping.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const HOST = 'marovole.com';
const KEY = 'b80f4c2e9a714d3685e0c19274fa63d8';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemapPath = path.resolve(process.cwd(), 'dist/sitemap-0.xml');
if (!fs.existsSync(sitemapPath)) {
  console.error('dist/sitemap-0.xml not found. Run `npm run build` first.');
  process.exit(1);
}

const xml = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const extraGeoUrls = [
  `https://${HOST}/llms.txt`,
  `https://${HOST}/llms-full.txt`,
  `https://${HOST}/rss.xml`,
];
const urlList = [...new Set([...urls, ...extraGeoUrls])];

console.log(`Submitting ${urlList.length} URLs to IndexNow for ${HOST}...`);

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }),
});

console.log(`IndexNow HTTP ${res.status} ${res.statusText}`);
if (res.status >= 200 && res.status < 300) {
  console.log('IndexNow submission accepted.');
} else {
  const body = await res.text();
  console.error(body);
  process.exit(1);
}
