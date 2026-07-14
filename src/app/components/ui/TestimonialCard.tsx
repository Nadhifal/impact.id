import React from "react";
import Image from "next/image";
import { Card } from "@/app/shared/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    rating: number;
  };
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="bg-[#003c34] lg:bg-white/10 lg:backdrop-blur-md border-none lg:border lg:border-white/10 p-8 sm:p-10 rounded-3xl text-white hover:shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/20">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h4 className="font-bold text-lg text-white">
            {testimonial.name}
          </h4>
          <p className="text-xs text-accent font-medium">
            {testimonial.role}
          </p>
        </div>
      </div>

      <blockquote className="text-base sm:text-lg font-medium leading-relaxed mb-6 italic text-slate-100">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Stars rating (hidden on mobile) */}
      <div className="hidden lg:flex gap-1">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-accent text-accent" />
        ))}
      </div>
    </Card>
  );
}
