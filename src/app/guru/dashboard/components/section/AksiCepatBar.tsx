"use client";

import React from "react";
import { MessageSquare, FileText, Send } from "lucide-react";

const aksiCepat = [
  { icon: MessageSquare, label: "Tulis feedback", href: "/guru/rekomendasi" },
  { icon: FileText, label: "Buat laporan capaian", href: "/guru/laporan" },
  { icon: Send, label: "Kirim pengumuman", href: "#" },
];

export function AksiCepatBar() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
      <span className="text-sm font-bold text-slate-500 shrink-0">Aksi Cepat:</span>
      <div className="flex flex-wrap gap-3">
        {aksiCepat.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer bg-white shadow-xs"
            >
              <Icon className="w-4 h-4 text-slate-500" />
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
