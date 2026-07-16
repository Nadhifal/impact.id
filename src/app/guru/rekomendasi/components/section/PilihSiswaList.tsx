"use client";

import React from "react";
import { siswaFeedbackList } from "../../data";

interface PilihSiswaListProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function PilihSiswaList({ selectedId, onSelect }: PilihSiswaListProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
        Pilih Siswa
      </p>
      {siswaFeedbackList.map((siswa) => {
        const isActive = siswa.id === selectedId;
        return (
          <button
            key={siswa.id}
            onClick={() => onSelect(siswa.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer text-left ${
              isActive
                ? "bg-white border-[#00473e]/30 shadow-sm"
                : "bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50"
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${siswa.initialsBg}`}>
              {siswa.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{siswa.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">HCS {siswa.hcs}</span>
                <span className="text-xs text-slate-400 font-medium truncate">· {siswa.label}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
