import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ipzgouwqjbxznqxfcoiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwemdvdXdxamJ4em5xeGZjb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDYyMjAsImV4cCI6MjEwOTgyMjIyMH0.RROF1MeCXVdr6zC3HFqbjMcQnAEZq1dAWNakK_Vd6HI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  console.log('🔄 Probando conexión a Supabase:', supabaseUrl);
  
  const tables = ['products', 'orders', 'profiles', 'coupons', 'product_reviews', 'appointments', 'activity_logs'];
  
  for (const table of tables) {
    try {
      const { data, error, count } = await supabase.from(table).select('*', { count: 'exact', head: true });
      if (error) {
        console.log(`⚠️ Tabla '${table}':`, error.message);
      } else {
        console.log(`✅ Tabla '${table}': Accesible (Registros: ${count ?? 0})`);
      }
    } catch (e) {
      console.log(`❌ Error al conectar con '${table}':`, e.message);
    }
  }

  // Check Storage bucket
  try {
    const { data: buckets, error: bError } = await supabase.storage.listBuckets();
    if (bError) {
      console.log('⚠️ Storage listBuckets:', bError.message);
    } else {
      console.log('✅ Buckets disponibles:', buckets.map(b => b.name));
    }
  } catch (e) {
    console.log('❌ Error storage:', e.message);
  }
}

testConnection();
