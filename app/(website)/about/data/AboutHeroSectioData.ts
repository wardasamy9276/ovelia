export interface AboutHeroStat {
  id: string;
  value: string;
  labelAr: string;
  labelEn: string;
}

export interface AboutHeroData {
  badgeAr: string;
  badgeEn: string;
  titleTopAr: string;
  titleTopEn: string;
  titleHighlightAr: string;
  titleHighlightEn: string;
  descriptionAr: string;
  descriptionEn: string;
  primaryBtnAr: string;
  primaryBtnEn: string;
  primaryHref: string;
  secondaryBtnAr: string;
  secondaryBtnEn: string;
  secondaryHref: string;
  image: string;
  floatingCardTitleAr: string;
  floatingCardTitleEn: string;
  floatingCardDescAr: string;
  floatingCardDescEn: string;
  stats: AboutHeroStat[];
}

export const aboutHeroData: AboutHeroData = {
  badgeAr: "قصتنا ورؤيتنا • ORVELIA",
  badgeEn: "OUR STORY & VISION • ORVELIA",
  titleTopAr: "نعيد صياغة مستقبل",
  titleTopEn: "Redefining The Future Of",
  titleHighlightAr: "الجمال بالذكاء الاصطناعي",
  titleHighlightEn: "Beauty With Artificial Intelligence",
  descriptionAr:
    "في أورفيليا، نؤمن أن الجمال تجربة شخصية فريدة. نجمع بين أحدث تقنيات الذكاء الاصطناعي والواقع المعزز لنمنح كل امرأة وعلامة تجارية أدوات ذكية تكتشف التميز وتُبرز الجمال الطبيعي بدقة وواقعية غير مسبوقة.",
  descriptionEn:
    "At Orvelia, we believe beauty is a uniquely personal experience. We merge cutting-edge artificial intelligence with augmented reality to empower women and brands with smart tools that celebrate individuality and reveal natural beauty with unprecedented precision.",
  primaryBtnAr: "استكشفي تقنياتنا",
  primaryBtnEn: "Explore Our Tech",
  primaryHref: "/ar/gate/ai-tech",
  secondaryBtnAr: "تواصلي معنا",
  secondaryBtnEn: "Contact Us",
  secondaryHref: "/ar/contact",
  image: "/assets/slider/images2.jpg", // يمكنك تغيير مسار الصورة لأي صورة رئيسية لديك
  floatingCardTitleAr: "رؤية مبتكرة",
  floatingCardTitleEn: "Innovative Vision",
  floatingCardDescAr: "دمج التكنولوجيا الرقمية بعالم الأناقة والجمال",
  floatingCardDescEn: "Merging digital technology with elegance & beauty",
  stats: [
    {
      id: "accuracy",
      value: "99.2%",
      labelAr: "دقة التحليل والتتبع",
      labelEn: "Tracking Accuracy",
    },
    {
      id: "experiences",
      value: "+25",
      labelAr: "تجربة افتراضية ذكية",
      labelEn: "Smart Virtual Experiences",
    },
    {
      id: "brands",
      value: "100%",
      labelAr: "تخصيص لكل بشرة",
      labelEn: "Personalized Fit",
    },
  ],
};