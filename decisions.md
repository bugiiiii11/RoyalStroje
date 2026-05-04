# RoyalStroje -- Decision Log

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
