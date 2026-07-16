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
  { id: "1", name: "Ariq Fadillah" },
  { id: "2", name: "Bagas Wirawan" },
  { id: "3", name: "Siti Putri" },
  { id: "4", name: "Nadhif Alfasya" },
  { id: "5", name: "Beni Setiawan" },
];

export const periodeOptions: PeriodeOption[] = [
  { value: "genap-2026", label: "Semester genap 2026" },
  { value: "ganjil-2025", label: "Semester ganjil 2025" },
  { value: "genap-2025", label: "Semester genap 2025" },
  { value: "ganjil-2024", label: "Semester ganjil 2024" },
];

export const capaianKPIData: CapaianKPI[] = [
  { icon: "challenge", label: "Challenge selesai", value: 9, badge: "+12% mom", badgeColor: "green" },
  { icon: "hcs", label: "HCS terkini", value: 81, badge: "Target: 85", badgeColor: "gray" },
  { icon: "sertifikat", label: "Sertifikat terbit", value: 6, badge: "Valid", badgeColor: "green" },
];

export const riwayatLaporanData: RiwayatLaporan[] = [
  { id: "1", format: "PDF", name: "Capaian Ariq Fadillah", periode: "Smt genap 2026", createdAt: "15 Jul 2026" },
  { id: "2", format: "PDF", name: "Capaian Ariq Fadillah", periode: "Smt ganjil 2025", createdAt: "2 Feb 2026" },
  { id: "3", format: "Excel", name: "Capaian Ariq Fadillah – Excel", periode: "Smt ganjil 2025", createdAt: "1 Feb 2026" },
  { id: "4", format: "PDF", name: "Capaian Ariq Fadillah", periode: "Smt genap 2025", createdAt: "10 Agu 2025" },
  { id: "5", format: "Excel", name: "Capaian Ariq Fadillah – Excel", periode: "Smt genap 2025", createdAt: "9 Agu 2025" },
  { id: "6", format: "PDF", name: "Capaian Ariq Fadillah", periode: "Smt ganjil 2024", createdAt: "3 Feb 2025" },
];
