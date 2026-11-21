// "use client";

// import { useState } from "react";
// import { Check, ChevronDown, X } from "lucide-react";
// import { useLanguage } from "@/app/context/LanguageContext";
// import { aboutStandardsData } from "../about/data/aboutStandardsData";

// export default function AboutStandardsSection() {
//   const { language } = useLanguage();
//   const isArabic = language === "ar";
//   const lang = isArabic ? "ar" : "en";
//   const data = aboutStandardsData;

//   const [openId, setOpenId] = useState<number | null>(data.ingredients[0]?.id ?? null);

//   return (
//     <section
//       dir={isArabic ? "rtl" : "ltr"}
//       lang={language}
//       className="relative isolate overflow-hidden bg-[#0B2A1F] py-24 text-white md:py-32"
//     >
//       <div className="mx-auto max-w-6xl px-5 md:px-10">
//         {/* Header - تم ضبط الـ Flex وتحسين التناسق */}
//         <div className="flex flex-col items-center text-center gap-4 md:items-start md:text-start">
//           <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
//             {data.title[lang]}
//           </h2>
//           <p className="max-w-2xl text-sm leading-8 text-emerald-50/75 md:text-base">
//             {data.subtitle[lang]}
//           </p>
//         </div>

//         {/* Process */}
//         <h3 className="mt-20 text-xl font-bold md:text-2xl">{data.processTitle[lang]}</h3>

//         {/* In / Out */}
//         <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-0">
//           <div className="md:border-e md:border-white/10 md:pe-12">
//             <h3 className="text-xl font-bold md:text-2xl">{data.standardsTitleIn[lang]}</h3>
//             <ul className="mt-6 space-y-4">
//               {data.included.map((item, i) => (
//                 <li key={i} className="flex items-start gap-3">
//                   <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-300">
//                     <Check className="h-3.5 w-3.5" />
//                   </span>
//                   <span className="text-sm leading-7 text-emerald-50/85 md:text-base">
//                     {item[lang]}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="md:ps-12">
//             <h3 className="text-xl font-bold md:text-2xl">{data.standardsTitleOut[lang]}</h3>
//             <ul className="mt-6 space-y-4">
//               {data.excluded.map((item, i) => (
//                 <li key={i} className="flex items-start gap-3">
//                   <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-400/20 text-rose-300">
//                     <X className="h-3.5 w-3.5" />
//                   </span>
//                   <span className="text-sm leading-7 text-emerald-50/85 md:text-base">
//                     {item[lang]}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Ingredients accordion */}
//         <div className="mt-24">
//           <h3 className="text-xl font-bold md:text-2xl">{data.ingredientsTitle[lang]}</h3>
//           <p className="mt-3 max-w-2xl text-sm leading-8 text-emerald-50/70 md:text-base">
//             {data.ingredientsIntro[lang]}
//           </p>

//           <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
//             {data.ingredients.map((ing) => {
//               const open = openId === ing.id;
//               const panelId = `ingredient-panel-${ing.id}`;

//               return (
//                 <li key={ing.id}>
//                   <button
//                     type="button"
//                     aria-expanded={open}
//                     aria-controls={panelId}
//                     onClick={() => setOpenId(open ? null : ing.id)}
//                     className="flex w-full items-center justify-between gap-4 py-5 text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
//                   >
//                     <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
//                       <span className="text-lg font-bold md:text-xl">{ing.name[lang]}</span>
//                       <span className="rounded-full border border-emerald-300/30 px-3 py-0.5 text-xs text-emerald-200">
//                         {ing.tag[lang]}
//                       </span>
//                     </span>
//                     <ChevronDown
//                       className={`h-5 w-5 shrink-0 text-emerald-300 transition-transform duration-300 motion-reduce:transition-none ${
//                         open ? "rotate-180" : ""
//                       }`}
//                     />
//                   </button>

//                   <div
//                     id={panelId}
//                     className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
//                       open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
//                     }`}
//                   >
//                     <div className="overflow-hidden">
//                       <div className="grid gap-8 pb-7 md:grid-cols-[1.2fr_1fr]">
//                         <div>
//                           <p className="max-w-lg text-sm leading-8 text-emerald-50/80 md:text-base">
//                             {ing.benefit[lang]}
//                           </p>
//                           <p className="mt-4 text-sm leading-7 text-emerald-50/70">
//                             <span className="font-bold text-emerald-300">{data.tipLabel[lang]}: </span>
//                             {ing.tip[lang]}
//                           </p>
//                         </div>

//                         <div className="space-y-5">
//                           <div>
//                             <p className="text-xs font-bold text-emerald-300">{data.suitsLabel[lang]}</p>
//                             <div className="mt-2 flex flex-wrap gap-2">
//                               {ing.suits.map((s, i) => (
//                                 <span
//                                   key={i}
//                                   className="rounded-full bg-white/10 px-3 py-1 text-xs text-emerald-50/90"
//                                 >
//                                   {s[lang]}
//                                 </span>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <p className="text-xs font-bold text-emerald-300">{data.foundInLabel[lang]}</p>
//                             <p className="mt-2 text-sm leading-7 text-emerald-50/80">
//                               {ing.foundIn.map((f) => f[lang]).join(isArabic ? "، " : ", ")}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>

//           <p className="mt-6 max-w-3xl text-xs leading-6 text-emerald-50/55">{data.note[lang]}</p>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import { aboutStandardsData } from "../about/data/aboutStandardsData";

export default function AboutStandardsSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";
  const data = aboutStandardsData;

  const [openId, setOpenId] = useState<number | null>(
    data.ingredients[0]?.id ?? null
  );

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      {/* Background Glow & Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[150px] dark:bg-emerald-600/15" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-teal-400/20 blur-[150px] dark:bg-teal-800/20" />
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.05] dark:opacity-[0.07]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-10">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-start">
          <h2 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
            {data.title[lang]}
          </h2>

          <p className="max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
            {data.subtitle[lang]}
          </p>
        </div>

        {/* Process */}
        <h3 className="mt-20 text-xl font-bold md:text-2xl">
          {data.processTitle[lang]}
        </h3>

        {/* In / Out */}
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-0">

          {/* Included */}
          <div className="md:border-e md:border-emerald-900/10 md:pe-12 dark:md:border-emerald-500/15">
            <h3 className="text-xl font-bold md:text-2xl">
              {data.standardsTitleIn[lang]}
            </h3>

            <ul className="mt-6 space-y-4">
              {data.included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300">
                    <Check className="h-3.5 w-3.5" />
                  </span>

                  <span className="text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                    {item[lang]}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div className="md:ps-12">
            <h3 className="text-xl font-bold md:text-2xl">
              {data.standardsTitleOut[lang]}
            </h3>

            <ul className="mt-6 space-y-4">
              {data.excluded.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-600 dark:bg-rose-400/20 dark:text-rose-300">
                    <X className="h-3.5 w-3.5" />
                  </span>

                  <span className="text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
                    {item[lang]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ingredients Accordion */}
        <div className="mt-24">
          <h3 className="text-xl font-bold md:text-2xl">
            {data.ingredientsTitle[lang]}
          </h3>

          <p className="mt-3 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-400 md:text-base">
            {data.ingredientsIntro[lang]}
          </p>

          <ul className="mt-8 divide-y divide-emerald-900/10 border-y border-emerald-900/10 dark:divide-white/10 dark:border-white/10">
            {data.ingredients.map((ing) => {
              const open = openId === ing.id;
              const panelId = `ingredient-panel-${ing.id}`;

              return (
                <li key={ing.id}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : ing.id)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                  >
                    <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="text-lg font-bold md:text-xl">
                        {ing.name[lang]}
                      </span>

                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/5 px-3 py-0.5 text-xs text-emerald-800 dark:text-emerald-300">
                        {ing.tag[lang]}
                      </span>
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-300 motion-reduce:transition-none dark:text-emerald-400 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={panelId}
                    className={`grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none ${
                      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="grid gap-8 pb-7 md:grid-cols-[1.2fr_1fr]">

                        {/* Benefit */}
                        <div>
                          <p className="max-w-lg text-sm leading-8 text-slate-700 dark:text-slate-300 md:text-base">
                            {ing.benefit[lang]}
                          </p>

                          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
                            <span className="font-bold text-emerald-700 dark:text-emerald-400">
                              {data.tipLabel[lang]}:{" "}
                            </span>
                            {ing.tip[lang]}
                          </p>
                        </div>

                        {/* Details */}
                        <div className="space-y-5">
                          <div>
                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                              {data.suitsLabel[lang]}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              {ing.suits.map((s, i) => (
                                <span
                                  key={i}
                                  className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-slate-700 dark:bg-white/10 dark:text-slate-200"
                                >
                                  {s[lang]}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                              {data.foundInLabel[lang]}
                            </p>

                            <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
                              {ing.foundIn
                                .map((f) => f[lang])
                                .join(isArabic ? "، " : ", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Note */}
          <p className="mt-6 max-w-3xl text-xs leading-6 text-slate-500 dark:text-slate-400">
            {data.note[lang]}
          </p>
        </div>
      </div>

      {/* Bottom Divider */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
    </section>
  );
}
