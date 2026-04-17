"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-medical-50"
      style={{ contain: "layout style" }}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            <span className="text-medical-500">Totall Dawaa Bazaar.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.7, ease: "easeOut", delay: 0.15 }}
            style={{ willChange: "transform, opacity" }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Since 1998, we have been on a mission to provide accessible, genuine, and compassionate
            pharmaceutical care. We believe that health is not just about medicine, but about trust
            and continuous support.
          </motion.p>
        </div>
      </div>

      {/*
        CRITICAL FIX: removed scale from this animation.
        Animating scale on a full-width element forces the browser to repaint
        every single frame. Opacity + y only — both GPU-composited.
      */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "tween", duration: 0.8, ease: "easeOut", delay: 0.3 }}
        style={{ willChange: "transform, opacity" }}
        className="container mx-auto px-6 md:px-12 mt-16"
      >
        <div className="w-full h-[40vh] md:h-[60vh] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?auto=format&fit=crop&q=75&w=1600"
            alt="Inside Totall Dawaa Bazaar Medical Shop - Healthcare Products"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
          />
        </div>
      </motion.div>
    </section>
  );
}
