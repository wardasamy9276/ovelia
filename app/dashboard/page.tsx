"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  DASHBOARD_ORDERS,
  INITIAL_AI_MODULES,
  LOW_STOCK_ALERTS,
  MAKEUP_HUB_CARDS,
  MONTHLY_METRICS,
  OVERVIEW_KPIS,
  type AiTryOnModule,
  type MakeupHubSlug,
  type OrderStatus,
} from "../dashboard/data/dashboardOverview";

type MakeupCategoryItem = {
  id: string;
  slug: string;
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
};

const ALL_MAKEUP_CATEGORIES: MakeupCategoryItem[] = [
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
    accentHex: "#F59E0B",
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
    accentHex: "#10B981",
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
    accentHex: "#FB7185",
    arName: "البلاشر / أحمر الخدود",
    enName: "Blush",
    arDesc: "درجات وردية وخوخية ومرجانية كريمية وسائلة وبودرة لدمج سلس.",
    enDesc: "Cream, liquid & powder rose, peach and coral shades with easy blend.",
    arTags: ["دمج سلس", "إشراقة خدود", "قوام كريمي"],
    enTags: ["Easy Blend", "Cheek Glow", "Creamy Texture"],
    priceRangeEgp: "490 - 710 ج.م",
    stockState: "in_stock",
  },
  {
    id: "cat-lipstick",
    slug: "lipstick",
    href: "/dashboard/makeup/lipstick",
    icon: "💄",
    accentHex: "#E11D48",
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
    accentHex: "#2DD4BF",
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

export default function DashboardHomePage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);
  const [chartMode, setChartMode] = useState<"sales" | "tryOn">("sales");
  const [hubFilter, setHubFilter] = useState<"all" | MakeupHubSlug>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [onlyTryOnOrders, setOnlyTryOnOrders] = useState(false);
  const [aiModules, setAiModules] = useState<AiTryOnModule[]>(INITIAL_AI_MODULES);

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

  const toggleAiModule = (id: string) => {
    setAiModules((prev) =>
      prev.map((mod) => (mod.id === id ? { ...mod, active: !mod.active } : mod))
    );
  };

  const filteredCategories = useMemo(() => {
    const q = categorySearch.trim().toLowerCase();
    if (!q) return ALL_MAKEUP_CATEGORIES;

    return ALL_MAKEUP_CATEGORIES.filter((cat) => {
      return (
        cat.arName.toLowerCase().includes(q) ||
        cat.enName.toLowerCase().includes(q) ||
        cat.arDesc.toLowerCase().includes(q) ||
        cat.enDesc.toLowerCase().includes(q) ||
        cat.arTags.some((t) => t.toLowerCase().includes(q)) ||
        cat.enTags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [categorySearch]);

  const filteredOrders = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DASHBOARD_ORDERS.filter((order) => {
      if (hubFilter !== "all" && order.hubSlug !== hubFilter) {
        return false;
      }
      if (statusFilter !== "all" && order.status !== statusFilter) {
        return false;
      }
      if (onlyTryOnOrders && !order.usedTryOn) {
        return false;
      }
      if (!q) return true;

      const customer = (
        isArabic ? order.customerAr : order.customerEn
      ).toLowerCase();
      const product = (
        isArabic ? order.productAr : order.productEn
      ).toLowerCase();
      const shade = (
        isArabic ? order.shadeNameAr : order.shadeNameEn
      ).toLowerCase();

      return (
        order.id.toLowerCase().includes(q) ||
        customer.includes(q) ||
        product.includes(q) ||
        shade.includes(q)
      );
    });
  }, [hubFilter, isArabic, onlyTryOnOrders, searchQuery, statusFilter]);

  const maxChartValue = useMemo(() => {
    const values = MONTHLY_METRICS.map((m) =>
      chartMode === "sales" ? m.salesValue : m.tryOnSessions
    );
    return Math.max(...values, 1);
  }, [chartMode]);

  const statusMeta: Record<
    OrderStatus,
    { ar: string; en: string; badge: string }
  > = {
    completed: {
      ar: "مكتمل",
      en: "Completed",
      badge: isDark
        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
        : "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    processing: {
      ar: "قيد التجهيز",
      en: "Processing",
      badge: isDark
        ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
        : "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    pending: {
      ar: "بانتظار التأكيد",
      en: "Pending",
      badge: isDark
        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
        : "bg-amber-50 text-amber-700 border-amber-200",
    },
    cancelled: {
      ar: "ملغي",
      en: "Cancelled",
      badge: isDark
        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
        : "bg-rose-50 text-rose-700 border-rose-200",
    },
  };

  const surface = isDark
    ? "bg-[#0d1422] border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-xs";

  const subSurface = isDark
    ? "bg-[#090e1a] border-white/10"
    : "bg-slate-50 border-slate-200";

  const muted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div dir={dir} className="space-y-6">
      {/* Top Header */}
      <div
        className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center lg:p-6 ${
          isDark
            ? "bg-gradient-to-l from-emerald-500/10 via-[#0d1422] to-cyan-500/10 border-white/10"
            : "bg-gradient-to-l from-emerald-50 via-white to-cyan-50 border-slate-200"
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              {isArabic
                ? "لوحة تحكم أورفيليا الرئيسية"
                : "Orvelia Dashboard Home"}
            </h1>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-0.5 text-xs font-bold text-emerald-400">
              {isArabic
                ? "جميع أنواع المكياج • جاهز لربط Laravel"
                : "All Makeup Types • Laravel Ready"}
            </span>
          </div>
          <p className={`mt-1.5 text-sm ${muted}`}>
            {isArabic
              ? "اختاري أي نوع من أنواع المكياج أو قسم التاجات للدخول وإدارة منتجاته وأسعاره ودرجاته، ومتابعة الطلبات والأداء."
              : "Select any makeup type or tag hub to manage products, pricing, and shades, and track store performance."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/dashboard/makeup/eyeliner"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:opacity-95"
          >
            <span>✒️</span>
            <span>{isArabic ? "إدارة الآيلاينر" : "Eyeliner Hub"}</span>
          </Link>
          <Link
            href="/dashboard/makeup/concealer"
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              isDark
                ? "border-white/15 bg-white/5 text-white hover:border-amber-400/50"
                : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
            }`}
          >
            <span>🪄</span>
            <span>{isArabic ? "إدارة الكونسيلر" : "Concealer Hub"}</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {OVERVIEW_KPIS.map((kpi) => (
          <Link
            key={kpi.id}
            href={kpi.href}
            className={`group rounded-2xl border p-5 transition hover:-translate-y-0.5 ${surface}`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className={`text-sm font-semibold ${muted}`}>
                {isArabic ? kpi.arTitle : kpi.enTitle}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-lg transition group-hover:scale-105">
                {kpi.icon}
              </span>
            </div>

            <div className="mt-3 text-2xl font-extrabold sm:text-3xl">
              {kpi.value}
            </div>

            <p
              className={`mt-2 text-xs font-semibold ${
                kpi.positive ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {isArabic ? kpi.arDelta : kpi.enDelta}
            </p>
          </Link>
        ))}
      </section>

      {/* All Makeup Types Directory (12 Categories) */}
      <section className={`rounded-2xl border p-5 lg:p-6 ${surface}`}>
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-extrabold">
              {isArabic
                ? "جميع أنواع المكياج في أورفيليا (12 نوعاً)"
                : "All Makeup Types in Orvelia (12 Categories)"}
            </h2>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "فونديشن، كونسيلر، آيلاينر، ماسكارا، بلاشر، روج، هايلايتر، برونزر، ظلال عيون، برايمر، بودرة تثبيت، ومثبت مكياج."
                : "Foundation, concealer, eyeliner, mascara, blush, lipstick, highlighter, bronzer, eyeshadow, primer, setting powder & setting spray."}
            </p>
          </div>

          <input
            type="text"
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            placeholder={
              isArabic
                ? "ابحث عن نوع مكياج (مثال: بلاشر، روج، فاونديشن)..."
                : "Search makeup type (e.g. blush, lipstick, foundation)..."
            }
            className={`w-full rounded-xl border px-3.5 py-2 text-xs md:w-72 sm:text-sm outline-none ${
              isDark
                ? "border-white/15 bg-[#090e1a] text-white placeholder:text-slate-500 focus:border-emerald-400"
                : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500"
            }`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCategories.map((cat) => {
            const tags = isArabic ? cat.arTags : cat.enTags;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`group flex flex-col justify-between rounded-2xl border p-4 transition-all hover:-translate-y-0.5 ${subSurface} hover:border-emerald-400/50`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-lg"
                        style={{
                          borderColor: `${cat.accentHex}55`,
                          backgroundColor: `${cat.accentHex}18`,
                        }}
                      >
                        {cat.icon}
                      </span>
                      <div>
                        <h3 className="text-sm font-extrabold group-hover:text-emerald-400 transition">
                          {isArabic ? cat.arName : cat.enName}
                        </h3>
                        <p className="text-[11px] font-bold text-amber-400">
                          {cat.priceRangeEgp}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        cat.stockState === "low_stock"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-400/30"
                          : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                      }`}
                    >
                      {cat.stockState === "low_stock"
                        ? isArabic
                          ? "منخفض"
                          : "Low"
                        : isArabic
                        ? "متوفر"
                        : "Active"}
                    </span>
                  </div>

                  <p className={`mt-2.5 text-xs leading-relaxed ${muted}`}>
                    {isArabic ? cat.arDesc : cat.enDesc}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-md border px-2 py-0.5 text-[10px] font-semibold ${
                          isDark
                            ? "border-white/10 bg-white/5 text-slate-300"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`mt-4 flex items-center justify-between border-t pt-2.5 text-xs font-bold ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}
                >
                  <span className={muted}>
                    {isArabic ? "إدارة النوع" : "Manage Type"}
                  </span>
                  <span className="text-emerald-400">
                    {isArabic ? "دخول ←" : "Open →"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Makeup Hubs & Tags Showcase Cards */}
      <section className={`rounded-2xl border p-5 lg:p-6 ${surface}`}>
        <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-xl font-extrabold">
              {isArabic
                ? "أقسام الميك أب والتاجات (اضغطي للدخول وإدارة المنتجات والأسعار)"
                : "Makeup Hubs & Tags (Click to Manage Products & Pricing)"}
            </h2>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "كل كارت يمثل قسماً وتاجات خاصة به؛ عند الدخول إليه ستتمكنين من إضافة منتج، تعديله، حذفه، وضبط الأسعار والدرجات."
                : "Each card groups a category and its tags; open any card to add, edit, or delete products and prices."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MAKEUP_HUB_CARDS.map((card) => {
            const tags = isArabic ? card.arTags : card.enTags;

            return (
              <Link
                key={card.slug}
                href={card.href}
                className={`group flex flex-col justify-between rounded-2xl border p-5 transition-all hover:-translate-y-1 ${subSurface} hover:border-emerald-400/50`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl border"
                        style={{
                          borderColor: `${card.accentHex}55`,
                          backgroundColor: `${card.accentHex}18`,
                        }}
                      >
                        {card.icon}
                      </span>
                      <div>
                        <h3 className="text-base font-extrabold group-hover:text-emerald-400 transition">
                          {isArabic ? card.arTitle : card.enTitle}
                        </h3>
                        <p className="text-xs font-bold text-emerald-400">
                          {card.productsCount}{" "}
                          {isArabic ? "منتج" : "products"} •{" "}
                          <span className={muted}>{card.priceRangeEgp}</span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                        card.stockStatus === "low"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-400/30"
                          : "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30"
                      }`}
                    >
                      {card.stockStatus === "low"
                        ? isArabic
                          ? "مخزون منخفض"
                          : "Low Stock"
                        : isArabic
                        ? "متوفر"
                        : "In Stock"}
                    </span>
                  </div>

                  <p className={`mt-3 text-xs leading-relaxed ${muted}`}>
                    {isArabic ? card.arDesc : card.enDesc}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                          isDark
                            ? "border-white/10 bg-white/5 text-slate-200"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`mt-5 flex items-center justify-between border-t pt-3.5 text-xs font-bold ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}
                >
                  <span className="text-cyan-400">
                    ✨ {isArabic ? card.arTryOnLabel : card.enTryOnLabel}
                  </span>
                  <span className="text-emerald-400 group-hover:translate-x-[-4px] transition-transform">
                    {isArabic ? "دخول للقسم ←" : "Open Hub →"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Chart + AI Studio & Low Stock */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Monthly Chart */}
        <div className={`rounded-2xl border p-5 xl:col-span-6 ${surface}`}>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">
                {isArabic
                  ? "المبيعات وجلسات التجربة (6 أشهر)"
                  : "6-Month Sales & Try-On"}
              </h2>
              <p className={`text-xs ${muted}`}>
                {chartMode === "sales"
                  ? isArabic
                    ? "الإيرادات بالألف جنيه مصري"
                    : "Revenue in thousand EGP"
                  : isArabic
                  ? "عدد جلسات الواقع المعزز والذكاء الاصطناعي"
                  : "AR & AI try-on sessions"}
              </p>
            </div>

            <div
              className={`inline-flex rounded-xl border p-1 text-xs font-bold ${subSurface}`}
            >
              <button
                type="button"
                onClick={() => setChartMode("sales")}
                className={`rounded-lg px-3 py-1.5 transition ${
                  chartMode === "sales"
                    ? "bg-emerald-500 text-slate-950"
                    : muted
                }`}
              >
                {isArabic ? "المبيعات" : "Sales"}
              </button>
              <button
                type="button"
                onClick={() => setChartMode("tryOn")}
                className={`rounded-lg px-3 py-1.5 transition ${
                  chartMode === "tryOn"
                    ? "bg-cyan-400 text-slate-950"
                    : muted
                }`}
              >
                {isArabic ? "AR/AI" : "AR/AI"}
              </button>
            </div>
          </div>

          <div className="grid h-56 grid-cols-6 items-end gap-3 pt-6">
            {MONTHLY_METRICS.map((item) => {
              const rawVal =
                chartMode === "sales" ? item.salesValue : item.tryOnSessions;
              const heightPercent = Math.max(
                14,
                Math.round((rawVal / maxChartValue) * 100)
              );

              return (
                <div
                  key={item.monthEn}
                  className="flex h-full flex-col items-center justify-end gap-2"
                >
                  <span className="text-[11px] font-bold text-emerald-400">
                    {chartMode === "sales"
                      ? `${item.salesValue}k`
                      : item.tryOnSessions.toLocaleString()}
                  </span>
                  <div
                    className={`w-full max-w-11 rounded-t-xl transition-all duration-500 ${
                      chartMode === "sales"
                        ? "bg-gradient-to-t from-emerald-500/40 to-emerald-400"
                        : "bg-gradient-to-t from-cyan-500/40 to-cyan-300"
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                  <span className={`text-xs font-semibold ${muted}`}>
                    {isArabic ? item.monthAr : item.monthEn}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Modules + Low Stock */}
        <div className="space-y-6 xl:col-span-6">
          <div className={`rounded-2xl border p-5 ${surface}`}>
            <h2 className="mb-3 text-base font-bold">
              {isArabic
                ? "حالة أدوات التجربة والذكاء الاصطناعي"
                : "AI & AR Try-On Tools Status"}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {aiModules.map((mod) => (
                <div
                  key={mod.id}
                  className={`flex flex-col justify-between rounded-xl border p-3.5 ${subSurface}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <p className="text-xs font-bold leading-snug">
                        {isArabic ? mod.arName : mod.enName}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleAiModule(mod.id)}
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          mod.active
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-slate-500/20 text-slate-400"
                        }`}
                      >
                        {mod.active
                          ? isArabic
                            ? "نشط"
                            : "ON"
                          : isArabic
                          ? "متوقف"
                          : "OFF"}
                      </button>
                    </div>
                    <p className={`mt-1.5 text-[11px] ${muted}`}>
                      {isArabic ? mod.arDesc : mod.enDesc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className={muted}>
                      {mod.sessionsCount.toLocaleString()}
                    </span>
                    <span className="font-bold text-emerald-400">
                      {mod.conversionPercent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl border p-5 ${surface}`}>
            <h2 className="mb-3 text-base font-bold">
              {isArabic
                ? "تنبيهات المخزون المنخفض (اضغطي للذهاب للقسم)"
                : "Low Stock Alerts (Click to Open Hub)"}
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {LOW_STOCK_ALERTS.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`rounded-xl border p-3.5 transition hover:border-amber-400/50 ${subSurface}`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/25"
                      style={{ backgroundColor: item.shadeHex }}
                    />
                    <p className="truncate text-xs font-bold">
                      {isArabic ? item.nameAr : item.nameEn}
                    </p>
                  </div>
                  <p className={`mt-1 truncate text-[11px] ${muted}`}>
                    {isArabic ? item.shadeAr : item.shadeEn}
                  </p>
                  <p className="mt-2 text-xs font-extrabold text-rose-400">
                    {item.currentStock} {isArabic ? "قطعة متبقية" : "left"} (
                    {item.sku})
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Orders Table with Hub & Status Filters */}
      <section className={`rounded-2xl border p-5 ${surface}`}>
        <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold">
              {isArabic
                ? "الطلبات حسب الأقسام والدرجات"
                : "Recent Orders by Makeup Hub & Shade"}
            </h2>
            <p className={`text-xs ${muted}`}>
              {isArabic
                ? "فلترة الطلبات حسب القسم (آيلاينر، كونسيلر، بلاشر...) أو الحالة أو البحث المباشر."
                : "Filter orders by category hub, order status, AR try-on, or search."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isArabic
                  ? "ابحث بالطلب، العميلة، المنتج، أو الدرجة..."
                  : "Search order, customer, product, shade..."
              }
              className={`w-full rounded-xl border px-3.5 py-2 text-xs sm:w-56 sm:text-sm outline-none ${
                isDark
                  ? "border-white/15 bg-[#090e1a] text-white placeholder:text-slate-500"
                  : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400"
              }`}
            />

            <select
              value={hubFilter}
              onChange={(e) =>
                setHubFilter(e.target.value as "all" | MakeupHubSlug)
              }
              className={`rounded-xl border px-3 py-2 text-xs font-semibold sm:text-sm outline-none ${
                isDark
                  ? "border-white/15 bg-[#090e1a] text-white"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              <option value="all">
                {isArabic ? "كل الأقسام" : "All Hubs"}
              </option>
              {MAKEUP_HUB_CARDS.map((h) => (
                <option key={h.slug} value={h.slug}>
                  {isArabic ? h.arTitle : h.enTitle}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | OrderStatus)
              }
              className={`rounded-xl border px-3 py-2 text-xs font-semibold sm:text-sm outline-none ${
                isDark
                  ? "border-white/15 bg-[#090e1a] text-white"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              <option value="all">
                {isArabic ? "كل الحالات" : "All Statuses"}
              </option>
              <option value="processing">
                {isArabic ? "قيد التجهيز" : "Processing"}
              </option>
              <option value="completed">
                {isArabic ? "مكتمل" : "Completed"}
              </option>
              <option value="pending">
                {isArabic ? "بانتظار التأكيد" : "Pending"}
              </option>
              <option value="cancelled">
                {isArabic ? "ملغي" : "Cancelled"}
              </option>
            </select>

            <button
              type="button"
              onClick={() => setOnlyTryOnOrders((prev) => !prev)}
              className={`rounded-xl border px-3 py-2 text-xs font-bold transition sm:text-sm ${
                onlyTryOnOrders
                  ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                  : isDark
                  ? "border-white/15 text-slate-300 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              ✨ {isArabic ? "بعد AR فقط" : "AR Only"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead>
              <tr
                className={`border-b text-xs ${
                  isDark
                    ? "border-white/10 text-slate-400"
                    : "border-slate-200 text-slate-500"
                }`}
              >
                <th className="py-3 pe-3 text-start font-semibold">
                  {isArabic ? "الطلب" : "Order"}
                </th>
                <th className="py-3 px-3 text-start font-semibold">
                  {isArabic ? "العميلة" : "Customer"}
                </th>
                <th className="py-3 px-3 text-start font-semibold">
                  {isArabic ? "المنتج" : "Product"}
                </th>
                <th className="py-3 px-3 text-start font-semibold">
                  {isArabic ? "الدرجة" : "Shade"}
                </th>
                <th className="py-3 px-3 text-start font-semibold">
                  {isArabic ? "الملاءمة" : "Fit"}
                </th>
                <th className="py-3 px-3 text-start font-semibold">
                  {isArabic ? "الإجمالي" : "Total"}
                </th>
                <th className="py-3 ps-3 text-start font-semibold">
                  {isArabic ? "الحالة" : "Status"}
                </th>
              </tr>
            </thead>

            <tbody
              className={`divide-y ${
                isDark ? "divide-white/5" : "divide-slate-100"
              }`}
            >
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className={`py-8 text-center text-sm ${muted}`}>
                    {isArabic
                      ? "لا توجد طلبات مطابقة للفلاتر الحالية."
                      : "No orders match the current filters."}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const st = statusMeta[order.status];
                  return (
                    <tr
                      key={order.id}
                      className={
                        isDark ? "hover:bg-white/[0.02]" : "hover:bg-slate-50"
                      }
                    >
                      <td className="py-3.5 pe-3 font-mono text-xs font-bold text-cyan-400">
                        <div>{order.id}</div>
                        <div className={`text-[11px] font-normal ${muted}`}>
                          {order.date}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <div className="font-semibold">
                          {isArabic ? order.customerAr : order.customerEn}
                        </div>
                        <div className={`text-xs ${muted}`}>{order.email}</div>
                      </td>

                      <td className="py-3.5 px-3 font-medium">
                        <div>{isArabic ? order.productAr : order.productEn}</div>
                        <div className={`text-xs ${muted}`}>
                          {isArabic ? "الكمية:" : "Qty:"} {order.quantity}
                          {order.usedTryOn && (
                            <span className="ms-2 text-cyan-400">• ✨ AR</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-2.5 py-1 text-xs font-medium">
                          <span
                            className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/25"
                            style={{ backgroundColor: order.shadeHex }}
                          />
                          <span>
                            {isArabic ? order.shadeNameAr : order.shadeNameEn}
                          </span>
                        </span>
                      </td>

                      <td className={`py-3.5 px-3 text-xs ${muted}`}>
                        {isArabic ? order.skinToneAr : order.skinToneEn}
                      </td>

                      <td className="py-3.5 px-3 font-bold">
                        {order.totalPrice}
                      </td>

                      <td className="py-3.5 ps-3">
                        <span
                          className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${st.badge}`}
                        >
                          {isArabic ? st.ar : st.en}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}