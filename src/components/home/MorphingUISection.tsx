"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function MorphingUISection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  // Pause section when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Morphing Container Size Transforms
  // We use useMotionTemplate to safely interpolate sizes linearly based purely on scroll
  const wWidth = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.55, 0.8, 0.95], [384, 384, 1024, 1024, 1600, 1600]);
  const widthTemplate = useMotionTemplate`min(${wWidth}px, 90vw)`;

  const hHeight = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.55, 0.8, 0.95], [256, 256, 600, 600, 850, 850]);
  const heightTemplate = useMotionTemplate`min(${hHeight}px, 85vh)`;

  const rRadius = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.55, 0.8, 0.95], [150, 150, 24, 24, 48, 48]);
  const radiusTemplate = useMotionTemplate`${rRadius}px`;

  // Background Image Opacities
  const bgOpacity1 = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.55, 0.8, 1], [0.3, 0.3, 0.8, 0.8, 0, 0]);
  const bgOpacity2 = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 0.5, 0.5]);

  // Stage 0 Transforms (EVOLUTION Capsule)
  const opacity0 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const scale0 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0.8]);
  const y0 = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 0, -20]);

  // Scroll to advance text fade
  const scrollTextOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scrollTextY = useTransform(scrollYProgress, [0, 0.1], [0, 10]);

  // Stage 1 Transforms (Expanded Grid)
  const opacity1 = useTransform(scrollYProgress, [0.2, 0.3, 0.55, 0.7], [0, 1, 1, 0]);
  const scale1 = useTransform(scrollYProgress, [0.2, 0.3, 0.55, 0.7], [0.95, 1, 1, 0.95]);
  const y1 = useTransform(scrollYProgress, [0.2, 0.3, 0.55, 0.7], [20, 0, 0, -20]);
  const imgScale1 = useTransform(scrollYProgress, [0.2, 0.3], [0.95, 1]);

  // Stage 2 Transforms (Hero Feature)
  const opacity2 = useTransform(scrollYProgress, [0.65, 0.85, 1], [0, 1, 1]);
  const scale2 = useTransform(scrollYProgress, [0.65, 0.85, 1], [0.95, 1, 1]);
  const y2 = useTransform(scrollYProgress, [0.65, 0.85, 1], [20, 0, 0]);

  const applyTransform = (opacity: any, scale: any, y: any) => {
    if (shouldReduceMotion) return { opacity: 1, scale: 1, y: 0, willChange: 'auto' };
    if (!isInView) return { opacity: opacity.get(), scale: scale.get(), y: y.get(), willChange: 'auto' };
    return { opacity, scale, y, willChange: 'transform, opacity' };
  };

  if (shouldReduceMotion) {
    return (
      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl md:text-6xl font-light mb-16 text-center">The Evolution of Medicine</h2>
          <div className="flex flex-col gap-12">
            <div className="relative w-full h-[50vh] rounded-3xl overflow-hidden bg-white/5 border border-white/10">
              <Image src="/images/showcase/morph1.png" fill alt="DNA visualization" className="object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="text-center">
               <h3 className="text-2xl font-light mb-4">Cellular Precision</h3>
               <p className="text-neutral-400">Transforming healthcare at the molecular level.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-20 px-6 z-0">
        
       {/* Morphing Container */}
        <motion.div
          className="relative flex mx-auto bg-neutral-900 border border-neutral-800 overflow-hidden items-center justify-center transform-gpu"
          style={shouldReduceMotion ? {} : { 
            width: widthTemplate, 
            height: heightTemplate, 
            borderRadius: radiusTemplate,
            willChange: isInView ? "width, height, border-radius, transform" : "auto"
          }}
        >
          {/* Background Layers */}
          <div className="absolute inset-0 z-0 h-full w-full pointer-events-none rounded-inherit" style={{ borderRadius: "inherit" }}>
             <motion.div style={{ opacity: shouldReduceMotion ? 0.3 : bgOpacity1 }} className="absolute inset-0">
                <Image src="/images/showcase/morph1.png" fill alt="DNA" className="object-cover" loading="lazy" />
             </motion.div>
             <motion.div style={{ opacity: shouldReduceMotion ? 0.5 : bgOpacity2 }} className="absolute inset-0">
                <Image src="/images/showcase/morph2.png" fill alt="Cell" className="object-cover" loading="lazy" decoding="async" />
             </motion.div>
          </div>

          {/* Active Stage 0 Content (Initial Capsule) */}
          <motion.div
            style={applyTransform(opacity0, scale0, y0)}
            className="absolute z-10 flex flex-col items-center justify-center text-center w-full h-full pointer-events-none"
          >
            <div className="w-16 h-16 rounded-full bg-[#BFA054]/20 border border-[#BFA054]/50 flex items-center justify-center mb-4">
              <span className="text-[#BFA054] text-xl">✨</span>
            </div>
            <h3 className="text-2xl font-light text-white tracking-widest pointer-events-auto">
              EVOLUTION
            </h3>
            <motion.p 
               style={{ opacity: shouldReduceMotion ? 1 : scrollTextOpacity, y: shouldReduceMotion ? 0 : scrollTextY }} 
               className="text-neutral-400 text-sm mt-2 pointer-events-auto"
            >
               Scroll to advance
            </motion.p>
          </motion.div>

          {/* Active Stage 1 Content (Expanded Grid) */}
          <motion.div
            style={applyTransform(opacity1, scale1, y1)}
            className="absolute z-10 flex flex-col md:flex-row w-full h-full gap-6 items-center p-4 md:p-8 pointer-events-none"
          >
            <div className="flex-1 p-4 md:p-8 text-center md:text-left pointer-events-auto">
              <div className="w-12 h-12 rounded-full bg-[#BFA054]/20 border border-[#BFA054]/50 flex items-center justify-center mb-6 mx-auto md:mx-0">
                <span className="text-[#BFA054] text-lg">✨</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-light text-white mb-4">
                The Architecture<br/>of Health
              </h3>
              <p className="text-neutral-400 text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                We rebuild health from the ground up, providing a solid foundation of pharmaceutical excellence and molecular precision tailored to every unique individual.
              </p>
            </div>
            
            <motion.div 
              style={{ scale: shouldReduceMotion ? 1 : imgScale1 }}
              className="flex-1 w-full h-full min-h-[250px] border border-white/10 rounded-2xl overflow-hidden relative pointer-events-auto hidden md:block"
            >
              <Image src="/images/showcase/morph1.png" fill alt="DNA Structure" className="object-cover" loading="lazy" decoding="async" />
            </motion.div>
          </motion.div>

          {/* Active Stage 2 Content (Hero Feature) */}
          <motion.div
            style={applyTransform(opacity2, scale2, y2)}
            className="absolute z-10 flex flex-col justify-end w-full h-full p-10 md:p-20 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none"
          >
            <div className="max-w-3xl pointer-events-auto">
              <div className="w-16 h-16 rounded-full bg-[#BFA054]/20 border border-[#BFA054]/50 flex items-center justify-center mb-8">
                 <span className="text-[#BFA054] text-2xl">✨</span>
              </div>
              <h3 className="text-5xl md:text-8xl font-light text-white mb-6">
                A New Era<br/>of Medicine.
              </h3>
              <p className="text-neutral-300 text-xl md:text-2xl font-light">
                Where organic wisdom and advanced technology merge seamlessly to provide an unprecedented standard of personal care.
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
