import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Hľadať...', delay = 300 }) {
  const [local, setLocal] = useState(value || '');
  const timer = useRef(null);

  useEffect(() => {
    setLocal(value || '');
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocal(val);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(val), delay);
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none transition-all"
      />
    </div>
  );
}
