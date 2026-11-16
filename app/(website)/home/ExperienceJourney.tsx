
"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type Feature = {
  title: string;
  text: string;
};

type Experience = {
  id: string;
  title: { ar: string; en: string };
  image: string;
  features: {
    ar: Feature[];
    en: Feature[];
  };
  demoHref: string;
  plansHref: string;
};

const experiences: Experience[] = [
  {
    id: "lipstick",
    title: {
      ar: "تجربة أحمر الشفاه الافتراضية",
      en: "Virtual Lipstick Try-On",
    },
    image: "/images/makeup/lipstick.jpg",
    features: {
      ar: [
        { title: "محرك انعكاس لامع", text: "يعيد إنشاء لمعان وتشطيب كل تركيبة بدقة عالية." },
        { title: "انعكاسات ضوئية ديناميكية", text: "تتكيّف الانعكاسات في الوقت الفعلي بشكل طبيعي مع الحركة والإضاءة." },
        { title: "محاكي الترطيب واللمعان", text: "تصوّر الرطوبة والحجم والقوام الحقيقي للمنتج قبل الشراء." },
      ],
      en: [
        { title: "Gloss Reflection Engine", text: "Recreates the shine and finish of every formula with high precision." },
        { title: "Dynamic Light Reflections", text: "Reflections adapt naturally to movement and lighting in real time." },
        { title: "Hydration & Shine Simulator", text: "Visualizes the product's moisture, volume, and realistic texture before purchase." },
      ],
    },
    demoHref: "/demo/lipstick",
    plansHref: "/pricing",
  },
  {
    id: "eyeshadow",
    title: {
      ar: "تجربة ظلال العيون الافتراضية",
      en: "Virtual Eyeshadow Try-On",
    },
    image: "/images/makeup/eyeshadow.jpg",
    features: {
      ar: [
        { title: "تدرجات لونية ناعمة", text: "دمج الألوان وتدرجها على الجفن بشكل واقعي وسلس." },
        { title: "لمعة وشمر دقيق", text: "يحاكي الجزيئات اللامعة والتشطيب المطفي والمعدني." },
        { title: "تتبع حركة العين", text: "يثبت الظل في مكانه مع الرمش وتغيّر زاوية النظر." },
      ],
      en: [
        { title: "Smooth Color Gradients", text: "Blends and transitions colors across the eyelid naturally and seamlessly." },
        { title: "Precise Shimmer & Shine", text: "Simulates shimmer particles and matte or metallic finishes." },
        { title: "Eye Movement Tracking", text: "Keeps eyeshadow in place while blinking and changing viewing angles." },
      ],
    },
    demoHref: "/demo/eyeshadow",
    plansHref: "/pricing",
  },
  {
    id: "foundation",
    title: {
      ar: "تجربة كريم الأساس الافتراضية",
      en: "Virtual Foundation Try-On",
    },
    image: "/images/makeup/foundation.jpg",
    features: {
      ar: [
        { title: "مطابقة درجة البشرة", text: "يقترح الدرجة الأنسب بناءً على لون البشرة ودرجة اللون الفرعي." },
        { title: "تغطية قابلة للتعديل", text: "من الخفيفة إلى الكاملة مع إبقاء ملمس البشرة الطبيعي ظاهرًا." },
        { title: "تشطيب مطفي أو متوهج", text: "قارن بين التشطيبات في ثوانٍ قبل اختيار المنتج." },
      ],
      en: [
        { title: "Skin Tone Matching", text: "Suggests the most suitable shade based on skin tone and undertone." },
        { title: "Adjustable Coverage", text: "Choose from light to full coverage while preserving natural skin texture." },
        { title: "Matte or Radiant Finish", text: "Compare different finishes in seconds before choosing a product." },
      ],
    },
    demoHref: "/demo/foundation",
    plansHref: "/pricing",
  },
  {
    id: "blush",
    title: {
      ar: "تجربة أحمر الخدود والكونتور",
      en: "Virtual Blush & Contour Try-On",
    },
    image: "/images/makeup/blush.jpg",
    features: {
      ar: [
        { title: "نحت دقيق للوجه", text: "يتبع ملامح الوجه لتوزيع الكونتور والهايلايتر بشكل صحيح." },
        { title: "شدة قابلة للتحكم", text: "اضبط كثافة اللون ليناسب الإطلالة اليومية أو المسائية." },
        { title: "ألوان متناسقة", text: "تنسيق تلقائي لدرجات الخدود مع باقي مكياج الوجه." },
      ],
      en: [
        { title: "Precise Facial Sculpting", text: "Follows facial features to apply contour and highlighter accurately." },
        { title: "Adjustable Intensity", text: "Control color intensity for everyday or evening looks." },
        { title: "Harmonized Colors", text: "Automatically coordinates blush shades with the rest of your makeup." },
      ],
    },
    demoHref: "/demo/blush",
    plansHref: "/pricing",
  },
  {
    id: "eyeliner",
    title: {
      ar: "تجربة الآيلاينر والرموش",
      en: "Virtual Eyeliner & Lashes Try-On",
    },
    image: "/images/makeup/eyeliner.jpg",
    features: {
      ar: [
        { title: "خطوط بأشكال متعددة", text: "جرّب الكات آي والخط الرفيع والجناح الطويل على شكل عينك." },
        { title: "رموش بأحجام مختلفة", text: "قارن بين الرموش الطبيعية والكثيفة والمنفوشة فورًا." },
        { title: "ثبات مع الحركة", text: "يبقى الخط مضبوطًا حتى مع الرمش وتحريك الرأس." },
      ],
      en: [
        { title: "Multiple Eyeliner Styles", text: "Try cat-eye, fine lines, and dramatic wings tailored to your eye shape." },
        { title: "Different Lash Styles", text: "Instantly compare natural, voluminous, and dramatic lashes." },
        { title: "Stable Motion Tracking", text: "Keeps eyeliner perfectly aligned while blinking and moving your head." },
      ],
    },
    demoHref: "/demo/eyeliner",
    plansHref: "/pricing",
  },
  {
    id: "brows",
    title: {
      ar: "تجربة الحواجب الافتراضية",
      en: "Virtual Eyebrow Try-On",
    },
    image: "/images/makeup/brows.jpg",
    features: {
      ar: [
        { title: "أشكال وسماكات متعددة", text: "اختر شكل الحاجب الأنسب لملامحك من مجموعة جاهزة." },
        { title: "ألوان طبيعية", text: "درجات تتناسب مع لون الشعر والبشرة بتفاصيل دقيقة." },
        { title: "ملمس يشبه الحقيقة", text: "يحاكي الشعيرات الفردية للحصول على نتيجة طبيعية." },
      ],
      en: [
        { title: "Multiple Shapes & Thicknesses", text: "Choose the eyebrow shape that best complements your facial features." },
        { title: "Natural Colors", text: "Shades that complement your hair and skin tone with precise details." },
        { title: "Realistic Texture", text: "Simulates individual eyebrow hairs for a natural-looking result." },
      ],
    },
    demoHref: "/demo/brows",
    plansHref: "/pricing",
  },
];

const GAP = 20;

function CheckIcon() {
  return (
    <span
      className="grid size-6 shrink-0 place-items-center rounded-full border border-emerald-500 text-emerald-500"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      >
        <path
          d="m5 12 5 5 9-10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ExperienceCard({
  item,
  isArabic,
}: {
  item: Experience;
  isArabic: boolean;
}) {
  const title = isArabic ? item.title.ar : item.title.en;
  const features = isArabic ? item.features.ar : item.features.en;

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface">
      <div
        className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-l from-transparent via-emerald-400 to-transparent"
        aria-hidden
      />

      <div className="relative m-4 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface-2">
        <Image
          src={item.image}
          alt={title}
          fill
          sizes="(min-width:1024px) 400px, 85vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
        <h3 className="mb-5 text-xl font-semibold text-fg">
          {title}
        </h3>

        <ul className="flex-1 space-y-4">
          {features.map((feature) => (
            <li key={feature.title}>
              <div className="flex items-center gap-3">
                <CheckIcon />
                <span className="font-medium text-fg">
                  {feature.title}
                </span>
              </div>

              <p
                className={`mt-1.5 text-xs leading-6 text-muted ${
                  isArabic ? "pr-9" : "pl-9"
                }`}
              >
                {feature.text}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link
            href={item.demoHref}
            className="rounded-lg border border-line border-b-sky-500 bg-bg py-3 text-center text-sm text-fg transition-colors hover:bg-surface-2"
          >
            {isArabic ? "جرب العرض" : "Try Demo"}
          </Link>

          <Link
            href={item.plansHref}
            className="rounded-lg border border-line border-b-orange-500 bg-bg py-3 text-center text-sm text-fg transition-colors hover:bg-surface-2"
          >
            {isArabic ? "الخطط والأسعار" : "Plans & Pricing"}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function MakeupExperiences() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const trackRef = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);

  const getStep = useCallback(() => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    return card ? card.offsetWidth + GAP : 0;
  }, []);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    const step = getStep();

    if (el && step) {
      setIndex(Math.round(Math.abs(el.scrollLeft) / step));
    }
  }, [getStep]);

  useEffect(() => {
    const el = trackRef.current;

    el?.addEventListener("scroll", onScroll, { passive: true });

    return () => el?.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const go = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({
      left: (isArabic ? -1 : 1) * dir * getStep(),
      behavior: "smooth",
    });
  };

  const goTo = (i: number) => {
    trackRef.current?.scrollTo({
      left: (isArabic ? -1 : 1) * i * getStep(),
      behavior: "smooth",
    });
  };

  const title = isArabic
    ? "التجربة الافتراضية للمكياج"
    : "Virtual Makeup Experiences";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="px-5 py-16"
      aria-roledescription="carousel"
      aria-label={title}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-10 text-3xl font-bold text-fg sm:text-4xl">
          {title}
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={isArabic ? "السابق" : "Previous"}
            className="absolute -right-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-fg shadow-lg transition-colors hover:border-accent hover:text-accent lg:grid"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path
                d="m9 6 6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => go(1)}
            aria-label={isArabic ? "التالي" : "Next"}
            className="absolute -left-4 top-1/2 z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-fg shadow-lg transition-colors hover:border-accent hover:text-accent lg:grid"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path
                d="m15 6-6 6 6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <ul
            ref={trackRef}
            className="flex snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {experiences.map((item, i) => (
              <li
                key={item.id}
                aria-roledescription="slide"
                aria-label={
                  isArabic
                    ? `${i + 1} من ${experiences.length}`
                    : `${i + 1} of ${experiences.length}`
                }
                className="w-[88%] shrink-0 snap-start sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
              >
                <ExperienceCard item={item} isArabic={isArabic} />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-8 flex justify-center gap-2"
          role="tablist"
          aria-label={isArabic ? "اختيار الشريحة" : "Choose slide"}
        >
          {experiences.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={
                isArabic ? item.title.ar : item.title.en
              }
              onClick={() => goTo(i)}
              className={[
                "h-2 rounded-full transition-all",
                i === index
                  ? "w-6 bg-accent"
                  : "w-2 bg-line hover:bg-muted",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
