"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../../../layouts/ui/Card";
import { Save, CheckCircle } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface FeatureItem {
  title: string;
  description: string;
}

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

interface VerificationContent {
  id: string;
  status: string;
}

const defaultStats = [
  { value: "15k+", label: "Impact Score" },
  { value: "420", label: "Project Selesai" }
];

const defaultFeatures: FeatureItem[] = [
  {
    title: "Personalized Path",
    description:
      "AI membantu siswa memilih tantangan yang paling cocok dengan minat dan bakat mereka."
  },
  {
    title: "Smart Portfolio",
    description:
      "Setiap proyek tersimpan rapi, siap ditampilkan kepada sekolah dan mitra industri."
  }
];

const defaultProcessSteps: ProcessStep[] = [
  {
    number: 1,
    title: "Pendaftaran",
    description: "Isi data profil dan buat akun."
  },
  {
    number: 2,
    title: "Bimbingan",
    description: "Pilih challenge dan dapatkan arahan mentor."
  },
  {
    number: 3,
    title: "Penyelesaian",
    description: "Unggah hasil pekerjaan dan dokumen pendukung."
  }
];

const defaultTestimonial: Testimonial = {
  name: "Andini P.",
  role: "UI/UX Designer @ TechIndo",
  quote:
    "IMPACT.ID membantu saya membangun portofolio yang tidak hanya cantik, tapi punya impact nyata bagi UMKM sekitar."
};

const defaultVerification: VerificationContent = {
  id: "IMPACT-ID-8821-2024-CISAUK",
  status: "Verified on Ledger"
};

export function LandingContentTab() {
  const { user } = useUser();
  const [stats, setStats] = useState<any[]>(defaultStats);
  const [features, setFeatures] = useState<FeatureItem[]>(defaultFeatures);
  const [processSteps, setProcessSteps] =
    useState<ProcessStep[]>(defaultProcessSteps);
  const [testimonial, setTestimonial] =
    useState<Testimonial>(defaultTestimonial);
  const [verification, setVerification] =
    useState<VerificationContent>(defaultVerification);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
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
    load();
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
          adminId: user?.id || "admin-1"
        })
      });
      const json = await res.json();
      if (json.success) {
        setToast(`Perubahan ${key} berhasil disimpan.`);
        setTimeout(() => setToast(null), 2500);
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
    <div className="space-y-6">
      {toast && (
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" /> {toast}
          </div>
        </div>
      )}

      <Card className="border-slate-200 p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Konten landing page
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Atur komponen utama halaman publik tanpa mencampur dengan
              pengaturan FAQ, kategori, kebijakan, notifikasi, atau branding.
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Statistik
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {stats.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Nilai
                  </label>
                  <input
                    type="text"
                    value={item.value}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[idx].value = e.target.value;
                      setStats(updated);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <label className="mt-3 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Label
                  </label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const updated = [...stats];
                      updated[idx].label = e.target.value;
                      setStats(updated);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSave("stats", stats)}
              disabled={saving === "stats"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              <Save className="w-4 h-4" />{" "}
              {saving === "stats" ? "Menyimpan..." : "Simpan Statistik"}
            </button>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Kategori challenge
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Judul fitur
                  </label>
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[idx].title = e.target.value;
                      setFeatures(updated);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <label className="mt-3 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Deskripsi fitur
                  </label>
                  <textarea
                    value={feature.description}
                    rows={3}
                    onChange={(e) => {
                      const updated = [...features];
                      updated[idx].description = e.target.value;
                      setFeatures(updated);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSave("features", features)}
              disabled={saving === "features"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              <Save className="w-4 h-4" />{" "}
              {saving === "features" ? "Menyimpan..." : "Simpan Fitur"}
            </button>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Proses belajar
            </h4>
            <div className="space-y-4">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm font-semibold text-slate-700">
                    Langkah {step.number}
                  </p>
                  <label className="mt-3 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Judul langkah
                  </label>
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const updated = [...processSteps];
                      updated[idx].title = e.target.value;
                      setProcessSteps(updated);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  <label className="mt-3 block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Deskripsi
                  </label>
                  <textarea
                    rows={2}
                    value={step.description}
                    onChange={(e) => {
                      const updated = [...processSteps];
                      updated[idx].description = e.target.value;
                      setProcessSteps(updated);
                    }}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSave("processSteps", processSteps)}
              disabled={saving === "processSteps"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              <Save className="w-4 h-4" />{" "}
              {saving === "processSteps" ? "Menyimpan..." : "Simpan Proses"}
            </button>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Testimoni
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Nama
                </label>
                <input
                  type="text"
                  value={testimonial.name}
                  onChange={(e) =>
                    setTestimonial({ ...testimonial, name: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Peran
                </label>
                <input
                  type="text"
                  value={testimonial.role}
                  onChange={(e) =>
                    setTestimonial({ ...testimonial, role: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Kutipan
            </label>
            <textarea
              rows={3}
              value={testimonial.quote}
              onChange={(e) =>
                setTestimonial({ ...testimonial, quote: e.target.value })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={() => handleSave("testimonial", testimonial)}
              disabled={saving === "testimonial"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              <Save className="w-4 h-4" />{" "}
              {saving === "testimonial" ? "Menyimpan..." : "Simpan Testimoni"}
            </button>
          </section>

          <section className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Verifikasi publik
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Verification ID
                </label>
                <input
                  type="text"
                  value={verification.id}
                  onChange={(e) =>
                    setVerification({ ...verification, id: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Status tampilan
                </label>
                <input
                  type="text"
                  value={verification.status}
                  onChange={(e) =>
                    setVerification({ ...verification, status: e.target.value })
                  }
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <button
              onClick={() => handleSave("verification", verification)}
              disabled={saving === "verification"}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
            >
              <Save className="w-4 h-4" />{" "}
              {saving === "verification" ? "Menyimpan..." : "Simpan Verifikasi"}
            </button>
          </section>
        </div>
      </Card>
    </div>
  );
}
