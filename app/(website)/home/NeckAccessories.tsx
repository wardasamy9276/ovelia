// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useCallback, useEffect, useState } from "react";
// import { useLanguage } from "@/app/context/LanguageContext";

// type Item = {
//   id: string;
//   titleAr: string;
//   titleEn: string;
//   taglineAr: string;
//   taglineEn: string;
//   descriptionAr: string;
//   descriptionEn: string;
//   featuresAr: string[];
//   featuresEn: string[];
//   image: string;
//   demoHref: string;
//   howHref: string;
// };

// const items: Item[] = [
//   {
//     id: "pendant",
//     titleAr: "تجربة القلائد الافتراضية",
//     titleEn: "Virtual Pendant Try-On",
//     taglineAr: "اجعل كل قلادة تروي قصتها",
//     taglineEn: "Let Every Pendant Tell Its Story",
//     descriptionAr:
//       "يتيح هذا الحل للمستخدم تجربة القلائد ذات المعلّقات، ورؤية موضعها بدقة على الرقبة والصدر مع كل حركة.",
//     descriptionEn:
//       "This solution allows users to virtually try on pendant necklaces and see how they fit around the neck and chest with every movement.",
//     featuresAr: [
//       "محاكاة واقعية لتصميم المعلّق",
//       "تفاعل طبيعي مع الجسم والحركة",
//       "دعم أطوال وأحجام متعددة",
//     ],
//     featuresEn: [
//       "Realistic pendant design simulation",
//       "Natural body and movement interaction",
//       "Support for multiple lengths and sizes",
//     ],
//     image: "/assets/imgs/mix&match-v2.webp",
//     demoHref: "/demo/pendants",
//     howHref: "/how-it-works",
//   },
//   {
//     id: "necklace",
//     titleAr: "تجربة العقود الافتراضية",
//     titleEn: "Virtual Necklace Try-On",
//     taglineAr: "القطعة التي تكمل إطلالتك",
//     taglineEn: "The Perfect Piece to Complete Your Look",
//     descriptionAr:
//       "تتيح هذه التقنية للمستخدم تجربة العقود المتدلية، ورؤية مدى تناسقها مع فتحة الرقبة ونوع الملابس بدقة عالية.",
//     descriptionEn:
//       "This technology allows users to try on different necklaces virtually and see how they complement necklines and clothing styles with high precision.",
//     featuresAr: [
//       "تجربة غامرة ومخصصة",
//       "دعم كامل للتبديل بين الأشكال والخامات",
//       "لا حاجة لتحميل تطبيق",
//     ],
//     featuresEn: [
//       "Immersive and personalized experience",
//       "Easy switching between styles and materials",
//       "No app download required",
//     ],
//     image: "/assets/slider/images2.jpg",
//     demoHref: "/demo/necklaces",
//     howHref: "/how-it-works",
//   },
//   {
//     id: "choker",
//     titleAr: "تجربة أطواق الرقبة الافتراضية",
//     titleEn: "Virtual Choker Try-On",
//     taglineAr: "أناقة تلتف حول الرقبة",
//     taglineEn: "Elegance Around Your Neck",
//     descriptionAr:
//       "جرّب الأطواق الملاصقة للرقبة بمقاسات مختلفة، وشاهد كيف تتناسب مع شكل الرقبة وتسريحة الشعر.",
//     descriptionEn:
//       "Try on close-fitting chokers in different sizes and see how they complement your neck shape and hairstyle.",
//     featuresAr: [
//       "تثبيت دقيق على الرقبة",
//       "ضبط المقاس والسماكة",
//       "ألوان وخامات متعددة",
//     ],
//     featuresEn: [
//       "Precise neck positioning",
//       "Adjustable sizes and thickness",
//       "Multiple colors and materials",
//     ],
//     image: "/assets/slider/images1.jpg",
//     demoHref: "/demo/chokers",
//     howHref: "/how-it-works",
//   },
//   {
//     id: "scarf",
//     titleAr: "تجربة الأوشحة والياقات الافتراضية",
//     titleEn: "Virtual Scarves & Collars Try-On",
//     taglineAr: "لمسة ناعمة تُكمل المظهر",
//     taglineEn: "A Soft Touch That Completes the Look",
//     descriptionAr:
//       "شاهد الأوشحة والياقات وهي تنسدل على الكتفين وتتحرك مع العميل بملمس يشبه القماش الحقيقي.",
//     descriptionEn:
//       "See scarves and collars drape over the shoulders and move naturally with the customer, creating a realistic fabric-like appearance.",
//     featuresAr: [
//       "محاكاة سقوط القماش",
//       "تبديل الألوان والنقوش",
//       "يعمل من المتصفح مباشرة",
//     ],
//     featuresEn: [
//       "Realistic fabric draping simulation",
//       "Switch between colors and patterns",
//       "Works directly in the browser",
//     ],
//     image: "/assets/slider/images2.jpg",
//     demoHref: "/demo/scarves",
//     howHref: "/how-it-works",
//   },
// ];

// export default function NeckAccessories() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";

//   const [active, setActive] = useState(1);

//   const go = useCallback(
//     (d: number) =>
//       setActive((a) => Math.min(items.length - 1, Math.max(0, a + d))),
//     []
//   );

//   const onKey = (e: React.KeyboardEvent) => {
//     if (e.key === "ArrowRight") go(-1);
//     if (e.key === "ArrowLeft") go(1);
//   };

//   useEffect(() => {
//     document.documentElement.style.overflowX = "clip";
//     return () => {
//       document.documentElement.style.overflowX = "";
//     };
//   }, []);

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       lang={language}
//       className="relative overflow-hidden px-5 py-20"
//       style={{ backgroundColor: "var(--color-bg-primary)" }}
//     >
//       <header className="mx-auto mb-12 max-w-3xl text-center">
//         <h2 className="text-3xl font-semibold sm:text-5xl" style={{ color: "var(--color-text-main)" }}>
//           {isArabic
//             ? "لمسات نهائية أنيقة بأسلوب ذكي"
//             : "Elegant Finishing Touches, Powered by Smart Technology"}
//         </h2>

//         <p className="mt-5 text-base leading-8 sm:text-lg" style={{ color: "var(--color-text-muted)" }}>
//           {isArabic
//             ? "كل ما يحتاجه عملاؤك لاستعراض إكسسوارات الرقبة بدقة وواقعية في منصة رقمية سلسة."
//             : "Everything your customers need to explore neck accessories with precision and realism through a seamless digital platform."}
//         </p>
//       </header>

//       <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
//         {/* الصورة */}
//         <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-lg lg:max-w-none">
//           <div
//             aria-hidden
//             className="absolute inset-x-10 bottom-0 top-10 -z-10 rounded-full blur-[100px]"
//             style={{ backgroundColor: "rgba(105, 123, 85, 0.15)" }}
//           />

//           {items.map((it, i) => (
//             <Image
//               key={it.id}
//               src={it.image}
//               alt={
//                 i === active
//                   ? isArabic
//                     ? it.titleAr
//                     : it.titleEn
//                   : ""
//               }
//               fill
//               priority={i === active}
//               sizes="(min-width:1024px) 50vw, 90vw"
//               className={[
//                 "object-contain object-bottom transition-opacity duration-700 [mask-image:linear-gradient(to_bottom,#000_82%,transparent)]",
//                 i === active ? "opacity-100" : "opacity-0",
//               ].join(" ")}
//             />
//           ))}
//         </div>

//         {/* الكاروسيل ثلاثي الأبعاد */}
//         <div
//           className="order-2"
//           role="region"
//           aria-roledescription="carousel"
//           aria-label={
//             isArabic ? "تجارب إكسسوارات الرقبة" : "Neck Accessories Experiences"
//           }
//           onKeyDown={onKey}
//         >
//           <div
//             dir="ltr"
//             className="relative mx-auto h-[600px] max-w-[760px] [perspective:1500px]"
//           >
//             {items.map((it, i) => {
//               const offset = i - active;
//               const abs = Math.abs(offset);
//               const isActive = offset === 0;

//               return (
//                 <article
//                   key={it.id}
//                   dir={isArabic ? "rtl" : "ltr"}
//                   aria-hidden={!isActive}
//                   onClick={() => !isActive && setActive(i)}
//                   className={[
//                     "absolute left-1/2 top-0 flex h-[590px] w-[min(82vw,330px)] flex-col rounded-2xl border p-6 text-center backdrop-blur transition-all duration-700 ease-out",
//                     isActive
//                       ? "shadow-2xl"
//                       : "cursor-pointer",
//                   ].join(" ")}
//                   style={{
//                     backgroundColor: "var(--color-bg-card)",
//                     borderColor: isActive ? "#697B55" : "var(--color-border)",
//                     transform: `translateX(-50%) translateX(${offset * 78}%) translateZ(${-abs * 120}px) rotateY(${-offset * 30}deg)`,
//                     opacity: abs > 1 ? 0 : isActive ? 1 : 0.55,
//                     zIndex: 10 - abs,
//                     pointerEvents: abs > 1 ? "none" : "auto",
//                   }}
//                 >
//                   <h3 className="text-xl font-bold leading-9" style={{ color: "var(--color-text-main)" }}>
//                     {isArabic ? it.titleAr : it.titleEn}
//                   </h3>

//                   <p className="mt-2 text-xs" style={{ color: "#697B55" }}>
//                     {isArabic ? it.taglineAr : it.taglineEn}
//                   </p>

//                   <p className="mt-3 text-xs leading-7" style={{ color: "var(--color-text-muted)" }}>
//                     {isArabic ? it.descriptionAr : it.descriptionEn}
//                   </p>

//                   <h4 className="mb-4 mt-8 text-lg font-semibold" style={{ color: "var(--color-text-main)" }}>
//                     {isArabic ? "المميزات الأساسية" : "Key Features"}
//                   </h4>

//                   <ul
//                     className={`space-y-3 text-xs ${
//                       isArabic ? "text-right" : "text-left"
//                     }`}
//                     style={{ color: "var(--color-text-muted)" }}
//                   >
//                     {(isArabic ? it.featuresAr : it.featuresEn).map(
//                       (feature, index) => (
//                         <li key={index} className="flex items-center gap-2">
//                           <span style={{ color: "#697B55" }}>✦</span> {feature}
//                         </li>
//                       )
//                     )}
//                   </ul>

//                   <div className="mt-auto space-y-3">
//                     <Link
//                       href={it.demoHref}
//                       tabIndex={isActive ? 0 : -1}
//                       className="block rounded-lg border py-3.5 text-sm transition-colors"
//                       style={{
//                         backgroundColor: "var(--color-bg-primary)",
//                         borderColor: "var(--color-border)",
//                         borderBottomColor: "#697B55",
//                         color: "var(--color-text-main)"
//                       }}
//                     >
//                       {isArabic ? "اكتشف التقنية" : "Explore the Technology"}
//                     </Link>

//                     <Link
//                       href={it.howHref}
//                       tabIndex={isActive ? 0 : -1}
//                       className="block rounded-lg border py-3.5 text-sm transition-colors"
//                       style={{
//                         backgroundColor: "var(--color-bg-primary)",
//                         borderColor: "var(--color-border)",
//                         borderBottomColor: "#294B3B",
//                         color: "var(--color-text-main)"
//                       }}
//                     >
//                       {isArabic ? "كيف تعمل" : "How It Works"}
//                     </Link>
//                   </div>
//                 </article>
//               );
//             })}
//           </div>

//           {/* التحكم */}
//           <div dir="ltr" className="mt-4 flex items-center justify-center gap-5">
//             <button
//               onClick={() => go(-1)}
//               disabled={active === 0}
//               aria-label={isArabic ? "السابق" : "Previous"}
//               className="grid size-9 place-items-center rounded-full border transition-colors disabled:opacity-30"
//               style={{
//                 borderColor: "var(--color-border)",
//                 color: "var(--color-text-main)"
//               }}
//             >
//               ‹
//             </button>

//             <div
//               className="flex gap-2.5"
//               role="tablist"
//               aria-label={isArabic ? "اختيار التجربة" : "Choose an experience"}
//             >
//               {items.map((it, i) => (
//                 <button
//                   key={it.id}
//                   role="tab"
//                   aria-selected={i === active}
//                   aria-label={isArabic ? it.titleAr : it.titleEn}
//                   onClick={() => setActive(i)}
//                   className={[
//                     "size-3 rounded-full transition-all",
//                     i === active ? "scale-125" : "opacity-50 hover:opacity-100",
//                   ].join(" ")}
//                   style={{
//                     backgroundColor: i === active ? "#697B55" : "var(--color-text-muted)"
//                   }}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={() => go(1)}
//               disabled={active === items.length - 1}
//               aria-label={isArabic ? "التالي" : "Next"}
//               className="grid size-9 place-items-center rounded-full border transition-colors disabled:opacity-30"
//               style={{
//                 borderColor: "var(--color-border)",
//                 color: "var(--color-text-main)"
//               }}
//             >
//               ›
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { neckAccessoriesItems as items } from "../home/data/NeckAccessoriesData"; // تأكد من مطابقة مسار الاستيراد لمكان ملف البيانات

export default function NeckAccessories() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [active, setActive] = useState(1);

  const go = useCallback(
    (d: number) =>
      setActive((a) => Math.min(items.length - 1, Math.max(0, a + d))),
    []
  );

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(-1);
    if (e.key === "ArrowLeft") go(1);
  };

  useEffect(() => {
    document.documentElement.style.overflowX = "clip";
    return () => {
      document.documentElement.style.overflowX = "";
    };
  }, []);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative overflow-hidden px-5 py-20"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold sm:text-5xl" style={{ color: "var(--color-text-main)" }}>
          {isArabic
            ? "لمسات نهائية أنيقة بأسلوب ذكي"
            : "Elegant Finishing Touches, Powered by Smart Technology"}
        </h2>

        <p className="mt-5 text-base leading-8 sm:text-lg" style={{ color: "var(--color-text-muted)" }}>
          {isArabic
            ? "كل ما يحتاجه عملاؤك لاستعراض إكسسوارات الرقبة بدقة وواقعية في منصة رقمية سلسة."
            : "Everything your customers need to explore neck accessories with precision and realism through a seamless digital platform."}
        </p>
      </header>

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        {/* الصورة */}
        <div className="relative order-1 mx-auto aspect-[4/5] w-full max-w-lg lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-x-10 bottom-0 top-10 -z-10 rounded-full blur-[100px]"
            style={{ backgroundColor: "rgba(105, 123, 85, 0.15)" }}
          />

          {items.map((it, i) => (
            <Image
              key={it.id}
              src={it.image}
              alt={
                i === active
                  ? isArabic
                    ? it.titleAr
                    : it.titleEn
                  : ""
              }
              fill
              priority={i === active}
              sizes="(min-width:1024px) 50vw, 90vw"
              className={[
                "object-contain object-bottom transition-opacity duration-700 [mask-image:linear-gradient(to_bottom,#000_82%,transparent)]",
                i === active ? "opacity-100" : "opacity-0",
              ].join(" ")}
            />
          ))}
        </div>

        {/* الكاروسيل ثلاثي الأبعاد */}
        <div
          className="order-2"
          role="region"
          aria-roledescription="carousel"
          aria-label={
            isArabic ? "تجارب إكسسوارات الرقبة" : "Neck Accessories Experiences"
          }
          onKeyDown={onKey}
        >
          <div
            dir="ltr"
            className="relative mx-auto h-[600px] max-w-[760px] [perspective:1500px]"
          >
            {items.map((it, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              const isActive = offset === 0;

              return (
                <article
                  key={it.id}
                  dir={isArabic ? "rtl" : "ltr"}
                  aria-hidden={!isActive}
                  onClick={() => !isActive && setActive(i)}
                  className={[
                    "absolute left-1/2 top-0 flex h-[590px] w-[min(82vw,330px)] flex-col rounded-2xl border p-6 text-center backdrop-blur transition-all duration-700 ease-out",
                    isActive
                      ? "shadow-2xl"
                      : "cursor-pointer",
                  ].join(" ")}
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    borderColor: isActive ? "#697B55" : "var(--color-border)",
                    transform: `translateX(-50%) translateX(${offset * 78}%) translateZ(${-abs * 120}px) rotateY(${-offset * 30}deg)`,
                    opacity: abs > 1 ? 0 : isActive ? 1 : 0.55,
                    zIndex: 10 - abs,
                    pointerEvents: abs > 1 ? "none" : "auto",
                  }}
                >
                  <h3 className="text-xl font-bold leading-9" style={{ color: "var(--color-text-main)" }}>
                    {isArabic ? it.titleAr : it.titleEn}
                  </h3>

                  <p className="mt-2 text-xs" style={{ color: "#697B55" }}>
                    {isArabic ? it.taglineAr : it.taglineEn}
                  </p>

                  <p className="mt-3 text-xs leading-7" style={{ color: "var(--color-text-muted)" }}>
                    {isArabic ? it.descriptionAr : it.descriptionEn}
                  </p>

                  <h4 className="mb-4 mt-8 text-lg font-semibold" style={{ color: "var(--color-text-main)" }}>
                    {isArabic ? "المميزات الأساسية" : "Key Features"}
                  </h4>

                  <ul
                    className={`space-y-3 text-xs ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {(isArabic ? it.featuresAr : it.featuresEn).map(
                      (feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span style={{ color: "#697B55" }}>✦</span> {feature}
                        </li>
                      )
                    )}
                  </ul>

                  <div className="mt-auto space-y-3">
                    <Link
                      href={it.demoHref}
                      tabIndex={isActive ? 0 : -1}
                      className="block rounded-lg border py-3.5 text-sm transition-colors"
                      style={{
                        backgroundColor: "var(--color-bg-primary)",
                        borderColor: "var(--color-border)",
                        borderBottomColor: "#697B55",
                        color: "var(--color-text-main)"
                      }}
                    >
                      {isArabic ? "اكتشف التقنية" : "Explore the Technology"}
                    </Link>

                    <Link
                      href={it.howHref}
                      tabIndex={isActive ? 0 : -1}
                      className="block rounded-lg border py-3.5 text-sm transition-colors"
                      style={{
                        backgroundColor: "var(--color-bg-primary)",
                        borderColor: "var(--color-border)",
                        borderBottomColor: "#294B3B",
                        color: "var(--color-text-main)"
                      }}
                    >
                      {isArabic ? "كيف تعمل" : "How It Works"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* التحكم */}
          <div dir="ltr" className="mt-4 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              disabled={active === 0}
              aria-label={isArabic ? "السابق" : "Previous"}
              className="grid size-9 place-items-center rounded-full border transition-colors disabled:opacity-30"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)"
              }}
            >
              ‹
            </button>

            <div
              className="flex gap-2.5"
              role="tablist"
              aria-label={isArabic ? "اختيار التجربة" : "Choose an experience"}
            >
              {items.map((it, i) => (
                <button
                  key={it.id}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={isArabic ? it.titleAr : it.titleEn}
                  onClick={() => setActive(i)}
                  className={[
                    "size-3 rounded-full transition-all",
                    i === active ? "scale-125" : "opacity-50 hover:opacity-100",
                  ].join(" ")}
                  style={{
                    backgroundColor: i === active ? "#697B55" : "var(--color-text-muted)"
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              disabled={active === items.length - 1}
              aria-label={isArabic ? "التالي" : "Next"}
              className="grid size-9 place-items-center rounded-full border transition-colors disabled:opacity-30"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-main)"
              }}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}