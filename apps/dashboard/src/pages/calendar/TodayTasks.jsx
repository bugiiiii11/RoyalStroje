import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import useCalendarTasks from '../../hooks/useCalendarTasks';
import { toISO, formatHour, clampHour, getTaskColors } from '../../lib/calendar';

// Compact list of today's dispatcher tasks for the dashboard.
export default function TodayTasks() {
  const today = toISO(new Date());
  const { tasks, loading, updateTask } = useCalendarTasks(today, today);

  const open = tasks.filter(t => !t.done).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">
          Dnešné úlohy
          {open > 0 && (
            <span className="ml-2 text-xs font-medium text-royal-700 bg-royal-50 px-2 py-0.5 rounded-full">
              {open} otvorené
            </span>
          )}
        </h3>
        <Link to="/calendar" className="flex items-center gap-1 text-xs font-medium text-royal-600 hover:text-royal-700">
          Kalendár
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-400">Načítavam…</p>
      ) : tasks.length === 0 ? (
        <p className="text-sm text-gray-400">Na dnes nemáš zapísané žiadne úlohy</p>
      ) : (
        <div className="space-y-1.5">
          {tasks.map((task) => {
            const colors = getTaskColors(task.color);
            return (
              <div
                key={task.id}
                className={`flex items-start gap-2.5 rounded-lg border-l-[3px] pl-2.5 pr-2 py-1.5 ${colors.chip} ${task.done ? 'opacity-55' : ''}`}
              >
                <button
                  onClick={() => updateTask(task.id, { done: !task.done })}
                  title={task.done ? 'Označiť ako neukončené' : 'Označiť ako ukončené'}
                  className={`mt-0.5 w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-colors ${
                    task.done ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white hover:border-green-500'
                  }`}
                >
                  {task.done && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                </button>
                <span className="text-xs font-medium text-gray-500 tabular-nums mt-px w-10 shrink-0">
                  {formatHour(clampHour(task.start_hour))}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm leading-snug ${colors.text} ${task.done ? 'line-through' : ''}`}>{task.title}</p>
                  {task.note && <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{task.note}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
