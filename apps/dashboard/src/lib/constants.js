// Re-export from shared + dashboard-specific helpers

export const RESERVATION_STATUSES = {
  inquiry: { label: 'Dopyt', color: 'gray' },
  quoted: { label: 'Cenová ponuka', color: 'blue' },
  confirmed: { label: 'Potvrdená', color: 'green' },
  active: { label: 'Aktívna', color: 'orange' },
  completed: { label: 'Ukončená', color: 'teal' },
  invoiced: { label: 'Fakturovaná', color: 'purple' },
  paid: { label: 'Zaplatená', color: 'emerald' },
  cancelled: { label: 'Zrušená', color: 'red' },
};

export const PIPELINE_STATUSES = ['inquiry', 'quoted', 'confirmed', 'active', 'completed', 'invoiced'];

export const VALID_TRANSITIONS = {
  inquiry: ['quoted', 'cancelled'],
  quoted: ['confirmed', 'cancelled'],
  confirmed: ['active', 'cancelled'],
  active: ['completed'],
  completed: ['invoiced'],
  invoiced: ['paid'],
  paid: [],
  cancelled: [],
};

export const CLIENT_TYPES = {
  standard: { label: 'Štandardný', discount: 0 },
  royal_card: { label: 'Royal Card', discount: 5 },
  vip: { label: 'VIP', discount: 10 },
};

export const VAT_RATE = 0.23;

// Tailwind color class mappings
const COLOR_MAP = {
  gray: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', dot: 'bg-blue-500' },
  green: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-700', dot: 'bg-orange-500' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700', dot: 'bg-teal-500' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', dot: 'bg-purple-500' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  red: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
};

export function getStatusColors(status) {
  const s = RESERVATION_STATUSES[status];
  return s ? COLOR_MAP[s.color] || COLOR_MAP.gray : COLOR_MAP.gray;
}

export function getStatusLabel(status) {
  return RESERVATION_STATUSES[status]?.label || status;
}

export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return '—';
  return new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' }).format(amount);
}

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('sk-SK');
}

export const SITE_URL = 'https://royalstroje.sk';

export function imageUrl(path) {
  if (!path) return null;
  // Supabase Storage URLs are already absolute
  if (path.startsWith('http')) return path;
  // Legacy paths from /public/ folder
  return SITE_URL + path;
}

export function daysBetween(from, to) {
  if (!from || !to) return 0;
  const diff = new Date(to) - new Date(from);
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1);
}
