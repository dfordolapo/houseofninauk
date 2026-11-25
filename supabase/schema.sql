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
DROP POLICY IF EXISTS "Allow public order placement" ON public.orders;
CREATE POLICY "Allow public order placement" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

-- Allow clients to view orders by reference (for Track Order concierge) or admin dashboard
DROP POLICY IF EXISTS "Allow reading orders" ON public.orders;
CREATE POLICY "Allow reading orders" 
    ON public.orders FOR SELECT 
    USING (true);

-- Allow updating orders (order fulfillment, status updates, stripe webhook)
DROP POLICY IF EXISTS "Allow updating orders" ON public.orders;
CREATE POLICY "Allow updating orders" 
    ON public.orders FOR UPDATE 
    USING (true);

-- Allow public read of shipping rates
DROP POLICY IF EXISTS "Allow reading shipping rates" ON public.shipping_rates;
CREATE POLICY "Allow reading shipping rates" 
    ON public.shipping_rates FOR SELECT 
    USING (true);

-- Allow updating shipping rates
DROP POLICY IF EXISTS "Allow managing shipping rates" ON public.shipping_rates;
CREATE POLICY "Allow managing shipping rates" 
    ON public.shipping_rates FOR ALL 
    USING (true)
    WITH CHECK (true);

-- Allow public read of store settings
DROP POLICY IF EXISTS "Allow reading store settings" ON public.store_settings;
CREATE POLICY "Allow reading store settings" 
    ON public.store_settings FOR SELECT 
    USING (true);

-- Allow updating store settings
DROP POLICY IF EXISTS "Allow managing store settings" ON public.store_settings;
CREATE POLICY "Allow managing store settings" 
    ON public.store_settings FOR ALL 
    USING (true)
    WITH CHECK (true);

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

-- 6. PRODUCTS TABLE (Admin catalog, synced to the live storefront)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'Wigs',
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    stock_count INTEGER NOT NULL DEFAULT 0,
    in_stock BOOLEAN NOT NULL DEFAULT true,
    image TEXT,
    images JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT,
    details JSONB NOT NULL DEFAULT '[]'::jsonb,
    tag TEXT,
    options JSONB NOT NULL DEFAULT '{}'::jsonb,
    rating NUMERIC(3, 2) NOT NULL DEFAULT 5,
    reviews_count INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category);
CREATE INDEX IF NOT EXISTS idx_products_active ON public.products (is_active);

-- 7. REVIEWS TABLE (Public submissions land here as 'pending' for admin approval)
CREATE TABLE IF NOT EXISTS public.reviews (
    id TEXT PRIMARY KEY,
    product_id TEXT,
    product_name TEXT,
    client TEXT NOT NULL,
    author TEXT,
    rating INTEGER NOT NULL DEFAULT 5,
    text TEXT NOT NULL,
    date DATE,
    time TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'featured', 'rejected'
    verified BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product ON public.reviews (product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews (status);

-- 8. PRODUCT IMAGE STORAGE BUCKET (public read for storefront display)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow reading products" ON public.products;
CREATE POLICY "Allow reading products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow managing products" ON public.products;
CREATE POLICY "Allow managing products" ON public.products FOR ALL
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow reading reviews" ON public.reviews;
CREATE POLICY "Allow reading reviews" ON public.reviews FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Allow submitting reviews" ON public.reviews;
CREATE POLICY "Allow submitting reviews" ON public.reviews FOR INSERT
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow moderating reviews" ON public.reviews;
CREATE POLICY "Allow moderating reviews" ON public.reviews FOR UPDATE
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow deleting reviews" ON public.reviews;
CREATE POLICY "Allow deleting reviews" ON public.reviews FOR DELETE
    USING (true);

DROP POLICY IF EXISTS "Allow reading product images" ON storage.objects;
CREATE POLICY "Allow reading product images" ON storage.objects FOR SELECT
    USING (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow uploading product images" ON storage.objects;
CREATE POLICY "Allow uploading product images" ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'product-images');

DROP POLICY IF EXISTS "Allow updating product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow deleting product images" ON storage.objects;

DROP FUNCTION IF EXISTS public.is_admin();
DROP TABLE IF EXISTS public.admin_allowlist;

CREATE OR REPLACE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();

CREATE OR REPLACE TRIGGER trg_reviews_updated_at
    BEFORE UPDATE ON public.reviews
    FOR EACH ROW
    EXECUTE FUNCTION public.set_current_timestamp_updated_at();
