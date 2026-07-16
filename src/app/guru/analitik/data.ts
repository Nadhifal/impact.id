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
  rataHcs: 79.4,
  hcsChange: "+3.1% bln lalu",
  siswaBimbinganAktif: 18,
  perluPerhatian: 3,
};

export const siswaBimbinganList: SiswaBimbingan[] = [
  { id: "1", initials: "NA", initialsBg: "bg-[#00473e] text-white",       name: "Nadhif Alfasya",    hcs: 89, trend: "naik" },
  { id: "2", initials: "SD", initialsBg: "bg-[#00473e] text-white",       name: "Sari Dewi Putri",   hcs: 86, trend: "naik" },
  { id: "3", initials: "AR", initialsBg: "bg-slate-200 text-slate-700",   name: "Alya Ramadhani",    hcs: 82, trend: "naik" },
  { id: "4", initials: "RM", initialsBg: "bg-slate-200 text-slate-700",   name: "Rizky Maulana",     hcs: 78, trend: "stagnan" },
  { id: "5", initials: "DA", initialsBg: "bg-slate-200 text-slate-700",   name: "Dimas Arya Pratama",hcs: 75, trend: "naik" },
  { id: "6", initials: "FH", initialsBg: "bg-slate-200 text-slate-700",   name: "Farah Hasanah",     hcs: 73, trend: "naik" },
  { id: "7", initials: "YP", initialsBg: "bg-slate-200 text-slate-700",   name: "Yoga Pratama",      hcs: 70, trend: "stagnan" },
  { id: "8", initials: "BW", initialsBg: "bg-red-100 text-red-700",       name: "Bagas Wirawan",     hcs: 51, trend: "turun", trendLabel: "Menurun" },
  { id: "9", initials: "CR", initialsBg: "bg-red-100 text-red-700",       name: "Cinta Ramadhani",   hcs: 56, trend: "stagnan", trendLabel: "Stagnan" },
  { id: "10",initials: "EP", initialsBg: "bg-red-100 text-red-700",       name: "Eko Prasetyo",      hcs: 48, trend: "turun", trendLabel: "Menurun" },
];

export const siswaTambahan = 8;

// Radar for top student: Nadhif Alfasya
export const radarDataNadhif: RadarDataItem[] = [
  { subject: "Leadership",     value: 82, fullMark: 100 },
  { subject: "Komunikasi",     value: 79, fullMark: 100 },
  { subject: "Kolaborasi",     value: 88, fullMark: 100 },
  { subject: "Kreativitas",    value: 74, fullMark: 100 },
  { subject: "Problem Solving",value: 71, fullMark: 100 },
];

export const trendDataNadhif: TrendDataItem[] = [
  { bulan: "Feb", hcs: 74 },
  { bulan: "Mar", hcs: 77 },
  { bulan: "Apr", hcs: 80 },
  { bulan: "Mei", hcs: 83 },
  { bulan: "Jun", hcs: 86 },
  { bulan: "Jul", hcs: 89 },
];

export const targetKuartal = 90;
export const statusOnTrack = "ON TRACK";

export const aiRekomendasiAnalitik =
  "Nadhif menunjukkan pertumbuhan konsisten di Kolaborasi dan Leadership. Rekomendasikan challenge memimpin kelompok lintas sekolah — ini akan mendorong skor Problem Solving yang masih bisa ditingkatkan.";

export const jadwalSesi = {
  title: "Jadwal Sesi 1-on-1",
  desc: "Besok, 09:00 WIB bersama Bagas Wirawan — sesi intervensi penurunan HCS",
};
