import React from "react";
import { Button } from "@/app/shared/components/ui/button";
import { Card } from "@/app/shared/components/ui/card";
import { VerificationStatusCard } from "../ui/VerificationStatusCard";
import { verification } from "../../data";
import { ArrowRight, QrCode } from "lucide-react";

export function VerificationSection() {
  return (
    <section className="py-20 bg-slate-50 flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <Card className="bg-white border border-slate-100 shadow-xl rounded-3xl p-8 relative flex flex-col space-y-6">
          {/* Header Tag */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-slate-100 px-4 py-1.5 rounded-full shadow-sm">
            <span className="text-xs font-bold text-slate-500 tracking-wider">
              Verification ID
            </span>
          </div>

          {/* Verification Status Card */}
          <VerificationStatusCard verification={verification} />

          {/* CTA Button */}
          <Button variant="primary" className="w-full py-3.5 text-sm font-semibold group bg-[#00473e] text-white">
            Verifikasi Sekarang
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] bg-slate-200 flex-1" />
            <span className="text-xs font-bold text-slate-400">ATAU</span>
            <div className="h-[1px] bg-slate-200 flex-1" />
          </div>

          {/* Secondary CTA */}
          <Button variant="outline" className="w-full py-3.5 text-sm font-semibold border-2 border-[#00473e] text-[#00473e] hover:bg-[#00473e]/5">
            <QrCode className="mr-2 w-4 h-4" />
            Scan QR Code
          </Button>
        </Card>
      </div>
    </section>
  );
}
