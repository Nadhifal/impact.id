export interface ChallengeKPI {
  title: string;
  value: number;
  label: string;
  badgeText?: string;
  badgeType?: "info" | "success" | "danger" | "neutral";
  type: "total" | "active" | "review" | "archived";
}

export interface ChallengeItem {
  id: string;
  title: string;
  category: string;
  status: "AKTIF" | "MENUNGGU REVIEW" | "DIARSIPKAN";
  participants: number;
  iconName: "store" | "droplet" | "users" | "zap";
}

export const challengeKpis: ChallengeKPI[] = [
  {
    title: "Total challenge",
    value: 148,
    label: "Global",
    badgeText: "+12 bulan ini",
    badgeType: "info",
    type: "total",
  },
  {
    title: "Aktif",
    value: 112,
    label: "Sedang berjalan",
    type: "active",
  },
  {
    title: "Menunggu review",
    value: 9,
    label: "Segera tindak",
    badgeText: "Urgent",
    badgeType: "danger",
    type: "review",
  },
  {
    title: "Diarsipkan",
    value: 27,
    label: "Challenge selesai",
    badgeText: "History",
    badgeType: "neutral",
    type: "archived",
  },
];

export const challengesData: ChallengeItem[] = [
  {
    id: "ch-1",
    title: "UMKM pemasaran digital",
    category: "Kewirausahaan",
    status: "AKTIF",
    participants: 412,
    iconName: "store",
  },
  {
    id: "ch-2",
    title: "Observasi sampah rumah tangga",
    category: "Lingkungan",
    status: "AKTIF",
    participants: 298,
    iconName: "droplet",
  },
  {
    id: "ch-3",
    title: "Literasi digital lansia",
    category: "Sosial",
    status: "MENUNGGU REVIEW",
    participants: 0,
    iconName: "users",
  },
  {
    id: "ch-4",
    title: "Kampanye hemat energi",
    category: "Lingkungan",
    status: "DIARSIPKAN",
    participants: 187,
    iconName: "zap",
  },
];

export const challengeCategories = [
  "Kewirausahaan",
  "Lingkungan",
  "Sosial",
  "Edukasi",
  "Kesehatan",
];

export const difficultyLevels = ["Mudah", "Menengah", "Sulit"];

export const targetAudiences = ["Semua tingkat", "Pemula", "Lanjutan"];

export const publicationStatuses = ["Simpan sebagai draf", "Publikasikan langsung"];
