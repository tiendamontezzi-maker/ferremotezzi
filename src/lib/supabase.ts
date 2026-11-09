import { createClient } from '@supabase/supabase-js';

const FALLBACK_SUPABASE_URL = 'https://ipzgouwqjbxznqxfcoiz.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwemdvdXdxamJ4em5xeGZjb2l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyNDYyMjAsImV4cCI6MjEwOTgyMjIyMH0.RROF1MeCXVdr6zC3HFqbjMcQnAEZq1dAWNakK_Vd6HI';

const envUrl = import.meta.env.VITE_SUPABASE_URL;
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl =
  envUrl && !envUrl.includes('your-project') ? envUrl : FALLBACK_SUPABASE_URL;

const supabaseAnonKey =
  envKey && envKey !== 'your-anon-key-here' ? envKey : FALLBACK_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
