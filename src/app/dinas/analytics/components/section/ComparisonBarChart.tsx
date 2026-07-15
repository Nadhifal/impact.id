"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/Card";
import { topSchoolsGrowth } from "../../data";

export function ComparisonBarChart() {
  return (
    <Card className="flex flex-col h-[480px] border-slate-200">
      {/* Title Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Perbandingan Skor Rata-rata</h3>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          Top 5 sekolah dengan pertumbuhan tertinggi
        </p>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={topSchoolsGrowth}
            margin={{ top: 0, right: 20, left: 30, bottom: 20 }}
          >
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              stroke="#94a3b8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#475569"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md border border-slate-700">
                      Rata-rata: {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar 
              dataKey="score" 
              fill="#00473e" 
              radius={[0, 8, 8, 0]} 
              maxBarSize={28} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
