# RoyalStroje -- Session Handoff

<!-- HARD CAP ~120 lines. Max 2 session sections. Overflow -> handoff-archive.md (sessions 1-60 + old reference blocks; last rotation 2026-10-09). -->

## Current State

- **Phase:** Klientsky web: znacky + partneri (na `dev`), redizajn hero + spodku homepage (lokalne commitnute). PROD stale `77f4833`
- **Session count:** 62
- **Repo status:** `dev` = origin/dev `df2ba6b` + wrap commit s62 (hero + spodok homepage, NEPUSHNUTE). `main` == origin/main `77f4833` -- 3 commity za `dev`. mdn-tech `main` at `bb375f1`

## What Was Done (Session 62) -- Pas znaciek, Wecko partner, hero CTA, redizajn spodku homepage
Date: 2026-10-01 az 2026-10-09

1. **`BrandMarquee.jsx` pod katalogom (pred SourcingBanner)**, 11 znaciek bez prelinku, nekonecny CSS loop (2 kopie zoznamu, posun -50%). Svetly pas zamerne: NIVEL/MASTER/Wacker su takmer cierne. Na dev (`55225a3`, `df2ba6b`), majitel schvalil ("vyborna praca").
2. **Logo gotchas:** stiahnute PNG (Honda, Atlas Copco = pngwing/toppng) maju FALOSNU sachovnicu zapecenu (255/238) -- flood-fill od okraja nestaci, vnutra pismen (a, o) treba vyclearovat globalne. Windows je case-insensitive: `jcb.webp` prepisal `JCB.webp` a originaly JCB/MASTER su prec (spracovane verzie OK). Originaly ostatnych v `znacky/old/`. MASTER (223x32) a GOLZ (188x54) su na retine mierne mazane -- lepsie od foundera.
3. **WECKO servis = partner 14** na `/partneri`; vyplnove bunky prepocitane (0/1/2 pri 2/3/4 stlpcoch) -- pri kazdom novom partnerovi prepocitat.
4. **Push na `main` zablokoval auto-mode klasifikator ([Production Deploy])**, aj ked majitel povedal "kludne pushni". Nedal sa obist -- produkciu pushuje majitel (`git push origin dev:main`) alebo vyslovne povoli v novej sprave / `/permissions`.
5. **Hero:** CTA hned pod textom oboch poloviciek, vacsie (`text-base px-7 py-4`). Auto je teraz ukotvene vpravo-dole pri diagonale a velkost berie z VYSKY sekcie (`right-[52.5%] bottom-[4%] h-[64%] max-w-[44%]`) -- inak pri 900-1000 px vysokych oknach vyliezlo do tlacidiel. 1920+ cisto; 1440x900 jemny dotyk; 1366x768 stale prekryva (navrh v ulohe 2). Majitel: "hero super".
6. **Redizajn spodku homepage (lokalne, v wrap commite):** "Preco" = panel s velkymi cislami (24 h / 24/7 / 8+ / 20 rokov -- vsetko z povodneho textu, ziadne nove tvrdenia); FAQ = jeden tmavy panel, cislovane 01-07, plus-ikona, animacia cez `grid-rows 0fr->1fr`, kontaktna karta aj na mobile, fotka vyhodena (duplikat z hero pasu); `BlogTeaser.jsx` = 3 najnovsie nehidden clanky z `blogMeta.js` (namiesto 2 generickych kariet). Bez scale-zoomu na obrazkoch (s36 seam).
7. **Safety hook falosny poplach:** `block-dangerous.sh` vzor `curl.*\|.*sh` chyti `curl ... || ...` a akekolvek neskorsie "sh" (aj `_shot4.mjs`). Neobchadzane -- navrh fixu v ulohe 5.
8. **Vercel znovu builduje po pushi** (overene s62 cez `npx vercel ls`) -- uloha "overit Vercel" zrusena.

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
9. **Vercel prestal deployovat a NIKTO si to nevsimol 10 dni.** Push na `main` presiel, ale projekt `royal-stroje` nemal ziadny build -- posledny bol spred 10 dni, nic vo fronte. Majitel v Verceli git odpojil a znovu pripojil; samotne pripojenie build NESPUSTI, potrebuje novy push event (spustil ho az wrap commit). Ak sa to zopakuje: `npx vercel ls royal-stroje --non-interactive` ukaze pravdu, `vercel project inspect` je na to zbytocny (nevypisuje git ani pri zdravom projekte).
10. **Past pri overovani deployu: negrepuj retazec, ktory uz na webe je.** Dvakrat mi `royalworks.sk` aj `Prevadzkov` vratili falosne "uz je live" -- oboje bolo na webe davno (stranka partnerov, resp. bezny text). Vzdy grepuj retazec unikatny pre NOVY kod (nazov suboru, storage kluc) a porovnavaj hash bundlu s lokalnym `dist/assets/index-*.js`.

## What To Do Next

| # | Priority | Task | Notes |
|---|----------|------|-------|
| 1 | **High** | Majitel: skontrolovat lokalny redizajn spodku homepage + hero, potom push | Commit s62 wrap je len LOKALNE na `dev`. Po OK: `git push origin dev` (staging), potom PROD `git push origin dev:main` -- ten musi spustit majitel alebo ho vyslovne povolit (klasifikator). Po poslednych 2 opravach (FAQ `lg:grid-rows-[auto_1fr]`, gutter blogu) som uz screenshot nerobil -- pozriet `npm run dev` |
| 2 | Med | Hero na nizkych obrazovkach (1366x768) | CTA stale prekryvaju predok auta. Navrh: pas 4 fotiek v `HeroSplit.jsx` `md:h-[24vh]` -> `md:h-[18vh]` (+~50 px pre hero). Majitel este nepotvrdil |
| 3 | Low | Lepsie logo MASTER a GOLZ od foundera (idealne SVG) | Sucasne su malé (223x32, 188x54), na retine mazane. Pri vymene: priehladne, orezat na ink, WebP do `public/pictures/graphics/partneri/znacky/`, `w`/`h` v `BrandMarquee.jsx` |
| 4 | Low | Fix vzoru v `.claude/hooks/block-dangerous.sh` | `curl.*\|.*sh` blokuje aj nevinne `curl ... \|\| ...`. Navrh: `curl[^|]*\|\s*(ba)?sh\b` (len pipe priamo do shellu). Potrebuje suhlas majitela |
| 5 | Med | Nizky Anthropic kredit = tichy vypadok chatbota bez varovania | Toto zhodilo bota 26.8. Kredit sa mina rychlejsie odkedy ide cela KB (~21k tokenov/sprava, ~2,8 centa za novu konverzaciu). Zvazit budget alert v console.anthropic.com alebo kontrolu zostatku v mdn-tech Command Centri |
| 6 | Med | Dashboard design -- next wins, owner picked none yet | Offered at the end of s56, awaiting a choice: (a) "Nový obchod" renders twice on the Dashboard, drop the page-header one; (b) sidebar "Prehľad" duplicates 4 of the 6 stat tiles, trim to what is not already on screen; (c) global search / cmd-K in the empty header; (d) compact table rows (~40% more rows per screen); (e) stat-tile colours are decorative, make them semantic (neutral/positive/attention); (f) single 1.05 MB JS chunk -- route-level code splitting |
| 7 | Med | Footer credit still uses the OLD M.D.N Tech icon | `src/components/common/Footer.jsx:235` renders `logo_mdntech.webp` (white-on-black square, superseded) while `/partneri` now shows the new mark. Fix = `logo-final-gradient.svg` from `M.D.N-Tech-main/public/brand/` (fialova verzia, s60 ju uz nasadila v `crm_core` -- na svetlom podklade bez ciernej podlozky, fixna vyska + volna sirka, pomer ~1,7:1). Owner said "zatiaľ neriešiť" (s59); v `crm_core` si ju vypytal sam, takze sa oplati sa spytat znova. Same stale icon also sits in `apps/dashboard/public/logo_mdntech.webp` (sidebar credit) |
| 8 | **OWNER** | NAP citations per `docs/nap-citations.md` -- next up: Azet, Firemný portál, Waze | Zlaté stránky + Bing done s53; Apple with the founder. Highest value is actually partner/manufacturer links, not directories. Also pending: switch GBP Website field from `www.` to the apex (canonical since s48) |
| 9 | **OWNER** | SEO-4/7 follow-up: monitor GSC Pages report (Indexovanie -> Strany) | Overdue (2-4 weeks from 2026-08-05); re-check ~2 weeks after the s53 deploy landed |
| 10 | Low | GBP products: swap studio renders for own yard photos as they get taken | 15 uploaded s54 with catalog stock renders (PNGs on Desktop, outside repo). Own photos are the stronger, non-duplicate signal |
| 11 | Low | Zmazat mrtvy sviatocny popup | 15. 9. 2026 je preč, `HIDE_AFTER` uz nic nevykresluje, takze to NIC nelomi -- je to len mrtvy kod. Staci `<HolidayNotice />` z `src/App.jsx` + `src/components/common/HolidayNotice.jsx`. Ak pribudne dalsi sviatok/dovolenka, komponent staci ozivit a posunut datum namiesto pisania od nuly |
| 12 | Low | Pas Royal Works aj na `/katalog`? | `RoyalWorksBand.jsx` je zatial len na homepage pod katalogom. Na stranke `/katalog` (146 strojov, samostatna SEO stranka) chyba -- majitel sa nevyjadril, ci ho tam chce |
| 13 | Med | Delete dead hero files | `src/components/home/Hero.jsx` + `MobileHero.jsx` + commented imports/block in `src/pages/Home.jsx`. Production ships HeroSplit since s37 |
| 14 | Med | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 15 | Med | Backfill OP + birth dates on existing PO contacts | Migration 019 columns are NULL for old contacts; owner fills via ClientDetail pencil edit |
| 16 | Low | Final real-Android scroll-check | FAQ + product grid + subpages + `/katalog` on owner's Xiaomi, logged out of Vercel (toolbar = false positive, s34). Add the redesigned `/partneri` wall and the dashboard chrome to that pass |
| 17 | Backlog | SEO-6 prerender freshness hook; workspace email migration; subcategory data audit; product photos; email notifications; chatbot CORS (mdntech.org 405); WhatsApp API; online payments | Details in handoff-archive.md (sessions 15-43) |

## Key Files

| File | Purpose |
|------|---------|
| `handoff.md` | Current state + next steps (capped; history in handoff-archive.md) |
| `src/components/home/BrandMarquee.jsx` | Pas znaciek: `brands[]` (w/h = rozmery orezaneho assetu, `boost` pre vzdusne logá), CSS v `index.css` (.brand-*) |
| `src/pages/Partneri.jsx` | Logo wall. `logoWidth` = equal-area sizing from each partner's `ratio`; the ratio must match the asset's trimmed canvas or the mark renders wrong. Deliberately no `max-height` on the img |
| `apps/dashboard/src/lib/reservationFinance.js` | `buildFinancialSync(gross)` -- THE way reservation money fields follow finálne contracts. Any new flow touching final prices must call it |
| `scripts/kb-data.mjs` + `knowledgebase/` | Chatbot KB pipeline: kb-data pulls the live Supabase catalog into `03-produkty.md`; 1 file = 1 console entry; sync via "Import .md" (Replace) in the mdn-tech console. **Debugging the bot:** the widget hides the real error -- "something went wrong" = Claude call failed (since s59 also in mdn-tech Vercel logs), "trouble connecting" = non-OK HTTP (CORS/403/rate limit). Bot itself lives in `M.D.N-Tech-main/app/api/chat/[chatbotId]/message/route.ts` |
| `apps/dashboard/src/pages/invoices/InvoiceList.jsx` | "Zmluvy" page (merged invoices+contracts). Payment toggle writes `contracts.paid_at` with an optimistic override (s55) -- do NOT swap it for `refetchCon()`. UI labels are Otvorená/Ukončená, DB stays navrh/finalna |
| `vercel.json` | SPA rewrite fallback points at `/404.html` (s53) so unknown URLs ship noindex in raw HTML -- NOT `/index.html`. Static assets get `max-age=86400` (see s56 note 1) |
| `scripts/prerender.mjs` | Puppeteer prerender; Supabase GETs proxied through Node fetch (s52) + snapshot validator; bakes `dist/404.html`. Build FAILS on missing /katalog links, NotFound product bakes, or a 404 snapshot without noindex |
| `docs/nap-citations.md` | Canonical NAP block + live SK directory list (verified 2026-08-14) + tracking table |
| `PRODUCT.md` | Design-context doc (brand, dark-on-light system, GPU + reveal guards) -- read before design passes |

## Session Summary

| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 53 | 2026-08-14 | SEO-7 na PROD + kosik zmazany + zapeceny 404 shell + NAP citacie | SEO-7 released and verified live (146/146 slugs linked from /katalog); dead cart code deleted end-to-end; prerender bakes `dist/404.html` and vercel.json rewrites there; `docs/nap-citations.md` written, then corrected after 4 listed SK directories turned out dead |
| 54 | 2026-08-14 | 15 GBP produktových PNG + release na PROD | GBP neberie WebP -> 15 PNG na plochu (mimo repa); správne párovanie ide cez Supabase `equipment.image_path` podľa slugu, nie cez názvy súborov v repe; Python SSL tu odmieta Supabase cert, Node fetch funguje; docs-only `dev`->`main` push = zároveň retry padnutého buildu `fcdeab3` |
| 55 | 2026-08-18 | Platby faktúr v dashboarde + upratané filtre + redizajn steny partnerov | `contracts.paid_at` = stav platby (migrácia 022, owner ju stále NESPUSTIL); 2 nové dlaždice + prepínač na Faktúrach s optimistickým updatom; roleta "Všetky stavy" zmazaná; M.D.N Tech + Royal Works ako partneri 5 a 6; stena partnerov prerobená na vlasovú mriežku; 4x `dev`->`main` |
| 56 | 2026-08-18 | Loga partnerov zvacsene (rovnaka opticka plocha) + redizajn Command Centra | Hlásené "šedé pozadie" bola stará cache (`max-age=86400`), nie asset -- preto `_v2` názvy; logá teraz podľa rovnakej optickej PLOCHY, nie spoločného boxu (+25-105%); UNICON a MK prerezané nanovo, MDN lockup na finálnu značku; dashboard: biele chrome na tónovanom plátne, 53 neviditeľných `border-gray-100` -> `gray-200`, aktívna položka menu prekreslená, login = "Royal Command Center"; NEPUSHnuté na PROD |
| 57 | 2026-08-20/21 | Custom cena fix + reporty so 4 zalozkami + premenovanie zmluv + hladanie klienta | Custom finálna cena sa teraz prepisuje aj do rezervácie (`buildFinancialSync`, migrácia 023 spustená); editácia ceny ukončenej zmluvy + pole bez DPH pri vrátení (obojsmerne); Reporty = 4 záložky (Pohľadávky, Stroje, Klienti); tržby zjednotené na `date_from`; živé počítadlo úloh v sidebari; Faktúry -> Zmluvy, Návrh/Finálna -> Otvorená/Ukončená (len UI, DB nezmenená), stĺpec Celkom bez DPH; hľadanie podľa klienta s našepkávačom; SILKOT-ETI partner 13; priebežne 7x `dev`->`main` |
| 58 | 2026-08-25 | Klient sa uklada pred obchodom + chatbot KB pipeline -> PROD | Novy obchod: "Ulozit klienta" uklada hned (toast, zamknuty formular), "Vytvorit obchod" az potom; duplicitny insert zmazany. KB refresh proti aktualnemu webu (doprava, NAP, sluzby) + `scripts/kb-data.mjs` = 158 strojov s cenami zo Supabase; Import .md button v mdn-tech konzole (Replace/Merge); build-kb skill upgrade; `dev`->`main` + mdn-tech main |
| 60 | 2026-08-27 | Praca v `crm_core` (CRM demo), tu len upratanie uloh | Demo login = iba tlacidlo "Vstupit do dema", Dashboard -> Prehlad, 4 klikacie dlazdice, fialova znacka MDN v kredite. Detaily v `crm_core/handoff.md` sedenie 8. Tu: halucinacia o doprave zdarma preverena majitelom ako neopakujuca sa -> uloha zrusena |
| 59 | 2026-08-26 | Chatbot vypadok: minuty Anthropic kredit + logovanie chyb -> PROD | Bot vracal "Sorry, something went wrong" na kazdu spravu -- root cause `400: credit balance is too low`, nie web/kod/KB (KB import bol OK, bot s nim fungoval 25.8. o 20:00). Majitel dokupil kredit, bot ide. Chyba sa nedala nikde precitat -> mdn-tech `bb375f1` prida `console.error` do catch v chat route. Odhalene: `.env.local` mal archivovany kluc (401), bot halucinuje "dopravu zadarmo". RoyalStroje `dev`->`main` (`13915fa`) |
| 61 | 2026-09-24 | Sviatocny popup + prelink na diviziu Royal Works -> PROD | `HolidayNotice.jsx` obnoveny z popupu zruseneho v `8ff41f6`, teraz aj na mobile + datumova poistka + strip z prerenderu; zavretie sa NEUKLADA (refresh ho vrati, ziadost majitela). `RoyalWorksBand.jsx` pod katalogom: svetla karta (wordmark je takmer cierny), bronz `#9B6133` namiesto oranzovej, riadkovy layout az od `lg` kvoli pomeru 9.45:1. Logo orezane cez puppeteer canvas (projekt nema `sharp`). 2x `dev`->`main` |
| 62 | 2026-10-09 | Pas znaciek + Wecko partner (dev) + hero CTA + redizajn spodku homepage (lokalne) | `BrandMarquee` 11 znaciek, loga zbavene falosnych sachovnic; WECKO servis partner 14; push na main zablokoval klasifikator -> PROD stale `77f4833`; hero CTA pod textom + auto podla vysky; Preco = cisla, FAQ = jeden panel, blog = 3 najnovsie clanky |

<!-- Sessions 1-49 summary rows + sessions 15-57 full notes + old Architecture/Supabase reference: handoff-archive.md -->
