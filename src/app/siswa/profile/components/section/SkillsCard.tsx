import React from "react";
import { Leaf, Zap, BarChart3, Users, Plus } from "lucide-react";
import { Card } from "@/app/guru/verifikasi/components/ui/Card";

export const SkillsCard: React.FC = () => {
  const skills = [
    { label: "Circular Economy", icon: <Leaf className="w-4 h-4 text-emerald-600" /> },
    { label: "Renewable Systems", icon: <Zap className="w-4 h-4 text-amber-500" /> },
    { label: "ESG Reporting", icon: <BarChart3 className="w-4 h-4 text-indigo-600" /> },
    { label: "Stakeholder Mgt.", icon: <Users className="w-4 h-4 text-blue-600" /> },
  ];

  return (
    <Card className="p-6 border border-slate-100 shadow-xs">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-sm font-bold text-slate-800">
          Expertise & Skills
        </h3>
        <button className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5 cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Add New</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 border border-slate-200 hover:border-slate-300 bg-white px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 transition-all cursor-pointer"
          >
            {skill.icon}
            <span>{skill.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
