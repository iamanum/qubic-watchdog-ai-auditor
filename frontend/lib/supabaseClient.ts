import { createClient } from "@supabase/supabase-js";

// Uses NEXT_PUBLIC_ prefixed keys from .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client create karna aur export karna
export const supabase = createClient(supabaseUrl, supabaseAnonKey);