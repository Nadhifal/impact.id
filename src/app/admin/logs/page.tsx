import React from "react";
import { ActivityFeed } from "./components/section/ActivityFeed";
import { dummyLogs } from "./data";

export default function AdminLogsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Log aktivitas</h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Riwayat seluruh tindakan administrator di platform IMPACT.ID.
        </p>
      </div>

      {/* Activity Feed */}
      <ActivityFeed logs={dummyLogs} />
    </div>
  );
}
