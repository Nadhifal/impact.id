"use client";

import React from "react";
import { Download, Send, Lightbulb, Calendar, ArrowRight } from "lucide-react";
import { Card } from "../ui/Card";
import {
  radarDataNadhif as radarDataAriq,
  trendDataNadhif as trendDataAriq,
  targetKuartal,
  statusOnTrack,
  aiRekomendasiAnalitik,
  jadwalSesi,
  siswaBimbinganList,
} from "../../data";

interface ProgresDetailPanelProps {
  selectedId: string;
}

// Simple pentagon radar chart using SVG
function RadarChart({ data }: { data: { subject: string; value: number }[] }) {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;
  const n = data.length;
  const maxVal = 100;

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const scaled = (value / maxVal) * r;
    return {
      x: cx + scaled * Math.cos(angle),
      y: cy + scaled * Math.sin(angle),
    };
  };

  const getAxisPoint = (index: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  const getLabelPoint = (index: number) => {
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2;
    const dist = r + 20;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };

  const dataPoints = data.map((d, i) => getPoint(i, d.value));
  const axisPoints = data.map((_, i) => getAxisPoint(i));
  const polyline = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <svg width={size + 60} height={size + 40} viewBox={`-30 -20 ${size + 60} ${size + 40}`}>
      {/* Grid rings */}
      {gridLevels.map((level) => {
        const pts = Array.from({ length: n }, (_, i) => {
          const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
          return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
        }).join(" ");
        return (
          <polygon key={level} points={pts} fill="none" stroke="#e2e8f0" strokeWidth="1" />
        );
      })}

      {/* Axis lines */}
      {axisPoints.map((pt, i) => (
        <line key={i} x1={cx} y1={cy} x2={pt.x} y2={pt.y} stroke="#e2e8f0" strokeWidth="1" />
      ))}

      {/* Data polygon */}
      <polygon points={polyline} fill="#00473e" fillOpacity="0.15" stroke="#00473e" strokeWidth="2" />

      {/* Data dots */}
      {dataPoints.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#00473e" />
      ))}

      {/* Labels */}
      {data.map((d, i) => {
        const lp = getLabelPoint(i);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="600"
            fill="#64748b"
          >
            {d.subject}
          </text>
        );
      })}
    </svg>
  );
}

// Simple line sparkline
function TrendSparkline({ data }: { data: { bulan: string; hcs: number }[] }) {
  const w = 220;
  const h = 80;
  const minVal = Math.min(...data.map((d) => d.hcs)) - 5;
  const maxVal = Math.max(...data.map((d) => d.hcs)) + 5;
  const range = maxVal - minVal;

  const getX = (i: number) => (i / (data.length - 1)) * w;
  const getY = (val: number) => h - ((val - minVal) / range) * h;

  const pathD = data
    .map((d, i) => `${i === 0 ? "M" : "L"}${getX(i)},${getY(d.hcs)}`)
    .join(" ");

  const fillD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <div>
      <svg width={w} height={h} className="overflow-visible">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00473e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#00473e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={fillD} fill="url(#trendGrad)" />
        <path d={pathD} fill="none" stroke="#00473e" strokeWidth="2.5" strokeLinecap="round" />
        {data.map((d, i) => (
          <circle key={i} cx={getX(i)} cy={getY(d.hcs)} r="3.5" fill="#00473e" />
        ))}
      </svg>
      <div className="flex justify-between mt-1">
        {data.map((d) => (
          <span key={d.bulan} className="text-[9px] font-semibold text-slate-400">
            {d.bulan}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ProgresDetailPanelProps {
  selectedId: string;
  studentDetail?: any;
}

export function ProgresDetailPanel({ selectedId, studentDetail }: ProgresDetailPanelProps) {
  const defaultSiswa = siswaBimbinganList.find((s) => s.id === selectedId) ?? siswaBimbinganList[0];
  const name = studentDetail?.name ?? defaultSiswa.name;
  const displayRadarData = studentDetail?.radarData ?? radarDataAriq;
  const displayTrendData = studentDetail?.trendData ?? trendDataAriq;

  return (
    <div className="flex flex-col gap-5">
      {/* Detail Card */}
      <Card className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-slate-800">
            Progres {name}
          </h3>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer flex items-center gap-2">
              <Download className="w-4 h-4" /> Unduh Laporan
            </button>
            <button className="px-4 py-2 bg-[#00473e] hover:bg-[#003830] text-white rounded-xl text-sm font-bold transition-colors cursor-pointer flex items-center gap-2">
              <Send className="w-4 h-4" /> Beri Feedback
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Radar */}
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Kompetensi Inti
            </p>
            <div className="flex justify-center">
              <RadarChart data={displayRadarData} />
            </div>
          </div>

          {/* Trend + target */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Tren Capaian HCS
              </p>
              <div className="bg-slate-50 rounded-xl p-4">
                <TrendSparkline data={displayTrendData} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-semibold text-slate-500">Target Kuartal ini</span>
                <span className="text-sm font-extrabold text-slate-800">HCS {targetKuartal}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl">
                <span className="text-xs font-semibold text-slate-500">Status</span>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {statusOnTrack}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom Row: AI + Jadwal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* AI Rekomendasi */}
        <Card className="p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#00473e]/10 flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5 text-[#00473e]" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Rekomendasi AI</p>
            <p className="text-sm font-semibold text-slate-700 leading-relaxed">{aiRekomendasiAnalitik}</p>
          </div>
        </Card>

        {/* Jadwal Sesi */}
        <div className="bg-[#00473e] rounded-2xl p-5 text-white flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-emerald-300" />
            <p className="text-sm font-bold">{jadwalSesi.title}</p>
          </div>
          <p className="text-xs text-emerald-100 mb-4">{jadwalSesi.desc}</p>
          <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-emerald-200 transition-colors cursor-pointer">
            Persiapkan Materi <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
