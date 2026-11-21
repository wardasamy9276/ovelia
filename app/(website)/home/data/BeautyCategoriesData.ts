export interface CategoryItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image: string;
  href: string;
  icon: string;
}

export const categories: CategoryItem[] = [
  {
    id: "01",
    titleAr: "العناية بالبشرة",
    titleEn: "Skin Care",
    descAr: "اكتشفي أسرار البشرة الصحية والنضرة مع حلول العناية الذكية.",
    descEn: "Discover the secrets of healthy, glowing skin with intelligent care solutions.",
    image: "/assets/imgs/left.webp",
    href: "/skin-care",
    icon: "✧",
  },
  {
    id: "02",
    titleAr: "المكياج",
    titleEn: "Makeup",
    descAr: "عبّري عن جمالك بإطلالات مميزة تجمع بين الأناقة والإبداع.",
    descEn: "Express your beauty with unique looks that combine elegance and creativity.",
    image: "/assets/img/1790069732596-fe9a32ab43dffee47917a1f0d4f11448.png",
    href: "/makeup",
    icon: "✦",
  },
  {
    id: "03",
    titleAr: "العناية بالشعر",
    titleEn: "Hair Care",
    descAr: "رحلة متكاملة لشعر أكثر صحة ولمعانًا وحيوية.",
    descEn: "A complete journey to healthier, shinier and more vibrant hair.",
    image: "/assets/img/Untitled1.png",
    href: "/hair-care",
    icon: "❋",
  },
  {
    id: "04",
    titleAr: "العطور",
    titleEn: "Fragrances",
    descAr: "اختاري عطرك الخاص واتركي انطباعًا لا يُنسى.",
    descEn: "Find your signature scent and leave an unforgettable impression.",
    image: "/assets/img/Untitled3.png",
    href: "/fragrances",
    icon: "◇",
  },
  // يمكنك تفعيل العناصر الإضافية بحسب رغبتك:
  // {
  //   id: "05",
  //   titleAr: "العناية بالجسم",
  //   titleEn: "Body Care",
  //   descAr: "دلّلي بشرتك بروتين متكامل يمنح جسمك النعومة والترطيب.",
  //   descEn: "Pamper your skin with a complete routine for softness and hydration.",
  //   image: "/assets/img/body-care.png",
  //   href: "/body-care",
  //   icon: "❀",
  // },
];