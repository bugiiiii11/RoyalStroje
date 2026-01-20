import { useState, useEffect } from 'react';
import { ShoppingCart, X, Send, Calendar } from 'lucide-react';
import { categories } from '../../data/categories';
import { getProductsBySubcategory } from '../../data/products';
import ProductCard from '../product/ProductCard';
import { useCart } from '../../context/CartContext';

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('male-naradie');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const productsPerPage = 8;
  const { cartItems, removeFromCart, getTotal } = useCart();

  // Generate calendar days starting from today, aligned to week grid
  const generateCalendarData = () => {
    const today = new Date();
    const days = [];

    // Get the day of week for today (0 = Sunday, 1 = Monday, etc.)
    // Convert to Monday-based (0 = Monday, 6 = Sunday)
    const todayDayOfWeek = today.getDay();
    const mondayBasedDay = todayDayOfWeek === 0 ? 6 : todayDayOfWeek - 1;

    // Add empty slots for days before today in the current week
    for (let i = 0; i < mondayBasedDay; i++) {
      days.push(null); // null = empty cell
    }

    // Add next 35 days
    for (let i = 0; i < 35; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }

    return days;
  };

  const calendarDays = generateCalendarData();

  // Get unique months in the range
  const getMonthsInRange = () => {
    const months = [];
    const monthNames = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];
    calendarDays.forEach(date => {
      if (date) { // Skip null (empty) cells
        const monthYear = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        if (!months.includes(monthYear)) {
          months.push(monthYear);
        }
      }
    });
    return months.join(' / ');
  };

  const toggleDay = (dateString) => {
    setSelectedDays(prev => {
      if (prev.includes(dateString)) {
        return prev.filter(d => d !== dateString);
      }
      return [...prev, dateString];
    });
  };

  const getDayName = (date) => {
    const days = ['Ne', 'Po', 'Ut', 'St', 'Št', 'Pi', 'So'];
    return days[date.getDay()];
  };

  const formatDate = (date) => {
    return `${date.getDate()}.${date.getMonth() + 1}`;
  };

  const dayHeaders = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];

  const rentalDays = selectedDays.length || 1;
  const totalPrice = getTotal() * rentalDays;

  const handleSendOrder = () => {
    if (cartItems.length === 0) return;
    const productList = cartItems
      .map((item) => `- ${item.name} (${item.price})`)
      .join('\n');
    const daysText = selectedDays.length > 0
      ? `\n\nVybrané dni (${selectedDays.length}): ${selectedDays.sort().join(', ')}`
      : '';
    const message = `Dobrý deň, mám záujem o prenájom:\n\n${productList}${daysText}\n\nCelková suma: ${totalPrice}€ (${rentalDays} ${rentalDays === 1 ? 'deň' : rentalDays < 5 ? 'dni' : 'dní'})`;
    const whatsappUrl = `https://wa.me/421948555551?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Get current category data
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  // Get filtered products
  const allProducts = getProductsBySubcategory(activeCategory, activeSubcategory);

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Reset to page 1 when category or subcategory changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeSubcategory]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory('all');
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId) => {
    setActiveSubcategory(subcategoryId);
  };

  return (
    <section id="katalog" className="relative py-12 md:py-16 bg-zinc-950 overflow-hidden">
      {/* Radial gradient overlay - wider spread */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.7) 0%, rgba(9, 9, 11, 1) 75%)'
        }}
      />

      {/* Grid pattern overlay - much more visible */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25] z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Diagonal subtle lines for technical feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.08] z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)'
        }}
      />

      {/* Orange accent glow - top right (animated) */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: '10%',
          right: '10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,102,0,0.6) 0%, rgba(255,102,0,0.2) 40%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.15,
          animation: 'floatGlow1 8s ease-in-out infinite'
        }}
      />

      {/* Orange accent glow - bottom left (animated) */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: '10%',
          left: '10%',
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(255,102,0,0.5) 0%, rgba(255,102,0,0.15) 40%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.12,
          animation: 'floatGlow2 10s ease-in-out infinite'
        }}
      />

      {/* Center pulsing glow */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none z-0"
        style={{
          width: '800px',
          height: '800px',
          marginLeft: '-400px',
          marginTop: '-400px',
          background: 'radial-gradient(circle, rgba(255,102,0,0.4) 0%, rgba(255,102,0,0.1) 50%, transparent 70%)',
          filter: 'blur(120px)',
          animation: 'pulseGlow 6s ease-in-out infinite'
        }}
      />

      {/* Animation keyframes */}
      <style>{`
        @keyframes floatGlow1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-120px, 100px) scale(1.2);
          }
          50% {
            transform: translate(80px, -120px) scale(0.85);
          }
          75% {
            transform: translate(100px, 60px) scale(1.1);
          }
        }

        @keyframes floatGlow2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(140px, -100px) scale(1.25);
          }
          66% {
            transform: translate(-100px, 120px) scale(0.8);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.08;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.18;
          }
        }
      `}</style>

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12">
        {/* Section Header - outside the container, on grid background */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Vyberte si z našej{' '}
            <span className="text-orange-primary">širokej ponuky</span>
          </h2>
          <p className="text-white/70 text-base md:text-lg max-w-3xl mx-auto">
            Profesionálna technika pre každý typ projektu - od malého náradia po ťažkú mechanizáciu
          </p>
        </div>

        {/* Main Container with Frame */}
        <div className="relative bg-zinc-950/80 backdrop-blur-sm border-2 border-orange-primary/60 rounded-3xl p-6 md:p-10 lg:p-12 shadow-[0_0_40px_rgba(255,102,0,0.15)]">
          {/* Subtle glow effect */}
          <div className="absolute -inset-px bg-gradient-to-b from-orange-primary/10 via-transparent to-orange-primary/5 rounded-3xl pointer-events-none"></div>

        {/* Main Catalog Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 sticky top-24">
              <h3 className="text-white font-black text-lg uppercase tracking-wide mb-6 px-2">
                Kategórie
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl font-bold text-lg transition-all ${
                      activeCategory === category.id
                        ? 'bg-orange-primary text-white shadow-lg shadow-orange-primary/30'
                        : 'bg-zinc-800/50 text-white/80 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      {category.badge && activeCategory !== category.id && (
                        <span className="text-xs px-2 py-1 bg-orange-primary/20 text-orange-primary rounded font-semibold">
                          {category.badge}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart - Under Categories */}
            <div className="hidden lg:block bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden mt-6">
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

                    {/* Mini Calendar */}
                    <div className="border-t border-white/10 pt-3 mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar size={14} className="text-orange-primary" />
                        <span className="text-orange-primary text-xs font-bold">{getMonthsInRange()}</span>
                      </div>
                      {/* Day headers */}
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayHeaders.map((day, idx) => {
                          const isWeekendHeader = idx >= 5; // So, Ne
                          return (
                            <div
                              key={day}
                              className={`text-center text-xs font-bold ${isWeekendHeader ? 'text-white/30' : 'text-white/60'}`}
                            >
                              {day}
                            </div>
                          );
                        })}
                      </div>
                      {/* Calendar grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((date, index) => {
                          // Empty cell for days before today
                          if (!date) {
                            return <div key={`empty-${index}`} className="p-2" />;
                          }

                          const dateString = formatDate(date);
                          const isSelected = selectedDays.includes(dateString);
                          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                          const isToday = date.toDateString() === new Date().toDateString();

                          // Weekends are not clickable
                          if (isWeekend) {
                            return (
                              <div
                                key={dateString}
                                className="p-2 rounded text-sm font-medium bg-zinc-800/30 text-white/20 text-center cursor-not-allowed"
                                title="Víkendy nie sú k dispozícii"
                              >
                                {date.getDate()}
                              </div>
                            );
                          }

                          return (
                            <button
                              key={dateString}
                              onClick={() => toggleDay(dateString)}
                              className={`p-2 rounded text-sm font-bold transition-all ${
                                isSelected
                                  ? 'bg-orange-primary text-white'
                                  : isToday
                                  ? 'bg-orange-primary/30 text-orange-primary border border-orange-primary/50 hover:bg-orange-primary/40'
                                  : 'bg-zinc-800/50 text-white/80 hover:bg-zinc-700 hover:text-white'
                              }`}
                              title={`${getDayName(date)} ${dateString}`}
                            >
                              {date.getDate()}
                            </button>
                          );
                        })}
                      </div>
                      {selectedDays.length > 0 && (
                        <p className="text-orange-primary text-sm mt-3 font-semibold">
                          {selectedDays.length} {selectedDays.length === 1 ? 'deň' : selectedDays.length < 5 ? 'dni' : 'dní'}
                        </p>
                      )}
                    </div>

                    {/* Total */}
                    <div className="border-t border-white/10 pt-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Cena s DPH:</span>
                        <div className="text-right">
                          <span className="text-orange-primary text-lg font-black">
                            {totalPrice}€
                          </span>
                          {rentalDays > 1 && (
                            <p className="text-white/50 text-xs">
                              ({getTotal()}€ × {rentalDays} {rentalDays < 5 ? 'dni' : 'dní'})
                            </p>
                          )}
                        </div>
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
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Subcategory Filters */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3">
                {currentCategory?.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => handleSubcategoryChange(subcategory.id)}
                    className={`px-5 py-3 rounded-xl font-bold text-base transition-all ${
                      activeSubcategory === subcategory.id
                        ? 'bg-orange-primary text-white shadow-lg shadow-orange-primary/30'
                        : 'bg-zinc-900 border border-white/10 text-white/70 hover:bg-zinc-800 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        currentPage === 1
                          ? 'bg-zinc-900 text-white/30 cursor-not-allowed'
                          : 'bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800'
                      }`}
                    >
                      Predošlá
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-bold text-sm transition ${
                            currentPage === page
                              ? 'bg-orange-primary text-white'
                              : 'bg-zinc-900 border border-white/10 text-white/70 hover:bg-zinc-800 hover:text-white'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${
                        currentPage === totalPages
                          ? 'bg-zinc-900 text-white/30 cursor-not-allowed'
                          : 'bg-zinc-900 border border-white/10 text-white hover:bg-zinc-800'
                      }`}
                    >
                      Ďalšia
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Žiadne produkty
                </h3>
                <p className="text-white/70">
                  V tejto kategórii momentálne nie sú dostupné žiadne produkty.
                </p>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
