import React from "react";
import { Card } from "@/app/guru/verifikasi/components/ui/Card";

export const GoalProgressCard: React.FC = () => {
  const percentage = 75;
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Card className="bg-[#eef7f6] p-6 flex flex-col items-center justify-center text-center h-full border border-slate-100 shadow-xs">
      <div className="relative flex items-center justify-center">
        {/* SVG Circle chart */}
        <svg className="w-20 h-20 transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-slate-200/60"
            strokeWidth="6"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="40"
            cy="40"
            r={radius}
            className="stroke-primary"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-base font-extrabold text-slate-800">
          {percentage}%
        </span>
      </div>

      <h4 className="text-xs font-bold text-slate-800 mt-4 leading-tight">
        Goal Progress
      </h4>
      <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-none">
        SDG 13: Climate Action
      </p>
    </Card>
  );
};
