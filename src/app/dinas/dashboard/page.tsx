"use client";

import React from "react";
import { KPICards } from "./components/section/KPICards";
import { TrendChart } from "./components/section/TrendChart";
import { ImpactOverviewCard } from "./components/section/ImpactOverviewCard";
import { MonitoringTable } from "./components/section/MonitoringTable";
import { Plus } from "lucide-react";

export default function AggregateDashboardPage() {
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
      <KPICards />

      {/* Charts Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrendChart />
        </div>
        <div className="lg:col-span-1">
          <ImpactOverviewCard />
        </div>
      </div>

      {/* Table Section */}
      <MonitoringTable />

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
