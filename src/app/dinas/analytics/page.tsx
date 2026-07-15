"use client";

import React from "react";
import { Download } from "lucide-react";
import { AnalyticsFilters } from "./components/section/AnalyticsFilters";
import { DimensionsRadarChart } from "./components/section/DimensionsRadarChart";
import { ComparisonBarChart } from "./components/section/ComparisonBarChart";
import { CategoryDistributionChart } from "./components/section/CategoryDistributionChart";
import { RegionInsights } from "./components/section/RegionInsights";

export default function SchoolDistrictAnalyticsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header with Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Analitik Sekolah &amp; Daerah</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Perbandingan performa pendidikan dan dampak sosial tingkat regional.
          </p>
        </div>
        <div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            <span>Ekspor Data</span>
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <AnalyticsFilters />

      {/* Top Charts: Radar & Horizontal Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DimensionsRadarChart />
        <ComparisonBarChart />
      </div>

      {/* Bottom Charts: Category Distribution & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryDistributionChart />
        </div>
        <div className="lg:col-span-1">
          <RegionInsights />
        </div>
      </div>
    </div>
  );
}
