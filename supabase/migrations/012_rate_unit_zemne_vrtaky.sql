-- Migration 012: Add rate_unit to equipment, add Zemné vrtáky subcategory
-- Date: 2026-04-09

-- 1. Add rate_unit column (display unit for PDF + form)
ALTER TABLE equipment
  ADD COLUMN IF NOT EXISTS rate_unit TEXT NOT NULL DEFAULT 'deň';

-- 2. Add "Zemné vrtáky" subcategory under Záhradná technika
INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
SELECT id, 'Zemné vrtáky', 'zemne-vrtaky', 40
FROM equipment_categories WHERE slug = 'zahradna-technika'
ON CONFLICT (category_id, slug) DO NOTHING;

-- 3. Update Kotúč diamantový items to rate_unit = 'mm'
UPDATE equipment
SET rate_unit = 'mm'
WHERE name ILIKE 'Kotúč diamantový%';
