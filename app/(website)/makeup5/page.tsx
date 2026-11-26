"use client";
import OrveliaLookCapsuleShelf from "./lenses"
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Sun,
  Moon,
  Sparkles,
  Sliders,
  ShoppingBag,
  Camera,
  Check,
  Layers,
  Shield,
  Zap,
  SplitSquareHorizontal,
} from "lucide-react";

export type LensCategoryFilter = "all" | "natural" | "bold" | "gala" | "limbal";
export type AmbientLightingMode = "daylight" | "studio" | "night";
export type WearDuration = "daily" | "monthly" | "yearly";

export interface CosmosLensModel {
  id: string;
  code: string;
  category: Exclude<LensCategoryFilter, "all">;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  outerRingHex: string;
  midIrisHex: string;
  innerPupilGlowHex: string;
  fleckHex: string;
  opacityLevel: number;
  diameterMm: number;
  baseCurve: string;
  waterContentPct: number;
  basePriceEgp: number;
  skinMatchAr: string;
  skinMatchEn: string;
}

const COSMOS_LENS_COLLECTION: CosmosLensModel[] = [
  {
    id: "cos-1",
    code: "ORV-01",
    category: "natural",
    nameAr: "عسل الصحراء الملكي",
    nameEn: "Royal Desert Honey",
    taglineAr: "دمج ناعم يضيء العيون البنية والداكنة بلمسة دافئة",
    taglineEn: "Seamless golden-hazel blend engineered for deep brown eyes",
    outerRingHex: "#3E1F0D",
    midIrisHex: "#C68336",
    innerPupilGlowHex: "#FDE68A",
    fleckHex: "#FEF3C7",
    opacityLevel: 0.88,
    diameterMm: 14.2,
    baseCurve: "8.6",
    waterContentPct: 58,
    basePriceEgp: 720,
    skinMatchAr: "يناسب البشرة القمحية والسمراء",
    skinMatchEn: "Ideal for Warm & Olive Tones",
  },
  {
    id: "cos-2",
    code: "ORV-02",
    category: "bold",
    nameAr: "زمرد أتلانتس الجليدي",
    nameEn: "Atlantis Ice Emerald",
    taglineAr: "أخضر يشمي كريستالي بتدرج ثلاثي الأبعاد",
    taglineEn: "3D crystal jade emerald with luminous starburst flecks",
    outerRingHex: "#042F2E",
    midIrisHex: "#10B981",
    innerPupilGlowHex: "#A7F3D0",
    fleckHex: "#ECFDF5",
    opacityLevel: 0.92,
    diameterMm: 14.4,
    baseCurve: "8.7",
    waterContentPct: 62,
    basePriceEgp: 790,
    skinMatchAr: "يناسب جميع درجات البشرة",
    skinMatchEn: "Universal High-Contrast Glow",
  },
  {
    id: "cos-3",
    code: "ORV-03",
    category: "gala",
    nameAr: "بلاتين السحاب الفضي",
    nameEn: "Silver Cloud Platinum",
    taglineAr: "رمادي بلاتيني فخم للسهرات والتصوير الاحترافي",
    taglineEn: "Editorial platinum-grey designed for evening & flash photography",
    outerRingHex: "#0F172A",
    midIrisHex: "#94A3B8",
    innerPupilGlowHex: "#E0F2FE",
    fleckHex: "#FFFFFF",
    opacityLevel: 0.94,
    diameterMm: 14.5,
    baseCurve: "8.6",
    waterContentPct: 60,
    basePriceEgp: 840,
    skinMatchAr: "يناسب البشرة الفاتحة والمحايدة",
    skinMatchEn: "Best for Cool & Neutral Undertones",
  },
  {
    id: "cos-4",
    code: "ORV-04",
    category: "limbal",
    nameAr: "توسيع كوارتز الكريستال",
    nameEn: "Crystal Quartz Enlarging",
    taglineAr: "حلقة خارجية محددة تمنح العين اتساعاً ونعومة فائقة",
    taglineEn: "Defined limbal ring for doll-like eye definition & clarity",
    outerRingHex: "#1E1B4B",
    midIrisHex: "#6366F1",
    innerPupilGlowHex: "#C7D2FE",
    fleckHex: "#EEF2FF",
    opacityLevel: 0.9,
    diameterMm: 14.5,
    baseCurve: "8.7",
    waterContentPct: 64,
    basePriceEgp: 810,
    skinMatchAr: "إطلالة عيون واسعة ومشرقة",
    skinMatchEn: "Wide-Eyed Luminous Look",
  },
  {
    id: "cos-5",
    code: "ORV-05",
    category: "natural",
    nameAr: "بندق كراميل حريري",
    nameEn: "Silky Caramel Hazelnut",
    taglineAr: "لون يومي فائق الطبيعية يصعب تمييزه عن لون العين",
    taglineEn: "Ultra-realistic daily hazelnut tint with zero harsh edges",
    outerRingHex: "#451A03",
    midIrisHex: "#A16207",
    innerPupilGlowHex: "#FDE047",
    fleckHex: "#FEF9C3",
    opacityLevel: 0.84,
    diameterMm: 14.0,
    baseCurve: "8.6",
    waterContentPct: 58,
    basePriceEgp: 690,
    skinMatchAr: "مثالي للاستخدام اليومي والعمل",
    skinMatchEn: "Everyday Natural Perfection",
  },
  {
    id: "cos-6",
    code: "ORV-06",
    category: "gala",
    nameAr: "أكوا السفير الملكي",
    nameEn: "Royal Sapphire Aqua",
    taglineAr: "أزرق ياقوتي عميق ببريق ذهبي داخلي ساحر",
    taglineEn: "Deep ocean sapphire infused with a warm golden inner ring",
    outerRingHex: "#082F49",
    midIrisHex: "#0284C7",
    innerPupilGlowHex: "#FBBF24",
    fleckHex: "#E0F2FE",
    opacityLevel: 0.93,
    diameterMm: 14.3,
    baseCurve: "8.6",
    waterContentPct: 60,
    basePriceEgp: 860,
    skinMatchAr: "إطلالة سهرة جريئة ولافتة",
    skinMatchEn: "Statement Evening Glamour",
  },
];

const POWER_OPTIONS = [
  "0.00 (تجميلي)",
  "-0.50",
  "-1.00",
  "-1.50",
  "-2.00",
  "-2.50",
  "-3.00",
  "-3.50",
  "-4.00",
  "-5.00",
];

interface OrveliaIrisCosmosStudioProps {
  isArabic?: boolean;
  onApplyToLiveCamera?: (lens: CosmosLensModel) => void;
  onAddOrderToBag?: (order: {
    lens: CosmosLensModel;
    duration: WearDuration;
    leftPower: string;
    rightPower: string;
    totalPriceEgp: number;
  }) => void;
}

export default function OrveliaIrisCosmosStudio({
  isArabic = true,
  onApplyToLiveCamera,
  onAddOrderToBag,
}: OrveliaIrisCosmosStudioProps) {
  const [selectedLens, setSelectedLens] = useState<CosmosLensModel>(
    COSMOS_LENS_COLLECTION[0]
  );
  const [categoryFilter, setCategoryFilter] =
    useState<LensCategoryFilter>("all");
  const [lighting, setLighting] = useState<AmbientLightingMode>("studio");
  const [splitComparePct, setSplitComparePct] = useState<number>(68);
  const [duration, setDuration] = useState<WearDuration>("monthly");
  const [leftPower, setLeftPower] = useState<string>(POWER_OPTIONS[0]);
  const [rightPower, setRightPower] = useState<string>(POWER_OPTIONS[0]);
  const [limbalBoost, setLimbalBoost] = useState<number>(80);

  const filteredLenses = useMemo(() => {
    if (categoryFilter === "all") return COSMOS_LENS_COLLECTION;
    return COSMOS_LENS_COLLECTION.filter((l) => l.category === categoryFilter);
  }, [categoryFilter]);

  // Pupil size reacts dynamically to lighting mode
  const pupilSizePx =
    lighting === "daylight" ? 30 : lighting === "studio" ? 42 : 56;

  const finalPrice = useMemo(() => {
    const mult =
      duration === "daily" ? 0.85 : duration === "monthly" ? 1 : 1.55;
    return Math.round(selectedLens.basePriceEgp * mult);
  }, [selectedLens, duration]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-[#040711] shadow-[0_25px_90px_rgba(0,0,0,0.85)]">
        {/* Ambient Top Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 inset-x-1/4 h-64 rounded-full opacity-30 blur-3xl transition-colors duration-500"
          style={{
            background: `radial-gradient(circle, ${selectedLens.midIrisHex}, #fbbf24, transparent)`,
          }}
        />

        {/* Top Command Header */}
        <div className="relative z-10 flex flex-col justify-between gap-5 border-b border-white/10 px-6 py-6 sm:px-10 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-extrabold text-amber-300">
              <Zap className="h-3.5 w-3.5" />
              <span>
                {isArabic
                  ? "مختبر أورفيليا البصري المتقدم 3D"
                  : "ORVELIA 3D BIOMETRIC IRIS LAB"}
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
              {isArabic
                ? "استوديو محاكاة القزحية والإضاءة والقياسات الطبية"
                : "Full-Scale Iris Anatomy, Lighting & Prescription Studio"}
            </h2>
          </div>

          {/* Ambient Lighting Switcher */}
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-[#090f20] p-1.5">
            {[
              {
                id: "daylight" as const,
                icon: Sun,
                labelAr: "ضوء النهار",
                labelEn: "Daylight",
              },
              {
                id: "studio" as const,
                icon: Sparkles,
                labelAr: "إضاءة استوديو",
                labelEn: "Studio",
              },
              {
                id: "night" as const,
                icon: Moon,
                labelAr: "سهرة ليلية",
                labelEn: "Night Gala",
              },
            ].map((mode) => {
              const Icon = mode.icon;
              const active = lighting === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setLighting(mode.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold transition ${
                    active
                      ? "bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 shadow-md"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {isArabic ? mode.labelAr : mode.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Mega Grid */}
        <div className="relative z-10 grid grid-cols-1 gap-8 p-6 sm:p-10 xl:grid-cols-12">
          {/* LEFT 7 COLS: Ultra-HD Dual Eye Simulator + Split Comparison Curtain */}
          <div className="flex flex-col justify-between space-y-6 xl:col-span-7">
            {/* Simulator Viewport */}
            <div
              className={`relative overflow-hidden rounded-3xl border border-white/15 p-6 transition-colors duration-500 sm:p-8 ${
                lighting === "daylight"
                  ? "bg-gradient-to-b from-slate-800/90 to-[#0a1122]"
                  : lighting === "studio"
                  ? "bg-gradient-to-b from-[#0d162c] to-[#050914]"
                  : "bg-gradient-to-b from-[#03050c] to-black"
              }`}
            >
              {/* Top HUD */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-mono font-bold text-cyan-300">
                  {selectedLens.code} · DIA {selectedLens.diameterMm}mm · BC{" "}
                  {selectedLens.baseCurve}
                </span>
                <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-3 py-0.5 text-[11px] font-extrabold text-emerald-300">
                  {isArabic ? selectedLens.skinMatchAr : selectedLens.skinMatchEn}
                </span>
              </div>

              {/* Dual Eye Stage */}
              <div className="my-8 grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
                {[0, 1].map((eyeIdx) => (
                  <div
                    key={eyeIdx}
                    className="relative mx-auto flex h-44 w-72 items-center justify-center overflow-hidden rounded-[100%] border border-white/20 bg-gradient-to-b from-slate-200 via-white to-slate-300 shadow-[inset_0_8px_24px_rgba(0,0,0,0.45)]"
                  >
                    {/* Natural Dark Brown Base Iris (Always underneath for Before/After split) */}
                    <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[6px] border-[#1c0d06] bg-[radial-gradient(circle,#5c3317_30%,#2b1408_95%)]">
                      {/* Colored Contact Lens Overlay clipped by splitComparePct */}
                      <motion.div
                        key={selectedLens.id}
                        initial={{ scale: 0.92, opacity: 0.6 }}
                        animate={{ scale: 1, opacity: selectedLens.opacityLevel }}
                        transition={{ duration: 0.35 }}
                        style={{
                          clipPath: `inset(0 ${100 - splitComparePct}% 0 0)`,
                          background: `radial-gradient(circle, ${selectedLens.innerPupilGlowHex} 22%, ${selectedLens.midIrisHex} 58%, ${selectedLens.outerRingHex} 96%)`,
                          borderWidth: `${Math.max(4, Math.round((limbalBoost / 100) * 11))}px`,
                          borderColor: selectedLens.outerRingHex,
                        }}
                        className="absolute inset-0 flex items-center justify-center rounded-full"
                      >
                        {/* Radial Iris Fiber Lines */}
                        <div
                          aria-hidden="true"
                          className="h-full w-full rounded-full opacity-35"
                          style={{
                            backgroundImage:
                              "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.35) 0deg 2deg, transparent 2deg 9deg)",
                          }}
                        />
                      </motion.div>

                      {/* Dynamic Pupil */}
                      <motion.div
                        animate={{ width: pupilSizePx, height: pupilSizePx }}
                        transition={{ type: "spring", stiffness: 200, damping: 22 }}
                        className="relative z-10 rounded-full bg-black shadow-[0_0_12px_rgba(0,0,0,0.9)]"
                      />

                      {/* Studio Catchlight Reflections */}
                      <span
                        style={{ backgroundColor: selectedLens.fleckHex }}
                        className="absolute top-6 end-8 z-20 h-4 w-6 -rotate-12 rounded-full opacity-90 blur-[0.5px]"
                      />
                      <span
                        style={{ backgroundColor: selectedLens.fleckHex }}
                        className="absolute bottom-8 start-9 z-20 h-2 w-2 rounded-full opacity-75"
                      />
                    </div>

                    {/* Split Divider Line */}
                    <div
                      style={{ left: `${splitComparePct}%` }}
                      className="pointer-events-none absolute inset-y-0 z-30 w-0.5 bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                    />
                  </div>
                ))}
              </div>

              {/* Interactive Before / After Curtain Control */}
              <div className="rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-md">
                <div className="mb-2 flex items-center justify-between text-xs font-extrabold">
                  <span className="inline-flex items-center gap-1.5 text-amber-300">
                    <SplitSquareHorizontal className="h-4 w-4" />
                    {isArabic
                      ? "مقارنة التغطية (العدسة مقابل العين الطبيعية):"
                      : "Before / After Lens Coverage Split:"}
                  </span>
                  <span className="font-mono text-cyan-300">
                    {splitComparePct}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={splitComparePct}
                  onChange={(e) => setSplitComparePct(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>

            {/* Technical Specs & Limbal Ring Tuning */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#080e1e] p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <span>{isArabic ? "نسبة الأكسجين والترطيب" : "Hydration"}</span>
                </div>
                <div className="mt-1.5 text-xl font-black text-emerald-400">
                  {selectedLens.waterContentPct}% H₂O
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#080e1e] p-4 sm:col-span-2">
                <div className="mb-1.5 flex items-center justify-between text-xs font-extrabold">
                  <span className="text-slate-300">
                    {isArabic
                      ? "تحديد الحلقة الخارجية للعدسة (Limbal Ring):"
                      : "Limbal Ring Definition Intensity:"}
                  </span>
                  <span className="text-amber-300">{limbalBoost}%</span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={100}
                  value={limbalBoost}
                  onChange={(e) => setLimbalBoost(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
              </div>
            </div>
          </div>

          {/* RIGHT 5 COLS: Shade Matrix + Prescription Power + Bag Checkout */}
          <div className="flex flex-col justify-between space-y-5 rounded-3xl border border-white/10 bg-[#080d1b] p-6 xl:col-span-5">
            <div>
              {/* Category Filter Bar */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { key: "all" as const, ar: "الكل", en: "All" },
                  { key: "natural" as const, ar: "طبيعي", en: "Natural" },
                  { key: "bold" as const, ar: "جريء", en: "Bold" },
                  { key: "gala" as const, ar: "سهرة", en: "Gala" },
                  { key: "limbal" as const, ar: "توسيع", en: "Enlarging" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setCategoryFilter(tab.key)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-extrabold transition ${
                      categoryFilter === tab.key
                        ? "bg-amber-400 text-slate-950"
                        : "bg-white/5 text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {isArabic ? tab.ar : tab.en}
                  </button>
                ))}
              </div>

              {/* Shade Cards */}
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {filteredLenses.map((lens) => {
                  const active = lens.id === selectedLens.id;
                  return (
                    <button
                      key={lens.id}
                      type="button"
                      onClick={() => setSelectedLens(lens)}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-start transition ${
                        active
                          ? "border-amber-400 bg-amber-500/15 text-white shadow-md"
                          : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/25"
                      }`}
                    >
                      <span
                        className="h-9 w-9 shrink-0 rounded-full border-2 shadow-inner"
                        style={{
                          background: `radial-gradient(circle, ${lens.innerPupilGlowHex} 18%, ${lens.midIrisHex} 65%, ${lens.outerRingHex} 100%)`,
                          borderColor: lens.outerRingHex,
                        }}
                      />
                      <div className="min-w-0">
                        <div className="truncate text-xs font-black">
                          {isArabic ? lens.nameAr : lens.nameEn}
                        </div>
                        <div className="text-[11px] font-bold text-emerald-400">
                          {lens.basePriceEgp} {isArabic ? "ج.م" : "EGP"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Duration & Prescription Selector */}
              <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
                <div>
                  <span className="block text-[11px] font-extrabold text-slate-400">
                    {isArabic ? "مدة الاستخدام:" : "Replacement Cycle:"}
                  </span>
                  <div className="mt-1.5 grid grid-cols-3 gap-2">
                    {[
                      { id: "daily" as const, ar: "يومية", en: "Daily" },
                      { id: "monthly" as const, ar: "شهرية", en: "Monthly" },
                      { id: "yearly" as const, ar: "سنوية", en: "Yearly" },
                    ].map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDuration(d.id)}
                        className={`rounded-xl border py-2 text-xs font-extrabold transition ${
                          duration === d.id
                            ? "border-cyan-400 bg-cyan-500/15 text-cyan-200"
                            : "border-white/10 bg-white/[0.02] text-slate-300"
                        }`}
                      >
                        {isArabic ? d.ar : d.en}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Left & Right Eye Power (SPH) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400">
                      {isArabic ? "قياس العين اليسرى (L):" : "Left Eye (SPH):"}
                    </label>
                    <select
                      value={leftPower}
                      onChange={(e) => setLeftPower(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-[#040711] px-3 py-2 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                    >
                      {POWER_OPTIONS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400">
                      {isArabic ? "قياس العين اليمنى (R):" : "Right Eye (SPH):"}
                    </label>
                    <select
                      value={rightPower}
                      onChange={(e) => setRightPower(e.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/15 bg-[#040711] px-3 py-2 text-xs font-bold text-white focus:border-amber-400 focus:outline-none"
                    >
                      {POWER_OPTIONS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Summary & CTA Buttons */}
            <div className="rounded-2xl border border-white/10 bg-[#040711] p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="block text-[11px] font-bold text-slate-400">
                    {isArabic ? "الإجمالي النهائي:" : "Total Price:"}
                  </span>
                  <span className="text-xs font-extrabold text-amber-300">
                    {isArabic ? selectedLens.nameAr : selectedLens.nameEn}
                  </span>
                </div>
                <span className="text-2xl font-black text-emerald-400">
                  {finalPrice.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => onApplyToLiveCamera?.(selectedLens)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-400/45 bg-amber-500/15 px-4 py-3 text-xs font-extrabold text-amber-200 transition hover:bg-amber-500/25"
                >
                  <Camera className="h-4 w-4" />
                  {isArabic ? "جرّبيها بالكاميرا" : "Live Camera Try-On"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onAddOrderToBag?.({
                      lens: selectedLens,
                      duration,
                      leftPower,
                      rightPower,
                      totalPriceEgp: finalPrice,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 px-4 py-3 text-xs font-extrabold text-slate-950 transition hover:opacity-95"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {isArabic ? "أضيفي العدسات للحقيبة" : "Add Lenses to Bag"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OrveliaLookCapsuleShelf />
    </section>
  );
}