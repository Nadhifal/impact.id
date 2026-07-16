import React from "react";
import { Sidebar } from "./layouts/sidebar";
import { Header } from "./layouts/header";
import { GlobalFooter } from "@/app/shared/components/layouts/Footer";

export default function DinasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fafb] flex">
      {/* Sidebar - fixed to left */}
      <Sidebar />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col pl-64 min-h-screen">
        {/* Header - sticky on top */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow p-8">
          {children}
        </main>

        {/* Footer */}
        <GlobalFooter />
      </div>
    </div>
  );
}
