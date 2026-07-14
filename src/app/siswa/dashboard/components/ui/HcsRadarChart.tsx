"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

interface HcsRadarChartProps {
  data: { subject: string; A: number }[];
}

export function HcsRadarChart({ data }: HcsRadarChartProps) {
  return (
    <div className="relative shrink-0 flex items-center justify-center bg-zinc-50/50 rounded-full p-4 border border-zinc-100/50 w-[240px] h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e4e4e7" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#71717a", fontSize: 9, fontWeight: "bold" }}
          />
          <PolarRadiusAxis angle={45} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="HCS"
            dataKey="A"
            stroke="#00473e"
            fill="#00473e"
            fillOpacity={0.15}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* Overlay Center HCS Badge */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-white border-2 border-[#00473e]/20 flex items-center justify-center shadow-md">
          <span className="text-[10px] font-black text-slate-800 tracking-wider">HCS</span>
        </div>
      </div>
    </div>
  );
}
