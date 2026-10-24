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
          reference: orderPayload.reference || orderPayload.id,
          client_name: orderPayload.client_name || orderPayload.customer?.name || 'Client',
          email: orderPayload.email || orderPayload.customer?.email,
          phone: orderPayload.phone || orderPayload.customer?.phone || null,
          shipping_address: orderPayload.shipping_address || orderPayload.shipping || {},
          cart_items: orderPayload.cart_items || orderPayload.items || [],
          subtotal: Number(orderPayload.subtotal || orderPayload.pricing?.subtotal || 0),
          shipping_fee: Number(orderPayload.shipping_fee || orderPayload.pricing?.shipping || 0),
          total_amount: Number(orderPayload.total_amount || orderPayload.pricing?.total || 0),
          currency: orderPayload.currency || 'GBP',
          payment_method: orderPayload.payment_method || 'card',
          payment_status: orderPayload.payment_status || 'paid',
          stripe_payment_intent_id: orderPayload.stripe_payment_intent_id || null,
          fulfillment_status: orderPayload.fulfillment_status || 'Confirmed',
          tracking_number: orderPayload.tracking_number || null,
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
