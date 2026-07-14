import React from "react";

interface ProcessCardProps {
  step: {
    number: string | number;
    title: string;
    description: string;
  };
  variant?: "mobile" | "desktop";
}

export function ProcessCard({ step, variant = "desktop" }: ProcessCardProps) {
  if (variant === "mobile") {
    return (
      <div className="flex gap-4 items-start">
        {/* Number Circle */}
        <div className="w-10 h-10 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
          {step.number}
        </div>
        {/* Title & Description */}
        <div className="space-y-1">
          <h3 className="font-extrabold text-slate-900 text-base">
            {step.title}
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
        {step.number}
      </div>
      <h3 className="font-bold text-slate-900 text-base mb-2">
        {step.title}
      </h3>
      <p className="text-slate-600 text-xs leading-relaxed max-w-xs">
        {step.description}
      </p>
    </div>
  );
}
