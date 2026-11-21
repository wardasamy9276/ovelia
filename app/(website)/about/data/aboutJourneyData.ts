export type Localized = { ar: string; en: string };
export type CategoryId = "brand" | "skincare" | "makeup" | "accessories";

export type Category = {
  id: CategoryId;
  label: Localized;
};

export type Milestone = {
  id: number;
  year: string;
  category: CategoryId;
  title: Localized;
  description: Localized;
  highlights: Localized[];
  stat?: { value: string; label: Localized };
};

export type Stat = {
  id: number;
  value: string;
  label: Localized;
};

export type Promise = {
  id: number;
  title: Localized;
  text: Localized;
};

// ملحوظة: السنين والأرقام هنا placeholder، غيّرها بالحقيقية بتاعة أورفيليا
export const aboutJourneyData = {
  title: {
    ar: "رحلة أورفيليا من أول تركيبة لحد النهارده",
    en: "The Orvelia story, from the first formula to today",
  } as Localized,

  subtitle: {
    ar: "بدأنا من سؤال بسيط: إزاي نخلي العناية بالبشرة والجمال أسهل وأصدق؟ دي المحطات اللي شكّلت أورفيليا.",
    en: "We started with a simple question: how do we make skincare and beauty easier and more honest? These are the milestones that shaped Orvelia.",
  } as Localized,

  intro: {
    ar: "أورفيليا مش مجرد مستحضرات تجميل. هي رحلة بنختار فيها كل مكوّن وكل قطعة اكسسوار بعناية، عشان تحسّي إن اللي بتستخدميه بيخدم بشرتك وبيعبّر عن شخصيتك.",
    en: "Orvelia is more than cosmetics. It is a path where every ingredient and every accessory is chosen with care, so what you use serves your skin and expresses who you are.",
  } as Localized,

  categories: [
    { id: "brand", label: { ar: "العلامة", en: "Brand" } },
    { id: "skincare", label: { ar: "العناية بالبشرة", en: "Skincare" } },
    { id: "makeup", label: { ar: "المكياج", en: "Makeup" } },
    { id: "accessories", label: { ar: "الاكسسوارات", en: "Accessories" } },
  ] as Category[],

  allLabel: { ar: "الكل", en: "All" } as Localized,

  stats: [
    { id: 1, value: "2018", label: { ar: "سنة التأسيس", en: "Year founded" } },
    { id: 2, value: "120+", label: { ar: "منتج في المجموعة", en: "Products in the range" } },
    { id: 3, value: "50K+", label: { ar: "عميلة وعميل", en: "Customers served" } },
    { id: 4, value: "4", label: { ar: "خطوط منتجات", en: "Product lines" } },
  ] as Stat[],

  milestones: [
    {
      id: 1,
      year: "2018",
      category: "brand",
      title: { ar: "ميلاد أورفيليا", en: "Orvelia is born" },
      description: {
        ar: "بدأت أورفيليا بفكرة إننا نقدم منتجات تجميل وعناية بالبشرة بتركيبات واضحة، ومن غير وعود مبالغ فيها.",
        en: "Orvelia began with the idea of offering beauty and skincare products with clear formulas and no exaggerated promises.",
      },
      highlights: [
        { ar: "فريق صغير من المتخصصين في العناية بالبشرة", en: "A small team of skincare specialists" },
        { ar: "تحديد معايير الجودة قبل أول منتج", en: "Quality standards set before the first product" },
        { ar: "اختيار الاسم والهوية البصرية", en: "Choosing the name and visual identity" },
      ],
    },
    {
      id: 2,
      year: "2019",
      category: "skincare",
      title: { ar: "أول خط للعناية بالبشرة", en: "The first skincare line" },
      description: {
        ar: "أطلقنا أول مجموعة أساسية: غسول، ومرطب، وواقي شمس، بتركيبات لطيفة تناسب الاستخدام اليومي.",
        en: "We launched our first essentials: a cleanser, a moisturizer and a sunscreen, with gentle formulas for daily use.",
      },
      highlights: [
        { ar: "تركيبات مناسبة للبشرة الحساسة", en: "Formulas suited to sensitive skin" },
        { ar: "اختبار كل منتج على أنواع بشرة مختلفة", en: "Every product tested on different skin types" },
        { ar: "تغليف بسيط يحافظ على ثبات المكونات", en: "Simple packaging that keeps ingredients stable" },
      ],
      stat: { value: "3", label: { ar: "منتجات أساسية", en: "core products" } },
    },
    {
      id: 3,
      year: "2020",
      category: "makeup",
      title: { ar: "دخول عالم المكياج", en: "Stepping into makeup" },
      description: {
        ar: "أضفنا خط المكياج بدرجات تناسب أكتر من لون بشرة، وقوام خفيف يريّح البشرة طول اليوم.",
        en: "We added makeup in shades that suit a wide range of skin tones, with light textures that stay comfortable all day.",
      },
      highlights: [
        { ar: "درجات أساس وكونسيلر متنوعة", en: "A wide range of foundation and concealer shades" },
        { ar: "قوام يعتني بالبشرة جنب ما يجمّلها", en: "Textures that care for skin while they color it" },
        { ar: "ألوان مختارة للاستخدام اليومي والمناسبات", en: "Colors chosen for daily wear and occasions" },
      ],
      stat: { value: "24", label: { ar: "درجة في أول إطلاق", en: "shades at launch" } },
    },
    {
      id: 4,
      year: "2021",
      category: "accessories",
      title: { ar: "اكسسوارات تكمّل الروتين", en: "Accessories that complete the routine" },
      description: {
        ar: "قدمنا فرش المكياج وأدوات العناية والاكسسوارات، لأن الأدوات الصح بتفرق في النتيجة زي المنتج بالظبط.",
        en: "We introduced makeup brushes, care tools and accessories, because the right tools shape the result as much as the product does.",
      },
      highlights: [
        { ar: "فرش بشعيرات ناعمة وسهلة التنظيف", en: "Brushes with soft, easy-to-clean bristles" },
        { ar: "أدوات للعناية بالبشرة والعناية الشخصية", en: "Tools for skincare and personal care" },
        { ar: "تصميمات عملية تناسب الحمل والسفر", en: "Practical designs made for carrying and travel" },
      ],
    },
    {
      id: 5,
      year: "2022",
      category: "skincare",
      title: { ar: "سيرومات للمشاكل المحددة", en: "Serums for specific concerns" },
      description: {
        ar: "طوّرنا سيرومات موجهة للحبوب، والتصبغات، والترطيب العميق، بتركيزات واضحة مكتوبة على العبوة.",
        en: "We developed serums targeting breakouts, pigmentation and deep hydration, with concentrations clearly written on the pack.",
      },
      highlights: [
        { ar: "شرح مبسط لكل مكوّن وفايدته", en: "A simple explanation of each ingredient and its benefit" },
        { ar: "دليل ترتيب الروتين الصباحي والمسائي", en: "A guide to ordering morning and evening routines" },
        { ar: "مراجعة التركيبات مع متخصصين", en: "Formulas reviewed with specialists" },
      ],
      stat: { value: "6", label: { ar: "سيرومات متخصصة", en: "targeted serums" } },
    },
    {
      id: 6,
      year: "2024",
      category: "brand",
      title: { ar: "متجر أونلاين وخدمة أقرب", en: "An online store and closer service" },
      description: {
        ar: "أطلقنا متجر أورفيليا الإلكتروني، وفيه إرشاد لاختيار المنتج المناسب لنوع بشرتك وخدمة دعم بتتابع معاكي بعد الطلب.",
        en: "We launched the Orvelia online store, with guidance to pick the right product for your skin type and support that follows up after your order.",
      },
      highlights: [
        { ar: "اختيار المنتج حسب نوع البشرة", en: "Choosing products by skin type" },
        { ar: "شحن لمحافظات أكتر", en: "Shipping to more governorates" },
        { ar: "دعم عملاء بيرد في نفس اليوم", en: "Customer support that replies the same day" },
      ],
      stat: { value: "50K+", label: { ar: "طلب مكتمل", en: "orders delivered" } },
    },
    {
      id: 7,
      year: "2026",
      category: "brand",
      title: { ar: "النهارده وبعده", en: "Today and what comes next" },
      description: {
        ar: "بنوسّع المجموعة بخطوط جديدة للعناية بالجسم والشعر، ونطوّر تغليف أكتر استدامة، ونكمّل في نفس الطريق: شفافية وجودة.",
        en: "We are widening the range with body and hair care, developing more sustainable packaging, and staying on the same road: transparency and quality.",
      },
      highlights: [
        { ar: "خطوط جديدة للعناية بالجسم والشعر", en: "New body and hair care lines" },
        { ar: "تغليف أخف على البيئة", en: "Packaging that is lighter on the environment" },
        { ar: "التوسع في أسواق جديدة", en: "Expanding into new markets" },
      ],
    },
  ] as Milestone[],

  closing: {
    quote: {
      ar: "الجمال الحقيقي بيبدأ من بشرة بتتعامل معاها بصدق، ومن منتجات تقدر تثق فيها.",
      en: "Real beauty starts with skin you treat honestly, and products you can trust.",
    } as Localized,
    promisesTitle: { ar: "وعدنا ليكي", en: "Our promise to you" } as Localized,
    promises: [
      {
        id: 1,
        title: { ar: "تركيبات واضحة", en: "Clear formulas" },
        text: {
          ar: "كل مكوّن مكتوب ومشروح، من غير أسرار ولا وعود مبالغ فيها.",
          en: "Every ingredient is listed and explained, with no secrets and no inflated claims.",
        },
      },
      {
        id: 2,
        title: { ar: "جودة قبل الكمية", en: "Quality over quantity" },
        text: {
          ar: "منزّلش منتج غير بعد اختبارات متكررة على أنواع بشرة مختلفة.",
          en: "We release a product only after repeated testing on different skin types.",
        },
      },
      {
        id: 3,
        title: { ar: "جمال للجميع", en: "Beauty for everyone" },
        text: {
          ar: "درجات وخيارات تناسب اختلاف البشرة والأذواق والميزانيات.",
          en: "Shades and options that fit different skin, tastes and budgets.",
        },
      },
    ] as Promise[],
    cta: { ar: "اكتشفي المنتجات", en: "Explore the products" } as Localized,
    ctaHref: "/products",
  },
};