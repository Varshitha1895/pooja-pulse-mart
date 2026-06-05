import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rilcjqfrzcqnevllfewc.supabase.co";
const supabaseKey = "sb_publishable_iH59jVhzzvr8dnm26OaQnQ_OXWZ0eD8";
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase.from('products').select('name, category').limit(5);
  console.log("Found", data?.length, "products. First few:", data);
}

check();
