"use client";

import React, { useState } from "react";
import { Plus, Minus, Compass, ExternalLink } from "lucide-react";
import { Card } from "../ui/Card";
import { provincesMapData, provinceRankings, ProvinceDetail } from "../../data";

export function InteractiveMap() {
  const [zoom, setZoom] = useState<number>(1);
  const [selectedProvince, setSelectedProvince] = useState<ProvinceDetail | null>(null);
  const [hoveredProvince, setHoveredProvince] = useState<ProvinceDetail | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Interactive Map Area (3 cols) */}
      <Card className="lg:col-span-3 p-0 relative overflow-hidden h-[500px] flex flex-col bg-[#eaf4f2]/70 border-slate-200">
        
        {/* Map Legend */}
        <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-xs px-4 py-3 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-2.5">
          <p className="text-xs font-bold text-slate-800">Map Legend</p>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00473e]" />
              <span className="text-[10px] font-bold text-slate-500">High Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#82ece0]" />
              <span className="text-[10px] font-bold text-slate-500">In Progress</span>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 bg-white/95 backdrop-blur-xs p-1.5 rounded-xl border border-slate-100 shadow-sm">
          <button
            onClick={handleZoomIn}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
            title="Perbesar"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
            title="Perkecil"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetZoom}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
            title="Fokus"
          >
            <Compass className="w-4 h-4" />
          </button>
        </div>

        {/* Vector SVG Stylized Map */}
        <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center p-8">
          <div 
            className="w-full h-full max-w-[800px] max-h-[400px] relative transition-transform duration-300 ease-out"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Base SVG Map Elements (Stylized Islands) */}
            <svg 
              viewBox="0 0 1000 500" 
              className="w-full h-full opacity-35" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sumatera */}
              <path d="M70 120 L230 330 L310 390 L260 410 L190 320 L60 180 Z" fill="#00473e" opacity="0.65" />
              {/* Kalimantan */}
              <path d="M450 180 L560 170 L580 230 L550 320 L480 320 L420 250 Z" fill="#00473e" opacity="0.65" />
              {/* Jawa */}
              <path d="M330 400 L590 435 L590 455 L320 420 Z" fill="#00473e" opacity="0.8" />
              {/* Sulawesi */}
              <path d="M640 220 L690 225 L685 270 L730 250 L735 275 L675 320 L625 290 Z" fill="#00473e" opacity="0.7" />
              {/* Bali & Nusa Tenggara */}
              <path d="M605 440 L690 450 L740 455 Z" fill="#00473e" opacity="0.75" />
              {/* Papua */}
              <path d="M840 260 L920 280 L960 300 L950 360 L870 340 L810 300 Z" fill="#00473e" opacity="0.6" />
            </svg>

            {/* Hotspot Markers */}
            {provincesMapData.map((prov) => {
              const isSelected = selectedProvince?.id === prov.id;
              const isHovered = hoveredProvince?.id === prov.id;
              const color = prov.status === "High Impact" ? "bg-[#00473e]" : "bg-[#82ece0]";
              const pingColor = prov.status === "High Impact" ? "bg-[#00473e]/50" : "bg-[#82ece0]/50";

              return (
                <div
                  key={prov.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                  style={{ left: `${prov.coordX}%`, top: `${prov.coordY}%` }}
                  onClick={() => setSelectedProvince(isSelected ? null : prov)}
                  onMouseEnter={() => setHoveredProvince(prov)}
                  onMouseLeave={() => setHoveredProvince(null)}
                >
                  <span className={`absolute inline-flex h-6 w-6 rounded-full opacity-75 animate-ping ${pingColor} -left-1.5 -top-1.5`} />
                  <div className={`h-3.5 w-3.5 rounded-full border-2 border-white shadow-md relative ${color} transition-transform group-hover:scale-125 duration-150 ${isSelected || isHovered ? "scale-125 ring-4 ring-teal-600/20" : ""}`} />
                </div>
              );
            })}

            {/* Interactive Tooltip Card */}
            {(selectedProvince || hoveredProvince) && (
              <div 
                className="absolute z-30 bg-slate-900/95 text-white p-4 rounded-xl shadow-lg border border-slate-700 w-56 flex flex-col pointer-events-auto"
                style={{
                  left: `${(selectedProvince || hoveredProvince)!.coordX}%`,
                  top: `${(selectedProvince || hoveredProvince)!.coordY - 18}%`,
                  transform: "translateX(-50%)"
                }}
              >
                <h4 className="text-sm font-bold">{(selectedProvince || hoveredProvince)!.name}</h4>
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>Projects:</span>
                    <span className="font-bold text-white">{(selectedProvince || hoveredProvince)!.projects}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>Success Rate:</span>
                    <span className="font-bold text-emerald-400">{(selectedProvince || hoveredProvince)!.successRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>Status:</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded-xs text-[9px] ${(selectedProvince || hoveredProvince)!.status === "High Impact" ? "bg-emerald-500/25 text-emerald-300" : "bg-teal-500/25 text-teal-300"}`}>
                      {(selectedProvince || hoveredProvince)!.status}
                    </span>
                  </div>
                </div>
                {selectedProvince && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProvince(null);
                    }} 
                    className="text-[10px] text-slate-400 hover:text-white mt-3 text-center border-t border-slate-700 pt-2 w-full cursor-pointer"
                  >
                    Tutup Detail
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Live Indicator footer inside Map Card */}
        <div className="p-4 bg-white border-t border-slate-200/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-bold text-slate-600">Live Connection</span>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">Last updated: 2 mins ago</span>
        </div>
      </Card>

      {/* Rankings Panel (1 col) */}
      <Card className="lg:col-span-1 flex flex-col justify-between border-slate-200">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Top Provinces</h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">By active project count</p>

          <div className="mt-8 space-y-6">
            {provinceRankings.map((prov, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>{prov.name}</span>
                  <span className="text-slate-400 font-semibold">{prov.projectsCount.toLocaleString("id-ID")} projects</span>
                </div>
                {/* Custom Progress Bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#00473e] rounded-full transition-all duration-500"
                    style={{ width: `${prov.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Link Footer */}
        <button className="w-full py-3.5 mt-6 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer">
          <span>View Full Ranking</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </Card>
    </div>
  );
}
