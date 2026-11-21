"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { Sparkles, Target, Compass } from "lucide-react";
import { aboutValuesData } from "../about/data/aboutValuesData"; // تأكد من مطابقة مسار الاستيراد لمكان ملف البيانات

export default function AboutValuesSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F4F7F5] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#050D18] dark:text-white md:py-32"
    >
      {/* Background Glow Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[160px] dark:bg-emerald-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.04] dark:opacity-[0.06]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-white/85 px-5 py-2.5 shadow-md backdrop-blur-md dark:border-emerald-500/25 dark:bg-[#081A12]">
            <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[11px] font-bold tracking-[2.5px] text-emerald-700 dark:text-emerald-400">
              {isArabic ? aboutValuesData.sectionBadgeAr : aboutValuesData.sectionBadgeEn}
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {isArabic ? aboutValuesData.mainTitleAr : aboutValuesData.mainTitleEn}
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
            {isArabic ? aboutValuesData.mainSubtitleAr : aboutValuesData.mainSubtitleEn}
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
          
          {/* Vision Card */}
          <div className="group relative overflow-hidden rounded-[32px] border border-emerald-500/25 bg-white/90 p-8 shadow-[0_20px_50px_rgba(6,78,59,0.06)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_25px_60px_rgba(5,150,105,0.12)] dark:border-emerald-500/20 dark:bg-[#071810]/90 dark:shadow-[0_0_50px_rgba(0,0,0,0.4)] md:p-10">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-emerald-500/10 blur-[60px] transition-all duration-500 group-hover:bg-emerald-500/20" />
            
            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-950/20">
                <Compass className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#071A2F] dark:text-white md:text-3xl">
                {isArabic ? aboutValuesData.visionTitleAr : aboutValuesData.visionTitleEn}
              </h3>

              <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
                {isArabic ? aboutValuesData.visionDescAr : aboutValuesData.visionDescEn}
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative overflow-hidden rounded-[32px] border border-emerald-500/25 bg-white/90 p-8 shadow-[0_20px_50px_rgba(6,78,59,0.06)] backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_25px_60px_rgba(5,150,105,0.12)] dark:border-emerald-500/20 dark:bg-[#071810]/90 dark:shadow-[0_0_50px_rgba(0,0,0,0.4)] md:p-10">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-teal-500/10 blur-[60px] transition-all duration-500 group-hover:bg-teal-500/20" />
            
            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-emerald-950/20">
                <Target className="h-7 w-7" />
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#071A2F] dark:text-white md:text-3xl">
                {isArabic ? aboutValuesData.missionTitleAr : aboutValuesData.missionTitleEn}
              </h3>

              <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
                {isArabic ? aboutValuesData.missionDescAr : aboutValuesData.missionDescEn}
              </p>
            </div>
          </div>

        </div>

        {/* Core Values 3 Columns */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aboutValuesData.values.map((val) => (
            <div
              key={val.id}
              className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white/70 p-7 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-500/40 hover:shadow-xl dark:border-emerald-900/40 dark:bg-[#06120D] dark:hover:border-emerald-500/40"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-2xl text-emerald-700 dark:text-emerald-300">
                    {val.icon}
                  </span>
                  <span className="text-xs font-extrabold tracking-widest text-emerald-600/70 dark:text-emerald-500/70">
                    {val.number}
                  </span>
                </div>

                <h4 className="mt-6 text-xl font-bold text-[#071A2F] dark:text-white">
                  {isArabic ? val.titleAr : val.titleEn}
                </h4>

                <p className="mt-3 text-xs leading-7 text-slate-600 dark:text-slate-400 md:text-sm">
                  {isArabic ? val.descAr : val.descEn}
                </p>
              </div>

              {/* Bottom Line Glow */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 group-hover:w-full" />
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
    </section>
  );
}