-- ============================================================
-- Safe re-runnable version: drops existing policies first
-- Run this ONLY if 003_rls_policies.sql had partial failures
-- ============================================================

-- Drop trigger if exists (from 002)
DROP TRIGGER IF EXISTS trg_reservation_items_changed ON reservation_items;
CREATE TRIGGER trg_reservation_items_changed
  AFTER INSERT OR UPDATE OR DELETE ON reservation_items
  FOR EACH ROW
  EXECUTE FUNCTION trg_recalculate_on_item_change();

-- Royal Card Invitations
DROP POLICY IF EXISTS "invitations_staff" ON royal_card_invitations;
DROP POLICY IF EXISTS "invitations_own" ON royal_card_invitations;

ALTER TABLE royal_card_invitations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "invitations_staff" ON royal_card_invitations
  FOR ALL USING (is_staff()) WITH CHECK (is_staff());

CREATE POLICY "invitations_own" ON royal_card_invitations
  FOR SELECT USING (
    email = (auth.jwt() ->> 'email')
  );

-- Activity Log
DROP POLICY IF EXISTS "activity_staff_read" ON activity_log;
DROP POLICY IF EXISTS "activity_insert" ON activity_log;

ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "activity_staff_read" ON activity_log
  FOR SELECT USING (is_staff());

CREATE POLICY "activity_insert" ON activity_log
  FOR INSERT WITH CHECK (true);
