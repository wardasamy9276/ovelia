"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { Sparkles, ArrowLeft, ArrowRight, Cpu } from "lucide-react";
import { aboutHeroData } from "../about/data/AboutHeroSectioData";

export default function AboutHeroSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F1F4F2] pb-24 pt-28 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:pb-32 md:pt-36"
    >
      {/* Background Glow & Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[150px] dark:bg-emerald-600/15" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-teal-400/20 blur-[150px] dark:bg-teal-800/20" />
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.05] dark:opacity-[0.07]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Text Content Side */}
          <div className="lg:col-span-7">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-white/85 px-5 py-2.5 shadow-md backdrop-blur-md dark:border-emerald-500/25 dark:bg-[#081A12]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
              <span className="text-[11px] font-bold tracking-[2.5px] text-emerald-700 dark:text-emerald-400">
                {isArabic ? aboutHeroData.badgeAr : aboutHeroData.badgeEn}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-black leading-[1.25] tracking-tight sm:text-5xl lg:text-6xl">
              {isArabic ? aboutHeroData.titleTopAr : aboutHeroData.titleTopEn}
              <span className="mt-2 block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-500 dark:to-teal-300">
                {isArabic
                  ? aboutHeroData.titleHighlightAr
                  : aboutHeroData.titleHighlightEn}
              </span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-9 text-slate-600 dark:text-slate-300 md:text-lg">
              {isArabic
                ? aboutHeroData.descriptionAr
                : aboutHeroData.descriptionEn}
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={
                  isArabic
                    ? aboutHeroData.primaryHref
                    : aboutHeroData.primaryHref.replace("/ar/", "/en/")
                }
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(16,185,129,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(16,185,129,0.4)]"
              >
                <Sparkles className="h-4 w-4" />
                <span>
                  {isArabic
                    ? aboutHeroData.primaryBtnAr
                    : aboutHeroData.primaryBtnEn}
                </span>
                {isArabic ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </Link>

              <Link
                href={
                  isArabic
                    ? aboutHeroData.secondaryHref
                    : aboutHeroData.secondaryHref.replace("/ar/", "/en/")
                }
                className="inline-flex items-center justify-center rounded-full border border-emerald-600/30 bg-white/80 px-8 py-4 text-sm font-bold text-emerald-900 backdrop-blur-md transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 dark:border-emerald-400/25 dark:bg-[#071810]/80 dark:text-emerald-200 dark:hover:border-emerald-400/60 dark:hover:bg-[#0B2419]"
              >
                {isArabic
                  ? aboutHeroData.secondaryBtnAr
                  : aboutHeroData.secondaryBtnEn}
              </Link>
            </div>

            {/* Stats Row */}
            <div className="mt-14 grid grid-cols-3 gap-4 border-t border-emerald-900/10 pt-8 dark:border-emerald-500/15 sm:gap-8">
              {aboutHeroData.stats.map((stat) => (
                <div key={stat.id}>
                  <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 sm:text-3xl md:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 sm:text-sm">
                    {isArabic ? stat.labelAr : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Showcase Side (Video) */}
          <div className="relative lg:col-span-5">
            {/* Decorative Frame */}
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[480px] overflow-hidden rounded-[36px] border border-emerald-500/30 bg-white p-2.5 shadow-[0_25px_70px_rgba(6,78,59,0.12)] dark:border-emerald-400/25 dark:bg-[#071810] dark:shadow-[0_0_60px_rgba(16,185,129,0.12)]">
              <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                <video
                  src={"/assets/Video/eyeshadow_tech1122.mp4"}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030906]/80 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-emerald-500/10 mix-blend-color" />
              </div>

              {/* Floating Glass Card */}
              <div
                className={`absolute bottom-7 ${
                  isArabic
                    ? "left-6 right-6 sm:left-auto"
                    : "left-6 right-6 sm:right-auto"
                } rounded-2xl border border-emerald-400/30 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-emerald-400/25 dark:bg-[#06150E]/90 sm:max-w-[290px]`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#071A2F] dark:text-white">
                      {isArabic
                        ? aboutHeroData.floatingCardTitleAr
                        : aboutHeroData.floatingCardTitleEn}
                    </h3>
                    <p className="mt-0.5 text-xs leading-5 text-slate-600 dark:text-slate-300">
                      {isArabic
                        ? aboutHeroData.floatingCardDescAr
                        : aboutHeroData.floatingCardDescEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
    </section>
  );
}