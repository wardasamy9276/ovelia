
"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";

type Sector = {
  id: string;
  title: string;
  description: string;
  image: string;
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

function SectorsAccordion({ isArabic }: { isArabic: boolean }) {
  const [active, setActive] = useState("jewelry");

  const sectors: Sector[] = [
    {
      id: "beauty",
      title: isArabic
        ? "الجمال ومستحضرات التجميل"
        : "Beauty & Cosmetics",
      description: isArabic
        ? "امنحي عملاءك تجربة تسوق مختلفة تجمع بين الجمال والتكنولوجيا. تتيح تقنيات التجربة الافتراضية للعملاء اكتشاف مستحضرات التجميل وتجربة درجات المكياج المختلفة قبل اتخاذ قرار الشراء. يمكنهم استكشاف ألوان أحمر الشفاه، وتجربة ظلال العيون، واختيار كريم الأساس المناسب، ومقارنة الإطلالات المختلفة بسهولة. تساعد هذه التجربة على تقليل الحيرة أثناء التسوق، وتمنح كل عميل فرصة لاكتشاف المنتجات التي تناسب ذوقه واحتياجاته. كما تساعد العلامات التجارية على تقديم تجربة أكثر تفاعلاً، وزيادة ثقة العملاء، وتحويل عملية اكتشاف المنتجات إلى رحلة ممتعة وشخصية."
        : "Give your customers a new shopping experience where beauty meets technology. Virtual try-on technology allows shoppers to discover beauty products and experiment with different makeup shades before making a purchase. They can explore lipstick colors, try eyeshadow combinations, find suitable foundation shades, and compare different looks with ease. This experience reduces uncertainty during shopping and helps every customer discover products that match their personal style and needs. It also enables beauty brands to create more engaging interactions, build customer confidence, and turn product discovery into a personalized shopping journey.",
      image: "/assets/img1/retail.webp",
    },
    {
      id: "jewelry",
      title: isArabic
        ? "المجوهرات والإكسسوارات"
        : "Jewelry & Accessories",
      description: isArabic
        ? "امنحي عملاءك فرصة اكتشاف تفاصيل الأناقة وتجربة المجوهرات والإكسسوارات افتراضياً قبل الشراء. يمكنهم تجربة الخواتم والقلائد والأقراط والأساور والساعات، ومشاهدة كيف تبدو كل قطعة مع مظهرهم الشخصي. تساعد التجربة التفاعلية على مقارنة التصاميم والأحجام والألوان، وتنسيق أكثر من قطعة معاً للوصول إلى الإطلالة المثالية. وبدلاً من الاعتماد على الصور التقليدية فقط، يحصل العميل على تصور أقرب للواقع يساعده على اتخاذ قرار أكثر ثقة. إنها طريقة ذكية لعرض المنتجات الفاخرة، وإبراز تفاصيلها، وتقديم تجربة تسوق عصرية تليق بالعلامات التجارية المتميزة."
        : "Give your customers the opportunity to discover elegant details and virtually try on jewelry and accessories before purchasing. They can explore rings, necklaces, earrings, bracelets, and watches while seeing how each piece complements their personal style. The interactive experience makes it easier to compare designs, sizes, and colors, as well as combine different pieces to create the perfect look. Instead of relying only on traditional product images, customers get a more realistic impression that supports confident purchasing decisions. It is a smarter way to showcase premium products, highlight their details, and deliver a modern shopping experience for luxury brands.",
      image: "/assets/img1/jew-accs.webp",
    },
    {
      id: "ecommerce",
      title: isArabic
        ? "منصات التجارة الإلكترونية"
        : "E-Commerce Platforms",
      description: isArabic
        ? "طوّري تجربة التسوق داخل متجرك الإلكتروني من خلال دمج تقنيات التجربة الافتراضية مباشرة في صفحات المنتجات. بدلاً من مشاهدة الصور والوصف فقط، يستطيع العملاء التفاعل مع المنتجات واستكشاف تفاصيلها وتجربتها بطريقة أكثر واقعية. تساعد هذه التقنية الزائر على فهم المنتج بشكل أفضل، ومقارنة الخيارات المتاحة، واختيار ما يناسبه قبل إتمام عملية الشراء. كما تمنح المتاجر الإلكترونية فرصة لتقديم تجربة مختلفة عن المنافسين، وزيادة تفاعل المستخدمين مع صفحات المنتجات، وبناء علاقة أكثر ثقة مع العملاء. اجعلي متجرك الإلكتروني مساحة تفاعلية تجمع بين سهولة الاستخدام والتكنولوجيا الحديثة."
        : "Upgrade your online store by integrating virtual try-on technology directly into your product pages. Instead of relying only on images and descriptions, customers can interact with products, explore their details, and experience them in a more realistic way. This technology helps shoppers understand products better, compare available options, and choose what suits them before completing a purchase. It also gives e-commerce businesses an opportunity to stand out from competitors, increase engagement across product pages, and build stronger customer relationships. Transform your online store into an interactive shopping destination that combines convenience with modern technology.",
  
        image: "/assets/img1/imagese1.jpg",
    },
    {
      id: "retail",
      title: isArabic
        ? "متاجر التجزئة والمتاجر متعددة الفروع"
        : "Retail & Multi-Branch Stores",
      description: isArabic
        ? "حوّلي تجربة التسوق التقليدية داخل المتاجر إلى تجربة رقمية أكثر تطوراً باستخدام المرايا الذكية والشاشات التفاعلية وتقنيات التجربة الافتراضية. يستطيع العملاء استكشاف المنتجات وتجربتها داخل الفرع، ومقارنة الخيارات المختلفة دون الحاجة إلى تجربة كل منتج بشكل تقليدي. كما يمكن ربط التجربة داخل المتجر بالخدمات الرقمية، لتوفير رحلة تسوق متكاملة تجمع بين العالم الواقعي والتكنولوجيا. تساعد هذه الحلول العلامات التجارية على تحسين تجربة الزوار، وتقديم خدمات أكثر ابتكاراً، وتعزيز حضورها الرقمي داخل الفروع المختلفة. امنحي عملاءك تجربة حديثة تجعل زيارة المتجر أكثر سهولة وتفاعلاً."
        : "Transform traditional in-store shopping into a more advanced digital experience using smart mirrors, interactive screens, and virtual try-on technology. Customers can explore and experience products inside the store while comparing different options without relying entirely on traditional fitting methods. The in-store experience can also connect with digital services to create a seamless shopping journey that combines physical retail with modern technology. These solutions help brands improve visitor experiences, introduce innovative services, and strengthen their digital presence across multiple branches. Give your customers a modern experience that makes every store visit more convenient and engaging.",
        image: "/assets/img1/ecomm.webp",
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
                ? "min-h-[650px] flex-[7] border-emerald-600/40 bg-white shadow-[0_15px_45px_rgba(15,23,42,0.07)] dark:border-emerald-400/30 dark:bg-[#10243A] dark:shadow-[0_15px_45px_rgba(0,0,0,0.2)]"
                : "min-h-[90px] flex-1 border-slate-200 bg-white/70 hover:border-emerald-600/40 dark:border-[#263B50] dark:bg-[#0C1B2D] dark:hover:border-emerald-400/40",
            ].join(" ")}
          >
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
                  className={`sector-reveal flex h-full flex-col items-stretch gap-7 p-5 sm:p-8 lg:flex-row lg:items-center lg:gap-9 lg:p-9 ${
                    isArabic ? "text-right" : "text-left"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-[300px] w-full shrink-0 overflow-hidden rounded-[26px] bg-slate-100 shadow-xl dark:bg-[#172B40] sm:h-[360px] lg:h-[88%] lg:w-[46%]">
                    <Image
                      src={sector.image}
                      alt={sector.title}
                      fill
                      priority={sector.id === "jewelry"}
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

                    <div className="absolute bottom-5 right-5 rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md">
                      {isArabic ? "اكتشفي التجربة" : "DISCOVER THE EXPERIENCE"}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center py-3">
                    <div className="mb-5 flex items-center gap-3">
                      <span className="h-px w-10 bg-emerald-600 dark:bg-emerald-400" />

                      <span className="text-xs font-bold tracking-widest text-emerald-700 dark:text-emerald-400">
                        {isArabic
                          ? `القطاع 0${index + 1}`
                          : `SECTOR 0${index + 1}`}
                      </span>
                    </div>

                    <h2 className="text-2xl font-black leading-relaxed text-[#10243A] dark:text-white sm:text-3xl lg:text-[34px]">
                      {sector.title}
                    </h2>

                    <p className="mt-5 max-w-2xl text-[15px] leading-[2.1] text-slate-600 dark:text-slate-300 sm:text-base lg:text-[16px] lg:leading-[2.2]">
                      {sector.description}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                      <span className="size-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />

                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                        {isArabic
                          ? "تكنولوجيا ذكية • تجربة تفاعلية • تسوق أكثر ثقة"
                          : "Smart Technology • Interactive Experience • Confident Shopping"}
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

function FloatingButtons({ isArabic }: { isArabic: boolean }) {
  return (
    <>
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
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 size-[400px] rounded-full bg-emerald-300/10 blur-[120px] dark:bg-emerald-500/[0.07]" />

        <div className="absolute -left-40 bottom-20 size-[400px] rounded-full bg-teal-300/10 blur-[120px] dark:bg-teal-500/[0.06]" />

        <div className="absolute inset-0 bg-[radial-gradient(#64748b_0.7px,transparent_0.7px)] bg-[size:34px_34px] opacity-[0.07] dark:opacity-[0.08]" />
      </div>

      <div className="relative mx-auto max-w-[1900px] px-4 pb-20 pt-16 sm:px-9">
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
              ? "نقدم حلولاً ذكية للتجربة الافتراضية تساعد العلامات التجارية على تطوير طريقة عرض منتجاتها والتواصل مع عملائها. من مستحضرات التجميل والمجوهرات إلى التجارة الإلكترونية ومتاجر التجزئة، نعمل على تحويل تجربة التسوق التقليدية إلى تجربة رقمية تفاعلية تجمع بين الابتكار والسهولة والثقة."
              : "We deliver smart virtual try-on solutions that help brands transform how they showcase products and connect with customers. From beauty and jewelry to e-commerce and retail, we turn traditional shopping into an interactive digital experience built around innovation, convenience, and confidence."}
          </p>

          <div className="mx-auto mt-7 h-[2px] w-20 rounded-full bg-emerald-600/70 dark:bg-emerald-400/70" />
        </div>

        <SectorsAccordion isArabic={isArabic} />
      </div>

      <FloatingButtons isArabic={isArabic} />

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
