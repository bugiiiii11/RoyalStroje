-- 023: Sync reservation financials to finalized contract prices (s57)
--
-- The return flow historically wrote a custom final price only to
-- contracts.final_total; reservations kept the original estimate, and the
-- dashboard/reports revenue reads reservations.total/vat_amount. The app now
-- syncs on every finalization and price edit (buildFinancialSync); this
-- backfills reservations finalized BEFORE the fix.
--
-- Effect: history-wide -- report numbers change retroactively to match the
-- contracts (that is the desired state). HAVING > 0 guards against a legacy
-- zero-priced finalna wiping a good total.

UPDATE reservations r
SET total           = f.gross,
    subtotal        = ROUND(f.gross / 1.23, 2),
    vat_amount      = f.gross - ROUND(f.gross / 1.23, 2),
    discount_amount = 0,
    discount_percent = 0,
    delivery_fee    = 0
FROM (
  SELECT reservation_id, ROUND(SUM(final_total)::numeric, 2) AS gross
  FROM contracts
  WHERE type = 'finalna' AND final_total IS NOT NULL
  GROUP BY reservation_id
  HAVING SUM(final_total) > 0
) f
WHERE r.id = f.reservation_id
  AND r.total IS DISTINCT FROM f.gross;
