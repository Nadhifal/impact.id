"use client";

import React from "react";
import { Navbar } from "./components/layouts/navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { VerificationSection } from "./components/sections/VerificationSection";
import { GlobalFooter } from "@/app/shared/components/layouts/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-[#00473e]/10 selection:text-[#00473e]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Verification ID Section */}
        <VerificationSection />
      </main>

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
}
