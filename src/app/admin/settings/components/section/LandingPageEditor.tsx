"use client";

import React, { useState, useEffect } from "react";
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
  Save,
  CheckCircle,
} from "lucide-react";
import { Card } from "../../../layouts/ui/Card";
import { LandingSection, SettingsTab, landingSections, settingsTabs } from "../../data";
import { useUser } from "@/app/shared/context/AuthContext";

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
  const { user } = useUser();

  // Landing Page Content States
  const [stats, setStats] = useState<any[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [processSteps, setProcessSteps] = useState<any[]>([]);
  const [testimonial, setTestimonial] = useState<any>(null);
  const [verification, setVerification] = useState<any>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Fetch initial landing page contents
  useEffect(() => {
    async function loadLandingPage() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success) {
          const d = json.data;
          if (d.stats) setStats(d.stats);
          if (d.features) setFeatures(d.features);
          if (d.processSteps) setProcessSteps(d.processSteps);
          if (d.testimonial) setTestimonial(d.testimonial);
          if (d.verification) setVerification(d.verification);
        }
      } catch (err) {
        console.error("Failed to load landing page content:", err);
      } finally {
        setLoading(false);
      }
    }
    loadLandingPage();
  }, []);

  const handleSave = async (key: string, value: any) => {
    setSaving(key);
    try {
      const res = await fetch("/api/admin/landing-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key,
          value,
          adminId: user?.id || "admin-1",
        }),
      });
      const json = await res.json();
      if (json.success) {
        setToast(`Berhasil menyimpan perubahan untuk ${key}!`);
        setTimeout(() => setToast(null), 3000);
      } else {
        alert("Gagal menyimpan data: " + (json.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-0">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-[#00473e] text-white border border-[#8ce1d5]/30 px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-[#8ce1d5]" />
          <span className="text-xs font-bold">{toast}</span>
        </div>
      )}

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
        {loading ? (
          <div className="py-12 text-center text-slate-400 font-semibold text-xs">
            Memuat konten editor...
          </div>
        ) : activeTab !== "konten" ? (
          <PlaceholderTab label={settingsTabs.find((t) => t.id === activeTab)?.label || ""} />
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 font-medium">
              Kelola setiap seksi yang tampil di halaman utama publik, urut dari atas ke bawah.
            </p>

            <div className="space-y-3">
              {landingSections.map((section) => {
                const isEditing = section.id === editingSection;
                return (
                  <Card
                    key={section.id}
                    className="border-slate-200 p-4 hover:border-slate-300 transition-all flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-4 w-full">
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
                        onClick={() => setEditingSection(isEditing ? null : section.id)}
                        className="shrink-0 flex items-center gap-1 px-4 py-2 border border-[#00473e]/30 hover:bg-[#e6f4f1] text-[#00473e] rounded-lg text-xs font-bold transition-all cursor-pointer"
                      >
                        {isEditing ? "Tutup" : "Edit"} <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isEditing ? "rotate-90" : ""}`} />
                      </button>
                    </div>

                    {/* Expandable Editing Form */}
                    {isEditing && (
                      <div className="border-t border-slate-100 pt-4 mt-2 space-y-4 animate-fade-in">
                        {section.id === "statistik" && stats.length > 0 && (
                          <div className="space-y-4">
                            {stats.map((stat, idx) => (
                              <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nilai Stat</label>
                                  <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => {
                                      const updated = [...stats];
                                      updated[idx].value = e.target.value;
                                      setStats(updated);
                                    }}
                                    className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Label Deskripsi</label>
                                  <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => {
                                      const updated = [...stats];
                                      updated[idx].label = e.target.value;
                                      setStats(updated);
                                    }}
                                    className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                  />
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => handleSave("stats", stats)}
                              disabled={saving === "stats"}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>{saving === "stats" ? "Menyimpan..." : "Simpan Perubahan"}</span>
                            </button>
                          </div>
                        )}

                        {section.id === "fitur-ai" && features.length > 0 && (
                          <div className="space-y-4">
                            {features.map((feature, idx) => (
                              <div key={idx} className="space-y-3 border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Judul Fitur</label>
                                  <input
                                    type="text"
                                    value={feature.title}
                                    onChange={(e) => {
                                      const updated = [...features];
                                      updated[idx].title = e.target.value;
                                      setFeatures(updated);
                                    }}
                                    className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deskripsi Fitur</label>
                                  <textarea
                                    value={feature.description}
                                    rows={2}
                                    onChange={(e) => {
                                      const updated = [...features];
                                      updated[idx].description = e.target.value;
                                      setFeatures(updated);
                                    }}
                                    className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                  />
                                </div>
                              </div>
                            ))}
                            <button
                              onClick={() => handleSave("features", features)}
                              disabled={saving === "features"}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>{saving === "features" ? "Menyimpan..." : "Simpan Perubahan"}</span>
                            </button>
                          </div>
                        )}

                        {section.id === "proses-belajar" && processSteps.length > 0 && (
                          <div className="space-y-4">
                            <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
                              {processSteps.map((step, idx) => (
                                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-3 border border-slate-100 p-3 rounded-lg bg-slate-50/50">
                                  <div className="md:col-span-1">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Langkah {step.number}</label>
                                    <input
                                      type="text"
                                      value={step.title}
                                      onChange={(e) => {
                                        const updated = [...processSteps];
                                        updated[idx].title = e.target.value;
                                        setProcessSteps(updated);
                                      }}
                                      className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>
                                  <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Deskripsi Kegiatan</label>
                                    <input
                                      type="text"
                                      value={step.description}
                                      onChange={(e) => {
                                        const updated = [...processSteps];
                                        updated[idx].description = e.target.value;
                                        setProcessSteps(updated);
                                      }}
                                      className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => handleSave("processSteps", processSteps)}
                              disabled={saving === "processSteps"}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>{saving === "processSteps" ? "Menyimpan..." : "Simpan Perubahan"}</span>
                            </button>
                          </div>
                        )}

                        {section.id === "testimoni" && testimonial && (
                          <div className="space-y-4 border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Lengkap</label>
                                <input
                                  type="text"
                                  value={testimonial.name}
                                  onChange={(e) => setTestimonial({ ...testimonial, name: e.target.value })}
                                  className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jabatan / Role</label>
                                <input
                                  type="text"
                                  value={testimonial.role}
                                  onChange={(e) => setTestimonial({ ...testimonial, role: e.target.value })}
                                  className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kutipan Review</label>
                              <textarea
                                value={testimonial.quote}
                                rows={3}
                                onChange={(e) => setTestimonial({ ...testimonial, quote: e.target.value })}
                                className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                              />
                            </div>
                            <button
                              onClick={() => handleSave("testimonial", testimonial)}
                              disabled={saving === "testimonial"}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>{saving === "testimonial" ? "Menyimpan..." : "Simpan Perubahan"}</span>
                            </button>
                          </div>
                        )}

                        {section.id === "verifikasi" && verification && (
                          <div className="space-y-4 border border-slate-100 p-3.5 rounded-xl bg-slate-50/50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Verification ID Dummy</label>
                                <input
                                  type="text"
                                  value={verification.id}
                                  onChange={(e) => setVerification({ ...verification, id: e.target.value })}
                                  className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Tampilan</label>
                                <input
                                  type="text"
                                  value={verification.status}
                                  onChange={(e) => setVerification({ ...verification, status: e.target.value })}
                                  className="w-full text-xs mt-1 p-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-[#00473e]/10"
                                />
                              </div>
                            </div>
                            <button
                              onClick={() => handleSave("verification", verification)}
                              disabled={saving === "verification"}
                              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-xs font-semibold disabled:opacity-40 cursor-pointer"
                            >
                              <Save className="w-4 h-4" />
                              <span>{saving === "verification" ? "Menyimpan..." : "Simpan Perubahan"}</span>
                            </button>
                          </div>
                        )}

                        {["hero", "ai-mentor", "footer"].includes(section.id) && (
                          <div className="py-6 text-center text-slate-400 text-xs font-semibold">
                            Konten seksi ini didefinisikan secara statis di template utama.
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

