export interface CompletedChallenge {
  id: string;
  title: string;
  date: string;
  badgeText: string;
  badgeType: "xp" | "archived";
  imageUrl: string;
  avatars?: string[];
  remainingAvatarsCount?: number;
}

export const completedChallenges: CompletedChallenge[] = [
  {
    id: "1",
    title: "Urban Reforestation Program 2024",
    date: "Oct 12, 2024",
    badgeText: "+500 XP",
    badgeType: "xp",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=150&h=100&q=80",
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=80&h=80&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
    ],
    remainingAvatarsCount: 12,
  },
  {
    id: "2",
    title: "Clean Water Literacy Hackathon",
    date: "Aug 05, 2024",
    badgeText: "+320 XP",
    badgeType: "xp",
    imageUrl: "https://images.unsplash.com/photo-1538300342682-be57f6d5f4a6?auto=format&fit=crop&w=150&h=100&q=80",
    avatars: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&h=80&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&h=80&q=80",
    ],
    remainingAvatarsCount: 4,
  },
  {
    id: "3",
    title: "Solar Grid Maintenance Certification",
    date: "May 20, 2024",
    badgeText: "Archived",
    badgeType: "archived",
    imageUrl: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=150&h=100&q=80",
  },
];
