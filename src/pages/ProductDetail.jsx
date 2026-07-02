import { Phone, ArrowLeft, ArrowRight, Clock, Shield, Truck, ChevronRight, MessageCircle, BookOpen } from 'lucide-react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import useProducts from '../hooks/useProducts';
import CtaBand from '../components/common/CtaBand';

export default function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useProducts();

  // Find product by ID
  const productData = products.find(p => p.id === productId);

  // Show loading while fetching from Supabase
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAFAFA' }}>
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        <meta property="og:image" content={product.image.startsWith('http') ? product.image : `https://royalstroje.sk${product.image}`} />
        <meta property="og:url" content={`https://royalstroje.sk/${productId}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - ${brand} ${model}`} />
        <meta name="twitter:description" content={`Prenájom ${product.name} v Senci od ${product.pricePerDay}€/deň. Možnosť dovozu.`} />
        <meta name="twitter:image" content={product.image.startsWith('http') ? product.image : `https://royalstroje.sk${product.image}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": `${product.name} - ${brand} ${model}`,
            "image": product.image.startsWith('http') ? product.image : `https://royalstroje.sk${product.image}`,
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

      {/* ═══ HERO STRIP ═══ */}
      <section className="hidden md:block relative h-[280px] lg:h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/hero3.webp"
            alt="Stavebná technika"
            className="w-full h-full object-cover object-center"
            width={2200}
            height={900}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAFAFA] to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end pb-10">
          <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 w-full">
            {/* Breadcrumb */}
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-orange-primary/20 border border-white/15 hover:border-orange-primary/40 text-white/80 hover:text-white text-sm font-semibold rounded-full transition-all mb-5 backdrop-blur-sm"
            >
              <ArrowLeft size={15} />
              <span>Späť na katalóg</span>
            </button>

            {/* Kicker = brand/model, H1 = the descriptive name people actually search for */}
            {productData.description && <span className="eyebrow mb-5">{productData.name}</span>}
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mt-4 leading-tight max-w-4xl" style={{ textWrap: 'balance' }}>
              {product.name}
            </h1>
          </div>
        </div>
      </section>

      {/* ═══ MOBILE HEADER ═══ */}
      <div className="md:hidden pt-4 pb-2 px-4" style={{ background: '#FAFAFA' }}>
        {/* pr-14 keeps the logo clear of the fixed hamburger button; dark-text logo for the light bg */}
        <div className="flex items-center justify-between mb-3 pr-14">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-3 py-2 bg-white border border-zinc-200 text-zinc-900 font-bold rounded-full transition-all text-xs"
          >
            <ArrowLeft size={14} />
            <span>Katalóg</span>
          </button>
          <img src="/logoroyal-dark.webp" alt="Royal Stroje" className="h-7 w-auto" width={2048} height={419} />
        </div>
        <h1 className="text-xl font-black text-zinc-900 leading-tight" style={{ textWrap: 'balance' }}>
          {product.name}
        </h1>
        {productData.description && (
          <p className="text-zinc-600 text-sm font-semibold mt-0.5">{productData.name}</p>
        )}
      </div>

      {/* ═══ MAIN CONTENT ═══ */}
      <section className="relative pb-8 md:pb-16 overflow-hidden" style={{ background: '#FAFAFA' }}>
        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 pt-6 md:pt-10">

          {/* ─── Product Grid: Image + Price/CTA/Specs ─── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-10 md:mb-16">

            {/* LEFT: Product Image — white panel so the white-background product
                photos blend seamlessly instead of floating in a dark frame */}
            <div className="lg:col-span-5">
              <div className="sticky top-24">
                <div className="relative bg-white border border-zinc-200 rounded-2xl shadow-sm shadow-zinc-900/5 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-orange-primary text-white text-[11px] font-bold rounded uppercase tracking-wide shadow-lg shadow-orange-primary/30">
                      Novinka
                    </span>
                  )}
                  <div className="aspect-square flex items-center justify-center p-6 md:p-10">
                    <img
                      src={product.image}
                      alt={`${product.brand} ${product.model} - ${product.name}`}
                      className="w-full h-full object-contain select-none"
                      draggable="false"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Price + CTA + Specs */}
            <div className="lg:col-span-7 space-y-6">

              {/* ── Price & CTA Card — the conversion point, so the CTAs live here ── */}
              <div className="relative bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl shadow-sm shadow-zinc-900/10 overflow-hidden">
                {/* Orange top accent rule */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-primary via-orange-primary/70 to-transparent" />
                <div className="p-5 md:p-7">
                  <p className="text-zinc-400 font-bold text-xs uppercase tracking-wider mb-4">Cena prenájmu na deň</p>
                  {hasValidPrice ? (
                    <div className="flex items-end gap-6">
                      {/* Primary price */}
                      <div>
                        <span className="text-orange-primary font-black text-4xl md:text-5xl tracking-tight">
                          {product.pricePerDay.toFixed(2)}€
                        </span>
                        <span className="text-zinc-400 text-sm font-medium ml-2">bez DPH</span>
                      </div>
                      {/* Divider */}
                      <div className="hidden sm:block w-px h-10 bg-white/10" />
                      {/* DPH price */}
                      <div>
                        <span className="text-white font-bold text-xl md:text-2xl">
                          {product.priceWithDPH.toFixed(2)}€
                        </span>
                        <span className="text-zinc-400 text-sm font-medium ml-2">s DPH</span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-orange-primary font-black text-2xl md:text-3xl">Na požiadanie</p>
                      <p className="text-zinc-400 text-sm mt-1">Zavolajte nám pre cenovú ponuku</p>
                    </div>
                  )}

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 pt-6 border-t border-white/10">
                    <a href="tel:+421948555551" className="btn-primary px-6 py-3.5">
                      <Phone size={18} />
                      <span>Zavolať 0948 555 551</span>
                    </a>
                    <Link to="/cenova-ponuka" className="btn-secondary px-6 py-3.5">
                      <span>Nezáväzná ponuka</span>
                      <ArrowRight size={16} className="text-orange-primary" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* ── Quick facts — quiet inline row, not a card grid ── */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5 px-1">
                {[
                  { Icon: Clock, label: 'Do 24 hodín' },
                  { Icon: Truck, label: 'Dovoz na stavbu' },
                  { Icon: Shield, label: 'Servisovaná technika' },
                ].map((fact) => (
                  <span key={fact.label} className="inline-flex items-center gap-2 text-zinc-700 text-sm font-semibold">
                    <fact.Icon size={16} className="text-orange-primary" />
                    {fact.label}
                  </span>
                ))}
              </div>

              {/* ── Technical Specs ── */}
              {product.parameters.length > 0 && (
                <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl overflow-hidden">
                  <div className="px-5 py-4 md:px-7 md:py-5 border-b border-white/10">
                    <h2 className="text-white font-black text-lg md:text-xl">Technické parametre</h2>
                  </div>
                  <div className="divide-y divide-white/10">
                    {product.parameters.map((param, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 px-5 py-3.5 md:px-7 md:py-4 hover:bg-white/5 transition-colors">
                        <span className="text-zinc-400 text-sm md:text-base">{param.label}</span>
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
                  className="group flex items-center gap-4 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-white/10 hover:border-orange-primary/50 rounded-xl px-5 py-4 transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-orange-primary/10 border border-orange-primary/25 flex items-center justify-center flex-shrink-0">
                    <BookOpen size={18} className="text-orange-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm group-hover:text-orange-primary transition-colors">Prečítajte si článok o tomto produkte</p>
                    <p className="text-zinc-400 text-xs">Detailné informácie, porovnanie a recenzia</p>
                  </div>
                  <ChevronRight size={18} className="text-zinc-500 group-hover:text-orange-primary transition-colors" />
                </Link>
              )}
            </div>
          </div>

          {/* ─── Bottom CTA Section ─── */}
          <CtaBand
            eyebrow="Kontakt"
            title={<>Máte záujem o <span className="text-orange-primary">tento produkt?</span></>}
            text="Zavolajte nám alebo napíšte — zistite dostupnosť a dohodnite dovoz priamo na stavbu."
            icon={Phone}
            actions={
              <>
                <a
                  href="tel:+421948555551"
                  className="btn-primary text-base px-7 py-4"
                >
                  <Phone size={20} />
                  <span>Zavolať teraz</span>
                </a>
                <a
                  href="https://wa.me/421948555551"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-base px-7 py-4"
                >
                  <MessageCircle size={20} className="text-green-600" />
                  <span>WhatsApp</span>
                </a>
              </>
            }
          />
        </div>
      </section>

    </div>
  );
}
