"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card } from "../ui/Card";

export interface RoleGrowth {
  name: string;
  count: number;
}

export interface MonthlyGrowth {
  month: string;
  count: number;
}

// Unified chart entry used by recharts
type ChartEntry = { label: string; count: number };

interface GrowthChartProps {
  byRole: RoleGrowth[];
  byMonth: MonthlyGrowth[];
}

const ROLE_COLORS = ["#00473e", "#584FBC", "#82ece0", "#f59e0b", "#e11d48"];

export function GrowthChart({ byRole, byMonth }: GrowthChartProps) {
  const [filter, setFilter] = useState<"role" | "monthly">("role");

  // Normalise to a single shape so recharts is always happy
  const roleData: ChartEntry[] = byRole.map((r) => ({ label: r.name, count: r.count }));
  const monthData: ChartEntry[] = byMonth.map((m) => ({ label: m.month, count: m.count }));

  const chartData: ChartEntry[] = filter === "role" ? roleData : monthData;

  return (
    <Card className="flex flex-col h-[400px] border-slate-200">
      {/* Title Header with Select Filter */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">
            {filter === "role" ? "Distribusi user per role" : "Pertumbuhan user bulanan"}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Data real dari database
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "role" | "monthly")}
          className="text-xs font-semibold px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#00473e] cursor-pointer"
        >
          <option value="role">Per Role</option>
          <option value="monthly">Bulanan</option>
        </select>
      </div>

      {/* Chart Area */}
      <div className="flex-1 w-full h-full min-h-0">
        {filter === "role" ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="label"
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
                        {payload[0].payload.label}: {Number(payload[0].value).toLocaleString("id-ID")} user
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={55}>
                {chartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={ROLE_COLORS[index % ROLE_COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="label"
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-md border border-slate-700">
                        {payload[0].payload.label}: {Number(payload[0].value).toLocaleString("id-ID")} user baru
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                formatter={() => "User Baru"}
                wrapperStyle={{ fontSize: "11px", fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#00473e"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#00473e" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
}
