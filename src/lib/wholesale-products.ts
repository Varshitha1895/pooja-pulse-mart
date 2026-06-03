import type { Product } from "./types";

// You can replace these image links with your own specific image URLs!
const seed: Omit<Product, "id">[] = [
  // ----------------------------------------------------
  // WHOLESALE ITEMS
  // ----------------------------------------------------
   // card 1
  { 
    name: "Premium Sandal Agarbathi", 
    category: "Pasupu Kumkum packets", 
    price: 4, 
    unit: "pack", 
    catalog: "wholesale",
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
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779878518/Gemini_Generated_Image_xb7qymxb7qymxb7q_uposhw.png",
    description: "Crafted by traditional artisans to elevate your spiritual space."
  },
  // card 3
  { 
    name: "Gandham ", 
    category: "Gandam powder", 
    price: 95, 
    unit: "jar", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779874454/Gemini_Generated_Image_3k68843k68843k68_wrqjwn.png",
    description: "Long-lasting burn time with zero harmful chemicals."
  },
    // card 4
  { 
    name: "KARPURAM ", 
    category: "Karpuram", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779876874/Camphor_tablets_rogwv7.jpg",
    description: "Pure and authentic karpuram and pooja."
  }, // card 5
   { 
    name: "Triveni sweet supari ", 
    category: "Sweet supari", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779878134/Gemini_Generated_Image_cgux6pcgux6pcgux_zd1yzv.png",
    description: "Pure and authentic karpuram and pooja."
  },


 // card 6
   { 
    name: "GATTI VOTHULU ", 
    category: "VOTHULU", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779877937/www_divyadarshnam_ljtoqq.jpg",
    description: "Pure and authentic karpuram and pooja."
  },
  

   // card 7
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779878689/Gemini_Generated_Image_kiw8mrkiw8mrkiw8_vmiv6w.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 8
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779879839/Gemini_Generated_Image_2ktd4x2ktd4x2ktd_kulxzf.png",
    description: "Pure and authentic karpuram and pooja."
  },
  // card 9
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779879856/Gemini_Generated_Image_29fxte29fxte29fx_ymhwqz.png",
    description: "Pure and authentic karpuram and pooja."
  },
  // card 10
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779880203/Gemini_Generated_Image_q9vtnxq9vtnxq9vt_bybyuw.png",
    description: "Pure and authentic karpuram and pooja."
  },
  // card 11
    { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779880656/Gemini_Generated_Image_otvjsbotvjsbotvj_ffi7jc.png",
    description: "Pure and authentic karpuram and pooja."
  },
  
  // card 12
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779880925/Gemini_Generated_Image_xxsef7xxsef7xxse_vfxlie.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 13
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779881114/Gemini_Generated_Image_nu2ryunu2ryunu2r_zavfce.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 14
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779883942/Gemini_Generated_Image_nvo79hnvo79hnvo7_w6jfjr.png",
    description: "Pure and authentic karpuram and pooja."
  },
 // card 15
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779884095/Gemini_Generated_Image_755r9j755r9j755r_dhim3h.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 16
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779884354/Gemini_Generated_Image_mti7ismti7ismti7_dtfnha.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 17
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779884614/Gemini_Generated_Image_b8l683b8l683b8l6_gicerq.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 18
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779884800/Gemini_Generated_Image_hl9ji6hl9ji6hl9j_esitx0.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 19
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779885517/Gemini_Generated_Image_vy3qijvy3qijvy3q_avfpaj.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 20
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779885897/Gemini_Generated_Image_rvop3orvop3orvop_komjdt.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 21
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779886143/Gemini_Generated_Image_p49dobp49dobp49d_ynqtm3.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 22
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779891819/Screenshot_2026-05-27_195318_itwbni.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 23
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779891949/Screenshot_2026-05-27_195535_mzkt6c.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 24
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779892150/Screenshot_2026-05-27_195854_xwbtx0.png",
    description: "Pure and authentic karpuram and pooja."
  },
   // card 25
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779892293/Screenshot_2026-05-27_200119_lis6b0.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 26
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779892552/Screenshot_2026-05-27_200541_ysfsfo.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 27
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779892699/Screenshot_2026-05-27_200805_ckv7xd.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 28
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779892857/Screenshot_2026-05-27_201045_xzkiwt.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 29
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779893047/Screenshot_2026-05-27_201351_o0obg2.png",
    description: "Pure and authentic karpuram and pooja."
  },


  // card 30
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779893177/Screenshot_2026-05-27_201556_uqncp4.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 31
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779893405/Screenshot_2026-05-27_201859_vv5vmf.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 32
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779893512/Screenshot_2026-05-27_202135_mmii7k.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 33
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "retail",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779893659/Screenshot_2026-05-27_202407_c548v9.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 34
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779894114/Screenshot_2026-05-27_203131_frztq5.png",
    description: "Pure and authentic karpuram and pooja."
  },

  // card 35
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779894676/Gemini_Generated_Image_w2ctztw2ctztw2ct_giueki.png",
    description: "Pure and authentic karpuram and pooja."
  },
 
  // card 36
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779895125/Screenshot_2026-05-27_204828_qkamfk.png",
    description: "Pure and authentic karpuram and pooja."
  },
 
  // card 37
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779895500/Gemini_Generated_Image_4f6qcy4f6qcy4f6q_l9so2g.png",
    description: "Pure and authentic karpuram and pooja."
  },
 
  // card 38
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779895787/Screenshot_2026-05-27_205928_ux6gw5.png",
    description: "Pure and authentic karpuram and pooja."
  },
 
  // card 39
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779895893/Screenshot_2026-05-27_210120_iyvwjo.png",
    description: "Pure and authentic karpuram and pooja."
  },
 
  // card 40
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779896026/Screenshot_2026-05-27_210334_fvc3tv.png",
    description: "Pure and authentic karpuram and pooja."
  },
 
  // card 41
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779896519/Gemini_Generated_Image_w4rz1xw4rz1xw4rz_gkkucx.png",
    description: "Pure and authentic karpuram and pooja."
  },
 
  // card 42
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779896626/Gemini_Generated_Image_fiulwqfiulwqfiul_vly84c.png",
    description: "Pure and authentic karpuram and pooja."
  },
 // card 35
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779894676/Gemini_Generated_Image_w2ctztw2ctztw2ct_giueki.png",
    description: "Pure and authentic karpuram and pooja."
  },
 // card 35
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779894676/Gemini_Generated_Image_w2ctztw2ctztw2ct_giueki.png",
    description: "Pure and authentic karpuram and pooja."
  },
 // card 35
   { 
    name: "KUNKUMA ", 
    category: "Kunkum", 
    price: 150, 
    unit: "pack", 
    catalog: "wholesale",
    image: "https://res.cloudinary.com/djuu7sxfw/image/upload/v1779894676/Gemini_Generated_Image_w2ctztw2ctztw2ct_giueki.png",
    description: "Pure and authentic karpuram and pooja."
  },
 

 
];

// Add an ID to each product based on its index
export const wholesaleProducts: Product[] = seed.map((p, i) => ({
  ...p,
  id: `w-${i + 1}`,
})).filter((p) => p.catalog === 'wholesale' || p.catalog === 'both');

export const wholesaleCategories = Array.from(new Set(wholesaleProducts.map((p) => p.category)));