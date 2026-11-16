
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


"use client";

import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  Sparkles,
  ScanFace,
  Wand2,
  Droplets,
  CheckCircle2,
  ArrowUpRight,
  ArrowUpLeft,
  ShieldCheck,
  Cpu,
} from "lucide-react";

const features = [
  {
    id: "skin-analysis",
    tag: "01 / AI DIAGNOSTICS",
    icon: ScanFace,
    titleAr: "تحليل البشرة الذكي ثلاثي الأبعاد",
    titleEn: "3D Smart Skin Diagnostics",
    subtitleAr: "دقة تتجاوز 98% في رصد احتياجات بشرتك",
    subtitleEn: "Over 98% accuracy in detecting your skin's exact needs",
    descAr:
      "يقوم محرك الذكاء الاصطناعي في أورفيليا بمسح دقيق لمسام البشرة، مستويات الترطيب، والتصبغات في ثوانٍ معدودة ليمنحك تقريراً شاملاً ومخصصاً لحالتك.",
    descEn:
      "Orvelia's AI engine performs a deep scan of pores, hydration levels, and pigmentation in seconds to deliver a comprehensive, personalized skin report.",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=90",
    metrics: [
      { labelAr: "نسبة الترطيب", labelEn: "Hydration", value: "94%" },
      { labelAr: "نقاء البشرة", labelEn: "Clarity", value: "89%" },
      { labelAr: "مرونة الجلد", labelEn: "Elasticity", value: "92%" },
    ],
    pointsAr: [
      "رصد فوري لـ 14 مؤشراً حيوياً لصحة البشرة",
      "تتبع تطور نضارة بشرتك أسبوعياً بالصور",
      "توصيات خالية من المكونات المسببة للتحسس",
    ],
    pointsEn: [
      "Instant detection of 14 vital skin health indicators",
      "Weekly visual tracking of your skin glow progress",
      "Allergen-free personalized ingredient recommendations",
    ],
  },
  {
    id: "virtual-tryon",
    tag: "02 / AR STUDIO",
    icon: Wand2,
    titleAr: "استوديو المكياج الافتراضي الفوري",
    titleEn: "Real-Time Virtual Makeup Studio",
    subtitleAr: "جربي مئات الإطلالات بواقع معزز فائق الواقعية",
    subtitleEn: "Try hundreds of looks with ultra-realistic Augmented Reality",
    descAr:
      "اختبري درجات أحمر الشفاه، ظلال العيون، وكريم الأساس المتطابق مع لون بشرتك الفعلي في الوقت الحقيقي وبدون الحاجة لتجربة المنتجات تقليدياً.",
    descEn:
      "Test lipstick shades, eyeshadow palettes, and foundation tones matched to your exact skin undertone in real time before making a choice.",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=90",
    metrics: [
      { labelAr: "تطابق اللون", labelEn: "Shade Match", value: "99.2%" },
      { labelAr: "سرعة المعالجة", labelEn: "Latency", value: "12ms" },
      { labelAr: "إطلالة متاحة", labelEn: "Looks", value: "+450" },
    ],
    pointsAr: [
      "تتبع حركي دقيق لملامح الوجه حتى مع الإضاءة المتغيرة",
      "إمكانية مقارنة الإطلالة قبل وبعد بلمسة واحدة",
      "حفظ الإطلالات المفضلة ومشاركتها بجودة عالية",
    ],
    pointsEn: [
      "Precision facial landmark tracking across lighting conditions",
      "One-tap before & after split-screen comparison",
      "Save and export your favorite looks in high resolution",
    ],
  },
  {
    id: "custom-routine",
    tag: "03 / SMART CARE",
    icon: Droplets,
    titleAr: "تصميم روتين العناية المخصص",
    titleEn: "Bespoke Skincare Routine Builder",
    subtitleAr: "خطوات يومية ذكية تتكيف مع مناخك ونمط حياتك",
    subtitleEn: "Daily smart steps adapting to your climate & lifestyle",
    descAr:
      "نجمع بين نتائج تحليل بشرتك والعوامل البيئية المحيطة بك لبناء جدول عناية صباحي ومسائي متكامل يضمن لكِ نتائج ملموسة ومستدامة.",
    descEn:
      "We combine your skin diagnostic data with local environmental factors to craft a complete morning and evening regimen for lasting radiance.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=90",
    metrics: [
      { labelAr: "توافق المنتجات", labelEn: "Compatibility", value: "100%" },
      { labelAr: "نتائج ملموسة", labelEn: "Visible Glow", value: "14d" },
      { labelAr: "تحديث ذكي", labelEn: "AI Sync", value: "24/7" },
    ],
    pointsAr: [
      "ترتيب علمي دقيق لتطبيق السيروم والمرطبات",
      "تنبيهات ذكية لتجنب تعارض المكونات الفعالة",
      "تعديل تلقائي للروتين مع تغير فصول السنة",
    ],
    pointsEn: [
      "Scientifically ordered layering for serums and moisturizers",
      "Smart conflict alerts for active skincare ingredients",
      "Automatic seasonal adjustments for optimal protection",
    ],
  },
];

export default function BeautyFeaturesSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [selectedId, setSelectedId] = useState(features[0].id);

  const activeFeature =
    features.find((item) => item.id === selectedId) || features[0];
  const ActiveIcon = activeFeature.icon;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      {/* Background Glow & Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/4 top-20 h-[480px] w-[480px] rounded-full bg-emerald-400/15 blur-[150px] dark:bg-emerald-600/10" />
        <div className="absolute bottom-10 right-1/4 h-[450px] w-[450px] rounded-full bg-teal-400/15 blur-[150px] dark:bg-teal-800/15" />
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:38px_38px] opacity-[0.04] dark:opacity-[0.06]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 md:px-10">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-white/80 px-5 py-2.5 shadow-md backdrop-blur-md dark:border-emerald-500/20 dark:bg-[#081A12]">
            <Cpu className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-[11px] font-bold tracking-[3px] text-emerald-700 dark:text-emerald-400">
              {isArabic ? "تقنيات أورفيليا الذكية" : "ORVELIA SMART ECOSYSTEM"}
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight md:text-5xl">
            {isArabic ? (
              <>
                ابتكارات مصممة خصيصاً
                <span className="mt-2 block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-500 dark:to-teal-300">
                  لتفهم تفرد جمالك
                </span>
              </>
            ) : (
              <>
                Innovations Crafted To
                <span className="mt-2 block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-500 dark:to-teal-300">
                  Decode Your Unique Beauty
                </span>
              </>
            )}
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-slate-400 md:text-base">
            {isArabic
              ? "اختاري التقنية التي تودين استكشافها لتتعرفي على كيفية دمج الذكاء الاصطناعي في روتين جمالك اليومي."
              : "Select a technology below to explore how Orvelia integrates artificial intelligence into your daily beauty ritual."}
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;
            const isSelected = item.id === selectedId;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`group relative flex flex-col justify-between rounded-[26px] border p-6 text-start transition-all duration-500 ${
                  isSelected
                    ? "border-emerald-500/60 bg-white shadow-[0_18px_45px_rgba(16,185,129,0.14)] dark:border-emerald-400/50 dark:bg-[#081C14] dark:shadow-[0_0_40px_rgba(16,185,129,0.12)]"
                    : "border-emerald-900/10 bg-white/60 hover:border-emerald-500/30 hover:bg-white/90 dark:border-emerald-900/30 dark:bg-[#05110C]/70 dark:hover:border-emerald-500/30 dark:hover:bg-[#071710]"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 ${
                      isSelected
                        ? "border-emerald-400 bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                        : "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 group-hover:scale-105 dark:text-emerald-400"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="text-[10px] font-bold tracking-[2px] text-emerald-700/70 dark:text-emerald-400/70">
                    {item.tag}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-extrabold text-[#071A2F] dark:text-white md:text-xl">
                    {isArabic ? item.titleAr : item.titleEn}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-slate-400">
                    {isArabic ? item.subtitleAr : item.subtitleEn}
                  </p>
                </div>

                {/* Active Bottom Bar */}
                <div
                  className={`mt-5 h-[3px] rounded-full transition-all duration-500 ${
                    isSelected
                      ? "w-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_#10b981]"
                      : "w-10 bg-emerald-500/20 group-hover:w-20"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Main Showcase Card */}
        <div className="overflow-hidden rounded-[34px] border border-emerald-500/25 bg-white/90 shadow-[0_25px_70px_rgba(6,78,59,0.08)] backdrop-blur-xl transition-all duration-500 dark:border-emerald-500/20 dark:bg-[#06140E]/90 dark:shadow-[0_0_60px_rgba(16,185,129,0.08)]">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            {/* Content Side */}
            <div className="flex flex-col justify-between p-8 md:p-12 lg:col-span-7">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <ActiveIcon className="h-4 w-4" />
                  <span>{activeFeature.tag}</span>
                </div>

                <h3 className="mt-6 text-2xl font-black leading-snug text-[#071A2F] dark:text-white md:text-4xl">
                  {isArabic ? activeFeature.titleAr : activeFeature.titleEn}
                </h3>

                <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
                  {isArabic ? activeFeature.descAr : activeFeature.descEn}
                </p>

                {/* Bullet Points */}
                <ul className="mt-8 space-y-4">
                  {(isArabic
                    ? activeFeature.pointsAr
                    : activeFeature.pointsEn
                  ).map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-200 md:text-base">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA & Privacy Badge */}
              <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-emerald-900/10 pt-8 dark:border-emerald-500/15">
                <button
                  type="button"
                  className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_14px_35px_rgba(16,185,129,0.45)]"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    {isArabic ? "ابدئي التجربة الآن" : "Start Experience Now"}
                  </span>
                  {isArabic ? (
                    <ArrowUpLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" />
                  <span>
                    {isArabic
                      ? "خصوصية كاملة: لا يتم تخزين صورك أبداً"
                      : "100% Private: Your photos are never stored"}
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Preview Side */}
            <div className="relative min-h-[380px] overflow-hidden lg:col-span-5 lg:min-h-full">
              <img
                src={activeFeature.image}
                alt={isArabic ? activeFeature.titleAr : activeFeature.titleEn}
                className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030906]/90 via-[#030906]/25 to-transparent" />
              <div className="absolute inset-0 bg-emerald-500/10 mix-blend-color" />

              {/* AI Scanning Line Effect */}
              <div className="pointer-events-none absolute inset-x-6 top-1/3 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_20px_#10b981]" />

              {/* Top Live Status */}
              <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-emerald-400/30 bg-[#04120C]/80 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                <span className="text-[10px] font-bold tracking-[2px] text-emerald-200">
                  AI ENGINE ACTIVE
                </span>
              </div>

              {/* Floating Live Metrics */}
              <div className="absolute inset-x-5 bottom-5 grid grid-cols-3 gap-2.5">
                {activeFeature.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-emerald-400/25 bg-[#05150E]/85 p-3.5 text-center backdrop-blur-xl"
                  >
                    <div className="text-lg font-black text-emerald-400 md:text-xl">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold text-white/80 md:text-xs">
                      {isArabic ? metric.labelAr : metric.labelEn}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  );
}
