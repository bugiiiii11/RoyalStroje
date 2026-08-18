# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-53 + old reference blocks archived 2026-07-29, 2026-08-04, 2026-08-05, 2026-08-13, 2026-08-14, 2026-08-18). -->

## Current State

- **Phase:** s53 blocker CLEARED -- the s54 PROD build went green and all three checks verified live on 2026-08-18 (bogus URL -> noindex + no canonical, `/kosik` serves the 404 shell, `/katalog` links all ~146 products). Dashboard now tracks invoice payment status; partners page redesigned
- **Session count:** 55
- **Repo status:** `dev` == `main` == `origin`, working tree clean. 4 pushes to PROD this session
- **PENDING OWNER ACTION:** migration `022_contract_payment_status.sql` must be run in the Supabase SQL editor. Until then the two new dashboard tiles read 0 and the payment toggle errors -- code degrades gracefully, it does not crash

## What Was Done (Session 54) -- 15 GBP produktovych PNG + release na PROD
Date: 2026-08-14

1. **GBP does not accept WebP** -- generated PNG versions of the 15 GBP products into `C:\Users\cryptomeda\Desktop\GBP-produkty-PNG\` (deliberately OUTSIDE the repo so they never get committed). Owner uploaded all 15 to GBP the same day. **Task 2 is done.**
2. **The s52 15-product list existed only in chat, not in the repo** -- owner re-pasted it. Repo filenames were NOT a reliable key: 5 of the 15 (WN 803, DW20, RD18, TH412, Avant 528) have no matching file under `public/pictures/Katalog-PNG/`. **Authoritative mapping = query Supabase `equipment.image_path` by slug**, which is exactly what the live product page renders. Those 5 live in Supabase Storage (`equipment-images/...`), not in the repo.
3. **Machine gotcha: Python's SSL trust store rejects the Supabase cert here** (`CERTIFICATE_VERIFY_FAILED ... Basic Constraints of CA cert not marked critical`) while **Node `fetch` works fine** -- same asymmetry as the s52 browser-vs-Node finding, opposite direction. Pattern that works: download with Node, process with Pillow.
4. **GBP image rules applied:** flatten any alpha onto white (GBP renders transparency black), upscale to >=720px on the short side (2 of 15 needed it), PNG well under the 5 MB cap. Verified all 15 visually via a generated contact sheet before handing them over.
5. **Flagged to owner, not acted on:** these are manufacturer studio renders on white -- own yard photos remain the stronger GBP signal (non-duplicate vs other rental firms). Treat the PNGs as the fallback where no own photo exists.
6. **Released to PROD** -- docs-only `dev`->`main` fast-forward. Serves double duty as the Redeploy for the s53 blocker: the failed build was on `fcdeab3`, so this push rebuilds the same code.

## What Was Done (Session 55) -- Platby faktur v dashboarde + upratane filtre + redizajn steny partnerov
Date: 2026-08-18

1. **s53/s54 blocker closed.** The retry build went green; verified live via Node fetch (local `curl` fails with SSL exit 35 on this machine -- use Node). Note for the record: a bogus URL and `/kosik` return **HTTP 200** with the 404 shell, not a 404 status -- Vercel `rewrite` cannot change the status. Google drops them via `noindex`, so the SEO goal holds; a true 404 would need `routes` in `vercel.json`. Not worth doing.
2. **Payment status lives on `contracts.paid_at`, NOT on `invoices`** -- "Finálna zmluva" is a `contracts` row. Because NULL is the default, finalization in `ReturnItemsModal.jsx` needed **zero** changes: a new finálna zmluva is automatically unpaid. Backfill marks finálne older than 30 days as paid (owner's choice) so the counter starts from a realistic baseline.
3. Dashboard grid went 4 -> 3 columns so 6 tiles form two clean rows. The two new tiles show count + summed `final_total` and link into the filtered list via `?payment=`. Toggle on the Faktúry page uses an **optimistic local override, not `refetchCon()`** -- a refetch spinner-flashes the whole table on every single toggle.
4. **The "Všetky stavy" dropdown was not broken, it was filtering `invoices.status`** -- and no visible row carries one, since every row is a contract. Removed. Type dropdown trimmed to Návrh/Finálna. **Owner confirmed the invoice subsystem stays in code** (the green "Faktúra" button on a completed deal is live), so only the UI was trimmed.
5. **Partners: the captions were the symptom, the sizing was the disease.** Every logo was letterboxed in a square canvas with its own internal padding, so each brand rendered at a different optical size. All twelve retrimmed to their content box; CSS now normalises (aspect ratios 0.76:1 to 7.3:1). The old tiles carried `ring-white/10` -- invisible on a near-white page.
6. **Desaturated rest state is gated behind `@media (hover: hover)`.** A phone never fires hover, so ungated it would leave logos permanently grey for a mobile-heavy audience. On touch they stay in colour. MK + UNICON shipped as opaque RGB; their white field is now transparent, which the darkened rest state was exposing as a grey box.
7. **M.D.N Tech had no lockup asset** -- `public/brand/` in that repo ships the icon only. Rebuilt as icon + "M.D.N Tech" in Segoe UI Bold; their site sets **no custom font** (Tailwind default sans), so bold system sans is a faithful match, not a guess. Royal Works already had `lockup-mono-black` ready.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 0 | **OWNER** | Run `supabase/migrations/022_contract_payment_status.sql` in the Supabase SQL editor | Adds `contracts.paid_at` + backfills finálne older than 30 days as paid + partial index. No RLS change needed (`contracts_all` from 011 already covers it). After it runs, review the last 30 days on the Faktúry page and mark the genuinely paid ones |
| 1 | Med | Footer credit still uses the OLD M.D.N Tech icon | `src/components/common/Footer.jsx:235` renders `logo_mdntech.webp` (white-on-black square, superseded design) while `/partneri` now shows the new mark -- same page, two logos. Fix = `logo-final-white.svg` from `M.D.N-Tech-main/public/brand/`. Owner said "zatiaľ neriešiť"; touches the footer on every page |
| 2 | Low | GBP products: swap studio renders for own yard photos as they get taken | 15 products uploaded s54 with catalog stock renders (PNGs on Desktop, outside repo). Own photos are the stronger, non-duplicate signal. BESTRENT already reported (correctly, as "not at this location" -- other branches still trade, so NOT "permanently closed") |
| 3 | **OWNER** | NAP citations per `docs/nap-citations.md` -- next up: Azet, Firemný portál, Waze | Zlaté stránky + Bing done s53; Apple with the founder. Highest value is actually partner/manufacturer links, not directories. Also pending: switch GBP Website field from `www.` to the apex (canonical since s48) |
| 4 | **OWNER** | SEO-4/7 follow-up: monitor GSC Pages report (Indexovanie -> Strany) | Due now (2-4 weeks from 2026-08-05); re-check ~2 weeks after the s53 deploy lands |
| 5 | Low | SEO-6: Prerender freshness hook | New/changed Supabase product shows in static HTML only after next deploy. If it bothers: Vercel Deploy Hook pinged from dashboard on product change |
| 6 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Production ships HeroSplit since s37 |
| 7 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 8 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit |
| 9 | Low | Final real-Android scroll-check | FAQ + product grid + subpages + NEW `/katalog` page on owner's Xiaomi, logged out of Vercel (toolbar = false positive, s34) |
| 10 | Backlog | Workspace email migration; subcategory data audit; product photos; email notifications (EmailJS/Edge Function); chatbot CORS (mdntech.org 405); WhatsApp API; online payments; mobile AnimatedBackground re-add via CSS body bg | Details in handoff-archive.md (session 15-43 notes) |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/pages/Katalog.jsx` | NEW s52: /katalog HTML sitemap of all products (SEO-7); deliberately NO reveal animations -- links must be visible in baked HTML |
| `src/components/home/Catalog.jsx` | Filters + pagination render as real `<a href>` links via `buildHref` (~line 90). Cart code removed s53; `customerType` stays (price toggle) |
| `vercel.json` | SPA rewrite fallback points at `/404.html` (s53) so unknown URLs ship noindex in raw HTML -- NOT `/index.html` |
| `docs/nap-citations.md` | Canonical NAP block + live SK directory list (verified 2026-08-14) + tracking table |
| `scripts/prerender.mjs` | Puppeteer prerender; Supabase GETs proxied through Node fetch (s52) + snapshot validator; s53 also bakes `dist/404.html` from `NOT_FOUND_ROUTE`. Build FAILS on missing /katalog links, NotFound product bakes, or a 404 snapshot without noindex |
| `scripts/generate-sitemap.mjs` + `scripts/lib/collect-urls.mjs` | Build-time sitemap; collect-urls = shared URL inventory; `/katalog` in STATIC_INDEXABLE |
| `src/hooks/useProducts.js` | Supabase fetch with SILENT fallback to `staticProducts` (line 57) -- build now guarded; remains a client-side quirk in local browsers only |
| `src/pages/Home.jsx` | LocalBusiness schema -- `sameAs` (s50), address `Boldog` + geo `48.224467/17.418349` (s51) |
| `apps/dashboard/src/lib/companyInfo.js` | `COMPANY` on PDFs -- sidlo address (s51), IBAN still "DOPLNIT" (task 7) |
| `apps/dashboard/src/pages/invoices/InvoiceList.jsx` | Merged invoices+contracts list. Payment toggle writes `contracts.paid_at` with an optimistic override (s55) -- do NOT swap it for `refetchCon()`, that spinner-flashes the table |
| `src/pages/Partneri.jsx` + `src/index.css` (`.partner-cell`/`.partner-logo`) | Logo wall: one hairline lattice, no captions. Logos are trimmed to content, so CSS max-w/max-h does the sizing -- a new partner logo must be trimmed the same way or it will render oversized. Desaturation is gated behind `@media (hover: hover)` on purpose |
| `src/data/blogMeta.js` | Single source of truth for blog metadata (`hidden: true` = unlisted + noindex + out of sitemap) |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 46 | 2026-07-29 | Release sessions 43-46 na PROD + fotky strojov v CTA pásoch + promo WT30 | 3x `dev`->`main`; cutout tool `scripts/cutout-transparent.py`; Haulotte foto v SourcingBanner + CtaBand (opt-in prop); promo slide Honda WT30; hook force-push vzor zúžený; zistený apex->www redirect vs apex canonical |
| 47 | 2026-07-29 | RCC kalendar: tyzdenny dispecersky pohlad s ulohami -> PROD | Mesacny pohlad nahradeny tyzdennym (Po-Pi, 7-17); nova tabulka `calendar_tasks` (migracia 021, owner spustil); prenajmy v all-day pase; widget dnesnych uloh na dashboarde; fonty zvacsene po feedbacku |
| 48 | 2026-08-04 | SEO-2 apex/www domain swap + JCB SQL + Haulotte cutout fix -> PROD | Plot priehladny "Cena dohodou" (Supabase only); Haulotte transparent WebP hole fixed without source photo; JCB blog_article_slug set; apex now canonical via Vercel API (dashboard UI bug blocked normal edit); safety hook temp exception scoped+reverted with owner approval |
| 49 | 2026-08-05 | SEO-4 Search Console + GA4 Consent Mode v2 -> PROD | Sitemap submit confirmed, indexing requested on 4 URLs; GA4 (`G-WTPC0SV333`) with full Consent Mode v2 -- gtag.js only loads after accept; CookieBanner now has real Prijat/Odmietnut; verified on staging + PROD; dev->main pushed (`7af7b6f`) |
| 50 | 2026-08-05 | SEO-5 FAQPage/sameAs + Footer FB icon + og:image fix -> PROD | Owner sent GBP Maps + FB links; sameAs + FAQPage JSON-LD added; Rich Results Test verified (FAQ not shown = Google policy, not a bug); Footer gets Facebook icon, social icons 28px; site-wide og:image + schema image swapped to real yard photo (stroje-dvor.webp); dev->main pushed (`6270a01`) |
| 51 | 2026-08-13 | NAP adresa zjednotena na Boldog + GBP + opravene mapy -> PROD | Site carried 6 conflicting addresses; split into prevadzka `Recká cesta 182, 925 26 Boldog` vs sidlo `Boldog 182, 925 26 Boldog`; "Senec" kept as service-area keyword; geo fixed to the real yard; both Kontakt map embeds were fabricated -> coordinate embed + GBP link; GSC 141 orphan product pages diagnosed (SEO-7); prerender non-determinism found; dev->main pushed (`9fc7fb5`) |
| 52 | 2026-08-14 | SEO-7 interné linky + /katalog + prerender guard (na `dev`) | Catalog filtre/stránkovanie ako `<a href>`; nová stránka /katalog so všetkými 141 produktmi (Footer link, sitemap, prerender, validované); prerender proxy Supabase cez Node fetch + validátor -- build spadne pri chybnom bake, vyriešený s51 nedeterminizmus; GBP rada ku kategóriám + 15 produktových popisov s cenami v chate; commit `c236b2e`, NEPUSHnuté |
| 53 | 2026-08-14 | SEO-7 na PROD + kosik zmazany + zapeceny 404 shell + NAP citacie | SEO-7 released and verified live (146/146 slugs linked from /katalog); dead cart code deleted end-to-end; real 404 fix = prerender bakes `dist/404.html` and vercel.json rewrites there, so noindex ships in raw HTML; PROD build of `fcdeab3` FAILED (transient -- same commit green on Preview + locally), awaiting Redeploy; `docs/nap-citations.md` written, then corrected after 4 listed SK directories turned out dead |
| 55 | 2026-08-18 | Platby faktúr v dashboarde + upratané filtre + redizajn steny partnerov | s53/s54 blocker overený zeleny na PROD (curl tu padá na SSL, over cez Node); `contracts.paid_at` = stav platby (migrácia 022, owner ju ešte NESPUSTIL), finalizácia nepotrebovala zmenu -- NULL default = nezaplatená; 2 nové dlaždice (počet + suma) + prepínač na Faktúrach s optimistickým updatom; roleta "Všetky stavy" zmazaná (filtrovala `invoices.status`, ktorý žiadny viditeľný riadok nemá); M.D.N Tech + Royal Works ako partneri 5 a 6 (MDN lockup dostavaný, `brand/` má len ikonu); stena partnerov prerobená na jednu vlasovú mriežku bez popiskov, všetkých 12 log orezaných na obsah; 4x `dev`->`main` |
| 54 | 2026-08-14 | 15 GBP produktových PNG + release na PROD | GBP neberie WebP -> 15 PNG na plochu (mimo repa), owner nahral do GBP; správne párovanie ide cez Supabase `equipment.image_path` podľa slugu, nie cez názvy súborov v repe (5 z 15 je len v Supabase Storage); Python SSL tu odmieta Supabase cert, Node fetch funguje; docs-only `dev`->`main` push = zároveň retry padnutého buildu `fcdeab3` |

<!-- Sessions 1-44 summary rows + sessions 15-52 full notes + old Architecture/Supabase reference: handoff-archive.md -->
