
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type Post = {
  id: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  image: string;
  badge: string;
  dateAr: string;
  dateEn: string;
  iso: string;
  href: string;
};

const posts: Post[] = [
  {
    id: "makeup-prepurchase",
    titleAr: "تجربة المكياج قبل الشراء افتراضيا",
    titleEn: "Virtual Makeup Try-On Before Purchase",
    excerptAr:
      "اكتشف كيف تساعد تجربة المكياج قبل الشراء العملاء على اختيار المنتجات بثقة، وامنح متجرك تجربة تسوق تفاعلية.",
    excerptEn:
      "Discover how virtual makeup try-on helps customers choose products with confidence and gives your store an interactive shopping experience.",
    image: "/images/blog/makeup-prepurchase.jpg",
    badge: "AI & Virtual Try-On",
    dateAr: "10 نوفمبر 2026",
    dateEn: "November 10, 2026",
    iso: "2026-11-10",
    href: "/blog/makeup-prepurchase",
  },
  {
    id: "ai-beauty",
    titleAr: "الذكاء الاصطناعي في التجميل وتطبيقاته الحديثة",
    titleEn: "Artificial Intelligence in Beauty and Its Modern Applications",
    excerptAr:
      "اكتشف كيف يغير الذكاء الاصطناعي صناعة التجميل من خلال التخصيص وتجربة المنتجات وتحسين تجربة العملاء.",
    excerptEn:
      "Discover how artificial intelligence is transforming the beauty industry through personalization, product try-on, and improved customer experiences.",
    image: "/images/blog/ai-beauty.jpg",
    badge: "AI & Virtual Try-On",
    dateAr: "26 أكتوبر 2026",
    dateEn: "October 26, 2026",
    iso: "2026-10-26",
    href: "/blog/ai-in-beauty",
  },
  {
    id: "lipstick-ai",
    titleAr:
      "تجربة مكياج الشفاه الافتراضية بالذكاء الاصطناعي: تطوير اكتشاف منتجات التجميل",
    titleEn:
      "AI-Powered Virtual Lipstick Try-On: Transforming Beauty Product Discovery",
    excerptAr:
      "اكتشف كيف تجمع NovaTech بين الذكاء الاصطناعي والواقع المعزز وتقنية Virtual Try-On لتقديم تجربة تفاعلية لاكتشاف درجات أحمر الشفاه.",
    excerptEn:
      "Discover how NovaTech combines artificial intelligence, augmented reality, and Virtual Try-On technology to create an interactive lipstick discovery experience.",
    image: "/images/blog/lipstick-ai.jpg",
    badge: "AI & Virtual Try-On",
    dateAr: "26 سبتمبر 2026",
    dateEn: "September 26, 2026",
    iso: "2026-09-26",
    href: "/blog/virtual-lipstick",
  },
  {
    id: "lips-colors",
    titleAr: "كيف تختار درجة أحمر الشفاه المناسبة باستخدام التجربة الافتراضية",
    titleEn: "How to Choose the Perfect Lipstick Shade with Virtual Try-On",
    excerptAr:
      "دليل عملي لمطابقة درجات الشفاه مع لون البشرة والمناسبة، ومقارنة التشطيبات في ثوانٍ قبل الشراء.",
    excerptEn:
      "A practical guide to matching lipstick shades with skin tones and occasions, and comparing finishes in seconds before making a purchase.",
    image: "/images/blog/lips-colors.jpg",
    badge: "AI & Virtual Try-On",
    dateAr: "12 أغسطس 2026",
    dateEn: "August 12, 2026",
    iso: "2026-08-12",
    href: "/blog/lipstick-shades",
  },
];

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

export default function BlogShowcase() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [activeId, setActiveId] = useState(posts[0].id);

  const active = posts.find((p) => p.id === activeId)!;

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="px-5 py-12"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* المقال الرئيسي */}
        <article
          key={active.id}
          className="overflow-hidden rounded-3xl border border-line bg-surface lg:sticky lg:top-6"
        >
          <div className="relative aspect-[16/9] bg-surface-2">
            <Image
              src={active.image}
              alt={isArabic ? active.titleAr : active.titleEn}
              fill
              priority
              sizes="(min-width:1024px) 70vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="p-8 sm:p-10">
            <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
              {active.badge}
            </span>

            <h1 className="mt-4 text-2xl font-bold leading-[1.6] text-fg sm:text-3xl">
              {isArabic ? active.titleAr : active.titleEn}
            </h1>

            <p className="mt-4 max-w-3xl leading-8 text-muted">
              {isArabic ? active.excerptAr : active.excerptEn}
            </p>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
              <time
                dateTime={active.iso}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <CalendarIcon />
                {isArabic ? active.dateAr : active.dateEn}
              </time>

              <Link
                href={active.href}
                className="rounded-full border border-accent px-6 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-fg"
              >
                {isArabic ? "قراءة المقال" : "Read Article"}
              </Link>
            </div>
          </div>
        </article>

        {/* قائمة المقالات */}
        <ul
          aria-label={isArabic ? "أحدث المقالات" : "Latest Articles"}
          className="flex flex-col gap-5 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pl-1 [scrollbar-color:var(--line)_transparent] [scrollbar-width:thin]"
        >
          {posts.map((p) => {
            const selected = p.id === activeId;

            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(p.id)}
                  aria-pressed={selected}
                  className={[
                    "group block w-full overflow-hidden rounded-3xl border bg-surface text-start transition-colors",
                    selected
                      ? "border-accent"
                      : "border-line hover:border-accent/50",
                  ].join(" ")}
                >
                  <span className="relative block aspect-[16/8] bg-surface-2">
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes="380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-sky-600">
                      {p.badge}
                    </span>
                  </span>

                  <span className="block p-5">
                    <span className="block text-base font-bold leading-8 text-fg">
                      {isArabic ? p.titleAr : p.titleEn}
                    </span>

                    <span className="mt-2 line-clamp-2 block border-b border-line pb-3 text-xs leading-6 text-muted">
                      {isArabic ? p.excerptAr : p.excerptEn}
                    </span>

                    <time
                      dateTime={p.iso}
                      className="mt-3 flex items-center gap-2 text-[11px] text-muted"
                    >
                      <CalendarIcon />
                      {isArabic ? p.dateAr : p.dateEn}
                    </time>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
