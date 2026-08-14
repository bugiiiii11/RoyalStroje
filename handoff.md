# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-50 + old reference blocks archived 2026-07-29, 2026-08-04, 2026-08-05, 2026-08-13, 2026-08-14). -->

## Current State

- **Phase:** Live in production; SEO-7 (internal links for 141 orphan product pages) + prerender guard DONE on `dev` (`c236b2e`), NOT pushed / not on PROD yet
- **Session count:** 52
- **Repo status:** work on `dev`, `main` = production; `dev` ahead of `origin/dev` by 2 (s51 wrap docs + SEO-7), `main` still at `9fc7fb5`

## What Was Done (Session 52) -- SEO-7 interne linky + /katalog + prerender guard (na `dev`)
Date: 2026-08-14

1. **SEO-7 shipped on `dev` (`c236b2e`), NOT pushed** -- awaiting owner OK for dev->main. Catalog filters + pagination are real `<a href>` links (`buildHref` in Catalog.jsx; ScrollToTop only fires on pathname change, so scroll UX unchanged). New `/katalog` HTML sitemap page: all 141 products as static links grouped by category/subcategory with prices, linked site-wide from Footer, added to sitemap + prerender. Verified: baked HTML carries exactly the 141 sitemap slugs.
2. **Prerender guard DONE (was task 3):** snapshot validator in prerender.mjs fails the build when `/katalog` misses a product link or a product route bakes as NotFound (retry first, then exit 1, nothing written). A failed Vercel build is harmless -- previous deploy keeps serving.
3. **s51 non-determinism ROOT CAUSE:** the in-browser Supabase fetch fails consistently on this machine while Node fetch works (sitemap always got live data). Prerender now PROXIES Supabase GETs through Node fetch (CORS + preflight handled) -> first fully clean local build: 0 noindex product bakes, /katalog complete.
4. **Local quirk:** client-side rendering in local browsers still hits the silent staticProducts fallback (e.g. triple Custers row in screenshots) -- not a site bug; PROD client fetch works fine.
5. **GBP (owner did):** services with descriptions added, profile edited. Advice: KEEP the extra categories (Prenajom kontajnerov, Pozicovna zariadeni, Prenajom stavebnych zariadeni -- real business lines); reconsider only "Predajca stavebnych strojov" (keep if machine sales/brokering is real, else swap for a tool-shop category); primary category must stay a rental one.
6. **GBP products: 15 recommendations + prices + original descriptions generated in chat** (not in repo). Prices recommended s DPH for the GBP field; descriptions written from own DB specs + blogs (no copied manufacturer text -- copyright + duplicate content). Owner will upload.

## What Was Done (Session 51) -- NAP adresa zjednotena na Boldog + GBP + opravene mapy -> PROD
Date: 2026-08-13

1. **Owner's question: why does Maps label BESTRENT (long gone) but not Royal Stroje?** Not a website issue -- map label prominence is a GBP ranking, and the pin does render when searched directly. Levers named for the owner: report BESTRENT as permanently closed via Navrhnut upravu, complete the profile (Sluzby/Produkty/Popis), keep review velocity, build NAP citations. **Do not look for a code fix for map labels.**
2. **Root cause of the weak local signal: SIX conflicting address variants across the site.** Register (FinStat) says `Boldog 182, 925 26 Boldog`; the site variously claimed `903 01 Senec` (6 blog articles), `925 26 Senec` (impossible combination -- 925 26 is Boldog), `Senec-Boldog`, `Boldog - Senec`, and `182, Boldog 92526`. Google's "Pozicovna naradia v Boldogu" descriptor was correct all along.
3. **Decision -- two addresses, two purposes, never mixed** (BESTRENT at the same parcel proves Google geocodes the street form): **prevadzka = `Recká cesta 182, 925 26 Boldog`** (GBP, visible contact, Footer, LocalBusiness + Product schema, blog articles) vs **sidlo = `Boldog 182, 925 26 Boldog`** (GDPR/Cookies/Obchodne podmienky, Kontakt "Firemne udaje", dashboard `COMPANY`, both PDF generators, static contract template). Owner changed GBP to the prevadzka form; pin stayed correct. **"Senec" deliberately kept as a service-area keyword in prose, titles and meta.**
4. **Coordinates were wrong:** schema geo `48.2187/17.3994` is roughly Senec town centre, not the yard. Owner supplied `48.224467/17.418349` from the GBP pin; added to Home + Kontakt schema.
5. **Both Kontakt maps were broken** -- a hand-fabricated `/maps/embed?pb=...` blob with a placeholder place id and a base64 label reading "Récka cesta 182, 903 01 Senec"; links had a "Réčka" typo. Now a plain coordinate embed (no API key) + the verified GBP share link.
6. **GSC 161 non-indexed analysed:** only the 141 "Objavene - momentalne nie je v indexe" is real. 141 == exactly the product-page count; product pages are orphans (pagination/filters were `<button>`) -> became SEO-7, done in s52.
7. **GBP copy generated for the owner in chat** (not in repo): 12 service descriptions <300 chars + 750-char business description. Google rejects phone numbers, URLs and prices in service descriptions.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | High | Release SEO-7 na PROD: push `dev`, fast-forward `main` -- needs owner OK | After deploy: GSC request indexing of `/katalog`; expect "Objavene - nie je v indexe" (141) to shrink over following weeks |
| 2 | **OWNER** | GBP: upload 15 produktov (copy + ceny s DPH v s52 chate) + report BESTRENT as permanently closed | Sluzby/popisy/profil already done by owner in s52. Product photos: use own yard photos, NOT the catalog stock images |
| 3 | **OWNER** | SEO-4/7 follow-up: monitor GSC Pages report (Indexovanie -> Strany) | Due now (2-4 weeks from 2026-08-05); re-check again ~2 weeks after SEO-7 hits PROD |
| 4 | Low | SEO-6: Prerender freshness hook | New/changed Supabase product shows in static HTML only after next deploy. If it bothers: Vercel Deploy Hook pinged from dashboard on product change |
| 5 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Production ships HeroSplit since s37 |
| 6 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 7 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit |
| 8 | Low | Final real-Android scroll-check | FAQ + product grid + subpages + NEW `/katalog` page on owner's Xiaomi, logged out of Vercel (toolbar = false positive, s34) |
| 9 | Backlog | Workspace email migration; subcategory data audit; product photos; email notifications (EmailJS/Edge Function); chatbot CORS (mdntech.org 405); WhatsApp API; online payments; mobile AnimatedBackground re-add via CSS body bg | Details in handoff-archive.md (session 15-43 notes) |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/pages/Katalog.jsx` | NEW s52: /katalog HTML sitemap of all products (SEO-7); deliberately NO reveal animations -- links must be visible in baked HTML |
| `src/components/home/Catalog.jsx` | Filters + pagination render as real `<a href>` links via `buildHref` (~line 90) |
| `scripts/prerender.mjs` | Puppeteer prerender; s52: Supabase GETs proxied through Node fetch + snapshot validator (build FAILS on missing /katalog links or NotFound product bakes) |
| `scripts/generate-sitemap.mjs` + `scripts/lib/collect-urls.mjs` | Build-time sitemap; collect-urls = shared URL inventory; `/katalog` in STATIC_INDEXABLE |
| `src/hooks/useProducts.js` | Supabase fetch with SILENT fallback to `staticProducts` (line 57) -- build now guarded; remains a client-side quirk in local browsers only |
| `src/pages/Home.jsx` | LocalBusiness schema -- `sameAs` (s50), address `Boldog` + geo `48.224467/17.418349` (s51) |
| `apps/dashboard/src/lib/companyInfo.js` | `COMPANY` on PDFs -- sidlo address (s51), IBAN still "DOPLNIT" (task 6) |
| `src/data/blogMeta.js` | Single source of truth for blog metadata (`hidden: true` = unlisted + noindex + out of sitemap) |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 43 | 2026-07-16 | SEO: prerender + build-time sitemap + noindex/meta fixy (na `dev`) | Root cause weak indexing: robots.txt blocked `/assets/`; prerender ~177 URLs; helmet v3 multi-child title bug; blogMeta.js created |
| 44 | 2026-07-16 | Fix prerender boot blink + SEO-1 staging verification | `data-prerendered` suppression chain; SEO-1 verified on Vercel staging; commit `92c571d` |
| 45 | 2026-07-29 | Nový blog článok JCB 19C-1 (úprimná recenzia po 170 mth) | Replaces old hidden id-19 article; article<->catalog prelink (owner SQL pending); .claude tooling overhaul (auto-wrap hook, handoff skill, CLAUDE.md) |
| 46 | 2026-07-29 | Release sessions 43-46 na PROD + fotky strojov v CTA pásoch + promo WT30 | 3x `dev`->`main`; cutout tool `scripts/cutout-transparent.py`; Haulotte foto v SourcingBanner + CtaBand (opt-in prop); promo slide Honda WT30; hook force-push vzor zúžený; zistený apex->www redirect vs apex canonical |
| 47 | 2026-07-29 | RCC kalendar: tyzdenny dispecersky pohlad s ulohami -> PROD | Mesacny pohlad nahradeny tyzdennym (Po-Pi, 7-17); nova tabulka `calendar_tasks` (migracia 021, owner spustil); prenajmy v all-day pase; widget dnesnych uloh na dashboarde; fonty zvacsene po feedbacku |
| 48 | 2026-08-04 | SEO-2 apex/www domain swap + JCB SQL + Haulotte cutout fix -> PROD | Plot priehladny "Cena dohodou" (Supabase only); Haulotte transparent WebP hole fixed without source photo; JCB blog_article_slug set; apex now canonical via Vercel API (dashboard UI bug blocked normal edit); safety hook temp exception scoped+reverted with owner approval |
| 49 | 2026-08-05 | SEO-4 Search Console + GA4 Consent Mode v2 -> PROD | Sitemap submit confirmed, indexing requested on 4 URLs; GA4 (`G-WTPC0SV333`) with full Consent Mode v2 -- gtag.js only loads after accept; CookieBanner now has real Prijat/Odmietnut; verified on staging + PROD; dev->main pushed (`7af7b6f`) |
| 50 | 2026-08-05 | SEO-5 FAQPage/sameAs + Footer FB icon + og:image fix -> PROD | Owner sent GBP Maps + FB links; sameAs + FAQPage JSON-LD added; Rich Results Test verified (FAQ not shown = Google policy, not a bug); Footer gets Facebook icon, social icons 28px; site-wide og:image + schema image swapped to real yard photo (stroje-dvor.webp); dev->main pushed (`6270a01`) |
| 51 | 2026-08-13 | NAP adresa zjednotena na Boldog + GBP + opravene mapy -> PROD | Site carried 6 conflicting addresses; split into prevadzka `Recká cesta 182, 925 26 Boldog` vs sidlo `Boldog 182, 925 26 Boldog`; "Senec" kept as service-area keyword; geo fixed to the real yard; both Kontakt map embeds were fabricated -> coordinate embed + GBP link; GSC 141 orphan product pages diagnosed (SEO-7); prerender non-determinism found; dev->main pushed (`9fc7fb5`) |
| 52 | 2026-08-14 | SEO-7 interné linky + /katalog + prerender guard (na `dev`) | Catalog filtre/stránkovanie ako `<a href>`; nová stránka /katalog so všetkými 141 produktmi (Footer link, sitemap, prerender, validované); prerender proxy Supabase cez Node fetch + validátor -- build spadne pri chybnom bake, vyriešený s51 nedeterminizmus; GBP rada ku kategóriám + 15 produktových popisov s cenami v chate; commit `c236b2e`, NEPUSHnuté |

<!-- Sessions 1-42 summary rows + sessions 15-50 full notes + old Architecture/Supabase reference: handoff-archive.md -->
