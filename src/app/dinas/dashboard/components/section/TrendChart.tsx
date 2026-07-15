"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card } from "../ui/Card";
import { monthlyTrendData, quarterlyTrendData } from "../../data";

export function TrendChart() {
  const [activeTab, setActiveTab] = useState<"monthly" | "quarterly">("monthly");
  const data = activeTab === "monthly" ? monthlyTrendData : quarterlyTrendData;

  return (
    <Card className="flex flex-col h-[400px]">
      {/* Chart Header Controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            {activeTab === "monthly" ? "Tren Skor SDM per Bulan" : "Tren Skor SDM per Kuartal"}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {activeTab === "monthly" ? "Perbandingan 6 bulan terakhir" : "Perbandingan 4 kuartal terakhir"}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1">
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "monthly"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Bulanan
          </button>
          <button
            onClick={() => setActiveTab("quarterly")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeTab === "quarterly"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Kuartal
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
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
              domain={[0, 100]}
              dx={-5}
            />
            <Tooltip 
              cursor={{ fill: "transparent" }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md border border-slate-700">
                      Skor: {payload[0].value}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]} maxBarSize={45}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index === data.length - 1 ? "#00473e" : "#e2e8f0"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
