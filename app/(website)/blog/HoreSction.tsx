"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, Play } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function BlogHeroSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate min-h-[640px] overflow-hidden bg-[#F1F4F2] text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white lg:min-h-[700px]"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/assets/video1/face-blusher.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Video Overlay */}
      <div className="absolute inset-0 -z-10 bg-[#F1F4F2]/25 dark:bg-[#030906]/85" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F1F4F2]/95 via-[#F1F4F2]/60 to-transparent dark:from-[#030906] dark:via-[#030906]/80 dark:to-transparent rtl:bg-gradient-to-l" />

      {/* Bottom fade: يدمج السكشن مع لون الفوتر */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#F1F4F2] to-transparent dark:from-[#030906]" />

      {/* Green Glow */}
      <div className="absolute -right-32 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-[120px] dark:bg-emerald-600/20" />

      <div className="mx-auto flex min-h-[640px] max-w-7xl items-center px-5 pb-20 pt-28 sm:px-8 lg:min-h-[700px] lg:px-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-white/70 px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm backdrop-blur-md dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Sparkles size={17} />
            {isArabic ? "مدونة أورفيليا" : "ORVELIA BLOG"}
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black leading-[1.4] tracking-tight sm:text-5xl lg:text-7xl">
            {isArabic ? (
              <>
                اكتشفي عالم
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  الجمال والأناقة
                </span>
                بأسلوبك الخاص
              </>
            ) : (
              <>
                Discover the World of
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  Beauty & Elegance
                </span>
                Your Own Way
              </>
            )}
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-9 text-slate-600 dark:text-slate-300 sm:text-lg">
            {isArabic
              ? "مساحتك لاكتشاف أسرار الجمال وأحدث اتجاهات العناية بالبشرة والمكياج والإكسسوارات. إلهام وأفكار ونصائح تساعدك على إبراز جمالك."
              : "Your destination for discovering beauty secrets, the latest skincare trends, makeup inspiration, and accessories. Ideas and tips to express your unique beauty."}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-700/20 transition duration-300 hover:-translate-y-1 hover:shadow-emerald-600/30"
            >
              {isArabic ? "اكتشفي المدونة" : "Explore Blog"}

              {isArabic ? (
                <ArrowLeft
                  size={19}
                  className="transition-transform group-hover:-translate-x-1"
                />
              ) : (
                <ArrowRight
                  size={19}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </Link>

            <a
              href="#latest-articles"
              className="inline-flex items-center gap-3 rounded-full border border-emerald-700/30 bg-white/60 px-8 py-4 font-bold text-emerald-800 backdrop-blur-md transition hover:bg-emerald-50 dark:border-emerald-400/30 dark:bg-white/5 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
            >
              <Play size={17} />
              {isArabic ? "أحدث المقالات" : "Latest Articles"}
            </a>
          </div>

          {/* Bottom Text */}
          <div className="mt-14 flex items-center gap-3 text-sm font-medium text-slate-500 dark:text-slate-400">
            <span className="h-px w-12 bg-emerald-500" />
            {isArabic
              ? "الجمال رحلة تبدأ بالمعرفة"
              : "Beauty Is a Journey That Begins With Knowledge"}
          </div>
        </div>
      </div>
    </section>
  );
}