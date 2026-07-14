import { Check } from "lucide-react";

export interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  className?: string;
  variant?: "bars" | "circles";
  labels?: string[];
}

export function ProgressIndicator({
  steps,
  currentStep,
  className = "",
  variant = "bars",
  labels = [],
}: ProgressIndicatorProps) {
  if (variant === "circles") {
    return (
      <div className={`w-full relative ${className}`}>
        {/* Connector Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-zinc-200 -z-10" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-primary -z-10 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps - 1)) * 100}%` }}
        />

        <div className="flex justify-between items-start">
          {Array.from({ length: steps }).map((_, index) => {
            const stepNum = index + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;

            return (
              <div key={index} className="flex flex-col items-center flex-1 relative">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 bg-white ${
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isActive
                      ? "border-primary text-primary"
                      : "border-zinc-200 text-zinc-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNum}
                </div>
                {/* Label */}
                {labels[index] && (
                  <span
                    className={`mt-2 text-xs font-bold transition-all duration-300 ${
                      isActive || isCompleted ? "text-zinc-800" : "text-zinc-400"
                    }`}
                  >
                    {labels[index]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`grid gap-3 ${className}`} style={{ gridTemplateColumns: `repeat(${steps}, minmax(0, 1fr))` }}>
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full ${index < currentStep ? "bg-primary" : "bg-zinc-200"}`}
        />
      ))}
    </div>
  );
}

