export type Sector = {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  points: string[];
};

export const getSectorsData = (isArabic: boolean): Sector[] => [
  {
    id: "beauty",
    title: isArabic ? "الجمال ومستحضرات التجميل" : "Beauty & Cosmetics",
    description: isArabic
      ? "يجرّب العميل المكياج مباشرة على وجهه ويقارن الدرجات قبل الشراء."
      : "Customers can try makeup directly on their faces and compare different shades before making a purchase.",
    image: "/assets/slider/images6.jpg",
    href: "/sectors/beauty",
    points: isArabic
      ? ["مطابقة درجة البشرة", "مقارنة قبل وبعد", "حفظ الإطلالات"]
      : ["Skin Tone Matching", "Before & After Comparison", "Save Looks"],
  },
  {
    id: "jewelry",
    title: isArabic ? "المجوهرات والإكسسوارات" : "Jewelry & Accessories",
    description: isArabic
      ? "تجربة الخواتم والقلائد والأقراط والساعات في الوقت الحقيقي وتنسيقها معًا."
      : "Virtually try on rings, necklaces, earrings, and watches in real time, and mix and match different pieces.",
    image: "/assets/img/images13.jpg",
    href: "/sectors/jewelry",
    points: isArabic
      ? ["تتبع اليد والرقبة والأذن", "تنسيق عدة قطع", "مشاركة الصورة"]
      : ["Hand, Neck & Ear Tracking", "Mix & Match Items", "Share Your Look"],
  },
  {
    id: "ecommerce",
    title: isArabic ? "منصات التجارة الإلكترونية" : "E-Commerce Platforms",
    description: isArabic
      ? "دمج التجربة الافتراضية في صفحات المنتجات بسطر برمجي واحد."
      : "Integrate virtual try-on experiences into your product pages with a simple line of code.",
    image: "/assets/img/ava.webp",
    href: "/sectors/ecommerce",
    points: isArabic
      ? ["دمج بسطر واحد", "لوحة تحليلات", "متوافق مع المنصات الشائعة"]
      : ["One-Line Integration", "Analytics Dashboard", "Compatible with Popular Platforms"],
  },
  {
    id: "retail",
    title: isArabic ? "متاجر التجزئة والفروع" : "Retail & Multi-Branch Stores",
    description: isArabic
      ? "مرايا ذكية داخل الفروع بتجربة موحدة مع المتجر الإلكتروني."
      : "Smart mirrors inside physical stores provide a unified shopping experience connected to your online store.",
    image: "/assets/img/img-2.webp",
    href: "/sectors/retail",
    points: isArabic
      ? ["شاشات داخل الفرع", "مزامنة المخزون", "تقارير لكل فرع"]
      : ["In-Store Screens", "Inventory Synchronization", "Branch Reports"],
  },
];