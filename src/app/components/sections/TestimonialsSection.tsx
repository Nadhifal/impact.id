import React from "react";
import { testimonial as defaultTestimonial } from "../../data";
import { TestimonialCard } from "../ui/TestimonialCard";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function TestimonialsSection({ testimonial = defaultTestimonial }: { testimonial?: typeof defaultTestimonial }) {
  return (
    <section id="testimonials" className="py-20 bg-[#00473e] text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left info - responsive layout to hide description/arrows on mobile */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Cerita Impact Leaders
          </h2>
          <p className="hidden lg:block text-slate-200 text-sm sm:text-base leading-relaxed">
            Ribuan talenta telah bertransformasi bersama ekosistem kami. Inilah langkah
            mereka.
          </p>
          {/* Slider arrows (hidden on mobile) */}
          <div className="hidden lg:flex gap-4 pt-4">
            <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#00473e] transition-all duration-300 cursor-pointer">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#00473e] transition-all duration-300 cursor-pointer">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right testimonial card */}
        <div className="lg:col-span-7">
          <TestimonialCard testimonial={testimonial} />
        </div>
      </div>
    </section>
  );
}
