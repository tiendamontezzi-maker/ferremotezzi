-- ==============================================================================
-- MONTEZZI — Cierre de permisos (RLS). Correr en Supabase → SQL Editor DESPUÉS de publicar la web
-- con el login real (correo + contraseña). Se puede correr más de una vez.
--
-- Antes: cualquiera con la llave pública (visible en el navegador) podía cambiar precios, stock,
-- cupones y leer o editar pedidos, citas y registros.
-- Después:
--   · Público: ve el catálogo, categorías, cupones activos y reseñas; puede crear pedidos, citas,
--     reseñas y registros (lo que hace la tienda), pero no leerlos ni cambiarlos.
--   · Equipo (profiles.role = admin/colaborador, status active, con sesión): todo.
--   · La llave de servicio (Zuhuy, servidor) no pasa por RLS.
-- ==============================================================================

-- ¿Quién es del equipo? (security definer para poder leer profiles sin recursión de RLS)
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'colaborador') AND status = 'active'
  );
$$;
REVOKE ALL ON FUNCTION public.is_staff() FROM public;
GRANT EXECUTE ON FUNCTION public.is_staff() TO anon, authenticated;

-- Borra TODAS las políticas actuales de estas tablas (incluidas las "Public Write ..." con USING (true))
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT policyname, tablename FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('products','categories','orders','coupons','product_reviews','appointments','activity_logs','profiles')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

ALTER TABLE public.products        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;

-- Catálogo: lectura pública, escritura solo del equipo
CREATE POLICY "catalogo_lectura"   ON public.products   FOR SELECT USING (true);
CREATE POLICY "catalogo_equipo"    ON public.products   FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());
CREATE POLICY "categorias_lectura" ON public.categories FOR SELECT USING (true);
CREATE POLICY "categorias_equipo"  ON public.categories FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Cupones: el público solo ve los activos (los necesita el carrito); el equipo los administra
CREATE POLICY "cupones_activos" ON public.coupons FOR SELECT USING (is_active = true);
CREATE POLICY "cupones_equipo"  ON public.coupons FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Pedidos: la tienda los crea; solo el equipo los ve y cambia (datos personales de clientes)
CREATE POLICY "pedidos_crear"  ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "pedidos_equipo" ON public.orders FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Citas de showroom: igual que pedidos
CREATE POLICY "citas_crear"  ON public.appointments FOR INSERT WITH CHECK (true);
CREATE POLICY "citas_equipo" ON public.appointments FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Reseñas: públicas para leer y crear; solo el equipo edita o borra
CREATE POLICY "resenas_lectura" ON public.product_reviews FOR SELECT USING (true);
CREATE POLICY "resenas_crear"   ON public.product_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "resenas_equipo"  ON public.product_reviews FOR ALL TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

-- Registro de actividad: se escribe desde la web; solo el equipo lo lee
CREATE POLICY "registro_crear"  ON public.activity_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "registro_equipo" ON public.activity_logs FOR SELECT TO authenticated USING (public.is_staff());

-- Perfiles: cada usuario ve el suyo; el equipo ve todos. Altas y cambios de rol solo desde el panel de
-- Supabase o con la llave de servicio (nadie puede subirse a admin desde el navegador).
CREATE POLICY "perfil_propio" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_staff());

-- Fotos de productos (bucket product-images): lectura pública, subir/cambiar/borrar solo el equipo
DROP POLICY IF EXISTS "Public Storage Insert" ON storage.objects;
DROP POLICY IF EXISTS "fotos_equipo_insert" ON storage.objects;
DROP POLICY IF EXISTS "fotos_equipo_update" ON storage.objects;
DROP POLICY IF EXISTS "fotos_equipo_delete" ON storage.objects;
CREATE POLICY "fotos_equipo_insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images' AND public.is_staff());
CREATE POLICY "fotos_equipo_update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images' AND public.is_staff());
CREATE POLICY "fotos_equipo_delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images' AND public.is_staff());

-- Verificación: debe listar solo las políticas nuevas
SELECT tablename, policyname, cmd, roles FROM pg_policies
WHERE schemaname = 'public' AND tablename IN ('products','categories','orders','coupons','product_reviews','appointments','activity_logs','profiles')
ORDER BY tablename, policyname;
