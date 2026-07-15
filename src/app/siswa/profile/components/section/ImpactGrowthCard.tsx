import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/app/shared/components/ui/button";

export const ImpactGrowthCard: React.FC = () => {
  // Mock data for the simple mini bar chart
  const barHeights = ["h-6", "h-10", "h-14", "h-16", "h-11", "h-18", "h-12"];

  return (
    <div className="bg-primary hover:bg-[#00362f] text-white rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm transition-all duration-300 relative overflow-hidden group">
      {/* Text Details & Graph */}
      <div className="space-y-4 flex-1">
        <div>
          <h3 className="text-base md:text-lg font-bold tracking-tight">
            Impact Growth
          </h3>
          <p className="text-xs text-[#8ce1d5] font-semibold leading-relaxed mt-1 max-w-[280px]">
            You've completed 4 challenges this month. That's 20% more than last month!
          </p>
        </div>

        {/* Small Column Chart visual */}
        <div className="flex items-end gap-1.5 h-16 pt-2">
          {barHeights.map((height, idx) => (
            <div
              key={idx}
              className={`w-2 md:w-3 bg-white/20 rounded-t group-hover:bg-[#8ce1d5]/40 transition-colors ${
                idx === 3 || idx === 5 ? "bg-[#8ce1d5]/80 group-hover:bg-[#8ce1d5]" : "bg-white/30"
              } ${height}`}
            />
          ))}
        </div>
      </div>

      {/* Button link */}
      <Button
        variant="outline"
        className="bg-white hover:bg-slate-50 text-primary border-none shadow-sm gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all shrink-0 active:scale-[0.98]"
      >
        <span>View Report</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
};
