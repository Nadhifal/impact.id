"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/layouts/navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { VerificationSection } from "./components/sections/VerificationSection";
import { GlobalFooter } from "@/app/shared/components/layouts/Footer";

export default function Home() {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    async function loadLandingPage() {
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success) {
          setContent(json.data);
        }
      } catch (err) {
        console.error("Failed to load landing page content:", err);
      }
    }
    loadLandingPage();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-[#00473e]/10 selection:text-[#00473e]">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection stats={content?.stats} />

        {/* Features Section */}
        <FeaturesSection features={content?.features} />

        {/* Process Section */}
        <ProcessSection processSteps={content?.processSteps} />

        {/* Testimonials Section */}
        <TestimonialsSection testimonial={content?.testimonial} />

        {/* Verification ID Section */}
        <VerificationSection verification={content?.verification} />
      </main>

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
}
