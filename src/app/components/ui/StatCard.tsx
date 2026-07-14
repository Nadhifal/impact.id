import React from "react";
import { Card } from "@/app/shared/components/ui/card";

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <Card className="flex flex-col items-center justify-center p-6 sm:p-8 text-center bg-white border border-slate-100 shadow-md rounded-2xl">
      <span className="text-3xl sm:text-4xl font-extrabold text-primary">
        {value}
      </span>
      <span className="text-xs sm:text-sm font-medium text-slate-500 mt-2">
        {label}
      </span>
    </Card>
  );
}
