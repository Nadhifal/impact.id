import React from "react";

interface ProgressBarProps {
  label: string;
  value: number; // 1 to 5
  maxValue?: number; // default 5
  onChange?: (newValue: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  label,
  value,
  maxValue = 5,
  onChange,
}) => {
  const percentage = (value / maxValue) * 100;

  // Render clickable segments if onChange is provided, otherwise static bar
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-sm font-semibold text-slate-700">
        <span>{label}</span>
        <span className="text-base text-slate-900">{value}</span>
      </div>
      <div 
        className={`h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative ${onChange ? "cursor-pointer group" : ""}`}
        onClick={(e) => {
          if (!onChange) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          const segmentWidth = width / maxValue;
          const clickedValue = Math.min(maxValue, Math.max(1, Math.ceil(clickX / segmentWidth)));
          onChange(clickedValue);
        }}
      >
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
        {onChange && (
          <div className="absolute inset-0 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            {Array.from({ length: maxValue }).map((_, i) => (
              <div
                key={i}
                className="h-full w-full border-r border-white/40 hover:bg-black/10 last:border-0 transition-colors"
                title={`Set to ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
