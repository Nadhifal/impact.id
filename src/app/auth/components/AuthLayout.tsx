import React from "react";
import { Navbar } from "@/app/components/layouts/navbar";
import { Footer } from "@/app/components/layouts/footer";

export interface AuthLayoutProps {
  children: React.ReactNode;
  showAbstractBackground?: boolean;
}

export function AuthLayout({ children, showAbstractBackground = false }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-primary/10 selection:text-primary">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 md:py-16 relative overflow-hidden">
        {showAbstractBackground && (
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-b from-surface-light/50 to-transparent rounded-full blur-3xl pointer-events-none -mr-48 -mt-24 z-0" />
        )}
        
        <div className="w-full max-w-[640px] relative z-10 flex flex-col items-center">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
