"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Over 25 years of trusted community service and healthcare excellence.",
  "100% licensed pharmacists available for professional consultations.",
  "Guaranteed genuine medications sourced directly from manufacturers.",
  "Express delivery within 2 hours in selected metropolitan areas.",
  "Comprehensive patient care programs and medication management.",
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white overflow-hidden" style={{ contain: "layout style" }}>
      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="w-full lg:w-5/12 xl:w-4/12 flex-shrink-0 relative mx-auto lg:mx-0"
        >
          <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80"
              alt="Professional Pharmacist"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="font-semibold text-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-medical-500 animate-pulse" />
                Expert Care
              </p>
            </div>
          </div>

          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut", delay: 0.3 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute -bottom-10 -right-10 lg:-right-16 bg-white p-6 rounded-2xl shadow-xl border border-border max-w-xs"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 rounded-full bg-medical-100 flex items-center justify-center text-medical-600 font-bold text-xl">
                25+
              </div>
              <div>
                <h4 className="font-bold text-foreground leading-tight">Years of<br/>Experience</h4>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Serving the community with unparalleled medical expertise.</p>
          </motion.div>
        </motion.div>

        {/* Content Side */}
        <div className="w-full lg:w-7/12 flex-grow lg:pl-8 xl:pl-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="inline-flex items-center gap-2 text-medical-600 font-semibold uppercase tracking-wider text-sm mb-4"
          >
            <span className="w-8 h-px bg-medical-600 block" />
            Why Choose Totall Dawaa Bazaar
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut", delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-foreground"
          >
            A higher standard of <span className="text-medical-500">pharmacy care.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
            className="text-lg text-muted-foreground mb-10"
          >
            We blend cutting-edge medical technology with traditional, compassionate human care to ensure your health journey is as smooth and successful as possible.
          </motion.p>

          <div className="flex flex-col gap-5">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ type: "tween", duration: 0.4, ease: "easeOut", delay: 0.2 + idx * 0.08 }}
                style={{ willChange: "transform, opacity" }}
                className="flex items-start gap-4 group"
              >
                <CheckCircle2 className="text-medical-500 shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                <p className="text-foreground font-medium group-hover:text-medical-600 transition-colors">{benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
