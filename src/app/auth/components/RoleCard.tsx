import React from "react";
import Link from "next/link";
import { LucideIcon, ChevronRight } from "lucide-react";

export interface RoleCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export function RoleCard({ title, description, icon: Icon, href }: RoleCardProps) {
  return (
    <Link
      href={href}
      className="w-full text-left p-5 border border-zinc-200 hover:border-primary rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 group cursor-pointer hover:bg-zinc-50/20"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface-light text-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-zinc-800 text-base group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-zinc-500 text-xs mt-1 leading-normal font-medium">
            {description}
          </p>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
