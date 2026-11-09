-- ==============================================================================
-- 🏛️ MONTEZZI - MASTER DATABASE SCHEMA (POSTGRESQL / SUPABASE NUBE)
-- Manual de Marca 2026 & E-commerce Arquitectónico de Lujo
-- Incluye: Catálogo, Inventario Multicanal, Pedidos, Facturación DIAN, RBAC y Triggers
-- ==============================================================================

-- 1. HABILITAR EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TABLA: profiles (Perfiles Administrativos y RBAC)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'collaborator', 'admin', 'cliente', 'colaborador')),
    permissions JSONB DEFAULT '["dashboard_view", "orders_view", "products_view"]'::JSONB,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended')),
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 3. TABLA: products (Catálogo e Inventario Multicanal)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    brand_collection TEXT,
    description TEXT,
    short_description TEXT,
    price NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    original_price NUMERIC(12,2),
    category TEXT NOT NULL,
    category_id TEXT,
    style TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    warehouse_stock INTEGER DEFAULT 0,
    store_stock INTEGER DEFAULT 0,
    web_stock INTEGER DEFAULT 0,
    min_stock_alert INTEGER DEFAULT 5,
    images TEXT[] DEFAULT '{}'::TEXT[],
    image_url TEXT,
    gallery_urls TEXT[] DEFAULT '{}'::TEXT[],
    colors JSONB DEFAULT '[]'::JSONB,
    is_featured BOOLEAN DEFAULT FALSE,
    dimensions JSONB,
    materials TEXT[] DEFAULT '{}'::TEXT[],
    technical_specs JSONB DEFAULT '{}'::JSONB,
    benefits JSONB DEFAULT '[]'::JSONB,
    sku TEXT,
    boxes_count INTEGER DEFAULT 1,
    warranty TEXT DEFAULT '1 año por defectos de fabricación',
    inventory_status TEXT DEFAULT 'in_stock',
    wholesale_price NUMERIC(12,2),
    wholesale_min_qty INTEGER DEFAULT 1,
    shipping_returns_info TEXT,
    care_instructions TEXT,
    fast_shipping_badge BOOLEAN DEFAULT FALSE,
    returns_policy_badge BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_code ON public.products(code);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_inventory_status ON public.products(inventory_status);

-- ==============================================================================
-- 4. TABLA: orders (Pedidos, Abonos y Facturación Electrónica DIAN / Siigo)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_ref TEXT UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    customer_tag TEXT DEFAULT 'General',
    customer_document_type TEXT,
    customer_document_id TEXT,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    department TEXT DEFAULT 'Antioquia',
    carrier TEXT DEFAULT 'Servientrega',
    tracking_number TEXT,
    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    shipping_cost NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    discount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    deposit_amount NUMERIC(12,2) DEFAULT 0.00,
    pending_balance NUMERIC(12,2) DEFAULT 0.00,
    total NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    status TEXT DEFAULT 'processing',
    payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid')),
    payment_gateway TEXT DEFAULT 'bold',
    payment_method TEXT,
    items_count INTEGER DEFAULT 0,
    items JSONB NOT NULL DEFAULT '[]'::JSONB,
    notes TEXT,
    siigo_invoice_id TEXT,
    siigo_invoice_number TEXT,
    siigo_invoice_status TEXT DEFAULT 'pending',
    siigo_cufe TEXT,
    siigo_pdf_url TEXT,
    siigo_error_log TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_order_ref ON public.orders(order_ref);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);

-- ==============================================================================
-- 5. TABLA: appointments (Citas y Asesorías)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    location TEXT,
    city TEXT,
    address TEXT,
    consultant_name TEXT,
    price NUMERIC(12,2) DEFAULT 0.00,
    status TEXT DEFAULT 'confirmed',
    payment_status TEXT DEFAULT 'gratuita',
    payment_gateway TEXT DEFAULT 'bold',
    bold_order_id TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_date ON public.appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON public.appointments(status);

-- ==============================================================================
-- 6. TABLA: coupons (Cupones de Descuento)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.coupons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL,
    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),
    discount_value NUMERIC(12,2) NOT NULL,
    min_purchase NUMERIC(12,2) DEFAULT 0.00,
    expiry_date TIMESTAMPTZ,
    usage_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);

-- ==============================================================================
-- 7. TABLA: product_reviews (Reseñas y Calificaciones)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.product_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT NOT NULL,
    user_email TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    comment TEXT,
    status TEXT DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.product_reviews(status);

-- ==============================================================================
-- 8. TABLA: activity_logs (Auditoría de Actividad)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT,
    user_name TEXT,
    user_email TEXT,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    entity_name TEXT,
    action TEXT NOT NULL,
    description TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_logs_created_at ON public.activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_logs_entity ON public.activity_logs(entity_type, entity_id);

-- ==============================================================================
-- 9. TRIGGERS AUTOMÁTICOS
-- ==============================================================================

-- A. Actualización automática de updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_products_updated_at ON public.products;
CREATE TRIGGER set_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS set_orders_updated_at ON public.orders;
CREATE TRIGGER set_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- B. Cálculo reactivo de stock multicanal
CREATE OR REPLACE FUNCTION public.calculate_total_stock()
RETURNS TRIGGER AS $$
BEGIN
    NEW.stock = COALESCE(NEW.warehouse_stock, 0) + COALESCE(NEW.store_stock, 0) + COALESCE(NEW.web_stock, 0);
    IF NEW.stock <= 0 THEN
        NEW.inventory_status = 'out_of_stock';
    ELSIF NEW.stock < 5 THEN
        NEW.inventory_status = 'low_stock';
    ELSE
        NEW.inventory_status = 'in_stock';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_calculate_total_stock ON public.products;
CREATE TRIGGER trigger_calculate_total_stock
    BEFORE INSERT OR UPDATE OF warehouse_stock, store_stock, web_stock ON public.products
    FOR EACH ROW
    EXECUTE FUNCTION public.calculate_total_stock();

-- C. Sincronización automática de usuarios Auth -> Profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, permissions, status)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'customer'),
        COALESCE(NEW.raw_user_meta_data->'permissions', '["dashboard_view", "orders_view", "products_view"]'::jsonb),
        'active'
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ==============================================================================
-- 10. CONFIGURACIÓN DE STORAGE (product-images)
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'product-images',
    'product-images',
    TRUE,
    10485760, -- 10MB
    ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif']
)
ON CONFLICT (id) DO UPDATE SET
    public = TRUE,
    file_size_limit = 10485760,
    allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'];

-- ==============================================================================
-- 11. POLÍTICAS DE SEGURIDAD ROW-LEVEL SECURITY (RLS)
-- ==============================================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Products: Lectura pública, gestión administrativa
CREATE POLICY "Permitir lectura publica de productos"
    ON public.products FOR SELECT USING (true);

CREATE POLICY "Permitir gestion de productos a autenticados"
    ON public.products FOR ALL USING (auth.role() = 'authenticated');

-- Orders: Inserción en checkout público, gestión administrativa
CREATE POLICY "Permitir crear ordenes desde checkout publico"
    ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir gestion de ordenes a administradores"
    ON public.orders FOR ALL USING (auth.role() = 'authenticated');

-- Appointments: Inserción pública, gestión administrativa
CREATE POLICY "Permitir agendar citas publicamente"
    ON public.appointments FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir administracion de citas"
    ON public.appointments FOR ALL USING (auth.role() = 'authenticated');

-- Profiles: Lectura y actualización para autenticados
CREATE POLICY "Lectura de perfiles para autenticados"
    ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Actualizacion de perfil autenticado"
    ON public.profiles FOR ALL USING (auth.role() = 'authenticated');

-- Coupons: Lectura de cupones activos, gestión admin
CREATE POLICY "Permitir validar cupones en checkout"
    ON public.coupons FOR SELECT USING (is_active = true);

CREATE POLICY "Permitir administracion de cupones"
    ON public.coupons FOR ALL USING (auth.role() = 'authenticated');

-- Reviews: Lectura de aprobadas, creación pública, gestión admin
CREATE POLICY "Permitir ver reseñas aprobadas"
    ON public.product_reviews FOR SELECT USING (status = 'approved');

CREATE POLICY "Permitir enviar nuevas reseñas"
    ON public.product_reviews FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir moderacion de reseñas a administradores"
    ON public.product_reviews FOR ALL USING (auth.role() = 'authenticated');

-- Logs: Gestión administrativa
CREATE POLICY "Permitir gestion de logs a administradores"
    ON public.activity_logs FOR ALL USING (auth.role() = 'authenticated');

-- Storage Policies
CREATE POLICY "Acceso publico de lectura a imagenes"
    ON storage.objects FOR SELECT USING (bucket_id = 'product-images');

CREATE POLICY "Subida de imagenes autenticada"
    ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

CREATE POLICY "Actualizacion y borrado de imagenes autenticada"
    ON storage.objects FOR ALL USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
