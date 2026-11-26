"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import BeautyLookFinder from "./BeautyLookFinder";
import BeautyShadeReviews from "./BeautyShadeReviews"

type BeautyPillarSlug =
  | "all"
  | "face"
  | "eyes"
  | "lips"
  | "cheeks"
  | "skincare";

type SkinUndertone = "warm" | "neutral" | "cool";

interface BeautyShade {
  code: string;
  nameAr: string;
  nameEn: string;
  hex: string;
  undertone: SkinUndertone;
}

interface BeautyProduct {
  id: string;
  pillar: Exclude<BeautyPillarSlug, "all">;
  categoryAr: string;
  categoryEn: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  priceEgp: number;
  oldPriceEgp?: number;
  rating: number;
  reviewsCount: number;
  icon: string;
  accentHex: string;
  badgeAr?: string;
  badgeEn?: string;
  tagsAr: string[];
  tagsEn: string[];
  shades: BeautyShade[];
  tryOnTypeAr: string;
  tryOnTypeEn: string;
}

const BEAUTY_PILLARS: {
  slug: BeautyPillarSlug;
  ar: string;
  en: string;
  icon: string;
}[] = [
  { slug: "all", ar: "كل عوالم الجمال", en: "All Beauty Worlds", icon: "✨" },
  { slug: "face", ar: "الأساس والكونسيلر", en: "Face & Concealer", icon: "🪄" },
  { slug: "eyes", ar: "العيون والحواجب", en: "Eyes & Brows", icon: "👁️" },
  { slug: "lips", ar: "الشفاه والمرطبات", en: "Lips & Velvet", icon: "💄" },
  { slug: "cheeks", ar: "الخدود والإضاءة", en: "Cheeks & Glow", icon: "🌸" },
  { slug: "skincare", ar: "تحضير البشرة", en: "Skin Prep & Care", icon: "💧" },
];

const BEAUTY_TAGS = {
  ar: [
    "إشراقة طبيعية",
    "مضاد للتكتل",
    "ثبات 24 ساعة",
    "مقاوم للماء",
    "درجات أندرتون",
    "مخملي غير مجفف",
    "تجربة AR فورية",
  ],
  en: [
    "Natural Glow",
    "Crease-Proof",
    "24h Wear",
    "Waterproof",
    "Undertone Shades",
    "Velvet Non-Drying",
    "Instant AR Try-On",
  ],
};

const BEAUTY_COLLECTION: BeautyProduct[] = [
  {
    id: "prod-concealer",
    pillar: "face",
    categoryAr: "الكونسيلر وتصحيح اللون",
    categoryEn: "Concealer & Correctors",
    titleAr: "كونسيلر أورفيليا المخملي للإشراقة",
    titleEn: "Orvelia Velvet Radiant Concealer",
    subtitleAr:
      "تغطية مرنة للهالات والتصبغات بدون تكتل تحت العين مع درجات أندرتون متوازنة.",
    subtitleEn:
      "Flexible crease-proof coverage for dark circles with balanced undertone shades.",
    priceEgp: 690,
    oldPriceEgp: 820,
    rating: 4.9,
    reviewsCount: 318,
    icon: "🪄",
    accentHex: "#FBBF24",
    badgeAr: "الأكثر مبيعاً",
    badgeEn: "Best Seller",
    tagsAr: ["مضاد للتكتل", "إشراقة طبيعية", "درجات أندرتون", "تجربة AR فورية"],
    tagsEn: [
      "Crease-Proof",
      "Natural Glow",
      "Undertone Shades",
      "Instant AR Try-On",
    ],
    shades: [
      { code: "03W", nameAr: "فانيلا دافئة", nameEn: "Warm Vanilla", hex: "#E8C39E", undertone: "warm" },
      { code: "05N", nameAr: "بيج محايد", nameEn: "Neutral Beige", hex: "#DDA97E", undertone: "neutral" },
      { code: "07C", nameAr: "عاجي بارد", nameEn: "Cool Ivory", hex: "#F0D1B2", undertone: "cool" },
    ],
    tryOnTypeAr: "تغطية تحت العين والإشراقة",
    tryOnTypeEn: "Under-Eye Brightening & Match",
  },
  {
    id: "prod-lipstick",
    pillar: "lips",
    categoryAr: "أحمر الشفاه والمرطبات",
    categoryEn: "Lipstick & Lip Velvet",
    titleAr: "أحمر شفاه مخملي وساتان مرطب",
    titleEn: "Velvet Matte & Satin Hydrating Lipstick",
    subtitleAr:
      "ألوان غنية من النيود الدافئ إلى التوتي العميق بتركيبة ناعمة غير مجففة للشفاه.",
    subtitleEn:
      "Rich pigments from warm nude to deep berry with hydrating all-day comfort.",
    priceEgp: 580,
    oldPriceEgp: 690,
    rating: 4.8,
    reviewsCount: 274,
    icon: "💄",
    accentHex: "#E11D48",
    badgeAr: "جديد",
    badgeEn: "NEW",
    tagsAr: ["مخملي غير مجفف", "درجات أندرتون", "إشراقة طبيعية", "تجربة AR فورية"],
    tagsEn: [
      "Velvet Non-Drying",
      "Undertone Shades",
      "Natural Glow",
      "Instant AR Try-On",
    ],
    shades: [
      { code: "L01", nameAr: "نيود روز دافئ", nameEn: "Warm Nude Rose", hex: "#C97A7E", undertone: "warm" },
      { code: "L04", nameAr: "توتي مخملي", nameEn: "Velvet Berry", hex: "#9E2A4B", undertone: "cool" },
      { code: "L08", nameAr: "كراميل ناعم", nameEn: "Soft Caramel", hex: "#D4886A", undertone: "neutral" },
    ],
    tryOnTypeAr: "تلوين الشفاه المباشر",
    tryOnTypeEn: "Live Lip Color Try-On",
  },
  {
    id: "prod-eyeliner",
    pillar: "eyes",
    categoryAr: "الآيلاينر ومحدد العيون",
    categoryEn: "Eyeliner & Eye Art",
    titleAr: "آيلاينر سائل دقيق مقاوم للماء 24 ساعة",
    titleEn: "24h Waterproof Precision Liquid Eyeliner",
    subtitleAr:
      "رأس فائق الدقة لرسمة عين انسيابية حادة مقاومة للماء والتلطخ طوال اليوم.",
    subtitleEn:
      "Ultra-fine tip for effortless waterproof, smudge-proof winged looks.",
    priceEgp: 520,
    rating: 4.9,
    reviewsCount: 412,
    icon: "✒️",
    accentHex: "#2DD4BF",
    tagsAr: ["مقاوم للماء", "ثبات 24 ساعة", "تجربة AR فورية"],
    tagsEn: ["Waterproof", "24h Wear", "Instant AR Try-On"],
    shades: [
      { code: "E01", nameAr: "أسود فاحم", nameEn: "Jet Black", hex: "#111827", undertone: "neutral" },
      { code: "E02", nameAr: "بني إسبرسو", nameEn: "Espresso Brown", hex: "#3E2723", undertone: "warm" },
    ],
    tryOnTypeAr: "رسمة الآيلاينر والعيون",
    tryOnTypeEn: "Winged Liner & Eye Definition",
  },
  {
    id: "prod-mascara",
    pillar: "eyes",
    categoryAr: "الماسكارا والرموش",
    categoryEn: "Mascara & Lashes",
    titleAr: "ماسكارا تكثيف ورفع الرموش الفائقة",
    titleEn: "Ultra Volume & Lift Lash Mascara",
    subtitleAr:
      "تمنح الرموش كثافة مضاعفة وطولاً جذاباً من أول تمريرة بدون أي تكتل.",
    subtitleEn:
      "Delivers dramatic volume and curl from the first coat with zero clumps.",
    priceEgp: 560,
    rating: 4.7,
    reviewsCount: 195,
    icon: "👁️",
    accentHex: "#06B6D4",
    tagsAr: ["مقاوم للماء", "مضاد للتكتل", "ثبات 24 ساعة"],
    tagsEn: ["Waterproof", "Crease-Proof", "24h Wear"],
    shades: [
      { code: "M01", nameAr: "أسود ليلي", nameEn: "Midnight Black", hex: "#0F172A", undertone: "cool" },
      { code: "M02", nameAr: "بني دافئ", nameEn: "Warm Brown", hex: "#4A2C2A", undertone: "warm" },
    ],
    tryOnTypeAr: "كثافة وطول الرموش",
    tryOnTypeEn: "Lash Volume & Lift Effect",
  },
  {
    id: "prod-blush",
    pillar: "cheeks",
    categoryAr: "البلاشر والهايلايتر",
    categoryEn: "Blush & Highlighter",
    titleAr: "بلاشر كريمي مخملي + إضاءة لؤلؤية",
    titleEn: "Velvet Cream Blush & Pearl Glow",
    subtitleAr:
      "تورّد طبيعي يندمج بنعومة على الوجنتين مع لمسة إشراقة ذهبية دافئة.",
    subtitleEn:
      "Natural flush that melts seamlessly onto cheeks with a soft golden sheen.",
    priceEgp: 610,
    oldPriceEgp: 720,
    rating: 4.9,
    reviewsCount: 356,
    icon: "🌸",
    accentHex: "#FB7185",
    badgeAr: "تورّد طبيعي",
    badgeEn: "Natural Flush",
    tagsAr: ["إشراقة طبيعية", "مضاد للتكتل", "تجربة AR فورية"],
    tagsEn: ["Natural Glow", "Crease-Proof", "Instant AR Try-On"],
    shades: [
      { code: "B01", nameAr: "وردي ناعم", nameEn: "Soft Rose", hex: "#E17B8B", undertone: "cool" },
      { code: "B03", nameAr: "خوخي مشرق", nameEn: "Radiant Peach", hex: "#F29B7E", undertone: "warm" },
      { code: "H01", nameAr: "شامبانيا ذهبي", nameEn: "Champagne Gold", hex: "#F6D365", undertone: "neutral" },
    ],
    tryOnTypeAr: "تورّد الوجنتين والإضاءة",
    tryOnTypeEn: "Cheek Flush & Luminosity",
  },
  {
    id: "prod-skincare",
    pillar: "skincare",
    categoryAr: "تحضير البشرة والعناية",
    categoryEn: "Skin Prep & Care",
    titleAr: "سيروم وبرايمر الترطيب وتنعيم المسام",
    titleEn: "Hydrating Pore-Blurring Prep Primer",
    subtitleAr:
      "يهيّئ البشرة قبل المكياج بترطيب عميق وملمس حريري يضاعف ثبات الإطلالة.",
    subtitleEn:
      "Preps skin before makeup with deep hydration and a silky, long-wear base.",
    priceEgp: 780,
    rating: 4.8,
    reviewsCount: 229,
    icon: "💧",
    accentHex: "#34D399",
    tagsAr: ["إشراقة طبيعية", "مضاد للتكتل", "ثبات 24 ساعة"],
    tagsEn: ["Natural Glow", "Crease-Proof", "24h Wear"],
    shades: [
      { code: "S01", nameAr: "ترطيب شفاف", nameEn: "Clear Hydration", hex: "#34D399", undertone: "neutral" },
      { code: "S02", nameAr: "إشراقة لؤلؤية", nameEn: "Pearl Radiance", hex: "#FDE68A", undertone: "warm" },
    ],
    tryOnTypeAr: "نعومة وترطيب البشرة",
    tryOnTypeEn: "Skin Smoothness & Glow",
  },
];

export default function DiscoverBeautyPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);
  const [selectedPillar, setSelectedPillar] = useState<BeautyPillarSlug>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [selectedUndertone, setSelectedUndertone] = useState<
    "all" | SkinUndertone
  >("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Selected shade per product
  const [selectedShadeMap, setSelectedShadeMap] = useState<
    Record<string, string>
  >({});

  // Wishlist & Bag states
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [bagItems, setBagItems] = useState<
    { key: string; product: BeautyProduct; shade: BeautyShade; qty: number }[]
  >([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Virtual Studio Preview Modal
  const [studioProduct, setStudioProduct] = useState<BeautyProduct | null>(
    null
  );
  const [studioIntensity, setStudioIntensity] = useState<number>(75);
  const [toastMessage, setToastMessage] = useState<string>("");

  useEffect(() => {
    const syncTheme = () => {
      const saved = localStorage.getItem("orvelia-theme");
      if (saved === "dark" || saved === "light") {
        setIsDark(saved === "dark");
      } else {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? "" : prev));
    }, 3000);
  };

  const toggleWishlist = (product: BeautyProduct) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      const next = exists
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id];
      showToast(
        exists
          ? isArabic
            ? `تمت إزالة "${product.titleAr}" من المفضلة`
            : `Removed "${product.titleEn}" from wishlist`
          : isArabic
          ? `تمت إضافة "${product.titleAr}" للمفضلة ♥`
          : `Saved "${product.titleEn}" to wishlist ♥`
      );
      return next;
    });
  };

  const addToBag = (product: BeautyProduct, shade: BeautyShade) => {
    const key = `${product.id}-${shade.code}`;
    setBagItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { key, product, shade, qty: 1 }];
    });

    showToast(
      isArabic
        ? `تمت إضافة "${product.titleAr}" (${shade.nameAr}) إلى حقيبة الجمال`
        : `Added "${product.titleEn}" (${shade.nameEn}) to beauty bag`
    );
  };

  const updateBagQty = (key: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const totalBagCount = useMemo(
    () => bagItems.reduce((sum, item) => sum + item.qty, 0),
    [bagItems]
  );

  const totalBagPrice = useMemo(
    () =>
      bagItems.reduce(
        (sum, item) => sum + item.product.priceEgp * item.qty,
        0
      ),
    [bagItems]
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return BEAUTY_COLLECTION.filter((item) => {
      if (selectedPillar !== "all" && item.pillar !== selectedPillar) {
        return false;
      }

      if (selectedTag !== "all") {
        const hasTag =
          item.tagsAr.includes(selectedTag) || item.tagsEn.includes(selectedTag);
        if (!hasTag) return false;
      }

      if (selectedUndertone !== "all") {
        const hasTone = item.shades.some(
          (sh) => sh.undertone === selectedUndertone
        );
        if (!hasTone) return false;
      }

      if (!q) return true;

      return (
        item.titleAr.toLowerCase().includes(q) ||
        item.titleEn.toLowerCase().includes(q) ||
        item.categoryAr.toLowerCase().includes(q) ||
        item.categoryEn.toLowerCase().includes(q) ||
        item.subtitleAr.toLowerCase().includes(q) ||
        item.subtitleEn.toLowerCase().includes(q) ||
        item.tagsAr.some((t) => t.toLowerCase().includes(q)) ||
        item.shades.some(
          (s) =>
            s.nameAr.toLowerCase().includes(q) ||
            s.nameEn.toLowerCase().includes(q)
        )
      );
    });
  }, [searchQuery, selectedPillar, selectedTag, selectedUndertone]);

  const tagList = isArabic ? BEAUTY_TAGS.ar : BEAUTY_TAGS.en;

  const pageBg = isDark
    ? "bg-[#040710] text-white"
    : "bg-slate-50 text-slate-900";

  const cardSurface = isDark
    ? "bg-[#0a101f]/95 border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";

  const subSurface = isDark
    ? "bg-[#060a14] border-white/10"
    : "bg-slate-100/80 border-slate-200";

  const muted = isDark ? "text-slate-400" : "text-slate-600";

  const activeStudioShade = useMemo(() => {
    if (!studioProduct) return null;
    const code =
      selectedShadeMap[studioProduct.id] || studioProduct.shades[0]?.code;
    return (
      studioProduct.shades.find((s) => s.code === code) ||
      studioProduct.shades[0]
    );
  }, [selectedShadeMap, studioProduct]);

  return (
    <div dir={dir} className={`min-h-screen transition-colors ${pageBg}`}>
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-5 start-5 z-50 rounded-2xl border border-amber-400/40 bg-[#0b1222] px-4 py-3 text-xs font-extrabold text-amber-300 shadow-2xl sm:text-sm">
          ✨ {toastMessage}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 18% 20%, rgba(217, 167, 74, 0.25), transparent 45%), radial-gradient(circle at 82% 28%, rgba(16, 185, 129, 0.20), transparent 45%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-4 py-1.5 text-xs font-extrabold tracking-wide text-amber-300">
              <span>✨</span>
              <span>
                {isArabic
                  ? "عالم أورفيليا للجمال والواقع المعزز"
                  : "ORVELIA AR & AI BEAUTY WORLD"}
              </span>
            </span>

            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {isArabic ? (
                <>
                  اكتشفي{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    عالم الجمال
                  </span>{" "}
                  المصمم لإشراقتك
                </>
              ) : (
                <>
                  Discover the{" "}
                  <span className="bg-gradient-to-r from-amber-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    World of Beauty
                  </span>{" "}
                  Crafted for Your Glow
                </>
              )}
            </h1>

            <p className={`mt-4 text-sm leading-relaxed sm:text-lg ${muted}`}>
              {isArabic
                ? "استكشفي تشكيلة أورفيليا الفاخرة من الكونسيلر، أحمر الشفاه، الآيلاينر، الماسكارا، البلاشر، وتحضير البشرة — واختاري درجتك المثالية بتجربة تفاعلية ذكية."
                : "Explore Orvelia’s luxury concealers, lipsticks, eyeliners, mascaras, blushes, and skin prep — find your exact shade with our interactive beauty studio."}
            </p>

            {/* Consumer Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#beauty-showcase"
                className="rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 px-6 py-3 text-sm font-extrabold text-slate-950 shadow-lg transition hover:opacity-95"
              >
                {isArabic ? "استكشفي المجموعة الآن" : "Explore Collection"}
              </a>

              <button
                type="button"
                onClick={() => setStudioProduct(BEAUTY_COLLECTION[0])}
                className={`rounded-2xl border px-6 py-3 text-sm font-bold transition ${
                  isDark
                    ? "border-cyan-400/40 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20"
                    : "border-cyan-600/30 bg-cyan-50 text-cyan-800 hover:bg-cyan-100"
                }`}
              >
                🪞{" "}
                {isArabic
                  ? "افتحي استوديو تجربة الدرجات"
                  : "Open Virtual Shade Studio"}
              </button>

              <button
                type="button"
                onClick={() => setIsBagOpen(true)}
                className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-bold transition ${
                  isDark
                    ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                    : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
                }`}
              >
                <span>🛍️</span>
                <span>{isArabic ? "حقيبة الجمال" : "Beauty Bag"}</span>
                <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-black text-slate-950">
                  {totalBagCount}
                </span>
              </button>
            </div>
          </div>

          {/* Interactive Undertone Finder Strip */}
          <div className={`mt-12 rounded-2xl border p-5 ${cardSurface}`}>
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-base font-extrabold">
                  {isArabic
                    ? "🎯 اختاري أندرتون بشرتك لترشيح الدرجات الأنسب لكِ فوراً"
                    : "🎯 Pick Your Skin Undertone for Instant Shade Recommendations"}
                </h2>
                <p className={`mt-1 text-xs ${muted}`}>
                  {isArabic
                    ? "حددي طبيعة بشرتك (دافئة، محايدة، أو باردة) لإظهار الدرجات المتناغمة معك."
                    : "Filter shades tailored to warm, neutral, or cool skin undertones."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    key: "all" as const,
                    ar: "كل الدرجات",
                    en: "All Undertones",
                    dot: "#34D399",
                  },
                  {
                    key: "warm" as const,
                    ar: "أندرتون دافئ (Warm)",
                    en: "Warm Undertone",
                    dot: "#E8C39E",
                  },
                  {
                    key: "neutral" as const,
                    ar: "أندرتون محايد (Neutral)",
                    en: "Neutral Undertone",
                    dot: "#DDA97E",
                  },
                  {
                    key: "cool" as const,
                    ar: "أندرتون بارد (Cool)",
                    en: "Cool Undertone",
                    dot: "#F0D1B2",
                  },
                ].map((tone) => {
                  const active = selectedUndertone === tone.key;
                  return (
                    <button
                      key={tone.key}
                      type="button"
                      onClick={() => setSelectedUndertone(tone.key)}
                      className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition ${
                        active
                          ? "border-amber-400 bg-amber-500/20 text-amber-300"
                          : isDark
                          ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                          : "border-slate-200 bg-slate-50 text-slate-700"
                      }`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-white/30"
                        style={{ backgroundColor: tone.dot }}
                      />
                      <span>{isArabic ? tone.ar : tone.en}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Beauty Showcase */}
      <main
        id="beauty-showcase"
        className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8"
      >
        {/* Category Pillars & Search */}
        <div className={`rounded-2xl border p-5 ${cardSurface}`}>
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {BEAUTY_PILLARS.map((pillar) => {
                const active = selectedPillar === pillar.slug;
                return (
                  <button
                    key={pillar.slug}
                    type="button"
                    onClick={() => setSelectedPillar(pillar.slug)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-extrabold transition sm:text-sm ${
                      active
                        ? "border-amber-400 bg-gradient-to-r from-amber-400/20 to-emerald-400/20 text-amber-300"
                        : isDark
                        ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{pillar.icon}</span>
                    <span>{isArabic ? pillar.ar : pillar.en}</span>
                  </button>
                );
              })}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isArabic
                  ? "ابحثي عن منتج، درجة لون، أو ميزة..."
                  : "Search product, shade, or feature..."
              }
              className={`w-full rounded-xl border px-4 py-2.5 text-xs sm:text-sm lg:w-72 outline-none ${
                isDark
                  ? "border-white/15 bg-[#060a14] text-white placeholder:text-slate-500 focus:border-amber-400"
                  : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500"
              }`}
            />
          </div>

          {/* Tags Filter */}
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => setSelectedTag("all")}
              className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
                selectedTag === "all"
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                  : isDark
                  ? "border-white/10 text-slate-400 hover:text-white"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              {isArabic ? "كل التاجات" : "All Tags"}
            </button>

            {tagList.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(active ? "all" : tag)}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                    active
                      ? "border-amber-400 bg-amber-500/20 text-amber-300"
                      : isDark
                      ? "border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/40"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className={`rounded-2xl border p-12 text-center ${cardSurface}`}>
            <p className="text-base font-bold">
              {isArabic
                ? "لا توجد منتجات مطابقة لاختياراتك الحالية."
                : "No beauty items match your current selection."}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedPillar("all");
                setSelectedTag("all");
                setSelectedUndertone("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl bg-amber-400 px-5 py-2 text-xs font-extrabold text-slate-950"
            >
              {isArabic ? "عرض كل المنتجات" : "Show All Products"}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((item) => {
              const currentShadeCode =
                selectedShadeMap[item.id] || item.shades[0]?.code;
              const currentShade =
                item.shades.find((s) => s.code === currentShadeCode) ||
                item.shades[0];
              const isWished = wishlistIds.includes(item.id);

              return (
                <article
                  key={item.id}
                  className={`flex flex-col justify-between rounded-2xl border p-5 transition-all hover:-translate-y-1 ${cardSurface} hover:border-amber-400/40`}
                >
                  <div>
                    {/* Top Row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border text-2xl"
                          style={{
                            borderColor: `${item.accentHex}55`,
                            backgroundColor: `${item.accentHex}18`,
                          }}
                        >
                          {item.icon}
                        </span>
                        <div>
                          <span className="text-[11px] font-bold text-emerald-400">
                            {isArabic ? item.categoryAr : item.categoryEn}
                          </span>
                          <h3 className="text-base font-extrabold leading-snug">
                            {isArabic ? item.titleAr : item.titleEn}
                          </h3>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleWishlist(item)}
                        aria-label="Wishlist"
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-base transition ${
                          isWished
                            ? "border-rose-400 bg-rose-500/20 text-rose-400"
                            : isDark
                            ? "border-white/10 bg-white/5 text-slate-400 hover:text-rose-300"
                            : "border-slate-200 bg-slate-50 text-slate-500"
                        }`}
                      >
                        {isWished ? "♥" : "♡"}
                      </button>
                    </div>

                    {/* Rating & Badge */}
                    <div className="mt-2.5 flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-400">
                        ★ {item.rating}{" "}
                        <span className={`font-normal ${muted}`}>
                          ({item.reviewsCount}{" "}
                          {isArabic ? "تقييم" : "reviews"})
                        </span>
                      </span>

                      {(item.badgeAr || item.badgeEn) && (
                        <span className="rounded-full border border-amber-400/40 bg-amber-500/15 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-300">
                          {isArabic ? item.badgeAr : item.badgeEn}
                        </span>
                      )}
                    </div>

                    <p className={`mt-3 text-xs leading-relaxed ${muted}`}>
                      {isArabic ? item.subtitleAr : item.subtitleEn}
                    </p>

                    {/* Shade Selector */}
                    <div
                      className={`mt-4 rounded-xl border p-3.5 ${subSurface}`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold">
                          {isArabic ? "الدرجة المختارة:" : "Selected Shade:"}
                        </span>
                        {currentShade && (
                          <span className="font-semibold text-amber-300">
                            {isArabic
                              ? currentShade.nameAr
                              : currentShade.nameEn}{" "}
                            ({currentShade.code})
                          </span>
                        )}
                      </div>

                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {item.shades.map((sh) => {
                          const isSelected = currentShade?.code === sh.code;
                          return (
                            <button
                              key={sh.code}
                              type="button"
                              onClick={() =>
                                setSelectedShadeMap((prev) => ({
                                  ...prev,
                                  [item.id]: sh.code,
                                }))
                              }
                              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-bold transition ${
                                isSelected
                                  ? "border-amber-400 bg-amber-500/20 text-white"
                                  : isDark
                                  ? "border-white/10 bg-white/5 text-slate-300"
                                  : "border-slate-300 bg-white text-slate-700"
                              }`}
                            >
                              <span
                                className="h-3.5 w-3.5 rounded-full border border-white/30"
                                style={{ backgroundColor: sh.hex }}
                              />
                              <span>{sh.code}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {(isArabic ? item.tagsAr : item.tagsEn).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setSelectedTag(tag)}
                          className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold transition ${
                            isDark
                              ? "border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/40"
                              : "border-slate-200 bg-slate-100 text-slate-700"
                          }`}
                        >
                          #{tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Consumer Buttons */}
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-emerald-400">
                          {item.priceEgp} {isArabic ? "ج.م" : "EGP"}
                        </span>
                        {item.oldPriceEgp && (
                          <span className="ms-2 text-xs line-through text-rose-400/80">
                            {item.oldPriceEgp} {isArabic ? "ج.م" : "EGP"}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setStudioProduct(item)}
                        className="text-xs font-extrabold text-cyan-400 hover:underline"
                      >
                        🪞 {isArabic ? "جرّبي الدرجة AR" : "Try Shade AR"}
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        currentShade && addToBag(item, currentShade)
                      }
                      className="mt-3 w-full rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 px-4 py-2.5 text-xs font-extrabold text-slate-950 transition hover:opacity-95"
                    >
                      🛍️{" "}
                      {isArabic
                        ? "أضيفي إلى حقيبة الجمال"
                        : "Add to Beauty Bag"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Virtual Shade Studio Modal (Pure Consumer Experience) */}
      {studioProduct && activeStudioShade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 shadow-2xl ${cardSurface}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-xs font-extrabold text-cyan-400">
                  🪞{" "}
                  {isArabic
                    ? "استوديو أورفيليا لتجربة الدرجات"
                    : "Orvelia Virtual Shade Studio"}
                </span>
                <h3 className="mt-1 text-lg font-extrabold">
                  {isArabic ? studioProduct.titleAr : studioProduct.titleEn}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setStudioProduct(null)}
                className="rounded-xl border border-white/15 px-3 py-1.5 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            {/* Live Color Swatch & Intensity Simulator */}
            <div className={`mt-4 rounded-2xl border p-5 ${subSurface}`}>
              <div className="flex flex-col items-center text-center">
                <div
                  className="h-24 w-24 rounded-full border-4 border-white/25 shadow-xl transition-all"
                  style={{
                    backgroundColor: activeStudioShade.hex,
                    opacity: Math.max(0.35, studioIntensity / 100),
                  }}
                />
                <p className="mt-3 text-sm font-extrabold">
                  {isArabic
                    ? activeStudioShade.nameAr
                    : activeStudioShade.nameEn}{" "}
                  ({activeStudioShade.code})
                </p>
                <p className={`text-xs ${muted}`}>
                  {isArabic
                    ? studioProduct.tryOnTypeAr
                    : studioProduct.tryOnTypeEn}
                </p>
              </div>

              {/* Intensity Slider */}
              <div className="mt-4">
                <div className="mb-1 flex justify-between text-xs font-bold">
                  <span>
                    {isArabic ? "كثافة التغطية / اللون:" : "Pigment Intensity:"}
                  </span>
                  <span className="text-amber-300">{studioIntensity}%</span>
                </div>
                <input
                  type="range"
                  min={25}
                  max={100}
                  value={studioIntensity}
                  onChange={(e) => setStudioIntensity(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              {/* Switch Shades Inside Studio */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {studioProduct.shades.map((sh) => {
                  const selected = sh.code === activeStudioShade.code;
                  return (
                    <button
                      key={sh.code}
                      type="button"
                      onClick={() =>
                        setSelectedShadeMap((prev) => ({
                          ...prev,
                          [studioProduct.id]: sh.code,
                        }))
                      }
                      className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold ${
                        selected
                          ? "border-amber-400 bg-amber-500/20 text-white"
                          : "border-white/10 bg-white/5 text-slate-300"
                      }`}
                    >
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: sh.hex }}
                      />
                      <span>{isArabic ? sh.nameAr : sh.nameEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <Link
                href="/try-on"
                className="rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-4 py-2.5 text-xs font-extrabold text-cyan-300 hover:bg-cyan-500/25"
              >
                📷 {isArabic ? "فتح الكاميرا AR" : "Open Live AR Camera"}
              </Link>

              <button
                type="button"
                onClick={() => {
                  addToBag(studioProduct, activeStudioShade);
                  setStudioProduct(null);
                }}
                className="rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 px-5 py-2.5 text-xs font-extrabold text-slate-950"
              >
                🛍️{" "}
                {isArabic
                  ? `أضيفي الدرجة (${studioProduct.priceEgp} ج.م)`
                  : `Add Shade (${studioProduct.priceEgp} EGP)`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Beauty Bag Drawer */}
      {isBagOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs">
          <div
            className={`flex h-full w-full max-w-md flex-col justify-between border-s p-6 shadow-2xl ${cardSurface}`}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-extrabold">
                  🛍️{" "}
                  {isArabic
                    ? `حقيبة الجمال (${totalBagCount})`
                    : `Beauty Bag (${totalBagCount})`}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsBagOpen(false)}
                  className="rounded-xl border border-white/15 px-3 py-1 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {bagItems.length === 0 ? (
                <p className={`mt-10 text-center text-sm ${muted}`}>
                  {isArabic
                    ? "حقيبة الجمال فارغة حالياً — اختاري منتجاتك المفضلة!"
                    : "Your beauty bag is empty — explore and add your favorites!"}
                </p>
              ) : (
                <div className="mt-4 max-h-[65vh] space-y-3 overflow-y-auto pe-1">
                  {bagItems.map((entry) => (
                    <div
                      key={entry.key}
                      className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${subSurface}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="h-8 w-8 shrink-0 rounded-full border border-white/25"
                          style={{ backgroundColor: entry.shade.hex }}
                        />
                        <div>
                          <p className="text-xs font-extrabold">
                            {isArabic
                              ? entry.product.titleAr
                              : entry.product.titleEn}
                          </p>
                          <p className={`text-[11px] ${muted}`}>
                            {isArabic
                              ? entry.shade.nameAr
                              : entry.shade.nameEn}{" "}
                            • {entry.product.priceEgp}{" "}
                            {isArabic ? "ج.م" : "EGP"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateBagQty(entry.key, -1)}
                          className="h-7 w-7 rounded-lg bg-white/10 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="min-w-6 text-center text-xs font-extrabold">
                          {entry.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateBagQty(entry.key, 1)}
                          className="h-7 w-7 rounded-lg bg-white/10 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {bagItems.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <div className="mb-3 flex items-center justify-between text-sm font-extrabold">
                  <span>{isArabic ? "الإجمالي:" : "Total:"}</span>
                  <span className="text-emerald-400">
                    {totalBagPrice.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsBagOpen(false)}
                  className="block w-full rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 py-3 text-center text-sm font-extrabold text-slate-950"
                >
                  {isArabic ? "إتمام الطلب الآن" : "Proceed to Checkout"}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
        <BeautyLookFinder />
        <BeautyShadeReviews />
    </div>
  );
}