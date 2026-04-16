"use client";

import { motion, type Variants } from "framer-motion";
import { Pill, Syringe, Activity, Baby, Stethoscope, HeartPulse, Droplets, Bandage } from "lucide-react";

const categories = [
  { name: "Prescription Medicines", icon: Pill, color: "bg-blue-50 text-blue-600" },
  { name: "Over the Counter", icon: Syringe, color: "bg-green-50 text-green-600" },
  { name: "Vitamins & Supplements", icon: Droplets, color: "bg-orange-50 text-orange-600" },
  { name: "Medical Devices", icon: Stethoscope, color: "bg-purple-50 text-purple-600" },
  { name: "Skincare & Wellness", icon: HeartPulse, color: "bg-pink-50 text-pink-600" },
  { name: "Baby & Mother Care", icon: Baby, color: "bg-yellow-50 text-yellow-600" },
  { name: "First Aid", icon: Bandage, color: "bg-red-50 text-red-600" },
  { name: "Health Monitors", icon: Activity, color: "bg-teal-50 text-teal-600" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      type: "tween",
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.5, ease: "easeOut" },
  },
};

export default function Categories() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl font-bold tracking-tight mb-4 text-foreground"
          >
            Comprehensive Care Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut", delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="text-muted-foreground text-lg"
          >
            Everything you need for your family&#39;s health, carefully organized and easily accessible.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              style={{ willChange: "transform, opacity" }}
              className="group cursor-pointer rounded-2xl border border-border bg-white p-6 hover:shadow-xl hover:shadow-medical-500/5 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                <category.icon size={28} className="stroke-[2]" />
              </div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-medical-600 transition-colors">
                {category.name}
              </h3>
              <div className="w-8 h-1 bg-medical-100 mt-4 rounded-full group-hover:w-16 group-hover:bg-medical-500 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
