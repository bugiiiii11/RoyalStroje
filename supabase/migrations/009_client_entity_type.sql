-- ============================================
-- 009: Add FO/PO entity type to clients
-- ============================================

-- Add entity type: 'po' (právnická osoba) or 'fo' (fyzická osoba)
ALTER TABLE clients ADD COLUMN IF NOT EXISTS entity_type TEXT NOT NULL DEFAULT 'po';

-- FO-specific fields
ALTER TABLE clients ADD COLUMN IF NOT EXISTS birth_date DATE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS id_card_number TEXT;

-- For FO clients, company_name stores full name (Meno a Priezvisko)
-- contact_person is unused for FO
-- address/city/postal_code store permanent residence (trvalé bydlisko)
