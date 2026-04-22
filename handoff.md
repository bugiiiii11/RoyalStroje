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

## What To Do Next
| Priority | Task | Notes |
|----------|------|-------|
| 1 | Add IBAN to company info | Placeholder "DOPLNIT" in `apps/dashboard/src/lib/companyInfo.js` -- shows on all PDFs |
| 2 | Verify subcategory data integrity | After Supabase migration some products had wrong subcategory_id (Custers bug). Run audit query across all products. |
| 3 | Product images | Upload product photos via dashboard image upload feature |
| 4 | Email notifications | Send quote/invoice PDFs via email (EmailJS or Supabase Edge Function) |
| 5 | Chatbot CORS fix | mdntech.org `/message` endpoint returns 405 on GET -- needs POST support |
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
