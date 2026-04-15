-- Track which serial numbers are currently rented out (manually toggled)
ALTER TABLE equipment
  ADD COLUMN IF NOT EXISTS rented_serials JSONB NOT NULL DEFAULT '[]';
