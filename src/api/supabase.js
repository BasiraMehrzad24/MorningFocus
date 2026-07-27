import { createClient } from "@supabase/supabase-js";

// load Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// log environment variables during development
console.log("URL:", supabaseUrl);
console.log("KEY:", supabaseAnonKey);

// create and export the Supabase client
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);