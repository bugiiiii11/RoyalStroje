const article = {
  title: 'TOUGHBUILT TB-C700: Pracovné Kozy, Ktoré Vydržia Všetko',
  date: '5. Marec 2026',
  author: 'Royal Stroje',
  readTime: '12 min',
  category: 'Návody',
  excerpt: 'Kompletný prehľad pracovných kôz TOUGHBUILT TB-C700 - 100% oceľová konštrukcia, nosnosť až 1,180 kg v páre, výškovo nastaviteľné nohy a revolučný samonivelačný systém. Prečo sú tieto kozy najlepšou voľbou pre profesionálov?',
  content: (
      <div className="space-y-8">
        <p className="text-xl text-white/90 leading-relaxed">
          TOUGHBUILT TB-C700 nie sú len ďalšie pracovné kozy na trhu. Sú to profesionálne nástroje navrhnuté
          pre tých, ktorí potrebujú <strong className="text-orange-primary">absolútnu spoľahlivosť, stabilitu a bezpečnosť</strong> na
          stavbe. S nosnosťou až 1,180 kg v páre a 100% oceľovou konštrukciou patria medzi najodolnejšie kozy,
          aké môžete na stavbe použiť.
        </p>

        {/* YouTube Video */}
        <div className="bg-zinc-900 border border-orange-primary/30 rounded-2xl overflow-hidden">
          <div className="aspect-video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/8g03L4xaCoM"
              title="TOUGHBUILT TB-C700 v akcii"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="p-4 bg-zinc-800/50">
            <p className="text-white/70 text-sm text-center">
              🎥 TOUGHBUILT TB-C700 v praxi - pozrite si stabilitu a funkcionalitu týchto kôz
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Prečo Práve TOUGHBUILT TB-C700?
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Na trhu je množstvo pracovných kôz, ale TOUGHBUILT TB-C700 vynikajú v <strong className="text-orange-primary">3 kľúčových oblastiach</strong>:
          </p>
          <ul className="space-y-2 text-white/80">
            <li>• <strong>Extrémna nosnosť</strong> - Až 590 kg samostatne, 1,180 kg v páre - vydrží aj najťažšie materiály</li>
            <li>• <strong>Stabilita a bezpečnosť</strong> - Samonivelačné nožičky a protišmykový povrch eliminujú riziko pádu</li>
            <li>• <strong>Univerzálnosť</strong> - Výškovo nastaviteľné, s výrezmi na rezanie rúr a podpornými kolíkmi</li>
          </ul>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Technické Parametre: Čo Potrebujete Vedieť</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-orange-primary mb-4">Základné Špecifikácie</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Nosnosť (samostatne):</span>
                <span className="font-bold text-white">590 kg</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Nosnosť (pár):</span>
                <span className="font-bold text-white">1,180 kg</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Výška (nastaviteľná):</span>
                <span className="font-bold text-white">63,5 - 81,5 cm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Hmotnosť:</span>
                <span className="font-bold text-white">10,45 kg</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Konštrukcia:</span>
                <span className="font-bold text-white">100% oceľ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Povrchová úprava:</span>
                <span className="font-bold text-white">Pozinkovaná + práškové lakovaná</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-orange-primary mb-4">Rozmery a Skladovanie</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Výška v zloženej pozícii:</span>
                <span className="font-bold text-white">14 cm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Dĺžka zloženého:</span>
                <span className="font-bold text-white">101,2 cm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Šírka nôh:</span>
                <span className="font-bold text-white">63,5 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Skladovanie:</span>
                <span className="font-bold text-white">Kompaktné, rýchle zloženie</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-500 text-sm font-bold">✓ Ideálne do dodávky alebo malého skladu</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Stabilita a Bezpečnosť: Vaša Ochrana Na Prvom Mieste</h2>

        <p className="text-white/80 leading-relaxed">
          Práca vo výškach môže byť nebezpečná, preto TOUGHBUILT implementoval <strong className="text-orange-primary">niekoľko revolučných bezpečnostných systémov</strong>,
          ktoré robia z TB-C700 jedny z najbezpečnejších pracovných kôz na trhu:
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-green-500/30 rounded-xl p-6">
            <div className="text-green-500 text-3xl mb-3">🛡️</div>
            <h4 className="text-white font-bold text-lg mb-2">Samonivelačné Nožičky</h4>
            <p className="text-white/70 text-sm">
              Veľké vysunovacie nožičky sa <strong className="text-green-500">automaticky prispôsobia terénu</strong> a
              zabezpečia stabilitu aj na nerovnom povrchu. Protišmykový povrch zabraňuje šmýkaniu.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-blue-500/30 rounded-xl p-6">
            <div className="text-blue-500 text-3xl mb-3">⚡</div>
            <h4 className="text-white font-bold text-lg mb-2">Široká Základňa</h4>
            <p className="text-white/70 text-sm">
              Šírka nôh <strong className="text-blue-500">63,5 cm</strong> poskytuje mimoriadne stabilnú základňu.
              Kozy sa neprevrhnu ani pri práci s ťažkými materiálmi či nárazoch.
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl p-6">
            <div className="text-orange-primary text-3xl mb-3">🔩</div>
            <h4 className="text-white font-bold text-lg mb-2">Protišmykový Vrchný Povrch</h4>
            <p className="text-white/70 text-sm">
              Horný povrch pripomína <strong className="text-orange-primary">smirkový papier</strong> a má predvŕtané otvory
              na pripevnenie dosiek. Materiály sa nepošmyknú ani pri náklone.
            </p>
          </div>
        </div>

        <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-primary mb-4">⚠️ Bezpečnostné Tipy Pri Práci s Kozami</h3>
          <div className="grid md:grid-cols-2 gap-4 text-white/80 text-sm">
            <div>
              <h4 className="text-white font-bold mb-2">✓ Čo robiť:</h4>
              <ul className="space-y-1">
                <li>• Vždy používajte kozy v páre pre maximálnu stabilitu</li>
                <li>• Skontrolujte zamknutie nôh pred začatím práce</li>
                <li>• Dbajte na rovnomerné rozloženie záťaže</li>
                <li>• Používajte na pevnom, rovnom povrchu</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-2">✗ Čo nerobiť:</h4>
              <ul className="space-y-1">
                <li>• Neprekračujte maximálnu nosnosť 1,180 kg (pár)</li>
                <li>• Nestavajte kozy na klzkú alebo nestabilnú plochu</li>
                <li>• Nevystupujte priamo na vrchný rám bez dosky</li>
                <li>• Nepoužívajte poškodené kozy</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Praktické Využitie: Pre Aké Práce Sú Vhodné?</h2>

        <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-orange-primary mb-4">Univerzálne Použitie Na Stavbe</h3>
          <p className="text-white/80 mb-4">
            TOUGHBUILT TB-C700 sú skutočne <strong className="text-white">všestranný nástroj</strong>. Vynikajú pri:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-bold mb-3">✓ Stavebné Práce</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Podpora dosiek pri rezaní a opracovávaní dreva</li>
                <li>• Práca s dlhými materiálmi (fošne, profily, latky)</li>
                <li>• Montáž sadrokartónu a stropných podhľadov</li>
                <li>• Murárske práce - podpora dosiek pre maltovanie</li>
                <li>• Skladovanie a triedenie materiálov na stavbe</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-3">✓ Špecializované Použitie</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Rezanie rúr PVC, EMT a kovových profilov (vďaka výrezom)</li>
                <li>• Triedenie a podpora dlhých materiálov (podperné kolíky)</li>
                <li>• Dočasný pracovný stôl pre náradie a materiály</li>
                <li>• Práca v nerovnom teréne (samonivelačné nožičky)</li>
                <li>• Kombinované použitie s lešením a rebríkmi</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-bold text-orange-primary mb-4">🔧 Špeciálne Funkcie TB-C700</h3>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-orange-primary font-bold mb-3">Výrezy na Rezanie Rúr</h4>
              <p className="text-white/70 text-sm">
                Vyklopné konzoly s výrezmi vám umožnia <strong className="text-white">bezpečne uchytiť a rezať</strong> PVC rúry,
                EMT potrubia alebo podobné materiály. Rúra sa neposúva počas rezania.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-orange-primary font-bold mb-3">Podperné Kolíky</h4>
              <p className="text-white/70 text-sm">
                Kolíky na nohách kôz slúžia na <strong className="text-white">podopretie dlhých materiálov</strong> (fošne, profily)
                pri rezaní alebo triedení. Materiály nekĺžu a zostávajú v správnej polohe.
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-orange-primary font-bold mb-3">Jednobutónové Zloženie</h4>
              <p className="text-white/70 text-sm">
                Nohy sa dajú <strong className="text-white">rýchlo zložiť a rozložiť</strong> jedným tlačidlom.
                Úchyt na prenášanie vám umožní pohodlne prepravovať kozy po stavbe.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Pre Koho Sú TOUGHBUILT TB-C700 Vhodné?</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-orange-primary/20 to-orange-hover/20 border-2 border-orange-primary rounded-2xl p-6 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-orange-primary text-white text-xs font-bold px-3 py-1 rounded-full">IDEÁLNE</span>
            </div>
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">👷</div>
              <h4 className="text-white font-black text-lg">Profesionálni Stavbári</h4>
            </div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>✓ Murári a obkladači</li>
              <li>✓ Tesári a stolári</li>
              <li>✓ Inštalatéri a elektrikári</li>
              <li>✓ Stavebné firmy</li>
              <li>✓ Údržbári a renovační</li>
            </ul>
            <p className="text-white/60 text-xs mt-4 italic">
              Pre každodenné použitie na stavbách - maximálna spoľahlivosť
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/50 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🔧</div>
              <h4 className="text-white font-black text-lg">Truhláři a Stolári</h4>
            </div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>✓ Rezanie dlhých dosiek a fošní</li>
              <li>✓ Podpora pri opracovávaní dreva</li>
              <li>✓ Montáž nábytku a konštrukcií</li>
              <li>✓ Práca v dielňach a na mieste</li>
              <li>✓ Lakované a brúsenie materiálov</li>
            </ul>
            <p className="text-white/60 text-xs mt-4 italic">
              Protišmykový povrch chráni drevo pred poškodením
            </p>
          </div>

          <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/50 rounded-2xl p-6">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🏗️</div>
              <h4 className="text-white font-black text-lg">Veľké Projekty</h4>
            </div>
            <ul className="space-y-2 text-white/80 text-sm">
              <li>✓ Výstavba rodinných domov</li>
              <li>✓ Rekonštrukcie bytov a kancelárií</li>
              <li>✓ Priemyselné montáže</li>
              <li>✓ Skladové priestory</li>
              <li>✓ Práca s ťažkými materiálmi</li>
            </ul>
            <p className="text-white/60 text-xs mt-4 italic">
              Nosnosť 1,180 kg vydrží aj najťažšie materiály
            </p>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Naša Skúsenosť: Prečo Odporúčame Tieto Kozy</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
          <p className="text-white/90 leading-relaxed mb-4">
            V Royal Stroje máme TOUGHBUILT TB-C700 v našej prenajímacej flotile a musíme povedať,
            že <strong className="text-orange-primary">patria medzi najspoľahlivejšie kozy</strong>, ktoré máme k dispozícii.
            Zákazníci si ich vyžiadajú opakovane práve pre ich stabilitu a univerzálnosť.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-orange-primary font-bold mb-3">✓ Čo Nás Presvedčilo:</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• Extrémna stabilita aj pri plnom zaťažení (testované s 1000+ kg)</li>
                <li>• Minimálna poruchovosť - 100% oceľová konštrukcia vydrží roky</li>
                <li>• Spokojnosť zákazníkov - často si ich vyžiadajú opakovane</li>
                <li>• Samonivelačné nožičky fungujú aj v ťažkom teréne</li>
                <li>• Kompaktné skladovanie - vojde sa do dodávky</li>
              </ul>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-orange-primary font-bold mb-3">💡 Čo Oceňujú Zákazníci:</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li>• "Najstabilnejšie kozy, aké som mal. Vôbec sa nehýbu."</li>
                <li>• "Samonivelačné nožičky sú pecka - aj na kosej podlahe stabilné"</li>
                <li>• "Protišmykový povrch drží dosky naozaj pevne"</li>
                <li>• "Výrezy na rúry sú super - rúra sa nepohne pri rezaní"</li>
                <li>• "Ľahko sa skladajú a prenášajú - aj sám dám do dodávky"</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-primary/20 border border-orange-primary/40 rounded-xl p-6">
            <h4 className="text-orange-primary font-bold text-lg mb-3">🎯 Pre Koho Je Prenájom Výhodný?</h4>
            <p className="text-white/80 leading-relaxed mb-3">
              Ak máte stavebný projekt, rekonštrukciu alebo potrebujete kozy na krátkodobú prácu,
              <strong className="text-white"> prenájom je oveľa výhodnejší než kúpa</strong>:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-zinc-900/50 rounded-lg p-3">
                <p className="text-green-500 font-bold mb-1">Kúpa nových kôz (pár):</p>
                <p className="text-white/70">~120-140 €</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3">
                <p className="text-orange-primary font-bold mb-1">Prenájom na týždeň (pár):</p>
                <p className="text-white/70">~60-70 € (Royal Stroje: od 12 €/deň)</p>
              </div>
              <div className="bg-zinc-900/50 rounded-lg p-3">
                <p className="text-blue-500 font-bold mb-1">Úspora:</p>
                <p className="text-white/70">~60-80 € + žiadne starosti so skladovaním</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-primary/10 to-orange-hover/10 border-2 border-orange-primary/50 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-black text-white mb-4 text-center">
            Prenajmite si TOUGHBUILT TB-C700 v Royal Stroje
          </h3>
          <p className="text-white/80 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
            Potrebujete stabilné a spoľahlivé pracovné kozy na váš projekt? Máme TOUGHBUILT TB-C700
            pripravené a odskúšané. Pár kôz s nosnosťou 1,180 kg - perfektné pre akýkoľvek stavebný projekt.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
            >
              <span>Zavolať: 0948 555 551</span>
            </a>
            <a
              href="/?search=TOUGHBUILT+TB-C700#katalog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-orange-primary/50 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
            >
              <span>Pozrieť v katalógu</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-orange-primary font-bold mb-1">Od 12 €/deň</p>
              <p className="text-white/60">bez DPH</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-green-500 font-bold mb-1">Doprava ZADARMO</p>
              <p className="text-white/60">do 30 km od Senca</p>
            </div>
            <div className="bg-zinc-900/50 rounded-lg p-4">
              <p className="text-blue-500 font-bold mb-1">Technická podpora</p>
              <p className="text-white/60">24/7 po telefóne</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white">Záverečné Hodnotenie</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-green-500 font-bold text-lg mb-4">✓ Klady</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Extrémna nosnosť - až 1,180 kg v páre</li>
                <li>• 100% oceľová konštrukcia - nerozbitné</li>
                <li>• Samonivelačné nožičky - stabilita na nerovnom povrchu</li>
                <li>• Protišmykový vrchný povrch s predvŕtanými otvormi</li>
                <li>• Výrezy na rezanie rúr a podperné kolíky</li>
                <li>• Kompaktné skladovanie (výška len 14 cm)</li>
                <li>• Jednobutónové zloženie - rýchle a jednoduché</li>
                <li>• Doživotná záruka od výrobcu</li>
              </ul>
            </div>

            <div>
              <h4 className="text-orange-primary font-bold text-lg mb-4">⚠️ Zápory</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Vyššia hmotnosť (10,45 kg) oproti hliníkovým kozám</li>
                <li>• Vyššia nákupná cena než štandardné kozy</li>
                <li>• Pre hobby použitie môže byť "overkill"</li>
                <li>• Oceľová konštrukcia môže zhrdzavieť pri nedostatočnej údržbe</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-orange-primary font-bold text-xl mb-3 text-center">Naše Finálne Hodnotenie</h4>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-orange-primary text-4xl">⭐⭐⭐⭐⭐</span>
              <span className="text-white text-3xl font-black">9,5/10</span>
            </div>
            <p className="text-white/80 text-center leading-relaxed max-w-3xl mx-auto">
              TOUGHBUILT TB-C700 sú <strong className="text-white">top voľba pre profesionálov</strong>,
              ktorí potrebujú absolútne spoľahlivé, stabilné a bezpečné pracovné kozy. Ak potrebujete kozy
              na krátkodobý projekt, prenájom je ideálne riešenie - získate prémiový nástroj za zlomok ceny.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Potrebujete <span className="text-orange-primary">poradiť s výberom náradia</span>?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Zavolajte nám a radi vám pomôžeme vybrať správne riešenie pre váš projekt.
            Máme 20 rokov skúseností v prenájme stavebnej mechanizácie.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
            >
              <span>Zavolať: 0948 555 551</span>
            </a>
          </div>
        </div>
      </div>
    ),
};
export default article;
