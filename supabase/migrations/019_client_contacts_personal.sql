-- Add personal identification fields to client_contacts
-- For use in lessee identification on rental agreements

ALTER TABLE client_contacts
  ADD COLUMN IF NOT EXISTS birth_date DATE,
  ADD COLUMN IF NOT EXISTS id_card_number TEXT;
