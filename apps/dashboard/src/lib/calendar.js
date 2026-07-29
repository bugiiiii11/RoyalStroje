// Week-calendar helpers shared by CalendarView and the dashboard widget.

export const DAY_NAMES = ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'];
export const DAY_NAMES_SHORT = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];
export const MONTH_NAMES = ['január', 'február', 'marec', 'apríl', 'máj', 'jún', 'júl', 'august', 'september', 'október', 'november', 'december'];

export const FIRST_HOUR = 7;
export const LAST_HOUR = 17;
export const HOURS = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => FIRST_HOUR + i);

// Task colours: left stripe + tinted background so the text stays readable.
export const TASK_COLORS = {
  neutral: { label: 'Bez farby', chip: 'bg-gray-50 border-gray-300', text: 'text-gray-700', dot: 'bg-gray-400' },
  green: { label: 'Zelená', chip: 'bg-green-50 border-green-500', text: 'text-green-900', dot: 'bg-green-500' },
  yellow: { label: 'Žltá', chip: 'bg-amber-50 border-amber-400', text: 'text-amber-900', dot: 'bg-amber-400' },
  red: { label: 'Červená', chip: 'bg-red-50 border-red-500', text: 'text-red-900', dot: 'bg-red-500' },
};

export const TASK_COLOR_KEYS = Object.keys(TASK_COLORS);

export function getTaskColors(color) {
  return TASK_COLORS[color] || TASK_COLORS.neutral;
}

// Local-date ISO (YYYY-MM-DD). Never use toISOString() here -- it shifts by the
// UTC offset and would put a 00:00 local date on the previous day.
export function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

// Monday of the week the given date falls in.
export function startOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const offset = (d.getDay() + 6) % 7;
  return addDays(d, -offset);
}

export function buildWeekDays(weekStart, count) {
  return Array.from({ length: count }, (_, i) => addDays(weekStart, i));
}

// "27. – 31. júla 2026" / "29. júna – 3. júla 2026"
export function formatWeekRange(from, to) {
  const sameMonth = from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear();
  const sameYear = from.getFullYear() === to.getFullYear();
  const left = sameMonth
    ? `${from.getDate()}.`
    : `${from.getDate()}. ${MONTH_NAMES[from.getMonth()]}${sameYear ? '' : ` ${from.getFullYear()}`}`;
  return `${left} – ${to.getDate()}. ${MONTH_NAMES[to.getMonth()]} ${to.getFullYear()}`;
}

export function formatHour(hour) {
  return `${hour}:00`;
}

// Tasks live in slots 7-17; clamp anything outside so nothing can go invisible.
export function clampHour(hour) {
  if (hour == null) return FIRST_HOUR;
  return Math.min(LAST_HOUR, Math.max(FIRST_HOUR, hour));
}

// Greedy row packing for the rentals lane: each bar gets the topmost free row.
export function layoutRentalBars(deals, weekDays) {
  const firstISO = toISO(weekDays[0]);
  const lastISO = toISO(weekDays[weekDays.length - 1]);
  const rows = [];
  const bars = [];

  for (const deal of deals) {
    if (deal.date_from > lastISO || deal.date_to < firstISO) continue;

    let startIdx = weekDays.findIndex(d => toISO(d) >= deal.date_from);
    if (startIdx === -1) continue;
    let endIdx = -1;
    for (let i = weekDays.length - 1; i >= 0; i--) {
      if (toISO(weekDays[i]) <= deal.date_to) { endIdx = i; break; }
    }
    if (endIdx === -1 || endIdx < startIdx) continue;

    let row = rows.findIndex(lastEnd => lastEnd < startIdx);
    if (row === -1) { rows.push(endIdx); row = rows.length - 1; }
    else rows[row] = endIdx;

    bars.push({
      deal,
      startIdx,
      endIdx,
      row,
      startsBefore: deal.date_from < firstISO,
      endsAfter: deal.date_to > lastISO,
    });
  }

  return { bars, rowCount: rows.length };
}
