export interface ValueItem {
  id: string;
  number: string;
  icon: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface AboutValuesData {
  sectionBadgeAr: string;
  sectionBadgeEn: string;
  mainTitleAr: string;
  mainTitleEn: string;
  mainSubtitleAr: string;
  mainSubtitleEn: string;
  visionTitleAr: string;
  visionTitleEn: string;
  visionDescAr: string;
  visionDescEn: string;
  missionTitleAr: string;
  missionTitleEn: string;
  missionDescAr: string;
  missionDescEn: string;
  values: ValueItem[];
}

export const aboutValuesData: AboutValuesData = {
  sectionBadgeAr: "الرؤية والرسالة • CORE VALUES",
  sectionBadgeEn: "VISION & MISSION • CORE VALUES",
  mainTitleAr: "ما الذي يقود شغفنا",
  mainTitleEn: "What Drives Our Passion",
  mainSubtitleAr: "نبتكر اليوم لنبنی معالم مستقبل رقمي يعيد تعريف مفاهيم الجمال والعناية الشخصية.",
  mainSubtitleEn: "Innovating today to build a digital future that redefines beauty and personal care.",
  visionTitleAr: "رؤيتنا",
  visionTitleEn: "Our Vision",
  visionDescAr: "أن نكون المنصة العالمية الرائدة التي تربط عالم الجمال بالتكنولوجيا الذكية، لتمكين كل فرد وعلامة تجارية من التعبير عن تفردهم بكل ثقة وابتكار.",
  visionDescEn: "To be the leading global platform bridging the beauty world with smart technology, empowering every individual and brand to express their uniqueness with confidence.",
  missionTitleAr: "رسالتنا",
  missionTitleEn: "Our Mission",
  missionDescAr: "تقديم حلول افتراضية وتجارب ذكية فائقة الواقعية تُسهّل اتخاذ القرار، وترتقي بتجربة التسوق الرقمي للعلامات التجارية والعملاء على حد سواء.",
  missionDescEn: "Delivering ultra-realistic virtual solutions and smart experiences that simplify decision-making and elevate digital shopping for both brands and customers.",
  values: [
    {
      id: "innovation",
      number: "01",
      icon: "✧",
      titleAr: "الابتكار المستمر",
      titleEn: "Continuous Innovation",
      descAr: "نستثمر دائماً في أحدث خوارزميات الذكاء الاصطناعي والواقع المعزز لنبقى في قمة التطور التقني.",
      descEn: "We constantly invest in cutting-edge AI and AR algorithms to stay ahead of the technology curve.",
    },
    {
      id: "precision",
      number: "02",
      icon: "◈",
      titleAr: "الدقة والواقعية",
      titleEn: "Precision & Realism",
      descAr: "نلتزم بتقديم أعلى معايير الجودة والتطابق الدقيق لتجربة عملاء مذهلة وموثوقة تماماً.",
      descEn: "We are committed to delivering the highest standards of accuracy for an amazing and fully trusted experience.",
    },
    {
      id: "personalization",
      number: "03",
      icon: "❋",
      titleAr: "التفرد والخصوصية",
      titleEn: "Personalization & Privacy",
      descAr: "نؤمن بأن لكل شخص جماله الخاص، ونحرص على حماية بيانات المستخدمين بأعلى معايير الأمان.",
      descEn: "We believe everyone has unique beauty, and we safeguard user privacy with top-tier security standards.",
    },
  ],
};