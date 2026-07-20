"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../../../layouts/ui/Card";
import { Save } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface PlatformSettings {
  allowGuestPreview: boolean;
  enableAnalytics: boolean;
  defaultTimezone: string;
  autoVerificationEnabled: boolean;
  autoApprovalTeacherAccountsEnabled: boolean;
  autoApprovalDinasAccountsEnabled: boolean;
}

const defaultPlatformSettings: PlatformSettings = {
  allowGuestPreview: false,
  enableAnalytics: true,
  defaultTimezone: "Asia/Jakarta",
  autoVerificationEnabled: false,
  autoApprovalTeacherAccountsEnabled: false,
  autoApprovalDinasAccountsEnabled: false
};

export function PlatformSettingsTab() {
  const { user } = useUser();
  const [settings, setSettings] = useState<PlatformSettings>(
    defaultPlatformSettings
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success && json.data.platformSettings) {
          setSettings(json.data.platformSettings);
        }
      } catch (error) {
        console.error("Failed to load platform settings:", error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/landing-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "platformSettings",
          value: settings,
          adminId: user?.id || "admin-1"
        })
      });
      const json = await res.json();
      if (!json.success) {
        alert(
          "Gagal menyimpan pengaturan platform: " +
            (json.error || "Unknown error")
        );
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
          <h3 className="text-xl font-bold text-slate-900">
            Pengaturan platform
          </h3>
          <p className="text-sm text-slate-500">
            Kelola preferensi global untuk tampilan publik, analytics, dan zona
            waktu.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-slate-500">
          Memuat pengaturan platform...
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Pratinjau tamu
                  </p>
                  <p className="text-xs text-slate-500">
                    Izinkan pengunjung membuka halaman publik tanpa login.
                  </p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.allowGuestPreview}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        allowGuestPreview: e.target.checked
                      })
                    }
                    className="sr-only"
                  />
                  <span
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.allowGuestPreview ? "bg-primary" : "bg-slate-300"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.allowGuestPreview ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </span>
                </label>
              </div>
            </label>
            <label className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Enable Analytics
                  </p>
                  <p className="text-xs text-slate-500">
                    Kumpulkan data penggunaan untuk pengambilan keputusan.
                  </p>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.enableAnalytics}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        enableAnalytics: e.target.checked
                      })
                    }
                    className="sr-only"
                  />
                  <span
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.enableAnalytics ? "bg-primary" : "bg-slate-300"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.enableAnalytics ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </span>
                </label>
              </div>
            </label>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Auto-verifikasi challenge
                </p>
                <p className="text-xs text-slate-500">
                  Verifikasi otomatis submission siswa jika fitur diaktifkan.
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoVerificationEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoVerificationEnabled: e.target.checked
                    })
                  }
                  className="sr-only"
                />
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoVerificationEnabled ? "bg-primary" : "bg-slate-300"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.autoVerificationEnabled ? "translate-x-5" : "translate-x-0"}`}
                  />
                </span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Auto-approve akun guru
                </p>
                <p className="text-xs text-slate-500">
                  Setujui pendaftaran guru secara otomatis tanpa verifikasi
                  manual.
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoApprovalTeacherAccountsEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoApprovalTeacherAccountsEnabled: e.target.checked
                    })
                  }
                  className="sr-only"
                />
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoApprovalTeacherAccountsEnabled ? "bg-primary" : "bg-slate-300"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.autoApprovalTeacherAccountsEnabled ? "translate-x-5" : "translate-x-0"}`}
                  />
                </span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Auto-approve akun dinas
                </p>
                <p className="text-xs text-slate-500">
                  Setujui pendaftaran dinas secara otomatis tanpa proses admin
                  tambahan.
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoApprovalDinasAccountsEnabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoApprovalDinasAccountsEnabled: e.target.checked
                    })
                  }
                  className="sr-only"
                />
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.autoApprovalDinasAccountsEnabled ? "bg-primary" : "bg-slate-300"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.autoApprovalDinasAccountsEnabled ? "translate-x-5" : "translate-x-0"}`}
                  />
                </span>
              </label>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Zona waktu default
            </label>
            <input
              type="text"
              value={settings.defaultTimezone}
              onChange={(e) =>
                setSettings({ ...settings, defaultTimezone: e.target.value })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <p className="mt-2 text-xs text-slate-500">
              Contoh: Asia/Jakarta, UTC, Europe/London.
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {saving ? "Menyimpan..." : "Simpan Pengaturan"}
          </button>
        </div>
      )}
    </Card>
  );
}
