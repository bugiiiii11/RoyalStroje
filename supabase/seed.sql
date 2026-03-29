-- ============================================================
-- Royal Stroje - Seed Data
-- Auto-generated from src/data/ on 2026-03-18
-- Categories: 7, Products: 142, Accessories: 15
-- ============================================================

DO $$
DECLARE
  v_cat_male_naradie UUID;
  v_sub_male_naradie__vrtacie_kladiva_a_vrtacky UUID;
  v_sub_male_naradie__buracie_kladiva UUID;
  v_sub_male_naradie__utahovace_a_skrutkovace UUID;
  v_sub_male_naradie__brusky UUID;
  v_sub_male_naradie__pily_a_rezacky UUID;
  v_sub_male_naradie__vysavace_a_cistice UUID;
  v_sub_male_naradie__cerpadla UUID;
  v_sub_male_naradie__ohrievace_a_odvlhcovace UUID;
  v_sub_male_naradie__zvaracia_technika UUID;
  v_sub_male_naradie__meracia_technika UUID;
  v_sub_male_naradie__vibratory_listy_a_miesadla UUID;
  v_sub_male_naradie__lesenie UUID;
  v_sub_male_naradie__nadrze UUID;
  v_sub_male_naradie__prislusenstvo UUID;
  v_cat_stredna_mechanizacia UUID;
  v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy UUID;
  v_sub_stredna_mechanizacia__elektrocentraly UUID;
  v_sub_stredna_mechanizacia__kompresory UUID;
  v_sub_stredna_mechanizacia__cestne_rezacky_frezy_a_brusky UUID;
  v_sub_stredna_mechanizacia__stolove_pily UUID;
  v_sub_stredna_mechanizacia__miesacky_hladicky_betonu_a_badie UUID;
  v_sub_stredna_mechanizacia__manipulacna_technika UUID;
  v_cat_tazka_technika UUID;
  v_sub_tazka_technika__pasove_mini_rypadla UUID;
  v_sub_tazka_technika__pasove_tazke_rypadla UUID;
  v_sub_tazka_technika__kolesove_rypadla_a_nakladace UUID;
  v_sub_tazka_technika__smykom_riadene_nakladace UUID;
  v_sub_tazka_technika__dumpre UUID;
  v_sub_tazka_technika__valce UUID;
  v_sub_tazka_technika__manipulatory UUID;
  v_sub_tazka_technika__vysokozdvizne_voziky UUID;
  v_cat_pracovne_plosiny UUID;
  v_sub_pracovne_plosiny__interierove UUID;
  v_sub_pracovne_plosiny__exterierove UUID;
  v_cat_vybavenie_staveniska UUID;
  v_sub_vybavenie_staveniska__kancelarske_kontajnery_a_vratnice UUID;
  v_sub_vybavenie_staveniska__skladove_kontajnery UUID;
  v_sub_vybavenie_staveniska__sanitarne_kontajnery UUID;
  v_sub_vybavenie_staveniska__mobilne_oplotenia_a_zabrany UUID;
  v_sub_vybavenie_staveniska__mobilne_toalety UUID;
  v_cat_auta_privesy UUID;
  v_sub_auta_privesy__auta_a_dodavky UUID;
  v_sub_auta_privesy__privesne_voziky UUID;
  v_cat_zahradna_technika UUID;
  v_sub_zahradna_technika__kosacky_na_travu UUID;
  v_sub_zahradna_technika__krovinorezy_a_motorove_pily UUID;
  v_sub_zahradna_technika__rotavatory UUID;
  v_sub_zahradna_technika__drvice UUID;
BEGIN

-- ============================================================
-- Categories
-- ============================================================
INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('Malé náradie', 'male-naradie', 'Ručné náradie, vŕtačky, brúsky, píly, vysávače, čerpadlá, meracia technika', 'owned', NULL, 0)
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_male_naradie;

IF v_cat_male_naradie IS NULL THEN
  SELECT id INTO v_cat_male_naradie FROM equipment_categories WHERE slug = 'male-naradie';
END IF;

INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('Stredná mechanizácia', 'stredna-mechanizacia', 'Vibračné dosky, elektrocentrály, kompresory, cestné rezačky, miešačky', 'owned', NULL, 10)
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_stredna_mechanizacia;

IF v_cat_stredna_mechanizacia IS NULL THEN
  SELECT id INTO v_cat_stredna_mechanizacia FROM equipment_categories WHERE slug = 'stredna-mechanizacia';
END IF;

INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('Ťažká technika', 'tazka-technika', 'Rýpadlá, nakladače, dumpre, valce, manipulátory - s obsluhou aj bez', 'owned', 'S OBSLUHOU', 20)
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_tazka_technika;

IF v_cat_tazka_technika IS NULL THEN
  SELECT id INTO v_cat_tazka_technika FROM equipment_categories WHERE slug = 'tazka-technika';
END IF;

INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('Pracovné plošiny', 'pracovne-plosiny', 'Interiérové a exteriérové plošiny pre prácu vo výške', 'partner', NULL, 30)
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_pracovne_plosiny;

IF v_cat_pracovne_plosiny IS NULL THEN
  SELECT id INTO v_cat_pracovne_plosiny FROM equipment_categories WHERE slug = 'pracovne-plosiny';
END IF;

INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('Vybavenie staveniska', 'vybavenie-staveniska', 'Kontajnery, vrátnice, oplotenie, zábrany, mobilné toalety', 'partner', NULL, 40)
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_vybavenie_staveniska;

IF v_cat_vybavenie_staveniska IS NULL THEN
  SELECT id INTO v_cat_vybavenie_staveniska FROM equipment_categories WHERE slug = 'vybavenie-staveniska';
END IF;

INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('Autá a prívesné vozíky', 'auta-privesy', 'Autá, dodávky a prívesné vozíky na prepravu techniky', 'partner', NULL, 50)
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_auta_privesy;

IF v_cat_auta_privesy IS NULL THEN
  SELECT id INTO v_cat_auta_privesy FROM equipment_categories WHERE slug = 'auta-privesy';
END IF;

INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('Záhradná technika', 'zahradna-technika', 'Kosačky, krovinorezy, motorové píly a rotavátory', 'partner', NULL, 60)
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_zahradna_technika;

IF v_cat_zahradna_technika IS NULL THEN
  SELECT id INTO v_cat_zahradna_technika FROM equipment_categories WHERE slug = 'zahradna-technika';
END IF;

-- ============================================================
-- Subcategories
-- ============================================================
INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Vŕtacie kladivá a vŕtačky', 'vrtacie-kladiva-a-vrtacky', 0)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__vrtacie_kladiva_a_vrtacky;
IF v_sub_male_naradie__vrtacie_kladiva_a_vrtacky IS NULL THEN
  SELECT id INTO v_sub_male_naradie__vrtacie_kladiva_a_vrtacky FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'vrtacie-kladiva-a-vrtacky';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Búracie kladivá', 'buracie-kladiva', 10)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__buracie_kladiva;
IF v_sub_male_naradie__buracie_kladiva IS NULL THEN
  SELECT id INTO v_sub_male_naradie__buracie_kladiva FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'buracie-kladiva';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Uťahovače a skrutkovače', 'utahovace-a-skrutkovace', 20)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__utahovace_a_skrutkovace;
IF v_sub_male_naradie__utahovace_a_skrutkovace IS NULL THEN
  SELECT id INTO v_sub_male_naradie__utahovace_a_skrutkovace FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'utahovace-a-skrutkovace';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Brúsky', 'brusky', 30)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__brusky;
IF v_sub_male_naradie__brusky IS NULL THEN
  SELECT id INTO v_sub_male_naradie__brusky FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'brusky';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Píly a rezačky', 'pily-a-rezacky', 40)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__pily_a_rezacky;
IF v_sub_male_naradie__pily_a_rezacky IS NULL THEN
  SELECT id INTO v_sub_male_naradie__pily_a_rezacky FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'pily-a-rezacky';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Vysávače a čističe', 'vysavace-a-cistice', 50)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__vysavace_a_cistice;
IF v_sub_male_naradie__vysavace_a_cistice IS NULL THEN
  SELECT id INTO v_sub_male_naradie__vysavace_a_cistice FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'vysavace-a-cistice';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Čerpadlá', 'cerpadla', 60)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__cerpadla;
IF v_sub_male_naradie__cerpadla IS NULL THEN
  SELECT id INTO v_sub_male_naradie__cerpadla FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'cerpadla';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Ohrievače a odvlhčovače', 'ohrievace-a-odvlhcovace', 70)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__ohrievace_a_odvlhcovace;
IF v_sub_male_naradie__ohrievace_a_odvlhcovace IS NULL THEN
  SELECT id INTO v_sub_male_naradie__ohrievace_a_odvlhcovace FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'ohrievace-a-odvlhcovace';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Zváracia technika', 'zvaracia-technika', 80)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__zvaracia_technika;
IF v_sub_male_naradie__zvaracia_technika IS NULL THEN
  SELECT id INTO v_sub_male_naradie__zvaracia_technika FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'zvaracia-technika';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Meracia technika', 'meracia-technika', 90)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__meracia_technika;
IF v_sub_male_naradie__meracia_technika IS NULL THEN
  SELECT id INTO v_sub_male_naradie__meracia_technika FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'meracia-technika';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Vibrátory, lišty a miešadlá', 'vibratory-listy-a-miesadla', 100)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__vibratory_listy_a_miesadla;
IF v_sub_male_naradie__vibratory_listy_a_miesadla IS NULL THEN
  SELECT id INTO v_sub_male_naradie__vibratory_listy_a_miesadla FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'vibratory-listy-a-miesadla';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Lešenie', 'lesenie', 110)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__lesenie;
IF v_sub_male_naradie__lesenie IS NULL THEN
  SELECT id INTO v_sub_male_naradie__lesenie FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'lesenie';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Nádrže', 'nadrze', 120)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__nadrze;
IF v_sub_male_naradie__nadrze IS NULL THEN
  SELECT id INTO v_sub_male_naradie__nadrze FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'nadrze';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_male_naradie, 'Príslušenstvo', 'prislusenstvo', 130)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_male_naradie__prislusenstvo;
IF v_sub_male_naradie__prislusenstvo IS NULL THEN
  SELECT id INTO v_sub_male_naradie__prislusenstvo FROM equipment_subcategories WHERE category_id = v_cat_male_naradie AND slug = 'prislusenstvo';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_stredna_mechanizacia, 'Vibračné dosky a nohy', 'vibracne-dosky-a-nohy', 0)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy;
IF v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy IS NULL THEN
  SELECT id INTO v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy FROM equipment_subcategories WHERE category_id = v_cat_stredna_mechanizacia AND slug = 'vibracne-dosky-a-nohy';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_stredna_mechanizacia, 'Elektrocentrály', 'elektrocentraly', 10)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_stredna_mechanizacia__elektrocentraly;
IF v_sub_stredna_mechanizacia__elektrocentraly IS NULL THEN
  SELECT id INTO v_sub_stredna_mechanizacia__elektrocentraly FROM equipment_subcategories WHERE category_id = v_cat_stredna_mechanizacia AND slug = 'elektrocentraly';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_stredna_mechanizacia, 'Kompresory', 'kompresory', 20)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_stredna_mechanizacia__kompresory;
IF v_sub_stredna_mechanizacia__kompresory IS NULL THEN
  SELECT id INTO v_sub_stredna_mechanizacia__kompresory FROM equipment_subcategories WHERE category_id = v_cat_stredna_mechanizacia AND slug = 'kompresory';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_stredna_mechanizacia, 'Cestné rezačky, frézy a brúsky', 'cestne-rezacky-frezy-a-brusky', 30)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_stredna_mechanizacia__cestne_rezacky_frezy_a_brusky;
IF v_sub_stredna_mechanizacia__cestne_rezacky_frezy_a_brusky IS NULL THEN
  SELECT id INTO v_sub_stredna_mechanizacia__cestne_rezacky_frezy_a_brusky FROM equipment_subcategories WHERE category_id = v_cat_stredna_mechanizacia AND slug = 'cestne-rezacky-frezy-a-brusky';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_stredna_mechanizacia, 'Stolové píly', 'stolove-pily', 40)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_stredna_mechanizacia__stolove_pily;
IF v_sub_stredna_mechanizacia__stolove_pily IS NULL THEN
  SELECT id INTO v_sub_stredna_mechanizacia__stolove_pily FROM equipment_subcategories WHERE category_id = v_cat_stredna_mechanizacia AND slug = 'stolove-pily';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_stredna_mechanizacia, 'Miešačky, hladičky betónu a bádie', 'miesacky-hladicky-betonu-a-badie', 50)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_stredna_mechanizacia__miesacky_hladicky_betonu_a_badie;
IF v_sub_stredna_mechanizacia__miesacky_hladicky_betonu_a_badie IS NULL THEN
  SELECT id INTO v_sub_stredna_mechanizacia__miesacky_hladicky_betonu_a_badie FROM equipment_subcategories WHERE category_id = v_cat_stredna_mechanizacia AND slug = 'miesacky-hladicky-betonu-a-badie';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_stredna_mechanizacia, 'Manipulačná technika', 'manipulacna-technika', 60)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_stredna_mechanizacia__manipulacna_technika;
IF v_sub_stredna_mechanizacia__manipulacna_technika IS NULL THEN
  SELECT id INTO v_sub_stredna_mechanizacia__manipulacna_technika FROM equipment_subcategories WHERE category_id = v_cat_stredna_mechanizacia AND slug = 'manipulacna-technika';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Pásové mini-rýpadlá', 'pasove-mini-rypadla', 0)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__pasove_mini_rypadla;
IF v_sub_tazka_technika__pasove_mini_rypadla IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__pasove_mini_rypadla FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'pasove-mini-rypadla';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Pásové ťažké rýpadlá', 'pasove-tazke-rypadla', 10)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__pasove_tazke_rypadla;
IF v_sub_tazka_technika__pasove_tazke_rypadla IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__pasove_tazke_rypadla FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'pasove-tazke-rypadla';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Kolesové rýpadlá a nakladače', 'kolesove-rypadla-a-nakladace', 20)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__kolesove_rypadla_a_nakladace;
IF v_sub_tazka_technika__kolesove_rypadla_a_nakladace IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__kolesove_rypadla_a_nakladace FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'kolesove-rypadla-a-nakladace';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Šmykom riadené nakladače', 'smykom-riadene-nakladace', 30)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__smykom_riadene_nakladace;
IF v_sub_tazka_technika__smykom_riadene_nakladace IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__smykom_riadene_nakladace FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'smykom-riadene-nakladace';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Dumpre', 'dumpre', 40)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__dumpre;
IF v_sub_tazka_technika__dumpre IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__dumpre FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'dumpre';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Valce', 'valce', 50)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__valce;
IF v_sub_tazka_technika__valce IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__valce FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'valce';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Manipulátory', 'manipulatory', 60)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__manipulatory;
IF v_sub_tazka_technika__manipulatory IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__manipulatory FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'manipulatory';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_tazka_technika, 'Vysokozdvižné vozíky', 'vysokozdvizne-voziky', 70)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_tazka_technika__vysokozdvizne_voziky;
IF v_sub_tazka_technika__vysokozdvizne_voziky IS NULL THEN
  SELECT id INTO v_sub_tazka_technika__vysokozdvizne_voziky FROM equipment_subcategories WHERE category_id = v_cat_tazka_technika AND slug = 'vysokozdvizne-voziky';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_pracovne_plosiny, 'Interiérové', 'interierove', 0)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_pracovne_plosiny__interierove;
IF v_sub_pracovne_plosiny__interierove IS NULL THEN
  SELECT id INTO v_sub_pracovne_plosiny__interierove FROM equipment_subcategories WHERE category_id = v_cat_pracovne_plosiny AND slug = 'interierove';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_pracovne_plosiny, 'Exteriérové', 'exterierove', 10)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_pracovne_plosiny__exterierove;
IF v_sub_pracovne_plosiny__exterierove IS NULL THEN
  SELECT id INTO v_sub_pracovne_plosiny__exterierove FROM equipment_subcategories WHERE category_id = v_cat_pracovne_plosiny AND slug = 'exterierove';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_vybavenie_staveniska, 'Kancelárske kontajnery a vrátnice', 'kancelarske-kontajnery-a-vratnice', 0)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_vybavenie_staveniska__kancelarske_kontajnery_a_vratnice;
IF v_sub_vybavenie_staveniska__kancelarske_kontajnery_a_vratnice IS NULL THEN
  SELECT id INTO v_sub_vybavenie_staveniska__kancelarske_kontajnery_a_vratnice FROM equipment_subcategories WHERE category_id = v_cat_vybavenie_staveniska AND slug = 'kancelarske-kontajnery-a-vratnice';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_vybavenie_staveniska, 'Skladové kontajnery', 'skladove-kontajnery', 10)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_vybavenie_staveniska__skladove_kontajnery;
IF v_sub_vybavenie_staveniska__skladove_kontajnery IS NULL THEN
  SELECT id INTO v_sub_vybavenie_staveniska__skladove_kontajnery FROM equipment_subcategories WHERE category_id = v_cat_vybavenie_staveniska AND slug = 'skladove-kontajnery';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_vybavenie_staveniska, 'Sanitárne kontajnery', 'sanitarne-kontajnery', 20)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_vybavenie_staveniska__sanitarne_kontajnery;
IF v_sub_vybavenie_staveniska__sanitarne_kontajnery IS NULL THEN
  SELECT id INTO v_sub_vybavenie_staveniska__sanitarne_kontajnery FROM equipment_subcategories WHERE category_id = v_cat_vybavenie_staveniska AND slug = 'sanitarne-kontajnery';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_vybavenie_staveniska, 'Mobilné oplotenia a zábrany', 'mobilne-oplotenia-a-zabrany', 30)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_vybavenie_staveniska__mobilne_oplotenia_a_zabrany;
IF v_sub_vybavenie_staveniska__mobilne_oplotenia_a_zabrany IS NULL THEN
  SELECT id INTO v_sub_vybavenie_staveniska__mobilne_oplotenia_a_zabrany FROM equipment_subcategories WHERE category_id = v_cat_vybavenie_staveniska AND slug = 'mobilne-oplotenia-a-zabrany';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_vybavenie_staveniska, 'Mobilné toalety', 'mobilne-toalety', 40)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_vybavenie_staveniska__mobilne_toalety;
IF v_sub_vybavenie_staveniska__mobilne_toalety IS NULL THEN
  SELECT id INTO v_sub_vybavenie_staveniska__mobilne_toalety FROM equipment_subcategories WHERE category_id = v_cat_vybavenie_staveniska AND slug = 'mobilne-toalety';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_auta_privesy, 'Autá a dodávky', 'auta-a-dodavky', 0)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_auta_privesy__auta_a_dodavky;
IF v_sub_auta_privesy__auta_a_dodavky IS NULL THEN
  SELECT id INTO v_sub_auta_privesy__auta_a_dodavky FROM equipment_subcategories WHERE category_id = v_cat_auta_privesy AND slug = 'auta-a-dodavky';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_auta_privesy, 'Prívesné vozíky', 'privesne-voziky', 10)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_auta_privesy__privesne_voziky;
IF v_sub_auta_privesy__privesne_voziky IS NULL THEN
  SELECT id INTO v_sub_auta_privesy__privesne_voziky FROM equipment_subcategories WHERE category_id = v_cat_auta_privesy AND slug = 'privesne-voziky';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_zahradna_technika, 'Kosačky na trávu', 'kosacky-na-travu', 0)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_zahradna_technika__kosacky_na_travu;
IF v_sub_zahradna_technika__kosacky_na_travu IS NULL THEN
  SELECT id INTO v_sub_zahradna_technika__kosacky_na_travu FROM equipment_subcategories WHERE category_id = v_cat_zahradna_technika AND slug = 'kosacky-na-travu';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_zahradna_technika, 'Krovinorezy a motorové píly', 'krovinorezy-a-motorove-pily', 10)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_zahradna_technika__krovinorezy_a_motorove_pily;
IF v_sub_zahradna_technika__krovinorezy_a_motorove_pily IS NULL THEN
  SELECT id INTO v_sub_zahradna_technika__krovinorezy_a_motorove_pily FROM equipment_subcategories WHERE category_id = v_cat_zahradna_technika AND slug = 'krovinorezy-a-motorove-pily';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_zahradna_technika, 'Rotavátory', 'rotavatory', 20)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_zahradna_technika__rotavatory;
IF v_sub_zahradna_technika__rotavatory IS NULL THEN
  SELECT id INTO v_sub_zahradna_technika__rotavatory FROM equipment_subcategories WHERE category_id = v_cat_zahradna_technika AND slug = 'rotavatory';
END IF;

INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (v_cat_zahradna_technika, 'Drviče', 'drvice', 30)
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO v_sub_zahradna_technika__drvice;
IF v_sub_zahradna_technika__drvice IS NULL THEN
  SELECT id INTO v_sub_zahradna_technika__drvice FROM equipment_subcategories WHERE category_id = v_cat_zahradna_technika AND slug = 'drvice';
END IF;

-- ============================================================
-- Equipment (146 items)
-- ============================================================
INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_auta_privesy, v_sub_auta_privesy__auta_a_dodavky, 'citroen-jumper', 'Citroen Jumper', 'Dodávka do 3,5t', '/pictures/Katalog-PNG/Autá a prívesné vozíky/Autá a dodávky/dodavka-3500.webp', '["Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_auta_privesy, v_sub_auta_privesy__privesne_voziky, 'privesny-vozik-do-750kg', 'Prívesný vozík do 750kg', 'Prívesný vozík do 750kg', '/pictures/Katalog-PNG/Autá a prívesné vozíky/Prívesné vozíky/privesny-vozik-750.webp', '[]', 15, 18.45, 'fixed', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_auta_privesy, v_sub_auta_privesy__privesne_voziky, 'privesny-vozik-do-3500kg', 'Prívesný vozík do 3500kg', 'Prívesný vozík do 3500kg', '/pictures/Katalog-PNG/Autá a prívesné vozíky/Prívesné vozíky/privesny-vozik-3500.webp', '[]', 30, 36.9, 'fixed', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__utahovace_a_skrutkovace, 'makita-tw001gm201', 'Makita TW001GM201', 'Rázový AKU uťahovač 2000 Nm', '/pictures/Katalog-PNG/Malé náradie/Uťahovače a skrútkovače/makita-razovy-aku-utahovac-tw001gm201.webp', '["Povoľovací moment - 2000 Nm","Uťahovací moment - 1630 Nm","príslušenstvo - 2 x batéria (4,0Ah), rýchlonabíjačka"]', 20, 24.6, 'fixed', 'owned', true, true, false, 'makita-tw001gm201-razovy-utahovak-extremny-vykon')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__utahovace_a_skrutkovace, 'makita-dhp482rfj', 'Makita DHP482RFJ', 'Vŕtací AKU skrutkovač s príklepom', '/pictures/Katalog-PNG/Malé náradie/Uťahovače a skrútkovače/makita-vrtaci-aku-skrutkovac-dhp482.webp', '["Max. vŕtací výkon (oceľ / kameň / drevo / vyk. korunka) - 13 / 13 / 38 / 60 mm","Upínací rozsah skľučovadla - 1,5 - 13 mm","príslušenstvo - 2 x batéria (4,0Ah), rýchlonabíjačka"]', 12, 14.76, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'makita-ga5030r', 'Makita GA5030R', 'Uhlová brúska 125mm', '/pictures/Katalog-PNG/Malé náradie/Brúsky/Makita-GA5030R.webp', '["Priemer kotúča - 125 mm","Hmotnosť - 1,8 kg","Príkon - 720 W"]', 7, 8.61, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'makita-ga9050r', 'Makita GA9050R', 'Uhlová brúska 230mm', '/pictures/Katalog-PNG/Malé náradie/Brúsky/Makita-GA9050R.webp', '["Priemer kotúča - 230 mm","Hmotnosť - 4,8 kg","Príkon - 2000 W"]', 8, 9.84, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'dewalt-dcg405p2', 'DeWalt DCG405P2', 'Uhlová brúska AKU 125mm', '/pictures/Katalog-PNG/Malé náradie/Brúsky/DeWALT-DCG405P2.webp', '["Priemer kotúča - 125 mm","Batéria - 18V 2x5,0Ah","Hmotnosť - 1,75 kg"]', 13, 15.99, 'fixed', 'owned', true, false, false, 'dewalt-dcg405p2-akumulatorova-bruska-profesionalny-nastroj')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'makita-bo3710', 'Makita BO3710', 'Vibračná brúska 1,6kg', '/pictures/Katalog-PNG/Malé náradie/Brúsky/Makita-BO3710.webp', '["Rozmer brúsneho papiera - 93 x 228 mm","Excentricita - 2 mm","Príkon - 190 W"]', 7, 8.61, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'makita-bo5041', 'Makita BO5041', 'Excentrická brúska 1,4 kg', '/pictures/Katalog-PNG/Malé náradie/Brúsky/Makita-BO5041.webp', '["Priemer základnej dosky - 123 mm","Excentricita - 2,8 mm","Príkon - 300 W"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'bruska-na-steny-a-stropy', 'Brúska na steny a stropy', 'Brúska na steny a stropy', '/pictures/Katalog-PNG/Malé náradie/Brúsky/bruska-na-steny-a-stropy.webp', '["Priemer brúsneho papiera - 225 mm","Napájanie - 230 V"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'makita-9911', 'Makita 9911', 'Pásová brúska 2,7 kg', '/pictures/Katalog-PNG/Malé náradie/Brúsky/Makita-9911.webp', '["Rozmer brúsneho pásu - 76x457 mm","Príkon - 950 W"]', 7, 8.61, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'makita-1806b', 'Makita 1806B', 'Hoblík 170 mm', '/pictures/Katalog-PNG/Malé náradie/Brúsky/makita-hoblik-1806b.webp', '["Šírka hobľovania - 170 mm","Hĺbka hobľovania - 0-2 mm","Celková dĺžka - 525 mm"]', 20, 24.6, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__brusky, 'makita-pc5010c', 'Makita PC5010C', 'Brúska na betón 125 mm', '/pictures/Katalog-PNG/Malé náradie/Brúsky/makita-bruska-na-beton-pc5010c.webp', '["Priemer kotúča - 125 mm","Voľnobežné otáčky - 4.000 - 9.000 min-1","Hmotnosť - 2,5 kg"]', 18, 22.14, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__buracie_kladiva, 'makita-hm0871c', 'Makita HM0871C', 'Búracie kladivo 5,6 kg - SDS-Max', '/pictures/Katalog-PNG/Malé náradie/Búracie kladivá/Makita-HM0871C.webp', '["Sila jednotlivého príklepu - 8,1 J","Antivibračná technológia - AVT","Príkon - 1.100 W"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__buracie_kladiva, 'makita-hm1213c', 'Makita HM1213C', 'Búracie kladivo 10,8 kg - SDS-Max', '/pictures/Katalog-PNG/Malé náradie/Búracie kladivá/makita-buracie-kladivo-hm1213c.webp', '["Sila jednotlivého príklepu - 18,6 J","Antivibračná technológia - AVT"]', 20, 24.6, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__buracie_kladiva, 'makita-hm1307c', 'Makita HM1307C', 'Búracie kladivo 15,3 kg', '/pictures/Katalog-PNG/Malé náradie/Búracie kladivá/Makita-HM1307C.webp', '["Sila jednotlivého príklepu - 25,5 J","Príkon - 1.510 W"]', 23, 28.29, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__buracie_kladiva, 'makita-hm1812', 'Makita HM1812', 'Búracie kladivo 31,3 kg', '/pictures/Katalog-PNG/Malé náradie/Búracie kladivá/makita-buracie-kladivo-hm1812.webp', '["Sila jednotlivého príklepu - 72,8 J","Antivibračná technológia - AVT","Príkon - 2.000 W"]', 30, 36.9, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__buracie_kladiva, 'permon-sk-9-5', 'Permon SK 9-5', 'Búracie kladivo pneumatické 9,5 kg', '/pictures/Katalog-PNG/Malé náradie/Búracie kladivá/Permon-SK-9-5.webp', '["Sila jednotlivého príklepu - 26 J"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__buracie_kladiva, 'permon-sk13-b', 'Permon SK13-B', 'Búracie kladivo pneumatické 12,3 kg', '/pictures/Katalog-PNG/Malé náradie/Búracie kladivá/Permon-SK13-B.webp', '["Sila jednotlivého príklepu - 41 J"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__cerpadla, 'atlas-copco-weda04b', 'Atlas Copco WEDA04B', 'Čerpadlo na zostatkovú vodu 224 l/min', '/pictures/Katalog-PNG/Malé náradie/Čerpadlá/Atlas-Copco-Weda-04B.webp', '["Maximálna výtlačná výška - 12 m","Hmotnosť - 9,5 kg","výška/šírka/priemer - 415/253/220 mm"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__cerpadla, 'atlas-copco-weda-08s', 'Atlas Copco Weda 08S', 'Kalové ponorné čerpadlo 317 l/min', '/pictures/Katalog-PNG/Malé náradie/Čerpadlá/Atlas-Copco-Weda-08S.webp', '["Max. výtlačná výška - 13 m","Hmotnosť - 13 kg","výška/šírka/priemer - 416/277/241 mm"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__cerpadla, 'atlas-copco-weda-10n', 'Atlas Copco Weda 10N', 'Ponorné čerpadlo 470 l/min', '/pictures/Katalog-PNG/Malé náradie/Čerpadlá/Atlas-Copco-Weda-10N.webp', '["Max. výtlačná výška - 15 m","Hmotnosť - 13 kg"]', 22, 27.06, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__cerpadla, 'atlas-copco-weda-30l', 'Atlas Copco Weda 30L', 'Ponorné čerpadlo 1245 l/min', '/pictures/Katalog-PNG/Malé náradie/Čerpadlá/Atlas-Copco-Weda-30L.webp', '["Max. výtlačná výška - 15 m","Hmotnosť - 20 kg","Príkon - 2600W"]', 30, 36.9, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__cerpadla, 'atlas-copco-weda-50n', 'Atlas Copco Weda 50N', 'Ponorné čerpadlo 1200 l/min', '/pictures/Katalog-PNG/Malé náradie/Čerpadlá/Atlas-Copco-WEDA50N.webp', '["Max. výtlačná výška - 27 m","Hmotnosť - 55 kg","Napájanie - 400 V"]', 47, 57.81, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__cerpadla, 'honda-wt30', 'Honda WT30', 'Čerpadlo kalové benzínové 1200 l/min', '/pictures/Katalog-PNG/Malé náradie/Čerpadlá/Honda-WT30.webp', '["Max. výtlačná výška - 27 m","Hmotnosť - 61 kg","4-taktný motor OHV - Benzín"]', 30, 36.9, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__lesenie, 'custers', 'Custers', 'Lešenie 0.7m', '/pictures/Katalog-PNG/Malé náradie/Lešenie/Custers-700.webp', '["Šírka - 0.7m","Výška - 2.3m, 4.3m, 6.3m, 8.3m, 10.3m","Dĺžka - 2.5m"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__lesenie, 'custers-2', 'Custers', 'Lešenie 1.3m', '/pictures/Katalog-PNG/Malé náradie/Lešenie/custers-1300.webp', '["Šírka - 1.3m","Výška - 2.3m, 4.3m, 6.3m, 8.3m , 10.3m","Dĺžka - 2.5m"]', 12, 14.76, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__lesenie, 'toughbuilt-tb-c700', 'TOUGHBUILT TB-C700', 'Pracovné kozy', '/pictures/Katalog-PNG/Malé náradie/Lešenie/toughbuilt-tb-c700.webp', '["Výška v najvyššej pozícii - 81.5 cm","Hmotnosť - 10.45 kg","Konštrukcia tela - 100% oceľ"]', 12, 14.76, 'fixed', 'owned', true, true, false, 'toughbuilt-tb-c700-pracovne-kozy-profesionalny-nastroj')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__nadrze, 'nadrz-na-vodu-ibc-1000l', 'Nádrž na vodu IBC 1000L', 'Nádrž na vodu IBC 1000L', '/pictures/Katalog-PNG/Malé náradie/Nádrže/nadrz-ibc-1000L.webp', '["Kapacita - 1000L"]', 5, 6.15, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'drel', 'Drel', 'Ohrievač elektrický 2 kW', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/drel-2kw.webp', '["Napájanie - 230 V"]', 7, 0, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-b33', 'Master B3,3', 'Ohrievač elektrický 3,3 kW', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/Master-B33.webp', '["Rozsah teploty - 5 - 35 ºC","Hmotnosť - 5,7kg","Napájanie - 230V"]', 9, 11.07, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-b15', 'Master B15', 'Ohrievač elektrický 15 kW', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/master-b15.webp', '["Rozsah teploty - 5 - 35 ºC","Hmotnosť - 15 kg","Napájanie - 400 V"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-blp33', 'Master BLP33', 'Ohrievač plynový 33 kW', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/Master-BLP33.webp', '["Spotreba - 2,14kg/h propan-butan","Hmotnosť - 8 kg","Napájanie - 230V"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-blp53', 'Master BLP53', 'Ohrievač plynový 52 kW', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/Master-BLP53.webp', '["Spotreba - 3,78kg/h propan-butan","Hmotnosť - 12,5 kg","Napájanie - 230 V"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-b-150-ced', 'Master B 150 CED', 'Ohrievač naftový 44 kW', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/Master-B150-CED.webp', '["Spotreba - 4,2 kg/hod - nafta","Hmotnosť - 25 kg","Napájanie - 230 V"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-b-230', 'Master B 230', 'Ohrievač naftový 65 kW', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/Master-B230.webp', '["Spotreba - 5,4 kg/h - nafta","Hmotnosť - 76 kg","Napájanie - 230 V"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-dh44', 'Master DH44', 'Odvlhčovač 480 m3/h', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/Master-DH44.webp', '["Výkon - 41 l/24h","Hmotnosť - 43 kg","Napájanie - 230 V"]', 17, 20.91, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__ohrievace_a_odvlhcovace, 'master-dh26', 'Master DH26', 'Odvlhčovač 350 m3/h', '/pictures/Katalog-PNG/Malé náradie/Ohrievače a odvlhčovače/Master-DH26.webp', '["Výkon - 27l /24h","Hmotnosť - 30 kg","Napájanie - 230 V"]', 14, 17.22, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'dewalt-dcs570p2', 'DeWALT DCS570P2', 'Kotúčová píla 184mm AKU', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/DeWALT-DCS570P2.webp', '["Maximálna hĺbka rezu pri 90º/45° - 64/48 mm","Hmotnosť - 3,6 kg","Batéria - 18V 2x5,0Ah"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'makita-jr3051tk', 'Makita JR3051TK', 'Chvostová píla 3,3 kg', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/Makita-JR3051TK.webp', '["Dĺžka pílového listu - 450 mm","Max. priemer drevo/rúrka  0 ° - 255/130 mm","Príkon - 1200 W"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'makita-ls1018ln', 'Makita LS1018LN', 'Pokosová píla 260mm', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/Makita-LS1018LN.webp', '["Maximálna hĺbka rezu pri 90º/45° - 305/215 mm","Hmotnosť - 19,9 kg","Príkon - 1.430 W"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'festa', 'Festa', 'Rezačka na dlažbu 1050mm', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/rezacka-na-dlazbu-1050mm.webp', '["max. dĺžka rezu - 1050mm"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'styropor4', 'Styropor4', 'Rezačka polystyrénu 1200mm', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/Styropor4.webp', '["max. dĺžka rezu - 1200mm","Hmotnosť - 9,8 kg","Príkon - 160 W"]', 11, 13.53, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'dlzka-zlomu', 'Dĺžka zlomu', 'Lámačka zámkovej dlažby', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/Lamacka-zamkovej-dlazby.webp', '["41 cm - Hĺbka zlomu","2,5-15,5 - 11 cm"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'makita-sg150', 'Makita SG150', 'Drážkovacia píla 150mm', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/Makita-SG150.webp', '["šírka / hĺbka - 7 – 35 mm / 7 - 45 mm","Hmotnosť - 5,7 kg","Príkon - 1800 W"]', 17, 20.91, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'makita-ce001gz', 'Makita CE001GZ', 'Aku rozbrusovacia píla 350mm', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/makita-aku-rozbrusovacia-pila-CE001GZ.webp', '["Max. hĺbka rezu - 127 mm","Priemer rezného kotúča - 355 mm","príslušenstvo - 2 x batéria 40V XGT (5,0Ah), rýchlonabíjačka"]', 30, 36.9, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'makita-n5900b', 'Makita N5900B', 'Kotúčová píla 235mm', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/makita-kotucova-pila-n5900b.webp', '["Maximálna hĺbka rezu pri 90º/45° - 85/60 mm","Priemer kotúča - 235 mm","Príkon - 2.000 W"]', 10, 12.3, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__pily_a_rezacky, 'makita-4327', 'Makita 4327', 'Píla priamočiara', '/pictures/Katalog-PNG/Malé náradie/Píly a rezačky/makita-priamociara-pila-4327.webp', '["Max. rezný výkon drevo/oceľ - 65/6 mm","Príkon - 450 W"]', 7, 8.61, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vibratory_listy_a_miesadla, 'enar-avmu', 'Enar AVMU', 'Ponorný vibrátor', '/pictures/Katalog-PNG/Malé náradie/Vibrátory, lišty a miešadlá/Enar-AVMU.webp', '["Dĺžky hadice - 3 m ,5m","Napájanie - 230V"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vibratory_listy_a_miesadla, 'husqvarna-bv20g', 'Husqvarna BV20G', 'Vibračná lišta motorová', '/pictures/Katalog-PNG/Malé náradie/Vibrátory, lišty a miešadlá/Husqvarna-BV20G.webp', '["Pracovná šírka - 2 m","Pohon - Benzín , 4-takt"]', 22, 27.06, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vibratory_listy_a_miesadla, 'makita-ut1200', 'Makita UT1200', 'Miešadlo', '/pictures/Katalog-PNG/Malé náradie/Vibrátory, lišty a miešadlá/makita-miesadlo-UT1200.webp', '["Max. priemer miešadla - 120 mm","Upínanie nástroja - M14","Objem zmesi - 30 - 40 kg"]', 10, 12.3, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vrtacie_kladiva_a_vrtacky, 'makita-hr2630', 'Makita HR2630', 'Vŕtacie kladivo 2,8 kg - SDS-Plus', '/pictures/Katalog-PNG/Malé náradie/Vŕtacie kladivá a vŕtačky/makita-vrtacie-kladivo-hr2630.webp', '["Sila jednotlivého príklepu - 2,4 J","Max. vŕtací výkon - oceľ|betón|drevo - 13 / 26 / 32 mm","Max. vŕtací výkon (korunka) - 68 mm"]', 9, 11.07, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vrtacie_kladiva_a_vrtacky, 'makita-dhr241rtj', 'Makita DHR241RTJ', 'Vŕtacie kladivo AKU 3,2 kg - SDS Plus', '/pictures/Katalog-PNG/Malé náradie/Vŕtacie kladivá a vŕtačky/Makita-DHR241RTJ.webp', '["Sila jednotlivého príklepu (EPTA) - 1,9 J","Max. vŕtací výkon (betón / kov / drevo) - 20 / 13 / 26 mm","Batéria - 18V 2x5,0Ah"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vrtacie_kladiva_a_vrtacky, 'makita-hp1631k', 'Makita HP1631K', 'Príklepová  vŕtačka 2 kg', '/pictures/Katalog-PNG/Malé náradie/Vŕtacie kladivá a vŕtačky/Makita-HP1631K.webp', '["Max. vŕtací výkon - oceľ|betón|drevo - 13/16/30 mm","Upínací rozsah - 1,5 - 13 mm","Príkon - 710 W"]', 9, 11.07, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vrtacie_kladiva_a_vrtacky, 'makita-hr4003c', 'Makita HR4003C', 'Vŕtacie kladivo 6,2 kg - SDS-Max', '/pictures/Katalog-PNG/Malé náradie/Vŕtacie kladivá a vŕtačky/Makita-HR4003C.webp', '["Sila jednotlivého príklepu - 8,3 J","Max. vŕtací výkon (vrták, korunka) - 40/105 mm","Príkon - 1.100 W"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vrtacie_kladiva_a_vrtacky, 'makita-hr5202c', 'Makita HR5202C', 'Vŕtacie kladivo 10,9 kg - SDS-Max', '/pictures/Katalog-PNG/Malé náradie/Vŕtacie kladivá a vŕtačky/Makita-HR5202C.webp', '["Sila jednotlivého príklepu - 20 J","Max. vŕtací výkon (vrták, korunka) - 52/160 mm","Príkon - 1.510 W"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vysavace_a_cistice, 'bosch-advancedvac-20', 'Bosch AdvancedVac 20', 'Stavebný vysávač 20L', '/pictures/Katalog-PNG/Malé náradie/Vysávače a čističe/Bosch-Advancedvac-20.webp', '["Objem nádoby - 20 L","Hmotnosť - 7,6 kg","Príkon - 1200 W"]', 10, 12.3, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vysavace_a_cistice, 'makita-vc4210l', 'Makita VC4210L', 'Stavebný vysávač 42L', '/pictures/Katalog-PNG/Malé náradie/Vysávače a čističe/Makita-VC4210L.webp', '["Objem nádoby - 42 L","Kapacita zberu pre vodu - 30 L","Príkon - 1200 W"]', 14, 17.22, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vysavace_a_cistice, 'makita-vc2512l', 'Makita VC2512L', 'Stavebný vysávač 25L', '/pictures/Katalog-PNG/Malé náradie/Vysávače a čističe/Makita-VC2512L.webp', '["Objem nádoby - 25 L","Hmotnosť - 8 kg","Príkon - 1000 W"]', 12, 14.76, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vysavace_a_cistice, 'karcher-puzzi-101', 'Kärcher Puzzi 10/1', 'Tepovač', '/pictures/Katalog-PNG/Malé náradie/Vysávače a čističe/Karcher-puzzi.webp', '["Max. plošný výkon (m²/h) - 20 - 25","Hmotnosť - 10,7 kg","Nádrž na čistú / špinavú vodu (l) - 10 - 9"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__vysavace_a_cistice, 'ryobi-170-bar', 'RYOBI 170 BAR', 'Vysokotlakový čistič', '/pictures/Katalog-PNG/Malé náradie/Vysávače a čističe/vysokotlakovy-cistic-ryobi-170-bar.webp', '["Prevádzkový tlak - 170 Bar","Typ motora - Uhlíkový","Maximálny prietok - 470 l/h"]', 17, 20.91, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__zvaracia_technika, 'gama-166-omicron', 'Gama 166 Omicron', 'Zváračka na kov 160 A', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/0micron-Gama-166.webp', '["Výkon - malé zaťaženie do 220 A","Zváraný materiál - oceľ / nerez / meď / nikel / titán","Napájanie - 230 V"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__zvaracia_technika, 'leister', 'Leister', 'Zváračka na plasty', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/Leister.webp', '["Teplota - 40-700°C","Dýza + 3x  valček","Napájanie - 230 V"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__zvaracia_technika, 'dytron-p4a-650w', 'DYTRON-P4a 650W', 'Zváračka na PVC rúry', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/Dytron-P4a-650W.webp', '["Max. priemer potrubia - 63 mm","Napájanie - 230 V"]', 15, 18.45, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__zvaracia_technika, 'hadica-na-propan', 'Hadica na propán', 'Horák na IPU', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/Horak-Na-Ipu.webp', '["5m"]', 6, 7.38, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__zvaracia_technika, 'makita-hg6031vk', 'Makita HG6031VK', 'Teplovzdušná pištoľ', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/makita-teplovzdusna-pistol-hg6031vk.webp', '["Teplota - 50 - 600 °C","Prietok vzduchu - 250 / 500 l/min","Príkon - 1.800 W"]', 6, 7.38, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__meracia_technika, 'nivel-cl3g', 'NIVEL CL3G', 'Krížový laser', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/Krizovy-laser-CLx3G.webp', '["Laser so zeleným lúčom - 3 x 360° rovina (2 x vertikálna, 1 x horizontálna)","Presné merania - 2,0 mm/10m","Príslušenstvo - statív + lata"]', 15, 18.45, 'fixed', 'owned', true, true, false, 'nivel-cl3g-krizovy-laser-zeleny-profesionalny-nastroj')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__meracia_technika, 'nivel-n32x', 'NIVEL N32x', 'Optický nivelačný prístroj', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/Opticky-nivelacny-pristroj-N32x.webp', '["Presnosť - 1,5 mm na 1 km","Minimálna vzdialenosť cieľa - 0.3 m","Príslušenstvo - statív + lata"]', 12, 14.76, 'fixed', 'owned', true, true, false, 'nivel-n32x-opticky-nivelacny-pristroj-profesionalny-nastroj')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_male_naradie, v_sub_male_naradie__meracia_technika, 'nivel-nl520r', 'Nivel NL520R', 'Rotačný laser s červeným lúčom', '/pictures/Katalog-PNG/Malé náradie/Zváracia a meracia technika/Nivel-NL520R.webp', '["Vysoká presnosť merania - 1,0 mm / 10 m","Dosah - 500 m","Príslušenstvo - statív + lata"]', 30, 36.9, 'fixed', 'owned', true, false, false, 'nivel-nl520r-rotacny-laser-cerveny-profesionalny-nastroj')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__exterierove, 'genie-gs3384-rt', 'GENIE GS3384 RT', 'Nožnicová plošina do 12 m', '/pictures/Katalog-PNG/Pracovné plošiny/Exteriérové/plosina-noznicova-12m-GENIE-GS3384-exterierova.webp', '["Pracovná výška - 11.94 m","Šírka/dĺžka/výška - 3.94m/2.13m/2.68m","Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__exterierove, 'genie-gs-5390-rt', 'GENIE GS 5390 RT', 'Nožnicová plošina do 18 m', '/pictures/Katalog-PNG/Pracovné plošiny/Exteriérové/plosina-noznicova-18m-GENIE-GS5390RT-exterierova.webp', '["Pracovná výška - 17.95 m","Šírka/dĺžka/výška - 2.29m/4.88m/3.15m","Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__exterierove, 'genie-z34-22', 'GENIE Z34 / 22', 'Kĺbová plošina do 13m', '/pictures/Katalog-PNG/Pracovné plošiny/Exteriérové/plosina-klbova-13m-GENIE-Z34-exterierova.webp', '["Pracovná výška - 12.52 m","Šírka/dĺžka/výška - 1.73m/5.64m/2.26m","Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__exterierove, 'genie-z4525jrt', 'GENIE Z45/25JRT', 'Kĺbová plošina do 16m', '/pictures/Katalog-PNG/Pracovné plošiny/Exteriérové/plosina-klbova-16m-GENIE-Z45-exterierova.webp', '["Pracovná výška - 16.05 m","Šírka/dĺžka/výška - 2.29m/6.65m/2.13m","Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__exterierove, 'genie-z6034', 'GENIE Z60/34', 'Kĺbová plošina do 21m', '/pictures/Katalog-PNG/Pracovné plošiny/Exteriérové/plosina-klbova-21m-GENIE-Z60-exterierova.webp', '["Pracovná výška - 20.39 m","Šírka/dĺžka/výška - 2.46m/8.15m/2.69m","Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__exterierove, 'genie-s65', 'GENIE S65', 'Teleskopická plošina do 22m', '/pictures/Katalog-PNG/Pracovné plošiny/Exteriérové/plosina-teleskopicka-22m-GENIE-S65-exterierova.webp', '["Pracovná výška - 20.30 m","Šírka/dĺžka/výška - 2.49m/8.46m/2.72m","Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__exterierove, 'genie-s85', 'GENIE S85', 'Teleskopická plošina do 28m', '/pictures/Katalog-PNG/Pracovné plošiny/Exteriérové/plosina-teleskopicka-28m-GENIE-S85-exterierova.webp', '["Pracovná výška - 27.91 m","Šírka/dĺžka/výška - 2.49m/12.37m/2.80m","Palivo - nafta"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__interierove, 'genie-gs-1932', 'GENIE GS 1932', 'Nožnicová plošina do 8 m', '/pictures/Katalog-PNG/Pracovné plošiny/Interiérové/plosina-noznicova-8m-GENIE-GS1932-interierova.webp', '["Pracovná výška - 7.60 m","Šírka/dĺžka/výška - 0.81m/1.83m/2.11m","Pohon - batérie"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__interierove, 'genie-gs-2632', 'GENIE GS 2632', 'Nožnicová plošina do 10 m', '/pictures/Katalog-PNG/Pracovné plošiny/Interiérové/plosina-noznicova-10m-GENIE-GS2632-interierova.webp', '["Pracovná výška - 9.80 m","Šírka/dĺžka/výška - 0.81m/2.44m/2.26m","Pohon - batérie"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__interierove, 'genie-gs-3246', 'GENIE GS 3246', 'Nožnicová plošina do 12 m', '/pictures/Katalog-PNG/Pracovné plošiny/Interiérové/plosina-noznicova-12m-GENIE-GS3246-interierova.webp', '["Pracovná výška - 11.50 m","Šírka/dĺžka/výška - 1.17m/2.41m/2.39m","Pohon - batérie"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__interierove, 'genie-gs-4047', 'GENIE GS 4047', 'Nožnicová plošina do 14 m', '/pictures/Katalog-PNG/Pracovné plošiny/Interiérové/plosina-noznicova-14m-GENIE-GS4047-interierova.webp', '["Pracovná výška - 13.70 m","Šírka/dĺžka/výška - 1.19m/2.80m/2.54m","Pohon - batérie"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__interierove, 'genie-z3422n', 'GENIE Z34/22N', 'Kĺbová plošina do 13m', '/pictures/Katalog-PNG/Pracovné plošiny/Interiérové/plosina-klbova-13m-GENIE-Z34-interierova.webp', '["Pracovná výška - 12.50 m","Šírka/dĺžka/výška - 1.73m/5.64m/2.00m","Pohon - batérie"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_pracovne_plosiny, v_sub_pracovne_plosiny__interierove, 'genie-z4525je', 'GENIE Z45/25JE', 'Kĺbová plošina do 16m', '/pictures/Katalog-PNG/Pracovné plošiny/Interiérové/plosina-klbova-16m-GENIE-Z45-interierova.webp', '["Pracovná výška - 15.90 m","Šírka/dĺžka/výška - 1.79m/5.56m/2.00m","Pohon - batérie"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__cestne_rezacky_frezy_a_brusky, 'norton-clipper-cs451', 'Norton Clipper CS451', 'Cestná rezačka 170cm', '/pictures/Katalog-PNG/Stredná mechanizácia/Cestné rezačky, frézy a brúsky/Norton-clipper-CS451.webp', '["Hĺbka rezu - 170cm","Hmotnosť - 112 kg","Palivo - benzín"]', 30, 36.9, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__cestne_rezacky_frezy_a_brusky, 'schwamborn-str580', 'Schwamborn STR580', 'Brúska na betón 400mm', '/pictures/Katalog-PNG/Stredná mechanizácia/Cestné rezačky, frézy a brúsky/Schwamborn-STR580.webp', '["Priemer kotúča - 400mm","Hmotnosť - 33,5 kg","Napájanie - 230 V"]', 30, 36.9, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__cestne_rezacky_frezy_a_brusky, 'schwamborn-bef201', 'Schwamborn BEF201', 'Fréza na betón 200mm', '/pictures/Katalog-PNG/Stredná mechanizácia/Cestné rezačky, frézy a brúsky/Schwamborn-BEF201.webp', '["Šírka záberu - 200mm","Hmotnosť - 74 kg","Motor/ napájanie - benzín / 230 V"]', 80, 98.4, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__elektrocentraly, 'honda-em30', 'Honda EM30', 'Elektrocentrála 3kW', '/pictures/Katalog-PNG/Stredná mechanizácia/Elektrocentrály/Honda-EM30.webp', '["Výkon - 3 kW (nominálny výkon 2,6 kW)","Hmotnosť - 32 kg","Palivo - benzín"]', 18, 22.14, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__elektrocentraly, 'honda-ect-7000', 'Honda ECT-7000', 'Elektrocentrála 7kW', '/pictures/Katalog-PNG/Stredná mechanizácia/Elektrocentrály/Honda-ECT-7000.webp', '["Výkon - 3-fázový 6,5 kW / 1-fázový 3,6 kW","Hmotnosť - 77 kg","Palivo - benzín"]', 25, 30.75, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__elektrocentraly, 'ntc-trt10', 'NTC TRT10', 'Elektrocentrála 10kW', '/pictures/Katalog-PNG/Stredná mechanizácia/Elektrocentrály/NTC-TRT10.webp', '["Výkon - 3-fázový 10 kW / 1-fázový 4 kW","Hmotnosť - 83 kg","Palivo - benzín"]', 25, 30.75, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__elektrocentraly, 'ntc-trt14', 'NTC TRT14', 'Elektrocentrála 14kW', '/pictures/Katalog-PNG/Stredná mechanizácia/Elektrocentrály/NTC-TRT14.webp', '["výkon - 3-fázový 14 kW / 1-fázový 4 kW","Hmotnosť - 114 kg","Palivo - benzín"]', 27, 33.21, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__elektrocentraly, 'atlas-copco-qes40d', 'Atlas Copco QES40d', 'Elektrocentrála 40kW - na podvozku', '/pictures/Katalog-PNG/Stredná mechanizácia/Elektrocentrály/Atlas-Copco-QES40d.webp', '["výkon - bežná dlhodobá prevádzka - 34 kW","Napájanie - 230 V 16 A/ 400 V 16 A / 400 V 63 A","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__kompresory, 'kaeser-m43', 'Kaeser M43', 'Kompresor 4.2 m³/min', '/pictures/Katalog-PNG/Stredná mechanizácia/Kompresory/Kaeser-M43.webp', '["Max. tlak - 7 bar","Hmotnosť - 730 kg","Palivo - nafta"]', 55, 67.65, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__kompresory, 'kaeser-m59', 'Kaeser M59', 'Kompresor 5.5 m³/min', '/pictures/Katalog-PNG/Stredná mechanizácia/Kompresory/Kaeser-M59.webp', '["Max. tlak - 7 bar","Hmotnosť - 740 kg","Palivo - nafta"]', 55, 67.65, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__manipulacna_technika, 'paletovaci-vozik', 'Paletovací vozík', 'Paletovací vozík', '/pictures/Katalog-PNG/Stredná mechanizácia/Manipulačná technika/Paletovaci-vozik.webp', '["Nosnosť - 2500 kg"]', 7, 8.61, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__miesacky_hladicky_betonu_a_badie, 'irbal-160l', 'Irbal 160l', 'Miešačka 160l', '/pictures/Katalog-PNG/Stredná mechanizácia/Miešačky, hladičky betónu a bádie/Irbal-160L.webp', '["Objem - 160l","Napájanie - 230 V"]', 9, 11.07, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__miesacky_hladicky_betonu_a_badie, 'kos-na-beton-badia', 'Kôš na betón - Bádia', 'Kôš na betón - Bádia', '/pictures/Katalog-PNG/Stredná mechanizácia/Miešačky, hladičky betónu a bádie/Badia.webp', '["Objem - 1000l"]', 30, 36.9, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__miesacky_hladicky_betonu_a_badie, 'husqvarna-bg-375', 'Husqvarna BG 375', 'Hladička na betón', '/pictures/Katalog-PNG/Stredná mechanizácia/Miešačky, hladičky betónu a bádie/Husqvarna-BG375.webp', '["Pracovný priemer - 900 mm","Hmotnosť - 102 kg","Palivo - benzín"]', 38, 46.74, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__stolove_pily, 'cedima-cts265', 'Cedima CTS265', 'Stolová píla na tehlu', '/pictures/Katalog-PNG/Stredná mechanizácia/Stolové píly/CedimaCTS265.webp', '["Hĺbka rezu - 265mm","Hmotnosť - 200 kg","Napájanie - 400 V"]', 29, 35.67, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__stolove_pily, 'rubi-dc-250', 'Rubi DC-250', 'Portálová píla na dlažbu', '/pictures/Katalog-PNG/Stredná mechanizácia/Stolové píly/RUBI-DC250.webp', '["Max. dĺžka rezu - 1205mm","Hĺbka rezu na 1ťah / 2ťah - 61mm / 90mm","Napájanie - 230 V"]', 25, 30.75, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__stolove_pily, 'cedima-cts57', 'Cedima CTS57', 'Stolová píla na zámkovú dlažbu', '/pictures/Katalog-PNG/Stredná mechanizácia/Stolové píly/Cedima-CT57.webp', '["Hĺbka rezu - 125mm","Max. dĺžka rezu - 600mm","Napájanie - 230 V"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__stolove_pily, 'hospodarsky-cirkular', 'Hospodársky cirkulár', 'Hospodársky cirkulár', '/pictures/Katalog-PNG/Stredná mechanizácia/Stolové píly/Hospodarska-pila.webp', '["Priemer kotúča - 600mm","Hmotnosť - 170 kg","Napájanie - 16A - 400V"]', 17, 20.91, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'ntc-nt65-n', 'NTC NT65-N', 'Vibračná noha 64kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/NTC-NT65N.webp', '["Odstredivá sila - 12 kN","Frekvencia úderu - 12 Hz","Palivo - benzín"]', 29, 35.67, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'bomag-bp-10-35', 'Bomag BP 10-35', 'Vibračná doska jednosmerná  65kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/Bomag-BP-10-35.webp', '["Rozmer dosky š/d - 350 x 532 mm","Hmotnosť - 65 kg","Palivo - benzín"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'ntc-vd18', 'NTC VD18', 'Vibračná doska jednosmerná  95kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/NTC-VD18.webp', '["Rozmer dosky š/d - 450  x 565 mm","Hmotnosť - 95 kg","Palivo - benzín"]', 20, 24.6, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'ntc-vd45022', 'NTC VD450/22', 'Vibračná doska jednosmerná 150kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/NTC-VD450-22.webp', '["Rozmer dosky š/d - 450 x 580 mm","Hmotnosť - 150 kg","Palivo - benzín"]', 23, 28.29, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'swepac-fb-160', 'Swepac FB 160', 'Vibračná doska reverzná 160kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/Swepac-FB160.webp', '["Rozmer dosky š/d - 450 x 550 mm","Hmotnosť - 160 kg","Palivo - benzín"]', 25, 30.75, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'swepac-fb-265', 'Swepac FB 265', 'Vibračná doska reverzná 265kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/Swepac-FB265.webp', '["Rozmer dosky š/d - 550 x 790 mm","Hmotnosť - 265 kg","Palivo - benzín"]', 33, 40.59, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'atlas-copco-lg400', 'Atlas Copco LG400', 'Vibračná doska reverzná 400kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/Atlas-Copco-LG400.webp', '["Rozmer dosky š/d - 650 x 967 mm","Hmotnosť - 400 kg","Palivo - benzín"]', 40, 49.2, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_stredna_mechanizacia, v_sub_stredna_mechanizacia__vibracne_dosky_a_nohy, 'swepac-fb-510', 'Swepac FB 510', 'Vibračná doska reverzná 500kg', '/pictures/Katalog-PNG/Stredná mechanizácia/Vibračné dosky a nohy/Swepac-FB510.webp', '["5.5 - 700 x 1080 mm","Hmotnosť - 500 kg","Palivo - nafta"]', 50, 61.5, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__dumpre, 'dumper-15-t', 'Dumper 1.5 t', 'Dumper 1.5 t', '/pictures/Katalog-PNG/Ťažká technika/Dumpre/dumper1500.webp', '["Hmotnosť - 1.5 t","Palivo - nafta"]', 85, 104.55, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__dumpre, 'dumper-3-t', 'Dumper 3 t', 'Dumper 3 t', '/pictures/Katalog-PNG/Ťažká technika/Dumpre/dumper3000.webp', '["Hmotnosť - 3 t","Palivo - nafta"]', 95, 116.85, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__kolesove_rypadla_a_nakladace, 'kolesove-rypadlo-16-t', 'Kolesové rýpadlo 16 t', 'Kolesové rýpadlo 16 t', '/pictures/Katalog-PNG/Ťažká technika/Kolesové rýpadla a nakladače/kolesove-rypadlo16t.webp', '["Hĺbkový dosah/Dosah kopania - 4,93 m / 8,40 mm","Hmotnosť - 16 t","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__manipulatory, 'jcb-525-60', 'JCB 525 - 60', 'Manipulátor pevný 6 m', '/pictures/Katalog-PNG/Ťažká technika/Manipulátory/Manipulator-6m-jcb.webp', '["Nosnosť - 2500 kg","Hmotnosť - 5230 kg","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__manipulatory, 'manitou-mt1840', 'Manitou MT1840', 'Manipulátor pevný 18 m', '/pictures/Katalog-PNG/Ťažká technika/Manipulátory/manipulator-manitou-mt1840.webp', '["Nosnosť - 4000 kg","Hmotnosť - 11 800 kg","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__manipulatory, 'manitou-mt1440', 'Manitou MT1440', 'Manipulátor pevný 14 m', '/pictures/Katalog-PNG/Ťažká technika/Manipulátory/manipulator-manitou-mt1440.webp', '["Nosnosť - 4000 kg","Hmotnosť - 10 900 kg","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_mini_rypadla, 'mini-rypadlo-1t', 'Mini-rýpadlo 1t', 'Mini-rýpadlo 1t', '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/mini-rypadlo-1000.webp', '["Hĺbkový dosah - 1.5m","Hmotnosť - 1 t","Palivo - nafta"]', 75, 92.25, 'fixed', 'owned', true, false, false, 'ako-vybrat-spravne-minirypadlo')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_mini_rypadla, 'mini-rypadlo-18-t', 'Mini-rýpadlo 1.8 t', 'Mini-rýpadlo 1.8 t', '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/mini-rypadlo-1800.webp', '["Hĺbkový dosah - 2 m","Hmotnosť - 1.8 t","Palivo - nafta"]', 90, 110.7, 'fixed', 'owned', true, false, false, 'ako-vybrat-spravne-minirypadlo')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_mini_rypadla, 'mini-rypadlo-26-t', 'Mini-rýpadlo 2.6 t', 'Mini-rýpadlo 2.6 t', '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/mini-rypadlo-2600.webp', '["Hĺbkový dosah - 2.5m","Hmotnosť - 2.6 t","Palivo - nafta"]', 90, 110.7, 'fixed', 'owned', true, false, false, 'ako-vybrat-spravne-minirypadlo')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_mini_rypadla, 'mini-rypadlo-35-t', 'Mini-rýpadlo 3.5 t', 'Mini-rýpadlo 3.5 t', '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/mini-rypadlo-3500.webp', '["Hĺbkový dosah - 3 m","Hmotnosť - 3 t","Palivo - nafta"]', 110, 135.3, 'fixed', 'owned', true, false, false, 'ako-vybrat-spravne-minirypadlo')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_tazke_rypadla, 'pasove-rypadlo-14-t', 'Pásové rýpadlo 14 t', 'Pásové rýpadlo 14 t', '/pictures/Katalog-PNG/Ťažká technika/Pásové ťažké rýpadlá/pasove-rypadlo-14t.webp', '["Hĺbkový dosah/Dosah kopania - 5.48 m / 8.18m","Hmotnosť - 14 t","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_tazke_rypadla, 'pasove-rypadlo-21-t', 'Pásové rýpadlo 21 t', 'Pásové rýpadlo 21 t', '/pictures/Katalog-PNG/Ťažká technika/Pásové ťažké rýpadlá/pasove-rypadlo-21t.webp', '["maximálna hĺbka kolmé steny / rovné dno - 5 980 mm / 6 370 mm","Hmotnosť - 21 t","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__smykom_riadene_nakladace, 'smykom-riadeny-nakladac', 'Šmykom riadený nakladač', 'Šmykom riadený nakladač', '/pictures/Katalog-PNG/Ťažká technika/Šmykom riadené nakladače/smykom-riadeny-nakladac-3t.webp', '["Šírka - 1700mm","Hmotnosť - 3 t","Palivo - nafta"]', 90, 110.7, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__valce, 'hamm-3414-ht', 'Hamm 3414 HT', 'Valec 14 t', '/pictures/Katalog-PNG/Ťažká technika/Valce/valec-14000-hamm.webp', '["Šírka bubna - 2140 mm","Celková dĺžka - 5705 mm","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__valce, 'hamm-hd8-vv', 'Hamm HD8 VV', 'Valec 1,5 t', '/pictures/Katalog-PNG/Ťažká technika/Valce/valec-1500-hamm.webp', '["Šírka bubna - 800 mm","Celková dĺžka - 2295 mm","Palivo - nafta"]', 85, 104.55, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__valce, 'hamm-hd12-vv', 'Hamm HD12 VV', 'Valec 2.6 t', '/pictures/Katalog-PNG/Ťažká technika/Valce/valec-2600-hamm.webp', '["Šírka bubna - 1200 mm","Celková dĺžka - 2530 mm","Palivo - nafta"]', 95, 116.85, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__valce, 'wacker-neuson-rt82-sc2', 'Wacker Neuson RT82-SC2', 'Vibračný valec priekopový 1.5 t', '/pictures/Katalog-PNG/Ťažká technika/Valce/valec-priekopovy1500-wacker.webp', '["Šírka bubna - 800 mm","Celková dĺžka - 1900 mm","Palivo - nafta"]', 85, 104.55, 'fixed', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__vysokozdvizne_voziky, 'doosan-d35c-7', 'Doosan D35C-7', 'Vysokozdvižný vozík do 3500kg', '/pictures/Katalog-PNG/Ťažká technika/Vysokozdvižné vozíky/vysokozdvizny-vozik-3500.webp', '["Nosnosť - 3500 kg","Hmotnosť - 5300 kg","Palivo - nafta"]', 0, 0, 'negotiable', 'owned', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__kancelarske_kontajnery_a_vratnice, 'kontajner-kancelarsky-20', 'Kontajner kancelársky 20´´', 'Kontajner kancelársky 20´´', '/pictures/Katalog-PNG/Vybavenie staveniska/Kancelárske kontajnery a vrátnice/kontajner-kancelarsky-20.webp', '["Šírka/dĺžka/výška - 2.5m/6m/2.6m","Napájanie - 400 V / 5P / 32 A"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__kancelarske_kontajnery_a_vratnice, 'kontajner-kancelarsky-10-vratnica', 'Kontajner kancelársky 10´´ Vrátnica', 'Kontajner kancelársky 10´´ Vrátnica', '/pictures/Katalog-PNG/Vybavenie staveniska/Kancelárske kontajnery a vrátnice/kontajner-kancelarsky-10-vratnica.webp', '["Šírka/dĺžka/výška - 2.5m/3m/2.5m","Napájanie - 400 V / 5P / 32 A"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__mobilne_oplotenia_a_zabrany, 'standard', 'Štandard', 'Plot priehľadný 3,5m', '/pictures/Katalog-PNG/Vybavenie staveniska/Mobilné oplotenia a zábrany/plot-priehladny-3500.webp', '["Dĺžka/výška - 3.5m/2m"]', 1, 0, 'fixed', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__mobilne_oplotenia_a_zabrany, 'standard-1', 'Štandard 1', 'Plot plný 2,5m', '/pictures/Katalog-PNG/Vybavenie staveniska/Mobilné oplotenia a zábrany/plot-plny-2500.webp', '["Dĺžka/výška - 2.5m/2m","Váha - 26kg"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__mobilne_oplotenia_a_zabrany, 'zabrana-samostojaca-25m', 'Zábrana samostojaca 2,5m', 'Zábrana samostojaca 2,5m', '/pictures/Katalog-PNG/Vybavenie staveniska/Mobilné oplotenia a zábrany/zabrana-stajostojaca-2500.webp', '["Dĺžka/výška - 2.5m/1m","Váha - 10kg"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__mobilne_toalety, 'wc-klasik', 'WC Klasik', 'Mobilná toaleta Klasik', '/pictures/Katalog-PNG/Vybavenie staveniska/Mobilné toalety/mobilna-toaleta-klasik.webp', '["Výška/šírka/hĺbka - 2.2m/1.1m/1.2m","Váha - 80kg","Objem nádrže - 250 l"]', 80, 0, 'fixed', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__mobilne_toalety, 'wc-vip', 'WC VIP', 'Mobilná toaleta VIP', '/pictures/Katalog-PNG/Vybavenie staveniska/Mobilné toalety/mobilna-toaleta-vip.webp', '["Výška/šírka/hĺbka - 2.2m/1.1m/1.2m","Príslušenstvo - Umývadlo, pisoár","Objem nádrže - 250 l"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__mobilne_toalety, 'wc-imob', 'WC Imob', 'Mobilná toaleta pre imobilných', '/pictures/Katalog-PNG/Vybavenie staveniska/Mobilné toalety/mobilna-toaleta-pre-imobilnych.webp', '["Výška/šírka/hĺbka - 2.2m/1.6m/2.2m","Váha - 126kg","Objem nádrže - 250 l"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__mobilne_toalety, 'mobilny-pisoar', 'Mobilný pisoár', 'Mobilný pisoár', '/pictures/Katalog-PNG/Vybavenie staveniska/Mobilné toalety/mobilny-pisoar.webp', '["Počet - pre 4 mužov","Objem nádrže - 400 l"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__sanitarne_kontajnery, 'kontajner-sanitarny-20', 'Kontajner sanitárny 20´´', 'Kontajner sanitárny 20´´', '/pictures/Katalog-PNG/Vybavenie staveniska/Sanitárne kontajnery/kontajner-sanitarny-20.webp', '["Šírka/dĺžka/výška - 2.5m/6m/2.6m","Napájanie - 400 V / 5P / 32 A"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_vybavenie_staveniska, v_sub_vybavenie_staveniska__skladove_kontajnery, 'kontajner-skladovy-20', 'Kontajner skladový 20´´', 'Kontajner skladový 20´´', '/pictures/Katalog-PNG/Vybavenie staveniska/Skladové kontajnery/kontajner-skladovy-20.webp', '["Šírka/dĺžka/výška - 2.5m/6m/2.6m"]', 0, 0, 'negotiable', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_zahradna_technika, v_sub_zahradna_technika__kosacky_na_travu, 'makita-aku-dlm382pt2', 'Makita AKU DLM382PT2', 'Kosačka AKU', '/pictures/Katalog-PNG/Záhradná technika/Kosačky na trávu/kosacka-makita-aku-dlm.webp', '["Šírka záberu - 38 cm","Výška kosenia - 20 - 75 mm","Napájanie - 2x 5.0 Ah"]', 17, 20.91, 'fixed', 'partner', true, false, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_zahradna_technika, v_sub_zahradna_technika__krovinorezy_a_motorove_pily, 'makita-uc3541a', 'Makita UC3541A', 'Reťazová elektrická píla', '/pictures/Katalog-PNG/Záhradná technika/Krovinorezy a motorové píly/makita-retazova-pila-uc3541a.webp', '["Dĺžka rezu - 35 cm","Delenie pílovej reťaze - 3/8","Hmotnosť - 4,7 kg"]', 10, 12.3, 'fixed', 'partner', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_zahradna_technika, v_sub_zahradna_technika__krovinorezy_a_motorove_pily, 'makita-dur190uzx3', 'Makita DUR190UZX3', 'Krovinorez AKU', '/pictures/Katalog-PNG/Záhradná technika/Krovinorezy a motorové píly/makita-krovinorez-DUR190UZ.webp', '["Šírka záberu nôž kov/nôž plast/žacia hlava - 230 / 230 / 300 mm","Rozmery (D x Š x V) - 1 836 x 610 x 473 mm","príslušenstvo - 2 x batéria (5,0Ah), rýchlonabíjačka"]', 20, 24.6, 'fixed', 'partner', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_zahradna_technika, v_sub_zahradna_technika__rotavatory, 'riwall-pro-rpt-8556r', 'RIWALL PRO RPT 8556 R', 'Kultivátor s benzínovým motorom', '/pictures/Katalog-PNG/Záhradná technika/Rotavátory/RIWALL-PRO-RPT-8556R-Kultivator.webp', '["Nastaviteľný záber - 55/85 cm","Výkon - 4.1 kW","Hĺbka - 35 cm"]', 25, 30.75, 'fixed', 'partner', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Accessories (15 items)
-- ============================================================
INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-1-sek-', 'Sekáč - špicatý', 'Sekáč', '["špicatý"]', 2, 2.46, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-2-sek-', 'Sekáč - plochý', 'Sekáč', '["plochý"]', 2, 2.46, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-3-vrt-ky', 'Vrtáky - priemer x 0.1€', 'Vrtáky', '["priemer x 0.1€"]', 5, 6.15, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-4-kot-diamantov-', 'Kotúč diamantový - priemer 150mm, cena/mm', 'Kotúč diamantový', '["priemer 150mm, cena/mm"]', 5, 6.15, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-5-kot-diamantov-', 'Kotúč diamantový - priemer 230mm, cena/mm', 'Kotúč diamantový', '["priemer 230mm, cena/mm"]', 5, 6.15, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-6-kot-diamantov-', 'Kotúč diamantový - priemer 350mm, cena/mm', 'Kotúč diamantový', '["priemer 350mm, cena/mm"]', 25, 30.75, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-7-kot-diamantov-', 'Kotúč diamantový - priemer 400mm, cena/mm', 'Kotúč diamantový', '["priemer 400mm, cena/mm"]', 30, 36.9, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-8-kot-diamantov-', 'Kotúč diamantový - priemer 450mm, cena/mm', 'Kotúč diamantový', '["priemer 450mm, cena/mm"]', 35, 43.05, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-9-kot-br-sny', 'Kotúč brúsny - priemer 125mm, cena/mm', 'Kotúč brúsny', '["priemer 125mm, cena/mm"]', 10, 12.3, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-10-p-lov-list', 'Pílový list - chvostová píla', 'Pílový list', '["chvostová píla"]', 5, 6.15, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-11-bubon', 'Bubon - 230V, 50m', 'Bubon', '["230V, 50m"]', 3, 3.69, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-12-tlmiaca-guma', 'Tlmiaca guma - cena/ks', 'Tlmiaca guma', '["cena/ks"]', 3, 3.69, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-13-hadica', 'Hadica - k čerpadlu', 'Hadica', '["k čerpadlu"]', 3, 3.69, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-14-hadica', 'Hadica - ku kompresoru', 'Hadica', '["ku kompresoru"]', 3, 3.69, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, 'accessory-15-elektr-da', 'Elektróda - cena/ks', 'Elektróda', '["cena/ks"]', 0.2, 0.246, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;

-- New products (2026-03-29)
INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_mini_rypadla, 'wacker-neuson-et18', 'Wacker Neuson ET18', 'Mini-rýpadlo 2t', '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/Wacker_neusonET18.webp', '["Príslušenstvo v cene - Lopata 300 / 500 / svahovacia hydr. 1050 mm","Rozmery (D x Š x V) - 3800 / 990 - 1300 / 2390 mm","Hĺbkový dosah / Výsypná výška - 2295 / 2720 mm"]', 95, 116.85, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_mini_rypadla, 'jcb-19c-i', 'JCB 19C-I', 'Mini-rýpadlo 2t', '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/JCB-19C-I.webp', '["Príslušenstvo v cene - Lopata 300 / 500 / svahovacia hydr. 1050 mm","Rozmery (D x Š x V) - 3860 / 980 - 1330 / 2324 mm","Hĺbkový dosah / Výsypná výška - 2426 / 2637 mm * podľa násady"]', 95, 116.85, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_tazka_technika, v_sub_tazka_technika__pasove_mini_rypadla, 'wacker-neuson-et24', 'Wacker Neuson ET24', 'Mini-rýpadlo 2t', '/pictures/Katalog-PNG/Ťažká technika/Pásové mini-rýpadlá/Wacker_neusonET24.webp', '["Príslušenstvo v cene - Lopata 300 / 500 / svahovacia hydr. 1300 mm","Rozmery (D x Š x V) - 4000 / 1400 / 2400 mm","Hĺbkový dosah / Výsypná výška - 2600 / 2800 mm"]', 95, 116.85, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (v_cat_zahradna_technika, v_sub_zahradna_technika__drvice, 'makita-ud2500', 'Makita UD2500', 'Elektrický drvič na konáre', '/pictures/Katalog-PNG/Záhradná technika/Drviče/UD2500.webp', '["Max. priemer konárov - 45 mm","Objem zbernej nádoby - 67 l","Hmotnosť - 29,7 kg"]', 20, 24.6, 'fixed', 'owned', true, true, false, NULL)
ON CONFLICT (slug) DO NOTHING;

END;
$$;
