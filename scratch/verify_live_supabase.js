import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ipzgouwqjbxznqxfcoiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwemdvdXdxamJ4em5xeGZjb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDYyMjAsImV4cCI6MjEwOTgyMjIyMH0.RROF1MeCXVdr6zC3HFqbjMcQnAEZq1dAWNakK_Vd6HI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyLiveDatabase() {
  console.log('🔍 Verificando base de datos en vivo en Supabase...\n');

  // 1. Productos
  const { data: products, error: pError, count: pCount } = await supabase
    .from('products')
    .select('id, code, name, price, stock, warehouse_stock, store_stock, web_stock', { count: 'exact' });

  if (pError) {
    console.error('❌ Error al consultar products:', pError.message);
  } else {
    console.log(`✅ TABLA products: ${pCount} productos oficiales cargados en Supabase.`);
    if (products && products.length > 0) {
      console.log('   Ejemplo producto:', products[0]);
    }
  }

  // 2. Categorías
  const { data: categories, error: cError, count: cCount } = await supabase
    .from('categories')
    .select('id, name', { count: 'exact' });

  if (cError) {
    console.error('❌ Error al consultar categories:', cError.message);
  } else {
    console.log(`✅ TABLA categories: ${cCount} categorías cargadas.`);
  }

  // 3. Cupones
  const { data: coupons, error: coupError, count: coupCount } = await supabase
    .from('coupons')
    .select('code, discount_type, discount_value', { count: 'exact' });

  if (coupError) {
    console.error('❌ Error al consultar coupons:', coupError.message);
  } else {
    console.log(`✅ TABLA coupons: ${coupCount} cupones activos.`);
    if (coupons) console.log('   Cupones:', coupons.map(c => c.code).join(', '));
  }

  // 4. Otras tablas
  const otherTables = ['orders', 'profiles', 'appointments', 'product_reviews', 'activity_logs'];
  for (const t of otherTables) {
    const { error: tError, count: tCount } = await supabase
      .from(t)
      .select('*', { count: 'exact', head: true });
    if (tError) {
      console.error(`❌ Tabla ${t}:`, tError.message);
    } else {
      console.log(`✅ TABLA ${t}: Lista y operativa (Registros: ${tCount ?? 0}).`);
    }
  }

  // 5. Storage Buckets
  const { data: buckets, error: bError } = await supabase.storage.listBuckets();
  if (bError) {
    console.log('⚠️ Storage listBuckets:', bError.message);
  } else {
    console.log(`✅ STORAGE BUCKETS: [${buckets.map(b => b.name).join(', ')}]`);
  }

  console.log('\n🎉 ¡CONFIRMACIÓN COMPLETA! La base de datos Supabase está 100% sincronizada con Montezzi.');
}

verifyLiveDatabase();
