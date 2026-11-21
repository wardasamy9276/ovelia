// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   ArrowLeft,
//   ArrowRight,
//   Droplets,
//   Flame,
//   Heart,
//   Leaf,
//   type LucideIcon,
// } from "lucide-react";
// import { useLanguage } from "@/app/context/LanguageContext";

// type Localized = { ar: string; en: string };

// const skinTypes: {
//   key: string;
//   icon: LucideIcon;
//   name: Localized;
//   summary: Localized;
//   tips: Localized[];
//   ingredients: Localized[];
// }[] = [
//   {
//     key: "dry",
//     icon: Droplets,
//     name: { ar: "بشرة جافة", en: "Dry Skin" },
//     summary: {
//       ar: "تحتاج ترطيبًا عميقًا وحماية من فقدان الرطوبة على مدار اليوم.",
//       en: "Needs deep hydration and protection from moisture loss all day long.",
//     },
//     tips: [
//       { ar: "استخدمي غسولًا كريميًا بدون كبريتات", en: "Use a creamy, sulfate-free cleanser" },
//       { ar: "طبّقي المرطب على بشرة مبللة قليلًا", en: "Apply moisturizer on slightly damp skin" },
//       { ar: "قلّلي من الماء الساخن أثناء الغسيل", en: "Avoid hot water when washing" },
//     ],
//     ingredients: [
//       { ar: "حمض الهيالورونيك", en: "Hyaluronic Acid" },
//       { ar: "السيراميد", en: "Ceramides" },
//       { ar: "زبدة الشيا", en: "Shea Butter" },
//     ],
//   },
//   {
//     key: "oily",
//     icon: Flame,
//     name: { ar: "بشرة دهنية", en: "Oily Skin" },
//     summary: {
//       ar: "تحتاج توازنًا يتحكم في اللمعان دون أن يجفف البشرة.",
//       en: "Needs balance that controls shine without drying the skin out.",
//     },
//     tips: [
//       { ar: "اختاري مرطبًا خفيفًا مائي القوام", en: "Choose a light, water-based moisturizer" },
//       { ar: "اغسلي وجهك مرتين يوميًا فقط", en: "Wash your face only twice a day" },
//       { ar: "لا تتخطي واقي الشمس الخفيف", en: "Never skip a lightweight sunscreen" },
//     ],
//     ingredients: [
//       { ar: "النياسيناميد", en: "Niacinamide" },
//       { ar: "حمض الساليسيليك", en: "Salicylic Acid" },
//       { ar: "الطين", en: "Clay" },
//     ],
//   },
//   {
//     key: "combination",
//     icon: Leaf,
//     name: { ar: "بشرة مختلطة", en: "Combination Skin" },
//     summary: {
//       ar: "منطقة T دهنية وباقي الوجه جاف، وتحتاج روتينًا متوازنًا لكل منطقة.",
//       en: "An oily T-zone with drier cheeks, needing a balanced routine for each area.",
//     },
//     tips: [
//       { ar: "استخدمي منتجات مختلفة لكل منطقة عند الحاجة", en: "Use different products per area when needed" },
//       { ar: "اعتمدي تونر لطيفًا يوازن البشرة", en: "Use a gentle balancing toner" },
//       { ar: "قشّري البشرة مرة أسبوعيًا فقط", en: "Exfoliate only once a week" },
//     ],
//     ingredients: [
//       { ar: "الجلسرين", en: "Glycerin" },
//       { ar: "الشاي الأخضر", en: "Green Tea" },
//       { ar: "فيتامين C", en: "Vitamin C" },
//     ],
//   },
//   {
//     key: "sensitive",
//     icon: Heart,
//     name: { ar: "بشرة حساسة", en: "Sensitive Skin" },
//     summary: {
//       ar: "تحتاج مكونات هادئة وروتينًا بسيطًا يقلل احتمال التهيّج.",
//       en: "Needs calming ingredients and a simple routine that reduces irritation.",
//     },
//     tips: [
//       { ar: "جرّبي أي منتج جديد على منطقة صغيرة أولًا", en: "Patch-test any new product first" },
//       { ar: "ابتعدي عن العطور والكحول في المنتجات", en: "Avoid fragrance and alcohol in products" },
//       { ar: "أضيفي منتجًا واحدًا جديدًا كل مرة", en: "Introduce one new product at a time" },
//     ],
//     ingredients: [
//       { ar: "الألوفيرا", en: "Aloe Vera" },
//       { ar: "السنتيلا", en: "Centella" },
//       { ar: "الشوفان", en: "Oat Extract" },
//     ],
//   },
// ];

// export default function BlogSkinFinderSection() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";
//   const lang = isArabic ? "ar" : "en";
//   const Arrow = isArabic ? ArrowLeft : ArrowRight;

//   const [activeKey, setActiveKey] = useState(skinTypes[0].key);
//   const active = skinTypes.find((s) => s.key === activeKey) ?? skinTypes[0];
//   const ActiveIcon = active.icon;

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       lang={language}
//       className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
//     >
//       <style>{`
//         @keyframes orvelia-fade-up {
//           from { opacity: 0; transform: translateY(14px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes orvelia-float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         .orvelia-fade-up { animation: orvelia-fade-up 500ms ease both; }
//         .orvelia-float { animation: orvelia-float 6s ease-in-out infinite; }
//         @media (prefers-reduced-motion: reduce) {
//           .orvelia-fade-up, .orvelia-float { animation: none; }
//         }
//       `}</style>

//       {/* Glow */}
//       <div className="absolute -start-24 top-10 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-[140px] dark:bg-emerald-600/15" />
//       <div className="absolute -end-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-teal-400/20 blur-[140px] dark:bg-teal-400/10" />

//       <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
//         {/* Header */}
//         <div className="mx-auto max-w-2xl text-center">
//           <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
//             {isArabic ? "اكتشفي بشرتك" : "KNOW YOUR SKIN"}
//           </span>
//           <h2 className="mt-3 text-3xl font-black leading-[1.5] sm:text-4xl md:text-5xl">
//             {isArabic ? "ما نوع بشرتك؟" : "What's Your Skin Type?"}
//           </h2>
//           <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
//             {isArabic
//               ? "اختاري نوع بشرتك لتحصلي على نصائح ومكونات تناسبك."
//               : "Pick your skin type to get tips and ingredients that suit you."}
//           </p>
//         </div>

//         {/* Pills */}
//         <div
//           role="tablist"
//           className="mt-10 flex flex-wrap items-center justify-center gap-3"
//         >
//           {skinTypes.map((s) => {
//             const isActive = s.key === activeKey;
//             const Icon = s.icon;
//             return (
//               <button
//                 key={s.key}
//                 type="button"
//                 role="tab"
//                 aria-selected={isActive}
//                 onClick={() => setActiveKey(s.key)}
//                 className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-300 ${
//                   isActive
//                     ? "bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-700/25"
//                     : "border border-emerald-700/25 bg-white/60 text-emerald-800 backdrop-blur-md hover:bg-emerald-50 dark:border-emerald-400/25 dark:bg-white/5 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
//                 }`}
//               >
//                 <Icon size={17} />
//                 {s.name[lang]}
//               </button>
//             );
//           })}
//         </div>

//         {/* Result */}
//         <div
//           key={active.key}
//           className="orvelia-fade-up mt-16 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
//         >
//           {/* Orb */}
//           <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
//             <div className="absolute inset-0 rounded-full border border-emerald-700/20 dark:border-emerald-300/15" />
//             <div className="absolute inset-6 rounded-full border border-emerald-700/15 dark:border-emerald-300/10" />
//             <div className="absolute inset-12 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/20" />

//             <div className="orvelia-float relative flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 via-emerald-700 to-teal-800 text-white shadow-2xl shadow-emerald-900/30 dark:from-emerald-700 dark:via-emerald-900 dark:to-[#0B2A1F] dark:shadow-black/50 md:h-52 md:w-52">
//               <ActiveIcon size={64} strokeWidth={1.5} />
//             </div>
//           </div>

//           {/* Details */}
//           <div>
//             <h3 className="text-3xl font-black md:text-4xl">{active.name[lang]}</h3>
//             <p className="mt-4 max-w-xl text-sm leading-9 text-slate-600 dark:text-slate-300 md:text-base">
//               {active.summary[lang]}
//             </p>

//             <ol className="mt-8 space-y-5">
//               {active.tips.map((tip, i) => (
//                 <li key={i} className="flex items-start gap-4">
//                   <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-700/30 text-sm font-black text-emerald-700 dark:border-emerald-300/30 dark:text-emerald-300">
//                     {i + 1}
//                   </span>
//                   <span className="pt-1 text-sm leading-8 text-slate-700 dark:text-emerald-50/85 md:text-base">
//                     {tip[lang]}
//                   </span>
//                 </li>
//               ))}
//             </ol>

//             <div className="mt-8">
//               <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
//                 {isArabic ? "مكونات مناسبة" : "Ingredients to look for"}
//               </p>
//               <div className="mt-3 flex flex-wrap gap-2">
//                 {active.ingredients.map((ing, i) => (
//                   <span
//                     key={i}
//                     className="rounded-full bg-emerald-900/10 px-4 py-1.5 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-emerald-50/90"
//                   >
//                     {ing[lang]}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             <Link
//               href={`/blog?skin=${active.key}`}
//               className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-700/20 transition duration-300 hover:-translate-y-1 hover:shadow-emerald-600/30"
//             >
//               {isArabic ? "مقالات مناسبة لبشرتك" : "Articles for your skin"}
//               <Arrow
//                 size={19}
//                 className={`transition-transform ${
//                   isArabic ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
//                 }`}
//               />
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Droplets,
  Flame,
  Heart,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

type Localized = { ar: string; en: string };

const skinTypes: {
  key: string;
  icon: LucideIcon;
  video: string;
  name: Localized;
  summary: Localized;
  tips: Localized[];
  ingredients: Localized[];
}[] = [
  {
    key: "dry",
    icon: Droplets,
    video: "/assets/video1/face-blusher.mp4", // غيّره لفيديو البشرة الجافة
    name: { ar: "بشرة جافة", en: "Dry Skin" },
    summary: {
      ar: "تحتاج ترطيبًا عميقًا وحماية من فقدان الرطوبة على مدار اليوم.",
      en: "Needs deep hydration and protection from moisture loss all day long.",
    },
    tips: [
      { ar: "استخدمي غسولًا كريميًا بدون كبريتات", en: "Use a creamy, sulfate-free cleanser" },
      { ar: "طبّقي المرطب على بشرة مبللة قليلًا", en: "Apply moisturizer on slightly damp skin" },
      { ar: "قلّلي من الماء الساخن أثناء الغسيل", en: "Avoid hot water when washing" },
    ],
    ingredients: [
      { ar: "حمض الهيالورونيك", en: "Hyaluronic Acid" },
      { ar: "السيراميد", en: "Ceramides" },
      { ar: "زبدة الشيا", en: "Shea Butter" },
    ],
  },
  {
    key: "oily",
    icon: Flame,
    video: "/assets/video1/blusher-tech_1.mp4", // غيّره لفيديو البشرة الدهنية
    name: { ar: "بشرة دهنية", en: "Oily Skin" },
    summary: {
      ar: "تحتاج توازنًا يتحكم في اللمعان دون أن يجفف البشرة.",
      en: "Needs balance that controls shine without drying the skin out.",
    },
    tips: [
      { ar: "اختاري مرطبًا خفيفًا مائي القوام", en: "Choose a light, water-based moisturizer" },
      { ar: "اغسلي وجهك مرتين يوميًا فقط", en: "Wash your face only twice a day" },
      { ar: "لا تتخطي واقي الشمس الخفيف", en: "Never skip a lightweight sunscreen" },
    ],
    ingredients: [
      { ar: "النياسيناميد", en: "Niacinamide" },
      { ar: "حمض الساليسيليك", en: "Salicylic Acid" },
      { ar: "الطين", en: "Clay" },
    ],
  },
  {
    key: "combination",
    icon: Leaf,
    video: "/assets/video1/eye-hub.mp4", // غيّره لفيديو البشرة المختلطة
    name: { ar: "بشرة مختلطة", en: "Combination Skin" },
    summary: {
      ar: "منطقة T دهنية وباقي الوجه جاف، وتحتاج روتينًا متوازنًا لكل منطقة.",
      en: "An oily T-zone with drier cheeks, needing a balanced routine for each area.",
    },
    tips: [
      { ar: "استخدمي منتجات مختلفة لكل منطقة عند الحاجة", en: "Use different products per area when needed" },
      { ar: "اعتمدي تونر لطيفًا يوازن البشرة", en: "Use a gentle balancing toner" },
      { ar: "قشّري البشرة مرة أسبوعيًا فقط", en: "Exfoliate only once a week" },
    ],
    ingredients: [
      { ar: "الجلسرين", en: "Glycerin" },
      { ar: "الشاي الأخضر", en: "Green Tea" },
      { ar: "فيتامين C", en: "Vitamin C" },
    ],
  },
  {
    key: "sensitive",
    icon: Heart,
    video: "/assets/video1/face-blusher.mp4", // غيّره لفيديو البشرة الحساسة
    name: { ar: "بشرة حساسة", en: "Sensitive Skin" },
    summary: {
      ar: "تحتاج مكونات هادئة وروتينًا بسيطًا يقلل احتمال التهيّج.",
      en: "Needs calming ingredients and a simple routine that reduces irritation.",
    },
    tips: [
      { ar: "جرّبي أي منتج جديد على منطقة صغيرة أولًا", en: "Patch-test any new product first" },
      { ar: "ابتعدي عن العطور والكحول في المنتجات", en: "Avoid fragrance and alcohol in products" },
      { ar: "أضيفي منتجًا واحدًا جديدًا كل مرة", en: "Introduce one new product at a time" },
    ],
    ingredients: [
      { ar: "الألوفيرا", en: "Aloe Vera" },
      { ar: "السنتيلا", en: "Centella" },
      { ar: "الشوفان", en: "Oat Extract" },
    ],
  },
];

export default function BlogSkinFinderSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;

  const [activeKey, setActiveKey] = useState(skinTypes[0].key);
  const active = skinTypes.find((s) => s.key === activeKey) ?? skinTypes[0];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      <style>{`
        @keyframes orvelia-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orvelia-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .orvelia-fade-up { animation: orvelia-fade-up 500ms ease both; }
        .orvelia-float { animation: orvelia-float 6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .orvelia-fade-up, .orvelia-float { animation: none; }
        }
      `}</style>

      {/* Glow */}
      <div className="absolute -start-24 top-10 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-[140px] dark:bg-emerald-600/15" />
      <div className="absolute -end-24 bottom-0 -z-10 h-80 w-80 rounded-full bg-teal-400/20 blur-[140px] dark:bg-teal-400/10" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {isArabic ? "اكتشفي بشرتك" : "KNOW YOUR SKIN"}
          </span>
          <h2 className="mt-3 text-3xl font-black leading-[1.5] sm:text-4xl md:text-5xl">
            {isArabic ? "ما نوع بشرتك؟" : "What's Your Skin Type?"}
          </h2>
          <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
            {isArabic
              ? "اختاري نوع بشرتك لتحصلي على نصائح ومكونات تناسبك."
              : "Pick your skin type to get tips and ingredients that suit you."}
          </p>
        </div>

        {/* Pills */}
        <div
          role="tablist"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {skinTypes.map((s) => {
            const isActive = s.key === activeKey;
            const Icon = s.icon;
            return (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveKey(s.key)}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 dark:focus-visible:outline-emerald-300 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-700/25"
                    : "border border-emerald-700/25 bg-white/60 text-emerald-800 backdrop-blur-md hover:bg-emerald-50 dark:border-emerald-400/25 dark:bg-white/5 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
                }`}
              >
                <Icon size={17} />
                {s.name[lang]}
              </button>
            );
          })}
        </div>

        {/* Result */}
        <div
          key={active.key}
          className="orvelia-fade-up mt-16 grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          {/* Orb with video */}
          <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-emerald-700/20 dark:border-emerald-300/15" />
            <div className="absolute inset-6 rounded-full border border-emerald-700/15 dark:border-emerald-300/10" />
            <div className="absolute inset-12 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/20" />

            <div className="orvelia-float relative h-44 w-44 overflow-hidden rounded-full bg-emerald-800 shadow-2xl shadow-emerald-900/30 ring-4 ring-white/70 dark:bg-[#0B2A1F] dark:shadow-black/50 dark:ring-emerald-300/20 md:h-52 md:w-52">
              <video
                key={active.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                className="h-full w-full object-cover"
              >
                <source src={active.video} type="video/mp4" />
              </video>
            </div>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-3xl font-black md:text-4xl">{active.name[lang]}</h3>
            <p className="mt-4 max-w-xl text-sm leading-9 text-slate-600 dark:text-slate-300 md:text-base">
              {active.summary[lang]}
            </p>

            <ol className="mt-8 space-y-5">
              {active.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-700/30 text-sm font-black text-emerald-700 dark:border-emerald-300/30 dark:text-emerald-300">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-sm leading-8 text-slate-700 dark:text-emerald-50/85 md:text-base">
                    {tip[lang]}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {isArabic ? "مكونات مناسبة" : "Ingredients to look for"}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {active.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-emerald-900/10 px-4 py-1.5 text-xs font-medium text-slate-700 dark:bg-white/10 dark:text-emerald-50/90"
                  >
                    {ing[lang]}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/blog?skin=${active.key}`}
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-700/20 transition duration-300 hover:-translate-y-1 hover:shadow-emerald-600/30"
            >
              {isArabic ? "مقالات مناسبة لبشرتك" : "Articles for your skin"}
              <Arrow
                size={19}
                className={`transition-transform ${
                  isArabic ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}