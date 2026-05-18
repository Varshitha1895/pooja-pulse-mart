import agarbathi from "@/assets/prod-agarbathi.jpg";
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
};

const imgs = [agarbathi, diya, camphor, chandan];

const seed: Omit<Product, "id" | "image">[] = [
  { name: "Premium Sandal Agarbathi", category: "Agarbathi", price: 120, unit: "pack" },
  { name: "Brass Diya — Classic", category: "Diyas & Lamps", price: 280, unit: "piece" },
  { name: "Pure Camphor Cubes 50g", category: "Camphor", price: 95, unit: "jar" },
  { name: "Chandan Powder 100g", category: "Powders", price: 150, unit: "pack" },
  { name: "Rose Agarbathi Bundle", category: "Agarbathi", price: 140, unit: "pack" },
  { name: "Kumkum — Roli 50g", category: "Powders", price: 60, unit: "pack" },
  { name: "Akhand Diya — Tall", category: "Diyas & Lamps", price: 450, unit: "piece" },
  { name: "Mogra Dhoop Sticks", category: "Dhoop", price: 110, unit: "pack" },
  { name: "Pure Ghee Wicks 100pc", category: "Wicks", price: 85, unit: "pack" },
  { name: "Loban Sambrani Cups", category: "Dhoop", price: 130, unit: "box" },
  { name: "Haldi Powder Premium", category: "Powders", price: 70, unit: "pack" },
  { name: "Silver Plated Pooja Bell", category: "Accessories", price: 520, unit: "piece" },
  { name: "Kesar Chandan Tilak", category: "Tilak", price: 180, unit: "pack" },
  { name: "Jasmine Agarbathi XL", category: "Agarbathi", price: 160, unit: "pack" },
  { name: "Bhimseni Camphor 100g", category: "Camphor", price: 220, unit: "jar" },
  { name: "Copper Panchapatra Set", category: "Accessories", price: 680, unit: "set" },
  { name: "Til Oil Pooja 500ml", category: "Oils", price: 240, unit: "bottle" },
  { name: "Astgandh Powder", category: "Powders", price: 195, unit: "pack" },
  { name: "Nag Champa Agarbathi", category: "Agarbathi", price: 135, unit: "pack" },
  { name: "Aarti Thali Brass", category: "Accessories", price: 850, unit: "piece" },
  { name: "Cotton Long Wicks", category: "Wicks", price: 65, unit: "pack" },
  { name: "Rose Petals Dried 50g", category: "Flowers", price: 90, unit: "pack" },
];

export const products: Product[] = seed.map((p, i) => ({
  ...p,
  id: `p-${i + 1}`,
  image: imgs[i % imgs.length],
}));

export const categories = Array.from(new Set(products.map((p) => p.category)));
