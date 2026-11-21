export type Sector = {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
};

export const sectors: Sector[] = [
  {
    id: "beauty",
    titleAr: "الجمال ومستحضرات التجميل",
    titleEn: "Beauty & Cosmetics",
    descriptionAr:
      "امنحي عملاءك تجربة تسوق مختلفة تجمع بين الجمال والتكنولوجيا. تتيح تقنيات التجربة الافتراضية للعملاء اكتشاف مستحضرات التجميل وتجربة درجات المكياج المختلفة قبل اتخاذ قرار الشراء. يمكنهم استكشاف ألوان أحمر الشفاه، وتجربة ظلال العيون، واختيار كريم الأساس المناسب، ومقارنة الإطلالات المختلفة بسهولة. تساعد هذه التجربة على تقليل الحيرة أثناء التسوق، وتمنح كل عميل فرصة لاكتشاف المنتجات التي تناسب ذوقه واحتياجاته. كما تساعد العلامات التجارية على تقديم تجربة أكثر تفاعلاً، وزيادة ثقة العملاء، وتحويل عملية اكتشاف المنتجات إلى رحلة ممتعة وشخصية.",
    descriptionEn:
      "Give your customers a new shopping experience where beauty meets technology. Virtual try-on technology allows shoppers to discover beauty products and experiment with different makeup shades before making a purchase. They can explore lipstick colors, try eyeshadow combinations, find suitable foundation shades, and compare different looks with ease. This experience reduces uncertainty during shopping and helps every customer discover products that match their personal style and needs. It also enables beauty brands to create more engaging interactions, build customer confidence, and turn product discovery into a personalized shopping journey.",
    image: "/assets/img1/retail.webp",
  },
  {
    id: "jewelry",
    titleAr: "المجوهرات والإكسسوارات",
    titleEn: "Jewelry & Accessories",
    descriptionAr:
      "امنحي عملاءك فرصة اكتشاف تفاصيل الأناقة وتجربة المجوهرات والإكسسوارات افتراضياً قبل الشراء. يمكنهم تجربة الخواتم والقلائد والأقراط والأساور والساعات، ومشاهدة كيف تبدو كل قطعة مع مظهرهم الشخصي. تساعد التجربة التفاعلية على مقارنة التصاميم والأحجام والألوان، وتنسيق أكثر من قطعة معاً للوصول إلى الإطلالة المثالية. وبدلاً من الاعتماد على الصور التقليدية فقط، يحصل العميل على تصور أقرب للواقع يساعده على اتخاذ قرار أكثر ثقة. إنها طريقة ذكية لعرض المنتجات الفاخرة، وإبراز تفاصيلها، وتقديم تجربة تسوق عصرية تليق بالعلامات التجارية المتميزة.",
    descriptionEn:
      "Give your customers the opportunity to discover elegant details and virtually try on jewelry and accessories before purchasing. They can explore rings, necklaces, earrings, bracelets, and watches while seeing how each piece complements their personal style. The interactive experience makes it easier to compare designs, sizes, and colors, as well as combine different pieces to create the perfect look. Instead of relying only on traditional product images, customers get a more realistic impression that supports confident purchasing decisions. It is a smarter way to showcase premium products, highlight their details, and deliver a modern shopping experience for luxury brands.",
    image: "/assets/img1/jew-accs.webp",
  },
  {
    id: "ecommerce",
    titleAr: "منصات التجارة الإلكترونية",
    titleEn: "E-Commerce Platforms",
    descriptionAr:
      "طوّري تجربة التسوق داخل متجرك الإلكتروني من خلال دمج تقنيات التجربة الافتراضية مباشرة في صفحات المنتجات. بدلاً من مشاهدة الصور والوصف فقط، يستطيع العملاء التفاعل مع المنتجات واستكشاف تفاصيلها وتجربتها بطريقة أكثر واقعية. تساعد هذه التقنية الزائر على فهم المنتج بشكل أفضل، ومقارنة الخيارات المتاحة، واختيار ما يناسبه قبل إتمام عملية الشراء. كما تمنح المتاجر الإلكترونية فرصة لتقديم تجربة مختلفة عن المنافسين، وزيادة تفاعل المستخدمين مع صفحات المنتجات، وبناء علاقة أكثر ثقة مع العملاء. اجعلي متجرك الإلكتروني مساحة تفاعلية تجمع بين سهولة الاستخدام والتكنولوجيا الحديثة.",
    descriptionEn:
      "Upgrade your online store by integrating virtual try-on technology directly into your product pages. Instead of relying only on images and descriptions, customers can interact with products, explore their details, and experience them in a more realistic way. This technology helps shoppers understand products better, compare available options, and choose what suits them before completing a purchase. It also gives e-commerce businesses an opportunity to stand out from competitors, increase engagement across product pages, and build stronger customer relationships. Transform your online store into an interactive shopping destination that combines convenience with modern technology.",
    image: "/assets/img1/imagese1.jpg",
  },
  {
    id: "retail",
    titleAr: "متاجر التجزئة والمتاجر متعددة الفروع",
    titleEn: "Retail & Multi-Branch Stores",
    descriptionAr:
      "حوّلي تجربة التسوق التقليدية داخل المتاجر إلى تجربة رقمية أكثر تطوراً باستخدام المرايا الذكية والشاشات التفاعلية وتقنيات التجربة الافتراضية. يستطيع العملاء استكشاف المنتجات وتجربتها داخل الفرع، ومقارنة الخيارات المختلفة دون الحاجة إلى تجربة كل منتج بشكل تقليدي. كما يمكن ربط التجربة داخل المتجر بالخدمات الرقمية، لتوفير رحلة تسوق متكاملة تجمع بين العالم الواقعي والتكنولوجيا. تساعد هذه الحلول العلامات التجارية على تحسين تجربة الزوار، وتقديم خدمات أكثر ابتكاراً، وتعزيز حضورها الرقمي داخل الفروع المختلفة. امنحي عملاءك تجربة حديثة تجعل زيارة المتجر أكثر سهولة وتفاعلاً.",
    descriptionEn:
      "Transform traditional in-store shopping into a more advanced digital experience using smart mirrors, interactive screens, and virtual try-on technology. Customers can explore and experience products inside the store while comparing different options without relying entirely on traditional fitting methods. The in-store experience can also connect with digital services to create a seamless shopping journey that combines physical retail with modern technology. These solutions help brands improve visitor experiences, introduce innovative services, and strengthen their digital presence across multiple branches. Give your customers a modern experience that makes every store visit more convenient and engaging.",
    image: "/assets/img1/ecomm.webp",
  },
];