
"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Clock, Copy, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContactVisitSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const [copied, setCopied] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      // لو المتصفح منع النسخ، مفيش حاجة تتعمل
    }
  };

  // بيانات تجريبية: غيّرها ببيانات أورفيليا الحقيقية
  const address = isArabic
    ? "١٢ شارع التحرير، الدقي، القاهرة"
    : "12 Tahrir St., Dokki, Cairo";

  const rows = [
    {
      key: "address",
      icon: MapPin,
      label: isArabic ? "العنوان" : "Address",
      value: address,
      ltr: false,
    },
    {
      key: "hours",
      icon: Clock,
      label: isArabic ? "ساعات العمل" : "Working Hours",
      value: isArabic ? "يوميًا من ٩ص إلى ٩م" : "Daily, 9 AM – 9 PM",
      ltr: false,
      noCopy: true,
    },
    {
      key: "email",
      icon: Mail,
      label: isArabic ? "البريد الإلكتروني" : "Email",
      value: "hello@orvelia.com",
      ltr: true,
    },
    {
      key: "phone",
      icon: Phone,
      label: isArabic ? "الهاتف" : "Phone",
      value: "+20 100 000 0000",
      ltr: true,
    },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate overflow-hidden bg-[#F1F4F2] py-24 text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white md:py-32"
    >
      <style>{`
        @keyframes orvelia-ping {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        .orvelia-ping { animation: orvelia-ping 2.4s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .orvelia-ping { animation: none; opacity: 0; }
        }
      `}</style>

      {/* Glow */}
      <div className="absolute -start-24 top-10 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-[140px] dark:bg-emerald-600/15" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {isArabic ? "زورينا" : "VISIT US"}
          </span>
          <h2 className="mt-3 text-3xl font-black leading-[1.5] sm:text-4xl md:text-5xl">
            {isArabic ? "نحب نستقبلك بنفسنا" : "We'd Love to Welcome You"}
          </h2>
        </div>

        <div className="mt-14 grid items-stretch gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          {/* Stylized map */}
          <div
            dir="ltr"
            className="relative min-h-[360px] overflow-hidden rounded-[2rem] bg-emerald-100 shadow-2xl shadow-emerald-900/10 ring-1 ring-emerald-900/10 dark:bg-[#0B2A1F] dark:shadow-black/50 dark:ring-white/10 lg:min-h-[480px]"
          >
            {/* Grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(7,26,47,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(7,26,47,0.08)_1px,transparent_1px)] [background-size:44px_44px] dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)]"
            />

            {/* Roads */}
            <div
              aria-hidden="true"
              className="absolute -start-10 top-[42%] h-3 w-[120%] -rotate-12 bg-white/70 dark:bg-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute left-[58%] top-[-10%] h-[130%] w-3 rotate-12 bg-white/70 dark:bg-white/10"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/10 to-transparent dark:from-black/30" />

            {/* Pin */}
            <div className="absolute left-[58%] top-[42%] -translate-x-1/2 -translate-y-1/2">
              <span className="orvelia-ping absolute inset-0 rounded-full bg-emerald-500" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-700/40 ring-4 ring-white/80 dark:ring-[#0B2A1F]">
                <MapPin size={24} />
              </span>
            </div>

            {/* Address label */}
            <div className="absolute bottom-5 start-5 rounded-full bg-white/85 px-5 py-2.5 text-xs font-bold text-emerald-800 shadow-lg backdrop-blur-md dark:bg-emerald-950/70 dark:text-emerald-300">
              Orvelia
            </div>

            {/* استبدل هذا الـ div كله بـ iframe خريطة جوجل لو عايزة خريطة حقيقية */}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center">
            <ul className="divide-y divide-[#071A2F]/10 border-y border-[#071A2F]/10 dark:divide-white/10 dark:border-white/10">
              {rows.map(({ key, icon: Icon, label, value, ltr, noCopy }) => (
                <li key={key} className="flex items-center gap-4 py-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-700/30 text-emerald-700 dark:border-emerald-300/30 dark:text-emerald-300">
                    <Icon size={18} />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {label}
                    </p>
                    <p
                      dir={ltr ? "ltr" : undefined}
                      className={`mt-1 break-words text-sm font-medium text-slate-700 dark:text-slate-200 md:text-base ${
                        ltr ? "text-start" : ""
                      }`}
                    >
                      {value}
                    </p>
                  </div>

                  {!noCopy && (
                    <button
                      type="button"
                      onClick={() => copy(key, value)}
                      aria-label={isArabic ? `نسخ ${label}` : `Copy ${label}`}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-emerald-700/10 hover:text-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:text-slate-400 dark:hover:bg-emerald-300/10 dark:hover:text-emerald-300 dark:focus-visible:outline-emerald-300"
                    >
                      {copied === key ? (
                        <Check size={17} className="text-emerald-600 dark:text-emerald-300" />
                      ) : (
                        <Copy size={17} />
                      )}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-700/20 transition duration-300 hover:-translate-y-1 hover:shadow-emerald-600/30"
            >
              <Navigation size={18} />
              {isArabic ? "احصلي على الاتجاهات" : "Get Directions"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}