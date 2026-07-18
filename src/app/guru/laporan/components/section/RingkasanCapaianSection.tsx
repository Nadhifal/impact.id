"use client";

import React from "react";
import { CheckSquare, TrendingUp, Award } from "lucide-react";

interface CapaianData {
  challengesCompleted: number;
  hcsTerkini: number;
  sertifikatTerbit: number;
}

export function RingkasanCapaianSection({
  siswaName,
  capaian,
}: {
  siswaName: string;
  capaian?: CapaianData;
}) {
  const displayCapaian = capaian ?? {
    challengesCompleted: 0,
    hcsTerkini: 0,
    sertifikatTerbit: 0,
  };

  const cards = [
    {
      icon: <CheckSquare className="w-6 h-6 text-slate-500" />,
      label: "Challenge selesai",
      value: displayCapaian.challengesCompleted,
      badge: "Aktif",
      badgeColor: "green",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-slate-500" />,
      label: "HCS terkini",
      value: displayCapaian.hcsTerkini,
      badge: "Target: 80.0",
      badgeColor: "gray",
    },
    {
      icon: <Award className="w-6 h-6 text-slate-500" />,
      label: "Sertifikat terbit",
      value: displayCapaian.sertifikatTerbit,
      badge: "Blockchain Verified",
      badgeColor: "green",
    },
  ];

  return (
    <div>
      <h3 className="text-base font-bold text-slate-800 mb-4">
        Ringkasan capaian {siswaName}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                {kpi.icon}
              </div>
              {kpi.badge && (
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    kpi.badgeColor === "green"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {kpi.badge}
                </span>
              )}
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-1">{kpi.label}</p>
            <p className="text-4xl font-extrabold text-slate-800">{kpi.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
