import { Phone, Mail, ArrowLeft, Check, Clock, Shield, Truck } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { products } from '../data/products';

export default function ProductDetail() {
  const { productId } = useParams();

  // Find product by ID
  const productData = products.find(p => p.id === productId);

  // Redirect to home if product not found
  if (!productData) {
    return <Navigate to="/#pozicovna" replace />;
  }

  // Extract brand and model from product name
  // Examples: "Makita BO3710", "DeWalt DCG405P2", "Citroen Jumper"
  const nameParts = productData.name.split(' ');
  const brand = nameParts[0] || '';
  const model = nameParts.slice(1).join(' ') || '';

  // Parse features array into parameters
  // Format: "Label - Value" → { label: "Label", value: "Value" }
  const parameters = productData.features.map(feature => {
    const [label, value] = feature.split(' - ');
    return { label: label?.trim() || '', value: value?.trim() || '' };
  }).filter(param => param.label && param.value);

  // Calculate price with DPH (VAT 23%)
  const priceWithDPH = (productData.pricePerDay * 1.23).toFixed(2);

  const product = {
    name: productData.description || productData.name,
    brand: brand,
    model: model,
    image: productData.image,
    pricePerDay: productData.pricePerDay,
    priceWithDPH: parseFloat(priceWithDPH),
    parameters: parameters,
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
        <meta
          name="keywords"
          content={`${product.name}, ${brand}, ${model}, prenájom, Senec, Bratislava, stavebná mechanizácia, stavebné náradie, požičovňa náradia`}
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name} - ${brand} ${model} | Prenájom strojov Senec`} />
        <meta
          property="og:description"
          content={`Profesionálny prenájom ${product.name} v Senci. Od ${product.pricePerDay}€/deň. Možnosť dovozu. ☎ 0948 555 551`}
        />
        <meta property="og:image" content={`https://royalstroje.sk${product.image}`} />
        <meta property="og:url" content={`https://royalstroje.sk/${productId}`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} - ${brand} ${model}`} />
        <meta
          name="twitter:description"
          content={`Prenájom ${product.name} v Senci od ${product.pricePerDay}€/deň. Možnosť dovozu.`}
        />
        <meta name="twitter:image" content={`https://royalstroje.sk${product.image}`} />

        {/* Product Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": `${product.name} - ${brand} ${model}`,
            "image": `https://royalstroje.sk${product.image}`,
            "description": `${product.name} na prenájom v Senci a Bratislave`,
            "brand": {
              "@type": "Brand",
              "name": brand
            },
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
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Senec",
                  "addressCountry": "SK"
                }
              }
            }
          })}
        </script>
      </Helmet>

      {/* Hero Section - Desktop only */}
      <section className="hidden md:flex relative py-24 md:py-32 lg:py-40 items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero-pozicovna.webp"
            alt={`${product.brand} ${product.model}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50 z-10"></div>

        {/* Gradient fade na spodok - prechod do content sekcie */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: '160px',
            background: 'linear-gradient(to bottom, transparent, #181818)'
          }}
        />

        {/* Content */}
        <div className="relative z-20 w-full max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            {/* Breadcrumbs */}
            <Link
              to="/#pozicovna"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-primary/20 to-orange-primary/10 border-2 border-orange-primary/40 hover:border-orange-primary hover:bg-orange-primary/30 text-white font-bold rounded-full transition-all mb-4 md:mb-6 hover:scale-105"
            >
              <ArrowLeft size={20} />
              <span className="text-sm md:text-base">Späť na katalóg</span>
            </Link>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed">
              Profesionálny prenájom v Senci. Dovoz môžeme zabezpečiť, cena podľa vzdialenosti a typu stroja.
            </p>
          </div>
        </div>
      </section>

      {/* Separator line between hero and content */}
      <hr className="hidden md:block border-0 h-[2px] bg-[#FF6600] w-full m-0" />

      {/* Main Content Section */}
      <section className="relative pb-16 md:py-16 overflow-hidden min-h-screen" style={{
        background: 'linear-gradient(to bottom, #181818 0%, #27272a 15%, #27272a 85%, #181818 100%)'
      }}>
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(100, 100, 110, 0.2) 0%, transparent 75%)'
          }}
        />

        {/* Mobile Logo & Back Button */}
        <div className="md:hidden absolute top-3 left-3 right-3 z-30 flex items-center justify-between">
          <Link
            to="/#pozicovna"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-primary/20 to-orange-primary/10 border-2 border-orange-primary/40 hover:border-orange-primary text-white font-bold rounded-full transition-all hover:scale-105 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
            <span className="text-xs">Späť</span>
          </Link>
          <img
            src="/logoroyal.png"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">

          {/* Mobile Header */}
          <div className="md:hidden pt-16 pb-6 text-center">
            <h1 className="text-2xl font-black text-white mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-base text-orange-primary font-bold">
              {product.brand} {product.model}
            </p>
          </div>

          {/* Product Model Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              {product.brand} <span className="text-orange-primary">{product.model}</span>
            </h2>
          </div>

          {/* Product Detail Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">

            {/* Left Column - Image */}
            <div className="order-1">
              <div className="bg-gradient-to-br from-orange-primary/20 to-orange-primary/5 border-2 border-orange-primary/30 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:border-orange-primary/50 transition-all">
                <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 aspect-square flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={`${product.brand} ${product.model} - ${product.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="order-2 space-y-4 md:space-y-6">

              {/* Price Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-orange-primary/30 rounded-2xl p-6 md:p-8">
                <h2 className="text-white font-black text-xl md:text-2xl mb-6">Cena prenájmu</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-white/70 text-sm md:text-base">Cena bez DPH</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-orange-primary font-black text-3xl md:text-4xl">
                        {product.pricePerDay.toFixed(2)}€
                      </span>
                      <span className="text-white/60 text-sm md:text-base">/deň</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-semibold text-base md:text-lg">Cena s DPH</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-black text-2xl md:text-3xl">
                        {product.priceWithDPH.toFixed(2)}€
                      </span>
                      <span className="text-white/60 text-sm md:text-base">/deň</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Parameters Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-orange-primary/20 rounded-2xl p-6 md:p-8">
                <h2 className="text-white font-black text-xl md:text-2xl mb-6">Technické parametre</h2>
                <div className="space-y-4">
                  {product.parameters.map((param, idx) => (
                    <div
                      key={idx}
                      className="bg-zinc-950/50 rounded-lg p-4 border border-white/5 hover:border-orange-primary/30 transition-colors"
                    >
                      <span className="text-white/60 text-xs md:text-sm block mb-1">{param.label}</span>
                      <span className="text-white font-bold text-base md:text-lg">{param.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mb-8 md:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Card 1 - Okamžitá dostupnosť */}
              <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite'
                }}></div>

                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                    <Clock className="text-orange-primary" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Rezervácia telefonicky alebo mailom</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Pracujete do 24 hodín</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
              </div>

              {/* Card 2 - Dovoz možný */}
              <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite'
                }}></div>

                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                    <Truck className="text-orange-primary" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Dovoz na stavbu</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Cena podľa dohody</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
              </div>

              {/* Card 3 - Servis zahrnutý */}
              <div className="group relative bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-orange-primary/30 rounded-2xl p-6 hover:border-orange-primary/80 hover:shadow-2xl hover:shadow-orange-primary/50 shadow-lg shadow-black/50 hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                {/* Animated border glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(255,102,0,0.1) 50%, transparent 70%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradient-shift 3s ease infinite'
                }}></div>

                <div className="relative text-center">
                  <div className="w-14 h-14 rounded-xl bg-orange-primary/10 border border-orange-primary/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-primary/20 group-hover:scale-110 transition-all">
                    <Shield className="text-orange-primary" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-orange-primary transition-colors">Ponúkame kvalitnú techniku</h3>
                  <p className="text-white/60 text-sm leading-relaxed">Pravidelná údržba</p>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-primary/0 to-orange-primary/0 group-hover:from-orange-primary/10 group-hover:to-orange-primary/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-orange-primary/10 to-orange-primary/5 border-2 border-orange-primary/40 rounded-2xl md:rounded-3xl p-6 md:p-10 text-center">
            <h2 className="text-white font-black text-2xl md:text-4xl mb-4">
              Potrebujete tento stroj?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto">
              Zavolajte nám alebo napíšte email a zistite dostupnosť. Dovoz môžeme zabezpečiť podľa dohody.
            </p>

            {/* Contact Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8">
              <div className="flex items-center gap-2 bg-zinc-900/50 border border-orange-primary/30 rounded-full px-4 py-2 text-sm md:text-base">
                <span className="text-orange-primary">✓</span>
                <span className="text-white/90">Bezplatná konzultácia</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/50 border border-orange-primary/30 rounded-full px-4 py-2 text-sm md:text-base">
                <span className="text-orange-primary">✓</span>
                <span className="text-white/90">Profesionálne náradie</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-900/50 border border-orange-primary/30 rounded-full px-4 py-2 text-sm md:text-base">
                <span className="text-orange-primary">✓</span>
                <span className="text-white/90">12 rokov skúseností</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="tel:+421948555551"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm md:text-lg rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-orange-primary/40 hover:shadow-orange-primary/60"
              >
                <Phone size={20} />
                <span>Zavolať: 0948 555 551</span>
              </a>
              <a
                href="mailto:info@royalstroje.sk"
                className="inline-flex items-center justify-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-zinc-900 border-2 border-zinc-700 text-white font-bold text-sm md:text-lg rounded-full hover:bg-zinc-800 hover:border-orange-primary/50 transition-all hover:scale-105 active:scale-95"
              >
                <Mail size={20} />
                <span>Napísať email</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
