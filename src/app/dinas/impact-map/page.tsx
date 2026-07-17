"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MapKPICards } from "./components/section/MapKPICards";
import { InteractiveMap } from "./components/section/InteractiveMap";
import { RecentHighlights } from "./components/section/RecentHighlights";
import { Plus, RefreshCw } from "lucide-react";

export default function NationalImpactMapPage() {
  const [mapData, setMapData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dinas/impact-map");
      const json = await res.json();
      if (json.success) {
        setMapData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch impact-map data:", err);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">National Impact Overview</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Real-time distribution of educational and social development projects across Indonesia.
            {mapData && (
              <span className="ml-2 text-[#00473e] font-bold">
                ({mapData.kpis.totalProjects} proyek aktif, {mapData.kpis.totalStudents} siswa)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-40"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* KPI stats */}
      <MapKPICards kpis={mapData?.kpis} />

      {/* Interactive Map & Rankings */}
      <InteractiveMap regions={mapData?.regions} />

      {/* Recent Highlights */}
      <RecentHighlights highlights={mapData?.highlights} />

      {/* Floating Action Button */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00473e] hover:bg-[#003830] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer z-40 group"
        aria-label="Add project"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
}
