import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Vyberte možnosť',
  required = false,
  name = 'select'
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Get selected option label
  const selectedOption = options.find(opt => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  };

  return (
    <div ref={selectRef} className="relative">
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-black border-2 rounded-lg px-3 py-2 text-white text-sm text-left focus:outline-none transition-all flex items-center justify-between shadow-md ${
          isOpen
            ? 'border-orange-primary/80 shadow-[0_0_0_3px_rgba(255,102,0,0.15)]'
            : 'border-orange-primary/20 hover:border-orange-primary/50 hover:shadow-orange-primary/20'
        }`}
        required={required}
      >
        <span className={value ? 'text-white font-medium' : 'text-white/70 font-medium'}>
          {displayText}
        </span>
        <ChevronDown
          size={20}
          className={`text-orange-primary transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu with FAQ-style animation */}
      <div
        className={`absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-orange-primary/40 rounded-lg shadow-2xl shadow-orange-primary/20 z-[9999] overflow-hidden transition-all duration-300 ${
          isOpen
            ? 'max-h-[500px] opacity-100'
            : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="py-2 max-h-[500px] overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-all ${
                value === option.value
                  ? 'bg-orange-primary/25 text-orange-primary font-bold border-l-4 border-orange-primary'
                  : 'text-white hover:bg-orange-primary/15 hover:text-orange-primary hover:pl-5'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
