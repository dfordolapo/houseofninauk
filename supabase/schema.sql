-- ============================================================================
-- HOUSE OF NINA — SUPABASE DATABASE SCHEMA
-- Execute this entire script in your Supabase SQL Editor
-- ============================================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference TEXT UNIQUE NOT NULL,
    client_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    shipping_address JSONB NOT NULL,
    cart_items JSONB NOT NULL,
    subtotal NUMERIC(10, 2) NOT NULL,
    shipping_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'GBP',
    payment_method TEXT NOT NULL DEFAULT 'card',
    payment_status TEXT NOT NULL DEFAULT 'paid', -- 'pending', 'paid', 'failed', 'refunded'
    stripe_payment_intent_id TEXT,
    fulfillment_status TEXT NOT NULL DEFAULT 'Confirmed', -- 'Confirmed', 'Processing', 'Shipped', 'Delivered'
    tracking_number TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for instant lookup by reference (used by client Track Order modal)
CREATE INDEX IF NOT EXISTS idx_orders_reference ON public.orders (reference);
CREATE INDEX IF NOT EXISTS idx_orders_email ON public.orders (email);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

-- 2. SHIPPING RATES TABLE (Synchronized live between Admin and Checkout)
CREATE TABLE IF NOT EXISTS public.shipping_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    label TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    delivery_timeframe TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed Initial Shipping Rates matching House of Nina Policy
INSERT INTO public.shipping_rates (code, label, price, delivery_timeframe, is_active)
VALUES 
    ('standard', 'UK Standard Delivery', 5.99, '2–5 working days', true),
    ('next_day', 'UK Next Day Delivery', 12.99, '1–2 working days', true),
    ('international', 'International Delivery', 24.99, '7–10 working days', true)
ON CONFLICT (code) DO UPDATE SET
    label = EXCLUDED.label,
    price = EXCLUDED.price,
    delivery_timeframe = EXCLUDED.delivery_timeframe,
    updated_at = now();

-- 3. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.store_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default store profile settings
INSERT INTO public.store_settings (key, value)
VALUES (
    'store_profile',
    jsonb_build_object(
        'storeName', 'House of Nina UK',
        'hotline', '+44 7776 759731',
        'email', 'houseofnina2026@gmail.com',
        'studioLocation', 'London & Manchester, United Kingdom',
        'currency', 'GBP',
        'tagline', 'Welcome to our House'
    )
)
ON CONFLICT (key) DO NOTHING;

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Allow public clients to insert orders on checkout
CREATE POLICY "Allow public order placement" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

-- Allow clients to view orders by reference (for Track Order concierge) or admin dashboard
CREATE POLICY "Allow reading orders" 
    ON public.orders FOR SELECT 
    USING (true);

-- Allow updating orders (order fulfillment, status updates, stripe webhook)
CREATE POLICY "Allow updating orders" 
    ON public.orders FOR UPDATE 
    USING (true);

-- Allow public read of shipping rates
CREATE POLICY "Allow reading shipping rates" 
    ON public.shipping_rates FOR SELECT 
    USING (true);

-- Allow updating shipping rates
CREATE POLICY "Allow managing shipping rates" 
    ON public.shipping_rates FOR ALL 
    USING (true);

-- Allow public read of store settings
CREATE POLICY "Allow reading store settings" 
    ON public.store_settings FOR SELECT 
    USING (true);

-- Allow updating store settings
CREATE POLICY "Allow managing store settings" 
    ON public.store_settings FOR ALL 
    USING (true);

-- 5. AUTOMATIC UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE OR REPLACE TRIGGER trg_shipping_rates_updated_at
    BEFORE UPDATE ON public.shipping_rates
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE OR REPLACE TRIGGER trg_store_settings_updated_at
    BEFORE UPDATE ON public.store_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();
