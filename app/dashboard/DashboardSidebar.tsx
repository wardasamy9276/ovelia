"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";

type SidebarItem = {
  href: string;
  ar: string;
  en: string;
  icon: string;
  badge?: string;
};

type SidebarSection = {
  titleAr: string;
  titleEn: string;
  items: SidebarItem[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    titleAr: "الرئيسية والمتابعة",
    titleEn: "Overview & Monitoring",
    items: [
      { href: "/dashboard", ar: "نظرة عامة", en: "Overview", icon: "📊" },
      { href: "/dashboard/notifications", ar: "الإشعارات", en: "Notifications", icon: "🔔", badge: "5" },
      { href: "/dashboard/messages", ar: "الرسائل والاستفسارات", en: "Messages", icon: "✉️", badge: "12" },
    ],
  },
  {
    titleAr: "إدارة المتجر",
    titleEn: "Store Management",
    items: [
      { href: "/dashboard/products", ar: "المنتجات", en: "Products", icon: "💄", badge: "124" },
      { href: "/dashboard/categories", ar: "الأقسام", en: "Categories", icon: "🗂️" },
      { href: "/dashboard/inventory", ar: "المخزون", en: "Inventory", icon: "📦", badge: "3" },
      { href: "/dashboard/orders", ar: "الطلبات", en: "Orders", icon: "🛍️", badge: "8" },
      { href: "/dashboard/customers", ar: "العملاء", en: "Customers", icon: "👥" },
      { href: "/dashboard/reviews", ar: "التقييمات", en: "Reviews", icon: "⭐" },
      { href: "/dashboard/coupons", ar: "العروض والكوبونات", en: "Coupons & Offers", icon: "🏷️" },
    ],
  },
  {
    titleAr: "الذكاء الاصطناعي والواقع المعزز",
    titleEn: "AI & AR Studio",
    items: [
      { href: "/dashboard/virtual-try-on", ar: "التجربة الافتراضية", en: "Virtual Try-On", icon: "✨" },
      { href: "/dashboard/blush-try-on", ar: "تجربة أحمر الخدود", en: "Blush Try-On", icon: "🌸" },
      { href: "/dashboard/skin-analysis", ar: "تحليل البشرة", en: "Skin Analysis", icon: "🔬" },
      { href: "/dashboard/face-analysis", ar: "تحليل الوجه", en: "Face Analysis", icon: "🪞" },
      { href: "/dashboard/shades", ar: "درجات الألوان", en: "Shade Library", icon: "🎨" },
    ],
  },
  {
    titleAr: "المحتوى والتسويق",
    titleEn: "Content & Marketing",
    items: [
      { href: "/dashboard/blog", ar: "المدونة والمقالات", en: "Blog & Articles", icon: "✍️" },
      { href: "/dashboard/media", ar: "مكتبة الوسائط", en: "Media Library", icon: "🎬" },
      { href: "/dashboard/campaigns", ar: "الحملات الترويجية", en: "Campaigns", icon: "📣" },
    ],
  },
  {
    titleAr: "التقارير والنظام",
    titleEn: "Reports & System",
    items: [
      { href: "/dashboard/analytics", ar: "الإحصائيات والتحليلات", en: "Analytics", icon: "📈" },
      { href: "/dashboard/sales-reports", ar: "تقارير المبيعات", en: "Sales Reports", icon: "🧾" },
      { href: "/dashboard/team", ar: "فريق العمل والصلاحيات", en: "Team & Roles", icon: "🛡️" },
      { href: "/dashboard/settings", ar: "الإعدادات العامة", en: "Settings", icon: "⚙️" },
    ],
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("orvelia-theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setIsDark(savedTheme === "dark");
    } else {
      setIsDark(document.documentElement.classList.contains("dark"));
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    html.classList.toggle("dark", isDark);
    html.classList.toggle("light", !isDark);
    localStorage.setItem("orvelia-theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  const isArabic = language === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const text = {
    brand: isArabic ? "أورفيليا" : "Orvelia",
    subtitle: isArabic ? "لوحة التحكم" : "Admin Panel",
    backToSite: isArabic ? "العودة للموقع" : "Back to Website",
    langLabel: isArabic ? "English" : "العربية",
    darkLabel: isArabic ? "الوضع الداكن" : "Dark Mode",
    lightLabel: isArabic ? "الوضع الفاتح" : "Light Mode",
    collapseLabel: isArabic ? "طي القائمة" : "Collapse",
    expandLabel: isArabic ? "توسيع القائمة" : "Expand",
    openMenu: isArabic ? "فتح القائمة" : "Open Menu",
    closeMenu: isArabic ? "إغلاق القائمة" : "Close Menu",
  };

  return (
    <>
      {/* زر فتح السايدبار في الموبايل */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label={text.openMenu}
        className={`fixed top-4 z-30 flex h-11 w-11 items-center justify-center rounded-xl border shadow-lg lg:hidden ${
          isArabic ? "right-4" : "left-4"
        } ${
          isDark
            ? "border-white/10 bg-[#0d1422] text-emerald-400"
            : "border-slate-200 bg-white text-emerald-600"
        }`}
      >
        ☰
      </button>

      {/* خلفية معتمة للموبايل */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* السايدبار */}
      <aside
        dir={dir}
        className={`fixed top-0 bottom-0 z-50 flex flex-col border transition-all duration-300 lg:sticky lg:h-screen lg:translate-x-0 ${
          collapsed ? "w-20" : "w-72"
        } ${
          isArabic
            ? `right-0 border-l ${
                mobileOpen ? "translate-x-0" : "translate-x-full"
              }`
            : `left-0 border-r ${
                mobileOpen ? "translate-x-0" : "-translate-x-full"
              }`
        } ${
          isDark
            ? "border-white/10 bg-[#0b101b] text-white"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        {/* رأس السايدبار (الشعار + زر الطي) */}
        <div
          className={`flex h-20 items-center justify-between border-b px-4 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 text-xl text-emerald-400 border border-emerald-400/30">
              ✧
            </span>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-lg font-extrabold tracking-tight">
                  {text.brand}
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  {text.subtitle}
                </span>
              </div>
            )}
          </Link>

          {/* زر طي/توسيع على الديسكتوب */}
          <button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            title={collapsed ? text.expandLabel : text.collapseLabel}
            aria-label={collapsed ? text.expandLabel : text.collapseLabel}
            className={`hidden h-8 w-8 items-center justify-center rounded-lg border text-xs transition lg:flex ${
              isDark
                ? "border-white/10 text-slate-400 hover:border-emerald-400/40 hover:text-emerald-300"
                : "border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {collapsed ? (isArabic ? "‹" : "›") : isArabic ? "›" : "‹"}
          </button>

          {/* زر إغلاق على الموبايل */}
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label={text.closeMenu}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 lg:hidden"
          >
            ✕
          </button>
        </div>

        {/* أقسام الروابط */}
        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
          {SIDEBAR_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              {!collapsed && (
                <p
                  className={`px-3 text-xs font-bold uppercase tracking-wider ${
                    isDark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {isArabic ? section.titleAr : section.titleEn}
                </p>
              )}

              {section.items.map((item) => {
                const isActive =
                  item.href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? (isArabic ? item.ar : item.en) : undefined}
                    className={`group flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? isDark
                          ? "bg-gradient-to-l from-emerald-500/20 to-cyan-500/10 text-emerald-300 border border-emerald-500/30 shadow-sm"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isDark
                        ? "text-slate-300 hover:bg-white/5 hover:text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className="shrink-0 text-base">{item.icon}</span>
                      {!collapsed && (
                        <span className="truncate">
                          {isArabic ? item.ar : item.en}
                        </span>
                      )}
                    </div>

                    {!collapsed && item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                          isActive
                            ? "bg-emerald-400/20 text-emerald-300"
                            : isDark
                            ? "bg-white/10 text-slate-300"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* الجزء السفلي (اللغة + الثيم + العودة للموقع) */}
        <div
          className={`space-y-2 border-t p-3 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          {/* زر تغيير اللغة */}
          <button
            type="button"
            onClick={toggleLanguage}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
              isDark
                ? "border-white/10 text-slate-300 hover:border-emerald-400/40 hover:text-emerald-300"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>🌐</span>
            {!collapsed && <span>{text.langLabel}</span>}
          </button>

          {/* زر الدارك / لايت مود */}
          <button
            type="button"
            onClick={() => setIsDark((prev) => !prev)}
            disabled={!mounted}
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
              isDark
                ? "border-amber-400/40 text-amber-300 hover:bg-amber-400/10"
                : "border-slate-300 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>{isDark ? "☀️" : "🌙"}</span>
            {!collapsed && (
              <span>
                {mounted
                  ? isDark
                    ? text.lightLabel
                    : text.darkLabel
                  : text.darkLabel}
              </span>
            )}
          </button>

          {/* العودة للموقع */}
          <Link
            href="/"
            className={`flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
              isDark
                ? "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10"
                : "border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-700"
            }`}
          >
            <span>{isArabic ? "→" : "←"}</span>
            {!collapsed && <span>{text.backToSite}</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}