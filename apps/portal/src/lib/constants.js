export const RESERVATION_STATUSES = {
  inquiry: { label: 'Dopyt', color: 'bg-gray-100 text-gray-700' },
  quoted: { label: 'Cenová ponuka', color: 'bg-blue-100 text-blue-700' },
  confirmed: { label: 'Potvrdená', color: 'bg-green-100 text-green-700' },
  active: { label: 'Aktívna', color: 'bg-orange-100 text-orange-700' },
  completed: { label: 'Ukončená', color: 'bg-teal-100 text-teal-700' },
  invoiced: { label: 'Fakturovaná', color: 'bg-purple-100 text-purple-700' },
  paid: { label: 'Zaplatená', color: 'bg-emerald-100 text-emerald-700' },
  cancelled: { label: 'Zrušená', color: 'bg-red-100 text-red-700' },
};

export const VAT_RATE = 0.23;
export const RC_DISCOUNT = 0.05; // Royal Card 5% discount
export const SITE_URL = 'https://royalstroje.sk'; // Main website for images

export function imageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  return SITE_URL + path;
}

export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return '—';
  return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('sk-SK');
}

export function daysBetween(from, to) {
  if (!from || !to) return 0;
  const diff = new Date(to) - new Date(from);
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
}
