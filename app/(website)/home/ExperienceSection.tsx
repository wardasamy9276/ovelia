
"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

const features = [
  {
    number: "01",
    icon: "✧",
    titleAr: "تحليل البشرة الذكي",
    titleEn: "AI Skin Intelligence",
    descAr: "اكتشفي أسرار بشرتك من خلال تقنيات التحليل الذكية والحلول الشخصية.",
    descEn: "Discover your skin through intelligent analysis and personalized solutions.",
    href: "/ar/beauty",
  },
  {
    number: "02",
    icon: "◈",
    titleAr: "تجربة الجمال الافتراضي",
    titleEn: "Virtual Beauty Experience",
    descAr: "عيشي تجربة تفاعلية مبتكرة تجمع بين الواقع المعزز وعالم الجمال.",
    descEn: "Experience an innovative combination of augmented reality and beauty.",
    href: "/ar/gate/ai-tech",
  },
  {
    number: "03",
    icon: "❋",
    titleAr: "اكتشاف منتجاتك",
    titleEn: "Discover Your Products",
    descAr: "اكتشفي المنتجات المناسبة لاحتياجاتك وتفضيلاتك الشخصية.",
    descEn: "Find products that match your personal needs and preferences.",
    href: "/ar/beauty",
  },
];

export default function BeautyInnovationSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[150px] dark:bg-emerald-700/10" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-teal-300/20 blur-[150px] dark:bg-green-900/20" />

        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:35px_35px] opacity-[0.05] dark:opacity-[0.07]" />
      </div>

      <div className="mx-auto max-w-[1450px] px-6 md:px-12 lg:px-16">

        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center">

          <div className="mb-6 flex items-center gap-3 rounded-full border border-emerald-500/30 bg-white/80 px-5 py-3 shadow-lg dark:border-emerald-500/20 dark:bg-[#081A12]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />

            <span className="text-[11px] font-bold tracking-[3px] text-emerald-700 dark:text-emerald-400">
              ORVELIA INNOVATION
            </span>
          </div>

          <h2 className="max-w-4xl text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            {isArabic ? (
              <>
                الجمال يبدأ من
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-500 dark:to-teal-300">
                  تجربة استثنائية
                </span>
              </>
            ) : (
              <>
                Beauty Begins With
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-500 dark:to-teal-300">
                  An Extraordinary Experience
                </span>
              </>
            )}
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-9 text-slate-600 dark:text-slate-400 md:text-base">
            {isArabic
              ? "نقدم لك عالماً جديداً من الابتكار، حيث تلتقي تقنيات الذكاء الاصطناعي مع أحدث مفاهيم العناية والجمال."
              : "We bring you a new world of innovation where artificial intelligence meets the latest beauty and skincare concepts."}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid items-stretch gap-7 lg:grid-cols-12">

          {/* Main Feature */}
          <div className="group relative flex min-h-[490px] flex-col justify-between overflow-hidden rounded-[35px] border border-emerald-500/20 bg-gradient-to-br from-[#E4F2EA] via-[#F8FAF9] to-[#DCEDE5] p-8 shadow-[0_20px_60px_rgba(6,78,59,0.08)] transition-all duration-500 hover:border-emerald-500/50 dark:from-[#071F16] dark:via-[#06140E] dark:to-[#03110B] dark:shadow-[0_20px_70px_rgba(0,0,0,0.4)] lg:col-span-7 lg:p-12">

            {/* Decorative Circles */}
            <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-emerald-500/20 transition-transform duration-1000 group-hover:scale-125" />

            <div className="pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full border border-emerald-500/20" />

            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-[90px]" />

            {/* Top Content */}
            <div className="relative z-10">

              <div className="mb-10 flex items-center justify-between">

                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-[10px] font-bold tracking-[2px] text-emerald-700 dark:text-emerald-300">
                  FEATURED EXPERIENCE
                </span>

                <span className="text-sm font-bold tracking-widest text-emerald-700/70 dark:text-emerald-400/60">
                  01 / 03
                </span>

              </div>

              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[25px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/20 to-teal-500/5 text-5xl text-emerald-700 shadow-lg shadow-emerald-900/5 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 dark:text-emerald-300 dark:shadow-emerald-950/30">
                ✧
              </div>

              <h3 className="max-w-lg text-3xl font-black leading-tight md:text-4xl">
                {isArabic
                  ? "مستقبل الجمال بين يديك"
                  : "The Future Of Beauty In Your Hands"}
              </h3>

              <p className="mt-6 max-w-lg text-sm leading-9 text-slate-600 dark:text-slate-400 md:text-base">
                {isArabic
                  ? "اكتشفي تجربة الجمال الذكي مع ORVELIA، واستمتعي بحلول مبتكرة تعتمد على التكنولوجيا الحديثة لتقديم تجربة أكثر خصوصية وذكاءً."
                  : "Discover intelligent beauty with ORVELIA through innovative technology and personalized experiences."}
              </p>

            </div>

            {/* Bottom Content */}
            <div className="relative z-10 mt-12 flex flex-wrap items-center justify-between gap-5">

              <Link
                href={isArabic ? "/ar/gate/ai-tech" : "/en/gate/ai-tech"}
                className="inline-flex items-center gap-4 rounded-full bg-[#064E38] px-7 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-600 hover:shadow-emerald-500/20"
              >
                {isArabic ? "اكتشفي التجربة" : "Explore Experience"}

                <span className="text-lg">
                  {isArabic ? "←" : "→"}
                </span>
              </Link>

              <span className="text-xs font-bold tracking-[3px] text-emerald-700/70 dark:text-emerald-500/70">
                ORVELIA AI
              </span>

            </div>

          </div>

          {/* Side Features */}
          <div className="flex flex-col gap-5 lg:col-span-5">

            {features.map((feature, index) => (
              <Link
                key={feature.number}
                href={
                  isArabic
                    ? feature.href
                    : feature.href.replace("/ar/", "/en/")
                }
                className="group relative flex flex-1 flex-col justify-center overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white/90 p-7 shadow-[0_12px_35px_rgba(6,78,59,0.05)] transition-all duration-500 hover:-translate-x-1 hover:border-emerald-500/50 hover:shadow-[0_20px_45px_rgba(5,150,105,0.12)] dark:border-emerald-900/40 dark:bg-[#071810] dark:shadow-[0_15px_40px_rgba(0,0,0,0.3)] dark:hover:bg-[#0A2117]"
              >

                {/* Background Glow */}
                <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/0 blur-[65px] transition-all duration-500 group-hover:bg-emerald-500/15" />

                <div className="relative z-10 flex items-start justify-between">

                  <div className="flex items-start gap-5">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-50 text-2xl text-emerald-700 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 dark:bg-gradient-to-br dark:from-[#0B3524] dark:to-[#06140E] dark:text-emerald-300">
                      {feature.icon}
                    </div>

                    <div>

                      <span className="mb-3 block text-[10px] font-bold tracking-[3px] text-emerald-600/70 dark:text-emerald-500/70">
                        {feature.number}
                      </span>

                      <h3 className="text-lg font-black text-slate-900 transition-colors group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300">
                        {isArabic ? feature.titleAr : feature.titleEn}
                      </h3>

                      <p className="mt-3 text-xs leading-7 text-slate-600 dark:text-slate-400">
                        {isArabic ? feature.descAr : feature.descEn}
                      </p>

                    </div>

                  </div>

                  <span className="mt-2 shrink-0 text-xl text-emerald-600 transition-all duration-300 group-hover:translate-x-[-5px] group-hover:text-emerald-400">
                    {isArabic ? "←" : "→"}
                  </span>

                </div>

                {/* Bottom Progress */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700 group-hover:w-full" />

              </Link>
            ))}

          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 flex flex-col items-center justify-center gap-5 text-center">

          <div className="h-px w-28 bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

          <p className="text-sm font-bold tracking-wide text-emerald-800 dark:text-emerald-400">
            {isArabic
              ? "ORVELIA — نعيد تعريف عالم الجمال"
              : "ORVELIA — REDEFINING THE WORLD OF BEAUTY"}
          </p>

          <span className="text-[10px] tracking-[4px] text-slate-500 dark:text-slate-600">
            BEAUTY • TECHNOLOGY • INNOVATION
          </span>

        </div>

      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

    </section>
  );
}
