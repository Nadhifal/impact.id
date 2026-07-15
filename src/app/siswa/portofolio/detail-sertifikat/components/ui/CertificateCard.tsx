"use client";

import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { MapPin, Star, Calendar, UserCheck, ShieldCheck } from "lucide-react";

interface CertificateCardProps {
  credentialId: string;
  holderName: string;
  institution: string;
  challengeTitle: string;
  challengeDescription: string;
  issuedDate: string;
  validatedBy: string;
  location: string;
  impactScore: number;
}

export const CertificateCard = React.forwardRef<HTMLDivElement, CertificateCardProps>(
  function CertificateCard(
    {
      credentialId,
      holderName,
      institution,
      challengeTitle,
      challengeDescription,
      issuedDate,
      validatedBy,
      location,
      impactScore,
    },
    ref
  ) {
    const verifyUrl = `https://impact.id/verify/${credentialId}`;

    return (
      <div
        ref={ref}
        className="bg-white border border-zinc-100 rounded-3xl shadow-sm overflow-hidden"
        style={{ fontFamily: "sans-serif" }}
      >
        {/* Top accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#00473e] via-[#006b5b] to-[#00473e]" />

        <div className="p-8 space-y-8">
          {/* Issuer + Credential ID row */}
          <div className="flex items-start justify-between">
            <p className="text-xs font-extrabold text-[#00473e] tracking-widest uppercase">IMPACT.ID</p>
            <div className="text-right">
              <p className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold">Credential ID</p>
              <p className="text-xs font-mono font-bold text-slate-700 mt-0.5">{credentialId}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dashed border-zinc-100" />

          {/* Center: recipient */}
          <div className="text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-extrabold">
              Certificate of Excellence
            </p>
            <p className="text-xs italic text-zinc-400 font-medium">This is to certify that</p>
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
              {holderName}
            </h2>
            <p className="text-sm font-bold text-[#00473e]">{institution}</p>
          </div>

          {/* Challenge info */}
          <div className="text-center space-y-2 max-w-lg mx-auto">
            <div className="border-t border-zinc-100 mb-4" />
            <h3 className="text-xl font-extrabold text-slate-800">{challengeTitle}</h3>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">{challengeDescription}</p>
          </div>

          {/* Metadata grid */}
          <div className="grid grid-cols-2 gap-px bg-zinc-100 rounded-xl overflow-hidden border border-zinc-100">
            <MetaCell icon={<Calendar className="w-3.5 h-3.5" />} label="Tanggal Terbit" value={issuedDate} />
            <MetaCell icon={<UserCheck className="w-3.5 h-3.5" />} label="Divalidasi Oleh" value={validatedBy} />
            <MetaCell icon={<MapPin className="w-3.5 h-3.5" />} label="Lokasi" value={location} />
            <MetaCell
              icon={<Star className="w-3.5 h-3.5" />}
              label="Impact Score"
              value={`${impactScore} pts`}
              valueClass="text-[#00473e] font-extrabold"
            />
          </div>

          {/* Bottom row: QR Code + Verified badge */}
          <div className="flex items-end justify-between pt-2 border-t border-dashed border-zinc-100">
            {/* QR Code */}
            <div className="flex flex-col items-center gap-2">
              <div className="p-2.5 border border-zinc-100 rounded-xl bg-white shadow-sm">
                <QRCodeSVG
                  value={verifyUrl}
                  size={80}
                  fgColor="#00473e"
                  bgColor="#ffffff"
                  level="H"
                  includeMargin={false}
                />
              </div>
              <p className="text-[9px] text-zinc-400 font-semibold text-center leading-tight max-w-[90px]">
                Scan untuk verifikasi
              </p>
            </div>

            {/* Verified stamp */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-16 h-16 rounded-full border-2 border-[#00473e]/20 flex flex-col items-center justify-center bg-[#00473e]/5">
                <ShieldCheck className="w-7 h-7 text-[#00473e]" strokeWidth={1.5} />
              </div>
              <p className="text-[8px] font-extrabold text-[#00473e] tracking-widest uppercase">
                Verified
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
CertificateCard.displayName = "CertificateCard";

function MetaCell({
  icon,
  label,
  value,
  valueClass = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="bg-white p-4 space-y-1.5">
      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-zinc-400 font-extrabold">
        <span className="text-zinc-300">{icon}</span>
        {label}
      </div>
      <p className={`text-sm font-bold text-slate-800 ${valueClass}`}>{value}</p>
    </div>
  );
}
