
"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

export default function Hero() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate min-h-[750px] overflow-hidden bg-[#f8fcfb] text-[#102c2b] transition-colors duration-500 dark:bg-[#071716] dark:text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-300/25 blur-[140px] dark:bg-emerald-500/15" />

        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-300/25 blur-[140px] dark:bg-cyan-500/10" />

        <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.04] dark:opacity-[0.07]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      {/* Main Container */}
      <div className="mx-auto grid min-h-[750px] max-w-[1450px] items-center gap-16 px-6 py-24 md:px-12 lg:grid-cols-2 lg:gap-10 lg:px-16">

        {/* TEXT CONTENT */}
        <div className="relative z-10">

          {/* Intro Badge */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-emerald-500/20 bg-white/70 px-5 py-3 shadow-lg shadow-emerald-900/5 backdrop-blur-xl transition-colors dark:bg-white/[0.04]">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative h-3 w-3 rounded-full bg-emerald-500" />
            </span>

            <span className="text-xs font-bold tracking-[2px] text-emerald-700 dark:text-emerald-400">
              {isArabic
                ? "عالم جديد من الجمال والابتكار"
                : "A NEW WORLD OF BEAUTY & INNOVATION"}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-8 text-5xl font-black leading-[1.35] tracking-tight md:text-6xl lg:text-7xl">
            {isArabic ? (
              <>
                الجمال ليس مجرد
                <br />
                <span className="bg-gradient-to-l from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  مظهر... بل تجربة
                </span>
                <br />
                استثنائية.
              </>
            ) : (
              <>
                Beauty Is More
                <br />
                <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Than Appearance.
                </span>
                <br />
                It's An Experience.
              </>
            )}
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-xl text-base leading-9 text-gray-600 dark:text-gray-300 md:text-lg">
            {isArabic
              ? "اكتشفي مستقبل العناية والجمال مع ORVELIA، حيث تلتقي التكنولوجيا الحديثة والذكاء الاصطناعي مع أحدث ابتكارات عالم التجميل، لنصنع لك تجربة فريدة تعكس جمالك الحقيقي."
              : "Discover the future of beauty with ORVELIA, where advanced technology and artificial intelligence meet modern beauty innovation to create a unique experience that celebrates your individuality."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">

            <Link
              href={isArabic ? "/ar/beauty" : "/en/beauty"}
              className="group inline-flex items-center gap-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/35"
            >
              {isArabic ? "اكتشفي عالم الجمال" : "Discover Beauty"}

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>

            <Link
              href={isArabic ? "/ar/gate/ai-tech" : "/en/gate/ai-tech"}
              className="inline-flex items-center gap-3 rounded-full border border-gray-300 bg-white/70 px-8 py-4 font-bold text-gray-800 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:text-emerald-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-emerald-400 dark:hover:text-emerald-400"
            >
              {isArabic ? "اكتشفي التكنولوجيا" : "Explore Technology"}
              <span className="text-xl">✧</span>
            </Link>

          </div>

          {/* Features */}
          <div className="mt-16 grid max-w-xl grid-cols-3 gap-5 border-t border-gray-200 pt-8 dark:border-white/10">

            <div className="transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-3xl font-black text-emerald-500">
                AI
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 md:text-sm">
                {isArabic ? "ذكاء اصطناعي" : "Artificial Intelligence"}
              </p>
            </div>

            <div className="transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-3xl font-black text-teal-500">
                AR
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 md:text-sm">
                {isArabic ? "واقع معزز" : "Augmented Reality"}
              </p>
            </div>

            <div className="transition-transform duration-300 hover:-translate-y-1">
              <h3 className="text-3xl font-black text-cyan-500">
                360°
              </h3>
              <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 md:text-sm">
                {isArabic ? "تجربة متكاملة" : "Complete Experience"}
              </p>
            </div>

          </div>
        </div>

        {/* VISUAL SIDE */}
        <div className="relative mx-auto flex min-h-[570px] w-full max-w-[580px] items-center justify-center">

          {/* Outer Orbit */}
          <div className="absolute h-[min(88vw,540px)] w-[min(88vw,540px)] rounded-full border border-emerald-500/15" />

          {/* Inner Orbit */}
          <div className="absolute h-[min(72vw,430px)] w-[min(72vw,430px)] rounded-full border border-cyan-500/20" />

          {/* Rotating Orbit */}
          <div className="absolute h-[min(80vw,480px)] w-[min(80vw,480px)] animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-emerald-500/25">
            <span className="absolute -top-2 left-1/2 h-4 w-4 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60" />
            <span className="absolute bottom-12 right-8 h-3 w-3 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/60" />
          </div>

          {/* Glow Behind Product */}
          <div className="absolute h-72 w-72 rounded-full bg-emerald-400/20 blur-[100px] dark:bg-emerald-400/15" />

          {/* Main Product Card */}
          <div className="relative z-10 flex h-[480px] w-[min(310px,78vw)] flex-col items-center justify-center overflow-hidden rounded-[160px] border border-white/80 bg-gradient-to-br from-white/95 via-emerald-50/90 to-cyan-100/80 shadow-[0_30px_100px_rgba(16,185,129,0.18)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_110px_rgba(16,185,129,0.25)] dark:border-white/10 dark:from-[#15312d]/95 dark:via-[#102a29]/95 dark:to-[#0a2529]/95 dark:shadow-[0_30px_100px_rgba(0,0,0,0.45)] md:h-[530px] md:w-[350px]">

            {/* Card Light */}
            <div className="absolute -top-20 h-60 w-60 rounded-full bg-emerald-300/40 blur-[80px]" />

            <span className="relative mb-8 text-5xl text-emerald-500">
              ✧
            </span>

            {/* Bottle */}
            <div className="relative flex h-[220px] w-[105px] items-center justify-center rounded-[28px] border border-white/60 bg-gradient-to-r from-white/50 via-emerald-200/50 to-teal-400/40 shadow-[inset_0_0_25px_rgba(255,255,255,0.5),0_20px_40px_rgba(0,0,0,0.15)] backdrop-blur-xl">

              {/* Bottle Cap */}
              <div className="absolute -top-10 h-12 w-12 rounded-t-xl border border-white/30 bg-gradient-to-b from-gray-200 to-gray-500 shadow-lg" />

              {/* Bottle Shine */}
              <div className="absolute left-3 top-5 h-36 w-3 rounded-full bg-white/50 blur-[2px]" />

              <div className="relative text-center">
                <span className="block text-2xl font-black tracking-[4px] text-emerald-900 dark:text-white">
                  ORV
                </span>

                <span className="mt-2 block text-[8px] tracking-[3px] text-emerald-900/70 dark:text-white/70">
                  BEAUTY
                </span>
              </div>
            </div>

            <h2 className="mt-9 text-3xl font-black tracking-[5px] text-gray-800 dark:text-white">
              ORVELIA
            </h2>

            <p className="mt-3 text-[10px] font-bold tracking-[4px] text-emerald-600 dark:text-emerald-400">
              BEAUTY & TECHNOLOGY
            </p>

            <div className="mt-6 h-px w-20 bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />

            <p className="mt-4 text-xs tracking-widest text-gray-500 dark:text-gray-400">
              THE FUTURE IS BEAUTIFUL
            </p>
          </div>

          {/* Floating Card 1 */}
          <div className="absolute left-0 top-24 z-20 rounded-2xl border border-emerald-500/15 bg-white/90 p-5 shadow-xl shadow-emerald-900/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 dark:bg-[#17332e]/95 md:-left-5">
            <span className="text-2xl text-emerald-500">✧</span>

            <p className="mt-2 text-sm font-black">
              {isArabic ? "جمال ذكي" : "SMART BEAUTY"}
            </p>

            <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
              {isArabic ? "تقنيات المستقبل" : "Future Technology"}
            </p>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute bottom-24 right-0 z-20 rounded-2xl border border-cyan-500/15 bg-white/90 p-5 shadow-xl shadow-cyan-900/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 dark:bg-[#17332e]/95 md:-right-5">
            <span className="text-2xl text-cyan-500">◈</span>

            <p className="mt-2 text-sm font-black">
              {isArabic ? "تجربة استثنائية" : "UNIQUE EXPERIENCE"}
            </p>

            <p className="mt-1 text-[10px] text-gray-500 dark:text-gray-400">
              {isArabic ? "مصممة لأجلك" : "Designed For You"}
            </p>
          </div>

          {/* Decorative Elements */}
          <span className="absolute right-12 top-10 animate-pulse text-3xl text-emerald-400">
            ✧
          </span>

          <span className="absolute bottom-10 left-12 animate-pulse text-2xl text-cyan-400">
            ✦
          </span>

        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
    </section>
  );
}
