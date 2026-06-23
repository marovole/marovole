import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import {
  ARTICLE_SITE,
  articleDetailPath,
  loadArticles,
} from '../utils/article-loader';

const IFRAME_HELPER = (slug: string) => `
<script data-article-frame-helper="true">
(function(){
  var SLUG=${JSON.stringify(slug)};
  function reportHeight(){
    var h=Math.max(
      document.documentElement.scrollHeight,
      document.body.scrollHeight,
      document.documentElement.offsetHeight
    );
    try{parent.postMessage({type:'article-frame-resize',slug:SLUG,height:h},'*');}catch(e){}
  }
  window.addEventListener('load',reportHeight);
  window.addEventListener('resize',reportHeight);
  if(typeof ResizeObserver!=='undefined'){new ResizeObserver(reportHeight).observe(document.body);}
  setTimeout(reportHeight,100);
  setTimeout(reportHeight,500);
  setTimeout(reportHeight,1500);
  window.addEventListener('message',function(e){
    if(!e.data||e.data.type!=='article-frame-theme')return;
    document.documentElement.setAttribute('data-theme',e.data.theme);
  });
})();
</script>`;

function injectSeoGuards(html: string, canonicalUrl: string): string {
  const tags = [
    '<meta name="robots" content="noindex, nofollow">',
    `<link rel="canonical" href="${canonicalUrl}">`,
  ].join('\n');

  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, (match) => `${match}\n${tags}`);
  }

  return `${tags}\n${html}`;
}

function copyArticles(): void {
  const srcDir = path.join(process.cwd(), 'content/articles');
  const destDir = path.join(process.cwd(), 'public/article-frames');

  if (!fs.existsSync(srcDir)) return;

  fs.mkdirSync(destDir, { recursive: true });

  const legacyDir = path.join(process.cwd(), 'public/articles');
  if (fs.existsSync(legacyDir)) {
    fs.rmSync(legacyDir, { recursive: true, force: true });
  }

  for (const file of fs.readdirSync(destDir)) {
    if (file.endsWith('.html')) {
      fs.unlinkSync(path.join(destDir, file));
    }
  }

  const articles = loadArticles();

  for (const article of articles) {
    const srcPath = path.join(srcDir, article.filename);
    const html = fs.readFileSync(srcPath, 'utf-8');
    const canonicalUrl = new URL(articleDetailPath(article), ARTICLE_SITE).href;

    let output = injectSeoGuards(html, canonicalUrl);

    if (!output.includes('data-article-frame-helper')) {
      output = output.replace(/<\/body>/i, `${IFRAME_HELPER(article.slug)}\n</body>`);
    }

    fs.writeFileSync(path.join(destDir, article.filename), output, 'utf-8');
  }
}

export function copyArticlesIntegration(): AstroIntegration {
  return {
    name: 'copy-articles',
    hooks: {
      'astro:config:setup': () => {
        copyArticles();
      },
      'astro:server:start': () => {
        copyArticles();
      },
      'astro:build:start': () => {
        copyArticles();
      },
    },
  };
}
