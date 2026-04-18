"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

export default function AppointmentCTA() {
  return (
    <section
      id="appointment"
      className="py-24 bg-white relative overflow-hidden"
      style={{ contain: "layout style" }}
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/*
          CRITICAL FIX: removed scale from whileInView — scale forces a full
          composite + repaint on this large dark card every animation frame.
          Replaced with opacity + translateY only (GPU-composited).
        */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="bg-medical-900 rounded-[2.5rem] overflow-hidden relative shadow-2xl"
        >
          {/* Background texture — preloaded via CSS, no img element blocking */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1551076805-e18690c5e53b?auto=format&fit=crop&q=60&w=1200')",
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-12 p-12 md:p-20 items-center relative z-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Need professional medical advice?
              </h2>
              <p className="text-medical-200 text-lg mb-10 max-w-md">
                Book a free 15-minute consultation with our expert pharmacists to discuss your health concerns and medications.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+917880008860" className="bg-medical-500 hover:bg-medical-400 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-colors active:scale-95">
                  <PhoneCall size={20} />
                  +91 7880008860
                </a>
                <a href="tel:+919826798175" className="bg-transparent border border-medical-500 text-white hover:bg-medical-800 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 transition-colors active:scale-95">
                  <PhoneCall size={20} />
                  +91 9826798175
                </a>
              </div>
            </div>

            <div className="hidden md:flex justify-end relative">
              {/*
                CRITICAL FIX: removed blur-3xl div entirely.
                CSS filter:blur() on a large element forces a new stacking
                context and repaints on EVERY scroll frame — biggest hang source.
                Replaced with a simple radial gradient background that is
                100% GPU-composited and never repaints.
              */}
              <div
                className="absolute -right-10 -top-10 w-64 h-64 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(20,184,166,0.25) 0%, transparent 70%)",
                }}
              />

              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500"
                alt="Expert Pharmacist at Totall Dawaa Bazaar Medical Shop"
                className="w-72 h-72 object-cover rounded-full border-4 border-medical-800 shadow-2xl relative z-10 scale-x-[-1]"
                loading="lazy"
                decoding="async"
                width={500}
                height={500}
              />

              {/* Float badge — animates y only (GPU transform, no repaint) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  type: "tween",
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatType: "loop",
                }}
                style={{ willChange: "transform" }}
                className="absolute bottom-10 left-10 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-border"
              >
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-bold text-foreground text-sm">Pharmacists Available</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
