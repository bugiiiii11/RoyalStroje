# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-54 + old reference blocks archived 2026-07-29, 2026-08-04, 2026-08-05, 2026-08-13, 2026-08-14, 2026-08-18). -->

## Current State

- **Phase:** design polish. s55+s56 (partner wall + dashboard chrome) RELEASED to PROD; migration 022 confirmed run (payment tiles show live numbers: 222 paid / 80 unpaid, 2026-08-20)
- **Session count:** 56
- **Repo status:** `dev` == `origin/dev` == `origin/main` at `8857f6f`, tree clean

## What Was Done (Session 55) -- Platby faktur v dashboarde + upratane filtre + redizajn steny partnerov
Date: 2026-08-18

1. **s53/s54 blocker closed.** The retry build went green; verified live via Node fetch (local `curl` fails with SSL exit 35 on this machine -- use Node). Note for the record: a bogus URL and `/kosik` return **HTTP 200** with the 404 shell, not a 404 status -- Vercel `rewrite` cannot change the status. Google drops them via `noindex`, so the SEO goal holds; a true 404 would need `routes` in `vercel.json`. Not worth doing.
2. **Payment status lives on `contracts.paid_at`, NOT on `invoices`** -- "Finálna zmluva" is a `contracts` row. Because NULL is the default, finalization in `ReturnItemsModal.jsx` needed **zero** changes: a new finálna zmluva is automatically unpaid. Backfill marks finálne older than 30 days as paid (owner's choice) so the counter starts from a realistic baseline.
3. Dashboard grid went 4 -> 3 columns so 6 tiles form two clean rows. Toggle on the Faktúry page uses an **optimistic local override, not `refetchCon()`** -- a refetch spinner-flashes the whole table on every single toggle.
4. **The "Všetky stavy" dropdown was not broken, it was filtering `invoices.status`** -- and no visible row carries one, since every row is a contract. Removed. **Owner confirmed the invoice subsystem stays in code.**
5. Partners: all twelve logos retrimmed, captions dropped, wall rebuilt as one hairline lattice. Desaturated rest state gated behind `@media (hover: hover)` so phones keep the logos in colour.

## What Was Done (Session 56) -- Loga partnerov zvacsene + redizajn Command Centra
Date: 2026-08-18

1. **The "grey background" on MK + UNICON was never in the assets.** Fetched the live files off PROD and checked the alpha channel: both were already transparent. Vercel serves `public/` images with `cache-control: public, max-age=86400`, so the owner's browser was holding a pre-s55 copy for up to a day. **Lesson: when a visual bug is reported on an asset that was just replaced under the same filename, check the served bytes before touching the code.** The re-cut files therefore ship under `_v2` names -- no cache can shadow them.
2. **One shared bounding box cannot size a logo wall.** Ratios run 0.76:1 to 9.35:1, so `max-w`/`max-h` left MK at 40x52 in a 325x144 cell while wordmarks filled theirs. Replaced with equal-AREA sizing: `w = sqrt(11000 * ratio)`, clamped by the cell (`logoWidth` in `Partneri.jsx`). Marks grew 25-105%.
3. **That only works if canvas ratio == ink ratio**, so every asset is now trimmed hard to its ink box (UNICON was 62% ink by height, silently rendering small). Only `width` is set on the img -- height follows the asset's own ratio, so a stale cached file renders short rather than distorted.
4. UNICON re-cut from `unicon.cz/images/logo.png` (174x53, white plate baked in) with a soft white knockout + un-premultiplied edges, then 4x LANCZOS. The old copy came from a 150x150 letterboxed source and carried white fringing. MK re-cut the same way from the 1024px JPEG.
5. M.D.N Tech lockup rebuilt on `logo-final-black` from `M.D.N-Tech-main/public/brand/` (the 2026-08-17 vectorised mark); the s55 lockup used the earlier, thinner raster. Geometry copied off the s55 file so the wall keeps its rhythm: mark h 102 : gap 39 : cap height 52, Segoe UI Bold.
6. **Dashboard: the sidebar had no edge because chrome and canvas were the same grey.** Inverted the value structure instead of adding shadows -- canvas is the tinted plane (`gray-100/70`), sidebar/header/cards are white on top with a 1px `gray-200` edge. Swept 53 `border-gray-100` call sites (invisible on white) to `gray-200`.
7. That broke the active nav row, which was marked with `bg-white` -- **any future sidebar recolour has to re-check the active state**, it has no other marker. Now orange fill + text + a solid left rail.
8. Login page: crown mark instead of the "RS" tile, "Royal Command Center" instead of the two-line brand block; sidebar eyebrow follows. Header switched from `white/80 + backdrop-blur` to opaque -- a blurred **sticky** bar is the s21 mobile-GPU-garbage construct.
9. **Could not log into the dashboard to verify** (no credentials). Shell was checked by injecting a throwaway Supabase session into `localStorage` via Puppeteer -- layout is real, all numbers read 0 because the fake token 401s. Both apps build green.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 2 | Med | Dashboard design -- next wins, owner picked none yet | Offered at the end of s56, awaiting a choice: (a) "Nový obchod" renders twice on the Dashboard, drop the page-header one; (b) sidebar "Prehľad" duplicates 4 of the 6 stat tiles, trim to what is not already on screen; (c) global search / cmd-K in the empty header; (d) compact table rows (~40% more rows per screen); (e) stat-tile colours are decorative, make them semantic (neutral/positive/attention); (f) single 1.05 MB JS chunk -- route-level code splitting |
| 3 | Med | Footer credit still uses the OLD M.D.N Tech icon | `src/components/common/Footer.jsx:235` renders `logo_mdntech.webp` (white-on-black square, superseded) while `/partneri` now shows the new mark. Fix = `logo-final-white.svg` from `M.D.N-Tech-main/public/brand/`. Owner said "zatiaľ neriešiť". Same stale icon also sits in `apps/dashboard/public/logo_mdntech.webp` (sidebar credit) |
| 4 | **OWNER** | NAP citations per `docs/nap-citations.md` -- next up: Azet, Firemný portál, Waze | Zlaté stránky + Bing done s53; Apple with the founder. Highest value is actually partner/manufacturer links, not directories. Also pending: switch GBP Website field from `www.` to the apex (canonical since s48) |
| 5 | **OWNER** | SEO-4/7 follow-up: monitor GSC Pages report (Indexovanie -> Strany) | Overdue (2-4 weeks from 2026-08-05); re-check ~2 weeks after the s53 deploy landed |
| 6 | Low | GBP products: swap studio renders for own yard photos as they get taken | 15 uploaded s54 with catalog stock renders (PNGs on Desktop, outside repo). Own photos are the stronger, non-duplicate signal |
| 7 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Production ships HeroSplit since s37 |
| 8 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 9 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit |
| 10 | Low | Final real-Android scroll-check | FAQ + product grid + subpages + `/katalog` on owner's Xiaomi, logged out of Vercel (toolbar = false positive, s34). Add the redesigned `/partneri` wall and the dashboard chrome to that pass |
| 11 | Backlog | SEO-6 prerender freshness hook; workspace email migration; subcategory data audit; product photos; email notifications; chatbot CORS (mdntech.org 405); WhatsApp API; online payments | Details in handoff-archive.md (sessions 15-43) |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/pages/Partneri.jsx` | Logo wall. `logoWidth` = equal-area sizing from each partner's `ratio`; the ratio must match the asset's trimmed canvas or the mark renders wrong. Deliberately no `max-height` on the img |
| `src/index.css` (`.partner-wall`/`.partner-logo`/`.partner-cell`) | `--logo-scale` ladder per breakpoint (0.56 / 0.7 / 0.85 / 1). Desaturation stays gated behind `@media (hover: hover)` |
| `apps/dashboard/src/components/layout/Sidebar.jsx` | White sidebar; the active row's only marker is orange fill + left rail (s56). Recolouring the sidebar means re-checking that state |
| `apps/dashboard/src/index.css` | `.sidebar-border`, `.card-interactive` (border+shadow hover, no lift), table row hover |
| `apps/dashboard/src/pages/invoices/InvoiceList.jsx` | Merged invoices+contracts list. Payment toggle writes `contracts.paid_at` with an optimistic override (s55) -- do NOT swap it for `refetchCon()` |
| `vercel.json` | SPA rewrite fallback points at `/404.html` (s53) so unknown URLs ship noindex in raw HTML -- NOT `/index.html`. Static assets get `max-age=86400` (see s56 note 1) |
| `scripts/prerender.mjs` | Puppeteer prerender; Supabase GETs proxied through Node fetch (s52) + snapshot validator; bakes `dist/404.html`. Build FAILS on missing /katalog links, NotFound product bakes, or a 404 snapshot without noindex |
| `docs/nap-citations.md` | Canonical NAP block + live SK directory list (verified 2026-08-14) + tracking table |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 47 | 2026-07-29 | RCC kalendar: tyzdenny dispecersky pohlad s ulohami -> PROD | Mesacny pohlad nahradeny tyzdennym (Po-Pi, 7-17); nova tabulka `calendar_tasks` (migracia 021, owner spustil); prenajmy v all-day pase; widget dnesnych uloh na dashboarde |
| 48 | 2026-08-04 | SEO-2 apex/www domain swap + JCB SQL + Haulotte cutout fix -> PROD | Plot priehladny "Cena dohodou" (Supabase only); Haulotte transparent WebP hole fixed without source photo; apex now canonical via Vercel API (dashboard UI bug blocked normal edit) |
| 49 | 2026-08-05 | SEO-4 Search Console + GA4 Consent Mode v2 -> PROD | Sitemap submit confirmed, indexing requested on 4 URLs; GA4 (`G-WTPC0SV333`) with full Consent Mode v2 -- gtag.js only loads after accept; CookieBanner now has real Prijat/Odmietnut; pushed (`7af7b6f`) |
| 50 | 2026-08-05 | SEO-5 FAQPage/sameAs + Footer FB icon + og:image fix -> PROD | sameAs + FAQPage JSON-LD added; Rich Results Test verified (FAQ not shown = Google policy, not a bug); site-wide og:image + schema image swapped to real yard photo; pushed (`6270a01`) |
| 51 | 2026-08-13 | NAP adresa zjednotena na Boldog + GBP + opravene mapy -> PROD | Site carried 6 conflicting addresses; split into prevadzka `Recká cesta 182` vs sidlo `Boldog 182`; "Senec" kept as service-area keyword; both Kontakt map embeds were fabricated -> coordinate embed + GBP link; GSC 141 orphan product pages diagnosed (SEO-7); pushed (`9fc7fb5`) |
| 52 | 2026-08-14 | SEO-7 interné linky + /katalog + prerender guard (na `dev`) | Catalog filtre/stránkovanie ako `<a href>`; nová stránka /katalog so všetkými produktmi; prerender proxy Supabase cez Node fetch + validátor -- build spadne pri chybnom bake; commit `c236b2e` |
| 53 | 2026-08-14 | SEO-7 na PROD + kosik zmazany + zapeceny 404 shell + NAP citacie | SEO-7 released and verified live (146/146 slugs linked from /katalog); dead cart code deleted end-to-end; prerender bakes `dist/404.html` and vercel.json rewrites there; `docs/nap-citations.md` written, then corrected after 4 listed SK directories turned out dead |
| 54 | 2026-08-14 | 15 GBP produktových PNG + release na PROD | GBP neberie WebP -> 15 PNG na plochu (mimo repa); správne párovanie ide cez Supabase `equipment.image_path` podľa slugu, nie cez názvy súborov v repe; Python SSL tu odmieta Supabase cert, Node fetch funguje; docs-only `dev`->`main` push = zároveň retry padnutého buildu `fcdeab3` |
| 55 | 2026-08-18 | Platby faktúr v dashboarde + upratané filtre + redizajn steny partnerov | `contracts.paid_at` = stav platby (migrácia 022, owner ju stále NESPUSTIL); 2 nové dlaždice + prepínač na Faktúrach s optimistickým updatom; roleta "Všetky stavy" zmazaná; M.D.N Tech + Royal Works ako partneri 5 a 6; stena partnerov prerobená na vlasovú mriežku; 4x `dev`->`main` |
| 56 | 2026-08-18 | Loga partnerov zvacsene (rovnaka opticka plocha) + redizajn Command Centra | Hlásené "šedé pozadie" bola stará cache (`max-age=86400`), nie asset -- preto `_v2` názvy; logá teraz podľa rovnakej optickej PLOCHY, nie spoločného boxu (+25-105%); UNICON a MK prerezané nanovo, MDN lockup na finálnu značku; dashboard: biele chrome na tónovanom plátne, 53 neviditeľných `border-gray-100` -> `gray-200`, aktívna položka menu prekreslená, login = "Royal Command Center"; NEPUSHnuté na PROD |

<!-- Sessions 1-46 summary rows + sessions 15-54 full notes + old Architecture/Supabase reference: handoff-archive.md -->
