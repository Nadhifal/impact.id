import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/app/shared/components/ui/card";

interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: string;
  points: number;
  imageUrl: string;
  participantsCount?: number;
}

interface ChallengesCardProps {
  challenge: ChallengeItem;
}

export function ChallengesCard({ challenge }: ChallengesCardProps) {
  return (
    <Card className="overflow-hidden bg-white border border-zinc-100 shadow-md rounded-3xl flex flex-col justify-between min-h-[380px] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <Link href={`/siswa/challenges/${challenge.id}`} className="block flex-1">
        <div className="relative aspect-video w-full border-b border-zinc-100 bg-zinc-50">
          <Image
            src={challenge.imageUrl}
            alt={challenge.title}
            fill
            className="object-cover"
            unoptimized
          />
          {/* Points Badge */}
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black py-1 px-3 rounded-full flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {challenge.points} pts
          </span>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
            <span>{challenge.category}</span>
            <span>•</span>
            <span>{challenge.subCategory}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-snug">{challenge.title}</h3>
          <p className="text-xs text-zinc-500 leading-relaxed font-medium line-clamp-2">
            {challenge.description}
          </p>
        </div>
      </Link>

      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-zinc-50">
        {/* Avatars of participants */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&h=50&q=80",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80",
            ].map((src, idx) => (
              <div key={idx} className="relative w-6 h-6 rounded-full border border-white overflow-hidden">
                <Image src={src} fill alt="Participant" className="object-cover" unoptimized />
              </div>
            ))}
          </div>
          <span className="text-[10px] text-zinc-400 font-bold">+{challenge.participantsCount}</span>
        </div>

        <Link href={`/siswa/challenges/${challenge.id}`}>
          <button className="bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center gap-1 cursor-pointer transition-all">
            Ambil
            <span className="text-xs font-bold">+</span>
          </button>
        </Link>
      </div>
    </Card>
  );
}
