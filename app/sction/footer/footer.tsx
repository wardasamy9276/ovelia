
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import  PartnersMarquee  from "../../(website)/PartnersMarquee/PartnersMarquee"

export default function Footer() {
  const { language } = useLanguage();

  const isArabic = language === "ar";

  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const getPath = (path: string) =>
    `/${language}${path === "/" ? "" : path}`;

  const footerGroups = [
    {
      title: { ar: "روابط سريعة", en: "Quick Links" },
      links: [
        { ar: "الرئيسية", en: "Home", href: "/" },
        { ar: "من نحن", en: "About Us", href: "/about" },
        { ar: "الخدمات", en: "Services", href: "/services" },
        { ar: "المدونة", en: "Blog", href: "/blog" },
        { ar: "اتصل بنا", en: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: { ar: "منتجات التجميل", en: "Beauty Products" },
      links: [
        { ar: "العدسات اللاصقة", en: "Contact Lenses", href: "/beauty" },
        { ar: "الرموش الصناعية", en: "False Eyelashes", href: "/eyes" },
        { ar: "الماسكارا", en: "Mascara", href: "/beauty" },
        { ar: "الآيلاينر", en: "Eyeliner", href: "/eyes" },
        { ar: "أحمر الشفاه", en: "Lipstick", href: "/makeup" },
        { ar: "الفاونديشن", en: "Foundation", href: "/makeup" },
        { ar: "العناية بالبشرة", en: "Skincare", href: "/skincare" },
      ],
    },
    {
      title: { ar: "التقنيات", en: "Technologies" },
      links: [
        { ar: "الذكاء الاصطناعي", en: "Artificial Intelligence", href: "/technologies" },
        { ar: "الواقع المعزز", en: "Augmented Reality", href: "/gate/ar-tools" },
        { ar: "تجربة المكياج", en: "Virtual Makeup", href: "/makeup" },
        { ar: "تجربة العدسات", en: "Lens Try-On", href: "/eyes" },
        { ar: "تحليل البشرة", en: "Skin Analysis", href: "/skincare" },
        { ar: "تحليل الوجه", en: "Face Analysis", href: "/gate/ai-tech" },
      ],
    },
    {
      title: { ar: "الحلول والخدمات", en: "Solutions & Services" },
      links: [
        { ar: "حلول التجميل", en: "Beauty Solutions", href: "/solutions" },
        { ar: "حلول المتاجر", en: "Store Solutions", href: "/solutions" },
        { ar: "الباقات", en: "Packages", href: "/packages" },
        { ar: "الخدمات الرقمية", en: "Digital Services", href: "/services" },
        { ar: "الدعم الفني", en: "Technical Support", href: "/support" },
        { ar: "الأسئلة الشائعة", en: "FAQ", href: "/faq" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "f", color: "hover:text-blue-500" },
    { name: "YouTube", icon: "▶", color: "hover:text-red-500" },
    { name: "X", icon: "𝕏", color: "hover:text-white" },
    { name: "TikTok", icon: "♪", color: "hover:text-pink-400" },
    { name: "Instagram", icon: "◎", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: "in", color: "hover:text-blue-400" },
  ];

  return (
    <footer
      dir={isArabic ? "rtl" : "ltr"}
      className="relative mt-20 overflow-hidden border-t border-white/10 bg-[#020609] text-white"
    >
          <PartnersMarquee />
      {/* TOP CTA */}

      <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#071626] to-[#020609] px-5 py-16 text-center">
        <div className="absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/5 px-4 py-2 text-xs text-green-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            {isArabic
              ? "اكتشفي عالم الجمال والتكنولوجيا"
              : "Discover Beauty & Technology"}
          </div>

          <h2 className="mb-4 text-2xl font-extrabold md:text-4xl">
            {isArabic
              ? "ابدأ رحلتك مع أورفيليا"
              : "Start Your Journey with Orvelia"}
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-sm leading-8 text-gray-400">
            {isArabic
              ? "اكتشفي تجربة رقمية مختلفة تجمع بين عالم الجمال والذكاء الاصطناعي والواقع المعزز، واستمتعي بتجربة منتجاتك المفضلة بطريقة مبتكرة."
              : "Discover a unique digital experience combining beauty, artificial intelligence and augmented reality."}
          </p>

          <Link
            href={getPath("/demo")}
            className="inline-flex items-center gap-3 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-green-500/20 to-cyan-500/20 px-8 py-4 font-bold text-cyan-300 shadow-[0_0_25px_rgba(0,220,200,0.12)] transition duration-300 hover:border-green-400 hover:bg-green-400/10 hover:text-green-300"
          >
            {isArabic ? "ابدئي التجربة الآن" : "Start Your Experience"}
            <span>↗</span>
          </Link>
        </div>
      </div>

      {/* FOOTER CONTENT */}

      <div className="relative mx-auto max-w-[1450px] px-6 py-14 md:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-5">

          {/* BRAND */}

          <div className="col-span-2 lg:col-span-1">
            <Link
              href={getPath("/")}
              className="mb-5 inline-flex items-center gap-2 text-2xl font-extrabold"
            >
              <span>Orvelia</span>
              <span className="text-3xl text-green-400 drop-shadow-[0_0_12px_#00ff88]">
                ✧
              </span>
            </Link>

            <p className="max-w-xs text-sm leading-8 text-gray-400">
              {isArabic
                ? "أورفيليا بوابتك إلى مستقبل الجمال الرقمي، حيث يلتقي الذكاء الاصطناعي بالواقع المعزز لتقديم تجارب تجميل مبتكرة."
                : "Orvelia is your gateway to the future of digital beauty, combining AI and augmented reality."}
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#00ff88]" />
              {isArabic
                ? "الجمال بتقنيات المستقبل"
                : "Beauty Powered by Future Tech"}
            </div>
          </div>

          {/* FOOTER GROUPS */}

          {footerGroups.map((group) => (
            <div key={group.title.en}>
              <h3 className="mb-6 text-sm font-bold text-white">
                <span className="mb-3 block h-[2px] w-8 rounded-full bg-gradient-to-r from-green-400 to-cyan-400" />
                {group.title[language]}
              </h3>

              <ul className="space-y-4">
                {group.links.map((link, index) => (
                  <li key={`${group.title.en}-${index}`}>
                    <Link
                      href={getPath(link.href)}
                      className="group flex items-center gap-2 text-xs text-gray-400 transition duration-300 hover:translate-x-[-3px] hover:text-green-400"
                    >
                      <span className="text-[10px] text-cyan-500 opacity-0 transition group-hover:opacity-100">
                        ✧
                      </span>

                      {link[language]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* NEWSLETTER */}

        <div className="mt-14 rounded-2xl border border-cyan-400/15 bg-gradient-to-r from-[#071626] to-[#06121d] p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div className="mb-5 md:mb-0">
            <h3 className="mb-2 font-bold text-green-400">
              {isArabic ? "كوني أول من يعرف جديدنا" : "Stay Updated"}
            </h3>

            <p className="text-xs leading-6 text-gray-400">
              {isArabic
                ? "تابعي أحدث منتجات التجميل والتقنيات والعروض الجديدة."
                : "Discover new beauty products, technologies and offers."}
            </p>
          </div>

          <Link
            href={getPath("/blog")}
            className="inline-flex items-center gap-3 rounded-lg border border-green-400/30 px-6 py-3 text-xs font-bold text-cyan-300 transition hover:bg-green-400/10 hover:text-green-400"
          >
            {isArabic ? "اكتشفي آخر الأخبار" : "Explore Latest News"}
            <span>↗</span>
          </Link>
        </div>

        {/* SOCIAL + COPYRIGHT */}

        <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                aria-label={social.name}
                title={social.name}
                className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
            <span>© {year ?? ""}</span>
            <span className="font-bold text-green-400">Orvelia</span>
            <span>
              {isArabic
                ? "جميع الحقوق محفوظة."
                : "All Rights Reserved."}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
