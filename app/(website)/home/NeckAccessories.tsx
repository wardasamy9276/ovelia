
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type Item = {
  id: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  image: string;
  demoHref: string;
  howHref: string;
};

const items: Item[] = [
  {
    id: "pendant",
    titleAr: "تجربة القلائد الافتراضية",
    titleEn: "Virtual Pendant Try-On",
    taglineAr: "اجعل كل قلادة تروي قصتها",
    taglineEn: "Let Every Pendant Tell Its Story",
    descriptionAr:
      "يتيح هذا الحل للمستخدم تجربة القلائد ذات المعلّقات، ورؤية موضعها بدقة على الرقبة والصدر مع كل حركة.",
    descriptionEn:
      "This solution allows users to virtually try on pendant necklaces and see how they fit around the neck and chest with every movement.",
    featuresAr: [
      "محاكاة واقعية لتصميم المعلّق",
      "تفاعل طبيعي مع الجسم والحركة",
      "دعم أطوال وأحجام متعددة",
    ],
    featuresEn: [
      "Realistic pendant design simulation",
      "Natural body and movement interaction",
      "Support for multiple lengths and sizes",
    ],
    image: "/images/neck/pendant.png",
    demoHref: "/demo/pendants",
    howHref: "/how-it-works",
  },
  {
    id: "necklace",
    titleAr: "تجربة العقود الافتراضية",
    titleEn: "Virtual Necklace Try-On",
    taglineAr: "القطعة التي تكمل إطلالتك",
    taglineEn: "The Perfect Piece to Complete Your Look",
    descriptionAr:
      "تتيح هذه التقنية للمستخدم تجربة العقود المتدلية، ورؤية مدى تناسقها مع فتحة الرقبة ونوع الملابس بدقة عالية.",
    descriptionEn:
      "This technology allows users to try on different necklaces virtually and see how they complement necklines and clothing styles with high precision.",
    featuresAr: [
      "تجربة غامرة ومخصصة",
      "دعم كامل للتبديل بين الأشكال والخامات",
      "لا حاجة لتحميل تطبيق",
    ],
    featuresEn: [
      "Immersive and personalized experience",
      "Easy switching between styles and materials",
      "No app download required",
    ],
    image: "/images/neck/necklace.png",
    demoHref: "/demo/necklaces",
    howHref: "/how-it-works",
  },
  {
    id: "choker",
    titleAr: "تجربة أطواق الرقبة الافتراضية",
    titleEn: "Virtual Choker Try-On",
    taglineAr: "أناقة تلتف حول الرقبة",
    taglineEn: "Elegance Around Your Neck",
    descriptionAr:
      "جرّب الأطواق الملاصقة للرقبة بمقاسات مختلفة، وشاهد كيف تتناسب مع شكل الرقبة وتسريحة الشعر.",
    descriptionEn:
      "Try on close-fitting chokers in different sizes and see how they complement your neck shape and hairstyle.",
    featuresAr: [
      "تثبيت دقيق على الرقبة",
      "ضبط المقاس والسماكة",
      "ألوان وخامات متعددة",
    ],
    featuresEn: [
      "Precise neck positioning",
      "Adjustable sizes and thickness",
      "Multiple colors and materials",
    ],
    image: "/images/neck/choker.png",
    demoHref: "/demo/chokers",
    howHref: "/how-it-works",
  },
  {
    id: "scarf",
    titleAr: "تجربة الأوشحة والياقات الافتراضية",
    titleEn: "Virtual Scarves & Collars Try-On",
    taglineAr: "لمسة ناعمة تُكمل المظهر",
    taglineEn: "A Soft Touch That Completes the Look",
    descriptionAr:
      "شاهد الأوشحة والياقات وهي تنسدل على الكتفين وتتحرك مع العميل بملمس يشبه القماش الحقيقي.",
    descriptionEn:
      "See scarves and collars drape over the shoulders and move naturally with the customer, creating a realistic fabric-like appearance.",
    featuresAr: [
      "محاكاة سقوط القماش",
      "تبديل الألوان والنقوش",
      "يعمل من المتصفح مباشرة",
    ],
    featuresEn: [
      "Realistic fabric draping simulation",
      "Switch between colors and patterns",
      "Works directly in the browser",
    ],
    image: "/images/neck/scarf.png",
    demoHref: "/demo/scarves",
    howHref: "/how-it-works",
  },
];

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
    >
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold text-fg sm:text-5xl">
          {isArabic
            ? "لمسات نهائية أنيقة بأسلوب ذكي"
            : "Elegant Finishing Touches, Powered by Smart Technology"}
        </h2>

        <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
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
            className="absolute inset-x-10 bottom-0 top-10 -z-10 rounded-full bg-accent/10 blur-[100px]"
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
                    "absolute left-1/2 top-0 flex h-[590px] w-[min(82vw,330px)] flex-col rounded-2xl border bg-surface/90 p-6 text-center backdrop-blur transition-all duration-700 ease-out",
                    isActive
                      ? "border-highlight shadow-[0_0_40px_-12px_var(--highlight)]"
                      : "cursor-pointer border-line",
                  ].join(" ")}
                  style={{
                    transform: `translateX(-50%) translateX(${offset * 78}%) translateZ(${-abs * 120}px) rotateY(${-offset * 30}deg)`,
                    opacity: abs > 1 ? 0 : isActive ? 1 : 0.55,
                    zIndex: 10 - abs,
                    pointerEvents: abs > 1 ? "none" : "auto",
                  }}
                >
                  <h3 className="text-xl font-bold leading-9 text-fg">
                    {isArabic ? it.titleAr : it.titleEn}
                  </h3>

                  <p className="mt-2 text-xs text-fg">
                    {isArabic ? it.taglineAr : it.taglineEn}
                  </p>

                  <p className="mt-3 text-xs leading-7 text-muted">
                    {isArabic ? it.descriptionAr : it.descriptionEn}
                  </p>

                  <h4 className="mb-4 mt-8 text-lg font-semibold text-fg">
                    {isArabic ? "المميزات الأساسية" : "Key Features"}
                  </h4>

                  <ul
                    className={`space-y-3 text-xs text-muted ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {(isArabic ? it.featuresAr : it.featuresEn).map(
                      (feature, index) => (
                        <li key={index}>{feature}</li>
                      )
                    )}
                  </ul>

                  <div className="mt-auto space-y-3">
                    <Link
                      href={it.demoHref}
                      tabIndex={isActive ? 0 : -1}
                      className="block rounded-lg border border-line border-b-orange-400 bg-bg py-3.5 text-sm text-fg transition-colors hover:bg-surface-2"
                    >
                      {isArabic ? "اكتشف التقنية" : "Explore the Technology"}
                    </Link>

                    <Link
                      href={it.howHref}
                      tabIndex={isActive ? 0 : -1}
                      className="block rounded-lg border border-line border-b-sky-400 bg-bg py-3.5 text-sm text-fg transition-colors hover:bg-surface-2"
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
              className="grid size-9 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent disabled:opacity-30"
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
                    i === active
                      ? "scale-125 bg-highlight"
                      : "bg-fg/80 hover:bg-fg",
                  ].join(" ")}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              disabled={active === items.length - 1}
              aria-label={isArabic ? "التالي" : "Next"}
              className="grid size-9 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent disabled:opacity-30"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
