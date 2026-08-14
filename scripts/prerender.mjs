// Post-build prerender: snapshots every public URL of the built SPA into
// dist/<path>/index.html so Vercel's filesystem-before-rewrites serves real,
// crawler-readable HTML (per-page title/meta/canonical/JSON-LD baked in).
// The SPA rewrite in vercel.json stays as the fallback for unknown URLs.
//
// Runs after `vite build` + `generate-sitemap.mjs` (see package.json "build").
// Escape hatches: PRERENDER=0 skips entirely, PRERENDER_PRODUCTS=0 skips the
// ~140 product pages. Rollback: `npm run build:spa` = plain SPA build.
//
// React 19 note: src/main.jsx uses createRoot (not hydrateRoot), so the
// prerendered DOM is simply replaced on boot — no hydration-mismatch risk.
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { preview } from 'vite';
import { ROOT, collectUrls } from './lib/collect-urls.mjs';

const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
const DIST = path.join(ROOT, 'dist');
const CONCURRENCY = 5;

// Third-party widgets that must not load (nor be baked) during prerender.
const BLOCKED_HOSTS = ['mdntech.org', 'google.com/recaptcha', 'gstatic.com/recaptcha'];

async function launchBrowser() {
  const puppeteer = (await import('puppeteer-core')).default;
  if (process.env.VERCEL || process.env.CI) {
    // Vercel build image = Amazon Linux; @sparticuz/chromium ships a matching binary
    const chromium = (await import('@sparticuz/chromium')).default;
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
  // Local: installed Chrome, else Edge (always present on Windows 11)
  for (const channel of ['chrome', 'msedge']) {
    try {
      return await puppeteer.launch({ channel, headless: true });
    } catch {
      // try next channel
    }
  }
  throw new Error('[prerender] no local Chrome/Edge found — install one or run with PRERENDER=0');
}

// Cache Supabase REST responses so ~180 pages trigger 1 fetch, not 180.
// GET requests are additionally PROXIED through Node's fetch: the in-browser
// fetch has proven flaky in some build environments (s51: useProducts silently
// fell back to staticProducts and baked 38 product pages as noindex 404s),
// while the Node-side fetch — the same one generate-sitemap.mjs uses — is
// reliable. Proxy + cache makes the baked data deterministic; the snapshot
// validator in main() guards whatever still slips through.
const supabaseCache = new Map();
const SUPA_PROXY_HEADERS = ['apikey', 'authorization', 'accept', 'accept-profile', 'x-client-info', 'prefer', 'range'];
const SUPA_CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET,HEAD,OPTIONS',
  'access-control-allow-headers':
    'apikey, authorization, x-client-info, accept-profile, content-profile, content-type, prefer, range',
};

async function setupPage(page) {
  await page.setViewport({ width: 1366, height: 900 });

  // Pre-consent so the cookie banner never renders into snapshots
  await page.evaluateOnNewDocument(() => {
    try {
      localStorage.setItem('royalstroje_cookie_consent', 'prerender');
    } catch {
      /* ignore */
    }
  });

  await page.setRequestInterception(true);
  page.on('request', async (req) => {
    const url = req.url();
    if (BLOCKED_HOSTS.some((h) => url.includes(h))) return req.abort();
    if (url.includes('.supabase.co/rest/v1/')) {
      // CORS preflight for the fulfilled responses below
      if (req.method() === 'OPTIONS') return req.respond({ status: 204, headers: SUPA_CORS });
      if (supabaseCache.has(url)) {
        const hit = supabaseCache.get(url);
        return req.respond({ status: hit.status, headers: { ...hit.headers, ...SUPA_CORS }, body: hit.body });
      }
      if (req.method() === 'GET') {
        try {
          const headers = {};
          for (const [k, v] of Object.entries(req.headers())) {
            if (SUPA_PROXY_HEADERS.includes(k.toLowerCase())) headers[k] = v;
          }
          const res = await fetch(url, { headers });
          const hit = {
            status: res.status,
            headers: { 'content-type': res.headers.get('content-type') || 'application/json' },
            body: await res.text(),
          };
          if (res.ok) supabaseCache.set(url, hit);
          return req.respond({ status: hit.status, headers: { ...hit.headers, ...SUPA_CORS }, body: hit.body });
        } catch {
          // Node-side fetch failed too — fall back to the in-browser fetch
          return req.continue();
        }
      }
    }
    return req.continue();
  });
  page.on('response', async (res) => {
    const url = res.url();
    if (url.includes('.supabase.co/rest/v1/') && res.ok() && !supabaseCache.has(url)) {
      try {
        const body = await res.text();
        supabaseCache.set(url, {
          status: res.status(),
          headers: { 'content-type': res.headers()['content-type'] || 'application/json' },
          body,
        });
      } catch {
        /* response body may be unavailable; skip caching */
      }
    }
  });
}

async function capture(page, route, staticDefaults) {
  await page.goto(`${ORIGIN}${route}`, { waitUntil: 'networkidle0', timeout: 60_000 });
  // App must have rendered and any loading spinner must be gone
  await page.waitForFunction(
    () =>
      document.getElementById('root')?.children.length > 0 &&
      !document.querySelector('.animate-spin'),
    { timeout: 30_000 }
  );
  // Helmet flushes head tags slightly after the DOM content renders — wait
  // until a page-specific <title> shows up. Some routes legitimately keep the
  // static default title (/kosik, legal pages, homepage), so time out softly.
  try {
    await page.waitForFunction(
      (staticTitle) =>
        [...document.querySelectorAll('head title')].some((t) => {
          const txt = t.textContent.trim();
          return txt && txt !== staticTitle;
        }),
      { timeout: 3_000 },
      staticDefaults.staticTitle
    );
  } catch {
    // no page-specific title — acceptable for default-title routes
  }

  return page.evaluate(({ staticTitle, staticDesc }) => {
    // 1) js-reveal off <html>: baked in, it would CSS-hide reveal content for
    //    non-JS consumers.
    document.documentElement.classList.remove('js-reveal');

    // 1b) Mark the snapshot as prerendered. The index.html inline script skips
    //     re-adding js-reveal and HeroSplit suppresses its entrance animations
    //     under html[data-prerendered], so the static first paint and React's
    //     boot re-render look pixel-identical (no visible "blink" when
    //     createRoot().render() replaces the prerendered DOM). App.jsx lifts
    //     the attribute after the first client-side navigation.
    document.documentElement.setAttribute('data-prerendered', '');

    // 2) De-dupe <title> + meta description: react-helmet-async v3 appends
    //    its own tags next to the static index.html ones (no data-rh marker
    //    anymore) and can leave the static <title> emptied when the page
    //    Helmet mounts late (e.g. after ProductDetail's loading spinner).
    //    Keep the best candidate: page-specific > static default > empty.
    const dedupe = (tags, getText, staticText) => {
      if (tags.length < 2) return;
      const score = (t) => {
        const txt = (getText(t) || '').trim();
        if (!txt) return 0;
        if (txt === staticText) return 1;
        return 2;
      };
      const keep = tags.reduce((a, b) => (score(b) > score(a) ? b : a));
      tags.forEach((t) => t !== keep && t.remove());
    };
    dedupe([...document.head.querySelectorAll('title')], (t) => t.textContent, staticTitle);
    dedupe(
      [...document.head.querySelectorAll('meta[name="description"]')],
      (t) => t.getAttribute('content'),
      staticDesc
    );

    // 2b) App-level default og:image / twitter:card + a page-level override
    //     both end up in the head (helmet doesn't dedupe across instances).
    //     Keep the LAST one — page-level Helmet mounts deeper/later.
    for (const sel of ['meta[property="og:image"]', 'meta[name="twitter:card"]']) {
      const tags = [...document.head.querySelectorAll(sel)];
      tags.slice(0, -1).forEach((t) => t.remove());
    }

    // 3) Strip widget leftovers (script tags injected at runtime; requests
    //    were blocked, but the tags must not ship in the snapshot or the
    //    chatbot would load eagerly instead of via requestIdleCallback).
    document
      .querySelectorAll(
        'script[data-chatbot-id], script[src*="mdntech"], script[src*="recaptcha"], .grecaptcha-badge'
      )
      .forEach((el) => el.remove());

    return '<!doctype html>' + document.documentElement.outerHTML;
  }, staticDefaults);
}

function outFile(route) {
  // '/' -> dist/index.html, '/sluzby' -> dist/sluzby/index.html, etc.
  const rel = route === '/' ? 'index.html' : path.join(...route.replace(/^\//, '').split('/'), 'index.html');
  return path.join(DIST, rel);
}

// Prerender guard: a route that "renders" but with wrong data must count as a
// capture failure (retry, then fail the whole build). Root cause (s51):
// useProducts silently falls back to staticProducts when the in-page Supabase
// fetch fails, so a bad snapshot looks rendered while baking stale or missing
// product links. Failing the Vercel build is harmless — the previous
// deployment keeps serving.
function makeSnapshotValidator(productSlugs) {
  const productRoutes = new Set(productSlugs.map((s) => `/${s}`));
  return (route, html) => {
    if (route === '/katalog') {
      const missing = productSlugs.filter((slug) => !html.includes(`href="/${slug}"`));
      if (missing.length > 0) {
        throw new Error(
          `/katalog is missing ${missing.length} product links (static-fallback data?): ${missing.slice(0, 5).join(', ')}...`
        );
      }
    } else if (productRoutes.has(route)) {
      if (html.includes('content="noindex') || html.includes('Stránka nenájdená')) {
        throw new Error('product route rendered as NotFound (static-fallback data baked a 404)');
      }
    }
  };
}

async function main() {
  if (process.env.PRERENDER === '0') {
    console.log('[prerender] PRERENDER=0 — skipped');
    return;
  }

  const t0 = Date.now();
  const { staticIndexable, staticNoindex, blogVisible, blogHidden, productSlugs, productSource } =
    await collectUrls();

  const routes = [
    ...staticIndexable,
    ...staticNoindex, // cheap; bakes their noindex into static HTML
    ...blogVisible.map(({ slug }) => `/blog/${slug}`),
    ...blogHidden.map((slug) => `/blog/${slug}`), // bakes noindex
    ...(process.env.PRERENDER_PRODUCTS === '0' ? [] : productSlugs.map((slug) => `/${slug}`)),
  ];
  console.log(`[prerender] ${routes.length} routes (products: ${productSource})`);

  // Static head defaults from the SPA shell — needed to dedupe the tags
  // helmet appends next to them (read BEFORE the shell gets overwritten)
  const shellHtml = readFileSync(path.join(DIST, 'index.html'), 'utf8');
  const staticDefaults = {
    staticTitle: shellHtml.match(/<title>([^<]*)<\/title>/)?.[1] ?? '',
    staticDesc: shellHtml.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '',
  };

  const validateSnapshot = makeSnapshotValidator(
    process.env.PRERENDER_PRODUCTS === '0' ? [] : productSlugs
  );

  const server = await preview({ preview: { port: PORT, strictPort: true } });
  const browser = await launchBrowser();

  const snapshots = new Map(); // route -> html
  const failures = [];
  const queue = [...routes];

  try {
    await Promise.all(
      Array.from({ length: CONCURRENCY }, async () => {
        const page = await browser.newPage();
        await setupPage(page);
        for (;;) {
          const route = queue.shift();
          if (!route) break;
          try {
            const html = await capture(page, route, staticDefaults);
            validateSnapshot(route, html);
            snapshots.set(route, html);
          } catch (err1) {
            try {
              const html = await capture(page, route, staticDefaults); // one retry
              validateSnapshot(route, html);
              snapshots.set(route, html);
            } catch (err2) {
              failures.push({ route, error: err2.message || err1.message });
            }
          }
        }
        await page.close();
      })
    );
  } finally {
    await browser.close();
    await new Promise((resolve) => server.httpServer.close(resolve));
  }

  if (failures.length > 0) {
    console.error(`[prerender] ${failures.length}/${routes.length} routes FAILED — nothing written:`);
    for (const f of failures) console.error(`  ${f.route}: ${f.error}`);
    process.exit(1);
  }

  // All succeeded — write snapshots (homepage last; it replaces the SPA-shell
  // dist/index.html that also serves as the rewrite fallback)
  for (const [route, html] of [...snapshots].sort(([a], [b]) => (a === '/' ? 1 : b === '/' ? -1 : 0))) {
    const file = outFile(route);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, html, 'utf8');
  }

  console.log(
    `[prerender] wrote ${snapshots.size} pages in ${((Date.now() - t0) / 1000).toFixed(1)}s`
  );
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exit(1);
});
