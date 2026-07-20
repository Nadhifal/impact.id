import { Navbar } from "./components/layouts/navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { FeaturesSection } from "./components/sections/FeaturesSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { TestimonialsSection } from "./components/sections/TestimonialsSection";
import { VerificationSection } from "./components/sections/VerificationSection";
import { GlobalFooter } from "@/app/shared/components/layouts/Footer";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

async function getLandingPageContent() {
  const contents = await prisma.landingPageContent.findMany();
  const result: Record<string, any> = {};

  for (const content of contents) {
    try {
      result[content.key] = JSON.parse(content.value);
    } catch {
      result[content.key] = content.value;
    }
  }

  return result;
}

export default async function Home() {
  const content = await getLandingPageContent();

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
