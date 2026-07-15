"use client";

import React, { useState } from "react";
import { Card } from "../ui/Card";
import { filterDistricts, filterLevels, filterSemesters } from "../../data";

export function AnalyticsFilters() {
  const [district, setDistrict] = useState(filterDistricts[0].value);
  const [level, setLevel] = useState(filterLevels[0].value);
  const [semester, setSemester] = useState(filterSemesters[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Filters applied:", { district, level, semester });
  };

  return (
    <Card className="p-5 border-slate-200">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5 items-end">
        {/* District Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Kabupaten / Kota
          </label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all cursor-pointer"
          >
            {filterDistricts.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Level Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Jenjang
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all cursor-pointer"
          >
            {filterLevels.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Semester Selector */}
        <div className="space-y-2">
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full text-xs font-semibold px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00473e]/20 focus:border-[#00473e] transition-all cursor-pointer"
          >
            {filterSemesters.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Action Button */}
        <div>
          <button
            type="submit"
            className="w-full text-xs font-bold py-2.5 bg-white border border-[#00473e] text-[#00473e] hover:bg-[#00473e]/5 rounded-lg transition-colors cursor-pointer text-center"
          >
            Terapkan Filter
          </button>
        </div>
      </form>
    </Card>
  );
}
