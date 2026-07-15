export interface NotificationItem {
  id: string;
  type: "challenges" | "messages" | "milestones";
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
  actionText?: string;
  actionHref?: string;
  icon: "shield" | "mail" | "calendar" | "trophy" | "eye";
  avatarUrl?: string;
}

export const dummyNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "challenges",
    title: "Your challenge was verified",
    description: "Congratulations! Your submission for \"Sustainable Urban Farming\" has been reviewed and verified by our experts. You've earned 50 Impact Points.",
    time: "2m ago",
    isUnread: true,
    actionText: "View Badge >",
    icon: "shield",
  },
  {
    id: "2",
    type: "messages",
    title: "New mentor message",
    description: "Dr. Sarah Jenkins sent you a follow-up regarding your portfolio review. \"I've looked over your latest impact assessment and have some thoughts...\"",
    time: "1h ago",
    isUnread: true,
    actionText: "Reply to Sarah",
    icon: "mail",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
  },
  {
    id: "3",
    type: "milestones",
    title: "Upcoming milestone reminder",
    description: "The \"Community Leadership\" project milestone is due in 48 hours. Ensure your progress reports are uploaded to keep your streak alive.",
    time: "5h ago",
    isUnread: false,
    icon: "calendar",
  },
  {
    id: "4",
    type: "milestones",
    title: "Social Impact Level Up!",
    description: "You've reached Level 4: \"Community Advocate\". Your influence radius has expanded, unlocking new collaborative challenges.",
    time: "Yesterday",
    isUnread: false,
    icon: "trophy",
  },
  {
    id: "5",
    type: "messages",
    title: "Portfolio viewed",
    description: "An educational partner from the \"Green Growth Initiative\" viewed your portfolio. They might be looking for project collaborators.",
    time: "2 days ago",
    isUnread: false,
    icon: "eye",
  },
];
