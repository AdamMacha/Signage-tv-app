import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

let client: SupabaseClient;

if (isSupabaseConfigured) {
    client = createClient(supabaseUrl, supabaseKey);
} else {
    console.warn("⚠️ Chybí SUPABASE_URL nebo SUPABASE_KEY v konfiguraci. Nahrávání do cloudu nebude fungovat.");
    // Dummy klient s validním URL schématem, aby server nespadl při startu procesu
    client = createClient("https://placeholder.supabase.co", "placeholder-key");
}

export const supabase = client;
