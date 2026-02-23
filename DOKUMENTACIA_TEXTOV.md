# Royal Stroje - Kompletná dokumentácia textov webu

**Účel dokumentu:** SEO optimalizácia a úprava textov
**Verzia:** 1.0
**Dátum:** Január 2025

---

## OBSAH

1. [Meta údaje (SEO)](#1-meta-údaje-seo)
2. [Navigácia (Header)](#2-navigácia-header)
3. [Hlavná stránka (Homepage)](#3-hlavná-stránka-homepage)
4. [Stránka Služby](#4-stránka-služby)
5. [Stránka Kontakt](#5-stránka-kontakt)
6. [Pätička (Footer)](#6-pätička-footer)
7. [Katalóg - Kategórie a podkategórie](#7-katalóg---kategórie-a-podkategórie)
8. [UI prvky a tlačidlá](#8-ui-prvky-a-tlačidlá)

---

## 1. META ÚDAJE (SEO)

> ⚠️ **KRITICKÉ PRE SEO** - Tieto údaje sa zobrazujú vo výsledkoch vyhľadávania

### Súbor: `index.html`

| Element | Aktuálna hodnota | Odporúčanie SEO |
|---------|------------------|-----------------|
| `<title>` | `royalstroje` | Zmeniť na: `Royal Stroje - Požičovňa náradia a stavebnej techniky Senec` |
| `<meta name="description">` | ❌ CHÝBA | Pridať: `Profesionálna požičovňa stavebného náradia a techniky v Senci. Prenájom vŕtačiek, rýpadiel, plošín. Doprava do 24h. ☎ 0948 555 551` |
| `<meta name="keywords">` | ❌ CHÝBA | Pridať: `požičovňa náradia, prenájom stavebnej techniky, Senec, rýpadlo, plošina, búracie kladivo` |
| `lang` | `en` | Zmeniť na: `sk` |
| `<link rel="icon">` | `/vite.svg` | Zmeniť na vlastné logo/favicon |

### Odporúčané Open Graph meta tagy (pre zdieľanie na sociálnych sieťach):
```html
<meta property="og:title" content="Royal Stroje - Požičovňa náradia Senec">
<meta property="og:description" content="Profesionálna požičovňa stavebného náradia a techniky.">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://royalstroje.sk">
```

---

## 2. NAVIGÁCIA (Header)

### Súbor: `src/components/common/Header.jsx`

| Typ | Text | Umiestnenie |
|-----|------|-------------|
| **Logo alt text** | `Royal Stroje` | Logo obrázok |
| **Navigačný link 1** | `Požičovňa` | Hlavná navigácia |
| **Navigačný link 2** | `Služby` | Hlavná navigácia |
| **Navigačný link 3** | `Kontakt` | Hlavná navigácia |
| **CTA tlačidlo** | `0948 555 551` | Telefónne číslo |
| **Aria label** | `WhatsApp` | Ikona WhatsApp |
| **Aria label** | `Telegram` | Ikona Telegram |
| **Aria label** | `Menu` | Mobilné menu |

---

## 3. HLAVNÁ STRÁNKA (Homepage)

### 3.1 HERO SEKCIA

**Súbor:** `src/components/home/Hero.jsx`

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H1 - Hlavný nadpis** | `<h1>` | `Požičovňa náradia a stavebnej techniky` |
| **H1 - Zvýraznená časť** | `<span>` | `stavebnej techniky` (oranžová farba) |
| **Popis** | `<p>` | `Profesionálne náradie, stroje a mechanizácia pre stavby všetkých veľkostí.` |
| **Popis - zvýraznenie** | `<strong>` | `Rýchla doprava na stavbu.` |
| **CTA tlačidlo 1** | `<a>` | `Zavolať teraz` |
| **CTA tlačidlo 2** | `<a>` | `Zobraziť katalóg` |
| **Alt text obrázka** | `alt` | `Royal Stroje - Prenájom stavebnej techniky` |

---

### 3.2 KATALÓG SEKCIA

**Súbor:** `src/components/home/Catalog.jsx`

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H2 - Nadpis sekcie** | `<h2>` | `Vyberte si z našej širokej ponuky` |
| **H2 - Zvýraznená časť** | `<span>` | `širokej ponuky` (oranžová farba) |
| **Podnadpis** | `<p>` | `Profesionálna technika pre každý typ práce - od malého náradia po ťažkú techniku.` |
| **H3 - Sidebar nadpis** | `<h3>` | `Kategórie` |
| **H3 - Košík nadpis** | `<h3>` | `Košík` |
| **Prázdny košík** | `<p>` | `Košík je prázdny` |
| **Label ceny** | `<span>` | `Cena s DPH:` |
| **Tlačidlo odoslania** | `<button>` | `Poslať objednávku` |
| **Stránkovanie - predošlá** | `<button>` | `Predošlá` |
| **Stránkovanie - ďalšia** | `<button>` | `Ďalšia` |
| **Prázdna kategória - nadpis** | `<h3>` | `Žiadne produkty` |
| **Prázdna kategória - text** | `<p>` | `V tejto kategórii momentálne nie sú dostupné žiadne produkty.` |

#### Kalendár (v košíku):
| Text | Kontext |
|------|---------|
| `Január, Február, Marec...` | Názvy mesiacov |
| `Po, Ut, St, Št, Pi, So, Ne` | Skratky dní |
| `Víkendy nie sú k dispozícii` | Tooltip pre víkendy |
| `deň / dni / dní` | Počet vybraných dní |

---

### 3.3 CTA SEKCIA

**Súbor:** `src/components/home/CTASection.jsx`

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H2 - Nadpis** | `<h2>` | `Potrebujete poradiť s výberom?` |
| **Popis** | `<p>` | `Neviete, aké náradie potrebujete pre vašu prácu? Zavolajte nám a náš tím vám ochotne poradí s výberom tej správnej techniky.` |
| **CTA tlačidlo** | `<a>` | `Zavolať teraz: 0948 555 551` |

---

## 4. STRÁNKA SLUŽBY

**Súbor:** `src/pages/Sluzby.jsx`

### 4.1 Hero sekcia

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H1 - Hlavný nadpis** | `<h1>` | `Naše služby` |
| **Popis** | `<p>` | `Komplexné služby pre vašu stavbu – od požičovne náradia cez zemné práce až po servis a dopravu.` |
| **Alt text** | `alt` | `Royal Stroje - Služby` |

### 4.2 Sekcia služieb

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H2 - Nadpis sekcie** | `<h2>` | `Čo pre vás môžeme urobiť` |
| **H2 - Zvýraznená časť** | `<span>` | `môžeme urobiť` (oranžová farba) |
| **Podnadpis** | `<p>` | `Profesionálne služby pre stavebné firmy, remeselníkov aj súkromné osoby` |
| **Link text** | `<span>` | `Viac informácií →` |

### 4.3 Karty služieb

#### Služba 1: Zemné a búracie práce
| Položka | Text |
|---------|------|
| **Názov (H3)** | `Zemné a búracie práce` |
| **Popis** | `Výkopy základov, prípojky inžinierskych sietí, búracie práce s hydraulickým kladivom, terénne úpravy a odvoz odpadu.` |
| **Feature 1** | `Výkopy a základy` |
| **Feature 2** | `Inžinierske siete` |
| **Feature 3** | `Búracie práce` |
| **Feature 4** | `Terénne úpravy` |

#### Služba 2: Servis náradia
| Položka | Text |
|---------|------|
| **Názov (H3)** | `Servis náradia` |
| **Popis** | `Profesionálny servis a údržba stavebného náradia a techniky. Opravy, kontroly a náhradné diely.` |
| **Feature 1** | `Opravy strojov` |
| **Feature 2** | `Preventívna údržba` |
| **Feature 3** | `Náhradné diely` |
| **Feature 4** | `Expresný servis` |

#### Služba 3: Dovoz techniky
| Položka | Text |
|---------|------|
| **Názov (H3)** | `Dovoz techniky` |
| **Popis** | `Rýchla a spoľahlivá doprava náradia a techniky priamo na vašu stavbu. Dovoz do 24 hodín.` |
| **Feature 1** | `Dovoz na stavbu` |
| **Feature 2** | `Odvoz po skončení` |
| **Feature 3** | `Non-stop dostupnosť` |
| **Feature 4** | `Celé Slovensko` |

### 4.4 CTA sekcia

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H2 - Nadpis** | `<h2>` | `Potrebujete poradiť?` |
| **Popis** | `<p>` | `Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.` |
| **CTA tlačidlo** | `<a>` | `Zavolať teraz: 0948 555 551` |

---

## 5. STRÁNKA KONTAKT

**Súbor:** `src/pages/Kontakt.jsx`

### 5.1 Hero sekcia

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H1 - Hlavný nadpis** | `<h1>` | `Kontaktujte nás` |
| **Popis** | `<p>` | `Sme tu pre vás. Zavolajte, napíšte email alebo nás navštívte v našej novootvorenej prevádzke v Senci.` |
| **Alt text** | `alt` | `Royal Stroje - Kontakt` |

### 5.2 Sekcia kontaktov

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H2 - Nadpis sekcie** | `<h2>` | `Neváhajte nás kontaktovať` |
| **H2 - Zvýraznená časť** | `<span>` | `kontaktovať` (oranžová farba) |
| **Podnadpis** | `<p>` | `Vyberte si najpohodlnejší spôsob komunikácie alebo nás navštívte v našej požičovni.` |

### 5.3 Kontaktné karty

#### Karta: Telefón
| Položka | Text |
|---------|------|
| **Nadpis (H3)** | `Telefón` |
| **Hodnota** | `+421 948 555 551` |
| **Popis** | `Non-stop dostupnosť` |

#### Karta: WhatsApp
| Položka | Text |
|---------|------|
| **Nadpis (H3)** | `WhatsApp` |
| **Hodnota** | `0948 555 551` |
| **Popis** | `Rýchla komunikácia` |

#### Karta: Telegram
| Položka | Text |
|---------|------|
| **Nadpis (H3)** | `Telegram` |
| **Hodnota** | `@petokrivo` |
| **Popis** | `Alternatívny kontakt` |

#### Karta: Email
| Položka | Text |
|---------|------|
| **Nadpis (H3)** | `Email` |
| **Hodnota** | `info@royalstroje.sk` |
| **Popis** | `Odpoveď do 24 hodín` |

### 5.4 Adresa a otváracie hodiny

#### Adresa
| Položka | Text |
|---------|------|
| **Nadpis (H3)** | `Adresa` |
| **Ulica** | `Recká cesta 182` |
| **PSČ a mesto** | `925 26 Senec-Boldog` |
| **Link** | `Otvoriť v Google Maps →` |

#### Otváracie hodiny
| Položka | Text |
|---------|------|
| **Nadpis (H3)** | `Otváracie hodiny` |
| **Pracovné dni** | `Pondelok – Piatok: 7:00 – 16:00` |
| **Víkend** | `Sobota – Nedeľa: Zatvorené` |
| **Poznámka** | `⚠️ Non-stop linka pri poruche stroja: 0948 555 551` |

### 5.5 O nás sekcia

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **Nadpis (H3)** | `<h3>` | `O nás` |
| **Odsek 1** | `<p>` | `ROYAL STROJE je profesionálna požičovňa stavebného náradia a techniky pôsobiaca v Senci od roku 2026. Špecializujeme sa na prenájom kvalitného náradia pre stavebné firmy, remeselníkov aj súkromné osoby.` |
| **Odsek 2** | `<p>` | `Naša firma ponúka nielen požičovňu náradia, ale aj komplexné služby v oblasti stavebníctva. Disponujeme vlastnou strojovou technikou a spolupracujeme s viacerými partnermi.` |
| **Podnadpis (H4)** | `<h4>` | `Hodnoty, ktorými sa riadime:` |

#### Hodnoty firmy
| Hodnota | Text |
|---------|------|
| **Profesionalita** | `Všetky stroje servisované a v perfektnom stave` |
| **Spoľahlivosť** | `Dodržiavame termíny a dohody` |
| **Férovosť** | `Transparentné ceny bez skrytých poplatkov` |
| **Dostupnosť** | `Non-stop linka pri problémoch` |
| **Kvalita** | `Spolupráca s prémiovými značkami` |

### 5.6 CTA sekcia

| Typ elementu | Tag | Text |
|--------------|-----|------|
| **H2 - Nadpis** | `<h2>` | `Navštívte nás v Senci alebo zavolajte` |
| **Popis** | `<p>` | `Tešíme sa na spoluprácu s vami!` |
| **CTA tlačidlo** | `<a>` | `Zavolať teraz: 0948 555 551` |

---

## 6. PÄTIČKA (Footer)

**Súbor:** `src/components/common/Footer.jsx`

### 6.1 Stĺpec: O firme

| Položka | Text |
|---------|------|
| **Logo text** | `ROYAL STROJE` |
| **Popis** | `Profesionálna požičovňa v Senci. Ponúkame prenájom a predaj špičkovej stavebnej techniky a náradia pre vaše najnáročnejšie práce. Budujte s dôverou.` |

### 6.2 Stĺpec: Rýchle linky

| Typ | Text |
|-----|------|
| **Nadpis (H4)** | `Rýchle linky` |
| **Link 1** | `Požičovňa náradia` |
| **Link 2** | `Služby` |
| **Link 3** | `Kontakt` |
| **Link 4** | `Obchodné podmienky` |
| **Link 5** | `GDPR` |

### 6.3 Stĺpec: Kontakt

| Typ | Text |
|-----|------|
| **Nadpis (H4)** | `Kontakt` |
| **Telefón** | `+421 948 555 551` |
| **Email** | `info@royalstroje.sk` |
| **Adresa** | `Recká cesta 182, 925 26 Senec-Boldog` |
| **Hodiny** | `Po-Pi: 7:00-16:00` |
| **Hodiny** | `So-Ne: zatvorené` |

### 6.4 Stĺpec: Sociálne siete

| Typ | Text |
|-----|------|
| **Nadpis (H4)** | `Sledujte nás` |
| **Aria labels** | `Facebook`, `Instagram`, `WhatsApp`, `Telegram` |

### 6.5 Copyright

| Typ | Text |
|-----|------|
| **Copyright** | `© 2026 Royal Stroje. Všetky práva vyhradené.` |

---

## 7. KATALÓG - KATEGÓRIE A PODKATEGÓRIE

**Súbor:** `src/data/categories.js`

### 7.1 Malé náradie
| Položka | Text |
|---------|------|
| **Názov kategórie** | `Malé náradie` |
| **Popis** | `Ručné náradie, vŕtačky, brúsky, píly, vysávače, čerpadlá, meracia technika` |

**Podkategórie:**
- `Všetko`
- `Vŕtacie búracie kladivá a vŕtačky`
- `Uhlové, vibračné a pásové brúsky`
- `Ručné píly a rezačky`
- `Vysávače, tepovače a tlakové čističe`
- `Čerpadlá, ohrievače a odvlhčovače`
- `Zváracia a meracia technika`
- `Vibrátory, vibračné lišty a miešadlá`
- `Lešenie`
- `Nádrže na vodu a naftu`

---

### 7.2 Stredná mechanizácia
| Položka | Text |
|---------|------|
| **Názov kategórie** | `Stredná mechanizácia` |
| **Popis** | `Vibračné dosky, elektrocentrály, kompresory, cestné rezačky, miešačky` |

**Podkategórie:**
- `Všetko`
- `Vibračné dosky a nohy`
- `Elektrocentrály`
- `Kompresory`
- `Cestné rezačky, frézy a brúsky`
- `Stolové a portálové píly`
- `Miešačky, hladičky betónu a bádie`
- `Manipulačná technika`

---

### 7.3 Ťažká technika
| Položka | Text |
|---------|------|
| **Názov kategórie** | `Ťažká technika` |
| **Popis** | `Rýpadlá, nakladače, dumpre, valce, manipulátory - s obsluhou aj bez` |
| **Badge** | `S OBSLUHOU` |

**Podkategórie:**
- `Všetko`
- `Pásové mini-rýpadlá`
- `Pásové ťažké rýpadlá`
- `Kolesové rýpadlá a nakladače`
- `Šmykom riadené nakladače`
- `Dumpre`
- `Valce`
- `Manipulátory a vysokozdvižné vozíky`

---

### 7.4 Pracovné plošiny
| Položka | Text |
|---------|------|
| **Názov kategórie** | `Pracovné plošiny` |
| **Popis** | `Interiérové a exteriérové plošiny pre prácu vo výške` |

**Podkategórie:**
- `Všetko`
- `Interiérové plošiny`
- `Exteriérové plošiny`

---

### 7.5 Vybavenie staveniska
| Položka | Text |
|---------|------|
| **Názov kategórie** | `Vybavenie staveniska` |
| **Popis** | `Kontajnery, vrátnice, oplotenie, zábrany, mobilné toalety` |

**Podkategórie:**
- `Všetko`
- `Kancelárske kontajnery a vrátnice`
- `Skladové kontajnery`
- `Sanitárne kontajnery`
- `Mobilné oplotenie a zábrany`
- `Mobilné toalety`

---

### 7.6 Autá a prívesné vozíky
| Položka | Text |
|---------|------|
| **Názov kategórie** | `Autá a prívesné vozíky` |
| **Popis** | `Autá, dodávky a prívesné vozíky na prepravu techniky` |

**Podkategórie:**
- `Všetko`
- `Autá a dodávky`
- `Prívesné vozíky`

---

### 7.7 Záhradná technika
| Položka | Text |
|---------|------|
| **Názov kategórie** | `Záhradná technika` |
| **Popis** | `Kosačky, krovinorezy, fukovače, vertikutátory a ďalšia záhradná technika` |

**Podkategórie:**
- `Všetko`
- `Kosačky na trávu`
- `Krovinorezy a motorové píly`
- `Fukovače a vysávače lístia`
- `Vertikutátory a prevzdušňovače`
- `Drviče konárov a vetiev`
- `Kultivácie a rotavátory`

---

## 8. UI PRVKY A TLAČIDLÁ

### 8.1 Call-to-Action tlačidlá

| Kontext | Text |
|---------|------|
| Header | `0948 555 551` |
| Hero | `Zavolať teraz` |
| Hero | `Zobraziť katalóg` |
| CTA sekcie | `Zavolať teraz: 0948 555 551` |
| Košík | `Poslať objednávku` |
| Služby | `Viac informácií →` |
| Kontakt | `Otvoriť v Google Maps →` |

### 8.2 Formulárové texty (WhatsApp správa)

```
Dobrý deň, mám záujem o prenájom:

- [Názov produktu] ([Cena])
- [Názov produktu] ([Cena])

Vybrané dni ([počet]): [dátumy]

Celková suma: [suma]€ ([počet] dní)
```

### 8.3 Stránkovanie

| Text | Kontext |
|------|---------|
| `Predošlá` | Tlačidlo predošlá strana |
| `Ďalšia` | Tlačidlo ďalšia strana |

### 8.4 Stavy a upozornenia

| Text | Kontext |
|------|---------|
| `Košík je prázdny` | Prázdny košík |
| `Žiadne produkty` | Prázdna kategória |
| `V tejto kategórii momentálne nie sú dostupné žiadne produkty.` | Prázdna kategória - popis |
| `Víkendy nie sú k dispozícii` | Kalendár tooltip |
| `Non-stop dostupnosť` | Telefónny kontakt |
| `Rýchla komunikácia` | WhatsApp |
| `Alternatívny kontakt` | Telegram |
| `Odpoveď do 24 hodín` | Email |

---

## POZNÁMKY PRE SEO OPTIMALIZÁCIU

### Prioritné oblasti na zlepšenie:

1. **Meta údaje** - Chýbajú kritické SEO tagy
2. **H1 nadpisy** - Každá stránka by mala mať jedinečný H1
3. **Alt texty** - Pridať popisné alt texty k všetkým obrázkom produktov
4. **Interné linkovanie** - Zvážiť pridanie breadcrumbs
5. **Schema markup** - Pridať štruktúrované dáta pre LocalBusiness

### Kľúčové slová na zahrnutie:

- požičovňa náradia Senec
- prenájom stavebnej techniky
- požičovňa rýpadiel
- prenájom búracieho kladiva
- stavebná mechanizácia Bratislava okolie
- prenájom plošín
- zemné práce Senec
- servis stavebného náradia

---

*Koniec dokumentácie*
