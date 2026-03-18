-- Fix VAT rate from 20% to 23%

-- Update default VAT rate on invoices table
ALTER TABLE invoices ALTER COLUMN vat_rate SET DEFAULT 23.00;

-- Update recalculation function to use 23%
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
