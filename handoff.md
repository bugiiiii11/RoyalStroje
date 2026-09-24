# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-59 + old reference blocks; last rotation 2026-09-24). -->

## Current State

- **Phase:** RCC feature work + CTA/oznamy na klientskom webe. Vsetko cez s61 na PROD (`b8cadcc`)
- **Session count:** 61
- **Repo status:** `dev` == `main` == `origin` at `b8cadcc`, strom cisty, nic necaka. mdn-tech `main` at `bb375f1`

## What Was Done (Session 61) -- Sviatocny popup + prelink na divíziu Royal Works
Date: 2026-09-14 az 2026-09-24

1. **Popup "15. 9. zatvorene" (`HolidayNotice.jsx`).** Dizajn nie je novy -- vytiahnuty z commitu `8ff41f6` (april 2026), kde bol zruseny popup "testovacia prevadzka". Tam hladaj promo-popup vzor, ak bude treba dalsi.
2. **Tri zmeny oproti povodnemu popupu:** ide aj na mobile (povodny bol `hidden md:block`, cize by ho vacsina navstevnikov nevidela), vypina sa sam datumovou poistkou `HIDE_AFTER`, a nesie `data-transient-notice` -- `scripts/prerender.mjs` ho podla toho strhava zo statickeho HTML, aby datovany oznam neprezil svoj datum v tom, co cita Google.
3. **Ukladanie zavretia zmazane na ziadost majitela** (druha poziadavka tohto sedenia): refresh popup vrati, SPA preklikanie ho necha zavrety. NEVRACAT localStorage spat, je to vedome rozhodnutie.
4. **Pas Royal Works pod katalogom** (`RoyalWorksBand.jsx`, v `Catalog.jsx` hned za `SourcingBanner`). Zamerne SVETLA karta: v novom wordmarku je "ROYAL" takmer cierne (#0A0A0A) a na nasej tmavej karte by zmizlo.
5. **Bronz `#9B6133` (tokeny `works-bronze` / `works-bronze-dark`), nie nasa oranzova** -- inak by pas posobil ako tretie Royal Stroje CTA namiesto sesterskej znacky.
6. **Riadkovy layout az od `lg`, nie `md`:** wordmark ma pomer 9.45:1, na tabletoch stlacal nadpis do troch riadkov. Sipka z textu sa stala kruhovym tlacidlom vpravo -- inline sa na mobile odtrhla od zalomeneho riadku.
7. **Orezanie loga bez `sharp`:** projekt ho nema. PNG (2600x600, ink len 1691x179) som orezal a previedol na WebP cez puppeteer canvas (`toDataURL('image/webp')`). Pouzitelny trik aj nabuduce.
8. **`/blog` prerender timeout (60 s) zhodil jeden build**, opakovanie preslo 162/162. Sietovy vykyv, nie regresia -- pri rovnakej hlaske na Verceli staci retry.

## What Was Done (Session 60) -- Praca prebehla v `crm_core`, nie tu
Date: 2026-08-27

1. **Cele sedenie sa odohralo v susednom projekte `crm_core`** (CRM demo na demo-crm.mdntech.org) -- jeho vlastny `handoff.md` ma sedenie 8 s detailami. Tu ostava len toto: demo login uz ukazuje iba tlacidlo "Vstupit do dema", "Dashboard" sa vola "Prehlad", styri dlazdice su preklikatelne, kredit MDN nesie fialovu znacku.
2. **Halucinacia o doprave zdarma je zrusena, bez zasahu.** Majitel preveril chatbota znova a na "kolko stoji doprava" odpoveda presne podla KB (15 EUR v Senci / 1 EUR/km, pick-up 1,20 EUR/km, min. 15 EUR). Bola to jednorazova halucinacia -- uloha 1 zo sedenia 59 vypadla zo zoznamu.
3. **Rovnaka stara znacka MDN visi aj tu** -- patickla webu a sidebar dashboardu. Fialovy `logo-final-gradient.svg` je uz overeny v `crm_core/public/mdn-logo.svg`, takze rovnaka vymena je hotova praca (uloha 3).


## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | Med | Nizky Anthropic kredit = tichy vypadok chatbota bez varovania | Toto zhodilo bota 26.8. Kredit sa mina rychlejsie odkedy ide cela KB (~21k tokenov/sprava, ~2,8 centa za novu konverzaciu). Zvazit budget alert v console.anthropic.com alebo kontrolu zostatku v mdn-tech Command Centri |
| 2 | Med | Dashboard design -- next wins, owner picked none yet | Offered at the end of s56, awaiting a choice: (a) "Nový obchod" renders twice on the Dashboard, drop the page-header one; (b) sidebar "Prehľad" duplicates 4 of the 6 stat tiles, trim to what is not already on screen; (c) global search / cmd-K in the empty header; (d) compact table rows (~40% more rows per screen); (e) stat-tile colours are decorative, make them semantic (neutral/positive/attention); (f) single 1.05 MB JS chunk -- route-level code splitting |
| 3 | Med | Footer credit still uses the OLD M.D.N Tech icon | `src/components/common/Footer.jsx:235` renders `logo_mdntech.webp` (white-on-black square, superseded) while `/partneri` now shows the new mark. Fix = `logo-final-gradient.svg` from `M.D.N-Tech-main/public/brand/` (fialova verzia, s60 ju uz nasadila v `crm_core` -- na svetlom podklade bez ciernej podlozky, fixna vyska + volna sirka, pomer ~1,7:1). Owner said "zatiaľ neriešiť" (s59); v `crm_core` si ju vypytal sam, takze sa oplati sa spytat znova. Same stale icon also sits in `apps/dashboard/public/logo_mdntech.webp` (sidebar credit) |
| 4 | **OWNER** | NAP citations per `docs/nap-citations.md` -- next up: Azet, Firemný portál, Waze | Zlaté stránky + Bing done s53; Apple with the founder. Highest value is actually partner/manufacturer links, not directories. Also pending: switch GBP Website field from `www.` to the apex (canonical since s48) |
| 5 | **OWNER** | SEO-4/7 follow-up: monitor GSC Pages report (Indexovanie -> Strany) | Overdue (2-4 weeks from 2026-08-05); re-check ~2 weeks after the s53 deploy landed |
| 6 | Low | GBP products: swap studio renders for own yard photos as they get taken | 15 uploaded s54 with catalog stock renders (PNGs on Desktop, outside repo). Own photos are the stronger, non-duplicate signal |
| 7 | Low | Zmazat mrtvy sviatocny popup | 15. 9. 2026 je preč, `HIDE_AFTER` uz nic nevykresluje, takze to NIC nelomi -- je to len mrtvy kod. Staci `<HolidayNotice />` z `src/App.jsx` + `src/components/common/HolidayNotice.jsx`. Ak pribudne dalsi sviatok/dovolenka, komponent staci ozivit a posunut datum namiesto pisania od nuly |
| 8 | Low | Pas Royal Works aj na `/katalog`? | `RoyalWorksBand.jsx` je zatial len na homepage pod katalogom. Na stranke `/katalog` (146 strojov, samostatna SEO stranka) chyba -- majitel sa nevyjadril, ci ho tam chce |
| 9 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Production ships HeroSplit since s37 |
| 10 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 11 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit |
| 12 | Low | Final real-Android scroll-check | FAQ + product grid + subpages + `/katalog` on owner's Xiaomi, logged out of Vercel (toolbar = false positive, s34). Add the redesigned `/partneri` wall and the dashboard chrome to that pass |
| 13 | Backlog | SEO-6 prerender freshness hook; workspace email migration; subcategory data audit; product photos; email notifications; chatbot CORS (mdntech.org 405); WhatsApp API; online payments | Details in handoff-archive.md (sessions 15-43) |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/pages/Partneri.jsx` | Logo wall. `logoWidth` = equal-area sizing from each partner's `ratio`; the ratio must match the asset's trimmed canvas or the mark renders wrong. Deliberately no `max-height` on the img |
| `apps/dashboard/src/lib/reservationFinance.js` | `buildFinancialSync(gross)` -- THE way reservation money fields follow finálne contracts. Any new flow touching final prices must call it |
| `apps/dashboard/src/pages/reports/Reports.jsx` | 4-tab reports; all stats derived client-side from 4 broad fetches; revenue basis = `date_from` |
| `scripts/kb-data.mjs` + `knowledgebase/` | Chatbot KB pipeline: kb-data pulls the live Supabase catalog into `03-produkty.md`; 1 file = 1 console entry; sync via "Import .md" (Replace) in the mdn-tech console. **Debugging the bot:** the widget hides the real error -- "something went wrong" = Claude call failed (since s59 also in mdn-tech Vercel logs), "trouble connecting" = non-OK HTTP (CORS/403/rate limit). Bot itself lives in `M.D.N-Tech-main/app/api/chat/[chatbotId]/message/route.ts` |
| `apps/dashboard/src/pages/invoices/InvoiceList.jsx` | "Zmluvy" page (merged invoices+contracts). Payment toggle writes `contracts.paid_at` with an optimistic override (s55) -- do NOT swap it for `refetchCon()`. UI labels are Otvorená/Ukončená, DB stays navrh/finalna |
| `vercel.json` | SPA rewrite fallback points at `/404.html` (s53) so unknown URLs ship noindex in raw HTML -- NOT `/index.html`. Static assets get `max-age=86400` (see s56 note 1) |
| `scripts/prerender.mjs` | Puppeteer prerender; Supabase GETs proxied through Node fetch (s52) + snapshot validator; bakes `dist/404.html`. Build FAILS on missing /katalog links, NotFound product bakes, or a 404 snapshot without noindex |
| `docs/nap-citations.md` | Canonical NAP block + live SK directory list (verified 2026-08-14) + tracking table |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 52 | 2026-08-14 | SEO-7 interné linky + /katalog + prerender guard (na `dev`) | Catalog filtre/stránkovanie ako `<a href>`; nová stránka /katalog so všetkými produktmi; prerender proxy Supabase cez Node fetch + validátor -- build spadne pri chybnom bake; commit `c236b2e` |
| 53 | 2026-08-14 | SEO-7 na PROD + kosik zmazany + zapeceny 404 shell + NAP citacie | SEO-7 released and verified live (146/146 slugs linked from /katalog); dead cart code deleted end-to-end; prerender bakes `dist/404.html` and vercel.json rewrites there; `docs/nap-citations.md` written, then corrected after 4 listed SK directories turned out dead |
| 54 | 2026-08-14 | 15 GBP produktových PNG + release na PROD | GBP neberie WebP -> 15 PNG na plochu (mimo repa); správne párovanie ide cez Supabase `equipment.image_path` podľa slugu, nie cez názvy súborov v repe; Python SSL tu odmieta Supabase cert, Node fetch funguje; docs-only `dev`->`main` push = zároveň retry padnutého buildu `fcdeab3` |
| 55 | 2026-08-18 | Platby faktúr v dashboarde + upratané filtre + redizajn steny partnerov | `contracts.paid_at` = stav platby (migrácia 022, owner ju stále NESPUSTIL); 2 nové dlaždice + prepínač na Faktúrach s optimistickým updatom; roleta "Všetky stavy" zmazaná; M.D.N Tech + Royal Works ako partneri 5 a 6; stena partnerov prerobená na vlasovú mriežku; 4x `dev`->`main` |
| 56 | 2026-08-18 | Loga partnerov zvacsene (rovnaka opticka plocha) + redizajn Command Centra | Hlásené "šedé pozadie" bola stará cache (`max-age=86400`), nie asset -- preto `_v2` názvy; logá teraz podľa rovnakej optickej PLOCHY, nie spoločného boxu (+25-105%); UNICON a MK prerezané nanovo, MDN lockup na finálnu značku; dashboard: biele chrome na tónovanom plátne, 53 neviditeľných `border-gray-100` -> `gray-200`, aktívna položka menu prekreslená, login = "Royal Command Center"; NEPUSHnuté na PROD |
| 57 | 2026-08-20/21 | Custom cena fix + reporty so 4 zalozkami + premenovanie zmluv + hladanie klienta | Custom finálna cena sa teraz prepisuje aj do rezervácie (`buildFinancialSync`, migrácia 023 spustená); editácia ceny ukončenej zmluvy + pole bez DPH pri vrátení (obojsmerne); Reporty = 4 záložky (Pohľadávky, Stroje, Klienti); tržby zjednotené na `date_from`; živé počítadlo úloh v sidebari; Faktúry -> Zmluvy, Návrh/Finálna -> Otvorená/Ukončená (len UI, DB nezmenená), stĺpec Celkom bez DPH; hľadanie podľa klienta s našepkávačom; SILKOT-ETI partner 13; priebežne 7x `dev`->`main` |
| 58 | 2026-08-25 | Klient sa uklada pred obchodom + chatbot KB pipeline -> PROD | Novy obchod: "Ulozit klienta" uklada hned (toast, zamknuty formular), "Vytvorit obchod" az potom; duplicitny insert zmazany. KB refresh proti aktualnemu webu (doprava, NAP, sluzby) + `scripts/kb-data.mjs` = 158 strojov s cenami zo Supabase; Import .md button v mdn-tech konzole (Replace/Merge); build-kb skill upgrade; `dev`->`main` + mdn-tech main |
| 60 | 2026-08-27 | Praca v `crm_core` (CRM demo), tu len upratanie uloh | Demo login = iba tlacidlo "Vstupit do dema", Dashboard -> Prehlad, 4 klikacie dlazdice, fialova znacka MDN v kredite. Detaily v `crm_core/handoff.md` sedenie 8. Tu: halucinacia o doprave zdarma preverena majitelom ako neopakujuca sa -> uloha zrusena |
| 59 | 2026-08-26 | Chatbot vypadok: minuty Anthropic kredit + logovanie chyb -> PROD | Bot vracal "Sorry, something went wrong" na kazdu spravu -- root cause `400: credit balance is too low`, nie web/kod/KB (KB import bol OK, bot s nim fungoval 25.8. o 20:00). Majitel dokupil kredit, bot ide. Chyba sa nedala nikde precitat -> mdn-tech `bb375f1` prida `console.error` do catch v chat route. Odhalene: `.env.local` mal archivovany kluc (401), bot halucinuje "dopravu zadarmo". RoyalStroje `dev`->`main` (`13915fa`) |
| 61 | 2026-09-24 | Sviatocny popup + prelink na diviziu Royal Works -> PROD | `HolidayNotice.jsx` obnoveny z popupu zruseneho v `8ff41f6`, teraz aj na mobile + datumova poistka + strip z prerenderu; zavretie sa NEUKLADA (refresh ho vrati, ziadost majitela). `RoyalWorksBand.jsx` pod katalogom: svetla karta (wordmark je takmer cierny), bronz `#9B6133` namiesto oranzovej, riadkovy layout az od `lg` kvoli pomeru 9.45:1. Logo orezane cez puppeteer canvas (projekt nema `sharp`). 2x `dev`->`main` |

<!-- Sessions 1-49 summary rows + sessions 15-57 full notes + old Architecture/Supabase reference: handoff-archive.md -->
