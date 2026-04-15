-- Migration 014: Add serial numbers support
-- equipment.serial_numbers: array of available serial numbers for this equipment
-- reservation_items.serial_numbers: array of serial numbers assigned to this line item

ALTER TABLE equipment
  ADD COLUMN IF NOT EXISTS serial_numbers JSONB NOT NULL DEFAULT '[]';

ALTER TABLE reservation_items
  ADD COLUMN IF NOT EXISTS serial_numbers JSONB NOT NULL DEFAULT '[]';
