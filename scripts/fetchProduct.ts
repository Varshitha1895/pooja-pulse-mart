import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rilcjqfrzcqnevllfewc.supabase.co";
const supabaseKey = "sb_publishable_iH59jVhzzvr8dnm26OaQnQ_OXWZ0eD8";
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('products').select('*').eq('id', '61b576d4-15e1-4a0a-8971-e3c88f323377');
  console.log("Error:", error);
  console.log("Data:", data);
}
run();
