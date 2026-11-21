"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";

type Localized = { ar: string; en: string };

export type Article = {
  id: number;
  slug: string;
  category: Localized;
  title: Localized;
  excerpt: Localized;
  readTime: Localized;
};

type Props = {
  article: Article;
  index: number;
  lang: "ar" | "en";
};

export default function ArticleRow({ article, index, lang }: Props) {
  const isArabic = lang === "ar";
  const Arrow = isArabic ? ArrowLeft : ArrowRight;
  const number = String(index + 1).padStart(2, "0");

  return (
    <li>
      <Link
        href={`/blog/${article.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 py-8 transition-colors duration-300 md:grid-cols-[auto_1fr_auto_auto] md:gap-x-10 md:py-10"
      >
        {/* Number */}
        <span className="text-3xl font-black text-emerald-700/30 transition-colors duration-300 group-hover:text-emerald-700 dark:text-emerald-300/25 dark:group-hover:text-emerald-300 md:text-5xl">
          {number}
        </span>

        {/* Text */}
        <div className="min-w-0">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
            {article.category[lang]}
          </span>
          <h3 className="mt-1 text-xl font-black leading-9 text-[#071A2F] transition-colors duration-300 group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-300 md:text-2xl">
            {article.title[lang]}
          </h3>
          <p className="mt-2 hidden max-w-2xl text-sm leading-7 text-slate-600 dark:text-emerald-50/65 md:block">
            {article.excerpt[lang]}
          </p>
        </div>

        {/* Read time */}
        <span className="hidden items-center gap-2 text-xs text-slate-500 dark:text-emerald-50/60 md:inline-flex">
          <Clock size={14} />
          {article.readTime[lang]}
        </span>

        {/* Arrow */}
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-700/30 text-emerald-700 transition duration-300 group-hover:bg-emerald-700 group-hover:text-white dark:border-emerald-300/30 dark:text-emerald-300 dark:group-hover:bg-emerald-300 dark:group-hover:text-[#061811]">
          <Arrow
            size={19}
            className={`transition-transform duration-300 ${
              isArabic ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
            }`}
          />
        </span>
      </Link>
    </li>
  );
}