import type { Localized } from "./aboutJourneyData";

export type ProcessStep = {
  id: number;
  title: Localized;
  text: Localized;
  duration: Localized;
};

export type Ingredient = {
  id: number;
  name: Localized;
  tag: Localized;
  benefit: Localized;
  suits: Localized[];
  foundIn: Localized[];
  tip: Localized;
};

// مهم: المقارنات والادعاءات هنا placeholder. اتأكد إن كل نقطة صحيحة فعلًا في منتجات أورفيليا قبل النشر
export const aboutStandardsData = {
  title: {
    ar: "إزاي بنصنع منتجات أورفيليا",
    en: "How we make Orvelia products",
  } as Localized,

  subtitle: {
    ar: "من أول فكرة لحد ما المنتج يوصلك، كل خطوة ليها معيار واضح. وده اللي بيخلينا نقول لك إيه جوه العبوة وليه.",
    en: "From the first idea to the day it reaches you, every step has a clear standard. That's how we can tell you what is inside the pack and why.",
  } as Localized,

  processTitle: { ar: "مراحل تطوير المنتج", en: "How a product is developed" } as Localized,

//   process: [
//     {
//       id: 1,
//       title: { ar: "البحث والفكرة", en: "Research and idea" },
//       text: {
//         ar: "بنبدأ بمشكلة حقيقية في البشرة، ونراجع الدراسات ونسمع من عميلاتنا قبل ما نكتب أي تركيبة.",
//         en: "We start with a real skin concern, review the research and listen to our customers before writing any formula.",
//       },
//       duration: { ar: "من 4 إلى 6 أسابيع", en: "4 to 6 weeks" },
//     },
//     {
//       id: 2,
//       title: { ar: "اختيار المكوّنات", en: "Choosing ingredients" },
//       text: {
//         ar: "بنختار كل مكوّن لسبب محدد وبتركيز واضح، ونستبعد أي حاجة مالهاش فايدة للبشرة.",
//         en: "Each ingredient is chosen for a specific reason at a clear concentration, and anything that doesn't help the skin is left out.",
//       },
//       duration: { ar: "من 3 إلى 4 أسابيع", en: "3 to 4 weeks" },
//     },
//     {
//       id: 3,
//       title: { ar: "التجارب المعملية", en: "Lab testing" },
//       text: {
//         ar: "التركيبة بتتجرب على الثبات والأمان في ظروف حرارة وتخزين مختلفة.",
//         en: "The formula is tested for stability and safety under different temperatures and storage conditions.",
//       },
//       duration: { ar: "من 8 إلى 12 أسبوع", en: "8 to 12 weeks" },
//     },
//     {
//       id: 4,
//       title: { ar: "التجربة على أنواع البشرة", en: "Skin-type trials" },
//       text: {
//         ar: "متطوعين بأنواع بشرة مختلفة بيجربوا المنتج وبنسجل ملاحظاتهم قبل الإطلاق.",
//         en: "Volunteers with different skin types try the product and we record their feedback before launch.",
//       },
//       duration: { ar: "من 4 إلى 8 أسابيع", en: "4 to 8 weeks" },
//     },
//     {
//       id: 5,
//       title: { ar: "التغليف والإطلاق", en: "Packaging and launch" },
//       text: {
//         ar: "بنختار تغليف يحمي المكوّنات، ونكتب الاستخدام والتحذيرات بوضوح على العبوة.",
//         en: "We pick packaging that protects the ingredients and print usage and warnings clearly on the pack.",
//       },
//       duration: { ar: "من 2 إلى 3 أسابيع", en: "2 to 3 weeks" },
//     },
//   ] as ProcessStep[],

  standardsTitleIn: { ar: "اللي بنحطه", en: "What goes in" } as Localized,
  standardsTitleOut: { ar: "اللي بنبعد عنه", en: "What stays out" } as Localized,

  included: [
    { ar: "تركيزات مكتوبة وواضحة للمكوّنات الفعالة", en: "Clear, printed concentrations of active ingredients" },
    { ar: "مكوّنات مهدّئة تدعم حاجز البشرة", en: "Soothing ingredients that support the skin barrier" },
    { ar: "واقي شمس بحماية واسعة الطيف", en: "Broad-spectrum sun protection" },
    { ar: "درجات مكياج تناسب أكتر من لون بشرة", en: "Makeup shades for a wide range of skin tones" },
    { ar: "تغليف يحافظ على ثبات المكوّنات", en: "Packaging that keeps ingredients stable" },
    { ar: "تعليمات استخدام وتحذيرات مفهومة", en: "Usage instructions and warnings that are easy to follow" },
  ] as Localized[],

  excluded: [
    { ar: "وعود مبالغ فيها زي النتايج في ليلة", en: "Overnight-result promises" },
    { ar: "مكوّنات بتسبب حساسية بدون سبب", en: "Irritating ingredients added for no reason" },
    { ar: "عطور قوية في خطوط البشرة الحساسة", en: "Strong fragrance in sensitive-skin lines" },
    { ar: "حشو التركيبة بمكوّنات شكلها بس", en: "Ingredients added only for the label" },
    { ar: "عبوات من غير تاريخ صلاحية واضح", en: "Packs without a clear expiry date" },
    { ar: "منتجات اتطلعت قبل ما تخلص التجارب", en: "Products released before testing is finished" },
  ] as Localized[],

  ingredientsTitle: { ar: "أهم المكوّنات عندنا", en: "Key ingredients" } as Localized,
  ingredientsIntro: {
    ar: "دي مكوّنات بنستخدمها في أكتر من منتج. اضغطي على أي واحد تعرفي بيعمل إيه وبيناسب مين.",
    en: "These ingredients appear in more than one of our products. Select any of them to see what it does and who it suits.",
  } as Localized,
  suitsLabel: { ar: "بيناسب", en: "Suits" } as Localized,
  foundInLabel: { ar: "موجود في", en: "Found in" } as Localized,
  tipLabel: { ar: "طريقة الاستخدام", en: "How to use" } as Localized,

  ingredients: [
    {
      id: 1,
      name: { ar: "حمض الهيالورونيك", en: "Hyaluronic acid" },
      tag: { ar: "ترطيب", en: "Hydration" },
      benefit: {
        ar: "بيجذب الماء للطبقة السطحية من البشرة ويخليها ناعمة وممتلئة.",
        en: "Draws water to the skin's surface layer and leaves it soft and plump.",
      },
      suits: [
        { ar: "كل أنواع البشرة", en: "All skin types" },
        { ar: "البشرة الجافة", en: "Dry skin" },
      ],
      foundIn: [
        { ar: "سيروم الترطيب", en: "Hydrating serum" },
        { ar: "المرطب اليومي", en: "Daily moisturizer" },
      ],
      tip: {
        ar: "حطيه على بشرة رطبة وبعده مرطب عشان يحبس الترطيب.",
        en: "Apply on damp skin and follow with a moisturizer to lock hydration in.",
      },
    },
    {
      id: 2,
      name: { ar: "النياسيناميد", en: "Niacinamide" },
      tag: { ar: "توازن وإشراقة", en: "Balance and glow" },
      benefit: {
        ar: "بيساعد على تنظيم الدهون وتقليل ظهور المسام وتوحيد لون البشرة.",
        en: "Helps regulate oil, soften the look of pores and even out skin tone.",
      },
      suits: [
        { ar: "البشرة الدهنية", en: "Oily skin" },
        { ar: "البشرة المختلطة", en: "Combination skin" },
      ],
      foundIn: [
        { ar: "سيروم التوازن", en: "Balancing serum" },
        { ar: "كريم الليل", en: "Night cream" },
      ],
      tip: {
        ar: "ابدئي مرة في اليوم وزوديه تدريجيًا حسب راحة بشرتك.",
        en: "Start once a day and increase gradually as your skin allows.",
      },
    },
    {
      id: 3,
      name: { ar: "مشتق فيتامين سي", en: "Vitamin C derivative" },
      tag: { ar: "إشراقة", en: "Brightening" },
      benefit: {
        ar: "بيساعد على تفتيح مظهر التصبغات وإضاءة البشرة، وهو أثبت وألطف من الأشكال النقية.",
        en: "Helps brighten the look of dark spots and dull skin, and is more stable and gentler than pure forms.",
      },
      suits: [
        { ar: "البشرة المصبوغة", en: "Skin with pigmentation" },
        { ar: "البشرة الباهتة", en: "Dull skin" },
      ],
      foundIn: [{ ar: "سيروم الإشراقة", en: "Brightening serum" }],
      tip: {
        ar: "استخدميه صباحًا مع واقي الشمس.",
        en: "Use in the morning, followed by sunscreen.",
      },
    },
    {
      id: 4,
      name: { ar: "السنتيلا آسياتيكا", en: "Centella asiatica" },
      tag: { ar: "تهدئة", en: "Soothing" },
      benefit: {
        ar: "مستخلص نباتي بيهدّي مظهر الاحمرار والتهيج ويدعم البشرة بعد الحبوب.",
        en: "A plant extract that calms the look of redness and irritation and supports skin after breakouts.",
      },
      suits: [
        { ar: "البشرة الحساسة", en: "Sensitive skin" },
        { ar: "البشرة المعرضة للحبوب", en: "Breakout-prone skin" },
      ],
      foundIn: [
        { ar: "كريم التهدئة", en: "Calming cream" },
        { ar: "الغسول اللطيف", en: "Gentle cleanser" },
      ],
      tip: {
        ar: "مناسب للاستخدام صباحًا ومساءً.",
        en: "Suitable for morning and evening use.",
      },
    },
    {
      id: 5,
      name: { ar: "السيراميد", en: "Ceramides" },
      tag: { ar: "حاجز البشرة", en: "Skin barrier" },
      benefit: {
        ar: "دهون طبيعية موجودة في البشرة، بتساعد على تقوية الحاجز الواقي وتقليل الجفاف.",
        en: "Lipids naturally found in skin that help strengthen the protective barrier and reduce dryness.",
      },
      suits: [
        { ar: "البشرة الجافة", en: "Dry skin" },
        { ar: "البشرة المتهيجة", en: "Irritated skin" },
      ],
      foundIn: [
        { ar: "المرطب اليومي", en: "Daily moisturizer" },
        { ar: "كريم الليل", en: "Night cream" },
      ],
      tip: {
        ar: "الأفضل استخدامه ليلًا على بشرة نضيفة.",
        en: "Works best at night on clean skin.",
      },
    },
    {
      id: 6,
      name: { ar: "البانثينول", en: "Panthenol" },
      tag: { ar: "تهدئة وترطيب", en: "Soothing and hydrating" },
      benefit: {
        ar: "بيرطّب ويهدّي البشرة، ومناسب للاستخدام بعد التقشير أو التعرض للشمس.",
        en: "Hydrates and calms skin, and suits use after exfoliation or sun exposure.",
      },
      suits: [
        { ar: "كل أنواع البشرة", en: "All skin types" },
        { ar: "البشرة بعد التقشير", en: "Skin after exfoliation" },
      ],
      foundIn: [
        { ar: "كريم التهدئة", en: "Calming cream" },
        { ar: "بلسم الشفايف", en: "Lip balm" },
      ],
      tip: {
        ar: "ممكن تستخدميه في أي وقت من اليوم.",
        en: "Can be used at any time of day.",
      },
    },
    {
      id: 7,
      name: { ar: "السكوالين", en: "Squalane" },
      tag: { ar: "ترطيب", en: "Hydration" },
      benefit: {
        ar: "زيت خفيف بيرطّب من غير ما يسيب ملمس تقيل، ويناسب المكياج فوقه.",
        en: "A lightweight oil that moisturizes without a heavy feel and sits well under makeup.",
      },
      suits: [
        { ar: "البشرة الجافة", en: "Dry skin" },
        { ar: "البشرة المختلطة", en: "Combination skin" },
      ],
      foundIn: [
        { ar: "زيت الوجه", en: "Face oil" },
        { ar: "برايمر المكياج", en: "Makeup primer" },
      ],
      tip: {
        ar: "كمية صغيرة تكفي، وزودي لو بشرتك جافة.",
        en: "A small amount is enough; add more if your skin is dry.",
      },
    },
    {
      id: 8,
      name: { ar: "فلاتر الحماية من الشمس", en: "Sun filters" },
      tag: { ar: "حماية", en: "Protection" },
      benefit: {
        ar: "بتحمي البشرة من الأشعة فوق البنفسجية اللي بتسرّع ظهور التصبغات وعلامات التقدم في السن.",
        en: "Protect skin from UV rays that speed up pigmentation and visible signs of ageing.",
      },
      suits: [{ ar: "كل أنواع البشرة", en: "All skin types" }],
      foundIn: [
        { ar: "واقي الشمس اليومي", en: "Daily sunscreen" },
        { ar: "كريم الأساس بحماية", en: "Foundation with SPF" },
      ],
      tip: {
        ar: "جدديه كل ساعتين لو هتفضلي برا في الشمس.",
        en: "Reapply every two hours if you stay out in the sun.",
      },
    },
  ] as Ingredient[],

  note: {
    ar: "النتايج بتختلف من بشرة لبشرة. جرّبي المنتج على مساحة صغيرة قبل أول استخدام، واستشيري دكتور جلدية لو عندك حالة جلدية أو حساسية.",
    en: "Results vary from skin to skin. Patch test before first use, and talk to a dermatologist if you have a skin condition or allergies.",
  } as Localized,
};