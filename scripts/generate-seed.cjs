/**
 * Generate seed.sql from existing catalog data
 * Run: node scripts/generate-seed.cjs
 */
const fs = require('fs');
const path = require('path');

// Read and eval the JS data files
const categoriesCode = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'categories.js'), 'utf-8'
);
const productsCode = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'products.js'), 'utf-8'
);
const accessoriesCode = fs.readFileSync(
  path.join(__dirname, '..', 'src', 'data', 'accessories.js'), 'utf-8'
);

// Simple extraction: remove export and eval
function extractArray(code, varName) {
  // Remove 'export const varName =' and get the array
  const cleaned = code
    .replace(/export\s+const\s+\w+\s*=\s*/, 'return ')
    .replace(/\/\/.*$/gm, '') // remove single-line comments
    .replace(/,(\s*[}\]])/g, '$1'); // remove trailing commas
  try {
    return new Function(cleaned)();
  } catch (e) {
    console.error(`Failed to parse ${varName}:`, e.message);
    // Fallback: try regex extraction
    return null;
  }
}

function parseJsFile(code) {
  // Strip comments
  let cleaned = code.replace(/\/\/.*$/gm, '');
  // Extract just the first array: everything between first [ and its matching ];
  const start = cleaned.indexOf('[');
  let depth = 0;
  let end = start;
  for (let i = start; i < cleaned.length; i++) {
    if (cleaned[i] === '[') depth++;
    if (cleaned[i] === ']') depth--;
    if (depth === 0) { end = i + 1; break; }
  }
  const arrayStr = cleaned.slice(start, end);
  const tmpPath = path.join(__dirname, '_tmp_data.cjs');
  fs.writeFileSync(tmpPath, 'module.exports = ' + arrayStr, 'utf-8');
  try {
    delete require.cache[require.resolve(tmpPath)];
    return require(tmpPath);
  } finally {
    try { fs.unlinkSync(tmpPath); } catch(e) {}
  }
}

const categories = parseJsFile(categoriesCode);
const products = parseJsFile(productsCode);
const accessories = parseJsFile(accessoriesCode);

console.log(`Loaded: ${categories.length} categories, ${products.length} products, ${accessories.length} accessories`);

// Ownership mapping
const OWNED_CATEGORIES = ['male-naradie', 'stredna-mechanizacia', 'tazka-technika'];
function ownershipType(catSlug) {
  return OWNED_CATEGORIES.includes(catSlug) ? 'owned' : 'partner';
}

// Escape single quotes for SQL
function esc(str) {
  if (!str) return '';
  return str.replace(/'/g, "''");
}

// Parse price with VAT from price string like '8.61€/deň'
function parseVatPrice(priceStr) {
  if (!priceStr) return 0;
  const match = priceStr.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

// Build SQL
let sql = `-- ============================================================
-- Royal Stroje - Seed Data
-- Auto-generated from src/data/ on ${new Date().toISOString().split('T')[0]}
-- Categories: ${categories.length}, Products: ${products.length}, Accessories: ${accessories.length}
-- ============================================================

DO $$
DECLARE
`;

// Declare variables for category and subcategory IDs
for (const cat of categories) {
  sql += `  v_cat_${cat.id.replace(/-/g, '_')} UUID;\n`;
  for (const sub of cat.subcategories) {
    if (sub.id === 'all') continue;
    sql += `  v_sub_${cat.id.replace(/-/g, '_')}__${sub.id.replace(/-/g, '_')} UUID;\n`;
  }
}

sql += `BEGIN\n\n`;

// Insert categories
sql += `-- ============================================================\n`;
sql += `-- Categories\n`;
sql += `-- ============================================================\n`;
for (let i = 0; i < categories.length; i++) {
  const cat = categories[i];
  const ownership = ownershipType(cat.id);
  const badge = cat.badge ? `'${esc(cat.badge)}'` : 'NULL';
  sql += `INSERT INTO equipment_categories (name, slug, description, ownership_type, badge, sort_order)
VALUES ('${esc(cat.name)}', '${esc(cat.slug)}', '${esc(cat.description)}', '${ownership}', ${badge}, ${i * 10})
ON CONFLICT (slug) DO NOTHING
RETURNING id INTO v_cat_${cat.id.replace(/-/g, '_')};\n\n`;

  // If ON CONFLICT hits, we need to select the existing ID
  sql += `IF v_cat_${cat.id.replace(/-/g, '_')} IS NULL THEN
  SELECT id INTO v_cat_${cat.id.replace(/-/g, '_')} FROM equipment_categories WHERE slug = '${esc(cat.slug)}';
END IF;\n\n`;
}

// Insert subcategories
sql += `-- ============================================================\n`;
sql += `-- Subcategories\n`;
sql += `-- ============================================================\n`;
for (const cat of categories) {
  const catVar = `v_cat_${cat.id.replace(/-/g, '_')}`;
  let sortIdx = 0;
  for (const sub of cat.subcategories) {
    if (sub.id === 'all') continue;
    const subVar = `v_sub_${cat.id.replace(/-/g, '_')}__${sub.id.replace(/-/g, '_')}`;
    sql += `INSERT INTO equipment_subcategories (category_id, name, slug, sort_order)
VALUES (${catVar}, '${esc(sub.name)}', '${esc(sub.slug)}', ${sortIdx * 10})
ON CONFLICT (category_id, slug) DO NOTHING
RETURNING id INTO ${subVar};\n`;
    sql += `IF ${subVar} IS NULL THEN
  SELECT id INTO ${subVar} FROM equipment_subcategories WHERE category_id = ${catVar} AND slug = '${esc(sub.slug)}';
END IF;\n\n`;
    sortIdx++;
  }
}

// Insert products
sql += `-- ============================================================\n`;
sql += `-- Equipment (${products.length} items)\n`;
sql += `-- ============================================================\n`;
for (const prod of products) {
  const catVar = `v_cat_${prod.category.replace(/-/g, '_')}`;
  const subVar = `v_sub_${prod.category.replace(/-/g, '_')}__${prod.subcategory.replace(/-/g, '_')}`;
  const ownership = ownershipType(prod.category);
  const vatPrice = parseVatPrice(prod.price);
  const basePrice = prod.pricePerDay || 0;
  const pricingType = (basePrice === 0 || prod.price === 'NA požiadanie') ? 'negotiable' : 'fixed';
  const features = JSON.stringify(prod.features || []);
  const blogSlug = prod.blogArticleSlug ? `'${esc(prod.blogArticleSlug)}'` : 'NULL';

  sql += `INSERT INTO equipment (category_id, subcategory_id, slug, name, description, image_path, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock, is_new, is_popular, blog_article_slug)
VALUES (${catVar}, ${subVar}, '${esc(prod.id)}', '${esc(prod.name)}', '${esc(prod.description)}', '${esc(prod.image)}', '${esc(JSON.stringify(prod.features || []))}', ${basePrice}, ${vatPrice}, '${pricingType}', '${ownership}', ${prod.inStock}, ${prod.isNew}, ${prod.isPopular}, ${blogSlug})
ON CONFLICT (slug) DO NOTHING;\n\n`;
}

// Insert accessories as equipment in 'prislusenstvo' subcategory
sql += `-- ============================================================\n`;
sql += `-- Accessories (${accessories.length} items)\n`;
sql += `-- ============================================================\n`;
for (let i = 0; i < accessories.length; i++) {
  const acc = accessories[i];
  const slug = `accessory-${i + 1}-${acc.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}`;
  const name = acc.parameter ? `${acc.name} - ${acc.parameter}` : acc.name;
  const features = JSON.stringify([acc.parameter].filter(Boolean));

  sql += `INSERT INTO equipment (category_id, subcategory_id, slug, name, description, features, daily_rate_base, daily_rate_vat, pricing_type, ownership_type, in_stock)
VALUES (v_cat_male_naradie, v_sub_male_naradie__prislusenstvo, '${esc(slug)}', '${esc(name)}', '${esc(acc.name)}', '${esc(features)}', ${acc.pricePerDay}, ${acc.priceWithVat}, 'fixed', 'owned', true)
ON CONFLICT (slug) DO NOTHING;\n\n`;
}

sql += `END;\n$$;\n`;

// Write output
const outPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
fs.writeFileSync(outPath, sql, 'utf-8');
console.log(`\nSeed SQL written to ${outPath}`);
console.log(`Total statements: ${categories.length} categories, ${categories.reduce((acc, c) => acc + c.subcategories.filter(s => s.id !== 'all').length, 0)} subcategories, ${products.length} products, ${accessories.length} accessories`);
