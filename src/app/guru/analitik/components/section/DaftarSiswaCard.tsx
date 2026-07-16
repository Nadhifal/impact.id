"use client";

import React from "react";
import { AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { Card } from "../ui/Card";
import { siswaBimbinganList, siswaTambahan } from "../../data";
import type { SiswaBimbingan } from "../../data";

interface DaftarSiswaCardProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function DaftarSiswaCard({ selectedId, onSelect }: DaftarSiswaCardProps) {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-slate-800">Daftar siswa bimbingan</h3>
        <button className="text-xs font-bold text-[#00473e] hover:underline cursor-pointer flex items-center gap-0.5">
          Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        {siswaBimbinganList.map((siswa) => {
          const isActive = siswa.id === selectedId;
          return (
            <button
              key={siswa.id}
              onClick={() => onSelect(siswa.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer text-left ${
                isActive
                  ? "bg-[#e6f4f1] border border-[#00473e]/20"
                  : "hover:bg-slate-50 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${siswa.initialsBg}`}>
                  {siswa.initials}
                </div>
                <div>
                  <p className={`text-sm font-bold ${isActive ? "text-[#00473e]" : "text-slate-800"}`}>
                    {siswa.name}
                  </p>
                  <p className={`text-xs font-semibold ${siswa.trend === "turun" ? "text-rose-500" : "text-slate-400"}`}>
                    HCS {siswa.hcs}
                    {siswa.trendLabel ? ` · ${siswa.trendLabel}` : ""}
                  </p>
                </div>
              </div>
              {isActive ? (
                <CheckCircle2 className="w-5 h-5 text-[#00473e] shrink-0" />
              ) : siswa.trend === "turun" ? (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-slate-400 font-medium px-1">
        +{siswaTambahan} siswa lainnya
      </p>
    </Card>
  );
}
