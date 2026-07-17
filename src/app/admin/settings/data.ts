export type SectionId =
  | "hero"
  | "statistik"
  | "ai-mentor"
  | "fitur-ai"
  | "proses-belajar"
  | "testimoni"
  | "verifikasi"
  | "footer";

export interface LandingSection {
  id: SectionId;
  title: string;
  subtitle: string;
  icon: "layout" | "bar-chart" | "user-sparkle" | "sparkles" | "trend" | "quote" | "shield" | "footer-layout";
}

export const landingSections: LandingSection[] = [
  {
    id: "hero",
    title: "Hero",
    subtitle: 'Judul, subjudul, teks tombol "Mulai Sekarang"',
    icon: "layout",
  },
  {
    id: "statistik",
    title: "Statistik pencapaian",
    subtitle: "Impact Score, Project Selesai — angka ditarik otomatis dari data, label bisa diubah",
    icon: "bar-chart",
  },
  {
    id: "ai-mentor",
    title: "Kartu AI Career Mentor",
    subtitle: "Teks highlight singkat di bawah hero",
    icon: "user-sparkle",
  },
  {
    id: "fitur-ai",
    title: "Fitur AI IMPACT.ID",
    subtitle: "2 kartu: Personalized Path, Smart Portfolio — judul, deskripsi, gambar",
    icon: "sparkles",
  },
  {
    id: "proses-belajar",
    title: "Proses belajar (7 langkah)",
    subtitle: "Pendaftaran → Assessment AI → ... → Koneksi Karir",
    icon: "trend",
  },
  {
    id: "testimoni",
    title: "Testimoni (Cerita Impact Leaders)",
    subtitle: "Foto, nama, jabatan, kutipan — bisa tambah/hapus testimoni",
    icon: "quote",
  },
  {
    id: "verifikasi",
    title: "Widget verifikasi publik",
    subtitle: "Placeholder input Verification ID, teks tombol scan",
    icon: "shield",
  },
  {
    id: "footer",
    title: "Footer",
    subtitle: "Teks hak cipta, tautan Kebijakan Privasi dan Syarat Ketentuan",
    icon: "footer-layout",
  },
];

export type SettingsTab = "konten" | "faq" | "kategori" | "kebijakan" | "notifikasi" | "branding";

export const settingsTabs: { id: SettingsTab; label: string }[] = [
  { id: "konten", label: "Konten landing page" },
  { id: "faq", label: "FAQ" },
  { id: "kategori", label: "Kategori challenge" },
  { id: "kebijakan", label: "Kebijakan" },
  { id: "notifikasi", label: "Notifikasi" },
  { id: "branding", label: "Branding" },
];
