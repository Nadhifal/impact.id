"use client";

import React, { useState } from "react";
import {
  LayoutTemplate,
  BarChart3,
  Sparkles,
  TrendingUp,
  Quote,
  ShieldCheck,
  LayoutIcon,
  UserCircle,
  ChevronRight,
} from "lucide-react";
import { Card } from "../../../layouts/ui/Card";
import { LandingSection, SettingsTab, landingSections, settingsTabs } from "../../data";

function SectionIcon({ icon }: { icon: LandingSection["icon"] }) {
  const cls = "w-5 h-5 text-slate-500";
  switch (icon) {
    case "layout": return <LayoutTemplate className={cls} />;
    case "bar-chart": return <BarChart3 className={cls} />;
    case "user-sparkle": return <UserCircle className={cls} />;
    case "sparkles": return <Sparkles className={cls} />;
    case "trend": return <TrendingUp className={cls} />;
    case "quote": return <Quote className={cls} />;
    case "shield": return <ShieldCheck className={cls} />;
    case "footer-layout": return <LayoutIcon className={cls} />;
    default: return <LayoutTemplate className={cls} />;
  }
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="py-12 text-center text-slate-400">
      <p className="text-sm font-semibold">Konten untuk tab <span className="font-bold text-slate-600">"{label}"</span> belum diisi.</p>
    </div>
  );
}

export function LandingPageEditor() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("konten");
  const [editingSection, setEditingSection] = useState<string | null>(null);

  return (
    <div className="space-y-0">
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-0 overflow-x-auto">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#00473e] text-[#00473e]"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="pt-6">
        {activeTab !== "konten" ? (
          <PlaceholderTab label={settingsTabs.find((t) => t.id === activeTab)?.label || ""} />
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-medium">
              Kelola setiap seksi yang tampil di halaman utama publik, urut dari atas ke bawah.
            </p>

            <div className="space-y-3">
              {landingSections.map((section) => (
                <Card
                  key={section.id}
                  className="border-slate-200 p-4 flex items-center gap-4 hover:border-slate-300 transition-all"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                    <SectionIcon icon={section.icon} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">{section.title}</p>
                    <p className="text-xs text-slate-400 font-medium mt-0.5 truncate">
                      {section.subtitle}
                    </p>
                  </div>

                  {/* Edit Button */}
                  <button
                    onClick={() => setEditingSection(section.id === editingSection ? null : section.id)}
                    className="shrink-0 flex items-center gap-1 px-4 py-2 border border-[#00473e]/30 hover:bg-[#e6f4f1] text-[#00473e] rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Edit <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
