# RoyalStroje -- Decision Log

### 2026-06-03 -- Session 21
**Decision:** Fixed the mobile GPU garbage bands by removing `backdrop-filter` from fixed/sticky on-screen elements (hamburger button + its overlay, CookieBanner gated to desktop), disabling `AnimatedBackground` on mobile, and de-promoting `reveal` animations (`transform: none`) -- rather than refactoring the FAQ into a separate simplified mobile-only section.
**Why:** The scrambled GPU garbage / scroll checkerboarding only reproduced on real budget Android (Xiaomi/Mali), never in Chrome DevTools mobile-view. Root cause was `backdrop-filter` on the `fixed` hamburger button, which forces Chromium to keep the page-tall content behind it composited as a read-back backdrop layer the GPU can't sustain during scroll. Removing the trigger fixes the actual cause at the source, keeps a single shared codebase for desktop/mobile, and is visually invisible (the affected backgrounds were already 90-95% opaque). General rule adopted: never put `backdrop-filter` on a `fixed`/`sticky` element that stays on screen during scroll on budget Android.
**Alternatives:** (B) Separate simplified mobile-only FAQ section (owner's suggestion) -- rejected because it only treats the symptom; the FAQ was just where the corruption surfaced, the trigger lived elsewhere (the global fixed hamburger), so the garbage would likely have reappeared. (C) The compositing-layer-size theories tried first -- `overflow-x-clip` / `overflow: visible` on root div / ContentSection / FAQ, and `translateZ` GPU promotion -- all failed (and `overflow: visible` broke the sticky sidebar layout); reverted. They missed the real trigger because the fixed-element backdrop-filter was forcing whole-page compositing regardless of container overflow.

### 2026-05-22 -- Session 18
**Decision:** Replaced native `<input type="date">` with `<input type="text" placeholder="DD.MM.YYYY">` for the new contact `birth_date` field, parsed via `isoToDmy` / `dmyToISO` helpers in `constants.js`.
**Why:** Native date inputs render with browser-locale-dependent placeholder formats ("11-Oct-yyyy" on English-locale browsers, "dd.mm.rrrr" on Slovak ones). Operator was confused by the inconsistent month-name display and wanted a numeric `DD.MM.YYYY` everywhere regardless of OS/browser. A controlled text input gives full format control and accepts `.`, `/`, `-`, space separators. Trade-off: lose the native date picker UI -- acceptable since the field is occasional and the format is short.
**Alternatives:** (B) Force browser locale via `lang="sk-SK"` attribute -- inconsistently respected across browsers and doesn't solve the placeholder issue. (C) Build a custom date picker component -- overkill for a few sporadic inputs; can revisit if there's broader date-entry UX work later.

### 2026-05-22 -- Session 18
**Decision:** Reports page monthly/yearly revenue cards switched from `invoices` table (filtered by `status='paid'` + `paid_at`) to `reservations` table (filtered by `status IN ('completed','invoiced','paid')` + `created_at`), with VAT subtracted (`Σ(total - vat_amount)`).
**Why:** The invoices-based query was returning 0 because the current workflow never marks invoices as `paid` -- deals go `inquiry → completed` and that's where the revenue lives. The Dashboard StatCard + Sidebar MiniStat were already using reservations and showing correct numbers; Reports was the outlier. Aligning all three eliminates the contradiction where the sidebar said 3 301 € and the Reports card said 0 €.
**Alternatives:** (B) Fix the workflow to actually mark invoices as paid before they show up in Reports -- requires user behaviour change and doesn't help retrospectively. (C) Show both "invoiced revenue" and "completed revenue" as separate cards -- more UI complexity for a metric the operator currently treats as one number.

### 2026-05-22 -- Session 18
**Decision:** Active24 hosting paket `fabacv0r_1` kept active after deleting WordPress (files + DB), solely to retain the email service for `info@royalstroje.sk`.
**Why:** Live website runs on Vercel (`royalstroje.sk` A record → 216.198.79.1), so the Active24 web stack was dead weight (378 MB old WordPress files + 23 MB DB filling the 1 GB quota). But MX records still route mail to `mx10/mx20.active24.cz`, which depends on the hosting paket being active. Deleting WordPress freed ~400 MB without breaking email continuity. Confirmed approach: delete via `webftp.royalstroje.sk` (Monsta file manager) + `dbadmin.royalstroje.sk` (PhpMyAdmin DROP database `QVceRP65aOtvb3zi`); never click "Odstrániť službu / Navždy smazat" on the domain attachment (would destroy mailboxes).
**Alternatives:** (B) Migrate emails to Google Workspace (~6€/user) or Zoho and cancel Active24 -- cheaper long-term if only 1-2 mailboxes, but requires MX migration + mail import + onboarding. Logged as priority 3 in handoff for future evaluation. (C) Keep WordPress in place -- no benefit, just risk of stale plugins becoming a security liability.

### 2026-05-04 -- Session 17
**Decision:** Cookie banner is info-only (single "Rozumiem" + close, no consent categories) for now -- to be expanded into a full Accept/Reject/Customize flow with Google Consent Mode v2 once GA4 is added.
**Why:** Site currently sets only strictly-necessary cookies (`_GRECAPTCHA` for bot protection + MDN chatbot which doesn't store user identifiers) and a few `localStorage` keys for cart/rate-limit/consent. Under SK ÚOOÚ guidance, strictly-necessary cookies don't require granular consent -- only transparent disclosure. Building a full consent UI and 12-month re-prompt logic before any analytics/marketing tooling exists would be over-engineering and would also lose ~30-50 % of analytics data prematurely.
**Alternatives:** (B) Build the full 3-category banner + Consent Mode v2 now and wire GA4 later -- more work upfront, harder to test correctly with no real analytics tag to gate. (C) Skip the banner entirely (legally defensible since only strictly-necessary cookies are set) -- but visible disclosure is the SK norm and the GDPR page already promises one. Option A is the smallest correct step that covers compliance now and leaves a clean upgrade path.

### 2026-05-04 -- Session 16
**Decision:** Dashboard moved to dedicated `app.royalstroje.sk` subdomain (kept `royal-stroje-dashboard.vercel.app` working in parallel, no redirect).
**Why:** Branded URL is what staff will share verbally and is easier to remember; matches the convention `web → royalstroje.sk`, `dashboard → app.royalstroje.sk`. Keeping the vercel.app URL alive avoids breaking any existing bookmarks or email links during transition.
**Alternatives:** (B) Set 308 permanent redirect from `*.vercel.app` to `app.royalstroje.sk` -- could break third-party integrations or bookmarks we haven't audited yet. (C) Use `dashboard.royalstroje.sk` -- longer to type and less consistent with the planned `portal.royalstroje.sk` for the Royal Card portal.

### 2026-04-30 -- Session 15
**Decision:** Ad-hoc reservation items implemented via nullable `equipment_id` + `custom_name` + `custom_rate_unit` columns on `reservation_items`, gated by a CHECK constraint requiring one or the other.
**Why:** Operator needs to put one-off machines on a contract without registering them in the permanent catalog. The line item itself carries the necessary identity, keeping the equipment table clean. PDF/UI fallback to `custom_name` is a one-line change in each consumer.
**Alternatives:** (B) Auto-create temporary `equipment` rows tagged `is_adhoc=true` -- pollutes the catalog with one-offs and complicates search/filter logic everywhere. (C) Single sentinel "Ad-hoc" equipment row with name override on the line item -- still needs the same custom_name column, plus a sentinel row feels hacky. Option A wins on long-term cleanliness despite touching 7 files.

### 2026-04-30 -- Session 15
**Decision:** Dashboard catalog search runs client-side on a fetched-up-to-500 result set, mirroring the website's `Catalog.jsx` approach.
**Why:** User wants name+description match AND diacritic insensitivity ("kalove" -> "Kalove"). The catalog is ~150 items so fetching all when a search term is entered is cheap. Server-side filters (category, subcategory, status, in_stock) still run on Postgres for non-search browsing.
**Alternatives:** (B) Enable Postgres `unaccent` extension + a generated `search_text` column with a trigram GIN index -- correct long-term but requires a migration and the generated-column dance for PostgREST to filter on it. (C) Server-side `or(name.ilike.%q%, description.ilike.%q%)` -- gives name+description but doesn't solve diacritics. Option A keeps behaviour consistent across website and dashboard with no DB changes.

### 2026-04-17 -- Session 11
**Decision:** Unified all PDF documents (navrh, finalna zmluva, faktura) to use the same "ZMLUVA O PRENAJME HNUTELNYCH VECI" structure
**Why:** These are all the same rental contract -- just at different lifecycle stages. Having different layouts confused users and made maintenance harder. Invoice number is shown in metadata subtitle, not as a separate document title.
**Alternatives:** Separate PDF generators per document type (original approach); shared template with different titles (rejected by user -- "it's the same contract")

### 2026-04-17 -- Session 11
**Decision:** Multiple final contracts per reservation (partial returns) instead of single finalization
**Why:** Clients sometimes return only some rented items and keep others. A single finalization forced all items to be returned at once. Now each return creates its own final contract with only the returned items, and the reservation auto-completes when all items are returned.
**Alternatives:** Single finalization with "exclude items" option; separate reservations per item group (too complex for user workflow)

### 2026-04-17 -- Session 11
**Decision:** Equipment "Nedostupne" uses existing `status` field (active/inactive) rather than a new boolean
**Why:** The public catalog already filters `.eq('status', 'active')`, so setting status to 'inactive' automatically hides from royalstroje.sk without any portal code changes. No migration needed.
**Alternatives:** New `is_visible` boolean column (would require migration + portal filter update)
