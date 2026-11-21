"use client";

import Link from "next/link";
import { ArrowDown, Clock, Mail, MessageCircle, Phone, Sparkles } from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export default function ContactHeroSection() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const info = [
    {
      icon: Mail,
      label: isArabic ? "البريد الإلكتروني" : "Email",
      value: "hello@orvelia.com", // غيّره لبريدك
      href: "mailto:hello@orvelia.com",
    },
    {
      icon: Phone,
      label: isArabic ? "الهاتف" : "Phone",
      value: "+20 100 000 0000", // غيّره لرقمك
      href: "tel:+201000000000",
    },
    {
      icon: Clock,
      label: isArabic ? "ساعات العمل" : "Working Hours",
      value: isArabic ? "يوميًا من ٩ص إلى ٩م" : "Daily, 9 AM – 9 PM",
      href: undefined,
    },
  ];

  return (
    <section
      dir={isArabic ? "rtl" : "ltr"}
      lang={language}
      className="relative isolate min-h-[640px] overflow-hidden bg-[#F1F4F2] text-[#071A2F] transition-colors duration-500 dark:bg-[#030906] dark:text-white lg:min-h-[700px]"
    >
      {/* Background Video */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          className="h-full w-full object-cover"
        >
          <source src="/assets/video1/face-blusher.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-[#F1F4F2]/25 dark:bg-[#030906]/85" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F1F4F2]/95 via-[#F1F4F2]/60 to-transparent dark:from-[#030906] dark:via-[#030906]/80 dark:to-transparent rtl:bg-gradient-to-l" />

      {/* Bottom fade: يدمج الهيرو مع السكشن اللي بعده */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-[#F1F4F2] to-transparent dark:from-[#030906]" />

      {/* Green Glow */}
      <div className="absolute -end-32 top-20 -z-10 h-96 w-96 rounded-full bg-emerald-400/20 blur-[120px] dark:bg-emerald-600/20" />

      <div className="mx-auto flex min-h-[640px] max-w-7xl items-center px-5 pb-20 pt-28 sm:px-8 lg:min-h-[700px] lg:px-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-white/70 px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm backdrop-blur-md dark:border-emerald-400/20 dark:bg-emerald-950/40 dark:text-emerald-300">
            <Sparkles size={17} />
            {isArabic ? "تواصلي معنا" : "CONTACT US"}
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black leading-[1.4] tracking-tight sm:text-5xl lg:text-7xl">
            {isArabic ? (
              <>
                يسعدنا
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  سماع رأيك
                </span>
                في أي وقت
              </>
            ) : (
              <>
                We'd Love to
                <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  Hear From You
                </span>
                Anytime
              </>
            )}
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-base leading-9 text-slate-600 dark:text-slate-300 sm:text-lg">
            {isArabic
              ? "سواء كان لديك سؤال عن منتجاتنا، أو تحتاجين نصيحة لروتين العناية، فريق أورفيليا جاهز للمساعدة والرد عليك في أسرع وقت."
              : "Whether you have a question about our products or need advice on your care routine, the Orvelia team is ready to help and reply as soon as possible."}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact-form"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-500 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-700/20 transition duration-300 hover:-translate-y-1 hover:shadow-emerald-600/30"
            >
              {isArabic ? "أرسلي رسالة" : "Send a Message"}
              <ArrowDown
                size={19}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>

            <Link
              href="https://wa.me/201000000000" // غيّره لرقم الواتساب
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-emerald-700/30 bg-white/60 px-8 py-4 font-bold text-emerald-800 backdrop-blur-md transition hover:bg-emerald-50 dark:border-emerald-400/30 dark:bg-white/5 dark:text-emerald-300 dark:hover:bg-emerald-950/50"
            >
              <MessageCircle size={18} />
              {isArabic ? "واتساب" : "WhatsApp"}
            </Link>
          </div>

          {/* Quick info */}
          <ul className="mt-14 flex flex-wrap items-start gap-x-10 gap-y-6">
            {info.map(({ icon: Icon, label, value, href }, i) => {
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-700/30 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white dark:border-emerald-300/30 dark:text-emerald-300 dark:group-hover:bg-emerald-300 dark:group-hover:text-[#061811]">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {label}
                    </span>
                    <span
                      dir="ltr"
                      className="mt-0.5 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      {value}
                    </span>
                  </span>
                </>
              );

              return (
                <li
                  key={i}
                  className={
                    i !== 0
                      ? "border-[#071A2F]/10 dark:border-white/10 sm:border-s sm:ps-10"
                      : ""
                  }
                >
                  {href ? (
                    <a href={href} className="group flex items-center gap-3">
                      {content}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-3">{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}