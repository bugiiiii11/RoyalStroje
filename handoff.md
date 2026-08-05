# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-48 + old reference blocks archived 2026-07-29, 2026-08-04, 2026-08-05). -->

## Current State

- **Phase:** Live in production (royalstroje.sk + app.royalstroje.sk); GA4 with Consent Mode v2 live since s49; SEO-5 (FAQPage + sameAs) + Footer Facebook icon live since s50
- **Session count:** 50
- **Repo status:** work on `dev`, `main` = production; `dev` == `main` == `946d1f3`

## What Was Done (Session 50) -- SEO-5 FAQPage/sameAs + Footer Facebook icon -> PROD
Date: 2026-08-05

1. **Owner sent both links:** GBP Maps share link (`maps.app.goo.gl/A7HSGKNYctVqgRuq8`) and Facebook page (`facebook.com/profile.php?id=61591259022094`) -- unblocked SEO-5.
2. **`sameAs` added to LocalBusiness schema** in `src/pages/Home.jsx` (both links).
3. **FAQPage JSON-LD added in `src/components/home/FAQ.jsx`:** each FAQ item now carries a plain-string `answerText` alongside its existing rich-JSX `answer` (Google requires plain text, not markup, in `acceptedAnswer.text`); a new `<Helmet>` block renders the `FAQPage` schema built from `faqs.map(...)`. `FAQ.jsx` had no Helmet before -- react-helmet-async merges multiple Helmet instances across the tree fine, confirmed no conflict with `Home.jsx`'s own Helmet block.
4. **Verified via full build + prerender:** parsed `dist/index.html`'s two `ld+json` scripts programmatically -- `LocalBusiness.sameAs` has both URLs, `FAQPage.mainEntity` has all 7 questions with correct plain-text answers.
5. **Footer: added Facebook icon next to Telegram** (`src/components/common/Footer.jsx`), linking to the same FB profile, `target="_blank"`. Reused the same monochrome `fill-current` icon pattern as WhatsApp/Telegram (there was a leftover multi-color brand `#1877F2` Facebook icon commented out from when socials were hidden -- removed the duplicate, kept the new one). All three social icons bumped 24px -> 28px per owner request.
6. **`dev` -> `main` fast-forward merge, both pushed** (`946d1f3`) -- SEO-5 + footer icon change now live on PROD.

## What Was Done (Session 49) -- SEO-4 Search Console + GA4 Consent Mode v2 -> PROD
Date: 2026-08-05

1. **SEO-4 done:** sitemap was already submitted (164 URLs, success, from before this session). Requested indexing via URL Inspection on `/`, `/sluzby`, `/honda-wt30`, `/jcb-19c-i` -- homepage was already indexed, `/sluzby` needed the manual request. Manual "Request indexing" is rate-limited (~10/day) and meant for a handful of priority pages only -- the sitemap already covers full discovery of the other ~160 URLs, don't try to hand-index the whole catalog.
2. **GA4 property created by owner** (Measurement ID `G-WTPC0SV333`), industry category "Obchod a priemysel" -- closest GA4 standard match for equipment rental, no dedicated construction/rental category exists in Google's list.
3. **Implemented GA4 with Google Consent Mode v2**, gated behind a real accept/reject cookie banner (previous banner was a single "Rozumiem" notice from back when the site truly had no analytics). New `src/lib/analytics.js` (`enableAnalytics`/`disableAnalytics`; `gtag.js` is only fetched after explicit accept -- never on boot). `index.html` sets Consent Mode default to `denied` before `gtag.js` can ever load. `CookieBanner.jsx` now has real Prijať/Odmietnuť buttons (X = same as reject). `Cookies.jsx` copy + `_ga`/`_ga_*` row updated. Visitors who dismissed the old single-button banner are re-prompted once, since they were never actually asked about analytics.
4. **Verified end-to-end on staging then PROD:** `gtag/js` + `collect` hit fire only after clicking Prijať (checked in Network tab both times), GA4 Realtime confirmed active users + `page_view` events on both environments. `dev` -> `main` fast-forward merge, both pushed (`7af7b6f`).
5. **SEO-5 blocker identified:** owner tried to give a GBP link via a `google.com/search?...` results URL (has session tokens, not stable) -- explained the difference and asked for a proper Google Maps "Share" link instead (`maps.app.goo.gl/...` or `google.com/maps/place/...`). Facebook page exists, owner will send the URL separately.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | Low | Verify SEO-5 rich results on PROD | Now live on royalstroje.sk -- run Google Rich Results Test on `/` to confirm FAQPage + sameAs picked up cleanly. |
| 2 | **OWNER** | SEO-4 follow-up: monitor GSC Pages report | 2-4 weeks from 2026-08-05 -- check indexed vs excluded counts climb (Indexovanie -> Strany in GSC). |
| 3 | Low | SEO-6: Prerender freshness hook | New/changed Supabase product shows in static HTML only after next deploy -- confirmed again in s48 (JCB `blog_article_slug`). If it bothers: Vercel Deploy Hook pinged from dashboard on product change. |
| 4 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Kept for revert; production ships HeroSplit since s37. |
| 5 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs. |
| 6 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit. |
| 7 | Low | Final real-Android scroll-check | FAQ + product grid + subpages on owner's Xiaomi, logged out of Vercel (toolbar = false positive, see s34). |
| 8 | Backlog | Workspace email migration; subcategory data audit; product photos; email notifications (EmailJS/Edge Function); chatbot CORS (mdntech.org 405); WhatsApp API; online payments; mobile AnimatedBackground re-add via CSS body bg | Details in handoff-archive.md (session 15-43 notes). |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/lib/analytics.js` | GA4 loader gated on Consent Mode v2 -- `gtag.js` only fetched after accept; Measurement ID `G-WTPC0SV333` |
| `src/components/common/CookieBanner.jsx` | Prijať/Odmietnuť consent UI, wired to `analytics.js` |
| `src/components/home/FAQ.jsx` | FAQPage JSON-LD (s50, on PROD) -- `answerText` per FAQ + `<Helmet>` block |
| `src/pages/Home.jsx` | LocalBusiness schema `sameAs` added (s50, on PROD) |
| `src/components/common/Footer.jsx` | Social icons: WhatsApp/Telegram/Facebook, all 28px (s50, on PROD) |
| `apps/dashboard/src/lib/companyInfo.js` | Company info on PDFs -- IBAN placeholder (task 5) |
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
| 50 | 2026-08-05 | SEO-5 FAQPage/sameAs + Footer Facebook icon -> PROD | Owner sent GBP Maps + FB links; sameAs added to LocalBusiness schema; FAQPage JSON-LD added to FAQ.jsx (plain-text answerText per question); Footer gets Facebook icon next to Telegram, all 3 social icons bumped to 28px; dev->main pushed (`946d1f3`) |

<!-- Sessions 1-37 summary rows + sessions 15-48 full notes + old Architecture/Supabase reference: handoff-archive.md -->
