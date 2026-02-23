const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

console.log('🔍 ANALÝZA KATALOG MVP CSV A PNG ŠTRUKTÚRY\n');
console.log('='.repeat(80) + '\n');

// Načítaj CSV
const csvPath = path.join(__dirname, 'katalogMVP.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

const parsed = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  quoteChar: '"',
  delimiter: ',',
});

console.log(`✅ Načítaných ${parsed.data.length} produktov\n`);

// Zoskup podľa kategórií a podkategórií
const categoryMap = new Map();

parsed.data.forEach((row, idx) => {
  const kategoria = row['Kategoria']?.trim();
  const podkategoria = row['Podkategoria']?.trim();
  const nazovObrazka = row['Nazov obrazka']?.trim();
  const nazovProduktu = row['Nazov produktu']?.trim();

  if (!kategoria || !podkategoria) {
    console.log(`⚠️  Riadok ${idx + 2}: Chýba kategória/podkategória`);
    return;
  }

  if (!categoryMap.has(kategoria)) {
    categoryMap.set(kategoria, new Map());
  }

  const subcatMap = categoryMap.get(kategoria);
  if (!subcatMap.has(podkategoria)) {
    subcatMap.set(podkategoria, []);
  }

  subcatMap.get(podkategoria).push({
    nazov: nazovProduktu,
    obrazok: nazovObrazka,
    riadok: idx + 2
  });
});

// Vypíš štatistiku kategórií
console.log('📊 KATEGÓRIE A PODKATEGÓRIE:\n');
let totalSubcategories = 0;

categoryMap.forEach((subcats, katName) => {
  const subcatCount = subcats.size;
  totalSubcategories += subcatCount;

  let totalProducts = 0;
  subcats.forEach(products => {
    totalProducts += products.length;
  });

  console.log(`📁 ${katName} (${subcatCount} podkategórií, ${totalProducts} produktov)`);

  subcats.forEach((products, subcatName) => {
    console.log(`   └─ ${subcatName}: ${products.length} produktov`);
  });
  console.log();
});

console.log(`\n✅ Celkovo: ${categoryMap.size} kategórií, ${totalSubcategories} podkategórií\n`);
console.log('='.repeat(80) + '\n');

// Skontroluj PNG štruktúru
console.log('🖼️  KONTROLA PNG OBRÁZKOV:\n');

const pngBasePath = path.join(__dirname, 'public', 'pictures', 'Katalog-PNG');
const problems = [];
const foundImages = [];
const missingImages = [];

categoryMap.forEach((subcats, katName) => {
  subcats.forEach((products, subcatName) => {
    products.forEach(product => {
      if (!product.obrazok) {
        problems.push(`❌ Riadok ${product.riadok}: "${product.nazov}" - chýba názov obrázka v CSV`);
        return;
      }

      // Možné cesty k obrázku
      const possiblePaths = [
        path.join(pngBasePath, katName, subcatName, product.obrazok),
        path.join(pngBasePath, katName, product.obrazok),
      ];

      let found = false;
      for (const imgPath of possiblePaths) {
        if (fs.existsSync(imgPath)) {
          foundImages.push({
            product: product.nazov,
            path: imgPath.replace(__dirname, '.')
          });
          found = true;
          break;
        }
      }

      if (!found) {
        missingImages.push({
          product: product.nazov,
          obrazok: product.obrazok,
          kategoria: katName,
          podkategoria: subcatName,
          riadok: product.riadok
        });
      }
    });
  });
});

// Vypíš problémy
if (problems.length > 0) {
  console.log('⚠️  PROBLÉMY V CSV:\n');
  problems.forEach(p => console.log(p));
  console.log();
}

// Vypíš chybajúce obrázky
if (missingImages.length > 0) {
  console.log(`❌ CHYBAJÚCE OBRÁZKY (${missingImages.length}):\n`);
  missingImages.forEach(m => {
    console.log(`   Riadok ${m.riadok}: "${m.product}"`);
    console.log(`      Kategória: ${m.kategoria} > ${m.podkategoria}`);
    console.log(`      Hľadaný súbor: ${m.obrazok}`);
    console.log();
  });
}

console.log('='.repeat(80) + '\n');
console.log('📈 ŠTATISTIKA:\n');
console.log(`✅ Nájdených obrázkov: ${foundImages.length}`);
console.log(`❌ Chybajúcich obrázkov: ${missingImages.length}`);
console.log(`⚠️  Problémov v CSV: ${problems.length}`);

if (missingImages.length === 0 && problems.length === 0) {
  console.log('\n🎉 Všetko je v poriadku! Môžeme aktualizovať katalóg.');
} else {
  console.log('\n⚠️  Nájdené problémy - odporúčam opraviť pred aktualizáciou katalógu.');
}

console.log('\n✨ Analýza dokončená!');
