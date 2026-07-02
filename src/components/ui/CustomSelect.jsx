import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Vyberte možnosť',
  required = false,
  name = 'select',
  light = false
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
        className={`w-full rounded-lg px-3 py-2.5 text-sm text-left focus:outline-none transition-all flex items-center justify-between ${
          light ? 'bg-white border text-zinc-900 shadow-sm' : 'bg-zinc-950/60 border text-white'
        } ${
          isOpen
            ? 'border-orange-primary/60 shadow-[0_0_0_3px_rgba(255,102,0,0.15)]'
            : light
              ? 'border-zinc-200 hover:border-orange-primary/50'
              : 'border-white/10 hover:border-orange-primary/50'
        }`}
        required={required}
      >
        <span className={value ? (light ? 'text-zinc-900 font-medium' : 'text-white font-medium') : (light ? 'text-zinc-400 font-medium' : 'text-white/60 font-medium')}>
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
        className={`absolute top-full left-0 right-0 mt-2 rounded-lg z-[9999] overflow-hidden transition-all duration-300 ${
          light
            ? 'bg-white border border-zinc-200 shadow-xl shadow-zinc-900/10'
            : 'bg-zinc-900 border border-white/15 shadow-2xl shadow-black/50'
        } ${
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
                  ? (light
                      ? 'bg-orange-50 text-orange-primary font-bold'
                      : 'bg-orange-primary/25 text-orange-primary font-bold')
                  : (light
                      ? 'text-zinc-700 hover:bg-orange-50 hover:text-orange-primary hover:pl-5'
                      : 'text-white hover:bg-orange-primary/15 hover:text-orange-primary hover:pl-5')
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
