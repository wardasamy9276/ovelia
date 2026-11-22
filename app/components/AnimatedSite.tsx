
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function AnimatedSite({
  children,
}: {
  children: React.ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!container.current) return;

      // تحديد الأقسام تلقائياً
      const sections = container.current.querySelectorAll(
        "main section"
      );

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              once: true,
            },
          }
        );
      });

      // تحريك الصور تلقائياً
      const images = container.current.querySelectorAll(
        "main img"
      );

      images.forEach((img) => {
        gsap.fromTo(
          img,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: img,
              start: "top 95%",
              once: true,
            },
          }
        );
      });

      // تحريك العناوين تلقائياً
      const headings = container.current.querySelectorAll(
        "main h1, main h2, main h3"
      );

      headings.forEach((heading) => {
        gsap.fromTo(
          heading,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: heading,
              start: "top 90%",
              once: true,
            },
          }
        );
      });
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      {children}
    </div>
  );
}
