"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";
import { mapHighlights } from "../../data";

export function RecentHighlights() {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-800">Recent Impact Highlights</h3>
        <button className="flex items-center gap-1.5 text-sm font-bold text-[#00473e] hover:text-[#003830] hover:underline cursor-pointer group">
          <span>View Archive</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Grid of highlight cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mapHighlights.map((hl) => (
          <Card key={hl.id} className="p-0 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full border-slate-200">
            {/* Image banner */}
            <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
              <img
                src={hl.imageUrl}
                alt={hl.title}
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Content area */}
            <div className="p-5 flex-grow flex flex-col items-start justify-between">
              <div className="space-y-3">
                <span className="inline-flex px-2 py-0.5 bg-slate-100 text-slate-500 rounded-sm text-[10px] font-extrabold tracking-wider">
                  {hl.region}
                </span>
                <h4 className="text-base font-bold text-slate-800 leading-tight">
                  {hl.title}
                </h4>
                <p className="text-xs font-semibold text-slate-400 leading-relaxed">
                  {hl.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
