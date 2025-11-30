import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  website_url: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  features: string[];
  applications: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}
