"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Gem, Sparkles, Camera, ShoppingBag, Check } from "lucide-react";

export type AccessoryCategory =
  | "all"
  | "earrings"
  | "necklace"
  | "tiara"
  | "sunglasses"
  | "rings";

export interface AccessoryShowcaseItem {
  id: string;
  code: string;
  category: Exclude<AccessoryCategory, "all">;
  nameAr: string;
  nameEn: string;
  materialAr: string;
  materialEn: string;
  karatOrFinishAr: string;
  karatOrFinishEn: string;
  primaryHex: string;
  accentHex: string;
  priceEgp: number;
  isFeatured?: boolean;
}

const DEFAULT_ACCESSORY_ITEMS: AccessoryShowcaseItem[] = [
  {
    id: "acc-1",
    code: "ER01",
    category: "earrings",
    nameAr: "أقراط دمعة الألماس الملكي",
    nameEn: "Royal Diamond Drop Earrings",
    materialAr: "فضة مطلية بلاتين وكريستال",
    materialEn: "Platinum-Plated & Crystal",
    karatOrFinishAr: "لمعان كريستالي",
    karatOrFinishEn: "Crystal Mirror Finish",
    primaryHex: "#E2E8F0",
    accentHex: "#67E8F9",
    priceEgp: 950,
    isFeatured: true,
  },
  {
    id: "acc-2",
    code: "NK01",
    category: "necklace",
    nameAr: "قلادة نجمة أورفيليا الذهبية",
    nameEn: "Orvelia Golden Star Pendant",
    materialAr: "ذهب مطلي عيار 18",
    materialEn: "18K Gold Vermeil",
    karatOrFinishAr: "بريق ذهبي دافئ",
    karatOrFinishEn: "Warm Gold Sheen",
    primaryHex: "#F59E0B",
    accentHex: "#FEF08A",
    priceEgp: 1250,
    isFeatured: true,
  },
  {
    id: "acc-3",
    code: "TR01",
    category: "tiara",
    nameAr: "تاج الأميرة الذهبي المرصع",
    nameEn: "Jeweled Golden Princess Tiara",
    materialAr: "ذهب شامبين وفصوص زركون",
    materialEn: "Champagne Gold & Zirconia",
    karatOrFinishAr: "إطلالة سهرة",
    karatOrFinishEn: "Gala Crown Finish",
    primaryHex: "#FBBF24",
    accentHex: "#FEF3C7",
    priceEgp: 1450,
    isFeatured: true,
  },
  {
    id: "acc-4",
    code: "SG01",
    category: "sunglasses",
    nameAr: "نظارة كات آي أسود وذهب",
    nameEn: "Noir & Gold Cat-Eye Sunglasses",
    materialAr: "أسيتات فاخر وذراع ذهبي",
    materialEn: "Luxury Acetate & Gold Temple",
    karatOrFinishAr: "حماية UV400",
    karatOrFinishEn: "UV400 Polarized",
    primaryHex: "#111827",
    accentHex: "#FBBF24",
    priceEgp: 1590,
  },
  {
    id: "acc-5",
    code: "RG01",
    category: "rings",
    nameAr: "خاتم الزمرد الملكي",
    nameEn: "Royal Emerald Halo Ring",
    materialAr: "ذهب وردي وحجر زمرد",
    materialEn: "Rose Gold & Emerald Stone",
    karatOrFinishAr: "ترصيع يدوي",
    karatOrFinishEn: "Hand-Set Gem",
    primaryHex: "#34D399",
    accentHex: "#FDE68A",
    priceEgp: 1180,
  },
  {
    id: "acc-6",
    code: "NK02",
    category: "necklace",
    nameAr: "تشوكر اللؤلؤ والكريستال",
    nameEn: "Pearl & Crystal Halo Choker",
    materialAr: "لؤلؤ طبيعي وفضة إسترليني",
    materialEn: "Freshwater Pearl & Sterling Silver",
    karatOrFinishAr: "نعومة كلاسيكية",
    karatOrFinishEn: "Classic Pearl Luster",
    primaryHex: "#F472B6",
    accentHex: "#FDF2F8",
    priceEgp: 1380,
  },
];

const CATEGORY_TABS: {
  key: AccessoryCategory;
  labelAr: string;
  labelEn: string;
}[] = [
  { key: "all", labelAr: "الكل", labelEn: "All" },
  { key: "earrings", labelAr: "أقراط", labelEn: "Earrings" },
  { key: "necklace", labelAr: "عقود وقلادات", labelEn: "Necklaces" },
  { key: "tiara", labelAr: "تيجان", labelEn: "Tiaras" },
  { key: "sunglasses", labelAr: "نظارات", labelEn: "Sunglasses" },
  { key: "rings", labelAr: "خواتم", labelEn: "Rings" },
];

interface AccessoriesShowcaseProps {
  isArabic?: boolean;
  items?: AccessoryShowcaseItem[];
  activeCode?: string;
  onTryOnPiece?: (item: AccessoryShowcaseItem) => void;
  onAddPieceToBag?: (item: AccessoryShowcaseItem) => void;
}

export default function AccessoriesShowcase({
  isArabic = true,
  items = DEFAULT_ACCESSORY_ITEMS,
  activeCode,
  onTryOnPiece,
  onAddPieceToBag,
}: AccessoriesShowcaseProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<AccessoryCategory>("all");

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Header & Category Filters */}
      <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-[#0a101f]/95 p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-[11px] font-extrabold text-amber-300">
            <Gem className="h-3.5 w-3.5" />
            <span>
              {isArabic
                ? "مجموعة أورفيليا للمجوهرات والإكسسوارات"
                : "Orvelia Jewelry & Accessories Collection"}
            </span>
          </div>
          <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">
            {isArabic
              ? "اختاري القطعة وجرّبي بريقها مباشرة"
              : "Choose Your Piece & Try Its Sparkle Live"}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setSelectedCategory(tab.key)}
                className={`rounded-xl border px-3.5 py-2 text-xs font-extrabold transition ${
                  isActive
                    ? "border-amber-400 bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/40 hover:text-white"
                }`}
              >
                {isArabic ? tab.labelAr : tab.labelEn}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, idx) => {
          const isCurrentlyTried = activeCode === item.code;
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              whileHover={{ y: -4 }}
              className={`group relative overflow-hidden rounded-3xl border p-5 backdrop-blur-xl transition-colors ${
                isCurrentlyTried
                  ? "border-amber-400 bg-[#0e172e] shadow-[0_0_30px_rgba(251,191,36,0.22)]"
                  : "border-white/10 bg-[#080e1c]/95 hover:border-amber-400/45"
              }`}
            >
              {/* Ambient Shimmer Aura */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-14 -end-14 h-36 w-36 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
                style={{
                  background: `radial-gradient(circle, ${item.accentHex}, ${item.primaryHex}, transparent)`,
                }}
              />

              {/* Top Row */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/30 shadow-inner"
                    style={{
                      background: `linear-gradient(135deg, ${item.primaryHex}, ${item.accentHex})`,
                    }}
                  >
                    <Sparkles className="h-4 w-4 text-slate-950" />
                  </span>
                  <div>
                    <span className="font-mono text-xs font-extrabold text-amber-300">
                      {item.code}
                    </span>
                    <span className="block text-[11px] font-bold text-cyan-300">
                      {isArabic ? item.karatOrFinishAr : item.karatOrFinishEn}
                    </span>
                  </div>
                </div>

                {item.isFeatured && (
                  <span className="rounded-full border border-emerald-400/35 bg-emerald-500/15 px-2.5 py-1 text-[10px] font-extrabold text-emerald-300">
                    {isArabic ? "الأكثر طلباً" : "Featured"}
                  </span>
                )}
              </div>

              {/* Details */}
              <div className="relative z-10 mt-4">
                <h3 className="text-base font-black text-white">
                  {isArabic ? item.nameAr : item.nameEn}
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  {isArabic ? item.materialAr : item.materialEn}
                </p>
              </div>

              {/* Price Row */}
              <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-xs font-bold text-slate-400">
                  {isArabic ? "السعر" : "Price"}
                </span>
                <span className="text-base font-black text-emerald-400">
                  {item.priceEgp.toLocaleString()} {isArabic ? "ج.م" : "EGP"}
                </span>
              </div>

              {/* Actions */}
              <div className="relative z-10 mt-4 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onTryOnPiece?.(item)}
                  className={`inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-extrabold transition ${
                    isCurrentlyTried
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                      : "border-amber-400/40 bg-amber-500/15 text-amber-200 hover:bg-amber-500/25"
                  }`}
                >
                  {isCurrentlyTried ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      {isArabic ? "مفعّلة الآن" : "Active"}
                    </>
                  ) : (
                    <>
                      <Camera className="h-3.5 w-3.5" />
                      {isArabic ? "جرّبي بالكاميرا" : "Try On"}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onAddPieceToBag?.(item)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 px-3 py-2.5 text-xs font-extrabold text-slate-950 transition hover:opacity-95"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {isArabic ? "أضيفي للحقيبة" : "Add to Bag"}
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}