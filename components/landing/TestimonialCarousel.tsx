

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialsCarouselProps } from "@/types";

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [index, setIndex] = useState(0);

  if (!testimonials.length) return null;

  const t = testimonials[index];

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);


  return (
    <section className="content-wrapper py-8 border-t bg-(--grey-dark)">
      <h2 className="text-lg text-(--white) font-bold mb-6 text-center">
        A word from<br />other Believers
      </h2>

      <div className="rounded-2xl p-6 text-center text-(--white)">
        <p className="text-base leading-relaxed">
          {t.text}
        </p>
        <p className="font-bold text-sm pt-3">{t.name}</p>
      </div>


      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-(--white)" 
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white text-(--white)" 
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section >
  );
} 