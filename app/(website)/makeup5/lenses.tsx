"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Sparkles,
  Droplets,
  ShieldCheck,
  X,
  CreditCard,
} from "lucide-react";

export interface MegaLensProduct {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  coreHex: string;
  ringHex: string;
  glowHex: string;
  hydrationPct: number;
  diameterMm: number;
  priceEgp: number;
  tagAr: string;
  tagEn: string;
}

export interface LensCartEntry {
  key: string;
  lens: MegaLensProduct;
  powerSph: string;
  qty: number;
}

const MEGA_LENS_PRODUCTS: MegaLensProduct[] = [
  {
    id: "ml-01",
    code: "ORV-L01",
    nameAr: "عسل ذهبي ملكي",
    nameEn: "Royal Golden Honey",
    subtitleAr: "تدرج عسلي دافئ بلمعة ذهبية ناعمة",
    subtitleEn: "Warm honey blend with golden sheen",
    coreHex: "#CDA434",
    ringHex: "#2A1704",
    glowHex: "#FEF08A",
    hydrationPct: 60,
    diameterMm: 14.2,
    priceEgp: 750,
    tagAr: "الأكثر مبيعاً",
    tagEn: "Bestseller",
  },
  {
    id: "ml-02",
    code: "ORV-L02",
    nameAr: "زمرد أورفيليا الليلي",
    nameEn: "Orvelia Midnight Emerald",
    subtitleAr: "أخضر زمردي عميق بإشراقة كريستالية",
    subtitleEn: "Deep emerald tone with crystal glow",
    coreHex: "#10B981",
    ringHex: "#042F2E",
    glowHex: "#A7F3D0",
    hydrationPct: 64,
    diameterMm: 14.4,
    priceEgp: 820,
    tagAr: "إصدار خاص",
    tagEn: "Signature",
  },
  {
    id: "ml-03",
    code: "ORV-L03",
    nameAr: "رمادي بلاتيني حريري",
    nameEn: "Silky Platinum Grey",
    subtitleAr: "رمادي فضي أنيق لإطلالات عصرية",
    subtitleEn: "Refined silver-grey for sleek looks",
    coreHex: "#94A3B8",
    ringHex: "#0F172A",
    glowHex: "#E0F2FE",
    hydrationPct: 58,
    diameterMm: 14.3,
    priceEgp: 780,
    tagAr: "عصري",
    tagEn: "Modern",
  },
  {
    id: "ml-04",
    code: "ORV-L04",
    nameAr: "توباز كهرماني ساطع",
    nameEn: "Radiant Amber Topaz",
    subtitleAr: "بريق كهرماني غني يبرز جمال العين",
    subtitleEn: "Rich amber radiance & eye depth",
    coreHex: "#D97706",
    ringHex: "#451A03",
    glowHex: "#FDE68A",
    hydrationPct: 62,
    diameterMm: 14.2,
    priceEgp: 790,
    tagAr: "بريق دافئ",
    tagEn: "Warm Glow",
  },
  {
    id: "ml-05",
    code: "ORV-L05",
    nameAr: "أزرق ياقوتي عميق",
    nameEn: "Deep Sapphire Mist",
    subtitleAr: "أزرق ياقوتي أنيق بلمعان متوازن",
    subtitleEn: "Elegant sapphire with soft sheen",
    coreHex: "#38BDF8",
    ringHex: "#082F49",
    glowHex: "#E0F2FE",
    hydrationPct: 60,
    diameterMm: 14.4,
    priceEgp: 810,
    tagAr: "سهرة",
    tagEn: "Evening",
  },
  {
    id: "ml-06",
    code: "ORV-L06",
    nameAr: "بنفسجي أميثيست ناعم",
    nameEn: "Velvet Amethyst Glow",
    subtitleAr: "لمسة بنفسجية هادئة للمناسبات",
    subtitleEn: "Soft amethyst tint for occasions",
    coreHex: "#A855F7",
    ringHex: "#2E1065",
    glowHex: "#F3E8FF",
    hydrationPct: 62,
    diameterMm: 14.3,
    priceEgp: 840,
    tagAr: "فاخر",
    tagEn: "Luxe",
  },
  {
    id: "ml-07",
    code: "ORV-L07",
    nameAr: "بندقي كراميل طبيعي",
    nameEn: "Natural Caramel Hazel",
    subtitleAr: "درجة بندقية ناعمة للاستخدام اليومي",
    subtitleEn: "Soft caramel-hazel for daily wear",
    coreHex: "#B45309",
    ringHex: "#3B1806",
    glowHex: "#FEF3C7",
    hydrationPct: 59,
    diameterMm: 14.1,
    priceEgp: 710,
    tagAr: "يومي",
    tagEn: "Daily",
  },
  {
    id: "ml-08",
    code: "ORV-L08",
    nameAr: "فيروز المحيط اللامع",
    nameEn: "Shimmering Ocean Turquoise",
    subtitleAr: "فيروزي مشرق مع حلقة خارجية محددة",
    subtitleEn: "Bright turquoise with limbal ring",
    coreHex: "#14B8A6",
    ringHex: "#042F2E",
    glowHex: "#CCFBF1",
    hydrationPct: 63,
    diameterMm: 14.4,
    priceEgp: 830,
    tagAr: "جديد",
    tagEn: "New",
  },
];

const POWER_LIST = [
  "0.00",
  "-0.50",
  "-1.00",
  "-1.50",
  "-2.00",
  "-2.50",
  "-3.00",
  "-4.00",
];

interface OrveliaMegaLensStorefrontProps {
  isArabic?: boolean;
  products?: MegaLensProduct[];
  onSelectLens?: (lens: MegaLensProduct) => void;
}

export default function OrveliaMegaLensStorefront({
  isArabic = true,
  products = MEGA_LENS_PRODUCTS,
  onSelectLens,
}: OrveliaMegaLensStorefrontProps) {
  const [isDark, setIsDark] = useState(true);
  const [selectedLensId, setSelectedLensId] = useState<string>(products[0].id);
  const [powerByLens, setPowerByLens] = useState<Record<string, string>>({});
  const [cart, setCart] = useState<LensCartEntry[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

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
    const obs = new MutationObserver(syncTheme);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  const activeLens = useMemo(
    () => products.find((p) => p.id === selectedLensId) ?? products[0],
    [products, selectedLensId]
  );

  const handleAddToCart = (lens: MegaLensProduct) => {
    const sph = powerByLens[lens.id] ?? "0.00";
    const entryKey = `${lens.id}__${sph}`;
    setSelectedLensId(lens.id);
    onSelectLens?.(lens);

    setCart((prev) => {
      const existing = prev.find((c) => c.key === entryKey);
      if (existing) {
        return prev.map((c) =>
          c.key === entryKey ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { key: entryKey, lens, powerSph: sph, qty: 1 }];
    });
    setOrderConfirmedId(null);
    setCartOpen(true);
  };

  const updateQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.key === key ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const removeEntry = (key: string) => {
    setCart((prev) => prev.filter((c) => c.key !== key));
  };

  const totalCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const subtotalEgp = useMemo(
    () => cart.reduce((sum, item) => sum + item.lens.priceEgp * item.qty, 0),
    [cart]
  );

  const shippingEgp = subtotalEgp === 0 || subtotalEgp >= 1500 ? 0 : 60;
  const grandTotalEgp = subtotalEgp + shippingEgp;

  const handleConfirmPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const generatedId = `ORV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmedId(generatedId);
    setCart([]);
    setCheckoutOpen(false);
  };

  const pageShell = isDark
    ? "bg-[#020202] text-white border-[#CDA434]/25"
    : "bg-slate-50 text-slate-900 border-slate-200";
  const cardBg = isDark
    ? "bg-[#000b18]/95 border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";
  const mutedText = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div
        className={`relative overflow-hidden rounded-[2.25rem] border p-6 shadow-2xl transition-colors duration-300 sm:p-10 ${pageShell}`}
      >
        {/* Top Storefront Header + Cart Button */}
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CDA434]/40 bg-[#CDA434]/10 px-3.5 py-1 text-xs font-extrabold text-[#CDA434]">
              <Sparkles className="h-3.5 w-3.5" />
              {isArabic
                ? "متجر عدسات أورفيليا الكامل والطلب المباشر"
                : "ORVELIA COMPLETE LENS STOREFRONT & CART"}
            </span>
            <h2 className="mt-2 text-2xl font-black sm:text-4xl">
              {isArabic
                ? "اختاري عدستك، أضيفيها للسلة، وأكملي الشراء بسهولة"
                : "Pick Your Lenses, Add to Cart & Checkout"}
            </h2>
            <p className={`mt-1 text-xs sm:text-sm ${mutedText}`}>
              {isArabic
                ? "جميع العدسات متوفرة بالدرجات التجميلية والطبية بأسعار واضحة لكل علبة."
                : "All shades available in cosmetic & prescription powers with clear per-box pricing."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDark((d) => !d)}
              className="rounded-2xl border border-[#CDA434]/40 bg-white/5 px-4 py-2.5 text-xs font-extrabold transition hover:bg-white/10"
            >
              {isDark
                ? isArabic
                  ? "☀️ وضع نهاري"
                  : "☀️ Light Mode"
                : isArabic
                ? "🌙 دارك مود"
                : "🌙 Dark Mode"}
            </button>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 px-5 py-3 text-xs font-black text-slate-950 shadow-lg transition hover:opacity-95 sm:text-sm"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{isArabic ? "سلة المشتريات" : "Shopping Bag"}</span>
              <span className="rounded-full bg-slate-950 px-2 py-0.5 text-[11px] font-black text-amber-300">
                {totalCount}
              </span>
            </button>
          </div>
        </div>

        {/* Order Confirmation Banner */}
        {orderConfirmedId && (
          <div className="mt-6 flex flex-col justify-between gap-3 rounded-2xl border border-emerald-400/50 bg-emerald-500/15 p-4 text-emerald-200 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-400" />
              <div>
                <p className="text-sm font-black">
                  {isArabic
                    ? `تم تأكيد طلبك بنجاح! رقم الطلب: ${orderConfirmedId}`
                    : `Order Confirmed! Reference ID: ${orderConfirmedId}`}
                </p>
                <p className="text-xs text-emerald-200/80">
                  {isArabic
                    ? "سيتم تجهيز عدساتك وتأكيد الشحن معكِ في أقرب وقت."
                    : "Your lenses are being prepared for dispatch."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOrderConfirmedId(null)}
              className="self-start rounded-xl border border-emerald-400/40 px-3 py-1.5 text-xs font-extrabold sm:self-auto"
            >
              {isArabic ? "إغلاق" : "Dismiss"}
            </button>
          </div>
        )}

        {/* Spotlight Active Lens Banner */}
        <div
          className={`mt-6 flex flex-col justify-between gap-5 rounded-3xl border p-5 lg:flex-row lg:items-center ${cardBg}`}
        >
          <div className="flex items-center gap-4">
            <div
              style={{
                background: `radial-gradient(circle, ${activeLens.glowHex} 14%, ${activeLens.coreHex} 60%, ${activeLens.ringHex} 100%)`,
                borderColor: activeLens.ringHex,
              }}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 shadow-lg"
            >
              <span className="h-5 w-5 rounded-full bg-black/90" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono font-extrabold text-[#CDA434]">
                  {activeLens.code}
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-300">
                  {isArabic ? activeLens.tagAr : activeLens.tagEn}
                </span>
              </div>
              <h3 className="mt-1 text-lg font-black">
                {isArabic ? activeLens.nameAr : activeLens.nameEn}
              </h3>
              <p className={`text-xs ${mutedText}`}>
                {isArabic ? activeLens.subtitleAr : activeLens.subtitleEn}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="text-xs font-bold">
              <span className={mutedText}>
                {isArabic ? "سعر العلبة: " : "Box Price: "}
              </span>
              <span className="text-lg font-black text-emerald-400">
                {activeLens.priceEgp} {isArabic ? "ج.م" : "EGP"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleAddToCart(activeLens)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 px-5 py-3 text-xs font-black text-slate-950 transition hover:opacity-95"
            >
              <ShoppingBag className="h-4 w-4" />
              {isArabic ? "أضيفي المختارة للسلة" : "Add Selected to Cart"}
            </button>
          </div>
        </div>

        {/* 8 Lenses Grid with Individual Prices & Add to Cart */}
        <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((lens) => {
            const isSelected = lens.id === activeLens.id;
            const currentSph = powerByLens[lens.id] ?? "0.00";

            return (
              <motion.article
                key={lens.id}
                whileHover={{ y: -4 }}
                onClick={() => {
                  setSelectedLensId(lens.id);
                  onSelectLens?.(lens);
                }}
                className={`flex cursor-pointer flex-col justify-between rounded-3xl border p-5 transition ${cardBg} ${
                  isSelected
                    ? "ring-2 ring-[#CDA434] border-[#CDA434]"
                    : "hover:border-[#CDA434]/50"
                }`}
              >
                <div>
                  {/* Iris Swatch + Price Tag */}
                  <div className="flex items-center justify-between gap-2">
                    <div
                      style={{
                        background: `radial-gradient(circle, ${lens.glowHex} 14%, ${lens.coreHex} 62%, ${lens.ringHex} 100%)`,
                        borderColor: lens.ringHex,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border-4 shadow-inner"
                    >
                      <span className="h-4 w-4 rounded-full bg-black/90" />
                    </div>

                    <div className="text-end">
                      <span className="block font-mono text-[10px] text-cyan-400">
                        {lens.code}
                      </span>
                      <span className="text-base font-black text-emerald-400">
                        {lens.priceEgp} {isArabic ? "ج.م" : "EGP"}
                      </span>
                    </div>
                  </div>

                  {/* Name & Description */}
                  <h3 className="mt-4 text-base font-black">
                    {isArabic ? lens.nameAr : lens.nameEn}
                  </h3>
                  <p className={`mt-1 text-xs leading-relaxed ${mutedText}`}>
                    {isArabic ? lens.subtitleAr : lens.subtitleEn}
                  </p>

                  {/* Specs */}
                  <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] font-bold">
                    <span className="inline-flex items-center gap-1 text-cyan-400">
                      <Droplets className="h-3.5 w-3.5" />
                      {lens.hydrationPct}%
                    </span>
                    <span className={mutedText}>DIA {lens.diameterMm}mm</span>
                  </div>
                </div>

                {/* SPH Power + Add to Cart Button */}
                <div
                  className="mt-4 space-y-2.5 border-t border-white/10 pt-3"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <label className={`font-bold ${mutedText}`}>
                      {isArabic ? "الدرجة (SPH):" : "Power:"}
                    </label>
                    <select
                      value={currentSph}
                      onChange={(e) =>
                        setPowerByLens((prev) => ({
                          ...prev,
                          [lens.id]: e.target.value,
                        }))
                      }
                      className={`rounded-xl border px-2.5 py-1 text-xs font-bold ${
                        isDark
                          ? "border-white/15 bg-[#020202] text-white"
                          : "border-slate-300 bg-slate-50 text-slate-900"
                      }`}
                    >
                      {POWER_LIST.map((p) => (
                        <option key={p} value={p}>
                          {p === "0.00"
                            ? `0.00 (${isArabic ? "تجميلي" : "Plano"})`
                            : p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(lens)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 py-2.5 text-xs font-black text-slate-950 transition hover:opacity-95"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>
                      {isArabic
                        ? `أضيفي للسلة — ${lens.priceEgp} ج.م`
                        : `Add to Cart — ${lens.priceEgp} EGP`}
                    </span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Slide-Over Shopping Cart & Checkout Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          >
            <motion.div
              initial={{ x: isArabic ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isArabic ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              dir={isArabic ? "rtl" : "ltr"}
              className={`flex h-full w-full max-w-md flex-col justify-between border-s p-6 shadow-2xl ${
                isDark
                  ? "border-[#CDA434]/30 bg-[#020202] text-white"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              {/* Cart Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-[#CDA434]" />
                  <h3 className="text-lg font-black">
                    {isArabic
                      ? `سلة العدسات (${totalCount})`
                      : `Lens Cart (${totalCount})`}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="rounded-xl border border-white/15 p-2 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Cart Items or Checkout Form */}
              <div className="my-4 flex-1 space-y-3 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-16 text-center">
                    <p className="text-sm font-bold text-slate-400">
                      {isArabic
                        ? "سلتك فارغة حالياً — اختاري عدسة واضغطي «أضيفي للسلة»."
                        : "Your cart is empty—pick a lens and tap Add to Cart."}
                    </p>
                  </div>
                ) : !checkoutOpen ? (
                  cart.map((entry) => (
                    <div
                      key={entry.key}
                      className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${cardBg}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          style={{
                            background: `radial-gradient(circle, ${entry.lens.glowHex} 15%, ${entry.lens.coreHex} 65%, ${entry.lens.ringHex} 100%)`,
                          }}
                          className="h-10 w-10 shrink-0 rounded-full border-2 border-white/30"
                        />
                        <div>
                          <div className="text-xs font-black">
                            {isArabic ? entry.lens.nameAr : entry.lens.nameEn}
                          </div>
                          <div className={`text-[11px] ${mutedText}`}>
                            SPH: {entry.powerSph} ·{" "}
                            <span className="font-bold text-emerald-400">
                              {entry.lens.priceEgp * entry.qty}{" "}
                              {isArabic ? "ج.م" : "EGP"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => updateQty(entry.key, -1)}
                          className="rounded-lg border border-white/15 p-1.5 hover:bg-white/10"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black">
                          {entry.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(entry.key, 1)}
                          className="rounded-lg border border-white/15 p-1.5 hover:bg-white/10"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeEntry(entry.key)}
                          className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-400 hover:bg-rose-500/20"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <form
                    id="lens-checkout-form"
                    onSubmit={handleConfirmPurchase}
                    className="space-y-3"
                  >
                    <p className="text-xs font-extrabold text-[#CDA434]">
                      {isArabic
                        ? "بيانات التوصيل لإتمام الشراء:"
                        : "Delivery Details to Complete Purchase:"}
                    </p>
                    <div>
                      <label className="block text-xs font-bold">
                        {isArabic ? "الاسم بالكامل" : "Full Name"}
                      </label>
                      <input
                        required
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder={isArabic ? "مثال: وردة سامي" : "Your name"}
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white focus:border-[#CDA434] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold">
                        {isArabic ? "رقم الموبايل / واتساب" : "Phone / WhatsApp"}
                      </label>
                      <input
                        required
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="01xxxxxxxxx"
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white focus:border-[#CDA434] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold">
                        {isArabic ? "العنوان بالتفصيل" : "Shipping Address"}
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        placeholder={
                          isArabic
                            ? "المحافظة، المدينة، الشارع، رقم العمارة"
                            : "City, street, building details"
                        }
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white focus:border-[#CDA434] focus:outline-none"
                      />
                    </div>
                  </form>
                )}
              </div>

              {/* Cart Totals & Checkout CTA */}
              {cart.length > 0 && (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className={mutedText}>
                      {isArabic ? "مجموع العدسات:" : "Subtotal:"}
                    </span>
                    <span className="font-bold">
                      {subtotalEgp.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className={mutedText}>
                      {isArabic
                        ? "الشحن (مجاني فوق 1500 ج.م):"
                        : "Shipping (Free 1500+ EGP):"}
                    </span>
                    <span className="font-bold text-cyan-400">
                      {shippingEgp === 0
                        ? isArabic
                          ? "مجاني"
                          : "Free"
                        : `${shippingEgp} ${isArabic ? "ج.م" : "EGP"}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-base font-black">
                    <span>{isArabic ? "الإجمالي الكلي:" : "Grand Total:"}</span>
                    <span className="text-emerald-400">
                      {grandTotalEgp.toLocaleString()}{" "}
                      {isArabic ? "ج.م" : "EGP"}
                    </span>
                  </div>

                  {!checkoutOpen ? (
                    <button
                      type="button"
                      onClick={() => setCheckoutOpen(true)}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 py-3 text-xs font-black text-slate-950 transition hover:opacity-95 sm:text-sm"
                    >
                      <CreditCard className="h-4 w-4" />
                      {isArabic ? "إتمام الشراء الآن" : "Proceed to Checkout"}
                    </button>
                  ) : (
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutOpen(false)}
                        className="rounded-2xl border border-white/15 px-4 py-3 text-xs font-bold"
                      >
                        {isArabic ? "رجوع" : "Back"}
                      </button>
                      <button
                        type="submit"
                        form="lens-checkout-form"
                        className="flex-1 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 py-3 text-xs font-black text-slate-950 transition hover:opacity-95 sm:text-sm"
                      >
                        {isArabic ? "تأكيد وشراء الطلب" : "Confirm & Buy"}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}