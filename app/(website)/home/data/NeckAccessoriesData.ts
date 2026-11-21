export type Item = {
  id: string;
  titleAr: string;
  titleEn: string;
  taglineAr: string;
  taglineEn: string;
  descriptionAr: string;
  descriptionEn: string;
  featuresAr: string[];
  featuresEn: string[];
  image: string;
  demoHref: string;
  howHref: string;
};

export const neckAccessoriesItems: Item[] = [
  {
    id: "pendant",
    titleAr: "تجربة القلائد الافتراضية",
    titleEn: "Virtual Pendant Try-On",
    taglineAr: "اجعل كل قلادة تروي قصتها",
    taglineEn: "Let Every Pendant Tell Its Story",
    descriptionAr:
      "يتيح هذا الحل للمستخدم تجربة القلائد ذات المعلّقات، ورؤية موضعها بدقة على الرقبة والصدر مع كل حركة.",
    descriptionEn:
      "This solution allows users to virtually try on pendant necklaces and see how they fit around the neck and chest with every movement.",
    featuresAr: [
      "محاكاة واقعية لتصميم المعلّق",
      "تفاعل طبيعي مع الجسم والحركة",
      "دعم أطوال وأحجام متعددة",
    ],
    featuresEn: [
      "Realistic pendant design simulation",
      "Natural body and movement interaction",
      "Support for multiple lengths and sizes",
    ],
    image: "/assets/imgs/mix&match-v2.webp",
    demoHref: "/demo/pendants",
    howHref: "/how-it-works",
  },
  {
    id: "necklace",
    titleAr: "تجربة العقود الافتراضية",
    titleEn: "Virtual Necklace Try-On",
    taglineAr: "القطعة التي تكمل إطلالتك",
    taglineEn: "The Perfect Piece to Complete Your Look",
    descriptionAr:
      "تتيح هذه التقنية للمستخدم تجربة العقود المتدلية، ورؤية مدى تناسقها مع فتحة الرقبة ونوع الملابس بدقة عالية.",
    descriptionEn:
      "This technology allows users to try on different necklaces virtually and see how they complement necklines and clothing styles with high precision.",
    featuresAr: [
      "تجربة غامرة ومخصصة",
      "دعم كامل للتبديل بين الأشكال والخامات",
      "لا حاجة لتحميل تطبيق",
    ],
    featuresEn: [
      "Immersive and personalized experience",
      "Easy switching between styles and materials",
      "No app download required",
    ],
    image: "/assets/slider/images2.jpg",
    demoHref: "/demo/necklaces",
    howHref: "/how-it-works",
  },
  {
    id: "choker",
    titleAr: "تجربة أطواق الرقبة الافتراضية",
    titleEn: "Virtual Choker Try-On",
    taglineAr: "أناقة تلتف حول الرقبة",
    taglineEn: "Elegance Around Your Neck",
    descriptionAr:
      "جرّب الأطواق الملاصقة للرقبة بمقاسات مختلفة، وشاهد كيف تتناسب مع شكل الرقبة وتسريحة الشعر.",
    descriptionEn:
      "Try on close-fitting chokers in different sizes and see how they complement your neck shape and hairstyle.",
    featuresAr: [
      "تثبيت دقيق على الرقبة",
      "ضبط المقاس والسماكة",
      "ألوان وخامات متعددة",
    ],
    featuresEn: [
      "Precise neck positioning",
      "Adjustable sizes and thickness",
      "Multiple colors and materials",
    ],
    image: "/assets/slider/images1.jpg",
    demoHref: "/demo/chokers",
    howHref: "/how-it-works",
  },
  {
    id: "scarf",
    titleAr: "تجربة الأوشحة والياقات الافتراضية",
    titleEn: "Virtual Scarves & Collars Try-On",
    taglineAr: "لمسة ناعمة تُكمل المظهر",
    taglineEn: "A Soft Touch That Completes the Look",
    descriptionAr:
      "شاهد الأوشحة والياقات وهي تنسدل على الكتفين وتتحرك مع العميل بملمس يشبه القماش الحقيقي.",
    descriptionEn:
      "See scarves and collars drape over the shoulders and move naturally with the customer, creating a realistic fabric-like appearance.",
    featuresAr: [
      "محاكاة سقوط القماش",
      "تبديل الألوان والنقوش",
      "يعمل من المتصفح مباشرة",
    ],
    featuresEn: [
      "Realistic fabric draping simulation",
      "Switch between colors and patterns",
      "Works directly in the browser",
    ],
    image: "/assets/slider/images2.jpg",
    demoHref: "/demo/scarves",
    howHref: "/how-it-works",
  },
];