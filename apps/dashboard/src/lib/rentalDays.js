/**
 * Calculates rental days based on actual pickup and return datetimes.
 *
 * Rules:
 *  ≤ 24h                 → 1 day
 *  24–26h (per day)      → same day count, negotiable
 *  26–28h (per day)      → + 0.5 day
 *  > 28h  (per day)      → + 1 full day
 *
 * @param {Date|string} pickupDatetime
 * @param {Date|string} returnDatetime
 * @returns {{ days: number, isNegotiable: boolean }}
 */
export function calculateRentalDays(pickupDatetime, returnDatetime) {
  const pickup = new Date(pickupDatetime);
  const ret = new Date(returnDatetime);
  const hours = (ret - pickup) / 3_600_000;

  if (hours <= 0) return { days: 1, isNegotiable: false };
  if (hours <= 24) return { days: 1, isNegotiable: false };

  const extraHours = hours - 24;
  const additionalFullDays = Math.floor(extraHours / 24);
  const remainder = extraHours % 24;
  let days = 1 + additionalFullDays;
  let isNegotiable = false;

  if (remainder === 0) {
    // exact multiple of 24h — no extra charge
  } else if (remainder <= 2) {
    // 0–2h over the day boundary — negotiable, typically no extra charge
    isNegotiable = true;
  } else if (remainder <= 4) {
    // 2–4h over — half day surcharge
    days += 0.5;
  } else {
    // > 4h over — full additional day
    days += 1;
  }

  return { days, isNegotiable };
}

/**
 * Combines a date string (YYYY-MM-DD) and time string (HH:MM) into a Date object.
 */
export function combineDatetime(dateStr, timeStr) {
  if (!dateStr) return null;
  const time = timeStr || '00:00';
  return new Date(`${dateStr}T${time}:00`);
}
