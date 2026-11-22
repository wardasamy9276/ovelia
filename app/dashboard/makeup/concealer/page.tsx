"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  CONCEALER_PRESET_TAGS,
  INITIAL_CONCEALER_PRODUCTS,
  type ConcealerProduct,
  type ConcealerStockStatus,
} from "../../data/concealerData";

type ProductFormState = {
  sku: string;
  nameAr: string;
  nameEn: string;
  priceEgp: string;
  oldPriceEgp: string;
  stock: string;
  minStock: string;
  soldCount: string;
  returnedCount: string;
  createdAt: string;
  shadeNameAr: string;
  shadeNameEn: string;
  shadeHex: string;
  undertoneAr: string;
  undertoneEn: string;
  finishAr: string;
  finishEn: string;
  selectedTagsAr: string[];
  customTagAr: string;
  aiMatchEnabled: boolean;
  isNew: boolean;
};

const MONTHS = [
  { value: "all", ar: "كل الشهور", en: "All Months" },
  { value: "01", ar: "يناير (01)", en: "January (01)" },
  { value: "02", ar: "فبراير (02)", en: "February (02)" },
  { value: "03", ar: "مارس (03)", en: "March (03)" },
  { value: "04", ar: "أبريل (04)", en: "April (04)" },
  { value: "05", ar: "مايو (05)", en: "May (05)" },
  { value: "06", ar: "يونيو (06)", en: "June (06)" },
  { value: "07", ar: "يوليو (07)", en: "July (07)" },
  { value: "08", ar: "أغسطس (08)", en: "August (08)" },
  { value: "09", ar: "سبتمبر (09)", en: "September (09)" },
  { value: "10", ar: "أكتوبر (10)", en: "October (10)" },
  { value: "11", ar: "نوفمبر (11)", en: "November (11)" },
  { value: "12", ar: "ديسمبر (12)", en: "December (12)" },
];

const EMPTY_FORM: ProductFormState = {
  sku: "",
  nameAr: "",
  nameEn: "",
  priceEgp: "",
  oldPriceEgp: "",
  stock: "20",
  minStock: "10",
  soldCount: "0",
  returnedCount: "0",
  createdAt: "2026-11-22",
  shadeNameAr: "",
  shadeNameEn: "",
  shadeHex: "#E8C39E",
  undertoneAr: "دافئ (Warm)",
  undertoneEn: "Warm Undertone",
  finishAr: "طبيعي ناعم",
  finishEn: "Soft Natural",
  selectedTagsAr: ["مضاد للتكتل", "تغطية متوسطة لعالية"],
  customTagAr: "",
  aiMatchEnabled: true,
  isNew: true,
};

function getStockStatus(stock: number, minStock: number): ConcealerStockStatus {
  if (stock <= 0) return "out_of_stock";
  if (stock <= minStock) return "low_stock";
  return "in_stock";
}

function extractYearMonth(dateStr: string): { year: string; month: string } {
  const parts = dateStr.split("-");
  return {
    year: parts[0] || "2026",
    month: parts[1] || "11",
  };
}

export default function ConcealerDashboardPage() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);
  const [products, setProducts] = useState<ConcealerProduct[]>(
    INITIAL_CONCEALER_PRODUCTS
  );

  // Year & Month Filters
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  // Search & Category Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTagFilter, setSelectedTagFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<"all" | ConcealerStockStatus>(
    "all"
  );
  const [onlyNewOrDiscounted, setOnlyNewOrDiscounted] = useState(false);

  // Modal / Form State (Add & Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formState, setFormState] = useState<ProductFormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string>("");

  // Delete confirmation ID
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Feedback toast banner
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
    }, 3200);
  };

  const availableYears = useMemo(() => {
    const yearsSet = new Set<string>(["2026", "2025"]);
    products.forEach((p) => {
      const { year } = extractYearMonth(p.createdAt);
      if (year) yearsSet.add(year);
    });
    return Array.from(yearsSet).sort((a, b) => b.localeCompare(a));
  }, [products]);

  const allAvailableTags = useMemo(() => {
    const set = new Set<string>(CONCEALER_PRESET_TAGS.ar);
    products.forEach((p) => p.tagsAr.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [products]);

  const periodProducts = useMemo(() => {
    return products.filter((product) => {
      const { year, month } = extractYearMonth(product.createdAt);
      if (selectedYear !== "all" && year !== selectedYear) return false;
      if (selectedMonth !== "all" && month !== selectedMonth) return false;
      return true;
    });
  }, [products, selectedMonth, selectedYear]);

  const accountingStats = useMemo(() => {
    let totalSoldUnits = 0;
    let totalReturnedUnits = 0;
    let grossSalesAmount = 0;
    let returnedAmount = 0;
    let currentStockUnits = 0;

    periodProducts.forEach((p) => {
      totalSoldUnits += p.soldCount;
      totalReturnedUnits += p.returnedCount;
      grossSalesAmount += p.soldCount * p.priceEgp;
      returnedAmount += p.returnedCount * p.priceEgp;
      currentStockUnits += p.stock;
    });

    const netSalesAmount = Math.max(0, grossSalesAmount - returnedAmount);
    const returnRatePercent =
      totalSoldUnits > 0
        ? ((totalReturnedUnits / totalSoldUnits) * 100).toFixed(1)
        : "0.0";

    const newCount = periodProducts.filter((p) => p.isNew).length;
    const discountedCount = periodProducts.filter(
      (p) => typeof p.oldPriceEgp === "number" && p.oldPriceEgp > p.priceEgp
    ).length;

    return {
      productsCount: periodProducts.length,
      totalSoldUnits,
      totalReturnedUnits,
      grossSalesAmount,
      returnedAmount,
      netSalesAmount,
      returnRatePercent,
      currentStockUnits,
      newCount,
      discountedCount,
    };
  }, [periodProducts]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return periodProducts.filter((product) => {
      const status = getStockStatus(product.stock, product.minStock);

      if (stockFilter !== "all" && status !== stockFilter) {
        return false;
      }

      if (selectedTagFilter !== "all") {
        const hasTag =
          product.tagsAr.includes(selectedTagFilter) ||
          product.tagsEn.includes(selectedTagFilter);
        if (!hasTag) return false;
      }

      if (onlyNewOrDiscounted) {
        const hasDiscount =
          typeof product.oldPriceEgp === "number" &&
          product.oldPriceEgp > product.priceEgp;
        if (!product.isNew && !hasDiscount) return false;
      }

      if (!q) return true;

      const nameMatch =
        product.nameAr.toLowerCase().includes(q) ||
        product.nameEn.toLowerCase().includes(q);
      const skuMatch = product.sku.toLowerCase().includes(q);
      const shadeMatch =
        product.shadeNameAr.toLowerCase().includes(q) ||
        product.shadeNameEn.toLowerCase().includes(q);
      const tagMatch = product.tagsAr.some((t) => t.toLowerCase().includes(q));

      return nameMatch || skuMatch || shadeMatch || tagMatch;
    });
  }, [
    onlyNewOrDiscounted,
    periodProducts,
    searchQuery,
    selectedTagFilter,
    stockFilter,
  ]);

  const openAddModal = () => {
    setEditingId(null);
    const nextNum = products.length + 1;
    const defaultDate =
      selectedYear !== "all" && selectedMonth !== "all"
        ? `${selectedYear}-${selectedMonth}-15`
        : selectedYear !== "all"
        ? `${selectedYear}-11-15`
        : "2026-11-22";

    setFormState({
      ...EMPTY_FORM,
      sku: `ORV-CON-0${nextNum}N`,
      createdAt: defaultDate,
    });
    setFormError("");
    setIsFormOpen(true);
  };

  const openEditModal = (product: ConcealerProduct) => {
    setEditingId(product.id);
    setFormState({
      sku: product.sku,
      nameAr: product.nameAr,
      nameEn: product.nameEn,
      priceEgp: String(product.priceEgp),
      oldPriceEgp: product.oldPriceEgp ? String(product.oldPriceEgp) : "",
      stock: String(product.stock),
      minStock: String(product.minStock),
      soldCount: String(product.soldCount),
      returnedCount: String(product.returnedCount),
      createdAt: product.createdAt,
      shadeNameAr: product.shadeNameAr,
      shadeNameEn: product.shadeNameEn,
      shadeHex: product.shadeHex,
      undertoneAr: product.undertoneAr,
      undertoneEn: product.undertoneEn,
      finishAr: product.finishAr,
      finishEn: product.finishEn,
      selectedTagsAr: [...product.tagsAr],
      customTagAr: "",
      aiMatchEnabled: product.aiMatchEnabled,
      isNew: Boolean(product.isNew),
    });
    setFormError("");
    setIsFormOpen(true);
  };

  const toggleFormTag = (tag: string) => {
    setFormState((prev) => {
      const exists = prev.selectedTagsAr.includes(tag);
      return {
        ...prev,
        selectedTagsAr: exists
          ? prev.selectedTagsAr.filter((t) => t !== tag)
          : [...prev.selectedTagsAr, tag],
      };
    });
  };

  const handleAddCustomTag = () => {
    const clean = formState.customTagAr.trim();
    if (!clean) return;
    setFormState((prev) => ({
      ...prev,
      selectedTagsAr: prev.selectedTagsAr.includes(clean)
        ? prev.selectedTagsAr
        : [...prev.selectedTagsAr, clean],
      customTagAr: "",
    }));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanNameAr = formState.nameAr.trim();
    const cleanNameEn = formState.nameEn.trim() || cleanNameAr;
    const cleanSku =
      formState.sku.trim() || `ORV-CON-${Date.now().toString().slice(-4)}`;
    const parsedPrice = Number(formState.priceEgp);
    const parsedOldPrice = formState.oldPriceEgp.trim()
      ? Number(formState.oldPriceEgp)
      : undefined;
    const parsedStock = Math.max(0, Number(formState.stock) || 0);
    const parsedMinStock = Math.max(1, Number(formState.minStock) || 10);
    const parsedSold = Math.max(0, Number(formState.soldCount) || 0);
    const parsedReturned = Math.max(0, Number(formState.returnedCount) || 0);
    const cleanDate = formState.createdAt || "2026-11-22";

    if (!cleanNameAr) {
      setFormError(
        isArabic
          ? "من فضلك أدخلي اسم منتج الكونسيلر."
          : "Please enter the concealer product name."
      );
      return;
    }

    if (!parsedPrice || parsedPrice <= 0) {
      setFormError(
        isArabic
          ? "من فضلك أدخلي سعراً صحيحاً أكبر من صفر."
          : "Please enter a valid price greater than 0."
      );
      return;
    }

    const finalTagsAr =
      formState.selectedTagsAr.length > 0
        ? formState.selectedTagsAr
        : ["مضاد للتكتل"];

    if (editingId) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                sku: cleanSku,
                nameAr: cleanNameAr,
                nameEn: cleanNameEn,
                priceEgp: parsedPrice,
                oldPriceEgp:
                  parsedOldPrice && parsedOldPrice > parsedPrice
                    ? parsedOldPrice
                    : undefined,
                stock: parsedStock,
                minStock: parsedMinStock,
                soldCount: parsedSold,
                returnedCount: parsedReturned,
                createdAt: cleanDate,
                shadeNameAr:
                  formState.shadeNameAr.trim() || item.shadeNameAr,
                shadeNameEn:
                  formState.shadeNameEn.trim() ||
                  formState.shadeNameAr.trim() ||
                  item.shadeNameEn,
                shadeHex: formState.shadeHex || item.shadeHex,
                undertoneAr: formState.undertoneAr.trim() || item.undertoneAr,
                undertoneEn: formState.undertoneEn.trim() || item.undertoneEn,
                finishAr: formState.finishAr.trim() || item.finishAr,
                finishEn: formState.finishEn.trim() || item.finishEn,
                tagsAr: finalTagsAr,
                tagsEn: finalTagsAr,
                aiMatchEnabled: formState.aiMatchEnabled,
                isNew: formState.isNew,
              }
            : item
        )
      );
      showToast(
        isArabic
          ? `تم تحديث منتج "${cleanNameAr}" بنجاح.`
          : `Updated "${cleanNameAr}" successfully.`
      );
    } else {
      const created: ConcealerProduct = {
        id: `cnc-${Date.now()}`,
        sku: cleanSku,
        nameAr: cleanNameAr,
        nameEn: cleanNameEn,
        priceEgp: parsedPrice,
        oldPriceEgp:
          parsedOldPrice && parsedOldPrice > parsedPrice
            ? parsedOldPrice
            : undefined,
        stock: parsedStock,
        minStock: parsedMinStock,
        soldCount: parsedSold,
        returnedCount: parsedReturned,
        createdAt: cleanDate,
        shadeNameAr: formState.shadeNameAr.trim() || "درجة طبيعية (01)",
        shadeNameEn:
          formState.shadeNameEn.trim() ||
          formState.shadeNameAr.trim() ||
          "Natural Shade (01)",
        shadeHex: formState.shadeHex || "#E8C39E",
        undertoneAr: formState.undertoneAr.trim() || "محايد (Neutral)",
        undertoneEn: formState.undertoneEn.trim() || "Neutral Undertone",
        finishAr: formState.finishAr.trim() || "طبيعي ناعم",
        finishEn: formState.finishEn.trim() || "Soft Natural",
        tagsAr: finalTagsAr,
        tagsEn: finalTagsAr,
        aiMatchEnabled: formState.aiMatchEnabled,
        isNew: true,
      };

      setProducts((prev) => [created, ...prev]);
      showToast(
        isArabic
          ? `تمت إضافة كونسيلر جديد "${cleanNameAr}" إلى القائمة.`
          : `Added new concealer "${cleanNameAr}".`
      );
    }

    setIsFormOpen(false);
    setEditingId(null);
    setFormError("");
  };

  const handleDeleteProduct = (product: ConcealerProduct) => {
    setProducts((prev) => prev.filter((item) => item.id !== product.id));
    setConfirmDeleteId(null);
    showToast(
      isArabic
        ? `تم حذف "${product.nameAr}" من قسم الكونسيلر.`
        : `Deleted "${product.nameAr}" from concealer.`
    );
  };

  const handleQuickStockAdjust = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, stock: Math.max(0, item.stock + delta) }
          : item
      )
    );
  };

  const handleRecordSale = (product: ConcealerProduct) => {
    if (product.stock <= 0) {
      showToast(
        isArabic
          ? `المخزون نفد للمنتج "${product.nameAr}".`
          : `Out of stock for "${product.nameAr}".`
      );
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stock: Math.max(0, item.stock - 1),
              soldCount: item.soldCount + 1,
            }
          : item
      )
    );

    showToast(
      isArabic
        ? `تم تسجيل بيع قطعة من "${product.nameAr}".`
        : `Recorded 1 sale for "${product.nameAr}".`
    );
  };

  const handleRecordReturn = (product: ConcealerProduct) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === product.id
          ? {
              ...item,
              stock: item.stock + 1,
              returnedCount: item.returnedCount + 1,
            }
          : item
      )
    );

    showToast(
      isArabic
        ? `تم تسجيل مرتجع قطعة من "${product.nameAr}" وإعادتها للمخزون.`
        : `Recorded 1 return for "${product.nameAr}" and restocked.`
    );
  };

  const handleToggleAiMatch = (id: string) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, aiMatchEnabled: !item.aiMatchEnabled }
          : item
      )
    );
  };

  const surface = isDark
    ? "bg-[#0d1422] border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-xs";

  const subSurface = isDark
    ? "bg-[#090e1a] border-white/10"
    : "bg-slate-50 border-slate-200";

  const inputClass = `w-full rounded-xl border px-3.5 py-2 text-sm outline-none transition ${
    isDark
      ? "border-white/15 bg-[#090e1a] text-white placeholder:text-slate-500 focus:border-amber-400"
      : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-amber-500"
  }`;

  const muted = isDark ? "text-slate-400" : "text-slate-600";

  const stockBadge = (status: ConcealerStockStatus) => {
    if (status === "in_stock") {
      return {
        label: isArabic ? "متوفر بالمخزون" : "In Stock",
        cls: isDark
          ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
          : "bg-emerald-50 text-emerald-700 border-emerald-200",
      };
    }
    if (status === "low_stock") {
      return {
        label: isArabic ? "مخزون منخفض" : "Low Stock",
        cls: isDark
          ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
          : "bg-amber-50 text-amber-700 border-amber-200",
      };
    }
    return {
      label: isArabic ? "نفد من المخزون" : "Out of Stock",
      cls: isDark
        ? "bg-rose-500/15 text-rose-300 border-rose-500/30"
        : "bg-rose-50 text-rose-700 border-rose-200",
    };
  };

  const activePeriodLabel = useMemo(() => {
    const monthObj = MONTHS.find((m) => m.value === selectedMonth);
    const monthText = monthObj
      ? isArabic
        ? monthObj.ar
        : monthObj.en
      : "";
    const yearText =
      selectedYear === "all"
        ? isArabic
          ? "كل السنوات"
          : "All Years"
        : selectedYear;

    if (selectedYear === "all" && selectedMonth === "all") {
      return isArabic ? "إجمالي كل الفترات" : "All Periods";
    }
    return `${monthText} • ${yearText}`;
  }, [isArabic, selectedMonth, selectedYear]);

  return (
    <div dir={dir} className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 start-5 z-50 rounded-xl border border-emerald-400/40 bg-[#0b1320] px-4 py-3 text-sm font-bold text-emerald-300 shadow-xl">
          ✓ {toastMessage}
        </div>
      )}

      {/* Top Header & Breadcrumb */}
      <div
        className={`flex flex-col justify-between gap-4 rounded-2xl border p-5 lg:flex-row lg:items-center lg:p-6 ${
          isDark
            ? "bg-gradient-to-l from-amber-500/10 via-[#0d1422] to-emerald-500/10 border-white/10"
            : "bg-gradient-to-l from-amber-50 via-white to-emerald-50 border-slate-200"
        }`}
      >
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold">
            <Link href="/dashboard" className="text-emerald-400 hover:underline">
              {isArabic ? "اللوحة الرئيسية" : "Dashboard"}
            </Link>
            <span className={muted}>/</span>
            <span className="text-amber-400">
              {isArabic ? "الكونسيلر وتصحيح اللون" : "Concealer & Correctors"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-500/15 text-2xl">
              🪄
            </span>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {isArabic
                  ? "إدارة منتجات الكونسيلر والمبيعات والمرتجعات"
                  : "Concealer Products, Sales & Returns"}
              </h1>
              <p className={`text-xs sm:text-sm ${muted}`}>
                {isArabic
                  ? "حساب اللي اتباع واللي رجع وصافي المبيعات مع تصفية كاملة حسب الشهر والسنة."
                  : "Track sold units, returns, net sales, and filter by month and year."}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/dashboard"
            className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
              isDark
                ? "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {isArabic ? "→ العودة للرئيسية" : "← Back to Overview"}
          </Link>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-emerald-400 px-5 py-2.5 text-sm font-extrabold text-slate-950 shadow-sm transition hover:opacity-95"
          >
            <span>+</span>
            <span>
              {isArabic ? "إضافة منتج كونسيلر" : "Add Concealer Product"}
            </span>
          </button>
        </div>
      </div>

      {/* Month & Year Filter Bar */}
      <section className={`rounded-2xl border p-4 sm:p-5 ${surface}`}>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-sm font-extrabold sm:text-base">
              {isArabic
                ? "تصفية الحسابات والمنتجات حسب السنة والشهر"
                : "Filter Analytics & Products by Year & Month"}
            </h2>
            <p className={`text-xs ${muted}`}>
              {isArabic ? "الفترة الحالية:" : "Active period:"}{" "}
              <span className="font-bold text-emerald-400">
                {activePeriodLabel}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-bold sm:text-sm outline-none ${
                isDark
                  ? "border-white/15 bg-[#090e1a] text-white"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              <option value="all">
                {isArabic ? "كل السنوات" : "All Years"}
              </option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>
                  {isArabic ? `سنة ${yr}` : `Year ${yr}`}
                </option>
              ))}
            </select>

            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-bold sm:text-sm outline-none ${
                isDark
                  ? "border-white/15 bg-[#090e1a] text-white"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              {MONTHS.map((m) => (
                <option key={m.value} value={m.value}>
                  {isArabic ? m.ar : m.en}
                </option>
              ))}
            </select>

            {(selectedYear !== "all" || selectedMonth !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSelectedYear("all");
                  setSelectedMonth("all");
                }}
                className="rounded-xl border border-amber-400/40 bg-amber-500/15 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-500/25"
              >
                {isArabic ? "عرض كل الفترات" : "Reset Period"}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Accounting Cards: Sold, Returned, Net Sales & Stock */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className={`rounded-2xl border p-5 ${surface}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${muted}`}>
              {isArabic ? "إجمالي اللي اتباع (مباع)" : "Total Sold Units"}
            </span>
            <span className="rounded-lg bg-emerald-500/15 px-2.5 py-1 text-xs font-extrabold text-emerald-400">
              {accountingStats.grossSalesAmount.toLocaleString()}{" "}
              {isArabic ? "ج.م" : "EGP"}
            </span>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-emerald-400">
            {accountingStats.totalSoldUnits}{" "}
            <span className={`text-sm font-semibold ${muted}`}>
              {isArabic ? "قطعة" : "units"}
            </span>
          </p>
          <p className={`mt-1.5 text-xs ${muted}`}>
            {isArabic ? "في عدد منتجات:" : "Across products:"}{" "}
            <strong>{accountingStats.productsCount}</strong>
          </p>
        </div>

        <div className={`rounded-2xl border p-5 ${surface}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${muted}`}>
              {isArabic ? "إجمالي اللي رجع (مرتجع)" : "Total Returned Units"}
            </span>
            <span className="rounded-lg bg-rose-500/15 px-2.5 py-1 text-xs font-extrabold text-rose-400">
              -{accountingStats.returnedAmount.toLocaleString()}{" "}
              {isArabic ? "ج.م" : "EGP"}
            </span>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-rose-400">
            {accountingStats.totalReturnedUnits}{" "}
            <span className={`text-sm font-semibold ${muted}`}>
              {isArabic ? "قطعة" : "units"}
            </span>
          </p>
          <p className={`mt-1.5 text-xs ${muted}`}>
            {isArabic ? "نسبة المرتجع:" : "Return rate:"}{" "}
            <strong className="text-rose-300">
              {accountingStats.returnRatePercent}%
            </strong>
          </p>
        </div>

        <div className={`rounded-2xl border p-5 ${surface}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${muted}`}>
              {isArabic
                ? "صافي المبيعات (بعد المرتجع)"
                : "Net Sales (After Returns)"}
            </span>
            <span className="text-base">💎</span>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-cyan-400">
            {accountingStats.netSalesAmount.toLocaleString()}{" "}
            <span className={`text-sm font-semibold ${muted}`}>
              {isArabic ? "ج.م" : "EGP"}
            </span>
          </p>
          <p className={`mt-1.5 text-xs ${muted}`}>
            {isArabic ? "مبيعات − مرتجعات" : "Gross sales minus returns"}
          </p>
        </div>

        <div className={`rounded-2xl border p-5 ${surface}`}>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold ${muted}`}>
              {isArabic ? "المخزون المتاح حالياً" : "Current Available Stock"}
            </span>
            <span className="text-base">📦</span>
          </div>
          <p className="mt-2 text-3xl font-extrabold text-amber-400">
            {accountingStats.currentStockUnits}{" "}
            <span className={`text-sm font-semibold ${muted}`}>
              {isArabic ? "قطعة" : "units"}
            </span>
          </p>
          <p className={`mt-1.5 text-xs ${muted}`}>
            {isArabic ? "جديد:" : "New:"}{" "}
            <strong className="text-emerald-400">
              {accountingStats.newCount}
            </strong>{" "}
            • {isArabic ? "عروض:" : "Sale:"}{" "}
            <strong className="text-cyan-400">
              {accountingStats.discountedCount}
            </strong>
          </p>
        </div>
      </section>

      {/* Add / Edit Product Panel */}
      {isFormOpen && (
        <section
          className={`rounded-2xl border-2 border-amber-400/40 p-5 lg:p-6 ${surface}`}
        >
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-extrabold">
                {editingId
                  ? isArabic
                    ? "تعديل الكونسيلر والسعر والبيع والمرتجع"
                    : "Edit Concealer, Price, Sold & Returns"
                  : isArabic
                  ? "إضافة منتج كونسيلر جديد"
                  : "Add New Concealer Product"}
              </h2>
              <p className={`text-xs ${muted}`}>
                {isArabic
                  ? "حددي الاسم، السعر، الخصم، الكمية المباعة والمرتجعة، التاريخ، الدرجة، والتاجات."
                  : "Configure name, price, discount, sold/returned counts, date, shade, and tags."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsFormOpen(false);
                setEditingId(null);
                setFormError("");
              }}
              className={`rounded-xl border px-3 py-1.5 text-xs font-bold ${
                isDark
                  ? "border-white/15 text-slate-300 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              ✕ {isArabic ? "إغلاق" : "Close"}
            </button>
          </div>

          {formError && (
            <div className="mb-4 rounded-xl border border-rose-500/40 bg-rose-500/15 px-4 py-2.5 text-xs font-bold text-rose-300">
              {formError}
            </div>
          )}

          <form onSubmit={handleSaveProduct} className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "اسم المنتج (عربي) *" : "Product Name (AR) *"}
                </label>
                <input
                  type="text"
                  value={formState.nameAr}
                  onChange={(e) =>
                    setFormState({ ...formState, nameAr: e.target.value })
                  }
                  placeholder="مثال: كونسيلر إشراقة ناعمة"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "اسم المنتج (إنجليزي)" : "Product Name (EN)"}
                </label>
                <input
                  type="text"
                  value={formState.nameEn}
                  onChange={(e) =>
                    setFormState({ ...formState, nameEn: e.target.value })
                  }
                  placeholder="e.g. Soft Glow Concealer"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "السعر الحالي (ج.م) *" : "Current Price (EGP) *"}
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={formState.priceEgp}
                  onChange={(e) =>
                    setFormState({ ...formState, priceEgp: e.target.value })
                  }
                  placeholder="690"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic
                    ? "السعر قبل الخصم (اختياري)"
                    : "Compare-at Price (Optional)"}
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={formState.oldPriceEgp}
                  onChange={(e) =>
                    setFormState({ ...formState, oldPriceEgp: e.target.value })
                  }
                  placeholder="820"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "كود SKU" : "SKU"}
                </label>
                <input
                  type="text"
                  value={formState.sku}
                  onChange={(e) =>
                    setFormState({ ...formState, sku: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "المخزون" : "Stock"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formState.stock}
                  onChange={(e) =>
                    setFormState({ ...formState, stock: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "اللي اتباع (قطع)" : "Sold Units"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formState.soldCount}
                  onChange={(e) =>
                    setFormState({ ...formState, soldCount: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "اللي رجع (قطع)" : "Returned Units"}
                </label>
                <input
                  type="number"
                  min="0"
                  value={formState.returnedCount}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      returnedCount: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "تاريخ الشهر والسنة" : "Date (YYYY-MM-DD)"}
                </label>
                <input
                  type="date"
                  value={formState.createdAt}
                  onChange={(e) =>
                    setFormState({ ...formState, createdAt: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold">
                  {isArabic ? "لون الدرجة" : "Shade Swatch"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={formState.shadeHex}
                    onChange={(e) =>
                      setFormState({ ...formState, shadeHex: e.target.value })
                    }
                    className="h-10 w-11 cursor-pointer rounded-lg border border-white/15 bg-transparent"
                  />
                  <input
                    type="text"
                    value={formState.shadeNameAr}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        shadeNameAr: e.target.value,
                      })
                    }
                    placeholder="فانيلا دافئة"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Tags Selection + Custom Tag */}
            <div className={`rounded-xl border p-4 ${subSurface}`}>
              <label className="mb-2 block text-xs font-bold">
                {isArabic
                  ? "تاجات المنتج (اختاري من التاجات الجاهزة أو أضيفي تاجاً جديداً)"
                  : "Product Tags (Pick preset or add custom tag)"}
              </label>

              <div className="flex flex-wrap gap-2">
                {CONCEALER_PRESET_TAGS.ar.map((tag) => {
                  const active = formState.selectedTagsAr.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleFormTag(tag)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                        active
                          ? "border-amber-400 bg-amber-500/20 text-amber-300"
                          : isDark
                          ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={formState.customTagAr}
                  onChange={(e) =>
                    setFormState({ ...formState, customTagAr: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCustomTag();
                    }
                  }}
                  placeholder={
                    isArabic
                      ? "أضيفي تاج مخصص (مثال: خالي من العطور)..."
                      : "Add custom tag (e.g. Fragrance-Free)..."
                  }
                  className={`w-full rounded-xl border px-3 py-1.5 text-xs sm:w-64 outline-none ${
                    isDark
                      ? "border-white/15 bg-[#0d1422] text-white"
                      : "border-slate-300 bg-white text-slate-900"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="rounded-xl border border-emerald-400/40 bg-emerald-500/15 px-3.5 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25"
                >
                  + {isArabic ? "إضافة تاج" : "Add Tag"}
                </button>
              </div>
            </div>

            {/* Extra Toggles + Submit */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.aiMatchEnabled}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        aiMatchEnabled: e.target.checked,
                      })
                    }
                    className="h-4 w-4 accent-emerald-400"
                  />
                  <span>
                    {isArabic
                      ? "تفعيل مطابقة الدرجة بالذكاء الاصطناعي (AI Shade Match)"
                      : "Enable AI Shade Match"}
                  </span>
                </label>

                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.isNew}
                    onChange={(e) =>
                      setFormState({ ...formState, isNew: e.target.checked })
                    }
                    className="h-4 w-4 accent-amber-400"
                  />
                  <span>
                    {isArabic ? "تمييز كمنتج جديد (New)" : "Mark as New"}
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setEditingId(null);
                  }}
                  className={`rounded-xl border px-4 py-2.5 text-xs font-bold sm:text-sm ${
                    isDark
                      ? "border-white/15 text-slate-300 hover:bg-white/5"
                      : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {isArabic ? "إلغاء" : "Cancel"}
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-6 py-2.5 text-xs font-extrabold text-slate-950 sm:text-sm hover:opacity-95"
                >
                  {editingId
                    ? isArabic
                      ? "حفظ التعديلات"
                      : "Save Changes"
                    : isArabic
                    ? "إضافة المنتج الآن"
                    : "Create Concealer"}
                </button>
              </div>
            </div>
          </form>
        </section>
      )}

      {/* Search & Tag Filter Bar */}
      <section className={`rounded-2xl border p-5 space-y-4 ${surface}`}>
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isArabic
                ? "ابحث باسم الكونسيلر، الدرجة، التاج، أو كود SKU..."
                : "Search concealer name, shade, tag, or SKU..."
            }
            className={`w-full md:w-80 ${inputClass}`}
          />

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={stockFilter}
              onChange={(e) =>
                setStockFilter(e.target.value as "all" | ConcealerStockStatus)
              }
              className={`rounded-xl border px-3 py-2 text-xs font-bold sm:text-sm outline-none ${
                isDark
                  ? "border-white/15 bg-[#090e1a] text-white"
                  : "border-slate-300 bg-slate-50 text-slate-900"
              }`}
            >
              <option value="all">
                {isArabic ? "كل حالات المخزون" : "All Stock Statuses"}
              </option>
              <option value="in_stock">
                {isArabic ? "متوفر بالمخزون" : "In Stock"}
              </option>
              <option value="low_stock">
                {isArabic ? "مخزون منخفض" : "Low Stock"}
              </option>
              <option value="out_of_stock">
                {isArabic ? "نفد من المخزون" : "Out of Stock"}
              </option>
            </select>

            <button
              type="button"
              onClick={() => setOnlyNewOrDiscounted((prev) => !prev)}
              className={`rounded-xl border px-3.5 py-2 text-xs font-bold transition sm:text-sm ${
                onlyNewOrDiscounted
                  ? "border-amber-400 bg-amber-500/20 text-amber-300"
                  : isDark
                  ? "border-white/15 text-slate-300 hover:bg-white/5"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
              }`}
            >
              ✦ {isArabic ? "الجديد والعروض فقط" : "New & On Sale"}
            </button>
          </div>
        </div>

        {/* Tag Pills Filter */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setSelectedTagFilter("all")}
            className={`rounded-full border px-3 py-1 text-xs font-bold transition ${
              selectedTagFilter === "all"
                ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                : isDark
                ? "border-white/10 text-slate-400 hover:text-white"
                : "border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {isArabic ? "كل التاجات" : "All Tags"}
          </button>

          {allAvailableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() =>
                setSelectedTagFilter((prev) => (prev === tag ? "all" : tag))
              }
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                selectedTagFilter === tag
                  ? "border-amber-400 bg-amber-500/20 text-amber-300"
                  : isDark
                  ? "border-white/10 bg-white/5 text-slate-300 hover:border-amber-400/40"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* Concealer Products Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className={`rounded-2xl border p-10 text-center ${surface}`}>
          <p className="text-base font-bold">
            {isArabic
              ? "لا توجد منتجات كونسيلر مطابقة للفترة أو الفلاتر الحالية."
              : "No concealer products match the selected period or filters."}
          </p>
          <p className={`mt-1 text-xs ${muted}`}>
            {isArabic
              ? "يمكنك تغيير الشهر/السنة أو إضافة منتج كونسيلر جديد."
              : "Try changing the month/year filter or add a new concealer."}
          </p>
          <button
            type="button"
            onClick={openAddModal}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950"
          >
            + {isArabic ? "إضافة منتج كونسيلر" : "Add Concealer"}
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const st = getStockStatus(product.stock, product.minStock);
            const badge = stockBadge(st);
            const hasDiscount =
              typeof product.oldPriceEgp === "number" &&
              product.oldPriceEgp > product.priceEgp;

            const productNetRevenue = Math.max(
              0,
              (product.soldCount - product.returnedCount) * product.priceEgp
            );

            return (
              <article
                key={product.id}
                className={`flex flex-col justify-between rounded-2xl border p-5 transition ${surface}`}
              >
                <div>
                  {/* Top Badges Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-cyan-400">
                        {product.sku}
                      </span>
                      <span className={`text-[11px] font-semibold ${muted}`}>
                        • {product.createdAt}
                      </span>
                      {product.isNew && (
                        <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 text-[11px] font-extrabold text-amber-300">
                          {isArabic ? "جديد" : "NEW"}
                        </span>
                      )}
                      {hasDiscount && (
                        <span className="rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-300">
                          {isArabic ? "عرض خاص" : "SALE"}
                        </span>
                      )}
                    </div>

                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${badge.cls}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Product Title */}
                  <h3 className="mt-3 text-lg font-extrabold leading-snug">
                    {isArabic ? product.nameAr : product.nameEn}
                  </h3>
                  <p className={`text-xs ${muted}`}>
                    {isArabic ? product.nameEn : product.nameAr}
                  </p>

                  {/* Shade & Undertone */}
                  <div
                    className={`mt-4 flex items-center justify-between rounded-xl border p-3 ${subSurface}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="h-7 w-7 shrink-0 rounded-full border border-white/25 shadow-inner"
                        style={{ backgroundColor: product.shadeHex }}
                      />
                      <div>
                        <p className="text-xs font-bold">
                          {isArabic ? product.shadeNameAr : product.shadeNameEn}
                        </p>
                        <p className={`text-[11px] ${muted}`}>
                          {isArabic ? product.undertoneAr : product.undertoneEn} •{" "}
                          {isArabic ? product.finishAr : product.finishEn}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleAiMatch(product.id)}
                      className={`rounded-lg px-2 py-1 text-[11px] font-bold transition ${
                        product.aiMatchEnabled
                          ? "bg-cyan-500/15 text-cyan-300 border border-cyan-400/30"
                          : "bg-slate-500/15 text-slate-400 border border-slate-500/30"
                      }`}
                    >
                      {product.aiMatchEnabled ? "✨ AI Match" : "AI Off"}
                    </button>
                  </div>

                  {/* Sold & Returned Box per Product */}
                  <div
                    className={`mt-3 grid grid-cols-3 gap-2 rounded-xl border p-3 text-center ${subSurface}`}
                  >
                    <div>
                      <span className={`block text-[10px] ${muted}`}>
                        {isArabic ? "اللي اتباع" : "Sold"}
                      </span>
                      <span className="text-sm font-extrabold text-emerald-400">
                        {product.soldCount}
                      </span>
                    </div>

                    <div>
                      <span className={`block text-[10px] ${muted}`}>
                        {isArabic ? "اللي رجع" : "Returned"}
                      </span>
                      <span className="text-sm font-extrabold text-rose-400">
                        {product.returnedCount}
                      </span>
                    </div>

                    <div>
                      <span className={`block text-[10px] ${muted}`}>
                        {isArabic ? "الصافي" : "Net"}
                      </span>
                      <span className="text-xs font-extrabold text-cyan-400">
                        {productNetRevenue.toLocaleString()}{" "}
                        {isArabic ? "ج.م" : "EGP"}
                      </span>
                    </div>
                  </div>

                  {/* Quick Sale & Return Action Buttons */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRecordSale(product)}
                      className="flex-1 rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300 transition hover:bg-emerald-500/25"
                    >
                      + {isArabic ? "تسجيل بيع (1)" : "Sell 1"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRecordReturn(product)}
                      className="flex-1 rounded-xl border border-rose-400/35 bg-rose-500/15 px-3 py-1.5 text-xs font-bold text-rose-300 transition hover:bg-rose-500/25"
                    >
                      ↩ {isArabic ? "تسجيل مرتجع (1)" : "Return 1"}
                    </button>
                  </div>

                  {/* Price & Stock Controls */}
                  <div className="mt-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-400">
                        {isArabic ? "السعر" : "Price"}
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-extrabold text-emerald-400">
                          {product.priceEgp} {isArabic ? "ج.م" : "EGP"}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs line-through text-rose-400/80">
                            {product.oldPriceEgp} {isArabic ? "ج.م" : "EGP"}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-end">
                      <span className={`block text-[11px] ${muted}`}>
                        {isArabic ? "المخزون" : "Stock"}
                      </span>
                      <div className="mt-1 inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-2 py-1">
                        <button
                          type="button"
                          onClick={() => handleQuickStockAdjust(product.id, -1)}
                          className="h-6 w-6 rounded-md bg-white/10 text-xs font-bold hover:bg-white/20"
                          aria-label="Decrease stock"
                        >
                          -
                        </button>
                        <span className="min-w-8 text-center text-xs font-extrabold">
                          {product.stock}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuickStockAdjust(product.id, 1)}
                          className="h-6 w-6 rounded-md bg-white/10 text-xs font-bold hover:bg-white/20"
                          aria-label="Increase stock"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Product Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {product.tagsAr.map((tag) => (
                      <span
                        key={tag}
                        className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
                          isDark
                            ? "border-white/10 bg-white/5 text-slate-300"
                            : "border-slate-200 bg-slate-100 text-slate-700"
                        }`}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Edit & Delete */}
                <div
                  className={`mt-5 flex items-center justify-between gap-2 border-t pt-4 ${
                    isDark ? "border-white/10" : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => openEditModal(product)}
                    className="flex-1 rounded-xl border border-amber-400/40 bg-amber-500/15 px-3 py-2 text-xs font-bold text-amber-300 transition hover:bg-amber-500/25"
                  >
                    ✏️ {isArabic ? "تعديل المنتج والسعر" : "Edit & Price"}
                  </button>

                  {confirmDeleteId === product.id ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product)}
                        className="rounded-xl bg-rose-600 px-3 py-2 text-xs font-extrabold text-white hover:bg-rose-500"
                      >
                        {isArabic ? "تأكيد الحذف" : "Confirm"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="rounded-xl border border-white/15 px-2.5 py-2 text-xs font-semibold text-slate-300"
                      >
                        {isArabic ? "إلغاء" : "Cancel"}
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setConfirmDeleteId(product.id)}
                      className="rounded-xl border border-rose-500/35 bg-rose-500/10 px-3.5 py-2 text-xs font-bold text-rose-300 transition hover:bg-rose-500/20"
                    >
                      🗑️ {isArabic ? "حذف" : "Delete"}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}