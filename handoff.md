# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-47 + old reference blocks archived 2026-07-29, 2026-08-04). -->

## Current State

- **Phase:** Live in production (royalstroje.sk + app.royalstroje.sk); SEO-2 (apex vs www) resolved in s48, JCB blog link live
- **Session count:** 48
- **Repo status:** work on `dev`, `main` = production; `dev` == `main` == `f05235b`

## What Was Done (Session 48) -- SEO-2 domain swap + JCB SQL + product fixes
Date: 2026-08-04

1. **Product data fixes are Supabase-only, no code/deploy needed for either:** "Plot priehľadný 3,5m" (`equipment.slug = 'standard'`, unrelated to its display name) set to `pricing_type = 'negotiable'` -- UI already fully supports "Cena dohodou"/"Na požiadanie" whenever a product is negotiable, zero code change required. Same pattern for the pending JCB `blog_article_slug` task -- owner ran both SQL statements directly.
2. **Haulotte Compact 10 cutout fixed without the original studio photo.** The enclosed white sweep visible through the cage's guardrail gaps was never reached by `cutout-transparent.py`'s border flood-fill (walled off by the frame outline) -- same failure mode the tool's `MIN_HOLE` option exists for. Patched the *already-cut* transparent WebP in place: same hole-detection pass (bright+desaturated blob, unreached by border flood, size >= threshold) applied directly to the existing alpha channel, then localized edge ramp + colour decontamination only around the new holes so untouched edges weren't reprocessed. Pushed straight to prod (`f05235b`) -- pure asset change, no code touched.
3. **SEO-2 resolved: apex (`royalstroje.sk`) is now canonical, `www` 308-redirects to it.** No SEO advantage either way (Google treats both equally) -- decided on apex because all existing code (sitemap `SITE_URL`, canonical/OG tags, schema) already pointed there, so zero code changes needed either way.
4. **Vercel dashboard bug: the domain acting as a pure redirect source (`royalstroje.sk`) had no Edit/Refresh affordance at all** -- couldn't click into it, couldn't Remove it either. Zoom/hard-refresh didn't help. Root cause not confirmed, but reproducible on this project as of 2026-08-04; worth trying "click the redirect badge itself" next time before escalating.
5. **Fixed via Vercel REST API instead of the dashboard** (`PATCH /v9/projects/{id}/domains/{domain}` with `redirect`/`redirectStatusCode`, needs `?teamId=` -- team-scoped tokens can't call `/v2/teams` to discover it, get it from any `GET /v9/projects/{id}` response's `accountId` field instead). Owner generated a 1-day team-scoped token, revoked after use. Zero downtime: API lets you flip a domain's config without ever detaching the live one, unlike remove-and-readd.
6. **Safety hook `block-dangerous.sh` blocks all curl POST/PUT/PATCH/DELETE by design** (exfiltration guard, not a bug). Got explicit owner approval, added a narrow temporary exception scoped to `api.vercel.com` only, ran the two PATCH calls, then reverted the hook file immediately -- confirmed via `git diff` showing no changes before moving on. Precedent for next time this comes up: ask first, scope tight, revert same-turn, verify the revert.
7. **Prerender freshness caveat confirmed real (SEO-6 backlog item):** Supabase data changes (JCB `blog_article_slug`) show immediately to real visitors (client-side fetch) but not in the crawler-facing prerendered HTML until the next deploy. Not urgent, already tracked.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | **OWNER** | SEO-4: Google Search Console | Unblocked since s48 (apex is now canonical, no more redirect-vs-canonical mismatch). Submit sitemap; URL Inspection na `/`, `/sluzby`, 1-2 produkty -> Request indexing; Pages report sledovať 2-4 týždne. |
| 2 | Low | SEO-5: FAQPage JSON-LD + `sameAs` | `src/components/home/FAQ.jsx` needs plain-string `answerText`; `sameAs` (GBP/Maps + Facebook URLs from owner) into LocalBusiness schema in `Home.jsx`. |
| 3 | Low | SEO-6: Prerender freshness hook | New/changed Supabase product shows in static HTML only after next deploy -- confirmed again in s48 (JCB `blog_article_slug`). If it bothers: Vercel Deploy Hook pinged from dashboard on product change. |
| 4 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Kept for revert; production ships HeroSplit since s37. |
| 5 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs. |
| 6 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit. |
| 7 | Low | Final real-Android scroll-check | FAQ + product grid + subpages on owner's Xiaomi, logged out of Vercel (toolbar = false positive, see s34). |
| 8 | Backlog | GA4 + full consent flow; Workspace email migration; subcategory data audit; product photos; email notifications (EmailJS/Edge Function); chatbot CORS (mdntech.org 405); WhatsApp API; online payments; mobile AnimatedBackground re-add via CSS body bg | Details in handoff-archive.md (session 15-43 notes). |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/data/blogMeta.js` | Single source of truth for blog metadata (plain ESM; `hidden: true` = unlisted + noindex + out of sitemap); consumed by Blog, BlogDetail, build scripts |
| `scripts/prerender.mjs` | Post-build Puppeteer prerender ~177 URLs into `dist/<path>/index.html`; stamps `data-prerendered`; Vercel uses `@sparticuz/chromium` |
| `scripts/generate-sitemap.mjs` + `scripts/lib/collect-urls.mjs` | Build-time sitemap (164 URLs); collect-urls = shared URL inventory (static + visible blog + Supabase products) + `SITE_URL` |
| `scripts/cutout-transparent.py` | s46 dev tool: studio photo -> transparent WebP for the dark bands (Pillow+numpy, not part of the build); presets + QA advice in its docstring |
| `src/components/common/CtaBand.jsx` | Shared dark CTA band on 12 subpages -- `image` prop is opt-in per page, do not turn it on globally |
| `src/components/home/PromoCarousel.jsx` | Homepage promo slides (hardcoded array; owner edits copy/img/CTA here) |
| `apps/dashboard/src/pages/calendar/CalendarView.jsx` | s47 week board: rentals lane + hour grid 7-17, quick-add in cells; `src/lib/calendar.js` holds week math, task colours and the rental-bar packing |
| `apps/dashboard/src/hooks/useCalendarTasks.js` | CRUD + optimistic local copy for `calendar_tasks`; re-seeds on fetch via render-phase adjust (no sync effect -- eslint blocks it) |
| `apps/dashboard/src/lib/companyInfo.js` | Company info on PDFs -- IBAN placeholder (task 8) |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 38 | 2026-07-14 | Katalóg: nová kategória „Voľný čas a šport" + 2 elektrobicykle -> PROD | Category tree static in `categories.js` + products in Supabase; new category needs code+DB; RLS blocks anon writes (owner runs SQL) |
| 39 | 2026-07-14 | Hero vstupné animácie + fix prázdneho katalógu na back-nav -> PROD | HeroSplit entrance animations (images + USP), `useProducts` initial state = module `cachedProducts` |
| 40 | 2026-07-16 | Zmluva PDF: fix rozloženia pri 4+ položkách -> PROD | Dynamic fit-check pushes signature block to page 2; page numbering; „Späť" button in deal summary |
| 41 | 2026-07-16 | Dashboard: číslo zmluvy namiesto DB označenia -> PROD | `dealContractNumber()` helper, contracts join in useClient/useReservations |
| 42 | 2026-07-16 | Katalóg: nový dekoračný bager (bager_web) -> PROD | Owner RGBA PNG -> WebP 1024x683 q80 preserving alpha |
| 43 | 2026-07-16 | SEO: prerender + build-time sitemap + noindex/meta fixy (na `dev`) | Root cause weak indexing: robots.txt blocked `/assets/`; prerender ~177 URLs; helmet v3 multi-child title bug; blogMeta.js created |
| 44 | 2026-07-16 | Fix prerender boot blink + SEO-1 staging verification | `data-prerendered` suppression chain; SEO-1 verified on Vercel staging; commit `92c571d` |
| 45 | 2026-07-29 | Nový blog článok JCB 19C-1 (úprimná recenzia po 170 mth) | Replaces old hidden id-19 article; article<->catalog prelink (owner SQL pending); .claude tooling overhaul (auto-wrap hook, handoff skill, CLAUDE.md) |
| 46 | 2026-07-29 | Release sessions 43-46 na PROD + fotky strojov v CTA pásoch + promo WT30 | 3x `dev`->`main`; cutout tool `scripts/cutout-transparent.py`; Haulotte foto v SourcingBanner + CtaBand (opt-in prop); promo slide Honda WT30; hook force-push vzor zúžený; zistený apex->www redirect vs apex canonical |
| 47 | 2026-07-29 | RCC kalendar: tyzdenny dispecersky pohlad s ulohami -> PROD | Mesacny pohlad nahradeny tyzdennym (Po-Pi, 7-17); nova tabulka `calendar_tasks` (migracia 021, owner spustil); prenajmy v all-day pase; widget dnesnych uloh na dashboarde; fonty zvacsene po feedbacku |
| 48 | 2026-08-04 | SEO-2 apex/www domain swap + JCB SQL + Haulotte cutout fix -> PROD | Plot priehladny "Cena dohodou" (Supabase only); Haulotte transparent WebP hole fixed without source photo; JCB blog_article_slug set; apex now canonical via Vercel API (dashboard UI bug blocked normal edit); safety hook temp exception scoped+reverted with owner approval |

<!-- Sessions 1-37 summary rows + sessions 15-47 full notes + old Architecture/Supabase reference: handoff-archive.md -->
