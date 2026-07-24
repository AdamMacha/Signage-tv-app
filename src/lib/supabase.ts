import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
    console.warn("Chybí SUPABASE_URL nebo SUPABASE_KEY. Nahrávání do cloudu nebude fungovat.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
