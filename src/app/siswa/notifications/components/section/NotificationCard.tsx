import React from "react";
import Image from "next/image";
import { ShieldCheck, Mail, Calendar, Trophy, Eye } from "lucide-react";
import { NotificationItem } from "../../data";
import { Button } from "@/app/shared/components/ui/button";

interface NotificationCardProps {
  notification: NotificationItem;
  onMarkAsRead?: (id: string) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const getIcon = () => {
    const size = "w-5 h-5";
    switch (notification.icon) {
      case "shield":
        return {
          element: <ShieldCheck className={`${size} text-teal-600`} />,
          bg: "bg-teal-50",
        };
      case "mail":
        return {
          element: <Mail className={`${size} text-blue-600`} />,
          bg: "bg-blue-50",
        };
      case "calendar":
        return {
          element: <Calendar className={`${size} text-indigo-600`} />,
          bg: "bg-indigo-50",
        };
      case "trophy":
        return {
          element: <Trophy className={`${size} text-emerald-600`} />,
          bg: "bg-emerald-50",
        };
      case "eye":
        return {
          element: <Eye className={`${size} text-slate-600`} />,
          bg: "bg-slate-50",
        };
    }
  };

  const iconInfo = getIcon();

  return (
    <div
      onClick={() => notification.isUnread && onMarkAsRead && onMarkAsRead(notification.id)}
      className={`relative bg-white rounded-xl border transition-all duration-200 p-5 md:p-6 flex gap-4 items-start ${
        notification.isUnread
          ? "border-l-4 border-l-primary border-y-slate-100 border-r-slate-100 cursor-pointer shadow-xs"
          : "border-slate-100 hover:border-slate-200"
      }`}
    >
      {/* Icon Circle wrapper */}
      <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center ${iconInfo.bg}`}>
        {iconInfo.element}
      </div>

      {/* Main text area */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-sm md:text-base font-bold text-slate-800 leading-snug">
            {notification.title}
          </h3>
          <span className="text-[10px] md:text-xs font-semibold text-slate-400 shrink-0 mt-0.5">
            {notification.time}
          </span>
        </div>

        <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed mt-1.5 max-w-3xl">
          {notification.description}
        </p>

        {/* Dynamic Inner Action Elements */}
        {notification.actionText && (
          <div className="mt-4 flex items-center gap-3">
            {notification.icon === "shield" ? (
              <Button size="sm" className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-lg flex items-center gap-1">
                <span>{notification.actionText}</span>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                {notification.avatarUrl && (
                  <div className="relative w-6 h-6 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <Image
                      src={notification.avatarUrl}
                      alt="Mentor Avatar"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <a
                  href="#"
                  className="text-xs font-bold text-primary hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  {notification.actionText}
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
