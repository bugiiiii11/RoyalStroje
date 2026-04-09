-- ============================================================
-- Migration 011: Contracts + Client Contacts
-- ============================================================

-- ============================================================
-- 1. CONTRACTS TABLE
-- Tracks rental contracts (návrh → finálna) linked to reservations
-- ============================================================
CREATE TABLE contracts (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number TEXT NOT NULL UNIQUE,
  reservation_id  UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  type            TEXT NOT NULL CHECK (type IN ('navrh', 'finalna')),
  time_from       TIME,            -- pickup time (set at creation)
  return_date     DATE,            -- actual return date (set at finalization)
  time_to         TIME,            -- return time (set at finalization)
  calculated_days NUMERIC(10,2),   -- computed by rental day algorithm
  final_total     NUMERIC(10,2),   -- editable final price (incl. VAT)
  notes           TEXT,
  pdf_path        TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- updated_at trigger
CREATE OR REPLACE FUNCTION update_contracts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER contracts_updated_at
  BEFORE UPDATE ON contracts
  FOR EACH ROW EXECUTE FUNCTION update_contracts_updated_at();

-- ============================================================
-- 2. CLIENT CONTACTS TABLE
-- Multiple contact persons per client (min 1, max 5)
-- ============================================================
CREATE TABLE client_contacts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id  UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  phone      TEXT,
  email      TEXT,
  position   TEXT,            -- e.g. "konateľ", "riaditeľ"
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 3. CONTRACT NUMBER SEQUENCE FUNCTION
-- Generates next contract number: ZN-YYYY-XXXX (návrh)
-- ============================================================
CREATE OR REPLACE FUNCTION generate_contract_number()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE
  current_year TEXT := TO_CHAR(NOW(), 'YYYY');
  next_seq     INT;
  result       TEXT;
BEGIN
  SELECT COUNT(*) + 1
    INTO next_seq
    FROM contracts
   WHERE contract_number LIKE 'ZN-' || current_year || '-%'
      OR contract_number LIKE 'ZF-' || current_year || '-%';

  result := 'ZN-' || current_year || '-' || LPAD(next_seq::TEXT, 4, '0');
  RETURN result;
END;
$$;

-- ============================================================
-- 4. RLS POLICIES
-- ============================================================
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_contacts ENABLE ROW LEVEL SECURITY;

-- Contracts: authenticated users can do everything
CREATE POLICY "contracts_all" ON contracts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Client contacts: authenticated users can do everything
CREATE POLICY "client_contacts_all" ON client_contacts
  FOR ALL TO authenticated USING (true) WITH CHECK (true);
