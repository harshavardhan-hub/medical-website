"use client";

import { motion } from "framer-motion";

const LinkedinIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Defined outside component — stable reference, zero re-allocation on re-render
const team = [
  {
    name: "Dr. Sarah Jenkins",
    role: "Lead Pharmacist",
    qual: "Pharm.D.",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=75&w=500",
  },
  {
    name: "Dr. Michael Chen",
    role: "Clinical Pharmacist",
    qual: "Pharm.D., R.Ph.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=75&w=500",
  },
  {
    name: "Emily Rodriguez",
    role: "Wellness Consultant",
    qual: "B.Sc. Nutrition",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=75&w=500",
  },
  {
    name: "David Kim",
    role: "Pharmacy Technician",
    qual: "CPhT",
    image:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=75&w=500",
  },
];

export default function Team() {
  return (
    <section
      className="py-24 bg-slate-50 border-t border-border"
      style={{ contain: "layout style" }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Meet the Experts
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut", delay: 0.08 }}
            style={{ willChange: "transform, opacity" }}
            className="text-muted-foreground text-lg"
          >
            Our licensed, experienced professionals are here to provide personalized care.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                type: "tween",
                duration: 0.45,
                ease: "easeOut",
                delay: idx * 0.08,
              }}
              style={{ willChange: "transform, opacity" }}
              className="group team-card"
            >
              {/*
                Image container — all hover effects are CSS-only (no JS).
                CRITICAL FIX: removed Tailwind "group-hover:scale-105 transition-transform"
                directly on the img tag — that triggers a style recalc inside a
                motion.div on every scroll frame. Replaced with .team-img CSS class.

                Also removed "transition-all" from the LinkedIn overlay — replaced
                with transition-[opacity,transform] to animate only composited props.
              */}
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover team-img"
                  loading="lazy"
                  decoding="async"
                  width={500}
                  height={667}
                />
                {/* Gradient overlay — opacity transition only (GPU) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* LinkedIn button — transform+opacity only */}
                <div
                  className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300"
                  style={{ willChange: "transform, opacity" }}
                >
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-medical-600 hover:bg-medical-500 hover:text-white transition-colors"
                    aria-label={`LinkedIn profile of ${member.name}`}
                  >
                    <LinkedinIcon />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-1">
                {member.name}{" "}
                <span className="text-sm font-medium text-medical-500 ml-1">{member.qual}</span>
              </h3>
              <p className="text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
