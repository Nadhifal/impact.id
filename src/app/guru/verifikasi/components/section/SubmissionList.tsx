import React, { useState } from "react";
import { Clock } from "lucide-react";
import { Submission } from "../../data";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

interface SubmissionListProps {
  submissions: Submission[];
  selectedId: string;
  onSelect: (submission: Submission) => void;
}

export const SubmissionList: React.FC<SubmissionListProps> = ({
  submissions,
  selectedId,
  onSelect,
}) => {
  const [showAll, setShowAll] = useState(false);

  // Show first 3 submissions, or all of them if showAll is true
  const displayedSubmissions = showAll ? submissions : submissions.slice(0, 3);
  const remainingCount = submissions.length - 3;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Submissions List */}
      <div className="space-y-3">
        {displayedSubmissions.map((submission) => {
          const isActive = submission.id === selectedId;

          return (
            <Card
              key={submission.id}
              isActive={isActive}
              onClick={() => onSelect(submission)}
              className="p-4 flex gap-4 items-start relative select-none"
            >
              {/* Avatar Initial Circle */}
              <div className="w-10 h-10 rounded-full bg-[#e0f2fe] text-[#0369a1] font-bold text-xs flex items-center justify-center shrink-0">
                {submission.initials}
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 pr-12">
                <h3 className="text-sm font-bold text-slate-800 truncate">
                  {submission.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 truncate">
                  {submission.projectTitle}
                </p>
                <div className="flex items-center gap-1 text-slate-400 mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-medium">
                    {submission.timeAgo}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              {submission.status === "baru" && (
                <div className="absolute top-4 right-4">
                  <Badge variant="primary">BARU</Badge>
                </div>
              )}
              {submission.status === "revisi" && (
                <div className="absolute top-4 right-4">
                  <Badge variant="danger">REVISI</Badge>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Expand/Collapse Button */}
      {remainingCount > 0 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-bold text-primary hover:text-[#00362f] text-center py-2 transition-colors cursor-pointer"
        >
          {showAll ? "Tampilkan lebih sedikit" : `+${remainingCount} submission lainnya`}
        </button>
      )}
    </div>
  );
};
