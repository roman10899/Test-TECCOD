import { createClient } from "@supabase/supabase-js";

const url = "https://bvvapzkjnpxoysmnmfvt.supabase.co";
const anonKey = "sb_publishable_AnqqOQ1JCvJVFVsGp8x5tg_pSjCx3y_";

if (!url || !anonKey) {
  console.warn("VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Supabase client may not work.");
}

export const supabase = createClient(url ?? "", anonKey ?? "");

export default supabase;
