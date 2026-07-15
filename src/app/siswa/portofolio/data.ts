export interface BioProfile {
  name: string;
  role: string;
  institution: string;
  tags: string[];
  avatarUrl: string;
}

export interface Credential {
  type: string;
  title: string;
  issuedDate: string;
}

export interface SummaryStat {
  label: string;
  value: string;
  iconName: "impact" | "projects" | "hours" | "partners";
}

export interface CoreSkill {
  name: string;
  percentage: number;
}

export interface PortfolioProject {
  title: string;
  category: string;
  description: string;
  tags: string[];
  isVerified: boolean;
  imageUrl: string;
}

export interface AdvisorRecommendation {
  text: string;
}

export const bioProfile: BioProfile = {
  name: "Difal",
  role: "Mahasiswa Teknik Lingkungan",
  institution: "Institut Teknologi Bandung",
  tags: ["Top 5% Contributor", "Sustainability Specialist", "UI/UX Designer"],
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
};

export interface Credential {
  type: string;
  title: string;
  issuedDate: string;
  issuer: string;
}

export const verifiedCredentials: Credential[] = [
  {
    type: "VERIFIED CREDENTIAL",
    title: "Impact Leadership Program",
    issuer: "Kemendikbudristek",
    issuedDate: "Diterbitkan: 12 Jan 2024",
  },
  {
    type: "VERIFIED CREDENTIAL",
    title: "Circular Economy Specialist",
    issuer: "ITB & Waste4Change",
    issuedDate: "Diterbitkan: 05 Nov 2023",
  },
  {
    type: "VERIFIED CREDENTIAL",
    title: "Social Innovation Challenge Winner",
    issuer: "IMPACT.ID",
    issuedDate: "Diterbitkan: 22 Agt 2023",
  },
];

export const summaryStats: SummaryStat[] = [
  { label: "Skor Dampak", value: "2,450", iconName: "impact" },
  { label: "Proyek Terverifikasi", value: "12", iconName: "projects" },
  { label: "Jam Kontribusi", value: "480", iconName: "hours" },
  { label: "Mitra UMKM", value: "8", iconName: "partners" },
];

export const coreSkills: CoreSkill[] = [
  { name: "Circular Economy", percentage: 85 },
  { name: "Social Impact Assessment", percentage: 92 },
  { name: "Strategic Communication", percentage: 78 },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    title: "Inisiatif Kanopi Perkotaan",
    category: "Sustainability",
    description: "Revitalisasi lahan tidur perkotaan menjadi ruang terbuka hijau produktif dengan sistem irigasi pintar...",
    tags: ["IoT", "Urban Farming"],
    isVerified: true,
    imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    title: "Digitalisasi UMKM Kerajinan",
    category: "Digitalization",
    description: "Pendampingan transformasi digital untuk pengrajin lokal untuk meningkatkan akses pasar nasional dan...",
    tags: ["E-commerce", "Mentoring"],
    isVerified: true,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    title: "Gerakan Zero Waste Kampus",
    category: "Waste Management",
    description: "Implementasi sistem pemilahan sampah terpadu dan kompos organik di lingkungan fakultas teknik.",
    tags: ["Circularity", "Edu-Campaign"],
    isVerified: true,
    imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    title: "Solar-Powered Community Lab",
    category: "Energy Transition",
    description: "Penyediaan akses energi terbarukan untuk laboratorium sekolah di wilayah terpencil...",
    tags: ["Renewables", "Education"],
    isVerified: true,
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=400&h=250&q=80",
  },
];

export const aiRecommendations: AdvisorRecommendation[] = [
  { text: "ESG Reporting Masterclass" },
  { text: "Leadership Internship" },
  { text: "Data Science for Impact" },
];
