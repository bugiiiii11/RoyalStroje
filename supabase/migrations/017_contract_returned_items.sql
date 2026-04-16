-- Migration 017: Partial returns — multiple final contracts per reservation
-- Each row = one returned unit. For items with serial numbers, one row per serial.
-- For items without serials, quantity tracks how many of that line were returned.

CREATE TABLE IF NOT EXISTS contract_returned_items (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_id           UUID NOT NULL REFERENCES contracts(id) ON DELETE CASCADE,
  reservation_item_id   UUID NOT NULL REFERENCES reservation_items(id) ON DELETE CASCADE,
  serial_number         TEXT,
  quantity              INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_returned_items_contract ON contract_returned_items(contract_id);
CREATE INDEX IF NOT EXISTS idx_returned_items_resitem ON contract_returned_items(reservation_item_id);

ALTER TABLE contract_returned_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "contract_returned_items_all" ON contract_returned_items
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
