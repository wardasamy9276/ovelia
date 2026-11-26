"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";

import {
  Sparkles,
  BrainCircuit,
  ScanFace,
  Gem,
  Glasses,
  Bot,
  Headphones,
  Camera,
  Orbit,
  ArrowLeft,
  ArrowRight,
  WandSparkles,
  Heart,
  ShoppingBag,
  Stars,
} from "lucide-react";

const beautyPortalData = {
  ar: {
    discovery: "التخصيص والاكتشاف المدعومان بالذكاء الاصطناعي",
    discoveryDesc:
      "مكّن العملاء من خلال تقنيات الذكاء الاصطناعي المتقدمة التي تتجاوز التحليل التقليدي. من اكتشاف حالة بشرتهم وخصائصها إلى مساعدتهم في إيجاد المظهر المناسب أو استكشاف أنماط مختارة بعناية. هذه البوابة تقدم رؤى وتوصيات شخصية وفورية. النتيجة هي اكتشاف أذكى، واتخاذ قرارات أسهل، ومشاركة أعمق عبر كل نقاط التواصل.",
    luxury: "مركز الإطلالات الفاخرة",
    skin: "مركز البشرة",
    face: "مركز الوجه",

    virtual: "بوابة التجربة الافتراضية",
    virtualDesc:
      "ادخل عصراً جديداً من التسوق مع التجارب الافتراضية اللحظية التي تتيح للعملاء استكشاف عالم الجمال والأناقة كما لم يحدث من قبل.",
    makeup: "مركز المكياج",
    hair: "مركز الشعر",
    accessories: "مركز الإكسسوارات",
    nails: "مركز الأظافر",
    lenses: "مركز العدسات",
    matching: "مركز المزج والمطابقة",
    mirror: "Smart Mirror Glam",

    presentation: "بوابة تقنيات العرض",
    presentationDesc:
      "امنح منتجاتك تجربة عرض واقعية عبر عروض ثلاثية الأبعاد تمنح العملاء نظرة أقرب وتجربة تفاعلية فريدة لكل التفاصيل.",
    explore: "استكشف التجربة",

    augmented: "بوابة الواقع المعزز للمساحات",
    augmentedDesc:
      "أعد تعريف تجربة التسوق المنزلي عبر معاينات الواقع المعزز التي تمكن العملاء من وضع الديكور والإكسسوارات مباشرة داخل مساحاتهم الخاصة بالإضافة إلى الجولات الافتراضية بزاوية 360°.",
    discover: "اكتشف الواقع المعزز",

    assistant: "بوابة المساعد الذكي",
    assistantDesc:
      "ارتقِ برحلة عملائك مع مساعد ذكي مدعوم بالذكاء الاصطناعي، قادر على الفهم والاستجابة والتفاعل مع احتياجاتهم في كل خطوة، ليمنحهم تجربة تسوق شخصية وسلسة.",
    chat: "ابدأ المحادثة",
    support: "الدعم الذكي",
  },

  en: {
    discovery: "AI-Powered Personalization & Discovery",
    discoveryDesc:
      "Empower customers with advanced AI technologies that go beyond traditional analysis. From discovering their skin condition and features to finding the perfect look and exploring carefully curated styles. This portal delivers instant personalized insights and recommendations, enabling smarter discovery and easier decisions.",
    luxury: "Luxury Looks Center",
    skin: "Skin Center",
    face: "Face Center",

    virtual: "Virtual Experience Portal",
    virtualDesc:
      "Enter a new era of shopping with real-time virtual experiences that allow customers to explore the world of beauty and elegance like never before.",
    makeup: "Makeup Center",
    hair: "Hair Center",
    accessories: "Accessories Center",
    nails: "Nails Center",
    lenses: "Lenses Center",
    matching: "Mix & Match Center",
    mirror: "Smart Mirror Glam",

    presentation: "Presentation Technology Portal",
    presentationDesc:
      "Give your products a realistic showcase through 3D presentations that offer customers a closer look and a unique interactive experience for every detail.",
    explore: "Explore Experience",

    augmented: "Augmented Reality Spaces Portal",
    augmentedDesc:
      "Redefine the home shopping experience through augmented reality previews that allow customers to place decor and accessories directly into their own spaces, alongside immersive 360° virtual tours.",
    discover: "Explore Augmented Reality",

    assistant: "Smart Assistant Portal",
    assistantDesc:
      "Elevate your customers' journey with an AI-powered smart assistant capable of understanding, responding, and interacting with their needs at every step, delivering a personalized and seamless shopping experience.",
    chat: "Start Conversation",
    support: "Smart Support",
  },
};
// /virtual-try-on/accessories
// nails اللظافؤ 
// /virtual-try-on/lenses
// /virtual-try-on/matching"
const centerItems = [
  { key: "makeup" as const, icon: WandSparkles, href: "/makeup1" },
  { key: "hair" as const, icon: Sparkles, href: "/makeup2" },
  { key: "accessories" as const, icon: Gem, href: "/makeup3" },
  { key: "nails" as const, icon: Heart, href: "/makeup4" },
  { key: "lenses" as const, icon: Glasses, href: "/makeup5" },
  { key: "matching" as const, icon: ShoppingBag, href: "/makeup6" },
];

interface PortalCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  borderColor?: string;
}

function PortalCard({
  title,
  description,
  icon,
  children,
  className = "",
  borderColor = "border-emerald-500/60",
}: PortalCardProps) {
  return (
    <section
      className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border ${borderColor} bg-gradient-to-br from-white via-[#f5fcf9] to-[#edf9f5] p-6 text-[#102c2b] shadow-[0_15px_45px_rgba(16,185,129,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(16,185,129,0.13)] dark:from-[#15312d] dark:via-[#102a29] dark:to-[#071716] dark:text-white dark:shadow-none dark:hover:shadow-[0_15px_55px_rgba(16,185,129,0.12)] md:p-8 ${className}`}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-emerald-400/15 blur-[110px] transition-all duration-500 group-hover:bg-emerald-400/25 dark:bg-emerald-500/10" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-56 w-56 rounded-full bg-teal-400/15 blur-[100px] dark:bg-teal-500/10" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-black leading-tight md:text-3xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300 md:text-base">
              {description}
            </p>
          </div>

          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/15 bg-emerald-500/10 text-emerald-600 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300 md:h-20 md:w-20">
            {icon}
          </div>
        </div>

        {children}
      </div>
    </section>
  );
}

export default function BeautyExperiencePortal() {
  const { language } = useLanguage();

  const isArabic = language === "ar";
  const t = isArabic ? beautyPortalData.ar : beautyPortalData.en;

  const discoveryItems = [
    { label: t.luxury, href: "/discovery/luxury" },
    { label: t.skin, href: "/discovery/skin" },
    { label: t.face, href: "/discovery/face" },
  ];

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate min-h-screen overflow-hidden bg-[#F1F4F2] px-4 py-6 text-[#102c2b] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:px-8 md:py-8 lg:px-12"
    >
      {/* Background Glow & Grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-emerald-400/20 blur-[150px] dark:bg-emerald-600/15" />

        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-teal-400/20 blur-[150px] dark:bg-teal-800/20" />

        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] bg-[size:36px_36px] opacity-[0.05] dark:opacity-[0.07]" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      </div>

      <div className="mx-auto grid max-w-[1650px] grid-cols-1 gap-5 lg:grid-cols-2 data-reveal">
        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* Virtual Experience */}
          <PortalCard
            title={t.virtual}
            description={t.virtualDesc}
            icon={<ScanFace size={65} strokeWidth={1.2} />}
            borderColor="border-emerald-500/70 dark:border-emerald-400/70"
            className="min-h-[550px] justify-between lg:min-h-[675px]"
          >
            <div className="mt-auto grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2">
              {centerItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className="group/button flex items-center justify-center gap-3 rounded-xl border border-emerald-500/60 bg-white/80 px-4 py-3.5 text-sm font-semibold text-[#102c2b] transition-all duration-300 hover:-translate-y-1 hover:border-teal-500 hover:bg-emerald-50 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] dark:border-emerald-400/70 dark:bg-[#101d19] dark:text-white dark:hover:border-teal-300 dark:hover:bg-emerald-400/10"
                  >
                    <Icon
                      size={18}
                      className="text-emerald-600 transition-transform duration-300 group-hover/button:scale-110 dark:text-emerald-400"
                    />
                    {t[item.key]}
                  </Link>
                );
              })}

              <Link
                href="/smart-mirror"
                className="col-span-1 flex items-center justify-center gap-3 rounded-xl border border-teal-500/70 bg-white/80 px-4 py-3.5 text-sm font-bold text-[#102c2b] transition-all duration-300 hover:-translate-y-1 hover:bg-teal-50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] dark:border-teal-400/70 dark:bg-[#101d19] dark:text-white dark:hover:bg-teal-400/10 sm:col-span-2"
              >
                <Stars size={19} className="text-teal-600 dark:text-teal-300" />
                {t.mirror}
              </Link>
            </div>
          </PortalCard>

          {/* Smart Assistant */}
          <PortalCard
            title={t.assistant}
            description={t.assistantDesc}
            icon={<Bot size={65} strokeWidth={1.2} />}
            borderColor="border-emerald-500/70 dark:border-emerald-400/70"
            className="min-h-[270px]"
          >
            <div className="mt-auto flex flex-wrap gap-3 border-t border-emerald-500/20 pt-5 dark:border-emerald-400/20">
              <Link
                href="/assistant/chat"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/60 bg-white/70 px-5 py-3 text-sm font-semibold text-emerald-800 transition-all hover:-translate-y-1 hover:bg-emerald-50 dark:border-emerald-400/50 dark:bg-[#071810]/80 dark:text-emerald-200 dark:hover:bg-[#0B2419]"
              >
                <Bot size={18} />
                {t.chat}
              </Link>

              <Link
                href="/assistant/support"
                className="inline-flex items-center gap-2 rounded-xl border border-teal-500/60 bg-white/70 px-5 py-3 text-sm font-semibold text-teal-800 transition-all hover:-translate-y-1 hover:bg-teal-50 dark:border-teal-400/50 dark:bg-[#071810]/80 dark:text-teal-200 dark:hover:bg-teal-400/10"
              >
                <Headphones size={18} />
                {t.support}
              </Link>
            </div>
          </PortalCard>
        </div>

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-5">
          {/* AI Discovery */}
          <PortalCard
            title={t.discovery}
            description={t.discoveryDesc}
            icon={<Orbit size={75} strokeWidth={1.2} />}
            borderColor="border-teal-500/70 dark:border-teal-400/70"
            className="min-h-[435px] text-center"
          >
            <div className="mt-auto flex flex-col items-center pt-7">
              {discoveryItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    marginTop: index === 0 ? 0 : "-3px",
                    transform: `translateX(${index * 9 * (isArabic ? 1 : -1)}px)`,
                  }}
                  className="relative w-56 max-w-full rounded-xl border border-emerald-500/70 bg-white px-5 py-3 text-sm font-semibold text-[#102c2b] transition-all duration-300 hover:z-10 hover:scale-105 hover:bg-emerald-50 hover:shadow-[0_0_18px_rgba(16,185,129,0.15)] dark:border-emerald-400/70 dark:bg-[#101d19] dark:text-white dark:hover:bg-emerald-400/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </PortalCard>

          {/* 3D Presentation */}
          <PortalCard
            title={t.presentation}
            description={t.presentationDesc}
            icon={<Gem size={70} strokeWidth={1.2} />}
            borderColor="border-emerald-500/70 dark:border-emerald-400/70"
            className="min-h-[215px]"
          >
            <Link
              href="/presentation"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-emerald-500/70 bg-white/70 px-5 py-3 text-sm font-semibold text-emerald-800 transition-all hover:-translate-y-1 hover:bg-emerald-50 dark:border-emerald-400/70 dark:bg-[#101d19] dark:text-emerald-200 dark:hover:bg-emerald-500/10"
            >
              {t.explore}

              {isArabic ? (
                <ArrowLeft size={17} />
              ) : (
                <ArrowRight size={17} />
              )}
            </Link>
          </PortalCard>

          {/* Augmented Reality */}
          <PortalCard
            title={t.augmented}
            description={t.augmentedDesc}
            icon={<Camera size={70} strokeWidth={1.2} />}
            borderColor="border-teal-500/70 dark:border-teal-400/70"
            className="min-h-[250px]"
          >
            <Link
              href="/augmented-reality"
              className="mt-auto inline-flex w-fit items-center gap-2 rounded-xl border border-teal-500/70 bg-white/70 px-5 py-3 text-sm font-semibold text-teal-800 transition-all hover:-translate-y-1 hover:bg-teal-50 dark:border-teal-400/70 dark:bg-[#101d19] dark:text-teal-200 dark:hover:bg-teal-500/10"
            >
              {t.discover}

              {isArabic ? (
                <ArrowLeft size={17} />
              ) : (
                <ArrowRight size={17} />
              )}
            </Link>
          </PortalCard>
        </div>
      </div>

      {/* Floating Action Links */}
      <div
        className={`fixed bottom-6 z-50 flex flex-col gap-4 ${
          isArabic ? "right-5" : "left-5"
        }`}
      >
        <Link
          href="/beauty-tools"
          aria-label="Beauty Tools"
          title="Beauty Tools"
          className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400 bg-[#071810] text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(16,185,129,0.55)]"
        >
          <Glasses size={30} />
        </Link>

        <Link
          href="/assistant"
          aria-label="AI Assistant"
          title="AI Assistant"
          className="flex h-16 w-16 items-center justify-center rounded-full border border-teal-400 bg-[#071810] text-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.35)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(20,184,166,0.55)]"
        >
          <BrainCircuit size={30} />
        </Link>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 h-px w-full bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
    </main>
  );
}