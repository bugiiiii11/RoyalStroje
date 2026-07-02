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
          {/* Base scale-[1.02] overdraws the container so the layer's fractional-pixel
              bottom edge can't expose the light bg as a white seam during the hover zoom */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover select-none scale-[1.02] transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            draggable="false"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent pointer-events-none select-none" style={{ zIndex: 1 }}></div>

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
          <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-zinc-950 md:bg-zinc-950/90 border border-white/15 rounded-lg px-2 py-1 md:px-2.5 md:py-1.5 shadow-lg shadow-black/50" style={{ zIndex: 2 }}>
            <div className="flex flex-col items-end">
              {hasValidPrice ? (
                <>
                  <span className="font-display text-orange-primary text-base md:text-lg font-black leading-none">{displayPrice.toFixed(2)}€</span>
                  <span className="text-white/70 text-[9px] md:text-[10px] font-medium mt-0.5">{priceLabel}</span>
                </>
              ) : (
                <span className="text-orange-primary text-xs md:text-sm font-black leading-tight text-right whitespace-nowrap">Cena dohodou</span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-2 md:p-4">
          {/* Product Name - two lines so wattage/size variants stay distinguishable */}
          <h3 className="text-sm md:text-base font-bold text-white mb-0.5 md:mb-1 leading-tight line-clamp-2 min-h-[2.25rem] md:min-h-[2.5rem]">
            {product.description}
          </h3>

          {/* Description */}
          <p className="text-white/60 text-xs md:text-sm mb-2 md:mb-4 leading-relaxed line-clamp-1">
            {product.name}
          </p>

          {/* Actions - one orange primary per card, call demoted to quiet link */}
          <div className="flex flex-col gap-1.5 md:gap-2">
            {/* Product Detail Link - Primary Action */}
            <Link
              to={`/${product.id}`}
              className="btn-primary group/detail px-2 py-2.5 md:px-3 md:py-2.5 rounded-lg text-xs md:text-sm min-h-[44px]"
            >
              <span>Zobraziť detail</span>
              <ChevronRight size={14} className="md:w-4 md:h-4 group-hover/detail:translate-x-0.5 transition-transform" />
            </Link>

            {/* Call Link - quiet secondary */}
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
              className="inline-flex items-center justify-center gap-1.5 font-bold text-xs md:text-sm text-zinc-300 hover:text-orange-primary transition-colors min-h-[44px]"
            >
              <Phone size={14} className="md:w-4 md:h-4" />
              <span>{showPhone ? '0948 555 551' : 'Zavolať'}</span>
            </a>

            {/* Blog Article Link - Only show if product has blog article */}
            {product.blogArticleSlug && (
              <Link
                to={`/blog/${product.blogArticleSlug}`}
                className="group/blog text-zinc-400 font-bold text-[10px] md:text-xs flex items-center justify-center gap-1 hover:text-orange-primary transition-all py-1"
              >
                <BookOpen size={12} className="md:w-3.5 md:h-3.5" />
                <span>Prečítať článok o produkte</span>
              </Link>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
