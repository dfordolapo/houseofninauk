import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-ref')
);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: true },
      realtime: { params: { eventsPerSecond: 10 } }
    })
  : null;

// ============================================================================
// ORDERS API
// ============================================================================

/**
 * Persists a new customer order to Supabase.
 * Falls back to localStorage if Supabase is not configured yet.
 */
export async function createOrderInDb(orderPayload) {
  if (!isSupabaseConfigured || !supabase) {
    console.info('[House of Nina] Supabase credentials not set; persisting order locally.');
    return { data: orderPayload, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          reference: orderPayload.reference || orderPayload.orderNumber || orderPayload.orderId || orderPayload.id || `HN-${Math.floor(1000 + Math.random() * 9000)}`,
          client_name: orderPayload.client_name || orderPayload.customer?.fullName || orderPayload.customer?.name || 'Valued Client',
          email: orderPayload.email || orderPayload.customer?.email || 'client@houseofnina.co.uk',
          phone: orderPayload.phone || orderPayload.customer?.phone || null,
          shipping_address: orderPayload.shipping_address || orderPayload.customer || orderPayload.shipping || {},
          cart_items: orderPayload.cart_items || orderPayload.items || [],
          subtotal: Number(orderPayload.subtotal || orderPayload.pricing?.subtotal || 0),
          shipping_fee: Number(orderPayload.shipping_fee || orderPayload.shippingCost || orderPayload.pricing?.shipping || 0),
          total_amount: Number(orderPayload.total_amount || orderPayload.total || orderPayload.pricing?.total || 0),
          currency: orderPayload.currency || 'GBP',
          payment_method: orderPayload.payment_method || orderPayload.paymentMethod || 'card',
          payment_status: orderPayload.payment_status || 'paid',
          stripe_payment_intent_id: orderPayload.stripe_payment_intent_id || null,
          fulfillment_status: orderPayload.fulfillment_status || 'Confirmed',
          tracking_number: orderPayload.tracking_number || orderPayload.trackingNumber || null,
          notes: orderPayload.notes || null
        }
      ])
      .select()
      .single();

    if (error) {
      console.warn('[House of Nina] Supabase insert failed, falling back:', error.message);
      return { data: orderPayload, error, source: 'fallback' };
    }

    return { data, error: null, source: 'supabase' };
  } catch (err) {
    console.error('[House of Nina] Order creation exception:', err);
    return { data: orderPayload, error: err, source: 'fallback' };
  }
}

/**
 * Fetches all store orders for the Admin Dashboard.
 */
export async function fetchOrdersFromDb() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: new Error('Supabase not configured'), source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    return { data, error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

/**
 * Updates order lifeline status, tracking number, or notes.
 */
export async function updateOrderInDb(referenceOrId, updates) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(referenceOrId);
    const query = supabase.from('orders').update(updates);
    const { data, error } = isUuid 
      ? await query.eq('id', referenceOrId).select().single()
      : await query.eq('reference', referenceOrId).select().single();

    return { data, error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

/**
 * Looks up an order by customer reference for the Track Order Concierge modal.
 */
export async function lookupOrderByReference(reference) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const cleanRef = reference.trim().toUpperCase();
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .ilike('reference', cleanRef)
      .maybeSingle();

    return { data, error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

// ============================================================================
// SHIPPING RATES & SETTINGS API
// ============================================================================

/**
 * Fetches live shipping rates from Supabase.
 */
export async function fetchShippingRatesFromDb() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('shipping_rates')
      .select('*')
      .order('price', { ascending: true });

    return { data, error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

/**
 * Updates a shipping rate in Supabase.
 */
export async function updateShippingRateInDb(code, updates) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('shipping_rates')
      .update(updates)
      .eq('code', code)
      .select()
      .single();

    return { data, error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

// ============================================================================
// REVIEWS (public submissions are always created as 'pending')
// ============================================================================

function toDbReview(review) {
  return {
    id: review.id,
    product_id: review.productId || null,
    product_name: review.productName || null,
    client: review.client || review.author || 'House of Nina Client',
    author: review.author || review.client || 'House of Nina Client',
    rating: Number(review.rating) || 5,
    text: review.text || '',
    date: review.date || new Date().toISOString().split('T')[0],
    status: review.status || 'pending',
    verified: Boolean(review.verified)
  };
}

function fromDbReview(row) {
  return {
    id: row.id,
    productId: row.product_id,
    productName: row.product_name,
    client: row.client,
    author: row.author || row.client,
    rating: Number(row.rating) || 5,
    text: row.text,
    date: row.date,
    status: row.status,
    verified: Boolean(row.verified),
    time: row.time || null
  };
}

export async function submitReviewInDb(review) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: { ...review, status: 'pending' }, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert([toDbReview({ ...review, status: 'pending' })])
      .select()
      .single();

    return { data: error ? null : fromDbReview(data), error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

export async function upsertReviewInDb(review) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: review, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .upsert(toDbReview(review), { onConflict: 'id' })
      .select()
      .single();

    return { data: error ? null : fromDbReview(data), error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

export async function fetchReviewsFromDb({ productId, statuses } = {}) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
    if (productId) query = query.eq('product_id', productId);
    if (statuses && statuses.length) query = query.in('status', statuses);
    const { data, error } = await query;
    return { data: error ? null : data.map(fromDbReview), error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

export async function updateReviewStatusInDb(id, status) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('reviews')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    return { data: error ? null : fromDbReview(data), error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

export async function deleteReviewInDb(id) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    return { data: null, error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

// ============================================================================
// PRODUCTS & IMAGE STORAGE
// ============================================================================

function toDbProduct(product) {
  return {
    id: product.id,
    name: product.name,
    category: product.category || product.categoryName || 'Wigs',
    price: Number(product.price) || 0,
    stock_count: Number(product.stockCount) || 0,
    in_stock: product.inStock !== false,
    image: product.image || null,
    images: product.images || (product.image ? [product.image] : []),
    description: product.description || null,
    details: product.details || [],
    tag: product.tag || null,
    options: product.options || {},
    rating: Number(product.rating) || 5,
    reviews_count: Number(product.reviewsCount) || 0,
    is_active: product.isActive !== false && product.inStock !== false
  };
}

function fromDbProduct(row) {
  return {
    id: row.id,
    name: row.name,
    categoryName: row.category,
    category: row.category,
    price: Number(row.price),
    stockCount: Number(row.stock_count),
    inStock: Boolean(row.in_stock),
    image: row.image,
    images: row.images || (row.image ? [row.image] : []),
    description: row.description || '',
    details: row.details || [],
    tag: row.tag || '',
    options: row.options || {},
    rating: Number(row.rating) || 5,
    reviewsCount: Number(row.reviews_count) || 0,
    isActive: Boolean(row.is_active)
  };
}

export async function fetchProductsFromDb() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    return { data: error ? null : data.map(fromDbProduct), error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

export async function upsertProductInDb(product) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: product, error: null, source: 'local' };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .upsert(toDbProduct(product), { onConflict: 'id' })
      .select()
      .single();

    return { data: error ? null : fromDbProduct(data), error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

export async function deleteProductInDb(id) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: null, source: 'local' };
  }

  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    return { data: null, error, source: 'supabase' };
  } catch (err) {
    return { data: null, error: err, source: 'fallback' };
  }
}

export async function uploadProductImages(files) {
  if (!isSupabaseConfigured || !supabase) {
    return { data: [], error: null, source: 'local' };
  }

  const uploaded = [];
  try {
    for (const file of files) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
      const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;
      const { error } = await supabase.storage
        .from('product-images')
        .upload(path, file, { contentType: file.type || 'image/jpeg', upsert: false });
      if (error) throw error;
      const { data: publicData } = supabase.storage.from('product-images').getPublicUrl(path);
      if (publicData?.publicUrl) uploaded.push(publicData.publicUrl);
    }
    return { data: uploaded, error: null, source: 'supabase' };
  } catch (err) {
    return { data: uploaded, error: err, source: 'fallback' };
  }
}

export function fileToOptimizedDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Unable to read image'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('Unable to decode image'));
      image.onload = () => {
        const maxDimension = 1200;
        const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const webp = canvas.toDataURL('image/webp', 0.78);
        resolve(webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', 0.78));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
