-- ============================================================
-- Royal Stroje — FULL MIGRATION for new Supabase project
-- Consolidates migrations 001–015
-- Run this FIRST, then run seed.sql separately
-- ============================================================

-- ============================================================
-- 001: CORE SCHEMA (10 tables)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. EQUIPMENT CATEGORIES
CREATE TABLE equipment_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  ownership_type TEXT NOT NULL CHECK (ownership_type IN ('owned', 'partner')),
  badge TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. EQUIPMENT SUBCATEGORIES
CREATE TABLE equipment_subcategories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES equipment_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (category_id, slug)
);

-- 3. EQUIPMENT
CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES equipment_categories(id) ON DELETE RESTRICT,
  subcategory_id UUID NOT NULL REFERENCES equipment_subcategories(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_path TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  daily_rate_base NUMERIC(10,2) NOT NULL DEFAULT 0,
  daily_rate_vat NUMERIC(10,2) NOT NULL DEFAULT 0,
  pricing_type TEXT NOT NULL DEFAULT 'fixed' CHECK (pricing_type IN ('fixed', 'negotiable')),
  ownership_type TEXT NOT NULL CHECK (ownership_type IN ('owned', 'partner')),
  total_units INT NOT NULL DEFAULT 1,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  blog_article_slug TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  -- 012: rate_unit
  rate_unit TEXT NOT NULL DEFAULT 'deň',
  -- 014: serial_numbers
  serial_numbers JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_equipment_category ON equipment(category_id);
CREATE INDEX idx_equipment_subcategory ON equipment(subcategory_id);
CREATE INDEX idx_equipment_status ON equipment(status);

-- 4. CLIENTS (with 009 entity_type columns)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  ico TEXT,
  dic TEXT,
  ic_dph TEXT,
  client_type TEXT NOT NULL DEFAULT 'standard' CHECK (client_type IN ('standard', 'royal_card', 'vip')),
  discount_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  notes TEXT,
  -- 009: entity type
  entity_type TEXT NOT NULL DEFAULT 'po',
  birth_date DATE,
  id_card_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_clients_type ON clients(client_type);
CREATE INDEX idx_clients_auth ON clients(auth_user_id);

-- 5. RESERVATIONS (with 013 usage_location, 015 contact_person)
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_number TEXT NOT NULL UNIQUE,
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'inquiry' CHECK (status IN (
    'inquiry', 'quoted', 'confirmed', 'active', 'completed', 'invoiced', 'paid', 'cancelled'
  )),
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,
  delivery_address TEXT,
  delivery_required BOOLEAN NOT NULL DEFAULT false,
  delivery_fee NUMERIC(10,2) NOT NULL DEFAULT 0,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  vat_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  deposit_required BOOLEAN NOT NULL DEFAULT true,
  deposit_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  notes TEXT,
  internal_notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  cancelled_at TIMESTAMPTZ,
  cancelled_reason TEXT,
  -- 013: usage location
  usage_location TEXT,
  -- 015: contact person
  contact_person TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (date_to >= date_from)
);

CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_client ON reservations(client_id);
CREATE INDEX idx_reservations_dates ON reservations(date_from, date_to);

-- 6. RESERVATION ITEMS (with 014 serial_numbers)
CREATE TABLE reservation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE RESTRICT,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  daily_rate NUMERIC(10,2) NOT NULL,
  days INT NOT NULL CHECK (days > 0),
  line_total NUMERIC(10,2) NOT NULL,
  notes TEXT,
  -- 014: serial numbers
  serial_numbers JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reservation_items_reservation ON reservation_items(reservation_id);
CREATE INDEX idx_reservation_items_equipment ON reservation_items(equipment_id);

-- 7. INVOICES (with 004 VAT fix — 23%)
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT NOT NULL UNIQUE,
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE RESTRICT,
  type TEXT NOT NULL CHECK (type IN ('proforma', 'invoice', 'credit_note')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'cancelled')),
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  vat_rate NUMERIC(5,2) NOT NULL DEFAULT 23.00,
  vat_amount NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  pdf_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invoices_reservation ON invoices(reservation_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_type ON invoices(type);

-- 8. PARTNERS
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  ico TEXT,
  notes TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. ROYAL CARD INVITATIONS
CREATE TABLE royal_card_invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  company_name TEXT,
  invite_code TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'accepted', 'expired')),
  invited_by UUID REFERENCES auth.users(id),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  accepted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invitations_status ON royal_card_invitations(status);
CREATE INDEX idx_invitations_code ON royal_card_invitations(invite_code);

-- 10. ACTIVITY LOG
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_created ON activity_log(created_at DESC);

-- 11. CONTRACTS (from 011)
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  contract_number TEXT NOT NULL UNIQUE,
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('navrh', 'finalna')),
  time_from TIME,
  return_date DATE,
  time_to TIME,
  calculated_days NUMERIC(10,2),
  final_total NUMERIC(10,2),
  notes TEXT,
  pdf_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. CLIENT CONTACTS (from 011)
CREATE TABLE client_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  position TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================

-- updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_equipment_categories_updated BEFORE UPDATE ON equipment_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_equipment_subcategories_updated BEFORE UPDATE ON equipment_subcategories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_equipment_updated BEFORE UPDATE ON equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_clients_updated BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_reservations_updated BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_invoices_updated BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_partners_updated BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- contracts updated_at
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
-- 002: SEQUENCES & AUTO-NUMBERING
-- ============================================================

-- Reservation number: RS-YYYY-XXXX
CREATE SEQUENCE IF NOT EXISTS reservation_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_reservation_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  seq_part TEXT;
BEGIN
  year_part := to_char(now(), 'YYYY');
  seq_part := lpad(nextval('reservation_number_seq')::text, 4, '0');
  NEW.reservation_number := 'RS-' || year_part || '-' || seq_part;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reservation_number
  BEFORE INSERT ON reservations
  FOR EACH ROW
  WHEN (NEW.reservation_number IS NULL OR NEW.reservation_number = '')
  EXECUTE FUNCTION generate_reservation_number();

-- Invoice numbers by type
CREATE SEQUENCE IF NOT EXISTS invoice_fa_number_seq START 1;
CREATE SEQUENCE IF NOT EXISTS invoice_pf_number_seq START 1;
CREATE SEQUENCE IF NOT EXISTS invoice_cn_number_seq START 1;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  seq_part TEXT;
  prefix TEXT;
BEGIN
  year_part := to_char(now(), 'YYYY');
  CASE NEW.type
    WHEN 'invoice' THEN
      prefix := 'FA';
      seq_part := lpad(nextval('invoice_fa_number_seq')::text, 4, '0');
    WHEN 'proforma' THEN
      prefix := 'PF';
      seq_part := lpad(nextval('invoice_pf_number_seq')::text, 4, '0');
    WHEN 'credit_note' THEN
      prefix := 'CN';
      seq_part := lpad(nextval('invoice_cn_number_seq')::text, 4, '0');
  END CASE;
  NEW.invoice_number := prefix || '-' || year_part || '-' || seq_part;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_invoice_number
  BEFORE INSERT ON invoices
  FOR EACH ROW
  WHEN (NEW.invoice_number IS NULL OR NEW.invoice_number = '')
  EXECUTE FUNCTION generate_invoice_number();

-- Royal Card invite code generator
CREATE OR REPLACE FUNCTION generate_invite_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invite_code IS NULL OR NEW.invite_code = '' THEN
    NEW.invite_code := 'RC-' || upper(substr(md5(random()::text), 1, 8));
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_invite_code
  BEFORE INSERT ON royal_card_invitations
  FOR EACH ROW
  EXECUTE FUNCTION generate_invite_code();

-- Recalculate reservation totals (with 23% VAT from 004)
CREATE OR REPLACE FUNCTION recalculate_reservation_totals(p_reservation_id UUID)
RETURNS VOID AS $$
DECLARE
  v_subtotal NUMERIC(10,2);
  v_discount_percent NUMERIC(5,2);
  v_discount_amount NUMERIC(10,2);
  v_delivery_fee NUMERIC(10,2);
  v_vat_amount NUMERIC(10,2);
  v_total NUMERIC(10,2);
BEGIN
  SELECT COALESCE(SUM(line_total), 0) INTO v_subtotal
  FROM reservation_items WHERE reservation_id = p_reservation_id;

  SELECT discount_percent, delivery_fee INTO v_discount_percent, v_delivery_fee
  FROM reservations WHERE id = p_reservation_id;

  v_discount_amount := ROUND(v_subtotal * v_discount_percent / 100, 2);
  v_vat_amount := ROUND((v_subtotal - v_discount_amount + v_delivery_fee) * 0.23, 2);
  v_total := v_subtotal - v_discount_amount + v_delivery_fee + v_vat_amount;

  UPDATE reservations SET
    subtotal = v_subtotal,
    discount_amount = v_discount_amount,
    vat_amount = v_vat_amount,
    total = v_total,
    updated_at = now()
  WHERE id = p_reservation_id;
END;
$$ LANGUAGE plpgsql;

-- Auto-recalculate when items change
CREATE OR REPLACE FUNCTION trg_recalculate_on_item_change()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    PERFORM recalculate_reservation_totals(OLD.reservation_id);
    RETURN OLD;
  ELSE
    PERFORM recalculate_reservation_totals(NEW.reservation_id);
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_reservation_items_changed
  AFTER INSERT OR UPDATE OR DELETE ON reservation_items
  FOR EACH ROW
  EXECUTE FUNCTION trg_recalculate_on_item_change();

-- Activity log helper
CREATE OR REPLACE FUNCTION log_activity(
  p_user_id UUID,
  p_action TEXT,
  p_entity_type TEXT,
  p_entity_id UUID,
  p_details JSONB DEFAULT '{}'::jsonb
)
RETURNS UUID AS $$
DECLARE
  v_id UUID;
BEGIN
  INSERT INTO activity_log (user_id, action, entity_type, entity_id, details)
  VALUES (p_user_id, p_action, p_entity_type, p_entity_id, p_details)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$ LANGUAGE plpgsql;

-- Contract number generator (from 011)
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
-- 003: ROW-LEVEL SECURITY POLICIES
-- ============================================================

-- Helper: check if current user is staff/admin
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'role' = 'service_role'
    OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Helper: get current user's client_id
CREATE OR REPLACE FUNCTION get_my_client_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- EQUIPMENT CATEGORIES
ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "categories_read" ON equipment_categories FOR SELECT USING (true);
CREATE POLICY "categories_write" ON equipment_categories FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- EQUIPMENT SUBCATEGORIES
ALTER TABLE equipment_subcategories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "subcategories_read" ON equipment_subcategories FOR SELECT USING (true);
CREATE POLICY "subcategories_write" ON equipment_subcategories FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- EQUIPMENT
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
CREATE POLICY "equipment_read" ON equipment FOR SELECT USING (true);
CREATE POLICY "equipment_write" ON equipment FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- CLIENTS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "clients_staff" ON clients FOR ALL USING (is_staff()) WITH CHECK (is_staff());
CREATE POLICY "clients_own" ON clients FOR SELECT USING (auth_user_id = auth.uid());
CREATE POLICY "clients_own_update" ON clients FOR UPDATE USING (auth_user_id = auth.uid()) WITH CHECK (auth_user_id = auth.uid());

-- RESERVATIONS
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reservations_staff" ON reservations FOR ALL USING (is_staff()) WITH CHECK (is_staff());
CREATE POLICY "reservations_own" ON reservations FOR SELECT USING (client_id = get_my_client_id());
CREATE POLICY "reservations_own_insert" ON reservations FOR INSERT WITH CHECK (client_id = get_my_client_id());

-- RESERVATION ITEMS
ALTER TABLE reservation_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "items_staff" ON reservation_items FOR ALL USING (is_staff()) WITH CHECK (is_staff());
CREATE POLICY "items_own" ON reservation_items FOR SELECT USING (
  reservation_id IN (SELECT id FROM reservations WHERE client_id = get_my_client_id())
);
CREATE POLICY "items_own_insert" ON reservation_items FOR INSERT WITH CHECK (
  reservation_id IN (SELECT id FROM reservations WHERE client_id = get_my_client_id())
);

-- INVOICES
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "invoices_staff" ON invoices FOR ALL USING (is_staff()) WITH CHECK (is_staff());
CREATE POLICY "invoices_own" ON invoices FOR SELECT USING (
  reservation_id IN (SELECT id FROM reservations WHERE client_id = get_my_client_id())
);

-- PARTNERS
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "partners_staff" ON partners FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- ROYAL CARD INVITATIONS
ALTER TABLE royal_card_invitations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "invitations_staff" ON royal_card_invitations FOR ALL USING (is_staff()) WITH CHECK (is_staff());
CREATE POLICY "invitations_own" ON royal_card_invitations FOR SELECT USING (email = (auth.jwt() ->> 'email'));
CREATE POLICY "invitations_anon_by_code" ON royal_card_invitations FOR SELECT USING (true);

-- ACTIVITY LOG
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "activity_staff_read" ON activity_log FOR SELECT USING (is_staff());
CREATE POLICY "activity_insert" ON activity_log FOR INSERT WITH CHECK (true);

-- CONTRACTS (from 011)
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "contracts_all" ON contracts FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- CLIENT CONTACTS (from 011)
ALTER TABLE client_contacts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "client_contacts_all" ON client_contacts FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- ============================================================
-- 006: Registration helper function
-- ============================================================
CREATE OR REPLACE FUNCTION register_royal_card(
  p_auth_user_id UUID,
  p_invitation_id UUID,
  p_client_id UUID DEFAULT NULL,
  p_company_name TEXT DEFAULT NULL,
  p_contact_person TEXT DEFAULT NULL,
  p_email TEXT DEFAULT NULL,
  p_phone TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_client_id UUID;
BEGIN
  IF p_client_id IS NOT NULL THEN
    UPDATE clients SET
      auth_user_id = p_auth_user_id,
      client_type = 'royal_card',
      discount_percent = 5,
      contact_person = COALESCE(NULLIF(p_contact_person, ''), contact_person),
      phone = COALESCE(NULLIF(p_phone, ''), phone)
    WHERE id = p_client_id;
    v_client_id := p_client_id;
  ELSE
    INSERT INTO clients (auth_user_id, company_name, contact_person, email, phone, client_type, discount_percent)
    VALUES (p_auth_user_id, p_company_name, p_contact_person, p_email, p_phone, 'royal_card', 5)
    RETURNING id INTO v_client_id;
  END IF;

  UPDATE royal_card_invitations SET
    status = 'accepted',
    accepted_at = now(),
    client_id = v_client_id
  WHERE id = p_invitation_id;

  RETURN v_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================
-- 008: Equipment Images Storage Bucket
-- ============================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'equipment-images',
  'equipment-images',
  true,
  5242880,
  ARRAY['image/webp', 'image/png', 'image/jpeg']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "equipment_images_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'equipment-images');

CREATE POLICY "equipment_images_staff_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'equipment-images'
    AND (auth.jwt() ->> 'app_role' IN ('admin', 'staff')
         OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff'))
  );

CREATE POLICY "equipment_images_staff_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'equipment-images'
    AND (auth.jwt() ->> 'app_role' IN ('admin', 'staff')
         OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff'))
  );

CREATE POLICY "equipment_images_staff_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'equipment-images'
    AND (auth.jwt() ->> 'app_role' IN ('admin', 'staff')
         OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff'))
  );


-- ============================================================
-- DONE — Now run seed.sql separately to populate catalog data
-- Then run 010_new_products_2026_03_29.sql for 4 additional products
-- Then run 012 rate_unit update for diamond disc items
-- ============================================================
