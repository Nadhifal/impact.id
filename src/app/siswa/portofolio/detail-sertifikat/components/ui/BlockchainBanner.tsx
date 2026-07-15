"use client";

import React from "react";
import { ShieldCheck } from "lucide-react";

interface BlockchainBannerProps {
  network: string;
  blockNumber: string;
}

export function BlockchainBanner({ network, blockNumber }: BlockchainBannerProps) {
  return (
    <div className="bg-white border border-zinc-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
      <div className="w-10 h-10 rounded-xl bg-[#00473e]/10 flex items-center justify-center shrink-0">
        <ShieldCheck className="w-5 h-5 text-[#00473e]" />
      </div>
      <div>
        <p className="text-sm font-extrabold text-slate-800">Terverifikasi di Blockchain</p>
        <p className="text-xs text-zinc-400 font-semibold mt-0.5">
          {network} • Block {blockNumber}
        </p>
      </div>
      <div className="ml-auto shrink-0">
        <span className="text-[9px] font-extrabold px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase tracking-wider">
          VERIFIED
        </span>
      </div>
    </div>
  );
}
