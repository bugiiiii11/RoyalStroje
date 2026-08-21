import { useState, useRef, useEffect, useMemo } from 'react';
import { Users, X } from 'lucide-react';

export const stripDiacritics = (str) =>
  (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * Client filter with type-ahead. Suggestions come from the names actually
 * present in the caller's data, so the admin can never pick a client with no
 * matching rows. Matching is diacritic- and case-insensitive: "ab" finds
 * "AB-Building s. r. o.", "vargova" finds "Andrea Vargová".
 */
export default function ClientSearchInput({ value, onChange, options = [], placeholder = 'Hľadať podľa klienta...' }) {
  const [local, setLocal] = useState(value || '');
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const boxRef = useRef(null);

  useEffect(() => { setLocal(value || ''); }, [value]);

  // Close on outside click — the dropdown outlives a blur when clicking a row.
  useEffect(() => {
    const onDocClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const matches = useMemo(() => {
    const q = stripDiacritics(local.trim());
    const uniq = [...new Set(options.filter(Boolean))];
    const list = q ? uniq.filter((n) => stripDiacritics(n).includes(q)) : uniq;
    return list.sort((a, b) => a.localeCompare(b, 'sk')).slice(0, 8);
  }, [local, options]);

  const commit = (name) => {
    setLocal(name);
    onChange(name);
    setOpen(false);
  };

  const clear = () => {
    setLocal('');
    onChange('');
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (!open || matches.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight((h) => (h + 1) % matches.length); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight((h) => (h - 1 + matches.length) % matches.length); }
    if (e.key === 'Enter') { e.preventDefault(); commit(matches[highlight] ?? local); }
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div ref={boxRef} className="relative">
      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={local}
        onChange={(e) => {
          const val = e.target.value;
          setLocal(val);
          onChange(val);          // filter live; the dropdown only speeds up exact picks
          setHighlight(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-full pl-10 pr-8 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 input-glow outline-none transition-all"
      />
      {local && (
        <button
          onClick={clear}
          title="Zrušiť filter klienta"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {open && matches.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 py-1 max-h-64 overflow-y-auto">
          {matches.map((name, i) => (
            <button
              key={name}
              onMouseEnter={() => setHighlight(i)}
              onClick={() => commit(name)}
              className={`w-full text-left px-3 py-2 text-sm truncate ${
                i === highlight ? 'bg-royal-50 text-royal-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
