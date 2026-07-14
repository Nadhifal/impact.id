import React from "react";
import { FeatureCard } from "../ui/FeatureCard";
import { features } from "../../data";

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold tracking-widest text-[#00473e] uppercase">
            Fitur AI IMPACT.ID
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Optimalkan potensi belajarmu dengan asisten cerdas terintegrasi.
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
