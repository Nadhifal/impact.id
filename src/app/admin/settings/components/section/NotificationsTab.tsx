"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../../../layouts/ui/Card";
import { Save } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklySummary: boolean;
  defaultMessage: string;
}

const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  weeklySummary: true,
  defaultMessage:
    "Notifikasi baru akan muncul pada dashboard dan dikirim lewat email jika diaktifkan."
};

export function NotificationsTab() {
  const { user } = useUser();
  const [settings, setSettings] = useState<NotificationSettings>(
    defaultNotificationSettings
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/landing-page");
        const json = await res.json();
        if (json.success && json.data.notificationSettings) {
          setSettings(json.data.notificationSettings);
        }
      } catch (err) {
        console.error("Failed to load notification settings:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async () => {
    setSaving("notificationSettings");
    try {
      const res = await fetch("/api/admin/landing-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "notificationSettings",
          value: settings,
          adminId: user?.id || "admin-1"
        })
      });
      const json = await res.json();
      if (!json.success) {
        alert("Gagal menyimpan notifikasi: " + (json.error || "Unknown error"));
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setSaving(null);
    }
  };

  return (
    <Card className="border-slate-200 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Notifikasi</h3>
          <p className="text-sm text-slate-500">
            Atur preferensi notifikasi dan pesan default untuk pengguna.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="mt-8 text-sm text-slate-500">
          Memuat pengaturan notifikasi...
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Email notifications
                </span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        emailNotifications: e.target.checked
                      })
                    }
                    className="sr-only"
                  />
                  <span
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.emailNotifications ? "bg-primary" : "bg-slate-300"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.emailNotifications ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </span>
                </label>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Kirim alert ke email jika terjadi aktivitas penting.
              </p>
            </label>
            <label className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                  Push notifications
                </span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushNotifications}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        pushNotifications: e.target.checked
                      })
                    }
                    className="sr-only"
                  />
                  <span
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.pushNotifications ? "bg-primary" : "bg-slate-300"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.pushNotifications ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </span>
                </label>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Izinkan notifikasi waktu nyata pada dashboard pengguna.
              </p>
            </label>
          </div>

          <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Ringkasan mingguan
            </span>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-700">
                Kiriman ringkasan mingguan
              </p>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.weeklySummary}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      weeklySummary: e.target.checked
                    })
                  }
                  className="sr-only"
                />
                <span
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.weeklySummary ? "bg-primary" : "bg-slate-300"}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.weeklySummary ? "translate-x-5" : "translate-x-0"}`}
                  />
                </span>
              </label>
            </div>
          </label>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Pesan notifikasi default
            </label>
            <textarea
              rows={4}
              value={settings.defaultMessage}
              onChange={(e) =>
                setSettings({ ...settings, defaultMessage: e.target.value })
              }
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving === "notificationSettings"}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white transition hover:bg-primary-hover disabled:opacity-50"
          >
            <Save className="w-4 h-4" />{" "}
            {saving === "notificationSettings"
              ? "Menyimpan..."
              : "Simpan Notifikasi"}
          </button>
        </div>
      )}
    </Card>
  );
}
