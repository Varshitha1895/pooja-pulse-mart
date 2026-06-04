import { createClient } from '@supabase/supabase-js';
import { retailProducts } from '../src/lib/retail-products';

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rilcjqfrzcqnevllfewc.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_iH59jVhzzvr8dnm26OaQnQ_OXWZ0eD8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log(`Starting to seed ${retailProducts.length} products...`);
  
  // Deduplicate products based on name and category if needed, but retailProducts is our source
  for (const product of retailProducts) {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          category: product.category,
          name: product.name,
          price: product.price,
          image_url: product.image,
        }
      ]);
      
    if (error) {
      console.error(`Failed to insert ${product.name}:`, error.message);
    } else {
      console.log(`Successfully inserted ${product.name}`);
    }
  }
  
  console.log('Seeding complete!');
}

main();
