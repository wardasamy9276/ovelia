export type ConcealerStockStatus = "in_stock" | "low_stock" | "out_of_stock";

export interface ConcealerProduct {
  id: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  priceEgp: number;
  oldPriceEgp?: number;
  stock: number;
  minStock: number;
  soldCount: number;
  returnedCount: number;
  createdAt: string; // YYYY-MM-DD للتصفية حسب الشهر والسنة
  shadeNameAr: string;
  shadeNameEn: string;
  shadeHex: string;
  undertoneAr: string;
  undertoneEn: string;
  finishAr: string;
  finishEn: string;
  tagsAr: string[];
  tagsEn: string[];
  aiMatchEnabled: boolean;
  isNew?: boolean;
}

export const CONCEALER_PRESET_TAGS = {
  ar: [
    "مضاد للتكتل",
    "تغطية متوسطة لعالية",
    "درجات أندرتون",
    "إشراقة طبيعية",
    "ثبات 16 ساعة",
    "للهالات والتصبغات",
  ],
  en: [
    "Crease-Proof",
    "Build-Up Coverage",
    "Undertone Shades",
    "Natural Glow",
    "16h Wear",
    "Dark Circles & Spots",
  ],
};

export const INITIAL_CONCEALER_PRODUCTS: ConcealerProduct[] = [
  {
    id: "cnc-1",
    sku: "ORV-CON-03W",
    nameAr: "كونسيلر أورفيليا المخملي للإشراقة",
    nameEn: "Orvelia Velvet Radiant Concealer",
    priceEgp: 690,
    oldPriceEgp: 820,
    stock: 4,
    minStock: 15,
    soldCount: 64,
    returnedCount: 3,
    createdAt: "2026-11-12",
    shadeNameAr: "فانيلا دافئة (03W)",
    shadeNameEn: "Warm Vanilla (03W)",
    shadeHex: "#E8C39E",
    undertoneAr: "دافئ (Warm)",
    undertoneEn: "Warm Undertone",
    finishAr: "ساتان مضيء",
    finishEn: "Luminous Satin",
    tagsAr: ["مضاد للتكتل", "تغطية متوسطة لعالية", "درجات أندرتون"],
    tagsEn: ["Crease-Proof", "Build-Up Coverage", "Undertone Shades"],
    aiMatchEnabled: true,
    isNew: true,
  },
  {
    id: "cnc-2",
    sku: "ORV-CON-05N",
    nameAr: "كونسيلر تصحيح الهالات والتمويه",
    nameEn: "Blur & Brighten Under-Eye Concealer",
    priceEgp: 740,
    stock: 28,
    minStock: 10,
    soldCount: 52,
    returnedCount: 2,
    createdAt: "2026-11-05",
    shadeNameAr: "بيج طبيعي محايد (05N)",
    shadeNameEn: "Neutral Beige (05N)",
    shadeHex: "#DDA97E",
    undertoneAr: "محايد (Neutral)",
    undertoneEn: "Neutral Undertone",
    finishAr: "طبيعي ناعم",
    finishEn: "Soft Natural",
    tagsAr: ["للهالات والتصبغات", "إشراقة طبيعية", "ثبات 16 ساعة"],
    tagsEn: ["Dark Circles & Spots", "Natural Glow", "16h Wear"],
    aiMatchEnabled: true,
  },
  {
    id: "cnc-3",
    sku: "ORV-CON-07C",
    nameAr: "كونسيلر تغطية عالية خفيف الوزن",
    nameEn: "Weightless High-Coverage Concealer",
    priceEgp: 790,
    oldPriceEgp: 890,
    stock: 19,
    minStock: 10,
    soldCount: 41,
    returnedCount: 4,
    createdAt: "2026-10-18",
    shadeNameAr: "عاجي بارد (07C)",
    shadeNameEn: "Cool Ivory (07C)",
    shadeHex: "#F0D1B2",
    undertoneAr: "بارد (Cool)",
    undertoneEn: "Cool Undertone",
    finishAr: "مخفي للمسام",
    finishEn: "Soft Matte Blur",
    tagsAr: ["تغطية متوسطة لعالية", "مضاد للتكتل", "ثبات 16 ساعة"],
    tagsEn: ["Build-Up Coverage", "Crease-Proof", "16h Wear"],
    aiMatchEnabled: true,
  },
  {
    id: "cnc-4",
    sku: "ORV-CON-09G",
    nameAr: "مصحح لون وكراميل دافئ للوجه",
    nameEn: "Golden Caramel Corrector Concealer",
    priceEgp: 650,
    stock: 0,
    minStock: 10,
    soldCount: 29,
    returnedCount: 1,
    createdAt: "2025-09-24",
    shadeNameAr: "كراميل ذهبي (09G)",
    shadeNameEn: "Golden Caramel (09G)",
    shadeHex: "#C58958",
    undertoneAr: "دافئ / ذهبي (Golden)",
    undertoneEn: "Warm / Golden",
    finishAr: "مرن غير متكتل",
    finishEn: "Flexible Finish",
    tagsAr: ["درجات أندرتون", "للهالات والتصبغات", "إشراقة طبيعية"],
    tagsEn: ["Undertone Shades", "Dark Circles & Spots", "Natural Glow"],
    aiMatchEnabled: false,
  },
];