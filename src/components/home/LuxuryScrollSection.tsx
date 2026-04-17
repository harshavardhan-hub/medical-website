"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from "framer-motion";
import Image from "next/image";

const cards = [
  {
    category: "Premium Supplements",
    title: "Essential Vitality",
    description: "Sourced from the finest ingredients, formulated for maximum absorption.",
    image: "/images/showcase/card1.png",
  },
  {
    category: "Clinical Skincare",
    title: "Dermatological Excellence",
    description: "Science-backed formulas that restore and protect your skin's natural barrier.",
    image: "/images/showcase/card2.png",
  },
  {
    category: "Botanical Remedies",
    title: "Nature's Pharmacy",
    description: "Holistic treatments blending ancient wisdom with strict modern scientific validation.",
    image: "/images/showcase/card3.png",
  },
  {
    category: "Diagnostic Tools",
    title: "Precision Tracking",
    description: "Empower your health journey with advanced at-home diagnostic technologies.",
    image: "/images/showcase/card4.png",
  },
];

export default function LuxuryScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver to pause the engine when out of view
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Calculate the horizontal translation:
  // Usually, to scroll N items, we might need to translate by -((N-1) * ItemWidth)
  const xTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-55%"]);

  // We only run the spring calculations if it's in view to save resources.
  // Although Framer Motion's useSpring runs continuously, setting stiffness/damping
  // creates that feeling of luxury momentum.
  const physics = { damping: 50, mass: 1, stiffness: 200 };
  const springX = useSpring(xTransform, physics);

  // Stop spring update if out of view (minor optimization trick)
  const animatedX = isInView ? springX : xTransform;

  if (shouldReduceMotion) {
    return (
      <section className="bg-[#050505] py-24 text-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-light">The Luxury of Science</h2>
            <p className="mt-4 text-neutral-400 text-lg max-w-xl">Curated collections designed to elevate your health and performance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cards.map((card, i) => (
              <div key={i} className="group relative w-full h-[60vh] overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800">
                <Image src={card.image} fill alt={card.title} className="object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <span className="text-[#BFA054] text-xs md:text-sm font-semibold tracking-widest uppercase mb-2 block">{card.category}</span>
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-2">{card.title}</h3>
                  <p className="text-neutral-300 font-light text-sm md:text-base leading-relaxed">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#050505]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        {/* Intro Text */}
        <div className="absolute top-1/4 left-10 md:left-24 z-10 w-full max-w-md pointer-events-none">
           <h2 className="text-5xl md:text-7xl font-light text-white leading-tight">The Luxury<br/>of Science</h2>
           <p className="mt-4 text-neutral-400 text-lg">Swipe to explore curated collections designed to elevate your health, longevity, and performance.</p>
        </div>

        {/* Scroll Track */}
        <motion.div style={{ x: animatedX, willChange: 'transform' }} className="flex gap-10 lg:gap-20 px-10 md:px-24 pl-[10%] md:pl-[40%] pt-20">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="group relative h-[60vh] w-[80vw] md:h-[70vh] md:w-[45vw] flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-900 shadow-2xl border border-neutral-800/50"
            >
              <Image 
                src={card.image} 
                fill 
                alt={card.title} 
                className="object-cover transition-transform duration-1000 group-hover:scale-110 ease-out" 
                loading="lazy" 
                decoding="async" 
                sizes="(max-width: 768px) 80vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                <span className="text-[#BFA054] text-xs md:text-sm font-semibold tracking-widest uppercase mb-3 block transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">{card.category}</span>
                <h3 className="text-3xl md:text-5xl font-light text-white mb-4 transform transition-all duration-500">{card.title}</h3>
                <p className="text-neutral-300 font-light text-base md:text-lg leading-relaxed max-w-md transform translate-y-4 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">{card.description}</p>
              </div>
            </div>
          ))}
          {/* Buffer item purely for spacing at the end */}
          <div className="w-[10vw] flex-shrink-0" />
        </motion.div>

      </div>
    </section>
  );
}
