-- ============================================================
-- Migration 018: Ad-hoc reservation items (not in equipment catalog)
-- ============================================================
-- Allow reservation_items rows that reference no catalog equipment,
-- carrying their own name and rate_unit instead. Used for one-off
-- machines that the operator wants on a contract without registering
-- them in the permanent catalog.
-- ============================================================

ALTER TABLE reservation_items
  ALTER COLUMN equipment_id DROP NOT NULL;

ALTER TABLE reservation_items
  ADD COLUMN custom_name TEXT,
  ADD COLUMN custom_rate_unit TEXT;

-- At least one of equipment_id or custom_name must identify the line item
ALTER TABLE reservation_items
  ADD CONSTRAINT reservation_items_name_required
  CHECK (equipment_id IS NOT NULL OR custom_name IS NOT NULL);
