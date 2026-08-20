import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    activeRentals: 0, monthRevenue: 0, totalClients: 0,
    todayEvents: 0, overdueInvoices: 0, totalEquipment: 0,
    paidContracts: 0, paidTotal: 0, unpaidContracts: 0, unpaidTotal: 0,
    tasksDone: 0, tasksTotal: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    const today = new Date().toISOString().split('T')[0];
    const monthStart = today.slice(0, 7) + '-01';

    const [activeRes, revenueRes, clientsRes, todayRes, overdueRes, equipRes, contractsRes, tasksRes] = await Promise.all([
      supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'inquiry'),
      supabase.from('reservations').select('total, vat_amount').in('status', ['completed', 'invoiced', 'paid']).gte('created_at', monthStart),
      supabase.from('clients').select('id', { count: 'exact', head: true }),
      supabase.from('reservations').select('id', { count: 'exact', head: true }).or(`date_from.eq.${today},date_to.eq.${today}`),
      supabase.from('invoices').select('id', { count: 'exact', head: true }).in('status', ['draft', 'sent']).lt('due_date', today),
      supabase.from('equipment').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      // Payment status of finálne zmluvy — one round-trip, split client-side
      supabase.from('contracts').select('final_total, paid_at').eq('type', 'finalna'),
      supabase.from('calendar_tasks').select('done').eq('task_date', today),
    ]);

    const revenue = (revenueRes.data || []).reduce(
      (sum, r) => sum + ((parseFloat(r.total) || 0) - (parseFloat(r.vat_amount) || 0)),
      0,
    );

    const payments = (contractsRes.data || []).reduce((acc, c) => {
      const amount = parseFloat(c.final_total) || 0;
      if (c.paid_at) {
        acc.paidContracts += 1;
        acc.paidTotal += amount;
      } else {
        acc.unpaidContracts += 1;
        acc.unpaidTotal += amount;
      }
      return acc;
    }, { paidContracts: 0, paidTotal: 0, unpaidContracts: 0, unpaidTotal: 0 });

    const taskRows = tasksRes.data || [];

    setStats({
      activeRentals: activeRes.count || 0,
      monthRevenue: revenue,
      totalClients: clientsRes.count || 0,
      todayEvents: todayRes.count || 0,
      overdueInvoices: overdueRes.count || 0,
      totalEquipment: equipRes.count || 0,
      tasksDone: taskRows.filter((t) => t.done).length,
      tasksTotal: taskRows.length,
      ...payments,
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStats();
    // Task mutations announce themselves (see useCalendarTasks) so the sidebar
    // counter stays live without a reload. Refreshes are silent — loading only
    // guards the first paint.
    window.addEventListener('rs:stats-refresh', fetchStats);
    return () => window.removeEventListener('rs:stats-refresh', fetchStats);
  }, [fetchStats]);

  return { stats, loading };
}
