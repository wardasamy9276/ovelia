
// "use client";

// import Link from "next/link";
// import { useLanguage } from "@/app/context/LanguageContext";

// const categories = [
//   {
//     id: "01",
//     titleAr: "العناية بالبشرة",
//     titleEn: "Skin Care",
//     descAr: "اكتشفي أسرار البشرة الصحية والنضرة مع حلول العناية الذكية.",
//     descEn: "Discover the secrets of healthy, glowing skin with intelligent care solutions.",
//     image: "/assets/imgs/left.webp",
//     href: "/skin-care",
//     icon: "✧",
//   },
//   {
//     id: "02",
//     titleAr: "المكياج",
//     titleEn: "Makeup",
//     descAr: "عبّري عن جمالك بإطلالات مميزة تجمع بين الأناقة والإبداع.",
//     descEn: "Express your beauty with unique looks that combine elegance and creativity.",
//     image: "/assets/img/1790069732596-fe9a32ab43dffee47917a1f0d4f11448.png",
//     href: "/makeup",
//     icon: "✦",
//   },
//   {
//     id: "03",
//     titleAr: "العناية بالشعر",
//     titleEn: "Hair Care",
//     descAr: "رحلة متكاملة لشعر أكثر صحة ولمعانًا وحيوية.",
//     descEn: "A complete journey to healthier, shinier and more vibrant hair.",
//     image: "/assets/img/Untitled1.png",
//     href: "/hair-care",
//     icon: "❋",
//   },
//   {
//     id: "04",
//     titleAr: "العطور",
//     titleEn: "Fragrances",
//     descAr: "اختاري عطرك الخاص واتركي انطباعًا لا يُنسى.",
//     descEn: "Find your signature scent and leave an unforgettable impression.",
//     image: "/assets/img/Untitled3.png",
//     href: "/fragrances",
//     icon: "◇",
//   },
//   // {
//   //   id: "05",
//   //   titleAr: "العناية بالجسم",
//   //   titleEn: "Body Care",
//   //   descAr: "دلّلي بشرتك بروتين متكامل يمنح جسمك النعومة والترطيب.",
//   //   descEn: "Pamper your skin with a complete routine for softness and hydration.",
//   //   image: "/assets/img/body-care.png",
//   //   href: "/body-care",
//   //   icon: "❀",
//   // },
//   // {
//   //   id: "06",
//   //   titleAr: "منتجات الشفاه",
//   //   titleEn: "Lip Care",
//   //   descAr: "اكتشفي ألوانًا وتركيبات تمنح شفتيك الجمال والترطيب.",
//   //   descEn: "Explore shades and formulas that bring beauty and hydration to your lips.",
//   //   image: "/assets/img/lip-care.png",
//   //   href: "/lip-care",
//   //   icon: "♡",
//   // },
//   // {
//   //   id: "07",
//   //   titleAr: "العناية بالأظافر",
//   //   titleEn: "Nail Care",
//   //   descAr: "أضيفي لمسة من الأناقة لأظافرك مع العناية والجمال.",
//   //   descEn: "Add a touch of elegance to your nails with beauty and care.",
//   //   image: "/assets/img/nail-care.png",
//   //   href: "/nail-care",
//   //   icon: "✧",
//   // },
//   // {
//   //   id: "08",
//   //   titleAr: "أدوات التجميل",
//   //   titleEn: "Beauty Tools",
//   //   descAr: "اكتشفي أدوات مبتكرة تجعل روتين جمالك أسهل وأكثر احترافية.",
//   //   descEn: "Discover innovative tools that make your beauty routine easier and more professional.",
//   //   image: "/assets/img/beauty-tools.png",
//   //   href: "/beauty-tools",
//   //   icon: "✦",
//   // },

// ];

// export default function BeautyCategories() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       className="relative overflow-hidden bg-[#F1F4F2] px-5 py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:px-10 md:py-32"
//     >
//       {/* Background Decoration */}
//       <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-[120px] dark:bg-emerald-500/10" />
//       <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-teal-300/20 blur-[120px] dark:bg-teal-500/10" />

//       <div className="relative mx-auto max-w-[1450px]">
//         {/* Section Header */}
//         <div className="mb-14 text-center md:mb-20">
//           <span className="mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.35em] text-emerald-700 dark:text-emerald-400">
//             <span className="h-px w-8 bg-emerald-500" />
//             ORVELIA BEAUTY
//             <span className="h-px w-8 bg-emerald-500" />
//           </span>

//           <h2 className="mb-5 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
//             {isArabic ? (
//               <>
//                 اكتشفي عالم
//                 <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
//                   الجمال الذكي
//                 </span>
//               </>
//             ) : (
//               <>
//                 Explore the World of
//                 <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
//                   Intelligent Beauty
//                 </span>
//               </>
//             )}
//           </h2>

//           <p className="mx-auto max-w-2xl text-sm leading-8 text-slate-600 dark:text-gray-400 md:text-base">
//             {isArabic
//               ? "اختاري القسم المفضل لديك واكتشفي تجربة جديدة تجمع بين التكنولوجيا والجمال."
//               : "Choose your favorite category and discover a new experience combining technology and beauty."}
//           </p>
//         </div>

//         {/* Categories Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//           {categories.map((category) => (
//             <Link
//               href={category.href}
//               key={category.id}
//               className="group relative min-h-[430px] overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10 dark:border-emerald-400/10 dark:bg-[#071810] dark:hover:shadow-emerald-950/40"
//             >
//               {/* Image */}
//               <div className="absolute inset-0 overflow-hidden">
//                 <img
//                   src={category.image}
//                   alt={isArabic ? category.titleAr : category.titleEn}
//                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#03130D] via-[#03130D]/45 to-transparent" />
//               </div>

//               {/* Number */}
//               <span className="absolute left-6 top-6 z-10 text-sm font-semibold tracking-widest text-white/80">
//                 {category.id}
//               </span>

//               {/* Icon */}
//               <span className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-xl text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-12 group-hover:bg-emerald-500">
//                 {category.icon}
//               </span>

//               {/* Content */}
//               <div className="absolute inset-x-0 bottom-0 z-10 p-7 text-white">
//                 <div className="mb-4 h-[2px] w-10 bg-emerald-400 transition-all duration-500 group-hover:w-20" />

//                 <h3 className="mb-3 text-2xl font-bold">
//                   {isArabic ? category.titleAr : category.titleEn}
//                 </h3>

//                 <p className="mb-6 text-sm leading-7 text-white/75">
//                   {isArabic ? category.descAr : category.descEn}
//                 </p>

//                 <div className="flex items-center gap-3 text-sm font-semibold text-emerald-300 transition-all duration-300 group-hover:gap-5">
//                   <span>
//                     {isArabic ? "اكتشفي المزيد" : "Discover More"}
//                   </span>
//                   <span className="text-lg">
//                     {isArabic ? "←" : "→"}
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Bottom Text */}
//         <div className="mt-16 flex items-center justify-center gap-4 text-center">
//           <span className="h-px w-12 bg-emerald-500/40" />
//           <p className="text-xs font-medium tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
//             {isArabic
//               ? "جمالك يبدأ من هنا"
//               : "YOUR BEAUTY JOURNEY STARTS HERE"}
//           </p>
//           <span className="h-px w-12 bg-emerald-500/40" />
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { categories } from "../home/data/BeautyCategoriesData"; // تأكد من تعديل مسار الاستيراد بناءً على مكان ملف البيانات لديك

export default function BeautyCategories() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#F1F4F2] px-5 py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:px-10 md:py-32"
    >
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-emerald-300/20 blur-[120px] dark:bg-emerald-500/10" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-teal-300/20 blur-[120px] dark:bg-teal-500/10" />

      <div className="relative mx-auto max-w-[1450px]">
        {/* Section Header */}
        <div className="mb-14 text-center md:mb-20">
          <span className="mb-5 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.35em] text-emerald-700 dark:text-emerald-400">
            <span className="h-px w-8 bg-emerald-500" />
            ORVELIA BEAUTY
            <span className="h-px w-8 bg-emerald-500" />
          </span>

          <h2 className="mb-5 text-3xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {isArabic ? (
              <>
                اكتشفي عالم
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                  الجمال الذكي
                </span>
              </>
            ) : (
              <>
                Explore the World of
                <span className="block bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
                  Intelligent Beauty
                </span>
              </>
            )}
          </h2>

          <p className="mx-auto max-w-2xl text-sm leading-8 text-slate-600 dark:text-gray-400 md:text-base">
            {isArabic
              ? "اختاري القسم المفضل لديك واكتشفي تجربة جديدة تجمع بين التكنولوجيا والجمال."
              : "Choose your favorite category and discover a new experience combining technology and beauty."}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              href={category.href}
              key={category.id}
              className="group relative min-h-[430px] overflow-hidden rounded-[28px] border border-emerald-900/10 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-900/10 dark:border-emerald-400/10 dark:bg-[#071810] dark:hover:shadow-emerald-950/40"
            >
              {/* Image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={category.image}
                  alt={isArabic ? category.titleAr : category.titleEn}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03130D] via-[#03130D]/45 to-transparent" />
              </div>

              {/* Number */}
              <span className="absolute left-6 top-6 z-10 text-sm font-semibold tracking-widest text-white/80">
                {category.id}
              </span>

              {/* Icon */}
              <span className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/10 text-xl text-white backdrop-blur-md transition-all duration-300 group-hover:rotate-12 group-hover:bg-emerald-500">
                {category.icon}
              </span>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-7 text-white">
                <div className="mb-4 h-[2px] w-10 bg-emerald-400 transition-all duration-500 group-hover:w-20" />

                <h3 className="mb-3 text-2xl font-bold">
                  {isArabic ? category.titleAr : category.titleEn}
                </h3>

                <p className="mb-6 text-sm leading-7 text-white/75">
                  {isArabic ? category.descAr : category.descEn}
                </p>

                <div className="flex items-center gap-3 text-sm font-semibold text-emerald-300 transition-all duration-300 group-hover:gap-5">
                  <span>
                    {isArabic ? "اكتشفي المزيد" : "Discover More"}
                  </span>
                  <span className="text-lg">
                    {isArabic ? "←" : "→"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-16 flex items-center justify-center gap-4 text-center">
          <span className="h-px w-12 bg-emerald-500/40" />
          <p className="text-xs font-medium tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
            {isArabic
              ? "جمالك يبدأ من هنا"
              : "YOUR BEAUTY JOURNEY STARTS HERE"}
          </p>
          <span className="h-px w-12 bg-emerald-500/40" />
        </div>
      </div>
    </section>
  );
}
