"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PilihSiswaList } from "./components/section/PilihSiswaList";
import { FeedbackPanel } from "./components/section/FeedbackPanel";
import { useUser } from "@/app/shared/context/AuthContext";

export default function RekomendasiFeedbackPage() {
  const [selectedId, setSelectedId] = useState("1");
  const { user } = useUser();

  // Pre-fetch students so the list loads from API data
  useEffect(() => {
    async function fetchStudents() {
      try {
        const params = user?.id ? `?teacherId=${user.id}` : "";
        const res = await fetch(`/api/guru/students${params}`);
        const json = await res.json();
        if (json.success && json.data.students.length > 0) {
          setSelectedId(json.data.students[0].id);
        }
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    }
    fetchStudents();
  }, [user?.id]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Rekomendasi dan feedback
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Beri arahan personal untuk mengoptimalkan potensi setiap siswa.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Pilih Siswa */}
        <div className="lg:col-span-4">
          <PilihSiswaList selectedId={selectedId} onSelect={setSelectedId} />
        </div>

        {/* Right: Feedback Panel */}
        <div className="lg:col-span-8">
          <FeedbackPanel selectedId={selectedId} />
        </div>
      </div>
    </div>
  );
}
