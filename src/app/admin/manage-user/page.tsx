"use client";

import React, { useState, useEffect, useCallback } from "react";
import { UserKPICards } from "./components/section/UserKPICards";
import { UserTable } from "./components/section/UserTable";
import { UserKPI, UserItem } from "./data";
import { Plus, RefreshCw } from "lucide-react";

export default function AdminManageUserPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [kpis, setKpis] = useState<UserKPI[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (json.success) {
        const roleMap: Record<string, string> = {
          STUDENT: "Siswa",
          TEACHER: "Guru",
          DINAS: "Dinas",
          ADMIN: "Admin"
        };
        setUsers(
          json.data.users.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: roleMap[u.role] ?? u.role,
            school: u.school,
            status:
              u.status === "MENUNGGU VERIFIKASI"
                ? "MENUNGGU VERIFIKASI"
                : "AKTIF",
            joinDate: u.joinDate
          }))
        );
        const k = json.data.kpis;
        setKpis([
          {
            title: "Siswa",
            value: k.students.toLocaleString("id-ID"),
            label: "Siswa terdaftar aktif"
          },
          {
            title: "Guru",
            value: k.teachers.toLocaleString("id-ID"),
            label: "Fasilitator & guru pembimbing"
          },
          {
            title: "Dinas",
            value: k.dinas.toLocaleString("id-ID"),
            label: "Institusi dinas daerah"
          },
          {
            title: "Admin",
            value: k.admins.toLocaleString("id-ID"),
            label: "Administrator platform"
          }
        ]);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">
            Manajemen pengguna
          </h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Kelola data siswa, guru, dinas pendidikan daerah, dan administrator
            platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-40"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
          <button className="flex items-center gap-1.5 px-5 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-md group">
            <span>+ Tambah pengguna</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <UserKPICards kpis={kpis} />

      {/* Table Section */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-semibold">Memuat data pengguna...</span>
        </div>
      ) : (
        <UserTable users={users} />
      )}
    </div>
  );
}
