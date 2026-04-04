import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase;

if (import.meta.env.DEV && (!supabaseUrl || !supabaseKey)) {
  console.warn('Supabase config missing in dev - using mock client. Add VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY to .env');
  supabase = {
    storage: {
      from: () => ({
        upload: async () => ({}),
        getPublicUrl: async () => ({ data: { publicUrl: '' } })
      })
    }
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

export { supabase };
