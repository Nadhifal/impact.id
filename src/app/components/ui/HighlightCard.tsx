import React from "react";
import { Card } from "@/app/shared/components/ui/card";
import { Sparkles } from "lucide-react";

interface HighlightCardProps {
  value: string;
  label: string;
}

export function HighlightCard({ value, label }: HighlightCardProps) {
  return (
    <Card className="bg-[#EEEDFE] text-[#584FBC] lg:bg-[#584FBC] lg:text-white p-6 sm:p-8 border-none hover:shadow-xl hover:shadow-[#584FBC]/10 transition-all duration-300 rounded-3xl">
      <div className="flex items-center lg:items-start justify-between">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#584FBC] lg:text-[#EEEDFE]">
            {value}
          </h3>
          <p className="text-xs sm:text-sm text-[#584FBC]/80 lg:text-slate-200 font-medium">
            {label}
          </p>
        </div>
        <div className="p-3 bg-[#584FBC]/10 lg:bg-white/10 text-[#584FBC] lg:text-[#EEEDFE] rounded-2xl shrink-0">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
      </div>
    </Card>
  );
}
