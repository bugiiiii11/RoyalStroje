-- ============================================================
-- Royal Stroje - Migration 002: DB Functions
-- Auto-numbering for reservations and invoices
-- ============================================================

-- ============================================================
-- Sequence for reservation numbers: RS-YYYY-XXXX
-- ============================================================
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

-- ============================================================
-- Sequences for invoice numbers by type
-- FA-YYYY-XXXX (invoice), PF-YYYY-XXXX (proforma), CN-YYYY-XXXX (credit note)
-- ============================================================
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

-- ============================================================
-- Royal Card invite code generator
-- ============================================================
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

-- ============================================================
-- Helper: Calculate reservation totals
-- Called after reservation_items change
-- ============================================================
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
  -- Sum line items
  SELECT COALESCE(SUM(line_total), 0) INTO v_subtotal
  FROM reservation_items WHERE reservation_id = p_reservation_id;

  -- Get current discount and delivery
  SELECT discount_percent, delivery_fee INTO v_discount_percent, v_delivery_fee
  FROM reservations WHERE id = p_reservation_id;

  v_discount_amount := ROUND(v_subtotal * v_discount_percent / 100, 2);
  v_vat_amount := ROUND((v_subtotal - v_discount_amount + v_delivery_fee) * 0.20, 2);
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

-- ============================================================
-- Activity log helper
-- ============================================================
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
