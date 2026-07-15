import React from "react";
import { User, Shield, Bell, Settings2 } from "lucide-react";

interface SettingsSidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const menuItems = [
    { key: "account", label: "Account", icon: <User className="w-4.5 h-4.5" /> },
    { key: "security", label: "Security", icon: <Shield className="w-4.5 h-4.5" /> },
    { key: "notifications", label: "Notifications", icon: <Bell className="w-4.5 h-4.5" /> },
    { key: "preferences", label: "Preferences", icon: <Settings2 className="w-4.5 h-4.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight px-1">
        Settings
      </h2>

      {/* Menu List */}
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelectTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-xs"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <div className={isActive ? "text-white" : "text-slate-400"}>
                {item.icon}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
