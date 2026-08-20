import { useState, useCallback } from 'react';
import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

// Dispatcher tasks for a date range (inclusive). Mutations update local state
// optimistically so ticking a task off never flashes the whole grid.

// Other listeners (sidebar Prehľad counter) re-fetch on this signal.
const announceChange = () => window.dispatchEvent(new Event('rs:stats-refresh'));

export default function useCalendarTasks(from, to) {
  const { data, loading, error, refetch } = useSupabaseQuery(
    () => supabase
      .from('calendar_tasks')
      .select('*')
      .gte('task_date', from)
      .lte('task_date', to)
      .order('start_hour')
      .order('created_at'),
    [from, to]
  );

  const [tasks, setTasks] = useState(data || []);
  const [prevData, setPrevData] = useState(data);
  const [mutationError, setMutationError] = useState(null);

  // Re-seed the local copy whenever a fetch returns (render-phase state adjust,
  // React's recommended alternative to a syncing effect).
  if (data !== prevData) {
    setPrevData(data);
    setTasks(data || []);
  }

  const createTask = useCallback(async (payload) => {
    const { data: row, error: e } = await supabase
      .from('calendar_tasks')
      .insert(payload)
      .select()
      .single();
    if (e) { setMutationError(e.message); return null; }
    setTasks(prev => [...prev, row]);
    announceChange();
    return row;
  }, []);

  const updateTask = useCallback(async (id, patch) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...patch } : t)));
    const { data: row, error: e } = await supabase
      .from('calendar_tasks')
      .update(patch)
      .eq('id', id)
      .select()
      .single();
    if (e) { setMutationError(e.message); refetch(); return null; }
    setTasks(prev => prev.map(t => (t.id === id ? row : t)));
    announceChange();
    return row;
  }, [refetch]);

  const deleteTask = useCallback(async (id) => {
    let snapshot;
    setTasks(prev => { snapshot = prev; return prev.filter(t => t.id !== id); });
    const { error: e } = await supabase.from('calendar_tasks').delete().eq('id', id);
    if (e) { setMutationError(e.message); setTasks(snapshot); return false; }
    announceChange();
    return true;
  }, []);

  return {
    tasks,
    loading,
    error: error || mutationError,
    clearError: () => setMutationError(null),
    refetch,
    createTask,
    updateTask,
    deleteTask,
  };
}
