"use client";

import { motion } from "framer-motion";
import { Heart, Shield, Users } from "lucide-react";

// Value card data defined outside component — no re-allocation on every render
const values = [
  {
    icon: Heart,
    title: "Compassion First",
    desc: "Every patient is treated with the utmost empathy and respect.",
  },
  {
    icon: Shield,
    title: "Uncompromising Integrity",
    desc: "We provide only 100% genuine products sourced from direct manufacturers.",
  },
  {
    icon: Users,
    title: "Community Focused",
    desc: "We actively participate in health camps and local wellness initiatives.",
  },
];

// Story images defined outside — stable reference, no re-allocation
const storyImages = [
  {
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=75&w=500",
    alt: "Lab",
    className: "h-48",
  },
  {
    src: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=75&w=500",
    alt: "Consultation",
    className: "h-64",
  },
  {
    src: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=75&w=500",
    alt: "Pharmacy shelves",
    className: "h-64",
  },
  {
    src: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=75&w=500",
    alt: "Medical pills",
    className: "h-48",
  },
];

export default function StoryValues() {
  return (
    <section className="py-24 bg-white" style={{ contain: "layout style" }}>
      <div className="container mx-auto px-6 md:px-12">

        {/* ── Our Journey ─────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-16 mb-24">

          {/* Text — slides in from left, opacity+x only */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="prose prose-lg text-muted-foreground"
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Journey</h2>
            <p>
              It started with a simple observation: patients were often confused about their
              medications and intimidated by the sterile environment of traditional pharmacies.
              In 1998, Medicare was founded with a vision to change this narrative.
            </p>
            <p>
              We completely redesigned the pharmacy experience. By creating warm, welcoming spaces
              and training our pharmacists to be proactive consultants rather than just dispensers,
              we built a sanctuary for health right in the neighborhood.
            </p>
          </motion.div>

          {/*
            Image grid — slides in from right, opacity+x only.
            CRITICAL FIX: the 4 images inside this div previously had no
            loading="lazy" in some versions. All images are lazy + decoding=async
            and sized to w=500 (half of before) to halve decode time.
          */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="grid grid-cols-2 gap-6"
          >
            {/* Left column */}
            <div className="space-y-6">
              {[storyImages[0], storyImages[1]].map((img) => (
                <div key={img.alt} className={`${img.className} rounded-2xl overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </div>
            {/* Right column — offset downward */}
            <div className="space-y-6 pt-12">
              {[storyImages[2], storyImages[3]].map((img) => (
                <div key={img.alt} className={`${img.className} rounded-2xl overflow-hidden`}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={500}
                    height={300}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Our Core Values ─────────────────────────────── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground">Our Core Values</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              /*
                CRITICAL FIX: removed whileHover={{ y: -10 }}.
                Framer Motion's whileHover attaches a JS pointer listener that
                fires on every mouse-move frame. Replaced with CSS translateY
                via group-hover so it runs on the compositor thread with zero JS.

                ALSO FIXED: removed hover:shadow-xl transition-shadow.
                Box-shadow animation forces a repaint. Replaced with a
                pre-rendered ::after pseudo-element that fades in (opacity only).
              */
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "tween", duration: 0.45, ease: "easeOut", delay: idx * 0.09 }}
                style={{ willChange: "transform, opacity" }}
                className="value-card group p-8 rounded-3xl bg-slate-50 border border-border"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} className="text-medical-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{val.title}</h3>
                <p className="text-muted-foreground">{val.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
