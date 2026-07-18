"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card } from "../ui/Card";

interface CategoryItem {
  category: string;
  projectsCount: number;
}

interface CategoryDistributionChartProps {
  data?: CategoryItem[];
}

export function CategoryDistributionChart({ data }: CategoryDistributionChartProps) {
  const chartData = data ?? [];
  const total = chartData.reduce((sum, d) => sum + d.projectsCount, 0);
  const maxCount = Math.max(...chartData.map((d) => d.projectsCount), 1);
  // Highlight the category with most projects
  const maxCategory = chartData.reduce(
    (max, d) => (d.projectsCount > max.projectsCount ? d : max),
    chartData[0] ?? { category: "", projectsCount: 0 }
  );

  return (
    <Card className="flex flex-col h-[400px] border-slate-200">
      {/* Title Header with Total projects badge */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Sebaran Tantangan per Kategori</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Fokus proyek dampak sosial berdasarkan kategori masalah
          </p>
        </div>

        <span className="text-[10px] font-extrabold text-[#00473e] bg-[#00473e]/5 border border-[#00473e]/10 px-2.5 py-1 rounded-sm select-none">
          TOTAL: {total.toLocaleString("id-ID")} PROYEK
        </span>
      </div>

      {/* Bar Chart Area */}
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <XAxis
              dataKey="category"
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              domain={[0, Math.ceil(maxCount * 1.2)]}
              dx={-5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md border border-slate-700">
                      Proyek: {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="projectsCount" radius={[8, 8, 0, 0]} maxBarSize={45}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.category === maxCategory?.category ? "#82ece0" : "#123631"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
