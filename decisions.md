# RoyalStroje -- Decision Log

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
