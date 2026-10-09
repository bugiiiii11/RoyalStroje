-- 024: Pracovné plošiny -> subcategory of Ťažká technika (session 63)
--
-- The top-level "Pracovné plošiny" category is retired on the web (hidden in
-- src/data/categories.js). Three platforms stay on offer and move under
-- Ťažká technika -> Pracovné plošiny; the other ten stay in the table as
-- status = 'inactive' (off the website, kept for history / dashboard).
-- The old category and its Interiérové / Exteriérové subcategories are left
-- in place, just empty of active rows.
--
-- Run in the Supabase SQL Editor BEFORE deploying the matching code: the
-- prerender fails the build while an active product sits outside the
-- category tree in categories.js. Safe to re-run.

BEGIN;

-- 1. New subcategory under Ťažká technika (after Vysokozdvižné vozíky = 70)
INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
SELECT id, 'Pracovné plošiny', 'pracovne-plosiny', 80
FROM equipment_categories
WHERE slug = 'tazka-technika'
ON CONFLICT (category_id, slug) DO NOTHING;

-- 2. Move the three platforms that stay on offer
UPDATE equipment e
SET category_id    = c.id,
    subcategory_id = s.id
FROM equipment_categories c
JOIN equipment_subcategories s ON s.category_id = c.id AND s.slug = 'pracovne-plosiny'
WHERE c.slug = 'tazka-technika'
  AND e.slug IN (
    'genie-s85',      -- teleskopická do 28 m
    'genie-z34-22',   -- kĺbová do 13 m (nafta)
    'genie-gs-1932'   -- nožnicová do 8 m
  );

-- 3. Retire the rest of the old category (kept in the table, hidden from the web)
UPDATE equipment
SET status = 'inactive'
WHERE category_id = (SELECT id FROM equipment_categories WHERE slug = 'pracovne-plosiny')
  AND status = 'active';

COMMIT;

-- Check: expect 3 rows under tazka-technika / pracovne-plosiny, 10 inactive
SELECT e.slug, e.status, c.slug AS category, s.slug AS subcategory
FROM equipment e
JOIN equipment_categories c ON c.id = e.category_id
JOIN equipment_subcategories s ON s.id = e.subcategory_id
WHERE s.slug IN ('pracovne-plosiny', 'interierove', 'exterierove')
ORDER BY e.status, e.slug;
