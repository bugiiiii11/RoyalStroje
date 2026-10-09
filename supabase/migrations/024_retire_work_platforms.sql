-- 024: Retire Pracovné plošiny (session 63)
--
-- Platforms are no longer rented. The top-level "Pracovné plošiny" category is
-- hidden on the web (commented out in src/data/categories.js) and all 13
-- platform rows go status = 'inactive' -- kept in the table for history and
-- the dashboard, just off the website. The category and its Interiérové /
-- Exteriérové subcategories stay in place, empty of active rows.
--
-- (Ťažká technika -> Vysokozdvižné vozíky is hidden in code only; its single
-- product, Doosan D35C-7, is already inactive, so no DB change is needed.)
--
-- Run in the Supabase SQL Editor BEFORE deploying the matching code: the
-- prerender fails the build while an active product sits outside the
-- category tree in categories.js. Safe to re-run.

UPDATE equipment
SET status = 'inactive'
WHERE category_id = (SELECT id FROM equipment_categories WHERE slug = 'pracovne-plosiny')
  AND status = 'active';

-- Check: expect 13 rows, all inactive
SELECT e.slug, e.status
FROM equipment e
JOIN equipment_categories c ON c.id = e.category_id
WHERE c.slug = 'pracovne-plosiny'
ORDER BY e.status, e.slug;
