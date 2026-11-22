"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import SplashScreen from "./SplashScreen";
import AnimatedSite from "@/app/components/AnimatedSite";
import Navbar from "@/app/sction/navbar/navbar";
import Footer from "@/app/sction/footer/footer";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  const [showSplash, setShowSplash] = useState(true);

  const shouldShowSplash = showSplash && !isDashboard;

  return (
    <>
      {shouldShowSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {!shouldShowSplash && (
        <AnimatedSite>
          {!isDashboard && <Navbar />}
          <main>{children}</main>
          {!isDashboard && <Footer />}
        </AnimatedSite>
      )}
    </>
  );
}