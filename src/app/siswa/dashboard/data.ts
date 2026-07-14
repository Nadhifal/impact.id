export interface StatMetric {
  label: string;
  value: string;
}

export interface ActiveChallenge {
  title: string;
  category: string;
  deadline: string;
  progressPercent: number;
  currentStep: number;
  totalSteps: number;
  imageUrl: string;
}

export interface UpcomingMilestone {
  date: string;
  title: string;
  iconName: "webinar" | "report" | "cert" | "networking";
}

export const hcsStats: StatMetric[] = [
  { label: "SOCIAL IMPACT", value: "92%" },
  { label: "LEADERSHIP", value: "78%" },
  { label: "INNOVATION", value: "85%" },
  { label: "RELIABILITY", value: "81%" },
];

export const quickStats = {
  challengesCompleted: 12,
  hoursOfImpact: 148,
};

export const activeChallenge: ActiveChallenge = {
  title: "Pemetaan UMKM Desa Sukajaya",
  category: "Challenge Lapangan",
  deadline: "12 Nov 2024",
  progressPercent: 60,
  currentStep: 3,
  totalSteps: 5,
  imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&h=180&q=80",
};

export const upcomingMilestones: UpcomingMilestone[] = [
  { date: "9 Nov", title: "Webinar Impact Strategy", iconName: "webinar" },
  { date: "12 Nov", title: "Laporan Desa Sukajaya", iconName: "report" },
  { date: "15 Nov", title: "Batch 4 Certification", iconName: "cert" },
  { date: "20 Nov", title: "Networking Night", iconName: "networking" },
];
