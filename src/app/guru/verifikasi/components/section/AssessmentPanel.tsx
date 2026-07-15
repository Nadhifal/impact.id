import React from "react";
import { Maximize2, Eye, CheckCircle2 } from "lucide-react";
import { Submission } from "../../data";
import { Card } from "../ui/Card";
import { Button } from "@/app/shared/components/ui/button";
import { ProgressBar } from "../ui/ProgressBar";

interface AssessmentPanelProps {
  submission: Submission;
  onUpdateScores: (scores: Submission["scores"]) => void;
  onUpdateFeedback: (feedback: string) => void;
  onApprove: () => void;
  onReject: () => void;
}

export const AssessmentPanel: React.FC<AssessmentPanelProps> = ({
  submission,
  onUpdateScores,
  onUpdateFeedback,
  onApprove,
  onReject,
}) => {
  const handleScoreChange = (key: keyof Submission["scores"], value: number) => {
    onUpdateScores({
      ...submission.scores,
      [key]: value,
    });
  };

  return (
    <Card className="p-6 flex flex-col gap-6 shadow-sm border border-slate-100">
      {/* Panel Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-slate-800">
          Penilaian: {submission.name}
        </h2>
        <button className="p-1.5 hover:bg-slate-50 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Bukti Laporan Card */}
      <div className="bg-[#f8fafb] border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* PDF icon background */}
          <div className="w-10 h-10 bg-red-50 text-red-500 rounded-lg flex items-center justify-center font-bold text-[10px]">
            PDF
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 break-all">
              {submission.file.name}
            </h4>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
              {submission.file.size}
            </p>
          </div>
        </div>

        <Button variant="secondary" size="sm" className="gap-1.5 py-1.5 px-3">
          <Eye className="w-3.5 h-3.5" />
          <span>Lihat Pratinjau</span>
        </Button>
      </div>

      {/* Progress Bars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
        <ProgressBar
          label="Leadership"
          value={submission.scores.leadership}
          onChange={(val) => handleScoreChange("leadership", val)}
        />
        <ProgressBar
          label="Komunikasi"
          value={submission.scores.komunikasi}
          onChange={(val) => handleScoreChange("komunikasi", val)}
        />
        <ProgressBar
          label="Problem Solving"
          value={submission.scores.problemSolving}
          onChange={(val) => handleScoreChange("problemSolving", val)}
        />
        <ProgressBar
          label="Kreativitas"
          value={submission.scores.kreativitas}
          onChange={(val) => handleScoreChange("kreativitas", val)}
        />
        <div className="md:col-span-2">
          <ProgressBar
            label="Kolaborasi"
            value={submission.scores.kolaborasi}
            onChange={(val) => handleScoreChange("kolaborasi", val)}
          />
        </div>
      </div>

      {/* Feedback Textarea */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-slate-700">
          Catatan feedback untuk siswa (Rekomendasi dan feedback)
        </label>
        <textarea
          rows={4}
          value={submission.feedback}
          onChange={(e) => onUpdateFeedback(e.target.value)}
          placeholder="Berikan feedback yang membangun untuk pengembangan siswa..."
          className="w-full bg-[#f8fafb] border border-slate-100 hover:border-slate-200 focus:border-primary/50 focus:bg-white rounded-xl p-4 text-xs text-slate-700 placeholder-slate-400 outline-hidden transition-all resize-none"
        />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <Button variant="outline" onClick={onReject} className="py-2.5">
          Minta revisi
        </Button>
        <Button variant="primary" onClick={onApprove} className="gap-2 py-2.5">
          <span>Setujui</span>
          <CheckCircle2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
