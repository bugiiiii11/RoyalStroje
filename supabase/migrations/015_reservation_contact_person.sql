-- Migration 015: Add contact_person to reservations
-- Stores the selected contact person for this specific deal/contract

ALTER TABLE reservations
  ADD COLUMN IF NOT EXISTS contact_person TEXT;
