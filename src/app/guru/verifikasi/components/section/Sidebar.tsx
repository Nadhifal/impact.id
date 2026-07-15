import React from "react";
import { ShieldCheck, TrendingUp, MessageSquare, FileText, X } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const menuItems = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      label: "Verifikasi submission",
      active: true,
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Analitik progres siswa",
      active: false,
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Rekomendasi dan feedback",
      active: false,
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Laporan capaian",
      active: false,
    },
  ];

  const sidebarContent = (
    <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-full py-6 px-4 shrink-0">
      {/* Brand Header */}
      <div className="px-3 mb-8 flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-primary">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-lg tracking-wider text-slate-800">
              IMPACT.ID
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-medium leading-relaxed mt-1">
            Dashboard verifikasi dan analitik siswa
          </p>
        </div>
        {/* Close button for mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5">
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            href="#"
            className={`flex items-start gap-3 px-3 py-3 rounded-lg text-xs font-semibold transition-all duration-150 ${
              item.active
                ? "bg-[#e6f4f1] text-primary"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <div className={`mt-0.5 ${item.active ? "text-primary" : "text-slate-400"}`}>
              {item.icon}
            </div>
            <span className="leading-5">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* Footer Profile */}
      <div className="pt-4 border-t border-slate-100 flex items-center gap-3 px-3">
        <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-700 text-sm border border-slate-300">
          BS
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-850 leading-tight">
            Budi Santoso
          </h4>
          <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
            Instruktur Utama
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-xs"
          onClick={onClose}
        />
        {/* Sliding Panel */}
        <aside
          className={`absolute top-0 bottom-0 left-0 transition-transform duration-300 transform h-full ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </aside>
      </div>
    </>
  );
};
