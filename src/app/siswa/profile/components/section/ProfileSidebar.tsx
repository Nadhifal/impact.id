import React from "react";
import Image from "next/image";
import Link from "next/link";
import { User, FileText, Gift, Award, CheckCircle, Star, Edit3, Heart } from "lucide-react";
import { studentAccount } from "@/app/shared/data";
import { Card } from "@/app/guru/verifikasi/components/ui/Card";
import { Button } from "@/app/shared/components/ui/button";

export const ProfileSidebar: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="p-6 text-center flex flex-col items-center border border-slate-100 shadow-xs">
        {/* Avatar with verify check */}
        <div className="relative w-24 h-24 rounded-full border-4 border-[#e6f4f1] mb-4">
          <Image
            src={studentAccount.avatarUrl}
            alt={studentAccount.name}
            fill
            className="object-cover rounded-full"
            unoptimized
          />
          <div className="absolute bottom-0 right-0 bg-[#00473e] text-white p-1 rounded-full border-2 border-white">
            <CheckCircle className="w-3.5 h-3.5 fill-white text-[#00473e]" />
          </div>
        </div>

        {/* User Info */}
        <h2 className="text-lg font-bold text-slate-800 leading-tight">
          {studentAccount.name}
        </h2>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          {studentAccount.role}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4">
          {studentAccount.tags.map((tag, idx) => (
            <span
              key={idx}
              className={`text-[9px] font-bold px-2 py-1 rounded ${
                idx === 0
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  : "bg-slate-50 text-slate-600 border border-slate-100"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Edit Profile Button */}
        <Link href="/siswa/settings" className="w-full mt-6">
          <Button variant="primary" className="w-full py-2.5 text-xs font-bold gap-2 rounded-xl bg-primary">
            <span>Edit Profile</span>
            <Edit3 className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </Card>

      {/* Impact Statistics */}
      <Card className="p-6 border border-slate-100 shadow-xs">
        <h3 className="text-[10px] font-extrabold text-slate-400 tracking-wider uppercase mb-4">
          Impact Statistics
        </h3>

        <div className="space-y-4">
          {/* Stat 1 */}
          <div className="flex items-center gap-3 bg-[#f8fafb] hover:bg-slate-50 p-3.5 rounded-xl border border-slate-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-emerald-600/10" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-bold leading-none">Impact Score</p>
              <h4 className="text-base font-extrabold text-slate-850 mt-1 leading-none">
                {studentAccount.points.toLocaleString("id-ID")}
              </h4>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-1 rounded">
              +12%
            </span>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3 bg-[#f8fafb] hover:bg-slate-50 p-3.5 rounded-xl border border-slate-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-bold leading-none">Projects Verified</p>
              <h4 className="text-base font-extrabold text-slate-850 mt-1 leading-none">
                {studentAccount.challengesCompleted}
              </h4>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3 bg-[#f8fafb] hover:bg-slate-50 p-3.5 rounded-xl border border-slate-50 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 fill-indigo-600/10" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-bold leading-none">Hours of Impact</p>
              <h4 className="text-base font-extrabold text-slate-850 mt-1 leading-none">
                {studentAccount.hoursOfImpact} <span className="text-xs font-semibold text-slate-400">hrs</span>
              </h4>
            </div>
          </div>
        </div>
      </Card>

      {/* Profile Sidebar Navigation */}
      <div className="space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-white font-semibold text-xs rounded-xl transition-all cursor-pointer">
          <User className="w-4 h-4" />
          <span>Overview</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-555 hover:text-slate-800 font-semibold text-xs rounded-xl transition-all cursor-pointer">
          <FileText className="w-4 h-4" />
          <span>Documents</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-slate-555 hover:text-slate-800 font-semibold text-xs rounded-xl transition-all cursor-pointer">
          <Gift className="w-4 h-4" />
          <span>Rewards</span>
        </button>
      </div>
    </div>
  );
};
