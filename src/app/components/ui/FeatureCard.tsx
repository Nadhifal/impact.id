import React from "react";
import Image from "next/image";
import { Card } from "@/app/shared/components/ui/card";
import { MapPin, Cpu } from "lucide-react";

interface FeatureCardProps {
  feature: {
    id: string | number;
    title: string;
    description: string;
    image: string;
    iconName: string;
  };
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden group p-0 border border-slate-100 shadow-md flex flex-col rounded-3xl">
      {/* Mockup Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-50 flex items-center justify-center p-4">
        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-contain rounded-2xl"
          />
        </div>
      </div>

      {/* Bottom Content */}
      <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {/* Responsive Icon: No bg box & purple color on mobile; green bg box & green text on desktop */}
            <div className="p-0 bg-transparent text-[#4f46e5] md:p-2.5 md:bg-surface-light md:text-primary rounded-xl shrink-0">
              {feature.iconName === "Personalized" ? (
                <MapPin className="w-5 h-5" />
              ) : (
                <Cpu className="w-5 h-5" />
              )}
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
              {feature.title}
            </h3>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </Card>
  );
}
