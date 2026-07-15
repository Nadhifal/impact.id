"use client";

import React, { useState } from "react";
import { Copy, Check, Link2, CheckCircle2, Download, Loader2 } from "lucide-react";

interface BlockchainStep {
  label: string;
  detail: string;
  timestamp: string;
  txShort?: string;
}

interface BlockchainSidebarProps {
  credentialId: string;
  transactionHash: string;
  confirmations: number;
  network: string;
  steps: BlockchainStep[];
  onDownload?: () => Promise<void>;
}

export function BlockchainSidebar({
  credentialId,
  transactionHash,
  confirmations,
  network,
  steps,
  onDownload,
}: BlockchainSidebarProps) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(credentialId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!onDownload) return;
    setDownloading(true);
    try {
      await onDownload();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Verification ID */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm space-y-2">
        <p className="text-[9px] uppercase tracking-widest font-extrabold text-zinc-400">Verification ID</p>
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-mono font-bold text-slate-800 break-all">{credentialId}</p>
          <button
            onClick={handleCopy}
            className="shrink-0 w-8 h-8 rounded-lg border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-[#00473e] hover:border-[#00473e] transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Blockchain Trail */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-[#00473e]" />
          <p className="text-sm font-extrabold text-slate-800">Jejak blockchain</p>
        </div>

        <div className="relative space-y-0">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-3 pb-5 last:pb-0">
              {/* Timeline connector */}
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 z-10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white stroke-emerald-500" />
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-px flex-1 bg-emerald-200 mt-1" />
                )}
              </div>
              <div className="pt-0.5 space-y-0.5">
                <p className="text-[10px] text-zinc-400 font-semibold">{step.label}</p>
                <p className={`text-xs font-bold ${step.txShort ? "text-[#00473e] font-mono" : "text-slate-700"}`}>
                  {step.detail}
                </p>
                <p className="text-[10px] text-zinc-400 font-medium">{step.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Download PDF Button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full py-3 bg-[#00473e] hover:bg-[#003830] disabled:bg-zinc-300 disabled:cursor-not-allowed text-white text-sm font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Memproses...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              Unduh PDF
            </>
          )}
        </button>
      </div>

      {/* Transaction Hash */}
      <div className="bg-white border border-zinc-100 rounded-2xl p-5 shadow-sm space-y-2">
        <p className="text-[9px] uppercase tracking-widest font-extrabold text-zinc-400">Transaction Hash</p>
        <p className="text-xs font-mono text-slate-600 break-all leading-relaxed">{transactionHash}</p>
      </div>

      {/* Network badge */}
      <div className="flex items-center justify-center">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-500 bg-white border border-zinc-100 px-3 py-1.5 rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {network} · Dikonfirmasi {confirmations.toLocaleString("id-ID")} blok
        </span>
      </div>
    </div>
  );
}
