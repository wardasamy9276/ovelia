
"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

type Sector = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-5 transition-transform duration-500 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectorsAccordion({
  isArabic,
}: {
  isArabic: boolean;
}) {
  const [active, setActive] = useState("jewelry");

  const sectors: Sector[] = [
    {
      id: "beauty",
      title: isArabic
        ? "الجمال ومستحضرات التجميل"
        : "Beauty & Cosmetics",
      description: isArabic
        ? "امنحي عملاءك تجربة تفاعلية لاكتشاف مستحضرات التجميل وتجربتها افتراضياً قبل الشراء. يمكنهم استكشاف درجات المكياج المختلفة، ومقارنة الإطلالات، واختيار المنتجات التي تناسب احتياجاتهم بسهولة."
        : "Give your customers an interactive experience to discover and virtually try beauty products before purchasing. They can explore different makeup shades, compare looks, and easily choose products that suit their needs.",
    },
    {
      id: "jewelry",
      title: isArabic
        ? "المجوهرات والإكسسوارات"
        : "Jewelry & Accessories",
      description: isArabic
        ? "أتح لعملائك تجربة الخواتم والقلائد والأقراط والأساور والساعات افتراضياً في الوقت الحقيقي. تساعدهم هذه التجربة على رؤية كيف تتكامل كل قطعة مع أسلوبهم الشخصي، وتمنحهم حرية تنسيق القطع معاً بسهولة قبل الشراء."
        : "Allow your customers to virtually try on rings, necklaces, earrings, bracelets, and watches in real time. This experience helps them see how each piece complements their personal style and gives them the freedom to mix and match items before purchasing.",
    },
    {
      id: "ecommerce",
      title: isArabic
        ? "منصات التجارة الإلكترونية"
        : "E-Commerce Platforms",
      description: isArabic
        ? "ارتقِ بتجربة التسوق داخل متجرك الإلكتروني من خلال دمج تقنيات التجربة الافتراضية مباشرة في صفحات المنتجات. يستطيع العملاء استكشاف المنتجات وتجربتها بطريقة تفاعلية، مما يساعدهم على اتخاذ قرارات شراء أكثر ثقة."
        : "Enhance the shopping experience in your online store by integrating virtual try-on technology directly into product pages. Customers can explore and try products interactively, helping them make more confident purchasing decisions.",
    },
    {
      id: "retail",
      title: isArabic
        ? "متاجر التجزئة والمتاجر متعددة الفروع"
        : "Retail & Multi-Branch Stores",
      description: isArabic
        ? "حوّل تجربة التسوق داخل الفروع إلى تجربة رقمية تفاعلية باستخدام المرايا الذكية والشاشات التفاعلية. امنح العملاء فرصة استكشاف المنتجات وتجربتها داخل المتجر مع ربط التجربة بالخدمات الرقمية."
        : "Transform in-store shopping into an interactive digital experience using smart mirrors and interactive screens. Give customers the opportunity to explore and try products inside your store while connecting the experience with your digital services.",
    },
  ];

  return (
    <div className="flex min-h-[650px] flex-col gap-3 lg:h-[760px] lg:flex-row">
      {sectors.map((sector, index) => {
        const open = sector.id === active;

        return (
          <section
            key={sector.id}
            className={[
              "group relative overflow-hidden rounded-[28px]",
              "border transition-[flex,border-color,background-color,box-shadow] duration-700 ease-in-out",
              open
                ? "min-h-[570px] flex-[7] border-emerald-600/40 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.07)] dark:border-emerald-400/30 dark:bg-[#10243A] dark:shadow-[0_15px_45px_rgba(0,0,0,0.2)]"
                : "min-h-[90px] flex-1 border-slate-200 bg-white/70 hover:border-emerald-600/40 dark:border-[#263B50] dark:bg-[#0C1B2D] dark:hover:border-emerald-400/40",
            ].join(" ")}
          >
            {/* Sector Button */}
            <button
              type="button"
              onClick={() => setActive(open ? "" : sector.id)}
              aria-expanded={open}
              aria-controls={`panel-${sector.id}`}
              className={[
                "absolute z-20 flex items-center justify-between gap-3",
                "px-6 text-lg font-bold transition-colors duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600",
                "inset-x-0 top-0 h-[90px] lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-[100px]",
                "lg:flex-col lg:justify-center lg:px-0 lg:py-8",
                open
                  ? "bg-emerald-50/80 text-emerald-800 dark:bg-[#132E32] dark:text-emerald-300"
                  : "text-slate-700 hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-300",
              ].join(" ")}
            >
              <span
                className={`text-xs font-semibold tracking-widest ${
                  open
                    ? "text-emerald-700 dark:text-emerald-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                0{index + 1}
              </span>

              <span
                className={`flex-1 text-center ${
                  isArabic ? "text-right" : "text-left"
                } lg:flex-none lg:[writing-mode:vertical-rl] lg:rotate-180 lg:text-center lg:text-xl`}
              >
                {sector.title}
              </span>

              <span className="lg:hidden">
                <Chevron open={open} />
              </span>

              <span className="hidden lg:block">
                <Chevron open={open} />
              </span>
            </button>

            {/* Sector Content */}
            <div
              id={`panel-${sector.id}`}
              aria-hidden={!open}
              className={[
                "absolute inset-x-0 bottom-0 top-[90px] overflow-hidden",
                "transition-all duration-500",
                "lg:inset-y-0 lg:right-[100px] lg:left-0",
                open
                  ? "visible opacity-100"
                  : "invisible pointer-events-none opacity-0",
              ].join(" ")}
            >
              {open && (
                <div
                  className={`sector-reveal flex h-full flex-col items-stretch gap-5 p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-8 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {/* Image */}
                  {sector.image && (
                    <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-[24px] bg-slate-100 dark:bg-[#172B40] lg:h-[85%] lg:w-[45%]">
                      <Image
                        src={sector.image}
                        alt={sector.title}
                        fill
                        sizes="(min-width:1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-center">
                    <div
                      className={`mb-5 flex items-center gap-3 ${
                        isArabic ? "flex-row" : "flex-row"
                      }`}
                    >
                      <span className="h-px w-10 bg-emerald-600 dark:bg-emerald-400" />

                      <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400">
                        {isArabic
                          ? `القطاع 0${index + 1}`
                          : `SECTOR 0${index + 1}`}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold leading-relaxed text-[#10243A] dark:text-white sm:text-3xl">
                      {sector.title}
                    </h2>

                    <p className="mt-5 max-w-2xl text-base leading-[2.2] text-slate-600 dark:text-slate-300">
                      {sector.description}
                    </p>

                    <div className="mt-7 flex items-center gap-3">
                      <span className="size-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />

                      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        {isArabic
                          ? "تجربة رقمية أكثر تفاعلاً"
                          : "A More Interactive Digital Experience"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function FloatingButtons({
  isArabic,
}: {
  isArabic: boolean;
}) {
  return (
    <>
      {/* Makeup Assistant */}
      <button
        type="button"
        aria-label={
          isArabic
            ? "مساعد المكياج الذكي"
            : "Smart Makeup Assistant"
        }
        title={
          isArabic
            ? "مساعد المكياج الذكي"
            : "Smart Makeup Assistant"
        }
        className="fixed bottom-6 left-6 z-50 grid size-[68px] place-items-center rounded-full border border-emerald-600/40 bg-white text-3xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-emerald-400/30 dark:bg-[#10243A]"
      >
        💄
      </button>

      {/* Cookie Settings */}
      <button
        type="button"
        aria-label={
          isArabic
            ? "إعدادات ملفات تعريف الارتباط"
            : "Cookie Settings"
        }
        title={
          isArabic
            ? "إعدادات ملفات تعريف الارتباط"
            : "Cookie Settings"
        }
        className="fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full border border-slate-200 bg-white text-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 dark:border-[#263B50] dark:bg-[#10243A]"
      >
        🍪
      </button>
    </>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative min-h-screen overflow-hidden bg-[#F4F7F5] text-[#10243A] antialiased transition-colors duration-500 dark:bg-[#071426] dark:text-white"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 size-[400px] rounded-full bg-emerald-300/10 blur-[120px] dark:bg-emerald-500/[0.07]" />

        <div className="absolute -left-40 bottom-20 size-[400px] rounded-full bg-teal-300/10 blur-[120px] dark:bg-teal-500/[0.06]" />

        <div className="absolute inset-0 bg-[radial-gradient(#64748b_0.7px,transparent_0.7px)] bg-[size:34px_34px] opacity-[0.07] dark:opacity-[0.08]" />
      </div>

      <div className="relative mx-auto max-w-[1900px] px-4 pb-20 pt-16 sm:px-9">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <span className="mb-5 inline-flex items-center gap-3 rounded-full border border-emerald-600/20 bg-white/80 px-5 py-2.5 text-xs font-bold tracking-widest text-emerald-800 shadow-sm dark:border-emerald-400/20 dark:bg-[#10243A] dark:text-emerald-300">
            <span className="size-2 animate-pulse rounded-full bg-emerald-600 dark:bg-emerald-400" />

            {isArabic ? "قطاعاتنا" : "OUR INDUSTRIES"}
          </span>

          <h1 className="text-3xl font-black leading-relaxed text-[#10243A] dark:text-white sm:text-5xl">
            {isArabic
              ? "القطاعات التي نخدمها"
              : "Industries We Serve"}
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-8 text-slate-600 dark:text-slate-400 sm:text-base">
            {isArabic
              ? "بوابة تجربة المكياج الافتراضية قابلة للتكيف عبر صناعات متعددة، مما يساعد العلامات التجارية على تقديم تجارب تفاعلية (جرّب قبل الشراء)."
              : "Our virtual try-on platform adapts to multiple industries, helping brands deliver interactive experiences that allow customers to try before they buy."}
          </p>

          <div className="mx-auto mt-7 h-[2px] w-20 rounded-full bg-emerald-600/70 dark:bg-emerald-400/70" />
        </div>

        {/* Sectors */}
        <SectorsAccordion isArabic={isArabic} />
      </div>

      <FloatingButtons isArabic={isArabic} />

      {/* Bottom Line */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-600/30 to-transparent dark:via-emerald-400/30" />

      <style jsx>{`
        .sector-reveal {
          animation: reveal-sector 550ms ease both;
        }

        @keyframes reveal-sector {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sector-reveal {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
