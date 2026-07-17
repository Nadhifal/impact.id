export interface CertificateKPI {
  title: string;
  value: string;
  label: string;
  badgeText?: string;
  badgeType?: "info" | "success" | "danger" | "neutral";
  accentColor?: string;
}

export interface CertificateItem {
  id: string;
  studentName: string;
  email: string;
  projectName: string;
  challengeCategory: string;
  status: "DITERBITKAN" | "MENUNGGU AUDIT" | "DITOLAK";
  submitDate: string;
}

export const certKpis: CertificateKPI[] = [
  {
    title: "Total Portofolio",
    value: "6.124",
    label: "Portofolio siswa terdaftar",
  },
  {
    title: "Menunggu Audit",
    value: "27",
    label: "Perlu segera ditinjau",
    badgeText: "Urgent",
    badgeType: "danger",
    accentColor: "border-l-4 border-rose-500",
  },
  {
    title: "Sertifikat Diterbitkan",
    value: "4.821",
    label: "Total sertifikat resmi terbit",
  },
];

export const dummyCertificates: CertificateItem[] = [
  {
    id: "cert-1",
    studentName: "Nadhif Alfasya",
    email: "nadhif@untirta.ac.id",
    projectName: "Kampanye Hemat Energi Lingkungan Rumah",
    challengeCategory: "Lingkungan",
    status: "MENUNGGU AUDIT",
    submitDate: "17 Jul 2026",
  },
  {
    id: "cert-2",
    studentName: "Sari Dewi Putri",
    email: "sari@untirta.ac.id",
    projectName: "Inovasi Pembayaran Digital UMKM Pasar",
    challengeCategory: "Kewirausahaan",
    status: "DITERBITKAN",
    submitDate: "10 Jul 2026",
  },
  {
    id: "cert-3",
    studentName: "Ariq Fadillah",
    email: "ariq.fadillah@gmail.com",
    projectName: "Peta Gizi Desa Pandeglang",
    challengeCategory: "Kesehatan",
    status: "MENUNGGU AUDIT",
    submitDate: "17 Jul 2026",
  },
  {
    id: "cert-4",
    studentName: "Bagas Wirawan",
    email: "bagas.wirawan@gmail.com",
    projectName: "Observasi Sampah RT/RW Kota Serang",
    challengeCategory: "Lingkungan",
    status: "DITOLAK",
    submitDate: "05 Jul 2026",
  },
];
