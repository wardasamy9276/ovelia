"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type MenuItem = {
  ar: string;
  en: string;
};

type Menu = {
  title: MenuItem;
  href: string;
  items: MenuItem[];
};

const menus: Menu[] = [
  {
    title: { ar: "منتجات التجميل", en: "Beauty Products" },
    href: "/beauty",
    items: [
      { ar: "جميع منتجات التجميل", en: "All Beauty Products" },
      { ar: "العدسات اللاصقة", en: "Contact Lenses" },
      { ar: "العدسات الملونة", en: "Colored Contact Lenses" },
      { ar: "العدسات الطبيعية", en: "Natural Contact Lenses" },
      { ar: "العدسات الطبية", en: "Prescription Lenses" },
      { ar: "الرموش الصناعية", en: "False Eyelashes" },
      { ar: "الرموش المغناطيسية", en: "Magnetic Eyelashes" },
      { ar: "الرموش الفردية", en: "Individual Lashes" },
      { ar: "وصلات الرموش", en: "Lash Extensions" },
      { ar: "الماسكارا", en: "Mascara" },
      { ar: "ماسكارا تطويل الرموش", en: "Lengthening Mascara" },
      { ar: "ماسكارا تكثيف الرموش", en: "Volumizing Mascara" },
      { ar: "الآيلاينر", en: "Eyeliner" },
      { ar: "الآيلاينر السائل", en: "Liquid Eyeliner" },
      { ar: "الآيلاينر الجل", en: "Gel Eyeliner" },
      { ar: "قلم تحديد العيون", en: "Eye Pencil" },
      { ar: "الكحل", en: "Kajal" },
      { ar: "ظلال العيون", en: "Eyeshadow" },
      { ar: "باليت ظلال العيون", en: "Eyeshadow Palettes" },
      { ar: "برايمر العيون", en: "Eye Primer" },
      { ar: "منتجات الحواجب", en: "Eyebrow Products" },
      { ar: "قلم الحواجب", en: "Eyebrow Pencil" },
      { ar: "جل الحواجب", en: "Eyebrow Gel" },
      { ar: "بودرة الحواجب", en: "Eyebrow Powder" },
      { ar: "أحمر الشفاه", en: "Lipstick" },
      { ar: "ملمع الشفاه", en: "Lip Gloss" },
      { ar: "محدد الشفاه", en: "Lip Liner" },
      { ar: "أحمر الشفاه السائل", en: "Liquid Lipstick" },
      { ar: "مرطب الشفاه", en: "Lip Balm" },
      { ar: "الفاونديشن", en: "Foundation" },
      { ar: "الكونسيلر", en: "Concealer" },
      { ar: "البرايمر", en: "Face Primer" },
      { ar: "البودرة", en: "Face Powder" },
      { ar: "البلاشر", en: "Blush" },
      { ar: "الهايلايتر", en: "Highlighter" },
      { ar: "الكونتور", en: "Contour" },
      { ar: "برونزر", en: "Bronzer" },
      { ar: "مثبت المكياج", en: "Setting Spray" },
      { ar: "فرش المكياج", en: "Makeup Brushes" },
      { ar: "إسفنج المكياج", en: "Makeup Sponges" },
      { ar: "مزيل المكياج", en: "Makeup Remover" },
      { ar: "مجموعات المكياج", en: "Makeup Sets" },
      { ar: "أدوات التجميل", en: "Beauty Tools" },
      { ar: "مرايا التجميل", en: "Beauty Mirrors" },
      { ar: "مستلزمات العناية بالرموش", en: "Lash Care" },
      { ar: "مستلزمات العناية بالشفاه", en: "Lip Care" },
      { ar: "مستلزمات العناية بالبشرة", en: "Skincare Products" },
      { ar: "العطور", en: "Perfumes" },
      { ar: "منتجات العناية بالشعر", en: "Hair Care Products" },
      { ar: "العروض والخصومات", en: "Offers & Discounts" },
      { ar: "المنتجات الأكثر مبيعاً", en: "Best Sellers" },
      { ar: "أحدث المنتجات", en: "New Arrivals" }
    ]
  },
  {
    title: { ar: "العيون والرموش", en: "Eyes & Lashes" },
    href: "/eyes",
    items: [
      { ar: "دليل العيون", en: "Eye Beauty Guide" },
      { ar: "تجربة العدسات", en: "Lens Try-On" },
      { ar: "اختيار لون العدسات", en: "Lens Color Finder" },
      { ar: "العدسات الزرقاء", en: "Blue Lenses" },
      { ar: "العدسات الخضراء", en: "Green Lenses" },
      { ar: "العدسات العسلية", en: "Hazel Lenses" },
      { ar: "العدسات الرمادية", en: "Gray Lenses" },
      { ar: "العدسات البنية", en: "Brown Lenses" },
      { ar: "العدسات اليومية", en: "Daily Lenses" },
      { ar: "العدسات الشهرية", en: "Monthly Lenses" },
      { ar: "تجربة الرموش الافتراضية", en: "Virtual Lash Try-On" },
      { ar: "الرموش الطبيعية", en: "Natural Lashes" },
      { ar: "الرموش الكثيفة", en: "Volume Lashes" },
      { ar: "الرموش الطويلة", en: "Long Lashes" },
      { ar: "الرموش الكلاسيكية", en: "Classic Lashes" },
      { ar: "الرموش الدرامية", en: "Dramatic Lashes" },
      { ar: "الرموش المجنحة", en: "Winged Lashes" },
      { ar: "تجربة الماسكارا", en: "Mascara Try-On" },
      { ar: "تجربة الآيلاينر", en: "Eyeliner Try-On" },
      { ar: "تجربة الكحل", en: "Kajal Try-On" },
      { ar: "تجربة ظلال العيون", en: "Eyeshadow Try-On" },
      { ar: "مكياج العيون السموكي", en: "Smokey Eye Makeup" },
      { ar: "مكياج العيون الناعم", en: "Soft Eye Makeup" },
      { ar: "مكياج عيون القطة", en: "Cat Eye Makeup" },
      { ar: "مكياج العيون للمناسبات", en: "Party Eye Makeup" },
      { ar: "تحديد شكل العين", en: "Eye Shape Detection" },
      { ar: "تحليل شكل العين", en: "Eye Shape Analysis" },
      { ar: "اختيار الرموش المناسبة", en: "Lash Style Finder" },
      { ar: "اختيار الماسكارا المناسبة", en: "Mascara Finder" },
      { ar: "اختيار الآيلاينر المناسب", en: "Eyeliner Finder" }
    ]
  },
  {
    title: { ar: "المكياج", en: "Makeup" },
    href: "/makeup",
    items: [
      { ar: "جميع أنواع المكياج", en: "All Makeup" },
      { ar: "المكياج اليومي", en: "Everyday Makeup" },
      { ar: "المكياج الطبيعي", en: "Natural Makeup" },
      { ar: "المكياج الناعم", en: "Soft Makeup" },
      { ar: "مكياج السهرات", en: "Evening Makeup" },
      { ar: "مكياج المناسبات", en: "Occasion Makeup" },
      { ar: "مكياج العرائس", en: "Bridal Makeup" },
      { ar: "المكياج الاحترافي", en: "Professional Makeup" },
      { ar: "مكياج هوليود", en: "Hollywood Makeup" },
      { ar: "المكياج الكوري", en: "Korean Makeup" },
      { ar: "المكياج الفرنسي", en: "French Makeup" },
      { ar: "المكياج العربي", en: "Arabic Makeup" },
      { ar: "المكياج الخليجي", en: "Gulf Makeup" },
      { ar: "المكياج الطبيعي اللامع", en: "Glowy Makeup" },
      { ar: "المكياج المات", en: "Matte Makeup" },
      { ar: "مكياج البشرة الدهنية", en: "Oily Skin Makeup" },
      { ar: "مكياج البشرة الجافة", en: "Dry Skin Makeup" },
      { ar: "مكياج البشرة المختلطة", en: "Combination Skin Makeup" },
      { ar: "تجربة أحمر الشفاه", en: "Lipstick Try-On" },
      { ar: "تجربة الفاونديشن", en: "Foundation Try-On" },
      { ar: "تجربة الكونسيلر", en: "Concealer Try-On" },
      { ar: "تجربة البلاشر", en: "Blush Try-On" },
      { ar: "تجربة الهايلايتر", en: "Highlighter Try-On" },
      { ar: "تجربة الكونتور", en: "Contour Try-On" },
      { ar: "تجربة البرونزر", en: "Bronzer Try-On" },
      { ar: "تجربة ألوان الشفاه", en: "Lip Color Try-On" },
      { ar: "دليل درجات الفاونديشن", en: "Foundation Shade Guide" },
      { ar: "دليل ألوان أحمر الشفاه", en: "Lipstick Color Guide" },
      { ar: "تنسيق المكياج", en: "Makeup Styling" },
      { ar: "إطلالات المكياج الجاهزة", en: "Makeup Looks" }
    ]
  },
  {
    title: { ar: "البشرة والعناية", en: "Skincare" },
    href: "/skincare",
    items: [
      { ar: "جميع منتجات البشرة", en: "All Skincare Products" },
      { ar: "تحليل البشرة", en: "Skin Analysis" },
      { ar: "العناية بالبشرة", en: "Skin Care" },
      { ar: "غسول الوجه", en: "Face Cleanser" },
      { ar: "تونر الوجه", en: "Face Toner" },
      { ar: "السيروم", en: "Face Serum" },
      { ar: "مرطب الوجه", en: "Face Moisturizer" },
      { ar: "كريم العين", en: "Eye Cream" },
      { ar: "واقي الشمس", en: "Sunscreen" },
      { ar: "ماسك الوجه", en: "Face Masks" },
      { ar: "مقشر الوجه", en: "Face Exfoliator" },
      { ar: "كريم الليل", en: "Night Cream" },
      { ar: "كريم النهار", en: "Day Cream" },
      { ar: "العناية بالشفاه", en: "Lip Care" },
      { ar: "العناية بمنطقة العين", en: "Eye Care" },
      { ar: "علاج الهالات السوداء", en: "Dark Circle Care" },
      { ar: "العناية بالبشرة الدهنية", en: "Oily Skin Care" },
      { ar: "العناية بالبشرة الجافة", en: "Dry Skin Care" },
      { ar: "العناية بالبشرة الحساسة", en: "Sensitive Skin Care" },
      { ar: "العناية بالبشرة المختلطة", en: "Combination Skin Care" },
      { ar: "روتين الصباح", en: "Morning Routine" },
      { ar: "روتين المساء", en: "Night Routine" },
      { ar: "روتين العناية الأسبوعي", en: "Weekly Skincare Routine" },
      { ar: "اختبار نوع البشرة", en: "Skin Type Test" },
      { ar: "اختبار حساسية البشرة", en: "Skin Sensitivity Test" },
      { ar: "دليل منتجات البشرة", en: "Skincare Guide" }
    ]
  },
  {
    title: { ar: "الشعر والجمال", en: "Hair & Beauty" },
    href: "/hair-beauty",
    items: [
      { ar: "تجربة ألوان الشعر", en: "Hair Color Try-On" },
      { ar: "تجربة قصات الشعر", en: "Hairstyle Try-On" },
      { ar: "الشعر الطويل", en: "Long Hairstyles" },
      { ar: "الشعر القصير", en: "Short Hairstyles" },
      { ar: "الشعر الكيرلي", en: "Curly Hairstyles" },
      { ar: "الشعر المموج", en: "Wavy Hairstyles" },
      { ar: "الشعر الناعم", en: "Straight Hairstyles" },
      { ar: "ألوان الشعر الأشقر", en: "Blonde Hair Colors" },
      { ar: "ألوان الشعر البني", en: "Brown Hair Colors" },
      { ar: "ألوان الشعر الأسود", en: "Black Hair Colors" },
      { ar: "ألوان الشعر الأحمر", en: "Red Hair Colors" },
      { ar: "ألوان الشعر الرمادي", en: "Gray Hair Colors" },
      { ar: "الشامبو", en: "Shampoo" },
      { ar: "البلسم", en: "Conditioner" },
      { ar: "ماسك الشعر", en: "Hair Masks" },
      { ar: "زيوت الشعر", en: "Hair Oils" },
      { ar: "سيروم الشعر", en: "Hair Serum" },
      { ar: "العناية بفروة الرأس", en: "Scalp Care" },
      { ar: "أدوات تصفيف الشعر", en: "Hair Styling Tools" },
      { ar: "إكسسوارات الشعر", en: "Hair Accessories" }
    ]
  },
  {
    title: { ar: "أدوات الواقع المعزز", en: "AR Tools" },
    href: "/gate/ar-tools",
    items: [
      { ar: "تجربة المنتجات افتراضياً", en: "Virtual Product Try-On" },
      { ar: "تجربة المكياج الافتراضية", en: "Virtual Makeup Try-On" },
      { ar: "تجربة العدسات", en: "Contact Lens Try-On" },
      { ar: "تجربة الرموش", en: "Eyelashes Try-On" },
      { ar: "تجربة الماسكارا", en: "Mascara Try-On" },
      { ar: "تجربة الآيلاينر", en: "Eyeliner Try-On" },
      { ar: "تجربة ظلال العيون", en: "Eyeshadow Try-On" },
      { ar: "تجربة أحمر الشفاه", en: "Lipstick Try-On" },
      { ar: "تجربة الفاونديشن", en: "Foundation Try-On" },
      { ar: "تجربة البلاشر", en: "Blush Try-On" },
      { ar: "تجربة النظارات", en: "Virtual Glasses Try-On" },
      { ar: "تجربة ألوان الشعر", en: "Hair Color Try-On" },
      { ar: "تجربة قصات الشعر", en: "Hairstyle Try-On" },
      { ar: "تجربة الإكسسوارات", en: "Accessories Try-On" },
      { ar: "تجربة المجوهرات", en: "Jewelry Try-On" },
      { ar: "تجربة الملابس", en: "Virtual Clothing Try-On" },
      { ar: "تجربة الأحذية", en: "Shoes Try-On" },
      { ar: "تجربة الحقائب", en: "Bags Try-On" },
      { ar: "معاينة المنتجات", en: "Product Preview" },
      { ar: "التجربة ثلاثية الأبعاد", en: "3D Experience" },
      { ar: "غرف القياس الافتراضية", en: "Virtual Fitting Rooms" },
      { ar: "استوديو الواقع المعزز", en: "AR Studio" }
    ]
  },
  {
    title: { ar: "الذكاء الاصطناعي", en: "AI Beauty Tools" },
    href: "/gate/ai-tech",
    items: [
      { ar: "محور البشرة", en: "Skin Hub" },
      { ar: "تحليل البشرة بالذكاء الاصطناعي", en: "AI Skin Analysis" },
      { ar: "مكتشف لون البشرة", en: "Skin Tone Finder" },
      { ar: "تحليل نوع البشرة", en: "Skin Type Analysis" },
      { ar: "محاكاة البشرة", en: "Skin Simulation" },
      { ar: "تقييم البشرة", en: "Skin Assessment" },
      { ar: "محور الوجه", en: "Face Hub" },
      { ar: "تحليل الوجه", en: "Face Analysis" },
      { ar: "تحديد شكل الوجه", en: "Face Shape Detection" },
      { ar: "تحليل ملامح الوجه", en: "Facial Features Analysis" },
      { ar: "تحليل شكل العين", en: "Eye Shape Analysis" },
      { ar: "تحليل الشفاه", en: "Lip Analysis" },
      { ar: "تحليل الحواجب", en: "Eyebrow Analysis" },
      { ar: "منسق الإطلالات", en: "Look Stylist" },
      { ar: "مساعد المكياج الذكي", en: "AI Makeup Assistant" },
      { ar: "تحليل الألوان", en: "Color Analysis" },
      { ar: "مكتشف الألوان المناسبة", en: "Personal Color Finder" },
      { ar: "مساعد العناية بالبشرة", en: "Skincare Assistant" },
      { ar: "مساعد الجمال الذكي", en: "Smart Beauty Assistant" },
      { ar: "مساعد اختيار المنتجات", en: "Product Recommendation AI" },
      { ar: "مساعد اختيار العدسات", en: "Lens Recommendation AI" },
      { ar: "مساعد اختيار المكياج", en: "Makeup Recommendation AI" },
      { ar: "تحليل الصور", en: "Image Analysis" },
      { ar: "مولد الصور بالذكاء الاصطناعي", en: "AI Image Generator" },
      { ar: "المساعد الذكي", en: "Smart Assistant" }
    ]
  },
  {
    title: { ar: "الخدمات", en: "Services" },
    href: "/services",
    items: [
      { ar: "تجربة المكياج الافتراضية", en: "Virtual Makeup Experience" },
      { ar: "تجربة المنتجات", en: "Product Try-On" },
      { ar: "استشارات التجميل", en: "Beauty Consultations" },
      { ar: "تحليل البشرة", en: "Skin Analysis" },
      { ar: "اختيار المنتجات المناسبة", en: "Product Matching" },
      { ar: "تنسيق إطلالات المكياج", en: "Makeup Styling" },
      { ar: "تصميم المواقع", en: "Website Design" },
      { ar: "تطوير المتاجر الإلكترونية", en: "E-commerce Development" },
      { ar: "تطوير تطبيقات الويب", en: "Web App Development" },
      { ar: "تطوير تطبيقات الهاتف", en: "Mobile App Development" },
      { ar: "تصميم واجهات المستخدم", en: "UI Design" },
      { ar: "تجربة المستخدم", en: "UX Design" },
      { ar: "التسويق الإلكتروني", en: "Digital Marketing" },
      { ar: "إدارة المحتوى", en: "Content Management" },
      { ar: "تحسين محركات البحث", en: "SEO" },
      { ar: "إدارة الحملات الإعلانية", en: "Advertising Campaigns" },
      { ar: "الهوية البصرية", en: "Visual Identity" },
      { ar: "تصميم الشعارات", en: "Logo Design" },
      { ar: "تصميم الجرافيك", en: "Graphic Design" },
      { ar: "الدعم الفني", en: "Technical Support" },
      { ar: "الصيانة والتحديث", en: "Maintenance & Updates" }
    ]
  },
  {
    title: { ar: "التقنيات", en: "Technologies" },
    href: "/technologies",
    items: [
      { ar: "الذكاء الاصطناعي", en: "Artificial Intelligence" },
      { ar: "الواقع المعزز", en: "Augmented Reality" },
      { ar: "الواقع الافتراضي", en: "Virtual Reality" },
      { ar: "التعلم الآلي", en: "Machine Learning" },
      { ar: "التعلم العميق", en: "Deep Learning" },
      { ar: "الرؤية الحاسوبية", en: "Computer Vision" },
      { ar: "تحليل الصور", en: "Image Analysis" },
      { ar: "التعرف على الوجه", en: "Face Recognition" },
      { ar: "التعرف على الألوان", en: "Color Recognition" },
      { ar: "تحليل ملامح الوجه", en: "Facial Features Detection" },
      { ar: "تقنيات تجربة المكياج", en: "Virtual Makeup Technology" },
      { ar: "تقنيات تجربة العدسات", en: "Virtual Lens Technology" },
      { ar: "تحليل البشرة الذكي", en: "AI Skin Technology" },
      { ar: "تقنية ثلاثية الأبعاد", en: "3D Technology" },
      { ar: "تحليل البيانات", en: "Data Analytics" },
      { ar: "الحوسبة السحابية", en: "Cloud Computing" },
      { ar: "إنترنت الأشياء", en: "Internet of Things" },
      { ar: "الأتمتة الذكية", en: "Intelligent Automation" },
      { ar: "تقنيات المستقبل", en: "Future Technologies" }
    ]
  },
  {
    title: { ar: "الحلول", en: "Solutions" },
    href: "/solutions",
    items: [
      { ar: "حلول قطاع التجميل", en: "Beauty Industry Solutions" },
      { ar: "حلول متاجر المكياج", en: "Makeup Store Solutions" },
      { ar: "حلول متاجر العدسات", en: "Lens Store Solutions" },
      { ar: "حلول متاجر مستحضرات التجميل", en: "Cosmetics Store Solutions" },
      { ar: "حلول الصالونات", en: "Salon Solutions" },
      { ar: "حلول مراكز التجميل", en: "Beauty Center Solutions" },
      { ar: "حلول العلامات التجارية", en: "Brand Solutions" },
      { ar: "حلول التجارة الإلكترونية", en: "E-commerce Solutions" },
      { ar: "حلول الشركات", en: "Corporate Solutions" },
      { ar: "حلول المؤسسات", en: "Enterprise Solutions" },
      { ar: "حلول التسويق", en: "Marketing Solutions" },
      { ar: "حلول الأعمال", en: "Business Solutions" },
      { ar: "حلول التحول الرقمي", en: "Digital Transformation" },
      { ar: "حلول الذكاء الاصطناعي", en: "AI Solutions" },
      { ar: "حلول الواقع المعزز", en: "AR Solutions" }
    ]
  },
  {
    title: { ar: "الباقات", en: "Packages" },
    href: "/packages",
    items: [
      { ar: "جميع الباقات", en: "All Packages" },
      { ar: "الباقة المجانية", en: "Free Package" },
      { ar: "الباقة الأساسية", en: "Basic Package" },
      { ar: "الباقة الاحترافية", en: "Professional Package" },
      { ar: "الباقة المؤسسية", en: "Enterprise Package" },
      { ar: "باقة التجميل", en: "Beauty Package" },
      { ar: "باقة المكياج الافتراضي", en: "Virtual Makeup Package" },
      { ar: "باقة تجربة العدسات", en: "Lens Try-On Package" },
      { ar: "باقة الذكاء الاصطناعي", en: "AI Package" },
      { ar: "باقة الواقع المعزز", en: "AR Package" },
      { ar: "باقة المتاجر الإلكترونية", en: "E-commerce Package" },
      { ar: "باقة الشركات", en: "Corporate Package" },
      { ar: "باقة التسويق", en: "Marketing Package" },
      { ar: "باقة الأعمال", en: "Business Package" },
      { ar: "باقة المبتدئين", en: "Starter Package" },
      { ar: "باقة النمو", en: "Growth Package" },
      { ar: "الباقة السنوية", en: "Annual Package" },
      { ar: "الباقة الشهرية", en: "Monthly Package" },
      { ar: "الباقات المخصصة", en: "Custom Packages" }
    ]
  }
];

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [mobileSubMenu, setMobileSubMenu] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("orvelia-theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
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

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const isArabic = language === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  const locale = language;

  const getPath = (path: string) => {
    return `/${locale}${path === "/" ? "" : path}`;
  };

  const mainLinks = [
    { ar: "الرئيسية", en: "Home", href: "/" },
    { ar: "من نحن", en: "About Us", href: "/about" },
    { ar: "المدونة", en: "Blog", href: "/blog" },
    { ar: "اتصل بنا", en: "Contact Us", href: "/contact" }
  ];

  const text = {
    brand: isArabic ? "أورفيليا" : "Orvelia",
    tech: isArabic ? "نوفا تك" : "NOVA TECH",
    com: isArabic ? "نوفا كوم" : "NOVA COM",
    search: isArabic
      ? "ابحث عن منتج أو خدمة أو تقنية..."
      : "Search for a product, service or technology...",
    searchLabel: isArabic ? "بحث" : "Search",
    language: isArabic ? "English" : "العربية",
    login: isArabic ? "تسجيل الدخول" : "Login",
    demo: isArabic ? "متجر العرض التوضيحي" : "Demo Store",
    viewAll: isArabic ? "عرض الكل" : "View All",
    openMenu: isArabic ? "فتح القائمة" : "Open Menu",
    main: isArabic ? "الروابط الرئيسية" : "Main Links",
    close: isArabic ? "إغلاق" : "Close",
    darkMode: isArabic ? "الوضع الداكن" : "Dark Mode",
    lightMode: isArabic ? "الوضع الفاتح" : "Light Mode"
  };

  const closeMenus = () => {
    setActiveMenu(null);
    setMobileOpen(false);
    setMobileSubMenu(null);
  };

  const filteredMenus = menus.map((menu) => ({
    ...menu,
    items: menu.items.filter((item) =>
      `${item.ar} ${item.en}`
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
  }));

  const themeButton = (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={!mounted}
      aria-label={isDark ? text.lightMode : text.darkMode}
      aria-pressed={isDark}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-4 py-3 font-semibold transition ${
        isDark
          ? "border-yellow-400/40 text-yellow-300 hover:bg-yellow-400/10"
          : "border-slate-300 text-slate-700 hover:border-green-400 hover:text-green-600"
      }`}
    >
      <span>{isDark ? "☀️" : "🌙"}</span>
      <span>
        {mounted ? (isDark ? text.lightMode : text.darkMode) : text.darkMode}
      </span>
    </button>
  );

  return (
 <header
      dir={direction}
      className={`sticky top-0 z-50 w-full border-b shadow-2xl backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-[#0b101b]/95 text-white"
          : "border-slate-200 bg-white/95 text-slate-900"
      }`}
    >
      {/* TOP NAVBAR */}
      <div className="flex min-h-[100px] items-center justify-between gap-4 px-5 md:px-8">
        {/* LOGO */}
        <Link
          href={getPath("/")}
          onClick={closeMenus}
          className="flex items-center gap-3 text-3xl font-extrabold tracking-tight md:text-4xl"
        >
          <span>{text.brand}</span>
          <span className="text-4xl text-green-400 drop-shadow-[0_0_15px_#00ff88]">
            ✧
          </span>
        </Link>

        {/* BRAND SWITCHERS */}
        <div className="hidden items-center rounded-full bg-current/10 p-1 lg:flex">
          <Link
            href={getPath("/")}
            className="rounded-full bg-gradient-to-r from-green-500/20 to-cyan-500/20 px-6 py-3 font-bold text-green-500"
          >
            {text.tech}
          </Link>
          <Link
            href={getPath("/")}
            className="px-5 py-3 font-bold text-cyan-500"
          >
            {text.com}
          </Link>
        </div>

        {/* SEARCH + LANGUAGE + THEME + AUTH */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className={`text-2xl transition hover:text-cyan-400 ${
              isDark ? "text-gray-300" : "text-slate-600"
            }`}
            aria-label={text.searchLabel}
          >
            ⌕
          </button>

          <button
            type="button"
            onClick={toggleLanguage}
            className={`transition hover:text-green-500 ${
              isDark ? "text-gray-300" : "text-slate-600"
            }`}
          >
            🌐 {text.language}
          </button>

          {themeButton}

          <Link
            href={getPath("/login")}
            className={`rounded-full border px-6 py-3 transition hover:border-cyan-400 hover:text-cyan-500 ${
              isDark ? "border-white/10" : "border-slate-300"
            }`}
          >
            {text.login}
          </Link>

          <Link
            href={getPath("/demo")}
            className="rounded-full border border-green-400 px-6 py-3 text-cyan-500 transition hover:bg-green-400/10"
          >
            {text.demo}
          </Link>
        </div>

        {/* MOBILE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-3xl text-green-500 md:hidden"
          aria-label={text.openMenu}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* SEARCH INPUT */}
      {searchOpen && (
        <div
          className={`border-t p-4 ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="relative">
            <input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={text.search}
              className={`w-full rounded-xl border border-cyan-400/30 px-5 py-3 outline-none transition focus:border-cyan-400 ${
                isDark
                  ? "bg-[#111827] text-white placeholder:text-gray-400"
                  : "bg-slate-50 text-slate-900 placeholder:text-slate-400"
              }`}
            />
            {searchValue && (
              <button
                type="button"
                onClick={() => setSearchValue("")}
                className="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-500"
                style={isArabic ? { left: "18px" } : { right: "18px" }}
              >
                ✕
              </button>
            )}
          </div>

          {searchValue && (
            <div
              className={`mt-4 max-h-[350px] overflow-y-auto rounded-xl border p-3 ${
                isDark
                  ? "border-white/10 bg-[#111827]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {filteredMenus.some((menu) => menu.items.length > 0) ? (
                filteredMenus.map((menu) =>
                  menu.items.map((item, i) => (
                    <Link
                      key={`${menu.href}-${i}`}
                      href={getPath(menu.href)}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchValue("");
                        closeMenus();
                      }}
                      className={`block rounded-lg p-3 text-sm transition hover:bg-green-400/10 hover:text-green-500 ${
                        isDark ? "text-gray-300" : "text-slate-700"
                      }`}
                    >
                      ✧ {item[language]}
                      <span className="mx-2 text-xs text-gray-500">
                        {menu.title[language]}
                      </span>
                    </Link>
                  ))
                )
              ) : (
                <p className="p-4 text-center text-gray-400">
                  {isArabic ? "لا توجد نتائج" : "No results found"}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* DESKTOP NAVIGATION */}
      <nav
        className={`hidden border-t md:block ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-center gap-1 border-b px-4 py-2 ${
            isDark ? "border-white/5" : "border-slate-100"
          }`}
        >
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={getPath(link.href)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition duration-300 hover:bg-green-400/10 hover:text-green-500 ${
                isDark ? "text-gray-300" : "text-slate-700"
              }`}
            >
              {link[language]}
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 px-4 py-3">
          {menus.map((menu, index) => (
            <div
              key={menu.href}
              className="relative"
              onMouseEnter={() => setActiveMenu(index)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                type="button"
                onClick={() =>
                  setActiveMenu(activeMenu === index ? null : index)
                }
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeMenu === index
                    ? "bg-green-400/10 text-green-500"
                    : isDark
                    ? "text-white hover:bg-white/5 hover:text-green-400"
                    : "text-slate-800 hover:bg-slate-100 hover:text-green-600"
                }`}
              >
                {menu.title[language]}
                <span className="text-xs">⌄</span>
              </button>

              {activeMenu === index && (
                <div
                  className={`absolute top-full z-50 w-[min(750px,90vw)] rounded-2xl border p-5 shadow-2xl ${
                    isDark
                      ? "border-green-400/20 bg-[#0d1422] shadow-[0_10px_50px_rgba(0,255,150,0.12)]"
                      : "border-slate-200 bg-white shadow-slate-300/40"
                  } ${isArabic ? "right-0" : "left-0"}`}
                >
                  <div
                    className={`mb-4 flex items-center justify-between border-b pb-4 ${
                      isDark ? "border-white/10" : "border-slate-200"
                    }`}
                  >
                    <h3 className="text-xl font-bold text-green-500">
                      {menu.title[language]}
                    </h3>
                    <Link
                      href={getPath(menu.href)}
                      onClick={() => setActiveMenu(null)}
                      className="text-sm text-cyan-500 transition hover:text-green-500 hover:underline"
                    >
                      {text.viewAll} {isArabic ? "←" : "→"}
                    </Link>
                  </div>

                  <div className="grid max-h-[65vh] grid-cols-2 gap-2 overflow-y-auto lg:grid-cols-3">
                    {menu.items.map((item, i) => (
                      <Link
                        key={`${menu.href}-${i}`}
                        href={`${getPath(menu.href)}/${i + 1}`}
                        onClick={() => setActiveMenu(null)}
                        className={`group rounded-lg border border-transparent px-3 py-3 text-sm transition duration-300 hover:border-green-400/20 hover:bg-green-400/10 hover:text-green-500 ${
                          isDark ? "text-gray-300" : "text-slate-700"
                        }`}
                      >
                        <span
                          className={`text-cyan-500 transition group-hover:text-green-500 ${
                            isArabic ? "ml-2" : "mr-2"
                          }`}
                        >
                          ✧
                        </span>
                        {item[language]}
                      </Link>
                    ))}
                  </div>

                  <div
                    className={`mt-4 border-t pt-3 text-center text-xs ${
                      isDark
                        ? "border-white/10 text-gray-500"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    {isArabic
                      ? `اكتشفي ${menu.items.length} خدمة ومنتج`
                      : `Explore ${menu.items.length} products and services`}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <nav
          className={`max-h-[75vh] overflow-y-auto border-t p-4 md:hidden ${
            isDark ? "border-white/10" : "border-slate-200"
          }`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-center">{themeButton}</div>

            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-xl border border-green-400/30 p-4 text-center text-green-500"
            >
              🌐 {text.language}
            </button>

            {/* MAIN LINKS */}
            <div
              className={`rounded-xl border p-2 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <h3 className="px-3 py-2 text-sm font-bold text-cyan-500">
                {text.main}
              </h3>
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getPath(link.href)}
                  onClick={closeMenus}
                  className={`block rounded-lg px-3 py-2.5 text-sm transition ${
                    isDark
                      ? "text-gray-300 hover:bg-white/5 hover:text-green-400"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {link[language]}
                </Link>
              ))}
            </div>

            {/* MOBILE MENUS ACCORDION */}
            <div
              className={`rounded-xl border p-2 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              {menus.map((menu, index) => (
                <div key={menu.href} className="border-b last:border-none">
                  <button
                    type="button"
                    onClick={() =>
                      setMobileSubMenu(mobileSubMenu === index ? null : index)
                    }
                    className={`flex w-full items-center justify-between px-3 py-3 text-sm font-semibold ${
                      isDark ? "text-white" : "text-slate-800"
                    }`}
                  >
                    <span>{menu.title[language]}</span>
                    <span>{mobileSubMenu === index ? "−" : "+"}</span>
                  </button>

                  {mobileSubMenu === index && (
                    <div className="flex flex-col gap-1 pb-3 ps-3">
                      <Link
                        href={getPath(menu.href)}
                        onClick={closeMenus}
                        className="py-1.5 text-xs font-bold text-cyan-500 hover:underline"
                      >
                        {text.viewAll} →
                      </Link>
                      {menu.items.map((item, i) => (
                        <Link
                          key={i}
                          href={`${getPath(menu.href)}/${i + 1}`}
                          onClick={closeMenus}
                          className={`py-1.5 text-xs transition ${
                            isDark
                              ? "text-gray-400 hover:text-green-400"
                              : "text-slate-600 hover:text-green-600"
                          }`}
                        >
                          ✧ {item[language]}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                href={getPath("/login")}
                onClick={closeMenus}
                className={`rounded-xl border py-3 text-center transition ${
                  isDark
                    ? "border-white/10 text-white"
                    : "border-slate-300 text-slate-800"
                }`}
              >
                {text.login}
              </Link>
              <Link
                href={getPath("/demo")}
                onClick={closeMenus}
                className="rounded-xl border border-green-400 py-3 text-center text-cyan-500"
              >
                {text.demo}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}