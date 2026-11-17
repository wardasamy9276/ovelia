

// // app/page.tsx  (ملف واحد، كل شيء بداخله)
// // الصور: public/images/makeup/{id}.jpg  مثل lipstick.jpg و kohl.jpg و foundation.jpg
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRef, useState } from "react";

// type Locale = "ar" | "en";
// type L = Record<Locale, string>;
// type Feature = { t: L; d: L };
// type Card = { id: string; title: L; features: Feature[] };
// type Category = { id: string; heading: L; cards: Card[] };

// const f = (at: string, ad: string, et: string, ed: string): Feature => ({
//   t: { ar: at, en: et },
//   d: { ar: ad, en: ed },
// });
// const c = (id: string, ar: string, en: string, features: Feature[]): Card => ({
//   id,
//   title: { ar, en },
//   features,
// });

// /* ───────── المحتوى ───────── */

// const ui = {
//   ar: {
//     demo: "جرب العرض",
//     plans: "الخطط والأسعار",
//     prev: "السابق",
//     next: "التالي",
//     switchTo: "English",
//     portals: [
//       "بوابة التجربة الافتراضية",
//       "بوابة تقنيات الذكاء الاصطناعي",
//       "بوابة نوفاغيرس للواقع المعزز والافتراضي",
//       "بوابة تقنيات العرض",
//     ],
//   },
//   en: {
//     demo: "Try the demo",
//     plans: "Plans & pricing",
//     prev: "Previous",
//     next: "Next",
//     switchTo: "العربية",
//     portals: [
//       "Virtual Try-On Portal",
//       "AI Technologies Portal",
//       "Novagates AR & VR Portal",
//       "Display Technologies Portal",
//     ],
//   },
// } as const;

// const catalog: Category[] = [
//   {
//     id: "lips",
//     heading: { ar: "التجربة الافتراضية لمكياج الشفاه", en: "Virtual Lip Makeup Try-On" },
//     cards: [
//       c("lipstick", "تجربة أحمر الشفاه الافتراضية", "Virtual Lipstick Try-On", [
//         f("درجات متعددة", "جرّب مئات الدرجات بلمسة واحدة.", "Wide shade range", "Try hundreds of shades in one tap."),
//         f("تطبيق دقيق", "يلتزم اللون بحدود الشفاه بدقة.", "Precise application", "Color follows the lip line accurately."),
//         f("عرض واقعي", "يعرض اللمعان والتشطيب كما في الحقيقة.", "Realistic preview", "Shows true shine and finish."),
//       ]),
//       c("lipliner", "تجربة كونتور الشفاه الافتراضية", "Virtual Lip Liner Try-On", [
//         f("رسم حدود الشفاه", "خط محدد يتبع شكل الشفاه.", "Defined lip line", "A liner that follows your lip shape."),
//         f("تدرج مع اللون", "دمج الكونتور مع أحمر الشفاه بسلاسة.", "Blends with lipstick", "Merge liner and lipstick smoothly."),
//         f("ثبات مع الحركة", "يبقى الخط في مكانه أثناء الكلام.", "Stays in place", "Holds steady while talking."),
//       ]),
//       c("plumper", "تجربة تضخيم الشفاه الافتراضية", "Virtual Lip Plumper Try-On", [
//         f("تكبير قابل للتعديل", "معاينة فورية لحجم الشفاه.", "Adjustable plumping", "Instant preview of lip volume."),
//         f("دقة بالذكاء الاصطناعي", "يتكيّف مع شكل الشفاه ونسبها.", "AI-powered accuracy", "Adapts to lip shape and proportions."),
//         f("محاكاة واقعية", "نتيجة ناعمة تحاكي الحقيقة.", "Realistic simulation", "A soft, true-to-life result."),
//       ]),
//       c("liptint", "تجربة تينت الشفاه الافتراضية", "Virtual Lip Tint Try-On", [
//         f("شفافية قابلة للتحكم", "من لمسة خفيفة إلى لون مشبع.", "Adjustable sheerness", "From light wash to rich color."),
//         f("لمسة طبيعية", "يحافظ على ملمس الشفاه الطبيعي.", "Natural finish", "Keeps the natural lip texture."),
//         f("تبديل فوري", "غيّر الدرجة على الشفاه مباشرة.", "Instant switching", "Swap shades live on your lips."),
//       ]),
//       c("lipgloss", "تجربة ملمّع الشفاه الافتراضية", "Virtual Lip Gloss Try-On", [
//         f("محرك انعكاس لامع", "يعيد إنشاء لمعان كل تركيبة بدقة.", "Glossy reflection engine", "Recreates the shine of each formula."),
//         f("انعكاسات ديناميكية", "تتكيّف مع الحركة والإضاءة فورًا.", "Dynamic reflections", "Adapt to movement and light live."),
//         f("محاكي الترطيب", "تصوّر الرطوبة والقوام قبل الشراء.", "Hydration simulator", "See moisture and texture before buying."),
//       ]),
//     ],
//   },
//   {
//     id: "eyes",
//     heading: { ar: "التجربة الافتراضية لمكياج العيون", en: "Virtual Eye Makeup Try-On" },
//     cards: [
//       c("eyeshadow", "تجربة ظلال العيون الافتراضية", "Virtual Eyeshadow Try-On", [
//         f("تدرجات ناعمة", "دمج الألوان على الجفن بشكل واقعي.", "Smooth gradients", "Blends shades realistically on the lid."),
//         f("لمعة دقيقة", "يحاكي الشمر والتشطيب المطفي والمعدني.", "Precise shimmer", "Simulates shimmer, matte and metallic."),
//         f("تتبع العين", "يثبت الظل مع الرمش وحركة النظر.", "Eye tracking", "Stays put through blinks and gaze shifts."),
//       ]),
//       c("kohl", "تجربة كحل العيون الافتراضية", "Virtual Eyeliner Try-On", [
//         f("أشكال متعددة", "كات آي وخط رفيع وجناح طويل.", "Multiple styles", "Cat-eye, thin line and long wing."),
//         f("تطبيق دقيق", "يتبع خط الرموش بدقة عالية.", "Precise application", "Follows the lash line accurately."),
//         f("ثبات مع الحركة", "يبقى مضبوطًا مع الرمش وتحريك الرأس.", "Moves with you", "Accurate through blinks and head motion."),
//       ]),
//       c("mascara", "تجربة الماسكارا الافتراضية", "Virtual Mascara Try-On", [
//         f("كثافة وطول", "قارن بين أنواع الماسكارا فورًا.", "Volume & length", "Compare mascara effects instantly."),
//         f("ألوان متعددة", "أسود وبني وألوان جريئة.", "Many colors", "Black, brown and bold shades."),
//         f("نتيجة طبيعية", "تفاصيل الرموش تبدو حقيقية.", "Natural result", "Individual lashes look real."),
//       ]),
//       c("lashes", "تجربة الرموش الافتراضية", "Virtual Lashes Try-On", [
//         f("أحجام مختلفة", "من الطبيعية إلى الكثيفة والمنفوشة.", "Different sizes", "From natural to volume and fluffy."),
//         f("تناسب العين", "تتكيّف مع شكل العين وحجمها.", "Fits your eye", "Adapts to eye shape and size."),
//         f("عرض فوري", "غيّر النمط بلمسة واحدة.", "Instant preview", "Switch styles in one tap."),
//       ]),
//       c("brows", "تجربة الحواجب الافتراضية", "Virtual Brows Try-On", [
//         f("أشكال وسماكات", "اختر الشكل الأنسب لملامحك.", "Shapes & thicknesses", "Pick the shape that suits your face."),
//         f("ألوان طبيعية", "درجات تتناسب مع الشعر والبشرة.", "Natural colors", "Shades that match hair and skin."),
//         f("ملمس حقيقي", "يحاكي الشعيرات الفردية.", "Lifelike texture", "Simulates individual hairs."),
//       ]),
//     ],
//   },
//   {
//     id: "face",
//     heading: { ar: "التجربة الافتراضية لمكياج الوجه", en: "Virtual Face Makeup Try-On" },
//     cards: [
//       c("foundation", "تجربة كريم الأساس الافتراضية", "Virtual Foundation Try-On", [
//         f("مطابقة البشرة", "يقترح الدرجة الأنسب للون البشرة.", "Skin matching", "Suggests the best shade for your tone."),
//         f("تغطية قابلة للتعديل", "من الخفيفة إلى الكاملة.", "Adjustable coverage", "From light to full coverage."),
//         f("مطفي أو متوهج", "قارن التشطيبات في ثوانٍ.", "Matte or dewy", "Compare finishes in seconds."),
//       ]),
//       c("concealer", "تجربة الكونسيلر الافتراضية", "Virtual Concealer Try-On", [
//         f("إخفاء العيوب", "تغطية طبيعية للهالات والعيوب.", "Natural coverage", "Conceals dark circles and blemishes."),
//         f("درجات دقيقة", "اختر الدرجة المطابقة لبشرتك.", "Precise shades", "Choose the shade matching your skin."),
//         f("دمج ناعم", "حواف متداخلة بدون خطوط واضحة.", "Soft blending", "Seamless edges, no harsh lines."),
//       ]),
//       c("corrector", "تجربة المصحح الافتراضية", "Virtual Color Corrector Try-On", [
//         f("تصحيح الألوان", "يعادل الاحمرار والهالات.", "Color correction", "Neutralizes redness and dark circles."),
//         f("تحكم بالكثافة", "اضبط قوة التصحيح كما تريد.", "Intensity control", "Adjust correction strength."),
//         f("نتيجة متناسقة", "يتناغم مع باقي مكياج الوجه.", "Cohesive result", "Blends with the rest of the face."),
//       ]),
//       c("blush", "تجربة أحمر الخدود الافتراضية", "Virtual Blush Try-On", [
//         f("تدرج طبيعي", "توزيع اللون على الخدود بنعومة.", "Natural gradient", "Color diffuses softly across the cheeks."),
//         f("شدة قابلة للتحكم", "من إطلالة يومية إلى مسائية.", "Adjustable intensity", "From everyday to evening looks."),
//         f("ألوان متناسقة", "تنسيق مع باقي الإطلالة.", "Harmonized shades", "Coordinates with the full look."),
//       ]),
//       c("contour", "تجربة الكونتور الافتراضية", "Virtual Contour Try-On", [
//         f("نحت دقيق", "يتبع ملامح الوجه لتوزيع صحيح.", "Precise sculpting", "Follows facial features for placement."),
//         f("درجات مناسبة", "اختيار الدرجة الأنسب للبشرة.", "Matching shades", "Picks the best shade for your skin."),
//         f("تحكم بالكثافة", "من خفيف إلى مكثّف.", "Intensity control", "From subtle to strong."),
//       ]),
//       c("highlighter", "تجربة الهايلايتر الافتراضية", "Virtual Highlighter Try-On", [
//         f("توهج واقعي", "لمعان ناعم على عظام الوجه.", "Realistic glow", "A soft shine on the cheekbones."),
//         f("دمج ناعم", "ينسجم مع الإضاءة المحيطة.", "Soft blending", "Responds to ambient light."),
//         f("ألوان متعددة", "ذهبي وفضي ولؤلؤي.", "Many tones", "Gold, silver and pearl."),
//       ]),
//       c("bronzer", "تجربة البرونزر الافتراضية", "Virtual Bronzer Try-On", [
//         f("سمرة طبيعية", "لمسة دافئة تحاكي الشمس.", "Sun-kissed look", "A warm, sunlit glow."),
//         f("تحكم بالدرجة", "اختر من الفاتح إلى الداكن.", "Shade control", "Choose from light to deep."),
//         f("توزيع متوازن", "يتوزع بدقة على الوجه.", "Balanced placement", "Applied evenly across the face."),
//       ]),
//     ],
//   },
// ];

// /* ───────── المكوّنات ───────── */

// const CARD_W = 300;
// const GAP = 16;

// function CheckIcon() {
//   return (
//     <span className="grid size-5 shrink-0 place-items-center rounded-full border border-emerald-500 text-emerald-500" aria-hidden>
//       <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3">
//         <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     </span>
//   );
// }

// function CardView({ card, locale }: { card: Card; locale: Locale }) {
//   const text = ui[locale];
//   return (
//     <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface">
//       <span
//         aria-hidden
//         className="absolute inset-x-4 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
//       />

//       {/* الصورة مع خط المقارنة قبل/بعد */}
//       <div className="relative m-3 aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface-2">
//         <Image
//           src={`/images/makeup/${card.id}.jpg`}
//           alt={card.title[locale]}
//           fill
//           sizes="300px"
//           className="object-cover"
//         />
//         <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-white/60" />
//       </div>

//       <div className="flex flex-1 flex-col px-4 pb-4 pt-1">
//         <h3 className="mb-4 text-[15px] font-semibold text-fg">{card.title[locale]}</h3>

//         <ul className="flex-1 space-y-3">
//           {card.features.map((ft) => (
//             <li key={ft.t.en}>
//               <div className="flex items-center gap-2">
//                 <CheckIcon />
//                 <span className="text-sm font-medium text-fg">{ft.t[locale]}</span>
//               </div>
//               <p className="mt-1 ps-7 text-[11px] leading-5 text-muted">{ft.d[locale]}</p>
//             </li>
//           ))}
//         </ul>

//         <div className="mt-5 grid grid-cols-2 gap-2">
//           <Link
//             href={`/demo/${card.id}`}
//             className="rounded-md border border-line border-b-sky-500 bg-bg py-2.5 text-center text-xs text-fg transition-colors hover:bg-surface-2"
//           >
//             {text.demo}
//           </Link>
//           <Link
//             href="/pricing"
//             className="rounded-md border border-line border-b-orange-500 bg-bg py-2.5 text-center text-xs text-fg transition-colors hover:bg-surface-2"
//           >
//             {text.plans}
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// }

// function CategoryRow({ category, locale }: { category: Category; locale: Locale }) {
//   const trackRef = useRef<HTMLUListElement>(null);
//   const isRtl = locale === "ar";
//   const sign = isRtl ? -1 : 1; // scrollLeft سالب في RTL
//   const text = ui[locale];

//   const go = (d: 1 | -1) =>
//     trackRef.current?.scrollBy({ left: sign * d * (CARD_W + GAP), behavior: "smooth" });

//   const Arrow = ({ forward }: { forward: boolean }) => (
//     <button
//       onClick={() => go(forward ? 1 : -1)}
//       aria-label={forward ? text.next : text.prev}
//       className={[
//         "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-fg shadow-lg transition-colors hover:border-accent hover:text-accent md:grid",
//         forward ? "-end-3" : "-start-3",
//       ].join(" ")}
//     >
//       <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
//         <path d={forward === isRtl ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
//       </svg>
//     </button>
//   );

//   return (
//     <section aria-label={category.heading[locale]} className="py-6">
//       <h2 className="mb-5 text-xl font-bold text-fg sm:text-2xl">{category.heading[locale]}</h2>

//       <div className="relative">
//         <Arrow forward={false} />
//         <Arrow forward />

//         <ul
//           ref={trackRef}
//           className="flex snap-x snap-mandatory items-stretch overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//           style={{ gap: GAP }}
//         >
//           {category.cards.map((card) => (
//             <li key={card.id} className="shrink-0 snap-start" style={{ width: CARD_W }}>
//               <CardView card={card} locale={locale} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }

// /* ───────── الصفحة ───────── */

// export default function Page() {
//   const [locale, setLocale] = useState<Locale>("ar");
//   const text = ui[locale];

//   return (
//     <main dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} className="px-5 py-10">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
//           <nav aria-label="portals" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
//             {text.portals.map((p) => (
//               <Link key={p} href="#" className="transition-colors hover:text-accent">
//                 {p}
//               </Link>
//             ))}
//           </nav>

//           <button
//             onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
//             className="rounded-md border border-line bg-surface px-3 py-2 text-sm text-fg transition-colors hover:bg-surface-2"
//           >
//             {text.switchTo}
//           </button>
//         </div>

//         {catalog.map((cat) => (
//           <CategoryRow key={cat.id} category={cat} locale={locale} />
//         ))}
//       </div>
//     </main>
//   );
// }


// 12///////////////////////////////////////////////////////////////////////////////////////////////////
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


// "use client";

// import { useLanguage } from "@/app/context/LanguageContext";

// const images = [
//   "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=900&q=85",
//   "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=900&q=85",
//   "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85",
//   "https://images.unsplash.com/photo-1541643600914-78b084683601?w=900&q=85",
//   "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=85",
// ];

// export default function BeautyEditorial() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       className="relative overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
//     >
//       <div className="mx-auto max-w-[1550px] px-5 md:px-12">

//         {/* Top Label */}
//         <div className="mb-16 flex items-center justify-between border-b border-emerald-900/15 pb-5 dark:border-white/10">
//           <span className="text-[11px] tracking-[0.35em] text-emerald-700 dark:text-emerald-400">
//             ORVELIA / BEAUTY JOURNAL
//           </span>

//           <span className="text-xs text-slate-500 dark:text-gray-500">
//             2026 — {isArabic ? "عالم الجمال" : "THE BEAUTY EDIT"}
//           </span>
//         </div>

//         {/* Editorial Title */}
//         <div className="relative mb-16">
//           <p className="mb-5 text-xs font-semibold tracking-[0.3em] text-emerald-600 dark:text-emerald-400">
//             {isArabic ? "الجمال برؤية جديدة" : "A NEW PERSPECTIVE"}
//           </p>

//           <h2 className="relative z-10 text-[clamp(3.5rem,10vw,9rem)] font-semibold leading-[1.05] tracking-[-0.06em]">
//             {isArabic ? "BEAUTY" : "BEAUTY"}
//             <span className="block text-right font-light italic text-emerald-600 dark:text-emerald-400">
//               {isArabic ? "بلا حدود." : "UNDEFINED."}
//             </span>
//           </h2>

//           <div className="absolute -right-3 top-0 h-40 w-40 rounded-full bg-emerald-400/10 blur-[80px]" />
//         </div>

//         {/* Asymmetric Image Composition */}
//         <div className="relative grid grid-cols-12 items-start gap-3 md:gap-6">

//           {/* Main Image */}
//           <div className="col-span-7 md:col-span-6">
//             <div className="group relative h-[330px] overflow-hidden md:h-[600px]">
//               <img
//                 src={images[0]}
//                 alt="Beauty editorial"
//                 className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
//             </div>

//             <div className="mt-5 flex items-center justify-between">
//               <span className="text-[10px] tracking-[0.25em] text-emerald-700 dark:text-emerald-400">
//                 01 / SKIN & BEAUTY
//               </span>
//               <span className="text-xl text-emerald-600 dark:text-emerald-400">✳</span>
//             </div>
//           </div>

//           {/* Secondary Composition */}
//           <div className="col-span-5 mt-16 md:col-span-6 md:mt-32">
//             <div className="group relative h-[210px] overflow-hidden md:ml-auto md:h-[380px] md:w-[78%]">
//               <img
//                 src={images[1]}
//                 alt="Skincare"
//                 className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
//               />
//             </div>

//             <div className="my-8 max-w-sm">
//               <h3 className="mb-3 text-xl font-semibold md:text-3xl">
//                 {isArabic ? "الجمال يبدأ من التفاصيل" : "Beauty lives in details"}
//               </h3>
//               <p className="text-xs leading-7 text-slate-600 dark:text-gray-400 md:text-sm">
//                 {isArabic
//                   ? "نظرة مختلفة للعناية والجمال، حيث تلتقي التفاصيل الدقيقة مع الابتكار."
//                   : "A different vision of beauty, where thoughtful details meet innovation."}
//               </p>
//             </div>

//             <div className="group relative h-[180px] overflow-hidden md:h-[280px] md:w-[65%]">
//               <img
//                 src={images[2]}
//                 alt="Makeup editorial"
//                 className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Editorial Statement */}
//         <div className="my-24 flex flex-col items-center text-center md:my-36">
//           <span className="mb-7 text-4xl font-light text-emerald-600 dark:text-emerald-400">
//             ✳
//           </span>

//           <h3 className="max-w-5xl text-3xl font-light leading-[1.6] md:text-6xl">
//             {isArabic ? (
//               <>
//                 لسنا هنا لنغيّر مفهوم الجمال،
//                 <span className="font-semibold text-emerald-600 dark:text-emerald-400">
//                   {" "}بل لنكتشفه من جديد.
//                 </span>
//               </>
//             ) : (
//               <>
//                 We are not here to redefine beauty,
//                 <span className="font-semibold text-emerald-600 dark:text-emerald-400">
//                   {" "}but to discover it again.
//                 </span>
//               </>
//             )}
//           </h3>
//         </div>

//         {/* Horizontal Moving Images */}
//         <div className="relative overflow-hidden border-y border-emerald-900/15 py-7 dark:border-white/10">
//           <div className="flex w-max animate-[editorialMove_35s_linear_infinite] gap-5">
//             {[...images, ...images].map((image, index) => (
//               <div
//                 key={index}
//                 className="h-[150px] w-[220px] overflow-hidden md:h-[230px] md:w-[330px]"
//               >
//                 <img
//                   src={image}
//                   alt="Beauty inspiration"
//                   className="h-full w-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Closing */}
//         <div className="mt-16 flex items-center justify-between">
//           <span className="text-xs tracking-[0.3em] text-emerald-700 dark:text-emerald-400">
//             ORVELIA
//           </span>

//           <p className="text-xs text-slate-500 dark:text-gray-500">
//             {isArabic ? "الجمال بأسلوب مختلف" : "BEAUTY IN A DIFFERENT WAY"}
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes editorialMove {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>
//     </section>
//   );
// }
