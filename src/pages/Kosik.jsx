import { useState } from 'react';
import { ShoppingCart, X, Send, Calendar, Building2, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Kosik() {
  const [selectedDays, setSelectedDays] = useState([]);
  const [customerType, setCustomerType] = useState('po'); // 'po' or 'fo'
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

  return (
    <div className="min-h-screen bg-zinc-950 pb-24 relative">
      {/* Mobile Logo - Top Left */}
      <div className="md:hidden absolute top-3 left-3 z-30">
        <img
          src="/logoroyal.png"
          alt="Royal Stroje"
          className="h-8 w-auto"
        />
      </div>

      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-6 text-center pt-16 md:pt-0">
          <h1 className="text-xl md:text-4xl font-black text-white mb-2 md:mb-4">
            <span className="text-orange-primary">Nezáväzná</span> objednávka
          </h1>
          <p className="text-white/70 text-sm md:text-lg">
            Skontrolujte si vybrané produkty a odošlite objednávku
          </p>
        </div>

        {/* Customer Type Selector */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <User size={16} className="text-orange-primary" />
            <span className="text-white/70 text-sm font-semibold">Typ zákazníka</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCustomerType('po')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                customerType === 'po'
                  ? 'bg-orange-primary text-white shadow-lg shadow-orange-primary/30'
                  : 'bg-zinc-800/50 text-white/60 hover:bg-zinc-800 hover:text-white/80'
              }`}
            >
              <Building2 size={18} className="inline mr-2" />
              <span className="sm:hidden">PO</span>
              <span className="hidden sm:inline">Právnické osoby</span>
            </button>
            <button
              onClick={() => setCustomerType('fo')}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
                customerType === 'fo'
                  ? 'bg-orange-primary text-white shadow-lg shadow-orange-primary/30'
                  : 'bg-zinc-800/50 text-white/60 hover:bg-zinc-800 hover:text-white/80'
              }`}
            >
              <User size={18} className="inline mr-2" />
              <span className="sm:hidden">FO</span>
              <span className="hidden sm:inline">Fyzické osoby</span>
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <ShoppingCart size={16} className="text-orange-primary" />
            <span className="text-white/70 text-sm font-semibold">
              Vybrané produkty ({cartItems.length})
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart size={48} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">Košík je prázdny</p>
              <a
                href="/"
                className="inline-block mt-4 px-6 py-2 bg-orange-primary text-white font-bold text-sm rounded-full hover:bg-orange-hover transition-all"
              >
                Prejsť do požičovne
              </a>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {cartItems.map((item) => {
                const itemPrice = item.pricePerDay && !isNaN(item.pricePerDay)
                  ? (customerType === 'po' ? item.pricePerDay : item.pricePerDay * 1.2)
                  : null;
                const priceLabel = customerType === 'po' ? 'bez DPH' : 's DPH';

                return (
                  <div
                    key={item.id}
                    className="bg-zinc-800/50 rounded-xl p-3 flex items-start gap-3 group hover:bg-zinc-800 transition-all"
                  >
                    {/* Product Image */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm mb-1 truncate">
                        {item.name}
                      </h3>
                      <p className="text-white/50 text-xs mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      <p className="text-orange-primary text-sm font-black">
                        {itemPrice !== null ? `${itemPrice.toFixed(2)}€/${priceLabel}/deň` : item.price}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Odstrániť z košíka"
                    >
                      <X size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Calendar - only show if cart has items */}
        {cartItems.length > 0 && (
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={16} className="text-orange-primary" />
              <span className="text-orange-primary text-sm font-bold">{getMonthsInRange()}</span>
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
                      className="p-2 rounded text-xs sm:text-sm font-medium bg-zinc-800/30 text-white/20 text-center cursor-not-allowed"
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
                    className={`p-2 rounded text-xs sm:text-sm font-bold transition-all ${
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
        )}

        {/* Total Price - only show if cart has items */}
        {cartItems.length > 0 && (
          <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70 text-sm">
                {customerType === 'po' ? 'Cena bez DPH:' : 'Cena s DPH:'}
              </span>
              <div className="text-right">
                <span className="text-orange-primary text-2xl font-black">
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
        )}

        {/* Send Order Button - only show if cart has items */}
        {cartItems.length > 0 && (
          <button
            onClick={handleSendOrder}
            className="relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-orange-primary to-orange-hover text-white font-bold text-base rounded-full hover:scale-105 transition-all shadow-lg shadow-orange-primary/40 overflow-hidden group"
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <Send size={20} className="relative z-10" />
            <span className="relative z-10">Poslať objednávku</span>
          </button>
        )}
      </div>
    </div>
  );
}
