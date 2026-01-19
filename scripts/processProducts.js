import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper funkcia na načítanie CSV
function parseCSV(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const products = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    // Parse CSV line s podporou quoted values
    const values = [];
    let currentValue = '';
    let inQuotes = false;

    for (let char of lines[i]) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    values.push(currentValue.trim());

    const product = {};
    headers.forEach((header, idx) => {
      product[header] = values[idx] || '';
    });

    products.push(product);
  }

  return products;
}

// Helper na vytvorenie ID z názvu
function createId(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper na vytvorenie slug z kategórie/podkategórie
function createSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Mapa CSV podkategórií na skutočné názvy zložiek
const subcategoryFolderMap = {
  // Malé náradie
  'vŕtacie, búracie kladivá a vŕtačky': 'Búracie , vŕtacie kladivá a vŕtačky',
  'uhlové, vibračné a pásové brúsky. ': 'Uhlové, vibračné a pásové brúsky',
  'uhlové, vibračné a pásové brúsky.': 'Uhlové, vibračné a pásové brúsky',
  'ručné píly a rezačky.': 'Ručne píly a rezačky',
  'Vysávače, tepovače a tlakové čističe': 'Vysávače , tepovače a tlakové čističe',
  'Čerpadlá, ohrievače a odvlhčovače': 'Čerpadlá, ohrievače a odvlhčovače',
  'Zváracia  a meracia technika': 'Zváracia a meracia technika',
  'Zváracia a meracia technika': 'Zváracia a meracia technika',
  'Vibrátory, vibračné lišty a miešadlá': 'Vibrátory , vibračné lišty a miešadlá',
  'Lešenie': 'Lešenie',
  'Nádrže na vodu a naftu': 'Nádrže na vodu a naftu',

  // Stredná mechanizácia
  'Vibračné dosky a nohy': 'Vibračné nohy a dosky',
  'Elektrocentrály': 'Elektrocentrály',
  'Kompresory': 'Kompresory',
  'Cestné rezačky, frézy a brúsky': 'Cestné rezačky, frézy a brúsky',
  'Stolové a portálové píly.': 'Stolové a portálové píly',
  'Stolové a portálové píly': 'Stolové a portálové píly',
  'Miešačky , hladičky betónu a bádie': 'Miešačky , hladičky betónu a bádie',
  'Manipulačná technika': 'Manipulačná technika',
};

// Mapa typov produktov na skutočné názvy súborov
const productImageMap = {
  'Gama 166 Omicron': 'Omicron Gama 166',
  'DYTRON-P4a 650W': 'Dytron - P4a 650W',
  'Hospodársky cirkulár': 'Hospodárska píla',
};

// Overenie existencie obrázku
function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath);
  return fs.existsSync(fullPath);
}

// Hlavná funkcia
function processProducts() {
  // Načítaj CSV
  const csvPath = path.join(__dirname, '..', 'data.csv');
  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const rawProducts = parseCSV(csvContent);

  console.log(`📊 Načítaných ${rawProducts.length} produktov z CSV\n`);

  const processedProducts = [];
  let missingImages = [];

  rawProducts.forEach((row, index) => {
    const nazov = row['Nazov produktu'] || '';
    const typ = row['typ produktu'] || ' ';
    const kategoria = row['Kategoria'] || '';
    const podkategoria = row['Podkategoria'] || '';
    const cenaBezDph = parseFloat(row['Cena bez dph']) || 0;

    // Vytvor features array
    const features = [];

    // Parameter 1
    if (row['popis 1'] && row['parameter 1']) {
      features.push(`${row['popis 1']} - ${row['parameter 1']}`);
    }

    // Parameter 2
    if (row['popis 2'] && row['parameter 2']) {
      features.push(`${row['popis 2']} - ${row['parameter 2']}`);
    }

    // Parameter 3
    if (row['popis 3'] && row['parameter 3']) {
      features.push(`${row['popis 3']} - ${row['parameter 3']}`);
    }

    // Vytvor cestu k obrázku
    let imagePath = '';
    if (kategoria && podkategoria) {
      // Použi mapping pre správny názov zložky
      const actualSubcategoryFolder = subcategoryFolderMap[podkategoria] || podkategoria;

      // Použi mapping pre názov súboru ak existuje
      const rawImageName = typ.trim() || nazov;
      const possibleImageName = productImageMap[rawImageName] || rawImageName;

      // Skús nájsť súbor v zložke
      const folderPath = path.join(__dirname, '..', 'public', 'pictures', kategoria, actualSubcategoryFolder);
      let foundFile = null;

      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath);
        // Skús presne zhodu
        foundFile = files.find(f => f === `${possibleImageName}.webp` || f === `${possibleImageName}.jpg`);

        // Ak nenájdené, skús case-insensitive a bez diakritiky
        if (!foundFile && possibleImageName) {
          const normalizedSearch = possibleImageName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          foundFile = files.find(f => {
            const normalizedFile = f.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            return normalizedFile.startsWith(normalizedSearch.split(' ')[0]) && (f.endsWith('.webp') || f.endsWith('.jpg'));
          });
        }

        // Ak stále nenájdené, skús podľa názvu produktu
        if (!foundFile && nazov) {
          const normalizedNazov = nazov.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
          foundFile = files.find(f => {
            const normalizedFile = f.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\.(webp|jpg)$/, '');
            return normalizedFile.includes(normalizedNazov.split(' ')[0]) || normalizedNazov.includes(normalizedFile.split(' ')[0]);
          });
        }
      }

      if (foundFile) {
        imagePath = `/pictures/${kategoria}/${actualSubcategoryFolder}/${foundFile}`;
      } else {
        missingImages.push({
          produkt: nazov,
          typ: typ,
          kategoria: kategoria,
          podkategoria: actualSubcategoryFolder,
          expectedPath: `/pictures/${kategoria}/${actualSubcategoryFolder}/${possibleImageName}.webp`
        });
        imagePath = '/placeholder-product.webp';
      }
    } else {
      imagePath = '/placeholder-product.webp';
    }

    // Vytvor product objekt
    const product = {
      id: createId(typ || nazov),
      name: typ.trim() || ' ',
      category: createSlug(kategoria),
      subcategory: createSlug(podkategoria),
      image: imagePath,
      price: `${(cenaBezDph * 1.2).toFixed(2)}€/deň`,
      pricePerDay: cenaBezDph,
      description: nazov,
      features: features,
      inStock: true,
      isNew: false,
      isPopular: false,
    };

    // Ak je cena "Na požiadanie"
    if (row['Cena s dph'] === 'Na požiadanie' || !cenaBezDph) {
      product.price = 'Na požiadanie';
      product.priceOnRequest = true;
      delete product.pricePerDay;
    }

    processedProducts.push(product);
  });

  console.log(`✅ Spracovaných ${processedProducts.length} produktov\n`);

  if (missingImages.length > 0) {
    console.log(`⚠️  Chýbajúce obrázky (${missingImages.length}):\n`);
    missingImages.forEach((img, idx) => {
      console.log(`${idx + 1}. ${img.produkt}`);
      console.log(`   Typ: ${img.typ}`);
      console.log(`   Očakávaná cesta: ${img.expectedPath}\n`);
    });
  }

  // Vytvor products.js obsah
  const productsJS = generateProductsJS(processedProducts);

  // Ulož do súboru
  const outputPath = path.join(__dirname, '..', 'src', 'data', 'products.js');
  fs.writeFileSync(outputPath, productsJS, 'utf-8');

  console.log(`✅ Súbor products.js úspešne vytvorený!`);
  console.log(`📁 Uložené do: ${outputPath}`);
}

function generateProductsJS(products) {
  let output = `// Produkty pre Royal Stroje požičovňu
// Automaticky vygenerované z CSV súboru

export const products = [
`;

  // Rozdeľ produkty podľa kategórií
  const byCategory = {};
  products.forEach(p => {
    if (!byCategory[p.category]) {
      byCategory[p.category] = {};
    }
    if (!byCategory[p.category][p.subcategory]) {
      byCategory[p.category][p.subcategory] = [];
    }
    byCategory[p.category][p.subcategory].push(p);
  });

  // MALÉ NÁRADIE
  if (byCategory['male-naradie']) {
    output += `  // ========== MALÉ NÁRADIE ==========\n`;

    Object.entries(byCategory['male-naradie']).forEach(([subcat, prods]) => {
      output += `  // ${subcat.replace(/-/g, ' ')} (${prods.length} produktov)\n`;

      prods.forEach(product => {
        output += `  {\n`;
        output += `    id: '${product.id}',\n`;
        output += `    name: '${product.name}',\n`;
        output += `    category: '${product.category}',\n`;
        output += `    subcategory: '${product.subcategory}',\n`;
        output += `    image: '${product.image}',\n`;
        output += `    price: '${product.price}',\n`;
        if (product.pricePerDay !== undefined) {
          output += `    pricePerDay: ${product.pricePerDay},\n`;
        }
        if (product.priceOnRequest) {
          output += `    priceOnRequest: true,\n`;
        }
        output += `    description: '${product.description}',\n`;
        output += `    features: [\n`;
        product.features.forEach(f => {
          output += `      '${f.replace(/'/g, "\\'")}',\n`;
        });
        output += `    ],\n`;
        output += `    inStock: ${product.inStock},\n`;
        output += `    isNew: ${product.isNew},\n`;
        output += `    isPopular: ${product.isPopular},\n`;
        output += `  },\n`;
      });
      output += `\n`;
    });
  }

  // STREDNÁ MECHANIZÁCIA
  if (byCategory['stredna-mechanizacia']) {
    output += `  // ========== STREDNÁ MECHANIZÁCIA ==========\n`;

    Object.entries(byCategory['stredna-mechanizacia']).forEach(([subcat, prods]) => {
      output += `  // ${subcat.replace(/-/g, ' ')} (${prods.length} produktov)\n`;

      prods.forEach(product => {
        output += `  {\n`;
        output += `    id: '${product.id}',\n`;
        output += `    name: '${product.name}',\n`;
        output += `    category: '${product.category}',\n`;
        output += `    subcategory: '${product.subcategory}',\n`;
        output += `    image: '${product.image}',\n`;
        output += `    price: '${product.price}',\n`;
        if (product.pricePerDay !== undefined) {
          output += `    pricePerDay: ${product.pricePerDay},\n`;
        }
        if (product.priceOnRequest) {
          output += `    priceOnRequest: true,\n`;
        }
        output += `    description: '${product.description}',\n`;
        output += `    features: [\n`;
        product.features.forEach(f => {
          output += `      '${f.replace(/'/g, "\\'")}',\n`;
        });
        output += `    ],\n`;
        output += `    inStock: ${product.inStock},\n`;
        output += `    isNew: ${product.isNew},\n`;
        output += `    isPopular: ${product.isPopular},\n`;
        output += `  },\n`;
      });
      output += `\n`;
    });
  }

  output += `];

// Helper funkcie
export const getProductsByCategory = (categoryId) => {
  return products.filter(p => p.category === categoryId);
};

export const getProductsBySubcategory = (categoryId, subcategoryId) => {
  if (subcategoryId === 'all') {
    return getProductsByCategory(categoryId);
  }
  return products.filter(p => p.category === categoryId && p.subcategory === subcategoryId);
};

export const getPopularProducts = () => {
  return products.filter(p => p.isPopular).slice(0, 6);
};

export const getNewProducts = () => {
  return products.filter(p => p.isNew).slice(0, 4);
};
`;

  return output;
}

// Spusti
processProducts();
