import React from "react";
import { Header } from "./layouts/header";
import { Footer } from "./layouts/footer";

export default function SiswaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafb]">
      <Header />
      <main className="flex-1 w-full bg-[#f8fafb]">
        {children}
      </main>
      <Footer />
    </div>
  );
}
