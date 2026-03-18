# ROYAL STROJE - Kompletná dokumentácia textov

**Verzia:** 1.0
**Dátum:** 24.02.2026
**Účel:** Fine-tuning textov a SEO optimalizácia

---

## 1. NAVIGÁCIA A HLAVIČKA

### Header (Desktop)
**Komponenta:** `src/components/common/Header.jsx`

#### Logo
- Text: "ROYAL STROJE" (logo obrázok)

#### Navigačné položky
1. **Požičovňa** (link: `/`)
2. **Služby** (link: `/sluzby`)
3. **Kontakt** (link: `/kontakt`)

#### Kontaktné akcie
- **Telefón:** +421 948 555 551 (zobrazuje sa pri hoveri)
- **WhatsApp** ikona (zelená)
- **Telegram** ikona (modrá)

#### Promo banner (Desktop)
- **Nadpis:** "Čoskoro otvárame!"
- **Text:** "Web je momentálne v testovacej prevádzke. Oficiálne spustenie čoskoro."
- **CTA tlačidlo:** "Kontaktujte nás"

---

### Footer (Desktop)
**Komponenta:** `src/components/common/Footer.jsx`

#### Stĺpec 1: O nás
- **Nadpis:** "ROYAL STROJE"
- **Text:** "Profesionálna požičovňa v Senci. Ponúkame prenájom a predaj špičkovej stavebnej techniky a náradia pre vaše najnáročnejšie práce. Budujte s dôverou."
- **Sociálne siete:** Facebook, Instagram, LinkedIn, WhatsApp, Telegram

#### Stĺpec 2: Služby
- Požičovňa náradia
- Predaj náradia
- Náhradné diely
- Cenová ponuka

#### Stĺpec 3: Stránky
- Blog
- Partneri
- Obchodné podmienky
- GDPR

#### Stĺpec 4: Kontakt
- **Telefón:** +421 948 555 551
- **Email:** info@royalstroje.sk
- **Adresa:** Recká cesta 182, 925 26 Senec-Boldog
- **Otváracie hodiny:** Po-Pi: 7:00-16:00, So-Ne: zatvorené

#### Copyright
"© 2026 Royal Stroje. Všetky práva vyhradené."

---

## 2. DOMOVSKÁ STRÁNKA (Home)

**Súbor:** `src/pages/Home.jsx`

### Hero sekcia (Desktop)
**Komponenta:** `src/components/home/Hero.jsx`

#### Hlavný nadpis (H1)
"Požičovňa náradia a **stavebnej techniky**"
- "stavebnej techniky" je s oranžovým gradientom

#### Popis
"Profesionálne náradie, stroje a mechanizácia pre stavby všetkých veľkostí. **Rýchla doprava na stavbu.**"

#### CTA tlačidlá
1. "Zavolať teraz" (oranžové, primárne)
2. "Zobraziť katalóg" (priehľadné s bielym okrajom)

---

### Katalóg sekcia (Mobile aj Desktop)
**Komponenta:** `src/components/home/Catalog.jsx`

#### Mobilný Hero nadpis (H1)
"**Požičovňa** profesionálnej techniky"

#### Popis
"Objavte našu širokú ponuku profesionálneho vybavenia - od malého náradia po ťažkú techniku - všetko na jednom mieste."

#### Desktop nadpis
"**Požičovňa** profesionálnej techniky"

#### Výber typu zákazníka
- **Právnické osoby** (PO) - "bez DPH"
- **Fyzické osoby** (FO) - "s DPH"

#### Vyhľadávanie
- Placeholder: "Hľadať produkty..."

#### Kategórie
**Nadpis:** "KATEGÓRIE"

**Zoznam kategórií:**
1. **Malé náradie** (ikona: Hammer)
2. **Stredná mechanizácia** (ikona: Cog)
3. **Ťažká technika** (ikona: HardHat)
4. **Pracovné plošiny** (ikona: ArrowUpFromLine)
5. **Vybavenie staveniska** (ikona: Container)
6. **Autá a prívesy** (ikona: Car)
7. **Záhradná technika** (ikona: TreePine)

#### Košík (Desktop)
- **Nadpis:** "Nezáväzná objednávka"
- **Prázdny košík:** "Košík je prázdny"
- **Cena:** "Cena bez DPH:" / "Cena s DPH:"
- **Kalendár:** Mesiace a dni na výber
- **CTA tlačidlo:** "Poslať objednávku"

#### Žiadne výsledky
- **Emoji:** 🔍
- **Nadpis:** "Nenašli sa žiadne výsledky" / "Žiadne produkty"
- **Text:** "Skúste hľadať iný výraz alebo upravte filter kategórií" / "V tejto kategórii momentálne nie sú dostupné žiadne produkty."
- **Tlačidlo:** "Vymazať vyhľadávanie"

---

## 3. BLOG

**Súbor:** `src/pages/Blog.jsx`

### Desktop Hero
**Pozadie:** hero-pozicovna.webp

**Nadpis (H1):** "Náš **blog**"
- "blog" má oranžovú farbu

**Popis:** "Tipy, novinky a užitočné informácie zo sveta stavebnej techniky a náradia."

### Mobilná hlavička
**Logo:** Vľavo hore (h-8)

**Nadpis:** "Náš **blog**"

**Popis:** "Tipy, novinky a užitočné informácie zo sveta stavebnej techniky a náradia."

### Blog príspevky
Každý príspevok obsahuje:
- Kategória badge (oranžový)
- Dátum (s ikonou kalendára)
- Čas čítania (s ikonou hodín)
- Názov článku
- Excerpt (úryvok)
- "Čítať viac →"

**Zoznam článkov:**
1. "Prenájom vs. Kúpa Stavebnej Mechanizácie: Komplexný Sprievodca 2025" (9 min, Tipy a rady)
2. "Ako Vybrať Správne Minirýpadlo: Praktický Návod pre Začiatočníkov" (10 min, Návody)
3. "Jarné Stavebné Projekty: Top 5 Mechanizácií, Ktoré Potrebujete" (11 min, Tipy a rady)
4. "Mobilné Sanitárne Kontajnery: Komplexný Sprievodca pre Stavby a Eventy" (12 min, Návody)
5. "10 Bezpečnostných Pravidiel pri Práci so Stavebnými Strojmi" (13 min, Návody)
6. "Vibračné Dosky a Hutnenie: Všetko Čo Potrebujete Vedieť" (17 min, Návody)
7. "Case Study: Ako Sme Pomohli Dokončiť Projekt o 30% Rýchlejšie" (13 min, Prípadové štúdie)
8. "Stavebné Projekty v Zime: Výzvy a Riešenia" (13 min, Tipy a rady)
9. "Ročný Prehľad 2025: Trendy v Prenájme Stavebnej Mechanizácie" (14 min, Novinky)

### CTA sekcia
**Nadpis:** "Zaujala vás naša ponuka?"

**Text:** "Kontaktujte nás a radi vám pomôžeme s výberom správnej techniky pre váš projekt."

**Tlačidlá:**
- "Kontaktujte nás" (oranžové primárne)
- "Naše služby" (sivé sekundárne)

---

## 4. SLUŽBY

**Súbor:** `src/pages/Sluzby.jsx`

### Desktop Hero
**Nadpis (H1):** "Naše služby"

**Popis:** "Komplexné služby pre vašu stavbu – od požičovne náradia cez zemné práce až po servis a dopravu."

### Mobilná hlavička
**Nadpis:** "Čo pre vás **môžeme urobiť?**"

**Popis:** "Profesionálne služby pre stavebné firmy, remeselníkov aj súkromné osoby"

### Služby (3 karty)

#### 1. Predaj náradia
**Ikona:** ShoppingCart

**Popis:** "Kvalitné náradie, mechanizácia a príslušenstvo značkových výrobcov priamo na sklade v Senci."

**Features:**
- Overené značky
- Férové ceny
- Tovar skladom
- Expresné dodanie

#### 2. Predaj náhradných dielov
**Ikona:** Package

**Popis:** "Široký sortiment originálnych náhradných dielov pre stavebné náradie. Skladom diely pre všetky typy strojov a zariadení."

**Features:**
- Originálne diely
- Skladová dostupnosť
- Odborné poradenstvo
- Expresná objednávka

#### 3. Cenová ponuka
**Ikona:** FileText

**Popis:** "Pripravíme pre vás presnú cenovú ponuku na mieru. Rýchlo, transparentne a bez skrytých poplatkov."

**Features:**
- Ponuka do 24 hodín
- Presná kalkulácia
- Individuálny prístup
- Bezplatné poradenstvo

### CTA sekcia
**Nadpis:** "Potrebujete poradiť?"

**Text:** "Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt."

**CTA:** "Zavolať teraz: 0948 555 551"

---

## 5. KONTAKT

**Súbor:** `src/pages/Kontakt.jsx`

### Desktop Hero
**Nadpis (H1):** "**Kontaktujte** nás"

**Popis:**
"Sme tu pre vás. Zavolajte, napíšte email alebo nás navštívte v našej prevádzke v Senci."

"ROYAL STROJE je profesionálna požičovňa stavebného náradia a techniky pôsobiaca v Senci od roku 2026."

### Mobilná hlavička
**Nadpis:** "Vyberte si **spôsob kontaktu**"

**Popis:** "Sme dostupní telefonicky, cez email aj prostredníctvom moderných komunikačných aplikácií."

### Spôsoby kontaktu (4 karty v gridu 2x2 mobile, 4x desktop)

#### 1. Telefón
- **Číslo:** +421 948 555 551
- **Text:** "Non-stop dostupnosť" (desktop)

#### 2. WhatsApp
- **Handle:** 0948 555 551
- **Text:** "Rýchla komunikácia" (desktop)

#### 3. Telegram
- **Handle:** @Royalstroje
- **Text:** "Alternatívny kontakt" (desktop)

#### 4. Email
- **Adresa:** info@royalstroje.sk
- **Text:** "Odpoveď do 24 hodín" (desktop)

### Navštívte nás v Senci
**Nadpis:** "Navštívte nás v **Senci**"

**Popis (desktop):** "Tešíme sa na vašu návštevu v našej požičovni stavebnej techniky a náradia."

#### Informačné karty (3 stĺpce)

**1. Otváracie hodiny:**
- Po - Pi
- 7:00 - 16:00

**2. Adresa predajne:**
- Recká cesta 182
- 925 26 Senec

**3. Kontakt:**
- +421 948 555 551
- info@royalstroje.sk

### Mapa a firemné údaje (Desktop)
**Sekcia:** "Nájdete nás tu"

**Tlačidlo:** "Otvoriť v Google Maps →"

#### Firemné údaje
- **Názov:** Royal stroje, s.r.o.
- **Sídlo:** 182, Boldog 92526
- **IČO:** 57 405 425
- **DIČ:** 2122722063
- **IČDPH:** SK2122722063
- **Zastúpený:** Peter Krivosudský

#### O nás
"ROYAL STROJE je profesionálna požičovňa stavebného náradia a techniky pôsobiaca v Senci od roku 2026. Ponúkame prenájom kvalitného náradia aj komplexné služby v oblasti stavebníctva."

### Sociálne siete
**Nadpis:** "Sledujte **nás**"

**Text:** "Zostaňte v kontakte cez sociálne siete"

**Siete:**
- Facebook
- Instagram
- LinkedIn

### CTA
**Tlačidlo:** "Zavolať: 0948 555 551"

---

## 6. PREDAJ TECHNIKY

**Súbor:** `src/pages/PredajTechniky.jsx`

### Desktop Hero
**Nadpis (H1):** "**Predaj** náradia, stavebných strojov a príslušenstva"

**Popis:** "Všetko pre stavbu a dielňu priamo na prevádzke v Senci."

### Mobilná hlavička
**Nadpis:** "**Kamenný predaj** náradia a techniky"

**Popis:** "Kvalitné náradie a stroje, ktoré máme overené aj v našej požičovni."

### Kategórie produktov (4 karty)

#### 1. Profesionálne náradie
**Ikona:** Wrench

**Popis:** "Všetko potrebné k práci – rýchlo, priamo na prevádzke."

**Položky:**
- Remeselnícke pomôcky
- Elektrické náradie
- AKU ručné náradie
- Meracie prístroje

#### 2. Stavebná mechanizácia
**Ikona:** Package

**Popis:** "Predaj vybranej stavebnej techniky. Nová aj používaná technika z našej prevádzky a partnerských dodávok."

**Položky:**
- Vibračné dosky a nohy
- Elektrocentrály
- Rezná technika
- Doplnková technika pre stavbu

#### 3. Príslušenstvo a spotrebný materiál
**Ikona:** ShoppingCart

**Popis:** "Široký výber príslušenstva za výhodné ceny."

**Položky:**
- Diamantové rezné a brúsne kotúče
- Príslušenstvo ku elektrickému a aku náradiu
- Vrtáky
- Elektródy

#### 4. Ochranné pomôcky BOZP
**Ikona:** HardHat

**Popis:** "Bezpečnosť na prvom mieste - kompletný sortiment ochranných pomôcok."

**Položky:**
- Reflexné vesty
- Ochranné gurtne
- Ochranné rukavice
- Ochranné okuliare

### Výhody (2x2 grid mobilne, 4x desktop)

**Nadpis:** "Overené značky, **férové ceny**"

**Popis:** "Na sklade je náradie, remeselnícke potreby a vybrané kusy stavebnej mechanizácie. K dispozícii je aj široký výber príslušenstva – diamantové vrtáky, rezné a diamantové kotúče rôznych priemerov a ďalší spotrebný materiál za **výhodné ceny**."

**4 výhody:**
1. **Férové ceny** - Konkurenčné ponuky a akcie
2. **Tovar skladom** - Okamžitý odber bez čakania
3. **Expresné dodanie** - Rýchle zabezpečenie tovaru na objednávku
4. **Overené značky** - Len kvalitní výrobcovia

### BOZP banner
**Nadpis:** "Bezpečnosť na prvom mieste"

**Text:** "Súčasťou ponuky je aj bezpečnostné vybavenie: **reflexné vesty, gurtne, ochranné rukavice a ochranné okuliare**."

### Rýchly servis banner
**Nadpis:** "Rýchlo, pohodlne, spoľahlivo"

**Text:** "Nákup prebieha bez zbytočného čakania. Tovar, ktorý nie je aktuálne skladom, je možné okamžite objednať a po dohode zabezpečiť **expresné doručenie**."

### Zastavte sa v našej predajni
**Nadpis:** "Zastavte sa v našej **predajni**"

#### 3 info karty:

**1. Otváracie hodiny:**
- Po - Pi
- 7:00 - 16:00

**2. Adresa predajne:**
- Recká cesta 182
- 925 26 Senec

**3. Kontakt:**
- +421 948 555 551
- info@royalstroje.sk

### Benefits pills
✓ Odborné poradenstvo
✓ Tovar na predvádzku
✓ Bezplatné parkovanie

### CTA tlačidlá
- "Zavolať teraz"
- "Napísať email"

---

## 7. NÁHRADNÉ DIELY

**Súbor:** `src/pages/NahradneDiely.jsx`

### Desktop Hero
**Nadpis (H1):** "Predaj náhradných dielov"

**Popis:** "Široký sortiment originálnych náhradných dielov pre stavebné náradie a techniku. Skladom diely pre všetky typy strojov."

### Mobilná hlavička
**Nadpis:** "**Predaj** náhradných dielov"

**Popis:** "Od identifikácie po dodanie - postaráme sa o všetko"

### Služby (6 kariet v 3-stĺpcovom gridu)

#### 1. Originálne diely
**Ikona:** Shield
**Popis:** "Iba originálne náhradné diely priamo od výrobcov techniky."
**Features:** Záruka kvality, Certifikované diely, Dlhá životnosť, Plná kompatibilita

#### 2. Skladová dostupnosť
**Ikona:** Package
**Popis:** "Najžiadanejšie náhradné diely priamo na sklade v Senci."
**Features:** Okamžitý odber, Veľký sklad, Rezervácia online, Express objednávka

#### 3. Odborné poradenstvo
**Ikona:** Wrench
**Popis:** "Pomôžeme vám nájsť správny náhradný diel pre váš stroj."
**Features:** Skúsení technici, Identifikácia dielu, Montážne rady, Bezplatné poradenstvo

#### 4. Rýchle dodanie
**Ikona:** Clock
**Popis:** "Ak nemáme diel skladom, objednáme a dodáme do 48 hodín."
**Features:** Express objednávka, Sledovanie zásielky, SMS notifikácie, Dovoz na stavbu

#### 5. Servisné balíčky
**Ikona:** CheckCircle
**Popis:** "Kompletné servisné sady pre pravidelné údržby vašej techniky."
**Features:** Filtre a oleje, Opotrebované diely, Zvýhodnené ceny, Servisné manuály

#### 6. Garancia a záruka
**Ikona:** Shield
**Popis:** "Všetky diely s plnou zárukou výrobcu a možnosťou vrátenia."
**Features:** Záruka 24 mesiacov, Výmena vadného dielu, 14 dní na vrátenie, Certifikát pravosti

### Partneri
**Nadpis:** "Naši **partneri**"

**Popis:** "Spolupracujeme s prémiovými značkami stavebného náradia a techniky"

**Značky:** Makita, Bosch, Hilti, Stihl, DeWalt, Milwaukee

**Info box:** "**Nenašli ste značku?** Objednávame diely aj pre ďalšie značky na vyžiadanie. Kontaktujte nás a overíme dostupnosť."

### Ako to funguje?
**Nadpis:** "Ako to **funguje?**"

**Popis:** "Jednoduchý proces objednávky náhradných dielov"

**4 kroky:**
1. **Identifikácia** - Kontaktujte nás s označením stroja alebo dielu
2. **Overenie** - Overíme dostupnosť a cenu dielu
3. **Objednávka** - Potvrdíte objednávku a spôsob platby
4. **Dodanie** - Odber skladom alebo dovoz do 48 hodín

### CTA
**Nadpis:** "Potrebujete náhradný diel?"

**Text:** "Kontaktujte nás a pomôžeme vám nájsť správny diel pre váš stroj."

**Benefits:**
✓ Originálne diely
✓ Skladom
✓ Express dodanie

**Tlačidlá:**
- "Zavolať teraz"
- "Napísať email"

---

## 8. CENOVÁ PONUKA

**Súbor:** `src/pages/CenovaPonuka.jsx`

### Desktop Hero
**Nadpis (H1):** "Cenová ponuka"

**Popis:** "Pre každého obchodníka je tvorba cenových ponúk jednou z najdôležitejších obchodných aktivít. Je posledným krokom pred objednávkou a preto jej každý z obchodníkov pripisuje veľký význam."

### Mobilná hlavička
**Nadpis:** "**Cenová ponuka** na mieru"

**Popis:** "Hlavnou výhodou týchto cenových ponúk je možnosť vypracovať presnú cenovú kalkuláciu podľa vopred zistených potrieb klienta a naviač pridať ďalšie možnosti, ktoré si klient môže vyberať sám."

### Služby (6 kariet)

#### 1. Presná kalkulácia
**Ikona:** Calculator
**Features:** Transparentný cenník, Žiadne skryté poplatky, Detailný rozpis položiek, Cenová flexibilita

#### 2. Rýchle spracovanie
**Ikona:** Clock
**Features:** Ponuka do 24h, Express možnosť, Online odoslanie, SMS notifikácia

#### 3. Individuálny prístup
**Ikona:** UserCheck
**Features:** Konzultácia zdarma, Návrh riešenia, Možnosť úprav, Odborné poradenstvo

#### 4. Bez záväzkov
**Ikona:** CheckCircle
**Features:** Zadarma, Bez registrácie, Žiadne záväzky, Ochrana údajov

#### 5. Komplexné služby
**Ikona:** FileText
**Features:** Prenájom techniky, Predaj náradia, Náhradné diely, Zemné práce

#### 6. Odborné poradenstvo
**Ikona:** Lightbulb
**Features:** Výber techniky, Optimalizácia nákladov, Technické parametre, Alternatívne riešenia

### Prečo si vyžiadať ponuku?
**Nadpis:** "Prečo si **vyžiadať ponuku?**"

**Text:** "Vďaka našim dlhoročným skúsenostiam Vám vieme v tomto smere poskytnúť veľmi presnú cenovú ponuku, ktorú vieme prispôsobiť Vašim potrebám. Taktiež Vám dokážeme naceniť a zabezpečiť tovar potrebný k realizácii, čím Vás odbremeníme od nepríjemností, ktoré sú spojené často spojené."

**3 kroky:**
1. **Vyplňte formulár** - Popíšte nám vaše požiadavky a potreby
2. **Konzultácia** - Spoločne nájdeme najlepšie riešenie
3. **Cenová ponuka** - Dostanete detailnú kalkuláciu do 24h

**Tip:** "**Tip:** Čím presnejšie popíšete vaše požiadavky, tým rýchlejšie a presnejšie vieme pripraviť cenovú ponuku na mieru."

### CTA
**Nadpis:** "Potrebujete cenovú ponuku?"

**Text:** "Kontaktujte nás a my vám pripravíme detailnú cenovú kalkuláciu presne podľa vašich potrieb."

**Benefits:**
✓ Ponuka do 24 hodín
✓ Zadarmo a nezáväzne
✓ Odborné poradenstvo

---

## 9. ZEMNÉ PRÁCE

**Súbor:** `src/pages/ZemnePrace.jsx`

### Desktop Hero
**Nadpis (H1):** "Zemné a búracie práce"

**Popis:** "Výkopy základov, prípojky inžinierskych sietí, búracie práce s hydraulickým kladivom, terénne úpravy a odvoz odpadu."

### Mobilná hlavička
**Nadpis:** "Kompletné **zemné práce**"

**Popis:** "Profesionálne služby pre všetky typy projektov"

### Služby (6 kariet)

#### 1. Výkopy a základy
**Ikona:** Hammer
**Popis:** "Výkopy základov, bazénov, pivníc, žúmp a ČOV. Práca s presnosťou na milimetre."
**Features:** Základy domov, Bazény, Pivnice, Žumpy a ČOV

#### 2. Inžinierske siete
**Ikona:** Wrench
**Popis:** "Vodovodné a kanalizačné prípojky. Šachty, montážne jamy, uloženie sietí."
**Features:** Vodovod, Kanalizácia, Plyn, Elektroinštalácie

#### 3. Búracie práce
**Ikona:** Drill
**Popis:** "Demolácia s hydraulickým kladivom. Bezpečné a efektívne búranie konštrukcií."
**Features:** Búranie stien, Hydraulické kladivo, Demolácia objektov, Spevnené plochy

#### 4. Terénne úpravy
**Ikona:** Tractor
**Popis:** "Zrovnávanie pozemkov, planírovanie. Sadové úpravy, odvodnenie."
**Features:** Planírovanie, Odvodnenie, Terasy, Záhrady

#### 5. Vŕtanie stĺpikov
**Ikona:** CircleDot
**Popis:** "Presné vŕtanie dier pre plotové stĺpiky. Vrtáky Ø 300 / 400 mm."
**Features:** Ploty, Pergoly, Prístrešky, Brány

#### 6. Odvoz a dovoz
**Ikona:** Truck
**Popis:** "Likvidácia odpadu kontajnermi 3–10 m³. Dovoz štrku, piesku, makadamu."
**Features:** Odvoz sute, Dovoz materiálu, Kontajnery, Preprava

### CTA
**Nadpis:** "Potrebujete zemné alebo búracie práce?"

**Text:** "Zavolajte nám ešte dnes – dohodneme obhliadku a termín v najbližšom možnom čase."

**Benefits:**
✓ Obhliadka je ZDARMA
✓ Transparentné ceny
✓ Rýchle termíny

---

## 10. SERVIS NÁRADIA

**Súbor:** `src/pages/ServisNaradia.jsx`

### Desktop Hero
**Nadpis (H1):** "Servis náradia"

**Popis:** "Profesionálny servis a údržba stavebného náradia a techniky. Opravy, kontroly a náhradné diely."

### Mobilná hlavička
**Nadpis:** "Komplexný **servis a údržba**"

**Popis:** "Udržujeme vaše stroje v perfektnom stave"

### Služby (6 kariet)

#### 1. Opravy strojov
**Ikona:** Wrench
**Features:** Diagnostika porúch, Výmena dielov, Nastavenie strojov, Testovanie funkčnosti

#### 2. Preventívna údržba
**Ikona:** Settings
**Features:** Pravidelné kontroly, Výmena olejov, Čistenie filtrov, Nastavenie parametrov

#### 3. Náhradné diely
**Ikona:** Cog
**Features:** Originálne diely, Rýchle dodanie, Overená kvalita, Garancie na diely

#### 4. Expresný servis
**Ikona:** Zap
**Features:** Servis na stavbe, Non-stop linka, Odvoz/dovoz stroja, Náhradný stroj

#### 5. Revízie a kontroly
**Ikona:** ClipboardCheck
**Features:** Elektrické revízie, Plošiny BOZP, Certifikáty, Dokumentácia

#### 6. Predpredajný servis
**Ikona:** Sparkles
**Features:** Kontrola funkčnosti, Čistenie strojov, Doplnenie paliva, Bezpečnostné kontroly

### Prečo náš servis?
**Nadpis:** "Prečo si vybrať náš **servis**"

**4 výhody:**
1. **Skúsení technici** - Certifikovaní servisní technici s 10+ rokmi praxe
2. **Rýchle termíny** - Expresný servis do 24 hodín
3. **Kvalitné diely** - Len originálne a overené náhradné diely
4. **Férové ceny** - Transparentné ceny bez skrytých poplatkov

### CTA
**Nadpis:** "Potrebujete servis alebo opravu?"

**Text:** "Kontaktujte nás a náš technik vám poradí najlepšie riešenie."

**Benefits:**
✓ Diagnostika ZDARMA
✓ Garancie na prácu
✓ Non-stop podpora

---

## 11. DOVOZ TECHNIKY

**Súbor:** `src/pages/DovozTechniky.jsx`

### Desktop Hero
**Nadpis (H1):** "Dovoz techniky"

**Popis:** "Rýchly a spoľahlivý dovoz náradia a techniky priamo na vašu stavbu."

### Mobilná hlavička
**Nadpis:** "Komplexné **dopravné služby**"

**Popis:** "Dovoz a odvoz techniky kedykoľvek potrebujete"

### Služby (6 kariet)

#### 1. Dovoz na stavbu
**Features:** Dovoz do 24 hodín, Celé Slovensko, Presný termín, Asistenčná služba

#### 2. Odvoz po skončení
**Features:** Flexibilný čas, Víkendy a sviatky, Predĺženie prenájmu, Bezplatný odvoz

#### 3. Express doprava
**Features:** Non-stop dostupnosť, Náhradný stroj, Do 4 hodín, Prioritná podpora

#### 4. Preprava ťažkej mechanizácie
**Features:** Vlastné podvalníky, Skúsení vodiči, Povolenia a dokumenty, Naloženie/vyloženie

#### 5. Skladovanie techniky
**Features:** Strážený areál, Prístrešky, Nabíjanie batérií, Dohľad technikov

#### 6. Poistenie prepravy
**Features:** Havarijné poistenie, Odcudzenie, Škody pri preprave, Bez rizika

### Transparentné cenníky
**Nadpis:** "Transparentné **cenníky**"

**Popis:** "Cena dopravy závisí od vzdialenosti a typu techniky"

**3 cenové pásma:**
1. **Do 20 km** - ZDARMA (Pri prenájme nad 3 dni)
2. **20-50 km** - 0,50 €/km (Malé náradie a stroje)
3. **Nad 50 km** - Dohodou (Individuálna cena)

**Tip:** "Pri dlhšom prenájme (nad 7 dní) alebo opakovanej spolupráci ponúkame **dopravu ZDARMA** aj na väčšie vzdialenosti!"

### CTA
**Nadpis:** "Potrebujete dopravu techniky?"

**Text:** "Zavolajte nám a dohodneme presný termín dovozu priamo na vašu stavbu."

**Benefits:**
✓ Dovoz do 24 hodín
✓ Non-stop linka
✓ Celé Slovensko

---

## 12. PARTNERI

**Súbor:** `src/pages/Partneri.jsx`

### Mobilná hlavička
**Nadpis:** "Naši **partneri**"

**Popis:** "Spolupracujeme s overenými profesionálmi zo Senca, Bratislavy a okolia."

**Detail text (desktop):** "Všetci naši partneri sú verifikované legitimné firmy, s ktorými udržiavame dlhodobú spoluprácu. Spoločne budujeme dôveryhodné partnerstvá založené na kvalite a profesionalite."

### Zoznam partnerov
1. **M & M WOOD**
2. **ZSOLIKA**
3. **MOBILBOX**
4. **ESKOPA**
5. **MOBA**
6-12. Placeholder pre budúcich partnerov

### Čo znamená partnerstvo
**Nadpis:** "Čo znamená **partnerstvo**"

**Úvodný text:** "Naši partneri sú **základom našej úspešnej práce**. Si vážime každého z nich a spoločne vytvárame sieť dôveryhodných profesionálov v stavebnom priemysle, ktorí sa môžu navzájom odporúčať a spolupracovať."

#### 3 sekcie:

**1. Ako vzniká partnerstvo?**
"Nevyhľadávame nových partnerov. Partnerstvo vzniká prirodzene po dlhodobej kvalitnej spolupráci ako **poďakovanie za dôveru a profesionalitu**. Len naši najbližší a najspoľahlivejší klienti sa môžu stať oficiálnymi partnermi."

**2. Vzájomné odporúčanie**
"Partnerstvo znamená vzájomnú dôveru. Radi odporúčame služby našich partnerov aj našim klientom a spoločne vytvárame sieť spoľahlivých profesionálov v stavebnom priemysle."

**3. Komplexné pokrytie stavebníctva**
"Naša sieť partnerov pokrýva **široké spektrum stavebných služieb** — od prenájmu strojov, cez zemné práce, až po dodávky materiálu. Pre našich klientov to znamená jedno spoľahlivé kontaktné miesto a rýchle riešenia."

### CTA
**Text:** "Máte záujem o spoluprácu? Kontaktujte nás a začnime budovať dôveru."

**Tlačidlo:** "Zavolať: 0948 555 551"

---

## 13. GDPR

**Súbor:** `src/pages/GDPR.jsx`

### Mobilná hlavička
**Nadpis:** "**Ochrana** osobných údajov"

**Popis:** "Informácie o spracúvaní osobných údajov v zmysle GDPR"

### Header Info
- **Prevádzkovateľ:** ROYAL STROJE s.r.o., Recká cesta 182, 925 26 Boldog – Senec
- **Kontakt:** info@royalstroje.sk, +421 948 555 551
- **IČO / DIČ / IČ DPH:** 57 405 425 / 2122722063 / SK2122722063
- **Verzia / Platné od:** GDPR2026.01 / 01. 02. 2026

### Hlavné sekcie

#### I. Rozsah spracúvaných osobných údajov
- Identifikačné údaje
- Kontaktné údaje
- Podnikateľské údaje
- Zmluvné a transakčné údaje
- Komunikačné údaje
- Údaje z dokladu totožnosti

#### II. Účel, právny základ a doba uchovávania
Tabuľka s účelmi spracúvania a právnym základom

#### III. Zdroj údajov a poskytovanie tretím osobám

#### IV. Práva dotknutej osoby
- Prístup k údajom
- Oprava údajov
- Vymazanie údajov
- Obmedzenie spracúvania
- Prenosnosť údajov
- Námietka
- Odvolanie súhlasu
- Sťažnosť dozornému orgánu

#### V. Bezpečnosť osobných údajov

#### VI. Automatizované rozhodovanie a profilovanie

#### VII. Dobrovoľnosť poskytnutia údajov

#### VIII. Dozorný orgán
**Úrad na ochranu osobných údajov Slovenskej republiky**
- Hraničná 12, 820 07 Bratislava 27
- Tel.: +421 2 3231 3214
- Email: statny.dozor@pdp.gov.sk
- Web: www.dataprotection.gov.sk

#### IX. Záverečné ustanovenia

### Footer
"ROYAL STROJE s.r.o. | Verzia GDPR2026.01 | Platné od 01.02.2026 | www.royalstroje.sk"

---

## 14. OBCHODNÉ PODMIENKY

**Súbor:** `src/pages/ObchodnePodmienky.jsx`

### Mobilná hlavička
**Nadpis:** "**Obchodné** podmienky"

**Popis:** "Všeobecné podmienky prenájmu mechanizácie a príslušenstva"

### Tab Selector
- **Právnické osoby** (PO)
- **Fyzické osoby** (FO)

### PO Verzia: VPPM2026.02
**Platné od:** 01. 02. 2026

**17 sekcií zahŕňajúcich:**
- Úvodné ustanovenia
- Predmet prenájmu
- Doba prenájmu
- Miesto užívania a zákaz prenosu
- Fakturácia a platobné podmienky
- Kaucia
- Zodpovednosť nájomcu
- Zabezpečenie PP
- Povinnosti prenajímateľa
- Poruchy a opravy
- Ukončenie prenájmu
- Zmluvná pokuta
- Osobitné podmienky – mobilné WC
- Vyššia moc
- Písomná forma
- Separačná klauzula
- Záverečné ustanovenia

### FO Verzia: VPPM-FO 2026.01
**Platné od:** 01. 02. 2026

**14 sekcií upravujúcich:**
- Úvodné ustanovenia
- Predmet prenájmu
- Záloha a platobné podmienky
- Doba prenájmu
- Miesto užívania
- Zodpovednosť spotrebiteľa
- Povinnosti spotrebiteľa
- Povinnosti prenajímateľa
- Reklamačné podmienky
- Ukončenie zmluvy
- Vyššia moc
- Ochrana osobných údajov
- Alternatívne riešenie sporov
- Záverečné ustanovenia

---

## 15. SEO ELEMENTY

### Meta Title formát (návrh)
**Homepage:** "Požičovňa stavebnej techniky Senec | Royal Stroje"

**Blog:** "Blog - Tipy a rady | Royal Stroje Senec"

**Služby:** "Naše služby - Prenájom a predaj | Royal Stroje"

**Kontakt:** "Kontakt - Požičovňa Senec | Royal Stroje"

### Meta Description formát (návrh)
**Homepage:** "Profesionálna požičovňa stavebnej techniky v Senci. Prenájom náradia, mechanizácie a ťažkej techniky. Rýchla doprava na stavbu. ☎ 0948 555 551"

**Služby:** "Komplexné služby: prenájom, predaj náradia, náhradné diely, zemné práce, servis. Odborné poradenstvo a férové ceny v Senci."

### Keywords (návrh)
- požičovňa stavebnej techniky senec
- prenájom náradia senec
- stavebná mechanizácia senec
- predaj náradia senec
- zemné práce senec
- náhradné diely stavebná technika
- servis náradia senec

---

## 16. CTA TLAČIDLÁ - PREHĽAD

### Primárne CTA (oranžové gradientové)
- "Zavolať teraz" / "Zavolať: 0948 555 551"
- "Poslať objednávku"
- "Kontaktujte nás"

### Sekundárne CTA (sivé s okrajom)
- "Zobraziť katalóg"
- "Naše služby"
- "Napísať email"
- "Otvoriť v Google Maps"

### Textové linky s ikonami
- "Čítať viac →"
- "Viac informácií →"
- "Navštíviť web →"

---

## 17. KONTAKTNÉ ÚDAJE - KONZISTENCIA

### Telefón
+421 948 555 551 (formát s medzerami)
0948 555 551 (skrátený slovenský formát)

### Email
info@royalstroje.sk

### Adresa
**Prevádzkaa:** Recká cesta 182, 925 26 Senec
**Sídlo:** 182, Boldog 92526

### Otváracie hodiny
Po - Pi: 7:00 - 16:00
So - Ne: zatvorené

### Sociálne siete
- Facebook: facebook.com/royalstroje
- Instagram: instagram.com/royalstroje
- LinkedIn: linkedin.com/company/royalstroje
- WhatsApp: +421 948 555 551
- Telegram: @Royalstroje

### Firemné údaje
- **Názov:** Royal stroje, s.r.o.
- **IČO:** 57 405 425
- **DIČ:** 2122722063
- **IČDPH:** SK2122722063
- **Zastúpený:** Peter Krivosudský

---

## 18. FAREBNÁ SCHÉMA TEXTOV

### Desktop
- **Nadpisy H1:** text-white (biela), zvýraznené slová: text-orange-primary
- **Nadpisy H2-H3:** text-white
- **Bežný text:** text-white/80 alebo text-white/70
- **Popisky/hints:** text-white/60 alebo text-white/50
- **Linky:** hover:text-orange-primary

### Mobile
- **Nadpisy H1:** text-xl (menšie), text-white, zvýraznené: text-orange-primary
- **Bežný text:** text-sm alebo text-xs, text-white/70
- **Buttons text:** text-sm (desktop: text-base)

---

## 19. TYPOGRAFIA

### Font sizes
**Desktop:**
- H1: text-4xl až text-6xl (36px - 60px)
- H2: text-3xl až text-4xl (30px - 36px)
- H3: text-xl až text-2xl (20px - 24px)
- Body: text-base až text-lg (16px - 18px)
- Small: text-sm (14px)

**Mobile:**
- H1: text-xl až text-2xl (20px - 24px)
- H2: text-lg až text-xl (18px - 20px)
- H3: text-sm až text-base (14px - 16px)
- Body: text-xs až text-sm (12px - 14px)
- Small: text-[10px] až text-xs (10px - 12px)

### Font weights
- font-black (900) - hlavné nadpisy
- font-bold (700) - CTA tlačidlá, dôležité texty
- font-semibold (600) - podnadpisy
- font-medium (500) - bežný text

---

## 20. POZNÁMKY PRE SEO OPTIMALIZÁCIU

### Odporúčania:
1. **Konzistentnosť** - Udržať jednotný tón hlasu (profesionálny, priateľský, transparentný)
2. **Lokálne SEO** - Zdôrazniť Senec, Bratislava, okolie
3. **Long-tail keywords** - "prenájom minirýpadla senec", "požičovňa stavebnej techniky bratislava okolie"
4. **Akčné slovesá** - "Zavolať", "Objednať", "Kontaktovať", "Prenajať"
5. **Čísla a fakty** - "od roku 2026", "do 24 hodín", "non-stop", "ZDARMA"
6. **Trust signály** - "profesionálny", "overený", "certifikovaný", "transparentný"

### Ďalšie kroky:
- Pridať strukturované dáta (Schema.org)
- Optimalizovať alt texty obrázkov
- Vytvoriť FAQ sekciu (už existuje v Catalog)
- Pridať breadcrumbs navigáciu
- Optimalizovať rýchlosť načítania

---

**Koniec dokumentácie**

Vytvoril: Claude Sonnet 4.5
Dátum: 24.02.2026
