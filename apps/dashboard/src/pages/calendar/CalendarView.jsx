import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';
import { supabase } from '../../lib/supabase';
import Spinner from '../../components/ui/Spinner';
import { getStatusColors, RESERVATION_STATUSES } from '../../lib/constants';

const DAY_NAMES = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];
const MONTH_NAMES = ['Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December'];

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  // Monday = 0, Sunday = 6
  let startOffset = (firstDay.getDay() + 6) % 7;
  const days = [];

  // Fill leading days from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    days.push({ date: d, isCurrentMonth: false });
  }

  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push({ date: new Date(year, month, i), isCurrentMonth: true });
  }

  // Fill trailing days
  while (days.length % 7 !== 0) {
    const d = new Date(year, month + 1, days.length - startOffset - lastDay.getDate() + 1);
    days.push({ date: d, isCurrentMonth: false });
  }

  return days;
}

function toISO(date) {
  return date.toISOString().split('T')[0];
}

function RentalBar({ deal, dayWidth, startCol, span, row, onClick }) {
  const colors = getStatusColors(deal.status);
  const left = startCol * dayWidth;
  const width = span * dayWidth - 2;

  return (
    <div
      onClick={() => onClick(deal)}
      className={`absolute rounded px-1.5 py-0.5 text-xs font-medium truncate cursor-pointer hover:opacity-80 transition-opacity ${colors.bg} ${colors.text}`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
        top: `${row * 22 + 24}px`,
      }}
      title={`${deal.reservation_number} · ${deal.clients?.company_name || '—'}`}
    >
      {deal.clients?.company_name || deal.reservation_number}
    </div>
  );
}

export default function CalendarView() {
  const navigate = useNavigate();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  // Fetch rentals that overlap with the visible month
  const monthStart = `${year}-${String(month + 1).padStart(2, '0')}-01`;
  const monthEnd = new Date(year, month + 1, 0).toISOString().split('T')[0];

  const { data: deals, loading } = useSupabaseQuery(
    () => supabase
      .from('reservations')
      .select('*, clients(company_name)')
      .neq('status', 'cancelled')
      .lte('date_from', monthEnd)
      .gte('date_to', monthStart)
      .order('date_from'),
    [monthStart, monthEnd]
  );

  const days = useMemo(() => getMonthDays(year, month), [year, month]);
  const today = toISO(now);

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  const goToday = () => { setYear(now.getFullYear()); setMonth(now.getMonth()); };

  // Map deals to grid positions
  const dayWidth = 100 / 7; // percentage per day column

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kalendár</h1>
        <div className="flex items-center gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={goToday} className="px-3 py-1.5 text-sm font-medium hover:bg-gray-100 rounded-lg">
            Dnes
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-lg font-semibold text-gray-900 ml-2">
            {MONTH_NAMES[month]} {year}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {DAY_NAMES.map((d) => (
            <div key={d} className="text-center py-2 text-xs font-medium text-gray-500 uppercase">
              {d}
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Spinner /></div>
        ) : (
          <div className="grid grid-cols-7">
            {days.map((day, idx) => {
              const iso = toISO(day.date);
              const isToday = iso === today;
              const dayDeals = (deals || []).filter(d => d.date_from <= iso && d.date_to >= iso);

              return (
                <div
                  key={idx}
                  className={`min-h-[80px] border-b border-r border-gray-100 p-1 ${
                    !day.isCurrentMonth ? 'bg-gray-50' : ''
                  }`}
                >
                  <span className={`text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full ${
                    isToday ? 'bg-royal-500 text-white' : day.isCurrentMonth ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    {day.date.getDate()}
                  </span>
                  {dayDeals.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {dayDeals.slice(0, 3).map((deal) => {
                        const colors = getStatusColors(deal.status);
                        return (
                          <div
                            key={deal.id}
                            onClick={() => navigate(`/deals/${deal.id}`)}
                            className={`text-[10px] px-1 py-0.5 rounded truncate cursor-pointer hover:opacity-80 ${colors.bg} ${colors.text}`}
                            title={`${deal.reservation_number} · ${deal.clients?.company_name}`}
                          >
                            {deal.clients?.company_name || deal.reservation_number}
                          </div>
                        );
                      })}
                      {dayDeals.length > 3 && (
                        <p className="text-[10px] text-gray-400 px-1">+{dayDeals.length - 3}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4">
        {Object.entries(RESERVATION_STATUSES)
          .filter(([key]) => key !== 'cancelled' && key !== 'paid')
          .map(([key, val]) => {
            const colors = getStatusColors(key);
            return (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                <div className={`w-3 h-3 rounded ${colors.bg}`} />
                <span className="text-gray-600">{val.label}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
