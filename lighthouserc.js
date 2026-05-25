/**
 * Lighthouse CI 门禁配置 — marovole.com
 *
 * 阈值口径对齐 MAR-59（SEO 规格与验收）：
 *   - SEO >= 90（M6 要求，与 SEO 规格中的 Lighthouse 阈值一致）
 *   - Performance / Accessibility / Best Practices 只报警不阻断
 *
 * 死链检查由 build + Astro 编译时覆盖（astro build 对失效内部链接会报编译错误）
 *   外部链接由 lhci collect 运行时抓取 404 等错误状态码
 */

const SEO_THRESHOLD = 0.9;
const WARN_THRESHOLD = 0.75;

/** @type {import('@lhci/cli').LHCI.Config} */
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      numberOfRuns: 1,
      // 至少覆盖首页 + /zh/（MAR-65 要求）& 项目详情页
      url: [
        'http://localhost:4321/',
        'http://localhost:4321/zh/',
        'http://localhost:4321/projects/hearthbulter/',
        'http://localhost:4321/zh/projects/hearthbulter/',
      ],
    },
    assert: {
      // 断言阈值
      preset: 'lighthouse:no-pwa',
      assertions: {
        'categories:seo': ['error', { minScore: SEO_THRESHOLD }],
        'categories:performance': ['warn', { minScore: WARN_THRESHOLD }],
        'categories:accessibility': ['warn', { minScore: WARN_THRESHOLD }],
        'categories:best-practices': ['warn', { minScore: WARN_THRESHOLD }],

        // 对齐 SEO 规格 MAR-59 的单项要求
        'meta-description': ['error', {}],
        'link-text': ['error', {}],
        'hreflang': ['error', {}],

        // 对齐 CI 门禁 MAR-53 已覆盖的 SEO 冒烟项
        'canonical': ['error', {}],
        'robots-txt': ['warn', {}],
        'font-size': ['warn', {}],
        'tap-targets': ['warn', {}],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
