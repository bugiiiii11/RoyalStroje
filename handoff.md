# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-52 + old reference blocks archived 2026-07-29, 2026-08-04, 2026-08-05, 2026-08-13, 2026-08-14). -->

## Current State

- **Phase:** GBP product catalogue populated (15 products live). Docs-only push to `main` fired a fresh PROD build -- **verify it went green**, since the previous build of `fcdeab3` failed and PROD may still be serving pre-`296d1f8` HTML (cart removal + baked 404 shell)
- **Session count:** 54
- **Repo status:** `dev` == `main` == `origin`, working tree clean

## What Was Done (Session 54) -- 15 GBP produktovych PNG + release na PROD
Date: 2026-08-14

1. **GBP does not accept WebP** -- generated PNG versions of the 15 GBP products into `C:\Users\cryptomeda\Desktop\GBP-produkty-PNG\` (deliberately OUTSIDE the repo so they never get committed). Owner uploaded all 15 to GBP the same day. **Task 2 is done.**
2. **The s52 15-product list existed only in chat, not in the repo** -- owner re-pasted it. Repo filenames were NOT a reliable key: 5 of the 15 (WN 803, DW20, RD18, TH412, Avant 528) have no matching file under `public/pictures/Katalog-PNG/`. **Authoritative mapping = query Supabase `equipment.image_path` by slug**, which is exactly what the live product page renders. Those 5 live in Supabase Storage (`equipment-images/...`), not in the repo.
3. **Machine gotcha: Python's SSL trust store rejects the Supabase cert here** (`CERTIFICATE_VERIFY_FAILED ... Basic Constraints of CA cert not marked critical`) while **Node `fetch` works fine** -- same asymmetry as the s52 browser-vs-Node finding, opposite direction. Pattern that works: download with Node, process with Pillow.
4. **GBP image rules applied:** flatten any alpha onto white (GBP renders transparency black), upscale to >=720px on the short side (2 of 15 needed it), PNG well under the 5 MB cap. Verified all 15 visually via a generated contact sheet before handing them over.
5. **Flagged to owner, not acted on:** these are manufacturer studio renders on white -- own yard photos remain the stronger GBP signal (non-duplicate vs other rental firms). Treat the PNGs as the fallback where no own photo exists.
6. **Released to PROD** -- docs-only `dev`->`main` fast-forward. Serves double duty as the Redeploy for the s53 blocker: the failed build was on `fcdeab3`, so this push rebuilds the same code.

## What Was Done (Session 53) -- SEO-7 na PROD + kosik zmazany + zapeceny 404 shell + NAP citacie
Date: 2026-08-14

1. **SEO-7 released to PROD** (`f0e15f4`, dev -> main fast-forward). Verified live: `/katalog` 200, all 146 top-level sitemap slugs present as real `<a href>` (checked slug-by-slug), product pages carry Product JSON-LD and no noindex. Owner requested indexing of `/katalog` in GSC.
2. **Cart deleted** -- it was already dead code (`showCart = false`, MobileNav entry commented out, `Cart.jsx` never imported anywhere). Removed `Kosik.jsx`, `CartContext.jsx`, `Cart.jsx`, the route + provider in `App.jsx`, the hidden JSX block and its calendar/order helpers in `Catalog.jsx`, `/kosik` from `collect-urls.mjs` + `robots.txt`, and the `royalstroje_cart` row from the Cookies table. **`customerType` and the `Calendar`/`X` icons stay** -- the price toggle and FAQ use them, not the cart.
3. **Real 404 fix (owner asked for "noindex on NotFound" -- it was already there).** The actual gap was serverside: `vercel.json` rewrote every unknown URL to `dist/index.html`, so a crawler's FIRST fetch of a bogus path got homepage HTML with `canonical=/` and no noindex. Prerender now bakes the NotFound view to `dist/404.html` (route `/__prerender-404__/nenajdene`, hits App's `*` route) and the rewrite points there. Validator fails the build if that snapshot lacks noindex. **Side effect, accepted:** a Supabase product added after the last deploy serves the 404 shell HTML until the next build -- harmless, Google can't discover it before then anyway (not in sitemap/`/katalog`).
4. **PROD BUILD FAILED on `fcdeab3` -- not a code defect.** Preview (same commit) succeeded, dashboard + portal prod succeeded, only `royal-stroje` prod failed. Verified the exact commit on the staging URL: bogus URL -> "Stránka nenájdená" + noindex + no canonical, `/kosik` gone, `/katalog` intact. Almost certainly transient (prerender guard catching a Supabase flake, or Puppeteer OOM with 3 projects building within 4 minutes). **Logs unreadable from here -- the Vercel project lives under `martins-projects-48bcb01d`, the local CLI is authed as `bugiiiiis-projects`.**
5. **NAP citations: `docs/nap-citations.md` created** -- canonical NAP block, per-directory workflow, tracking table. **First version listed four dead directories; verified and corrected 2026-08-14:** firmy.sk parked, firmy.azet.sk NXDOMAIN, surne.sk for sale, edb.sk unreachable. Azet moved to `azet.sk/katalog/pridat/firma/` (free, 3 categories, admin-reviewed); Firemný portál is the other live free one; Infoma is paid inzercia; SlovakData is register-only. **Firmy.cz/Mapy.cz ruled out** -- Seznam only accepts businesses operating in the CZ.
6. **Owner did in GBP:** removed "Slovensko" from the service area (kept the specific towns), registered Zlaté stránky, imported into Bing Places (pending publish, 7-12 days), sent Apple Business Connect to the founder. Noted for later: GBP's Website field is still `https://www.royalstroje.sk/` -- apex has been canonical since s48, worth switching on the next profile edit.
7. **GBP "Boldog-Senec" is NOT an inconsistency** -- the profile form holds `Rečká cesta 182 / 925 26 / Boldog`; Google appends the district itself when rendering. Do not "fix" it and never write `Boldog-Senec` on the site (that would be a 7th address variant). Pin coordinates confirmed to match the schema geo.
8. **Ran ~40 polling requests against PROD and tripped Vercel's bot mitigation** (403 "Vercel Security Checkpoint" for several minutes, from two different IPs). Cleared on its own. **Don't poll production in a tight loop** -- use the GitHub deployments API (`api.github.com/repos/bugiiiii11/RoyalStroje/deployments`) to watch deploy state instead, it is public and needs no auth.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | **High** | Confirm the s54 PROD build went green -- it is the retry of the failed `fcdeab3` build | Verify live: bogus URL -> "Stránka nenájdená" + noindex + no canonical, `/kosik` 404, `/katalog` intact. If it fails AGAIN it is not transient and the log is the only way forward -- owner must fetch it, the local CLI cannot reach the `martins-projects-48bcb01d` Vercel scope. **Do not poll PROD in a loop** (s53 tripped bot mitigation) -- use `api.github.com/repos/bugiiiii11/RoyalStroje/deployments` |
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
| `apps/dashboard/src/lib/companyInfo.js` | `COMPANY` on PDFs -- sidlo address (s51), IBAN still "DOPLNIT" (task 6) |
| `src/data/blogMeta.js` | Single source of truth for blog metadata (`hidden: true` = unlisted + noindex + out of sitemap) |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 45 | 2026-07-29 | Nový blog článok JCB 19C-1 (úprimná recenzia po 170 mth) | Replaces old hidden id-19 article; article<->catalog prelink (owner SQL pending); .claude tooling overhaul (auto-wrap hook, handoff skill, CLAUDE.md) |
| 46 | 2026-07-29 | Release sessions 43-46 na PROD + fotky strojov v CTA pásoch + promo WT30 | 3x `dev`->`main`; cutout tool `scripts/cutout-transparent.py`; Haulotte foto v SourcingBanner + CtaBand (opt-in prop); promo slide Honda WT30; hook force-push vzor zúžený; zistený apex->www redirect vs apex canonical |
| 47 | 2026-07-29 | RCC kalendar: tyzdenny dispecersky pohlad s ulohami -> PROD | Mesacny pohlad nahradeny tyzdennym (Po-Pi, 7-17); nova tabulka `calendar_tasks` (migracia 021, owner spustil); prenajmy v all-day pase; widget dnesnych uloh na dashboarde; fonty zvacsene po feedbacku |
| 48 | 2026-08-04 | SEO-2 apex/www domain swap + JCB SQL + Haulotte cutout fix -> PROD | Plot priehladny "Cena dohodou" (Supabase only); Haulotte transparent WebP hole fixed without source photo; JCB blog_article_slug set; apex now canonical via Vercel API (dashboard UI bug blocked normal edit); safety hook temp exception scoped+reverted with owner approval |
| 49 | 2026-08-05 | SEO-4 Search Console + GA4 Consent Mode v2 -> PROD | Sitemap submit confirmed, indexing requested on 4 URLs; GA4 (`G-WTPC0SV333`) with full Consent Mode v2 -- gtag.js only loads after accept; CookieBanner now has real Prijat/Odmietnut; verified on staging + PROD; dev->main pushed (`7af7b6f`) |
| 50 | 2026-08-05 | SEO-5 FAQPage/sameAs + Footer FB icon + og:image fix -> PROD | Owner sent GBP Maps + FB links; sameAs + FAQPage JSON-LD added; Rich Results Test verified (FAQ not shown = Google policy, not a bug); Footer gets Facebook icon, social icons 28px; site-wide og:image + schema image swapped to real yard photo (stroje-dvor.webp); dev->main pushed (`6270a01`) |
| 51 | 2026-08-13 | NAP adresa zjednotena na Boldog + GBP + opravene mapy -> PROD | Site carried 6 conflicting addresses; split into prevadzka `Recká cesta 182, 925 26 Boldog` vs sidlo `Boldog 182, 925 26 Boldog`; "Senec" kept as service-area keyword; geo fixed to the real yard; both Kontakt map embeds were fabricated -> coordinate embed + GBP link; GSC 141 orphan product pages diagnosed (SEO-7); prerender non-determinism found; dev->main pushed (`9fc7fb5`) |
| 52 | 2026-08-14 | SEO-7 interné linky + /katalog + prerender guard (na `dev`) | Catalog filtre/stránkovanie ako `<a href>`; nová stránka /katalog so všetkými 141 produktmi (Footer link, sitemap, prerender, validované); prerender proxy Supabase cez Node fetch + validátor -- build spadne pri chybnom bake, vyriešený s51 nedeterminizmus; GBP rada ku kategóriám + 15 produktových popisov s cenami v chate; commit `c236b2e`, NEPUSHnuté |
| 53 | 2026-08-14 | SEO-7 na PROD + kosik zmazany + zapeceny 404 shell + NAP citacie | SEO-7 released and verified live (146/146 slugs linked from /katalog); dead cart code deleted end-to-end; real 404 fix = prerender bakes `dist/404.html` and vercel.json rewrites there, so noindex ships in raw HTML; PROD build of `fcdeab3` FAILED (transient -- same commit green on Preview + locally), awaiting Redeploy; `docs/nap-citations.md` written, then corrected after 4 listed SK directories turned out dead |
| 54 | 2026-08-14 | 15 GBP produktových PNG + release na PROD | GBP neberie WebP -> 15 PNG na plochu (mimo repa), owner nahral do GBP; správne párovanie ide cez Supabase `equipment.image_path` podľa slugu, nie cez názvy súborov v repe (5 z 15 je len v Supabase Storage); Python SSL tu odmieta Supabase cert, Node fetch funguje; docs-only `dev`->`main` push = zároveň retry padnutého buildu `fcdeab3` |

<!-- Sessions 1-44 summary rows + sessions 15-52 full notes + old Architecture/Supabase reference: handoff-archive.md -->
