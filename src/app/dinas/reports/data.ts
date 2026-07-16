// ─── Types ───────────────────────────────────────────────────────────────────

export type ReportFormat = "PDF" | "Excel" | "CSV";

export interface ReportHistoryItem {
  id: string;
  name: string;
  periode: string;
  format: ReportFormat;
  createdAt: string;
}

export type JenisLaporan =
  | "Rekap kualitas SDM"
  | "Distribusi HCS"
  | "Monitoring Program"
  | "Sarana Prasarana";

export interface FilterOption {
  value: string;
  label: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const wilayahOptions: FilterOption[] = [
  { value: "all", label: "Semua wilayah" },
  { value: "kota-serang", label: "Kota Serang" },
  { value: "kab-serang", label: "Kab. Serang" },
  { value: "kab-pandeglang", label: "Kab. Pandeglang" },
  { value: "kab-lebak", label: "Kab. Lebak" },
];

export const periodeOptions: FilterOption[] = [
  { value: "genap-2026", label: "Semester genap 2026" },
  { value: "ganjil-2025", label: "Semester ganjil 2025" },
  { value: "genap-2025", label: "Semester genap 2025" },
  { value: "ganjil-2024", label: "Semester ganjil 2024" },
];

export const jenisLaporanList: JenisLaporan[] = [
  "Rekap kualitas SDM",
  "Distribusi HCS",
  "Monitoring Program",
  "Sarana Prasarana",
];

export const reportHistoryData: ReportHistoryItem[] = [
  {
    id: "1",
    name: "Rekap kualitas SDM – Kota Serang",
    periode: "Smt genap 2026",
    format: "PDF",
    createdAt: "15 Jul 2026",
  },
  {
    id: "2",
    name: "Distribusi HCS per sekolah",
    periode: "Smt genap 2026",
    format: "Excel",
    createdAt: "10 Jul 2026",
  },
  {
    id: "3",
    name: "Progres monitoring program",
    periode: "Smt ganjil 2025",
    format: "CSV",
    createdAt: "2 Feb 2026",
  },
  {
    id: "4",
    name: "Sarana Prasarana – Kab. Lebak",
    periode: "Smt ganjil 2025",
    format: "Excel",
    createdAt: "18 Jan 2026",
  },
  {
    id: "5",
    name: "Rekap kualitas SDM – Semua wilayah",
    periode: "Smt genap 2025",
    format: "PDF",
    createdAt: "5 Agu 2025",
  },
];
