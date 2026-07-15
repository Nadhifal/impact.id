"use client";

import React, { useState } from "react";
import { Search, Filter, Edit2, Trash2, ChevronLeft, ChevronRight, Store, Droplet, Users, Zap, Loader2 } from "lucide-react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { challengeCategories } from "../../data";
import { ApiChallenge, deleteChallenge } from "@/lib/api";

// Map DB category to icon name
function getCategoryIcon(category: string) {
  const lower = category.toLowerCase();
  if (lower.includes("wirausaha") || lower.includes("bisnis")) return <Store className="w-5 h-5 text-teal-600" />;
  if (lower.includes("lingkungan") || lower.includes("energi")) return <Droplet className="w-5 h-5 text-blue-600" />;
  if (lower.includes("sosial") || lower.includes("komunitas")) return <Users className="w-5 h-5 text-indigo-600" />;
  return <Zap className="w-5 h-5 text-amber-600" />;
}

// Map DB status string → display label
function toDisplayStatus(status?: string): "AKTIF" | "MENUNGGU REVIEW" | "DIARSIPKAN" {
  return "AKTIF"; // All DB challenges are considered active; extend with a status field later
}

interface ChallengeTableProps {
  challenges: ApiChallenge[];
  onEditChallenge: (c: ApiChallenge) => void;
  onRefresh: () => void;
}

export function ChallengeTable({ challenges, onEditChallenge, onRefresh }: ChallengeTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = challenges.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus challenge ini?")) return;
    setDeletingId(id);
    const result = await deleteChallenge(id);
    setDeletingId(null);
    if (result.success) {
      onRefresh();
    } else {
      alert("Gagal menghapus: " + result.error);
    }
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
              placeholder="Cari challenge..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs font-semibold px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] cursor-pointer"
          >
            <option value="all">Semua kategori</option>
            {challengeCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition-all cursor-pointer">
          <Filter className="w-4 h-4" />
          <span>Filter Lanjutan</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nama Challenge</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Poin</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Partisipan</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-xs text-slate-400 font-semibold">
                  Tidak ada challenge ditemukan
                </td>
              </tr>
            )}
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-xs select-none">
                      {getCategoryIcon(row.category)}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-800">{row.title}</span>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5 truncate max-w-[180px]">
                        {row.location} · {row.duration} hari
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs font-semibold text-slate-500">{row.category}</td>
                <td className="px-6 py-4">
                  <Badge status={toDisplayStatus()} />
                </td>
                <td className="px-6 py-4 text-sm font-extrabold text-slate-700 text-right select-none">
                  {row.points.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4 text-sm font-extrabold text-slate-700 text-right select-none">
                  {(row._count?.submissions ?? 0).toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEditChallenge(row)}
                      className="p-1.5 hover:bg-slate-100 rounded-md text-slate-400 hover:text-[#00473e] transition-colors cursor-pointer"
                      title="Edit challenge"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={deletingId === row.id}
                      className="p-1.5 hover:bg-red-50 rounded-md text-slate-400 hover:text-red-600 transition-colors cursor-pointer disabled:opacity-40"
                      title="Hapus challenge"
                    >
                      {deletingId === row.id
                        ? <Loader2 className="w-4 h-4 animate-spin" />
                        : <Trash2 className="w-4 h-4" />}
                    </button>
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
          Menampilkan {filtered.length} dari {challenges.length} challenge
        </p>
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-lg text-xs font-bold bg-[#00473e] text-white flex items-center justify-center select-none">1</button>
          <button className="p-1.5 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
