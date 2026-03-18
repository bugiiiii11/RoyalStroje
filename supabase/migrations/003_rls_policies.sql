-- ============================================================
-- Royal Stroje - Migration 003: Row-Level Security Policies
-- ============================================================
-- Roles:
--   admin/staff  = authenticated users with role in user metadata
--   royal_card   = authenticated portal users
--   anonymous    = public (read equipment only)
-- ============================================================

-- Helper function: check if current user is staff/admin
CREATE OR REPLACE FUNCTION is_staff()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    auth.jwt() ->> 'role' = 'service_role'
    OR (auth.jwt() -> 'user_metadata' ->> 'app_role') IN ('admin', 'staff')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Helper function: get current user's client_id
CREATE OR REPLACE FUNCTION get_my_client_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT id FROM clients WHERE auth_user_id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ============================================================
-- EQUIPMENT CATEGORIES - public read, staff write
-- ============================================================
ALTER TABLE equipment_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categories_read" ON equipment_categories
  FOR SELECT USING (true);

CREATE POLICY "categories_write" ON equipment_categories
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- ============================================================
-- EQUIPMENT SUBCATEGORIES - public read, staff write
-- ============================================================
ALTER TABLE equipment_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subcategories_read" ON equipment_subcategories
  FOR SELECT USING (true);

CREATE POLICY "subcategories_write" ON equipment_subcategories
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- ============================================================
-- EQUIPMENT - public read, staff write
-- ============================================================
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;

CREATE POLICY "equipment_read" ON equipment
  FOR SELECT USING (true);

CREATE POLICY "equipment_write" ON equipment
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- ============================================================
-- CLIENTS - staff full access, portal users own record only
-- ============================================================
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clients_staff" ON clients
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

CREATE POLICY "clients_own" ON clients
  FOR SELECT USING (auth_user_id = auth.uid());

CREATE POLICY "clients_own_update" ON clients
  FOR UPDATE USING (auth_user_id = auth.uid())
  WITH CHECK (auth_user_id = auth.uid());

-- ============================================================
-- RESERVATIONS - staff full access, portal users own only
-- ============================================================
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reservations_staff" ON reservations
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

CREATE POLICY "reservations_own" ON reservations
  FOR SELECT USING (client_id = get_my_client_id());

CREATE POLICY "reservations_own_insert" ON reservations
  FOR INSERT WITH CHECK (client_id = get_my_client_id());

-- ============================================================
-- RESERVATION ITEMS - staff full access, portal users own reservation only
-- ============================================================
ALTER TABLE reservation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "items_staff" ON reservation_items
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

CREATE POLICY "items_own" ON reservation_items
  FOR SELECT USING (
    reservation_id IN (
      SELECT id FROM reservations WHERE client_id = get_my_client_id()
    )
  );

-- ============================================================
-- INVOICES - staff full access, portal users own reservation only
-- ============================================================
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invoices_staff" ON invoices
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

CREATE POLICY "invoices_own" ON invoices
  FOR SELECT USING (
    reservation_id IN (
      SELECT id FROM reservations WHERE client_id = get_my_client_id()
    )
  );

-- ============================================================
-- PARTNERS - staff only
-- ============================================================
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "partners_staff" ON partners
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

-- ============================================================
-- ROYAL CARD INVITATIONS - staff full, invited user can read own
-- ============================================================
ALTER TABLE royal_card_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invitations_staff" ON royal_card_invitations
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

CREATE POLICY "invitations_own" ON royal_card_invitations
  FOR SELECT USING (
    email = (auth.jwt() ->> 'email')
  );

-- ============================================================
-- ACTIVITY LOG - staff read only
-- ============================================================
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "activity_staff_read" ON activity_log
  FOR SELECT USING (is_staff());

CREATE POLICY "activity_insert" ON activity_log
  FOR INSERT WITH CHECK (true);  -- Any authenticated user can log
