"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  ShoppingBag,
  SlidersHorizontal,
  Plus,
  Minus,
  Trash2,
  X,
  CreditCard,
  Wand2,
} from "lucide-react";

export type SkinUndertone = "warm" | "cool" | "neutral" | "olive";
export type OccasionTarget = "daily" | "gala" | "bridal";

export interface MatchedProductPiece {
  id: string;
  code: string;
  categoryAr: string;
  categoryEn: string;
  titleAr: string;
  titleEn: string;
  shadeNoteAr: string;
  shadeNoteEn: string;
  swatchHex: string;
  accentHex: string;
  priceEgp: number;
  bestUndertones: SkinUndertone[];
  bestOccasions: OccasionTarget[];
}

interface CartLine {
  item: MatchedProductPiece;
  qty: number;
}

const MATCH_CATALOG: MatchedProductPiece[] = [
  {
    id: "m-lens-1",
    code: "M-LN01",
    categoryAr: "عدسات لاصقة",
    categoryEn: "Contact Lenses",
    titleAr: "عدسات عسل الصحراء الذهبي",
    titleEn: "Desert Golden Honey Lenses",
    shadeNoteAr: "تندمج بنعومة مع البشرة الدافئة والقمحية",
    shadeNoteEn: "Blends seamlessly with warm & olive skin",
    swatchHex: "#CDA434",
    accentHex: "#FEF08A",
    priceEgp: 750,
    bestUndertones: ["warm", "olive", "neutral"],
    bestOccasions: ["daily", "gala"],
  },
  {
    id: "m-lens-2",
    code: "M-LN02",
    categoryAr: "عدسات لاصقة",
    categoryEn: "Contact Lenses",
    titleAr: "عدسات كوارتز بلاتيني بارد",
    titleEn: "Cool Platinum Quartz Lenses",
    shadeNoteAr: "تبرز صفاء البشرة الفاتحة والمحايدة",
    shadeNoteEn: "Enhances cool & neutral undertones",
    swatchHex: "#94A3B8",
    accentHex: "#E0F2FE",
    priceEgp: 790,
    bestUndertones: ["cool", "neutral"],
    bestOccasions: ["gala", "bridal"],
  },
  {
    id: "m-lip-1",
    code: "M-MK01",
    categoryAr: "مكياج وشفاه",
    categoryEn: "Lip & Cheek",
    titleAr: "ملمع شفاه تيراكوتا ذهبي",
    titleEn: "Golden Terracotta Lip Gloss",
    shadeNoteAr: "لمعان دافئ متوازن لإشراقة طبيعية",
    shadeNoteEn: "Balanced warm sheen for natural glow",
    swatchHex: "#C25949",
    accentHex: "#FDE68A",
    priceEgp: 460,
    bestUndertones: ["warm", "olive"],
    bestOccasions: ["daily", "gala"],
  },
  {
    id: "m-lip-2",
    code: "M-MK02",
    categoryAr: "مكياج وشفاه",
    categoryEn: "Lip & Cheek",
    titleAr: "أحمر شفاه روز لؤلؤي ناعم",
    titleEn: "Soft Pearl Rose Velvet Lip",
    shadeNoteAr: "درجة وردية راقية للمناسبات والعرائس",
    shadeNoteEn: "Refined rose tone for bridal & cool skin",
    swatchHex: "#D97794",
    accentHex: "#FFF1F2",
    priceEgp: 490,
    bestUndertones: ["cool", "neutral"],
    bestOccasions: ["bridal", "daily"],
  },
  {
    id: "m-nail-1",
    code: "M-NL01",
    categoryAr: "طلاء أظافر",
    categoryEn: "Gel Nails",
    titleAr: "طلاء جل شامبين لؤلؤي",
    titleEn: "Champagne Pearl Gel Polish",
    shadeNoteAr: "يتناغم مع كل درجات البشرة والمناسبات",
    shadeNoteEn: "Universal pearlescent shine for all tones",
    swatchHex: "#E7C6A5",
    accentHex: "#FFFFFF",
    priceEgp: 420,
    bestUndertones: ["warm", "cool", "neutral", "olive"],
    bestOccasions: ["bridal", "daily", "gala"],
  },
  {
    id: "m-acc-1",
    code: "M-AC01",
    categoryAr: "إكسسوارات",
    categoryEn: "Accessories",
    titleAr: "أقراط كريستال وذهب عيار 18",
    titleEn: "18K Gold & Crystal Drop Earrings",
    shadeNoteAr: "تُكمل إشراقة الوجه وتزيد فخامة الإطلالة",
    shadeNoteEn: "Frames the face with luminous sparkle",
    swatchHex: "#FBBF24",
    accentHex: "#67E8F9",
    priceEgp: 980,
    bestUndertones: ["warm", "olive", "neutral", "cool"],
    bestOccasions: ["gala", "bridal"],
  },
];

const UNDERTONE_OPTIONS: {
  id: SkinUndertone;
  ar: string;
  en: string;
  hex: string;
}[] = [
  { id: "warm", ar: "دافئة (ذهبية)", en: "Warm Golden", hex: "#D69E66" },
  { id: "olive", ar: "قمحية / زيتونية", en: "Olive / Wheat", hex: "#B68655" },
  { id: "neutral", ar: "محايدة متوازنة", en: "Neutral", hex: "#E2B49A" },
  { id: "cool", ar: "باردة (وردية)", en: "Cool Rosy", hex: "#F2C6C2" },
];

const OCCASION_OPTIONS: { id: OccasionTarget; ar: string; en: string }[] = [
  { id: "daily", ar: "إطلالة يومية", en: "Daily Chic" },
  { id: "gala", ar: "سهرة ملكية", en: "Royal Gala" },
  { id: "bridal", ar: "عرائسي ناعم", en: "Soft Bridal" },
];

interface OrveliaShadeMatchingStudioProps {
  isArabic?: boolean;
  onApplyMatchedLook?: (items: MatchedProductPiece[]) => void;
}

export default function OrveliaShadeMatchingStudio({
  isArabic = true,
  onApplyMatchedLook,
}: OrveliaShadeMatchingStudioProps) {
  const [isDark, setIsDark] = useState(true);
  const [undertone, setUndertone] = useState<SkinUndertone>("olive");
  const [occasion, setOccasion] = useState<OccasionTarget>("gala");

  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [confirmedOrderCode, setConfirmedOrderCode] = useState<string | null>(
    null
  );

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

  // Calculate match score for each catalog piece
  const rankedMatches = useMemo(() => {
    return MATCH_CATALOG.map((piece) => {
      const toneMatch = piece.bestUndertones.includes(undertone);
      const occMatch = piece.bestOccasions.includes(occasion);
      const score =
        toneMatch && occMatch ? 98 : toneMatch || occMatch ? 86 : 74;
      return { piece, score };
    }).sort((a, b) => b.score - a.score);
  }, [undertone, occasion]);

  // Top 4 curated matched bundle
  const topCuratedBundle = useMemo(
    () => rankedMatches.slice(0, 4).map((r) => r.piece),
    [rankedMatches]
  );

  const bundleTotalEgp = useMemo(
    () => topCuratedBundle.reduce((sum, p) => sum + p.priceEgp, 0),
    [topCuratedBundle]
  );

  const addSinglePiece = (piece: MatchedProductPiece) => {
    setCart((prev) => {
      const found = prev.find((c) => c.item.id === piece.id);
      if (found) {
        return prev.map((c) =>
          c.item.id === piece.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { item: piece, qty: 1 }];
    });
    setConfirmedOrderCode(null);
    setCartOpen(true);
  };

  const addFullMatchedBundle = () => {
    setCart((prev) => {
      const next = [...prev];
      topCuratedBundle.forEach((piece) => {
        const idx = next.findIndex((c) => c.item.id === piece.id);
        if (idx >= 0) {
          next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        } else {
          next.push({ item: piece, qty: 1 });
        }
      });
      return next;
    });
    setConfirmedOrderCode(null);
    setCartOpen(true);
  };

  const adjustQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const cartItemsCount = useMemo(
    () => cart.reduce((sum, c) => sum + c.qty, 0),
    [cart]
  );

  const cartSubtotalEgp = useMemo(
    () => cart.reduce((sum, c) => sum + c.item.priceEgp * c.qty, 0),
    [cart]
  );

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setConfirmedOrderCode(`MTC-${Math.floor(100000 + Math.random() * 900000)}`);
    setCart([]);
    setCheckoutMode(false);
  };

  const shellBg = isDark
    ? "bg-[#020202] text-white border-[#CDA434]/30"
    : "bg-slate-50 text-slate-900 border-slate-200";
  const cardSurface = isDark
    ? "bg-[#000b18]/95 border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";
  const muted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div
        className={`relative overflow-hidden rounded-[2.25rem] border p-6 shadow-2xl transition-colors duration-300 sm:p-10 ${shellBg}`}
      >
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#CDA434]/40 bg-[#CDA434]/10 px-3.5 py-1 text-xs font-extrabold text-[#CDA434]">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              {isArabic
                ? "استوديو المطابقة الذكية للألوان والإطلالات"
                : "ORVELIA SMART SHADE MATCHING STUDIO"}
            </span>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "اكتشفي الدرجات المطابقة لبشرتك ومناسبتك"
                : "Match Your Undertone & Occasion to Curated Shades"}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
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
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 px-5 py-2.5 text-xs font-black text-slate-950 shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>{isArabic ? "السلة" : "Bag"}</span>
              <span className="rounded-full bg-slate-950 px-2 py-0.5 text-[11px] font-black text-amber-300">
                {cartItemsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Order Success Banner */}
        {confirmedOrderCode && (
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-400/45 bg-emerald-500/15 p-4 text-xs font-extrabold text-emerald-200 sm:text-sm">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              {isArabic
                ? `تم تأكيد طلب الإطلالة المطابقة! رقم الطلب: ${confirmedOrderCode}`
                : `Matched Look Order Confirmed! ID: ${confirmedOrderCode}`}
            </span>
            <button
              type="button"
              onClick={() => setConfirmedOrderCode(null)}
              className="rounded-xl border border-emerald-400/40 px-3 py-1 text-xs"
            >
              {isArabic ? "إغلاق" : "Dismiss"}
            </button>
          </div>
        )}

        {/* Step 1 & 2: Undertone + Occasion Selectors */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <div className={`rounded-3xl border p-5 lg:col-span-7 ${cardSurface}`}>
            <span className="text-xs font-extrabold text-[#CDA434]">
              {isArabic
                ? "1. حددي درجة بشرتك (Undertone):"
                : "1. Select Your Skin Undertone:"}
            </span>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {UNDERTONE_OPTIONS.map((tone) => {
                const active = undertone === tone.id;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => setUndertone(tone.id)}
                    className={`flex items-center gap-2.5 rounded-2xl border p-3 text-start text-xs font-extrabold transition ${
                      active
                        ? "border-[#CDA434] bg-[#CDA434]/15"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    <span
                      className="h-6 w-6 shrink-0 rounded-full border border-white/40"
                      style={{ backgroundColor: tone.hex }}
                    />
                    <span>{isArabic ? tone.ar : tone.en}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`rounded-3xl border p-5 lg:col-span-5 ${cardSurface}`}>
            <span className="text-xs font-extrabold text-cyan-400">
              {isArabic ? "2. اختاري نوع المناسبة:" : "2. Select Occasion:"}
            </span>
            <div className="mt-3 grid grid-cols-3 gap-2.5">
              {OCCASION_OPTIONS.map((occ) => {
                const active = occasion === occ.id;
                return (
                  <button
                    key={occ.id}
                    type="button"
                    onClick={() => setOccasion(occ.id)}
                    className={`rounded-2xl border py-3 text-xs font-extrabold transition ${
                      active
                        ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                        : "border-white/10 bg-white/[0.03] hover:border-white/25"
                    }`}
                  >
                    {isArabic ? occ.ar : occ.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full Matched Bundle Action Strip */}
        <div
          className={`mt-6 flex flex-col justify-between gap-4 rounded-3xl border p-5 sm:flex-row sm:items-center ${cardSurface}`}
        >
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400">
              <Sparkles className="h-4 w-4" />
              {isArabic
                ? "الطقم المتكامل المطابق لاختيارك (4 قطع متناسقة):"
                : "Top 4-Piece Curated Matched Bundle:"}
            </span>
            <p className={`mt-1 text-xs ${muted}`}>
              {isArabic
                ? `إجمالي الطقم المطابق: ${bundleTotalEgp.toLocaleString()} ج.م`
                : `Complete Matched Set Total: ${bundleTotalEgp.toLocaleString()} EGP`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => onApplyMatchedLook?.(topCuratedBundle)}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-[#CDA434]/45 bg-[#CDA434]/15 px-4 py-2.5 text-xs font-extrabold text-[#CDA434] transition hover:bg-[#CDA434]/25"
            >
              <Wand2 className="h-4 w-4" />
              {isArabic ? "تطبيق الطقم للمعاينة" : "Apply Matched Look"}
            </button>

            <button
              type="button"
              onClick={addFullMatchedBundle}
              className="inline-flex items-center gap-1.5 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 px-5 py-2.5 text-xs font-black text-slate-950 transition hover:opacity-95"
            >
              <ShoppingBag className="h-4 w-4" />
              {isArabic ? "أضيفي الطقم الكامل للسلة" : "Add Full Set to Bag"}
            </button>
          </div>
        </div>

        {/* Ranked Matched Items Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rankedMatches.map(({ piece, score }) => (
            <motion.article
              key={piece.id}
              whileHover={{ y: -3 }}
              className={`flex flex-col justify-between rounded-3xl border p-5 transition ${cardSurface}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-9 w-9 rounded-full border border-white/30"
                      style={{
                        background: `linear-gradient(135deg, ${piece.swatchHex}, ${piece.accentHex})`,
                      }}
                    />
                    <div>
                      <span className="block text-[11px] font-bold text-cyan-400">
                        {isArabic ? piece.categoryAr : piece.categoryEn}
                      </span>
                      <span className="font-mono text-[11px] text-[#CDA434]">
                        {piece.code}
                      </span>
                    </div>
                  </div>

                  <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-1 text-xs font-black text-emerald-300">
                    {score}% {isArabic ? "تطابق" : "Match"}
                  </span>
                </div>

                <h3 className="mt-4 text-base font-black">
                  {isArabic ? piece.titleAr : piece.titleEn}
                </h3>
                <p className={`mt-1 text-xs leading-relaxed ${muted}`}>
                  {isArabic ? piece.shadeNoteAr : piece.shadeNoteEn}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3.5">
                <span className="text-base font-black text-emerald-400">
                  {piece.priceEgp} {isArabic ? "ج.م" : "EGP"}
                </span>

                <button
                  type="button"
                  onClick={() => addSinglePiece(piece)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#CDA434] to-emerald-400 px-3.5 py-2 text-xs font-black text-slate-950 transition hover:opacity-95"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {isArabic ? "أضيفي للسلة" : "Add to Bag"}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Cart & Checkout Drawer */}
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
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-black">
                  {isArabic
                    ? `سلة المطابقة (${cartItemsCount})`
                    : `Matched Bag (${cartItemsCount})`}
                </h3>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="rounded-xl border border-white/15 p-2 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="my-4 flex-1 space-y-3 overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="py-16 text-center text-xs font-bold text-slate-400">
                    {isArabic
                      ? "السلة فارغة — أضيفي قطعة أو الطقم المطابق الكامل."
                      : "Your bag is empty—add a piece or full matched set."}
                  </p>
                ) : !checkoutMode ? (
                  cart.map(({ item, qty }) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 ${cardSurface}`}
                    >
                      <div>
                        <div className="text-xs font-black">
                          {isArabic ? item.titleAr : item.titleEn}
                        </div>
                        <div className="mt-0.5 text-[11px] font-bold text-emerald-400">
                          {item.priceEgp * qty} {isArabic ? "ج.م" : "EGP"}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => adjustQty(item.id, -1)}
                          className="rounded-lg border border-white/15 p-1.5"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-black">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => adjustQty(item.id, 1)}
                          className="rounded-lg border border-white/15 p-1.5"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => adjustQty(item.id, -qty)}
                          className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-1.5 text-rose-400"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <form
                    id="matching-checkout-form"
                    onSubmit={handlePlaceOrder}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-xs font-bold">
                        {isArabic ? "الاسم بالكامل" : "Full Name"}
                      </label>
                      <input
                        required
                        type="text"
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold">
                        {isArabic ? "رقم الموبايل" : "Phone Number"}
                      </label>
                      <input
                        required
                        type="tel"
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold">
                        {isArabic ? "عنوان التوصيل" : "Delivery Address"}
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={buyerAddress}
                        onChange={(e) => setBuyerAddress(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-white/15 bg-black/50 px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </form>
                )}
              </div>

              {cart.length > 0 && (
                <div className="space-y-3 border-t border-white/10 pt-4">
                  <div className="flex justify-between text-base font-black">
                    <span>{isArabic ? "الإجمالي:" : "Total:"}</span>
                    <span className="text-emerald-400">
                      {cartSubtotalEgp.toLocaleString()}{" "}
                      {isArabic ? "ج.م" : "EGP"}
                    </span>
                  </div>

                  {!checkoutMode ? (
                    <button
                      type="button"
                      onClick={() => setCheckoutMode(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 py-3 text-xs font-black text-slate-950 sm:text-sm"
                    >
                      <CreditCard className="h-4 w-4" />
                      {isArabic ? "متابعة الشراء" : "Proceed to Purchase"}
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCheckoutMode(false)}
                        className="rounded-2xl border border-white/15 px-4 py-3 text-xs font-bold"
                      >
                        {isArabic ? "رجوع" : "Back"}
                      </button>
                      <button
                        type="submit"
                        form="matching-checkout-form"
                        className="flex-1 rounded-2xl bg-gradient-to-r from-[#CDA434] to-emerald-400 py-3 text-xs font-black text-slate-950 sm:text-sm"
                      >
                        {isArabic ? "تأكيد الطلب" : "Confirm Order"}
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