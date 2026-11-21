"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

type Localized = { ar: string; en: string };

const faqs: { id: number; q: Localized; a: Localized }[] = [
  {
    id: 1,
    q: {
      ar: "كل قد إيه المفروض أغيّر روتين العناية ببشرتي؟",
      en: "How often should I change my skincare routine?",
    },
    a: {
      ar: "مفيش داعي لتغييره باستمرار. الأفضل تثبتي على روتين بسيط لعدة أسابيع، وتغيّريه فقط عند تغيّر الفصول أو احتياج بشرتك.",
      en: "There's no need to change it constantly. Stick with a simple routine for several weeks, and adjust only when the seasons or your skin's needs change.",
    },
  },
  {
    id: 2,
    q: {
      ar: "هل أحتاج واقي الشمس في الأيام الغائمة؟",
      en: "Do I need sunscreen on cloudy days?",
    },
    a: {
      ar: "أيوه، لأن الأشعة فوق البنفسجية بتعدّي من السحاب. واقي الشمس خطوة يومية طول السنة.",
      en: "Yes, because UV rays pass through clouds. Sunscreen is a daily step all year round.",
    },
  },
  {
    id: 3,
    q: {
      ar: "إزاي أعرف إن المنتج مناسب لبشرتي؟",
      en: "How do I know if a product suits my skin?",
    },
    a: {
      ar: "جرّبيه على منطقة صغيرة الأول لمدة يومين تقريبًا، ولو ظهر احمرار أو حكّة وقفي استخدامه.",
      en: "Patch-test it on a small area for about two days first, and stop using it if redness or itching appears.",
    },
  },
  {
    id: 4,
    q: {
      ar: "هل لازم أستخدم كل المنتجات في نفس الوقت؟",
      en: "Do I have to use all products at the same time?",
    },
    a: {
      ar: "لا. ابدئي بالأساسيات (غسول، مرطب، واقي شمس) وضيفي منتجًا واحدًا جديدًا كل مرة.",
      en: "No. Start with the basics (cleanser, moisturizer, sunscreen) and add one new product at a time.",
    },
  },
  {
    id: 5,
    q: {
      ar: "كل قد إيه تظهر نتيجة منتجات العناية؟",
      en: "How long until skincare products show results?",
    },
    a: {
      ar: "بعض المنتجات بتدّي ترطيبًا فوريًا، لكن النتائج الواضحة غالبًا بتحتاج من ٤ إلى ٨ أسابيع من الاستخدام المنتظم.",
      en: "Some products give instant hydration, but visible results usually take 4 to 8 weeks of consistent use.",
    },
  },
];

export default function BlogFaqSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const [openId, setOpenId] = useState<number | null>(faqs[0].id);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#E6EEE9] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#061811] dark:text-white md:py-32"
    >
      {/* Glow */}
      <div className="absolute -end-24 top-10 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-[140px] dark:bg-emerald-500/10" />
      <div className="absolute -start-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-teal-400/20 blur-[140px] dark:bg-teal-400/10" />

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20 lg:px-16">
        {/* Header */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {isArabic ? "الأسئلة الشائعة" : "FAQ"}
          </span>
          <h2 className="mt-3 text-3xl font-black leading-[1.5] sm:text-4xl md:text-5xl">
            {isArabic ? "عندك سؤال؟ ممكن نكون جاوبناه" : "Got a Question? We May Have Answered It"}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-8 text-slate-600 dark:text-emerald-50/70 md:text-base">
            {isArabic
              ? "جمعنا لك أكتر الأسئلة اللي بتوصلنا عن العناية بالبشرة والمكياج."
              : "We've gathered the questions we get most about skincare and makeup."}
          </p>

          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-full border border-emerald-700/30 px-6 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-700/10 dark:border-emerald-300/30 dark:text-emerald-200 dark:hover:bg-emerald-300/10"
          >
            {isArabic ? "تواصلي معنا" : "Contact Us"}
            <Arrow
              size={18}
              className={`transition-transform ${
                isArabic ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
              }`}
            />
          </Link>
        </div>

        {/* Accordion */}
        <ul className="divide-y divide-[#071A2F]/10 border-y border-[#071A2F]/10 dark:divide-white/10 dark:border-white/10">
          {faqs.map((f, i) => {
            const open = openId === f.id;
            const panelId = `faq-panel-${f.id}`;

            return (
              <li key={f.id}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenId(open ? null : f.id)}
                  className="group flex w-full items-center gap-5 py-6 text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-300 md:py-7"
                >
                  <span
                    className={`text-xl font-black transition-colors duration-300 md:text-2xl ${
                      open
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-emerald-700/30 dark:text-emerald-300/25"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    className={`flex-1 text-base font-bold leading-8 transition-colors duration-300 md:text-xl ${
                      open
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-[#071A2F] group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300"
                    }`}
                  >
                    {f.q[lang]}
                  </span>

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-300 ${
                      open
                        ? "rotate-45 border-emerald-700 bg-emerald-700 text-white dark:border-emerald-300 dark:bg-emerald-300 dark:text-[#061811]"
                        : "border-emerald-700/30 text-emerald-700 dark:border-emerald-300/30 dark:text-emerald-300"
                    }`}
                  >
                    <Plus size={18} />
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 ps-[3.75rem] text-sm leading-9 text-slate-600 dark:text-emerald-50/75 md:ps-[4.5rem] md:text-base">
                      {f.a[lang]}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}