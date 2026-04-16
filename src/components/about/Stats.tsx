"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const stats = [
    { num: 25, suffix: "+", label: "Years Experience" },
    { num: 50, suffix: "k+", label: "Happy Patients" },
    { num: 15, suffix: "k+", label: "Products Available" },
    { num: 100, suffix: "%", label: "Genuine Quality" },
  ];

  return (
    <section className="bg-medical-900 py-20 text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551076805-e18690c5e53b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5 mix-blend-overlay" />
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-medical-700/50">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center px-4">
              <div className="text-4xl md:text-6xl font-bold mb-4 text-medical-200">
                <CountUp end={stat.num} suffix={stat.suffix} />
              </div>
              <p className="text-medical-400 font-medium uppercase tracking-wider text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
