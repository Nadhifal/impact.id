"use client";

import React, { useState } from "react";
import { settingsTabs, SettingsTab } from "../../data";
import { LandingContentTab } from "./LandingContentTab";
import { FAQTab } from "./FAQTab";
import { CategoryTab } from "./CategoryTab";
import { PolicyTab } from "./PolicyTab";
import { NotificationsTab } from "./NotificationsTab";
import { BrandingTab } from "./BrandingTab";
import { PlatformSettingsTab } from "./PlatformSettingsTab";

export function LandingPageEditor() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("konten");

  const renderTabContent = () => {
    switch (activeTab) {
      case "konten":
        return <LandingContentTab />;
      case "faq":
        return <FAQTab />;
      case "kategori":
        return <CategoryTab />;
      case "kebijakan":
        return <PolicyTab />;
      case "notifikasi":
        return <NotificationsTab />;
      case "branding":
        return <BrandingTab />;
      case "pengaturan":
        return <PlatformSettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-0">
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex gap-0 overflow-x-auto">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-5 py-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-6">{renderTabContent()}</div>
    </div>
  );
}
