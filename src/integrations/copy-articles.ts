import type { AstroIntegration } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

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

function copyArticles(): void {
  const srcDir = path.join(process.cwd(), 'content/articles');
  const destDir = path.join(process.cwd(), 'public/articles');

  if (!fs.existsSync(srcDir)) return;

  fs.mkdirSync(destDir, { recursive: true });

  for (const file of fs.readdirSync(destDir)) {
    if (file.endsWith('.html')) {
      fs.unlinkSync(path.join(destDir, file));
    }
  }

  for (const filename of fs.readdirSync(srcDir).filter((f) => f.endsWith('.html'))) {
    const slug = filename.replace(/\.html$/i, '');
    const html = fs.readFileSync(path.join(srcDir, filename), 'utf-8');
    const withHelper = html.includes('data-article-frame-helper')
      ? html
      : html.replace(/<\/body>/i, `${IFRAME_HELPER(slug)}\n</body>`);

    fs.writeFileSync(path.join(destDir, filename), withHelper, 'utf-8');
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
