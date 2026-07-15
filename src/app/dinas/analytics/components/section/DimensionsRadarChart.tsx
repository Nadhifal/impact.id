"use client";

import React from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import { Card } from "../ui/Card";
import { dimensionsRadarData } from "../../data";

export function DimensionsRadarChart() {
  return (
    <Card className="flex flex-col h-[480px] border-slate-200">
      {/* Title Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">Distribusi Skor 5 Dimensi</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Rata-rata kompetensi siswa di wilayah terpilih
        </p>
      </div>

      {/* Radar Chart */}
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="45%" outerRadius="70%" data={dimensionsRadarData}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={{ fill: "#94a3b8", fontSize: 9 }} 
            />
            <Radar
              name="KOTA BANDUNG"
              dataKey="KOTA BANDUNG"
              stroke="#00473e"
              fill="#00473e"
              fillOpacity={0.2}
            />
            <Radar
              name="RATA-RATA PROV"
              dataKey="RATA-RATA PROV"
              stroke="#82ece0"
              fill="#82ece0"
              fillOpacity={0.3}
            />
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconSize={8}
              iconType="circle"
              wrapperStyle={{ fontSize: 10, fontWeight: 700, fill: "#475569" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
