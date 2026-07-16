"use client";

import React from "react";
import { MonitoringKPICards } from "./components/section/MonitoringKPICards";
import { MonitoringFilters } from "./components/section/MonitoringFilters";
import { WilayahProgressCard } from "./components/section/WilayahProgressCard";
import { SchoolProgramTable } from "./components/section/SchoolProgramTable";

export default function MonitoringProgramPage() {
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
          </p>
        </div>
        <MonitoringFilters />
      </div>

      {/* KPI Cards */}
      <MonitoringKPICards />

      {/* Wilayah Progress + AI Card */}
      <WilayahProgressCard />

      {/* School Program Table */}
      <SchoolProgramTable />
    </div>
  );
}
