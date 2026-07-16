// Shared URL collector for scripts/generate-sitemap.mjs + scripts/prerender.mjs.
// Single source of truth for "which URLs exist" and "which should be indexed".
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(__dirname, '..', '..');

export const SITE = 'https://royalstroje.sk';

// Static routes from src/App.jsx that SHOULD be indexed (in the sitemap).
export const STATIC_INDEXABLE = [
  '/',
  '/sluzby',
  '/sluzby/predaj-techniky',
  '/sluzby/nahradne-diely',
  '/sluzby/dovoz-techniky',
  '/sluzby/cenova-ponuka',
  '/sluzby/zabezpecenie-techniky',
  '/sluzby/skolenie-obsluhy',
  '/blog',
  '/kontakt',
  '/partneri',
];

// Static routes that carry a client-side noindex — kept OUT of the sitemap,
// but still prerendered so the noindex is baked into the static HTML.
export const STATIC_NOINDEX = [
  '/kosik',
  '/gdpr',
  '/cookies',
  '/obchodne-podmienky',
];

// Populate VITE_SUPABASE_* from .env / .env.local when not already set
// (Vercel build has them in process.env; local runs read the files).
export function loadEnv() {
  for (const file of ['.env', '.env.local']) {
    const p = path.join(ROOT, file);
    if (!existsSync(p)) continue;
    for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if (!m) continue;
      const [, key, raw] = m;
      if (process.env[key] !== undefined) continue;
      process.env[key] = raw.replace(/^["']|["']$/g, '');
    }
  }
}

// Blog slugs from the shared metadata module (plain ESM, no JSX).
export async function getBlogPosts() {
  const mod = await import(pathToFileURL(path.join(ROOT, 'src', 'data', 'blogMeta.js')).href);
  return mod.blogPosts;
}

// Accessories (Malé náradie → Príslušenstvo) render only as table rows in the
// catalog — their auto-generated detail URLs (/accessory-*) are unlinked, thin
// pages with garbled slugs. Keep them out of the sitemap + prerender.
function isAccessorySlug(slug) {
  return slug.startsWith('accessory-');
}

// Product slugs: Supabase REST (live catalog) with static-file fallback.
export async function fetchProductSlugs() {
  loadEnv();
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      const res = await fetch(
        `${url}/rest/v1/equipment?select=slug&status=eq.active&order=slug`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } }
      );
      if (res.ok) {
        const rows = await res.json();
        const slugs = [...new Set(rows.map((r) => r.slug).filter(Boolean))]
          .filter((s) => !isAccessorySlug(s));
        if (slugs.length > 0) return { slugs, source: 'supabase' };
        console.warn('[collect-urls] Supabase returned 0 active products, using static fallback');
      } else {
        console.warn(`[collect-urls] Supabase REST ${res.status}, using static fallback`);
      }
    } catch (err) {
      console.warn(`[collect-urls] Supabase fetch failed (${err.message}), using static fallback`);
    }
  } else {
    console.warn('[collect-urls] VITE_SUPABASE_* env vars missing, using static fallback');
  }

  const mod = await import(pathToFileURL(path.join(ROOT, 'src', 'data', 'products.js')).href);
  // De-dupe: the static file contains one duplicated id ('custers')
  const slugs = [...new Set(mod.products.map((p) => p.id).filter(Boolean))]
    .filter((s) => !isAccessorySlug(s));
  return { slugs, source: 'static' };
}

// Full inventory used by both build scripts.
export async function collectUrls() {
  const blogPosts = await getBlogPosts();
  const { slugs: productSlugs, source: productSource } = await fetchProductSlugs();

  return {
    staticIndexable: STATIC_INDEXABLE,
    staticNoindex: STATIC_NOINDEX,
    // visible articles → sitemap (with lastmod); hidden → prerender-only (noindex)
    blogVisible: blogPosts.filter((p) => !p.hidden).map((p) => ({ slug: p.slug, lastmod: p.dateSort })),
    blogHidden: blogPosts.filter((p) => p.hidden).map((p) => p.slug),
    productSlugs,
    productSource,
  };
}
