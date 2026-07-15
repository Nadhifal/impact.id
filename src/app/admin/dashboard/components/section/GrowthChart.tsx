"use client";

import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card } from "../ui/Card";
import { userGrowthData } from "../../data";

export function GrowthChart() {
  const [filter, setFilter] = useState("monthly");

  return (
    <Card className="flex flex-col h-[400px] border-slate-200">
      {/* Title Header with Select Filter */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Pertumbuhan user per role</h3>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs font-semibold px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#00473e] cursor-pointer"
        >
          <option value="monthly">Bulanan</option>
          <option value="weekly">Mingguan</option>
        </select>
      </div>

      {/* Bar Chart Area */}
      <div className="flex-1 w-full h-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={userGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              dx={-5}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md border border-slate-700">
                      Total: {payload[0].value?.toLocaleString("id-ID")}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={45}>
              {userGrowthData.map((entry, index) => {
                // Different brand shades for each bar
                const colors = ["#00473e", "#584FBC", "#82ece0", "#f59e0b"];
                return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
