export type TechnologyItem = {
  id: number;
  number: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  tagAr: string;
  tagEn: string;
  code: string;
};

export const technologies: TechnologyItem[] = [
  {
    id: 0,
    number: "01",
    icon: "◈",
    titleAr: "الرؤية الذكية",
    titleEn: "Smart Vision",
    subtitleAr: "فهم وتحليل الصورة",
    subtitleEn: "Image Recognition",
    descriptionAr:
      "تقنيات ذكية لتحليل الصور والتعرف على التفاصيل بدقة، لتقديم تجربة رقمية أكثر تفاعلاً.",
    descriptionEn:
      "Smart image analysis and recognition technologies designed to create more interactive digital experiences.",
    tagAr: "تحليل بصري",
    tagEn: "VISUAL ANALYSIS",
    code: "VISION_ENGINE",
  },
  {
    id: 1,
    number: "02",
    icon: "⌁",
    titleAr: "التتبع الذكي",
    titleEn: "Smart Tracking",
    subtitleAr: "تفاعل في الوقت الحقيقي",
    subtitleEn: "Real-Time Interaction",
    descriptionAr:
      "تتبع مواضع العناصر والحركة لدعم التجارب الافتراضية والتفاعل المباشر مع المنتجات.",
    descriptionEn:
      "Track positions and movement to support virtual experiences and real-time product interaction.",
    tagAr: "تتبع مباشر",
    tagEn: "LIVE TRACKING",
    code: "TRACKING_CORE",
  },
  {
    id: 2,
    number: "03",
    icon: "✳",
    titleAr: "التجربة الافتراضية",
    titleEn: "Virtual Experience",
    subtitleAr: "جرّب قبل الاختيار",
    subtitleEn: "Try Before You Choose",
    descriptionAr:
      "استكشف المنتجات وجربها افتراضياً بطريقة تفاعلية تساعد العميل على اتخاذ قراره.",
    descriptionEn:
      "Explore and virtually try products through an interactive experience that supports customer decisions.",
    tagAr: "تجربة تفاعلية",
    tagEn: "INTERACTIVE EXPERIENCE",
    code: "VIRTUAL_TRYON",
  },
  {
    id: 3,
    number: "04",
    icon: "⌘",
    titleAr: "الربط والتحليلات",
    titleEn: "Integration & Analytics",
    subtitleAr: "منصة متصلة بمتجرك",
    subtitleEn: "Connected Commerce",
    descriptionAr:
      "إمكانية دمج الحلول الرقمية مع المتاجر والمنصات ومتابعة البيانات من خلال أدوات التحليل.",
    descriptionEn:
      "Connect digital solutions with stores and platforms while accessing insights through analytics tools.",
    tagAr: "تكامل رقمي",
    tagEn: "DIGITAL INTEGRATION",
    code: "SMART_CONNECT",
  },
];