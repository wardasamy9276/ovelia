
import { ScanFace, Wand2, Droplets, type LucideIcon } from "lucide-react";

export interface Metric {
  labelAr: string;
  labelEn: string;
  value: string;
}

export interface FeatureItem {
  id: string;
  tag: string;
  icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  descAr: string;
  descEn: string;
  video: string;
  metrics: Metric[];
  pointsAr: string[];
  pointsEn: string[];
}

export const features: FeatureItem[] = [
  {
    id: "skin-analysis",
    tag: "01 / AI DIAGNOSTICS",
    icon: ScanFace,
    titleAr: "تحليل البشرة الذكي ثلاثي الأبعاد",
    titleEn: "3D Smart Skin Diagnostics",
    subtitleAr: "دقة تتجاوز 98% في رصد احتياجات بشرتك",
    subtitleEn: "Over 98% accuracy in detecting your skin's exact needs",
    descAr:
      "يقوم محرك الذكاء الاصطناعي في أورفيليا بمسح دقيق لمسام البشرة، مستويات الترطيب، والتصبغات في ثوانٍ معدودة ليمنحك تقريراً شاملاً ومخصصاً لحالتك.",
    descEn:
      "Orvelia's AI engine performs a deep scan of pores, hydration levels, and pigmentation in seconds to deliver a comprehensive, personalized skin report.",
    video: "/assets/Video/ai-face-match-looks-tech_1_1.mp4",
    metrics: [
      { labelAr: "نسبة الترطيب", labelEn: "Hydration", value: "94%" },
      { labelAr: "نقاء البشرة", labelEn: "Clarity", value: "89%" },
      { labelAr: "مرونة الجلد", labelEn: "Elasticity", value: "92%" },
    ],
    pointsAr: [
      "رصد فوري لـ 14 مؤشراً حيوياً لصحة البشرة",
      "تتبع تطور نضارة بشرتك أسبوعياً بالصور",
      "توصيات خالية من المكونات المسببة للتحسس",
    ],
    pointsEn: [
      "Instant detection of 14 vital skin health indicators",
      "Weekly visual tracking of your skin glow progress",
      "Allergen-free personalized ingredient recommendations",
    ],
  },
  {
    id: "virtual-tryon",
    tag: "02 / AR STUDIO",
    icon: Wand2,
    titleAr: "استوديو المكياج الافتراضي الفوري",
    titleEn: "Real-Time Virtual Makeup Studio",
    subtitleAr: "جربي مئات الإطلالات بواقع معزز فائق الواقعية",
    subtitleEn: "Try hundreds of looks with ultra-realistic Augmented Reality",
    descAr:
      "اختبري درجات أحمر الشفاه، ظلال العيون، وكريم الأساس المتطابق مع لون بشرتك الفعلي في الوقت الحقيقي وبدون الحاجة لتجربة المنتجات تقليدياً.",
    descEn:
      "Test lipstick shades, eyeshadow palettes, and foundation tones matched to your exact skin undertone in real time before making a choice.",
    video: "/assets/Video/scarves-vto.mp4",
    metrics: [
      { labelAr: "تطابق اللون", labelEn: "Shade Match", value: "99.2%" },
      { labelAr: "سرعة المعالجة", labelEn: "Latency", value: "12ms" },
      { labelAr: "إطلالة متاحة", labelEn: "Looks", value: "+450" },
    ],
    pointsAr: [
      "تتبع حركي دقيق لملامح الوجه حتى مع الإضاءة المتغيرة",
      "إمكانية مقارنة الإطلالة قبل وبعد بلمسة واحدة",
      "حفظ الإطلالات المفضلة ومشاركتها بجودة عالية",
    ],
    pointsEn: [
      "Precision facial landmark tracking across lighting conditions",
      "One-tap before & after split-screen comparison",
      "Save and export your favorite looks in high resolution",
    ],
  },
  {
    id: "custom-routine",
    tag: "03 / SMART CARE",
    icon: Droplets,
    titleAr: "تصميم روتين العناية المخصص",
    titleEn: "Bespoke Skincare Routine Builder",
    subtitleAr: "خطوات يومية ذكية تتكيف مع مناخك ونمط حياتك",
    subtitleEn: "Daily smart steps adapting to your climate & lifestyle",
    descAr:
      "نجمع بين نتائج تحليل بشرتك والعوامل البيئية المحيطة بك لبناء جدول عناية صباحي ومسائي متكامل يضمن لكِ نتائج ملموسة ومستدامة.",
    descEn:
      "We combine your skin diagnostic data with local environmental factors to craft a complete morning and evening regimen for lasting radiance.",
    video: "/assets/Video/mirror-makeup-tech_2.mp4",
    metrics: [
      { labelAr: "توافق المنتجات", labelEn: "Compatibility", value: "100%" },
      { labelAr: "نتائج ملموسة", labelEn: "Visible Glow", value: "14d" },
      { labelAr: "تحديث ذكي", labelEn: "AI Sync", value: "24/7" },
    ],
    pointsAr: [
      "ترتيب علمي دقيق لتطبيق السيروم والمرطبات",
      "تنبيهات ذكية لتجنب تعارض المكونات الفعالة",
      "تعديل تلقائي للروتين مع تغير فصول السنة",
    ],
    pointsEn: [
      "Scientifically ordered layering for serums and moisturizers",
      "Smart conflict alerts for active skincare ingredients",
      "Automatic seasonal adjustments for optimal protection",
    ],
  },
];