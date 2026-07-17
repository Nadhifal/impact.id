"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ActivityFeed } from "./components/section/ActivityFeed";
import { AdminLogItem } from "./data";
import { RefreshCw } from "lucide-react";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AdminLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/logs");
      const json = await res.json();
      if (json.success) {
        // Map API response to match the AdminLogItem interface
        setLogs(
          json.data.map((log: any) => ({
            ...log,
            actionType: mapModuleToAction(log.module),
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Log aktivitas</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Riwayat seluruh tindakan administrator di platform IMPACT.ID.
          </p>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-40"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Activity Feed */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-semibold">Memuat log aktivitas...</span>
        </div>
      ) : logs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 font-semibold text-sm">
          Belum ada log aktivitas admin.
        </div>
      ) : (
        <ActivityFeed logs={logs} />
      )}
    </div>
  );
}

function mapModuleToAction(module: string): string {
  switch (module) {
    case "SERTIFIKAT": return "sertifikat";
    case "CHALLENGE": return "challenge";
    case "USER": return "user-approve";
    case "PENGATURAN": return "pengaturan";
    default: return "challenge";
  }
}
