import React from "react";
import { Fingerprint } from "lucide-react";

interface VerificationStatusCardProps {
  verification: {
    id: string;
    status: string;
  };
}

export function VerificationStatusCard({ verification }: VerificationStatusCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 bg-surface-light rounded-2xl border border-primary/10">
      <div className="p-3 bg-white text-primary rounded-xl shadow-sm">
        <Fingerprint className="w-6 h-6" />
      </div>
      <div className="space-y-0.5">
        <h4 className="font-extrabold text-xs text-primary tracking-wide">
          {verification.id}
        </h4>
        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
          {verification.status}
        </p>
      </div>
    </div>
  );
}
