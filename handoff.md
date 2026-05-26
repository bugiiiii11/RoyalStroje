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

<!-- Sessions 3-6 archived in session summary table above -->

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

## What Was Done (Session 10) -- Serial Numbers + Contact Person + Hero Backdrop

### Equipment Serial Numbers (Výrobné čísla)
1. **Migration 014** -- `serial_numbers JSONB` on `equipment` (list of available serials) and `reservation_items` (selected serials for deal). Files: `supabase/migrations/014_serial_numbers.sql`. Applied. Committed: `0edf491`.
2. **EquipmentForm** -- New "Výrobné čísla" section below Technické parametre. Add/remove serial numbers with duplicate check, font-mono display. Files: `EquipmentForm.jsx`. Committed: `0edf491`.
3. **NewDealStepItems** -- Serial number picker shown for every equipment item (not just those with existing serials). Dropdown for existing serials + inline "Pridať nové číslo" input that saves to equipment DB. Auto-select when only 1 serial exists. Prevents same serial in multiple slots. Files: `NewDealStepItems.jsx`. Committed: `0edf491`, `c5a1a33`.
4. **NewDeal.jsx** -- Selected serial numbers saved to `reservation_items.serial_numbers`. Files: `NewDeal.jsx`. Committed: `0edf491`.
5. **PDF generators** -- "Výrobné číslo" column now filled from `reservation_items.serial_numbers` (was always empty). Each expanded row gets its corresponding serial. Both FO and PO PDFs updated. Files: `generateAgreementPdf.js`, `generateAgreementPdfPO.js`. Committed: `0edf491`.

### Hero Text Backdrop
6. **Desktop + Mobile hero** -- Added `backdrop-blur-sm bg-black/30 rounded-2xl` container behind text/CTA for better readability over background image. Files: `Hero.jsx`, `MobileHero.jsx`. Committed: `fc41001`.

### Contact Person Selection
7. **Migration 015** -- `contact_person TEXT` on `reservations`. Stores selected contact for this specific deal. Files: `supabase/migrations/015_reservation_contact_person.sql`. Applied. Committed: `704e94a`.
8. **Step 3 (Súhrn) dropdown** -- Fetches `client_contacts` for PO clients. If multiple contacts exist, shows dropdown with position and "(hlavná)" label. Auto-selects primary contact. Files: `NewDealStepReview.jsx`. Committed: `704e94a`.
9. **PDF contact person** -- Both FO and PO PDFs now prefer `reservation.contact_person` over `client.contact_person` for "Zastúpený/Kontakt" field and lessee signature name. Files: `generateAgreementPdf.js`, `generateAgreementPdfPO.js`. Committed: `704e94a`.

### Bug Fix
10. **Contract number collision** -- Changed from `COUNT` to `MAX` sequence number when generating contract numbers. Prevents "duplicate key" error after client/contract deletions. Files: `NewDeal.jsx`. Committed: `704e94a`.

### Data Cleanup
11. **Deleted all clients except** František Laky and Free Housing s.r.o. (with cascading deletion of reservations, items, contracts). Done via Supabase SQL Editor.

## What Was Done (Session 11) -- Partial Returns + Unified PDFs + Catalog UX
Date: 2026-04-17

### Dashboard Catalog
1. **Subcategory filter** -- Dropdown next to category filter, auto-filtered by selected category, resets on category change. Files: `EquipmentFilters.jsx`, `useEquipment.js`. Committed: `8973f6b`.
2. **"Nedostupne" toggle** -- EyeOff/Eye button sets equipment `status=inactive/active`. Inactive items stay in dashboard but hidden from royalstroje.sk (portal already filters `.eq('status', 'active')`). Gray badge + filter option. Files: `EquipmentTable.jsx`, `EquipmentCatalog.jsx`, `EquipmentFilters.jsx`. Committed: `25d34dd`.
3. **Delete equipment** -- Button added to equipment edit form with confirmation. Files: `EquipmentForm.jsx`. Committed: `2ba8381`.

### Partial Return Flow
4. **Migration 017: contract_returned_items** -- Junction table tracking which items are returned per final contract. RLS policy for authenticated users. Files: `supabase/migrations/017_contract_returned_items.sql`. Committed: `66fe595`.
5. **ReturnItemsModal** -- Select which items to return (checkbox per item), set return date/time, auto-calculate rental days + price per selected item. Creates new final contract + inserts returned item records. Reservation auto-completes when all items returned. Files: `ReturnItemsModal.jsx`, `DealDetail.jsx`. Committed: `66fe595`.
6. **Multiple final contracts** -- DealDetail shows "Finalne zmluvy (N)" dropdown listing all partial return contracts. Each generates its own PDF with only the returned items. Files: `DealDetail.jsx`. Committed: `66fe595`.
7. **RLS fix** -- Added missing `WITH CHECK (true)` to `contract_returned_items` policy (user ran SQL manually).

### Unified PDF Structure
8. **Invoice PDF uses agreement layout** -- Rewrote `generateInvoicePdf.js` to call `generateAgreementPdf`/`PO` with `invoiceData` param. Same parties, equipment, rental, signatures, protocol sections. Added IBAN/VS/Splatnost to financial column. Files: `generateAgreementPdf.js`, `generateAgreementPdfPO.js`, `generateInvoicePdf.js`. Committed: `810e036`, `a196ce0`.
9. **Keep ZMLUVA header on invoices** -- Invoice title stays "ZMLUVA O PRENAJME HNUTELNYCH VECI" (same contract, just with payment info). Invoice number appended to metadata subtitle. Files: `generateAgreementPdf.js`, `generateAgreementPdfPO.js`. Committed: `6f37b2d`.
10. **Navrh zmluvy always visible** -- Button no longer hidden after reservation completed. Available for all confirmed reservations. Files: `DealDetail.jsx`. Committed: `66fe595`.

### Client Management
11. **Edit client data** -- "Upravit" button on ClientDetail opens inline edit form for all client fields. Files: `ClientDetail.jsx`. Committed: `cba4bac`.
12. **Delete client** -- "Vymazat klienta" button with confirmation on client detail page. Files: `ClientDetail.jsx`. Committed: `9e0cf55`.

### Infrastructure Fix
13. **Vercel env vars for portal** -- After Supabase migration, royalstroje.sk portal had old `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` in Vercel. User updated manually + redeployed.
14. **Custers subcategory bug** -- Lešenie products appearing in other subcategories due to wrong `subcategory_id` in DB after migration. Diagnosed via SQL, user fixed data manually.

## What Was Done (Session 12) -- Partners Page Redesign + WebP Optimization
Date: 2026-04-21

### Partners Page Design
1. **Option 1 minimal grid implementation** -- Clean white logo containers, hover lift effect (scale 1.05 + shadow), responsive 2 cols mobile → 4 cols desktop. Removed reveal animations and lazy loading for immediate visibility. Files: `src/pages/Partneri.jsx`. Committed: `60a9c69`.

### Partner List Update
2. **8 partners with reordered list** -- Added 3 new partners (Terra, Wacker Neuson, Makita) in positions 2-4. Final order: M&M Wood (1), Terra (2), Wacker Neuson (3), Makita (4), Zsolika (5), Mobilbox (6), Eskopa (7), Moba (8). Updated partners array with website URLs for new partners.

### WebP Optimization
3. **PNG to WebP conversion** -- Converted 7 PNG logos to WebP format with quality 85. Total savings: 88.7 KB → 37.2 KB (58.1% reduction). Individual savings: mmwood 41%, terra 42.8%, wacker 56.4%, makita 52.5%, zsolika 62.1%, mobilbox 67.2%, eskopa 59.4%. All code references auto-updated.

### Bug Fix
4. **Logo visibility issue** -- Removed lazy loading and reveal/stagger animations that were blocking logo display. Logos now render immediately in white containers with proper hover effects. Committed: `60a9c69`.

## What Was Done (Session 13) -- Equipment Delete Error Handling
Date: 2026-04-22

### Dashboard Equipment Catalog
1. **Delete button UX improvements** -- Added loading state (`deleting` flag) to prevent multiple clicks while deletion in progress. Delete button now shows spinner and is disabled during deletion. Files: `EquipmentCatalog.jsx`, `EquipmentTable.jsx`. Committed: `489cdf1`.
2. **Better error display** -- Error messages now show at top of table with actual error details instead of generic alert. Console logging for debugging. Files: `EquipmentCatalog.jsx`. Committed: `489cdf1`.
3. **FK constraint error handling** -- Equipment cannot be deleted if used in reservations (foreign key constraint). Added user-friendly Slovak error message: "Toto zariadenie sa používa v obchodoch a nemôže byť odstránené. Aby ste ho mohli odstrániť, musíte najprv odstrániť alebo upraviť obchody, ktoré ho používajú." Applied to both table delete and form delete. Files: `EquipmentCatalog.jsx`, `EquipmentForm.jsx`. Committed: `70a934d`.

## What Was Done (Session 14) -- JCB 19C-I Blog Article + Catalog Bug Fix
Date: 2026-04-22

### Blog Article
1. **New JCB 19C-I article** -- Full review of mini-rýpadlo (1.83t, 2.4m dig depth) in same style as Makita TW001GM201: intro, technical specs grid, compact dimensions section, robust construction, practical applications (4 segments), target audience cards, real-world performance metrics, comparison vs Takeuchi TB216 and Kubota U17-3, rental economics, pros/cons + 9.3/10 rating, CTA. Files: `src/data/articles/jcb-19c-i-mini-rypadlo-kompaktny-vykon.jsx`, `src/data/blogArticles.jsx`, `src/pages/Blog.jsx`. Committed: `f6898e6`.
2. **Product-to-blog link** -- User set `blog_article_slug = 'jcb-19c-i-mini-rypadlo-kompaktny-vykon'` in Supabase via dashboard EquipmentForm. ProductCard auto-renders "Prečítať článok o produkte" link.

### Image Optimization
3. **PNG to WebP conversion** -- Converted 3 PNG files: `blog_jcb.png` (2.97 MB → 377 KB, -87%), `wacker-neuson-803-transparent.png` (555 KB → 87 KB, -84%), `JCB-19C-transparent.png` (553 KB → 82 KB, -85%). Total: 4.0 MB → 547 KB (-86.4%). Updated refs in Blog.jsx + Catalog.jsx. PNG originals kept as fallback. Audit confirmed all other PNGs in `public/pictures/` already had WebP counterparts. Committed: `9e57416`.

### Catalog Bug Fixes
4. **Search link query simplified** -- Changed CTA URL from `?search=JCB+19C-I` to `?search=JCB+19C` to avoid I/l character ambiguity. Files: `src/data/articles/jcb-19c-i-mini-rypadlo-kompaktny-vykon.jsx`. Committed: `dd7d559`.
5. **#katalog hash scroll fix** -- React Router doesn't handle anchor scrolling natively, and `#katalog` element mounts after hydration so native browser scroll-to-anchor missed it. Added useEffect with `useLocation` that scrolls on hash change AND when products array length changes (re-trigger after Supabase load). Files: `src/components/home/Catalog.jsx`. Committed: `37e8bdf`.
6. **Search reveal animation fix** -- URL search like `?search=JCB+19C` showed empty results for Supabase-only products (e.g. JCB 19C-I). Root cause: `useProducts()` initial state is `staticProducts` (157 products from `products.js`, missing JCB 19C-I which is dashboard-only). After Supabase fetch, products mounted into grid but `reveal` className kept them at `opacity: 0` until `useInView` IntersectionObserver triggered — and since `#katalog` wasn't scrolling, grid stayed below fold and observer never fired. Makita TW001GM201 worked because it's in static products and rendered immediately. Fix: force `in-view` className when `searchQuery` is active. Files: `src/components/home/Catalog.jsx`. Committed: `37e8bdf`.

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

## What To Do Next
| Priority | Task | Notes |
|----------|------|-------|
| 1 | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 2 | Backfill OP + birth dates on existing PO contacts | Migration 019 added columns; existing contacts have NULL. Owner needs to fill via ClientDetail Pencil edit before generating new contracts to get OP/nar. line populated |
| 3 | Consider Workspace migration for emails | Active24 hosting paket (~10€/mo) is kept active solely for email. If only 1-2 mailboxes, Google Workspace (~6€/user) or Zoho could be cheaper. Requires MX migration. |
| 4 | GA4 + expand cookie banner to full consent flow | When GA4 added: convert info-only banner into 3-category (Necessary/Analytics/Marketing), wire Consent Mode v2, gate GA4 + chatbot loading on consent, extend `/cookies` table |
| 5 | Re-publish JCB 19C-I article | Update specs in `src/data/articles/jcb-19c-i-mini-rypadlo-kompaktny-vykon.jsx`, remove `19` from filter in `src/pages/Blog.jsx:247`, re-set `blog_article_slug` in Supabase |
| 6 | Verify subcategory data integrity | After Supabase migration some products had wrong subcategory_id (Custers bug). Run audit query across all products. |
| 7 | Product images | Upload product photos via dashboard image upload feature |
| 8 | Email notifications | Send quote/invoice PDFs via email (EmailJS or Supabase Edge Function) |
| 9 | Chatbot CORS fix | mdntech.org `/message` endpoint returns 405 on GET -- needs POST support |
| 10 | WhatsApp Business API | Send quotes directly via WhatsApp (post-MVP) |
| 11 | Online payment | Stripe/GoPay integration (post-MVP) |

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
| `src/pages/Partneri.jsx` | Partners page with minimal grid design (8 partners, WebP logos, hover effects) |
| `src/components/common/Footer.jsx` | Footer (mobile 2-col, MDN Tech credit) |
| `src/components/common/Header.jsx` | Header + promo popup (hidden on mobile) |
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
