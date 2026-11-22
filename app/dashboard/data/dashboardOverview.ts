export type OrderStatus = "completed" | "processing" | "pending" | "cancelled";

export type MakeupHubSlug =
  | "foundation"
  | "concealer"
  | "eyeliner"
  | "mascara"
  | "blush"
  | "lipstick"
  | "highlighter"
  | "bronzer"
  | "eyeshadow"
  | "primer"
  | "powder"
  | "setting-spray"
  | "lenses"
  | "skincare";

export interface MakeupCategoryItem {
  id: string;
  slug: MakeupHubSlug;
  href: string;
  icon: string;
  accentHex: string;
  arName: string;
  enName: string;
  arDesc: string;
  enDesc: string;
  arTags: string[];
  enTags: string[];
  priceRangeEgp: string;
  stockState: "in_stock" | "low_stock";
}

export interface MakeupHubCard {
  slug: MakeupHubSlug;
  href: string;
  arTitle: string;
  enTitle: string;
  arDesc: string;
  enDesc: string;
  icon: string;
  accentHex: string;
  productsCount: number;
  priceRangeEgp: string;
  arTags: string[];
  enTags: string[];
  arTryOnLabel: string;
  enTryOnLabel: string;
  stockStatus: "healthy" | "low";
}

export interface KpiStat {
  id: string;
  arTitle: string;
  enTitle: string;
  value: string;
  arDelta: string;
  enDelta: string;
  positive: boolean;
  icon: string;
  href: string;
}

export interface MonthlyMetric {
  monthAr: string;
  monthEn: string;
  salesValue: number;
  tryOnSessions: number;
}

export interface DashboardOrderRow {
  id: string;
  customerAr: string;
  customerEn: string;
  email: string;
  productAr: string;
  productEn: string;
  hubSlug: MakeupHubSlug;
  shadeNameAr: string;
  shadeNameEn: string;
  shadeHex: string;
  skinToneAr: string;
  skinToneEn: string;
  quantity: number;
  totalPrice: string;
  status: OrderStatus;
  date: string;
  usedTryOn: boolean;
}

export interface LowStockAlertItem {
  id: string;
  sku: string;
  nameAr: string;
  nameEn: string;
  shadeAr: string;
  shadeEn: string;
  shadeHex: string;
  currentStock: number;
  minThreshold: number;
  href: string;
}

export interface AiTryOnModule {
  id: string;
  arName: string;
  enName: string;
  arDesc: string;
  enDesc: string;
  sessionsCount: number;
  conversionPercent: string;
  active: boolean;
}

export const ALL_MAKEUP_CATEGORIES: MakeupCategoryItem[] = [
  {
    id: "cat-foundation",
    slug: "foundation",
    href: "/dashboard/makeup/foundation",
    icon: "🫙",
    accentHex: "#E8C39E",
    arName: "كريم الأساس (Foundation)",
    enName: "Foundation",
    arDesc: "تغطية متوسطة إلى عالية، أندرتون دافئ وبارد ومحايد، وترطيب يدوم.",
    enDesc: "Medium-to-full coverage, warm/cool/neutral undertones, long hydration.",
    arTags: ["تغطية متوسطة لعالية", "أندرتون", "ثبات طويل"],
    enTags: ["Build-Up Coverage", "Undertones", "Long Wear"],
    priceRangeEgp: "750 - 1150 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-concealer",
    slug: "concealer",
    href: "/dashboard/makeup/concealer",
    icon: "🪄",
    accentHex: "#FBBF24",
    arName: "الكونسيلر ومصححات اللون",
    enName: "Concealer & Correctors",
    arDesc: "إخفاء الهالات والتصبغات، مضاد للتكتل، ودرجات أندرتون دقيقة.",
    enDesc: "Dark circle correction, crease-proof formula, undertone shades.",
    arTags: ["مضاد للتكتل", "للهالات والتصبغات", "إشراقة طبيعية"],
    enTags: ["Crease-Proof", "Dark Circles", "Natural Glow"],
    priceRangeEgp: "650 - 820 ج.م",
    stockState: "low_stock",
  },
  {
    id: "cat-eyeliner",
    slug: "eyeliner",
    href: "/dashboard/makeup/eyeliner",
    icon: "✒️",
    accentHex: "#2DD4BF",
    arName: "الآيلاينر (Eyeliner)",
    enName: "Eyeliner",
    arDesc: "رأس دقيق للرسم الحاد، مقاوم للماء والتلطخ، وثبات حتى 24 ساعة.",
    enDesc: "Precision tip, waterproof & smudge-proof, up to 24h wear.",
    arTags: ["مقاوم للماء", "رأس دقيق", "ثبات 24 ساعة"],
    enTags: ["Waterproof", "Fine Tip", "24h Wear"],
    priceRangeEgp: "420 - 620 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-mascara",
    slug: "mascara",
    href: "/dashboard/makeup/mascara",
    icon: "👁️",
    accentHex: "#06B6D4",
    arName: "الماسكارا (Mascara)",
    enName: "Mascara",
    arDesc: "تكثيف وإطالة ورفع للرموش بدون تكتل أو تساقط طوال اليوم.",
    enDesc: "Volumizing, lengthening & lifting lash formulas with zero flaking.",
    arTags: ["تكثيف وإطالة", "بدون تكتل", "مقاومة للرطوبة"],
    enTags: ["Volume & Length", "Clump-Free", "Humidity Resistant"],
    priceRangeEgp: "480 - 690 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-blush",
    slug: "blush",
    href: "/dashboard/makeup/blush",
    icon: "🌸",
    accentHex: "#E17B8B",
    arName: "البلاشر / أحمر الخدود",
    enName: "Blush",
    arDesc: "درجات وردية وخوخية ومرجانية كريمية وسائلة وبودرة لدمج سلس.",
    enDesc: "Cream, liquid & powder rose, peach and coral shades with easy blend.",
    arTags: ["دمج سلس", "إشراقة خدود", "قوام كريمي"],
    enTags: ["Easy Blend", "Cheek Glow", "Creamy Texture"],
    priceRangeEgp: "490 - 710 ج.م",
    stockState: "low_stock",
  },
  {
    id: "cat-lipstick",
    slug: "lipstick",
    href: "/dashboard/makeup/lipstick",
    icon: "💄",
    accentHex: "#D9536F",
    arName: "أحمر الشفاه والجلوس",
    enName: "Lipstick & Lip Gloss",
    arDesc: "لمسة مخملية مطفية أو لامعة مرطبة، درجات نيود وتوتي وعنابي.",
    enDesc: "Velvet matte or glossy hydrating finishes in nude, berry & crimson.",
    arTags: ["مخملي مرطب", "درجات نيود", "ثبات عالي"],
    enTags: ["Hydrating Matte", "Nude Shades", "High Pigment"],
    priceRangeEgp: "450 - 740 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-highlighter",
    slug: "highlighter",
    href: "/dashboard/makeup/highlighter",
    icon: "✨",
    accentHex: "#FACC15",
    arName: "الهايلايتر (Highlighter)",
    enName: "Highlighter",
    arDesc: "إضاءة لؤلؤية وذهبية وشامبانيا تبرز عظام الخد بدون جليتر خشن.",
    enDesc: "Pearl, gold & champagne luminous glow without chunky glitter.",
    arTags: ["إضاءة شامبانيا", "لمعة ناعمة", "قابل للتعزيز"],
    enTags: ["Champagne Glow", "Soft Sheen", "Buildable"],
    priceRangeEgp: "520 - 760 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-bronzer",
    slug: "bronzer",
    href: "/dashboard/makeup/bronzer",
    icon: "☀️",
    accentHex: "#D97706",
    arName: "البرونزر والكونتور",
    enName: "Bronzer & Contour",
    arDesc: "تدفئة ونحت ملامح الوجه بظلال دافئة ومحايدة طبيعية.",
    enDesc: "Warmth and facial sculpting with natural warm and neutral tones.",
    arTags: ["نحت وتدفئة", "درجات طبيعية", "دمج ناعم"],
    enTags: ["Sculpt & Warm", "Natural Tones", "Seamless Blend"],
    priceRangeEgp: "560 - 790 ج.م",
    stockState: "low_stock",
  },
  {
    id: "cat-eyeshadow",
    slug: "eyeshadow",
    href: "/dashboard/makeup/eyeshadow",
    icon: "🎨",
    accentHex: "#A855F7",
    arName: "ظلال العيون (Eyeshadow)",
    enName: "Eyeshadow Palettes & Singles",
    arDesc: "ألوان مطفية ومعدنية وشيمر غنية الصبغة وسهلة التوزيع والدمج.",
    enDesc: "Richly pigmented matte, metallic & shimmer shades for effortless blending.",
    arTags: ["صبغة غنية", "مطفي وشيمر", "ثبات للجفن"],
    enTags: ["High Pigment", "Matte & Shimmer", "Crease-Resistant"],
    priceRangeEgp: "680 - 1250 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-primer",
    slug: "primer",
    href: "/dashboard/makeup/primer",
    icon: "🫧",
    accentHex: "#38BDF8",
    arName: "البرايمر (Primer)",
    enName: "Primer",
    arDesc: "تمهيد البشرة وتنعيم المسام وتحسين ثبات المكياج قبل البدء.",
    enDesc: "Smooths skin texture, blurs pores, and boosts makeup longevity.",
    arTags: ["تمويه المسام", "تثبيت المكياج", "ترطيب خفيف"],
    enTags: ["Pore Blur", "Grip & Hold", "Light Hydration"],
    priceRangeEgp: "580 - 820 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-powder",
    slug: "powder",
    href: "/dashboard/makeup/powder",
    icon: "❄️",
    accentHex: "#94A3B8",
    arName: "بودرة التثبيت (Setting Powder)",
    enName: "Setting & Finishing Powder",
    arDesc: "تثبيت الكونسيلر والفاونديشن والتحكم في اللمعان الزائد بنعومة.",
    enDesc: "Locks concealer & foundation in place and controls excess shine smoothly.",
    arTags: ["تحكم باللمعان", "ملمس حريري", "تثبيت ناعم"],
    enTags: ["Oil Control", "Silky Finish", "Soft Lock"],
    priceRangeEgp: "540 - 780 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-setting-spray",
    slug: "setting-spray",
    href: "/dashboard/makeup/setting-spray",
    icon: "💦",
    accentHex: "#34D399",
    arName: "مثبت المكياج (Setting Spray)",
    enName: "Makeup Setting Spray",
    arDesc: "رذاذ ناعم يحافظ على نضارة المكياج وثباته لساعات طويلة.",
    enDesc: "Fine mist that locks makeup freshness and wear for hours.",
    arTags: ["رذاذ ناعم", "ثبات لساعات", "انتعاش فوري"],
    enTags: ["Fine Mist", "All-Day Hold", "Fresh Finish"],
    priceRangeEgp: "490 - 720 ج.م",
    stockState: "in_stock",
  },
];

export const MAKEUP_HUB_CARDS: MakeupHubCard[] = [
  {
    slug: "eyeliner",
    href: "/dashboard/makeup/eyeliner",
    arTitle: "الآيلاينر ومحدد العيون",
    enTitle: "Eyeliner & Eye Definers",
    arDesc: "آيلاينر سائل، جل، وقلم ثابت لرسمة دقيقة وتحديد واضح للعين.",
    enDesc: "Liquid, gel, and pencil liners for crisp wings and precise definition.",
    icon: "✒️",
    accentHex: "#2DD4BF",
    productsCount: 19,
    priceRangeEgp: "320 – 680 ج.م",
    arTags: ["مقاوم للماء", "ثبات 24 ساعة", "رأس دقيق", "مناسب للعدسات"],
    enTags: ["Waterproof", "24h Wear", "Fine Tip", "Lens Safe"],
    arTryOnLabel: "تجربة رسمة العين AR",
    enTryOnLabel: "Eye Liner AR Try-On",
    stockStatus: "healthy",
  },
  {
    slug: "concealer",
    href: "/dashboard/makeup/concealer",
    arTitle: "الكونسيلر وتصحيح اللون",
    enTitle: "Concealer & Color Correctors",
    arDesc: "تغطية للهالات والتصبغات بتركيبة خفيفة لا تتكتل تحت العين.",
    enDesc: "Targeted coverage for dark circles and spots with crease-free finish.",
    icon: "🪄",
    accentHex: "#FBBF24",
    productsCount: 23,
    priceRangeEgp: "450 – 890 ج.م",
    arTags: ["تغطية متوسطة لعالية", "مضاد للتكتل", "درجات أندرتون", "إشراقة طبيعية"],
    enTags: ["Build-Up Coverage", "Crease-Proof", "Undertone Shades", "Natural Glow"],
    arTryOnLabel: "مطابقة الدرجة بالذكاء الاصطناعي",
    enTryOnLabel: "AI Shade Match",
    stockStatus: "low",
  },
  {
    slug: "blush",
    href: "/dashboard/makeup/blush",
    arTitle: "أحمر الخدود (البلاشر)",
    enTitle: "Blush & Cheek Tints",
    arDesc: "بلاشر كريمي، سائل، وبودرة يمنح الوجنتين تورداً طبيعياً متناغماً.",
    enDesc: "Cream, liquid, and powder blushes for a seamless flush of color.",
    icon: "🌸",
    accentHex: "#E17B8B",
    productsCount: 28,
    priceRangeEgp: "390 – 750 ج.م",
    arTags: ["قوام كريمي", "سهل الدمج", "درجات وردية وخوخية", "Blush AR"],
    enTags: ["Cream Texture", "Easy Blend", "Rose & Peach", "Blush AR"],
    arTryOnLabel: "تجربة البلاشر الافتراضية",
    enTryOnLabel: "Blush AR Try-On",
    stockStatus: "low",
  },
  {
    slug: "lipstick",
    href: "/dashboard/makeup/lipstick",
    arTitle: "أحمر الشفاه والمرطبات",
    enTitle: "Lipstick, Gloss & Tints",
    arDesc: "ألوان ساتان، مطفي مخملي، وتينت مرطب للشفاه طوال اليوم.",
    enDesc: "Satin, soft matte, and hydrating lip tints with rich pigment.",
    icon: "💄",
    accentHex: "#D9536F",
    productsCount: 34,
    priceRangeEgp: "350 – 790 ج.م",
    arTags: ["مخملي غير مجفف", "ثبات عالي", "مرطب للشفاه", "Lip AR"],
    enTags: ["Velvet Matte", "Longwear", "Lip Hydrating", "Lip AR"],
    arTryOnLabel: "تجربة درجات الشفاه AR",
    enTryOnLabel: "Lip Shades AR",
    stockStatus: "healthy",
  },
  {
    slug: "lenses",
    href: "/dashboard/makeup/lenses",
    arTitle: "العدسات اللاصقة والرموش",
    enTitle: "Color Lenses & Lashes",
    arDesc: "عدسات ملونة يومية وشهرية ورموش خفيفة بتصميم مريح للعين.",
    enDesc: "Daily and monthly color lenses plus lightweight lashes for comfort.",
    icon: "👁️",
    accentHex: "#38BDF8",
    productsCount: 18,
    priceRangeEgp: "480 – 950 ج.م",
    arTags: ["ترطيب عالي", "ألوان طبيعية", "مريح للعين", "Eyes AR"],
    enTags: ["High Moisture", "Natural Iris", "All-Day Comfort", "Eyes AR"],
    arTryOnLabel: "تجربة العدسات والعيون AR",
    enTryOnLabel: "Lens & Eye AR",
    stockStatus: "low",
  },
  {
    slug: "skincare",
    href: "/dashboard/makeup/skincare",
    arTitle: "تحضير البشرة والعناية",
    enTitle: "Skin Prep & Skincare",
    arDesc: "سيروم، برايمر، ومرطبات تجهّز البشرة قبل المكياج وتحافظ عليها.",
    enDesc: "Serums, primers, and moisturizers that prep skin for makeup and care.",
    icon: "💧",
    accentHex: "#34D399",
    productsCount: 22,
    priceRangeEgp: "520 – 1,150 ج.م",
    arTags: ["قبل المكياج", "ترطيب عميق", "بشرة مختلطة وحساسة", "Skin AI"],
    enTags: ["Makeup Prep", "Deep Hydration", "Combo & Sensitive", "Skin AI"],
    arTryOnLabel: "تحليل البشرة بالذكاء الاصطناعي",
    enTryOnLabel: "AI Skin Analysis",
    stockStatus: "healthy",
  },
];

export const OVERVIEW_KPIS: KpiStat[] = [
  {
    id: "revenue",
    arTitle: "إجمالي مبيعات الشهر",
    enTitle: "Monthly Revenue",
    value: "284,500 ج.م",
    arDelta: "+16.4% مقارنة بالشهر السابق",
    enDelta: "+16.4% vs last month",
    positive: true,
    icon: "💎",
    href: "/dashboard/analytics",
  },
  {
    id: "products",
    arTitle: "إجمالي منتجات الميك أب والعناية",
    enTitle: "Total Catalog Products",
    value: "144 منتج",
    arDelta: "6 أقسام رئيسية + درجات متعددة",
    enDelta: "6 core hubs + multi-shade SKUs",
    positive: true,
    icon: "✨",
    href: "/dashboard/makeup/eyeliner",
  },
  {
    id: "orders",
    arTitle: "الطلبات النشطة",
    enTitle: "Active Orders",
    value: "412 طلب",
    arDelta: "29 طلب قيد التجهيز اليوم",
    enDelta: "29 orders processing today",
    positive: true,
    icon: "🛍️",
    href: "/dashboard/orders",
  },
  {
    id: "lowStock",
    arTitle: "درجات ومنتجات منخفضة المخزون",
    enTitle: "Low Stock Alerts",
    value: "4 أصناف",
    arDelta: "تحتاج مراجعة وتوريد سريع",
    enDelta: "Needs stock review & restock",
    positive: false,
    icon: "⚠️",
    href: "/dashboard/makeup/concealer",
  },
];

export const MONTHLY_METRICS: MonthlyMetric[] = [
  { monthAr: "يونيو", monthEn: "Jun", salesValue: 165, tryOnSessions: 7400 },
  { monthAr: "يوليو", monthEn: "Jul", salesValue: 192, tryOnSessions: 8900 },
  { monthAr: "أغسطس", monthEn: "Aug", salesValue: 210, tryOnSessions: 10200 },
  { monthAr: "سبتمبر", monthEn: "Sep", salesValue: 238, tryOnSessions: 11850 },
  { monthAr: "أكتوبر", monthEn: "Oct", salesValue: 244, tryOnSessions: 12900 },
  { monthAr: "نوفمبر", monthEn: "Nov", salesValue: 284.5, tryOnSessions: 14680 },
];

export const DASHBOARD_ORDERS: DashboardOrderRow[] = [
  {
    id: "ORV-8841",
    customerAr: "سارة محمود عبد الله",
    customerEn: "Sara Mahmoud",
    email: "sara.m@example.com",
    productAr: "آيلاينر سائل أسود فاحم ووتر بروف",
    productEn: "Waterproof Jet Liquid Eyeliner",
    hubSlug: "eyeliner",
    shadeNameAr: "أسود فاحم (01)",
    shadeNameEn: "Jet Black (01)",
    shadeHex: "#111827",
    skinToneAr: "مناسب لجميع العيون",
    skinToneEn: "All Eye Shapes",
    quantity: 2,
    totalPrice: "960 ج.م",
    status: "processing",
    date: "2026-11-22",
    usedTryOn: true,
  },
  {
    id: "ORV-8840",
    customerAr: "نور هشام منصور",
    customerEn: "Nour Hesham",
    email: "nour.h@example.com",
    productAr: "كونسيلر إشراقة وتغطية متوسطة",
    productEn: "Radiant Crease-Proof Concealer",
    hubSlug: "concealer",
    shadeNameAr: "فانيلا دافئة (03W)",
    shadeNameEn: "Warm Vanilla (03W)",
    shadeHex: "#E8C39E",
    skinToneAr: "فاتح إلى متوسط (أندرتون دافئ)",
    skinToneEn: "Light-Medium (Warm Undertone)",
    quantity: 1,
    totalPrice: "690 ج.م",
    status: "completed",
    date: "2026-11-21",
    usedTryOn: true,
  },
  {
    id: "ORV-8839",
    customerAr: "مريم طارق إبراهيم",
    customerEn: "Mariam Tarek",
    email: "mariam.t@example.com",
    productAr: "بلاشر كريمي مخملي أورفيليا",
    productEn: "Orvelia Velvet Cream Blush",
    hubSlug: "blush",
    shadeNameAr: "وردي مخملي (02)",
    shadeNameEn: "Velvet Rose (02)",
    shadeHex: "#E17B8B",
    skinToneAr: "فاتح إلى متوسط (محايد)",
    skinToneEn: "Light to Medium (Neutral)",
    quantity: 2,
    totalPrice: "1,300 ج.م",
    status: "pending",
    date: "2026-11-21",
    usedTryOn: true,
  },
  {
    id: "ORV-8838",
    customerAr: "ياسمين عادل كمال",
    customerEn: "Yasmin Adel",
    email: "yasmin.a@example.com",
    productAr: "أحمر شفاه ساتان طويل الثبات",
    productEn: "Longwear Satin Lip Tint",
    hubSlug: "lipstick",
    shadeNameAr: "توتي دافئ (07)",
    shadeNameEn: "Warm Berry (07)",
    shadeHex: "#B83B5E",
    skinToneAr: "متوسط إلى قمحي (دافئ)",
    skinToneEn: "Medium to Tan (Warm)",
    quantity: 3,
    totalPrice: "1,740 ج.م",
    status: "completed",
    date: "2026-11-20",
    usedTryOn: true,
  },
  {
    id: "ORV-8837",
    customerAr: "دينا كريم حسن",
    customerEn: "Dina Karim",
    email: "dina.k@example.com",
    productAr: "برايمر وترطيب ما قبل المكياج",
    productEn: "Hydrating Makeup Prep Primer",
    hubSlug: "skincare",
    shadeNameAr: "تركيبة ناعمة (40ml)",
    shadeNameEn: "Smooth Base (40ml)",
    shadeHex: "#34D399",
    skinToneAr: "بشرة مختلطة وجافة",
    skinToneEn: "Combination & Dry Skin",
    quantity: 1,
    totalPrice: "780 ج.م",
    status: "cancelled",
    date: "2026-11-19",
    usedTryOn: false,
  },
];

export const LOW_STOCK_ALERTS: LowStockAlertItem[] = [
  {
    id: "STK-1",
    sku: "ORV-CON-03W",
    nameAr: "كونسيلر إشراقة وتغطية متوسطة",
    nameEn: "Radiant Crease-Proof Concealer",
    shadeAr: "فانيلا دافئة (03W)",
    shadeEn: "Warm Vanilla (03W)",
    shadeHex: "#E8C39E",
    currentStock: 4,
    minThreshold: 15,
    href: "/dashboard/makeup/concealer",
  },
  {
    id: "STK-2",
    sku: "ORV-BLS-02",
    nameAr: "بلاشر كريمي مخملي",
    nameEn: "Velvet Cream Blush",
    shadeAr: "وردي مخملي (02)",
    shadeEn: "Velvet Rose (02)",
    shadeHex: "#E17B8B",
    currentStock: 5,
    minThreshold: 15,
    href: "/dashboard/makeup/blush",
  },
  {
    id: "STK-3",
    sku: "ORV-LNS-05",
    nameAr: "عدسات لاصقة شهرية",
    nameEn: "Monthly Color Lenses",
    shadeAr: "عسلي دافئ",
    shadeEn: "Warm Hazel",
    shadeHex: "#B47B44",
    currentStock: 3,
    minThreshold: 12,
    href: "/dashboard/makeup/lenses",
  },
];

export const INITIAL_AI_MODULES: AiTryOnModule[] = [
  {
    id: "liner-lens-ar",
    arName: "تجربة الآيلاينر والعدسات (AR)",
    enName: "Eyeliner & Lenses AR",
    arDesc: "معاينة رسمة الآيلاينر والعدسات مباشرة على العين.",
    enDesc: "Live preview of eyeliner strokes and lenses on eyes.",
    sessionsCount: 5420,
    conversionPercent: "14.8%",
    active: true,
  },
  {
    id: "concealer-match",
    arName: "مطابقة درجة الكونسيلر (AI)",
    enName: "AI Concealer Shade Match",
    arDesc: "ترشيح درجة الكونسيلر والأندرتون الأنسب للبشرة.",
    enDesc: "Recommends matching concealer shade & undertone.",
    sessionsCount: 4890,
    conversionPercent: "16.1%",
    active: true,
  },
  {
    id: "blush-lip-ar",
    arName: "تجربة البلاشر والشفاه (AR)",
    enName: "Blush & Lip Try-On AR",
    arDesc: "تجربة الدرجات اللونية للوجنتين والشفاه بإضاءة واقعية.",
    enDesc: "Realistic lighting try-on for cheek & lip shades.",
    sessionsCount: 4370,
    conversionPercent: "13.2%",
    active: true,
  },
];