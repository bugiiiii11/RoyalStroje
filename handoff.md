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

## What Was Done (Session 3) -- Website Features + Mobile UX

### Backend / Data
1. **Website reads products from Supabase** -- `useProducts.js` hook fetches live data. Env vars added to Vercel. No more manual CSV sync.
2. **Image upload** -- Supabase Storage bucket `equipment-images` (migration 008). Dashboard form updated with file picker. Images served via public URL.
3. **FO/PO client types** -- `client_type` field in DB. Contract PDF generator selects correct template based on type.

### Dashboard -- PDF Contracts
4. **FO agreement PDF** -- Full rewrite to match original HTML template exactly. Orange #e8720a, Arial font, 8.5pt, borders #999999. Dynamic equipment rows (only actual items). Compact 3-column signature layout. Fits single A4 page.
5. **PO agreement PDF** -- Separate generator (`generateAgreementPdfPO.js`) for legal entities (§269 Obchodný zákonník). Overenie oprávnenia section, 2-party signature layout.

### Website -- Content + Pages
6. **6th service card** -- "Školenie obsluhy stavebných strojov" added to Služby. Grid changed from 5-card row to 3+3 layout.
7. **New page `/sluzby/skolenie-obsluhy`** -- Full course info: 6 course types, benefits, 5-step process, legal requirement section, Alpha Safety s.r.o. partner banner with external link.
8. **Catalog cleanup** -- Removed duplicate "Krovinorezy" subcategory from Malé náradie. Accessories (príslušenstvo) hidden from "Všetko" view.
9. **Catalog filter persistence** -- Filters stored in URL params (`?category=X&subcategory=Y&page=Z`). Browser back button restores filter state naturally. "Späť na katalóg" uses `navigate(-1)`.
10. **WhyRoyalStroje section** -- Moved below catalog, above FAQ. Now visible on mobile too.

### Website -- Mobile UX
11. **Mobile Hero** -- New `MobileHero.jsx`: full-height hero with background image, staggered CSS entrance animations (headline → subline → CTAs → scroll indicator).
12. **Scroll reveal animations** -- `useInView` hook (IntersectionObserver). CSS classes `reveal`, `reveal-fade`, `stagger-1..8`. Applied to product cards (staggered fade-up), WhyRoyalStroje cards, blog CTA.
13. **Footer mobile 2-col grid** -- About + Kontakt full-width; Služby + Stránky side-by-side. `pb-24` clears fixed bottom nav bar.
14. **MDN Tech chatbot widget** -- `<script src="https://mdntech.org/widget.js">` added before `</body>` in `index.html`. Chatbot ID: `b1637181-da22-4ae2-b79e-11c10b967b4f`.

### Website -- Design / Copy
15. **Promo popup redesign** -- Orange border (`border-orange-primary/40`), solid dark bg (no glass blur), orange close button.
16. **Footer MDN Tech credit** -- Logo + "Vytvorené M.D.N Tech" with orange hover link to mdntech.org.
17. **Blog** -- Article dates corrected, `prenajom-vs-kupa` moved to 1st position via `dateSort`, cover image added.
18. **Knowledgebase** -- Multiple `.md` files updated for chatbot (Pan Krivosudský persona).

## What Was Done (Session 4) -- Hero Redesign + Desktop Animations + Performance

### Hero Section
1. **New hero background image** -- Replaced `hero1.webp` with `hero-main.webp` (excavator sunset scene). Dark lower-left area designed for text overlay. Applied to both desktop (`Hero.jsx`) and mobile (`MobileHero.jsx`). Committed: 2af232b.
2. **Desktop hero text repositioned** -- Text moved from vertically centered to bottom-left (`items-end`, `pb-28 lg:pb-32`). Gradient overlays adjusted for new image. Committed: 2af232b.
3. **Desktop hero entrance animations** -- Staggered fade-up animations: headline (0.15s), description (0.35s), CTA buttons (0.55s). CSS `@keyframes heroDeskFadeUp` in `Hero.jsx`. Committed: 2af232b.

### Header
4. **White icons and nav links** -- Active nav link text + underline changed to white (was orange). Inactive links `white/70`. Social icons (WhatsApp, Telegram, Phone) changed to white. Hover remains orange. Committed: 2af232b.
5. **Logo scroll-to-top** -- Added `onClick` to logo Link to smooth-scroll to top when already on home page. Committed: 2af232b.

### Scroll Animations (Desktop + Mobile)
6. **New CSS animation variants** -- Added `reveal-left`, `reveal-right`, `reveal-scale` classes in `index.css`. Committed: 2af232b.
7. **Catalog section animations** -- Desktop header (reveal), filter bar (reveal-fade), category sidebar (reveal-left), subcategory filters (reveal-fade), mobile QuoteForm (reveal). Committed: 2af232b.
8. **FAQ section animations** -- Heading (reveal), left sidebar image+contact (reveal-left), FAQ accordion items (staggered reveal). Committed: 2af232b.
9. **Blog CTA cards** -- Staggered reveal on the two tip cards. Committed: 2af232b.

### Image Optimization
10. **PNG-to-WebP conversion** -- 13 PNG files converted to WebP. Total savings: 15.1 MB (87.7%). Hero image: 2.8 MB -> 167 KB. All code references updated automatically. Committed: 2af232b.

### Performance Fix
11. **Removed lazy loading from all pages** -- Removed `React.lazy()` and `Suspense` from all page imports in `App.jsx`. All pages now load in the main bundle (207KB gzip), eliminating the spinner on every page refresh. Committed: e670d0a.
12. **Hero image preload** -- `<link rel="preload">` in `index.html` for `hero-main.webp` so browser downloads it before React mounts. Committed: a59a376.

### Footer
13. **Copyright row centered on desktop** -- Changed from `justify-between` to `justify-center` with `|` separator between copyright and MDN Tech credit. Mobile layout unchanged. Committed: d335a83.

## What Was Done (Session 5) -- Scroll Animations -- All Pages

### Scroll Reveal Animations
1. **Sluzby.jsx** -- Hero text reveal, heading + subtitle stagger, 6 service cards staggered fade-up (stagger-1 to 6), CTA reveal-scale. Committed: 7063485.
2. **Blog.jsx** -- Hero, heading, staggered blog article cards (up to stagger-8), CTA reveal-scale. Committed: 7063485.
3. **BlogDetail.jsx** -- Hero, mobile header, article body reveal-fade, share section, CTA reveal-scale, related articles. Committed: 7063485.
4. **Kontakt.jsx** -- Hero, heading, 4 contact method cards staggered, visit section, CTA reveal-scale. Committed: 7063485.
5. **SkoLenieObsluhy.jsx** -- Hero, intro, partner banner reveal-scale, 6 course cards staggered, 4 benefits staggered, 5 steps staggered, CTA. Committed: 7063485.
6. **PredajTechniky.jsx** -- Hero, promo products staggered, categories heading + grid staggered, CTA reveal-scale. Committed: 7063485.
7. **RoyalFleet.jsx** -- Hero, intro, 3 models staggered, example reveal-scale, 4 benefits staggered, 5 steps staggered, who section, CTA. Committed: 7063485.
8. **DovozTechniky.jsx** -- Hero, heading, 6 service cards staggered, pricing section, CTA reveal-scale. Committed: 7063485.
9. **ServisNaradia.jsx** -- Hero, heading, 6 service cards staggered, why-us 4 items staggered, CTA reveal-scale. Committed: 7063485.
10. **NahradneDiely.jsx** -- Hero, heading, 4 service cards staggered, 4 order steps staggered, CTA reveal-scale. Committed: 7063485.
11. **ZemnePrace.jsx** -- Hero, heading, 6 service cards staggered, CTA reveal-scale. Committed: 7063485.
12. **CenovaPonuka.jsx** -- Hero, heading, 4 service cards staggered, why section reveal-scale, 3 steps staggered, form reveal. Committed: 7063485.
13. **Partneri.jsx** -- Hero, heading, 5 partner cards staggered, info section, CTA reveal-scale. Committed: 7063485.

### Bug Fix
14. **ProductDetail.jsx** -- Removed reveal-left/reveal-right/reveal-scale animations that caused content to be invisible. The reveal classes start at opacity:0 and the IntersectionObserver never triggered for already-visible above-fold content. Committed: 318e4e1.

### Skipped Pages
- GDPR, ObchodnePodmienky -- legal text, no animations needed.
- Kosik -- cart/form page, no animations needed.

## What Was Done (Session 6) -- New Products + Image Updates

### New Products
1. **4 new products added** -- 3x Pásové mini-rýpadlá (Wacker Neuson ET18, ET24, JCB 19C-I) + 1x Elektrický drvič (Makita UD2500). New subcategory "Drviče" in Záhradná technika. Migration `010_new_products_2026_03_29.sql` created. PNG images converted to WebP. Files: `src/data/categories.js`, `supabase/seed.sql`, migration 010. Committed: 574c081.

### Image Updates
2. **Hero image replaced** -- `hero-main.webp` → `hero-11.webp` on desktop (Hero.jsx), mobile (MobileHero.jsx), and preload (index.html). Committed: c5cf8f0.
3. **FAQ image replaced** -- `dovoz.webp` → `faq-1.webp` in FAQ sidebar. PNG converted to WebP (2.3 MB → 193 KB). Committed: c5cf8f0.

### Pending
- Migration 010 needs to be run in Supabase SQL Editor for products to appear on website.

## What Was Done (Session 7) -- Dashboard Contracts + Contacts Overhaul

### DB
1. **Migration 011** -- New `contracts` table (contract_number ZN-/ZF-, type navrh/finalna, time_from, return_date, time_to, calculated_days, final_total) + `client_contacts` table (id, client_id, name, phone, email, position, is_primary). RLS policies for both. Files: `supabase/migrations/011_contracts_contacts.sql`. Committed: d9662b2.

### Contract Flow (návrh → finálna)
2. **New deal: time_from + zábezpeka** -- Time picker "Čas vyzdvihnutia" added to NewDealStepItems. "Interné poznámky" replaced with "Zábezpeka (€)" numeric field (maps to `deposit_amount`). Files: `NewDealStepItems.jsx`, `NewDealStepReview.jsx`. Committed: d9662b2.
3. **Auto-create contract on deal creation** -- After reservation insert, automatically inserts a `contracts` record (type='navrh', ZN-YYYY-XXXX number). Files: `NewDeal.jsx`. Committed: d9662b2.
4. **Rental day algorithm** -- `rentalDays.js` utility: ≤24h→1d, 24–26h→1d (negotiable flag), 26–28h→1.5d, >28h→2d, extends per 24h period. Files: `apps/dashboard/src/lib/rentalDays.js`. Committed: d9662b2.
5. **FinalizeContractModal** -- Modal triggered from DealDetail. Sets return date/time, auto-calculates days via algorithm, shows negotiable warning, editable final price (pre-filled from calculation), generates final PDF. Files: `FinalizeContractModal.jsx`, `DealDetail.jsx`. Committed: d9662b2.
6. **PDF generators updated** -- Both FO and PO generators accept optional `contractData` param: "NÁVRH" suffix in title when draft, time_from shown in rental start, actual return date/time + final_total shown when finálna. Zábezpeka shown. Files: `generateAgreementPdf.js`, `generateAgreementPdfPO.js`. Committed: d9662b2.

### Faktúry Page
7. **Merged contracts + invoices view** -- InvoiceList now fetches from both `invoices` and `contracts` tables (via new `useContracts` hook), merges into single sorted list. Type filter extended with "Návrh zmluvy" / "Finálna zmluva". Delete button on each row with confirm modal (contract delete cascades reservation). Files: `InvoiceList.jsx`, `useContracts.js`. Committed: d9662b2.

### Client Contacts
8. **Multiple contact persons (max 5)** -- PO new-client form in NewDeal supports dynamic contact list (min 1, max 5 with add/remove). Contacts saved to `client_contacts` table after client creation. ClientDetail sidebar shows all contacts with add/delete. `useClient.js` extended to fetch `client_contacts`. Files: `NewDealStepClient.jsx`, `ClientDetail.jsx`, `useClient.js`. Committed: d9662b2.

## What Was Done (Session 8) -- Dashboard UX + PDF Polish + Equipment rate_unit

### New Client Flow
1. **Simplified new client form** -- Removed "Pokračovať s klientom" button. "Ďalej" renamed to "Vytvoriť obchod" (selects client + advances step). "Uložiť klienta" saves to DB and navigates to /clients. Client list hidden when form open. Files: `NewDealStepClient.jsx`, `NewDeal.jsx`. Committed: `0b77a9b`, `dfd7898`.
2. **Fix contract number collision (409)** -- Prevented duplicate ZN- numbers on rapid deal creation. Fixed finalization for deals without pre-existing contract record. Committed: `bef02bb`.
3. **Fix time_from seconds** -- `combineDatetime` stripped HH:MM:SS to HH:MM to prevent "08:00:00" showing in PDF. Files: `rentalDays.js`. Committed: `f28b81c`.

### PDF Contracts
4. **Dátum od/do labels + blank price on návrh** -- FO+PO: "Začiatok prenájmu" relabeled to "Dátum od", "Dohodnutá dĺžka" relabeled to "Dátum do". For návrh contracts: total/DPH left blank (filled only on finalization). Files: `generateAgreementPdf.js`, `generateAgreementPdfPO.js`. Committed: `7dc477b`.
5. **Wider signature rows** -- Signatures section restructured into two side-by-side `autoTable` calls. "Podpis prenajímateľa" and "Podpis nájomcu" rows use `colSpan:2` + `minCellHeight:15` for wide printable signature lines. Same layout for Protocol o vrátení PP. Committed: `7dc477b`.
6. **Pre-fill signature date + place** -- Both parties get today's date (sk-SK locale) pre-filled. Lessor gets "Miesto: Boldog – Senec" / "V Boldog – Senec dňa…" pre-filled. Committed: `5ecdc39`.

### NewDeal Step 2
7. **Editable Dátum do picker** -- "Dátum do" field added to step 2 (Zariadenia). Auto-fills to dateFrom+1 day, but user can override. Days recalculate on change. Committed: `2c31f90`.
8. **Timezone fix (UTC+2)** -- `toISOString()` was returning dateFrom instead of +1 in UTC+2. Fixed with `localDateStr()` using local date components. Files: `NewDealStepItems.jsx`. Committed: `5ecdc39`.

### Equipment Catalog
9. **rate_unit column + Zemné vrtáky subcategory** -- Migration 012: adds `rate_unit TEXT DEFAULT 'deň'` to equipment, inserts "Zemné vrtáky" subcategory under Záhradná technika, updates Kotúč diamantový items to `rate_unit='mm'`. EquipmentForm: new "Jednotka sadzby" dropdown (Denná/mm/Hodinová). PDF: `rateUnitLabel()` maps rate_unit to Druh sadzby column. Files: `EquipmentForm.jsx`, `DealDetail.jsx`, `generateAgreementPdf.js`, `generateAgreementPdfPO.js`, `012_rate_unit_zemne_vrtaky.sql`. Committed: `6a91ace`.

## What Was Done (Session 9) -- PDF Diacritics + PO Alignment + Usage Location

### PDF Fixes
1. **Fix ľ rendering in both PDFs** -- jsPDF `addFont()` without encoding param strips high byte from Latin Extended-A chars (ľ U+013E → `>` 0x3E). Added `'Identity-H'` encoding to Inter-Regular and Inter-Bold registrations. Also fixes ď, ť, ň, Ľ, Ď, Ť, Ň. Files: `apps/dashboard/src/lib/pdfFonts.js`. Committed: `fe19188`.
2. **PO contract signature/protocol alignment** -- Left "Overenie oprávnenia a podpisy" table and right "Protokol o vrátení PP" table drifted out of sync because the right first row ("Dátum a čas vrátenia") was shorter than the wrapped left prehlasenie text. Set `minCellHeight: 8` on both first rows. Also removed leading "1. " from the overenie text per client feedback. Files: `apps/dashboard/src/lib/generateAgreementPdfPO.js`. Committed: `0d399f6`.

### Landing Page
3. **Zemné vrtáky subcategory on landing** -- Added to `categories.js` so the Záhradná technika filter bar on the public site shows the new subcategory (DB side was already done in migration 012). Files: `src/data/categories.js`. Committed: `fe19188`.

### Miesto používania PP Field
4. **Migration 013: usage_location column** -- New TEXT column on `reservations` table for "Miesto používania PP" (where equipment is used — distinct from delivery address). Files: `supabase/migrations/013_usage_location.sql`. Applied in Supabase. Committed: `d5a1396`.
5. **NewDealStepReview input** -- New optional "Miesto používania PP" text input between Dovoz and Poznámky sections with helper text "Vyplní sa automaticky do zmluvy". Passes through `usageLocation` to finalData. Files: `NewDealStepReview.jsx`. Committed: `d5a1396`.
6. **NewDeal insert** -- Inserts `usage_location` into reservations row alongside delivery_address. Files: `NewDeal.jsx`. Committed: `d5a1396`.
7. **Both PDFs use usage_location** -- "Miesto používania PP" cell in FO and PO contracts now reads `reservation.usage_location || reservation.delivery_address || ''` (fallback to delivery_address for backwards compatibility). "Miesto odovzdania PP" still uses delivery_address as before. Files: `generateAgreementPdf.js`, `generateAgreementPdfPO.js`. Committed: `d5a1396`.

## What To Do Next
| Priority | Task | Notes |
|----------|------|-------|
| 1 | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` |
| 2 | Product images | Upload product photos via dashboard image upload feature |
| 3 | Add Zemné vrtáky products via dashboard | Subcategory exists in DB + frontend catalog -- add Makita DG002GZ etc. |
| 4 | Chatbot CORS fix | mdntech.org `/message` endpoint returns 405 on GET -- needs POST support |
| 5 | Email notifications | Send quote/invoice PDFs via email (EmailJS or Supabase Edge Function) |
| 6 | WhatsApp Business API | Send quotes directly via WhatsApp (post-MVP) |
| 7 | Online payment | Stripe/GoPay integration (post-MVP) |

## Key Files
| File | Purpose |
|------|---------|
| `src/pages/Home.jsx` | Home page -- renders MobileHero (mobile) + Catalog |
| `src/components/home/Hero.jsx` | Desktop hero with entrance animations + hero-main.webp |
| `src/components/home/MobileHero.jsx` | Mobile-only hero with CSS animations + hero-main.webp |
| `src/components/home/Catalog.jsx` | Main catalog with URL-persisted filters + scroll animations |
| `src/hooks/useInView.js` | IntersectionObserver hook for scroll reveal |
| `src/hooks/useProducts.js` | Supabase product fetching + filter helpers |
| `src/pages/Sluzby.jsx` | Services page (3+3 grid, 6 cards) |
| `src/pages/SkoLenieObsluhy.jsx` | Školenie obsluhy service detail page |
| `src/components/common/Footer.jsx` | Footer (mobile 2-col, MDN Tech credit) |
| `src/components/common/Header.jsx` | Header + promo popup (hidden on mobile) |
| `src/data/categories.js` | Static frontend category structure |
| `apps/dashboard/src/lib/generateAgreementPdf.js` | FO rental agreement PDF (návrh/finálna, time_from, contractData param) |
| `apps/dashboard/src/lib/generateAgreementPdfPO.js` | PO rental agreement PDF (návrh/finálna, time_from, contractData param) |
| `apps/dashboard/src/lib/rentalDays.js` | Rental day calculation algorithm (24h/26h/28h thresholds) |
| `apps/dashboard/src/pages/deals/FinalizeContractModal.jsx` | Modal for finalizing contract on product return |
| `apps/dashboard/src/hooks/useContracts.js` | Supabase hook for contracts table |
| `apps/dashboard/src/pages/deals/NewDealStepItems.jsx` | Step 2: Dátum od/do pickers, time, equipment search + cart |
| `supabase/migrations/012_rate_unit_zemne_vrtaky.sql` | Adds rate_unit column, Zemné vrtáky subcategory, mm for diamond discs |
| `supabase/migrations/013_usage_location.sql` | Adds usage_location TEXT column to reservations for "Miesto používania PP" |
| `apps/dashboard/src/lib/pdfFonts.js` | Inter font loading for jsPDF with Identity-H encoding for Slovak diacritics |
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
    migrations/           # 8 SQL migrations
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
