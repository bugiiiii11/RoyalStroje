import { ShoppingCart, ChevronRight, ChevronLeft, X, Phone, Check } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const [showSpecs, setShowSpecs] = useState(false);
  const { addToCart, isInCart } = useCart();
  const inCart = isInCart(product.id);

  return (
    <>
      <div className="group bg-zinc-900 border border-white/10 rounded-xl overflow-hidden hover:border-orange-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-primary/20">
        {/* Image Container - Square aspect ratio */}
        <div className="relative aspect-square bg-zinc-800 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover select-none transition-all duration-300"
            loading="lazy"
            draggable="false"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none select-none" style={{ zIndex: 1 }}></div>

          {/* Status Badges */}
          {product.isNew && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-orange-primary/20 border border-orange-primary/40 backdrop-blur-sm text-orange-primary text-[10px] font-bold rounded uppercase" style={{ zIndex: 2 }}>
              Novinka
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-zinc-900/90 border border-white/20 backdrop-blur-sm text-white text-[10px] font-bold rounded uppercase" style={{ zIndex: 2 }}>
              {product.badge}
            </div>
          )}

          {/* Price Badge - Bottom Right */}
          <div className="absolute bottom-3 right-3 bg-zinc-900/95 border border-orange-primary/40 backdrop-blur-md rounded-lg px-3 py-2 shadow-lg shadow-black/50" style={{ zIndex: 2 }}>
            <div className="flex flex-col items-start">
              <span className="text-orange-primary text-2xl font-black leading-none">{(product.pricePerDay * 1.2).toFixed(2)}€</span>
              <span className="text-white/50 text-[10px] font-medium mt-0.5">s DPH /deň</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Product Name */}
          <h3 className="text-lg font-bold text-orange-primary mb-1 leading-tight line-clamp-1">
            {product.description}
          </h3>

          {/* Description */}
          <p className="text-white text-sm mb-4 leading-relaxed line-clamp-1">
            {product.name}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            {/* Primary CTA */}
            <button
              onClick={() => addToCart(product)}
              disabled={inCart}
              className={`relative inline-flex items-center justify-center gap-1.5 px-3 py-2.5 font-bold text-sm rounded-full transition-all overflow-hidden group/cart ${
                inCart
                  ? 'bg-green-500/20 border border-green-500/50 text-green-400 cursor-default'
                  : 'bg-black border border-orange-primary text-orange-primary hover:scale-105'
              }`}
            >
              {/* Shine effect */}
              {!inCart && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-primary/30 to-transparent -translate-x-full group-hover/cart:translate-x-full transition-transform duration-700"></div>
              )}
              {inCart ? (
                <Check size={16} className="relative z-10" />
              ) : (
                <ShoppingCart size={16} className="relative z-10" />
              )}
              <span className="relative z-10">{inCart ? 'V košíku' : 'Do košíka'}</span>
            </button>

            {/* Secondary Link */}
            <button
              onClick={() => setShowSpecs(true)}
              className="group/btn text-orange-primary font-bold text-sm flex items-center justify-center gap-1 hover:gap-2 transition-all"
            >
              <ChevronLeft size={16} className="group-hover/btn:-translate-x-0.5 transition-transform" />
              <span>Technické parametre</span>
              <ChevronRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="mt-2 text-center text-red-400 text-[10px] font-semibold">
              Momentálne nedostupné
            </div>
          )}
        </div>
      </div>

      {/* Specs Modal */}
      {showSpecs && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowSpecs(false)}
        >
          <div
            className="bg-zinc-900 border-2 border-orange-primary/60 rounded-2xl w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] shadow-[0_0_40px_rgba(255,102,0,0.3)] relative flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Fixed Header */}
            <div className="flex-shrink-0 flex justify-end p-3 sm:p-4 pb-2">
              <button
                onClick={() => setShowSpecs(false)}
                className="w-10 h-10 sm:w-8 sm:h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all"
              >
                <X size={18} className="sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
              {/* Image */}
              <div className="mb-4 sm:mb-6 rounded-xl overflow-hidden border border-white/10 bg-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-56 object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="mb-4 sm:mb-6 text-center">
                <h2 className="text-xl sm:text-2xl font-black text-orange-primary mb-2">{product.description}</h2>
                <p className="text-white text-base sm:text-lg font-bold">{product.name}</p>
              </div>

              {/* Parameters Table */}
              {product.features && product.features.length > 0 && (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-white font-bold text-xs sm:text-sm uppercase tracking-wide mb-3 text-center">Parametre</h3>
                  <div className="bg-zinc-800 border border-white/10 rounded-xl overflow-hidden">
                    {product.features.map((feature, idx) => {
                      // Split feature by common separators or just display as is
                      const parts = feature.split(/[-:]/);
                      const label = parts.length > 1 ? parts[0].trim() : `Parameter ${idx + 1}`;
                      const value = parts.length > 1 ? parts.slice(1).join('-').trim() : feature;

                      return (
                        <div key={idx} className="flex justify-between py-2.5 sm:py-3 px-3 sm:px-4 border-b border-white/5 last:border-0 gap-2">
                          <span className="text-white/60 font-medium text-xs sm:text-sm">{label}</span>
                          <span className="text-white font-bold text-xs sm:text-sm text-right">{value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Prices */}
              <div className="mb-4 sm:mb-6 space-y-2 sm:space-y-3">
                <div className="flex justify-between items-center bg-zinc-800 border border-white/10 rounded-lg p-3 sm:p-4">
                  <span className="text-white/70 font-medium text-sm sm:text-base">Cena bez DPH</span>
                  <span className="text-white text-lg sm:text-xl font-black">{product.pricePerDay}€ /deň</span>
                </div>
                <div className="flex justify-between items-center bg-orange-primary/10 border border-orange-primary/30 rounded-lg p-3 sm:p-4">
                  <span className="text-orange-primary/80 font-medium text-sm sm:text-base">Cena s DPH</span>
                  <span className="text-orange-primary text-lg sm:text-xl font-black">{(product.pricePerDay * 1.2).toFixed(2)}€ /deň</span>
                </div>
              </div>

              {/* Reserve Button */}
              <a
                href="tel:+421948555551"
                className="relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-base sm:text-lg rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-orange-primary/40 overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Phone size={18} className="relative z-10 sm:w-5 sm:h-5" />
                <span className="relative z-10">Rezervovať</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
