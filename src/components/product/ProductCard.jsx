import { Phone, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [showSpecs, setShowSpecs] = useState(false);

  return (
    <>
      <div className="group bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden hover:border-orange-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-primary/20">
        {/* Image Container */}
        <div className="relative h-64 bg-zinc-800 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover select-none group-hover:brightness-110 transition-all duration-300"
            loading="lazy"
            draggable="false"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none select-none group-hover:from-black/70 transition-all duration-300" style={{ zIndex: 1 }}></div>

          {/* Price Badge */}
          <div className="absolute top-4 right-4 flex flex-col items-end" style={{ zIndex: 2 }}>
            <div className="px-3 py-1.5 bg-orange-primary text-black font-black text-sm rounded-lg shadow-lg">
              {product.price}
            </div>
            <span className="text-[10px] text-white/60 font-semibold mt-1 bg-black/50 px-2 py-0.5 rounded">
              bez DPH
            </span>
          </div>

          {/* Status Badges */}
          {product.isNew && (
            <div className="absolute top-4 left-4 px-2 py-1 bg-orange-primary/20 border border-orange-primary/40 backdrop-blur-sm text-orange-primary text-xs font-bold rounded-md uppercase" style={{ zIndex: 2 }}>
              Novinka
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-4 left-4 px-2 py-1 bg-zinc-900/90 border border-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-md uppercase" style={{ zIndex: 2 }}>
              {product.badge}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Product Name */}
          <h3 className="text-xl font-black text-white mb-3 leading-tight">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-sm mb-4 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {product.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs px-3 py-1.5 bg-orange-primary/10 border border-orange-primary/30 text-orange-primary rounded-lg font-semibold"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col gap-3">
            {/* Primary CTA */}
            <a
              href="tel:+421948555551"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-primary/30 w-auto mx-auto"
            >
              <Phone size={16} />
              <span>Rezervovať</span>
            </a>

            {/* Secondary Link */}
            <button
              onClick={() => setShowSpecs(true)}
              className="group/btn text-orange-primary font-bold text-sm flex items-center justify-center gap-2 hover:gap-3 transition-all"
            >
              <span>Technické parametre</span>
              <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="mt-3 text-center text-red-400 text-xs font-semibold">
              Momentálne nedostupné
            </div>
          )}
        </div>
      </div>

      {/* Specs Modal */}
      {showSpecs && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSpecs(false)}
        >
          <div
            className="bg-zinc-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-white/10 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-1">{product.name}</h2>
                <p className="text-white/60 text-sm">{product.subcategory}</p>
              </div>
              <button
                onClick={() => setShowSpecs(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Image */}
              <div className="mb-6 rounded-xl overflow-hidden border border-white/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-2">Popis</h3>
                <p className="text-white/70 leading-relaxed">{product.description}</p>
              </div>

              {/* Specs */}
              <div className="mb-6">
                <h3 className="text-white font-bold text-lg mb-3">Technické parametre</h3>
                <div className="bg-zinc-800 border border-white/10 rounded-xl p-4 space-y-3">
                  {product.specs ? (
                    Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-white/60 font-medium">{key}</span>
                        <span className="text-white font-bold">{value}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/60 text-sm">
                      Pre viac informácií o technických parametroch nás kontaktujte na{' '}
                      <a href="tel:+421948555551" className="text-orange-primary font-bold hover:underline">
                        0948 555 551
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-bold text-lg mb-3">Vlastnosti</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-orange-primary/10 border border-orange-primary/30 text-orange-primary rounded-lg font-semibold text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Price */}
              <div className="bg-orange-primary/10 border border-orange-primary/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Cena prenájmu</p>
                    <p className="text-orange-primary text-3xl font-black">{product.price}</p>
                    <p className="text-white/60 text-xs font-semibold mt-1">bez DPH</p>
                  </div>
                  <a
                    href="tel:+421948555551"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-primary/40"
                  >
                    <Phone size={16} />
                    <span>Rezervovať</span>
                  </a>
                </div>
              </div>

              {/* Stock Status */}
              <div className="text-center">
                {product.inStock ? (
                  <span className="inline-flex items-center gap-2 text-green-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span>
                    Dostupné na sklade
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-red-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-red-400"></span>
                    Momentálne nedostupné
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
