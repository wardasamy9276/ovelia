// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { useLanguage } from "@/app/context/LanguageContext";

// interface FeatureItem {
//   id: string;
//   title: { ar: string; en: string };
//   subtitle: { ar: string; en: string };
//   description: { ar: string; en: string };
//   features: { ar: string; en: string }[];
//   exploreLink: string;
//   howItWorksLink: string;
//   modelVideo: string;
// }

// export default function NeckAccessoriesShowcase() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";
//   const lang = isArabic ? "ar" : "en";

//   const [activeIndex, setActiveIndex] = useState(0);

//   const slides: FeatureItem[] = [
//     {
//       id: "chokers",
//       title: {
//         ar: "تجربة أطواق الرقبة الافتراضية",
//         en: "Virtual Chokers Try-On",
//       },
//       subtitle: {
//         ar: "ملاءمة طبيعية تتكيف معك",
//         en: "Natural fit that adapts to you",
//       },
//       description: {
//         ar: "تمنح هذه التجربة للمستخدم القدرة على تجربة أطواق الرقبة (التشوكر) المختلفة مع توافق تام مع شكل العنق وتناسق مع تسريحة الشعر والملابس.",
//         en: "Gives users the ability to try on various chokers with seamless neck adaptation and harmony with hairstyles and outfits.",
//       },
//       features: [
//         { ar: "محاكاة واقعية لإحساس أطواق الرقبة", en: "Realistic simulation of choker fit" },
//         { ar: "أداء سريع دون تأخير", en: "Fast, zero-latency performance" },
//         { ar: "دعم جميع أشكال وأحجام الرقبة", en: "Supports all neck shapes and sizes" },
//       ],
//       exploreLink: "/tech/chokers",
//       howItWorksLink: "#how-it-works-chokers",
//       modelVideo: "/assets/img4/scarves-vto.mp4",
//     },
//     {
//       id: "necklaces",
//       title: {
//         ar: "تجربة العقود الافتراضية",
//         en: "Virtual Necklaces Try-On",
//       },
//       subtitle: {
//         ar: "تتبع دقيق لحركة الجسم والرقبة",
//         en: "Precise neck and body motion tracking",
//       },
//       description: {
//         ar: "استعرضي العقود الطويلة والقصيرة بدقة متناهية مع محاكاة واقعية للجاذبية وانعكاس الإضاءة على المعادن والأحجار الكريمة.",
//         en: "Preview short and long necklaces with pinpoint accuracy, realistic gravity physics, and true-to-life metallic reflections.",
//       },
//       features: [
//         { ar: "فيزياء حركة طبيعية مع الالتفات", en: "Natural physics motion when turning" },
//         { ar: "انعكاسات ضوئية واقعية للمجوهرات", en: "Realistic light reflections on gems" },
//         { ar: "مقارنة فورية بين أطوال السلاسل", en: "Instant comparison of chain lengths" },
//       ],
//       exploreLink: "/tech/necklaces",
//       howItWorksLink: "#how-it-works-necklaces",
//       modelVideo: "/assets/img4/neck-chokers4.mp4",
//     },
//     {
//       id: "scarves",
//       title: {
//         ar: "تجربة الأوشحة الافتراضية",
//         en: "Virtual Scarves Try-On",
//       },
//       subtitle: {
//         ar: "محاكاة نسيج وانسيابية فائقة",
//         en: "Ultra-realistic fabric & drape simulation",
//       },
//       description: {
//         ar: "جرّبي مختلف لفّات الأوشحة وخامات الحرير والقطن بواقعية مذهلة تظهر تفاصيل النسيج وتناسق الألوان مع إطلالتك.",
//         en: "Try various scarf wraps and silk or cotton textures with stunning realism showcasing fabric details and color harmony.",
//       },
//       features: [
//         { ar: "محاكاة ملمس الأقمشة والطيّات", en: "Fabric texture and fold simulation" },
//         { ar: "تبديل فوري للألوان والنقوش", en: "Instant color and pattern switching" },
//         { ar: "تكيف ذكي مع الأكتاف والرقبة", en: "Smart adaptation to shoulders and neck" },
//       ],
//       exploreLink: "/tech/scarves",
//       howItWorksLink: "#how-it-works-scarves",
//       modelVideo: "/assets/img4/necklace-vto_1_1.mp4",
//     },
//     {
//       id: "pendants",
//       title: {
//         ar: "تجربة القلائد والمعلقات الافتراضية",
//         en: "Virtual Pendants Try-On",
//       },
//       subtitle: {
//         ar: "تفاصيل دقيقة تبرز أناقتك",
//         en: "Fine details highlighting your elegance",
//       },
//       description: {
//         ar: "معاينة تفاعلية للقلائد الفاخرة بتقنية ثلاثية الأبعاد تتيح رؤية أدق النقوش واللمعان من مختلف الزوايا.",
//         en: "Interactive 3D preview of luxury pendants allowing you to see the finest engravings and shine from every angle.",
//       },
//       features: [
//         { ar: "عرض ثلاثي الأبعاد عالي الدقة", en: "High-definition 3D rendering" },
//         { ar: "تتبع مستقر في الإضاءات المختلفة", en: "Stable tracking across lighting conditions" },
//         { ar: "إمكانية تنسيق أكثر من قطعة معاً", en: "Layering multiple pieces together" },
//       ],
//       exploreLink: "/tech/pendants",
//       howItWorksLink: "#how-it-works-pendants",
//       modelVideo: "/assets/img4/neck-chokers1.mp4",
//     },
//   ];

//   const total = slides.length;
//   const prevIndex = (activeIndex - 1 + total) % total;
//   const nextIndex = (activeIndex + 1) % total;

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       lang={language}
//       className="relative isolate min-h-screen w-full overflow-hidden bg-[#060B14] pt-28 pb-16 text-white selection:bg-emerald-400 selection:text-slate-950"
//     >
//       {/* شبكة خلفية تقنية خفيفة وإضاءة محيطية */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.15] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
//       />
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -top-24 start-1/2 h-[380px] w-[650px] -translate-x-1/2 rounded-full bg-teal-500/10 blur-[130px]"
//       />

//       <div className="mx-auto max-w-7xl px-5 md:px-10">
//         {/* 1. عنوان القسم والوصف العلوي */}
//         <div className="mx-auto max-w-3xl text-center">
//           <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
//             {isArabic
//               ? "لمسات نهائية أنيقة بأسلوب ذكي"
//               : "Elegant Finishing Touches in a Smart Way"}
//           </h1>
//           <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
//             {isArabic
//               ? "كل ما يحتاجه عملاؤك لاستعراض إكسسوارات الرقبة بدقة وواقعية في منصة رقمية سلسة"
//               : "Everything your customers need to preview neck accessories accurately and realistically on a seamless digital platform"}
//           </p>
//         </div>

//         {/* 2. منطقة المحتوى الرئيسية: الكاروسيل 3D + عرض الفيديو */}
//         <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
//           {/* الجانب الأول: كاروسيل البطاقات ثلاثي الأبعاد */}
//           <div className="flex flex-col items-center">
//             <div className="relative flex h-[470px] w-full max-w-[660px] items-center justify-center [perspective:1200px]">
//               {slides.map((slide, index) => {
//                 const isCenter = index === activeIndex;
//                 const isPrev = index === prevIndex;
//                 const isNext = index === nextIndex;

//                 if (!isCenter && !isPrev && !isNext) return null;

//                 let transformClasses = "";
//                 if (isCenter) {
//                   transformClasses =
//                     "z-30 translate-x-0 scale-100 opacity-100 [transform:rotateY(0deg)]";
//                 } else if (isPrev) {
//                   transformClasses = isArabic
//                     ? "z-10 translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(-24deg)]"
//                     : "z-10 -translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(24deg)]";
//                 } else if (isNext) {
//                   transformClasses = isArabic
//                     ? "z-10 -translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(24deg)]"
//                     : "z-10 translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(-24deg)]";
//                 }

//                 return (
//                   <div
//                     key={slide.id}
//                     onClick={() => !isCenter && setActiveIndex(index)}
//                     className={`absolute w-[290px] sm:w-[330px] rounded-2xl border p-6 sm:p-7 transition-all duration-500 ease-out backdrop-blur-xl ${
//                       isCenter
//                         ? "border-slate-600/80 bg-[#0D1522]/95 shadow-[0_20px_60px_-15px_rgba(20,184,166,0.22)]"
//                         : "border-slate-800/80 bg-[#090F1A]/80"
//                     } ${transformClasses}`}
//                   >
//                     {isCenter && (
//                       <span
//                         aria-hidden
//                         className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-400/80 to-transparent"
//                       />
//                     )}

//                     <div className="text-center">
//                       <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">
//                         {slide.title[lang]}
//                       </h2>
//                       <p className="mt-1.5 text-xs font-medium text-teal-400">
//                         {slide.subtitle[lang]}
//                       </p>
//                       <p className="mt-3 text-xs leading-6 text-slate-300/90">
//                         {slide.description[lang]}
//                       </p>
//                     </div>

//                     <div className="mt-5 border-t border-slate-800/80 pt-4 text-center">
//                       <h3 className="text-xs font-bold text-white sm:text-sm">
//                         {isArabic ? "المميزات الأساسية" : "Key Features"}
//                       </h3>
//                       <ul className="mt-3 space-y-2 text-center text-[11px] text-slate-300 sm:text-xs">
//                         {slide.features.map((feat, i) => (
//                           <li key={i} className="leading-5">
//                             {feat[lang]}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div className="mt-6 space-y-2.5">
//                       <Link
//                         href={slide.exploreLink}
//                         onClick={(e) => !isCenter && e.preventDefault()}
//                         className="block w-full rounded-lg border border-slate-700/90 bg-[#111B2B] py-2.5 text-center text-xs font-semibold text-white transition-all hover:border-teal-400/60 hover:bg-[#162338]"
//                       >
//                         {isArabic ? "اكتشف التقنية" : "Explore Technology"}
//                       </Link>
//                       <Link
//                         href={slide.howItWorksLink}
//                         onClick={(e) => !isCenter && e.preventDefault()}
//                         className="block w-full rounded-lg border border-slate-800 bg-transparent py-2.5 text-center text-xs font-medium text-slate-300 transition-all hover:border-slate-600 hover:text-white"
//                       >
//                         {isArabic ? "كيف تعمل" : "How It Works"}
//                       </Link>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* نقاط التنقل السفلية */}
//             <div className="mt-4 flex items-center justify-center gap-2.5">
//               {slides.map((slide, idx) => (
//                 <button
//                   key={slide.id}
//                   onClick={() => setActiveIndex(idx)}
//                   aria-label={`Slide ${idx + 1}`}
//                   className={`h-2.5 rounded-full transition-all duration-300 ${
//                     activeIndex === idx
//                       ? "w-6 bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.7)]"
//                       : "w-2.5 bg-slate-600 hover:bg-slate-400"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* الجانب الثاني: عرض الفيديو المتغير بتأثير الدمج في الخلفية */}
//           <div className="relative mx-auto flex w-full max-w-[440px] items-end justify-center">
//             <div
//               aria-hidden
//               className="pointer-events-none absolute bottom-10 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl"
//             />

//             <div className="relative h-[430px] w-full sm:h-[500px] overflow-hidden">
//               <video
//                 key={slides[activeIndex].modelVideo}
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 className="h-full w-full object-contain object-bottom transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
//               >
//                 <source src={slides[activeIndex].modelVideo} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

interface FeatureItem {
  id: string;
  title: { ar: string; en: string };
  subtitle: { ar: string; en: string };
  description: { ar: string; en: string };
  features: { ar: string; en: string }[];
  exploreLink: string;
  howItWorksLink: string;
  modelVideo: string;
}

export default function NeckAccessoriesShowcase() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";

  const [activeIndex, setActiveIndex] = useState(0);

  const slides: FeatureItem[] = [
    {
      id: "chokers",
      title: {
        ar: "تجربة أطواق الرقبة الافتراضية",
        en: "Virtual Chokers Try-On",
      },
      subtitle: {
        ar: "ملاءمة طبيعية تتكيف معك",
        en: "Natural fit that adapts to you",
      },
      description: {
        ar: "تمنح هذه التجربة للمستخدم القدرة على تجربة أطواق الرقبة (التشوكر) المختلفة مع توافق تام مع شكل العنق وتناسق مع تسريحة الشعر والملابس.",
        en: "Gives users the ability to try on various chokers with seamless neck adaptation and harmony with hairstyles and outfits.",
      },
      features: [
        { ar: "محاكاة واقعية لإحساس أطواق الرقبة", en: "Realistic simulation of choker fit" },
        { ar: "أداء سريع دون تأخير", en: "Fast, zero-latency performance" },
        { ar: "دعم جميع أشكال وأحجام الرقبة", en: "Supports all neck shapes and sizes" },
      ],
      exploreLink: "/tech/chokers",
      howItWorksLink: "#how-it-works-chokers",
      modelVideo: "/assets/img4/scarves-vto.mp4",
    },
    {
      id: "necklaces",
      title: {
        ar: "تجربة العقود الافتراضية",
        en: "Virtual Necklaces Try-On",
      },
      subtitle: {
        ar: "تتبع دقيق لحركة الجسم والرقبة",
        en: "Precise neck and body motion tracking",
      },
      description: {
        ar: "استعرضي العقود الطويلة والقصيرة بدقة متناهية مع محاكاة واقعية للجاذبية وانعكاس الإضاءة على المعادن والأحجار الكريمة.",
        en: "Preview short and long necklaces with pinpoint accuracy, realistic gravity physics, and true-to-life metallic reflections.",
      },
      features: [
        { ar: "فيزياء حركة طبيعية مع الالتفات", en: "Natural physics motion when turning" },
        { ar: "انعكاسات ضوئية واقعية للمجوهرات", en: "Realistic light reflections on gems" },
        { ar: "مقارنة فورية بين أطوال السلاسل", en: "Instant comparison of chain lengths" },
      ],
      exploreLink: "/tech/necklaces",
      howItWorksLink: "#how-it-works-necklaces",
      modelVideo: "/assets/img4/neck-chokers4.mp4",
    },
    {
      id: "scarves",
      title: {
        ar: "تجربة الأوشحة الافتراضية",
        en: "Virtual Scarves Try-On",
      },
      subtitle: {
        ar: "محاكاة نسيج وانسيابية فائقة",
        en: "Ultra-realistic fabric & drape simulation",
      },
      description: {
        ar: "جرّبي مختلف لفّات الأوشحة وخامات الحرير والقطن بواقعية مذهلة تظهر تفاصيل النسيج وتناسق الألوان مع إطلالتك.",
        en: "Try various scarf wraps and silk or cotton textures with stunning realism showcasing fabric details and color harmony.",
      },
      features: [
        { ar: "محاكاة ملمس الأقمشة والطيّات", en: "Fabric texture and fold simulation" },
        { ar: "تبديل فوري للألوان والنقوش", en: "Instant color and pattern switching" },
        { ar: "تكيف ذكي مع الأكتاف والرقبة", en: "Smart adaptation to shoulders and neck" },
      ],
      exploreLink: "/tech/scarves",
      howItWorksLink: "#how-it-works-scarves",
      modelVideo: "/assets/img4/necklace-vto_1_1.mp4",
    },
    {
      id: "pendants",
      title: {
        ar: "تجربة القلائد والمعلقات الافتراضية",
        en: "Virtual Pendants Try-On",
      },
      subtitle: {
        ar: "تفاصيل دقيقة تبرز أناقتك",
        en: "Fine details highlighting your elegance",
      },
      description: {
        ar: "معاينة تفاعلية للقلائد الفاخرة بتقنية ثلاثية الأبعاد تتيح رؤية أدق النقوش واللمعان من مختلف الزوايا.",
        en: "Interactive 3D preview of luxury pendants allowing you to see the finest engravings and shine from every angle.",
      },
      features: [
        { ar: "عرض ثلاثي الأبعاد عالي الدقة", en: "High-definition 3D rendering" },
        { ar: "تتبع مستقر في الإضاءات المختلفة", en: "Stable tracking across lighting conditions" },
        { ar: "إمكانية تنسيق أكثر من قطعة معاً", en: "Layering multiple pieces together" },
      ],
      exploreLink: "/tech/pendants",
      howItWorksLink: "#how-it-works-pendants",
      modelVideo: "/assets/img4/neck-chokers1.mp4",
    },
  ];

  const total = slides.length;
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate min-h-screen w-full overflow-hidden bg-[#F1F4F2] pt-28 pb-16 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white selection:bg-emerald-400 selection:text-slate-950"
    >
      {/* Background Glow & Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#059669_1px,transparent_1px),linear-gradient(to_bottom,#059669_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.035] dark:opacity-[0.06]" />

        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[150px] dark:bg-emerald-600/15" />

        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-teal-400/20 blur-[150px] dark:bg-teal-800/20" />

        <div className="absolute left-1/2 top-0 h-[380px] w-[650px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[130px] dark:bg-teal-500/10" />
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#071A2F] dark:text-white sm:text-4xl md:text-5xl">
            {isArabic
              ? "لمسات نهائية أنيقة بأسلوب ذكي"
              : "Elegant Finishing Touches in a Smart Way"}
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
            {isArabic
              ? "كل ما يحتاجه عملاؤك لاستعراض إكسسوارات الرقبة بدقة وواقعية في منصة رقمية سلسة"
              : "Everything your customers need to preview neck accessories accurately and realistically on a seamless digital platform"}
          </p>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">

          {/* Carousel */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-[470px] w-full max-w-[660px] items-center justify-center [perspective:1200px]">

              {slides.map((slide, index) => {
                const isCenter = index === activeIndex;
                const isPrev = index === prevIndex;
                const isNext = index === nextIndex;

                if (!isCenter && !isPrev && !isNext) return null;

                let transformClasses = "";

                if (isCenter) {
                  transformClasses =
                    "z-30 translate-x-0 scale-100 opacity-100 [transform:rotateY(0deg)]";
                } else if (isPrev) {
                  transformClasses = isArabic
                    ? "z-10 translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(-24deg)]"
                    : "z-10 -translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(24deg)]";
                } else if (isNext) {
                  transformClasses = isArabic
                    ? "z-10 -translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(24deg)]"
                    : "z-10 translate-x-[58%] scale-[0.84] opacity-45 hover:opacity-75 cursor-pointer [transform:rotateY(-24deg)]";
                }

                return (
                  <div
                    key={slide.id}
                    onClick={() => !isCenter && setActiveIndex(index)}
                    className={`absolute w-[290px] rounded-2xl border p-6 backdrop-blur-xl transition-all duration-500 ease-out sm:w-[330px] sm:p-7 ${
                      isCenter
                        ? "border-emerald-500/40 bg-white/95 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.20)] dark:border-emerald-400/40 dark:bg-[#081A12]/95 dark:shadow-[0_20px_60px_-15px_rgba(20,184,166,0.22)]"
                        : "border-emerald-900/10 bg-white/75 dark:border-emerald-800/40 dark:bg-[#06150E]/80"
                    } ${transformClasses}`}
                  >
                    {isCenter && (
                      <span
                        aria-hidden
                        className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent"
                      />
                    )}

                    <div className="text-center">
                      <h2 className="text-lg font-bold leading-snug text-[#071A2F] dark:text-white sm:text-xl">
                        {slide.title[lang]}
                      </h2>

                      <p className="mt-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                        {slide.subtitle[lang]}
                      </p>

                      <p className="mt-3 text-xs leading-6 text-slate-600 dark:text-slate-300">
                        {slide.description[lang]}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-emerald-900/10 pt-4 text-center dark:border-white/10">
                      <h3 className="text-xs font-bold text-[#071A2F] dark:text-white sm:text-sm">
                        {isArabic ? "المميزات الأساسية" : "Key Features"}
                      </h3>

                      <ul className="mt-3 space-y-2 text-center text-[11px] text-slate-600 dark:text-slate-300 sm:text-xs">
                        {slide.features.map((feat, i) => (
                          <li key={i} className="leading-5">
                            {feat[lang]}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 space-y-2.5">
                      <Link
                        href={slide.exploreLink}
                        onClick={(e) => !isCenter && e.preventDefault()}
                        className="block w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-500 py-2.5 text-center text-xs font-bold text-white shadow-md shadow-emerald-600/15 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-500/25"
                      >
                        {isArabic ? "اكتشف التقنية" : "Explore Technology"}
                      </Link>

                      <Link
                        href={slide.howItWorksLink}
                        onClick={(e) => !isCenter && e.preventDefault()}
                        className="block w-full rounded-lg border border-emerald-600/25 bg-emerald-50/70 py-2.5 text-center text-xs font-medium text-emerald-900 transition-all hover:border-emerald-500 hover:bg-emerald-100 dark:border-emerald-400/20 dark:bg-[#071810]/80 dark:text-emerald-200 dark:hover:border-emerald-400/60 dark:hover:bg-[#0B2419]"
                      >
                        {isArabic ? "كيف تعمل" : "How It Works"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Dots */}
            <div className="mt-4 flex items-center justify-center gap-2.5">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  aria-pressed={activeIndex === idx}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeIndex === idx
                      ? "w-6 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                      : "w-2.5 bg-emerald-900/20 hover:bg-emerald-500/50 dark:bg-emerald-100/20 dark:hover:bg-emerald-400/60"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Video Showcase */}
          <div className="relative mx-auto flex w-full max-w-[440px] items-end justify-center">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-10 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl dark:bg-teal-500/15"
            />

            <div className="relative h-[430px] w-full overflow-hidden sm:h-[500px]">
              <video
                key={slides[activeIndex].modelVideo}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-contain object-bottom transition-opacity duration-500 [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
              >
                <source
                  src={slides[activeIndex].modelVideo}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
    </section>
  );
}
