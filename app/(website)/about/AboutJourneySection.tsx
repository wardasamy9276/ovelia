
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  Droplets,
  Gem,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";
import {
  aboutJourneyData,
  type CategoryId,
} from "../about/data/aboutJourneyData";

type Filter = "all" | CategoryId;

const categoryIcons: Record<CategoryId, LucideIcon> = {
  brand: Sparkles,
  skincare: Droplets,
  makeup: Palette,
  accessories: Gem,
};

// Green color palette
const categoryStyles: Record<
  CategoryId,
  {
    badge: string;
    dot: string;
    dotFill: string;
    bullet: string;
    chipActive: string;
  }
> = {
  brand: {
    badge:
      "border-teal-500/30 bg-teal-500/10 text-teal-800 dark:text-teal-300",
    dot: "border-teal-500",
    dotFill: "bg-teal-500 ring-teal-500/25",
    bullet: "text-teal-600 dark:text-teal-400",
    chipActive:
      "border-teal-600 bg-teal-600 text-white shadow-lg shadow-teal-500/20",
  },
  skincare: {
    badge:
      "border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
    dot: "border-emerald-500",
    dotFill: "bg-emerald-500 ring-emerald-500/25",
    bullet: "text-emerald-600 dark:text-emerald-400",
    chipActive:
      "border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-500/20",
  },
  makeup: {
    badge:
      "border-green-500/30 bg-green-500/10 text-green-800 dark:text-green-300",
    dot: "border-green-500",
    dotFill: "bg-green-500 ring-green-500/25",
    bullet: "text-green-600 dark:text-green-400",
    chipActive:
      "border-green-600 bg-green-600 text-white shadow-lg shadow-green-500/20",
  },
  accessories: {
    badge:
      "border-lime-600/30 bg-lime-500/10 text-lime-800 dark:text-lime-300",
    dot: "border-lime-600",
    dotFill: "bg-lime-500 ring-lime-500/25",
    bullet: "text-lime-700 dark:text-lime-400",
    chipActive:
      "border-lime-600 bg-lime-600 text-white shadow-lg shadow-lime-500/20",
  },
};

export default function AboutJourneySection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const lang = isArabic ? "ar" : "en";
  const data = aboutJourneyData;

  const [active, setActive] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      active === "all"
        ? data.milestones
        : data.milestones.filter((m) => m.category === active),
    [active, data.milestones]
  );

  const categoryLabel = (id: CategoryId) =>
    data.categories.find((c) => c.id === id)?.label[lang] ?? "";

  const chipBase =
    "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500";

  const chipIdle =
    "border-emerald-200 bg-white/70 text-emerald-900 hover:border-emerald-500 hover:bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-200 dark:hover:border-emerald-500 dark:hover:bg-emerald-900/30";

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#10251D] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-10">
        {/* Header */}
        <div className="max-w-2xl">
          <h2 className="text-3xl font-black leading-tight text-emerald-950 dark:text-emerald-50 sm:text-4xl md:text-5xl">
            {data.title[lang]}
          </h2>

          <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-slate-300 md:text-base">
            {data.subtitle[lang]}
          </p>

          <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-400 md:text-base">
            {data.intro[lang]}
          </p>
        </div>

        {/* Stats */}
        <dl className="mt-14 grid grid-cols-2 border-y border-emerald-200 dark:border-emerald-900/40 md:grid-cols-4">
          {data.stats.map((stat, i) => (
            <div
              key={stat.id}
              className={`px-4 py-7 md:px-6 ${
                i % 2 === 1
                  ? "border-s border-emerald-200 dark:border-emerald-900/40"
                  : ""
              } ${
                i >= 2
                  ? "border-t border-emerald-200 dark:border-emerald-900/40 md:border-t-0"
                  : ""
              } ${
                i > 0
                  ? "md:border-s md:border-emerald-200 md:dark:border-emerald-900/40"
                  : ""
              }`}
            >
              <dt className="text-xs text-slate-500 dark:text-slate-400">
                {stat.label[lang]}
              </dt>

              <dd className="mt-1 text-3xl font-black tabular-nums text-emerald-600 dark:text-emerald-400 md:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Filter */}
        <div
          className="mt-16 flex flex-wrap gap-2.5"
          role="group"
          aria-label={data.title[lang]}
        >
          <button
            type="button"
            aria-pressed={active === "all"}
            onClick={() => setActive("all")}
            className={`${chipBase} ${
              active === "all"
                ? "border-emerald-700 bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 dark:border-emerald-500 dark:bg-emerald-500 dark:text-[#03130C]"
                : chipIdle
            }`}
          >
            {data.allLabel[lang]}
            <span className="text-xs opacity-70">
              {data.milestones.length}
            </span>
          </button>

          {data.categories.map((cat) => {
            const Icon = categoryIcons[cat.id];
            const count = data.milestones.filter(
              (m) => m.category === cat.id
            ).length;

            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active === cat.id}
                onClick={() => setActive(cat.id)}
                className={`${chipBase} ${
                  active === cat.id
                    ? categoryStyles[cat.id].chipActive
                    : chipIdle
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label[lang]}
                <span className="text-xs opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <ol className="relative mt-14">
          <span
            aria-hidden="true"
            className="absolute bottom-0 top-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500/40 to-transparent start-[15px] md:left-1/2 md:start-auto md:-translate-x-1/2"
          />

          {visible.map((item, index) => {
            const isLast = index === visible.length - 1;
            const isEven = index % 2 === 0;
            const style = categoryStyles[item.category];
            const Icon = categoryIcons[item.category];

            return (
              <li
                key={item.id}
                className="relative grid grid-cols-[32px_1fr] gap-x-5 pb-14 last:pb-0 md:grid-cols-[1fr_64px_1fr] md:gap-x-0 md:pb-20"
              >
                {/* Dot */}
                <div className="relative z-10 col-start-1 row-start-1 flex justify-center pt-2 md:col-start-2">
                  <span
                    className={
                      isLast
                        ? `h-4 w-4 rounded-full ring-[6px] ${style.dotFill}`
                        : `h-4 w-4 rounded-full border-2 bg-white dark:bg-[#071716] ${style.dot}`
                    }
                  />
                </div>

                {/* Content */}
                <div
                  className={`col-start-2 row-start-1 md:px-10 ${
                    isEven
                      ? "md:col-start-1 md:text-end"
                      : "md:col-start-3 md:text-start"
                  }`}
                >
                  <span className="block text-4xl font-black tabular-nums text-emerald-950 dark:text-emerald-50 md:text-5xl">
                    {item.year}
                  </span>

                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${style.badge}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {categoryLabel(item.category)}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-emerald-950 dark:text-white md:text-2xl">
                    {item.title[lang]}
                  </h3>

                  <p
                    className={`mt-2 max-w-md text-sm leading-8 text-slate-600 dark:text-slate-400 md:text-base ${
                      isEven ? "md:ms-auto" : ""
                    }`}
                  >
                    {item.description[lang]}
                  </p>

                  <ul
                    className={`mt-4 max-w-md space-y-2 text-sm text-slate-700 dark:text-slate-300 ${
                      isEven ? "md:ms-auto" : ""
                    }`}
                  >
                    {item.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-start"
                      >
                        <Check
                          className={`mt-1 h-4 w-4 shrink-0 ${style.bullet}`}
                        />
                        <span className="leading-7">{h[lang]}</span>
                      </li>
                    ))}
                  </ul>

                  {item.stat && (
                    <p
                      className={`mt-5 flex max-w-md items-baseline gap-2 ${
                        isEven ? "md:ms-auto md:justify-end" : ""
                      }`}
                    >
                      <span className="text-2xl font-black tabular-nums text-emerald-600 dark:text-emerald-400">
                        {item.stat.value}
                      </span>

                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {item.stat.label[lang]}
                      </span>
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        {/* Closing */}
        <div className="mt-24 grid gap-12 border-t border-emerald-200 pt-16 dark:border-emerald-900/40 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <blockquote className="text-2xl font-black leading-relaxed text-emerald-950 dark:text-emerald-50 sm:text-3xl">
              {data.closing.quote[lang]}
            </blockquote>

            <Link
              href={data.closing.ctaHref}
              className="mt-8 inline-flex items-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
            >
              {data.closing.cta[lang]}
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50">
              {data.closing.promisesTitle[lang]}
            </h3>

            <ul className="mt-4 divide-y divide-emerald-200 dark:divide-emerald-900/40">
              {data.closing.promises.map((p) => (
                <li key={p.id} className="py-5">
                  <p className="font-bold">{p.title[lang]}</p>

                  <p className="mt-1.5 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {p.text[lang]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
