// // components/SectorsShowcase.tsx
// "use client";

// import Image from "next/image";
// import { useState } from "react";

// type Sector = {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
// };

// const sectors: Sector[] = [
//   {
//     id: "beauty",
//     title: "الجمال ومستحضرات التجميل",
//     description:
//       "دع عملاءك يجربون أحمر الشفاه وظلال العيون وأساس البشرة مباشرة على وجوههم، ويقارنوا الدرجات في ثوانٍ قبل الشراء.",
//     image: "/images/beauty.jpg",
//   },
//   {
//     id: "jewelry",
//     title: "المجوهرات والإكسسوارات",
//     description:
//       "أتح لعملائك تجربة الخواتم والقلائد والأقراط والأساور والساعات افتراضياً في الوقت الحقيقي بدقة مذهلة، مع حرية تنسيق القطع معًا لاكتشاف الإطلالة المثالية قبل الشراء.",
//     image: "/images/jewelry.jpg",
//   },
//   {
//     id: "ecommerce",
//     title: "منصات التجارة الإلكترونية",
//     description:
//       "أضف تجربة المنتج الافتراضية إلى متجرك الإلكتروني بدمج سريع، لترفع ثقة المشتري ومعدل التحويل وتقلل المرتجعات.",
//     image: "/images/ecommerce.jpg",
//   },
//   {
//     id: "retail",
//     title: "متاجر التجزئة والمتاجر متعددة الفروع",
//     description:
//       "وفّر مرايا ذكية وشاشات تجربة داخل الفروع، بتجربة موحدة بين المتجر الفعلي والمتجر الإلكتروني.",
//     image: "/images/retail.jpg",
//   },
// ];

// export default function SectorsShowcase() {
//   const [activeId, setActiveId] = useState(sectors[0].id);
//   const active = sectors.find((s) => s.id === activeId)!;

//   return (
//     <section dir="rtl" className="mx-auto max-w-6xl px-4 py-12">
//       {/* التبويبات */}
//       <div
//         role="tablist"
//         aria-label="القطاعات"
//         className="mb-8 flex gap-2 overflow-x-auto rounded-full border border-[#1b2a47] bg-[#0b1a33]/70 p-1.5 [scrollbar-width:none]"
//       >
//         {sectors.map((s) => {
//           const selected = s.id === activeId;
//           return (
//             <button
//               key={s.id}
//               role="tab"
//               id={`tab-${s.id}`}
//               aria-selected={selected}
//               aria-controls={`tabpanel-${s.id}`}
//               onClick={() => setActiveId(s.id)}
//               className={[
//                 "shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
//                 "focus-visible:outline-2 focus-visible:outline-[#2ee6a6]",
//                 selected
//                   ? "bg-[#2ee6a6] text-[#071122]"
//                   : "text-white/80 hover:bg-white/5 hover:text-white",
//               ].join(" ")}
//             >
//               {s.title}
//             </button>
//           );
//         })}
//       </div>

//       {/* المحتوى */}
//       <div
//         key={active.id}
//         role="tabpanel"
//         id={`tabpanel-${active.id}`}
//         aria-labelledby={`tab-${active.id}`}
//         className="grid items-center gap-8 rounded-[2.5rem] border border-[#1b2a47] bg-[#0b1a33]/60 p-6 md:grid-cols-2 md:p-10"
//       >
//         <div>
//           <h2 className="mb-4 text-3xl font-semibold">{active.title}</h2>
//           <p className="text-lg leading-9 text-white/85">{active.description}</p>
//           <button className="mt-6 rounded-full border border-[#2ee6a6] px-6 py-2.5 text-[#2ee6a6] transition-colors hover:bg-[#2ee6a6] hover:text-[#071122]">
//             جرّب العرض التوضيحي
//           </button>
//         </div>

//         <div className="relative aspect-square w-full">
//           <Image
//             src={active.image}
//             alt={active.title}
//             fill
//             sizes="(min-width:768px) 45vw, 100vw"
//             className="object-contain [mask-image:radial-gradient(closest-side,#000_60%,transparent)]"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }



/* app/globals.css — فعّل الدارك مود بالكلاس (Tailwind v4) */
// components/SectorsCards.tsx

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// type Sector = { id: string; title: string; description: string; image: string };

// const sectors: Sector[] = [
//   {
//     id: "beauty",
//     title: "الجمال ومستحضرات التجميل",
//     description: "جرّب أحمر الشفاه وظلال العيون وأساس البشرة مباشرة على الوجه، وقارن الدرجات في ثوانٍ قبل الشراء.",
//     image: "/images/beauty.jpg",
//   },
//   {
//     id: "jewelry",
//     title: "المجوهرات والإكسسوارات",
//     description: "جرّب الخواتم والقلائد والأقراط والأساور والساعات افتراضياً في الوقت الحقيقي، ونسّق القطع معًا قبل الشراء.",
//     image: "/images/jewelry.jpg",
//   },
//   {
//     id: "ecommerce",
//     title: "منصات التجارة الإلكترونية",
//     description: "أضف تجربة المنتج الافتراضية إلى متجرك بدمج سريع، لترفع ثقة المشتري ومعدل التحويل وتقلل المرتجعات.",
//     image: "/images/ecommerce.jpg",
//   },
//   {
//     id: "retail",
//     title: "متاجر التجزئة والمتاجر متعددة الفروع",
//     description: "مرايا ذكية وشاشات تجربة داخل الفروع، بتجربة موحدة بين المتجر الفعلي والمتجر الإلكتروني.",
//     image: "/images/retail.jpg",
//   },
// ];

// function useTheme() {
//   const [dark, setDark] = useState(true);

//   useEffect(() => {
//     const saved = localStorage.getItem("theme");
//     const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
//     setDark(isDark);
//   }, []);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//     localStorage.setItem("theme", dark ? "dark" : "light");
//   }, [dark]);

//   return { dark, toggle: () => setDark((d) => !d) };
// }

// export default function SectorsCards() {
//   const [activeId, setActiveId] = useState("jewelry");
//   const { dark, toggle } = useTheme();

//   return (
//     <section
//       dir="rtl"
//       className="min-h-screen bg-slate-50 px-4 py-12 text-slate-900 transition-colors dark:bg-[#071122] dark:text-white"
//     >
//       <div className="mx-auto max-w-[1400px]">
//         <div className="mb-10 flex items-start justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-semibold sm:text-5xl">القطاعات التي نخدمها</h1>
//             <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600 dark:text-white/75">
//               بوابة تجربة افتراضية قابلة للتكيف عبر صناعات متعددة، لتقديم تجارب تفاعلية قبل الشراء.
//             </p>
//           </div>

//           <button
//             onClick={toggle}
//             aria-label={dark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن"}
//             aria-pressed={dark}
//             className="grid size-12 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-xl transition-colors hover:border-emerald-500 focus-visible:outline-2 focus-visible:outline-emerald-500 dark:border-[#1b2a47] dark:bg-[#0b1a33] dark:hover:border-[#2ee6a6]"
//           >
//             {dark ? "☀️" : "🌙"}
//           </button>
//         </div>

//         <div className="flex flex-col gap-3 lg:h-[640px] lg:flex-row">
//           {sectors.map((s) => {
//             const open = s.id === activeId;
//             return (
//               <article
//                 key={s.id}
//                 className={[
//                   "group relative overflow-hidden rounded-[2rem] border bg-slate-200 transition-[flex-grow] duration-500 ease-out dark:bg-[#0b1a33]",
//                   open
//                     ? "min-h-[420px] flex-[5] border-emerald-500/50 dark:border-[#2ee6a6]/40"
//                     : "min-h-[96px] flex-1 border-slate-200 dark:border-[#1b2a47]",
//                 ].join(" ")}
//               >
//                 <Image
//                   src={s.image}
//                   alt=""
//                   fill
//                   sizes="(min-width:1024px) 50vw, 100vw"
//                   className={[
//                     "object-cover transition-opacity duration-500",
//                     open ? "opacity-100" : "opacity-50 dark:opacity-40",
//                   ].join(" ")}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

//                 <button
//                   type="button"
//                   onClick={() => setActiveId(s.id)}
//                   aria-expanded={open}
//                   className="absolute inset-0 flex flex-col justify-end p-6 text-right text-white focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-emerald-400"
//                 >
//                   <h2 className={open ? "text-2xl font-semibold sm:text-3xl" : "text-lg font-medium"}>
//                     {s.title}
//                   </h2>
//                   {open && (
//                     <p className="mt-3 max-w-md text-base leading-8 text-white/90">{s.description}</p>
//                   )}
//                 </button>
//               </article>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


// components/SectorsSplit.tsx


// "use client";

// import Image from "next/image";
// import { useState } from "react";

// type Sector = {
//   id: string;
//   title: string;
//   short: string;
//   description: string;
//   image: string;
//   features: string[];
// };

// const sectors: Sector[] = [
//   {
//     id: "beauty",
//     title: "الجمال ومستحضرات التجميل",
//     short: "مكياج افتراضي مباشر",
//     description:
//       "يجرّب العميل أحمر الشفاه وظلال العيون وأساس البشرة مباشرة على وجهه، ويقارن الدرجات في ثوانٍ قبل أن يقرر الشراء.",
//     image: "/images/beauty.jpg",
//     features: ["مطابقة درجة البشرة", "مقارنة قبل وبعد", "حفظ الإطلالات"],
//   },
//   {
//     id: "jewelry",
//     title: "المجوهرات والإكسسوارات",
//     short: "خواتم، قلائد، أقراط، ساعات",
//     description:
//       "تجربة القطع افتراضياً في الوقت الحقيقي بدقة عالية، مع حرية تنسيق أكثر من قطعة معًا لاكتشاف الإطلالة المثالية.",
//     image: "/images/jewelry.jpg",
//     features: ["تتبع اليد والرقبة والأذن", "تنسيق عدة قطع", "مشاركة الصورة"],
//   },
//   {
//     id: "ecommerce",
//     title: "منصات التجارة الإلكترونية",
//     short: "دمج سريع في متجرك",
//     description:
//       "أضف التجربة الافتراضية إلى صفحات المنتجات بسطر برمجي واحد، لترتفع ثقة المشتري وينخفض معدل المرتجعات.",
//     image: "/images/ecommerce.jpg",
//     features: ["دمج بسطر واحد", "لوحة تحليلات", "متوافق مع المنصات الشائعة"],
//   },
//   {
//     id: "retail",
//     title: "متاجر التجزئة والفروع",
//     short: "مرايا ذكية داخل المتجر",
//     description:
//       "شاشات ومرايا تجربة داخل الفروع، بتجربة موحدة بين المتجر الفعلي والمتجر الإلكتروني وبيانات مشتركة بينهما.",
//     image: "/images/retail.jpg",
//     features: ["شاشات داخل الفرع", "مزامنة المخزون", "تقارير لكل فرع"],
//   },
// ];

// export default function SectorsSplit() {
//   const [activeId, setActiveId] = useState("jewelry");
//   const active = sectors.find((s) => s.id === activeId)!;

//   return (
//     <section dir="rtl" className="min-h-screen px-5 py-14">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="mb-12 text-4xl font-bold leading-tight sm:text-6xl">
//           القطاعات
//           <br />
//           التي نخدمها
//         </h1>

//         <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
//           <ul
//             role="tablist"
//             aria-orientation="vertical"
//             className="divide-y divide-stone-300 border-y border-stone-300 dark:divide-white/10 dark:border-white/10"
//           >
//             {sectors.map((s) => {
//               const selected = s.id === activeId;
//               return (
//                 <li key={s.id}>
//                   <button
//                     role="tab"
//                     id={`tab-${s.id}`}
//                     aria-selected={selected}
//                     aria-controls="sector-panel"
//                     onClick={() => setActiveId(s.id)}
//                     onMouseEnter={() => setActiveId(s.id)}
//                     className="group flex w-full items-center justify-between gap-4 py-6 text-right focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-teal-500"
//                   >
//                     <span>
//                       <span
//                         className={[
//                           "block text-2xl font-semibold transition-colors sm:text-3xl",
//                           selected
//                             ? "text-teal-600 dark:text-teal-300"
//                             : "text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-200",
//                         ].join(" ")}
//                       >
//                         {s.title}
//                       </span>
//                       <span
//                         className={[
//                           "mt-1 block text-sm transition-all",
//                           selected
//                             ? "text-stone-600 opacity-100 dark:text-stone-400"
//                             : "h-0 overflow-hidden opacity-0",
//                         ].join(" ")}
//                       >
//                         {s.short}
//                       </span>
//                     </span>
//                     <svg
//                       viewBox="0 0 24 24"
//                       className={[
//                         "size-6 shrink-0 transition-transform",
//                         selected ? "-translate-x-1 text-teal-600 dark:text-teal-300" : "text-stone-400",
//                       ].join(" ")}
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       aria-hidden
//                     >
//                       <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>

//           <div
//             id="sector-panel"
//             role="tabpanel"
//             aria-labelledby={`tab-${active.id}`}
//             className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-stone-300 dark:bg-[#0d1830]"
//           >
//             <Image
//               key={active.id}
//               src={active.image}
//               alt={active.title}
//               fill
//               sizes="(min-width:1024px) 55vw, 100vw"
//               className="object-cover"
//               priority
//             />

//             <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-[#060d1c]/75">
//               <h2 className="text-xl font-semibold">{active.title}</h2>
//               <p className="mt-2 leading-8 text-stone-700 dark:text-stone-300">{active.description}</p>
//               <ul className="mt-4 flex flex-wrap gap-2">
//                 {active.features.map((f) => (
//                   <li
//                     key={f}
//                     className="rounded-full bg-teal-600/10 px-3 py-1 text-sm text-teal-800 dark:bg-teal-300/10 dark:text-teal-200"
//                   >
//                     {f}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// components/SectorsSplit.tsx

// "use client";

// import Image from "next/image";
// import { useState } from "react";

// type Sector = {
//   id: string;
//   title: string;
//   short: string;
//   description: string;
//   image: string;
//   features: string[];
// };

// const sectors: Sector[] = [
//   {
//     id: "beauty",
//     title: "الجمال ومستحضرات التجميل",
//     short: "مكياج افتراضي مباشر",
//     description:
//       "يجرّب العميل أحمر الشفاه وظلال العيون وأساس البشرة مباشرة على وجهه، ويقارن الدرجات في ثوانٍ قبل أن يقرر الشراء.",
//     image: "/images/beauty.jpg",
//     features: ["مطابقة درجة البشرة", "مقارنة قبل وبعد", "حفظ الإطلالات"],
//   },
//   {
//     id: "jewelry",
//     title: "المجوهرات والإكسسوارات",
//     short: "خواتم، قلائد، أقراط، ساعات",
//     description:
//       "تجربة القطع افتراضياً في الوقت الحقيقي بدقة عالية، مع حرية تنسيق أكثر من قطعة معًا لاكتشاف الإطلالة المثالية.",
//     image: "/images/jewelry.jpg",
//     features: ["تتبع اليد والرقبة والأذن", "تنسيق عدة قطع", "مشاركة الصورة"],
//   },
//   {
//     id: "ecommerce",
//     title: "منصات التجارة الإلكترونية",
//     short: "دمج سريع في متجرك",
//     description:
//       "أضف التجربة الافتراضية إلى صفحات المنتجات بسطر برمجي واحد، لترتفع ثقة المشتري وينخفض معدل المرتجعات.",
//     image: "/images/ecommerce.jpg",
//     features: ["دمج بسطر واحد", "لوحة تحليلات", "متوافق مع المنصات الشائعة"],
//   },
//   {
//     id: "retail",
//     title: "متاجر التجزئة والفروع",
//     short: "مرايا ذكية داخل المتجر",
//     description:
//       "شاشات ومرايا تجربة داخل الفروع، بتجربة موحدة بين المتجر الفعلي والمتجر الإلكتروني وبيانات مشتركة بينهما.",
//     image: "/images/retail.jpg",
//     features: ["شاشات داخل الفرع", "مزامنة المخزون", "تقارير لكل فرع"],
//   },
// ];

// export default function SectorsSplit() {
//   const [activeId, setActiveId] = useState("jewelry");
//   const active = sectors.find((s) => s.id === activeId)!;

//   return (
//     <section dir="rtl" className="px-5 py-14">
//       <div className="mx-auto max-w-7xl">
//         <h1 className="mb-12 text-4xl font-bold leading-tight sm:text-6xl">
//           القطاعات
//           <br />
//           التي نخدمها
//         </h1>

//         <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
//           <ul role="tablist" aria-orientation="vertical" className="flex flex-col gap-3">
//             {sectors.map((s) => {
//               const selected = s.id === activeId;
//               return (
//                 <li key={s.id}>
//                   <button
//                     role="tab"
//                     id={`tab-${s.id}`}
//                     aria-selected={selected}
//                     aria-controls="sector-panel"
//                     onClick={() => setActiveId(s.id)}
//                     className={[
//                       "flex w-full items-center justify-between gap-4 rounded-md border p-5 text-right transition-colors",
//                       selected
//                         ? "border-accent bg-accent-soft"
//                         : "border-line bg-surface hover:bg-surface-2",
//                     ].join(" ")}
//                   >
//                     <span>
//                       <span className="block font-display text-xl font-semibold sm:text-2xl">{s.title}</span>
//                       <span className="mt-1 block text-sm text-muted">{s.short}</span>
//                     </span>
//                     <svg
//                       viewBox="0 0 24 24"
//                       className={["size-5 shrink-0 transition-transform", selected ? "-translate-x-1 text-accent" : "text-muted"].join(" ")}
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       aria-hidden
//                     >
//                       <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </button>
//                 </li>
//               );
//             })}
//           </ul>

//           <div
//             id="sector-panel"
//             role="tabpanel"
//             aria-labelledby={`tab-${active.id}`}
//             className="relative min-h-[520px] overflow-hidden rounded-lg border border-line bg-surface-2"
//           >
//             <Image
//               key={active.id}
//               src={active.image}
//               alt={active.title}
//               fill
//               sizes="(min-width:1024px) 55vw, 100vw"
//               className="object-cover"
//               priority
//             />

//             <div className="absolute inset-x-4 bottom-4 rounded-md border border-line bg-surface/90 p-6 backdrop-blur-md">
//               <h2 className="text-xl font-semibold">{active.title}</h2>
//               <p className="mt-2 leading-8 text-muted">{active.description}</p>
//               <ul className="mt-4 flex flex-wrap gap-2">
//                 {active.features.map((f) => (
//                   <li key={f} className="rounded-sm bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
//                     {f}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// type Sector = {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   href: string;
//   points: string[];
//   color: string;
// };

// const sectors: Sector[] = [
//   {
//     id: "beauty",
//     title: "الجمال ومستحضرات التجميل",
//     description: "يجرّب العميل المكياج مباشرة على وجهه ويقارن الدرجات قبل الشراء.",
//     image: "/images/beauty.jpg",
//     href: "/sectors/beauty",
//     points: ["مطابقة درجة البشرة", "مقارنة قبل وبعد", "حفظ الإطلالات"],
//     color: "#ec4899",
//   },
//   {
//     id: "jewelry",
//     title: "المجوهرات والإكسسوارات",
//     description: "تجربة الخواتم والقلائد والأقراط والساعات في الوقت الحقيقي وتنسيقها معًا.",
//     image: "/images/jewelry.jpg",
//     href: "/sectors/jewelry",
//     points: ["تتبع اليد والرقبة والأذن", "تنسيق عدة قطع", "مشاركة الصورة"],
//     color: "#a78bfa",
//   },
//   {
//     id: "ecommerce",
//     title: "منصات التجارة الإلكترونية",
//     description: "دمج التجربة الافتراضية في صفحات المنتجات بسطر برمجي واحد.",
//     image: "/images/ecommerce.jpg",
//     href: "/sectors/ecommerce",
//     points: ["دمج بسطر واحد", "لوحة تحليلات", "متوافق مع المنصات الشائعة"],
//     color: "#06b6d4",
//   },
//   {
//     id: "retail",
//     title: "متاجر التجزئة والفروع",
//     description: "مرايا ذكية داخل الفروع بتجربة موحدة مع المتجر الإلكتروني.",
//     image: "/images/retail.jpg",
//     href: "/sectors/retail",
//     points: ["شاشات داخل الفرع", "مزامنة المخزون", "تقارير لكل فرع"],
//     color: "#34d399",
//   },
// ];

// function FlipCard({ sector }: { sector: Sector }) {
//   const [flipped, setFlipped] = useState(false);

//   return (
//     <div
//       className="sector-card group relative h-[460px] rounded-[28px] p-[2px]"
//       style={{ "--card-color": sector.color } as React.CSSProperties}
//     >
//       {/* إطار ملون متحرك */}
//       <div className="absolute inset-0 overflow-hidden rounded-[28px]">
//         <div className="sector-border absolute -inset-full" />
//       </div>

//       {/* إضاءة خارجية */}
//       <div className="sector-glow pointer-events-none absolute -inset-3 rounded-[35px] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />

//       {/* جسم الكارت */}
//       <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-bg [perspective:1400px]">

//         <div
//           className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
//             flipped ? "[transform:rotateY(180deg)]" : ""
//           }`}
//         >
//           {/* الوجه الأمامي */}
//           <button
//             type="button"
//             onClick={() => setFlipped((prev) => !prev)}
//             aria-label={`عرض تفاصيل ${sector.title}`}
//             className="absolute inset-0 h-full w-full overflow-hidden rounded-[26px] text-right [backface-visibility:hidden]"
//           >
//             {/* الصورة */}
//             <Image
//               src={sector.image}
//               alt={sector.title}
//               fill
//               sizes="(min-width:1024px) 25vw, 50vw"
//               className="sector-image object-cover"
//             />

//             {/* طبقة الألوان */}
//             <span
//               className="absolute inset-0 opacity-40 mix-blend-multiply"
//               style={{
//                 background: `linear-gradient(145deg, ${sector.color}80, transparent 65%)`,
//               }}
//             />

//             <span className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

//             {/* خطوط ضوئية متحركة */}
//             <span className="sector-shimmer absolute inset-0" />

//             {/* دائرة زخرفية */}
//             <span
//               className="absolute right-5 top-5 size-16 rounded-full border border-white/40 animate-pulse"
//               style={{ boxShadow: `0 0 30px ${sector.color}` }}
//             />

//             {/* محتوى الكارت */}
//             <span className="absolute inset-x-0 bottom-0 p-7">
//               <span
//                 className="mb-4 block h-1 w-14 rounded-full"
//                 style={{ backgroundColor: sector.color }}
//               />

//               <span className="block text-2xl font-bold text-white">
//                 {sector.title}
//               </span>

//               <span className="mt-4 inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/15 px-5 py-2 text-sm text-white backdrop-blur-md transition-all group-hover:bg-white/30">
//                 اكتشف المزيد
//                 <span className="animate-bounce">←</span>
//               </span>
//             </span>
//           </button>

//           {/* الوجه الخلفي */}
//           <div className="absolute inset-0 flex flex-col overflow-hidden rounded-[26px] bg-surface [backface-visibility:hidden] [transform:rotateY(180deg)]">

//             {/* صورة داخل الوجه الخلفي */}
//             <div className="relative h-48 shrink-0 overflow-hidden">
//               <Image
//                 src={sector.image}
//                 alt={sector.title}
//                 fill
//                 sizes="(min-width:1024px) 25vw, 50vw"
//                 className="object-cover"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

//               <span
//                 className="absolute right-5 top-5 size-12 rounded-full border-2 border-white/70 animate-pulse"
//                 style={{ boxShadow: `0 0 25px ${sector.color}` }}
//               />
//             </div>

//             {/* التفاصيل */}
//             <div className="flex flex-1 flex-col justify-between p-6 pt-2">

//               <div>
//                 <h2
//                   className="text-xl font-bold"
//                   style={{ color: sector.color }}
//                 >
//                   {sector.title}
//                 </h2>

//                 <p className="mt-3 text-sm leading-7 text-muted">
//                   {sector.description}
//                 </p>

//                 <ul className="mt-4 space-y-3 text-sm text-foreground">
//                   {sector.points.map((point, index) => (
//                     <li
//                       key={point}
//                       className="flex items-center gap-3"
//                     >
//                       <span
//                         className="flex size-6 shrink-0 items-center justify-center rounded-full text-xs text-white"
//                         style={{ backgroundColor: sector.color }}
//                       >
//                         {index + 1}
//                       </span>
//                       {point}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="flex gap-3">
//                 <Link
//                   href={sector.href}
//                   className="flex-1 rounded-full py-3 text-center font-semibold text-white transition-all hover:brightness-110 hover:scale-[1.02]"
//                   style={{
//                     background: `linear-gradient(110deg, ${sector.color}, ${sector.color}99)`,
//                   }}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   جرّب الآن
//                 </Link>

//                 <button
//                   type="button"
//                   onClick={() => setFlipped(false)}
//                   className="rounded-full border border-current/20 px-4 text-sm transition-colors hover:bg-black/5"
//                 >
//                   رجوع
//                 </button>
//               </div>

//             </div>
//           </div>

//         </div>
//       </div>

//       <style jsx>{`
//         .sector-border {
//           background: conic-gradient(
//             from 0deg,
//             transparent 0deg,
//             var(--card-color) 80deg,
//             #ffffff 120deg,
//             #8b5cf6 180deg,
//             #06b6d4 240deg,
//             transparent 360deg
//           );
//           animation: borderRotate 4s linear infinite;
//         }

//         .sector-glow {
//           background: var(--card-color);
//         }

//         .sector-image {
//           transition: transform 1s ease;
//         }

//         .group:hover .sector-image {
//           transform: scale(1.1);
//         }

//         .sector-shimmer {
//           background: linear-gradient(
//             110deg,
//             transparent 20%,
//             rgba(255, 255, 255, 0.18) 45%,
//             transparent 65%
//           );
//           transform: translateX(-100%);
//           animation: shimmer 5s ease-in-out infinite;
//         }

//         @keyframes borderRotate {
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes shimmer {
//           0%, 60% {
//             transform: translateX(-100%);
//           }
//           100% {
//             transform: translateX(100%);
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .sector-border,
//           .sector-shimmer {
//             animation: none;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function SectorsFlip() {
//   return (
//     <section dir="rtl" className="px-5 py-20">
//       <div className="mx-auto max-w-7xl">

//         <div className="mb-12 text-center">
//           <span className="mb-4 inline-block text-sm font-semibold tracking-widest text-accent">
//             OUR INDUSTRIES
//           </span>

//           <h1 className="text-3xl font-bold sm:text-5xl">
//             القطاعات التي نخدمها
//           </h1>

//           <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-muted">
//             اكتشف كيف نعيد تعريف تجربة التسوق والتفاعل الرقمي
//             من خلال حلول التكنولوجيا الذكية.
//           </p>
//         </div>

//         <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
//           {sectors.map((sector) => (
//             <FlipCard key={sector.id} sector={sector} />
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// ????????????????????????????????????????????


// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { useLanguage } from "@/app/context/LanguageContext";

// type Sector = {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   href: string;
//   points: string[];
// };

// function FlipCard({
//   sector,
//   isArabic,
// }: {
//   sector: Sector;
//   isArabic: boolean;
// }) {
//   const [flipped, setFlipped] = useState(false);

//   return (
//     <div
//       className="sector-card group relative h-[490px] rounded-[24px] p-[2px]"
//       onMouseEnter={() => setFlipped(true)}
//       onMouseLeave={() => setFlipped(false)}
//       onClick={(e) => {
//         if (window.matchMedia("(hover: none)").matches) {
//           if ((e.target as HTMLElement).closest("a")) return;
//           setFlipped((prev) => !prev);
//         }
//       }}
//     >
//       {/* إطار متحرك هادئ */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
//         <div className="sector-border absolute left-1/2 top-1/2 h-[220%] w-[220%]" />
//       </div>

//       {/* الحاوية الرئيسية */}
//       <div className="relative h-full w-full rounded-[22px] bg-bg p-[3px] [perspective:1600px]">
//         <div
//           className={`sector-inner relative h-full w-full rounded-[19px] ${
//             flipped ? "is-flipped" : ""
//           }`}
//         >
//           {/* الوجه الأمامي */}
//           <div className="sector-face sector-front">
//             <div className="relative mx-4 mt-4 h-[230px] shrink-0 overflow-hidden rounded-2xl">
//               <Image
//                 src={sector.image}
//                 alt={sector.title}
//                 fill
//                 sizes="(min-width:1024px) 25vw, 50vw"
//                 className="object-cover transition-transform duration-700 group-hover:scale-105"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
//             </div>

//             <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
//               <h2 className="text-xl font-bold leading-9 text-foreground">
//                 {sector.title}
//               </h2>

//               <p className="mt-3 text-sm leading-7 text-muted">
//                 {sector.description}
//               </p>

//               <span className="mt-5 text-xs text-accent">
//                 {isArabic
//                   ? "مرري المؤشر لاكتشاف المزيد"
//                   : "Hover to discover more"}
//               </span>
//             </div>
//           </div>

//           {/* الوجه الخلفي */}
//           <div className="sector-face sector-back">
//             <div className="relative h-[165px] shrink-0 overflow-hidden">
//               <Image
//                 src={sector.image}
//                 alt={sector.title}
//                 fill
//                 sizes="(min-width:1024px) 25vw, 50vw"
//                 className="object-cover"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
//             </div>

//             <div
//               className={`sector-back-content ${
//                 isArabic ? "text-right" : "text-left"
//               }`}
//             >
//               <div className="mb-3">
//                 <span className="text-xs font-semibold tracking-wide text-accent">
//                   {isArabic ? "تفاصيل القطاع" : "SECTOR DETAILS"}
//                 </span>

//                 <h2 className="mt-2 text-lg font-bold leading-8 text-foreground">
//                   {sector.title}
//                 </h2>

//                 <p className="mt-2 text-sm leading-7 text-muted">
//                   {sector.description}
//                 </p>
//               </div>

//               <div className="mb-4 h-px w-full bg-black/10 dark:bg-white/10" />

//               <div className="flex-1">
//                 <h3 className="mb-3 text-sm font-bold text-foreground">
//                   {isArabic ? "المميزات والخدمات" : "Features & Services"}
//                 </h3>

//                 <ul className="space-y-3">
//                   {sector.points.map((point, index) => (
//                     <li
//                       key={point}
//                       className="sector-point flex items-center gap-3 text-sm leading-6 text-foreground"
//                       style={{ animationDelay: `${index * 100}ms` }}
//                     >
//                       <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
//                         {index + 1}
//                       </span>

//                       <span>{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <Link
//                 href={sector.href}
//                 className="mt-4 block w-full shrink-0 rounded-full bg-accent py-3 text-center text-sm font-semibold text-accent-fg transition-opacity hover:opacity-85"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {isArabic ? "جرّب الآن" : "Try Now"}
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .sector-border {
//           background: conic-gradient(
//             from 0deg,
//             transparent 0deg,
//             var(--accent) 90deg,
//             var(--border) 160deg,
//             var(--accent) 220deg,
//             transparent 300deg
//           );
//           animation: border-rotation 8s linear infinite;
//         }

//         .sector-inner {
//           height: 100%;
//           width: 100%;
//           transform-style: preserve-3d;
//           transition: transform 750ms cubic-bezier(0.2, 0.7, 0.2, 1);
//         }

//         .sector-inner.is-flipped {
//           transform: rotateY(180deg);
//         }

//         .sector-face {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           overflow: hidden;
//           border-radius: 19px;
//           border: 1px solid var(--border);
//           background: var(--surface);
//           display: flex;
//           flex-direction: column;
//           -webkit-backface-visibility: hidden;
//           backface-visibility: hidden;
//           isolation: isolate;
//         }

//         .sector-front {
//           transform: rotateY(0deg);
//           z-index: 2;
//         }

//         .sector-back {
//           transform: rotateY(180deg);
//           z-index: 1;
//         }

//         .sector-back-content {
//           display: flex;
//           flex: 1;
//           min-height: 0;
//           flex-direction: column;
//           padding: 12px 22px 18px;
//           background: var(--surface);
//           overflow: hidden;
//         }

//         .sector-point {
//           opacity: 0;
//           animation: point-appear 450ms ease forwards;
//         }

//         @keyframes border-rotation {
//           to {
//             transform: translate(-50%, -50%) rotate(360deg);
//           }
//         }

//         @keyframes point-appear {
//           from {
//             opacity: 0;
//             transform: translateY(7px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @media (hover: hover) {
//           .sector-card:hover .sector-inner {
//             transform: rotateY(180deg);
//           }

//           .sector-card:hover .sector-front {
//             z-index: 1;
//           }

//           .sector-card:hover .sector-back {
//             z-index: 2;
//           }
//         }

//         @media (hover: none) {
//           .sector-inner.is-flipped {
//             transform: rotateY(180deg);
//           }
//         }

//         @media (prefers-reduced-motion: reduce) {
//           .sector-border {
//             animation: none;
//           }

//           .sector-inner {
//             transition: none;
//           }

//           .sector-point {
//             animation: none;
//             opacity: 1;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// export default function SectorsFlip() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";

//   const sectors: Sector[] = [
//     {
//       id: "beauty",
//       title: isArabic
//         ? "الجمال ومستحضرات التجميل"
//         : "Beauty & Cosmetics",
//       description: isArabic
//         ? "يجرّب العميل المكياج مباشرة على وجهه ويقارن الدرجات قبل الشراء."
//         : "Customers can try makeup directly on their faces and compare different shades before making a purchase.",
//       image: "/assets/slider/images6.jpg",
//       href: "/sectors/beauty",
//       points: isArabic
//         ? ["مطابقة درجة البشرة", "مقارنة قبل وبعد", "حفظ الإطلالات"]
//         : ["Skin Tone Matching", "Before & After Comparison", "Save Looks"],
//     },
//     {
//       id: "jewelry",
//       title: isArabic
//         ? "المجوهرات والإكسسوارات"
//         : "Jewelry & Accessories",
//       description: isArabic
//         ? "تجربة الخواتم والقلائد والأقراط والساعات في الوقت الحقيقي وتنسيقها معًا."
//         : "Virtually try on rings, necklaces, earrings, and watches in real time, and mix and match different pieces.",
//       image: "/assets/img/images13.jpg",
//       href: "/sectors/jewelry",
//       points: isArabic
//         ? ["تتبع اليد والرقبة والأذن", "تنسيق عدة قطع", "مشاركة الصورة"]
//         : ["Hand, Neck & Ear Tracking", "Mix & Match Items", "Share Your Look"],
//     },
//     {
//       id: "ecommerce",
//       title: isArabic
//         ? "منصات التجارة الإلكترونية"
//         : "E-Commerce Platforms",
//       description: isArabic
//         ? "دمج التجربة الافتراضية في صفحات المنتجات بسطر برمجي واحد."
//         : "Integrate virtual try-on experiences into your product pages with a simple line of code.",
//       image: "/assets/img/ava.webp",
//       href: "/sectors/ecommerce",
//       points: isArabic
//         ? ["دمج بسطر واحد", "لوحة تحليلات", "متوافق مع المنصات الشائعة"]
//         : ["One-Line Integration", "Analytics Dashboard", "Compatible with Popular Platforms"],
//     },
//     {
//       id: "retail",
//       title: isArabic
//         ? "متاجر التجزئة والفروع"
//         : "Retail & Multi-Branch Stores",
//       description: isArabic
//         ? "مرايا ذكية داخل الفروع بتجربة موحدة مع المتجر الإلكتروني."
//         : "Smart mirrors inside physical stores provide a unified shopping experience connected to your online store.",
//       image: "/assets/img/img-2.webp",
//       href: "/sectors/retail",
//       points: isArabic
//         ? ["شاشات داخل الفرع", "مزامنة المخزون", "تقارير لكل فرع"]
//         : ["In-Store Screens", "Inventory Synchronization", "Branch Reports"],
//     },
//   ];

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       lang={language}
//       className="px-5 py-16"
//     >
//       <div className="mx-auto max-w-7xl">
//         {/* العنوان */}
//         <div className="mb-12 text-center">
//           <span className="mb-4 inline-block text-sm font-medium tracking-widest text-accent">
//             {isArabic ? "قطاعاتنا" : "OUR INDUSTRIES"}
//           </span>

//           <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
//             {isArabic
//               ? "القطاعات التي نخدمها"
//               : "Industries We Serve"}
//           </h1>

//           <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-muted">
//             {isArabic
//               ? "اكتشف كيف نعيد تعريف تجربة التسوق والتفاعل الرقمي من خلال حلول التكنولوجيا الذكية."
//               : "Discover how we redefine shopping and digital interaction through innovative smart technology solutions."}
//           </p>
//         </div>

//         {/* الكروت */}
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {sectors.map((sector) => (
//             <FlipCard
//               key={sector.id}
//               sector={sector}
//               isArabic={isArabic}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { getSectorsData, Sector } from "../home/data/SectorsShowcasesData"; // تأكد من مطابقة مسار الاستيراد لمكان ملف البيانات

function FlipCard({
  sector,
  isArabic,
}: {
  sector: Sector;
  isArabic: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="sector-card group relative h-[490px] rounded-[24px] p-[2px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={(e) => {
        if (window.matchMedia("(hover: none)").matches) {
          if ((e.target as HTMLElement).closest("a")) return;
          setFlipped((prev) => !prev);
        }
      }}
    >
      {/* إطار متحرك هادئ */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[24px]">
        <div className="sector-border absolute left-1/2 top-1/2 h-[220%] w-[220%]" />
      </div>

      {/* الحاوية الرئيسية */}
      <div className="relative h-full w-full rounded-[22px] bg-bg p-[3px] [perspective:1600px]">
        <div
          className={`sector-inner relative h-full w-full rounded-[19px] ${
            flipped ? "is-flipped" : ""
          }`}
        >
          {/* الوجه الأمامي */}
          <div className="sector-face sector-front">
            <div className="relative mx-4 mt-4 h-[230px] shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={sector.image}
                alt={sector.title}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <h2 className="text-xl font-bold leading-9 text-foreground">
                {sector.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted">
                {sector.description}
              </p>

              <span className="mt-5 text-xs text-accent">
                {isArabic
                  ? "مرري المؤشر لاكتشاف المزيد"
                  : "Hover to discover more"}
              </span>
            </div>
          </div>

          {/* الوجه الخلفي */}
          <div className="sector-face sector-back">
            <div className="relative h-[165px] shrink-0 overflow-hidden">
              <Image
                src={sector.image}
                alt={sector.title}
                fill
                sizes="(min-width:1024px) 25vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent" />
            </div>

            <div
              className={`sector-back-content ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <div className="mb-3">
                <span className="text-xs font-semibold tracking-wide text-accent">
                  {isArabic ? "تفاصيل القطاع" : "SECTOR DETAILS"}
                </span>

                <h2 className="mt-2 text-lg font-bold leading-8 text-foreground">
                  {sector.title}
                </h2>

                <p className="mt-2 text-sm leading-7 text-muted">
                  {sector.description}
                </p>
              </div>

              <div className="mb-4 h-px w-full bg-black/10 dark:bg-white/10" />

              <div className="flex-1">
                <h3 className="mb-3 text-sm font-bold text-foreground">
                  {isArabic ? "المميزات والخدمات" : "Features & Services"}
                </h3>

                <ul className="space-y-3">
                  {sector.points.map((point, index) => (
                    <li
                      key={point}
                      className="sector-point flex items-center gap-3 text-sm leading-6 text-foreground"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                        {index + 1}
                      </span>

                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={sector.href}
                className="mt-4 block w-full shrink-0 rounded-full bg-accent py-3 text-center text-sm font-semibold text-accent-fg transition-opacity hover:opacity-85"
                onClick={(e) => e.stopPropagation()}
              >
                {isArabic ? "جرّب الآن" : "Try Now"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sector-border {
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            var(--accent) 90deg,
            var(--border) 160deg,
            var(--accent) 220deg,
            transparent 300deg
          );
          animation: border-rotation 8s linear infinite;
        }

        .sector-inner {
          height: 100%;
          width: 100%;
          transform-style: preserve-3d;
          transition: transform 750ms cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .sector-inner.is-flipped {
          transform: rotateY(180deg);
        }

        .sector-face {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 19px;
          border: 1px solid var(--border);
          background: var(--surface);
          display: flex;
          flex-direction: column;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          isolation: isolate;
        }

        .sector-front {
          transform: rotateY(0deg);
          z-index: 2;
        }

        .sector-back {
          transform: rotateY(180deg);
          z-index: 1;
        }

        .sector-back-content {
          display: flex;
          flex: 1;
          min-height: 0;
          flex-direction: column;
          padding: 12px 22px 18px;
          background: var(--surface);
          overflow: hidden;
        }

        .sector-point {
          opacity: 0;
          animation: point-appear 450ms ease forwards;
        }

        @keyframes border-rotation {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes point-appear {
          from {
            opacity: 0;
            transform: translateY(7px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (hover: hover) {
          .sector-card:hover .sector-inner {
            transform: rotateY(180deg);
          }

          .sector-card:hover .sector-front {
            z-index: 1;
          }

          .sector-card:hover .sector-back {
            z-index: 2;
          }
        }

        @media (hover: none) {
          .sector-inner.is-flipped {
            transform: rotateY(180deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sector-border {
            animation: none;
          }

          .sector-inner {
            transition: none;
          }

          .sector-point {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default function SectorsFlip() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const sectors = getSectorsData(isArabic);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="px-5 py-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* العنوان */}
        <div className="mb-12 text-center">
          <span className="mb-4 inline-block text-sm font-medium tracking-widest text-accent">
            {isArabic ? "قطاعاتنا" : "OUR INDUSTRIES"}
          </span>

          <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
            {isArabic ? "القطاعات التي نخدمها" : "Industries We Serve"}
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-muted">
            {isArabic
              ? "اكتشف كيف نعيد تعريف تجربة التسوق والتفاعل الرقمي من خلال حلول التكنولوجيا الذكية."
              : "Discover how we redefine shopping and digital interaction through innovative smart technology solutions."}
          </p>
        </div>

        {/* الكروت */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((sector) => (
            <FlipCard
              key={sector.id}
              sector={sector}
              isArabic={isArabic}
            />
          ))}
        </div>
      </div>
    </section>
  );
}