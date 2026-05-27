export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  unit?: string;
  catalog: 'retail' | 'wholesale' | 'both';
  description?: string;
};

// You can replace these image links with your own specific image URLs!
const seed: Omit<Product, "id">[] = [
  // ----------------------------------------------------
  // RETAIL ITEMS (4 Items)
  // ----------------------------------------------------
  // card 1
  { 
    name: "Premium Sandal Agarbathi", 
    category: "Pasupu Kumkum packets", 
    price: 4, 
    unit: "pack", 
    catalog: "retail",
    // 👇 I have changed this link to a new image as an example!
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779878825/Gemini_Generated_Image_1s2ihz1s2ihz1s2i_u9ano5.png",
    description: "Sustainably sourced, pure ingredients perfect for daily rituals."
  },
  // card 2
  { 
    name: "Gopuram Termaric Powder Packet", 
    category: "Pasupu", 
    price: 280, 
    unit: "piece", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779878518/Gemini_Generated_Image_xb7qymxb7qymxb7q_uposhw.png",
    description: "Crafted by traditional artisans to elevate your spiritual space."
  },
  // card 3
  { 
    name: "Gandham ", 
    category: "Gandam powder", 
    price: 95, 
    unit: "jar", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779874454/Gemini_Generated_Image_3k68843k68843k68_wrqjwn.png",
    description: "Long-lasting burn time with zero harmful chemicals."
  },
    // card 4
  { 
    name: "KARPURAM ", 
    category: "Karpuram", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779876874/Camphor_tablets_rogwv7.jpg",
    description: "Pure and authentic karpuram and pooja."
  }, // card 5
   { 
    name: "Triveni sweet supari ", 
    category: "Sweet supari", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779878134/Gemini_Generated_Image_cgux6pcgux6pcgux_zd1yzv.png",
    description: "Pure and authentic karpuram and pooja."
  },


 // card 6
   { 
    name: "GATTI VOTHULU ", 
    category: "VOTHULU", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779877937/www_divyadarshnam_ljtoqq.jpg",
    description: "Pure and authentic karpuram and pooja."
  },
  

   // card 7
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779878689/Gemini_Generated_Image_kiw8mrkiw8mrkiw8_vmiv6w.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 8
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779879839/Gemini_Generated_Image_2ktd4x2ktd4x2ktd_kulxzf.png",
    description: "Pure and authentic karpuram and pooja."
  },
  // card 9
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779879856/Gemini_Generated_Image_29fxte29fxte29fx_ymhwqz.png",
    description: "Pure and authentic karpuram and pooja."
  },
  // card 10
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779880203/Gemini_Generated_Image_q9vtnxq9vtnxq9vt_bybyuw.png",
    description: "Pure and authentic karpuram and pooja."
  },
  // card 11
    { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779880656/Gemini_Generated_Image_otvjsbotvjsbotvj_ffi7jc.png",
    description: "Pure and authentic karpuram and pooja."
  },
  
  // card 12
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779880925/Gemini_Generated_Image_xxsef7xxsef7xxse_vfxlie.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 13
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 14
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
 // card 15
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 16
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 17
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 18
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 19
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 20
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 21
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 22
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 23
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 24
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 25
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
 

  // ----------------------------------------------------
  // WHOLESALE ITEMS (4 Items)
  // ----------------------------------------------------
  { 
    name: "Wholesale Agarbathi Carton", 
    category: "Agarbathi", 
    price: 45000, 
    unit: "carton", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1593344605934-2e997576435c?auto=format&fit=crop&q=80&w=800",
    description: "Bulk carton containing 500 packs of premium agarbathi for temples and stores."
  },
  { 
    name: "Bulk Brass Diyas (100 pcs)", 
    category: "Diyas & Lamps", 
    price: 22000, 
    unit: "box", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1615370217992-628d227c2f1e?auto=format&fit=crop&q=80&w=800",
    description: "Wholesale box of classic brass diyas, heavily discounted for bulk purchase."
  },
  { 
    name: "Camphor Bulk Jar 5kg", 
    category: "Camphor", 
    price: 7500, 
    unit: "jar", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?auto=format&fit=crop&q=80&w=800",
    description: "5kg industrial jar of pure camphor cubes. Ideal for large ceremonies."
  },
  { 
    name: "Chandan Powder Bulk 10kg", 
    category: "Powders", 
    price: 12000, 
    unit: "sack", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1588616156976-12fbd7f99955?auto=format&fit=crop&q=80&w=800",
    description: "10kg sack of pure Chandan powder directly from suppliers."
  },
  { 
    name: "Wholesale Kumkum Bulk 10kg", 
    category: "Powders", 
    price: 8500, 
    unit: "sack", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1605807646983-377bc5a76493?auto=format&fit=crop&q=80&w=800",
    description: "Vibrant red kumkum for temples and large pooja gatherings."
  },
  { 
    name: "Pure Ghee Wicks Master Carton", 
    category: "Wicks", 
    price: 35000, 
    unit: "carton", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1596433809252-260c2666113b?auto=format&fit=crop&q=80&w=800",
    description: "Master carton containing 10,000 pure ghee wicks for daily aarti."
  },
  { 
    name: "Loban Sambrani Cups Wholesale", 
    category: "Dhoop", 
    price: 18000, 
    unit: "pallet", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1611077544795-3bc6e088c2e4?auto=format&fit=crop&q=80&w=800",
    description: "Wholesale pallet of loban sambrani cups for deep cleansing aromas."
  },
  { 
    name: "Silver Plated Pooja Thali Sets", 
    category: "Accessories", 
    price: 45000, 
    unit: "crate", 
    catalog: "wholesale",
    image: "https://images.unsplash.com/photo-1615370217992-628d227c2f1e?auto=format&fit=crop&q=80&w=800",
    description: "Crate of 20 silver-plated pooja thalis for retail resale or large gifting."
  },
];

// Add an ID to each product based on its index
export const products: Product[] = seed.map((p, i) => ({
  ...p,
  id: `p-${i + 1}`,
}));

export const retailProducts = products.filter((p) => p.catalog === 'retail' || p.catalog === 'both');
export const wholesaleProducts = products.filter((p) => p.catalog === 'wholesale' || p.catalog === 'both');

export const categories = Array.from(new Set(retailProducts.map((p) => p.category)));
export const wholesaleCategories = Array.from(new Set(wholesaleProducts.map((p) => p.category)));