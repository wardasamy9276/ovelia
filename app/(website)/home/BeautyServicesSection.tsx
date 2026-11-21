
// "use client";

// import Link from "next/link";
// import { useLanguage } from "@/app/context/LanguageContext";

// const services = [
//   {
//     number: "01",
//     icon: "✧",
//     titleAr: "العناية بالبشرة",
//     titleEn: "Skin Care",
//     descAr: "اكتشفي حلول العناية بالبشرة لتعزيز نضارتك وإبراز جمالك الطبيعي.",
//     descEn: "Discover skincare solutions to enhance your glow and natural beauty.",
//     href: "/ar/beauty/skincare",
//   },
//   {
//     number: "02",
//     icon: "◈",
//     titleAr: "الجمال الذكي",
//     titleEn: "Smart Beauty",
//     descAr: "تجربة تجميل مبتكرة تجمع بين الذكاء الاصطناعي وأحدث التقنيات.",
//     descEn: "Innovative beauty experiences powered by AI and modern technology.",
//     href: "/ar/gate/ai-tech",
//   },
//   {
//     number: "03",
//     icon: "❋",
//     titleAr: "اكتشاف المنتجات",
//     titleEn: "Product Discovery",
//     descAr: "اكتشفي منتجات الجمال التي تناسب احتياجاتك وتفضيلاتك.",
//     descEn: "Explore beauty products that match your needs and preferences.",
//     href: "/ar/beauty",
//   },
//   {
//     number: "04",
//     icon: "✦",
//     titleAr: "الواقع المعزز",
//     titleEn: "Augmented Reality",
//     descAr: "عيشي تجربة تفاعلية جديدة في عالم الجمال والتجميل.",
//     descEn: "Enjoy a new interactive experience in the world of beauty.",
//     href: "/ar/gate/ai-tech",
//   },
//   {
//     number: "05",
//     icon: "◎",
//     titleAr: "تحليل البشرة",
//     titleEn: "Skin Analysis",
//     descAr: "اكتشفي احتياجات بشرتك من خلال تجربة تحليل ذكية.",
//     descEn: "Discover your skin needs through an intelligent analysis experience.",
//     href: "/ar/beauty",
//   },
//   {
//     number: "06",
//     icon: "♢",
//     titleAr: "نصائح الجمال",
//     titleEn: "Beauty Tips",
//     descAr: "احصلي على أفكار ونصائح تساعدك في رحلة العناية بجمالك.",
//     descEn: "Get ideas and tips to support your personal beauty journey.",
//     href: "/ar/beauty",
//   },
//   {
//     number: "07",
//     icon: "❈",
//     titleAr: "تقنيات التجميل",
//     titleEn: "Beauty Technology",
//     descAr: "تعرفي على أحدث الابتكارات والتقنيات في عالم التجميل.",
//     descEn: "Discover the latest innovations and technologies in beauty.",
//     href: "/ar/gate/ai-tech",
//   },
//   {
//     number: "08",
//     icon: "✺",
//     titleAr: "تجربة ORVELIA",
//     titleEn: "ORVELIA Experience",
//     descAr: "استمتعي برحلة متكاملة تجمع بين الجمال والابتكار.",
//     descEn: "Enjoy a complete journey combining beauty and innovation.",
//     href: "/ar/beauty",
//   },
// ];

// export default function BeautyServicesSection() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       className="relative isolate overflow-hidden bg-[#F1F2F4] py-28 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white"
//     >
//       {/* Background */}
//       <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
//         <div className="absolute -right-40 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-300/30 blur-[130px] dark:bg-emerald-950/20" />

//         <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-green-400/25 blur-[130px] dark:bg-green-950/20" />

//         <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.07] dark:bg-[radial-gradient(#064e3b_1px,transparent_1px)] dark:opacity-[0.04]" />
//       </div>

//       <div className="relative mx-auto max-w-[1450px] px-6 md:px-12 lg:px-16">

//         {/* Heading */}
//         <div className="mx-auto mb-16 max-w-3xl text-center">
//           <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-[#FAFAFA] px-5 py-3 shadow-md dark:border-emerald-900/40 dark:bg-[#06150E] dark:shadow-lg dark:shadow-black/40">
//             <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />

//             <span className="text-xs font-bold tracking-[2px] text-emerald-800 dark:text-emerald-400">
//               {isArabic ? "اكتشفي خدماتنا" : "EXPLORE OUR SERVICES"}
//             </span>
//           </div>

//           <h2 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
//             {isArabic ? (
//               <>
//                 عالم متكامل من
//                 <br />
//                 <span className="bg-gradient-to-l from-[#047857] via-[#059669] to-[#10b981] bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-teal-300">
//                   الجمال والتكنولوجيا
//                 </span>
//               </>
//             ) : (
//               <>
//                 A Complete World of
//                 <br />
//                 <span className="bg-gradient-to-r from-[#047857] via-[#059669] to-[#10b981] bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-teal-300">
//                   Beauty & Technology
//                 </span>
//               </>
//             )}
//           </h2>

//           <p className="mx-auto mt-6 max-w-2xl text-base leading-9 text-slate-600 dark:text-slate-400 md:text-lg">
//             {isArabic
//               ? "اكتشفي خدمات ORVELIA المبتكرة، حيث يلتقي عالم الجمال بالتكنولوجيا الحديثة لنقدم لك تجربة استثنائية."
//               : "Explore ORVELIA's innovative services, where beauty meets modern technology to create an exceptional experience."}
//           </p>
//         </div>

//         {/* 8 Services Cards */}
//         <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
//           {services.map((service) => (
//             <Link
//               key={service.number}
//               href={
//                 isArabic
//                   ? service.href
//                   : service.href.replace("/ar/", "/en/")
//               }
//               className="group relative overflow-hidden rounded-[28px] border border-emerald-500/20 bg-[#FAFAFA] p-8 shadow-[0_15px_45px_rgba(6,26,18,0.07)] transition-all duration-500 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-[0_25px_60px_rgba(5,150,105,0.14)] dark:border-emerald-950/60 dark:bg-[#06120D] dark:shadow-[0_20px_50px_rgba(2,10,7,0.7)] dark:hover:border-emerald-600/50 dark:hover:bg-[#081812] dark:hover:shadow-[0_25px_60px_rgba(4,47,31,0.4)]"
//             >
//               {/* Card Number */}
//               <span className="absolute left-7 top-7 text-xs font-bold tracking-widest text-slate-400 transition-colors duration-300 group-hover:text-emerald-600 dark:text-emerald-600/70 dark:group-hover:text-emerald-400">
//                 {service.number}
//               </span>

//               {/* Icon */}
//               <div className="mb-9 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-[#061A12] via-[#0B291D] to-[#047857] text-4xl text-emerald-300 shadow-xl shadow-emerald-950/30 transition-all duration-500 group-hover:scale-0 group-hover:rotate-180 group-hover:opacity-0 dark:border-emerald-900/40 dark:from-[#04120D] dark:via-[#071F16] dark:to-[#022c22] dark:text-emerald-300 dark:shadow-black/60">
//                 {service.icon}
//               </div>

//               {/* Title */}
//               <h3 className="mb-4 text-xl font-black text-[#071A2F] transition-colors duration-300 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-300">
//                 {isArabic ? service.titleAr : service.titleEn}
//               </h3>

//               {/* Description */}
//               <p className="min-h-[100px] text-sm leading-8 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300">
//                 {isArabic ? service.descAr : service.descEn}
//               </p>

//               {/* Discover More */}
//               <div className="mt-7 flex items-center gap-3 text-sm font-bold text-emerald-800 transition-all duration-300 group-hover:gap-5 group-hover:text-emerald-600 dark:text-emerald-400 dark:group-hover:text-emerald-300">
//                 {isArabic ? "اكتشفي المزيد" : "Discover More"}

//                 <span className="text-lg">
//                   {isArabic ? "←" : "→"}
//                 </span>
//               </div>

//               {/* Hover Glow */}
//               <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/0 blur-[60px] transition-all duration-500 group-hover:bg-emerald-500/10" />

//               {/* Top Line */}
//               <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-full" />
//             </Link>
//           ))}
//         </div>

//         {/* Bottom Message */}
//         <div className="mt-16 text-center">
//           <p className="text-sm font-bold tracking-wide text-emerald-800 dark:text-emerald-500/80">
//             {isArabic
//               ? "ORVELIA — حيث يلتقي الجمال بالابتكار"
//               : "ORVELIA — WHERE BEAUTY MEETS INNOVATION"}
//           </p>
//         </div>
//       </div>

//       {/* Bottom Line */}
//       <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent dark:via-emerald-800/50" />
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { services } from "../home/data/BeautyServicesSection"; // تأكد من تعديل مسار الاستيراد بناءً على مكان ملف البيانات لديك

export default function BeautyServicesSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[#F1F2F4] py-28 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-32 h-[450px] w-[450px] rounded-full bg-emerald-300/30 blur-[130px] dark:bg-emerald-950/20" />

        <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-green-400/25 blur-[130px] dark:bg-green-950/20" />

        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.07] dark:bg-[radial-gradient(#064e3b_1px,transparent_1px)] dark:opacity-[0.04]" />
      </div>

      <div className="relative mx-auto max-w-[1450px] px-6 md:px-12 lg:px-16">

        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-[#FAFAFA] px-5 py-3 shadow-md dark:border-emerald-900/40 dark:bg-[#06150E] dark:shadow-lg dark:shadow-black/40">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />

            <span className="text-xs font-bold tracking-[2px] text-emerald-800 dark:text-emerald-400">
              {isArabic ? "اكتشفي خدماتنا" : "EXPLORE OUR SERVICES"}
            </span>
          </div>

          <h2 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
            {isArabic ? (
              <>
                عالم متكامل من
                <br />
                <span className="bg-gradient-to-l from-[#047857] via-[#059669] to-[#10b981] bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-teal-300">
                  الجمال والتكنولوجيا
                </span>
              </>
            ) : (
              <>
                A Complete World of
                <br />
                <span className="bg-gradient-to-r from-[#047857] via-[#059669] to-[#10b981] bg-clip-text text-transparent dark:from-emerald-400 dark:via-emerald-500 dark:to-teal-300">
                  Beauty & Technology
                </span>
              </>
            )}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-9 text-slate-600 dark:text-slate-400 md:text-lg">
            {isArabic
              ? "اكتشفي خدمات ORVELIA المبتكرة، حيث يلتقي عالم الجمال بالتكنولوجيا الحديثة لنقدم لك تجربة استثنائية."
              : "Explore ORVELIA's innovative services, where beauty meets modern technology to create an exceptional experience."}
          </p>
        </div>

        {/* 8 Services Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Link
              key={service.number}
              href={
                isArabic
                  ? service.href
                  : service.href.replace("/ar/", "/en/")
              }
              className="group relative overflow-hidden rounded-[28px] border border-emerald-500/20 bg-[#FAFAFA] p-8 shadow-[0_15px_45px_rgba(6,26,18,0.07)] transition-all duration-500 hover:-translate-y-3 hover:border-emerald-500 hover:shadow-[0_25px_60px_rgba(5,150,105,0.14)] dark:border-emerald-950/60 dark:bg-[#06120D] dark:shadow-[0_20px_50px_rgba(2,10,7,0.7)] dark:hover:border-emerald-600/50 dark:hover:bg-[#081812] dark:hover:shadow-[0_25px_60px_rgba(4,47,31,0.4)]"
            >
              {/* Card Number */}
              <span className="absolute left-7 top-7 text-xs font-bold tracking-widest text-slate-400 transition-colors duration-300 group-hover:text-emerald-600 dark:text-emerald-600/70 dark:group-hover:text-emerald-400">
                {service.number}
              </span>

              {/* Icon */}
              <div className="mb-9 flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-[#061A12] via-[#0B291D] to-[#047857] text-4xl text-emerald-300 shadow-xl shadow-emerald-950/30 transition-all duration-500 group-hover:scale-0 group-hover:rotate-180 group-hover:opacity-0 dark:border-emerald-900/40 dark:from-[#04120D] dark:via-[#071F16] dark:to-[#022c22] dark:text-emerald-300 dark:shadow-black/60">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-black text-[#071A2F] transition-colors duration-300 group-hover:text-emerald-700 dark:text-slate-100 dark:group-hover:text-emerald-300">
                {isArabic ? service.titleAr : service.titleEn}
              </h3>

              {/* Description */}
              <p className="min-h-[100px] text-sm leading-8 text-slate-600 transition-colors duration-300 group-hover:text-slate-700 dark:text-slate-400 dark:group-hover:text-slate-300">
                {isArabic ? service.descAr : service.descEn}
              </p>

              {/* Discover More */}
              <div className="mt-7 flex items-center gap-3 text-sm font-bold text-emerald-800 transition-all duration-300 group-hover:gap-5 group-hover:text-emerald-600 dark:text-emerald-400 dark:group-hover:text-emerald-300">
                {isArabic ? "اكتشفي المزيد" : "Discover More"}

                <span className="text-lg">
                  {isArabic ? "←" : "→"}
                </span>
              </div>

              {/* Hover Glow */}
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-emerald-500/0 blur-[60px] transition-all duration-500 group-hover:bg-emerald-500/10" />

              {/* Top Line */}
              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center">
          <p className="text-sm font-bold tracking-wide text-emerald-800 dark:text-emerald-500/80">
            {isArabic
              ? "ORVELIA — حيث يلتقي الجمال بالابتكار"
              : "ORVELIA — WHERE BEAUTY MEETS INNOVATION"}
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent dark:via-emerald-800/50" />
    </section>
  );
}