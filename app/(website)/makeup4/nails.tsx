"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Clock, ShieldCheck, ShoppingBag, Camera } from "lucide-react";

export interface NailLookbookPreset {
  id: string;
  occasionAr: string;
  occasionEn: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  shapeNameAr: string;
  shapeNameEn: string;
  primaryHex: string;
  shimmerHex: string;
  wearDays: number;
  cureMinutes: number;
  priceEgp: number;
}

const LOOKBOOK_PRESETS: NailLookbookPreset[] = [
  {
    id: "look-gala",
    occasionAr: "سهرة ملكية",
    occasionEn: "Royal Gala",
    titleAr: "روبي مخملي بلمعة ذهب 24K",
    titleEn: "Velvet Ruby & 24K Gold Mist",
    descriptionAr:
      "لون روبي عميق بلمعان مرآتي ولمسة ذهبية ناعمة تناسب السهرات والمناسبات الفاخرة.",
    descriptionEn:
      "Rich ruby shade with mirror gel gloss and a delicate golden shimmer for evening events.",
    shapeNameAr: "لوزي أنيق (Almond)",
    shapeNameEn: "Almond",
    primaryHex: "#B81D43",
    shimmerHex: "#FBBF24",
    wearDays: 21,
    cureMinutes: 15,
    priceEgp: 480,
  },
  {
    id: "look-bridal",
    occasionAr: "عرائسي ناعم",
    occasionEn: "Soft Bridal",
    titleAr: "فرينش لؤلؤي شامبين",
    titleEn: "Champagne Pearl French",
    descriptionAr:
      "إطلالة عرائسية راقية تجمع بين النيود الحريري وطرف لؤلؤي يضيء اليد بنعومة.",
    descriptionEn:
      "Refined bridal manicure blending silky nude with a luminous pearl tip.",
    shapeNameAr: "فرينش تيب (French Tip)",
    shapeNameEn: "French Tip",
    primaryHex: "#E7C6A5",
    shimmerHex: "#FFFFFF",
    wearDays: 18,
    cureMinutes: 12,
    priceEgp: 450,
  },
  {
    id: "look-daily",
    occasionAr: "يومي أنيق",
    occasionEn: "Daily Chic",
    titleAr: "نيود روز حريري",
    titleEn: "Silky Nude Rose",
    descriptionAr:
      "درجة روز طبيعية متوازنة للعمل والطلعات اليومية مع ثبات عالٍ ولمعان نظيف.",
    descriptionEn:
      "Balanced rose-nude polish crafted for everyday wear with clean, lasting shine.",
    shapeNameAr: "مربع عصري (Square)",
    shapeNameEn: "Modern Square",
    primaryHex: "#D98A94",
    shimmerHex: "#FFF1F2",
    wearDays: 14,
    cureMinutes: 10,
    priceEgp: 390,
  },
  {
    id: "look-bold",
    occasionAr: "جريء عصري",
    occasionEn: "Bold Modern",
    titleAr: "زمرد أورفيليا وكريستال",
    titleEn: "Orvelia Emerald & Crystal",
    descriptionAr:
      "مزيج جريء من الزمرد العميق وبريق الكريستال لإطلالة عصرية لافتة.",
    descriptionEn:
      "Bold emerald tone paired with crisp crystal highlights for a standout look.",
    shapeNameAr: "ستيليتو (Stiletto)",
    shapeNameEn: "Stiletto",
    primaryHex: "#0F766E",
    shimmerHex: "#67E8F9",
    wearDays: 21,
    cureMinutes: 15,
    priceEgp: 510,
  },
];

interface NailLookbookSplitDeckProps {
  isArabic?: boolean;
  presets?: NailLookbookPreset[];
  onTryLookOnCamera?: (look: NailLookbookPreset) => void;
  onAddLookToBag?: (look: NailLookbookPreset) => void;
}

export default function NailLookbookSplitDeck({
  isArabic = true,
  presets = LOOKBOOK_PRESETS,
  onTryLookOnCamera,
  onAddLookToBag,
}: NailLookbookSplitDeckProps) {
  const [activeId, setActiveId] = useState<string>(presets[0]?.id ?? "");

  const currentLook =
    presets.find((item) => item.id === activeId) ?? presets[0];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Occasion Selector Rail (5 Cols) */}
        <div className="space-y-3 lg:col-span-5">
          <div className="rounded-3xl border border-white/10 bg-[#080d1a] p-5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-400">
              {isArabic ? "دليل إطلالات الأظافر" : "NAIL LOOKBOOK"}
            </span>
            <h2 className="mt-1 text-xl font-black text-white">
              {isArabic
                ? "اختاري المناسبة لاستعراض الإطلالة"
                : "Pick an Occasion to Preview"}
            </h2>

            <div className="mt-4 space-y-2.5">
              {presets.map((item) => {
                const selected = item.id === currentLook.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveId(item.id)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-start transition ${
                      selected
                        ? "border-amber-400 bg-gradient-to-r from-amber-500/20 to-emerald-500/10 text-white shadow-lg"
                        : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-8 w-8 shrink-0 rounded-2xl border border-white/30"
                        style={{
                          background: `linear-gradient(135deg, ${item.primaryHex}, ${item.shimmerHex})`,
                        }}
                      />
                      <div>
                        <div className="text-xs font-black">
                          {isArabic ? item.occasionAr : item.occasionEn}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {isArabic ? item.titleAr : item.titleEn}
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-black text-emerald-400">
                      {item.priceEgp} {isArabic ? "ج.م" : "EGP"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Spotlight Feature Card (7 Cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLook.id}
              initial={{ opacity: 0, x: isArabic ? -14 : 14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isArabic ? 14 : -14 }}
              transition={{ duration: 0.24 }}
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/15 bg-[#090f1f] p-6 shadow-2xl sm:p-8"
            >
              {/* Top Gradient Accent Bar */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-0 h-1.5"
                style={{
                  background: `linear-gradient(90deg, ${currentLook.primaryHex}, ${currentLook.shimmerHex}, #34d399)`,
                }}
              />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/35 bg-amber-500/15 px-3 py-1 text-xs font-extrabold text-amber-300">
                    <Sparkles className="h-3.5 w-3.5" />
                    {isArabic ? currentLook.occasionAr : currentLook.occasionEn}
                  </span>

                  <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-300">
                    {isArabic ? currentLook.shapeNameAr : currentLook.shapeNameEn}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-black text-white sm:text-3xl">
                  {isArabic ? currentLook.titleAr : currentLook.titleEn}
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
                  {isArabic
                    ? currentLook.descriptionAr
                    : currentLook.descriptionEn}
                </p>

                {/* Specs Strip */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-[#050914] p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>{isArabic ? "ثبات الطلاء" : "Wear Time"}</span>
                    </div>
                    <div className="mt-1 text-base font-black text-white">
                      {currentLook.wearDays} {isArabic ? "يوم" : "Days"}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#050914] p-3.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                      <Clock className="h-4 w-4 text-cyan-400" />
                      <span>{isArabic ? "مدة الجفاف" : "Cure Time"}</span>
                    </div>
                    <div className="mt-1 text-base font-black text-white">
                      {currentLook.cureMinutes} {isArabic ? "دقيقة" : "Min"}
                    </div>
                  </div>

                  <div className="col-span-2 rounded-2xl border border-white/10 bg-[#050914] p-3.5 sm:col-span-1">
                    <div className="text-[11px] font-bold text-slate-400">
                      {isArabic ? "السعر" : "Price"}
                    </div>
                    <div className="mt-1 text-lg font-black text-emerald-400">
                      {currentLook.priceEgp.toLocaleString()}{" "}
                      {isArabic ? "ج.م" : "EGP"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onTryLookOnCamera?.(currentLook)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-400/45 bg-amber-500/15 px-5 py-3 text-xs font-extrabold text-amber-200 transition hover:bg-amber-500/25 sm:text-sm"
                >
                  <Camera className="h-4 w-4" />
                  {isArabic ? "جرّبي الإطلالة بالكاميرا" : "Try Look on Camera"}
                </button>

                <button
                  type="button"
                  onClick={() => onAddLookToBag?.(currentLook)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 px-5 py-3 text-xs font-extrabold text-slate-950 transition hover:opacity-95 sm:text-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  {isArabic ? "أضيفي الإطلالة للحقيبة" : "Add Look to Bag"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}