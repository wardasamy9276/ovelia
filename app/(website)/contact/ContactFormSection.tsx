"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

type Localized = { ar: string; en: string };

const REFRESH_AFTER = 8; // ثواني قبل الريفريش التلقائي
const SHOP_PATH = "/shop"; // غيّره لمسار صفحة المنتجات عندك

const topics: { key: string; label: Localized }[] = [
  { key: "products", label: { ar: "المنتجات", en: "Products" } },
  { key: "order", label: { ar: "الطلبات", en: "Orders" } },
  { key: "advice", label: { ar: "النصائح", en: "Advice" } },
  { key: "other", label: { ar: "أخرى", en: "Other" } },
];

const fieldBase =
  "peer w-full border-0 border-b border-[#071A2F]/15 bg-transparent px-0 pb-3 pt-7 text-base text-[#071A2F] placeholder-transparent outline-none transition-colors duration-500 focus:border-emerald-700 dark:border-white/15 dark:text-white dark:focus:border-emerald-300";

const labelBase =
  "pointer-events-none absolute start-0 top-7 text-sm text-slate-500 transition-all duration-500 peer-focus:top-0 peer-focus:text-xs peer-focus:text-emerald-700 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs dark:text-slate-400 dark:peer-focus:text-emerald-300";

export default function ContactFormSection() {
  const { language } = useLanguage();
  const router = useRouter();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  // التباعد والحروف الكبيرة للإنجليزي فقط (بيبوظ اتصال الحروف العربية)
  const caps = isArabic ? "" : "uppercase tracking-[0.25em]";

  const [topic, setTopic] = useState(topics[0].key);
  const [sent, setSent] = useState(false);
  const [seconds, setSeconds] = useState(REFRESH_AFTER);
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: اربطه بالـ API بتاعك هنا
    // const data = new FormData(e.currentTarget); data.append("topic", topic);
    setSeconds(REFRESH_AFTER);
    setSent(true);
  };

  // عدّاد الريفريش التلقائي (بيقف لو بتكتبي في البحث)
  useEffect(() => {
    if (!sent || query.trim()) return;

    if (seconds <= 0) {
      window.location.reload();
      return;
    }

    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [sent, seconds, query]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`${SHOP_PATH}?search=${encodeURIComponent(q)}`);
  };

  return (
    <section
      id="contact-form"
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate scroll-mt-20 overflow-hidden bg-[#E6EEE9] px-5 py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#061811] dark:text-white sm:px-8 md:py-36"
    >
      {/* Soft glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[150px] dark:bg-emerald-500/10" />

      <div className="relative mx-auto max-w-3xl border border-[#071A2F]/10 bg-white/50 px-6 py-14 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.03] sm:px-12 md:px-16 md:py-20">
        {/* Corner accents */}
        <span className="pointer-events-none absolute -start-px -top-px h-8 w-8 border-s border-t border-emerald-700 dark:border-emerald-300" />
        <span className="pointer-events-none absolute -bottom-px -end-px h-8 w-8 border-b border-e border-emerald-700 dark:border-emerald-300" />

        {sent ? (
          <div role="status" className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 dark:border-emerald-300 dark:text-emerald-300">
              <Check size={26} />
            </span>

            <h3
              className={`mt-6 text-2xl sm:text-3xl ${
                isArabic ? "font-black" : "font-serif font-medium"
              }`}
            >
              {isArabic ? "وصلتنا رسالتك، شكرًا لكِ" : "Your message has arrived, thank you"}
            </h3>

            <span className="mx-auto mt-8 block h-px w-16 bg-emerald-700/60 dark:bg-emerald-300/60" />

            {/* Product search */}
            <p className="mx-auto mt-8 max-w-md text-sm leading-9 text-slate-600 dark:text-emerald-50/70">
              {isArabic
                ? "وفي الوقت ده، تحبي تدوري على منتج؟"
                : "In the meantime, looking for a product?"}
            </p>

            <form
              onSubmit={handleSearch}
              role="search"
              className="mx-auto mt-6 flex max-w-md items-center border-b border-[#071A2F]/20 transition-colors duration-500 focus-within:border-emerald-700 dark:border-white/20 dark:focus-within:border-emerald-300"
            >
              <Search
                size={18}
                className="shrink-0 text-emerald-700 dark:text-emerald-300"
              />
              <label htmlFor="product-search" className="sr-only">
                {isArabic ? "ابحثي عن منتج" : "Search products"}
              </label>
              <input
                id="product-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isArabic ? "ابحثي عن منتج..." : "Search products..."}
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-base text-[#071A2F] outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
              />
              <button
                type="submit"
                aria-label={isArabic ? "بحث" : "Search"}
                className="shrink-0 py-3 text-sm font-medium text-emerald-700 transition hover:text-emerald-900 dark:text-emerald-300 dark:hover:text-emerald-100"
              >
                {isArabic ? "بحث" : "Search"}
              </button>
            </form>

            {/* Auto refresh note */}
            <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">
              {query.trim()
                ? isArabic
                  ? "تم إيقاف التحديث التلقائي أثناء البحث."
                  : "Auto-refresh is paused while you search."
                : isArabic
                  ? `سيتم تحديث الصفحة تلقائيًا خلال ${seconds} ثانية`
                  : `This page will refresh automatically in ${seconds}s`}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center">
              <span
                className={`text-xs font-medium text-emerald-700 dark:text-emerald-300 ${caps}`}
              >
                {isArabic ? "راسلينا" : "Get in Touch"}
              </span>

              <h2
                className={`mt-5 text-3xl leading-[1.6] sm:text-4xl md:text-5xl ${
                  isArabic ? "font-black" : "font-serif font-medium tracking-tight"
                }`}
              >
                {isArabic ? "يسعدنا أن نسمع منكِ" : "We'd Be Delighted to Hear From You"}
              </h2>

              <span className="mx-auto mt-8 block h-px w-16 bg-emerald-700/60 dark:bg-emerald-300/60" />

              <p className="mx-auto mt-8 max-w-md text-sm leading-9 text-slate-600 dark:text-emerald-50/70">
                {isArabic
                  ? "اكتبي لنا بما تحبين، وسنرد عليكِ خلال يوم عمل واحد."
                  : "Write to us however you like, and we will reply within one business day."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-14 space-y-10">
              {/* Topic tabs */}
              <fieldset>
                <legend className="sr-only">
                  {isArabic ? "موضوع الرسالة" : "Topic"}
                </legend>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                  {topics.map((t) => {
                    const active = topic === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setTopic(t.key)}
                        className={`border-b pb-2 text-xs font-medium transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-300 ${caps} ${
                          active
                            ? "border-emerald-700 text-emerald-700 dark:border-emerald-300 dark:text-emerald-300"
                            : "border-transparent text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300"
                        }`}
                      >
                        {t.label[lang]}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-10 sm:grid-cols-2">
                <div className="relative">
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder=" "
                    autoComplete="name"
                    className={fieldBase}
                  />
                  <label htmlFor="contact-name" className={labelBase}>
                    {isArabic ? "الاسم" : "Name"}
                  </label>
                </div>

                <div className="relative">
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder=" "
                    autoComplete="email"
                    className={fieldBase}
                  />
                  <label htmlFor="contact-email" className={labelBase}>
                    {isArabic ? "البريد الإلكتروني" : "Email"}
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder=" "
                  autoComplete="tel"
                  className={fieldBase}
                />
                <label htmlFor="contact-phone" className={labelBase}>
                  {isArabic ? "رقم الهاتف (اختياري)" : "Phone (optional)"}
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  placeholder=" "
                  className={`${fieldBase} resize-none`}
                />
                <label htmlFor="contact-message" className={labelBase}>
                  {isArabic ? "رسالتك" : "Your message"}
                </label>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className={`group inline-flex w-full items-center justify-center gap-4 border border-emerald-800 bg-emerald-800 px-10 py-4 text-xs font-medium text-white transition duration-500 hover:bg-transparent hover:text-emerald-800 dark:border-emerald-300 dark:bg-emerald-300 dark:text-[#061811] dark:hover:bg-transparent dark:hover:text-emerald-300 sm:w-auto ${caps}`}
                >
                  {isArabic ? "إرسال الرسالة" : "Send Message"}
                  <Arrow
                    size={16}
                    className={`transition-transform duration-500 ${
                      isArabic ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}