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

## What To Do Next
| Priority | Task | Notes |
|----------|------|-------|
| 0 | **Ship or revert the uncommitted redesign (split hero + WHOLE-SITE light theme + session-27/28 work)** | All build/lint clean, all owner-approved: (a) session-24 split hero, (b) session-25 Home light theme, (c) session-26 light theme across all pages + shared `ContactForm`, (d) **session-27** hero asset polish + USP band + `BusinessPillars` + `PromoCarousel` + light header (dark logo, Blog nav, phone+CTA) + catalog excavator removal + light `PageHero` + Služby card swap + `DovozTechniky` subpage, (e) **session-28** light `PageHero` rolled out to all 11 remaining subpage heroes. Decide: commit+push to deploy live OR revert (large surface). Dev preview: `npm run dev`. |
| 0b | **Decide on orphan service pages** | `ServisNaradia.jsx` / `ZemnePrace.jsx` are still not routed in `App.jsx` and not linked — unreachable. Either **delete** them or **add routes** (+ links from `Sluzby.jsx`). (`DovozTechniky.jsx` was wired up in session 27 — now routed at `/sluzby/dovoz-techniky` and linked from the Sluzby grid.) |
| 1 | **Verify redesign on a real budget Android** | Covers sessions 22+23 (live) AND the uncommitted session-24/25/26 work (now the WHOLE site is light). GPU guard kept intact but the session-21 bug only repros on real Xiaomi/Mali hardware, not DevTools — scroll-check FAQ + product grid + several light subpages on a real device before/after shipping. |
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
| `src/pages/Home.jsx` | Home page -- renders `HeroSplit` + Catalog (old `Hero`/`MobileHero` block + 2 imports commented out for revert) |
| `src/components/home/HeroSplit.jsx` | **NEW (session 24, UNCOMMITTED)** split hero: desktop diagonal split (Prenájom \| Predaj) full-screen via `md:h-screen md:flex` (split = `flex-1`), mobile stacked; thin orange diagonal divider; 16:9 image strip framed by orange hairlines; white USP band (dark text + orange icons). GPU-safe (no fixed `backdrop-filter`, keyframes end at `transform: none`). Entrance animations live on wrappers so `.btn-primary` hover-lift survives |
| `src/components/home/BusinessPillars.jsx` | **NEW (session 27)** 4 image-led pillar cards (Dovoz techniky / Prenájom a predaj náradia / Ťažká technika / Sprostredkovanie prenájmu); dark gradient overlay + orange accent + hover zoom |
| `src/components/home/PromoCarousel.jsx` | **NEW (session 27)** "Akcie" carousel, 3:1 dark+orange banners, vanilla React (autoplay/arrows/dots/swipe/reduced-motion); **3 placeholder offer slides** to replace with real promos |
| `src/components/common/Header.jsx` | **REWRITTEN (session 27)** desktop solid white header (`hidden md:block`); dark logo `logoroyal-dark.webp`; nav `Požičovňa·Služby·Blog·Kontakt`; phone number + `.btn-primary` "Zavolať teraz" (social/phone icons removed) |
| `public/logoroyal-dark.webp` | **NEW (session 27)** dark-text logo (white "ROYAL" recolored to zinc-900; crown+STROJE stay orange) for the light header |
| `public/hero-auto.webp` / `.png` | Trimmed transparent hero truck (1004×578). Source: `hero-auto1.png` (owner-supplied, untrimmed) |
| `src/components/common/PageHero.jsx` | **NEW (session 27)** reusable LIGHT subpage hero (`hidden md:block`): white bg + orange glow, eyebrow, dark headline w/ orange highlight, subtitle, optional `chips`/`actions`, framed photo w/ orange top-accent (lg+), bottom orange seam. **Used by ALL subpages (session 28)**: Sluzby, DovozTechniky, Blog, BlogDetail, Kontakt, CenovaPonuka, NahradneDiely, RoyalFleet, SkoLenieObsluhy, Partneri, PredajTechniky, ServisNaradia, ZemnePrace (ProductDetail keeps its photo-banner hero) |
| `src/pages/DovozTechniky.jsx` | **REBUILT (session 27)** marketing subpage at `/sluzby/dovoz-techniky`: PageHero + benefits + 3-step process + **Cenník dopravy (real FAQ pricing)** + CTA. Replaced old contradictory pricing; truthful (no invented services) |
| `src/pages/Sluzby.jsx` | Services page — light `PageHero`; grid card "Cenová ponuka" replaced by "Dovoz techniky na stavbu" (→`/sluzby/dovoz-techniky`); Royal Fleet icon → `CalendarClock` |
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
| `src/index.css` | Global styles: base type (body=Manrope, h1–h6=Archivo), industrial-premium primitives (`.eyebrow`, `.hairline`, `.btn-primary`, `.btn-secondary`), **light-theme primitives `.card-light`/`.input-light`/`.btn-outline-light` (session 25)**, `.subcategory-btn` hover (now light-orange), `.reveal*` scroll animations -- in-view end state is `transform: none` so cards de-promote off the GPU after animating |
| `src/components/common/ContentSection.jsx` | Shared content-section wrapper used by 13 pages; `background: #181818` by default, **`light` prop → `#FAFAFA` (session 25, only `Catalog`/Home passes it; other pages stay dark)** |
| `src/components/ui/CustomSelect.jsx` | Custom dropdown (shared by `QuoteForm` + Kontakt `ContactForm`); dark by default, **opt-in `light` prop (session 25)** for the light homepage — Kontakt stays dark by not passing it |
| `index.html` | Loads Archivo (display) + Manrope (body) from Google Fonts (preconnect + `display=swap`, latin-ext for Slovak); preloads hero image |
| `tailwind.config.js` | Orange tokens + `fontFamily.sans` (Manrope) / `fontFamily.display` (Archivo) |
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
