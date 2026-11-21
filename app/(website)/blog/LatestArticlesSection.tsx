"use client";

import { Sparkles } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

const words = {
  ar: ["العناية", "الإشراقة", "الأناقة", "النضارة", "الثقة", "التألق", "الهدوء", "الجمال"],
  en: ["Care", "Glow", "Elegance", "Freshness", "Confidence", "Radiance", "Calm", "Beauty"],
};

export default function BlogQuoteMarqueeSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";

  // نكرر القائمة مرتين عشان الحركة تكمل بدون فراغ
  const track = [...words[lang], ...words[lang]];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      <style>{`
        @keyframes orvelia-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .orvelia-marquee-track {
          animation: orvelia-marquee 30s linear infinite;
        }
        .orvelia-marquee:hover .orvelia-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .orvelia-marquee-track { animation: none; }
        }
      `}</style>

      {/* Glow */}
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[140px] dark:bg-emerald-600/15" />

      {/* Quote */}
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-emerald-700/25 text-emerald-700 dark:border-emerald-300/25 dark:text-emerald-300">
          <Sparkles size={20} />
        </span>

        <blockquote className="mt-8">
          <p className="relative text-3xl font-black leading-[1.6] sm:text-4xl md:text-5xl">
            <span
              aria-hidden
              className="absolute -top-10 start-1/2 -translate-x-1/2 text-8xl leading-none text-emerald-700/15 dark:text-emerald-300/15 rtl:translate-x-1/2"
            >
              “
            </span>
            {isArabic ? (
              <>
                الجمال الحقيقي يبدأ من
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  {" "}
                  العناية اليومية
                </span>
                ، لا من المكياج وحده
              </>
            ) : (
              <>
                Real beauty begins with
                <span className="bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  {" "}
                  daily care
                </span>
                , not makeup alone
              </>
            )}
          </p>
        </blockquote>

        <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          {isArabic ? "— فريق أورفيليا" : "— The Orvelia Team"}
        </p>
      </div>

      {/* Marquee */}
      <div
        dir="ltr"
        className="orvelia-marquee relative mt-20 overflow-hidden border-y border-[#071A2F]/10 py-6 dark:border-white/10"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-24 bg-gradient-to-r from-[#F1F4F2] to-transparent dark:from-[#030906]" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-24 bg-gradient-to-l from-[#F1F4F2] to-transparent dark:from-[#030906]" />

        <div className="orvelia-marquee-track flex w-max items-center">
          {track.map((word, i) => (
            <span key={i} className="flex items-center">
              <span className="px-8 text-3xl font-black text-[#071A2F]/20 transition-colors hover:text-emerald-700 dark:text-white/15 dark:hover:text-emerald-300 md:text-5xl">
                {word}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}