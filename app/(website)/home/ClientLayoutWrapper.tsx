"use client";

import { useState } from "react";
import SplashScreen from "./SplashScreen"; // عدلي المسار حسب مكان حفظ ملف الوردة اللي فوق

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && children}
    </>
  );
}