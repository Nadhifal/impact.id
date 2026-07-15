"use client";

import React, { useState } from "react";
import { Sidebar } from "./components/section/Sidebar";
import { Header } from "./components/section/Header";
import { SubmissionList } from "./components/section/SubmissionList";
import { AssessmentPanel } from "./components/section/AssessmentPanel";
import { StatsRow } from "./components/section/StatsRow";
import { dummySubmissions, dummyStats, Submission } from "./data";

export default function VerificationPage() {
  const [submissions, setSubmissions] = useState<Submission[]>(dummySubmissions);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [stats, setStats] = useState(dummyStats);
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const activeSubmission = submissions.find((sub) => sub.id === selectedId) || submissions[0];

  const showToast = (message: string, type: "success" | "info" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSelectSubmission = (submission: Submission) => {
    setSelectedId(submission.id);
  };

  const handleUpdateScores = (newScores: Submission["scores"]) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === activeSubmission.id ? { ...sub, scores: newScores } : sub))
    );
  };

  const handleUpdateFeedback = (newFeedback: string) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === activeSubmission.id ? { ...sub, feedback: newFeedback } : sub))
    );
  };

  const handleApprove = () => {
    showToast(`Submission "${activeSubmission.name}" berhasil disetujui!`, "success");
    // Update status to normal and clear badge/update stats if needed
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === activeSubmission.id ? { ...sub, status: "normal" } : sub
      )
    );
  };

  const handleReject = () => {
    showToast(`Revisi dikirimkan untuk "${activeSubmission.name}".`, "info");
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === activeSubmission.id ? { ...sub, status: "revisi" } : sub
      )
    );
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Count pending submissions
  const pendingCount = submissions.filter((sub) => sub.status === "baru").length;

  return (
    <div className="flex bg-[#f8fafb] min-h-screen text-slate-800 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce bg-[#00473e] text-white border border-[#8ce1d5]/30 px-5 py-3.5 rounded-xl shadow-lg flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#8ce1d5]" />
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Scroll Container */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header */}
        <Header pendingCount={pendingCount} onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Dashboard Grid */}
        <main className="flex-1 p-8 space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Left Column: Submission List */}
            <div className="xl:col-span-4">
              <SubmissionList
                submissions={submissions}
                selectedId={activeSubmission.id}
                onSelect={handleSelectSubmission}
              />
            </div>

            {/* Right Column: Assessment Detail */}
            <div className="xl:col-span-8">
              <AssessmentPanel
                submission={activeSubmission}
                onUpdateScores={handleUpdateScores}
                onUpdateFeedback={handleUpdateFeedback}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>
          </div>

          {/* Bottom Statistics Section */}
          <StatsRow stats={stats} />
        </main>
      </div>
    </div>
  );
}
