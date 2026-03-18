-- ============================================================
-- Royal Stroje - Equipment Rental Management System
-- Migration 001: Core Schema (10 tables)
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. EQUIPMENT CATEGORIES
-- ============================================================
CREATE TABLE equipment_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  ownership_type TEXT NOT NULL CHECK (ownership_type IN ('owned', 'partner')),
  badge TEXT,               -- e.g. 'S OBSLUHOU' for heavy tech
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. EQUIPMENT SUBCATEGORIES
-- ============================================================
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

-- ============================================================
-- 3. EQUIPMENT (Full catalog 142+ items)
-- ============================================================
CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES equipment_categories(id) ON DELETE RESTRICT,
  subcategory_id UUID NOT NULL REFERENCES equipment_subcategories(id) ON DELETE RESTRICT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_path TEXT,
  features JSONB DEFAULT '[]'::jsonb,       -- array of feature strings
  daily_rate_base NUMERIC(10,2) NOT NULL DEFAULT 0,  -- price without VAT
  daily_rate_vat NUMERIC(10,2) NOT NULL DEFAULT 0,   -- price with VAT (20%)
  pricing_type TEXT NOT NULL DEFAULT 'fixed' CHECK (pricing_type IN ('fixed', 'negotiable')),
  ownership_type TEXT NOT NULL CHECK (ownership_type IN ('owned', 'partner')),
  total_units INT NOT NULL DEFAULT 1,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  is_new BOOLEAN NOT NULL DEFAULT false,
  is_popular BOOLEAN NOT NULL DEFAULT false,
  blog_article_slug TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_equipment_category ON equipment(category_id);
CREATE INDEX idx_equipment_subcategory ON equipment(subcategory_id);
CREATE INDEX idx_equipment_status ON equipment(status);

-- ============================================================
-- 4. CLIENTS
-- ============================================================
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
  ico TEXT,               -- Company ID (Slovak)
  dic TEXT,               -- Tax ID
  ic_dph TEXT,            -- VAT ID
  client_type TEXT NOT NULL DEFAULT 'standard' CHECK (client_type IN ('standard', 'royal_card', 'vip')),
  discount_percent NUMERIC(5,2) NOT NULL DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_clients_type ON clients(client_type);
CREATE INDEX idx_clients_auth ON clients(auth_user_id);

-- ============================================================
-- 5. RESERVATIONS (Deal Pipeline)
-- ============================================================
CREATE TABLE reservations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_number TEXT NOT NULL UNIQUE,  -- RS-2026-0001
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (date_to >= date_from)
);

CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_reservations_client ON reservations(client_id);
CREATE INDEX idx_reservations_dates ON reservations(date_from, date_to);

-- ============================================================
-- 6. RESERVATION ITEMS
-- ============================================================
CREATE TABLE reservation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE CASCADE,
  equipment_id UUID NOT NULL REFERENCES equipment(id) ON DELETE RESTRICT,
  quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  daily_rate NUMERIC(10,2) NOT NULL,
  days INT NOT NULL CHECK (days > 0),
  line_total NUMERIC(10,2) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_reservation_items_reservation ON reservation_items(reservation_id);
CREATE INDEX idx_reservation_items_equipment ON reservation_items(equipment_id);

-- ============================================================
-- 7. INVOICES
-- ============================================================
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_number TEXT NOT NULL UNIQUE,  -- FA-2026-0001, PF-2026-0001, CN-2026-0001
  reservation_id UUID NOT NULL REFERENCES reservations(id) ON DELETE RESTRICT,
  type TEXT NOT NULL CHECK (type IN ('proforma', 'invoice', 'credit_note')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'cancelled')),
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL,
  vat_rate NUMERIC(5,2) NOT NULL DEFAULT 20.00,  -- Slovak standard VAT
  vat_amount NUMERIC(10,2) NOT NULL,
  total NUMERIC(10,2) NOT NULL,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  pdf_path TEXT,          -- Supabase Storage path
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_invoices_reservation ON invoices(reservation_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_type ON invoices(type);

-- ============================================================
-- 8. PARTNERS
-- ============================================================
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

-- ============================================================
-- 9. ROYAL CARD INVITATIONS
-- ============================================================
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

-- ============================================================
-- 10. ACTIVITY LOG (Audit Trail)
-- ============================================================
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,           -- e.g. 'reservation.created', 'status.changed'
  entity_type TEXT NOT NULL,      -- e.g. 'reservation', 'client', 'invoice'
  entity_id UUID NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,  -- flexible payload
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_activity_entity ON activity_log(entity_type, entity_id);
CREATE INDEX idx_activity_user ON activity_log(user_id);
CREATE INDEX idx_activity_created ON activity_log(created_at DESC);

-- ============================================================
-- Updated_at trigger function
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER trg_equipment_categories_updated BEFORE UPDATE ON equipment_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_equipment_subcategories_updated BEFORE UPDATE ON equipment_subcategories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_equipment_updated BEFORE UPDATE ON equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_clients_updated BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_reservations_updated BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_invoices_updated BEFORE UPDATE ON invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_partners_updated BEFORE UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at();
