# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-43 + old reference blocks archived 2026-07-29). -->

## Current State

- **Phase:** Live in production (royalstroje.sk + app.royalstroje.sk); SEO batch (prerender/sitemap) verified on staging, awaiting merge to prod
- **Session count:** 45
- **Repo status:** work on `dev`, `main` = production; sessions 43-45 committed on `dev`, NOT yet merged to `main`

## What Was Done (Session 44) -- Fix prerender boot blink + SEO-1 staging verification
Date: 2026-07-16

1. **Prerender boot "blink" fixed** -- `html[data-prerendered]` marker in snapshots; inline script skips `js-reveal`, HeroSplit suppresses `hs-*` entrance animations, `RestoreRevealsAfterNav` in App.jsx restores normal SPA behavior on first client-side navigation. Hydration rejected (IO classes + Supabase data guarantee mismatches). Verified 12/12 with puppeteer harness. Committed `92c571d`.
2. **SEO-1 verified on Vercel staging** -- chromium build passes, staging serves prerendered HTML with per-page titles + canonical, sitemap 164 URLs. Note: local `vite preview` does NOT do filesystem-before-rewrites -- verify per-page titles on Vercel or in `dist/<path>/index.html`.

## What Was Done (Session 45) -- New JCB 19C-1 blog article (honest review) + .claude tooling overhaul
Date: 2026-07-29

1. **New blog article** `src/data/articles/jcb-19c-1-mini-rypadlo-recenzia-skusenosti.jsx` -- honest review based on own fleet machine (170 motohours): pros (hidden hydraulic hoses in boom, long arm dig depth ~2.5 m, 100 mth service = fluids + greasing only, next at 500 mth, 980 mm width) AND cons (dug-in machine can't crawl out without pushing off the boom, 11.7 kW limits, slope stability needs widened undercarriage). Specs verified via research: Perkins 403D-07, 11.7 kW (matches owner's data).
2. **Replaced old hidden JCB article** (id 19, wrong specs, slug `jcb-19c-i-...`) -- file deleted, blogMeta entry replaced (hidden flag removed), loader updated. Old slug 404s (was noindex + never in sitemap, safe). This closes the old "re-publish JCB article" backlog item.
3. **Article <-> catalog prelink:** article CTA links to product page `/jcb-19c-i`; catalog -> article appears automatically once owner runs the SQL in task 1 below (RLS blocks anon writes).
4. **Verified:** changed files lint-clean (601 baseline elsewhere), `build:spa` OK, sitemap 164 URLs (11 blog incl. new), puppeteer checks: per-page title, blog card, CTA links, full-page visual + CTA tile contrast fix (`bg-zinc-900/50` -> solid on light panel).
5. **.claude tooling overhaul committed with this wrap:** hooks rewritten (auto-wrap Stop hook measuring real context, context-warn, test-hooks), 4 old skills consolidated into `.claude/skills/handoff/`, new root `CLAUDE.md`, old files in `.claude/_superseded/`.
6. **Suggested to owner:** catalog product name "JCB 19C-I" has a typo (correct designation "JCB 19C-1") -- optional one-line UPDATE on `equipment.name`.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | **OWNER SQL** | Set `blog_article_slug` for JCB article | Supabase SQL Editor: `UPDATE equipment SET blog_article_slug = 'jcb-19c-1-mini-rypadlo-recenzia-skusenosti' WHERE slug = 'jcb-19c-i';` (optionally also fix name typo 19C-I -> 19C-1). Enables "Prečítať článok" link on product card + detail. |
| 2 | **OWNER** | SEO-2: www -> apex redirect | Vercel -> project `royal-stroje` -> Settings -> Domains -> `www.royalstroje.sk` -> Redirect to `royalstroje.sk` (308). Google indexes www duplicates. |
| 3 | High | SEO-3: Merge `dev`->`main` -> production | Unblocked (SEO-1 verified s44). Ships prerender + robots fix + sitemap + blink fix + new JCB article. Ideally after owner's visual OK of staging. New article appears in static HTML only after this deploy (prerender freshness). |
| 4 | **OWNER** | SEO-4 (after deploy): Google Search Console | Submit `https://royalstroje.sk/sitemap.xml`; URL Inspection on `/`, `/sluzby`, 1-2 products -> Request indexing; watch Pages report 2-4 weeks. |
| 5 | Low | SEO-5: FAQPage JSON-LD + `sameAs` | `src/components/home/FAQ.jsx` needs plain-string `answerText`; `sameAs` (GBP/Maps + Facebook URLs from owner) into LocalBusiness schema in `Home.jsx`. |
| 6 | Low | SEO-6: Prerender freshness hook | New/changed Supabase product shows in static HTML only after next deploy. If it bothers: Vercel Deploy Hook pinged from dashboard on product change. |
| 7 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Kept for revert; production ships HeroSplit since s37. |
| 8 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs. |
| 9 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit. |
| 10 | Low | Final real-Android scroll-check | FAQ + product grid + subpages on owner's Xiaomi, logged out of Vercel (toolbar = false positive, see s34). |
| 11 | Backlog | GA4 + full consent flow; Workspace email migration; subcategory data audit; product photos; email notifications (EmailJS/Edge Function); chatbot CORS (mdntech.org 405); WhatsApp API; online payments; mobile AnimatedBackground re-add via CSS body bg | Details in handoff-archive.md (session 15-43 notes). |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/data/blogMeta.js` | Single source of truth for blog metadata (plain ESM; `hidden: true` = unlisted + noindex + out of sitemap); consumed by Blog, BlogDetail, build scripts |
| `src/data/articles/jcb-19c-1-mini-rypadlo-recenzia-skusenosti.jsx` | NEW (s45) JCB 19C-1 review article; CTA links to `/jcb-19c-i` |
| `src/data/blogArticles.jsx` | Re-exports blogMeta + lazy `loadArticle(slug)` map -- new article needs an entry here |
| `scripts/prerender.mjs` | Post-build Puppeteer prerender ~177 URLs into `dist/<path>/index.html`; stamps `data-prerendered`; Vercel uses `@sparticuz/chromium` |
| `scripts/generate-sitemap.mjs` + `scripts/lib/collect-urls.mjs` | Build-time sitemap (164 URLs); collect-urls = shared URL inventory (static + visible blog + Supabase products) |
| `src/pages/Home.jsx` | Renders HeroSplit; still contains commented-out old hero imports/block (cleanup task 7) |
| `src/components/home/FAQ.jsx` | Homepage FAQ -- target for FAQPage JSON-LD (task 5) |
| `apps/dashboard/src/lib/companyInfo.js` | Company info on PDFs -- IBAN placeholder (task 8) |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 36 | 2026-07-02 | Web-wide polish (impeccable) + blog čitateľnosť na svetlom | Catalog hover seam definitive fix, eyebrows thinned site-wide, numbered badges, 19 blog articles re-themed readable on light bg |
| 37 | 2026-07-03 | Hero fotky + blog vlastné hero obrázky -> PROD DEPLOY | Blog per-article hero images (`image` in blogMeta), hero polish, merge `dev`->`main` (38 commits) -> production |
| 38 | 2026-07-14 | Katalóg: nová kategória „Voľný čas a šport" + 2 elektrobicykle -> PROD | Category tree static in `categories.js` + products in Supabase; new category needs code+DB; RLS blocks anon writes (owner runs SQL) |
| 39 | 2026-07-14 | Hero vstupné animácie + fix prázdneho katalógu na back-nav -> PROD | HeroSplit entrance animations (images + USP), `useProducts` initial state = module `cachedProducts` |
| 40 | 2026-07-16 | Zmluva PDF: fix rozloženia pri 4+ položkách -> PROD | Dynamic fit-check pushes signature block to page 2; page numbering; „Späť" button in deal summary |
| 41 | 2026-07-16 | Dashboard: číslo zmluvy namiesto DB označenia -> PROD | `dealContractNumber()` helper, contracts join in useClient/useReservations |
| 42 | 2026-07-16 | Katalóg: nový dekoračný bager (bager_web) -> PROD | Owner RGBA PNG -> WebP 1024x683 q80 preserving alpha |
| 43 | 2026-07-16 | SEO: prerender + build-time sitemap + noindex/meta fixy (na `dev`) | Root cause weak indexing: robots.txt blocked `/assets/`; prerender ~177 URLs; helmet v3 multi-child title bug; blogMeta.js created |
| 44 | 2026-07-16 | Fix prerender boot blink + SEO-1 staging verification | `data-prerendered` suppression chain; SEO-1 verified on Vercel staging; commit `92c571d` |
| 45 | 2026-07-29 | Nový blog článok JCB 19C-1 (úprimná recenzia po 170 mth) | Replaces old hidden id-19 article; article<->catalog prelink (owner SQL pending); .claude tooling overhaul (auto-wrap hook, handoff skill, CLAUDE.md) |

<!-- Sessions 1-35 summary rows + sessions 15-43 full notes + old Architecture/Supabase reference: handoff-archive.md -->
