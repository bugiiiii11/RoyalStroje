-- ============================================================
-- Migration 022: Contract payment status
-- Adds paid_at to contracts. NULL = nezaplatena, timestamp = zaplatena.
-- A freshly finalized contract inherits the NULL default, so every new
-- finalna zmluva starts as nezaplatena with no extra write in the app.
-- ============================================================

ALTER TABLE contracts ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;

-- Backfill: finalne zmluvy older than 30 days are treated as paid, so the
-- dashboard counter starts from a realistic baseline. The last 30 days stay
-- NULL (nezaplatene) for the owner to confirm one by one.
UPDATE contracts
   SET paid_at = created_at
 WHERE type = 'finalna'
   AND paid_at IS NULL
   AND created_at < NOW() - INTERVAL '30 days';

-- Partial index: the dashboard "nezaplatene" tile queries exactly this slice.
CREATE INDEX IF NOT EXISTS contracts_unpaid_finalna_idx
  ON contracts (created_at DESC)
  WHERE type = 'finalna' AND paid_at IS NULL;

-- No RLS change needed: policy "contracts_all" (migration 011) already grants
-- authenticated users FOR ALL on contracts, which covers the paid_at update.
