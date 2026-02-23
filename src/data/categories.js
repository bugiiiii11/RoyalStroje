// Kategórie pre Royal Stroje požičovňu
// Aktualizované z katalogMVP.csv: 23.2.2026

export const categories = [
  {
    id: 'male-naradie',
    name: 'Malé náradie',
    slug: 'male-naradie',
    description: 'Ručné náradie, vŕtačky, brúsky, píly, vysávače, čerpadlá, meracia technika',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'vrtacie-kladiva-a-vrtacky', name: 'Vŕtacie kladivá a vŕtačky', slug: 'vrtacie-kladiva-a-vrtacky' },
      { id: 'buracie-kladiva', name: 'Búracie kladivá', slug: 'buracie-kladiva' },
      { id: 'brusky', name: 'Brúsky', slug: 'brusky' },
      { id: 'pily-a-rezacky', name: 'Píly a rezačky', slug: 'pily-a-rezacky' },
      { id: 'vysavace-a-cistice', name: 'Vysávače a čističe', slug: 'vysavace-a-cistice' },
      { id: 'cerpadla', name: 'Čerpadlá', slug: 'cerpadla' },
      { id: 'ohrievace-a-odvlhcovace', name: 'Ohrievače a odvlhčovače', slug: 'ohrievace-a-odvlhcovace' },
      { id: 'zvaracia-a-meracia-technika', name: 'Zváracia a meracia technika', slug: 'zvaracia-a-meracia-technika' },
      { id: 'vibratory-listy-a-miesadla', name: 'Vibrátory, lišty a miešadlá', slug: 'vibratory-listy-a-miesadla' },
      { id: 'lesenie', name: 'Lešenie', slug: 'lesenie' },
      { id: 'nadrze', name: 'Nádrže', slug: 'nadrze' },
    ]
  },
  {
    id: 'stredna-mechanizacia',
    name: 'Stredná mechanizácia',
    slug: 'stredna-mechanizacia',
    description: 'Vibračné dosky, elektrocentrály, kompresory, cestné rezačky, miešačky',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'vibracne-dosky-a-nohy', name: 'Vibračné dosky a nohy', slug: 'vibracne-dosky-a-nohy' },
      { id: 'elektrocentraly', name: 'Elektrocentrály', slug: 'elektrocentraly' },
      { id: 'kompresory', name: 'Kompresory', slug: 'kompresory' },
      { id: 'cestne-rezacky-frezy-a-brusky', name: 'Cestné rezačky, frézy a brúsky', slug: 'cestne-rezacky-frezy-a-brusky' },
      { id: 'stolove-pily', name: 'Stolové píly', slug: 'stolove-pily' },
      { id: 'miesacky-hladicky-betonu-a-badie', name: 'Miešačky, hladičky betónu a bádie', slug: 'miesacky-hladicky-betonu-a-badie' },
      { id: 'manipulacna-technika', name: 'Manipulačná technika', slug: 'manipulacna-technika' },
    ]
  },
  {
    id: 'tazka-technika',
    name: 'Ťažká technika',
    slug: 'tazka-technika',
    description: 'Rýpadlá, nakladače, dumpre, valce, manipulátory - s obsluhou aj bez',
    badge: 'S OBSLUHOU',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'pasove-mini-rypadla', name: 'Pásové mini-rýpadlá', slug: 'pasove-mini-rypadla' },
      { id: 'pasove-tazke-rypadla', name: 'Pásové ťažké rýpadlá', slug: 'pasove-tazke-rypadla' },
      { id: 'kolesove-rypadla-a-nakladace', name: 'Kolesové rýpadlá a nakladače', slug: 'kolesove-rypadla-a-nakladace' },
      { id: 'smykom-riadene-nakladace', name: 'Šmykom riadené nakladače', slug: 'smykom-riadene-nakladace' },
      { id: 'dumpre', name: 'Dumpre', slug: 'dumpre' },
      { id: 'valce', name: 'Valce', slug: 'valce' },
      { id: 'manipulatory', name: 'Manipulátory', slug: 'manipulatory' },
      { id: 'vysokozdvizne-voziky', name: 'Vysokozdvižné vozíky', slug: 'vysokozdvizne-voziky' },
    ]
  },
  {
    id: 'pracovne-plosiny',
    name: 'Pracovné plošiny',
    slug: 'pracovne-plosiny',
    description: 'Interiérové a exteriérové plošiny pre prácu vo výške',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'interierove', name: 'Interiérové', slug: 'interierove' },
      { id: 'exterierove', name: 'Exteriérové', slug: 'exterierove' },
    ]
  },
  {
    id: 'vybavenie-staveniska',
    name: 'Vybavenie staveniska',
    slug: 'vybavenie-staveniska',
    description: 'Kontajnery, vrátnice, oplotenie, zábrany, mobilné toalety',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'kancelarske-kontajnery-a-vratnice', name: 'Kancelárske kontajnery a vrátnice', slug: 'kancelarske-kontajnery-a-vratnice' },
      { id: 'skladove-kontajnery', name: 'Skladové kontajnery', slug: 'skladove-kontajnery' },
      { id: 'sanitarne-kontajnery', name: 'Sanitárne kontajnery', slug: 'sanitarne-kontajnery' },
      { id: 'mobilne-oplotenia-a-zabrany', name: 'Mobilné oplotenia a zábrany', slug: 'mobilne-oplotenia-a-zabrany' },
      { id: 'mobilne-toalety', name: 'Mobilné toalety', slug: 'mobilne-toalety' },
    ]
  },
  {
    id: 'auta-privesy',
    name: 'Autá a prívesné vozíky',
    slug: 'auta-privesy',
    description: 'Autá, dodávky a prívesné vozíky na prepravu techniky',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'auta-a-dodavky', name: 'Autá a dodávky', slug: 'auta-a-dodavky' },
      { id: 'privesne-voziky', name: 'Prívesné vozíky', slug: 'privesne-voziky' },
    ]
  },
  {
    id: 'zahradna-technika',
    name: 'Záhradná technika',
    slug: 'zahradna-technika',
    description: 'Kosačky, krovinorezy a motorové píly',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'kosacky-na-travu', name: 'Kosačky na trávu', slug: 'kosacky-na-travu' },
      { id: 'krovinorezy-a-motorove-pily', name: 'Krovinorezy a motorové píly', slug: 'krovinorezy-a-motorove-pily' },
    ]
  },
];
