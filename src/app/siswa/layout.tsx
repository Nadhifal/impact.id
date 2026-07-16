import React from "react";
import { Header } from "./layouts/header";
import { Sidebar } from "./layouts/sidebar";
import { GlobalFooter } from "@/app/shared/components/layouts/Footer";

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafb]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main content offset to the right on desktop */}
      <div className="md:pl-[300px] flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full bg-[#f8fafb]">
          {children}
        </main>
        <GlobalFooter />
      </div>
    </div>
  );
}
