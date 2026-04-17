"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only transform/opacity — GPU-composited properties only
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] overflow-hidden bg-medical-50 flex items-center pt-20"
      style={{ transform: "translateZ(0)" }}
    >
      {/* Background Image with Parallax — GPU-only properties */}
      <motion.div
        style={{ y: y1, opacity, scale, willChange: "transform, opacity" }}
        className="absolute inset-0 z-0 origin-bottom"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-white/20 z-10" />
        {/* Next/Image for lazy + async decoding */}
        <Image
          src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1920"
          alt="Premium Medical Facility - Totall Dawaa Bazaar Pharmacy"
          fill
          priority
          decoding="async"
          className="object-cover object-center"
          sizes="100vw"
          unoptimized
        />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.8, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-medical-100 rounded-full px-4 py-2 mb-8"
          >
            <ShieldCheck size={18} className="text-medical-500" />
            <span className="text-sm font-medium text-medical-800">Trusted by 50,000+ families</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.8, delay: 0.4 }}
            style={{ willChange: "transform, opacity" }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Your trusted <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-500 to-medical-700">
              pharmacy & medical shop.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.8, delay: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
          >
            Welcome to Totall Dawaa Bazaar. Order medicines online and experience premium healthcare products with expert consultations tailored to your well-being.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.8, delay: 0.8 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="#appointment"
              className="bg-medical-500 hover:bg-medical-600 text-white px-8 py-4 rounded-full font-medium flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:shadow-medical-500/20 active:scale-95"
            >
              Order Medicines <ArrowRight size={18} />
            </Link>
            <Link
              href="/about"
              className="bg-white hover:bg-slate-50 text-foreground border border-border px-8 py-4 rounded-full font-medium flex items-center justify-center transition-all active:scale-95"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
