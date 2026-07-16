"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import { Card } from "../ui/Card";

export function APIAccessSection() {
  return (
    <Card className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <p className="text-sm font-semibold text-slate-600 leading-relaxed max-w-xl">
        Ekspor mentah tersedia untuk integrasi dengan sistem dinas lain melalui
        endpoint API resmi kami.
      </p>
      <button className="shrink-0 flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
        Lihat akses API
        <ExternalLink className="w-4 h-4" />
      </button>
    </Card>
  );
}
