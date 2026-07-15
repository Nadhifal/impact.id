import React from "react";

interface TabFilterProps {
  activeTab: string;
  onChangeTab: (tab: string) => void;
}

export const TabFilter: React.FC<TabFilterProps> = ({ activeTab, onChangeTab }) => {
  const tabs = [
    { key: "all", label: "All" },
    { key: "challenges", label: "Challenges" },
    { key: "messages", label: "Messages" },
    { key: "milestones", label: "Milestones" },
  ];

  return (
    <div className="flex flex-wrap gap-2.5">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChangeTab(tab.key)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-primary text-white shadow-xs"
                : "bg-[#eef7f6] text-primary hover:bg-[#e2f1ef]"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
