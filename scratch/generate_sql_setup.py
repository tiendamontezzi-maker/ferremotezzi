import json
import re

print("Regenerando script SQL maestro Montezzi con mitigación completa de columnas...")

with open('src/lib/mockData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract OFFICIAL_CATEGORIES
cat_match = re.search(r'export const OFFICIAL_CATEGORIES: Category\[\] = (\[.*?\]);', content, re.DOTALL)
if not cat_match:
    raise ValueError("No se pudo extraer OFFICIAL_CATEGORIES")
categories = json.loads(cat_match.group(1))

# Extract OFFICIAL_PRODUCTS
prod_match = re.search(r'export const OFFICIAL_PRODUCTS: Product\[\] = (\[.*?\]);\s*\n\s*export const INITIAL_ORDERS', content, re.DOTALL)
if not prod_match:
    raise ValueError("No se pudo extraer OFFICIAL_PRODUCTS")
products = json.loads(prod_match.group(1))

def escape_sql(val):
    if val is None:
        return "NULL"
    if isinstance(val, bool):
        return "TRUE" if val else "FALSE"
    if isinstance(val, (int, float)):
        return str(val)
    if isinstance(val, (dict, list)):
        return "'" + json.dumps(val, ensure_ascii=False).replace("'", "''") + "'::jsonb"
    return "'" + str(val).replace("'", "''") + "'"

sql_lines = [
    "-- ==============================================================================",
    "-- 🏛️ MONTEZZI LUXURY HARDWARE - SCRIPT MAESTRO DE INICIALIZACIÓN SUPABASE",
    "-- Proyecto: ipzgouwqjbxznqxfcoiz.supabase.co (Colección Oficial 2026)",
    "-- ==============================================================================",
    "",
    "-- 1. EXTENSIONES",
    'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
    'CREATE EXTENSION IF NOT EXISTS "pgcrypto";',
    "",
    "-- 2. TABLA: profiles",
    "CREATE TABLE IF NOT EXISTS public.profiles (",
    "    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,",
    "    full_name TEXT NOT NULL,",
    "    email TEXT UNIQUE NOT NULL,",
    "    role TEXT NOT NULL DEFAULT 'cliente',",
    '    permissions JSONB DEFAULT \'["dashboard_view", "orders_view", "products_view"]\'::JSONB,',
    "    status TEXT NOT NULL DEFAULT 'active',",
    "    phone TEXT,",
    "    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,",
    "    updated_at TIMESTAMPTZ DEFAULT NOW()",
    ");",
    "",
    "-- 3. TABLA: categories",
    "CREATE TABLE IF NOT EXISTS public.categories (",
    "    id TEXT PRIMARY KEY,",
    "    name TEXT NOT NULL,",
    "    slug TEXT UNIQUE NOT NULL,",
    "    description TEXT,",
    "    main_collection TEXT NOT NULL DEFAULT 'cocina',",
    "    created_at TIMESTAMPTZ DEFAULT NOW()",
    ");",
    "",
    "-- 4. TABLA: products",
    "CREATE TABLE IF NOT EXISTS public.products (",
    "    id TEXT PRIMARY KEY DEFAULT (gen_random_uuid())::text,",
    "    code TEXT NOT NULL,",
    "    name TEXT NOT NULL,",
    "    slug TEXT NOT NULL DEFAULT '',",
    "    brand_collection TEXT,",
    "    description TEXT,",
    "    short_description TEXT NOT NULL,",
    "    full_description TEXT,",
    "    price NUMERIC(12,2) NOT NULL DEFAULT 0.00,",
    "    original_price NUMERIC(12,2),",
    "    category TEXT NOT NULL DEFAULT 'General',",
    "    category_id TEXT,",
    "    category_name TEXT,",
    "    main_collection TEXT NOT NULL DEFAULT 'cocina',",
    "    style TEXT,",
    "    stock INTEGER NOT NULL DEFAULT 0,",
    "    warehouse_stock INTEGER DEFAULT 0,",
    "    store_stock INTEGER DEFAULT 0,",
    "    web_stock INTEGER DEFAULT 0,",
    "    min_stock_alert INTEGER DEFAULT 8,",
    "    images TEXT[] DEFAULT '{}'::TEXT[],",
    "    image_url TEXT NOT NULL,",
    "    gallery_urls TEXT[] DEFAULT '{}'::TEXT[],",
    "    colors JSONB DEFAULT '[]'::JSONB,",
    "    is_featured BOOLEAN DEFAULT FALSE,",
    "    dimensions JSONB,",
    "    materials TEXT[] DEFAULT '{}'::TEXT[],",
    "    technical_specs JSONB DEFAULT '{}'::JSONB,",
    "    benefits JSONB DEFAULT '[]'::JSONB,",
    "    sku TEXT,",
    "    boxes_count INTEGER DEFAULT 1,",
    "    warranty TEXT DEFAULT '1 año por defectos de fabricación',",
    "    inventory_status TEXT DEFAULT 'in_stock',",
    "    wholesale_price NUMERIC(12,2),",
    "    wholesale_min_qty INTEGER DEFAULT 1,",
    "    shipping_returns_info TEXT,",
    "    care_instructions TEXT,",
    "    fast_shipping_badge BOOLEAN DEFAULT FALSE,",
    "    returns_policy_badge BOOLEAN DEFAULT TRUE,",
    "    created_at TIMESTAMPTZ DEFAULT NOW(),",
    "    updated_at TIMESTAMPTZ DEFAULT NOW(),",
    "    updated_by TEXT",
    ");",
    "",
    "-- ASEGURAR COLUMNAS EN products (Por si la tabla ya existía previamente)",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS full_description TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS description TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS short_description TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'General';",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_id TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS category_name TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS main_collection TEXT DEFAULT 'cocina';",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS warehouse_stock INTEGER DEFAULT 0;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS store_stock INTEGER DEFAULT 0;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS web_stock INTEGER DEFAULT 0;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS min_stock_alert INTEGER DEFAULT 8;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS images TEXT[] DEFAULT '{}'::TEXT[];",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] DEFAULT '{}'::TEXT[];",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS colors JSONB DEFAULT '[]'::JSONB;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS dimensions JSONB;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS materials TEXT[] DEFAULT '{}'::TEXT[];",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS technical_specs JSONB DEFAULT '{}'::JSONB;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS benefits JSONB DEFAULT '[]'::JSONB;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sku TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS boxes_count INTEGER DEFAULT 1;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS warranty TEXT DEFAULT '1 año por defectos de fabricación';",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS inventory_status TEXT DEFAULT 'in_stock';",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS wholesale_price NUMERIC(12,2);",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS wholesale_min_qty INTEGER DEFAULT 1;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS shipping_returns_info TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS care_instructions TEXT;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS fast_shipping_badge BOOLEAN DEFAULT FALSE;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS returns_policy_badge BOOLEAN DEFAULT TRUE;",
    "ALTER TABLE public.products ADD COLUMN IF NOT EXISTS original_price NUMERIC(12,2);",
    "",
    "CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);",
    "CREATE INDEX IF NOT EXISTS idx_products_code ON public.products(code);",
    "CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);",
    "CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);",
    "",
    "-- 5. TABLA: orders",
    "CREATE TABLE IF NOT EXISTS public.orders (",
    "    id TEXT PRIMARY KEY DEFAULT ('ORD-2026-' || floor(100 + random() * 900)::text),",
    "    order_ref TEXT NOT NULL DEFAULT ('DT-' || upper(substr(md5(random()::text), 1, 6))),",
    "    customer_name TEXT NOT NULL,",
    "    customer_email TEXT NOT NULL,",
    "    customer_phone TEXT,",
    "    customer_tag TEXT DEFAULT 'General',",
    "    customer_document_type TEXT DEFAULT 'CC',",
    "    customer_document_id TEXT,",
    "    shipping_address TEXT NOT NULL,",
    "    city TEXT NOT NULL,",
    "    carrier TEXT DEFAULT 'Servientrega',",
    "    tracking_number TEXT,",
    "    subtotal NUMERIC(12,2) NOT NULL DEFAULT 0.00,",
    "    shipping_cost NUMERIC(12,2) NOT NULL DEFAULT 0.00,",
    "    discount NUMERIC(12,2) NOT NULL DEFAULT 0.00,",
    "    deposit_amount NUMERIC(12,2) DEFAULT 0.00,",
    "    pending_balance NUMERIC(12,2) DEFAULT 0.00,",
    "    total NUMERIC(12,2) NOT NULL DEFAULT 0.00,",
    "    status TEXT DEFAULT 'pendiente',",
    "    payment_status TEXT DEFAULT 'pending',",
    "    payment_gateway TEXT DEFAULT 'bold',",
    "    payment_method TEXT DEFAULT 'Transferencia Bancaria',",
    "    items_count INTEGER DEFAULT 1,",
    "    items JSONB NOT NULL DEFAULT '[]'::JSONB,",
    "    notes TEXT,",
    "    siigo_invoice_id TEXT,",
    "    siigo_invoice_number TEXT,",
    "    siigo_invoice_status TEXT DEFAULT 'pending',",
    "    siigo_cufe TEXT,",
    "    siigo_pdf_url TEXT,",
    "    siigo_error_log TEXT,",
    "    created_at TIMESTAMPTZ DEFAULT NOW(),",
    "    updated_at TIMESTAMPTZ DEFAULT NOW()",
    ");",
    "",
    "-- ASEGURAR COLUMNAS EN orders",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS order_ref TEXT;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_document_type TEXT DEFAULT 'CC';",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_document_id TEXT;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS customer_tag TEXT DEFAULT 'General';",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS carrier TEXT DEFAULT 'Servientrega';",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS deposit_amount NUMERIC(12,2) DEFAULT 0.00;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS pending_balance NUMERIC(12,2) DEFAULT 0.00;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS siigo_invoice_id TEXT;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS siigo_invoice_number TEXT;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS siigo_invoice_status TEXT DEFAULT 'pending';",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS siigo_cufe TEXT;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS siigo_pdf_url TEXT;",
    "ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS siigo_error_log TEXT;",
    "",
    "-- 6. TABLA: appointments",
    "CREATE TABLE IF NOT EXISTS public.appointments (",
    "    id TEXT PRIMARY KEY DEFAULT (gen_random_uuid())::text,",
    "    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,",
    "    customer_name TEXT NOT NULL,",
    "    customer_email TEXT NOT NULL,",
    "    customer_phone TEXT NOT NULL,",
    "    service_type TEXT NOT NULL,",
    "    appointment_date DATE NOT NULL,",
    "    appointment_time TEXT NOT NULL,",
    "    location TEXT DEFAULT 'Showroom Montezzi - Milla de Oro, Medellín',",
    "    city TEXT DEFAULT 'Medellín',",
    "    consultant_name TEXT DEFAULT 'Asesor Especializado Montezzi',",
    "    price NUMERIC(12,2) DEFAULT 0.00,",
    "    status TEXT DEFAULT 'confirmed',",
    "    payment_status TEXT DEFAULT 'gratuita',",
    "    notes TEXT,",
    "    created_at TIMESTAMPTZ DEFAULT NOW()",
    ");",
    "",
    "-- 7. TABLA: coupons",
    "CREATE TABLE IF NOT EXISTS public.coupons (",
    "    id TEXT PRIMARY KEY DEFAULT (gen_random_uuid())::text,",
    "    code TEXT UNIQUE NOT NULL,",
    "    discount_type TEXT NOT NULL CHECK (discount_type IN ('percentage', 'fixed')),",
    "    discount_value NUMERIC(12,2) NOT NULL,",
    "    min_purchase NUMERIC(12,2) DEFAULT 0.00,",
    "    expiry_date TIMESTAMPTZ,",
    "    usage_count INTEGER DEFAULT 0,",
    "    is_active BOOLEAN DEFAULT TRUE,",
    "    created_at TIMESTAMPTZ DEFAULT NOW()",
    ");",
    "",
    "-- 8. TABLA: product_reviews",
    "CREATE TABLE IF NOT EXISTS public.product_reviews (",
    "    id TEXT PRIMARY KEY DEFAULT (gen_random_uuid())::text,",
    "    product_id TEXT NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,",
    "    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,",
    "    user_name TEXT NOT NULL,",
    "    user_email TEXT,",
    "    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),",
    "    title TEXT,",
    "    comment TEXT,",
    "    status TEXT DEFAULT 'approved',",
    "    created_at TIMESTAMPTZ DEFAULT NOW()",
    ");",
    "",
    "-- 9. TABLA: activity_logs",
    "CREATE TABLE IF NOT EXISTS public.activity_logs (",
    "    id TEXT PRIMARY KEY DEFAULT ('log-' || floor(100000 + random() * 900000)::text),",
    "    user_id TEXT,",
    "    user_name TEXT,",
    "    user_email TEXT,",
    "    entity_type TEXT NOT NULL,",
    "    entity_id TEXT,",
    "    entity_name TEXT,",
    "    action TEXT NOT NULL,",
    "    description TEXT,",
    "    details JSONB,",
    "    ip_address TEXT,",
    "    created_at TIMESTAMPTZ DEFAULT NOW()",
    ");",
    "",
    "-- 10. TRIGGERS",
    "CREATE OR REPLACE FUNCTION public.calculate_total_stock()",
    "RETURNS TRIGGER AS $$",
    "BEGIN",
    "    NEW.stock = COALESCE(NEW.warehouse_stock, 0) + COALESCE(NEW.store_stock, 0) + COALESCE(NEW.web_stock, 0);",
    "    IF NEW.stock <= 0 THEN",
    "        NEW.inventory_status = 'out_of_stock';",
    "    ELSIF NEW.stock < COALESCE(NEW.min_stock_alert, 5) THEN",
    "        NEW.inventory_status = 'low_stock';",
    "    ELSE",
    "        NEW.inventory_status = 'in_stock';",
    "    END IF;",
    "    RETURN NEW;",
    "END;",
    "$$ LANGUAGE plpgsql;",
    "",
    "DROP TRIGGER IF EXISTS trigger_calculate_total_stock ON public.products;",
    "CREATE TRIGGER trigger_calculate_total_stock",
    "    BEFORE INSERT OR UPDATE OF warehouse_stock, store_stock, web_stock ON public.products",
    "    FOR EACH ROW",
    "    EXECUTE FUNCTION public.calculate_total_stock();",
    "",
    "-- 11. BUCKET DE STORAGE (product-images)",
    "INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)",
    "VALUES ('product-images', 'product-images', TRUE, 10485760, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/svg+xml', 'image/gif', 'image/avif'])",
    "ON CONFLICT (id) DO UPDATE SET public = TRUE;",
    "",
    "-- 12. RLS PERMISIVO PARA USO FLUIDO DE E-COMMERCE",
    "ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;",
    "ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;",
    "ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;",
    "ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;",
    "ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;",
    "ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;",
    "ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;",
    "ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;",
    "",
    'DROP POLICY IF EXISTS "Public Read Products" ON public.products;',
    'CREATE POLICY "Public Read Products" ON public.products FOR SELECT USING (true);',
    'DROP POLICY IF EXISTS "Public Write Products" ON public.products;',
    'CREATE POLICY "Public Write Products" ON public.products FOR ALL USING (true);',
    "",
    'DROP POLICY IF EXISTS "Public Read Categories" ON public.categories;',
    'CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);',
    'DROP POLICY IF EXISTS "Public Write Categories" ON public.categories;',
    'CREATE POLICY "Public Write Categories" ON public.categories FOR ALL USING (true);',
    "",
    'DROP POLICY IF EXISTS "Public Read Orders" ON public.orders;',
    'CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);',
    'DROP POLICY IF EXISTS "Public Write Orders" ON public.orders;',
    'CREATE POLICY "Public Write Orders" ON public.orders FOR ALL USING (true);',
    "",
    'DROP POLICY IF EXISTS "Public Read Coupons" ON public.coupons;',
    'CREATE POLICY "Public Read Coupons" ON public.coupons FOR SELECT USING (true);',
    'DROP POLICY IF EXISTS "Public Write Coupons" ON public.coupons;',
    'CREATE POLICY "Public Write Coupons" ON public.coupons FOR ALL USING (true);',
    "",
    'DROP POLICY IF EXISTS "Public Read Reviews" ON public.product_reviews;',
    'CREATE POLICY "Public Read Reviews" ON public.product_reviews FOR SELECT USING (true);',
    'DROP POLICY IF EXISTS "Public Write Reviews" ON public.product_reviews;',
    'CREATE POLICY "Public Write Reviews" ON public.product_reviews FOR ALL USING (true);',
    "",
    'DROP POLICY IF EXISTS "Public Read Appointments" ON public.appointments;',
    'CREATE POLICY "Public Read Appointments" ON public.appointments FOR SELECT USING (true);',
    'DROP POLICY IF EXISTS "Public Write Appointments" ON public.appointments;',
    'CREATE POLICY "Public Write Appointments" ON public.appointments FOR ALL USING (true);',
    "",
    'DROP POLICY IF EXISTS "Public Read Logs" ON public.activity_logs;',
    'CREATE POLICY "Public Read Logs" ON public.activity_logs FOR SELECT USING (true);',
    'DROP POLICY IF EXISTS "Public Write Logs" ON public.activity_logs;',
    'CREATE POLICY "Public Write Logs" ON public.activity_logs FOR ALL USING (true);',
    "",
    'DROP POLICY IF EXISTS "Public Storage Read" ON storage.objects;',
    'CREATE POLICY "Public Storage Read" ON storage.objects FOR SELECT USING (bucket_id = \'product-images\');',
    'DROP POLICY IF EXISTS "Public Storage Insert" ON storage.objects;',
    'CREATE POLICY "Public Storage Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = \'product-images\');',
    "",
    "-- ==============================================================================",
    "-- 13. SEED: CATEGORÍAS (12 CATEGORÍAS)",
    "-- =============================================================================="
]

for cat in categories:
    sql_lines.append(
        f"INSERT INTO public.categories (id, name, slug, description, main_collection) VALUES ("
        f"{escape_sql(cat['id'])}, {escape_sql(cat['name'])}, {escape_sql(cat['slug'])}, "
        f"{escape_sql(cat.get('description', ''))}, {escape_sql(cat['main_collection'])}) "
        f"ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;"
    )

sql_lines.append("")
sql_lines.append("-- ==============================================================================")
sql_lines.append(f"-- 14. SEED: PRODUCTOS OFICIALES MONTEZZI 2026 ({len(products)} REFERENCIAS)")
sql_lines.append("-- ==============================================================================")

for p in products:
    slug = p.get('slug') or p['code'].lower().replace(' ', '-')
    cat_name = p.get('category_name') or 'General'
    main_col = p.get('main_collection') or 'cocina'
    w_stock = p.get('warehouse_stock') or 15
    s_stock = p.get('store_stock') or 5
    b_stock = p.get('web_stock') or 5
    stock = p.get('stock') or (w_stock + s_stock + b_stock)
    short_desc = p['short_description']
    full_desc = p.get('full_description') or short_desc
    
    sql_lines.append(
        "INSERT INTO public.products (id, code, name, slug, short_description, full_description, description, price, category_id, category_name, category, main_collection, warehouse_stock, store_stock, web_stock, stock, min_stock_alert, image_url, gallery_urls, is_featured, technical_specs, benefits, sku, inventory_status) VALUES ("
        f"{escape_sql(p['id'])}, "
        f"{escape_sql(p['code'])}, "
        f"{escape_sql(p['name'])}, "
        f"{escape_sql(slug)}, "
        f"{escape_sql(short_desc)}, "
        f"{escape_sql(full_desc)}, "
        f"{escape_sql(full_desc)}, "
        f"{p['price']}, "
        f"{escape_sql(p['category_id'])}, "
        f"{escape_sql(cat_name)}, "
        f"{escape_sql(cat_name)}, "
        f"{escape_sql(main_col)}, "
        f"{w_stock}, {s_stock}, {b_stock}, {stock}, "
        f"{p.get('min_stock_alert', 8)}, "
        f"{escape_sql(p['image_url'])}, "
        f"ARRAY[{escape_sql(p['image_url'])}], "
        f"{escape_sql(p.get('is_featured', False))}, "
        f"{escape_sql(p.get('technical_specs', {}))}, "
        f"{escape_sql(p.get('benefits', []))}, "
        f"{escape_sql(p.get('sku', p['code']))}, "
        f"{escape_sql(p.get('inventory_status', 'in_stock'))}"
        ") ON CONFLICT (id) DO UPDATE SET "
        "price = EXCLUDED.price, "
        "warehouse_stock = EXCLUDED.warehouse_stock, "
        "store_stock = EXCLUDED.store_stock, "
        "web_stock = EXCLUDED.web_stock, "
        "stock = EXCLUDED.stock, "
        "image_url = EXCLUDED.image_url, "
        "short_description = EXCLUDED.short_description, "
        "full_description = EXCLUDED.full_description, "
        "description = EXCLUDED.description, "
        "technical_specs = EXCLUDED.technical_specs;"
    )

sql_lines.append("")
sql_lines.append("-- ==============================================================================")
sql_lines.append("-- 15. SEED: CUPONES INICIALES")
sql_lines.append("-- ==============================================================================")
sql_lines.append("INSERT INTO public.coupons (code, discount_type, discount_value, min_purchase, usage_count, is_active) VALUES ('BIENVENIDO10', 'percentage', 10, 500000, 12, true) ON CONFLICT (code) DO NOTHING;")
sql_lines.append("INSERT INTO public.coupons (code, discount_type, discount_value, min_purchase, usage_count, is_active) VALUES ('ARQUITECTURA50K', 'fixed', 50000, 300000, 8, true) ON CONFLICT (code) DO NOTHING;")
sql_lines.append("INSERT INTO public.coupons (code, discount_type, discount_value, min_purchase, usage_count, is_active) VALUES ('VIPMONTEZZI', 'percentage', 15, 1000000, 5, true) ON CONFLICT (code) DO NOTHING;")

output_path = 'supabase/montezzi_master_setup.sql'
with open(output_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(sql_lines))

print(f"✅ Script corregido y blindado guardado en: {output_path}")
