# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-47 + old reference blocks archived 2026-07-29, 2026-08-04). -->

## Current State

- **Phase:** Live in production (royalstroje.sk + app.royalstroje.sk); GA4 with Consent Mode v2 live since s49, SEO-4 (GSC) submitted
- **Session count:** 49
- **Repo status:** work on `dev`, `main` = production; `dev` == `main` == `7af7b6f`

## What Was Done (Session 49) -- SEO-4 Search Console + GA4 Consent Mode v2 -> PROD
Date: 2026-08-05

1. **SEO-4 done:** sitemap was already submitted (164 URLs, success, from before this session). Requested indexing via URL Inspection on `/`, `/sluzby`, `/honda-wt30`, `/jcb-19c-i` -- homepage was already indexed, `/sluzby` needed the manual request. Manual "Request indexing" is rate-limited (~10/day) and meant for a handful of priority pages only -- the sitemap already covers full discovery of the other ~160 URLs, don't try to hand-index the whole catalog.
2. **GA4 property created by owner** (Measurement ID `G-WTPC0SV333`), industry category "Obchod a priemysel" -- closest GA4 standard match for equipment rental, no dedicated construction/rental category exists in Google's list.
3. **Implemented GA4 with Google Consent Mode v2**, gated behind a real accept/reject cookie banner (previous banner was a single "Rozumiem" notice from back when the site truly had no analytics). New `src/lib/analytics.js` (`enableAnalytics`/`disableAnalytics`; `gtag.js` is only fetched after explicit accept -- never on boot). `index.html` sets Consent Mode default to `denied` before `gtag.js` can ever load. `CookieBanner.jsx` now has real Prijať/Odmietnuť buttons (X = same as reject). `Cookies.jsx` copy + `_ga`/`_ga_*` row updated. Visitors who dismissed the old single-button banner are re-prompted once, since they were never actually asked about analytics.
4. **Verified end-to-end on staging then PROD:** `gtag/js` + `collect` hit fire only after clicking Prijať (checked in Network tab both times), GA4 Realtime confirmed active users + `page_view` events on both environments. `dev` -> `main` fast-forward merge, both pushed (`7af7b6f`).
5. **SEO-5 blocker identified:** owner tried to give a GBP link via a `google.com/search?...` results URL (has session tokens, not stable) -- explained the difference and asked for a proper Google Maps "Share" link instead (`maps.app.goo.gl/...` or `google.com/maps/place/...`). Facebook page exists, owner will send the URL separately. **Owner still needs to send both links** -- nothing else blocks SEO-5.

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
| 1 | **OWNER** | Send GBP Maps link + Facebook URL | Blocks SEO-5. GBP must be a Maps "Share" link (`maps.app.goo.gl/...` or `google.com/maps/place/...`), NOT a `google.com/search?...` results URL (session tokens, not stable). FB page exists, owner confirmed will send. |
| 2 | Low | SEO-5: FAQPage JSON-LD + `sameAs` | Blocked on row 1. `src/components/home/FAQ.jsx` needs plain-string `answerText`; `sameAs` into LocalBusiness schema in `Home.jsx`. |
| 3 | **OWNER** | SEO-4 follow-up: monitor GSC Pages report | 2-4 weeks from 2026-08-05 -- check indexed vs excluded counts climb (Indexovanie -> Strany in GSC). |
| 4 | Low | SEO-6: Prerender freshness hook | New/changed Supabase product shows in static HTML only after next deploy -- confirmed again in s48 (JCB `blog_article_slug`). If it bothers: Vercel Deploy Hook pinged from dashboard on product change. |
| 5 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Kept for revert; production ships HeroSplit since s37. |
| 6 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs. |
| 7 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit. |
| 8 | Low | Final real-Android scroll-check | FAQ + product grid + subpages on owner's Xiaomi, logged out of Vercel (toolbar = false positive, see s34). |
| 9 | Backlog | Workspace email migration; subcategory data audit; product photos; email notifications (EmailJS/Edge Function); chatbot CORS (mdntech.org 405); WhatsApp API; online payments; mobile AnimatedBackground re-add via CSS body bg | Details in handoff-archive.md (session 15-43 notes). |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/lib/analytics.js` | GA4 loader gated on Consent Mode v2 -- `gtag.js` only fetched after accept; Measurement ID `G-WTPC0SV333` |
| `src/components/common/CookieBanner.jsx` | Prijať/Odmietnuť consent UI, wired to `analytics.js` |
| `src/components/home/FAQ.jsx` | Next step SEO-5: needs plain-string `answerText` for FAQPage JSON-LD |
| `src/pages/Home.jsx` | Next step SEO-5: LocalBusiness schema needs `sameAs` (owner to send GBP + FB links) |
| `apps/dashboard/src/lib/companyInfo.js` | Company info on PDFs -- IBAN placeholder (task 6) |
| `src/data/blogMeta.js` | Single source of truth for blog metadata (plain ESM; `hidden: true` = unlisted + noindex + out of sitemap); consumed by Blog, BlogDetail, build scripts |
| `scripts/prerender.mjs` | Post-build Puppeteer prerender ~177 URLs into `dist/<path>/index.html`; stamps `data-prerendered`; Vercel uses `@sparticuz/chromium` |
| `scripts/generate-sitemap.mjs` + `scripts/lib/collect-urls.mjs` | Build-time sitemap (164 URLs); collect-urls = shared URL inventory (static + visible blog + Supabase products) + `SITE_URL` |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 40 | 2026-07-16 | Zmluva PDF: fix rozloženia pri 4+ položkách -> PROD | Dynamic fit-check pushes signature block to page 2; page numbering; „Späť" button in deal summary |
| 41 | 2026-07-16 | Dashboard: číslo zmluvy namiesto DB označenia -> PROD | `dealContractNumber()` helper, contracts join in useClient/useReservations |
| 42 | 2026-07-16 | Katalóg: nový dekoračný bager (bager_web) -> PROD | Owner RGBA PNG -> WebP 1024x683 q80 preserving alpha |
| 43 | 2026-07-16 | SEO: prerender + build-time sitemap + noindex/meta fixy (na `dev`) | Root cause weak indexing: robots.txt blocked `/assets/`; prerender ~177 URLs; helmet v3 multi-child title bug; blogMeta.js created |
| 44 | 2026-07-16 | Fix prerender boot blink + SEO-1 staging verification | `data-prerendered` suppression chain; SEO-1 verified on Vercel staging; commit `92c571d` |
| 45 | 2026-07-29 | Nový blog článok JCB 19C-1 (úprimná recenzia po 170 mth) | Replaces old hidden id-19 article; article<->catalog prelink (owner SQL pending); .claude tooling overhaul (auto-wrap hook, handoff skill, CLAUDE.md) |
| 46 | 2026-07-29 | Release sessions 43-46 na PROD + fotky strojov v CTA pásoch + promo WT30 | 3x `dev`->`main`; cutout tool `scripts/cutout-transparent.py`; Haulotte foto v SourcingBanner + CtaBand (opt-in prop); promo slide Honda WT30; hook force-push vzor zúžený; zistený apex->www redirect vs apex canonical |
| 47 | 2026-07-29 | RCC kalendar: tyzdenny dispecersky pohlad s ulohami -> PROD | Mesacny pohlad nahradeny tyzdennym (Po-Pi, 7-17); nova tabulka `calendar_tasks` (migracia 021, owner spustil); prenajmy v all-day pase; widget dnesnych uloh na dashboarde; fonty zvacsene po feedbacku |
| 48 | 2026-08-04 | SEO-2 apex/www domain swap + JCB SQL + Haulotte cutout fix -> PROD | Plot priehladny "Cena dohodou" (Supabase only); Haulotte transparent WebP hole fixed without source photo; JCB blog_article_slug set; apex now canonical via Vercel API (dashboard UI bug blocked normal edit); safety hook temp exception scoped+reverted with owner approval |
| 49 | 2026-08-05 | SEO-4 Search Console + GA4 Consent Mode v2 -> PROD | Sitemap submit confirmed, indexing requested on 4 URLs; GA4 (`G-WTPC0SV333`) with full Consent Mode v2 -- gtag.js only loads after accept; CookieBanner now has real Prijat/Odmietnut; verified on staging + PROD via Network tab + GA4 Realtime; dev->main pushed (`7af7b6f`); SEO-5 blocked on owner sending GBP Maps link + Facebook URL |

<!-- Sessions 1-37 summary rows + sessions 15-47 full notes + old Architecture/Supabase reference: handoff-archive.md -->
