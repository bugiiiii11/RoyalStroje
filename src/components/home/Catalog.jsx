import { useState } from 'react';
import {
  ShoppingCart, X, Send, Calendar,
  Hammer, Cog, HardHat, ArrowUpFromLine,
  Container, Car, TreePine, Building2, User, Search, ChevronLeft, ChevronRight
} from 'lucide-react';
import { categories } from '../../data/categories';
import { getProductsBySubcategory, products } from '../../data/products';
import ProductCard from '../product/ProductCard';
import { useCart } from '../../context/CartContext';
import FAQ from './FAQ';
import QuoteForm from '../catalog/QuoteForm';

// Ikony pre jednotlivé kategórie
const categoryIcons = {
  'male-naradie': Hammer,
  'stredna-mechanizacia': Cog,
  'tazka-technika': HardHat,
  'pracovne-plosiny': ArrowUpFromLine,
  'vybavenie-staveniska': Container,
  'auta-privesy': Car,
  'zahradna-technika': TreePine,
};

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState('male-naradie');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDays, setSelectedDays] = useState([]);
  const [customerType, setCustomerType] = useState('po'); // 'po' or 'fo'
  const [searchQuery, setSearchQuery] = useState('');

  // Feature flag to show/hide cart functionality
  const showCart = false;

  // Mobile: 6 products, Desktop: 12 products
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const productsPerPage = isMobile ? 6 : 12;

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
  const baseTotal = getTotal();
  const totalPrice = customerType === 'po' ? baseTotal : baseTotal * 1.2;

  const handleSendOrder = () => {
    if (cartItems.length === 0) return;
    const productList = cartItems.map((item) => {
      const itemPrice = item.pricePerDay && !isNaN(item.pricePerDay)
        ? (customerType === 'po' ? item.pricePerDay : item.pricePerDay * 1.2).toFixed(2)
        : 'Cena dohodou';
      const priceLabel = customerType === 'po' ? 'bez DPH' : 's DPH';
      return `- ${item.name} (${itemPrice}€ ${priceLabel}/deň)`;
    }).join('\n');
    const daysText = selectedDays.length > 0
      ? `\n\nVybrané dni (${selectedDays.length}): ${selectedDays.sort().join(', ')}`
      : '';
    const priceType = customerType === 'po' ? 'bez DPH' : 's DPH';
    const message = `Dobrý deň, mám záujem o prenájom:\n\n${productList}${daysText}\n\nCelková suma: ${(totalPrice * rentalDays).toFixed(2)}€ ${priceType} (${rentalDays} ${rentalDays === 1 ? 'deň' : rentalDays < 5 ? 'dni' : 'dní'})`;
    const whatsappUrl = `https://wa.me/421948555551?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Helper function to remove diacritics (accents)
  const removeDiacritics = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  // Get current category data
  const currentCategory = categories.find(cat => cat.id === activeCategory);

  // Get filtered products
  let allProducts;
  if (searchQuery.trim()) {
    // Search across all products when search query is active
    const query = removeDiacritics(searchQuery.toLowerCase());
    allProducts = products.filter(product => {
      const name = removeDiacritics(product.name.toLowerCase());
      const description = removeDiacritics(product.description.toLowerCase());
      return name.includes(query) || description.includes(query);
    });
  } else {
    // Normal category/subcategory filtering when no search
    allProducts = getProductsBySubcategory(activeCategory, activeSubcategory);
  }

  // Calculate pagination
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveSubcategory('all');
    setCurrentPage(1);
  };

  // Handle subcategory change
  const handleSubcategoryChange = (subcategoryId) => {
    setActiveSubcategory(subcategoryId);
    setCurrentPage(1);
  };

  return (
    <section id="katalog" className="relative bg-zinc-950 overflow-hidden min-h-screen">
      {/* Mobile Hero - Compact */}
      <div className="md:hidden relative h-[22vh] max-h-[200px] bg-black overflow-hidden">
        {/* Logo - Top Left */}
        <div className="absolute top-3 left-3 z-30">
          <img
            src="/logoroyal.png"
            alt="Royal Stroje"
            className="h-8 w-auto"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 h-full flex flex-col justify-center px-4 pt-10 text-center">
          <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4 leading-tight">
            <span className="text-orange-primary">Katalóg</span> strojov na prenájom
          </h1>
          <p className="text-white/70 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto">
            Vyberte si zo 7 kategórií stavebného náradia a mechanizácie. Dovoz na stavbu do 4 hodín.
          </p>
        </div>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 top-[30vh] md:top-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(70, 70, 77, 0.5) 0%, rgba(9, 9, 11, 1) 75%)'
        }}
      />

      <div className="relative z-10 max-w-[1800px] mx-auto px-4 md:px-8 lg:px-12 pt-2 pb-16 md:py-16">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-8">
          <h2 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
            <span className="text-orange-primary">Katalóg</span> strojov na prenájom
          </h2>
          <p className="text-white/70 text-sm md:text-lg max-w-2xl mx-auto mb-6">
            Vyberte si zo 7 kategórií stavebného náradia a mechanizácie. Dovoz na stavbu do 4 hodín.
          </p>
        </div>

        {/* Customer Type Selector & Search - Centered Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 mb-4 md:mb-8">
            {/* Customer Type Selector */}
            <div className="inline-flex bg-zinc-900 border border-white/10 rounded-lg md:rounded-2xl p-0.5 md:p-1.5 gap-0.5 md:gap-1.5">
              <button
                onClick={() => setCustomerType('po')}
                className={`flex items-center gap-1 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-md md:rounded-xl font-bold text-[10px] md:text-sm transition-all ${
                  customerType === 'po'
                    ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <Building2 size={12} className="md:w-4 md:h-4" />
                <span className="hidden sm:inline">Právnické osoby</span>
                <span className="sm:hidden">PO</span>
              </button>
              <button
                onClick={() => setCustomerType('fo')}
                className={`flex items-center gap-1 md:gap-2 px-2.5 py-1.5 md:px-4 md:py-2 rounded-md md:rounded-xl font-bold text-[10px] md:text-sm transition-all ${
                  customerType === 'fo'
                    ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                <User size={12} className="md:w-4 md:h-4" />
                <span className="hidden sm:inline">Fyzické osoby</span>
                <span className="sm:hidden">FO</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 md:left-3 top-1/2 -translate-y-1/2 text-white/40" size={12} />
              <input
                type="text"
                placeholder="Hľadať produkty..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-zinc-900 border border-white/10 rounded-lg md:rounded-xl pl-8 md:pl-10 pr-8 md:pr-10 py-1.5 md:py-2.5 text-[11px] md:text-sm text-white placeholder-white/40 focus:outline-none focus:border-orange-primary/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                  }}
                  className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X size={10} className="md:w-3.5 md:h-3.5" />
                </button>
              )}
            </div>
          </div>

        {/* Main Content - No frame */}
        <div className="relative">

        {/* Main Catalog Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-zinc-900 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-6 sticky top-24">
              <h3 className="text-white font-black text-sm md:text-lg uppercase tracking-wide mb-3 md:mb-6 px-1 md:px-2">
                Kategórie
              </h3>
              <div className="space-y-1.5 md:space-y-3">
                {categories.map((category) => {
                  const IconComponent = categoryIcons[category.id];
                  const isActive = activeCategory === category.id;

                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`group w-full text-left px-2 py-2 md:px-4 md:py-3.5 rounded-lg md:rounded-xl font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-primary to-orange-hover text-white shadow-lg shadow-orange-primary/40'
                          : 'bg-zinc-800/50 text-white/80 hover:bg-zinc-800 hover:text-white border border-transparent hover:border-orange-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-2 md:gap-3 relative">
                        {/* Icon Container */}
                        <div className={`relative flex-shrink-0 w-7 h-7 md:w-10 md:h-10 rounded-md md:rounded-lg flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-white/20'
                            : 'bg-zinc-700/50 group-hover:bg-orange-primary/20'
                        }`}>
                          {IconComponent && (
                            <IconComponent
                              size={16}
                              className={`md:w-5 md:h-5 transition-all duration-300 ${
                                isActive
                                  ? 'text-white'
                                  : 'text-orange-primary group-hover:scale-110'
                              }`}
                            />
                          )}
                          {/* Badge as small dot indicator on icon */}
                          {category.badge && !isActive && (
                            <span className="absolute -top-0.5 -right-0.5 md:-top-1 md:-right-1 w-2 h-2 md:w-3 md:h-3 bg-orange-primary rounded-full border border-zinc-900 md:border-2"></span>
                          )}
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <span className="block text-xs md:text-base leading-tight">{category.name}</span>
                          {/* Badge text under category name */}
                          {category.badge && !isActive && (
                            <span className="text-[8px] md:text-[9px] text-orange-primary font-bold uppercase tracking-wider">
                              {category.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quote Form - Under Categories */}
            <div className="hidden lg:block mt-6">
              <QuoteForm />
            </div>

            {/* Cart - Under Categories (Hidden) */}
            {showCart && (
            <div className="hidden lg:block bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden mt-6">
              {/* Header */}
              <div className="bg-zinc-800 border-b border-white/10 px-4 py-3 flex items-center gap-2">
                <ShoppingCart size={18} className="text-orange-primary" />
                <h3 className="text-white font-bold text-sm">Nezáväzná objednávka</h3>
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
                      {cartItems.map((item) => {
                        const itemPrice = item.pricePerDay && !isNaN(item.pricePerDay)
                          ? (customerType === 'po' ? item.pricePerDay : item.pricePerDay * 1.2).toFixed(2)
                          : null;
                        return (
                          <div
                            key={item.id}
                            className="flex items-center justify-between gap-2 bg-zinc-800/50 rounded-lg px-3 py-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-xs font-semibold truncate">
                                {item.name}
                              </p>
                              <p className="text-orange-primary text-xs font-bold">
                                {itemPrice ? `${itemPrice}€/deň` : 'Cena dohodou'}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all flex-shrink-0"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        );
                      })}
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
                        <span className="text-white/70 text-sm">
                          {customerType === 'po' ? 'Cena bez DPH:' : 'Cena s DPH:'}
                        </span>
                        <div className="text-right">
                          <span className="text-orange-primary text-lg font-black">
                            {(totalPrice * rentalDays).toFixed(2)}€
                          </span>
                          {rentalDays > 1 && (
                            <p className="text-white/50 text-xs">
                              ({totalPrice.toFixed(2)}€ × {rentalDays} {rentalDays < 5 ? 'dni' : 'dní'})
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
            )}
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Subcategory Filters */}
            <div className="mb-4 md:mb-8">
              <div className="flex flex-wrap gap-1.5 md:gap-3">
                {currentCategory?.subcategories.map((subcategory) => {
                  const isActive = activeSubcategory === subcategory.id;
                  return (
                    <button
                      key={subcategory.id}
                      onClick={() => handleSubcategoryChange(subcategory.id)}
                      className={`group relative px-3 py-2 md:px-6 md:py-3.5 rounded-lg md:rounded-2xl font-bold text-xs md:text-base transition-all duration-300 ${
                        isActive
                          ? 'text-white scale-[1.02]'
                          : 'text-white/80 hover:text-white hover:scale-[1.02]'
                      }`}
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, #ff6600 0%, #ff8533 50%, #ff6600 100%)'
                          : 'linear-gradient(145deg, #2a2a2e 0%, #1a1a1d 100%)',
                        boxShadow: isActive
                          ? '0 8px 25px -5px rgba(255, 102, 0, 0.5), 0 4px 10px -5px rgba(255, 102, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2), inset 0 -2px 0 rgba(0, 0, 0, 0.15)'
                          : '0 4px 15px -3px rgba(0, 0, 0, 0.5), 0 2px 6px -2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -2px 0 rgba(0, 0, 0, 0.2)',
                        border: isActive
                          ? '1px solid rgba(255, 255, 255, 0.2)'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.boxShadow = '0 6px 20px -3px rgba(255, 102, 0, 0.3), 0 3px 8px -2px rgba(255, 102, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -2px 0 rgba(0, 0, 0, 0.2)';
                          e.currentTarget.style.border = '1px solid rgba(255, 102, 0, 0.4)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.boxShadow = '0 4px 15px -3px rgba(0, 0, 0, 0.5), 0 2px 6px -2px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -2px 0 rgba(0, 0, 0, 0.2)';
                          e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
                      }}
                    >
                      {/* Shine effect overlay */}
                      <span
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
                        }}
                      />
                      <span className="relative z-10">{subcategory.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Products Grid */}
            {currentProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} customerType={customerType} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-1 md:gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-2 md:px-4 md:py-2 rounded-lg font-bold transition flex items-center gap-1 ${
                        currentPage === 1
                          ? 'bg-zinc-900 text-white/30 cursor-not-allowed'
                          : 'bg-zinc-900 border border-orange-primary/50 text-orange-primary hover:bg-orange-primary/10'
                      }`}
                    >
                      <ChevronLeft size={18} />
                      <span className="hidden md:inline text-sm">Predošlá</span>
                    </button>

                    {/* Page Numbers - Show max 5 pages on mobile */}
                    <div className="flex gap-1 md:gap-2">
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-bold text-xs md:text-sm transition ${
                              currentPage === page
                                ? 'bg-orange-primary text-white shadow-lg shadow-orange-primary/40'
                                : 'bg-zinc-900 border border-white/10 text-white/70 hover:bg-zinc-800 hover:text-white hover:border-orange-primary/30'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-2 md:px-4 md:py-2 rounded-lg font-bold transition flex items-center gap-1 ${
                        currentPage === totalPages
                          ? 'bg-zinc-900 text-white/30 cursor-not-allowed'
                          : 'bg-zinc-900 border border-orange-primary/50 text-orange-primary hover:bg-orange-primary/10'
                      }`}
                    >
                      <span className="hidden md:inline text-sm">Ďalšia</span>
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {searchQuery ? 'Nenašli sa žiadne výsledky' : 'Žiadne produkty'}
                </h3>
                <p className="text-white/70">
                  {searchQuery
                    ? `Skúste hľadať iný výraz alebo upravte filter kategórií`
                    : 'V tejto kategórii momentálne nie sú dostupné žiadne produkty.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setCurrentPage(1);
                    }}
                    className="mt-4 px-6 py-2 bg-orange-primary/20 border border-orange-primary/40 text-orange-primary rounded-full font-bold hover:bg-orange-primary/30 transition-all"
                  >
                    Vymazať vyhľadávanie
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        </div>

        {/* FAQ Section - Integrated */}
        <FAQ />

      </div>
    </section>
  );
}
