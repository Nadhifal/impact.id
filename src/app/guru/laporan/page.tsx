"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BuatLaporanSiswaSection } from "./components/section/BuatLaporanSiswaSection";
import { RingkasanCapaianSection } from "./components/section/RingkasanCapaianSection";
import { RiwayatLaporanTable } from "./components/section/RiwayatLaporanTable";
import { SiswaOption } from "./data";
import { useUser } from "@/app/shared/context/AuthContext";

export default function LaporanCapaianPage() {
  const [selectedSiswaId, setSelectedSiswaId] = useState("1");
  const [siswaOptions, setSiswaOptions] = useState<SiswaOption[]>([]);
  const [laporanData, setLaporanData] = useState<any>(null);
  const { user } = useUser();

  const fetchStudents = useCallback(async () => {
    try {
      const params = user?.id ? `?teacherId=${user.id}` : "";
      const res = await fetch(`/api/guru/students${params}`);
      const json = await res.json();
      if (json.success && json.data.students.length > 0) {
        const options: SiswaOption[] = json.data.students.map((s: any) => ({
          id: s.id,
          name: s.name,
        }));
        setSiswaOptions(options);
        setSelectedSiswaId(options[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  }, [user?.id]);

  const fetchLaporanData = useCallback(async () => {
    try {
      const res = await fetch(`/api/guru/laporan`);
      const json = await res.json();
      if (json.success) {
        setLaporanData(json.data);
      }
    } catch (err) {
      console.error("Failed to fetch laporan data:", err);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
    fetchLaporanData();
  }, [fetchStudents, fetchLaporanData]);

  const selectedSiswa = siswaOptions.find((s) => s.id === selectedSiswaId) ?? siswaOptions[0];

  // Filter current student's capaian summary from API
  const studentCapaian = laporanData?.summaries?.find((s: any) => s.id === selectedSiswaId)?.capaian;
  // Filter current student's riwayat from API
  const studentRiwayat = laporanData?.riwayat?.filter((r: any) => r.studentId === selectedSiswaId) ?? [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Laporan capaian
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Kelola dan unduh laporan progres akademik siswa bimbingan Anda.
        </p>
      </div>

      {/* Buat Laporan Form */}
      <BuatLaporanSiswaSection />

      {/* Ringkasan Capaian */}
      {selectedSiswa && (
        <RingkasanCapaianSection
          siswaName={selectedSiswa.name}
          capaian={studentCapaian}
        />
      )}

      {/* Riwayat Laporan */}
      {selectedSiswa && (
        <RiwayatLaporanTable
          riwayat={studentRiwayat}
        />
      )}
    </div>
  );
}
