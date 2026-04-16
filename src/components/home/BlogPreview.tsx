"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const articles = [
  {
    title: "Understanding Your Immune System This Winter",
    category: "Wellness Tips",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&q=75&w=700",
  },
  {
    title: "The Importance of Routine Vitamin Routines",
    category: "Nutrition",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=75&w=700",
  },
  {
    title: "How to Store Medications Safely at Home",
    category: "Health Guide",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=75&w=700",
  },
];

export default function BlogPreview() {
  return (
    <section className="py-24 bg-white" style={{ contain: "layout style" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl font-bold tracking-tight mb-4"
          >
            Health Insights &amp; Updates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut", delay: 0.08 }}
            style={{ willChange: "transform, opacity" }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Expert advice, health tips, and the latest news from our medical professionals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "tween", duration: 0.45, ease: "easeOut", delay: idx * 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className="group cursor-pointer"
            >
              {/* Image — CSS-only scale on hover, no motion.img */}
              <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/3]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover blog-img"
                  loading="lazy"
                  decoding="async"
                  width={700}
                  height={525}
                />
                {/* Category badge — removed backdrop-blur (expensive compositor layer) */}
                <div className="absolute top-4 left-4 bg-white/95 px-3 py-1 rounded-full text-xs font-bold text-medical-600 uppercase tracking-wide">
                  {article.category}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 font-medium">
                <span>{article.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>Today</span>
              </div>

              <h3 className="text-xl font-bold text-foreground leading-snug group-hover:text-medical-500 transition-colors flex items-start gap-2">
                {article.title}
                {/* Arrow — CSS translate only, no extra motion context */}
                <ArrowUpRight
                  size={20}
                  className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-[opacity,transform] duration-300 shrink-0"
                  style={{ willChange: "transform, opacity" }}
                />
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
