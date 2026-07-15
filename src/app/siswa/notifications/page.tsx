"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TabFilter } from "./components/ui/TabFilter";
import { NotificationCard } from "./components/section/NotificationCard";
import { dummyNotifications, NotificationItem } from "./data";
import { Button } from "@/app/shared/components/ui/button";

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/users/demo-student-1/notifications");
      const json = await res.json();
      if (json.success) {
        setNotifications(json.data);
      }
    } catch (err) {
      console.error("Gagal memuat notifikasi:", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isUnread: false } : notif))
    );
  };

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.preventDefault();
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isUnread: false })));
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10 md:py-16 space-y-8 animate-fade-in">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Stay updated with your social impact journey.
          </p>
        </div>
        <a
          href="#"
          onClick={handleMarkAllAsRead}
          className="text-xs md:text-sm font-bold text-primary hover:underline transition-colors shrink-0"
        >
          Mark all as read
        </a>
      </div>

      {/* Tabs Filter */}
      <TabFilter activeTab={activeTab} onChangeTab={setActiveTab} />

      {/* Notifications List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
            <p className="text-slate-400 font-semibold text-sm">Loading notifications...</p>
          </div>
        ) : filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => (
            <NotificationCard
              key={notif.id}
              notification={notif}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        ) : (
          <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
            <p className="text-slate-400 font-semibold text-sm">No notifications found in this tab.</p>
          </div>
        )}
      </div>

      {/* View Past Notifications Button */}
      {filteredNotifications.length > 0 && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="gap-2 px-6 py-2.5 text-xs font-bold border-slate-200 hover:border-slate-300 bg-white"
          >
            <span>View Past Notifications</span>
            <ChevronDown className="w-4 h-4 text-slate-550" />
          </Button>
        </div>
      )}
    </div>
  );
}
