"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnalitikKPIRow } from "./components/section/AnalitikKPIRow";
import { DaftarSiswaCard } from "./components/section/DaftarSiswaCard";
import { ProgresDetailPanel } from "./components/section/ProgresDetailPanel";
import { Plus, RefreshCw } from "lucide-react";
import { useUser } from "@/app/shared/context/AuthContext";

export default function AnalitikProgresPage() {
  const [selectedId, setSelectedId] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [studentDetail, setStudentDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchStudents = useCallback(async () => {
    setLoading(true);
    try {
      const params = user?.id ? `?teacherId=${user.id}` : "";
      const res = await fetch(`/api/guru/students${params}`);
      const json = await res.json();
      if (json.success && json.data.students.length > 0) {
        setStudents(json.data.students);
        if (!selectedId) {
          setSelectedId(json.data.students[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to fetch students:", err);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const fetchDetail = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/guru/students/${id}`);
      const json = await res.json();
      if (json.success) {
        setStudentDetail(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch student detail:", err);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    if (selectedId) {
      fetchDetail(selectedId);
    }
  }, [selectedId, fetchDetail]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full relative">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Analitik progres siswa
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Pantau perkembangan kompetensi dan capaian HCS siswa bimbingan Anda secara real-time.
        </p>
      </div>

      {/* KPI Row — still uses static as fallback, data enriched by API */}
      <AnalitikKPIRow />

      {/* Main Content: Daftar Siswa + Detail */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-slate-400">
          <RefreshCw className="w-5 h-5 animate-spin mr-2" />
          <span className="text-sm font-semibold">Memuat data siswa...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4">
            <DaftarSiswaCard selectedId={selectedId} onSelect={setSelectedId} students={students} />
          </div>
          <div className="lg:col-span-8">
            <ProgresDetailPanel selectedId={selectedId} studentDetail={studentDetail} />
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#00473e] hover:bg-[#003830] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer z-40 group"
        aria-label="Input Penilaian"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200" />
      </button>
    </div>
  );
}
