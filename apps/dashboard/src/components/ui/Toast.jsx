import { useEffect, useRef } from 'react';
import { CheckCircle2, X } from 'lucide-react';

/**
 * Floating confirmation toast. Opaque background on purpose -- a blurred fixed
 * element is the mobile-GPU-garbage construct from s21.
 */
export default function Toast({ message, onClose, duration = 3500 }) {
  // Kept in a ref so an inline onClose from the parent cannot restart the timer
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => closeRef.current?.(), duration);
    return () => clearTimeout(timer);
  }, [message, duration]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] animate-slide-up" role="status" aria-live="polite">
      <div className="flex items-center gap-2.5 bg-green-600 text-white text-sm font-medium pl-3.5 pr-2 py-2.5 rounded-xl shadow-lg">
        <CheckCircle2 className="w-4 h-4 shrink-0" />
        <span>{message}</span>
        <button
          onClick={() => closeRef.current?.()}
          className="p-1 rounded-lg hover:bg-white/20 transition-colors"
          aria-label="Zavrieť"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
