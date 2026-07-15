"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { ChallengeKPICards } from "./components/section/ChallengeKPICards";
import { ChallengeTable } from "./components/section/ChallengeTable";
import { AddChallengeModal } from "./components/section/AddChallengeModal";
import { ApiChallenge, fetchChallenges } from "@/lib/api";

export default function AdminManageChallengePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<ApiChallenge | null>(null);
  const [challenges, setChallenges] = useState<ApiChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  const loadChallenges = useCallback(async () => {
    setLoading(true);
    const data = await fetchChallenges();
    setChallenges(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  const handleAddChallenge = () => {
    setEditingChallenge(null);
    setIsModalOpen(true);
  };

  const handleEditChallenge = (challenge: ApiChallenge) => {
    setEditingChallenge(challenge);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingChallenge(null);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Manage challenge</h2>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Pantau, verifikasi, dan kelola semua program challenge aktif.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadChallenges}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-semibold transition-colors cursor-pointer disabled:opacity-40"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleAddChallenge}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#00473e] hover:bg-[#003830] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer w-full sm:w-auto justify-center shadow-md group"
          >
            <span>Tambah challenge</span>
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-250" />
          </button>
        </div>
      </div>

      {/* KPI Stats — pass live count to component */}
      <ChallengeKPICards totalChallenges={challenges.length} />

      {/* Filterable Table — pass live challenges */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-semibold">Memuat data challenge...</span>
        </div>
      ) : (
        <ChallengeTable
          challenges={challenges}
          onEditChallenge={handleEditChallenge}
          onRefresh={loadChallenges}
        />
      )}

      {/* Create / Edit Modal Dialog */}
      <AddChallengeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        initialData={editingChallenge}
        onSuccess={loadChallenges}
      />
    </div>
  );
}
