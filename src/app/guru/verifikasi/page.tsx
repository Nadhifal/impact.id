"use client";

import React, { useState } from "react";
import { SubmissionList } from "./components/section/SubmissionList";
import { AssessmentPanel } from "./components/section/AssessmentPanel";
import { StatsRow } from "./components/section/StatsRow";
import { Submission } from "./data";
import { useUser } from "@/app/shared/context/AuthContext";
import type { Stats } from "./data";

export default function VerificationPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/guru/verifikasi");
      const json = await res.json();
      if (json.success) {
        setStats({
          averageHcs: json.data.averageHcs,
          hcsChange: json.data.hcsChange,
          challengesCompleted: json.data.challengesCompleted,
          challengesTarget: json.data.challengesTarget,
        });
      }
    } catch (err) {
      console.error("Failed to fetch verifikasi stats:", err);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/submissions");
      const json = await res.json();
      if (json.success) {
        const mapped: Submission[] = json.data.map((dbSub: any) => {
          let uiStatus: "baru" | "revisi" | "normal" = "baru";
          if (dbSub.status === "REVISION_REQUESTED") uiStatus = "revisi";
          if (dbSub.status === "COMPLETED") uiStatus = "normal";

          return {
            id: dbSub.id,
            initials: dbSub.user?.name ? dbSub.user.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "JD",
            name: dbSub.user?.name || "Siswa",
            projectTitle: dbSub.challenge?.title || "Challenge",
            timeAgo: new Date(dbSub.updatedAt).toLocaleDateString("id-ID"),
            status: uiStatus,
            file: {
              name: dbSub.proofUrl || "bukti.pdf",
              size: "1.2 MB",
            },
            scores: {
              leadership: dbSub.user?.humanCapitalScore?.leadership || 0,
              komunikasi: dbSub.user?.humanCapitalScore?.communication || 0,
              problemSolving: dbSub.user?.humanCapitalScore?.problemSolving || 0,
              kreativitas: dbSub.user?.humanCapitalScore?.creativity || 0,
              kolaborasi: dbSub.user?.humanCapitalScore?.collaboration || 0,
            },
            feedback: dbSub.verification?.feedback || "",
          };
        });
        setSubmissions(mapped);
        if (mapped.length > 0 && !selectedId) {
          setSelectedId(mapped[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSubmissions();
    fetchStats();
  }, []);

  const activeSubmission = submissions.find((sub) => sub.id === selectedId);

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSelectSubmission = (submission: Submission) => {
    setSelectedId(submission.id);
  };

  const handleUpdateScores = (newScores: Submission["scores"]) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === activeSubmission?.id ? { ...sub, scores: newScores } : sub))
    );
  };

  const handleUpdateFeedback = (newFeedback: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === activeSubmission?.id ? { ...sub, feedback: newFeedback } : sub))
    );
  };

  const handleApprove = async () => {
    if (!activeSubmission) return;
    try {
      let targetTeacherId = user?.id;
      if (!targetTeacherId) {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          if (data.user?.id) targetTeacherId = data.user.id;
        } catch {}
      }
      
      if (!targetTeacherId) {
        alert("Sesi Anda tidak valid. Silakan login kembali.");
        return;
      }

      const response = await fetch(`/api/submissions/${activeSubmission.id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: targetTeacherId,
          feedback: activeSubmission.feedback,
          isApproved: true,
        }),
      });

      if (!response.ok) throw new Error("Gagal memverifikasi di database");

      showToast(`Submission "${activeSubmission.name}" berhasil disetujui!`, "success");
      fetchSubmissions();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleReject = async () => {
    if (!activeSubmission) return;
    try {
      let targetTeacherId = user?.id;
      if (!targetTeacherId) {
        try {
          const res = await fetch("/api/auth/me");
          const data = await res.json();
          if (data.user?.id) targetTeacherId = data.user.id;
        } catch {}
      }
      
      if (!targetTeacherId) {
        alert("Sesi Anda tidak valid. Silakan login kembali.");
        return;
      }

      const response = await fetch(`/api/submissions/${activeSubmission.id}/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teacherId: targetTeacherId,
          feedback: activeSubmission.feedback,
          isApproved: false,
        }),
      });

      if (!response.ok) throw new Error("Gagal mengirimkan revisi ke database");

      showToast(`Revisi dikirimkan untuk "${activeSubmission.name}".`, "info");
      fetchSubmissions();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto w-full">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-[#00473e] text-white border border-[#8ce1d5]/30 px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8ce1d5]" />
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* Title */}
      <div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">
          Verifikasi Submission
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-1">
          Tinjau pengajuan tugas dan berikan penilaian kompetensi serta saran pengembangan.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Submission List */}
        <div className="xl:col-span-4">
          <SubmissionList
            submissions={submissions}
            selectedId={selectedId}
            onSelect={handleSelectSubmission}
          />
        </div>

        {/* Right Column: Assessment Detail */}
        <div className="xl:col-span-8">
          {activeSubmission ? (
            <AssessmentPanel
              submission={activeSubmission}
              onUpdateScores={handleUpdateScores}
              onUpdateFeedback={handleUpdateFeedback}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ) : (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400 font-semibold text-sm">
              {loading ? "Memuat data dari database..." : "Tidak ada submission dari database."}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Statistics Section */}
      {stats && <StatsRow stats={stats} />}
    </div>
  );
}
