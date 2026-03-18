import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Funkcia na normalizáciu textu pre porovnávanie
function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/\s+/g, '') // odstráň všetky medzery
    .replace(/[-_,\.\/]/g, '') // odstráň pomlčky, podčiarkovníky, čiarky, bodky, lomky
    .trim();
}

// Funkcia na extrakciu názvu modelu z typu produktu
function extractModel(typeProduktu) {
  if (!typeProduktu) return '';
  // Odstráň prebytočné medzery
  return typeProduktu.trim();
}

// Funkcia na nájdenie najlepšej zhody obrázka
function findImageMatch(typeProduktu, nazovProduktu, allImages) {
  const model = extractModel(typeProduktu);
  const normalizedModel = normalizeText(model);
  const normalizedNazov = normalizeText(nazovProduktu);

  let bestMatch = null;
  let bestScore = 0;

  for (const imgPath of allImages) {
    const fileName = path.basename(imgPath, path.extname(imgPath));
    const normalizedFileName = normalizeText(fileName);

    let score = 0;

    // Presná zhoda s modelom (najvyššie skóre)
    if (normalizedFileName === normalizedModel) {
      score = 100;
    }
    // Model je súčasťou názvu súboru
    else if (normalizedModel && normalizedFileName.includes(normalizedModel)) {
      score = 90;
    }
    // Názov súboru je súčasťou modelu
    else if (normalizedModel && normalizedModel.includes(normalizedFileName)) {
      score = 85;
    }
    // Zhoda s názvom produktu
    else if (normalizedFileName === normalizedNazov) {
      score = 80;
    }
    // Názov produktu obsahuje názov súboru
    else if (normalizedNazov.includes(normalizedFileName) && normalizedFileName.length > 3) {
      score = 70;
    }
    // Názov súboru obsahuje názov produktu
    else if (normalizedFileName.includes(normalizedNazov) && normalizedNazov.length > 3) {
      score = 65;
    }

    // Podpora pre konkrétne prípady
    // Lešenie - rozlíš medzi 0.7m a 1.3m
    if (nazovProduktu.includes('0.7m') && normalizedFileName.includes('07m')) {
      score = 95;
    }
    if (nazovProduktu.includes('1.3m') && normalizedFileName.includes('13m')) {
      score = 95;
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = imgPath;
    }
  }

  // Vráť len ak je skóre aspoň 60
  return bestScore >= 60 ? bestMatch : null;
}

// Funkcia na získanie všetkých obrázkov z pictures adresára
function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImages(filePath, fileList);
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) {
      // Uložíme relatívnu cestu od public/
      const relativePath = path.relative(path.join(__dirname, 'public'), filePath);
      fileList.push('/' + relativePath.replace(/\\/g, '/'));
    }
  });

  return fileList;
}

// Hlavná funkcia
async function updateCSVWithImages() {
  console.log('🔍 Hľadám obrázky...');

  const picturesDir = path.join(__dirname, 'public', 'pictures');
  const allImages = getAllImages(picturesDir);

  console.log(`✅ Našiel som ${allImages.length} obrázkov\n`);

  // Prečítaj CSV
  const csvPath = path.join(__dirname, 'Royal Stroje - pozicovna  - Sheet1.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const lines = csvContent.split('\n');

  // Rozober riadky
  const updatedLines = [];
  const header = lines[0];
  updatedLines.push(header);

  let matchedCount = 0;
  let unmatchedProducts = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Parsuj CSV riadok (zohľadni čiarky v úvodzovkách)
    const columns = [];
    let current = '';
    let inQuotes = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        columns.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    columns.push(current);

    const nazovProduktu = columns[0]?.replace(/^"(.*)"$/, '$1') || '';
    const typProduktu = columns[1]?.replace(/^"(.*)"$/, '$1') || '';

    // Nájdi obrázok
    const imagePath = findImageMatch(typProduktu, nazovProduktu, allImages);

    if (imagePath) {
      console.log(`✅ ${typProduktu || nazovProduktu} → ${path.basename(imagePath)}`);
      matchedCount++;

      // Aktualizuj stĺpec 13 (nazov obrazka)
      columns[12] = imagePath;
    } else {
      console.log(`❌ Nenašiel som obrázok pre: ${typProduktu || nazovProduktu}`);
      unmatchedProducts.push(nazovProduktu);
      columns[12] = '/placeholder-product.webp';
    }

    // Znova zober riadok
    const updatedLine = columns.join(',');
    updatedLines.push(updatedLine);
  }

  // Ulož aktualizovaný CSV
  const outputPath = path.join(__dirname, 'Royal Stroje - pozicovna - updated.csv');
  fs.writeFileSync(outputPath, updatedLines.join('\n'), 'utf-8');

  console.log('\n📊 ŠTATISTIKY:');
  console.log(`✅ Nájdených zhôd: ${matchedCount}`);
  console.log(`❌ Nenájdených: ${unmatchedProducts.length}`);
  console.log(`📁 Výstupný súbor: ${outputPath}`);

  if (unmatchedProducts.length > 0) {
    console.log('\n⚠️  Produkty bez obrázka:');
    unmatchedProducts.forEach(p => console.log(`   - ${p}`));
  }
}

updateCSVWithImages().catch(console.error);
