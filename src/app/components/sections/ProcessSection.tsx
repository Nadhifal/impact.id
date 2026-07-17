import React from "react";
import { processSteps as defaultProcessSteps } from "../../data";
import { ProcessCard } from "../ui/ProcessCard";

export function ProcessSection({ processSteps = defaultProcessSteps }: { processSteps?: typeof defaultProcessSteps }) {
  const firstRowSteps = processSteps.slice(0, 4);
  const secondRowSteps = processSteps.slice(4);

  return (
    <section id="process" className="py-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-sm font-bold tracking-widest text-[#00473e] uppercase">
            Proses Belajar Kami
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Langkah strategis menuju karir impian Anda.
          </h2>
        </div>

        {/* Mobile View: Vertical list layout (stacked) */}
        <div className="md:hidden space-y-8">
          {processSteps.map((step) => (
            <ProcessCard key={step.number} step={step} variant="mobile" />
          ))}
        </div>

        {/* Desktop View: Grid Layout */}
        <div className="hidden md:block">
          {/* Row 1 (Steps 1-4) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {firstRowSteps.map((step) => (
              <ProcessCard key={step.number} step={step} variant="desktop" />
            ))}
          </div>

          {/* Row 2 (Steps 5-7, centered on desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {secondRowSteps.map((step) => (
              <ProcessCard key={step.number} step={step} variant="desktop" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
