import { createClient } from "@supabase/supabase-js";
import { retailProducts } from "../src/lib/retail-products.js";
import { wholesaleProducts } from "../src/lib/wholesale-products.js";

const supabaseUrl = "https://rilcjqfrzcqnevllfewc.supabase.co";
const supabaseKey = "sb_publishable_iH59jVhzzvr8dnm26OaQnQ_OXWZ0eD8";
const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log("Migrating retail products...");
  for (const product of retailProducts) {
    const { error } = await supabase.from('products').insert({
      name: product.name,
      category: `[retail] ${product.category}`,
      price: product.price,
      unit: product.unit,
      image_url: product.image,
    });
    if (error) console.error("Error inserting", product.name, error);
    else console.log("Inserted retail", product.name);
  }

  console.log("Migrating wholesale products...");
  for (const product of wholesaleProducts) {
    const { error } = await supabase.from('products').insert({
      name: product.name,
      category: `[wholesale] ${product.category}`,
      price: product.price,
      unit: product.unit,
      image_url: product.image,
    });
    if (error) console.error("Error inserting", product.name, error);
    else console.log("Inserted wholesale", product.name);
  }

  console.log("Migration complete!");
}

migrate();
