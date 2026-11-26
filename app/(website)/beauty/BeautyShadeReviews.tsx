"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type ReviewCategoryKey =
  | "all"
  | "concealer"
  | "lipstick"
  | "eyeliner"
  | "blush"
  | "mascara"
  | "skincare";

interface ShadeReviewItem {
  id: string;
  authorAr: string;
  authorEn: string;
  category: Exclude<ReviewCategoryKey, "all">;
  productAr: string;
  productEn: string;
  shadeAr: string;
  shadeEn: string;
  shadeHex: string;
  skinTypeAr: string;
  skinTypeEn: string;
  rating: number;
  date: string;
  commentAr: string;
  commentEn: string;
  verifiedTryOn: boolean;
}

const REVIEW_FILTERS: { key: ReviewCategoryKey; ar: string; en: string }[] = [
  { key: "all", ar: "كل التقييمات", en: "All Reviews" },
  { key: "concealer", ar: "الكونسيلر", en: "Concealer" },
  { key: "lipstick", ar: "أحمر الشفاه", en: "Lipstick" },
  { key: "eyeliner", ar: "الآيلاينر", en: "Eyeliner" },
  { key: "blush", ar: "البلاشر", en: "Blush" },
  { key: "mascara", ar: "الماسكارا", en: "Mascara" },
  { key: "skincare", ar: "تحضير البشرة", en: "Skin Prep" },
];

const INITIAL_REVIEWS: ShadeReviewItem[] = [
  {
    id: "rev-1",
    authorAr: "سلمى محمود",
    authorEn: "Salma Mahmoud",
    category: "concealer",
    productAr: "كونسيلر أورفيليا المخملي للإشراقة",
    productEn: "Orvelia Velvet Radiant Concealer",
    shadeAr: "فانيلا دافئة (03W)",
    shadeEn: "Warm Vanilla (03W)",
    shadeHex: "#E8C39E",
    skinTypeAr: "بشرة مختلطة • أندرتون دافئ",
    skinTypeEn: "Combination • Warm Undertone",
    rating: 5,
    date: "2026-11-18",
    commentAr:
      "أكتر حاجة عجبتني إنه مضاد للتكتل فعلاً تحت العين ومش بيخطط بعد ساعات، والدرجة (03W) اندمجت بلمح البصر.",
    commentEn:
      "Truly crease-proof under the eyes after hours of wear, and Warm Vanilla (03W) blended seamlessly.",
    verifiedTryOn: true,
  },
  {
    id: "rev-2",
    authorAr: "يارا طارق",
    authorEn: "Yara Tarek",
    category: "lipstick",
    productAr: "أحمر شفاه مخملي وساتان مرطب",
    productEn: "Velvet Matte & Satin Hydrating Lipstick",
    shadeAr: "توتي مخملي (L04)",
    shadeEn: "Velvet Berry (L04)",
    shadeHex: "#9E2A4B",
    skinTypeAr: "بشرة قمحية • أندرتون محايد",
    skinTypeEn: "Medium/Tan • Neutral Undertone",
    rating: 5,
    date: "2026-11-15",
    commentAr:
      "اللون غني جداً ومخملي ومش بينشف الشفايف نهائي. جربت الدرجة بالـ AR الأول وطلعت مطابقة تماماً.",
    commentEn:
      "Rich velvet pigment that never dries out lips. Tried it via AR first and the shade matched spot-on.",
    verifiedTryOn: true,
  },
  {
    id: "rev-3",
    authorAr: "منة الله كريم",
    authorEn: "Menna Karim",
    category: "eyeliner",
    productAr: "آيلاينر سائل دقيق مقاوم للماء 24 ساعة",
    productEn: "24h Waterproof Precision Liquid Eyeliner",
    shadeAr: "أسود فاحم (E01)",
    shadeEn: "Jet Black (E01)",
    shadeHex: "#111827",
    skinTypeAr: "عيون حساسة وعدسات",
    skinTypeEn: "Sensitive Eyes & Lenses",
    rating: 5,
    date: "2026-11-11",
    commentAr:
      "السن رفيع وسهل في رسم البوز، وثابت جداً طول اليوم ومناسب للعدسات بدون أي إحساس بثقل.",
    commentEn:
      "Super fine tip for clean wings, stays put all day, and feels comfortable with contact lenses.",
    verifiedTryOn: false,
  },
  {
    id: "rev-4",
    authorAr: "فريدة هشام",
    authorEn: "Farida Hesham",
    category: "blush",
    productAr: "بلاشر كريمي مخملي + إضاءة لؤلؤية",
    productEn: "Velvet Cream Blush & Pearl Glow",
    shadeAr: "خوخي مشرق (B03)",
    shadeEn: "Radiant Peach (B03)",
    shadeHex: "#F29B7E",
    skinTypeAr: "بشرة جافة إلى مختلطة",
    skinTypeEn: "Dry to Combination Skin",
    rating: 4,
    date: "2026-11-07",
    commentAr:
      "تورّد طبيعي وناعم جداً ومش بيشيل الفاونديشن تحته لما يتدمج بالفرشة أو بالإصبع.",
    commentEn:
      "Soft natural flush that blends smoothly without lifting base makeup underneath.",
    verifiedTryOn: true,
  },
];

export default function BeautyShadeReviews() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [isDark, setIsDark] = useState(true);
  const [reviews, setReviews] = useState<ShadeReviewItem[]>(INITIAL_REVIEWS);
  const [activeCategory, setActiveCategory] =
    useState<ReviewCategoryKey>("all");
  const [minStars, setMinStars] = useState<number>(0);

  // Add Review Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [newCategory, setNewCategory] =
    useState<Exclude<ReviewCategoryKey, "all">>("concealer");
  const [shadeText, setShadeText] = useState("");
  const [shadeHex, setShadeHex] = useState("#E8C39E");
  const [newRating, setNewRating] = useState<number>(5);
  const [commentText, setCommentText] = useState("");
  const [formError, setFormError] = useState("");

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

  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      if (activeCategory !== "all" && rev.category !== activeCategory) {
        return false;
      }
      if (minStars > 0 && rev.rating < minStars) {
        return false;
      }
      return true;
    });
  }, [activeCategory, minStars, reviews]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return "5.0";
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = authorName.trim();
    const cleanComment = commentText.trim();

    if (!cleanName || !cleanComment) {
      setFormError(
        isArabic
          ? "من فضلك اكتبي اسمك وتعليقك على التجربة."
          : "Please enter your name and review comment."
      );
      return;
    }

    const catObj =
      REVIEW_FILTERS.find((c) => c.key === newCategory) || REVIEW_FILTERS[1];

    const newItem: ShadeReviewItem = {
      id: `rev-${Date.now()}`,
      authorAr: cleanName,
      authorEn: cleanName,
      category: newCategory,
      productAr: catObj.ar,
      productEn: catObj.en,
      shadeAr: shadeText.trim() || "درجة مختارة",
      shadeEn: shadeText.trim() || "Selected Shade",
      shadeHex,
      skinTypeAr: "تجربة عميلة أورفيليا",
      skinTypeEn: "Orvelia Customer Review",
      rating: newRating,
      date: "2026-11-23",
      commentAr: cleanComment,
      commentEn: cleanComment,
      verifiedTryOn: true,
    };

    setReviews((prev) => [newItem, ...prev]);
    setAuthorName("");
    setShadeText("");
    setCommentText("");
    setNewRating(5);
    setFormError("");
    setShowAddForm(false);
  };

  const cardSurface = isDark
    ? "bg-[#0a101f]/95 border-white/10 text-white"
    : "bg-white border-slate-200 text-slate-900 shadow-sm";

  const subSurface = isDark
    ? "bg-[#060a14] border-white/10"
    : "bg-slate-50 border-slate-200";

  const muted = isDark ? "text-slate-400" : "text-slate-600";

  const inputCls = `w-full rounded-xl border px-3.5 py-2 text-xs sm:text-sm outline-none ${
    isDark
      ? "border-white/15 bg-[#060a14] text-white placeholder:text-slate-500 focus:border-amber-400"
      : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-amber-500"
  }`;

  return (
    <section dir={dir} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className={`rounded-3xl border p-6 sm:p-8 ${cardSurface}`}>
        {/* Header + Average Score */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-500/10 px-3.5 py-1 text-xs font-extrabold text-amber-300">
              <span>★</span>
              <span>
                {isArabic
                  ? "تقييمات وتجارب عميلات أورفيليا"
                  : "VERIFIED SHADE & BEAUTY REVIEWS"}
              </span>
            </span>

            <h2 className="mt-3 text-2xl font-black sm:text-3xl">
              {isArabic
                ? "ماذا قالت العميلات عن الدرجات والثبات؟"
                : "What Customers Say About Shades & Wear"}
            </h2>
            <p className={`mt-1 text-xs sm:text-sm ${muted}`}>
              {isArabic
                ? "تصفّحي آراء حقيقية حسب نوع المنتج وعدد النجوم أو شاركي تجربتك مع الدرجة."
                : "Filter reviews by product type and star rating, or share your own shade review."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`rounded-2xl border px-4 py-3 text-center ${subSurface}`}
            >
              <div className="text-xl font-black text-amber-400">
                ★ {averageRating} / 5.0
              </div>
              <p className={`text-[11px] font-semibold ${muted}`}>
                {reviews.length}{" "}
                {isArabic ? "تقييم مسجل" : "verified reviews"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAddForm((prev) => !prev)}
              className="rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-400 px-4 py-3 text-xs font-extrabold text-slate-950 transition hover:opacity-95 sm:text-sm"
            >
              {showAddForm
                ? isArabic
                  ? "إغلاق النموذج"
                  : "Close Form"
                : isArabic
                ? "+ أضيفي تقييمك"
                : "+ Write a Review"}
            </button>
          </div>
        </div>

        {/* Add Review Form */}
        {showAddForm && (
          <form
            onSubmit={handleSubmitReview}
            className={`mt-6 space-y-4 rounded-2xl border border-amber-400/35 p-5 ${subSurface}`}
          >
            <h3 className="text-sm font-extrabold text-amber-300">
              {isArabic
                ? "شاركينا رأيك في الدرجة والثبات"
                : "Share Your Shade & Wear Experience"}
            </h3>

            {formError && (
              <p className="rounded-xl border border-rose-500/40 bg-rose-500/15 px-3 py-2 text-xs font-bold text-rose-300">
                {formError}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-bold">
                  {isArabic ? "الاسم *" : "Your Name *"}
                </label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder={isArabic ? "مثال: روان حسن" : "e.g. Rawan Hassan"}
                  className={inputCls}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">
                  {isArabic ? "القسم" : "Category"}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(
                      e.target.value as Exclude<ReviewCategoryKey, "all">
                    )
                  }
                  className={inputCls}
                >
                  {REVIEW_FILTERS.filter((f) => f.key !== "all").map((cat) => (
                    <option key={cat.key} value={cat.key}>
                      {isArabic ? cat.ar : cat.en}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">
                  {isArabic ? "اسم / كود الدرجة" : "Shade Name / Code"}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={shadeHex}
                    onChange={(e) => setShadeHex(e.target.value)}
                    className="h-9 w-10 cursor-pointer rounded-lg border border-white/15 bg-transparent"
                  />
                  <input
                    type="text"
                    value={shadeText}
                    onChange={(e) => setShadeText(e.target.value)}
                    placeholder={
                      isArabic ? "مثال: نيود روز (L01)" : "e.g. Nude Rose (L01)"
                    }
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">
                  {isArabic ? "التقييم بالنجوم" : "Star Rating"}
                </label>
                <div className="flex items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className={`h-9 w-9 rounded-xl border text-sm font-extrabold transition ${
                        newRating >= star
                          ? "border-amber-400 bg-amber-400/20 text-amber-300"
                          : "border-white/10 bg-white/5 text-slate-500"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold">
                {isArabic ? "تعليقك *" : "Your Review *"}
              </label>
              <textarea
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  isArabic
                    ? "احكي عن تجربة اللون، الملمس، الثبات، أو تجربة AR..."
                    : "Tell us about pigment, texture, wear time, or AR try-on..."
                }
                className={inputCls}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-extrabold text-slate-950 hover:opacity-95 sm:text-sm"
              >
                {isArabic ? "نشر التقييم الآن" : "Publish Review"}
              </button>
            </div>
          </form>
        )}

        {/* Category & Star Filter Pills */}
        <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {REVIEW_FILTERS.map((f) => {
              const active = activeCategory === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveCategory(f.key)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                    active
                      ? "border-amber-400 bg-amber-500/20 text-amber-300"
                      : isDark
                      ? "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  {isArabic ? f.ar : f.en}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span className={muted}>{isArabic ? "النجوم:" : "Stars:"}</span>
            {[0, 5, 4].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setMinStars(st)}
                className={`rounded-lg border px-2.5 py-1 transition ${
                  minStars === st
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-300"
                    : isDark
                    ? "border-white/10 text-slate-300"
                    : "border-slate-200 text-slate-700"
                }`}
              >
                {st === 0
                  ? isArabic
                    ? "الكل"
                    : "All"
                  : `${st}★+`}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredReviews.map((rev) => (
            <article
              key={rev.id}
              className={`flex flex-col justify-between rounded-2xl border p-5 ${subSurface}`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-extrabold">
                        {isArabic ? rev.authorAr : rev.authorEn}
                      </h3>
                      {rev.verifiedTryOn && (
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/15 px-2 py-0.5 text-[10px] font-bold text-cyan-300">
                          ✨ {isArabic ? "جرّبت بالـ AR" : "AR Verified"}
                        </span>
                      )}
                    </div>
                    <p className={`mt-0.5 text-[11px] ${muted}`}>
                      {isArabic ? rev.skinTypeAr : rev.skinTypeEn} • {rev.date}
                    </p>
                  </div>

                  <div className="text-sm font-black text-amber-400">
                    {"★".repeat(rev.rating)}
                    <span className="text-slate-600">
                      {"★".repeat(Math.max(0, 5 - rev.rating))}
                    </span>
                  </div>
                </div>

                {/* Shade Badge */}
                <div className="mt-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs">
                  <span
                    className="h-4 w-4 shrink-0 rounded-full border border-white/30"
                    style={{ backgroundColor: rev.shadeHex }}
                  />
                  <span className="font-bold">
                    {isArabic ? rev.productAr : rev.productEn}
                  </span>
                  <span className="text-amber-300">
                    • {isArabic ? rev.shadeAr : rev.shadeEn}
                  </span>
                </div>

                <p className={`mt-3 text-xs leading-relaxed sm:text-sm ${muted}`}>
                  “{isArabic ? rev.commentAr : rev.commentEn}”
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}