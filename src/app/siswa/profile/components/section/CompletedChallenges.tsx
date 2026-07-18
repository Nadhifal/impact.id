import React from "react";
import Image from "next/image";
import { SlidersHorizontal, ChevronRight } from "lucide-react";
import { completedChallenges } from "../../data";
import { Card } from "@/app/guru/verifikasi/components/ui/Card";
import { Button } from "@/app/shared/components/ui/button";

export const CompletedChallenges: React.FC = () => {
  return (
    <Card className="p-6 border border-slate-100 shadow-xs">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-sm font-bold text-slate-800">
          Challenges diselesaikan
        </h3>
        <button className="p-2 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* List */}
      <div className="space-y-3.5">
        {completedChallenges.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3.5 border border-slate-100 hover:border-slate-200 bg-white rounded-xl transition-all cursor-pointer group"
          >
            {/* Left side details */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs md:text-sm font-bold text-slate-800 truncate group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {item.date}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.badgeType === "xp"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                      }`}
                  >
                    {item.badgeText}
                  </span>
                </div>
              </div>
            </div>

            {/* Right side details */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Overlapping member avatars */}
              {item.avatars && (
                <div className="hidden sm:flex items-center -space-x-2 mr-1">
                  {item.avatars.map((av, avIdx) => (
                    <div
                      key={avIdx}
                      className="relative w-5 h-5 rounded-full overflow-hidden border border-white shrink-0"
                    >
                      <Image
                        src={av}
                        alt="Partner Avatar"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                  {item.remainingAvatarsCount && (
                    <div className="w-5 h-5 rounded-full bg-slate-100 border border-white flex items-center justify-center font-bold text-[8px] text-slate-500 shrink-0">
                      +{item.remainingAvatarsCount}
                    </div>
                  )}
                </div>
              )}
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-650 transition-colors" />
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center pt-5">
        <Button
          variant="outline"
          className="w-full text-xs font-bold py-2.5 border-slate-200 hover:border-slate-350 text-slate-600 bg-white rounded-xl"
        >
          Load More Activities
        </Button>
      </div>
    </Card>
  );
};
