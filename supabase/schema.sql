-- ==============================================================================
-- MONTEZZI - ESQUEMA DE BASE DE DATOS SUPABASE (POSTGRESQL)
-- Manual de Marca 2026 & E-commerce Arquitectónico de Lujo
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TIPOS ENUM
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('admin', 'colaborador', 'cliente');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('pendiente', 'aprobado', 'enviado', 'entregado', 'cancelado');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE main_collection_type AS ENUM ('cocina', 'closet', 'herrajes_especiales');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. TABLA: PROFILES (Perfiles vinculados a auth.users con roles)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'cliente',
    email TEXT,
    phone TEXT,
    company TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TABLA: CATEGORIES
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    main_collection main_collection_type NOT NULL DEFAULT 'herrajes_especiales',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABLA: PRODUCTS (Catálogo oficial KDJ-1 al KDJ-112)
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    code TEXT NOT NULL UNIQUE, -- KDJ-1 a KDJ-112
    name TEXT NOT NULL,
    category_id TEXT REFERENCES public.categories(id) ON DELETE SET NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    technical_specs JSONB NOT NULL DEFAULT '{}'::jsonb, -- material, acabado, dimensiones, mecanismo, capacidad, etc.
    benefits JSONB DEFAULT '[]'::jsonb,
    price NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    stock INTEGER NOT NULL DEFAULT 0,
    min_stock_alert INTEGER NOT NULL DEFAULT 5,
    image_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABLA: ORDERS (Órdenes y seguimiento de compras)
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    shipping_address TEXT NOT NULL,
    city TEXT NOT NULL,
    department TEXT NOT NULL DEFAULT 'Antioquia',
    notes TEXT,
    subtotal_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    shipping_cost NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    total_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status order_status NOT NULL DEFAULT 'pendiente',
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    payment_method TEXT NOT NULL DEFAULT 'transferencia',
    payment_status TEXT NOT NULL DEFAULT 'pendiente_verificacion',
    tracking_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. TABLA: WHOLESALE_LEADS (Prospectos de Arquitectos, Diseñadores y Carpinteros)
CREATE TABLE IF NOT EXISTS public.wholesale_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    company TEXT,
    city TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    business_type TEXT NOT NULL,
    interested_products TEXT,
    estimated_volume TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'nuevo',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wholesale_leads ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública para catálogo y categorías
CREATE POLICY "Lectura pública de categorías" 
    ON public.categories FOR SELECT USING (true);

CREATE POLICY "Lectura pública de productos" 
    ON public.products FOR SELECT USING (true);

-- Permisos de gestión para administradores y colaboradores
CREATE POLICY "Gestión de productos por admin y colaboradores"
    ON public.products FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role IN ('admin', 'colaborador')
        )
    );

-- Políticas de perfiles
CREATE POLICY "Usuarios ven su propio perfil" 
    ON public.profiles FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Admins ven todos los perfiles" 
    ON public.profiles FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Políticas de pedidos
CREATE POLICY "Clientes ven sus propios pedidos" 
    ON public.orders FOR SELECT 
    USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Inserción pública o de cliente para pedidos" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Staff gestiona pedidos" 
    ON public.orders FOR ALL 
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.user_id = auth.uid() 
            AND profiles.role IN ('admin', 'colaborador')
        )
    );

-- 9. TRIGGER: CREACIÓN AUTOMÁTICA DE PERFIL AL REGISTRARSE EN AUTH.USERS
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuario Montezzi'),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'cliente')
    )
    ON CONFLICT (user_id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
