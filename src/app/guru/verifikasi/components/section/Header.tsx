import React from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Badge } from "../ui/Badge";

interface HeaderProps {
  pendingCount: number;
  onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ pendingCount, onMenuClick }) => {
  return (
    <header className="flex justify-between items-center py-5 px-6 sm:px-8 bg-[#f8fafb]/50 backdrop-blur-xs border-b border-slate-100">
      {/* Menu Trigger & Title & Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 hover:bg-slate-150 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <h1 className="text-base sm:text-xl font-bold text-slate-800 truncate">
          Verifikasi Submission
        </h1>
        <Badge variant="info" className="hidden sm:inline-flex">
          {pendingCount} menunggu review
        </Badge>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2 sm:gap-4 text-slate-500">
        {/* Notification indicator shown on mobile too */}
        <Badge variant="info" className="sm:hidden text-[10px] px-2 py-0.5">
          {pendingCount}
        </Badge>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer">
          <Search className="w-5 h-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};
