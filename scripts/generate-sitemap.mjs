// Build-time sitemap generator — emits dist/sitemap.xml from the real route
// inventory (static routes + visible blog articles + active products from
// Supabase). Runs after `vite build` (see package.json "build").
//
// Replaces the old hand-written public/sitemap.xml, which had drifted badly
// (dead /sluzby/royal-fleet, missing service pages, no blog/product URLs).
import { writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { SITE, ROOT, collectUrls } from './lib/collect-urls.mjs';

const DIST = path.join(ROOT, 'dist');

function urlTag(loc, lastmod) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
    '  </url>',
  ].join('\n');
}

async function main() {
  if (!existsSync(DIST)) {
    console.error('[sitemap] dist/ not found — run `vite build` first');
    process.exit(1);
  }

  const { staticIndexable, blogVisible, productSlugs, productSource } = await collectUrls();

  const entries = [
    ...staticIndexable.map((route) => urlTag(`${SITE}${route === '/' ? '/' : route}`)),
    ...blogVisible.map(({ slug, lastmod }) => urlTag(`${SITE}/blog/${slug}`, lastmod)),
    ...productSlugs.map((slug) => urlTag(`${SITE}/${slug}`)),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  const out = path.join(DIST, 'sitemap.xml');
  writeFileSync(out, xml, 'utf8');
  console.log(
    `[sitemap] wrote ${out}: ${staticIndexable.length} static + ${blogVisible.length} blog + ${productSlugs.length} products (${productSource}) = ${entries.length} URLs`
  );
}

main().catch((err) => {
  console.error('[sitemap] failed:', err);
  process.exit(1);
});
