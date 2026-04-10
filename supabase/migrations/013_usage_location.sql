-- Add usage_location field to reservations
-- "Miesto používania PP" — where the equipment will be used (distinct from delivery address)

ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS usage_location TEXT;
