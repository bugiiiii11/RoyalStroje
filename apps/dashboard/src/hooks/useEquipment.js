import { useMemo } from 'react';
import useSupabaseQuery from './useSupabaseQuery';
import { supabase } from '../lib/supabase';

const removeDiacritics = (str) => (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export default function useEquipment(filters = {}) {
  const { search, categoryId, subcategoryId, status, inStock, page = 1, pageSize = 20, sortBy = 'name', sortAsc = true } = filters;
  const hasSearch = !!(search && search.trim());

  const query = useSupabaseQuery(async () => {
    let q = supabase
      .from('equipment')
      .select('*, equipment_categories(name, slug), equipment_subcategories(name, slug)', { count: 'exact' })
      .order(sortBy, { ascending: sortAsc });

    if (categoryId) q = q.eq('category_id', categoryId);
    if (subcategoryId) q = q.eq('subcategory_id', subcategoryId);
    if (status) q = q.eq('status', status);
    if (inStock !== undefined && inStock !== null) q = q.eq('in_stock', inStock);

    // When search is active, fetch all matches (up to 500) and filter client-side
    // so the match is diacritic-insensitive and covers name + description.
    if (hasSearch) {
      q = q.range(0, 499);
    } else {
      q = q.range((page - 1) * pageSize, page * pageSize - 1);
    }

    return q;
  }, [hasSearch, categoryId, subcategoryId, status, inStock, page, pageSize, sortBy, sortAsc]);

  const filtered = useMemo(() => {
    if (!hasSearch || !query.data) return query.data;
    const needle = removeDiacritics(search.toLowerCase()).trim();
    return query.data.filter((item) => {
      const name = removeDiacritics((item.name || '').toLowerCase());
      const description = removeDiacritics((item.description || '').toLowerCase());
      return name.includes(needle) || description.includes(needle);
    });
  }, [hasSearch, search, query.data]);

  const effectiveCount = hasSearch ? (filtered?.length ?? 0) : query.count;
  const totalPages = hasSearch
    ? 1
    : (query.count != null ? Math.ceil(query.count / pageSize) : 0);

  return { ...query, data: filtered, count: effectiveCount, totalPages };
}

// Toggle a serial number's rented status on the equipment record
export async function toggleSerialRented(equipmentId, serialNumber, currentlyRented, currentRentedSerials) {
  const rented = Array.isArray(currentRentedSerials) ? [...currentRentedSerials] : [];
  let updated;
  if (currentlyRented) {
    // Remove from rented
    updated = rented.filter((sn) => sn !== serialNumber);
  } else {
    // Add to rented
    if (!rented.includes(serialNumber)) rented.push(serialNumber);
    updated = rented;
  }
  const { error } = await supabase
    .from('equipment')
    .update({ rented_serials: updated })
    .eq('id', equipmentId);
  if (error) throw error;
}

// --- Mutation helpers (standalone, call refetch after) ---

export async function deleteEquipment(id) {
  const { error } = await supabase.from('equipment').delete().eq('id', id);
  if (error) throw error;
}

export async function toggleEquipmentStock(id, currentInStock) {
  const { error } = await supabase
    .from('equipment')
    .update({ in_stock: !currentInStock })
    .eq('id', id);
  if (error) throw error;
}

export async function updateEquipmentStatus(id, status) {
  const { error } = await supabase
    .from('equipment')
    .update({ status })
    .eq('id', id);
  if (error) throw error;
}

// Export all equipment as CSV (for syncing with website)
export async function exportEquipmentCsv() {
  const { data, error } = await supabase
    .from('equipment')
    .select('*, equipment_categories(name, slug), equipment_subcategories(name, slug)')
    .eq('status', 'active')
    .order('name');

  if (error) throw error;

  const header =
    'Nazov produktu,typ produktu,Nazov obrazka,popis 1,parameter 1,popis 2,parameter 2,popis 3,parameter 3,Kategoria,Podkategoria,Cena bez dph,Cena s dph,nazov obrazka';

  const rows = (data || []).map((item) => {
    const features = Array.isArray(item.features) ? item.features : [];
    // Parse features into label-value pairs (format: "Label - Value" or "Label")
    const parsed = features.slice(0, 3).map((f) => {
      const sep = f.indexOf(' - ');
      if (sep > -1) return [f.slice(0, sep).trim(), f.slice(sep + 3).trim()];
      return [f, ''];
    });
    while (parsed.length < 3) parsed.push(['', '']);

    const csvVal = (v) => {
      const s = String(v ?? '');
      return s.includes(',') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
    };

    return [
      csvVal(item.description || item.name),
      csvVal(item.name),
      csvVal(item.image_path ? item.image_path.split('/').pop() : ''),
      csvVal(parsed[0][0]),
      csvVal(parsed[0][1]),
      csvVal(parsed[1][0]),
      csvVal(parsed[1][1]),
      csvVal(parsed[2][0]),
      csvVal(parsed[2][1]),
      csvVal(item.equipment_categories?.name || ''),
      csvVal(item.equipment_subcategories?.name || ''),
      csvVal(item.daily_rate_base),
      csvVal(item.daily_rate_vat),
      csvVal(item.image_path ? item.image_path.split('/').pop() : ''),
    ].join(',');
  });

  const csv = [header, ...rows].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `katalog-royal-stroje-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
