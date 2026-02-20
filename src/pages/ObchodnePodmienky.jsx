import { useState } from 'react';
import { FileText, Building2, User } from 'lucide-react';

export default function ObchodnePodmienky() {
  const [activeTab, setActiveTab] = useState('po'); // 'po' or 'fo'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt="Royal Stroje - Obchodné podmienky"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

        {/* Modern geometric bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden z-30">
          <svg className="absolute bottom-0 w-full h-20" viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              d="M0,80 L0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30 L1440,80 Z"
              fill="#09090b"
            />
            <path
              d="M0,30 L200,30 L250,0 L600,0 L650,30 L900,30 L950,15 L1200,15 L1250,30 L1440,30"
              fill="none"
              stroke="rgba(255,102,0,0.6)"
              strokeWidth="2"
            />
            <path
              d="M250,0 L600,0"
              fill="none"
              stroke="rgba(255,102,0,0.8)"
              strokeWidth="3"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-primary to-orange-hover flex items-center justify-center">
                <FileText size={28} className="text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                <span className="text-orange-primary">Obchodné</span> podmienky
              </h1>
            </div>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Všeobecné podmienky prenájmu mechanizácie a príslušenstva
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative py-16 bg-gradient-to-b from-zinc-950 via-zinc-950 to-black">
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Tab Selector */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-zinc-900 border border-white/10 rounded-2xl p-2 gap-2">
              <button
                onClick={() => setActiveTab('po')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'po'
                    ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <Building2 size={20} />
                <span>Právnické osoby</span>
              </button>
              <button
                onClick={() => setActiveTab('fo')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === 'fo'
                    ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <User size={20} />
                <span>Fyzické osoby</span>
              </button>
            </div>
          </div>

          {/* Content for Právnické osoby (PO) */}
          {activeTab === 'po' && (
            <>
              {/* Header Info */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                  <div>
                    <p className="text-white/60 mb-1">Verzia</p>
                    <p className="text-white font-semibold">VPPM2026.02</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Platné od</p>
                    <p className="text-white font-semibold">01. 02. 2026</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Vydavateľ</p>
                    <p className="text-white/80">ROYAL STROJE s.r.o., Recká cesta 182, 925 26 Boldog – Senec</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Web</p>
                    <p className="text-white/80">www.royalstroje.sk</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-white/60 mb-1">Určené pre</p>
                    <p className="text-white/80">Právnické osoby a fyzické osoby – podnikatelia (SZČO)</p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">

            {/* Section I */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">I.</span> Úvodné ustanovenia
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Tieto VPPM tvoria neoddeliteľnú súčasť Zmluvy o prenájme hnuteľných vecí uzatvorenej medzi ROYAL STROJE s.r.o. (Prenajímateľ) a Nájomcom.</p>
                <p><strong className="text-white">2.</strong> VPPM sú záväzné podpisom Zmluvy oboma stranami. Zverejnenie na webe nenahrádza písomný súhlas.</p>
                <p><strong className="text-white">3.</strong> V prípade rozporu má prednosť Zmluva. Vzťahy neupravené VPPM ani Zmluvou sa riadia Obchodným zákonníkom č. 513/1991 Zb.</p>
                <p><strong className="text-white">4.</strong> Tieto VPPM sú určené výlučne pre podnikateľov (PO a SZČO).</p>
              </div>
            </div>

            {/* Section II */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">II.</span> Predmet prenájmu
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> PP je špecifikovaný v Zmluve vrátane identifikácie, výrobného čísla, príslušenstva a sadzby.</p>
                <p><strong className="text-white">2.</strong> PP je odovzdávaný v stave zodpovedajúcom jeho veku, opotrebeniu a účelu. Nájomca prevzatie potvrdzuje podpisom; výhrady musia byť uvedené v preberacom protokole.</p>
              </div>
            </div>

            {/* Section III */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">III.</span> Doba prenájmu
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Prenájom začína dňom a časom uvedeným v Zmluve a trvá do riadneho fyzického vrátenia PP a jeho protokolárneho prevzatia Prenajímateľom. Odstavenie PP pred prevádzkou bez protokolárneho prevzatia sa za vrátenie nepovažuje.</p>
                <p><strong className="text-white">2.</strong> Nevrátenie v termíne sa považuje za neoprávnené užívanie a zakladá skutkovú podstatu trestného činu.</p>
              </div>
            </div>

            {/* Section IV */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">IV.</span> Miesto užívania a zákaz prenosu
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> PP sa môže používať výlučne na mieste uvedenom v Zmluve. Premiestnenie bez písomného súhlasu Prenajímateľa zakladá nárok na zmluvnú pokutu 200 EUR/prípad.</p>
                <p><strong className="text-white">2.</strong> Subprenájom alebo umožnenie užívania PP tretej osobe je možné výlučne s písomným súhlasom Prenajímateľa.</p>
                <p><strong className="text-white">3.</strong> Nájomca nesmie bez písomného súhlasu Prenajímateľa vykonávať akékoľvek zmeny, úpravy ani zásahy do PP (vrátane vŕtania, lepenia, inštalácií). Porušenie = zmluvná pokuta 200 EUR + náhrada škody.</p>
                <p><strong className="text-white">4.</strong> Nájomca je povinný umožniť Prenajímateľovi kedykoľvek prístup k PP za účelom kontroly stavu a dodržiavania podmienok Zmluvy.</p>
              </div>
            </div>

            {/* Section V */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">V.</span> Fakturácia a platobné podmienky
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Nájomné je fakturované po ukončení prenájmu. Pri prenájme dlhšom ako 1 mesiac môže Prenajímateľ fakturovať priebežne (spravidla mesačne). Nevystavenie priebežnej faktúry nemá vplyv na vznik nároku na nájomné.</p>
                <p><strong className="text-white">2.</strong> Splatnosť faktúr: 14 dní od vystavenia, ak nie je dohodnuté inak.</p>
                <p><strong className="text-white">3.</strong> Pri omeškaní: úrok z omeškania 0,05 % denne z dlžnej sumy (§ 369 OBZ). Tým nie je dotknuté právo na náhradu škody v plnej výške.</p>
                <p><strong className="text-white">4.</strong> Prenajímateľ je oprávnený postúpiť pohľadávky z tejto Zmluvy tretej osobe bez súhlasu Nájomcu; o postúpení je povinný Nájomcu písomne informovať. Nájomca nie je oprávnený postúpiť práva zo Zmluvy bez písomného súhlasu Prenajímateľa.</p>
              </div>
            </div>

            {/* Section VI */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">VI.</span> Kaucia (zábezpeka)
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Ak bola dohodnutá zábezpeka, Prenajímateľ je oprávnený ju započítať na: neuhradené nájomné, náhradu škody, náklady na čistenie a opravy, iné pohľadávky zo Zmluvy.</p>
                <p><strong className="text-white">2.</strong> Zostatok zábezpeky bude vrátený do <strong className="text-white">14 dní</strong> od úplného vysporiadania všetkých záväzkov Nájomcu.</p>
                <p><strong className="text-white">3.</strong> Prenajímateľ môže počas prenájmu požadovať navýšenie zábezpeky, ak sa preukázateľne zvýšilo riziko poškodenia alebo straty PP.</p>
              </div>
            </div>

            {/* Section VII */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">VII.</span> Zodpovednosť nájomcu
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Nájomca zodpovedá za PP od prevzatia až do riadneho vrátenia, vrátane zodpovednosti za škody tretích osôb s prístupom k PP.</p>
                <p><strong className="text-white">2.</strong> Nájomca zodpovedá za škody nad rámec bežného opotrebenia. Pri strate, zničení alebo odcudzení je povinný uhradiť obstarávaciu cenu nového porovnateľného PP ku dňu vzniku škody. Hodnota PP sa pri spore určí znaleckým posudkom; náklady znáša strana, ktorej tvrdenie sa nepreukáže.</p>
                <p><strong className="text-white">3.</strong> Nájomca je povinný bezodkladne (najneskôr do 4 hodín) písomne oznámiť každú poruchu, poškodenie, haváriu alebo odcudzenie PP.</p>
              </div>
            </div>

            {/* Section VIII */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">VIII.</span> Zabezpečenie PP
              </h2>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Nájomca je povinný zabezpečiť PP po celú dobu prenájmu minimálne takto:</p>

                <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                  <h4 className="text-orange-primary font-bold mb-2">V uzavretom priestore:</h4>
                  <p>Uzamknuté zapaľovanie, mechanické zabezpečenie (reťaz/pevný bod), bezpečnostná vložka, štít, oplechovanie dverí.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                  <h4 className="text-orange-primary font-bold mb-2">Na otvorenom priestranstve:</h4>
                  <p>Uzamknuté zapaľovanie, mechanické zabezpečenie, oplotenie min. 1,8 m s uzamknutou bránou a trvalou strážnou službou.</p>
                </div>

                <div className="bg-zinc-950/50 rounded-xl p-4 border border-white/5">
                  <h4 className="text-orange-primary font-bold mb-2">Príslušenstvo:</h4>
                  <p>Kladivá, lopaty a pod.: uzamknutá reťaz v uzamknutom priestore aj počas prestávok.</p>
                </div>

                <p><strong className="text-white">2.</strong> Porušenie tejto povinnosti sa považuje za hrubé porušenie Zmluvy.</p>
              </div>
            </div>

            {/* Section IX */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">IX.</span> Povinnosti prenajímateľa
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Prenajímateľ je povinný odovzdať PP v stave spôsobilom na dohodnuté užívanie s príslušnou dokumentáciou a zabezpečiť Nájomcovi pokojné a nerušené užívanie PP po celú dobu prenájmu.</p>
                <p><strong className="text-white">2.</strong> Prenajímateľ odstraňuje závady a poruchy PP vzniknuté bežným opotrebením do <strong className="text-white">48 hodín</strong> od nahlásenia. Ak to nesplní, má Nájomca právo na primeranú zľavu z nájomného za dobu nespôsobilosti PP; právo zanikne, ak nie je uplatnené do 7 dní.</p>
                <p><strong className="text-white">3.</strong> Prenajímateľ zodpovedá za skryté vady PP existujúce ku dňu odovzdania. Nájomca je povinný skrytú vadu bezodkladne nahlásiť; Prenajímateľ vadu odstráni alebo PP vymení, inak má Nájomca právo na zľavu alebo predčasné ukončenie bez sankcií.</p>
              </div>
            </div>

            {/* Section X */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">X.</span> Poruchy a opravy
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Pri poruche spôsobenej bežným opotrebením zabezpečí Prenajímateľ opravu do 48 hodín od nahlásenia.</p>
                <p><strong className="text-white">2.</strong> Pri poruche zavinenej Nájomcom hradí Nájomca všetky náklady na opravu a nájomné počas doby opravy.</p>
                <p><strong className="text-white">3.</strong> Pri spore o príčinu poruchy objedná Prenajímateľ odborný posudok; náklady znáša strana, ktorej zavinenie bude preukázané. Do skončenia sporu nie je Prenajímateľ povinný PP prevziať; Nájomca naďalej hradí nájomné.</p>
              </div>
            </div>

            {/* Section XI */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">XI.</span> Ukončenie prenájmu a odstúpenie
              </h2>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Prenajímateľ môže odstúpiť od Zmluvy alebo ju vypovedať s okamžitou účinnosťou ak:</p>
                <ul className="space-y-1 ml-6 list-disc list-inside">
                  <li>omeškanie s úhradou &gt; 7 dní</li>
                  <li>porušenie povinností Nájomcu</li>
                  <li>neoprávnené premiestnenie PP</li>
                  <li>podozrenie zo zneužitia PP</li>
                  <li>podanie návrhu na konkurz/reštrukturalizáciu alebo začatie exekúcie voči Nájomcovi</li>
                  <li>klamlivé údaje pri uzatváraní Zmluvy</li>
                  <li>trestné stíhanie štatutára Nájomcu</li>
                  <li>platobná neschopnosť</li>
                </ul>

                <p><strong className="text-white">2.</strong> Po odstúpení je Prenajímateľ oprávnený:</p>
                <ul className="space-y-1 ml-6 list-disc list-inside">
                  <li>odobrať PP na náklady Nájomcu</li>
                  <li>požadovať zmluvnú pokutu 1,5-násobok denného nájomného za každý deň omeškania s vrátením</li>
                  <li>požadovať náhradu škody vrátane ušlého nájomného</li>
                  <li>podať trestné oznámenie</li>
                </ul>

                <p><strong className="text-white">3.</strong> Písomné odstúpenie/výpoveď nadobúda účinky dňom doručenia. Pri pochybnostiach platí fikcia doručenia 7. deň po odoslaní poštou.</p>
              </div>
            </div>

            {/* Section XII */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">XII.</span> Zmluvná pokuta
              </h2>

              <div className="text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Pri podstatnom porušení povinností je Prenajímateľ oprávnený uplatniť zmluvnú pokutu do výšky <strong className="text-white">1 000 EUR</strong> za každé jednotlivé porušenie. Zmluvná pokuta sa uplatňuje nezávisle od náhrady škody.</p>
              </div>
            </div>

            {/* Section XIII */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">XIII.</span> Osobitné podmienky – mobilné WC a kontajnery
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> PP musí byť umiestnený na rovnej spevnenej ploche, najďalej 10 m od prístupovej komunikácie, s nepretržitým prístupom. Nájomca je povinný zabezpečiť súhlas vlastníka pozemku (ak nie je Nájomca vlastníkom).</p>
                <p><strong className="text-white">2.</strong> Elektrické pripojenie smie vykonávať len osoba s elektrotechnickou kvalifikáciou (3×230V/400V, min. prierez 4 mm², istenie 3×16A, uzemnenie povinné). Pripojenie vody: ¾ rýchlospojka; kanalizácia: HT DN 100 mm.</p>
                <p><strong className="text-white">3.</strong> Zdvíhanie kontajnera: výlučne za všetky 4 rohy hornými okami, laná rovnakej dĺžky, bez prudkých pohybov. Na streche PP nesmie byť uskladnený žiadny materiál.</p>
                <p><strong className="text-white">4.</strong> V PP nie je dovolené zasahovať do elektroinštalácie, robiť otvory ani vešať predmety na konštrukciu bez písomného súhlasu Prenajímateľa.</p>
                <p><strong className="text-white">5.</strong> Servis mobilných toaliet: Prenajímateľ zabezpečuje spravidla týždenne (vyčerpanie, ČOV, doplnenie chemikálií). Ak Nájomca servis neumožní, znáša všetky náklady. Poplatok za nevyprázdnený fekálny tank: <strong className="text-white">250 EUR</strong>.</p>
                <p><strong className="text-white">6.</strong> Nájomca zodpovedá za vandalizmus a nadmerné znečistenie PP.</p>
              </div>
            </div>

            {/* Sections XIV-XVII */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">XIV.</span> Vyššia moc (force majeure)
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Žiadna zo strán nie je v omeškaní, ak nesplnenie záväzku bolo spôsobené okolnosťami vylučujúcimi zodpovednosť podľa § 374 OBZ (prírodné katastrofy, vojnový stav, pandémia, štrajk celoodvetvového charakteru, úradné rozhodnutie).</p>
                <p><strong className="text-white">2.</strong> Strana dovolávajúca sa vyššej moci je povinná to bezodkladne písomne oznámiť. Ak prekážka trvá &gt; 30 dní, každá strana môže od Zmluvy odstúpiť bez náhrady škody; záväzky pred vznikom prekážky zostávajú nedotknuté. Povinnosť platiť nájomné je počas vyššej moci pozastavená v rozsahu, v akom Nájomca PP nemôže užívať.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">XV.</span> Písomná forma a doručovanie
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Za písomnú formu sa považuje: listinný originál; e-mail z adresy uvedenej v Zmluve; overená dátová schránka. Odstúpenie od Zmluvy a uplatnenie zmluvnej pokuty nad 500 EUR vyžadujú listinnú formu s vlastnoručným podpisom.</p>
                <p><strong className="text-white">2.</strong> Zmluvné strany sú povinné do 5 pracovných dní písomne oznámiť zmenu sídla, adresy alebo e-mailu. Listinné zásielky zaslané doporučenou poštou sa považujú za doručené: dňom prevzatia; dňom odmietnutia; 7. pracovný deň po odoslaní (fikcia doručenia).</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">XVI.</span> Separačná klauzula
              </h2>

              <div className="text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Ak sa niektoré ustanovenie stane neplatným alebo nevykonateľným, ostatné ustanovenia zostávajú v plnej platnosti a účinnosti.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                <span className="text-orange-primary">XVII.</span> Záverečné ustanovenia
              </h2>

              <div className="space-y-3 text-white/80 leading-relaxed">
                <p><strong className="text-white">1.</strong> Nájomca podpisom Zmluvy potvrdzuje, že sa s VPPM oboznámil, porozumel im a akceptuje ich.</p>
                <p><strong className="text-white">2.</strong> Nájomca nie je oprávnený postúpiť práva zo Zmluvy bez písomného súhlasu Prenajímateľa.</p>
                <p><strong className="text-white">3.</strong> Miestne príslušným súdom pre spory je súd v <strong className="text-white">Bratislave</strong>, ak nie je v Zmluve dohodnuté inak.</p>
                <p><strong className="text-white">4.</strong> Prenajímateľ môže VPPM jednostranne meniť; o zmene informuje minimálne 30 dní vopred. Na existujúce zmluvy sa zmeny nevzťahujú bez súhlasu Nájomcu.</p>
              </div>
            </div>

              </div>

              {/* Footer */}
              <div className="text-center mt-12 pt-8 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  ROYAL STROJE s.r.o. | Verzia VPPM2026.02 | Platné od 01.02.2026 | www.royalstroje.sk
                </p>
                <p className="text-white/40 text-xs mt-2">
                  Recká cesta 182, 925 26 Boldog – Senec | IČO: 57 405 425 | info@royalstroje.sk
                </p>
              </div>
            </>
          )}

          {/* Content for Fyzické osoby (FO) */}
          {activeTab === 'fo' && (
            <>
              {/* Header Info */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                  <div>
                    <p className="text-white/60 mb-1">Verzia</p>
                    <p className="text-white font-semibold">VPPM-FO 2026.01</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Platné od</p>
                    <p className="text-white font-semibold">01. 02. 2026</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Vydavateľ</p>
                    <p className="text-white/80">ROYAL STROJE s.r.o., Recká cesta 182, 925 26 Boldog – Senec</p>
                  </div>
                  <div>
                    <p className="text-white/60 mb-1">Web</p>
                    <p className="text-white/80">www.royalstroje.sk</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-white/60 mb-1">Určené pre</p>
                    <p className="text-white/80">Fyzické osoby – nepodnikatelia (spotrebitelia)</p>
                  </div>
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">

                {/* Section I */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">I.</span> Úvodné ustanovenia
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Tieto Všeobecné podmienky prenájmu mechanizácie a príslušenstva pre fyzické osoby (ďalej len VPPM-FO) tvoria neoddeliteľnú súčasť Zmluvy o prenájme uzatvorenej medzi ROYAL STROJE s.r.o. (Prenajímateľ) a Nájomcom – fyzickou osobou nepodnikateľom (Spotrebiteľom).</p>
                    <p><strong className="text-white">2.</strong> VPPM-FO sa spravujú zákonom č. 40/1964 Zb. Občiansky zákonník (OZ), zákonom č. 250/2007 Z. z. o ochrane spotrebiteľa a zákonom č. 102/2014 Z. z. o ochrane spotrebiteľa pri predaji na diaľku. Ustanovenia v neprospech Spotrebiteľa, ktoré sú v rozpore s kogentným právom, sú neplatné.</p>
                    <p><strong className="text-white">3.</strong> V prípade rozporu má prednosť Zmluva pred VPPM-FO. Tieto podmienky sú dostupné v sídle Prenajímateľa a na www.royalstroje.sk; Spotrebiteľ ich obdrží v papierovej forme pri podpise Zmluvy.</p>
                    <p><strong className="text-white">4.</strong> Predmetom prenájmu môže byť výlučne malé náradie a stredná mechanizácia (ďalej len PP) podľa aktuálneho katalógu Prenajímateľa. Prenajímateľ si vyhradzuje právo prenájom PP Spotrebiteľovi odmietnuť bez udania dôvodu.</p>
                  </div>
                </div>

                {/* Section II */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">II.</span> Predmet prenájmu a odovzdanie
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> PP je špecifikovaný v Zmluve vrátane výrobného čísla, príslušenstva a dennej sadzby. PP je odovzdávaný v stave spôsobilom na dohodnuté užívanie, zodpovedajúcom jeho veku a opotrebeniu, spolu s návodom na obsluhu v slovenskom jazyku.</p>
                    <p><strong className="text-white">2.</strong> Spotrebiteľ je povinný PP pred prevzatím skontrolovať. Zjavné vady musí uviesť v odovzdávacom protokole; na neskoršie reklamácie zjavných vád sa neprihliada. Podpisom protokolu Spotrebiteľ potvrdzuje prevzatie PP v opísanom stave.</p>
                    <p><strong className="text-white">3.</strong> Prenajímateľ je povinný odovzdať PP s úplnou dokumentáciou. Ak PP nemá návod v slovenčine, Prenajímateľ je povinný ústne poučiť Spotrebiteľa o bezpečnom používaní a toto zaznamenať do protokolu.</p>
                  </div>
                </div>

                {/* Section III */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">III.</span> Záloha (depozit) a platobné podmienky
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Prenajímateľ požaduje pred odovzdaním PP zaplatenie zálohy (depozitu) vo výške uvedenej v Zmluve. Záloha slúži ako zabezpečenie nájomného, náhrady škody a prípadných ďalších oprávnených pohľadávok Prenajímateľa.</p>
                    <p><strong className="text-white">2.</strong> Záloha nie je nájomným a neúročí sa. Po riadnom vrátení PP a vysporiadaní všetkých pohľadávok bude záloha vrátená Spotrebiteľovi najneskôr do <strong className="text-white">14 dní</strong>, a to rovnakou formou, akou bola zaplatená (hotovosť/prevod).</p>
                    <p><strong className="text-white">3.</strong> Nájomné je splatné pri vrátení PP, ak nie je v Zmluve dohodnuté inak. Denná sadzba sa počíta za každý začatý kalendárny deň prenájmu. Splatnosť faktúry/dokladu: 7 dní od vystavenia. Platbu je možné vykonať hotovosťou, platobnou kartou, bezhotovostným prevodom alebo iným spôsobom dohodnutým v Zmluve.</p>
                    <p><strong className="text-white">4.</strong> Pri omeškaní s úhradou nájomného je Prenajímateľ oprávnený účtovať zákonný úrok z omeškania podľa § 517 ods. 2 OZ (nariadenie vlády SR č. 87/1995 Z. z.). Zmluvné pokuty voči Spotrebiteľovi môžu byť dojednané len v primeranej výške neodporujúcej dobrým mravom (§ 39 OZ).</p>
                    <p><strong className="text-white">5.</strong> Prenajímateľ nie je oprávnený jednostranne meniť výšku nájomného počas trvania Zmluvy.</p>
                  </div>
                </div>

                {/* Section IV */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">IV.</span> Doba prenájmu
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Prenájom začína dňom a časom odovzdania PP podľa Zmluvy a trvá do riadneho fyzického vrátenia PP a jeho protokolárneho prevzatia Prenajímateľom. Odstavenie PP pred prevádzkou bez protokolárneho prevzatia sa za vrátenie nepovažuje.</p>
                    <p><strong className="text-white">2.</strong> Spotrebiteľ môže PP vrátiť aj pred uplynutím dohodnutej doby; nájomné sa v takom prípade počíta len za skutočnú dobu prenájmu.</p>
                    <p><strong className="text-white">3.</strong> Ak Spotrebiteľ nevráti PP v dohodnutom termíne ani do 48 hodín po jeho uplynutí a na výzvu nereaguje, Prenajímateľ je oprávnený uplatniť všetky právne prostriedky ochrany svojich práv vrátane podania trestného oznámenia. Prenajímateľ má za čas omeškania nárok na nájomné podľa Zmluvy.</p>
                  </div>
                </div>

                {/* Section V */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">V.</span> Miesto užívania
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> PP sa môže používať výlučne na mieste uvedenom v Zmluve, výlučne na súkromné účely Spotrebiteľa. Komerčné využitie PP je zakázané.</p>
                    <p><strong className="text-white">2.</strong> Premiestnenie PP na iné miesto vyžaduje predchádzajúci písomný (vrátane e-mailový) súhlas Prenajímateľa.</p>
                    <p><strong className="text-white">3.</strong> Subprenájom alebo poskytnutie PP tretej osobe na užívanie je zakázané.</p>
                  </div>
                </div>

                {/* Section VI */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">VI.</span> Zodpovednosť spotrebiteľa
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Spotrebiteľ zodpovedá za PP od jeho prevzatia do riadneho vrátenia. Zodpovedá za škody nad rámec bežného opotrebenia vrátane škôd spôsobených osobami žijúcimi s ním v spoločnej domácnosti.</p>
                    <p><strong className="text-white">2.</strong> Pri škode na PP: Prenajímateľ má právo na náhradu skutočnej škody (nie novej ceny PP), preukázanú dokladom o oprave alebo znaleckým posudkom. V prípade sporu o výšku škody rozhoduje nezávislý znalec zapísaný v zozname znalcov Ministerstva spravodlivosti SR; náklady posudku znáša strana, ktorej tvrdenie sa nepreukáže.</p>
                    <p><strong className="text-white">3.</strong> Spotrebiteľ nie je zodpovedný za škodu vzniknutú bežným opotrebením alebo skrytou vadou PP existujúcou pred odovzdaním.</p>
                    <p><strong className="text-white">4.</strong> Spotrebiteľ je povinný bezodkladne (do 4 hodín) telefonicky a následne písomne (e-mailom) nahlásiť každú poruchu, poškodenie, haváriu, odcudzenie alebo stratu PP.</p>
                  </div>
                </div>

                {/* Section VII */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">VII.</span> Povinnosti spotrebiteľa pri užívaní PP
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> PP môže obsluhovať len Spotrebiteľ osobne alebo osoba, ktorú výslovne uviedol v Zmluve a ktorá je na obsluhu spôsobilá. Spotrebiteľ je povinný dodržiavať návod na obsluhu a bezpečnostné pokyny.</p>
                    <p><strong className="text-white">2.</strong> Spotrebiteľ nesmie vykonávať žiadne zásahy, úpravy ani opravy PP bez písomného súhlasu Prenajímateľa. Pri poruche je povinný PP odstaviť a kontaktovať Prenajímateľa.</p>
                    <p><strong className="text-white">3.</strong> Spotrebiteľ je povinný zabezpečiť PP proti odcudzeniu a poškodeniu: v uzamknutom priestore alebo s mechanickým zabezpečením (reťaz/zámok). Prenajímateľ nenesie zodpovednosť za škodu spôsobenú tretími osobami počas doby prenájmu.</p>
                    <p><strong className="text-white">4.</strong> Spotrebiteľ je povinný vrátiť PP vyčistený, so všetkým príslušenstvom a dokumentáciou, v stave zodpovedajúcom primeranému opotrebeniu.</p>
                  </div>
                </div>

                {/* Section VIII */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">VIII.</span> Povinnosti prenajímateľa
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Prenajímateľ je povinný odovzdať PP v stave spôsobilom na dohodnuté užívanie a zabezpečiť pokojné užívanie PP po celú dobu prenájmu.</p>
                    <p><strong className="text-white">2.</strong> Prenajímateľ je povinný odstrániť vady a poruchy PP vzniknuté bežným opotrebením alebo skrytou vadou do <strong className="text-white">48 hodín</strong> od nahlásenia. Ak tak neurobí, Spotrebiteľ má právo na primeranú zľavu z nájomného za dobu, počas ktorej PP nemohol riadne užívať.</p>
                    <p><strong className="text-white">3.</strong> Prenajímateľ zodpovedá za škodu spôsobenú Spotrebiteľovi vadou PP existujúcou v čase odovzdania, s výnimkou vád uvedených v protokole.</p>
                  </div>
                </div>

                {/* Section IX */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">IX.</span> Reklamačné podmienky
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Spotrebiteľ má právo reklamovať vady PP bez zbytočného odkladu po ich zistení. Reklamáciu možno uplatniť:</p>
                    <ul className="ml-6 list-disc list-inside space-y-1">
                      <li>osobne v sídle Prenajímateľa (Recká cesta 182, Boldog)</li>
                      <li>e-mailom na info@royalstroje.sk</li>
                      <li>telefonicky na +421 948 555 551</li>
                    </ul>
                    <p><strong className="text-white">2.</strong> Prenajímateľ je povinný reklamáciu prijať a vydať o jej uplatnení písomné potvrdenie. Reklamácia bude vybavená do <strong className="text-white">30 dní</strong>; v odôvodnených prípadoch do 60 dní. O výsledku bude Spotrebiteľ písomne informovaný.</p>
                    <p><strong className="text-white">3.</strong> Spotrebiteľ má pri oprávnenej reklamácii právo na: bezplatnú opravu alebo výmenu PP, primeranú zľavu z nájomného, alebo odstúpenie od Zmluvy s vrátením nájomného.</p>
                    <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-4 mt-4">
                      <p className="text-orange-primary font-semibold">! Uplatnenie reklamácie nemá vplyv na plynutie doby prenájmu ani na povinnosť vrátiť PP.</p>
                    </div>
                  </div>
                </div>

                {/* Section X */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">X.</span> Ukončenie zmluvy a odstúpenie
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Spotrebiteľ môže od Zmluvy uzatvorenej na diaľku (e-mail, telefón, web) odstúpiť bez udania dôvodu do <strong className="text-white">14 dní</strong> od uzavretia Zmluvy (zákon č. 102/2014 Z. z.). Ak Spotrebiteľ výslovne požiadal o odovzdanie PP pred uplynutím 14-dňovej lehoty, má právo na odstúpenie od Zmluvy, avšak je povinný uhradiť pomernú časť nájomného za dobu od prevzatia PP do dňa oznámenia odstúpenia.</p>
                    <p><strong className="text-white">2.</strong> Prenajímateľ môže Zmluvu ukončiť s okamžitou účinnosťou ak: Spotrebiteľ je v omeškaní s úhradou viac ako 14 dní; PP je použité v rozpore so Zmluvou; hrozí poškodenie alebo strata PP. V takom prípade musí Prenajímateľ Spotrebiteľa písomne upozorniť a poskytnúť mu primeranú lehotu na nápravu (min. 5 dní), okrem prípadu bezprostredného ohrozenia PP.</p>
                    <p><strong className="text-white">3.</strong> Pri predčasnom ukončení Zmluvy z dôvodu na strane Prenajímateľa (nie zavinením Spotrebiteľa) má Spotrebiteľ nárok na vrátenie pomernej časti zaplateného nájomného a zálohy v plnej výške.</p>
                  </div>
                </div>

                {/* Section XI */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">XI.</span> Vyššia moc
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Žiadna zo strán nie je v omeškaní, ak nesplnenie záväzku bolo spôsobené okolnosťami vylučujúcimi zodpovednosť (§ 374 v spojení s § 757 OZ): živelná pohroma, pandémia, vojnový stav, úradné nariadenie.</p>
                    <p><strong className="text-white">2.</strong> Strana dovolávajúca sa vyššej moci je povinná to bezodkladne písomne oznámiť. Ak prekážka trvá viac ako 30 dní, každá strana môže Zmluvu ukončiť výpoveďou s okamžitou účinnosťou; záloha sa vráti v plnej výške.</p>
                  </div>
                </div>

                {/* Section XII */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">XII.</span> Ochrana osobných údajov
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Prenajímateľ spracúva osobné údaje Spotrebiteľa (meno, adresa, kontaktné údaje, údaje zo Zmluvy) na účely plnenia Zmluvy (čl. 6 ods. 1 písm. b) GDPR), plnenia zákonných povinností (čl. 6 ods. 1 písm. c) GDPR) a ochrany oprávnených záujmov (čl. 6 ods. 1 písm. f) GDPR).</p>
                    <p><strong className="text-white">2.</strong> Podrobné informácie o spracúvaní osobných údajov, právach Spotrebiteľa ako dotknutej osoby (prístup, oprava, výmaz, námietka) a kontakt na dozorný orgán (ÚOOÚ SR) sú uvedené v dokumente Informácie o spracúvaní osobných údajov dostupnom na www.royalstroje.sk.</p>
                  </div>
                </div>

                {/* Section XIII */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">XIII.</span> Alternatívne riešenie sporov
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Spotrebiteľ má právo obrátiť sa na Prenajímateľa so žiadosťou o nápravu (info@royalstroje.sk), ak nie je spokojný s vybavením reklamácie. Ak Prenajímateľ odpovie zamietavo alebo do 30 dní neodpovie, Spotrebiteľ môže podať návrh na alternatívne riešenie sporu (ARS) k:</p>
                    <ul className="ml-6 list-disc list-inside space-y-1">
                      <li><strong className="text-white">Slovenská obchodná inšpekcia (SOI)</strong>, Bajkalská 21/A, 827 99 Bratislava – <a href="https://www.soi.sk" target="_blank" rel="noopener noreferrer" className="text-orange-primary hover:underline">www.soi.sk</a></li>
                      <li>alebo inému subjektu ARS zapísanému v zozname Ministerstva hospodárstva SR – <a href="https://www.mhsr.sk" target="_blank" rel="noopener noreferrer" className="text-orange-primary hover:underline">www.mhsr.sk</a></li>
                    </ul>
                    <p><strong className="text-white">2.</strong> Spotrebiteľ môže využiť aj európsku platformu riešenia sporov online (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-orange-primary hover:underline">https://ec.europa.eu/consumers/odr</a></p>
                    <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-4 mt-4">
                      <p className="text-orange-primary font-semibold">! Tieto práva nie sú dotknuté možnosťou Spotrebiteľa obrátiť sa na súd.</p>
                    </div>
                  </div>
                </div>

                {/* Section XIV */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 hover:border-orange-primary/30 transition-all">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    <span className="text-orange-primary">XIV.</span> Záverečné ustanovenia
                  </h2>

                  <div className="space-y-3 text-white/80 leading-relaxed">
                    <p><strong className="text-white">1.</strong> Prenajímateľ nie je oprávnený jednostranne meniť VPPM-FO v neprospech Spotrebiteľa počas trvania Zmluvy. Zmeny VPPM-FO sú účinné len pre budúce zmluvy uzavreté po ich zverejnení.</p>
                    <p><strong className="text-white">2.</strong> Ak sa niektoré ustanovenie stane neplatným alebo nevykonateľným, ostatné zostávajú v platnosti. Neplatné ustanovenie sa nahradí platnou úpravou najbližšou jeho účelu.</p>
                    <p><strong className="text-white">3.</strong> Spotrebiteľ podpisom Zmluvy potvrdzuje, že sa s VPPM-FO oboznámil, obdržal ich v papierovej forme a porozumel im.</p>
                    <p><strong className="text-white">4.</strong> Miestna príslušnosť súdu sa riadi všeobecne záväznými právnymi predpismi; tým nie je dotknuté právo Spotrebiteľa podať žalobu na súde podľa miesta svojho bydliska (§ 39 ods. 3 zák. č. 160/2015 Z. z. CMP).</p>
                    <p><strong className="text-white">5.</strong> Tieto VPPM-FO sa spravujú právom Slovenskej republiky. Zákon č. 40/1964 Zb. Občiansky zákonník, zákon č. 250/2007 Z. z. a zákon č. 102/2014 Z. z. majú prednosť pred týmito podmienkami.</p>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="text-center mt-12 pt-8 border-t border-white/10">
                <p className="text-white/50 text-sm">
                  ROYAL STROJE s.r.o. | Verzia VPPM-FO 2026.01 | Platné od 01.02.2026 | www.royalstroje.sk
                </p>
                <p className="text-white/40 text-xs mt-2">
                  Recká cesta 182, 925 26 Boldog – Senec | IČO: 57 405 425 | info@royalstroje.sk
                </p>
              </div>
            </>
          )}

        </div>
      </section>
    </div>
  );
}
