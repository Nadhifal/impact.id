export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
  description?: string;
  highlight?: boolean;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName: "Personalized" | "SmartPortfolio";
}

export interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface VerificationData {
  id: string;
  status: string;
}

export const navItems: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "About", href: "#about" },
];

export const stats: StatItem[] = [
  { value: "15k+", label: "Impact Score" },
  { value: "420", label: "Project Selesai" },
  { value: "AI Career Mentor", label: "98% Match dengan industri tech terkini.", highlight: true },
];

export const features: FeatureItem[] = [
  {
    id: "personalized-path",
    title: "Personalized Path",
    description: "AI menganalisis minat dan bakatmu untuk menyusun kurikulum yang benar-benar personal.",
    image: "/images/personalized_path.png",
    iconName: "Personalized",
  },
  {
    id: "smart-portfolio",
    title: "Smart Portfolio",
    description: "Setiap proyek yang kamu buat secara otomatis diverifikasi dan dicatat dalam blockchain.",
    image: "/images/smart_portfolio.png",
    iconName: "SmartPortfolio",
  },
];

export const processSteps: ProcessStep[] = [
  { number: 1, title: "Pendaftaran", description: "Daftar akun dan lengkapi profil profesionalmu." },
  { number: 2, title: "Assessment AI", description: "Ikuti tes awal untuk memetakan kekuatan kognitifmu." },
  { number: 3, title: "Pilih Track Proyek", description: "Pilih tantangan nyata dari mitra industri kami." },
  { number: 4, title: "Bimbingan Mentor", description: "Dapatkan feedback langsung dari praktisi ahli." },
  { number: 5, title: "Penyelesaian Karya", description: "Selesaikan proyek dan unggah ke ekosistem kami." },
  { number: 6, title: "Verifikasi Blockchain", description: "Pencatatan prestasi secara permanen di ledger." },
  { number: 7, title: "Koneksi Karir", description: "Direkomendasikan langsung ke jaringan HR terbaik." },
];

export const testimonial: TestimonialItem = {
  name: "Andini P.",
  role: "UI/UX Designer @ TechIndo",
  avatar: "/images/andini_avatar.png",
  quote: "IMPACT.ID membantu saya membangun portofolio yang tidak hanya cantik, tapi punya impact nyata bagi UMKM sekitar. Proses verifikasi blockchain memberikan kepercayaan diri tinggi saat melamar ke Top Tech Companies.",
  rating: 5,
};

export const verification: VerificationData = {
  id: "IMPACT-ID-8821-2024-CISAUK",
  status: "Verified on Ledger",
};
