"use client";

import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function BlogBeforeAfterSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [pos, setPos] = useState(50);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      {/* Glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[150px] dark:bg-emerald-600/15" />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-black leading-[1.5] sm:text-4xl md:text-5xl">
            {isArabic ? "الفرق يبان من أول أسابيع" : "The Difference Shows in Weeks"}
          </h2>
          <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
            {isArabic
              ? "اسحبي المقبض لتشوفي الفرق بين قبل وبعد الالتزام بروتين العناية."
              : "Drag the handle to see the difference before and after a consistent care routine."}
          </p>
        </div>

        {/* Slider: dir=ltr عشان الاتجاه يفضل ثابت حتى في العربي */}
        <div
          dir="ltr"
          className="relative mx-auto mt-14 aspect-[4/3] w-full overflow-hidden rounded-[2rem] bg-emerald-900 shadow-2xl shadow-emerald-900/25 ring-1 ring-emerald-900/10 dark:bg-[#0B2A1F] dark:shadow-black/50 dark:ring-white/10 sm:aspect-[16/10]"
        >
          {/* After: الفيديو الأصلي */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/assets/video1/face-blusher.mp4" type="video/mp4" />
          </video>

          {/* Before: طبقة فلتر فوق نفس الفيديو (متزامنة تمامًا) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-slate-500/20 backdrop-blur-[3px] backdrop-contrast-75 backdrop-grayscale backdrop-brightness-90"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />

          {/* Labels */}
          <span className="absolute start-5 top-5 rounded-full bg-black/40 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-md">
            {isArabic ? "قبل" : "Before"}
          </span>
          <span className="absolute end-5 top-5 rounded-full bg-emerald-400 px-4 py-1.5 text-xs font-bold text-[#061811]">
            {isArabic ? "بعد" : "After"}
          </span>

          {/* Divider + handle */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-xl">
              <MoveHorizontal size={20} />
            </span>
          </div>

          {/* Input يتحكم بالسحب واللمس ولوحة المفاتيح */}
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={isArabic ? "قارني قبل وبعد" : "Compare before and after"}
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
          {isArabic
            ? "* النتائج تختلف من شخص لآخر حسب نوع البشرة والالتزام بالروتين."
            : "* Results vary from person to person depending on skin type and consistency."}
        </p>
      </div>
    </section>
  );
}