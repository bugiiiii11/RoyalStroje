import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, inView] — inView becomes true once the element enters the viewport.
 * Fires only once (unobserves after first trigger).
 */
export function useInView(options = {}) {
  const ref = useRef(null);
  // No IntersectionObserver → start visible (CSS also only hides under html.js-reveal)
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
