"use client";

import React, { useEffect, useState } from "react";
import { KPICards } from "./components/section/KPICards";
import { ImpactOverviewCard } from "./components/section/ImpactOverviewCard";
import dynamic from "next/dynamic";

const TrendChart = dynamic(() => import("./components/section/TrendChart").then(mod => mod.TrendChart), { ssr: false });
import { MonitoringTable } from "./components/section/MonitoringTable";
import { Plus } from "lucide-react";
import type { KPICardData, TrendItem, SchoolMonitorItem } from "./data";

interface DinasStatsData {
  kpi: KPICardData[];
  monthlyTrend: TrendItem[];
  schoolMonitoring: SchoolMonitorItem[];
}

export default function AggregateDashboardPage() {
  const [data, setData] = useState<DinasStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dinas/stats")
      .then(r => r.json())
      .then(json => {
        if (json.success) {
          setData(json.data);
        }
      })
      .catch(err => console.error("Failed to fetch dinas stats:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 max-w-7xl mx-auto flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#00473e] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-zinc-500">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Dashboard Agregat</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Ringkasan performa pendidikan regional Anda hari ini.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <KPICards kpiData={data?.kpi} />

      {/* Charts Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart trendData={data?.monthlyTrend} />
        </div>
        <div className="lg:col-span-1">
          <ImpactOverviewCard />
        </div>
      </div>

      {/* Table Section */}
      <MonitoringTable monitoringData={data?.schoolMonitoring} />

      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00473e] hover:bg-[#003830] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer z-40 group"
        aria-label="Tambah Data"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
}
