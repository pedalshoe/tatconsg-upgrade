"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";

export type Testimonial = {
  text: string;
  author: string;
  org: string;
  rating: number;
};

type Props = {
  testimonials: Testimonial[];
  intervalMs?: number;
  title?: string;
};

export default function ClientConfidence({
  testimonials,
  intervalMs = 7000,
  title = "Client Confidence",
}: Props) {
  const safeTestimonials = useMemo(() => {
    return Array.isArray(testimonials) && testimonials.length > 0
      ? testimonials
      : [
          {
            text: "No testimonials available yet.",
            author: "TAT",
            org: "Advisory",
            rating: 5,
          },
        ];
  }, [testimonials]);

  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    // Rotate testimonial without touching parent state
    const t = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % safeTestimonials.length);
    }, intervalMs);

    return () => window.clearInterval(t);
  }, [intervalMs, safeTestimonials.length]);

  const current = safeTestimonials[testimonialIndex];

  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-blue-700 p-8 text-white shadow-2xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sky-200">
        <Star className="h-4 w-4 text-cyan-200" />
        {title}
      </div>

      <div className="mt-5 flex gap-1">
        {Array.from({ length: current.rating }).map((_, i) => (
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <p className="mt-4 text-lg leading-relaxed text-sky-50/95">“{current.text}”</p>

      <div className="mt-6 text-sm font-semibold text-white">
        {current.author}{" "}
        <span className="font-normal text-sky-100/80">• {current.org}</span>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {["Rigor", "Speed", "Control"].map((x) => (
          <div key={x} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
            <div className="text-sm font-extrabold">{x}</div>
            <div className="mt-1 text-[11px] text-sky-100/70">Deliverables</div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {["Extractives", "Telecom", "Logistics", "Finance", "Education"].map((x) => (
          <span
            key={x}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-sky-100/90"
          >
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}