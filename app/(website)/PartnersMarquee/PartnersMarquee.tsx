
"use client";

import { useLanguage } from "@/app/context/LanguageContext";

const partners = [
  { name: "Magento", style: "font-medium tracking-tight" },
  { name: "shopify", style: "font-black italic tracking-tight" },
  { name: "WooCommerce", style: "font-black tracking-tight" },
  { name: "android", style: "font-medium tracking-tight" },
  { name: "Apple", style: "font-semibold tracking-tight" },
  { name: "opencart", style: "font-bold tracking-tight" },
];

export default function PartnersMarquee() {
  const { language } = useLanguage();

  return (
    <section
      dir="ltr"
      lang={language}
      aria-label="Technology partners"
      className="relative w-full overflow-hidden border-b border-emerald-400/20 bg-[#0B101C] py-7"
    >
      {/* Top turquoise line */}
      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-teal-400 to-transparent" />

      {/* Moving logos */}
      <div className="partners-marquee flex w-max items-center">
        {[...partners, ...partners, ...partners, ...partners].map(
          (partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="flex w-[225px] shrink-0 items-center justify-center"
            >
              <span
                className={`whitespace-nowrap text-2xl text-white/90 transition-all duration-300 hover:text-emerald-400 ${partner.style}`}
              >
                {partner.name === "WooCommerce" ? (
                  <>
                    <span className="mr-1 rounded-md bg-purple-500 px-1.5 py-1 text-lg font-black text-white">
                      WOO
                    </span>
                    <span className="text-sm">COMMERCE</span>
                  </>
                ) : partner.name === "android" ? (
                  <>
                    android <span className="text-emerald-400">●</span>
                  </>
                ) : partner.name === "Apple" ? (
                  <>
                    <span className="mr-2 text-3xl">●</span>
                    Apple
                  </>
                ) : partner.name === "shopify" ? (
                  <>
                    <span className="mr-2 text-emerald-400">S</span>
                    shopify
                  </>
                ) : partner.name === "Magento" ? (
                  <>
                    <span className="mr-2 text-orange-500">⬡</span>
                    Magento
                  </>
                ) : (
                  partner.name
                )}
              </span>
            </div>
          )
        )}
      </div>

      {/* Side fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0B101C] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0B101C] to-transparent" />
    </section>
  );
}
