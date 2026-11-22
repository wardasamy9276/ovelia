"use client";

import React, { useState } from "react";

export type Locale = "ar" | "en";

interface BlushOverviewSectionProps {
  locale?: Locale;
  previewVideoSrc?: string;
}

type TabKey = "whatIs" | "whyImportant";

const TRANSLATIONS = {
  ar: {
    dir: "rtl" as const,
    titlePart1: "نظرة عامة على تجربة",
    titlePart2: "أحمر الخدود الافتراضية",
    videoLabel: "معاينة تجربة أحمر الخدود الافتراضية",
    tabs: {
      whatIs: {
        label: "ما هي تقنية أحمر الخدود الافتراضي؟",
        description:
          "أداة ذكية تعتمد على الذكاء الاصطناعي والواقع المعزز، تتيح للمستخدم تجربة درجات مختلفة من أحمر الخدود على الوجه بشكل فوري ومتناسق مع لون البشرة وتوزيع ملامح الوجه.",
      },
      whyImportant: {
        label: "لماذا هي مهمة؟",
        description:
          "تساعد المتسوقين على اختيار الدرجة الأنسب لبشرتهم بثقة قبل الشراء، مما يزيد من معدل التحويل في المتاجر الإلكترونية ويقلل من نسبة المرتجعات ويعزز تجربة العميل.",
      },
    },
  },
  en: {
    dir: "ltr" as const,
    titlePart1: "Overview of Virtual",
    titlePart2: "Blush Try-On Experience",
    videoLabel: "Virtual blush try-on preview",
    tabs: {
      whatIs: {
        label: "What is Virtual Blush Technology?",
        description:
          "A smart tool powered by AI and Augmented Reality that allows users to try different blush shades on their face in real time, seamlessly matching skin tone and facial contours.",
      },
      whyImportant: {
        label: "Why is it Important?",
        description:
          "It helps shoppers confidently pick the most flattering shade before buying, boosting e-commerce conversion rates, reducing product returns, and elevating customer satisfaction.",
      },
    },
  },
};

export default function BlushOverviewSection({
  locale = "ar",
  previewVideoSrc = "/assets/video1/blusher-tech_1234.mp4",
}: BlushOverviewSectionProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("whatIs");
  const t = TRANSLATIONS[locale];

  return (
    <section
      dir={t.dir}
      className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-[#0D1117] transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* العنوان */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-snug mb-10">
          <span className="text-emerald-700 dark:text-[#6EE7B7]">
            {t.titlePart1}{" "}
          </span>
          <span className="bg-gradient-to-l from-amber-500 via-orange-400 to-rose-400 dark:from-[#FBBF24] dark:via-[#F59E0B] dark:to-[#FB7185] bg-clip-text text-transparent">
            {t.titlePart2}
          </span>
        </h2>

        {/* فيديو المعاينة */}
        <div className="relative w-full max-w-[440px] aspect-[16/11] rounded-2xl overflow-hidden bg-slate-200 dark:bg-[#11161D] border border-slate-200/80 dark:border-white/5 shadow-lg dark:shadow-2xl mb-10">
          <video
            src={previewVideoSrc}
            aria-label={t.videoLabel}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* أزرار التبديل */}
        <div
          role="tablist"
          aria-label={t.titlePart1}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full max-w-xl mb-7"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "whatIs"}
            onClick={() => setActiveTab("whatIs")}
            className={`px-5 py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer border ${
              activeTab === "whatIs"
                ? "bg-emerald-600/15 border-emerald-500 text-emerald-700 dark:bg-[#0F3D34] dark:border-[#1E6B5C] dark:text-[#5EEAD4] shadow-sm"
                : "bg-white border-slate-300 text-slate-700 hover:border-slate-400 dark:bg-transparent dark:border-slate-600/70 dark:text-slate-200 dark:hover:border-slate-400"
            }`}
          >
            {t.tabs.whatIs.label}
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "whyImportant"}
            onClick={() => setActiveTab("whyImportant")}
            className={`px-5 py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer border ${
              activeTab === "whyImportant"
                ? "bg-emerald-600/15 border-emerald-500 text-emerald-700 dark:bg-[#0F3D34] dark:border-[#1E6B5C] dark:text-[#5EEAD4] shadow-sm"
                : "bg-white border-slate-300 text-slate-700 hover:border-slate-400 dark:bg-transparent dark:border-slate-600/70 dark:text-slate-200 dark:hover:border-slate-400"
            }`}
          >
            {t.tabs.whyImportant.label}
          </button>
        </div>

        {/* الوصف */}
        <p
          role="tabpanel"
          className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300 min-h-[3.5rem] transition-opacity duration-200"
        >
          {t.tabs[activeTab].description}
        </p>
      </div>
    </section>
  );
}