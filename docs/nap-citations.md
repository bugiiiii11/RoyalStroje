# NAP citácie -- pracovný návod

NAP = Name, Address, Phone. Cieľ: rovnaké údaje o firme na čo najviac
dôveryhodných miestach na webe. Google porovnáva tieto zmienky s Firemným
profilom -- čím viac zhodných, tým istejšie vie, že firma na tej adrese
naozaj sídli. Toto je hlavná páka na lokálny ranking, ktorú vieme ovplyvniť
mimo samotného GBP.

Dôležité: **zhoda je dôležitejšia ako počet.** 10 presných záznamov je viac
ako 40 s preklepmi. Nekonzistentná adresa aktívne škodí -- presne to bol
problém zistený v session 51 (šesť rôznych variantov adresy na vlastnom webe).

---

## 1. Kanonický NAP -- kopíruj presne, znak po znaku

Toto je jediná správna verzia. Nič v nej nemeň, neskracuj, neprekladaj.

```
Názov:     Royal Stroje s.r.o.
Adresa:    Rečká cesta 182
PSČ:       925 26
Mesto:     Boldog
Krajina:   Slovensko
Telefón:   +421 948 555 551
E-mail:    info@royalstroje.sk
Web:       https://royalstroje.sk
IČO:       57 405 425
DIČ:       2122722063
IČ DPH:    SK2122722063
Konateľ:   Peter Krivosudský
```

Na čo si dať pozor:

- **Mäkčeň v "Rečká"** -- ak formulár diakritiku nezvláda, nechaj `Recka cesta 182`,
  ale nikdy nie preklep `Réčka` (ten bol na webe do s51).
- **Web bez `www`** -- apex je od s48 kanonická doména, `www` sa presmerováva.
- **Telefón v jednom tvare** -- všade `+421 948 555 551`. Tvar `0948 555 551`
  používaj len tam, kde formulár medzinárodnú predvoľbu odmieta.
- **Boldog, nie Senec.** "Senec" je marketingové kľúčové slovo do popisu, nie
  do poľa Mesto. V popise pokojne píš "požičovňa v okrese Senec".
- **V GBP je v poli Web `https://www.royalstroje.sk/`** (vidno to na importe
  do Bing Places). Od s48 je kanonická doména apex, `www` sa 308-presmerováva.
  Nie je to chyba, ale pri najbližšej úprave profilu to zmeň na
  `https://royalstroje.sk` -- ušetrí to jeden presmerovací skok.

### Dve adresy -- nepliesť si ich

| Účel | Adresa | Kde sa používa |
|------|--------|----------------|
| Prevádzka (dvor) | `Rečká cesta 182, 925 26 Boldog` | GBP, katalógy, web, schema, mapy |
| Sídlo (register) | `Boldog 182, 925 26 Boldog` | zmluvy, faktúry, GDPR, obchodné podmienky |

**Do katalógov ide vždy prevádzka.** Stránky, ktoré ťahajú dáta z obchodného
registra (FinStat, ORSR, registeruz), budú ukazovať sídlo -- to je v poriadku
a netreba to opravovať, Google tieto dva zdroje rozlišuje.

---

## 2. Postup pre každý katalóg

Vždy v tomto poradí, inak si narobíš duplicity:

1. **Najprv hľadaj, či záznam už neexistuje.** Do vyhľadávania na danom webe
   zadaj `Royal Stroje`, potom `57405425` (IČO), potom `Rečká cesta`.
   Mnohé slovenské katalógy si firmy automaticky naimportovali z registra.
2. **Ak záznam existuje -> nárokuj si ho** ("Prevziať firmu", "Som majiteľ",
   "Upraviť údaje"). Nikdy nezakladaj druhý.
3. **Ak neexistuje -> založ nový** a vyplň kanonický NAP zhora.
4. **Vyplň profil do konca** -- kategória, otváracie hodiny, popis, minimálne
   3 fotky z dvora, odkaz na web. Poloprázdny záznam má malú váhu.
5. **Zapíš si to** do tabuľky v sekcii 5 (URL záznamu + prihlasovací e-mail).

Popis firmy (skopíruj, sedí do väčšiny formulárov):

```
Royal Stroje s.r.o. je požičovňa stavebnej techniky, náradia a záhradných
strojov v Boldogu pri Senci. Prenajímame mini-rýpadlá, vibračné dosky,
pracovné plošiny, lešenia, kontajnery a viac ako 140 ďalších strojov.
Dovoz techniky priamo na stavbu do 24 hodín v okolí Senca, Bratislavy,
Pezinka a Trnavy. Servisované stroje, zaškolenie obsluhy, poradenstvo.
```

---

## 3. Kam sa zaregistrovať -- podľa priority

### Úroveň 1: mapové a vyhľadávacie platformy (najvyššia váha)

| Platforma | URL | Poznámka |
|-----------|-----|----------|
| Google Business Profile | business.google.com | HOTOVO (overený profil) |
| Bing Places for Business | bingplaces.com | HOTOVO (import z GBP). Živí Bing aj Copilot -- rastie s AI vyhľadávaním |
| Apple Business Connect | businessconnect.apple.com | Zadarmo. Apple Maps = každý iPhone. Overenie cez telefonát alebo dokument |
| Waze | waze.com/business | Zadarmo, používajú vodiči -- relevantné pre dovoz techniky |
| Facebook stránka | facebook.com | Existuje. Skontroluj, či má vyplnenú adresu, hodiny a telefón -- Google ju číta |

**Firmy.cz / Mapy.cz -- NEREGISTROVAŤ.** Seznam do Firmy.cz púšťa len firmy
s činnosťou v Českej republike, slovenská adresa tam neprejde. Pre firmu
pôsobiacu výhradne na Slovensku to nemá zmysel.

### Úroveň 2: slovenské firemné katalógy

Slovenská katalógová scéna za posledné roky prakticky vymrela. Overené
k 14. 8. 2026 -- **firmy.sk (zaparkovaná doména), firmy.azet.sk (doména
neexistuje), surne.sk (na predaj) a edb.sk (nedostupná) už nefungujú.**
Zostáva toto:

| Katalóg | URL | Poznámka |
|---------|-----|----------|
| Azet katalóg firiem | azet.sk/katalog/pridat/firma/ | Žije, len sa presťahoval z `firmy.azet.sk`. Zadarmo, až 3 kategórie, zápis schvaľuje administrátor |
| Zlaté stránky | zlatestranky.sk | HOTOVO. Budú volať s ponukou plateného zápisu -- netreba |
| Firemný portál | katalog-firiem.firemnyportal.sk/sk/registracia-firmy | Menší, ale živý a zadarmo |
| FinStat | finstat.sk | Ťahá z registra (ukáže sídlo). Dá sa doplniť kontakt a web |
| Infoma | infoma.sk | **Platená inzercia**, nie bezplatný zápis. Neoplatí sa |
| SlovakData | slovakdata.sk | Len automatický výpis z registra, nedá sa doň zapisovať. Ignorovať |

Keďže katalógov ostalo málo, ťažisko sa presúva na úroveň 3 -- tam je aj
vyššia hodnota, lebo ide o skutočné odkazy z relevantných webov.

### Úroveň 3: odborové a lokálne

- **Portály o stavebníctve a technike** -- katalógy dodávateľov, sekcie
  "požičovne". Hľadaj `prenájom stavebnej techniky katalóg firiem`.
- **Obecné a regionálne weby** -- Boldog, Senec, okres Senec: sekcie
  "firmy v obci" alebo "podnikatelia".
- **Bazáre a inzertné portály** so stálym profilom firmy (Bazoš, Autobazár
  pri predaji techniky) -- ak už tam inzerujete, doplňte v profile adresu.
- **Dodávatelia a partneri** -- ak vás výrobcovia strojov uvádzajú v sekcii
  "predajcovia / partneri", požiadajte o uvedenie plnej adresy a odkazu.
  Toto je najsilnejší typ citácie, lebo prichádza s odkazom z relevantného webu.

---

## 4. Čo nerobiť

- **Neplať za "hromadnú registráciu do 200 katalógov".** Tieto služby vytvárajú
  duplicitné a nepresné záznamy, ktoré potom nikto nevie vymazať. Presný opak
  toho, čo chceme.
- **Nezakladaj druhý záznam,** keď prvý nevieš odomknúť -- radšej napíš podpore
  daného katalógu.
- **Nepoužívaj rôzne názvy** ("Royal stroje", "ROYAL STROJE sro", "Royalstroje").
  Vždy `Royal Stroje s.r.o.`
- **Nemeň adresu na webe** podľa toho, ako ju zobrazuje Google. Google si
  formát prispôsobuje sám (napr. dopĺňa okres), to nie je nezhoda.

---

## 5. Evidencia -- dopĺňaj priebežne

| Katalóg | URL záznamu | Prihlásenie (e-mail) | Dátum | Stav |
|---------|-------------|----------------------|-------|------|
| Google Business Profile | | | 2026-08-13 | hotovo, overené |
| Bing Places | | | 2026-08-14 | hotovo, čaká na publikovanie (7-12 dní) |
| Zlaté stránky | | | 2026-08-14 | hotovo |
| Apple Business Connect | | | | odovzdané zakladateľovi (treba Apple ID) |
| Facebook | | | | existuje, zakladateľ kontroluje údaje |
| Azet katalóg | | | | |
| Firemný portál | | | | |
| Waze | | | | |
| FinStat | | | | |

---

## 6. Očakávania

Citácie nie sú vypínač. Google ich musí prelieziť a spárovať s profilom --
prvé efekty sa dajú čakať v ráde týždňov, plný efekt mesiacov. Meraj to
v GBP cez Výkonnosť (počet zobrazení vo Vyhľadávaní a Mapách), nie denným
kontrolovaním pozície -- tá sa líši podľa toho, odkiaľ sa pozeráš.
