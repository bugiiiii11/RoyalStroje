import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Check, X, StickyNote, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';
import useCalendarTasks from '../../hooks/useCalendarTasks';
import { supabase } from '../../lib/supabase';
import Spinner from '../../components/ui/Spinner';
import TaskModal from './TaskModal';
import { getStatusColors, RESERVATION_STATUSES, dealContractNumber } from '../../lib/constants';
import {
  DAY_NAMES, HOURS, FIRST_HOUR, LAST_HOUR, TASK_COLORS, TASK_COLOR_KEYS,
  toISO, addDays, startOfWeek, buildWeekDays, formatWeekRange, formatHour, clampHour,
  getTaskColors, layoutRentalBars,
} from '../../lib/calendar';

function TaskChip({ task, onToggle, onOpen }) {
  const colors = getTaskColors(task.color);
  return (
    <div
      onClick={(e) => { e.stopPropagation(); onOpen(task); }}
      title={task.note ? `${task.title}\n${task.note}` : task.title}
      className={`flex items-start gap-1.5 rounded-md border-l-[3px] pl-2 pr-1.5 py-1.5 cursor-pointer transition-shadow hover:shadow-sm ${colors.chip} ${task.done ? 'opacity-55' : ''}`}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(task); }}
        title={task.done ? 'Označiť ako neukončené' : 'Označiť ako ukončené'}
        className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
          task.done ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white hover:border-green-500'
        }`}
      >
        {task.done && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
      </button>
      <span className={`flex-1 text-[13px] leading-snug break-words ${colors.text} ${task.done ? 'line-through' : ''}`}>
        {task.title}
      </span>
      {task.note && <StickyNote className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gray-400" />}
    </div>
  );
}

function QuickAdd({ onSubmit, onCancel }) {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('neutral');

  const submit = () => {
    if (!title.trim()) { onCancel(); return; }
    onSubmit({ title: title.trim(), color });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="rounded-md border border-royal-200 bg-white shadow-sm p-1 animate-fade-in"
    >
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') { e.preventDefault(); submit(); }
          if (e.key === 'Escape') { e.preventDefault(); onCancel(); }
        }}
        placeholder="Nová úloha…"
        className="w-full text-[13px] px-1 py-1 outline-none placeholder:text-gray-400"
      />
      <div className="flex items-center justify-between mt-1 px-0.5">
        <div className="flex items-center gap-1">
          {TASK_COLOR_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              title={TASK_COLORS[key].label}
              onClick={() => setColor(key)}
              className={`w-4 h-4 rounded-full transition-transform ${TASK_COLORS[key].dot} ${
                color === key ? 'ring-2 ring-offset-1 ring-gray-400 scale-110' : 'hover:scale-110'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={onCancel} className="p-0.5 text-gray-400 hover:text-gray-600">
            <X className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={submit} className="text-[11px] font-semibold text-royal-600 hover:text-royal-700">
            Uložiť
          </button>
        </div>
      </div>
    </div>
  );
}

function DayCell({ dayISO, hour, isToday, tasks, quickAdd, nowPct, onCellClick, onQuickSubmit, onQuickCancel, onToggleTask, onOpenTask }) {
  const isEmpty = tasks.length === 0 && !quickAdd;

  return (
    <div
      onClick={() => onCellClick(dayISO, hour)}
      className={`group/cell relative min-h-[64px] border-r border-gray-300 last:border-r-0 p-1.5 space-y-1 cursor-pointer transition-colors ${
        isToday ? 'bg-royal-50/40' : ''
      } hover:bg-royal-50/60`}
    >
      {tasks.map(task => (
        <TaskChip key={task.id} task={task} onToggle={onToggleTask} onOpen={onOpenTask} />
      ))}
      {quickAdd && <QuickAdd onSubmit={(v) => onQuickSubmit(dayISO, hour, v)} onCancel={onQuickCancel} />}
      {isEmpty && (
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cell:opacity-100 transition-opacity pointer-events-none">
          <Plus className="w-4 h-4 text-royal-400" />
        </span>
      )}
      {nowPct != null && (
        <div className="absolute left-0 right-0 pointer-events-none z-10" style={{ top: `${nowPct}%` }}>
          <div className="h-px bg-royal-500" />
          <div className="w-1.5 h-1.5 -mt-[3px] rounded-full bg-royal-500" />
        </div>
      )}
    </div>
  );
}

export default function CalendarView() {
  const navigate = useNavigate();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [showWeekend, setShowWeekend] = useState(false);
  const [quickAdd, setQuickAdd] = useState(null);   // { dayISO, hour }
  const [modalTask, setModalTask] = useState(null);
  const [now, setNow] = useState(() => new Date());

  // Refresh the current-time indicator once a minute.
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const weekDays = useMemo(() => buildWeekDays(weekStart, showWeekend ? 7 : 5), [weekStart, showWeekend]);
  const rangeFrom = toISO(weekDays[0]);
  const rangeTo = toISO(weekDays[weekDays.length - 1]);
  const todayISO = toISO(now);

  const { data: deals, loading: dealsLoading } = useSupabaseQuery(
    () => supabase
      .from('reservations')
      .select('*, clients(company_name), contracts(contract_number)')
      .neq('status', 'cancelled')
      .lte('date_from', rangeTo)
      .gte('date_to', rangeFrom)
      .order('date_from'),
    [rangeFrom, rangeTo]
  );

  const { tasks, loading: tasksLoading, error, clearError, createTask, updateTask, deleteTask } = useCalendarTasks(rangeFrom, rangeTo);

  // Week navigation (arrow keys work when no input is focused).
  const goPrev = () => setWeekStart(w => addDays(w, -7));
  const goNext = () => setWeekStart(w => addDays(w, 7));
  const goToday = () => setWeekStart(startOfWeek(new Date()));

  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowLeft') setWeekStart(w => addDays(w, -7));
      if (e.key === 'ArrowRight') setWeekStart(w => addDays(w, 7));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // tasks grouped by "YYYY-MM-DD|hour"
  const tasksBySlot = useMemo(() => {
    const map = {};
    for (const t of tasks) {
      const key = `${t.task_date}|${clampHour(t.start_hour)}`;
      (map[key] ||= []).push(t);
    }
    return map;
  }, [tasks]);

  const { bars, rowCount } = useMemo(
    () => layoutRentalBars(deals || [], weekDays),
    [deals, weekDays]
  );

  const dayEvents = useMemo(() => {
    const map = {};
    for (const d of weekDays) map[toISO(d)] = { pickups: 0, returns: 0 };
    for (const deal of deals || []) {
      if (map[deal.date_from]) map[deal.date_from].pickups++;
      if (map[deal.date_to]) map[deal.date_to].returns++;
    }
    return map;
  }, [deals, weekDays]);

  const gridCols = { gridTemplateColumns: `72px repeat(${weekDays.length}, minmax(160px, 1fr))` };
  const dayCols = { gridTemplateColumns: `repeat(${weekDays.length}, minmax(0, 1fr))` };

  const handleQuickSubmit = async (dayISO, hour, { title, color }) => {
    setQuickAdd(null);
    await createTask({ task_date: dayISO, start_hour: hour, title, color });
  };

  const handleSaveModal = async (values) => {
    if (modalTask?.id) await updateTask(modalTask.id, values);
    else await createTask(values);
  };

  const openNewTask = () => {
    const inWeek = todayISO >= rangeFrom && todayISO <= rangeTo;
    setModalTask({
      task_date: inWeek ? todayISO : rangeFrom,
      start_hour: clampHour(inWeek ? now.getHours() : FIRST_HOUR),
      color: 'neutral',
    });
  };

  const loading = dealsLoading || tasksLoading;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kalendár</h1>
          <p className="text-sm text-gray-500 mt-0.5">{formatWeekRange(weekDays[0], weekDays[weekDays.length - 1])}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-card">
            <button onClick={goPrev} title="Predchádzajúci týždeň" className="p-2 hover:bg-royal-50 hover:text-royal-600 rounded-l-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={goToday} className="px-3 py-1.5 text-sm font-medium border-x border-gray-200 hover:bg-royal-50 hover:text-royal-600 transition-colors">
              Dnes
            </button>
            <button onClick={goNext} title="Nasledujúci týždeň" className="p-2 hover:bg-royal-50 hover:text-royal-600 rounded-r-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={() => setShowWeekend(v => !v)}
            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
              showWeekend ? 'bg-royal-50 border-royal-200 text-royal-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {showWeekend ? 'Po–Ne' : 'Po–Pi'}
          </button>
          <button
            onClick={openNewTask}
            className="flex items-center gap-2 bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-glow hover:shadow-glow-md transition-all btn-press"
          >
            <Plus className="w-4 h-4" />
            Nová úloha
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center justify-between gap-3 mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={clearError} className="p-1 hover:bg-red-100 rounded"><X className="w-4 h-4" /></button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Day headers */}
            <div className="grid bg-gray-50 border-b border-gray-200" style={gridCols}>
              <div className="border-r border-gray-200" />
              {weekDays.map((day, idx) => {
                const iso = toISO(day);
                const isToday = iso === todayISO;
                const ev = dayEvents[iso] || { pickups: 0, returns: 0 };
                return (
                  <div key={iso} className={`px-2 py-2.5 text-center border-r border-gray-300 last:border-r-0 ${isToday ? 'bg-royal-50/60' : ''}`}>
                    <p className={`text-[13px] font-bold uppercase tracking-wide ${isToday ? 'text-royal-600' : 'text-gray-500'}`}>{DAY_NAMES[idx]}</p>
                    <p className="mt-0.5">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-base font-semibold ${
                        isToday ? 'bg-royal-500 text-white shadow-glow' : 'text-gray-800'
                      }`}>
                        {day.getDate()}
                      </span>
                    </p>
                    {(ev.pickups > 0 || ev.returns > 0) && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {ev.pickups > 0 && (
                          <span title="Začiatok prenájmu" className="inline-flex items-center gap-0.5 text-[11px] font-medium text-green-700 bg-green-50 px-1.5 py-0.5 rounded-full">
                            <ArrowUpRight className="w-3 h-3" />{ev.pickups}
                          </span>
                        )}
                        {ev.returns > 0 && (
                          <span title="Koniec prenájmu" className="inline-flex items-center gap-0.5 text-[11px] font-medium text-orange-700 bg-orange-50 px-1.5 py-0.5 rounded-full">
                            <ArrowDownLeft className="w-3 h-3" />{ev.returns}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Hour grid */}
            {loading && tasks.length === 0 ? (
              <div className="flex justify-center py-20"><Spinner /></div>
            ) : (
              HOURS.map((hour) => (
                <div key={hour} className="grid border-b border-gray-200 last:border-b-0" style={gridCols}>
                  <div className="px-2 py-2 border-r border-gray-200 bg-gray-50/60 text-right text-[13px] font-medium text-gray-500 tabular-nums">
                    {formatHour(hour)}
                  </div>
                  {weekDays.map((day) => {
                    const iso = toISO(day);
                    const isToday = iso === todayISO;
                    const showNow = isToday && now.getHours() === hour && hour >= FIRST_HOUR && hour <= LAST_HOUR;
                    return (
                      <DayCell
                        key={iso + hour}
                        dayISO={iso}
                        hour={hour}
                        isToday={isToday}
                        tasks={tasksBySlot[`${iso}|${hour}`] || []}
                        quickAdd={quickAdd?.dayISO === iso && quickAdd?.hour === hour}
                        nowPct={showNow ? (now.getMinutes() / 60) * 100 : null}
                        onCellClick={(d, h) => setQuickAdd({ dayISO: d, hour: h })}
                        onQuickSubmit={handleQuickSubmit}
                        onQuickCancel={() => setQuickAdd(null)}
                        onToggleTask={(t) => updateTask(t.id, { done: !t.done })}
                        onOpenTask={(t) => setModalTask(t)}
                      />
                    );
                  })}
                </div>
              ))
            )}

            {/* Rentals lane -- sits under the hour grid, the heavy top rule closes it off */}
            <div className="grid border-t-2 border-gray-400 bg-gray-50" style={gridCols}>
              <div className="px-2 py-2 border-r border-gray-200 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Prenájmy
              </div>
              <div style={{ gridColumn: `2 / span ${weekDays.length}` }} className="relative py-2">
                {/* Column rules so the days stay readable behind the rental bars */}
                <div className="absolute inset-0 grid pointer-events-none" style={dayCols} aria-hidden="true">
                  {weekDays.map((day) => (
                    <div key={toISO(day)} className="border-r border-gray-300 last:border-r-0" />
                  ))}
                </div>
                {dealsLoading ? (
                  <p className="relative text-sm text-gray-400 px-2">Načítavam…</p>
                ) : bars.length === 0 ? (
                  <p className="relative text-sm text-gray-400 px-2 py-0.5">Žiadne prenájmy v tomto týždni</p>
                ) : (
                  <div
                    className="relative grid gap-y-1"
                    style={{ ...dayCols, gridTemplateRows: `repeat(${rowCount}, auto)` }}
                  >
                    {bars.map(({ deal, startIdx, endIdx, row, startsBefore, endsAfter }) => {
                      const colors = getStatusColors(deal.status);
                      return (
                        <button
                          key={deal.id}
                          onClick={() => navigate(`/deals/${deal.id}`)}
                          title={`${dealContractNumber(deal)} · ${deal.clients?.company_name || '—'} · ${deal.date_from} – ${deal.date_to}`}
                          style={{ gridColumn: `${startIdx + 1} / ${endIdx + 2}`, gridRow: row + 1 }}
                          className={`mx-0.5 flex items-center gap-1 px-2 py-1.5 text-[13px] font-medium truncate hover:opacity-80 transition-opacity ${colors.bg} ${colors.text} ${
                            startsBefore ? 'rounded-l-none' : 'rounded-l-md'
                          } ${endsAfter ? 'rounded-r-none' : 'rounded-r-md'}`}
                        >
                          {startsBefore && <span className="opacity-60">«</span>}
                          <span className="truncate">{deal.clients?.company_name || dealContractNumber(deal)}</span>
                          {endsAfter && <span className="ml-auto opacity-60">»</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Prenájmy</span>
          {Object.entries(RESERVATION_STATUSES)
            .filter(([key]) => key !== 'cancelled' && key !== 'paid')
            .map(([key, val]) => {
              const colors = getStatusColors(key);
              return (
                <div key={key} className="flex items-center gap-1.5 text-sm">
                  <div className={`w-3 h-3 rounded ${colors.bg}`} />
                  <span className="text-gray-600">{val.label}</span>
                </div>
              );
            })}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Úlohy</span>
          {TASK_COLOR_KEYS.map((key) => (
            <div key={key} className="flex items-center gap-1.5 text-sm">
              <div className={`w-3 h-3 rounded-full ${TASK_COLORS[key].dot}`} />
              <span className="text-gray-600">{TASK_COLORS[key].label}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-2">
        Klik do bunky = rýchly zápis úlohy · klik na úlohu = úprava · šípky ←/→ prepínajú týždne
      </p>

      {modalTask && (
        <TaskModal
          key={modalTask.id || 'new'}
          task={modalTask}
          onClose={() => setModalTask(null)}
          onSave={handleSaveModal}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
}
