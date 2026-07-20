"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../../../layouts/ui/Card";
import { Save } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface BrandingConfig {
  logoText: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  brandAssetUrl: string;
}

const defaultBranding: BrandingConfig = {
  logoText: "IMPACT.ID",
  tagline: "Bangun portofolio proyek berdampak dan profesional.",
  primaryColor: "#0f766e",
  secondaryColor: "#14b8a6",
  brandAssetUrl: ""
};

export function BrandingTab() {
  const { user } = useUser();
  const [branding, setBranding] = useState<BrandingConfig>(defaultBranding);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadBranding() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success && json.data.brandingConfig) {
          setBranding(json.data.brandingConfig);
        }
      } catch (error) {
        console.error("Failed to load branding settings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadBranding();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/landing-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "brandingConfig",
          value: branding,
          adminId: user?.id || "admin-1"
        })
      });
      const json = await res.json();
      if (!json.success) {
        alert("Gagal menyimpan branding: " + (json.error || "Unknown error"));
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-slate-200 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Branding</h3>
          <p className="text-sm text-slate-500">
            Kelola identitas merek, logo teks, tagline, warna utama, dan aset
            brand.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-slate-500">
          Memuat pengaturan branding...
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Logo Text
              </label>
              <input
                type="text"
                value={branding.logoText}
                onChange={(e) =>
                  setBranding({ ...branding, logoText: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Tagline
              </label>
              <input
                type="text"
                value={branding.tagline}
                onChange={(e) =>
                  setBranding({ ...branding, tagline: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Warna utama
              </label>
              <input
                type="color"
                value={branding.primaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, primaryColor: e.target.value })
                }
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Warna sekunder
              </label>
              <input
                type="color"
                value={branding.secondaryColor}
                onChange={(e) =>
                  setBranding({ ...branding, secondaryColor: e.target.value })
                }
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              URL Aset Brand
            </label>
            <input
              type="text"
              value={branding.brandAssetUrl}
              onChange={(e) =>
                setBranding({ ...branding, brandAssetUrl: e.target.value })
              }
              placeholder="https://..."
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-2 text-xs text-slate-500">
              Gunakan URL aset untuk logo alternatif, ikon, atau grafik brand.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {saving ? "Menyimpan..." : "Simpan Branding"}
          </button>
        </div>
      )}
    </Card>
  );
}
