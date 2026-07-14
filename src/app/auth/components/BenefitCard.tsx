import React from "react";
import { LucideIcon } from "lucide-react";

export interface BenefitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function BenefitCard({ title, description, icon: Icon }: BenefitCardProps) {
  return (
    <div className="bg-surface-card border border-[#e2effd]/30 rounded-2xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary shrink-0 shadow-sm">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
        <p className="text-[10px] text-zinc-500 font-medium">{description}</p>
      </div>
    </div>
  );
}
