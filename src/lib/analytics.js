/**
 * GA4 loader gated behind Google Consent Mode v2.
 *
 * Consent defaults to 'denied' in an inline script in index.html (must run
 * before gtag.js loads). The gtag.js library itself is only fetched here,
 * from enableAnalytics() -- never on boot -- so no request to Google happens
 * at all until the visitor explicitly accepts in CookieBanner.jsx. This
 * mirrors the "no analytics without consent" promise on /cookies.
 */

export const CONSENT_KEY = 'royalstroje_cookie_consent';

const GA_MEASUREMENT_ID = 'G-WTPC0SV333';

function loadGtagScript() {
  if (document.querySelector('script[data-ga4]')) return;
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  script.setAttribute('data-ga4', '');
  document.head.appendChild(script);
}

/** Call after the visitor accepts (or on boot, if they already accepted previously). */
export function enableAnalytics() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  loadGtagScript();
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
}

/**
 * Call on reject, or when revoking a previous accept (Cookies.jsx reset flow).
 * Denies consent going forward and clears any _ga* cookies gtag.js already
 * set on this domain -- best-effort, matters if the visitor had accepted
 * before and is now changing their mind.
 */
export function disableAnalytics() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('consent', 'update', { analytics_storage: 'denied' });

  try {
    document.cookie.split(';').forEach((c) => {
      const name = c.split('=')[0].trim();
      if (name === '_ga' || name.startsWith('_ga_')) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
  } catch {
    // ignore
  }
}
