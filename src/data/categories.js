// Kategórie pre Royal Stroje požičovňu

export const categories = [
  {
    id: 'male-naradie',
    name: 'Malé náradie',
    slug: 'male-naradie',
    description: 'Ručné náradie, vŕtačky, brúsky, píly, vysávače, čerpadlá, meracia technika',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'vrtacky', name: 'Vŕtačky a kladivá', slug: 'vrtacky' },
      { id: 'brusky', name: 'Brúsky', slug: 'brusky' },
      { id: 'pily', name: 'Píly', slug: 'pily' },
      { id: 'vysavace', name: 'Vysávače', slug: 'vysavace' },
      { id: 'cerpadla', name: 'Čerpadlá', slug: 'cerpadla' },
    ]
  },
  {
    id: 'stredna-mechanizacia',
    name: 'Stredná mechanizácia',
    slug: 'stredna-mechanizacia',
    description: 'Vibračné dosky, elektrocentrály, kompresory, cestné rezačky, miešačky',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'vibracne-dosky', name: 'Vibračné dosky', slug: 'vibracne-dosky' },
      { id: 'elektrocentraly', name: 'Elektrocentrály', slug: 'elektrocentraly' },
      { id: 'kompresory', name: 'Kompresory', slug: 'kompresory' },
      { id: 'miesacky', name: 'Miešačky', slug: 'miesacky' },
    ]
  },
  {
    id: 'tazka-technika',
    name: 'Ťažká technika',
    slug: 'tazka-technika',
    description: 'Bagre, rýpadlá, nakladače, dumpre, valce - s obsluhou aj bez',
    badge: 'S OBSLUHOU',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'bagre', name: 'Bagre a rýpadlá', slug: 'bagre' },
      { id: 'nakladace', name: 'Nakladače', slug: 'nakladace' },
      { id: 'dumpre', name: 'Dumpre', slug: 'dumpre' },
      { id: 'valce', name: 'Valce', slug: 'valce' },
    ]
  },
  {
    id: 'pracovne-plosiny',
    name: 'Pracovné plošiny',
    slug: 'pracovne-plosiny',
    description: 'Interiérové a exteriérové plošiny pre prácu vo výške až do 18m',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'interierove', name: 'Interiérové', slug: 'interierove' },
      { id: 'exterierove', name: 'Exteriérové', slug: 'exterierove' },
      { id: 'noznicove', name: 'Nožnicové', slug: 'noznicove' },
    ]
  },
  {
    id: 'vybavenie-staveniska',
    name: 'Vybavenie staveniska',
    slug: 'vybavenie-staveniska',
    description: 'Kontajnery, vrátnice, oplotenie, zábrany, mobilné toalety',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'kontajnery', name: 'Kontajnery', slug: 'kontajnery' },
      { id: 'oplotenie', name: 'Oplotenie', slug: 'oplotenie' },
      { id: 'toalety', name: 'Mobilné toalety', slug: 'toalety' },
    ]
  },
  {
    id: 'auta-privesy',
    name: 'Autá a prívesy',
    slug: 'auta-privesy',
    description: 'Dodávky, nákladné autá, prívesné vozíky na prepravu techniky',
    subcategories: [
      { id: 'all', name: 'Všetko', slug: 'all' },
      { id: 'dodavky', name: 'Dodávky', slug: 'dodavky' },
      { id: 'nakladne', name: 'Nákladné autá', slug: 'nakladne' },
      { id: 'privesy', name: 'Prívesy', slug: 'privesy' },
    ]
  },
];
