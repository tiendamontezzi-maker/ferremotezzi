import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ipzgouwqjbxznqxfcoiz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwemdvdXdxamJ4em5xeGZjb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDYyMjAsImV4cCI6MjEwOTgyMjIyMH0.RROF1MeCXVdr6zC3HFqbjMcQnAEZq1dAWNakK_Vd6HI';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectSchema() {
  // Try inserting a dummy item or check select columns
  const { data, error } = await supabase.from('products').select('*').limit(1);
  console.log('Select products result:', { data, error });

  // Test insert a test product
  const testProduct = {
    name: 'Test KDJ-60',
    slug: 'test-kdj-60',
    price: 335000,
    category: 'Condimenteros & Portaplatos',
    warehouse_stock: 10,
    store_stock: 5,
    web_stock: 5,
    stock: 20,
    images: ['/images/products/kdj-60.jpg']
  };

  const { data: insData, error: insError } = await supabase.from('products').insert([testProduct]).select();
  console.log('Insert test result:', { insData, insError });

  if (insData && insData[0]?.id) {
    // Clean up test
    await supabase.from('products').delete().eq('id', insData[0].id);
    console.log('Cleaned up test record.');
  }
}

inspectSchema();
