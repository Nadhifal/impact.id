"use client";

import React, { useState, useEffect } from "react";
import { SettingsSidebar } from "./components/section/SettingsSidebar";
import { AccountForm } from "./components/section/AccountForm";
import { AccountSettingsData } from "./data";
import { useUser } from "@/app/shared/context/AuthContext";

export default function StudentSettingsPage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<string>("account");
  const [settings, setSettings] = useState<AccountSettingsData>({
    fullName: "",
    email: "",
    bio: "",
  });
  const [toast, setToast] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Load settings from user profile API
  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.name) {
          setSettings({
            fullName: data.name ?? "",
            email: data.email ?? "",
            bio: "",
          });
        } else if (user) {
          setSettings({
            fullName: user.name ?? "",
            email: user.email ?? "",
            bio: "",
          });
        }
      })
      .catch(() => {
        if (user) {
          setSettings({
            fullName: user.name ?? "",
            email: user.email ?? "",
            bio: "",
          });
        }
      })
      .finally(() => setLoaded(true));
  }, [user]);

  const handleSaveSettings = async (updatedData: AccountSettingsData) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: updatedData.fullName }),
      });

      if (res.ok) {
        setSettings(updatedData);
        setToast("Settings saved successfully!");
      } else {
        setToast("Failed to save settings.");
      }
    } catch {
      setToast("Failed to save settings.");
    }
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 md:py-16 animate-fade-in relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-[#00473e] text-white border border-[#8ce1d5]/30 px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8ce1d5]" />
          <span className="text-xs font-bold">{toast}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Settings Navigation Menu */}
        <div className="lg:col-span-3">
          <SettingsSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
        </div>

        {/* Right Settings Content Form */}
        <div className="lg:col-span-9">
          {activeTab === "account" ? (
            loaded ? (
              <AccountForm initialData={settings} onSave={handleSaveSettings} />
            ) : (
              <div className="bg-white p-12 border border-slate-100 rounded-xl text-center shadow-xs">
                <p className="text-xs text-slate-400 font-semibold">Loading...</p>
              </div>
            )
          ) : (
            <div className="bg-white p-12 border border-slate-100 rounded-xl text-center shadow-xs">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">
                {activeTab} Settings
              </h3>
              <p className="text-xs text-slate-400 font-semibold">
                Configuration screen for this section will be available soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
