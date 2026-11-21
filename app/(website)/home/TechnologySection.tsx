
// "use client";

// import { useState } from "react";
// import { useLanguage } from "@/app/context/LanguageContext";

// export default function TechnologySection() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";

//   const technologies = [
//     {
//       id: 0,
//       number: "01",
//       icon: "◈",
//       title: isArabic ? "الرؤية الذكية" : "Smart Vision",
//       subtitle: isArabic ? "فهم وتحليل الصورة" : "Image Recognition",
//       description: isArabic
//         ? "تقنيات ذكية لتحليل الصور والتعرف على التفاصيل بدقة، لتقديم تجربة رقمية أكثر تفاعلاً."
//         : "Smart image analysis and recognition technologies designed to create more interactive digital experiences.",
//       tag: isArabic ? "تحليل بصري" : "VISUAL ANALYSIS",
//       code: "VISION_ENGINE",
//     },
//     {
//       id: 1,
//       number: "02",
//       icon: "⌁",
//       title: isArabic ? "التتبع الذكي" : "Smart Tracking",
//       subtitle: isArabic ? "تفاعل في الوقت الحقيقي" : "Real-Time Interaction",
//       description: isArabic
//         ? "تتبع مواضع العناصر والحركة لدعم التجارب الافتراضية والتفاعل المباشر مع المنتجات."
//         : "Track positions and movement to support virtual experiences and real-time product interaction.",
//       tag: isArabic ? "تتبع مباشر" : "LIVE TRACKING",
//       code: "TRACKING_CORE",
//     },
//     {
//       id: 2,
//       number: "03",
//       icon: "✳",
//       title: isArabic ? "التجربة الافتراضية" : "Virtual Experience",
//       subtitle: isArabic ? "جرّب قبل الاختيار" : "Try Before You Choose",
//       description: isArabic
//         ? "استكشف المنتجات وجربها افتراضياً بطريقة تفاعلية تساعد العميل على اتخاذ قراره."
//         : "Explore and virtually try products through an interactive experience that supports customer decisions.",
//       tag: isArabic ? "تجربة تفاعلية" : "INTERACTIVE EXPERIENCE",
//       code: "VIRTUAL_TRYON",
//     },
//     {
//       id: 3,
//       number: "04",
//       icon: "⌘",
//       title: isArabic ? "الربط والتحليلات" : "Integration & Analytics",
//       subtitle: isArabic ? "منصة متصلة بمتجرك" : "Connected Commerce",
//       description: isArabic
//         ? "إمكانية دمج الحلول الرقمية مع المتاجر والمنصات ومتابعة البيانات من خلال أدوات التحليل."
//         : "Connect digital solutions with stores and platforms while accessing insights through analytics tools.",
//       tag: isArabic ? "تكامل رقمي" : "DIGITAL INTEGRATION",
//       code: "SMART_CONNECT",
//     },
//   ];

//   const [active, setActive] = useState(0);
//   const current = technologies[active];

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       lang={language}
//       className="relative overflow-hidden bg-bg px-5 py-24"
//     >
//       <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px]" />

//       <div className="relative mx-auto max-w-7xl">

//         {/* Heading */}
//         <div className="mb-16">
//           <div className="mb-5 flex items-center gap-3">
//             <span className="h-px w-10 bg-accent" />
//             <span className="text-xs font-bold tracking-[0.25em] text-accent">
//               {isArabic ? "التكنولوجيا والابتكار" : "TECHNOLOGY & INNOVATION"}
//             </span>
//           </div>

//           <h2 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
//             {isArabic ? (
//               <>
//                 التكنولوجيا ليست مجرد أداة،
//                 <span className="text-accent"> إنها تجربة جديدة.</span>
//               </>
//             ) : (
//               <>
//                 Technology Is More Than a Tool,
//                 <span className="text-accent"> It's a New Experience.</span>
//               </>
//             )}
//           </h2>

//           <p className="mt-6 max-w-2xl text-sm leading-8 text-muted">
//             {isArabic
//               ? "اكتشفي التقنيات التي تقف وراء حلول ORVELIA، وكيف تتحول التكنولوجيا إلى تجربة تفاعلية تربط العالم الرقمي بالواقع."
//               : "Explore the technologies behind ORVELIA and discover how digital innovation creates interactive experiences that connect the virtual and physical worlds."}
//           </p>
//         </div>

//         {/* Main Layout */}
//         <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

//           {/* Technology List */}
//           <div className="flex flex-col">
//             {technologies.map((item, index) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActive(index)}
//                 className={`group relative flex w-full items-center gap-5 border-b border-border py-7 text-start transition-all duration-300 ${
//                   active === index
//                     ? "opacity-100"
//                     : "opacity-50 hover:opacity-100"
//                 }`}
//               >
//                 <span
//                   className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border text-2xl transition-all duration-300 ${
//                     active === index
//                       ? "border-accent bg-accent text-accent-fg shadow-lg shadow-accent/10"
//                       : "border-border bg-surface text-accent"
//                   }`}
//                 >
//                   {item.icon}
//                 </span>

//                 <span className="min-w-0 flex-1">
//                   <span className="mb-1 block text-[10px] font-bold tracking-widest text-accent">
//                     {item.number}
//                   </span>

//                   <span className="block text-lg font-bold text-foreground">
//                     {item.title}
//                   </span>

//                   <span className="mt-1 block text-xs text-muted">
//                     {item.subtitle}
//                   </span>
//                 </span>

//                 <span
//                   className={`text-xl text-accent transition-transform duration-300 ${
//                     active === index
//                       ? isArabic
//                         ? "-translate-x-1"
//                         : "translate-x-1"
//                       : ""
//                   }`}
//                 >
//                   {isArabic ? "←" : "→"}
//                 </span>

//                 {active === index && (
//                   <span className="absolute bottom-0 start-0 h-[2px] w-full origin-start bg-accent" />
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Interactive Technology Screen */}
//           <div className="relative min-h-[490px] overflow-hidden rounded-[28px] border border-border bg-surface p-5 sm:p-8">

//             {/* Screen Header */}
//             <div className="flex items-center justify-between border-b border-border pb-5">
//               <div className="flex items-center gap-2">
//                 <span className="size-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
//                 <span className="text-[10px] font-bold tracking-[0.2em] text-muted">
//                   ORVELIA / SYSTEM
//                 </span>
//               </div>

//               <span className="rounded-full border border-accent/30 px-3 py-1 text-[9px] font-semibold text-accent">
//                 {isArabic ? "وضع المحاكاة" : "SIMULATION MODE"}
//               </span>
//             </div>

//             {/* Animated Visual */}
//             <div className="relative my-7 flex h-[210px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg">

//               <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(var(--accent)_1px,transparent_1px),linear-gradient(90deg,var(--accent)_1px,transparent_1px)] [background-size:28px_28px]" />

//               <div className="absolute size-48 rounded-full border border-accent/20" />
//               <div className="absolute size-36 rounded-full border border-accent/30" />
//               <div className="absolute size-24 rounded-full border border-accent/40" />

//               <div className="absolute h-full w-full animate-[tech-scan_4s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-accent/10 to-transparent" />

//               <div className="relative z-10 flex size-24 items-center justify-center rounded-[28px] border border-accent/40 bg-accent/10 text-5xl text-accent shadow-[0_0_50px_color-mix(in_srgb,var(--accent)_15%,transparent)] transition-all duration-500">
//                 {current.icon}
//               </div>

//               <span className="absolute left-4 top-4 text-[9px] text-accent/70">
//                 X: 024.08
//               </span>

//               <span className="absolute bottom-4 right-4 text-[9px] text-accent/70">
//                 {current.code}
//               </span>

//               <span className="absolute right-4 top-4 size-2 rounded-full bg-accent animate-pulse" />
//               <span className="absolute bottom-4 left-4 text-[9px] text-muted">
//                 ORVELIA ENGINE
//               </span>
//             </div>

//             {/* Dynamic Information */}
//             <div key={current.id} className="animate-[tech-enter_450ms_ease]">
//               <span className="text-[10px] font-bold tracking-[0.2em] text-accent">
//                 {current.tag}
//               </span>

//               <h3 className="mt-3 text-2xl font-bold text-foreground">
//                 {current.title}
//               </h3>

//               <p className="mt-3 max-w-xl text-sm leading-8 text-muted">
//                 {current.description}
//               </p>
//             </div>

//             {/* Bottom Navigation */}
//             <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
//               <span className="text-[10px] text-muted">
//                 {isArabic ? "استكشف التقنيات" : "EXPLORE TECHNOLOGY"}
//               </span>

//               <div className="flex items-center gap-2">
//                 {technologies.map((item, index) => (
//                   <button
//                     key={item.id}
//                     onClick={() => setActive(index)}
//                     aria-label={`Technology ${index + 1}`}
//                     className={`h-1.5 rounded-full transition-all duration-300 ${
//                       active === index
//                         ? "w-9 bg-accent"
//                         : "w-3 bg-border hover:bg-accent/50"
//                     }`}
//                   />
//                 ))}
//               </div>

//               <span className="text-xs font-bold text-accent">
//                 0{active + 1} / 04
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes tech-scan {
//           0%, 100% {
//             transform: translateY(-100%);
//           }
//           50% {
//             transform: translateY(100%);
//           }
//         }

//         @keyframes tech-enter {
//           from {
//             opacity: 0;
//             transform: translateY(10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .animate-pulse {
//             animation: none;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { technologies } from "../home/data/TechnologySectioData"; // تأكد من مطابقة مسار الاستيراد لمكان ملف البيانات لديك

export default function TechnologySection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [active, setActive] = useState(0);
  const current = technologies[active];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative overflow-hidden bg-bg px-5 py-24"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="text-xs font-bold tracking-[0.25em] text-accent">
              {isArabic ? "التكنولوجيا والابتكار" : "TECHNOLOGY & INNOVATION"}
            </span>
          </div>

          <h2 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
            {isArabic ? (
              <>
                التكنولوجيا ليست مجرد أداة،
                <span className="text-accent"> إنها تجربة جديدة.</span>
              </>
            ) : (
              <>
                Technology Is More Than a Tool,
                <span className="text-accent"> It's a New Experience.</span>
              </>
            )}
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-8 text-muted">
            {isArabic
              ? "اكتشفي التقنيات التي تقف وراء حلول ORVELIA، وكيف تتحول التكنولوجيا إلى تجربة تفاعلية تربط العالم الرقمي بالواقع."
              : "Explore the technologies behind ORVELIA and discover how digital innovation creates interactive experiences that connect the virtual and physical worlds."}
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">

          {/* Technology List */}
          <div className="flex flex-col">
            {technologies.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                className={`group relative flex w-full items-center gap-5 border-b border-border py-7 text-start transition-all duration-300 ${
                  active === index
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <span
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl border text-2xl transition-all duration-300 ${
                    active === index
                      ? "border-accent bg-accent text-accent-fg shadow-lg shadow-accent/10"
                      : "border-border bg-surface text-accent"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="mb-1 block text-[10px] font-bold tracking-widest text-accent">
                    {item.number}
                  </span>

                  <span className="block text-lg font-bold text-foreground">
                    {isArabic ? item.titleAr : item.titleEn}
                  </span>

                  <span className="mt-1 block text-xs text-muted">
                    {isArabic ? item.subtitleAr : item.subtitleEn}
                  </span>
                </span>

                <span
                  className={`text-xl text-accent transition-transform duration-300 ${
                    active === index
                      ? isArabic
                        ? "-translate-x-1"
                        : "translate-x-1"
                      : ""
                  }`}
                >
                  {isArabic ? "←" : "→"}
                </span>

                {active === index && (
                  <span className="absolute bottom-0 start-0 h-[2px] w-full origin-start bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Interactive Technology Screen */}
          <div className="relative min-h-[490px] overflow-hidden rounded-[28px] border border-border bg-surface p-5 sm:p-8">

            {/* Screen Header */}
            <div className="flex items-center justify-between border-b border-border pb-5">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                <span className="text-[10px] font-bold tracking-[0.2em] text-muted">
                  ORVELIA / SYSTEM
                </span>
              </div>

              <span className="rounded-full border border-accent/30 px-3 py-1 text-[9px] font-semibold text-accent">
                {isArabic ? "وضع المحاكاة" : "SIMULATION MODE"}
              </span>
            </div>

            {/* Animated Visual */}
            <div className="relative my-7 flex h-[210px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-bg">

              <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(var(--accent)_1px,transparent_1px),linear-gradient(90deg,var(--accent)_1px,transparent_1px)] [background-size:28px_28px]" />

              <div className="absolute size-48 rounded-full border border-accent/20" />
              <div className="absolute size-36 rounded-full border border-accent/30" />
              <div className="absolute size-24 rounded-full border border-accent/40" />

              <div className="absolute h-full w-full animate-[tech-scan_4s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-accent/10 to-transparent" />

              <div className="relative z-10 flex size-24 items-center justify-center rounded-[28px] border border-accent/40 bg-accent/10 text-5xl text-accent shadow-[0_0_50px_color-mix(in_srgb,var(--accent)_15%,transparent)] transition-all duration-500">
                {current.icon}
              </div>

              <span className="absolute left-4 top-4 text-[9px] text-accent/70">
                X: 024.08
              </span>

              <span className="absolute bottom-4 right-4 text-[9px] text-accent/70">
                {current.code}
              </span>

              <span className="absolute right-4 top-4 size-2 rounded-full bg-accent animate-pulse" />
              <span className="absolute bottom-4 left-4 text-[9px] text-muted">
                ORVELIA ENGINE
              </span>
            </div>

            {/* Dynamic Information */}
            <div key={current.id} className="animate-[tech-enter_450ms_ease]">
              <span className="text-[10px] font-bold tracking-[0.2em] text-accent">
                {isArabic ? current.tagAr : current.tagEn}
              </span>

              <h3 className="mt-3 text-2xl font-bold text-foreground">
                {isArabic ? current.titleAr : current.titleEn}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-8 text-muted">
                {isArabic ? current.descriptionAr : current.descriptionEn}
              </p>
            </div>

            {/* Bottom Navigation */}
            <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
              <span className="text-[10px] text-muted">
                {isArabic ? "استكشف التقنيات" : "EXPLORE TECHNOLOGY"}
              </span>

              <div className="flex items-center gap-2">
                {technologies.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActive(index)}
                    aria-label={`Technology ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      active === index
                        ? "w-9 bg-accent"
                        : "w-3 bg-border hover:bg-accent/50"
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-bold text-accent">
                0{active + 1} / 04
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes tech-scan {
          0%, 100% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
        }

        @keyframes tech-enter {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}