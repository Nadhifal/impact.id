import React from "react";
import { UserKPICards } from "./components/section/UserKPICards";
import { UserTable } from "./components/section/UserTable";
import { userKpis, dummyUsers } from "./data";
import { Plus } from "lucide-react";

export default function AdminManageUserPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Manajemen pengguna</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Kelola data siswa, guru, dinas pendidikan daerah, dan administrator platform.
          </p>
        </div>

        <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-md group">
          <span>+ Tambah pengguna</span>
        </button>
      </div>

      {/* KPI Cards */}
      <UserKPICards kpis={userKpis} />

      {/* Table Section */}
      <UserTable users={dummyUsers} />
    </div>
  );
}
