import { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2, Image, Upload, Loader2 } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import useSupabaseQuery from '../../hooks/useSupabaseQuery';
import { supabase } from '../../lib/supabase';
import { VAT_RATE } from '../../lib/constants';

const EMPTY_FORM = {
  name: '',
  slug: '',
  description: '',
  category_id: '',
  subcategory_id: '',
  image_path: '',
  daily_rate_base: '',
  pricing_type: 'fixed',
  ownership_type: 'owned',
  total_units: 1,
  in_stock: true,
  is_new: false,
  is_popular: false,
  blog_article_slug: '',
  status: 'active',
  features: [],
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Upload image to Supabase Storage
async function uploadImage(file, slug, categorySlug, subcategorySlug) {
  const ext = file.name.split('.').pop().toLowerCase();
  const fileName = `${slug}.${ext}`;
  const folderPath = [categorySlug, subcategorySlug].filter(Boolean).join('/');
  const storagePath = folderPath ? `${folderPath}/${fileName}` : fileName;

  const { error } = await supabase.storage
    .from('equipment-images')
    .upload(storagePath, file, { upsert: true, contentType: file.type });

  if (error) throw new Error(`Upload zlyhal: ${error.message}`);

  const { data: urlData } = supabase.storage
    .from('equipment-images')
    .getPublicUrl(storagePath);

  return urlData.publicUrl;
}

export default function EquipmentForm({ open, onClose, onSave, item }) {
  const isEdit = !!item;
  const [form, setForm] = useState(EMPTY_FORM);
  const [newFeature, setNewFeature] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const { data: categories } = useSupabaseQuery(
    () => supabase.from('equipment_categories').select('id, name, slug').order('sort_order'),
    []
  );

  const { data: allSubcategories } = useSupabaseQuery(
    () => supabase.from('equipment_subcategories').select('id, name, slug, category_id').order('sort_order'),
    []
  );

  const subcategories = (allSubcategories || []).filter(
    (s) => s.category_id === form.category_id
  );

  useEffect(() => {
    if (open && item) {
      setForm({
        name: item.name || '',
        slug: item.slug || '',
        description: item.description || '',
        category_id: item.category_id || '',
        subcategory_id: item.subcategory_id || '',
        image_path: item.image_path || '',
        daily_rate_base: item.daily_rate_base ?? '',
        pricing_type: item.pricing_type || 'fixed',
        ownership_type: item.ownership_type || 'owned',
        total_units: item.total_units ?? 1,
        in_stock: item.in_stock ?? true,
        is_new: item.is_new ?? false,
        is_popular: item.is_popular ?? false,
        blog_article_slug: item.blog_article_slug || '',
        status: item.status || 'active',
        features: Array.isArray(item.features) ? [...item.features] : [],
      });
    } else if (open) {
      setForm(EMPTY_FORM);
    }
    setError(null);
    setNewFeature('');
    setImageFile(null);
    setImagePreview(null);
  }, [open, item]);

  const update = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // Auto-generate slug from name (only on new items or if slug matches old auto-slug)
      if (key === 'name' && !isEdit) {
        next.slug = slugify(value);
      }
      // Reset subcategory when category changes
      if (key === 'category_id') {
        next.subcategory_id = '';
      }
      return next;
    });
  };

  const addFeature = () => {
    const trimmed = newFeature.trim();
    if (!trimmed) return;
    setForm((prev) => ({ ...prev, features: [...prev.features, trimmed] }));
    setNewFeature('');
  };

  const removeFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!form.name.trim()) return setError('Názov je povinný');
    if (!form.slug.trim()) return setError('Slug je povinný');
    if (!form.category_id) return setError('Kategória je povinná');

    const baseRate = parseFloat(form.daily_rate_base) || 0;
    const vatRate = baseRate * (1 + VAT_RATE);

    // Upload image if a new file was selected
    let imagePath = form.image_path.trim() || null;
    if (imageFile) {
      setUploading(true);
      try {
        const catSlug = (categories || []).find(c => c.id === form.category_id)?.slug || 'uncategorized';
        const subcatSlug = (allSubcategories || []).find(s => s.id === form.subcategory_id)?.slug || '';
        imagePath = await uploadImage(imageFile, form.slug.trim(), catSlug, subcatSlug);
      } catch (err) {
        setError(err.message);
        setSaving(false);
        setUploading(false);
        return;
      }
      setUploading(false);
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      description: form.description.trim(),
      category_id: form.category_id,
      subcategory_id: form.subcategory_id || null,
      image_path: imagePath,
      daily_rate_base: baseRate,
      daily_rate_vat: Math.round(vatRate * 100) / 100,
      pricing_type: form.pricing_type,
      ownership_type: form.ownership_type,
      total_units: parseInt(form.total_units, 10) || 1,
      in_stock: form.in_stock,
      is_new: form.is_new,
      is_popular: form.is_popular,
      blog_article_slug: form.blog_article_slug.trim() || null,
      status: form.status,
      features: form.features,
    };

    setSaving(true);
    try {
      if (isEdit) {
        const { error: err } = await supabase
          .from('equipment')
          .update(payload)
          .eq('id', item.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase
          .from('equipment')
          .insert(payload);
        if (err) throw err;
      }
      onSave?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Chyba pri ukladaní');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 outline-none input-glow';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1';

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Upraviť zariadenie' : 'Nové zariadenie'}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {/* Name + Slug */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Názov *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClass}
              placeholder="Makita HR2470"
            />
          </div>
          <div>
            <label className={labelClass}>Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => update('slug', e.target.value)}
              className={inputClass}
              placeholder="makita-hr2470"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={labelClass}>Popis</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            className={inputClass}
            placeholder="Vŕtacie kladivo 2,9 kg - SDS-Plus"
          />
        </div>

        {/* Category + Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Kategória *</label>
            <select
              value={form.category_id}
              onChange={(e) => update('category_id', e.target.value)}
              className={inputClass}
            >
              <option value="">Vybrať kategóriu</option>
              {(categories || []).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Podkategória</label>
            <select
              value={form.subcategory_id}
              onChange={(e) => update('subcategory_id', e.target.value)}
              className={inputClass}
              disabled={!form.category_id}
            >
              <option value="">Vybrať podkategóriu</option>
              {subcategories.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Cena bez DPH (€/deň)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={form.daily_rate_base}
              onChange={(e) => update('daily_rate_base', e.target.value)}
              className={inputClass}
              placeholder="20.00"
              disabled={form.pricing_type === 'negotiable'}
            />
            {form.pricing_type === 'fixed' && form.daily_rate_base && (
              <p className="text-xs text-gray-400 mt-1">
                S DPH: {(parseFloat(form.daily_rate_base) * (1 + VAT_RATE)).toFixed(2)} €
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>Typ ceny</label>
            <select
              value={form.pricing_type}
              onChange={(e) => update('pricing_type', e.target.value)}
              className={inputClass}
            >
              <option value="fixed">Pevná cena</option>
              <option value="negotiable">Na požiadanie</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Vlastníctvo</label>
            <select
              value={form.ownership_type}
              onChange={(e) => update('ownership_type', e.target.value)}
              className={inputClass}
            >
              <option value="owned">Vlastné</option>
              <option value="partner">Partnerské</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <Image className="w-4 h-4" />
              Obrázok zariadenia
            </span>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept=".webp,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }}
          />
          <div className="flex items-start gap-4">
            {/* Preview */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-28 h-28 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-royal-400 hover:bg-royal-50/30 transition-colors overflow-hidden flex-shrink-0"
            >
              {imagePreview || form.image_path ? (
                <img
                  src={imagePreview || (form.image_path.startsWith('http') ? form.image_path : `https://royalstroje.sk${form.image_path}`)}
                  alt="Náhľad"
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <div className="text-center">
                  <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                  <span className="text-[10px] text-gray-400">Nahrať</span>
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                {form.image_path || imageFile ? 'Zmeniť obrázok' : 'Vybrať obrázok'}
              </button>
              {imageFile && (
                <p className="text-xs text-green-600">
                  Vybraný: {imageFile.name} ({(imageFile.size / 1024).toFixed(0)} KB)
                </p>
              )}
              {!imageFile && form.image_path && (
                <p className="text-xs text-gray-400 break-all">{form.image_path}</p>
              )}
              <p className="text-[10px] text-gray-400">WebP, PNG alebo JPG, max 5 MB</p>
            </div>
          </div>
        </div>

        {/* Features (technické parametre) */}
        <div>
          <label className={labelClass}>Technické parametre</label>
          <div className="space-y-2">
            {form.features.map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="flex-1 text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  {f}
                </span>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                className={inputClass}
                placeholder="Napr.: Príkon - 780 W"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
              >
                <Plus className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Status + Stock + Flags */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Stav</label>
            <select
              value={form.status}
              onChange={(e) => update('status', e.target.value)}
              className={inputClass}
            >
              <option value="active">Aktívne</option>
              <option value="inactive">Neaktívne</option>
              <option value="maintenance">Údržba</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Počet kusov</label>
            <input
              type="number"
              min="0"
              value={form.total_units}
              onChange={(e) => update('total_units', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Blog článok (slug)</label>
            <input
              type="text"
              value={form.blog_article_slug}
              onChange={(e) => update('blog_article_slug', e.target.value)}
              className={inputClass}
              placeholder="makita-hr2470-recenzia"
            />
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex flex-wrap gap-6">
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.in_stock}
              onChange={(e) => update('in_stock', e.target.checked)}
              className="rounded border-gray-300 text-royal-500 focus:ring-royal-500"
            />
            Na sklade
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_new}
              onChange={(e) => update('is_new', e.target.checked)}
              className="rounded border-gray-300 text-royal-500 focus:ring-royal-500"
            />
            Nové
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.is_popular}
              onChange={(e) => update('is_popular', e.target.checked)}
              className="rounded border-gray-300 text-royal-500 focus:ring-royal-500"
            />
            Populárne
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Zrušiť
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-royal-500 to-royal-400 hover:from-royal-600 hover:to-royal-500 rounded-lg shadow-glow hover:shadow-glow-md transition-all btn-press disabled:opacity-50 flex items-center gap-2"
          >
            {(saving || uploading) && <Loader2 className="w-4 h-4 animate-spin" />}
            {uploading ? 'Nahrávam obrázok...' : saving ? 'Ukladám...' : isEdit ? 'Uložiť zmeny' : 'Pridať zariadenie'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
