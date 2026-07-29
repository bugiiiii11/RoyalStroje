const article = {
  title: 'JCB 19C-1: Úprimná Recenzia Minirýpadla po 170 Motohodinách',
  date: '29. Júl 2026',
  author: 'Royal Stroje',
  readTime: '10 min',
  category: 'Návody',
  excerpt: 'Recenzia pásového minirýpadla JCB 19C-1 priamo z našej požičovne - skúsenosti po 170 motohodinách, skryté hydraulické hadice, kopanie do hĺbky 2,5 m, ale aj nevýhody, o ktorých sa v katalógoch nedočítate.',
  content: (
      <div className="space-y-8">
        <p className="text-xl text-zinc-700 leading-relaxed">
          JCB 19C-1 je pásové minirýpadlo s hmotnosťou okolo <strong className="text-zinc-900">1,9 tony</strong>,
          ktoré máme v Royal Stroje vo vlastnej flotile a denne ho požičiavame zákazníkom. Toto teda nie je
          katalógová recenzia opísaná z prospektu - stroj má u nás aktuálne <strong className="text-orange-primary">170 motohodín
          v reálnej prevádzke</strong> na stavbách v okolí Senca a Bratislavy. V článku sa dozviete, čo na ňom
          zákazníci najviac oceňujú, koľko reálne stojí jeho údržba, ale úprimne aj to, aké má slabiny.
        </p>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Prečo Si JCB 19C-1 Obľúbili Naši Zákazníci
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Po 170 motohodinách a desiatkach prenájmov sa spätná väzba opakuje v <strong className="text-orange-primary">4 bodoch</strong>:
          </p>
          <ul className="space-y-2 text-white/80">
            <li>• <strong>Skryté hydraulické hadice</strong> - vedené vnútrom výložníka, o nič sa nezachytia a netrhajú sa</li>
            <li>• <strong>Dlhé rameno</strong> - kopanie až do hĺbky 2,5 m, ideálne na základy a prípojky</li>
            <li>• <strong>Minimálna údržba</strong> - prvá veľká servisná prehliadka až pri 500 motohodinách</li>
            <li>• <strong>Kompaktné rozmery</strong> - šírka 980 mm, prejde aj bránou rodinného domu</li>
          </ul>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">Technické Parametre: Čísla, Ktoré Rozhodujú</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-orange-primary mb-4">Základné Špecifikácie</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Prevádzková hmotnosť:</span>
                <span className="font-bold text-white">~1 900 kg</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Motor:</span>
                <span className="font-bold text-white">Perkins (diesel)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Výkon motora:</span>
                <span className="font-bold text-orange-primary">11,7 kW</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Hĺbkový dosah:</span>
                <span className="font-bold text-white">až 2,5 m (podľa násady)</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Výsypná výška:</span>
                <span className="font-bold text-white">2 637 mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Podvozok:</span>
                <span className="font-bold text-white">Pásový, rozšíriteľný</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-orange-primary mb-4">Rozmery a Výbava</h3>
            <div className="space-y-3 text-white/80">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Dĺžka:</span>
                <span className="font-bold text-white">3 860 mm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Šírka podvozku:</span>
                <span className="font-bold text-white">980 / 1 330 mm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Výška:</span>
                <span className="font-bold text-white">2 324 mm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Lopaty v cene:</span>
                <span className="font-bold text-white">300 / 450 / 600 mm</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-white/60">Svahovacia lopata:</span>
                <span className="font-bold text-white">1 000 mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Karoséria:</span>
                <span className="font-bold text-white">100% oceľová</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">Skryté Hydraulické Hadice: Detail, Ktorý v Praxi Rozhoduje</h2>

        <div className="bg-orange-500/10 border border-orange-primary/30 rounded-xl p-6">
          <p className="text-zinc-700 leading-relaxed mb-4">
            Najčastejšia pochvala od našich zákazníkov znie prekvapivo jednoducho:{' '}
            <strong className="text-zinc-900">hydraulické hadice sa netrhajú</strong>. JCB ich totiž pri C-sérii
            neviedlo po povrchu ramena, ale <strong className="text-zinc-900">skryté vnútrom výložníka a násady</strong>.
          </p>
          <p className="text-zinc-700 leading-relaxed">
            Prečo je to dôležité? Roztrhnutá hadica je najčastejšia porucha minirýpadiel v prenájme - stačí
            zachytiť o konár, obrubník či hranu výkopu. Pri JCB 19C-1 sa hadice o nič nezachytia, čo znamená
            <strong className="text-zinc-900"> menej prestojov na stavbe, žiadny vytečený olej a žiadne čakanie na servis</strong>.
            Za 170 motohodín sme nemuseli riešiť ani jednu poškodenú hadicu.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">Dlhé Rameno: Kopanie až do Hĺbky 2,5 Metra</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-xl p-6">
          <p className="text-white/80 mb-6">
            Druhá vec, ktorú si zákazníci pochvaľujú, je <strong className="text-orange-primary">dlhé rameno</strong>.
            V kombinácii so svahovacou lopatou (1 000 mm, v cene prenájmu) zvláda práce, na ktoré by ste pri
            iných strojoch tejto váhy potrebovali väčšie rýpadlo:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <div className="text-orange-primary text-3xl mb-3">🏠</div>
              <h4 className="text-white font-bold mb-2">Základy Stavieb</h4>
              <p className="text-white/70 text-sm">
                Základové pásy rodinných domov, garáží a prístavieb bez problémov do potrebnej hĺbky
              </p>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <div className="text-orange-primary text-3xl mb-3">🚰</div>
              <h4 className="text-white font-bold mb-2">Kanalizačné Prípojky</h4>
              <p className="text-white/70 text-sm">
                Hĺbka výkopu až 2,5 m pokryje väčšinu kanalizačných a vodovodných prípojok
              </p>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-4 text-center">
              <div className="text-orange-primary text-3xl mb-3">⛰️</div>
              <h4 className="text-white font-bold mb-2">Úpravy Pozemkov</h4>
              <p className="text-white/70 text-sm">
                So svahovacou lopatou zvláda modelovanie terénu, svahovanie a finálne úpravy pozemkov
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">Naša Skúsenosť: Servis, Ktorý Nás Milo Prekvapil</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/30 rounded-2xl p-6 md:p-8">
          <p className="text-white/90 leading-relaxed mb-4">
            Náš stroj má za sebou <strong className="text-orange-primary">170 motohodín</strong> a práve servisné
            náklady boli pre nás najväčším prekvapením - v dobrom slova zmysle.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-orange-primary font-bold mb-3">Prehliadka pri 100 motohodinách</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Čakali sme klasický servisný zásah - a výsledok? <strong className="text-white">Iba kontrola
                prevádzkových náplní a premazanie stroja.</strong> Žiadna výmena dielov, žiadne prekvapenia,
                žiadna vysoká faktúra. Doslova "nič sa tam nerobilo".
              </p>
            </div>

            <div className="bg-zinc-800/50 rounded-xl p-4">
              <h4 className="text-orange-primary font-bold mb-3">Ďalší servis až pri 500 motohodinách</h4>
              <p className="text-white/80 text-sm leading-relaxed">
                Najbližšia servisná prehliadka nás čaká <strong className="text-white">až pri 500 motohodinách</strong>.
                JCB pri C-sérii predĺžilo servisné intervaly a vďaka puzdrovým čapom odpadá aj denné mazanie
                výkopového konca.
              </p>
            </div>
          </div>

          <p className="text-white/80 leading-relaxed">
            Pre vás ako zákazníka to znamená jediné: <strong className="text-white">stroj, ktorý je vždy pripravený
            na prenájom a nestojí v servise</strong>. A pre nás nižšie prevádzkové náklady, ktoré sa premietajú
            do férovej ceny prenájmu.
          </p>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">Úprimne: Nevýhody, Ktoré Treba Poznať</h2>

        <div className="bg-zinc-100 border-2 border-zinc-300 rounded-xl p-6">
          <p className="text-zinc-700 leading-relaxed mb-4">
            Žiadny stroj nie je dokonalý a nebudeme predstierať, že JCB 19C-1 áno. Toto sú veci,
            s ktorými treba pri práci rátať:
          </p>
          <div className="space-y-4">
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <h4 className="text-zinc-900 font-bold mb-2">Zahĺbený stroj sa ťažko vyhrabáva</h4>
              <p className="text-zinc-700 text-sm leading-relaxed">
                Najväčšia slabina z praxe: keď je minirýpadlo <strong>zahĺbené v zemi</strong> (napr. v hlbšom
                výkope alebo mäkkom teréne), má problém sa vyhrabať von <strong>bez pomoci podkopu</strong> -
                musíte sa oprieť lopatou a pomôcť si ramenom. Pri plánovaní práce v hlbokých výkopoch
                a rozmočenom teréne s tým treba rátať.
              </p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <h4 className="text-zinc-900 font-bold mb-2">Výkon 11,7 kW má svoje limity</h4>
              <p className="text-zinc-700 text-sm leading-relaxed">
                Na základy, prípojky a terénne úpravy je výkon úplne dostatočný. Ak však potrebujete
                dlhodobo presúvať veľké objemy tvrdej zeminy, väčší stroj (2,5-3 t a viac) bude rýchlejší.
                Je to minirýpadlo - a treba ho tak aj používať.
              </p>
            </div>
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <h4 className="text-zinc-900 font-bold mb-2">Vo svahu myslite na rozšírenie podvozku</h4>
              <p className="text-zinc-700 text-sm leading-relaxed">
                Pri práci s dlhým ramenom do boku alebo vo svahu odporúčame rozšíriť podvozok
                na 1 330 mm - v základnej šírke 980 mm je stroj stavaný na prejazd, nie na maximálnu
                stabilitu pri plnom vyložení.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">Pre Koho Je JCB 19C-1 Ideálny?</h2>

        <div className="bg-orange-500/10 border border-orange-primary/30 rounded-xl p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-zinc-900 font-bold mb-3">✓ Stavebníci a Remeselníci</h4>
              <ul className="space-y-2 text-zinc-700 text-sm">
                <li>• Základy rodinných domov a prístavieb</li>
                <li>• Kanalizačné a vodovodné prípojky</li>
                <li>• Výkopy pre oplotenia a oporné múry</li>
                <li>• Práce v stiesnených priestoroch</li>
              </ul>
            </div>
            <div>
              <h4 className="text-zinc-900 font-bold mb-3">✓ Majitelia Pozemkov a Záhrad</h4>
              <ul className="space-y-2 text-zinc-700 text-sm">
                <li>• Terénne úpravy a svahovanie pozemku</li>
                <li>• Prejde bránou - šírka len 980 mm</li>
                <li>• Šetrný k povrchom (gumové pásy)</li>
                <li>• Jednoduché intuitívne ovládanie</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-zinc-900">Záverečné Hodnotenie</h2>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-orange-primary font-bold text-lg mb-4">✓ Klady</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Hydraulické hadice skryté v ramene - netrhajú sa</li>
                <li>• Dlhé rameno - hĺbka výkopu až 2,5 m</li>
                <li>• Minimálny servis (prehliadky až po 500 mth)</li>
                <li>• Šírka 980 mm - prejde bránou rodinného domu</li>
                <li>• 4 lopaty v cene vrátane svahovacej</li>
                <li>• Odolná celooceľová karoséria</li>
                <li>• Úsporný a spoľahlivý motor Perkins</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white/60 font-bold text-lg mb-4">⚠ Zápory</h4>
              <ul className="space-y-2 text-white/80">
                <li>• Zahĺbený v zemi sa ťažko vyhrabáva bez pomoci podkopu</li>
                <li>• Na veľkoobjemové kopanie v tvrdej zemine je pomalší</li>
                <li>• Vo svahu vyžaduje rozšírenie podvozku</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <h4 className="text-orange-primary font-bold text-xl mb-3 text-center">Naše Finálne Hodnotenie</h4>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-orange-primary text-4xl">⭐⭐⭐⭐⭐</span>
              <span className="text-white text-3xl font-black">9,0/10</span>
            </div>
            <p className="text-white/80 text-center leading-relaxed max-w-3xl mx-auto">
              JCB 19C-1 je <strong className="text-white">ideálne minirýpadlo pre 90 % prác okolo rodinného
              domu a menších stavieb</strong>. Skryté hadice a minimálny servis z neho robia spoľahlivého
              parťáka, ktorý nestojí v dielni, ale pracuje na stavbe. Slabiny má - ale keď viete, na čo je
              stavaný, nesklame vás.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-2 border-orange-primary/50 rounded-2xl p-6 md:p-8">
          <h3 className="text-2xl font-black text-zinc-900 mb-4 text-center">
            Prenajmite si JCB 19C-1 v Royal Stroje
          </h3>
          <p className="text-zinc-700 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
            Presne tento stroj z recenzie máme pripravený v Senci - vrátane všetkých 4 lopát.
            Zabezpečíme aj dovoz priamo na vašu stavbu.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-500/40"
            >
              <span>Zavolať: 0948 555 551</span>
            </a>
            <a
              href="/jcb-19c-i"
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800 border-2 border-orange-primary/50 text-white font-bold rounded-full hover:bg-zinc-700 transition-all"
            >
              <span>Pozrieť v katalógu</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-center text-sm">
            <div className="bg-zinc-900 rounded-lg p-4">
              <p className="text-orange-primary font-bold mb-1">95 €/deň bez DPH</p>
              <p className="text-white/60">116,85 € s DPH</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <p className="text-orange-primary font-bold mb-1">4 lopaty v cene</p>
              <p className="text-white/60">300/450/600 + svahovacia 1000 mm</p>
            </div>
            <div className="bg-zinc-900 rounded-lg p-4">
              <p className="text-orange-primary font-bold mb-1">Dovoz na stavbu</p>
              <p className="text-white/60">Senec, Bratislava a okolie</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Neviete, či je minirýpadlo <span className="text-orange-primary">to pravé pre váš projekt</span>?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Zavolajte nám a poradíme vám úplne úprimne - tak ako v tejto recenzii. Máme 20 rokov skúseností
            v prenájme stavebnej mechanizácie a vieme, ktorý stroj sa hodí na akú prácu.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+421948555551"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-500/40"
            >
              <span>Zavolať: 0948 555 551</span>
            </a>
          </div>
        </div>
      </div>
    ),
};
export default article;
