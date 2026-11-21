export type Feature = {
  title: string;
  text: string;
};

export type Experience = {
  id: string;
  title: { ar: string; en: string };
  image: string;
  features: { ar: Feature[]; en: Feature[] };
  demoHref: string;
  plansHref: string;
};


function createExperience(
  id: string,
  titleAr: string,
  titleEn: string,
  image: string,
  demoSlug: string,
  featuresAr: Feature[],
  featuresEn: Feature[],
): Experience {
  return {
    id,
    title: { ar: titleAr, en: titleEn },
    image,
    features: {
      ar: featuresAr,
      en: featuresEn,
    },
    demoHref:
      id === "lipstick"
        ? "/virtual-try-on"
        : `/demo/${demoSlug}`,
    plansHref: "/pricing",
  };
}


export const experiences: Experience[] = [
  createExperience(
    "lipstick",
    "تجربة أحمر الشفاه الافتراضية",
    "Virtual Lipstick Try-On",
    "/assets/img/imagesw1.jpg",
    "lipstick",
    [
      { title: "درجات لونية متنوعة", text: "جربي درجات الأحمر والوردي والنود واختاري اللون المناسب لبشرتك." },
      { title: "لمعان وتشطيب واقعي", text: "شاهدي تأثير اللمعة والتشطيب المطفي والكريمي على الشفاه." },
      { title: "تجربة قبل الشراء", text: "قارني بين الألوان المختلفة قبل اختيار أحمر الشفاه المناسب." },
    ],
    [
      { title: "Multiple Color Shades", text: "Explore red, pink, and nude shades that complement your skin tone." },
      { title: "Realistic Finish", text: "Preview glossy, matte, and creamy lipstick finishes." },
      { title: "Try Before You Buy", text: "Compare different shades before choosing your lipstick." },
    ],
  ),

  createExperience(
    "eyeshadow",
    "تجربة ظلال العيون الافتراضية",
    "Virtual Eyeshadow Try-On",
    "/assets/imgs/center.webp",
    "eyeshadow",
    [
      { title: "تدرجات لونية ناعمة", text: "ادمجي الألوان للحصول على إطلالة عيون متناسقة." },
      { title: "لمسات لامعة ومطفية", text: "جربي الظلال اللامعة والمعدنية والمطفية." },
      { title: "إطلالات متعددة", text: "اختاري ألوانًا تناسب إطلالتك اليومية والمسائية." },
    ],
    [
      { title: "Smooth Color Gradients", text: "Blend shades to create a beautifully coordinated eye look." },
      { title: "Matte & Shimmer Finishes", text: "Explore matte, metallic, and shimmering eyeshadows." },
      { title: "Multiple Eye Looks", text: "Discover shades for everyday and evening makeup." },
    ],
  ),

  createExperience(
    "foundation",
    "تجربة كريم الأساس الافتراضية",
    "Virtual Foundation Try-On",
    "/assets/slider/imagesa1.jpg",
    "foundation",
    [
      { title: "مطابقة لون البشرة", text: "اكتشفي درجات كريم الأساس التي تناسب لون بشرتك." },
      { title: "تغطية قابلة للتعديل", text: "اختاري التغطية الخفيفة أو المتوسطة أو الكاملة." },
      { title: "تشطيبات مختلفة", text: "قارني بين المظهر المطفي والطبيعي والمشرق." },
    ],
    [
      { title: "Skin Tone Matching", text: "Discover foundation shades that complement your skin tone." },
      { title: "Adjustable Coverage", text: "Choose light, medium, or full coverage." },
      { title: "Different Finishes", text: "Compare matte, natural, and radiant finishes." },
    ],
  ),

  createExperience(
    "blush",
    "تجربة أحمر الخدود والكونتور",
    "Virtual Blush & Contour Try-On",
    "/images/makeup/blush.jpg",
    "blush",
    [
      { title: "تحديد ملامح الوجه", text: "جربي الكونتور لإبراز ملامح الوجه بطريقة جذابة." },
      { title: "درجات أحمر الخدود", text: "اختاري درجات وردية وخوخية وطبيعية." },
      { title: "تحكم في كثافة اللون", text: "عدلي قوة اللون للحصول على المظهر الذي تحبينه." },
    ],
    [
      { title: "Facial Definition", text: "Try contour shades to enhance your facial features." },
      { title: "Blush Color Selection", text: "Explore pink, peach, and natural blush shades." },
      { title: "Adjustable Intensity", text: "Control color intensity to achieve your preferred look." },
    ],
  ),

  createExperience(
    "eyeliner",
    "تجربة الآيلاينر والرموش",
    "Virtual Eyeliner & Lashes Try-On",
    "/images/makeup/eyeliner.jpg",
    "eyeliner",
    [
      { title: "أشكال آيلاينر متعددة", text: "جربي الكات آي والخط الرفيع والجناح الطويل." },
      { title: "رموش متنوعة", text: "اختاري بين الرموش الطبيعية والكثيفة." },
      { title: "تحديد العين", text: "اكتشفي الشكل الذي يبرز جمال عينيك." },
    ],
    [
      { title: "Multiple Eyeliner Styles", text: "Try cat-eye, fine lines, and dramatic wings." },
      { title: "Different Lash Styles", text: "Choose between natural and voluminous lashes." },
      { title: "Eye Definition", text: "Discover styles that enhance your eyes." },
    ],
  ),

  createExperience(
    "brows",
    "تجربة الحواجب الافتراضية",
    "Virtual Eyebrow Try-On",
    "/images/makeup/brows.jpg",
    "brows",
    [
      { title: "أشكال مختلفة", text: "اختاري شكل الحواجب المناسب لملامح وجهك." },
      { title: "درجات طبيعية", text: "جربي ألوانًا مختلفة تتناسب مع لون شعرك." },
      { title: "كثافة قابلة للتعديل", text: "تحكمي في كثافة الحواجب للحصول على مظهر طبيعي." },
    ],
    [
      { title: "Different Shapes", text: "Find eyebrow shapes that complement your face." },
      { title: "Natural Shades", text: "Explore colors that match your hair tone." },
      { title: "Adjustable Thickness", text: "Control eyebrow density for a natural look." },
    ],
  ),

  createExperience(
    "highlighter",
    "تجربة الهايلايتر",
    "Virtual Highlighter Try-On",
    "/assets/img/imagesw1.jpg",
    "highlighter",
    [
      { title: "إضاءة جذابة", text: "أضيفي لمسات مضيئة على عظام الخد والأنف." },
      { title: "درجات متعددة", text: "جربي الذهبي والفضي والشمبانيا." },
      { title: "لمعان متوازن", text: "اختاري مستوى الإضاءة المناسب لإطلالتك." },
    ],
    [
      { title: "Radiant Glow", text: "Add luminous highlights to your cheekbones and nose." },
      { title: "Multiple Shades", text: "Explore gold, silver, and champagne tones." },
      { title: "Balanced Shine", text: "Choose the perfect glow intensity for your look." },
    ],
  ),

  createExperience(
    "bronzer",
    "تجربة البرونزر",
    "Virtual Bronzer Try-On",
    "/assets/imgs/center.webp",
    "bronzer",
    [
      { title: "دفء البشرة", text: "أضيفي لمسة دافئة ومشرقة إلى ملامح وجهك." },
      { title: "درجات برونزية", text: "اختاري اللون المناسب لبشرتك." },
      { title: "تحديد ناعم", text: "جربي توزيع البرونزر للحصول على إطلالة متناسقة." },
    ],
    [
      { title: "Warm Skin Effect", text: "Add a warm and radiant touch to your complexion." },
      { title: "Bronze Shades", text: "Choose a shade that complements your skin." },
      { title: "Soft Definition", text: "Explore bronzer placement for a balanced look." },
    ],
  ),

  createExperience(
    "lip-gloss",
    "تجربة ملمع الشفاه",
    "Virtual Lip Gloss Try-On",
    "/assets/img/imagesw1.jpg",
    "lip-gloss",
    [
      { title: "لمعان زجاجي", text: "جربي تأثير اللمعان الزجاجي على شفتيك." },
      { title: "ألوان شفافة", text: "اختاري درجات شفافة ووردية ونود." },
      { title: "مظهر ممتلئ", text: "شاهدي تأثير اللمعان على مظهر الشفاه." },
    ],
    [
      { title: "Glass-Like Shine", text: "Preview a beautiful glass-like finish on your lips." },
      { title: "Sheer Colors", text: "Explore clear, pink, and nude gloss shades." },
      { title: "Fuller-Looking Lips", text: "See how gloss changes the appearance of your lips." },
    ],
  ),

  createExperience(
    "lip-liner",
    "تجربة محدد الشفاه",
    "Virtual Lip Liner Try-On",
    "/assets/img/imagesw1.jpg",
    "lip-liner",
    [
      { title: "تحديد دقيق", text: "جربي تحديد الشفاه بأشكال مختلفة." },
      { title: "ألوان متناسقة", text: "اختاري لونًا يتناسب مع أحمر الشفاه." },
      { title: "إبراز شكل الشفاه", text: "اكتشفي طرقًا مختلفة لإبراز حدود الشفاه." },
    ],
    [
      { title: "Precise Definition", text: "Explore different ways to define your lips." },
      { title: "Matching Shades", text: "Choose liner colors that complement your lipstick." },
      { title: "Enhanced Lip Shape", text: "Discover different ways to highlight your lip shape." },
    ],
  ),

  createExperience(
    "powder",
    "تجربة البودرة",
    "Virtual Face Powder Try-On",
    "/assets/slider/imagesa1.jpg",
    "powder",
    [
      { title: "تأثير مطفي", text: "جربي المظهر المطفي وتقليل اللمعان." },
      { title: "درجات مختلفة", text: "اختاري البودرة المناسبة للون بشرتك." },
      { title: "لمسة نهائية", text: "قارني بين البودرة الشفافة والملونة." },
    ],
    [
      { title: "Matte Finish", text: "Preview a matte finish and reduced shine." },
      { title: "Different Shades", text: "Explore powder shades for your complexion." },
      { title: "Finishing Touch", text: "Compare translucent and tinted powders." },
    ],
  ),

  createExperience(
    "concealer",
    "تجربة الكونسيلر",
    "Virtual Concealer Try-On",
    "/assets/slider/imagesa1.jpg",
    "concealer",
    [
      { title: "اختيار الدرجة", text: "جربي درجات الكونسيلر المختلفة." },
      { title: "تغطية العيوب", text: "شاهدي تأثير التغطية على مظهر البشرة." },
      { title: "إضاءة منطقة العين", text: "اختاري درجة مناسبة لإضاءة منطقة تحت العين." },
    ],
    [
      { title: "Shade Selection", text: "Explore different concealer shades." },
      { title: "Coverage Preview", text: "See how concealer coverage changes your look." },
      { title: "Under-Eye Brightening", text: "Choose a suitable shade to brighten the under-eye area." },
    ],
  ),

  createExperience(
    "smokey-eyes",
    "تجربة مكياج العيون السموكي",
    "Virtual Smokey Eye Makeup",
    "/assets/imgs/center.webp",
    "smokey-eyes",
    [
      { title: "تدرجات دخانية", text: "جربي دمج الأسود والرمادي والبني." },
      { title: "إطلالة جريئة", text: "اختاري مظهرًا جذابًا للمناسبات والسهرات." },
      { title: "دمج احترافي", text: "اكتشفي تأثير تدرج الظلال على العين." },
    ],
    [
      { title: "Smokey Gradients", text: "Blend black, gray, and brown eyeshadow shades." },
      { title: "Bold Eye Look", text: "Create a dramatic style for parties and special occasions." },
      { title: "Seamless Blending", text: "Explore smooth eyeshadow transitions." },
    ],
  ),

  createExperience(
    "natural-makeup",
    "تجربة المكياج الطبيعي",
    "Virtual Natural Makeup",
    "/images/makeup/blush.jpg",
    "natural-makeup",
    [
      { title: "إطلالة ناعمة", text: "احصلي على مظهر بسيط يناسب الاستخدام اليومي." },
      { title: "ألوان هادئة", text: "جربي درجات النود والوردي الطبيعي." },
      { title: "مظهر متوازن", text: "نسقي ألوان الوجه والعين والشفاه." },
    ],
    [
      { title: "Soft Makeup Look", text: "Explore a subtle look for everyday wear." },
      { title: "Soft Color Palette", text: "Try nude and natural pink shades." },
      { title: "Balanced Appearance", text: "Coordinate your face, eye, and lip makeup." },
    ],
  ),

  createExperience(
    "evening-makeup",
    "تجربة المكياج المسائي",
    "Virtual Evening Makeup",
    "/images/makeup/eyeliner.jpg",
    "evening-makeup",
    [
      { title: "ألوان مسائية جذابة", text: "جربي الدرجات القوية والمميزة." },
      { title: "لمسات لامعة", text: "أضيفي لمسات من اللمعان لإطلالتك." },
      { title: "إطلالة متكاملة", text: "نسقي مكياج العيون والشفاه والخدود." },
    ],
    [
      { title: "Elegant Evening Shades", text: "Explore bold and beautiful makeup colors." },
      { title: "Shimmer Details", text: "Add glamorous shimmer to your look." },
      { title: "Complete Evening Look", text: "Coordinate your eyes, lips, and cheeks." },
    ],
  ),

  createExperience(
    "korean-makeup",
    "تجربة المكياج الكوري",
    "Virtual Korean Makeup",
    "/assets/img/imagesw1.jpg",
    "korean-makeup",
    [
      { title: "إطلالة زجاجية", text: "جربي مظهر البشرة المشرق والناعم." },
      { title: "ألوان وردية", text: "اكتشفي درجات الوردي والخوخي." },
      { title: "مكياج ناعم", text: "نسقي ملامحك بإطلالة كورية بسيطة." },
    ],
    [
      { title: "Glass Skin Look", text: "Explore a smooth and radiant complexion." },
      { title: "Pink & Peach Shades", text: "Discover beautiful pink and peach colors." },
      { title: "Soft Makeup", text: "Create a simple and delicate Korean-inspired look." },
    ],
  ),

  createExperience(
    "glitter-makeup",
    "تجربة المكياج اللامع",
    "Virtual Glitter Makeup",
    "/assets/imgs/center.webp",
    "glitter-makeup",
    [
      { title: "جزيئات لامعة", text: "جربي تأثير الجليتر على العين والوجه." },
      { title: "ألوان براقة", text: "اختاري الذهبي والفضي والوردي." },
      { title: "إطلالة مميزة", text: "أضيفي لمسات لامعة للمناسبات الخاصة." },
    ],
    [
      { title: "Glitter Particles", text: "Preview glitter effects on your eyes and face." },
      { title: "Sparkling Colors", text: "Explore gold, silver, and pink glitter shades." },
      { title: "Statement Look", text: "Add sparkling details for special occasions." },
    ],
  ),

  createExperience(
    "false-lashes",
    "تجربة تركيب الرموش",
    "Virtual False Lashes Try-On",
    "/images/makeup/eyeliner.jpg",
    "false-lashes",
    [
      { title: "أطوال متنوعة", text: "اختاري طول الرموش الذي يناسب شكل عينيك." },
      { title: "كثافة مختلفة", text: "قارني بين الرموش الطبيعية والكثيفة." },
      { title: "مظهر جذاب", text: "اكتشفي تأثير الرموش على إطلالة العين." },
    ],
    [
      { title: "Different Lengths", text: "Choose lash lengths that suit your eye shape." },
      { title: "Various Densities", text: "Compare natural and voluminous lash styles." },
      { title: "Enhanced Eye Look", text: "Discover how lashes transform your eye makeup." },
    ],
  ),

  createExperience(
    "color-correction",
    "تجربة تصحيح ألوان البشرة",
    "Virtual Skin Color Correction",
    "/assets/slider/imagesa1.jpg",
    "color-correction",
    [
      { title: "تصحيح درجات اللون", text: "جربي تأثير درجات التصحيح المختلفة على البشرة." },
      { title: "توحيد المظهر", text: "شاهدي تأثير تنسيق ألوان البشرة قبل وضع المكياج." },
      { title: "اختيار اللون المناسب", text: "قارني بين درجات التصحيح المختلفة." },
    ],
    [
      { title: "Color Correction Shades", text: "Explore different color-correcting shades." },
      { title: "Balanced Complexion", text: "Preview complexion balancing before applying makeup." },
      { title: "Shade Selection", text: "Compare different correction colors." },
    ],
  ),

  createExperience(
    "full-look",
    "تجربة إطلالة مكياج كاملة",
    "Virtual Full Makeup Look",
    "/images/makeup/blush.jpg",
    "full-look",
    [
      { title: "مكياج متكامل", text: "جربي تنسيق مكياج الوجه والعين والشفاه معًا." },
      { title: "أنماط متعددة", text: "اختاري إطلالة طبيعية أو جريئة أو مسائية." },
      { title: "تنسيق الألوان", text: "اكتشفي الألوان التي تتناسب مع بعضها." },
    ],
    [
      { title: "Complete Makeup", text: "Preview coordinated face, eye, and lip makeup." },
      { title: "Multiple Styles", text: "Choose natural, bold, or evening looks." },
      { title: "Color Coordination", text: "Discover shades that work beautifully together." },
    ],
  ),
];