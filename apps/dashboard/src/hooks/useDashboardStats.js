import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function useDashboardStats() {
  const [stats, setStats] = useState({
    activeRentals: 0, monthRevenue: 0, totalClients: 0,
    todayEvents: 0, overdueInvoices: 0, totalEquipment: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      const monthStart = today.slice(0, 7) + '-01';

      const [activeRes, revenueRes, clientsRes, todayRes, overdueRes, equipRes] = await Promise.all([
        supabase.from('reservations').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('reservations').select('total').in('status', ['completed', 'invoiced', 'paid']).gte('created_at', monthStart),
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase.from('reservations').select('id', { count: 'exact', head: true }).or(`date_from.eq.${today},date_to.eq.${today}`),
        supabase.from('invoices').select('id', { count: 'exact', head: true }).in('status', ['draft', 'sent']).lt('due_date', today),
        supabase.from('equipment').select('id', { count: 'exact', head: true }).eq('status', 'active'),
      ]);

      const revenue = (revenueRes.data || []).reduce((sum, r) => sum + (parseFloat(r.total) || 0), 0);

      setStats({
        activeRentals: activeRes.count || 0,
        monthRevenue: revenue,
        totalClients: clientsRes.count || 0,
        todayEvents: todayRes.count || 0,
        overdueInvoices: overdueRes.count || 0,
        totalEquipment: equipRes.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return { stats, loading };
}
