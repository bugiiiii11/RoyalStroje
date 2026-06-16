import { ChevronRight, Phone, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, customerType = 'po' }) {
  const [showPhone, setShowPhone] = useState(false);

  // Calculate price based on customer type (23% DPH)
  const displayPrice = customerType === 'po'
    ? product.pricePerDay
    : (product.pricePerDay * 1.23);

  // Check if price is valid
  const hasValidPrice = product.pricePerDay && !isNaN(product.pricePerDay);
  const priceLabel = customerType === 'po' ? 'bez DPH /deň' : 's DPH /deň';

  return (
    <>
      <div className="group bg-gradient-to-b from-zinc-800/80 to-zinc-900 border border-white/10 rounded-xl md:rounded-2xl overflow-hidden hover:border-orange-primary/60 hover:shadow-2xl hover:shadow-orange-primary/20 shadow-lg shadow-black/40 hover:-translate-y-1 transition-all duration-300 ease-out relative">
        {/* Image Container - Compact on mobile, square on desktop */}
        <div className="relative aspect-[4/3] md:aspect-square bg-gradient-to-br from-orange-100 via-orange-50 to-zinc-100 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            draggable="false"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none select-none" style={{ zIndex: 1 }}></div>

          {/* Status Badges */}
          {product.isNew && (
            <div className="absolute top-3 left-3 px-2 py-0.5 bg-orange-primary/30 md:bg-orange-primary/20 border border-orange-primary/40 md:backdrop-blur-sm text-orange-primary text-[10px] font-bold rounded uppercase tracking-wide shadow-lg" style={{ zIndex: 2 }}>
              Novinka
            </div>
          )}

          {product.badge && (
            <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-zinc-950/95 md:bg-zinc-950/90 border border-white/20 md:backdrop-blur-sm text-white text-[10px] font-bold rounded uppercase tracking-wide shadow-lg" style={{ zIndex: 2 }}>
              {product.badge}
            </div>
          )}

          {/* Price Badge - Bottom Right */}
          <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-zinc-950 md:bg-zinc-950/95 border border-orange-primary/40 md:backdrop-blur-md rounded-lg px-2 py-1.5 md:px-3 md:py-2 shadow-lg shadow-black/50" style={{ zIndex: 2 }}>
            <div className="flex flex-col items-end">
              {hasValidPrice ? (
                <>
                  <span className="font-display text-orange-primary text-lg md:text-2xl font-black leading-none">{displayPrice.toFixed(2)}€</span>
                  <span className="text-white/50 text-[9px] md:text-[10px] font-medium mt-0.5">{priceLabel}</span>
                </>
              ) : (
                <span className="text-orange-primary text-xs md:text-sm font-black leading-tight text-right whitespace-nowrap">Cena dohodou</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 md:p-4">
          {/* Product Name */}
          <h3 className="text-sm md:text-base font-bold text-white mb-0.5 md:mb-1 leading-tight line-clamp-1">
            {product.description}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-xs md:text-sm mb-2 md:mb-4 leading-relaxed line-clamp-1">
            {product.name}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-1.5 md:gap-2">
            {/* Product Detail Link - Primary Action */}
            <Link
              to={`/${product.id}`}
              className="relative inline-flex items-center justify-center gap-1 md:gap-1.5 px-2 py-2.5 md:px-3 md:py-2.5 font-bold text-xs md:text-sm rounded-lg transition-colors overflow-hidden group/detail bg-white/[0.04] border border-white/10 text-white hover:border-orange-primary/50 hover:text-orange-primary active:scale-[0.98] min-h-[44px]"
            >
              <span className="relative z-10">Zobraziť detail</span>
              <ChevronRight size={14} className="relative z-10 md:w-4 md:h-4 group-hover/detail:translate-x-0.5 transition-transform" />
            </Link>

            {/* Call Button - Secondary Action */}
            <a
              href="tel:+421948555551"
              onClick={(e) => {
                // On desktop, prevent default and toggle phone number
                if (window.innerWidth >= 768) {
                  e.preventDefault();
                  setShowPhone(!showPhone);
                }
                // On mobile, allow default behavior (tel: link)
              }}
              className="btn-primary px-2 py-2.5 md:px-3 md:py-2.5 rounded-lg min-h-[44px]"
            >
              <Phone size={14} className="md:w-4 md:h-4" />
              <span>{showPhone ? '0948 555 551' : 'Zavolať'}</span>
            </a>

            {/* Blog Article Link - Only show if product has blog article */}
            {product.blogArticleSlug && (
              <Link
                to={`/blog/${product.blogArticleSlug}`}
                className="group/blog text-blue-400 font-bold text-[10px] md:text-xs flex items-center justify-center gap-1 hover:text-blue-300 transition-all py-1"
              >
                <BookOpen size={12} className="md:w-3.5 md:h-3.5" />
                <span>Prečítať článok o produkte</span>
              </Link>
            )}
          </div>

          {/* Stock Status */}
          {!product.inStock && (
            <div className="mt-2 text-center text-red-400 text-[10px] font-semibold">
              Momentálne nedostupné
            </div>
          )}
        </div>

      </div>
    </>
  );
}
