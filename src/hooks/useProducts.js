import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { products as staticProducts } from '../data/products';

// Map Supabase equipment row to website product format
function mapEquipmentToProduct(item) {
  const catSlug = item.equipment_categories?.slug || '';
  const subcatSlug = item.equipment_subcategories?.slug || '';
  const pricePerDay = item.daily_rate_base || 0;
  const isNeg = item.pricing_type === 'negotiable';

  let priceStr;
  if (isNeg || pricePerDay === 0) priceStr = 'NA požiadanie';
  else priceStr = (Math.round(pricePerDay * 1.23 * 100) / 100) + '€/deň';

  // Handle both Supabase Storage URLs (new uploads) and legacy /pictures/ paths
  const image = item.image_path
    ? (item.image_path.startsWith('http') ? item.image_path : item.image_path)
    : '';

  return {
    id: item.slug,
    name: item.name,
    category: catSlug,
    subcategory: subcatSlug,
    image,
    price: priceStr,
    pricePerDay: isNeg ? 0 : pricePerDay,
    description: item.description || item.name,
    features: Array.isArray(item.features) ? item.features : [],
    inStock: item.in_stock ?? true,
    isNew: item.is_new ?? false,
    isPopular: item.is_popular ?? false,
    blogArticleSlug: item.blog_article_slug || undefined,
  };
}

// Shared cache so multiple components don't re-fetch
let cachedProducts = null;
let fetchPromise = null;

async function fetchProducts() {
  if (cachedProducts) return cachedProducts;
  if (fetchPromise) return fetchPromise;

  fetchPromise = (async () => {
    if (!supabase) return staticProducts;

    const { data, error } = await supabase
      .from('equipment')
      .select('*, equipment_categories(name, slug), equipment_subcategories(name, slug)')
      .eq('status', 'active')
      .order('name');

    if (error || !data) {
      console.warn('Supabase fetch failed, using static products:', error?.message);
      return staticProducts;
    }

    cachedProducts = data.map(mapEquipmentToProduct);
    return cachedProducts;
  })();

  const result = await fetchPromise;
  fetchPromise = null;
  return result;
}

export default function useProducts() {
  const [products, setProducts] = useState(staticProducts); // SSR-safe: start with static
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return { products, loading };
}

// Helper functions that work with any products array
export function getProductsByCategory(products, categoryId) {
  return products.filter(p => p.category === categoryId);
}

export function getProductsBySubcategory(products, categoryId, subcategoryId) {
  if (subcategoryId === 'all') return getProductsByCategory(products, categoryId);
  return products.filter(p => p.category === categoryId && p.subcategory === subcategoryId);
}
