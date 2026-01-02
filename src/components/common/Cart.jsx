import { ShoppingCart, X, Send, Phone } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, getTotal } = useCart();

  const handleSendOrder = () => {
    if (cartItems.length === 0) return;

    // Create message with product list
    const productList = cartItems
      .map((item) => `- ${item.name} (${item.price})`)
      .join('\n');
    const message = `Dobrý deň, mám záujem o prenájom:\n\n${productList}\n\nCelková suma: ${getTotal()}€/deň`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/421948555551?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="hidden lg:block fixed left-4 md:left-8 lg:left-12 bottom-24 z-40 w-72">
      <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="bg-zinc-800 border-b border-white/10 px-4 py-3 flex items-center gap-2">
          <ShoppingCart size={18} className="text-orange-primary" />
          <h3 className="text-white font-bold text-sm">Košík</h3>
          {cartItems.length > 0 && (
            <span className="ml-auto bg-orange-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {cartItems.length === 0 ? (
            <p className="text-white/50 text-sm text-center py-4">
              Košík je prázdny
            </p>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-2 bg-zinc-800/50 rounded-lg px-3 py-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-semibold truncate">
                        {item.name}
                      </p>
                      <p className="text-orange-primary text-xs font-bold">
                        {item.price}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all flex-shrink-0"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="border-t border-white/10 pt-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Celkom:</span>
                  <span className="text-orange-primary text-lg font-black">
                    {getTotal()}€<span className="text-xs font-normal text-white/50">/deň</span>
                  </span>
                </div>
              </div>

              {/* Send Order Button */}
              <button
                onClick={handleSendOrder}
                className="relative w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-sm rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-primary/40 overflow-hidden group"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Send size={16} className="relative z-10" />
                <span className="relative z-10">Poslať objednávku</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
