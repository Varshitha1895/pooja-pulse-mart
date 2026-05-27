import random

base_content = '''import agarbathi from "@/assets/prod-agarbathi.jpg";
import diya from "@/assets/prod-diya.jpg";
import camphor from "@/assets/prod-camphor.jpg";
import chandan from "@/assets/prod-chandan.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit?: string;
  catalog: 'retail' | 'wholesale' | 'both';
};

const imgs = [agarbathi, diya, camphor, chandan];

const seed: Omit<Product, "id" | "image">[] = [
'''

retail_names = ['Agarbathi', 'Diya', 'Camphor', 'Chandan', 'Kumkum', 'Dhoop', 'Wicks', 'Pooja Bell', 'Tilak', 'Incense Cones', 'Rose Water', 'Ganga Jal', 'Sandalwood Paste', 'Brass Thali', 'Idol', 'Mala']
retail_categories = {'Agarbathi': 'Agarbathi', 'Diya': 'Diyas & Lamps', 'Camphor': 'Camphor', 'Chandan': 'Powders', 'Kumkum': 'Powders', 'Dhoop': 'Dhoop', 'Wicks': 'Wicks', 'Pooja Bell': 'Accessories', 'Tilak': 'Tilak', 'Incense Cones': 'Dhoop', 'Rose Water': 'Liquids', 'Ganga Jal': 'Liquids', 'Sandalwood Paste': 'Pastes', 'Brass Thali': 'Accessories', 'Idol': 'Idols', 'Mala': 'Accessories'}
retail_units = ['pack', 'piece', 'jar', 'bottle', 'box']

wholesale_names = ['Bulk Agarbathi', 'Bulk Diyas', 'Bulk Camphor', 'Bulk Chandan', 'Wholesale Kumkum', 'Master Carton Dhoop', 'Wholesale Wicks', 'Wholesale Pooja Bells', 'Wholesale Tilak', 'Wholesale Incense', 'Wholesale Rose Water', 'Wholesale Ganga Jal', 'Bulk Sandalwood', 'Wholesale Brass Thalis', 'Wholesale Idols', 'Wholesale Malas']

wholesale_categories = {
    'Bulk Agarbathi': 'Agarbathi',
    'Bulk Diyas': 'Diyas & Lamps',
    'Bulk Camphor': 'Camphor',
    'Bulk Chandan': 'Powders',
    'Wholesale Kumkum': 'Powders',
    'Master Carton Dhoop': 'Dhoop',
    'Wholesale Wicks': 'Wicks',
    'Wholesale Pooja Bells': 'Accessories',
    'Wholesale Tilak': 'Tilak',
    'Wholesale Incense': 'Dhoop',
    'Wholesale Rose Water': 'Liquids',
    'Wholesale Ganga Jal': 'Liquids',
    'Bulk Sandalwood': 'Pastes',
    'Wholesale Brass Thalis': 'Accessories',
    'Wholesale Idols': 'Idols',
    'Wholesale Malas': 'Accessories'
}
wholesale_units = ['carton', 'box', 'jar', 'sack', 'pallet', 'crate']

items = []
# Generate 250 retail items
for i in range(250):
    name_base = random.choice(retail_names)
    cat = retail_categories[name_base]
    unit = random.choice(retail_units)
    price = random.randint(50, 1000)
    name = f'Premium {name_base} {i+1}'
    items.append(f'  {{ name: "{name}", category: "{cat}", price: {price}, unit: "{unit}", catalog: "retail" }},')

# Generate 250 wholesale items
for i in range(250):
    name_base = random.choice(wholesale_names)
    cat = wholesale_categories[name_base]
    unit = random.choice(wholesale_units)
    price = random.randint(2000, 50000)
    name = f'{name_base} Pack {i+1}'
    items.append(f'  {{ name: "{name}", category: "{cat}", price: {price}, unit: "{unit}", catalog: "wholesale" }},')

end_content = '''];

export const products: Product[] = seed.map((p, i) => ({
  ...p,
  id: `p-${i + 1}`,
  image: imgs[i % imgs.length],
}));

export const retailProducts = products.filter((p) => p.catalog === 'retail' || p.catalog === 'both');
export const wholesaleProducts = products.filter((p) => p.catalog === 'wholesale' || p.catalog === 'both');

export const categories = Array.from(new Set(retailProducts.map((p) => p.category)));
export const wholesaleCategories = Array.from(new Set(wholesaleProducts.map((p) => p.category)));
'''

with open('src/lib/products.ts', 'w', encoding='utf-8') as f:
    f.write(base_content + '\n'.join(items) + '\n' + end_content)
