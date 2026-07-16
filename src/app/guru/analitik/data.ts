// ─── Types ─────────────────────────────────────────────────────────────────

export type SiswaTrend = "naik" | "turun" | "stagnan";

export interface SiswaBimbingan {
  id: string;
  initials: string;
  initialsBg: string;
  name: string;
  hcs: number;
  trend: SiswaTrend;
  trendLabel?: string;
}

export interface RadarDataItem {
  subject: string;
  value: number;
  fullMark: number;
}

export interface TrendDataItem {
  bulan: string;
  hcs: number;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const analyticsKPI = {
  rataHcs: 77.1,
  hcsChange: "+2.4% bln lalu",
  siswaBimbinganAktif: 14,
  perluPerhatian: 2,
};

export const siswaBimbinganList: SiswaBimbingan[] = [
  { id: "1", initials: "AF", initialsBg: "bg-[#00473e] text-white", name: "Ariq Fadillah", hcs: 81, trend: "naik" },
  { id: "2", initials: "BW", initialsBg: "bg-slate-200 text-slate-700", name: "Bagas Wirawan", hcs: 54, trend: "turun", trendLabel: "Menurun" },
  { id: "3", initials: "SP", initialsBg: "bg-slate-200 text-slate-700", name: "Siti Putri", hcs: 75, trend: "stagnan" },
  { id: "4", initials: "NA", initialsBg: "bg-slate-200 text-slate-700", name: "Nadhif Alfasya", hcs: 79, trend: "naik" },
  { id: "5", initials: "BS", initialsBg: "bg-slate-200 text-slate-700", name: "Beni Setiawan", hcs: 68, trend: "naik" },
];

export const siswaTambahan = 11;

export const radarDataAriq: RadarDataItem[] = [
  { subject: "Leadership", value: 82, fullMark: 100 },
  { subject: "Komunikasi", value: 90, fullMark: 100 },
  { subject: "Kolaborasi", value: 78, fullMark: 100 },
  { subject: "Kreativitas", value: 72, fullMark: 100 },
  { subject: "Problem Solving", value: 76, fullMark: 100 },
];

export const trendDataAriq: TrendDataItem[] = [
  { bulan: "Mar", hcs: 68 },
  { bulan: "Apr", hcs: 71 },
  { bulan: "Mei", hcs: 73 },
  { bulan: "Jun", hcs: 76 },
  { bulan: "Jul", hcs: 79 },
  { bulan: "Agu", hcs: 81 },
];

export const targetKuartal = 85;
export const statusOnTrack = "ON TRACK";

export const aiRekomendasiAnalitik =
  "Ariq menunjukkan potensi besar di Leadership. Berikan tantangan untuk memimpin proyek kelompok bulan depan untuk meningkatkan skill Manajemen Konflik.";

export const jadwalSesi = {
  title: "Jadwal Sesi 1-on-1",
  desc: "Besok, 10:00 WIB bersama Bagas Wirawan",
};
