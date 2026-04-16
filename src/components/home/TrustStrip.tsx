"use client";

import { Star, Clock, HeartHandshake, ShieldPlus } from "lucide-react";

export default function TrustStrip() {
  const items = [
    { icon: <Star className="text-yellow-400" fill="currentColor" size={20} />, text: "4.9/5 Average Rating" },
    { icon: <Clock className="text-medical-500" size={20} />, text: "24/7 Availability" },
    { icon: <ShieldPlus className="text-medical-500" size={20} />, text: "100% Genuine Medicines" },
    { icon: <HeartHandshake className="text-medical-500" size={20} />, text: "Expert Pharmacists" },
  ];

  // Duplicate items for seamless loop (the marquee slides one full set, then loops)
  const loopItems = [...items, ...items, ...items, ...items];

  return (
    <div className="bg-foreground text-white py-6 overflow-hidden flex whitespace-nowrap relative">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

      {/* Single track — uses GPU transform via animate-marquee */}
      <div
        className="flex items-center gap-16 pr-16 animate-marquee hover:[animation-play-state:paused]"
        style={{ willChange: "transform" }}
      >
        {loopItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3 shrink-0">
            {item.icon}
            <span className="font-medium text-sm tracking-wide uppercase">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
