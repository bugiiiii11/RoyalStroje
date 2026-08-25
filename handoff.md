# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-55 + old reference blocks; last rotation 2026-08-20). -->

## Current State

- **Phase:** RCC feature work + chatbot KB pipeline. Everything through s58 released to PROD (`727683c`); migrations 022 AND 023 confirmed run by owner
- **Session count:** 58
- **Repo status:** `dev` == `origin/dev` == `origin/main` at `727683c` + local wrap commit. M.D.N-Tech-main repo pushed to its main (`d10cc5c`) -- Import .md button deploying to admin.mdntech.org

## What Was Done (Session 58) -- Klient sa uklada pred obchodom + KB pipeline pre chatbota
Date: 2026-08-25

1. **Novy obchod krok 1: klient musi byt v DB skor, nez vznikne obchod.** "Ulozit klienta" teraz vlozi klienta + kontakty, ostane na kroku 1 (zeleny toast, novy `components/ui/Toast.jsx`), formular sa zamkne (`fieldset disabled`) a az potom sa odomkne "Vytvorit obchod". Duplicitna insert vetva `_isNew` v `NewDeal.handleSubmit` zmazana -- vytvaranie klienta zije len na jednom mieste.
2. **Chatbot KB bola od marca 2026 zastarana a klamala by zakaznikom**: doprava (stara "Senec zadarmo/BA 40 EUR" vs. dnesne Senec 15 EUR / 1 EUR/km / 1,20 pickup / 1,50 cudzia technika), NAP (prevadzka Recka 182 vs. sidlo Boldog 182), sluzby (Royal Fleet/servis/zemne prace uz na webe nie su; pribudlo "Zozenieme akykolvek stroj" + autorizovany predajca Makita). Vsetkych 5 suborov v `knowledgebase/` prepisanych podla aktualneho webu.
3. **Katalog produktov sa do KB nikdy nedostal, lebo zije v Supabase, nie v repe.** Novy `scripts/kb-data.mjs` (Node, cita .env sam) stiahne 158 aktivnych strojov s cenami s DPH (x1.23, ako web) a linkami -- vygenerovany obsah je telom `03-produkty.md`. KB spolu 5,6k slov.
4. **Import .md button v M.D.N-Tech konzole** (`KBImportButton.tsx`, commit `d10cc5c` na ich main): parsuje export format (roundtrip) aj plain .md (1 subor = 1 entry, kategoria z nazvu suboru, title z H1), preview modal, mody Replace/Merge. tsc + next build zelene; klikaciu skusku nemam (bez loginu do konzoly).
5. `build-kb` skill (globalny) upgradnuty: detekuje `knowledgebase/` layout, spusta `scripts/kb-data.mjs` ako zdroj zivych dat, pravidlo "web vyhrava nad starou KB".
6. Vsetko pushnute: RoyalStroje `dev`+`main` = `727683c`, mdn-tech `main` = `d10cc5c` (isiel s nim aj ich cakajuci wrap commit `b77cab6`).

## What Was Done (Session 57) -- Custom cena fix + reporty s 4 zalozkami + SILKOT-ETI
Date: 2026-08-20

1. **Custom final price never reached revenue** -- return flow wrote it only to `contracts.final_total`, while dashboard/reports read `reservations.total/vat_amount`. Fix: every finalization AND price edit now syncs reservation money fields to the SUM of all finálne contracts via `buildFinancialSync` (`lib/reservationFinance.js`); discount/delivery zeroed (folded into the custom price). Backfill migration 023 **run by owner 2026-08-20, verified working** -- historical revenue now matches contracts.
2. **New: edit price on a finálna zmluva** -- pencil in the "Finálna zmluva" dropdown on DealDetail opens `EditFinalPriceModal` (net/gross linked both ways at 23%), writes contract + syncs system + logs `contract.price_updated` into Aktivita.
3. **Reports rebuilt into 4 tabs** (`?tab=` param): Prehľad (tiles + 6-month chart + avg rental length/value), Pohľadávky (unpaid aging 0-14/15-30/30+ by return_date + oldest-unpaid call list), Stroje (rented-days last 30d, category revenue this year, all-time demand), Klienti (top net, new vs returning). One broad fetch per table replaced the per-month query loop.
4. **Revenue basis unified on `date_from`** (was `created_at` on tiles vs `date_from` on chart -- numbers disagreed by a few EUR). Dashboard tile + sidebar + Reports now agree. Top klienti switched to bez DPH.
5. Reports "Faktúry (zaplatené)" counted the dead `invoices` table (always 0/0) -- now counts finálne zmluvy with `paid_at`, tile clicks through to Faktúry.
6. Sidebar Prehľad: "Dnešné udalosti" dropped for a live "Dnešné úlohy (splnené)" done/total counter -- `useCalendarTasks` mutations broadcast `rs:stats-refresh`, `useDashboardStats` listens (refreshes silently, loading only gates first paint).
7. Dashboard reorder per owner: Pipeline above Dnešný rozvrh; calendar hour grid (tasks) above the Prenájmy lane (heavy rule flipped to border-top).
8. **Contract vocabulary renamed in the UI only** (owner's wording): nav "Faktúry" -> "Zmluvy", heading "Faktúry & Zmluvy" -> "Zmluvy", `navrh` -> "Otvorená zmluva"/"Otvorená", `finalna` -> "Ukončená zmluva"/"Ukončená" (list, filter, DealDetail buttons). **DB values untouched** -- `contracts.type` stays `navrh`/`finalna`, so `?type=` URLs, queries and reports keep working. Do NOT rename the DB values without sweeping every query.
9. List "Celkom" column -> "Celkom bez DPH" showing NET: invoices use their own `subtotal`, contracts derive it (`final_total` is stored WITH VAT). Return modal also gained a net price field linked both ways to gross.
10. Zmluvy page: second search field filters by client with type-ahead (`ClientSearchInput`). Suggestions come from names present in the LOADED rows, not the `clients` table -- a pick can never produce an empty table. Matching is substring + diacritic-insensitive (`stripDiacritics`, exported for reuse).
11. **SILKOT-ETI added as partner 13** -- source PNG was white-backed RGB; re-cut with the s56 soft-knockout method, ratio 5.31, 4x LANCZOS (`logo_silkot_eti.webp`). 13 partners break the 2/3/4-col lattice, so blank white filler cells top up the last row per breakpoint (1/2/3).

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | **OWNER** | Import novej KB do chatkit konzoly | Po dobehnuti Vercel deploya mdn-tech: admin.mdntech.org -> chatbot Pan Krivosudsky -> "Import .md" -> vybrat vsetkych 6 suborov z `knowledgebase/` -> mod **Replace**. Overit, ze vznikne 6 entries (general/about/faq/products/other/policies) a chatbot odpoveda nove ceny dopravy |
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
| `apps/dashboard/src/lib/reservationFinance.js` | `buildFinancialSync(gross)` -- THE way reservation money fields follow finálne contracts. Any new flow touching final prices must call it |
| `apps/dashboard/src/pages/reports/Reports.jsx` | 4-tab reports; all stats derived client-side from 4 broad fetches; revenue basis = `date_from` |
| `scripts/kb-data.mjs` + `knowledgebase/` | Chatbot KB pipeline: kb-data pulls the live Supabase catalog into `03-produkty.md`; 1 file = 1 console entry; sync via "Import .md" (Replace) in the mdn-tech console |
| `apps/dashboard/src/pages/invoices/InvoiceList.jsx` | "Zmluvy" page (merged invoices+contracts). Payment toggle writes `contracts.paid_at` with an optimistic override (s55) -- do NOT swap it for `refetchCon()`. UI labels are Otvorená/Ukončená, DB stays navrh/finalna |
| `vercel.json` | SPA rewrite fallback points at `/404.html` (s53) so unknown URLs ship noindex in raw HTML -- NOT `/index.html`. Static assets get `max-age=86400` (see s56 note 1) |
| `scripts/prerender.mjs` | Puppeteer prerender; Supabase GETs proxied through Node fetch (s52) + snapshot validator; bakes `dist/404.html`. Build FAILS on missing /katalog links, NotFound product bakes, or a 404 snapshot without noindex |
| `docs/nap-citations.md` | Canonical NAP block + live SK directory list (verified 2026-08-14) + tracking table |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 49 | 2026-08-05 | SEO-4 Search Console + GA4 Consent Mode v2 -> PROD | Sitemap submit confirmed, indexing requested on 4 URLs; GA4 (`G-WTPC0SV333`) with full Consent Mode v2 -- gtag.js only loads after accept; CookieBanner now has real Prijat/Odmietnut; pushed (`7af7b6f`) |
| 50 | 2026-08-05 | SEO-5 FAQPage/sameAs + Footer FB icon + og:image fix -> PROD | sameAs + FAQPage JSON-LD added; Rich Results Test verified (FAQ not shown = Google policy, not a bug); site-wide og:image + schema image swapped to real yard photo; pushed (`6270a01`) |
| 51 | 2026-08-13 | NAP adresa zjednotena na Boldog + GBP + opravene mapy -> PROD | Site carried 6 conflicting addresses; split into prevadzka `Recká cesta 182` vs sidlo `Boldog 182`; "Senec" kept as service-area keyword; both Kontakt map embeds were fabricated -> coordinate embed + GBP link; GSC 141 orphan product pages diagnosed (SEO-7); pushed (`9fc7fb5`) |
| 52 | 2026-08-14 | SEO-7 interné linky + /katalog + prerender guard (na `dev`) | Catalog filtre/stránkovanie ako `<a href>`; nová stránka /katalog so všetkými produktmi; prerender proxy Supabase cez Node fetch + validátor -- build spadne pri chybnom bake; commit `c236b2e` |
| 53 | 2026-08-14 | SEO-7 na PROD + kosik zmazany + zapeceny 404 shell + NAP citacie | SEO-7 released and verified live (146/146 slugs linked from /katalog); dead cart code deleted end-to-end; prerender bakes `dist/404.html` and vercel.json rewrites there; `docs/nap-citations.md` written, then corrected after 4 listed SK directories turned out dead |
| 54 | 2026-08-14 | 15 GBP produktových PNG + release na PROD | GBP neberie WebP -> 15 PNG na plochu (mimo repa); správne párovanie ide cez Supabase `equipment.image_path` podľa slugu, nie cez názvy súborov v repe; Python SSL tu odmieta Supabase cert, Node fetch funguje; docs-only `dev`->`main` push = zároveň retry padnutého buildu `fcdeab3` |
| 55 | 2026-08-18 | Platby faktúr v dashboarde + upratané filtre + redizajn steny partnerov | `contracts.paid_at` = stav platby (migrácia 022, owner ju stále NESPUSTIL); 2 nové dlaždice + prepínač na Faktúrach s optimistickým updatom; roleta "Všetky stavy" zmazaná; M.D.N Tech + Royal Works ako partneri 5 a 6; stena partnerov prerobená na vlasovú mriežku; 4x `dev`->`main` |
| 56 | 2026-08-18 | Loga partnerov zvacsene (rovnaka opticka plocha) + redizajn Command Centra | Hlásené "šedé pozadie" bola stará cache (`max-age=86400`), nie asset -- preto `_v2` názvy; logá teraz podľa rovnakej optickej PLOCHY, nie spoločného boxu (+25-105%); UNICON a MK prerezané nanovo, MDN lockup na finálnu značku; dashboard: biele chrome na tónovanom plátne, 53 neviditeľných `border-gray-100` -> `gray-200`, aktívna položka menu prekreslená, login = "Royal Command Center"; NEPUSHnuté na PROD |
| 57 | 2026-08-20/21 | Custom cena fix + reporty so 4 zalozkami + premenovanie zmluv + hladanie klienta | Custom finálna cena sa teraz prepisuje aj do rezervácie (`buildFinancialSync`, migrácia 023 spustená); editácia ceny ukončenej zmluvy + pole bez DPH pri vrátení (obojsmerne); Reporty = 4 záložky (Pohľadávky, Stroje, Klienti); tržby zjednotené na `date_from`; živé počítadlo úloh v sidebari; Faktúry -> Zmluvy, Návrh/Finálna -> Otvorená/Ukončená (len UI, DB nezmenená), stĺpec Celkom bez DPH; hľadanie podľa klienta s našepkávačom; SILKOT-ETI partner 13; priebežne 7x `dev`->`main` |
| 58 | 2026-08-25 | Klient sa uklada pred obchodom + chatbot KB pipeline -> PROD | Novy obchod: "Ulozit klienta" uklada hned (toast, zamknuty formular), "Vytvorit obchod" az potom; duplicitny insert zmazany. KB refresh proti aktualnemu webu (doprava, NAP, sluzby) + `scripts/kb-data.mjs` = 158 strojov s cenami zo Supabase; Import .md button v mdn-tech konzole (Replace/Merge); build-kb skill upgrade; `dev`->`main` + mdn-tech main |

<!-- Sessions 1-46 summary rows + sessions 15-54 full notes + old Architecture/Supabase reference: handoff-archive.md -->
