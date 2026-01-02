import { Phone } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-16 bg-black">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Potrebujete poradiť s výberom?
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          Neviete, aké náradie potrebujete na váš projekt? Zavolajte nám a náš tím vám ochotne poradí s výberom tej správnej techniky pre vašu prácu.
        </p>
        <a
          href="tel:+421948555551"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-xl shadow-orange-primary/40"
        >
          <Phone size={20} />
          <span>Zavolať teraz: 0948 555 551</span>
        </a>
      </div>
    </section>
  );
}
