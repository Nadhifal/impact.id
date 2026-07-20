"use client";

import React, { useState } from "react";
import {
  Search,
  Edit2,
  Check,
  X,
  RotateCcw,
  Ban,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Card } from "../../../layouts/ui/Card";
import { Badge } from "../../../../shared/components/ui/badge";
import { UserItem } from "../../data";

interface UserTableProps {
  users: UserItem[];
}

export function UserTable({ users: initialUsers }: UserTableProps) {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [processingId, setProcessingId] = useState<string | null>(null);

  const approveUser = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvePending: true })
      });
      const json = await res.json();
      if (json.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, status: "AKTIF" } : u))
        );
      } else {
        console.error("Approve failed:", json.error || json);
      }
    } catch (error) {
      console.error("Approve user error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const rejectUser = async (id: string) => {
    setProcessingId(id);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE"
      });
      const json = await res.json();
      if (json.success) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        console.error("Delete failed:", json.error || json);
      }
    } catch (error) {
      console.error("Reject user error:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleVerify = (id: string, isApproved: boolean) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: isApproved ? "AKTIF" : "NONAKTIF" } : u
      )
    );
  };

  const statusBadgeProps: Record<
    UserItem["status"],
    { variant: "primary" | "secondary" | "outline"; className?: string }
  > = {
    AKTIF: {
      variant: "primary",
      className: "bg-emerald-50 text-emerald-700 border border-emerald-100"
    },
    "MENUNGGU VERIFIKASI": {
      variant: "outline",
      className: "bg-amber-50 text-amber-600 border border-amber-100"
    },
    NONAKTIF: {
      variant: "secondary",
      className: "bg-slate-100 text-slate-500 border border-slate-200"
    }
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    setUsers(
      users.map((u) => {
        if (u.id === id) {
          return {
            ...u,
            status: currentStatus === "AKTIF" ? "NONAKTIF" : "AKTIF"
          };
        }
        return u;
      })
    );
  };

  return (
    <Card className="p-0 overflow-hidden border-slate-200">
      {/* Search & Filter Bar */}
      <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/20">
        <div className="flex flex-wrap items-center gap-3.5 flex-1 min-w-0">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama atau email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] cursor-pointer"
          >
            <option value="all">Semua role</option>
            <option value="Siswa">Siswa</option>
            <option value="Guru">Guru</option>
            <option value="Dinas">Dinas</option>
            <option value="Admin">Admin</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] cursor-pointer"
          >
            <option value="all">Semua status</option>
            <option value="AKTIF">Aktif</option>
            <option value="MENUNGGU VERIFIKASI">Menunggu verifikasi</option>
            <option value="NONAKTIF">Nonaktif</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Institusi
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-xs text-slate-400 font-semibold"
                >
                  Tidak ada pengguna ditemukan
                </td>
              </tr>
            )}
            {filteredUsers.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <span className="text-sm font-bold text-slate-800">
                      {row.name}
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      {row.email}
                    </p>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                  {row.role}
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-600">
                  {row.school}
                </td>
                <td className="px-6 py-4">
                  <Badge {...statusBadgeProps[row.status]}>{row.status}</Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    {row.status === "MENUNGGU VERIFIKASI" ? (
                      <>
                        <button
                          onClick={() => approveUser(row.id)}
                          disabled={processingId === row.id}
                          className="p-1 hover:bg-emerald-50 rounded-full text-emerald-600 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                          title="Setujui akun"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => rejectUser(row.id)}
                          disabled={processingId === row.id}
                          className="p-1 hover:bg-rose-50 rounded-full text-rose-600 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                          title="Tolak akun"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {row.status === "NONAKTIF" ? (
                          <button
                            onClick={() =>
                              handleToggleStatus(row.id, row.status)
                            }
                            className="p-1 hover:bg-slate-100 rounded-md text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                            title="Aktifkan Kembali"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleToggleStatus(row.id, row.status)
                            }
                            className="p-1 hover:bg-rose-50 rounded-md text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Blokir/Nonaktifkan"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between flex-wrap gap-4">
        <p className="text-xs font-semibold text-slate-400">
          Menampilkan 1 - {filteredUsers.length} dari {users.length} pengguna
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg text-xs font-bold bg-[#00473e] text-white flex items-center justify-center select-none">
            1
          </button>
          <span className="text-xs text-slate-400 px-1">...</span>
          <button className="w-8 h-8 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-semibold text-slate-600 flex items-center justify-center transition-all cursor-pointer">
            1820
          </button>
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
