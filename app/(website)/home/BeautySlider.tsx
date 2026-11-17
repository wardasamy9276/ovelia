
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";


const slides = [
  {
    id: 1,
    image: "/assets/slider/images2.jpg",
    titleAr: "الجمال الذكي",
    titleEn: "Intelligent Beauty",
    descAr: "اكتشفي مستقبلاً جديداً يجمع بين الجمال والذكاء الاصطناعي.",
    descEn: "Discover a new future powered by beauty and artificial intelligence.",
    tag: "AI BEAUTY",
  },
  {
    id: 2,
    image: "/assets/slider/images7.jpg",
    titleAr: "تحليل البشرة",
    titleEn: "Smart Skin Analysis",
    descAr: "تحليل متطور يساعدك على فهم احتياجات بشرتك.",
    descEn: "Advanced analysis to understand your skin needs.",
    tag: "SKIN ANALYSIS",
  },
  {
    id: 3,
    image: "/assets/slider/Untitled3.png",
    titleAr: "تجربة الجمال",
    titleEn: "Beauty Experience",
    descAr: "تجربة استثنائية مصممة لإبراز جمالك الطبيعي.",
    descEn: "An exceptional experience designed to reveal your natural beauty.",
    tag: "ORVELIA EXPERIENCE",
  },
  {
    id: 4,
    image: "/assets/slider/photo-1485230895905-ec40ba36b9bc.jpg",
    titleAr: "اكتشفي جمالك",
    titleEn: "Discover Your Beauty",
    descAr: "اكتشفي حلولاً مبتكرة تناسب شخصيتك واحتياجاتك.",
    descEn: "Explore innovative solutions tailored to your needs.",
    tag: "PERSONAL BEAUTY",
  },
  {
    id: 5,
    image: "/assets/slider/photo-1487412720507-e7ab37603c6f5.jpg",
    titleAr: "مستقبل التجميل",
    titleEn: "Future Of Beauty",
    descAr: "حيث تلتقي التكنولوجيا مع أحدث مفاهيم الجمال.",
    descEn: "Where technology meets the future of beauty.",
    tag: "BEAUTY TECHNOLOGY",
  },
  {
    id: 6,
    image: "/assets/slider/photo-1508214751196-bcfd4ca60f9111.jpg",
    titleAr: "العناية بالبشرة",
    titleEn: "Skincare Excellence",
    descAr: "امنحي بشرتك العناية التي تستحقها مع حلول متطورة.",
    descEn: "Give your skin the care it deserves with advanced solutions.",
    tag: "SKINCARE",
  },
  {
    id: 7,
    image: "/assets/slider/photo-1512316609839-ce289d3eba0a.jpg",
    titleAr: "عالم المكياج",
    titleEn: "Makeup Universe",
    descAr: "اكتشفي إطلالات متنوعة تعكس جمالك وشخصيتك.",
    descEn: "Explore different looks that reflect your beauty and personality.",
    tag: "MAKEUP WORLD",
  },
  {
    id: 8,
    image: "/assets/slider/photo-1522335789203-aabd1fc54bc9.jpg",
    titleAr: "جمال بلا حدود",
    titleEn: "Beauty Without Limits",
    descAr: "تجربة جديدة تمنحك مساحة لاكتشاف أسلوبك الخاص.",
    descEn: "A new experience that lets you discover your personal style.",
    tag: "ENDLESS BEAUTY",
  },
  {
    id: 9,
    image: "/assets/slider/photo-1570172619644-dfd03ed5d881.jpg",
    titleAr: "إطلالة متألقة",
    titleEn: "Radiant Look",
    descAr: "أبرزي جمالك الطبيعي بإطلالة مشرقة ومميزة.",
    descEn: "Highlight your natural beauty with a radiant and unique look.",
    tag: "RADIANT BEAUTY",
  },
  {
    id: 10,
    image: "/assets/img/mix&match-v2.webp",
    titleAr: "أناقة عصرية",
    titleEn: "Modern Elegance",
    descAr: "اكتشفي مزيجاً من الأناقة العصرية واللمسات الجمالية.",
    descEn: "Discover a blend of modern elegance and beauty details.",
    tag: "MODERN STYLE",
  },
  {
    id: 11,
    image: "/assets/img/left.webp",
    titleAr: "جمالك الطبيعي",
    titleEn: "Natural Beauty",
    descAr: "لأن جمالك الطبيعي يستحق أن يظهر بأفضل صورة.",
    descEn: "Your natural beauty deserves to shine at its best.",
    tag: "NATURAL GLOW",
  },
  {
    id: 12,
    image: "/assets/slider/images6.jpg",

    titleAr: "اكتشفي أسلوبك",
    titleEn: "Find Your Style",
    descAr: "اختاري ما يناسبك واكتشفي أسلوباً يعبر عنك.",
    descEn: "Find what suits you and discover a style that expresses you.",
    tag: "YOUR STYLE",
  },
  {
    id: 13,
    image: "/assets/slider/images1.jpg",
    titleAr: "أسرار الجمال",
    titleEn: "Beauty Secrets",
    descAr: "تعرفي على أسرار العناية والجمال بأسلوب أكثر ذكاءً.",
    descEn: "Explore beauty and skincare secrets in a smarter way.",
    tag: "BEAUTY SECRETS",
  },
  {
    id: 14,
    image: "/assets/img/Untitled.png",
    titleAr: "بشرة أكثر نضارة",
    titleEn: "Fresh Skin",
    descAr: "اكتشفي طرقاً مبتكرة لتعزيز نضارة بشرتك وإشراقها.",
    descEn: "Discover innovative ways to improve your skin's freshness and glow.",
    tag: "SKIN GLOW",
  },
  {
    id: 15,
    image: "/assets/slider/Untitled3.png",
    titleAr: "لمسات من الفخامة",
    titleEn: "Luxury Touch",
    descAr: "تفاصيل جمالية راقية تمنحك تجربة مختلفة.",
    descEn: "Elegant beauty details that create a different experience.",
    tag: "LUXURY BEAUTY",
  },
  {
    id: 16,
    image: "/assets/slider/Untitled1.png",

    titleAr: "فن المكياج",
    titleEn: "The Art Of Makeup",
    descAr: "اكتشفي فنون المكياج التي تبرز ملامحك بأناقة.",
    descEn: "Discover makeup artistry that enhances your features elegantly.",
    tag: "MAKEUP ART",
  },
  {
    id: 17,
    image: "/assets/img/1790069732596-fe9a32ab43dffee47917a1f0d4f11448.png",
    titleAr: "لحظات من العناية",
    titleEn: "Moments Of Care",
    descAr: "اجعلي العناية بنفسك جزءاً من يومك وتجربتك.",
    descEn: "Make self-care part of your everyday experience.",
    tag: "SELF CARE",
  },
  {
    id: 18,
    image: "/assets/img/center.webp",
    titleAr: "عالم مستحضرات التجميل",
    titleEn: "Beauty Products",
    descAr: "اكتشفي عالماً من المنتجات التي تناسب احتياجاتك.",
    descEn: "Explore a world of products tailored to your needs.",
    tag: "BEAUTY PRODUCTS",
  },
  {
    id: 19,
    image: "/assets/img/right.webp",
    titleAr: "تقنيات الجمال",
    titleEn: "Beauty Technology",
    descAr: "تقنيات حديثة تجعل تجربة العناية أكثر سهولة وذكاءً.",
    descEn: "Modern technologies make beauty care easier and smarter.",
    tag: "SMART TECHNOLOGY",
  },
  {
    id: 20,
    image: "/assets/imgs/center.webp",
    titleAr: "تألقي بطريقتك",
    titleEn: "Shine Your Way",
    descAr: "كوني أنتِ، واكتشفي تجربة جمال تعبر عن تميزك.",
    descEn: "Be yourself and discover a beauty experience that celebrates your uniqueness.",
    tag: "ORVELIA GLOW",
  },
];


export default function BeautySlider() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [paused]);

  const visibleSlides = [-1, 0, 1].map((offset) => ({
    slide: slides[(activeIndex + offset + slides.length) % slides.length],
    offset,
  }));

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[150px] dark:bg-emerald-700/10" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-teal-300/20 blur-[150px] dark:bg-green-900/20" />

        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:38px_38px] opacity-[0.05] dark:opacity-[0.07]" />
      </div>

      <div className="relative mx-auto max-w-[1550px] px-4 md:px-10">

        {/* Heading */}
        <div className="mb-16 text-center md:mb-20">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-500/30 bg-white/80 px-5 py-3 shadow-lg transition-colors duration-500 dark:border-emerald-500/20 dark:bg-[#081A12]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />

            <span className="text-[11px] font-bold tracking-[3px] text-emerald-700 dark:text-emerald-400">
              ORVELIA AI BEAUTY
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight md:text-5xl lg:text-6xl">
            {isArabic ? (
              <>
                اكتشفي عالم
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-500 dark:to-teal-300">
                  الجمال الافتراضي
                </span>
              </>
            ) : (
              <>
                Discover The World Of
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent dark:from-emerald-300 dark:via-emerald-500 dark:to-teal-300">
                  Virtual Beauty
                </span>
              </>
            )}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-slate-600 transition-colors duration-500 dark:text-slate-400 md:text-base">
            {isArabic
              ? "تجربة استثنائية تجمع بين الذكاء الاصطناعي والتكنولوجيا الحديثة لتعيد تعريف مفهوم الجمال."
              : "An exceptional experience combining AI and modern technology to redefine beauty."}
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative mx-auto max-w-[1350px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slider Cards */}
          <div className="flex items-center justify-center gap-2 md:gap-5">
            {visibleSlides.map(({ slide, offset }) => {
              const isActive = offset === 0;

              return (
                <div
                  key={slide.id}
                  className={`
                    group relative shrink-0 overflow-hidden rounded-[30px]
                    border transition-all duration-700 ease-in-out
                    ${
                      isActive
                        ? "z-20 h-[520px] w-[88%] border-emerald-500/40 shadow-[0_20px_60px_rgba(6,78,59,0.15)] dark:border-emerald-400/40 dark:shadow-[0_0_55px_rgba(16,185,129,0.15)] md:h-[600px] md:w-[42%]"
                        : "hidden h-[510px] w-[27%] scale-[0.92] border-emerald-900/15 opacity-80 shadow-lg dark:border-emerald-900/40 dark:opacity-70 md:block"
                    }
                  `}
                >
                  {/* Image */}
                  <img
                    src={slide.image}
                    alt={isArabic ? slide.titleAr : slide.titleEn}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                  />

                  {/* Light and Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#F1F4F2]/0 via-[#071A2F]/10 to-[#071A2F]/90 dark:from-[#030906]/10 dark:via-[#030906]/25 dark:to-[#030906]/95" />

                  <div className="absolute inset-0 bg-emerald-500/10 mix-blend-color" />

                  {/* Border */}
                  <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/20 dark:border-emerald-300/20" />

                  {/* Top Label */}
                  <div className="absolute left-5 top-5 rounded-full border border-emerald-500/30 bg-white/85 px-4 py-2 shadow-lg backdrop-blur-lg dark:border-emerald-300/30 dark:bg-[#06140E]/80 md:left-7 md:top-7">
                    <span className="text-[9px] font-bold tracking-[2px] text-emerald-800 dark:text-emerald-300 md:text-[10px]">
                      {slide.tag}
                    </span>
                  </div>

                  {/* AI Decoration */}
                  {isActive && (
                    <>
                      <div className="absolute right-6 top-1/2 h-24 w-[2px] -translate-y-1/2 bg-gradient-to-b from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10b981] md:right-8" />

                      <div className="absolute bottom-[38%] left-7 flex items-center gap-2">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />

                        <span className="text-[9px] font-bold tracking-widest text-emerald-100">
                          AI ANALYSIS
                        </span>
                      </div>
                    </>
                  )}

                  {/* Card Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                    <div className="mb-4 h-[3px] w-16 bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_#10b981]" />

                    <h3 className="text-2xl font-black text-white md:text-4xl">
                      {isArabic ? slide.titleAr : slide.titleEn}
                    </h3>

                    <p className="mt-4 text-xs leading-7 text-white/90 md:text-base md:leading-8">
                      {isArabic ? slide.descAr : slide.descEn}
                    </p>

                    {isActive && (
                      <div className="mt-6 flex items-center gap-3">
                        <span className="rounded-full border border-emerald-300/40 bg-emerald-500/20 px-5 py-3 text-[10px] font-bold text-emerald-100 backdrop-blur-md md:text-xs">
                          {isArabic ? "اكتشفي المزيد" : "DISCOVER MORE"}
                        </span>

                        <span className="text-lg text-emerald-300">
                          {isArabic ? "←" : "→"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Glow */}
                  <div className="pointer-events-none absolute -bottom-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-[75px] dark:bg-emerald-400/20" />
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-1 top-1/2 z-30 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-500/30 bg-white/90 text-2xl text-emerald-700 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:bg-emerald-600 hover:text-white dark:border-emerald-400/40 dark:bg-[#081A12]/95 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white md:left-[-25px] md:h-14 md:w-14"
          >
            {isArabic ? "›" : "‹"}
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-1 top-1/2 z-30 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-500/30 bg-white/90 text-2xl text-emerald-700 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:bg-emerald-600 hover:text-white dark:border-emerald-400/40 dark:bg-[#081A12]/95 dark:text-emerald-300 dark:hover:bg-emerald-600 dark:hover:text-white md:right-[-25px] md:h-14 md:w-14"
          >
            {isArabic ? "‹" : "›"}
          </button>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex items-center justify-center gap-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${
                  activeIndex === index
                    ? "w-14 bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_#10b981]"
                    : "w-3 bg-emerald-900/20 hover:bg-emerald-500/60 dark:bg-emerald-900 dark:hover:bg-emerald-400/60"
                }
              `}
            />
          ))}
        </div>

        {/* Footer Details */}
        <div className="mt-10 flex items-center justify-center gap-3 text-[10px] font-bold tracking-[3px] text-emerald-800/60 dark:text-emerald-500/70">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-emerald-500/50" />

          ORVELIA EXPERIENCE

          <span className="h-px w-10 bg-gradient-to-l from-transparent to-emerald-500/50" />
        </div>
      </div>

      {/* Bottom Border */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
    </section>
  );
}
