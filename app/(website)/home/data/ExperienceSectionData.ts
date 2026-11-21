export interface BeautyFeature {
  number: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  href: string;
}

export const beautyFeatures: BeautyFeature[] = [
  {
    number: "01",
    icon: "✧",
    titleAr: "تحليل البشرة الذكي",
    titleEn: "AI Skin Intelligence",
    descAr: "اكتشفي أسرار بشرتك من خلال تقنيات التحليل الذكية والحلول الشخصية.",
    descEn: "Discover your skin through intelligent analysis and personalized solutions.",
    href: "/ar/beauty",
  },
  {
    number: "02",
    icon: "◈",
    titleAr: "تجربة الجمال الافتراضي",
    titleEn: "Virtual Beauty Experience",
    descAr: "عيشي تجربة تفاعلية مبتكرة تجمع بين الواقع المعزز وعالم الجمال.",
    descEn: "Experience an innovative combination of augmented reality and beauty.",
    href: "/ar/gate/ai-tech",
  },
  {
    number: "03",
    icon: "❋",
    titleAr: "اكتشاف منتجاتك",
    titleEn: "Discover Your Products",
    descAr: "اكتشفي المنتجات المناسبة لاحتياجاتك وتفضيلاتك الشخصية.",
    descEn: "Find products that match your personal needs and preferences.",
    href: "/ar/beauty",
  },
];