-- Migration 010: Add 4 new products (3x mini-rýpadlá, 1x drvič)
-- Date: 2026-03-29

-- 1. Add "Drviče" subcategory to Záhradná technika
INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
SELECT id, 'Drviče', 'drvice', 30
FROM equipment_categories WHERE slug = 'zahradna-technika'
ON CONFLICT (category_id, slug) DO NOTHING;

-- 2. Insert 3 mini-rýpadlá into Ťažká technika > Pásové mini-rýpadlá
INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular)
SELECT
  c.id,
  s.id,
  'wacker-neuson-et18',
  'Wacker Neuson ET18',
  'Mini-rýpadlo 2t',
  '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/Wacker_neusonET18.webp',
  '["Príslušenstvo v cene - Lopata 300 / 500 / svahovacia hydr. 1050 mm","Rozmery (D x Š x V) - 3800 / 990-1300 / 2390 mm","Hĺbkový dosah / Výsypná výška - 2295 / 2720 mm"]',
  95, 116.85, 'fixed', 'owned', true, true, false
FROM equipment_categories c
JOIN equipment_subcategories s ON s.category_id = c.id AND s.slug = 'pasove-mini-rypadla'
WHERE c.slug = 'tazka-technika'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular)
SELECT
  c.id,
  s.id,
  'jcb-19c-i',
  'JCB 19C-I',
  'Mini-rýpadlo 2t',
  '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/JCB-19C-I.webp',
  '["Príslušenstvo v cene - Lopata 300 / 500 / svahovacia hydr. 1050 mm","Rozmery (D x Š x V) - 3860 / 980 - 1330 / 2324 mm","Hĺbkový dosah / Výsypná výška - 2426 / 2637 mm * podľa násady"]',
  95, 116.85, 'fixed', 'owned', true, true, false
FROM equipment_categories c
JOIN equipment_subcategories s ON s.category_id = c.id AND s.slug = 'pasove-mini-rypadla'
WHERE c.slug = 'tazka-technika'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular)
SELECT
  c.id,
  s.id,
  'wacker-neuson-et24',
  'Wacker Neuson ET24',
  'Mini-rýpadlo 2t',
  '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/Wacker_neusonET24.webp',
  '["Príslušenstvo v cene - Lopata 300 / 500 / svahovacia hydr. 1300 mm","Rozmery (D x Š x V) - 4000 / 1400 / 2400 mm","Hĺbkový dosah / Výsypná výška - 2600 / 2800 mm"]',
  95, 116.85, 'fixed', 'owned', true, true, false
FROM equipment_categories c
JOIN equipment_subcategories s ON s.category_id = c.id AND s.slug = 'pasove-mini-rypadla'
WHERE c.slug = 'tazka-technika'
ON CONFLICT (slug) DO NOTHING;

-- 3. Insert drvič into Záhradná technika > Drviče
INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular)
SELECT
  c.id,
  s.id,
  'makita-ud2500',
  'Makita UD2500',
  'Elektrický drvič na konáre',
  '/pictures/Katalog-PNG/Záhradná technika/Drviče/UD2500.webp',
  '["Max. priemer konárov - 45 mm","Objem zbernej nádoby - 67 l","Hmotnosť - 29,7 kg"]',
  20, 24.6, 'fixed', 'owned', true, true, false
FROM equipment_categories c
JOIN equipment_subcategories s ON s.category_id = c.id AND s.slug = 'drvice'
WHERE c.slug = 'zahradna-technika'
ON CONFLICT (slug) DO NOTHING;
