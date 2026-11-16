
"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const steps = [
  {
    titleAr: "تحليل الاحتياجات",
    titleEn: "Requirements Analysis",
    textAr: "دراسة خريطة المكان وحركة الزوار.",
    textEn: "Study the location map and visitor movement.",
  },
  {
    titleAr: "إنشاء الخرائط",
    titleEn: "Map Creation",
    textAr: "تصميم خرائط تفاعلية ثنائية أو ثلاثية الأبعاد.",
    textEn: "Design interactive 2D or 3D maps.",
  },
  {
    titleAr: "تطوير التطبيق",
    titleEn: "Application Development",
    textAr: "بناء نظام الملاحة والربط مع الخدمات المطلوبة.",
    textEn: "Build the navigation system and integrate required services.",
  },
  {
    titleAr: "الاختبار",
    titleEn: "Testing",
    textAr: "ضمان تجربة تنقل سلسة عبر جميع الأجهزة.",
    textEn: "Ensure a smooth navigation experience across all devices.",
  },
  {
    titleAr: "الإطلاق",
    titleEn: "Launch",
    textAr: "نشر التطبيق على الهواتف أو الشاشات التفاعلية أو كلاهما.",
    textEn: "Deploy the application on mobile devices, interactive screens, or both.",
  },
  {
    titleAr: "الصيانة والتحديثات",
    titleEn: "Maintenance & Updates",
    textAr: "تحديث مستمر للخرائط والمميزات لضمان دقة وفعالية أكبر.",
    textEn: "Continuously update maps and features for greater accuracy and efficiency.",
  },
];

const VB_W = 1200;
const VB_H = 280;

const WAVE_PATH =
  "M0 122 C 110 70, 220 48, 300 62 C 420 84, 450 262, 580 262 C 760 262, 800 12, 990 12 C 1090 12, 1160 90, 1200 160";

const DURATION = 9000;
const HOLD = 1800;

function Rocket() {
  return (
    <svg viewBox="0 0 64 32" width="64" height="32" aria-hidden>
      <path d="M8 16 L0 11 L3 16 L0 21Z" fill="#fb923c" />
      <path d="M16 11 L7 2 L24 9Z" fill="#ef4444" />
      <path d="M16 21 L7 30 L24 23Z" fill="#ef4444" />
      <path
        d="M8 16 C18 5, 40 5, 58 16 C40 27, 18 27, 8 16Z"
        fill="#f8fafc"
      />
      <path
        d="M46 10.5 C52 12, 56 14.5, 58 16 C56 17.5, 52 20, 46 21.5Z"
        fill="#ef4444"
      />
      <circle
        cx="33"
        cy="16"
        r="5"
        fill="#3b82f6"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function DevelopmentSteps() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const waveRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const [litCols, setLitCols] = useState(0);

  useEffect(() => {
    const wave = waveRef.current;
    const path = pathRef.current;
    const rocket = rocketRef.current;

    if (!wave || !path || !rocket) return;

    const total = path.getTotalLength();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let last = -1;

    const place = (s: number) => {
      const p = path.getPointAtLength(s);
      const a = path.getPointAtLength(Math.max(0, s - 1));
      const b = path.getPointAtLength(Math.min(total, s + 1));

      const sx = wave.clientWidth / VB_W;
      const sy = wave.clientHeight / VB_H;

      const angle =
        (Math.atan2(
          (a.y - b.y) * sy,
          (a.x - b.x) * sx
        ) *
          180) /
        Math.PI;

      rocket.style.left = `${(p.x / VB_W) * 100}%`;
      rocket.style.top = `${(p.y / VB_H) * 100}%`;
      rocket.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

      return p.x * sx;
    };

    const countLit = (rocketPx: number) => {
      const left = wave.getBoundingClientRect().left;
      let n = 0;

      [0, 2, 4].forEach((i) => {
        const el = itemRefs.current[i];
        if (!el) return;

        const r = el.getBoundingClientRect();
        const center = r.left + r.width / 2 - left;

        if (rocketPx <= center + 60) n++;
      });

      return n;
    };

    if (reduce) {
      place(0);
      setLitCols(3);
      return;
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) % (DURATION + HOLD);
      const t = Math.min(1, elapsed / DURATION);

      const px = place(total * (1 - t));
      const n = countLit(px);

      if (n !== last) {
        last = n;
        setLitCols(n);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative overflow-hidden px-5 py-24"
    >
      <h2 className="text-center text-3xl font-semibold text-fg sm:text-5xl">
        {isArabic
          ? "خطوات تطوير تطبيقات التوجيه الذكي"
          : "Smart Navigation App Development Process"}
      </h2>

      <div className="relative mx-auto mt-16 max-w-7xl md:h-[480px]">
        {/* الموجة + الصاروخ */}
        <div
          ref={waveRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[150px] hidden h-[290px] w-screen -translate-x-1/2 md:block"
        >
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible text-fg/50"
          >
            <path
              ref={pathRef}
              d={WAVE_PATH}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <div
            ref={rocketRef}
            className="absolute left-full top-0 will-change-transform"
          >
            <Rocket />
          </div>
        </div>

        {/* خطوات التطوير */}
        <ol className="relative grid gap-12 md:h-full md:grid-flow-col md:grid-cols-3 md:grid-rows-[220px_220px] md:gap-0">
          {steps.map((s, i) => {
            const lit = Math.floor(i / 2) < litCols;

            return (
              <li
                key={s.titleEn}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={[
                  "flex items-start gap-4 md:justify-center",
                  i % 2 === 1 ? "md:pt-10" : "md:pt-4",
                ].join(" ")}
              >
                <span
                  aria-hidden
                  className={[
                    "text-6xl font-light leading-none transition-all duration-700",
                    lit
                      ? "text-fg [text-shadow:0_0_22px_rgba(125,190,255,0.95)]"
                      : "text-fg/25",
                  ].join(" ")}
                >
                  {i + 1}
                </span>

                <div className="max-w-[260px] pt-1">
                  <h3
                    className={[
                      "font-semibold transition-colors duration-700",
                      lit ? "text-fg" : "text-fg/80",
                    ].join(" ")}
                  >
                    {isArabic ? s.titleAr : s.titleEn}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-muted">
                    {isArabic ? s.textAr : s.textEn}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
