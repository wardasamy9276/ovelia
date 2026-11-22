"use client";

import React from "react";
import DashboardSidebar from "./DashboardSidebar"; // عدّلي المسار حسب مكان الملف

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-[#090e1a]">
      <DashboardSidebar />
      <main className="flex-1 p-4 pt-18 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}