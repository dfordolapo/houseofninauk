import { useEffect, useState } from 'react';
import { FEATURED_PRODUCTS } from '../data/wigData';
import { fetchProductsFromDb } from './supabase';

export const INVENTORY_STORAGE_KEY = 'house_of_nina_admin_inventory_v3';
const DELETED_PRODUCTS_STORAGE_KEY = 'house_of_nina_admin_deleted_products_v3';
const CATALOG_EVENT = 'house_of_nina_catalog_updated';

const CATEGORY_MAP = {
  'Ready-to-Wear Wigs': 'Wigs',
  'Silk Styling Care': 'Scarves',
  'HD Swiss Lace Frontals': 'Accessories',
  'Lace Closures': 'Accessories'
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80&fm=webp';

function normalizeCategory(category) {
  return CATEGORY_MAP[category] || category || 'Wigs';
}

function isLegacyPlaceholderImage(url) {
  return typeof url === 'string' && url.includes('images.unsplash.com');
}

function toPublicProduct(product, base) {
  const rawImages = product.images?.length
    ? product.images
    : (product.image ? [product.image] : (base?.images || []));
  const filteredImages = rawImages.filter(url => url && !isLegacyPlaceholderImage(url));
  const images = filteredImages.length
    ? filteredImages
    : (base?.images?.length ? base.images : (base?.image ? [base.image] : []));

  return {
    ...(base || {}),
    id: product.id,
    name: product.name,
    category: normalizeCategory(product.category || product.categoryName),
    price: Number(product.price) || 0,
    image: images[0] || base?.image || DEFAULT_IMAGE,
    images,
    description: product.description || base?.description || '',
    details: product.details || base?.details || [],
    tag: product.tag || base?.tag || '',
    options: product.options || base?.options || {},
    rating: Number(product.rating) || base?.rating || 5,
    reviewsCount: Number(product.reviewsCount) || base?.reviewsCount || 0,
    inStock: product.inStock !== false,
    stockCount: Number(product.stockCount) || 0,
    isActive: product.isActive !== false,
    reviewsList: base?.reviewsList || []
  };
}

function getDeletedProductIds() {
  try {
    const raw = localStorage.getItem(DELETED_PRODUCTS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function setDeletedProductIds(ids) {
  try {
    localStorage.setItem(DELETED_PRODUCTS_STORAGE_KEY, JSON.stringify([...ids]));
  } catch {}
}

export function markProductDeleted(id) {
  const ids = getDeletedProductIds();
  ids.add(id);
  setDeletedProductIds(ids);
}

export function restoreProduct(id) {
  const ids = getDeletedProductIds();
  ids.delete(id);
  setDeletedProductIds(ids);
}

export function buildPublicProducts(adminProducts) {
  const deleted = getDeletedProductIds();
  const byId = new Map((Array.isArray(adminProducts) ? adminProducts : []).map(p => [p.id, p]));
  const merged = FEATURED_PRODUCTS
    .filter(p => !deleted.has(p.id))
    .map(p => toPublicProduct(byId.get(p.id) || p, p));
  const added = (Array.isArray(adminProducts) ? adminProducts : [])
    .filter(p => !FEATURED_PRODUCTS.some(base => base.id === p.id) && !deleted.has(p.id))
    .map(p => toPublicProduct(p, null));

  return [...added, ...merged].filter(p => p.isActive && p.inStock);
}

export function getAdminInventory() {
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function getPublicProducts() {
  return buildPublicProducts(getAdminInventory());
}

export function subscribeToCatalog(listener) {
  window.addEventListener(CATALOG_EVENT, listener);
  window.addEventListener('storage', listener);
  return () => {
    window.removeEventListener(CATALOG_EVENT, listener);
    window.removeEventListener('storage', listener);
  };
}

export function saveAdminInventory(products) {
  try {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(products));
  } catch (err) {
    console.warn('[House of Nina] Could not save product inventory locally', err);
  }
  try {
    window.dispatchEvent(new CustomEvent(CATALOG_EVENT));
  } catch {}
}

let inFlightRefresh = null;

export async function refreshCatalogFromDb() {
  if (inFlightRefresh) return inFlightRefresh;
  inFlightRefresh = (async () => {
    try {
      const { data, error } = await fetchProductsFromDb();
      if (error || !Array.isArray(data) || data.length === 0) return getPublicProducts();

      const merged = [...(getAdminInventory() || [])];
      data.forEach(row => {
        const index = merged.findIndex(p => p.id === row.id);
        if (index >= 0) merged[index] = row;
        else merged.push(row);
      });
      saveAdminInventory(merged);
      return buildPublicProducts(merged);
    } finally {
      inFlightRefresh = null;
    }
  })();
  return inFlightRefresh;
}

export function useCatalog() {
  const [products, setProducts] = useState(getPublicProducts);

  useEffect(() => {
    const sync = () => setProducts(getPublicProducts());
    const unsubscribe = subscribeToCatalog(sync);
    refreshCatalogFromDb()
      .then(setProducts)
      .catch(() => {});
    return unsubscribe;
  }, []);

  return products;
}
