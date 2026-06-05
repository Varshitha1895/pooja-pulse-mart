import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://rilcjqfrzcqnevllfewc.supabase.co";
const supabaseKey = "sb_publishable_iH59jVhzzvr8dnm26OaQnQ_OXWZ0eD8";
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('products').select('*').limit(5);
  console.log("Cols:", data && data.length > 0 ? Object.keys(data[0]) : "none");
  console.log("Data sample:", data?.map(d => ({ id: d.id, desc: d.description })));
}
run();
