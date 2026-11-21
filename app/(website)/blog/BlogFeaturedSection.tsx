"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

type Localized = { ar: string; en: string };

const testimonials: {
  id: number;
  name: Localized;
  role: Localized;
  quote: Localized;
}[] = [
  {
    id: 1,
    name: { ar: "سارة أحمد", en: "Sara Ahmed" },
    role: { ar: "قارئة منذ سنتين", en: "Reader for 2 years" },
    quote: {
      ar: "نصائح المدونة غيّرت روتين بشرتي بالكامل. المعلومات بسيطة وواضحة وسهل تطبيقها يوميًا.",
      en: "The blog's tips completely changed my skincare routine. Simple, clear, and easy to follow every day.",
    },
  },
  {
    id: 2,
    name: { ar: "مريم خالد", en: "Mariam Khaled" },
    role: { ar: "عاشقة مكياج", en: "Makeup lover" },
    quote: {
      ar: "أحب أفكار المكياج الجديدة كل أسبوع. دايمًا ألاقي إطلالة تناسب مناسبتي.",
      en: "I love the new makeup ideas every week. I always find a look that fits my occasion.",
    },
  },
  {
    id: 3,
    name: { ar: "نور حسن", en: "Nour Hassan" },
    role: { ar: "قارئة جديدة", en: "New reader" },
    quote: {
      ar: "بدأت أتابع المدونة من شهر وتعلمت أختار الإكسسوارات والمنتجات المناسبة لي بثقة.",
      en: "I started following a month ago and learned to choose accessories and products that suit me with confidence.",
    },
  },
  {
    id: 4,
    name: { ar: "ليلى محمود", en: "Layla Mahmoud" },
    role: { ar: "متابعة وفية", en: "Loyal follower" },
    quote: {
      ar: "المحتوى صادق وبعيد عن المبالغة، وده اللي خلّاني أثق في كل نصيحة.",
      en: "The content is honest and free of exaggeration, which is why I trust every tip.",
    },
  },
];

export default function BlogTestimonialsSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";

  const [activeId, setActiveId] = useState(testimonials[0].id);
  const active = testimonials.find((t) => t.id === activeId) ?? testimonials[0];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#E6EEE9] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#061811] dark:text-white md:py-32"
    >
      <style>{`
        @keyframes orvelia-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .orvelia-fade-up { animation: orvelia-fade-up 500ms ease both; }
        @media (prefers-reduced-motion: reduce) {
          .orvelia-fade-up { animation: none; }
        }
      `}</style>

      {/* Glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[150px] dark:bg-emerald-500/10" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
          {isArabic ? "آراء قارئاتنا" : "WHAT READERS SAY"}
        </span>

        {/* Quote */}
        <div key={active.id} className="orvelia-fade-up mt-8 min-h-[260px]">
          <div className="flex justify-center gap-1 text-emerald-600 dark:text-emerald-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="fill-current" />
            ))}
          </div>

          <blockquote className="mt-8 text-2xl font-bold leading-[1.9] sm:text-3xl md:text-4xl">
            “{active.quote[lang]}”
          </blockquote>

          <p className="mt-8 text-lg font-black">{active.name[lang]}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {active.role[lang]}
          </p>
        </div>

        {/* Avatars */}
        <div
          role="tablist"
          aria-label={isArabic ? "اختيار رأي" : "Choose a testimonial"}
          className="mt-12 flex items-center justify-center gap-4"
        >
          {testimonials.map((t) => {
            const isActive = t.id === activeId;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={t.name[lang]}
                onClick={() => setActiveId(t.id)}
                className={`flex h-14 w-14 items-center justify-center rounded-full text-lg font-black transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-300 ${
                  isActive
                    ? "scale-110 bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-700/30"
                    : "border border-emerald-700/25 text-emerald-700 hover:bg-emerald-700/10 dark:border-emerald-300/25 dark:text-emerald-300 dark:hover:bg-emerald-300/10"
                }`}
              >
                {t.name[lang].charAt(0)}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}