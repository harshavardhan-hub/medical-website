"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

// Predefined scenes
const scenes = [
  {
    image: "/images/showcase/scene1.png",
    title: "Precision Formulations",
    description: "Every compound is engineered in pristine purity. We bring advanced laboratory science directly to the retail experience, ensuring unparalleled efficacy and quality.",
    tagline: "SCIENCE MEETS CARE",
  },
  {
    image: "/images/showcase/scene2.png",
    title: "Pristine Environments",
    description: "Our pharmaceutical spaces are designed to reflect the quality of the treatments within. Breathe easy in an environment built for health and wellbeing.",
    tagline: "CURATED WELLNESS",
  },
  {
    image: "/images/showcase/scene3.png",
    title: "Tailored Care",
    description: "Your health journey is personal. Our personalized consultation rooms offer a warm, high-tech sanctuary for discussing your unique needs and finding optimal solutions.",
    tagline: "EMPOWERING PATIENTS",
  },
];

export default function SceneTransitionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeScene, setActiveScene] = useState(0);

  // Map scroll progress to active scene
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) {
        if (activeScene !== 0) setActiveScene(0);
      } else if (latest >= 0.33 && latest < 0.66) {
        if (activeScene !== 1) setActiveScene(1);
      } else {
        if (activeScene !== 2) setActiveScene(2);
      }
    });
  }, [scrollYProgress, activeScene]);


  if (shouldReduceMotion) {
    return (
      <section className="bg-black py-24 text-white">
        <div className="container mx-auto px-6">
          {scenes.map((scene, i) => (
            <div key={i} className="mb-24 last:mb-0 space-y-8">
              <div className="relative h-[60vh] w-full overflow-hidden rounded-2xl">
                <Image src={scene.image} fill alt={scene.title} className="object-cover" loading="lazy" decoding="async" />
              </div>
              <div className="max-w-2xl">
                <span className="text-sm tracking-widest text-[#BFA054] md:text-base font-medium">{scene.tagline}</span>
                <h2 className="text-4xl md:text-6xl font-light mt-4 mb-6">{scene.title}</h2>
                <p className="text-lg md:text-xl text-neutral-400 font-light">{scene.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-black">
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, pointerEvents: "none" }}
            animate={{ opacity: 1, pointerEvents: "auto" }}
            exit={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="absolute inset-0 w-full h-full bg-black overflow-hidden z-10"
          >
            {/* Background Images */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <Image src={scenes[activeScene].image} fill alt={scenes[activeScene].title} className="object-cover z-0" loading="lazy" decoding="async" sizes="100vw" />

            {/* Content Container */}
            <div className="relative z-20 flex h-full items-center justify-center container mx-auto px-6 text-white pb-20">
              <div className="absolute w-full max-w-4xl text-center">
                <span className="text-sm tracking-[0.2em] text-[#BFA054] md:text-base font-semibold uppercase">{scenes[activeScene].tagline}</span>
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-light mt-6 mb-8 tracking-tight">{scenes[activeScene].title}</h2>
                <p className="text-lg md:text-2xl text-neutral-300 font-light mx-auto max-w-2xl leading-relaxed">{scenes[activeScene].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
