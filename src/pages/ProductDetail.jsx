import { useState } from 'react';
import { Phone, Mail, ArrowLeft, Clock, Shield, Truck, Check, ChevronRight, MessageCircle } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';

export default function ProductDetail() {
  const { productId } = useParams();
  const [showPhone, setShowPhone] = useState(false);

  // Find product by ID
  const productData = products.find(p => p.id === productId);

  // Redirect to home if product not found
  if (!productData) {
    return <Navigate to="/#pozicovna" replace />;
  }

  // Extract brand and model from product name
  const nameParts = productData.name.split(' ');
  const brand = nameParts[0] || '';
  const model = nameParts.slice(1).join(' ') || '';

  // Parse features array into parameters
  const parameters = productData.features.map(feature => {
    const [label, value] = feature.split(' - ');
    return { label: label?.trim() || '', value: value?.trim() || '' };
  }).filter(param => param.label && param.value);

  // Calculate price with DPH (VAT 23%)
  const priceWithDPH = (productData.pricePerDay * 1.23).toFixed(2);
  const hasValidPrice = productData.pricePerDay && !isNaN(productData.pricePerDay) && productData.pricePerDay > 0;

  const product = {
    name: productData.description || productData.name,
    brand,
    model,
    image: productData.image,
    pricePerDay: productData.pricePerDay,
    priceWithDPH: parseFloat(priceWithDPH),
    parameters,
    inStock: productData.inStock,
    isNew: productData.isNew,
    blogArticleSlug: productData.blogArticleSlug,
  };

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{product.name} - {brand} {model} | Prenájom strojov Senec | Royal Stroje</title>
        <meta
          name="description"
          content={`Prenájom ${product.name} (${brand} ${model}) v Senci a okolí. Cena od ${product.pricePerDay}€/deň bez DPH. Profesionálne stavebné stroje a náradie. ☎ 0948 555 551`}
        />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} - ${brand} ${model} | Prenájom strojov Senec`} />
        <meta property="og:description" content={`Profesionálny prenájom ${product.name} v Senci. Od ${product.pricePerDay}€/deň. Možnosť dovozu. ☎ 0948 555 551`} />
        <meta property="og:image" content={`https://royalstroje.sk${product.image}`} />
        <meta property="og:url" content={`https://royalstroje.sk/${productId}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - ${brand} ${model}`} />
        <meta name="twitter:description" content={`Prenájom ${product.name} v Senci od ${product.pricePerDay}€/deň. Možnosť dovozu.`} />
        <meta name="twitter:image" content={`https://royalstroje.sk${product.image}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": `${product.name} - ${brand} ${model}`,
            "image": `https://royalstroje.sk${product.image}`,
            "description": `${product.name} na prenájom v Senci a Bratislave`,
            "brand": { "@type": "Brand", "name": brand },
            "offers": {
              "@type": "Offer",
              "price": product.pricePerDay,
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock",
              "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
              "seller": {
                "@type": "Organization",
                "name": "Royal Stroje",
                "telephone": "+421948555551",
                "address": { "@type": "PostalAddress", "addressLocality": "Senec", "addressCountry": "SK" }
              }
            }
          })}
        </script>
      </Helmet>

      {/* ═══ COMPACT HERO STRIP ═══ */}
      <section className="hidden md:block relative h-[200px] lg:h-[240px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero3.webp"
            alt="Stavebná technika"
            className="w-full h-full object-cover object-center"
            width={2200}
            height={900}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 w-full">
            {/* Breadcrumb */}
            <Link
              to="/#pozicovna"
              className="inline-flex items-center gap-2 text-white/70 hover:text-orange-primary text-sm font-medium transition-colors mb-3"
            >
              <ArrowLeft size={16} />
              <span>Katalóg</span>
              <ChevronRight size={14} className="text-white/40" />
              <span className="text-white/50">{product.name}</span>
            </Link>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight">
              {product.brand} <span className="text-orange-primary">{product.model}</span>
            </h1>
            <p className="text-white/70 text-base lg:text-lg mt-1">{product.name}</p>
          </div>
        </div>
      </section>

      {/* ═══ MOBILE HEADER ═══ */}
      <div className="md:hidden bg-zinc-950 pt-4 pb-2 px-4">
        <div className="flex items-center justify-between mb-3">
          <Link
            to="/#pozicovna"
            className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-white/10 text-white font-bold rounded-full transition-all text-xs"
          >
            <ArrowLeft size={14} />
            <span>Katalóg</span>
          </Link>
          <img src="/logoroyal.webp" alt="Royal Stroje" className="h-7 w-auto" width={2048} height={419} />
        </div>
        <h1 className="text-xl font-black text-white leading-tight">
          {product.brand} <span className="text-orange-primary">{product.model}</span>
        </h1>
        <p className="text-white/70 text-sm">{product.name}</p>
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="relative pb-8 md:pb-16 overflow-hidden bg-zinc-950">
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-6 md:pt-10">

          {/* ─── Product Grid: Image + Price/CTA/Specs ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10 md:mb-16">

            {/* LEFT: Product Image */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/10 rounded-2xl p-4 md:p-6">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {product.isNew && (
                      <span className="px-2.5 py-1 bg-orange-primary/20 border border-orange-primary/40 text-orange-primary text-[10px] font-bold rounded-full uppercase tracking-wider">Novinka</span>
                    )}
                    {product.inStock !== false && (
                      <span className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Dostupné
                      </span>
                    )}
                  </div>

                  <div className="bg-white rounded-xl aspect-square flex items-center justify-center p-6">
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.model} - ${product.name}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Price + CTA + Specs */}
            <div className="lg:col-span-7 space-y-6">

              {/* ── Price & CTA Card ── */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
                {/* Price header */}
                <div className="p-5 md:p-7">
                  {hasValidPrice ? (
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-1">
                      <div>
                        <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Cena prenájmu</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-orange-primary font-black text-4xl md:text-5xl tracking-tight">
                            {product.pricePerDay.toFixed(2)}€
                          </span>
                          <span className="text-white/50 text-base font-medium">/ deň bez DPH</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-white/50 text-xs">s DPH</span>
                        <p className="text-white font-bold text-xl">{product.priceWithDPH.toFixed(2)}€<span className="text-white/50 text-sm font-normal"> / deň</span></p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <span className="text-white/50 text-xs font-medium uppercase tracking-wider">Cena prenájmu</span>
                      <p className="text-orange-primary font-black text-2xl md:text-3xl mt-1">Na požiadanie</p>
                      <p className="text-white/50 text-sm mt-1">Zavolajte nám pre cenovú ponuku</p>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="border-t border-white/10 p-5 md:p-7 bg-zinc-950/50">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href="tel:+421948555551"
                      onClick={(e) => {
                        if (window.innerWidth >= 768) {
                          e.preventDefault();
                          setShowPhone(!showPhone);
                        }
                      }}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-base rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-orange-primary/30"
                    >
                      <Phone size={20} />
                      <span>{showPhone ? '0948 555 551' : 'Zavolať teraz'}</span>
                    </a>
                    <a
                      href="https://wa.me/421948555551"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-zinc-800 border border-white/10 text-white font-bold text-base rounded-xl hover:bg-zinc-700 hover:border-orange-primary/30 transition-all"
                    >
                      <MessageCircle size={20} className="text-green-400" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <a
                    href="mailto:info@royalstroje.sk"
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-white/70 hover:text-white font-medium text-sm transition-colors"
                  >
                    <Mail size={16} />
                    <span>info@royalstroje.sk</span>
                  </a>
                </div>
              </div>

              {/* ── Quick Benefits ── */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center text-center gap-2 bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-4">
                  <Clock size={20} className="text-orange-primary" />
                  <span className="text-white text-xs md:text-sm font-bold leading-tight">Do 24 hodín</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-4">
                  <Truck size={20} className="text-orange-primary" />
                  <span className="text-white text-xs md:text-sm font-bold leading-tight">Dovoz na stavbu</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2 bg-zinc-900/50 border border-white/5 rounded-xl p-3 md:p-4">
                  <Shield size={20} className="text-orange-primary" />
                  <span className="text-white text-xs md:text-sm font-bold leading-tight">Servisovaná technika</span>
                </div>
              </div>

              {/* ── Technical Specs ── */}
              {product.parameters.length > 0 && (
                <div className="bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 md:px-7 md:py-5 border-b border-white/10">
                    <h2 className="text-white font-black text-lg md:text-xl">Technické parametre</h2>
                  </div>
                  <div className="divide-y divide-white/5">
                    {product.parameters.map((param, idx) => (
                      <div key={idx} className="flex items-center justify-between px-5 py-3.5 md:px-7 md:py-4 hover:bg-white/[0.02] transition-colors">
                        <span className="text-white/60 text-sm md:text-base">{param.label}</span>
                        <span className="text-white font-bold text-sm md:text-base text-right">{param.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Blog link ── */}
              {product.blogArticleSlug && (
                <Link
                  to={`/blog/${product.blogArticleSlug}`}
                  className="group flex items-center gap-4 bg-zinc-900/50 border border-white/10 hover:border-orange-primary/30 rounded-xl px-5 py-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-400 text-lg">📖</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm group-hover:text-orange-primary transition-colors">Prečítajte si článok o tomto produkte</p>
                    <p className="text-white/50 text-xs">Detailné informácie, porovnanie a recenzia</p>
                  </div>
                  <ChevronRight size={18} className="text-white/30 group-hover:text-orange-primary transition-colors" />
                </Link>
              )}
            </div>
          </div>

          {/* ─── Bottom CTA Section ─── */}
          <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-950 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 overflow-hidden">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-primary/50 to-transparent" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="lg:max-w-lg">
                <h2 className="text-white font-black text-xl md:text-2xl lg:text-3xl mb-2">
                  Potrebujete <span className="text-orange-primary">{product.name.toLowerCase()}</span>?
                </h2>
                <p className="text-white/70 text-sm md:text-base">
                  Zavolajte nám alebo napíšte — zistite dostupnosť a dohodnite dovoz priamo na stavbu.
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
                  <span className="text-white/70 text-xs flex items-center gap-1.5"><Check size={14} className="text-orange-primary" />Bezplatná konzultácia</span>
                  <span className="text-white/70 text-xs flex items-center gap-1.5"><Check size={14} className="text-orange-primary" />20 rokov skúseností</span>
                  <span className="text-white/70 text-xs flex items-center gap-1.5"><Check size={14} className="text-orange-primary" />Dovoz do 30km zdarma</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+421948555551"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-base rounded-xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-orange-primary/30"
                >
                  <Phone size={20} />
                  <span>0948 555 551</span>
                </a>
                <a
                  href="mailto:info@royalstroje.sk"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-zinc-800 border border-white/10 text-white font-bold text-base rounded-xl hover:bg-zinc-700 hover:border-orange-primary/30 transition-all"
                >
                  <Mail size={20} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MOBILE STICKY CTA ═══ */}
      <div className="md:hidden fixed bottom-[68px] left-0 right-0 z-40 px-3 pb-2 pt-1 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent">
        <a
          href="tel:+421948555551"
          className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm rounded-xl shadow-lg shadow-orange-primary/30"
        >
          <Phone size={18} />
          <span>Zavolať: 0948 555 551</span>
        </a>
      </div>
    </div>
  );
}
