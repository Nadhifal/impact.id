// ─── Types ─────────────────────────────────────────────────────────────────

export type LaporanFormat = "PDF" | "Excel";

export interface SiswaOption {
  id: string;
  name: string;
}

export interface PeriodeOption {
  value: string;
  label: string;
}

export interface FormatOption {
  value: LaporanFormat;
  label: string;
}

export interface CapaianKPI {
  icon: "challenge" | "hcs" | "sertifikat";
  label: string;
  value: number;
  badge?: string;
  badgeColor?: "green" | "gray";
}

export interface RiwayatLaporan {
  id: string;
  format: LaporanFormat;
  name: string;
  periode: string;
  createdAt: string;
}

// ─── Data ──────────────────────────────────────────────────────────────────

export const siswaOptions: SiswaOption[] = [
  { id: "1", name: "Nadhif Alfasya" },
  { id: "2", name: "Sari Dewi Putri" },
  { id: "3", name: "Alya Ramadhani" },
  { id: "4", name: "Rizky Maulana" },
  { id: "5", name: "Dimas Arya Pratama" },
  { id: "6", name: "Farah Hasanah" },
  { id: "7", name: "Yoga Pratama" },
  { id: "8", name: "Bagas Wirawan" },
  { id: "9", name: "Cinta Ramadhani" },
  { id: "10", name: "Eko Prasetyo" },
];

export const periodeOptions: PeriodeOption[] = [
  { value: "genap-2026", label: "Semester genap 2026" },
  { value: "ganjil-2025", label: "Semester ganjil 2025" },
  { value: "genap-2025", label: "Semester genap 2025" },
  { value: "ganjil-2024", label: "Semester ganjil 2024" },
];

export const capaianKPIData: CapaianKPI[] = [
  { icon: "challenge", label: "Challenge selesai", value: 12, badge: "+25% mom",    badgeColor: "green" },
  { icon: "hcs",       label: "HCS terkini",       value: 89, badge: "Target: 90",  badgeColor: "gray" },
  { icon: "sertifikat",label: "Sertifikat terbit",  value: 8,  badge: "Valid",       badgeColor: "green" },
];

export const riwayatLaporanData: RiwayatLaporan[] = [
  { id: "1", format: "PDF",   name: "Capaian Nadhif Alfasya",           periode: "Smt genap 2026",  createdAt: "15 Jul 2026" },
  { id: "2", format: "PDF",   name: "Capaian Sari Dewi Putri",          periode: "Smt genap 2026",  createdAt: "12 Jul 2026" },
  { id: "3", format: "Excel", name: "Rekap HCS Seluruh Siswa — Excel",  periode: "Smt genap 2026",  createdAt: "10 Jul 2026" },
  { id: "4", format: "PDF",   name: "Capaian Nadhif Alfasya",           periode: "Smt ganjil 2025", createdAt: "5 Feb 2026" },
  { id: "5", format: "Excel", name: "Rekap HCS Seluruh Siswa — Excel",  periode: "Smt ganjil 2025", createdAt: "3 Feb 2026" },
  { id: "6", format: "PDF",   name: "Capaian Alya Ramadhani",           periode: "Smt ganjil 2025", createdAt: "2 Feb 2026" },
  { id: "7", format: "PDF",   name: "Capaian Nadhif Alfasya",           periode: "Smt genap 2025",  createdAt: "10 Agu 2025" },
];
