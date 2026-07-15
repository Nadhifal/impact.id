import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Stats } from "../../data";
import { Card } from "../ui/Card";

interface StatsRowProps {
  stats: Stats;
}

export const StatsRow: React.FC<StatsRowProps> = ({ stats }) => {
  const challengeProgress = (stats.challengesCompleted / stats.challengesTarget) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Average HCS Card */}
      <Card className="p-6 flex flex-col justify-between h-[130px] border border-slate-100 shadow-xs">
        <h4 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase leading-none">
          Rata-rata HCS Siswa Bimbingan
        </h4>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-3xl font-extrabold text-slate-800">
            {stats.averageHcs.toLocaleString("id-ID", { minimumFractionDigits: 1 })}
          </span>
          <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded gap-0.5">
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            {stats.hcsChange}
          </span>
        </div>
      </Card>

      {/* Challenges Completed Card */}
      <Card className="p-6 flex flex-col justify-between h-[130px] border border-slate-100 shadow-xs">
        <h4 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase leading-none">
          Challenge Diselesaikan Bulan Ini
        </h4>
        <div className="mt-4">
          <div className="text-xl font-bold text-slate-800">
            {stats.challengesCompleted} <span className="text-sm font-medium text-slate-400">/ {stats.challengesTarget} target</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-slate-150 h-2 rounded-full overflow-hidden mt-3">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${challengeProgress}%` }}
            />
          </div>
        </div>
      </Card>

      {/* Call to Action Progress Analytics Card */}
      <div className="bg-primary hover:bg-[#00362f] text-white rounded-xl p-6 flex flex-col justify-between h-[130px] cursor-pointer shadow-sm active:scale-[0.99] transition-all duration-200 group">
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm tracking-wide">
            Lihat analitik progres
          </span>
          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
        <p className="text-[11px] text-[#8ce1d5] font-medium leading-relaxed max-w-[220px]">
          Pantau perkembangan kelas Anda secara detail
        </p>
      </div>
    </div>
  );
};
