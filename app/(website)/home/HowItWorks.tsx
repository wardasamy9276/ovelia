
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

type Step = {
  id: string;
  title: { ar: string; en: string };
  text: { ar: string; en: string };
  image: string;
  label: { ar: string; en: string };
  sub: { ar: string; en: string };
};

const steps: Step[] = [
  {
    id: "tracking",
    title: {
      ar: "تتبع الوجه واليد والجسم بالذكاء الاصطناعي",
      en: "AI-Powered Face, Hand & Body Tracking",
    },
    text: {
      ar: "تتعرف خوارزميات الذكاء الاصطناعي على معالم الوجه والعينين والشفاه والبشرة، وكذلك اليد والرقبة والأذن، وتتبعها في الوقت الفعلي. فيبقى المنتج، سواء كان أحمر شفاه أو ظلالًا أو قلادة أو نظارة، ثابتًا في مكانه الصحيح بينما يتحرك العميل أو يميل أو يلتفت، وهذا ما يجعل التجربة ثابتة ومقنعة.",
      en: "AI algorithms detect facial landmarks, eyes, lips, and skin, as well as hands, neck, and ears, tracking them in real time. Products such as lipstick, eyeshadow, necklaces, or glasses stay accurately positioned as customers move, tilt, or turn their heads, creating a stable and convincing experience.",
    },
    image: "/assets/imgs/features-section-6.webp",
    label: {
      ar: "تناسق طبيعي",
      en: "Natural Alignment",
    },
    sub: {
      ar: "متزامن بشكل مثالي",
      en: "Perfectly Synchronized",
    },
  },
  {
    id: "ar",
    title: {
      ar: "الواقع المعزز (AR)",
      en: "Augmented Reality (AR)",
    },
    text: {
      ar: "يعرض الواقع المعزز المنتج ثلاثي الأبعاد على بث الكاميرا المباشر للعميل، ويتفاعل مع الإضاءة وزاوية الرؤية والحركة، فيبدو المكياج أو القطعة وكأنها مطبّقة فعلًا. وتعمل التجربة مباشرة عبر المتصفح على الهاتف والكمبيوتر بدون الحاجة لتحميل تطبيق.",
      en: "Augmented reality overlays 3D products onto the customer's live camera feed, responding to lighting, viewing angles, and movement. Makeup or accessories appear as if they were actually applied or worn. The experience runs directly in the browser on mobile devices and computers, with no app download required.",
    },
    image: "/assets/img1/retail.webp",
    label: {
      ar: "واقعية حقيقية",
      en: "True-to-Life Experience",
    },
    sub: {
      ar: "تفاصيل دقيقة",
      en: "Precise Details",
    },
  },
  {
    id: "pbr",
    title: {
      ar: "العرض الفيزيائي الواقعي (PBR)",
      en: "Physically Based Rendering (PBR)",
    },
    text: {
      ar: "يحاكي هذا الأسلوب تفاعل المواد مع الضوء، مثل لمعان الشفاه ونعومة البودرة وبريق الذهب وملمس الجلد والقماش، مع الضوء والظل، فيرى العميل لمعانًا وعمقًا وملمسًا قريبًا من الواقع. وهذا يساعده على الحكم على جودة المنتج قبل الطلب، فيقلل احتمال المرتجعات.",
      en: "This technique simulates how materials interact with light, recreating details such as lip gloss, powder softness, gold reflections, and the textures of leather and fabric. Through realistic lighting and shadows, customers can experience lifelike shine, depth, and texture, helping them evaluate product quality before purchasing and potentially reducing returns.",
    },
    image: "/assets/img/lenses-middle.webp",
    label: {
      ar: "تقنية ذكية",
      en: "Smart Technology",
    },
    sub: {
      ar: "تعزز رضا العملاء",
      en: "Enhances Customer Satisfaction",
    },
  },
];

export default function HowItWorks() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [activeId, setActiveId] = useState(steps[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-id");
            if (id) setActiveId(id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    Object.values(refs.current).forEach((el) => {
      if (el) io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="px-5 py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-16 flex items-center gap-6">
          <span className="h-px flex-1 bg-line" aria-hidden />

          <h2 className="text-center text-2xl font-semibold text-fg sm:text-4xl">
            {isArabic
              ? "Orvelia أورفيليا"
              : "How Does the AI Virtual Experience Work?"}
          </h2>

          <span className="h-px flex-1 bg-line" aria-hidden />
        </div>

        <ol>
          {steps.map((s) => {
            const active = s.id === activeId;

            return (
              <li
                key={s.id}
                data-id={s.id}
                ref={(el) => {
                  refs.current[s.id] = el;
                }}
                className="grid grid-cols-[auto_1fr] gap-x-5 lg:grid-cols-[1.5fr_auto_1fr] lg:gap-x-10"
              >
                {/* Text */}
                <div className="order-2 py-8 lg:order-none lg:py-14">
                  <h3
                    className={[
                      "mb-4 bg-gradient-to-l bg-clip-text text-xl font-semibold text-transparent transition-opacity duration-500 sm:text-2xl",
                      "from-amber-300 to-accent",
                      active ? "opacity-100" : "opacity-60",
                    ].join(" ")}
                  >
                    {isArabic ? s.title.ar : s.title.en}
                  </h3>

                  <p
                    className={[
                      "max-w-2xl leading-9 transition-colors duration-500",
                      active ? "text-fg" : "text-muted",
                    ].join(" ")}
                  >
                    {isArabic ? s.text.ar : s.text.en}
                  </p>
                </div>

                {/* Timeline */}
                <div
                  className="relative order-1 flex justify-center lg:order-none"
                  aria-hidden
                >
                  <span className="absolute inset-y-0 w-0.5 bg-fg/80" />

                  <span
                    className={[
                      "relative z-10 mt-10 size-4 rounded-full border-2 transition-all duration-500 lg:mt-[4.2rem]",
                      active
                        ? "scale-125 border-accent bg-accent shadow-[0_0_14px_var(--accent)]"
                        : "border-fg bg-fg",
                    ].join(" ")}
                  />
                </div>

                {/* Label and image */}
                <div className="order-3 col-span-2 pb-10 lg:order-none lg:col-span-1 lg:py-14">
                  <p className="mb-5 text-sm font-medium text-fg lg:-mt-1">
                    {isArabic ? s.label.ar : s.label.en}

                    <span className="block text-xs font-normal text-muted">
                      {isArabic ? s.sub.ar : s.sub.en}
                    </span>
                  </p>

                  <div className="relative aspect-[4/3] max-w-xs overflow-hidden rounded-xl">
                    <Image
                      src={s.image}
                      alt={isArabic ? s.title.ar : s.title.en}
                      fill
                      sizes="(min-width:1024px) 320px, 80vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
