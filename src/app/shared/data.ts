export interface StudentAccount {
  name: string;
  email: string;
  role: string;
  roleType: string;
  institution: string;
  avatarUrl: string;
  points: number;
  challengesCompleted: number;
  hoursOfImpact: number;
  umkmPartners: number;
  tags: string[];
}

export const studentAccount: StudentAccount = {
  name: "Difal",
  email: "difal@itb.ac.id",
  role: "Mahasiswa Teknik Lingkungan",
  roleType: "MAHASISWA",
  institution: "Institut Teknologi Bandung",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
  points: 2450,
  challengesCompleted: 12,
  hoursOfImpact: 480,
  umkmPartners: 8,
  tags: ["Top 5% Contributor", "Sustainability Specialist", "UI/UX Designer"],
};
