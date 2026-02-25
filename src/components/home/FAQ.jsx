import { useState } from 'react';
import { ChevronDown, Phone, Mail, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Ako funguje prenájom?',
      answer: (
        <div className="space-y-3">
          <p>Prenájom u nás funguje jednoducho a rýchlo – na základe priamej dohody a potvrdenia dostupnosti.</p>

          <div className="space-y-4 mt-4">
            <div>
              <p className="font-bold text-white mb-2">1. Kontaktujte nás</p>
              <ul className="space-y-1 ml-4 list-disc text-white/80">
                <li>Najrýchlejšie telefonicky na <a href="tel:+421948555551" className="text-orange-primary hover:underline font-semibold">0948 555 551</a></li>
                <li>Kontaktovať nás môžete aj e-mailom na <a href="mailto:info@royalstroje.sk" className="text-orange-primary hover:underline font-semibold">info@royalstroje.sk</a></li>
                <li>alebo cez WhatsApp / Telegram</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-2">2. Dohodneme techniku, termín a spôsob prevzatia alebo dopravy</p>
              <p className="ml-4 text-white/80">Spoločne si potvrdíme dostupnosť a pripravíme všetko potrebné k prenájmu.</p>
            </div>

            <div>
              <p className="font-bold text-white mb-2">3. Registrácia a vratná kaucia (pri nových zákazníkoch)</p>
              <ul className="space-y-1 ml-4 list-disc text-white/80">
                <li>Noví zákazníci sa registrujú osobne alebo e-mailom na základe registračného formulára.</li>
                <li>Pri prvom prenájme sa vyžaduje vratná kaucia podľa typu techniky.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      question: 'Aké dokumenty potrebujem na požičanie?',
      answer: (
        <div className="space-y-3">
          <p><strong className="text-white">Pre právnické osoby (PO):</strong></p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Živnostenský list alebo výpis z obchodného registra</li>
            <li>Platný doklad totožnosti oprávnenej osoby</li>
            <li>IČO, DIČ, IČ DPH</li>
          </ul>
          <p className="mt-3"><strong className="text-white">Pre fyzické osoby (FO):</strong></p>
          <ul className="space-y-1 ml-4 list-disc">
            <li>Platný občiansky preukaz alebo pas</li>
            <li>Kontaktné údaje (telefón, e-mail)</li>
          </ul>
          <p className="mt-3 text-sm text-white/70">Všetky údaje sú spracúvané v súlade s GDPR a používame ich výlučne na účely prenájmu.</p>
        </div>
      )
    },
    {
      question: 'Dostanem stroj s plnou alebo prázdnou nádržou PHM?',
      answer: (
        <div className="space-y-3">
          <p>Stroje <strong className="text-white">odovzdávame s plnou nádržou</strong> pohonných hmôt (PHM) a takisto ich <strong className="text-white">očakávame späť s plnou nádržou</strong>.</p>
          <p className="text-white/80">V prípade vrátenia s prázdnou alebo čiastočne naplnenou nádržou bude účtovaný doplatok za dotankovanie vo výške:</p>
          <div className="bg-zinc-800/50 rounded-lg p-3 mt-2">
            <p className="text-orange-primary font-bold">2€/liter bez DPH</p>
          </div>
          <p className="text-sm text-white/70 mt-3"><strong>Tip:</strong> Natankujte stroj pred vrátením.</p>
        </div>
      )
    },
    {
      question: 'Poskytujete dopravu techniky na miesto?',
      answer: (
        <div className="space-y-3">
          <p>Áno, poskytujeme <strong className="text-white">dopravu techniky priamo k vám</strong> na stavbu alebo iné miesto určenia.</p>
          <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-lg p-4 mt-3 space-y-2">
            <p><strong className="text-orange-primary">Cenník dopravy:</strong></p>
            <ul className="space-y-1 ml-4">
              <li>• <strong className="text-white">Do 30 km:</strong> ZADARMO 🎉</li>
              <li>• <strong className="text-white">30-50 km:</strong> od 20 € (podľa typu techniky)</li>
              <li>• <strong className="text-white">Nad 50 km:</strong> cena dohodou</li>
            </ul>
          </div>
          <p className="text-sm text-white/70 mt-3">Cena dopravy závisí od typu a hmotnosti techniky. Pri objednávke vám oznámime presnú cenu.</p>
        </div>
      )
    },
    {
      question: 'Je možné prenajať stroje s obsluhou?',
      answer: (
        <div className="space-y-3">
          <p>Áno, <strong className="text-white">ponúkame prenájom s obsluhou</strong> pre klientov, ktorí nemajú potrebné oprávnenie alebo skúsenosti s obsluhou ťažkej techniky.</p>
          <div className="bg-zinc-800/50 rounded-lg p-4 mt-3">
            <p className="mb-2"><strong className="text-orange-primary">Služba zahŕňa:</strong></p>
            <ul className="space-y-1 ml-4 list-disc">
              <li>Kvalifikovaného operátora s potrebnými oprávneniami</li>
              <li>Prípravu a údržbu stroja počas prenájmu</li>
              <li>Poradenstvo pri práci priamo na mieste</li>
            </ul>
          </div>
          <p className="mt-3">Cena sa kalkuluje <strong className="text-white">individuálne</strong> podľa typu stroja a dĺžky prenájmu. <a href="tel:+421948555551" className="text-orange-primary hover:underline font-semibold">Zavolajte nám</a> pre konkrétnu cenovú ponuku.</p>
        </div>
      )
    },
    {
      question: 'Čo v prípade poruchy alebo poškodenia?',
      answer: (
        <div className="space-y-3">
          <p><strong className="text-orange-primary">V prípade poruchy:</strong></p>
          <p>Ak dôjde k poruche stroja <strong className="text-white">nie vašim zavinením</strong>, okamžite nás kontaktujte na <a href="tel:+421948555551" className="text-orange-primary hover:underline">0948 555 551</a>. Zabezpečíme opravu alebo náhradný stroj do 24 hodín.</p>

          <p className="mt-4"><strong className="text-orange-primary">V prípade poškodenia:</strong></p>
          <p>Pri poškodení stroja vašim zavinením sa uplatňuje:</p>
          <ul className="space-y-1 ml-4 list-disc mt-2">
            <li>Hradíte skutočné náklady na opravu (s DPH)</li>
            <li>Strata počas opravy sa účtuje ako pokračujúci prenájom</li>
            <li>Pri závažnom poškodení máme právo na úhradu zostatkové hodnoty stroja</li>
          </ul>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-4">
            <p className="text-sm"><strong className="text-blue-400">💡 Odporúčame:</strong> Informujte sa o možnosti základného poistenia, ktoré kryje bežné prevádzkové riziká.</p>
          </div>
        </div>
      )
    },
    {
      question: 'Aké sú platobné možnosti?',
      answer: (
        <div className="space-y-3">
          <p>Ponúkame <strong className="text-white">flexibilné platobné možnosti</strong> podľa typu zákazníka:</p>

          <div className="space-y-4 mt-3">
            <div>
              <p className="font-bold text-white mb-2">🏢 Právnické osoby (PO):</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Fakturácia s lehotou splatnosti 14 dní</li>
                <li>Bankovým prevodom</li>
                <li>Možnosť pravidelných mesačných faktúr pre stálych klientov</li>
                <li>Platba kartou na prevádzke aj v teréne</li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white mb-2">👤 Fyzické osoby (FO):</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>Hotovosť pri prevzatí/vrátení</li>
                <li>Bankovým prevodom vopred</li>
                <li>Platba kartou na prevádzke aj v teréne</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mt-4">
            <p className="text-sm"><strong className="text-orange-primary">Kaucia:</strong> Pri prenájme sa vyžaduje vratná kaucia podľa typu stroja (500 € - 2000 €). Kaucia sa vracia pri riadnom vrátení techniky v plnej výške.</p>
          </div>
        </div>
      )
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="relative pt-12 md:pt-32 pb-8 md:pb-16 overflow-hidden">
      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-2 md:mb-4">
            Máte <span className="text-orange-primary">otázky</span>?
          </h2>
          <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto">
            Tu nájdete odpovede na najčastejšie otázky o prenájme stavebnej mechanizácie
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Side - Support Image/Info - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24">
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-orange-primary/30 mb-6">
                <img
                  src="/pictures/graphics/servis.png"
                  alt="Sme tu pre vás"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black text-white mb-2">
                    Sme tu pre vás
                  </h3>
                  <p className="text-white/90 text-sm">
                    Profesionálny prístup a spoľahlivosť
                  </p>
                </div>
              </div>

              {/* Contact Options */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 space-y-4">
                <h4 className="text-white font-bold text-lg mb-4">Neviete si rady?</h4>

                <a
                  href="tel:+421948555551"
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={20} className="text-orange-primary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Zavolajte nám</p>
                    <p className="text-white font-bold">0948 555 551</p>
                  </div>
                </a>

                <a
                  href="mailto:info@royalstroje.sk"
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={20} className="text-orange-primary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Napíšte nám</p>
                    <p className="text-white font-bold">info@royalstroje.sk</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/421948555551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} className="text-orange-primary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">WhatsApp</p>
                    <p className="text-white font-bold">Rýchla odpoveď</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ Accordion */}
          <div className="lg:col-span-3">
            <div className="space-y-2 md:space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden hover:border-orange-primary/30 transition-all"
                >
                  {/* Question Button */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between gap-2 md:gap-4 p-3 md:p-6 text-left group"
                  >
                    <h3 className="text-white font-bold text-xs md:text-lg flex-1 group-hover:text-orange-primary transition-colors leading-tight">
                      {faq.question}
                    </h3>
                    <div
                      className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-orange-primary/20 flex items-center justify-center transition-all ${
                        openIndex === index ? 'rotate-180 bg-orange-primary' : ''
                      }`}
                    >
                      <ChevronDown
                        size={16}
                        className={`md:w-5 md:h-5 transition-colors ${
                          openIndex === index ? 'text-white' : 'text-orange-primary'
                        }`}
                      />
                    </div>
                  </button>

                  {/* Answer Content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-3 pb-3 md:px-6 md:pb-6 text-white/80 text-[11px] md:text-base leading-relaxed border-t border-white/10 pt-3 md:pt-6">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
