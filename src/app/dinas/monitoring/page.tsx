"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MonitoringKPICards } from "./components/section/MonitoringKPICards";
import { MonitoringFilters } from "./components/section/MonitoringFilters";
import { WilayahProgressCard } from "./components/section/WilayahProgressCard";
import { SchoolProgramTable } from "./components/section/SchoolProgramTable";
import { RefreshCw } from "lucide-react";

export default function MonitoringProgramPage() {
  const [schoolData, setSchoolData] = useState<any>(null);
  const [impactData, setImpactData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [resSchools, resImpact] = await Promise.all([
        fetch("/api/dinas/schools"),
        fetch("/api/dinas/impact-map"),
      ]);
      const jsonSchools = await resSchools.json();
      const jsonImpact = await resImpact.json();
      if (jsonSchools.success) setSchoolData(jsonSchools.data);
      if (jsonImpact.success) setImpactData(jsonImpact.data);
    } catch (err) {
      console.error("Failed to fetch monitoring data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Monitoring Program dan Kebijakan
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Ringkasan implementasi kurikulum merdeka dan bantuan operasional daerah.
            {schoolData && (
              <span className="ml-2 text-[#00473e] font-bold">
                ({schoolData.kpis.totalSchools} sekolah, {schoolData.kpis.totalStudents} siswa terdaftar)
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
          <MonitoringFilters />
        </div>
      </div>

      {/* KPI Cards — still uses local data as structure, overlaid with API totals */}
      <MonitoringKPICards kpis={schoolData?.kpis} />

      {/* Wilayah Progress + AI Card */}
      <WilayahProgressCard regions={impactData?.regions} />

      {/* School Program Table */}
      <SchoolProgramTable schools={schoolData?.schools} />
    </div>
  );
}
