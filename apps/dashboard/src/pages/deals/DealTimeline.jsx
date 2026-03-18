import useSupabaseQuery from '../../hooks/useSupabaseQuery';
import { supabase } from '../../lib/supabase';
import { formatDate } from '../../lib/constants';
import { Clock } from 'lucide-react';

export default function DealTimeline({ reservationId }) {
  const { data: logs, loading } = useSupabaseQuery(
    () => supabase
      .from('activity_log')
      .select('*')
      .eq('entity_type', 'reservation')
      .eq('entity_id', reservationId)
      .order('created_at', { ascending: false })
      .limit(20),
    [reservationId]
  );

  if (loading) return <p className="text-sm text-gray-400">Načítavam...</p>;
  if (!logs || logs.length === 0) return <p className="text-sm text-gray-400">Žiadna aktivita</p>;

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div key={log.id} className="flex items-start gap-3">
          <div className="mt-0.5">
            <Clock className="w-4 h-4 text-gray-400" />
          </div>
          <div>
            <p className="text-sm text-gray-700">
              {log.action.replace('.', ' — ')}
            </p>
            {log.details && Object.keys(log.details).length > 0 && (
              <p className="text-xs text-gray-400 mt-0.5">
                {JSON.stringify(log.details)}
              </p>
            )}
            <p className="text-xs text-gray-400 mt-0.5">
              {new Date(log.created_at).toLocaleString('sk-SK')}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
