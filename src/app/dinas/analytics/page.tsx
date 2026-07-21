"use client";

import React, { useState, useEffect } from "react";
import { Download, RefreshCw } from "lucide-react";
import { AnalyticsFilters } from "./components/section/AnalyticsFilters";
import { RegionInsights } from "./components/section/RegionInsights";
import dynamic from "next/dynamic";

const DimensionsRadarChart = dynamic(() => import("./components/section/DimensionsRadarChart").then(mod => mod.DimensionsRadarChart), { ssr: false });
const ComparisonBarChart = dynamic(() => import("./components/section/ComparisonBarChart").then(mod => mod.ComparisonBarChart), { ssr: false });
const CategoryDistributionChart = dynamic(() => import("./components/section/CategoryDistributionChart").then(mod => mod.CategoryDistributionChart), { ssr: false });

interface AnalyticsData {
  dimensionsRadarData: { subject: string; "RATA-RATA": number; "BENCHMARK (85)": number }[];
  topSchoolsGrowth: { name: string; score: number }[];
  categoryDistributionData: { category: string; projectsCount: number }[];
  regionalInsights: { type: "KEUNGGULAN" | "REKOMENDASI"; title: string; description: string }[];
  totalStudents: number;
  studentsWithHCS: number;
}

export default function SchoolDistrictAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dinas/analytics");
      const json = await res.json();
      if (json.success) setData(json.data);
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header with Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Analitik Sekolah &amp; Daerah</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Perbandingan performa pendidikan dan dampak sosial tingkat regional.
            {data && (
              <span className="ml-2 text-[#00473e] font-bold">
                ({data.studentsWithHCS} siswa memiliki data HCS dari {data.totalStudents} total)
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-40"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            <span>Ekspor Data</span>
          </button>
        </div>
      </div>

      {/* Filter Options */}
      <AnalyticsFilters />

      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-semibold">Memuat data analitik...</span>
        </div>
      ) : (
        <>
          {/* Top Charts: Radar & Horizontal Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DimensionsRadarChart data={data?.dimensionsRadarData} />
            <ComparisonBarChart data={data?.topSchoolsGrowth} />
          </div>

          {/* Bottom Charts: Category Distribution & Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CategoryDistributionChart data={data?.categoryDistributionData} />
            </div>
            <div className="lg:col-span-1">
              <RegionInsights insights={data?.regionalInsights} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
