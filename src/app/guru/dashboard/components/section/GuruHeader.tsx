"use client";

import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";

interface GuruHeaderProps {
  searchPlaceholder?: string;
}

export function GuruHeader({ searchPlaceholder = "Search students, submissions..." }: GuruHeaderProps) {
  return (
    <header className="flex items-center justify-between py-4 px-8 bg-white/70 backdrop-blur-sm border-b border-slate-100 sticky top-0 z-20">
      {/* Search */}
      <div className="relative w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#00473e]/20"
        />
      </div>

      {/* Actions + Profile */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer relative">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <HelpCircle className="w-5 h-5 text-slate-500" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800 leading-tight">Bu Rani</p>
            <p className="text-[10px] text-slate-400 font-medium">Senior Mentor</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#00473e] flex items-center justify-center font-bold text-white text-xs shrink-0">
            BR
          </div>
        </div>
      </div>
    </header>
  );
}
