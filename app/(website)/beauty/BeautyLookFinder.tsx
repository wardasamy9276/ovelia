"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

type OccasionKey = "everyday" | "glam" | "bridal" | "office";
type ToneKey = "warm" | "neutral" | "cool";

interface RecommendedStep {
  stepNumber: number;
  roleAr: string;
  roleEn: string;
  productAr: string;
  productEn: string;
  shadeAr: string;
  shadeEn: string;
  shadeHex: string;
  priceEgp: number;
  tipAr: string;
  tipEn: string;
}

const OCCASIONS: {
  key: OccasionKey;
  icon: string;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
}[] = [
  {
    key: "everyday",
    icon: "☀️",
    ar: "إطلالة يومية ناعمة",
    en: "Soft Everyday Glow",
    descAr: "تغطية خفيفة وتورّد طبيعي يدوم طوال اليوم",
    descEn: "Lightweight coverage & natural flush all day",
  },
  {
    key: "office",
    icon: "💼",
    ar: "إطلالة عمل أنيقة",
    en: "Chic Work & Morning",
    descAr: "ثبات بدون لمعان وألوان نيود متزنة",
    descEn: "Shine-free hold with balanced nude tones",
  },
  {
    key: "glam",
    icon: "✨",
    ar: "سهرة وجاذبية مسائية",
    en: "Evening Velvet Glam",
    descAr: "آيلاينر حاد ودرجات شفاه غنية مع إضاءة ذهبية",
    descEn: "Sharp winged liner, rich lips & golden highlight",
  },
  {
    key: "bridal",
    icon: "👑",
    ar: "مناسبات وإطلالة فاخرة",
    en: "Luxury Occasion & Bridal",
    descAr: "ثبات 24 ساعة وإشراقة متكاملة للتصوير",
    descEn: "24h camera-ready finish & luminous radiance",
  },
];

const UNDERTONES: {
  key: ToneKey;
  ar: string;
  en: string;
  hex: string;
  hintAr: string;
  hintEn: string;
}[] = [
  {
    key: "warm",
    ar: "دافئ (Warm)",
    en: "Warm Undertone",
    hex: "#E8C39E",
    hintAr: "عروق المعصم تميل للأخضر والذهب يناسبك",
    hintEn: "Greenish veins & gold jewelry flatters you",
  },
  {
    key: "neutral",
    ar: "محايد (Neutral)",
    en: "Neutral Undertone",
    hex: "#DDA97E",
    hintAr: "توازن بين الدافئ والبارد وتناسبك أغلب الدرجات",
    hintEn: "Balanced tone — both gold and silver suit you",
  },
  {
    key: "cool",
    ar: "بارد (Cool)",
    en: "Cool Undertone",
    hex: "#F0D1B2",
    hintAr: "عروق المعصم تميل للأزرق أو البنفسجي",
    hintEn: "Bluish/purple veins & silver tones glow on you",
  },
];

function buildLookRoutine(
  occasion: OccasionKey,
  tone: ToneKey
): RecommendedStep[] {
  const concealerByTone: Record<
    ToneKey,
    { ar: string; en: string; hex: string }
  > = {
    warm: { ar: "فانيلا دافئة (03W)", en: "Warm Vanilla (03W)", hex: "#E8C39E" },
    neutral: { ar: "بيج محايد (05N)", en: "Neutral Beige (05N)", hex: "#DDA97E" },
    cool: { ar: "عاجي بارد (07C)", en: "Cool Ivory (07C)", hex: "#F0D1B2" },
  };

  const lipByOccasionAndTone: Record<
    OccasionKey,
    Record<ToneKey, { ar: string; en: string; hex: string }>
  > = {
    everyday: {
      warm: { ar: "كراميل جلوس (L08)", en: "Caramel Gloss (L08)", hex: "#D4886A" },
      neutral: { ar: "نيود روز (L01)", en: "Nude Rose (L01)", hex: "#C97A7E" },
      cool: { ar: "وردي ناعم (L03)", en: "Soft Petal Pink (L03)", hex: "#D87A96" },
    },
    office: {
      warm: { ar: "خوخي مطفي (L02)", en: "Matte Peach Nude (L02)", hex: "#C67B67" },
      neutral: { ar: "روز وود (L05)", en: "Rosewood Satin (L05)", hex: "#B56576" },
      cool: { ar: "موف هادئ (L06)", en: "Muted Mauve (L06)", hex: "#A85D78" },
    },
    glam: {
      warm: { ar: "أحمر دافئ مخملي (L09)", en: "Warm Velvet Red (L09)", hex: "#B8293D" },
      neutral: { ar: "توتي عميق (L04)", en: "Velvet Berry (L04)", hex: "#9E2A4B" },
      cool: { ar: "كرزي غني (L10)", en: "Rich Cherry (L10)", hex: "#8B1E3F" },
    },
    bridal: {
      warm: { ar: "نيود شامبانيا (L11)", en: "Champagne Nude (L11)", hex: "#C97E73" },
      neutral: { ar: "وردي ملكي (L12)", en: "Royal Rose (L12)", hex: "#C05A74" },
      cool: { ar: "توتي ناعم (L07)", en: "Soft Berry Satin (L07)", hex: "#AC4668" },
    },
  };

  const blushByTone: Record<ToneKey, { ar: string; en: string; hex: string }> = {
    warm: { ar: "خوخي مشرق (B03)", en: "Radiant Peach (B03)", hex: "#F29B7E" },
    neutral: { ar: "وردي مخملي (B02)", en: "Velvet Rose (B02)", hex: "#E17B8B" },
    cool: { ar: "وردي بارد (B01)", en: "Cool Blossom (B01)", hex: "#EC7FA9" },
  };

  const linerByOccasion: Record<
    OccasionKey,
    { prodAr: string; prodEn: string; shadeAr: string; shadeEn: string; hex: string }
  > = {
    everyday: {
      prodAr: "كحل كريمي ناعم + ماسكارا رفع",
      prodEn: "Creamy Kajal + Lift Mascara",
      shadeAr: "بني إسبرسو (E02)",
      shadeEn: "Espresso Brown (E02)",
      hex: "#3E2723",
    },
    office: {
      prodAr: "آيلاينر قلم دقيق ثابت",
      prodEn: "Fine-Tip Precision Liner",
      shadeAr: "أسود ناعم (E01)",
      shadeEn: "Soft Jet Black (E01)",
      hex: "#1F2937",
    },
    glam: {
      prodAr: "آيلاينر سائل ووتر بروف 24 ساعة",
      prodEn: "24h Waterproof Liquid Eyeliner",
      shadeAr: "أسود فاحم (E01)",
      shadeEn: "Jet Black (E01)",
      hex: "#090D16",
    },
    bridal: {
      prodAr: "آيلاينر جل + ماسكارا تكثيف مقاومة للدموع",
      prodEn: "Gel Liner + Tear-Proof Volume Mascara",
      shadeAr: "أسود عميق (E01)",
      shadeEn: "Deep Velvet Black (E01)",
      hex: "#0F172A",
    },
  };

  const conc = concealerByTone[tone];
  const lip = lipByOccasionAndTone[occasion][tone];
  const blush = blushByTone[tone];
  const liner = linerByOccasion[occasion];

  return [
    {
      stepNumber: 1,
      roleAr: "توحيد وإشراقة تحت العين",
      roleEn: "Under-Eye Brighten & Conceal",
      productAr: "كونسيلر أورفيليا المخملي",
      productEn: "Orvelia Velvet Concealer",
      shadeAr: conc.ar,
      shadeEn: conc.en,
      shadeHex: conc.hex,
      priceEgp: 690,
      tipAr: "نقطتين عند زاوية العين الداخلية ودمج خفيف بطبطبة ناعمة.",
      tipEn: "Apply two dots at inner corner and tap gently to blend.",
    },
    {
      stepNumber: 2,
      roleAr: "تحديد العيون والرموش",
      roleEn: "Eye Definition & Lashes",
      productAr: liner.prodAr,
      productEn: liner.prodEn,
      shadeAr: liner.shadeAr,
      shadeEn: liner.shadeEn,
      shadeHex: liner.hex,
      priceEgp: 540,
      tipAr: "اسحبي الخط بمحاذاة الجفن السفلي لرفع شكل العين.",
      tipEn: "Wing slightly upward following your lower lash line.",
    },
    {
      stepNumber: 3,
      roleAr: "تورّد الخدود والإضاءة",
      roleEn: "Cheek Flush & Luminosity",
      productAr: "بلاشر كريمي مخملي أورفيليا",
      productEn: "Orvelia Velvet Cream Blush",
      shadeAr: blush.ar,
      shadeEn: blush.en,
      shadeHex: blush.hex,
      priceEgp: 610,
      tipAr: "وزّعيه أعلى عظمة الخد باتجاه الصدغ لمظهر مرفوع.",
      tipEn: "Blend high on cheekbones toward temples for a lifted look.",
    },
    {
      stepNumber: 4,
      roleAr: "لمسة الشفاه النهائية",
      roleEn: "Signature Lip Finish",
      productAr: "أحمر شفاه أورفيليا المرطب",
      productEn: "Orvelia Hydrating Lipstick",
      shadeAr: lip.ar,
      shadeEn: lip.en,
      shadeHex: lip.hex,
      priceEgp: 580,
      tipAr: "طبقة واحدة لإطلالة ناعمة أو طبقتين للون غني ومخملي.",
      tipEn: "One swipe for soft tint or two layers for rich velvet color.",
    },
  ];
}

export default function BeautyLookFinder() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);
  const [selectedOccasion, setSelectedOccasion] =
    useState<OccasionKey>("everyday");
  const [selectedTone, setSelectedTone] = useState<ToneKey>("warm");
  const [savedBundleToast, setSavedBundleToast] = useState(false);

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

  const routine = useMemo(
    () => buildLookRoutine(selectedOccasion, selectedTone),
    [selectedOccasion, selectedTone]
  );

  const totalOriginalPrice = useMemo(
    () => routine.reduce((sum, item) => sum + item.priceEgp, 0),
    [routine]
  );

  const bundleDiscountPrice = Math.round(totalOriginalPrice * 0.85);

  const cardSurface = isDark
    ? "bg-[#0a101f]/95 border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";

  const subSurface = isDark
    ? "bg-[#060a14] border-white/10"
    : "bg-slate-50 border-slate-200";

  const muted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <section
      dir={dir}
      className={`mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8`}
    >
      <div className={`rounded-3xl border p-6 sm:p-8 ${cardSurface}`}>
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3.5 py-1 text-xs font-extrabold text-emerald-300">
              <span>🪄</span>
              <span>
                {isArabic
                  ? "مُصمِّم الإطلالات الذكي من أورفيليا"
                  : "ORVELIA AI LOOK DESIGNER"}
              </span>
            </span>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "صمّمي إطلالتك المتكاملة في خطوتين"
                : "Design Your Complete Beauty Look in 2 Steps"}
            </h2>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "اختاري مناسبتك وأندرتون بشرتك، وسيقترح لكِ النظام درجات الكونسيلر، الآيلاينر، البلاشر، وأحمر الشفاه المتناغمة."
                : "Pick your occasion and skin undertone to get a matched routine of concealer, liner, blush, and lipstick."}
            </p>
          </div>

          <div
            className={`rounded-2xl border px-4 py-3 text-center ${subSurface}`}
          >
            <span className={`block text-[11px] font-bold ${muted}`}>
              {isArabic ? "باقة الإطلالة الكاملة (خصم 15%)" : "Complete Look Bundle (15% OFF)"}
            </span>
            <div className="mt-1 flex items-baseline justify-center gap-2">
              <span className="text-xl font-black text-emerald-400">
                {bundleDiscountPrice.toLocaleString()}{" "}
                {isArabic ? "ج.م" : "EGP"}
              </span>
              <span className="text-xs line-through text-rose-400/80">
                {totalOriginalPrice.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
              </span>
            </div>
          </div>
        </div>

        {/* Step 1 & Step 2 Controls */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Step 1: Occasion */}
          <div className="space-y-3 lg:col-span-7">
            <h3 className="text-sm font-extrabold text-amber-300">
              {isArabic ? "1. اختاري نوع الإطلالة والمناسبة:" : "1. Choose Your Occasion:"}
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {OCCASIONS.map((occ) => {
                const active = selectedOccasion === occ.key;
                return (
                  <button
                    key={occ.key}
                    type="button"
                    onClick={() => setSelectedOccasion(occ.key)}
                    className={`flex items-start gap-3 rounded-2xl border p-4 text-start transition ${
                      active
                        ? "border-amber-400 bg-gradient-to-l from-amber-500/15 to-emerald-500/10"
                        : isDark
                        ? "border-white/10 bg-white/[0.03] hover:border-white/25"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400/15 text-xl">
                      {occ.icon}
                    </span>
                    <div>
                      <p className="text-xs font-extrabold sm:text-sm">
                        {isArabic ? occ.ar : occ.en}
                      </p>
                      <p className={`mt-1 text-[11px] leading-relaxed ${muted}`}>
                        {isArabic ? occ.descAr : occ.descEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Undertone */}
          <div className="space-y-3 lg:col-span-5">
            <h3 className="text-sm font-extrabold text-cyan-300">
              {isArabic ? "2. حددي أندرتون بشرتك:" : "2. Select Your Skin Undertone:"}
            </h3>

            <div className="space-y-2.5">
              {UNDERTONES.map((tone) => {
                const active = selectedTone === tone.key;
                return (
                  <button
                    key={tone.key}
                    type="button"
                    onClick={() => setSelectedTone(tone.key)}
                    className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-3.5 text-start transition ${
                      active
                        ? "border-cyan-400 bg-cyan-500/15"
                        : isDark
                        ? "border-white/10 bg-white/[0.03] hover:border-white/25"
                        : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-8 w-8 shrink-0 rounded-full border-2 border-white/30 shadow-inner"
                        style={{ backgroundColor: tone.hex }}
                      />
                      <div>
                        <p className="text-xs font-extrabold sm:text-sm">
                          {isArabic ? tone.ar : tone.en}
                        </p>
                        <p className={`text-[11px] ${muted}`}>
                          {isArabic ? tone.hintAr : tone.hintEn}
                        </p>
                      </div>
                    </div>

                    {active && (
                      <span className="rounded-full bg-cyan-400 px-2.5 py-0.5 text-[10px] font-black text-slate-950">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generated 4-Step Matched Routine */}
        <div className="mt-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-extrabold">
              {isArabic
                ? "✨ الدرجات والخطوات المرشّحة لإطلالتك:"
                : "✨ Recommended Matched Shades & Steps:"}
            </h3>

            {savedBundleToast && (
              <span className="rounded-full border border-emerald-400/40 bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-300">
                ✓{" "}
                {isArabic
                  ? "تم حفظ الإطلالة في مفضلتك!"
                  : "Look saved to your favorites!"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {routine.map((step) => (
              <div
                key={step.stepNumber}
                className={`flex flex-col justify-between rounded-2xl border p-4 ${subSurface}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-amber-400/15 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-300">
                      {isArabic
                        ? `الخطوة ${step.stepNumber}`
                        : `Step ${step.stepNumber}`}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400">
                      {step.priceEgp} {isArabic ? "ج.م" : "EGP"}
                    </span>
                  </div>

                  <p className="mt-2.5 text-[11px] font-bold text-cyan-400">
                    {isArabic ? step.roleAr : step.roleEn}
                  </p>
                  <h4 className="mt-0.5 text-sm font-extrabold">
                    {isArabic ? step.productAr : step.productEn}
                  </h4>

                  {/* Matched Shade Swatch */}
                  <div className="mt-3 flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2.5">
                    <span
                      className="h-6 w-6 shrink-0 rounded-full border border-white/30"
                      style={{ backgroundColor: step.shadeHex }}
                    />
                    <span className="text-xs font-bold">
                      {isArabic ? step.shadeAr : step.shadeEn}
                    </span>
                  </div>

                  <p className={`mt-3 text-[11px] leading-relaxed ${muted}`}>
                    💡 {isArabic ? step.tipAr : step.tipEn}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={() => {
                setSavedBundleToast(true);
                setTimeout(() => setSavedBundleToast(false), 3000);
              }}
              className={`rounded-2xl border px-5 py-2.5 text-xs font-extrabold transition sm:text-sm ${
                isDark
                  ? "border-white/15 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-100"
              }`}
            >
              ♥ {isArabic ? "احفظي هذه الإطلالة" : "Save This Look"}
            </button>

            <Link
              href="/try-on"
              className="rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 px-6 py-2.5 text-xs font-extrabold text-slate-950 shadow-md transition hover:opacity-95 sm:text-sm"
            >
              🪞{" "}
              {isArabic
                ? "جرّبي الإطلالة كاملة بالكاميرا AR"
                : "Try Full Look on Live AR"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}