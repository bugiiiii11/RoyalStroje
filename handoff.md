# RoyalStroje -- Session Handoff

## Session Summary
| Session | Date | Title | Key changes |
|---------|------|-------|-------------|
| 1 | 2026-03-18/19 | MVP Complete (Sprints 1-5) | Full rental management system: dashboard, portal, Supabase backend, invoicing, reports |
| 2 | 2026-03-19 | Design Rebrand + Bug Fixes | Orange #FF6600 rebrand, sidebar redesign, PDF diacritics fix, VAT 23% fix, portal RLS fix |
| 3 | 2026-03-20–26 | Website Features + Mobile UX | Supabase live sync, image upload, PO/FO contracts, 6th service, mobile hero, scroll animations |
| 4 | 2026-03-26 | Hero Redesign + Desktop Animations + Performance | New hero image, desktop scroll animations, header white icons, PNG-to-WebP, fix lazy-load spinner |
| 5 | 2026-03-27 | Scroll Animations -- All Pages | Added useInView scroll reveal animations to 14 pages (desktop + mobile), fixed ProductDetail visibility bug |
| 6 | 2026-04-02 | New Products + Image Updates | 4 new products (3x mini-rýpadlá, 1x drvič), new hero image, new FAQ image, PNG-to-WebP conversions |
| 7 | 2026-04-09 | Dashboard Contracts + Contacts Overhaul | Contract návrh→finálna flow, rental day algorithm, zábezpeka field, multi-contact clients, Faktúry merged view with delete |
| 8 | 2026-04-09 | Dashboard UX + PDF Polish + Equipment rate_unit | New client UX simplified, Dátum do picker, PDF datums/prices/signatures fixed, rate_unit column + Zemné vrtáky subcategory |
| 9 | 2026-04-10 | PDF Diacritics + PO Alignment + Usage Location | Fix ľ rendering (Identity-H), Zemné vrtáky on landing, PO signature/protocol alignment, Miesto používania PP field |
| 10 | 2026-04-15 | Serial Numbers + Contact Person + Hero Backdrop | Equipment serial numbers (catalog + deal + PDF), hero text backdrop blur, contact person selection in deals, contract number collision fix |
| 11 | 2026-04-17 | Partial Returns + Unified PDFs + Catalog UX | Partial return flow, unified invoice/agreement PDF structure, subcategory filter, nedostupne toggle, client edit/delete, equipment delete |
| 12 | 2026-04-21 | Partners Page Redesign + WebP Optimization | Minimal grid design (Option 1), 8 partners (M&M Wood, Terra, Wacker, Makita + rest), PNG→WebP conversion (58% savings), logo visibility fix |
| 13 | 2026-04-22 | Equipment Delete Error Handling | Fixed delete button UX: loading state, better error messages, FK constraint handling |
| 14 | 2026-04-22 | JCB 19C-I Blog Article + Catalog Bug Fix | New blog article for JCB 19C-I mini-rýpadlo, PNG→WebP (-86%), fixed #katalog hash scroll + Supabase-only search reveal bug |
| 15 | 2026-04-30 | Real Photos + Ad-hoc Items + Gallery + Editable Days | Real shop photos in Sluzby/Kontakt/FAQ headers, hero overlays removed, popup retired, MK partner #9, 2-vehicle delivery pricing, ad-hoc reservation items (mig 018), Kontakt photo gallery + lightbox, "Dopyt"→"V prenájme", editable decimal days on returns, diacritic-insensitive name+description search, DB wipe + sequence reset |
| 16 | 2026-05-04 | Dashboard custom domain + favicon | Migrated dashboard to `app.royalstroje.sk` via Active24 CNAME + Vercel domain transfer; added shared favicon.png to dashboard project |
| 17 | 2026-05-04 | Cookie banner + /cookies page + chatbot lazy-load | Info-only cookie banner (no analytics yet), new /cookies page with mobile card layout, footer link, MDN chatbot moved out of index.html to requestIdleCallback |
| 18 | 2026-05-22 | Dashboard UX + PO contact birth/OP + contract restructure | Company phone for PO, sidebar logo→home, pipeline trimmed to 2 cols, monthly revenue bez DPH, Reports rewired to reservations, dashboard Vercel SPA rewrite, Unicon partner, Active24 cleanup, PO contact birth_date+OP (mig 019), DD.MM.YYYY format, PO PDF signature block restructured with OP/nar. cell |
| 19 | 2026-05-26 | Contract number format YYXXXX + PDF filename overhaul | New contract number format 260147 (YY+XXXX), PDF filename "{number} {client} - ukončené", migration 020 drops unique constraint for partial returns, confirm screen shows contract number |
| 20 | 2026-05-29 | Dashboard cleanup + daysBetween fix | Fixed `daysBetween` off-by-one (29.5.→30.5. = 1 day, not 2), capped Ukončená pipeline at 5 cards with link to Faktúry, fixed `activeRentals` query (`active` → `inquiry`), renamed "Dnes" → "Dnešné udalosti" |
| 21 | 2026-06-03 | Mobile footer gap + mobile GPU garbage fix | Removed `main pb-20` black gap above footer on mobile; fixed scrambled GPU garbage/tearing bands on real Android (FAQ + product grid) — root cause was `backdrop-filter` on the fixed hamburger button forcing whole-page read-back compositing |
| 22 | 2026-06-16 | Landing page redesign — Industrial Premium | New type system (Archivo display + Manrope body via Google Fonts), eyebrow/hairline/button primitives, refined hero (desktop+mobile), numbered why-us cards, cleaner FAQ, modernized catalog shell + product cards + quote form, header/footer cohesion. Dark+orange+white kept, hero image + all texts/CTAs preserved. Committed `bf57e7d` (session 23). |
| 23 | 2026-06-16 | Industrial-premium rollout to all remaining pages | Applied the session-22 design system across all 18 remaining public pages (Sluzby, Kontakt, Partneri, CenovaPonuka, Kosik, Blog, BlogDetail, ProductDetail, 7 service pages, 3 legal pages): eyebrows, `.btn-primary`/`.btn-secondary` CTAs, canonical card style, orange top-accent rules, removed loud cards + `gradient-shift` sheen. GPU guard upheld. Build + lint clean. Committed `f8d1d38` + pushed. |
| 24 | 2026-06-23 | Cenník dopravy + nový split-screen hero (WIP) | Added 3rd transport item (preprava cudzieho stroja 1,50 €/km, min 30 €) — committed `44d0cd3` + pushed. Built NEW full-screen split hero (Prenájom \| Predaj) with thin orange diagonal divider, 16:9 image strip, white USP band — **UNCOMMITTED**, old hero preserved on disk for revert. |
| 25 | 2026-06-23 | Homepage light theme — white redesign (WIP) | Flipped homepage content bg dark→light (`#FAFAFA` via `ContentSection` `light` prop, Home-only), then full "clean white panels" redesign of every homepage surface (catalog sidebar/toggle/search/subcategory pills/table/pagination, product cards, why-us cards, FAQ accordion+contact box, QuoteForm, blog CTA). New `.card-light`/`.input-light`/`.btn-outline-light` primitives; `CustomSelect` got opt-in `light` variant (Kontakt stays dark). Heroes/footer/orange unchanged. Build clean. Owner approved ("vyzerá to daleko lepšie"). **UNCOMMITTED.** |
| 28 | 2026-06-26 | Light `PageHero` rolled out to all remaining subpage heroes | Converted the 11 remaining dark subpage heroes (Blog, BlogDetail, Kontakt, CenovaPonuka, NahradneDiely, RoyalFleet, SkoLenieObsluhy, Partneri, PredajTechniky, ServisNaradia, ZemnePrace) to the shared light `PageHero`; removed per-page `<hr>` orange seam (PageHero has its own) + unused `heroRef`. 10 via parallel agents, BlogDetail by hand (dynamic meta→chips, excerpt→subtitle, back-link→action). Build + lint clean. **UNCOMMITTED.** |
| 27 | 2026-06-25 | Hero polish + homepage sections + light header + Služby/Dovoz | Trimmed transparent truck on white, removed hero 4-img strip (split full-height), gray card-style USP band w/ hover, NEW `BusinessPillars` (4 okruhy) + `PromoCarousel` (Akcie 3:1), light solid header (dark logo `logoroyal-dark.webp`, Blog nav, phone+CTA, icons removed), removed catalog excavator decor. **+ light `PageHero`, Služby grid swap Cenová ponuka→Dovoz techniky, rebuilt `DovozTechniky` subpage (real FAQ pricing) + route.** UNCOMMITTED. |
| 26 | 2026-06-24 | Light theme rolled out to ALL remaining pages | Applied the session-25 light theme to every remaining public page (18 files): heroes kept dark (bottom fades flipped #181818→#FAFAFA), content → `#FAFAFA` + `.card-light` panels, shared `ContactForm` → light (Kontakt + Cenová ponuka). Done via a convert→verify→fix agent workflow (16/18 clean first pass; BlogDetail auto-fixed; PredajTechniky hand-finished after an API timeout). Discovered `servis-naradia`/`dovoz-techniky`/`zemne-prace` are ORPHAN files (not routed/linked) — converted anyway + glow animations removed. Build + lint clean; adversarial sweep clean. **UNCOMMITTED** (stacks on session 24/25 Home WIP). |
| 29 | 2026-06-30 | Dev environment + nová služba „Zoženieme akýkoľvek stroj" + homepage CTA | Set up Vercel-preview **dev/staging** on a new `dev` branch (`main`=prod, untouched); replaced the **Royal Fleet** service with **„Zoženieme akýkoľvek stroj"** (sprostredkovanie cez partnerov) — new page + route + Služby card + homepage pillar, `RoyalFleet.jsx` retired; new homepage **„Nenašli ste stroj?"** dark CTA band (`SourcingBanner`). All committed on `dev` (`577098e`, `95a1481`), NOT on `main`. |
| 30 | 2026-07-01 | Hero pás 4 fotiek + Domov = tmavé prvky na svetlom pozadí + verejný staging | Public staging (owner vypol Vercel Authentication). **HeroSplit:** nový biely pás so 4 zaoblenými fotkami (zladené s USP stĺpcami) medzi split a USP; split zmenšený (`flex-1`), auto 46→37 % posunuté doprava, pravé náradie odzoomované (`w-58%`), menšie nadpisy, pravý nadpis doľava k diagonále. Odstránené **BusinessPillars**; akciový banner (`PromoCarousel`) −25 % výšky. **Nový smer témy Domov: tmavé prvky/karty na SVETLOM pozadí** — `WhyRoyalStroje` + `Catalog` + `FAQ` + `ProductCard` + `QuoteForm` vrátené na tmavé (produkčný `main` štýl), pozadie ostáva `ContentSection light`; sekčné nadpisy na svetlom pozadí sčernené. Všetko na `dev` (7 commitov, `3ff2c39`→`f5b1d8b`), NOT na `main`. |
| 31 | 2026-07-01 | Tému „tmavé prvky na svetlom pozadí" rozšírená na CELÝ web + nový hero obrázok + 4 s banner | Dark-on-light téma z homepage aplikovaná na **všetkých 16 verejných podstránok** (8 paralelných agentov). Nový zdieľaný **`CtaBand`** (tmavý oranžový pás, zovšeobecnený zo `SourcingBanner`) pre CTA sekcie. Výnimky: **Partneri logá ostávajú biele** (čitateľnosť), **kontaktný formulár** (Kontakt + Cenová ponuka) ostáva svetlý, **právne stránky** (GDPR/Cookies/Obch. podmienky) dlhý text čitateľný na svetlom, tmavé len tabuľky/boxy. Opravené červené „odstrániť" tlačidlo v Košíku. Vycentrovaný nadpis „Akcie" (`PromoCarousel`). **Nový hero obrázok** (ISUZU + JCB render) → `hero-auto.webp` (1622→120 KB), `width/height` 1774×887. Akciový banner autoplay **6 s → 4 s**. Orphany `ServisNaradia`/`ZemnePrace` neprevedené. Build + lint čisté. Commity `f57dd0e` + hero/banner na `dev`, NOT na `main`. |
| 32 | 2026-07-01 | Hero obrázok swap + katalóg rohové stroje + Kontakt dostupnosť | Owner dodal 3 rendery do `public/pictures/graphics/web_pics/`. **Hero (prenájom):** ľavý/mobil obrázok `hero-auto.webp` → `auto_hero.webp` (ISUZU+JCB pred predajňou, drop-in 1774×887, desktop `w-42%`). **Katalóg:** dva full-bleed dekoračné stroje lemujúce nadpis — `bager.webp` vľavo hore, `auto_katalog.webp` vpravo hore (`hidden lg:block`, `z-0`, `pointer-events-none`). **Obrázky:** owner PNG (RGB, zapečený checkerboard) → WebP (−91 %), checkerboard sflatovaný na `#FAFAFA`, bager/auto_katalog orezané na obsah. **Finálne rozmerovanie:** `max-w-[calc(50vw−N)] max-h-[H]` (bez deformácie) — max veľkosť ohraničená bočným okrajom (neprekrýva vycentrovaný text na úzkych) aj výškovým capom (neprekrýva tlačidlá na širokých); overené 1280–1920. **Kontakt CTA:** „Dostupnosť 7–16, Po–Pia." Commity `13ed948`→`9877bf8` na `dev`, NOT na `main`. |
| 34 | 2026-07-02 | Font Source Sans 3 + detail produktu redizajn + mobil opravy | Body font Manrope→Source Sans 3 (čitateľnosť), katalógové karty bez stavu „nedostupné" (Zavolať všade), zoom seam fix, odsadenie Akcií pod hero, mobil: USP pretekanie + katalógové filtre bez reveal (GPU), ProductDetail redizajn (H1 = popisný názov, biely foto panel, CTA v cenovej karte, logoroyal-dark v mobilnej hlavičke). Staging „garbage" za katalógom = Vercel toolbar (len preview, nie prod). Commity `65cd1b2` + `7925e08` na `dev`. |
| 35 | 2026-07-02 | ProductDetail biely hero + word-spacing nadpisov + hover seam fix + nové hero fotky | ProductDetail: tmavý foto-banner → krátky biely hero (jazyk PageHero: tichý back-link, eyebrow značky, tmavý H1, oranžový seam); **Archivo word-spacing 0.12em** (h1–h6 + `.font-display` — úzka medzera medzi slovami v caps titulkoch); **ProductCard hover biela linka definitívne fix** (svetlý gradient presunutý DO zoomovanej vrstvy s obrázkom; overené Playwright hover testom); Blog hero → `predajna-2.webp`, Partneri hero → `stroje-jcb-rameno.webp`; zmazané orphany `ServisNaradia.jsx`/`ZemnePrace.jsx`. Commit `5a324f4` na `dev`. |
| 33 | 2026-07-02 | UX/UI polish — homepage + katalóg (impeccable audit) | Full design audit (skóre 27/40) → volume-control fixes. **ProductCard:** jeden oranžový CTA/karta (Detail primárny, Zavolať tichý link), 2-riadkové názvy (`line-clamp-2`, koniec s `…`), stav „nedostupné" grayscale + badge na obrázku (skrytý call), tichší price tag. **Katalóg:** mobilné chip filtre kategórií+podkategórií (produkty ~1 obrazovka vs ~3), prepínač „Firmy/Súkromné osoby" + DPH popisok. **Section grammar:** eyebrow labely stenčené (AKCIE/KATALÓG/BLOG/FAQ preč), `WhyRoyalStroje` = 1 tmavý panel bez 01–04 čísel. **Formuláre:** viditeľné labely, `CustomSelect` zladený, border-l/side-tab preč. **Reveal hardening:** skrývanie len pod `html.js-reveal` (JS+IO gate) + print fallback, oprava zastaraného hero preloadu. Hamburger 44px, kontrast drobného textu. Nový `PRODUCT.md`. Build+lint čisté (0 nových), 5 commitov `f5d83f0`→`518ec12` na `dev`, NOT na `main`. |
| 36 | 2026-07-02 | Web-wide polish (impeccable) + blog čitateľnosť na svetlom | Katalóg hover **biely seam definitívne fix** (scale-zoom → seam-proof brightness+overlay; scaled vrstva orezávala zaoblené rohy karty = 1px seam, DPR-závislý → unikol Playwright testu). **Eyebrows stenčené na CELOM webe** (interné sekcné eyebrows preč; každá podstránka = 1 hero kicker + CtaBand kicker, jazyk homepage). **Watermark 01–04 čísla → čisté solid numbered badges** len pri reálnych sekvenciách (na CenovaPonuka feature kartách číslo úplne preč). **Card-grid variety:** klonové 4-kartové benefits mriežky (Zabezpečenie + Dovoz) → 1 hairline-delený panel (á la homepage `WhyRoyalStroje`). Zmazaný orphan `BusinessPillars`. **19 blog článkov re-téma na čitateľnosť na svetlom** (pravidlo predka: tmavé karty ostávajú tmavé = správny dark-on-light; opravené len bare-on-light nadpisy/úvody/samostatné tabuľky/tint boxy — `text-white`→`zinc-900/700`); `border-l-4` side-stripes → full-border callouty; purple/violet → orange. Build+lint čisté, 0 zmien textu (596 ins == 596 del). Commity `8ccbf2e` + `2cbf3b8` na `dev`, NOT na `main`. |

<!-- Sessions 3-14 archived in session summary table above -->

## What Was Done (Session 15) -- Real Photos + Ad-hoc Items + Gallery + Editable Days
Date: 2026-04-30

### Website
1. **MK Stavebná činnosť as 9th partner** -- JPG→WebP conversion (-28%), Facebook profile link with tracking params stripped. Files: `src/pages/Partneri.jsx`, `public/pictures/graphics/partneri/logo_mk_stavebna_cinnost.{jpg,webp}`. Committed: `d01940f`.
2. **Real shop photos in headers** -- Sluzby hero now uses `predajna-1.webp`, Kontakt hero uses `stroje-dvor.webp`, FAQ sidebar uses `predajna-4.webp`. JPGs from `royal obrazky/` folder converted with adaptive quality (q=80 → 72 fallback if WebP > JPG). Files: `src/pages/Sluzby.jsx`, `src/pages/Kontakt.jsx`, `src/components/home/FAQ.jsx`, `public/pictures/graphics/predajna-{1,4}.webp`, `public/pictures/graphics/stroje-dvor.webp`. Committed: `8392351`.
3. **Hero darkening overlays removed** -- two `linear-gradient(rgba(0,0,0,...))` overlays deleted from desktop Hero so the background photo shows in true colors. Text remains readable via the existing `backdrop-blur-sm bg-black/40` container. Files: `src/components/home/Hero.jsx`. Committed: `540f830`.
4. **"Testovacia prevádzka" popup removed + catalog image disclaimer** -- entire 50-line slide-in promo banner deleted from Header (state, useEffect, X icon import). Added subtle italic line above the catalog grid noting product images are illustrative, with `Info` icon in orange/60. Files: `src/components/common/Header.jsx`, `src/components/home/Catalog.jsx`. Committed: `8ff41f6`.
5. **FAQ delivery pricing for two vehicle types** -- replaced single Senec/BA/Ostatne block with Dodávka (Senec 10€, ostatné 1€/km min 10€) and Pick-up + prívesný vozík do 3500 kg (1,2€/km min 10€). Files: `src/components/home/FAQ.jsx`. Committed: `25d67c7`.
6. **Photo gallery on Kontakt page** -- masonry grid via CSS columns (1→2→3 by breakpoint) with 5 photos below the map: predajna-1, predajna-2, stroje-jcb-rameno (portrait), predajna-3, predajna-4. Lightbox modal: fullscreen overlay, prev/next buttons, keyboard arrows + Escape, click-outside closes, body scroll lock. Mixed aspect ratios flow without cropping. Files: `src/pages/Kontakt.jsx`, `public/pictures/graphics/predajna-{2,3}.webp`, `public/pictures/graphics/stroje-jcb-rameno.webp`. Committed: `435f57c`.

### Dashboard + DB
7. **Ad-hoc reservation items (not in catalog)** -- migration 018 makes `reservation_items.equipment_id` nullable and adds `custom_name TEXT` + `custom_rate_unit TEXT` with `CHECK (equipment_id IS NOT NULL OR custom_name IS NOT NULL)`. NewDealStepItems has a "+ Pridať vlastný stroj" button opening an inline form (názov, výrobné číslo, druh sadzby, cena bez DPH). Custom items are forced to qty=1, render a "Vlastný" badge, and flow through PDFs (FO+PO), DealItemsTable, ReturnItemsModal, and Reports with `it.custom_name` / `it.custom_rate_unit` fallback. Files: `supabase/migrations/018_adhoc_reservation_items.sql`, `apps/dashboard/src/pages/deals/{NewDealStepItems,NewDealStepReview,NewDeal,DealItemsTable,ReturnItemsModal}.jsx`, `apps/dashboard/src/lib/{generateAgreementPdf,generateAgreementPdfPO}.js`, `apps/dashboard/src/pages/reports/Reports.jsx`. Migration applied manually in Supabase. Committed: `bf791fb`.
8. **"Dopyt" → "V prenájme" status label** -- internal status code (`inquiry`) unchanged; only the displayed label in `RESERVATION_STATUSES` flipped, so it propagates through pipeline columns + status badges everywhere. Files: `apps/dashboard/src/lib/constants.js`. Committed: `eccfc38`.
9. **Editable decimal rental days on partial return** -- ReturnItemsModal replaces the read-only "Vypočítaný prenájom" info banner with an editable text input that accepts both `,` and `.` separators (e.g. `3,5`). Auto-calculated days from pickup/return datetimes still pre-fill the input but can be overridden; `effectiveDays` drives the suggested final price and is what's persisted to `contracts.calculated_days` (NUMERIC(10,2) so decimals work). Files: `apps/dashboard/src/pages/deals/ReturnItemsModal.jsx`. Committed: `eccfc38`.
10. **Diacritic-insensitive name+description search in dashboard catalog** -- `useEquipment` now branches on whether a search term is active. With search: fetches up to 500 candidate rows and filters client-side using NFD normalisation against `name` AND `description` (matches website's `Catalog.jsx` logic). Without search: server-side pagination as before. So "kalove" finds "Kálové ponorné čerpadlo". Files: `apps/dashboard/src/hooks/useEquipment.js`. Committed: `e9721de`.
11. **Database wipe + sequence reset** -- user manually ran SQL in Supabase: `DELETE FROM invoices/contracts/reservations` (cascades clean reservation_items + contract_returned_items), then `ALTER SEQUENCE reservation_number_seq / invoice_*_seq RESTART WITH 1`. Next deal starts at `RS-2026-0001`, next contract at `ZN-2026-0001` (contract numbers are app-generated via MAX query, no PG sequence to reset). Clients and equipment kept intact.

### Hidden Content
12. **JCB 19C-I blog article hidden** -- added id 19 to the blog filter list in `src/pages/Blog.jsx`. User also cleared `blog_article_slug` on the JCB equipment row in Supabase so the product card no longer links to it. To be re-published after technical-spec corrections. (Commit was made by user directly: `3e280bb`.)

## What Was Done (Session 16) -- Dashboard custom domain + favicon
Date: 2026-05-04

### Infrastructure
1. **Dashboard moved to `app.royalstroje.sk`** -- DNS provider Active24: added `CNAME app → 643b2c6b1e12e326.vercel-dns-017.com` (new Vercel IP-range endpoint, replaces legacy `cname.vercel-dns.com`). Initial mistake: subdomain was first added to the public-website Vercel project (`royal-stroje`), so `app.royalstroje.sk` served the marketing site. Fix: removed it from `royal-stroje` project's Settings → Domains, then added it to the `royal-stroje-dashboard` project. SSL auto-provisioned by Vercel. Old `royal-stroje-dashboard.vercel.app` URL still works in parallel (no redirect set).
2. **Shared favicon on dashboard** -- `apps/dashboard/index.html` was linking to non-existent `/favicon.svg`. Copied `public/favicon.png` (Royal Stroje crown logo, 5.7 KB) to `apps/dashboard/public/favicon.png` and updated the link tag to `type="image/png" href="/favicon.png"`. Files: `apps/dashboard/index.html`, `apps/dashboard/public/favicon.png`. Committed: `7f01156`.

## What Was Done (Session 17) -- Cookie banner + /cookies page + chatbot lazy-load
Date: 2026-05-04

### Public website
1. **Cookie banner (info-only, no analytics yet)** -- thin full-width slide-up bar at the bottom, 800 ms delay after page load, "Rozumiem" + close, dismissal stored in `localStorage.royalstroje_cookie_consent`. Positioned `bottom-20 md:bottom-0 z-[60]` to sit above MobileNav on mobile. Files: `src/components/common/CookieBanner.jsx`. Committed: `927b3ca`.
2. **/cookies page** -- new route with intro ("we use no analytics/marketing"), list of all cookies + localStorage entries (`_GRECAPTCHA`, `royalstroje_cart`, `formSubmissions`, `royalstroje_cookie_consent`, MDN chatbot). Desktop = table, mobile = card-per-cookie layout with `Typ / Účel / Doba / Poskytovateľ` rows. "Znova zobraziť oznámenie" button clears consent key + redirects to `/`. Files: `src/pages/Cookies.jsx`, route added in `src/App.jsx`. Committed: `927b3ca`.
3. **Footer link** -- "Cookies" added to "Stránky" column under GDPR. Files: `src/components/common/Footer.jsx`. Committed: `927b3ca`.
4. **Chatbot lazy-load** -- MDN Tech widget script removed from `index.html` and now injected via `useEffect` in `App.jsx` using `requestIdleCallback` (3 s timeout) with `setTimeout(1500)` fallback. First paint no longer blocked by external chatbot script. Files: `index.html`, `src/App.jsx`. Committed: `927b3ca`.

### Decision
- **Cesta b) info-only banner** chosen over full consent flow — site currently uses no analytics or marketing cookies (only `_GRECAPTCHA` strictly necessary + MDN chatbot which doesn't store user identifiers). When GA4 is added in a future session, the banner + /cookies page will be expanded into a proper Accept/Reject/Customize flow with Consent Mode v2.

## What Was Done (Session 18) -- Dashboard UX + PO contact birth/OP + contract restructure
Date: 2026-05-22

### Dashboard UX
1. **Company phone field for new PO client** -- "Telefón firmy" input added between Email firmy and IČO. State and save handler already supported phone, only UI was missing. Files: `apps/dashboard/src/pages/deals/NewDealStepClient.jsx`. Committed: `48942e6`.
2. **Sidebar brand is now a home link** -- logo + "ROYAL STROJE" + "Dashboard" subtitle wrapped in `NavLink to="/"`. Files: `apps/dashboard/src/components/layout/Sidebar.jsx`. Committed: `0f5ad28`.
3. **Pipeline trimmed to V prenájme + Ukončená** -- `PIPELINE_STATUSES` cut from 6 to 2 statuses. RESERVATION_STATUSES kept intact (used elsewhere). Files: `apps/dashboard/src/lib/constants.js`. Committed: `0f5ad28`.
4. **Monthly revenue without VAT + delivery fee field removed** -- Dashboard StatCard + Sidebar MiniStat now compute `Σ(total - vat_amount)`. NewDealStepReview drops the "Poplatok za dovoz" input (state hardcoded to 0 to keep NewDeal insert intact). Files: `apps/dashboard/src/hooks/useDashboardStats.js`, `apps/dashboard/src/pages/deals/NewDealStepReview.jsx`. Committed: `f7058cc`.
5. **"Tržby tento mesiac (bez DPH)" label** -- Dashboard + Reports StatCard relabeled. Files: `apps/dashboard/src/pages/Dashboard.jsx`, `apps/dashboard/src/pages/reports/Reports.jsx`. Committed: `ded315c`.
6. **Reports page rewired** -- StatCards were pulling from `invoices.status=paid` (always 0 since no invoices marked paid) -- switched to `reservations` with `completed/invoiced/paid` and bez DPH. 6-month chart also bez DPH for consistency. Year card relabeled to "Tržby tento rok (bez DPH)", chart title "(bez DPH)". Files: `apps/dashboard/src/pages/reports/Reports.jsx`. Committed: `dd3927c`.
7. **Dashboard Vercel SPA rewrite** -- Hitting refresh on `/reports`, `/clients`, etc. returned Vercel 404 because dashboard had no `vercel.json`. Added rewrite of `/(.*)` → `/index.html`. Files: `apps/dashboard/vercel.json` (new). Committed: `8df1de0`.

### Public website
8. **Unicon as 10th partner** -- Added to partners array with `https://www.unicon.cz/`. PNG→WebP conversion: `logo_unicon.png` 13.1 KB → `logo_unicon.webp` 2.1 KB (-84%) via Pillow q=85 method=6. Files: `src/pages/Partneri.jsx`, `public/pictures/graphics/partneri/logo_unicon.{png,webp}`. Committed: `ded315c`.

### Active24 hosting cleanup (non-code)
9. **WordPress removed from hosting** -- old WordPress install from previous site version was eating 378 MB files + 23 MB DB on Active24 `fabacv0r_1` plan (royalstroje.sk web is on Vercel, but emails go through Active24 mail server). User manually deleted via webftp.royalstroje.sk (file manager at `/royalstroje.sk/web/`) + dbadmin.royalstroje.sk (PhpMyAdmin) DROP database `QVceRP65aOtvb3zi`. Hosting paket kept active for email continuity. Verified by DNS check: A record `royalstroje.sk → 216.198.79.1` (Vercel), MX `→ mx10/mx20.active24.cz`. Active24 *Využitie hostingu* refresh is ~24 h.

### Dashboard + DB -- PO contact personal fields
10. **Migration 019: birth_date + id_card_number on client_contacts** -- new columns for lessee identification. Applied in Supabase. Files: `supabase/migrations/019_client_contacts_personal.sql`. Committed: `2b2fa15`.
11. **PO contact form -- add + edit** -- NewDealStepClient PO contact card got 2 new inputs. ClientDetail's inline "Pridať kontakt" form extended. New **Pencil edit icon** on each contact card opens inline edit form (including primary contact, which previously couldn't be edited). Contact card displays birth date with Calendar icon and OP with CreditCard icon. Files: `apps/dashboard/src/pages/deals/NewDealStepClient.jsx`, `apps/dashboard/src/pages/deals/NewDeal.jsx`, `apps/dashboard/src/pages/clients/ClientDetail.jsx`. Committed: `2b2fa15`.
12. **DD.MM.YYYY text input** -- native `type="date"` showed browser-locale-dependent month names (e.g. "11-Oct-yyyy" placeholder in English-locale browsers). Replaced with `type="text"` + explicit "Dátum narodenia" label + placeholder "DD.MM.YYYY". New helpers `isoToDmy()` + `dmyToISO()` in `constants.js` parse on save / format on load. Accepts `.`, `/`, `-`, space separators. Files: `apps/dashboard/src/lib/constants.js`, `apps/dashboard/src/pages/deals/{NewDealStepClient,NewDeal}.jsx`, `apps/dashboard/src/pages/clients/ClientDetail.jsx`. Committed: `e2ad048`.

### PO PDF contract -- signature block restructure
13. **OVERENIE OPRÁVNENIA A PODPISY layout** -- moved "Za prenajímateľa / Za nájomcu" headers above the date row. Split the previously full-width "V Boldog – Senec dňa..." into two columns: place+date on left, "OP/nar.: AB123456, 11.10.1990" on right. Signature rows (Podpis prenajímateľa / nájomcu) unchanged. OP+birth populated by fetching from `client_contacts` matching `client.id + reservation.contact_person` (exact name match). New `fmtBirthDate()` helper for DD.MM.YYYY in PDF. Files: `apps/dashboard/src/lib/generateAgreementPdfPO.js`. Committed: `d579f36`.

## What Was Done (Session 19) -- Contract Number Format YYXXXX + PDF Filename Overhaul
Date: 2026-05-26

### Contract Number Format
1. **New format YYXXXX** -- Replaced `ZN/ZF-YYYY-XXXX` with `YYXXXX` (e.g. `260147`). YY = 2-digit year, XXXX = 4-digit sequence. Návrh and finálna share the same number. Sequence floor set to 146 so numbering starts at 0147 matching manually renamed PC files. `generateNextNavrhNumber()` scans both new and legacy format contracts to find true max. Files: `apps/dashboard/src/lib/contractNumbers.js`. Committed: `3fac6e1`, `c899714`, `cab37a8`, `a0d625a`.
2. **PDF filename updated** -- Old: `zmluva-PO-navrh-RS-2026-0083.pdf`. New: `260147 LC-Construct.pdf` (návrh) / `260147 LC-Construct - ukončené.pdf` (finálna). No PO/FO prefix. Files: `apps/dashboard/src/lib/generateAgreementPdf.js`, `apps/dashboard/src/lib/generateAgreementPdfPO.js`. Committed: `3fac6e1`.
3. **"Zmluva č." field in PDF** -- Now reads from `contractData.contract_number` (e.g. `260147`) instead of `reservation.reservation_number`. Both FO and PO PDFs updated. Committed: `3fac6e1`.
4. **Confirm screen** -- "Číslo obchodu" relabeled to "Číslo zmluvy", shows contract number (`260147`) instead of reservation number (`RS-2026-0085`). Files: `apps/dashboard/src/pages/deals/NewDealStepConfirm.jsx`, `apps/dashboard/src/pages/deals/NewDeal.jsx`. Committed: `c899714`.
5. **Partial returns share same number** -- All finalizácie of a deal (full + partial returns) use the same base number with no `-N` suffix. Committed: `a0d625a`.
6. **Migration 020: drop unique constraint** -- `contracts_contract_number_key` unique constraint dropped so multiple contract rows can share the same number (required for partial returns). File: `supabase/migrations/020_contracts_drop_unique_number.sql`. Applied in Supabase. Committed: `e3c90c0`.

## What Was Done (Session 20) -- Dashboard cleanup + daysBetween fix
Date: 2026-05-29

### Rental day calculation
1. **Fix `daysBetween` off-by-one** -- Calendar-day diff was `Math.ceil(diff / 86400000) + 1`, so 29.5. → 30.5. counted as 2 days instead of 1. Removed the `+1`. Used in NewDealStepItems and NewDealStepReview for date-range price estimate. `rentalDays.js` (hour-based, used at finalization) was already correct and untouched. Files: `apps/dashboard/src/lib/constants.js`. Committed: `53081b2`.

### Dashboard pipeline + stats
2. **Fix `activeRentals` StatCard = 0 bug** -- `useDashboardStats` was querying `status = 'active'`, but new deals carry `status = 'inquiry'` (PIPELINE_STATUSES was trimmed to inquiry+completed in session 18). Switched to `'inquiry'`. Fix propagates to Sidebar MiniStat automatically. Files: `apps/dashboard/src/hooks/useDashboardStats.js`. Committed: `0c935bb`.
3. **Cap "Ukončená" pipeline column at 5 cards** -- Column with 73 completed deals was unscrollable. Added `limit` + `onShowAll` props to `PipelineColumn`. Ukončená shows 5 most recent + "Zobraziť všetkých {N} →" link that navigates to `/invoices?type=finalna`. V prenájme stays unlimited (operational focus). Files: `apps/dashboard/src/pages/Dashboard.jsx`. Committed: `0c935bb`.
4. **Deep-link support in Faktúry page** -- `InvoiceList` now reads `?type=` URL param on mount and pre-selects the type filter (validated against `navrh`, `finalna`, `proforma`, `invoice`, `credit_note`). No URL↔state two-way sync; manual filter changes don't update URL. Files: `apps/dashboard/src/pages/invoices/InvoiceList.jsx`. Committed: `0c935bb`.
5. **Rename "Dnes" StatCard → "Dnešné udalosti"** -- Old label was cryptic. New label matches the "Dnešný rozvrh" section heading and the Sidebar MiniStat. Underlying logic unchanged: counts reservations where `date_from = today OR date_to = today`. Files: `apps/dashboard/src/pages/Dashboard.jsx`. Committed: `042946c`.

## What Was Done (Session 21) -- Mobile Footer Gap + Mobile GPU Garbage Fix
Date: 2026-06-03

### Mobile footer gap
1. **Removed black gap above footer on mobile** -- `<main>` carried `pb-20 md:pb-0`, adding 5rem of `bg-zinc-950` (near-black) padding between the dark content and the footer's orange separator on mobile. The footer already clears the fixed MobileNav via its own `pb-24`, so the `main` padding was redundant and only created the gap. Removed it entirely (was already `md:pb-0` on desktop, so desktop is unchanged). Files: `src/App.jsx`. Committed: `7fdb182`.

### Mobile GPU garbage bands (the big one)
2. **Root cause: `backdrop-filter` on a fixed element** -- Scrambled GPU garbage / "black band that fills in while scrolling" (checkerboarding / tile-rasterization failure) appeared on **real Android only** (budget Xiaomi/Mali GPU) at the FAQ section and the 2nd product row. Did **not** reproduce in Chrome DevTools mobile-view. The trigger: the `HamburgerMenu` button is `fixed top-2 right-2 backdrop-blur-md` and sits on top during every mobile scroll. `backdrop-filter` on a fixed element forces Chromium to keep the page-tall content behind it composited as a read-back backdrop layer, which the budget GPU can't sustain during scroll → garbage. **Fix:** removed `backdrop-blur-md` from the hamburger button + its overlay (backgrounds already 90-95% opaque, so visually invisible), and gated the CookieBanner blur to desktop (`md:backdrop-blur-md`). Files: `src/components/common/HamburgerMenu.jsx`, `src/components/common/CookieBanner.jsx`. Committed: `ae01ea4`.
3. **Reveal animations de-promoted** -- `.reveal*.in-view` end states changed from `translateY(0)`/`scale(1)` to `transform: none` so cards drop their GPU compositing layer once the animation finishes (`none` is the identity matrix, so the slide/scale animation is unchanged). Cuts the live composited-layer count. Files: `src/index.css`. Committed: `ae01ea4`.
4. **AnimatedBackground disabled on mobile** -- gated behind `hidden lg:block` in `src/App.jsx`. Was part of the debugging (its three `fixed` layers are also a compositing trigger) and left disabled to keep mobile GPU load minimal. Its effects are 0.03-0.08 alpha (near-invisible), so mobile loses nothing visible. **Follow-up:** can re-add the subtle gradient/grid/vignette via a non-compositing CSS `body` background if desired. Committed: `ff5c5f0`.
5. **ProductCard badge blurs gated to desktop** -- the price/Novinka/badge `backdrop-blur-*` on product cards is now `md:backdrop-blur-*` with bumped mobile opacity. Part of the hunt; harmless and reduces mobile GPU surfaces. Files: `src/components/product/ProductCard.jsx`. Committed: `4f7c0a0`.
6. **Dead ends (reverted, documented in git history)** -- `overflow-x-clip` / `overflow: visible` on root div / ContentSection / FAQ (commits `6733a9a`, `6a7cbb7`, `dede89c`) and AnimatedBackground `translateZ` promotion did **not** fix it and were reverted. Lesson: the fixed-element `backdrop-filter` was the real trigger the whole time. **Never put `backdrop-filter` on a `fixed`/`sticky` element that stays on screen during scroll on budget Android.**

## What Was Done (Session 22) -- Landing Page Redesign (Industrial Premium)
Date: 2026-06-16
**Status: UNCOMMITTED** -- 12 files modified, not yet committed/pushed (owner wants to verify on a real mobile device first). Dev server was run locally at `localhost:5173` for screenshot review.

### Design direction
- User asked for a more modern landing page; chose **industrial-premium** direction with an **industrial font pairing**, scope = **whole page**. Constraints kept: dark theme, orange `#FF6600` primary, white secondary, hero image (`/stroje2.webp`), all texts + CTAs preserved. Implementation guided by the `frontend-design` skill. Hero shown to owner for sign-off before rolling across the catalog (approved).

### Foundation (type system + primitives)
1. **Fonts (the big change)** -- site previously used **system default fonts (no web font)**. Added **Archivo** (display/headings, wght 600–900) + **Manrope** (body, wght 400–800) via Google Fonts in `index.html` (preconnect + `display=swap`; `latin-ext` subset auto-served for Slovak diacritics). Wired `fontFamily.sans = Manrope`, `fontFamily.display = Archivo` in `tailwind.config.js`. Base `body`→Manrope, `h1–h6`→Archivo with `letter-spacing: -0.015em` in `src/index.css`. Files: `index.html`, `tailwind.config.js`, `src/index.css`.
2. **Reusable primitives** in `src/index.css` (`@layer components`): `.eyebrow` (orange uppercase label with leading rule; `.eyebrow--center` adds trailing rule) used above every section title; `.hairline` (orange→transparent divider); `.btn-primary` (orange gradient + inset highlight + hover lift) and `.btn-secondary` (outline). Radius moved from `rounded-full` pills toward `rounded-xl` for the engineered look.

### Sections
3. **Hero (desktop)** `src/components/home/Hero.jsx` -- glass "spec panel" with orange top accent rule, eyebrow `SENEC · BRATISLAVA`, Archivo headline, `.btn-primary`/`.btn-secondary` CTAs, and a stat strip (`20+ rokov · 24 h dovoz · 24/7 linka`, derived from existing copy). No image-wide dark overlay (kept session-15 true-color decision). Blur stays (panel is `relative`, not fixed → GPU-safe). Staggered entrance extended to 5 steps.
4. **Hero (mobile)** `src/components/home/MobileHero.jsx` -- same treatment scaled; eyebrow, stat strip, panel bumped to `bg-black/35`. Kept image, both CTAs, accent line, scroll indicator.
5. **Why-us** `src/components/home/WhyRoyalStroje.jsx` -- numbered cards `01–04` (big faint index number), orange icon tiles, hairline borders, eyebrow `Prečo Royal Stroje`. **Non-transform hover only** (border/shadow/bottom-accent-line width) to keep the `.reveal` de-promotion constraint rock-solid; dropped old `hover:scale`/`hover:-translate`.
6. **FAQ** `src/components/home/FAQ.jsx` -- eyebrow `Časté otázky`, image card with orange top accent + `ROYAL STROJE` eyebrow, contact box rebuilt with hairline icon-tile rows (phone/email/WhatsApp), accordion items get orange border + orange question text when open. All Q&A + contact details verbatim, toggle logic untouched.
7. **Catalog shell** `src/components/home/Catalog.jsx` -- eyebrows on mobile+desktop headers (`Katalóg` / `Strojový park`) and blog CTA (`Blog`); `Kategórie` heading gets an orange accent bar; blog "Prečítať blog" button → `.btn-primary`. Filter/search/cart logic untouched.
8. **Product cards** `src/components/product/ProductCard.jsx` -- hairline border (was thick orange/30) → orange on hover, subtle `hover:-translate-y-1`, refined badges/price chip (kept `md:backdrop-blur-*` gating), detail button = outline, call button = `.btn-primary`. "Momentálne nedostupné" kept.
9. **Quote form** `src/components/catalog/QuoteForm.jsx` -- orange top accent on card, darker inputs with focus ring, submit → `.btn-primary`. EmailJS/reCAPTCHA/fields untouched.
10. **Header/Footer cohesion** `Header.jsx` (active-nav underline white→orange), `Footer.jsx` (`ROYAL STROJE` wordmark → `font-display`). Header blur stays (`hidden md:block`, desktop-only → GPU-safe).

### Verified
- `npm run build` clean (CSS 69.8 kB / 11.3 kB gzip); ESLint clean on all 12 changed files (the repo's 602 baseline lint errors are pre-existing in untouched files). Slovak diacritics render correctly in the new fonts. Mobile-GPU guard: no new `backdrop-filter` on any `fixed`/`sticky` element on mobile; all `.reveal*.in-view` end states remain `transform: none`. All CTAs (`tel:`, `#katalog`, `mailto:`, `wa.me`) preserved.

### Heads-up for next session
- **Font change is GLOBAL** -- Manrope/Archivo now apply to the **entire site** (Služby, Kontakt, Blog, Partneri, Kosik, ProductDetail, dashboard is separate). Intended consistency win, but those pages also shifted visually and weren't individually reviewed this session.
- **Verify on a real budget Android** before committing (the session-21 GPU bug only repros on real hardware, not DevTools).
- Plan file: `C:\Users\cryptomeda\.claude\plans\chcel-by-som-upravit-purrfect-pony.md`.

## What Was Done (Session 23) -- Industrial-Premium Rollout to All Remaining Pages
Date: 2026-06-16
**Status: COMMITTED + PUSHED.** Session 22 landing redesign committed as `bf57e7d`; this session's page rollout as `f8d1d38`. Both pushed to `origin/main`. Owner approved the look ("vzhľad je teraz podstatne lepší").

### What & why
Session 22's font change was global, so every page already rendered in Archivo/Manrope but still carried the *old* component styling (loud cards, `rounded-full` pills, no eyebrows) — looked half-finished. This session finished the rollout, applying the session-22 design system to **all 18 remaining public pages**.

### Pages restyled (18)
- **By hand** (design-judgment): `Sluzby.jsx`, `Kontakt.jsx`, `Partneri.jsx`, `CenovaPonuka.jsx`, `Kosik.jsx`, `Blog.jsx`.
- **Via 4 parallel subagents** (mechanical, tight spec): `BlogDetail.jsx`, `ProductDetail.jsx`; service pages `RoyalFleet.jsx`, `PredajTechniky.jsx`, `NahradneDiely.jsx`, `SkoLenieObsluhy.jsx`, `ServisNaradia.jsx`, `DovozTechniky.jsx`, `ZemnePrace.jsx`; legal `GDPR.jsx`, `ObchodnePodmienky.jsx`, `Cookies.jsx`.

### Transformations applied consistently
1. **Eyebrows** (`.eyebrow` / `.eyebrow--center`) above hero + every section heading.
2. **CTAs** → `.btn-primary` / `.btn-secondary`, replacing the old `bg-gradient-to-r from-orange-primary to-orange-hover rounded-full hover:scale-105` pills.
3. **Cards** normalized to the canonical `bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10` + restrained `hover:shadow-orange-primary/15`, dropping the loud `border-2 border-orange-primary/30 + hover:scale-[1.02] + -translate-y-2 + shadow-2xl` style.
4. **Removed** the animated `gradient-shift` sheen overlay divs (Kontakt, Blog, PredajTechniky).
5. **Orange top-accent rules** (`h-[3px] from-orange-primary…to-transparent`) on prominent feature/highlight cards.
6. **Partneri** "Čo znamená partnerstvo" text blocks → numbered industrial cards (01–03).

### GPU guard upheld (see [[mobile-gpu-garbage-bug]] / session 21)
- No new `backdrop-filter` on any `fixed`/`sticky` element. Kontakt lightbox `backdrop-blur-sm` gated to `md:`; dropped a no-op in-flow `backdrop-blur` on Kosik panels.
- All `.reveal*.in-view` end states left at `transform: none`; only restrained / `hover:-translate-y-1` hovers used.

### Verified
- `npm run build` clean (11.56 s). ESLint clean on all 18 changed files (also fixed a pre-existing unused-var `catch (e)` in `Cookies.jsx`).
- **Still not device-tested** — the session-22 heads-up about verifying on a real budget Android applies to the whole site now; the GPU guard was kept intact but real-hardware confirmation is still pending.

## What Was Done (Session 24) -- Cenník dopravy + New Split-Screen Hero (WIP)
Date: 2026-06-23

### Cenník dopravy (committed + pushed)
1. **3rd transport pricing item in FAQ** -- Added "Preprava cudzieho stroja/náradia (nie z našej požičovne) — 1,50 €/km (min. 30 €)" below the existing Dodávka + Pick-up rows in the "Cenník dopravy" block. "bez DPH" not repeated per-row (the block already has a "Uvedené ceny sú bez DPH." footnote). Files: `src/components/home/FAQ.jsx`. Committed: `44d0cd3` + pushed. NOTE: a separate, older distance-tiered transport price list still lives on `src/pages/DovozTechniky.jsx` + `knowledgebase/04-sluzby.md` (0,50 €/km 20–50 km, dohodou >50 km) — left untouched; unify later if desired.

### New split-screen hero (UNCOMMITTED — in progress, continues next session)
**Status:** `src/pages/Home.jsx` (M) + `src/components/home/HeroSplit.jsx` (new) are UNCOMMITTED by owner's choice (still iterating; not deployed). Owner approved direction ("vyzerá to naozaj lepšie"). Old hero preserved.
2. **New `HeroSplit.jsx`** -- Split hero from owner's mockup: LEFT "Prenájom strojov a náradia s dovozom na stavbu" (img `/stroje2.webp`), RIGHT "Predaj náradia" (img `predajna-1.webp`), separated by a thin orange diagonal line. Below: a 4-image 16:9 strip (mock = existing repo photos `predajna-2/3`, `stroje-dvor`, `stroje-jcb-rameno`) then a white USP band (4 USPs: Dovoz techniky / Servisované stroje / Senec–Bratislava / Overená požičovňa). Built with the existing industrial-premium system (Archivo/Manrope, `.eyebrow`, `.btn-primary`/`.btn-secondary`, orange `#FF6600`). CTAs: `tel:` · `#katalog` · `/sluzby/predaj-techniky`.
3. **Old hero preserved for revert** -- `Hero.jsx` + `MobileHero.jsx` left untouched on disk; in `Home.jsx` the old imports + render block are commented out with a revert note. Revert = uncomment 2 imports + block, remove `<HeroSplit />`.
4. **Desktop = full-screen** -- section is `md:h-screen md:flex md:flex-col`; the split is `md:flex-1` (absorbs leftover height) so on 1920×1080 the bottom orange hairline sits exactly at the viewport bottom (verified: section 0→1080). Header is `fixed` overlay so it doesn't consume layout height. Mobile = stacked cards (Prenájom → Predaj → images 2×2 → USPs 2×2), natural height (not full-screen).
5. **Owner-requested polish** -- (a) removed the orange translucent glow behind the diagonal, kept a single thin crisp line (~4px, clip-path polygon). (b) Left H1 reduced to match the right H2 exactly (both `clamp(1.8rem,2.8vw,3.1rem)` = 49.6px @1920). (c) Added an orange hairline ABOVE the 4-image strip (mirrors the bottom one → frames the images+USP block). (d) Fixed "Navštíviť predajňu" hover-lift: the entrance animation class (`hs-4`, fill `both` → `transform: none`) was overriding `.btn-primary`'s `hover:-translate-y-0.5`; moved the animation onto a wrapper `div` so the button keeps its hover lift (verified translateY(-2px) on hover). Same wrapper fix applied to the mobile Predaj CTA.
6. **GPU guard upheld** -- no `backdrop-filter` on any `fixed`/`sticky` element; text legibility via in-flow linear-gradient overlays only; entrance keyframes end at `transform: none`. Build + ESLint clean on `HeroSplit.jsx` + `Home.jsx`.

### Note: 3 pre-session commits were undocumented
- `f8c2433` (hero element, SK link — stripped ~44 lines from old `Hero.jsx`/`MobileHero.jsx`, touched Sidebar/Footer), `88a703e` (texty — PredajTechniky), `96a315b` (textove fixy — Catalog, CenovaPonuka). These were owner's own tweaks made between session 23 and this session; logged here for completeness.

## What Was Done (Session 25) -- Homepage Light Theme (White Redesign, WIP)
Date: 2026-06-23
**Status: UNCOMMITTED** -- 7 component files + `index.css` modified (plus `Home.jsx`/`HeroSplit.jsx` still carrying the session-24 split-hero WIP). Owner approved the look ("vyzerá to daleko lepšie ako pred tým") but asked to **not commit yet** — continues next session. Dev preview ran at `localhost:5192`.

### What & why
Owner wanted the homepage on a light background. First pass (this session, earlier) just flipped the bg + section headings, which left every dark card/pill/accordion "floating" as black blocks on white. So this is a **full redesign of all homepage surfaces** into a cohesive light theme — direction **"clean white panels"** (`#FFF` cards on `#FAFAFA`, `zinc-200` borders, soft `shadow-sm shadow-zinc-900/5`, orange `#FF6600` kept as accent). Guided by the `frontend-design` skill. **Home-only** — heroes (`HeroSplit` keeps `bg-zinc-950`), footer, header all stay dark; other 12 pages stay dark.

### New primitives (`src/index.css`)
1. **`.card-light`** (`bg-white border-zinc-200 rounded-2xl shadow-sm shadow-zinc-900/5`), **`.input-light`** (white field + orange focus ring), **`.btn-outline-light`** (white outlined button for light bg — separate from `.btn-secondary`, which stays white-on-translucent for the dark hero). `.subcategory-btn` hover box-shadow rewritten dark→light-orange. `.reveal*` left untouched (GPU guard).

### Surfaces converted (palette: white cards / `zinc-200` borders / `zinc-900` headings / `zinc-700` body / `zinc-600` muted; orange + `.btn-primary` unchanged)
2. **`Catalog.jsx`** -- PO/FO toggle, search bar, category sidebar, subcategory pills (inline `style` background/shadow/border + the `.subcategory-btn` CSS changed in lockstep), accessories table, pagination, blog CTA cards. Dead `showCart=false` cart block left dark (not rendered).
3. **`ProductCard.jsx`** -- white card; dropped all 3 `md:backdrop-blur-*`; `Novinka` = solid orange; **price pill + `product.badge` kept DARK** over photos for legibility; blue/red accents darkened (-400→-600/-700).
4. **`WhyRoyalStroje.jsx`** -- 4 cards → white; faint index number `text-zinc-900/[0.05]`.
5. **`FAQ.jsx`** -- contact box + accordion → white; answer content region-scoped (bold sub-labels, `text-white/80` body, info boxes `bg-zinc-800/50`→`bg-zinc-50`, blue/orange tip boxes → -50/-200). **Left image card kept dark** (white text on the photo).
6. **`CustomSelect.jsx`** -- added opt-in **`light` prop** (trigger/dropdown/options light variants). Default stays dark, so the shared **Kontakt page `ContactForm` stays dark** (regression-checked).
7. **`QuoteForm.jsx`** -- card/header/inputs/success → light (uses `.input-light`); passes `light` to `CustomSelect`; error box → `bg-red-50`.

### Verified
- `npm run build` clean (10.46 s). Orange preserved; GPU guard upheld (no new `backdrop-filter` on `fixed`/`sticky`; `.reveal*.in-view` still `transform: none`; ProductCard badge blurs dropped). Regression: `/kontakt` CustomSelect still dark; ContentSection default unchanged so other pages stay dark.
- **Still not device-tested** — real budget-Android scroll-check (FAQ + product grid) pending, same as the session-22/23 heads-up.

## What Was Done (Session 26) -- Light Theme Rolled Out to All Remaining Pages
Date: 2026-06-24
**Status: UNCOMMITTED** -- 18 page files + shared `ContactForm.jsx` modified (on top of the still-uncommitted session-24 split hero + session-25 Home light theme). Owner asked to leave everything uncommitted and continue next session.

### What & why
Session 25 made only the **homepage** light, leaving the other ~15 pages dark — the site looked half-converted. Owner asked to apply **the same light design to every remaining subpage** for one unified look, **keeping each page's hero/header dark** (only content below the hero converts). Owner chose **"všetko svetlé"**: convert even the dark CTA bands + animated glow backgrounds (no dark accent zones).

### Method (agent workflow)
A `Workflow` ran one agent per page: **convert → adversarially verify → auto-fix**. 16/18 clean first pass; `BlogDetail.jsx` auto-fixed (its "article not found" early-return state needed a light bg + dark heading); `PredajTechniky.jsx` convert agent died on an API stream timeout and was **hand-converted** afterward. `ServisNaradia.jsx` + shared `ContactForm.jsx` were done by hand first as the pattern template.

### Pages converted (18)
- **ContentSection pages** (added `light` prop + mapped cards): `Sluzby`, `PredajTechniky`, `NahradneDiely`, `CenovaPonuka`, `RoyalFleet`, `SkoLenieObsluhy`, `Blog`, `BlogDetail`, `Partneri`, `GDPR`, `Cookies`, `ObchodnePodmienky`, `Kontakt`.
- **Non-ContentSection** (manual `#FAFAFA` root): `Kosik` (cart + calendar widget), `ProductDetail` (hero photo overlay kept dark).
- **Orphan service pages** (see heads-up): `ServisNaradia`, `DovozTechniky`, `ZemnePrace` — converted + their dark animated glow backgrounds (`floatGlow/pulseGlow` `@keyframes` + radial-gradient divs) removed.

### Conversion pattern applied (same cheat-sheet as session 25)
- Standard card `from-zinc-900 to-zinc-950 border-white/10` → `.card-light`; nested `bg-zinc-950/50 border-white/5` → `bg-zinc-50 border-zinc-200`.
- Text: `text-white`→`text-zinc-900`, `/70`→`zinc-700`, `/60-50`→`zinc-600`, `/40-30`→`zinc-500`. Borders `border-white/10`→`border-zinc-200`.
- Inputs → `.input-light`; light secondary CTA → `.btn-outline-light`; orange/`.eyebrow`/`.hairline`/`.btn-primary`/icon tiles unchanged.
- **Hero seam fix (every page with a hero):** the bottom fade gradient target flipped `#181818`→`#FAFAFA` so the dark hero meets the light content cleanly.
- **Shared `ContactForm.jsx` → light** (card-light wrapper, `.input-light` fields, `light` on its `CustomSelect`, light success/error states) — this is why **both Kontakt and Cenová ponuka** forms are now light (was deliberately dark in session 25). EmailJS/reCAPTCHA logic untouched.
- Brand-colored boxes lightened keeping hue: Makita teal → `teal-50/200/700`, Nivel yellow → `yellow-50/200/700`.

### Stay-dark exceptions (kept on purpose)
Dark heroes; text/badges over photos; ProductDetail hero strip overlay; Kontakt fullscreen **lightbox** (`bg-black/90`, blur gated `md:`); product-image containers that are `bg-white`; the Blog card photo bottom-overlay.

### Verified
- `npm run build` clean (16.6 s); ESLint clean on all 19 changed files.
- Adversarial grep across `src/pages`: only 6 residual dark hits, **all legitimate** (BlogDetail desktop back-button on the dark hero, Blog card photo overlay, Kontakt commented-out social block, ProductDetail back-button over hero photo). No `bg-black` CTA bands left, no `floatGlow/pulseGlow` left, all hero fades + non-ContentSection roots = `#FAFAFA`.
- GPU guard upheld (no `backdrop-filter` on `fixed`/`sticky`; `.reveal*.in-view` untouched). Dev preview ran at `localhost:5176`.
- **Still not device-tested** on real budget Android (standing item since session 22).

### Heads-up for next session
- **Orphan service pages** — `ServisNaradia.jsx` / `DovozTechniky.jsx` / `ZemnePrace.jsx` exist but are **not in `App.jsx` routes and not linked anywhere** (Sluzby's 6 cards point only to predaj-techniky / nahradne-diely / cenova-ponuka / royal-fleet / skolenie-obsluhy + `/#katalog`). They're unreachable dead files. **Owner to decide: delete them or wire up routes.** Converted anyway so they're ready either way.
- Everything is **UNCOMMITTED** and stacks on the session-24/25 Home WIP — shipping = one commit takes the split hero + full light site live at once (push to `main` auto-deploys royalstroje.sk).

## What Was Done (Session 27) -- Hero asset polish + homepage sections + light header
Date: 2026-06-25
**Status: UNCOMMITTED** (owner asked to wrap without committing; stacks on the session-24/25/26 WIP). Build + ESLint clean throughout. Excellent session — owner very happy with the result.

### Hero truck image (`/hero-auto.*`)
1. **New transparent truck asset** — owner supplied `public/hero-auto1.png` (Isuzu pickup + minirýpadlo on trailer, true alpha). Earlier `hero-auto.png` had a baked opaque white square; replaced. **Trimmed** the transparent padding to the truck's ink bbox → `public/hero-auto.webp` + `public/hero-auto.png` (1004×578). `hero-auto1.png` kept as the untrimmed source; old `hero-auto.full.png` backup deleted.
2. **HeroSplit left layer** — gray gradient bg → **pure white** (`bg-white`); truck centered in the left sloped section: `absolute left-[4%] top-[57%] -translate-y-1/2 w-[46%]` (+ `overflow-hidden` on the white base div). Mobile truck = `bottom-0 inset-x-0 w-full`. Owner approved ("vyzerá to auto super").

### Hero restructure ([HeroSplit.jsx](src/components/home/HeroSplit.jsx))
3. **Removed the 4-image strip** that sat between the split and the USP band. The left (truck) + right (predajna photo) split now `md:flex-1` stretches full-height down to the USP bar (matches owner's `navrh2.png`/`hero_navrh.jpg` mock).
4. **USP band redesigned** — white band → **gray band** (`bg-zinc-100`), 4 USPs are now **white cards** (`rounded-2xl border shadow-sm`) with bigger icon tiles (24px), bigger text, gap between them (`gap-5`), taller padding (`py-6`), and a hover (lift + orange border/shadow + icon-tile brighten). The band is intentionally taller now. GPU-safe (hover transform only, no fixed `backdrop-filter`).

### New homepage sections (between Hero and Catalog, in [Home.jsx](src/pages/Home.jsx))
5. **`BusinessPillars.jsx`** (NEW) — 4 image-led pillar cards (dark gradient overlay + orange top accent + hover zoom). Heading: eyebrow "Čo ponúkame" + "Všetko pre vašu stavbu **na jednom mieste**". Pillars + images: Dovoz techniky (`dovoz.webp`, →`#katalog`), Prenájom a predaj náradia (`predajna-1.webp`, →`/sluzby/predaj-techniky`), Ťažká technika (`stroje-dvor.webp`, →`#katalog`), Sprostredkovanie prenájmu (`royal_stroje_krivosudsky.webp`, →`/kontakt`). Grid `1→2→4` cols; mobile cards landscape `16/10`, desktop portrait `4/5`.
6. **`PromoCarousel.jsx`** (NEW) — "Akcie" section, 3:1 banner (taller on mobile), industrial dark+orange style: deep gradient + orange radial glow, transparent product on the right, eyebrow/title/text/`.btn-primary`. Vanilla React carousel (no lib): autoplay 6 s (pauses on hover, only after first scrolled into view), prev/next arrows, dots, touch swipe, **`prefers-reduced-motion` respected**, GPU-safe (translateX on a non-fixed element). **3 slides are PLACEHOLDER offers** (text/discounts invented; products: mini-rypadlo-1000, utahovak, diamantovy-kotuc) — swap for real promos.

### Header redesign ([Header.jsx](src/components/common/Header.jsx)) — desktop (`hidden md:block`)
7. **Light/solid header** — was a transparent overlay (white text, invisible logo/nav on the new light hero). Now a **solid white bar** (`bg-white` + bottom border; shadow on scroll). Readable like the `hero_navrh.jpg` mock.
8. **Dark logo** — generated `public/logoroyal-dark.webp` (recolored the white "ROYAL" text → zinc-900 `#18181b`; crown + "STROJE" stay orange; transparent). Header now uses it. *(Owner may send a final logo to swap.)*
9. **Nav** — refactored to a `navItems` array; **added Blog before Kontakt**: `Požičovňa · Služby · Blog · Kontakt` (active = orange + 3px underline). Text now dark (`zinc-700`, orange on hover).
10. **Right cluster** — removed WhatsApp/Telegram/phone-hover icons. Now: phone number `0948 555 551` (tel link, `lg:` only) + orange **"Zavolať teraz"** `.btn-primary`.

### Catalog cleanup ([Catalog.jsx](src/components/home/Catalog.jsx))
11. **Removed the two decorative excavator images** (`JCB-19C-transparent` / `wacker-neuson-803-transparent`) that flanked the desktop "Katalóg strojov na prenájom" heading — owner felt they stole attention and looked unprofessional. Heading is now cleanly centered (`text-center max-w-2xl mx-auto`).

### Služby page + Dovoz techniky subpage (later in session 27)
12. **New light subpage hero** — `src/components/common/PageHero.jsx` (NEW). Reusable **light** hero (`hidden md:block`): white bg + soft orange glow, eyebrow, dark Archivo headline w/ orange highlight, subtitle, optional `chips` + `actions`, framed photo with orange top-accent on the right (lg+), bottom 2px orange seam. Replaces the old dark photo+black-overlay hero pattern. Owner wanted a lighter header style that still fits the brand.
13. **Sluzby.jsx** — swapped the dark hero → `<PageHero>` (CTAs Zavolať / Zobraziť techniku, predajna-1 photo). In the services grid, **replaced the "Cenová ponuka" card with "Dovoz techniky na stavbu"** (Truck icon, `dovoz.webp`, →`/sluzby/dovoz-techniky`). Royal Fleet icon Truck→`CalendarClock` (avoids two trucks). Removed now-unused `heroRef`/`FileText`. **Cenová ponuka route kept** (`/sluzby/cenova-ponuka` still works, just not in the grid).
14. **DovozTechniky.jsx** — rebuilt the orphan into a real marketing subpage: `<PageHero>` (van photo + chips Dovoz do 24 h · Naloženie aj vyloženie · Senec·Bratislava·okolie) → Benefits (4) → How-it-works (3 numbered steps) → **Cenník dopravy** → CTA. **Pricing now matches FAQ** (Dodávka: Senec 15 € / ostatné 1 €/km min 15 €; Pick-up + vozík do 3 500 kg 1,2 €/km min 15 €; cudzia technika 1,50 €/km min 30 €; bez DPH). **Deleted the old contradictory pricing** that was in the orphan (0,50 €/km, "ZDARMA do 20 km") and did NOT invent services (no skladovanie/poistenie prepravy) — kept it truthful per FAQ + homepage copy.
15. **App.jsx** — added route `/sluzby/dovoz-techniky` → `DovozTechniky` (it's no longer an orphan). `ServisNaradia.jsx` / `ZemnePrace.jsx` remain orphan.

### Heads-up for next session
- **Light subpage hero is only on Sluzby + DovozTechniky** — owner may want `PageHero` rolled out to the other subpages (PredajTechniky, RoyalFleet, NahradneDiely, SkoLenieObsluhy, CenovaPonuka) for one unified light look. Each still has the old dark photo+overlay hero.
- **Cenová ponuka** — removed from the Sluzby grid but route still live. Owner to decide: fully retire, or surface it elsewhere (e.g. a hero CTA).
- **Mobile header NOT touched** — the desktop `Header.jsx` redesign is `md:` only; mobile still uses `HamburgerMenu` + `MobileNav`. If the light theme needs the mobile top bar reworked too, that's open.
- **Carousel "Akcie" content is placeholder** — replace slide copy/discounts + ideally add real 3:1 promo graphics. Pillar links are best-guess; adjust if needed.
- **Logo** — `logoroyal-dark.webp` is a recolor of the existing white logo; owner may supply a final dark logo to drop in.
- Everything still **UNCOMMITTED**, now stacking sessions 24–27. Shipping = one commit takes the whole redesign live (push to `main` auto-deploys royalstroje.sk).

## What Was Done (Session 28) -- Light `PageHero` rolled out to all remaining subpage heroes
Date: 2026-06-26
**Status: UNCOMMITTED** (owner asked to wrap without committing; stacks on the session-24→27 WIP). Build + ESLint clean.

### What & why
Session 27 introduced the light `PageHero` but only Sluzby + DovozTechniky used it — every other subpage still had the old dark photo+black-overlay hero, so the site looked half-converted. Owner asked to apply the light hero (like Sluzby) to all remaining pages (Blog, Kontakt, …).

### Pages converted (11)
- **Via 10 parallel subagents** (one per file, tight spec): `Blog.jsx`, `Kontakt.jsx`, `CenovaPonuka.jsx`, `NahradneDiely.jsx`, `RoyalFleet.jsx`, `SkoLenieObsluhy.jsx`, `Partneri.jsx`, `PredajTechniky.jsx`, `ServisNaradia.jsx`, `ZemnePrace.jsx`.
- **By hand** (dynamic): `BlogDetail.jsx`.

### Conversion pattern applied
1. Replaced the dark `<section className="hidden md:flex relative py-24…">` hero **and** the trailing `<hr … bg-[#FF6600] />` seam with a single `<PageHero>` (PageHero renders its own bottom orange rule).
2. Props mapped verbatim from each old hero: `eyebrow`, `title` (incl. orange `<span>`), `subtitle`, `image`, `imageAlt`. `actions` standardized to `.btn-primary` "Zavolať teraz" + `.btn-outline-light` "Zobraziť techniku" (→`/#katalog`) — same as Sluzby.
3. Added `import PageHero` + ensured `Phone` import; removed the now-unused `const [heroRef, heroInView] = useInView();` per page.
4. Special cases: **SkoLenieObsluhy** "Alpha Safety" badge → `chips={['…']}` (and dropped now-unused `GraduationCap`). **Kontakt** dropped its 2nd hero paragraph (regions) for a clean hero; eyebrow set to "Kontakt · Senec". **BlogDetail** (dynamic): `title={meta.title}`, `chips={[meta.date, meta.readTime, 'Autor: …']}`, `subtitle={meta.excerpt}`, back-link → `actions`; its mobile header `reveal` set to always-`in-view` (it used the removed `heroInView`).

### Not touched (on purpose)
- **ProductDetail.jsx** — its "hero" is a 280px product photo banner (`h-[280px]`), a different component, not a text hero. Left as-is.
- **Mobile** — `PageHero` is `hidden md:block`; every page keeps its own compact mobile heading exactly as before (parity).

### Verified
- `npm run build` clean (16.4 s). ESLint clean on all 11 + BlogDetail (caught + fixed one stray `heroInView` in BlogDetail's mobile header).
- GPU guard upheld: `PageHero`'s orange glow is a non-fixed `absolute` div; no new `backdrop-filter` on `fixed`/`sticky`.

### Heads-up for next session
- **All subpage heroes are now the light `PageHero`** — the session-27 "roll PageHero out to other subpages" item is DONE.
- `ServisNaradia` / `ZemnePrace` were converted too but remain **orphans** (not routed/linked) — still pending the delete-or-route decision.
- Everything still **UNCOMMITTED**, now stacking sessions 24–28.

## What Was Done (Session 29) -- Dev environment + nová služba "Zoženieme akýkoľvek stroj" + homepage CTA
Date: 2026-06-30
**Status: COMMITTED + PUSHED to `dev` (NOT `main`).** Production royalstroje.sk untouched. Commits `577098e` (dev baseline) + `95a1481` (homepage CTA) on `origin/dev`.

### Dev/staging environment (the big infra win)
1. **Vercel preview deployments as dev/staging** -- created a long-lived **`dev`** branch. Vercel keeps `main` as the Production Branch (→ royalstroje.sk) and treats every other branch as **Preview**, so `dev` deploys to an auto Vercel URL (`royal-stroje-git-dev-….vercel.app`) and never touches production. Owner chose the **auto Vercel URL** (no `dev.royalstroje.sk` subdomain) and **web-only** scope (dashboard left out). Workflow now: work on `dev` → push → owner reviews on staging → merge `dev`→`main` to ship.
2. **First dev push = the whole uncommitted redesign** -- the entire sessions 24–28 WIP (split hero, whole-site light theme, BusinessPillars, PromoCarousel, light header, light PageHero) + today's new service were committed as the dev baseline (`577098e`). `.env` files confirmed gitignored (no secrets pushed).
3. **Owner-side Vercel steps still pending** -- ⚠ enable env vars (`VITE_SUPABASE_*`, `VITE_EMAILJS_*`, `VITE_RECAPTCHA_SITE_KEY`) for the **Preview** environment (not just Production) or staging Supabase + forms break; confirm Production Branch = `main`. Documented in the `dev-staging-environment` memory.

### New service "Zoženieme akýkoľvek stroj" (replaces Royal Fleet)
4. **Royal Fleet removed, partner-sourcing service added** -- the service: if a client can't find a machine on the site, we source it from a partner požičovňa, handle delivery, and invoice the client ourselves. Owner picked the name **"Zoženieme akýkoľvek stroj"** from 5 proposed options. Files: new `src/pages/ZabezpecenieTechniky.jsx` (light design, modeled on `DovozTechniky`: hero + 4 benefits + 6 equipment tiles + 4-step process + CTA) at route `/sluzby/zabezpecenie-techniky`; `Sluzby.jsx` grid card swapped (Royal Fleet → new service, icon `PackageSearch`); `App.jsx` route swapped; `BusinessPillars.jsx` homepage pillar "Sprostredkovanie prenájmu" renamed + relinked to the new page; **`RoyalFleet.jsx` deleted** (only referenced from those 3 files — no new orphan). Texts adapted from owner's brief; no invented prices/services. Committed: `577098e`.

### Homepage "Nenašli ste stroj?" CTA banner
5. **New `SourcingBanner` section** between the catalog grid and "Prečo Royal Stroje" -- bold **dark+orange** band (pops on the light homepage): eyebrow "Nemáme to v ponuke? Žiadny problém", headline "Nenašli ste stroj, ktorý hľadáte?", subtext, 3 trust chips, primary CTA "Zoženieme vám ho →" → `/sluzby/zabezpecenie-techniky` + phone CTA. Decor: orange top-accent, faint engineering grid, orange radial glow, oversized `PackageSearch` icon. Files: new `src/components/home/SourcingBanner.jsx`, wired into `Catalog.jsx` before `<WhyRoyalStroje />`. GPU-safe (all decor non-fixed `absolute`; reveal ends at `transform: none`). Committed: `95a1481`.

### Verified
- `npm run build` + ESLint clean on all changed/new files throughout. GPU guard upheld. Owner: "super to je, budeme upravovať v ďalšej session."

## What Was Done (Session 30) -- Hero pás 4 fotiek + Domov = tmavé prvky na svetlom pozadí
Date: 2026-07-01
**Status: COMMITTED + PUSHED to `dev` (NOT `main`).** 7 commits `3ff2c39`→`f5b1d8b` on `origin/dev`. Production royalstroje.sk untouched. Build + ESLint clean throughout; GPU guard upheld. **Docs (this handoff) left UNCOMMITTED per owner request** ("zatiaľ nič necommituj").

### Public staging link (infra)
1. **Owner disabled Vercel Authentication** (Vercel → project `royal-stroje` → Settings → Deployment Protection → Vercel Authentication → Disabled). The founder couldn't open the preview (not a team member → "Request Sent" wall). Now the preview URL opens for **anyone, no login**. NOT a code/`vercel.json` setting — dashboard toggle only. Share the stable branch alias `royal-stroje-git-dev-…vercel.app` (not the per-deployment `royal-stroje-<hash>-…` URL, which changes each push). Owner confirmed public staging is fine. Recorded in the `dev-staging-environment` memory. (This sandbox has no outbound net, so the URL couldn't be probed from here.)

### HeroSplit — 4-image strip + split polish ([HeroSplit.jsx](src/components/home/HeroSplit.jsx))
2. **New white 4-image strip** between the diagonal split and the USP band: `grid grid-cols-2 md:grid-cols-4`, `rounded-xl` corners, `gap-5` (visible white gaps — not cramped), subtle border/shadow, hover = image zoom + orange border. Desktop images `md:h-[24vh]`; mobile 2×2. Entrance stagger via inline `animationDelay` on `hsUp` (keyframe ends at `transform:none` → GPU-safe; hover transform lives on the `<img>`, entrance on the wrapper — no fill-both conflict).
3. **Strip images aligned to the 4 USP columns below** (owner's request): `dovoz.webp` (dodávka)→**Dovoz techniky**, `predajna-4.webp` (JCB+Avant)→**Servisované stroje**, `predajna-2.webp` (predajňa)→**Senec–Bratislava**, `stroje-dvor.webp`→**Overená požičovňa**.
4. **Split shrunk to fit** — section stays `md:h-screen`; split is `flex-1` so it auto-shrinks to make room for the strip. Truck `hero-auto.webp` reduced 46%→**37%** and moved right `left-[5%]`→**`left-[12%]`** (fills the empty space, right edge near the diagonal). Right tool image (`predajna-1.webp`) **zoomed out** by constraining it to `absolute inset-y-0 right-0 w-[58%]` (object-cover then crops far less). Both desktop headings shrunk `clamp(1.8–3.1rem)`→`clamp(1.55–2.6rem)`. Right heading „Prenájom a predaj náradia" pulled left to the diagonal (`pl-[12%]`→`pl-[4%]`, left-aligned like the left heading). Removed the orange hairline under the strip.

### Homepage sections
5. **Removed `BusinessPillars`** ("Všetko pre vašu stavbu na jednom mieste") from [Home.jsx](src/pages/Home.jsx) — Akcie (`PromoCarousel`) is now the first section under the hero. ⚠ `BusinessPillars.jsx` is now an **unused orphan on disk** (delete-or-keep decision open).
6. **Akciový banner (`PromoCarousel`) −25 % height** — `lg:aspect-[3/1]`→`[4/1]`, `sm:[5/2]`→`[10/3]`; mobile base kept (copy needs the height, image hidden < sm). Files: [PromoCarousel.jsx](src/components/home/PromoCarousel.jsx).

### New theme direction: DARK elements on a LIGHT background (the big shift)
7. **Owner reversed the session 25–26 all-light direction for the homepage**: keep the light `#FAFAFA` **background** but make the **elements/cards dark** (= production `main` style). Applied section-by-section:
   - **`WhyRoyalStroje`** 4 cards → dark `from-zinc-900 to-zinc-950`, white title, `zinc-400` body, faint `white/[0.06]` index (heading/section stay on light bg).
   - **`Catalog` + `ProductCard` + `QuoteForm`** → reverted to `main`'s dark elements (PO/FO toggle, search, category sidebar, subcategory pills, product cards, accessories table, pagination, blog CTA cards, quote form). **Method:** `git checkout main -- <files>` then re-applied the 4 dev-only Catalog changes on top: `ContentSection light` (keep light bg), removed radial gradient, centered header **without the decorative excavator images**, `SourcingBanner`. `CustomSelect.jsx` left untouched (opt-in `light` prop) — Kontakt/Cenová ponuka keep their **light** selects; `main`'s QuoteForm doesn't pass `light` → its select is dark.
   - **`FAQ`** → reverted to `main` dark (accordion, contact box, answer info-boxes); left image card already dark. Rendered inside Catalog's `ContentSection light` → dark elements on light bg.
8. **Section headings/subtitles that sit directly on the light bg → darkened** (were white after the dark revert, invisible on light): catalog header (mobile+desktop), image disclaimer, empty-state, blog CTA „Chcete vedieť viac?", FAQ „Máte otázky?" → `text-zinc-900`/`text-zinc-600`. Orange spans unchanged. Text **inside** dark cards stays white (correct).

### Net state of the homepage theme
Hero (split, white base) → Akcie (dark banner) → Katalóg (**light bg, dark elements**) → SourcingBanner (dark band) → Prečo Royal Stroje (**dark cards, light bg**) → Blog CTA (dark cards) → FAQ (**dark elements, light bg**). Consistent "dark elements on light background" across the whole page. **(Session 31: this direction is now rolled out to every subpage too — see below.)**

## What Was Done (Session 31) -- Dark-on-light theme across the WHOLE site + new hero image + 4 s banner
Date: 2026-07-01
**Status: COMMITTED + PUSHED to `dev`** (`f57dd0e` for the theme, + a follow-up commit for the hero/banner). Production `main` untouched. Build + lint clean.

### Whole-site theme conversion (the big one)
1. **All 16 public subpages flipped to "dark elements on a light `#FAFAFA` background"** — matching the session-30 homepage. Owner approved the homepage look ("aktuálny štýl homepage je teraz perfektný") and asked to apply it everywhere. Rule: page background stays light; section headings/subtitles on the light bg stay dark (`text-zinc-900/700/600`, already correct); **card/panel/box interiors flip white→dark** (`bg-gradient-to-b from-zinc-900 to-zinc-950 border-white/10`, white/`zinc-400` text) — the exact recipe from `WhyRoyalStroje`. Done via 8 parallel agents (one per page-group) driven by a shared spec. Pages: Sluzby, PredajTechniky, NahradneDiely, DovozTechniky, ZabezpecenieTechniky, SkoLenieObsluhy, Partneri, Kontakt, CenovaPonuka, Blog, BlogDetail, Kosik, ProductDetail, GDPR, Cookies, ObchodnePodmienky.
2. **New shared `CtaBand` component** (`src/components/common/CtaBand.jsx`) — dark orange CTA band generalized from `SourcingBanner` (orange top accent, faint engineering grid, orange glow, optional oversized icon; props `eyebrow/title/text/actions/icon`). Every subpage's old "Zavolajte nám" CTA replaced with `<CtaBand>` for a consistent look. GPU-safe (non-fixed decor, reveal ends at `transform:none`).
3. **Deliberate exceptions (owner's choices):** **Partneri logo tiles stay `bg-white`** (dark logos would vanish on a dark tile); **Kontakt + Cenová ponuka contact form stays light** (`ContactForm` + `CustomSelect light` untouched); **legal pages keep long prose readable on the light bg** (dark text) and render only tables/reference boxes as dark elements (e.g. the Cookies table).
4. **Bug fix:** Kosik "odstrániť" remove button was `bg-red-50 border-red-200 text-red-600` (light red) now on a dark card → changed to `bg-red-500/10 border-red-500/25 text-red-400`.
5. **Not converted:** orphan pages `ServisNaradia.jsx` / `ZemnePrace.jsx` (unrouted — pending delete/keep decision); Blog article body content files (`src/data/articles/*` — untouched, potential follow-up if any use internal white boxes).

### Homepage tweaks
6. **`PromoCarousel` "Akcie" header centered** to match the Katalóg section (`eyebrow eyebrow--center` + `text-center max-w-2xl mx-auto`; desktop arrows moved to absolute bottom-right). Files: `src/components/home/PromoCarousel.jsx`.
7. **Akciový banner autoplay 6 s → 4 s** (`AUTOPLAY_MS = 4000`). Files: `src/components/home/PromoCarousel.jsx`.

### New hero image
8. **Hero truck image replaced** — owner swapped `public/hero-auto.png` for a new render (branded ISUZU pick-up towing a JCB 19C-I mini-rýpadlo on a near-white background). Regenerated `public/hero-auto.webp` via Pillow (q=85, method=6): 1622 KB → 120 KB (−92.6%). New image is **1774×887** (aspect 2.0) vs old 1004×578 (1.74), so `HeroSplit.jsx` `width`/`height` attrs updated on both desktop + mobile `<img>` to prevent layout shift. Note the new image is **RGB (no transparency)** — it blends because the left hero panel is `bg-white` and the render's background is near-white. Files: `public/hero-auto.{png,webp}`, `src/components/home/HeroSplit.jsx`.

### Open follow-ups (minor polish, flagged to owner)
- New `CtaBand` copy was authored where a page had no CTA headline (Kontakt, PredajTechniky, ProductDetail) — review wording.
- A few CTAs' small "✓ chip" bullet rows were dropped (CtaBand has no chip slot) — can restore via a `chips` prop.
- CtaBand renders slightly narrower on pages where it's nested inside the inner `max-w-[1800px]` container (double padding) vs full-width on homepage/Sluzby — cosmetic; can standardize.

## What Was Done (Session 32) -- Hero image swap + catalog corner machines + Kontakt availability
Date: 2026-07-01

Owner supplied 3 renders in a new `public/pictures/graphics/web_pics/` folder. All owner PNGs are RGB (no alpha) with a light **checkerboard baked into the pixels**; each was converted to WebP (Pillow q86-88, ~-91%), the low-saturation light-gray checkerboard flattened to `#FAFAFA`, and bager/auto_katalog cropped tight to content so the machines fill the frame.

1. **Hero left (prenájom) image swapped** -- `HeroSplit.jsx` left + mobile image `/hero-auto.webp` → `/pictures/graphics/web_pics/auto_hero.webp` (ISUZU + JCB on trailer in front of the predajňa; same 1774×887 dims, drop-in). Desktop enlarged to `w-[42%]`. Files: `src/components/home/HeroSplit.jsx`. Committed: `13ed948`.
2. **Catalog corner machines** -- two full-bleed decorative images flanking the "Katalóg strojov na prenájom" heading: `bager.webp` top-left, `auto_katalog.webp` top-right. `hidden lg:block`, `z-0`, `pointer-events-none`, anchored to the screen edges (ContentSection is `overflow-hidden` so no horizontal scroll; near-white bg blends into `#FAFAFA`). Files: `src/components/home/Catalog.jsx`. Committed: `13ed948`.
3. **Corner sizing iterated to final** -- after several passes (reach-to-text → +30/+25% → too tall & overlapping the category buttons → too small), settled on aspect-safe `max-w-[calc(50vw-Npx)] max-h-[Hpx]` with `w/h-auto`: the image scales to the largest size bounded by BOTH the side margin (never overlaps the centered 672px text column on narrow screens like 1366) AND a height cap (never reaches the category buttons at ~y422 on wide screens). bager N=356 / max-h 380 / top-20; auto_katalog N=350 / max-h 360 / top-36. Verified at 1280/1366/1600/1920. Committed: `9877bf8` (final; `d769fa0`/`0614eea`/`2c1fb85` were the intermediate size iterations).
4. **Kontakt CTA availability text** -- `CtaBand` text "Nonstop telefonická dostupnosť. Odpoveď do 15 minút." → "Dostupnosť 7–16, Po–Pia." Files: `src/pages/Kontakt.jsx`. Committed: `13ed948`.

Build + lint clean throughout. All 5 commits on `dev`, NOT on `main`.

## What Was Done (Session 33) -- UX/UI polish: homepage + catalog (impeccable audit)
Date: 2026-07-02

Owner asked to make the new dark-on-light redesign "more professional". Ran a full impeccable design audit (code inventory + slop detector + live desktop/mobile screenshots of the `dev` staging URL) — scored **27/40**. Diagnosis: strong foundation undermined by **volume control** (orange on everything, every component a heavy dark island, AI-template section grammar, catalog hierarchy the worst offender). Owner chose: refine dark cards (don't flip to light), scope = homepage + catalog, thin out eyebrows/numbers. All work on `dev`, `main` untouched.

1. **ProductCard — one orange CTA per card** -- `Zobraziť detail` is now the single filled `.btn-primary`; `Zavolať` demoted to a quiet `text-zinc-300` link (still `tel:`/desktop-toggle). Names use `line-clamp-2` (+ `min-h`) so "Ponorné čerpadlo 470 l/min" vs "1245 l/min" are distinguishable (was mid-word `…`). Price tag shrunk + neutral border, `bez DPH` label `/50`→`/70`. **Unavailable state:** photo `grayscale opacity-60` + "Momentálne nedostupné" badge ON the image, call link hidden (was a bright orange Zavolať above a small red note). Files: `src/components/product/ProductCard.jsx`. Committed: `f5d83f0`.
2. **Catalog — mobile UX + toggle clarity** -- Category sidebar hidden below `lg`; mobile now gets a horizontal category **chip row** + subcategory **chip scroller** (products appear ~1 screen from the heading vs ~3 before). Desktop subcategory pills de-weighted (smaller, lighter shadow). PO/FO toggle spells out "Firmy"/"Súkromné osoby" on mobile + a caption "Zobrazené ceny sú bez DPH / s DPH". Removed KATALÓG/POŽIČOVŇA/BLOG eyebrows; disclaimer `zinc-500`→`zinc-600`. **Corner machines untouched** (owner-final in s32). Files: `src/components/home/Catalog.jsx`. Committed: `f5d83f0`.
3. **Section grammar thinned** -- Removed eyebrow labels from AKCIE (`PromoCarousel`), PREČO ROYAL STROJE + KATALÓG + BLOG + FAQ; kept only informative ones (hero `SENEC · BRATISLAVA`, SourcingBanner hook). **`WhyRoyalStroje` rebuilt** from 4 identical `01–04`-watermark cards into **one dark panel with hairline-divided columns** (single island, orange top-rule like CtaBand). FAQ off-brand `bg-blue-500/10` callout → orange; carousel dots got padded ≥24px hit areas + tighter mobile rhythm. Files: `WhyRoyalStroje.jsx`, `PromoCarousel.jsx`, `FAQ.jsx`, `HeroSplit.jsx`. Committed: `7ecc8a4`.
4. **Forms a11y + detector cleanup** -- QuoteForm got visible `<label>`s above every field (placeholders became examples), placeholder contrast `/40`→`/60`, removed the `border-t-2` orange top stripe. `CustomSelect` restyled to match form inputs (`bg-zinc-950/60 border-white/10`) and dropped the `border-l-4` active-option side-tab. Files: `src/components/catalog/QuoteForm.jsx`, `src/components/ui/CustomSelect.jsx`. Committed: `a5cdc2d`.
5. **Reveal hardening + preload fix** -- Reveal base states now hide content **only** under `html.js-reveal` (set in `index.html` when JS + IntersectionObserver exist) + `@media print` force-shows all — motion is enhancement, never a blank-section gate (headless capture had shown FAQ/QuoteForm/Blog CTA as a giant blank band). `useInView` starts visible when no IO. New `.no-scrollbar` utility for the mobile chip rows. **Fixed a stale hero preload** (`index.html` still pointed at unused `/hero-auto.webp` — 120 KB wasted per visit → now `/pictures/graphics/web_pics/auto_hero.webp`). Hamburger button + close `w-10`→`w-11` (44px). Files: `src/index.css`, `index.html`, `src/hooks/useInView.js`, `src/components/common/HamburgerMenu.jsx`. Committed: `9906fdd`.
6. **PRODUCT.md created** -- impeccable design-context doc (register=brand/marketing, audience SK stavbári Senec–BA, dark-on-light visual system, brand `#FF6600`, Archivo/Manrope, GPU + reveal guards, conversion surfaces). Committed: `518ec12`.

Verification: `npm run build` clean; lint at baseline (601 pre-existing repo-wide problems, **0 new**); slop detector — homepage-component hits (QuoteForm border-accent, CustomSelect side-tab + gray-on-color) all cleared; before/after screenshots confirmed desktop + mobile. Remaining detector hits are in **dead heroes** (`Hero.jsx`/`Hero1.jsx`/`MobileHero.jsx` — not rendered) and **blog article bodies** (backlog). All on `dev`, NOT on `main`.

### Not done this session (follow-up backlog)
- **Subpage sweep** (Sluzby, Kontakt, Partneri, CenovaPonuka, Blog, ProductDetail, Dovoz, Zabezpecenie): same eyebrow thinning + `01–04` watermark removal + card-grid variety + CtaBand width standardization. Shared primitives already improved; subpages inherit forms but still carry their own eyebrows/numbers.
- **Blog article bodies:** `border-l-4` callouts (10 hits, case-study + zimne articles) + purple headings in 2 nivel articles.
- **Dead hero cleanup:** delete `Hero.jsx`/`Hero1.jsx`/`MobileHero.jsx` (gradient-text detector hits) — keep until `dev`→`main` merge as revert safety, then remove.

## What Was Done (Session 34) -- Font Source Sans 3 + ProductDetail redizajn + mobil opravy
Date: 2026-07-02

### Homepage / katalog (commit `65cd1b2`)
1. **Stav "nedostupne" odstraneny z katalogovych kariet** -- badge "Momentalne nedostupne", grayscale obrazka aj skryvanie "Zavolat" prec; kazda karta ma teraz CTA Zavolat bez ohladu na dostupnost (owner request). ProductDetail stav nikdy nezobrazoval, netreba menit. Files: `src/components/product/ProductCard.jsx`.
2. **Odsadenie "Aktualne ponuky a zlavy"** -- sekcia PromoCarousel mala nulovy horny padding (nadpis nalepeny na hero hairline); pridane `pt-10 md:pt-16 lg:pt-20`. Files: `src/components/home/PromoCarousel.jsx`.
3. **Mobil: USP karty pretekali** -- "SERVISOVANE STROJE" pretekalo z karty (ikona vedla textu nechala ~64px pre text). Mobil = ikona nad centrovanym textom, desktop layout nezmeneny. Files: `src/components/home/HeroSplit.jsx`.
4. **Mobil: katalogove filtre bez reveal animacie** -- FO/PO prepinac + hladanie + podkategorie boli v `reveal-fade` (opacity transition); funkcne ovladace nesmu byt na opacity 0 a opacity-vrstva v tejto zone korumpovala tiles na budget Androide ("cierny pas", miznuci prepinac). Renderuju sa staticky. Lupa 12->16px, X 10->14px. Files: `src/components/home/Catalog.jsx`.
5. **Staging GPU garbage = Vercel toolbar** -- scrambled pas za katalogom na owner-ovom Xiaomi bol **Vercel Toolbar** (fixed + backdrop-filter, presne session-21 trigger). Owner potvrdil: v prehliadaci bez Vercel loginu je staging cisty. Produkcie sa netyka; toolbar sa da vypnut vo Vercel Settings.

### Font + ProductDetail (commit `7925e08`)
6. **Body font Manrope -> Source Sans 3** -- owner: "medzery medzi slovami su velmi male, tazko sa to cita". Manrope ma uzku medzeru + polouzavrete geometricke litery; Source Sans 3 je humanisticky rez pre citanie na obrazovke (sirsie medzery, otvorene apertury, dobra latin-ext diakritika, kontrastna os k groteske Archivo). Archivo (display) ostava. Zamerne NIE Inter/DM Sans (genericke AI defaulty, Inter ma podobne tesnu medzeru). Files: `index.html` (Google Fonts link, `wght@400..900`), `tailwind.config.js`, `src/index.css`, `PRODUCT.md`.
7. **Zoom seam fix na produktovych kartach** -- biela horizontalna linka pri hover zoome = subpixelova medzera na spodnej hrane kompozitnej vrstvy obrazka. Fix: zakladny `scale-[1.02]` (obrazok trvalo pretiahnuty cez okraj kontajnera). Staticky 2D transform nepromotuje GPU vrstvu -- session-21 guard plati. Files: `src/components/product/ProductCard.jsx`.
8. **ProductDetail redizajn** -- Files: `src/pages/ProductDetail.jsx`:
   - **H1 = popisny nazov** ("Rezacka na dlazbu 1050mm"), znacka/model ("Festa") ako kicker -- predtym opacne (H1 "Festa"); plati pre hero aj mobilnu hlavicku; kicker/podtitul sa skryje ked description chyba (duplicitny nazov)
   - **Obrazok v bielom paneli** (fotky na bielom pozadi splynuli; predtym maly biely stvorec v tmavom rame) + oranzova horna linka + badge Novinka
   - **CTA v cenovej karte**: "Zavolat 0948 555 551" (btn-primary, cislo viditelne) + "Nezavazna ponuka" (btn-secondary -> `/cenova-ponuka`) -- predtym ziadne CTA nad foldom
   - **3 rovnake benefit-karty -> ticha faktova riadka** (Do 24 hodin / Dovoz na stavbu / Servisovana technika)
   - Specifikacie bez eyebrow labelu; blog odkaz: modre emoji -> oranzovy BookOpen
   - **Mobilna hlavicka**: `logoroyal.webp` (biely text) bol neviditelny na svetlom pozadi -> `logoroyal-dark.webp` + `pr-14` (kolizia s fixnym hamburgerom)
9. **Overenie** -- headless Chrome screenshoty (desktop 1600px, mobil 516px = min sirka okna headless Chrome na Windows) na `/festa` proti lokalnemu `vite preview`. Build + lint ciste.

## What Was Done (Session 35) -- ProductDetail biely hero + word-spacing + hover seam fix + nove hero fotky
Date: 2026-07-02

1. **ProductDetail hero redizajn (desktop)** -- tmavy 280px foto-banner (`hero3.webp` + gradienty) nahradeny kratkym BIELYM hero pasom v jazyku `PageHero`: tichy back-link (nie pill), eyebrow znacky na vlastnom riadku, tmavy Archivo H1, jemny oranzovy radial glow, 2px oranzovy seam. `pt-28` cisti fixny desktop header (~78px). Mobilna hlavicka (s34) nezmenena. Files: `src/pages/ProductDetail.jsx`. Committed: `5a324f4`.
2. **Word-spacing 0.12em pre Archivo nadpisy** -- owner: caps titulky ("PRENAJOM STROJOV S DOVOZOM NA STAVBU") maju prilis male medzery medzi slovami. Body font bol vymeneny uz v s34, ale TITULKY su Archivo (display) — uzka medzera + negativny letter-spacing (zmensuje aj medzislovne medzery). Fix: globalny `word-spacing: 0.12em` na h1–h6 aj `.font-display` (USP pas, price tagy) namiesto dalsej vymeny fontu. Files: `src/index.css`. Committed: `5a324f4`.
3. **ProductCard hover biela linka — definitivny fix** -- s34 zakladny `scale-[1.02]` na obrazku nestacil. Skutocna pricina: svetly gradient bol na KONTAJNERI za obrazkom, takze pri hover zoome mohol frakcny spodny okraj promotnutej img vrstvy odhalit svetle pozadie ako bielu linku. Fix: gradient presunuty DO zoomovanej vrstvy spolu s fotkou (skaluju sa ako jedna vrstva) — za nou je uz len tmava karta, seam fyzicky nemoze byt biely. **Overene Playwright hover testom** (`playwright-core` z node_modules + systemovy Chrome) na presne tej karte z owner screenshotu (Atlas Copco Weda 10N): mid-transition (350ms z 700ms) aj usadeny stav ciste. Files: `src/components/product/ProductCard.jsx`. Committed: `5a324f4`.
4. **Nove hero fotky Blog + Partneri** -- obe stranky mali genericky `hero-pozicovna.webp`. Blog → `predajna-2.webp` (svetly interier predajne s laser/meracou technikou — sedi k "tipy od profesionalov"); Partneri → `stroje-jcb-rameno.webp` (JCB rameno ramujuce Avant + Wacker Neuson na dvore s Royal Stroje bannerom — doslova partnerske znacky; portrait crop v 4/3 rame funguje). Files: `src/pages/Blog.jsx`, `src/pages/Partneri.jsx`. Committed: `5a324f4`.
5. **Orphan stranky zmazane** -- `ServisNaradia.jsx` + `ZemnePrace.jsx` (nikdy nerutovane v App.jsx, nikde nelinkovane; otvorene od s26) zmazane, −381 riadkov. Files: deleted. Committed: `5a324f4`.
6. **Overenie** -- build + lint ciste (len 4 pre-existujuce nalezy v nedotknutych suboroch: CookieBanner, useInView). Headless Chrome screenshoty: ProductDetail (`/festa`), homepage hero (word-spacing), Blog, Partneri; Playwright hover test na katalogovej karte. Poznamka: headless screenshoty potrebuju `--virtual-time-budget` (Supabase fetch + entrance animacie), inak zachytia spinner/prazdny hero.

## What Was Done (Session 36) -- Web-wide polish (impeccable) + blog readability on light
Date: 2026-07-02
**Status: COMMITTED + PUSHED to `dev`** (`8ccbf2e` page polish, `2cbf3b8` blog articles). Owner requested "polish the entire website" + fix the catalog hover white pixel. `main`/production still untouched. Guided by the `impeccable` skill (register: brand; command: polish) — its absolute bans mapped 1:1 onto the 0d task (eyebrow-per-section, decorative 01/02 numbers, side-stripe borders).

### Catalog hover white seam — definitively fixed
1. **Root cause finally nailed** -- the seam was NOT transparent-PNG edges (session-35 theory). It was the classic Chrome bug: `border-radius` + `overflow-hidden` on the card clipping a child that becomes a GPU-composited layer **and scales**. On hover the image wrapper scaled `1.02→1.05`; its square bounding-box corners poked past the card's rounded-corner arc and the compositor's rounded mask left a 1px AA seam — DPR/display-scaling dependent, which is why it showed on the owner's screen but passed the session-35 Playwright screenshot. The robust "keep the zoom" fix needs `translateZ(0)` on every card = forbidden by the mobile-GPU guard across ~157 cards. **Fix (owner OK'd changing the effect):** replaced the scale-zoom with a seam-proof `group-hover:brightness-[1.07]` + overlay-lift (`from-zinc-950/40`→`/20`). Nothing moves at the clip boundary → seam physically impossible; also drops a hover-time GPU layer. Files: `src/components/product/ProductCard.jsx`.

### Page polish (0d) — rolled across all service + content pages
2. **Eyebrows thinned site-wide** -- removed every interior section-heading eyebrow; each page now keeps exactly one hero kicker (the `PageHero` `eyebrow` prop) + the `CtaBand` kicker (homepage cadence; PRODUCT.md's "eyebrows sparingly" rule). Rule used: keep an eyebrow only if it's a `PageHero`/`CtaBand` prop or inside a `md:hidden` mobile-hero block; remove all others. ~30 eyebrows removed across Sluzby, ZabezpecenieTechniky, DovozTechniky, NahradneDiely, PredajTechniky, SkoLenieObsluhy, CenovaPonuka, Partneri, Kontakt, Blog, BlogDetail. Done via 5 parallel agents + hand-verify.
3. **Watermark `01–04` numbers → clean solid numbered badges** -- the faint `text-white/[0.06]` corner watermarks were replaced with deliberate `w-10 h-10 rounded-xl bg-orange-primary/10 border` numbered badges — **only** on real sequences (process steps: ZabezpecenieTechniky, DovozTechniky, CenovaPonuka services, Partneri "Filozofia"). On CenovaPonuka's parallel feature cards the number was removed entirely (implied a false sequence + duplicated the icon tile).
4. **Card-grid variety** -- the clone 4-card "benefits" grids on ZabezpecenieTechniky + DovozTechniky were converted to the homepage's single hairline-divided dark island panel (`WhyRoyalStroje` language: `cellBorders` const, orange top-accent rule). Other service pages kept their grids (genuine collections; variety across pages is fine).
5. **Cleanup** -- deleted unused orphan `src/components/home/BusinessPillars.jsx` (removed from Home in s30, never re-imported). Verified `CtaBand` width already matches the homepage `SourcingBanner` (`max-w-[1800px]` + `max-w-2xl`) — no work needed.

### Blog articles — readability re-theme on the light page (the discovery)
6. **Bug found beyond 0d scope** -- session 26 converted the `BlogDetail` page shell to light (`<article class="prose ... text-zinc-700">` on `ContentSection light`) but never re-themed the **19 article data files** (`src/data/articles/*`), which were authored for the old dark theme. Content inside dark cards was fine (correct dark-on-light look), but section headings, intro paragraphs, standalone tables, and light-tinted callout boxes used `text-white` on the light bg → **nearly invisible** (worst: the case-study's pink/green comparison boxes, the makita/rocny tables). Surfaced to owner with screenshots; owner chose **fix all 19 now**.
7. **Fix via 6 parallel agents + an "ancestor rule"** -- for each `text-white`, trace ancestors: if any has a dark bg (`bg-zinc-800/900/950`, `bg-black`, dark gradient) → leave it (correct); else it's bare-on-light → re-theme (`text-white`→`text-zinc-900`, `/90-/80`→`zinc-700`, `/70`→`zinc-600`). Standalone tables: headers/body darkened, zebra `bg-zinc-900/30`→`bg-zinc-50`, colored cells darkened (green-700/red-600/yellow-600), header tint kept. Light-tinted boxes: text darkened, tint+accent kept. **All dark cards left intact.** Plus banned-pattern cleanup everywhere: `border-l-4` side-stripes → full-border callouts (`rounded-xl border bg-*/[0.06-0.08]`), purple/violet/indigo → orange. Verified: build+lint clean, 5 articles screenshot-checked (nivel/makita/case-study/rocny + guides), word-safety audit (596 ins == 596 del, all changed tokens are className swaps — 0 Slovak text altered).

### Verified
- `npm run build` clean (11.9 s); ESLint clean on all changed files (only the 4 pre-existing findings in untouched files remain). Screenshots reviewed at 1440px: ZabezpecenieTechniky, DovozTechniky, CenovaPonuka, SkoLenieObsluhy, Partneri, homepage, + 5 articles. GPU guard upheld (no new `backdrop-filter` on fixed/sticky; the hover fix removes a composited layer). Reveal guard untouched.
- **Still not device-tested** on real budget Android (same standing heads-up).

## What To Do Next
| Priority | Task | Notes |
|----------|------|-------|
| 0 | **Review `dev` staging → merge `dev`→`main` to ship the redesign** | The whole redesign (sessions 24–**36**) + new "Zoženieme akýkoľvek stroj" service + homepage "Nenašli ste stroj?" banner + hero 4-image strip + the **dark-elements-on-light-bg** theme now across **the ENTIRE site** + new hero truck render + 4 s Akcie banner + session-32 hero image swap & catalog corner machines + session-33 UX/UI polish + session-34 Source Sans 3 body font, catalog cards without availability state, ProductDetail redesign, mobile fixes + session-35 ProductDetail white hero, Archivo word-spacing, hover seam fix, new Blog/Partneri hero photos + **session-36 web-wide polish (thinner eyebrows, no watermark numbers, card-grid variety, catalog hover seam fix) + all 19 blog articles re-themed readable on the light bg** are committed on **`dev`** (many commits ahead of `main`) and deploy to the public Vercel preview URL; `main`/production is untouched. Owner reviews on staging (incl. new font feel on text-heavy pages — FAQ/blog), then merge `dev`→`main` (push to `main` auto-deploys royalstroje.sk). Owner: continue editing on `dev`. |
| 0d | ✅ **DONE (session 36): Session-33 UX/UI polish extended to all subpages** | Thinned eyebrows (interior section eyebrows removed site-wide), removed `01–04` watermark numbers (→ clean numbered badges only on real sequences), added card-grid variety (Zabezpečenie+Dovoz benefits → single hairline panel), CtaBand width already standard. **Blog-article bodies fixed:** `border-l-4` → full-border callouts, purple → orange, **+ full readability re-theme of all 19 articles on the light bg** (was a real invisible-text bug, see session-36 notes). Still open: delete dead `Hero.jsx`/`Hero1.jsx`/`MobileHero.jsx` **after the `main` merge** (kept for revert). |
| 0c | ✅ **DONE (session 31): whole-site dark-on-light theme** | Session 30 did the homepage; **session 31 rolled the same "dark elements on light `#FAFAFA` bg" out to all 16 subpages** via a shared `CtaBand` + 8 parallel agents. Exceptions kept: Partneri logos white, Kontakt/Cenová ponuka contact form light, legal-page prose readable (only tables/boxes dark). Minor polish still open (see session-31 "Open follow-ups"): review authored CtaBand copy, optional restore of dropped ✓ chips, standardize CtaBand width. Still open: **`BusinessPillars.jsx` unused orphan** (removed from Home) — delete or repurpose. |
| 0a | **Finish Vercel dev-env setup (owner, in Vercel `royal-stroje`)** | ✅ (session 30) Public staging link — owner **disabled Vercel Authentication** (Deployment Protection), so the preview URL opens for anyone, no login. Share the stable branch alias `royal-stroje-git-dev-…vercel.app`. ⚠ Still pending: (1) Enable env vars (`VITE_SUPABASE_*`, `VITE_EMAILJS_*`, `VITE_RECAPTCHA_SITE_KEY`) for the **Preview** environment, not just Production — else staging Supabase + forms break — then Redeploy. (2) Confirm Production Branch = `main`. Web-only (dashboard not included). See the `dev-staging-environment` memory. Heads-up: reCAPTCHA/EmailJS are domain-restricted, so the form may error on the `*.vercel.app` preview domain unless whitelisted. |
| 0b | ✅ **DONE (session 35): orphan service pages deleted** | `ServisNaradia.jsx` / `ZemnePrace.jsx` deleted (never routed/linked). (`DovozTechniky.jsx` was wired up in session 27 — routed at `/sluzby/dovoz-techniky` and linked from the Sluzby grid.) |
| 1 | ✅ **MOSTLY DONE (session 34): real-Android verify** | Owner tested staging on his Xiaomi: the scrambled band behind the catalog was the **Vercel Toolbar** (fixed + backdrop-filter — the session-21 trigger class), confirmed clean in a logged-out browser; production won't have it. Catalog filter controls additionally hardened (reveal removed). Remaining: one final scroll-check of FAQ + product grid + subpages on the real device after the latest commits, ideally logged out of Vercel. |
| 2 | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 3 | Backfill OP + birth dates on existing PO contacts | Migration 019 added columns; existing contacts have NULL. Owner needs to fill via ClientDetail Pencil edit before generating new contracts to get OP/nar. line populated |
| 4 | Consider Workspace migration for emails | Active24 hosting paket (~10€/mo) is kept active solely for email. If only 1-2 mailboxes, Google Workspace (~6€/user) or Zoho could be cheaper. Requires MX migration. |
| 5 | GA4 + expand cookie banner to full consent flow | When GA4 added: convert info-only banner into 3-category (Necessary/Analytics/Marketing), wire Consent Mode v2, gate GA4 + chatbot loading on consent, extend `/cookies` table |
| 6 | Re-publish JCB 19C-I article | Update specs in `src/data/articles/jcb-19c-i-mini-rypadlo-kompaktny-vykon.jsx`, remove `19` from filter in `src/pages/Blog.jsx:247`, re-set `blog_article_slug` in Supabase |
| 7 | Verify subcategory data integrity | After Supabase migration some products had wrong subcategory_id (Custers bug). Run audit query across all products. |
| 8 | Product images | Upload product photos via dashboard image upload feature |
| 9 | Email notifications | Send quote/invoice PDFs via email (EmailJS or Supabase Edge Function) |
| 10 | Chatbot CORS fix | mdntech.org `/message` endpoint returns 405 on GET -- needs POST support |
| 11 | WhatsApp Business API | Send quotes directly via WhatsApp (post-MVP) |
| 12 | Online payment | Stripe/GoPay integration (post-MVP) |
| 13 | (Optional) Re-add mobile background | `AnimatedBackground` is now `hidden lg:block` (disabled on mobile during the GPU garbage fix). If the subtle gradient/grid/vignette is wanted back on mobile, re-add it via a non-compositing CSS `body` background (NOT fixed DOM layers). See `src/App.jsx`. |

## Key Files
| File | Purpose |
|------|---------|
| `PRODUCT.md` | **NEW (session 33)** impeccable design-context doc: register (brand/marketing), audience, dark-on-light visual system, brand tokens, GPU + reveal guards, conversion surfaces. Read before future design passes. |
| `src/pages/Home.jsx` | Home page -- renders `HeroSplit` + Catalog (old `Hero`/`MobileHero` block + 2 imports commented out for revert) |
| `src/components/home/HeroSplit.jsx` | **NEW (session 24, UNCOMMITTED)** split hero: desktop diagonal split (Prenájom \| Predaj) full-screen via `md:h-screen md:flex` (split = `flex-1`), mobile stacked; thin orange diagonal divider; 16:9 image strip framed by orange hairlines; white USP band (dark text + orange icons). GPU-safe (no fixed `backdrop-filter`, keyframes end at `transform: none`). Entrance animations live on wrappers so `.btn-primary` hover-lift survives |
| `src/components/home/BusinessPillars.jsx` | **NEW (session 27)** 4 image-led pillar cards (Dovoz techniky / Prenájom a predaj náradia / Ťažká technika / **Zoženieme akýkoľvek stroj** → `/sluzby/zabezpecenie-techniky`, renamed+relinked session 29); dark gradient overlay + orange accent + hover zoom |
| `src/components/home/PromoCarousel.jsx` | **NEW (session 27)** "Akcie" carousel, 3:1 dark+orange banners, vanilla React (autoplay/arrows/dots/swipe/reduced-motion); **3 placeholder offer slides** to replace with real promos |
| `src/components/common/Header.jsx` | **REWRITTEN (session 27)** desktop solid white header (`hidden md:block`); dark logo `logoroyal-dark.webp`; nav `Požičovňa·Služby·Blog·Kontakt`; phone number + `.btn-primary` "Zavolať teraz" (social/phone icons removed) |
| `public/logoroyal-dark.webp` | **NEW (session 27)** dark-text logo (white "ROYAL" recolored to zinc-900; crown+STROJE stay orange) for the light header |
| `public/hero-auto.webp` / `.png` | Trimmed transparent hero truck (1004×578). Source: `hero-auto1.png` (owner-supplied, untrimmed). **(session 32) No longer used on the homepage** — HeroSplit now uses `web_pics/auto_hero.webp` |
| `public/pictures/graphics/web_pics/` | **NEW (session 32)** owner-supplied renders (png source + webp): `auto_hero` (hero prenájom, 1774×887), `bager` (katalóg ľavý roh, cropped 1000×664), `auto_katalog` (katalóg pravý roh, cropped 1232×640). Owner PNGs had a baked-in checkerboard bg (RGB, no alpha) → webp flattened to `#FAFAFA` + cropped to content. To re-process: crop/flatten from the png then re-export webp (see session-32 notes) |
| `src/components/common/PageHero.jsx` | **NEW (session 27)** reusable LIGHT subpage hero (`hidden md:block`): white bg + orange glow, eyebrow, dark headline w/ orange highlight, subtitle, optional `chips`/`actions`, framed photo w/ orange top-accent (lg+), bottom orange seam. **Used by ALL subpages (session 28)**: Sluzby, DovozTechniky, Blog, BlogDetail, Kontakt, CenovaPonuka, NahradneDiely, SkoLenieObsluhy, Partneri, PredajTechniky, **ZabezpecenieTechniky** (ProductDetail has its own compact white hero since s35; RoyalFleet retired s29, ServisNaradia/ZemnePrace deleted s35) |
| `src/pages/DovozTechniky.jsx` | **REBUILT (session 27)** marketing subpage at `/sluzby/dovoz-techniky`: PageHero + benefits + 3-step process + **Cenník dopravy (real FAQ pricing)** + CTA. Replaced old contradictory pricing; truthful (no invented services) |
| `src/pages/Sluzby.jsx` | Services page — light `PageHero`; grid card "Cenová ponuka" replaced by "Dovoz techniky na stavbu" (→`/sluzby/dovoz-techniky`); **(session 29) "Royal Fleet" card replaced by "Zoženieme akýkoľvek stroj" (→`/sluzby/zabezpecenie-techniky`, icon `PackageSearch`)** |
| `src/pages/ZabezpecenieTechniky.jsx` | **NEW (session 29)** light service page at `/sluzby/zabezpecenie-techniky` ("Zoženieme akýkoľvek stroj" — sprostredkovanie prenájmu cez partnerov). Hero + 4 benefits + 6 equipment tiles + 4-step process + CTA. Modeled on `DovozTechniky`; replaces the retired `RoyalFleet.jsx` |
| `src/components/home/SourcingBanner.jsx` | **NEW (session 29)** homepage dark+orange CTA band "Nenašli ste stroj, ktorý hľadáte?" between the catalog and `WhyRoyalStroje` (rendered in `Catalog.jsx`); CTA → `/sluzby/zabezpecenie-techniky`. GPU-safe (all decor non-fixed `absolute`) |
| `src/components/home/Hero.jsx` | OLD desktop hero (preserved on disk for revert; NOT rendered while HeroSplit is active) |
| `src/components/home/MobileHero.jsx` | OLD mobile hero (preserved on disk for revert; NOT rendered while HeroSplit is active) |
| `src/components/home/Catalog.jsx` | Main catalog with URL-persisted filters + scroll animations |
| `src/hooks/useInView.js` | IntersectionObserver hook for scroll reveal |
| `src/hooks/useProducts.js` | Supabase product fetching + filter helpers |
| `src/pages/SkoLenieObsluhy.jsx` | Školenie obsluhy service detail page |
| `src/pages/Partneri.jsx` | Partners page with minimal grid design (8 partners, WebP logos, hover effects) |
| `src/components/common/Footer.jsx` | Footer (mobile 2-col, MDN Tech credit) |
| `src/components/common/Header.jsx` | Header + promo popup (hidden on mobile) |
| `src/components/common/AnimatedBackground.jsx` | Fixed gradient/grid/vignette bg layers -- **gated `hidden lg:block` (desktop only)**; fixed layers are a mobile GPU compositing trigger |
| `src/components/common/HamburgerMenu.jsx` | Mobile fixed hamburger button -- **no `backdrop-filter`** (caused mobile GPU garbage; backgrounds are opaque instead) |
| `src/index.css` | Global styles: base type (body=Source Sans 3 since s34, h1–h6=Archivo, word-spacing 0.12em since s35), industrial-premium primitives (`.eyebrow`, `.hairline`, `.btn-primary`, `.btn-secondary`), **light-theme primitives `.card-light`/`.input-light`/`.btn-outline-light` (session 25)**, `.subcategory-btn` hover (now light-orange), `.reveal*` scroll animations -- in-view end state is `transform: none` so cards de-promote off the GPU after animating |
| `src/components/common/ContentSection.jsx` | Shared content-section wrapper used by 13 pages; `background: #181818` by default, **`light` prop → `#FAFAFA` (session 25, only `Catalog`/Home passes it; other pages stay dark)** |
| `src/components/ui/CustomSelect.jsx` | Custom dropdown (shared by `QuoteForm` + Kontakt `ContactForm`); dark by default, **opt-in `light` prop (session 25)** for the light homepage — Kontakt stays dark by not passing it |
| `index.html` | Loads Archivo (display) + Source Sans 3 (body, since s34) from Google Fonts (preconnect + `display=swap`, latin-ext for Slovak); preloads hero image |
| `tailwind.config.js` | Orange tokens + `fontFamily.sans` (Source Sans 3, since s34) / `fontFamily.display` (Archivo) |
| `src/data/categories.js` | Static frontend category structure |
| `apps/dashboard/src/lib/generateAgreementPdf.js` | FO rental agreement PDF (návrh/finálna, time_from, contractData param) |
| `apps/dashboard/src/lib/generateAgreementPdfPO.js` | PO rental agreement PDF (návrh/finálna, time_from, contractData param) |
| `apps/dashboard/src/lib/rentalDays.js` | Rental day calculation algorithm (24h/26h/28h thresholds) |
| `apps/dashboard/src/pages/deals/ReturnItemsModal.jsx` | Modal for partial/full return: select items, set return date, generate final contract |
| `apps/dashboard/src/pages/equipment/EquipmentFilters.jsx` | Catalog filters: search, category, subcategory, sklad status |
| `apps/dashboard/src/hooks/useContracts.js` | Supabase hook for contracts table |
| `apps/dashboard/src/pages/deals/NewDealStepItems.jsx` | Step 2: Dátum od/do pickers, time, equipment search + cart, serial number picker |
| `apps/dashboard/src/pages/deals/NewDealStepReview.jsx` | Step 3: Súhrn with contact person dropdown, delivery, deposit, financials |
| `apps/dashboard/src/pages/equipment/EquipmentForm.jsx` | Equipment create/edit modal with serial numbers, image upload, features |
| `supabase/migrations/012_rate_unit_zemne_vrtaky.sql` | Adds rate_unit column, Zemné vrtáky subcategory, mm for diamond discs |
| `supabase/migrations/013_usage_location.sql` | Adds usage_location TEXT column to reservations for "Miesto používania PP" |
| `supabase/migrations/014_serial_numbers.sql` | Adds serial_numbers JSONB to equipment + reservation_items |
| `supabase/migrations/015_reservation_contact_person.sql` | Adds contact_person TEXT to reservations |
| `supabase/migrations/018_adhoc_reservation_items.sql` | Makes equipment_id nullable on reservation_items, adds custom_name + custom_rate_unit columns with CHECK constraint |
| `supabase/migrations/019_client_contacts_personal.sql` | Adds birth_date + id_card_number columns to client_contacts for lessee identification on PO contracts |
| `supabase/migrations/020_contracts_drop_unique_number.sql` | Drops unique constraint on contracts.contract_number so partial returns can share the same number |
| `apps/dashboard/src/lib/contractNumbers.js` | Contract number generation: YYXXXX format, legacy ZN/ZF scan, floor at 146, no -N suffix for partials |
| `apps/dashboard/src/pages/deals/NewDealStepConfirm.jsx` | Post-deal confirm screen -- shows contract number (260147) instead of reservation number |
| `apps/dashboard/src/lib/constants.js` | Adds `isoToDmy()` / `dmyToISO()` helpers + `PIPELINE_STATUSES` trimmed to `['inquiry', 'completed']` |
| `apps/dashboard/vercel.json` | SPA rewrite for dashboard app (refresh on /reports etc.); separate from root vercel.json |
| `apps/dashboard/src/hooks/useEquipment.js` | Equipment list hook with diacritic-insensitive name+description search (client-side filter when search active) |
| `apps/dashboard/src/hooks/useDashboardStats.js` | Dashboard stats hook -- `activeRentals` counts `status='inquiry'`, monthRevenue sums bez DPH for completed+invoiced+paid |
| `apps/dashboard/src/pages/Dashboard.jsx` | Dashboard page with PipelineColumn (limit prop for capping completed at 5 + "Zobraziť všetky" link to /invoices?type=finalna) |
| `apps/dashboard/src/pages/invoices/InvoiceList.jsx` | Faktúry & Zmluvy merged list -- reads `?type=` URL param on mount for deep-linking from Dashboard |
| `src/pages/Kontakt.jsx` | Contact page with hero, contact cards, opening hours, map, photo gallery + lightbox below the map |
| `src/components/common/CookieBanner.jsx` | Info-only cookie notice (slide-up bar, 800ms delay, dismissal in localStorage `royalstroje_cookie_consent`) |
| `src/pages/Cookies.jsx` | /cookies page: cookie/localStorage table (desktop) + card layout (mobile), "re-show notice" reset button |
| `apps/dashboard/src/lib/pdfFonts.js` | Inter font loading for jsPDF with Identity-H encoding for Slovak diacritics |
| `src/data/articles/jcb-19c-i-mini-rypadlo-kompaktny-vykon.jsx` | JCB 19C-I blog article (linked from product card via blog_article_slug) |
| `src/data/blogArticles.jsx` | Blog metadata + lazy loader for all article modules |
| `src/components/home/Catalog.jsx` | Public catalog with URL params (search, category, page), hash scroll, reveal animations |
| `src/hooks/useProducts.js` | Supabase product fetch with staticProducts fallback (SSR-safe initial state) |
| `knowledgebase/` | Chatbot knowledge base (.md files) |
| `index.html` | MDN Tech chatbot widget script tag |
| `supabase/migrations/008_equipment_images_storage.sql` | Supabase Storage bucket for equipment images |

## Architecture
```
RoyalStroje/
  src/                    # Public website (royalstroje.sk)
  apps/
    dashboard/            # Internal app (app.royalstroje.sk) -- port 3001
    portal/               # Royal Card portal (portal.royalstroje.sk) -- port 3002
  packages/
    shared/               # Shared types, Supabase client, constants
  supabase/
    migrations/           # 17 SQL migrations
    seed.sql              # Equipment catalog data
  knowledgebase/          # Chatbot knowledge base (.md files)
```

## Supabase
- **Project:** royal-stroje-system (Pro plan, EU region)
- **URL:** https://dvmdoczuppmcumykhktm.supabase.co
- **Tables:** equipment_categories, equipment_subcategories, equipment, clients, client_contacts, reservations, reservation_items, invoices, contracts, partners, royal_card_invitations, activity_log
- **Storage:** `equipment-images` bucket (public read, staff write) -- migration 008
- **Auth:** Email/password, roles in user_metadata (admin, staff, royal_card)
- **Admin user:** info@royalstroje.sk (app_role: admin)
- **Website env vars:** `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` set in Vercel for royalstroje.sk
