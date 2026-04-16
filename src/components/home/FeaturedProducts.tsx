"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag } from "lucide-react";

const products = [
  {
    name: "Advanced BP Monitor X1",
    category: "Health Monitors",
    price: "$89.99",
    image: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&q=75&w=600",
  },
  {
    name: "Premium Omega-3 Fish Oil",
    category: "Supplements",
    price: "$24.99",
    image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=75&w=600",
  },
  {
    name: "Infrared Thermometer Pro",
    category: "Medical Devices",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1585435421671-0c16764628ce?auto=format&fit=crop&q=75&w=600",
  },
  {
    name: "Daily Multi-Vitamin Plus",
    category: "Vitamins",
    price: "$19.50",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=75&w=600",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 bg-slate-50" style={{ contain: "layout style" }}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
              style={{ willChange: "transform, opacity" }}
              className="text-4xl font-bold tracking-tight mb-4"
            >
              Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "tween", duration: 0.5, ease: "easeOut", delay: 0.08 }}
              style={{ willChange: "transform, opacity" }}
              className="text-muted-foreground text-lg"
            >
              Discover our most trusted and highly rated health products.
            </motion.p>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            href="#"
            className="flex items-center gap-2 font-semibold text-medical-600 hover:text-medical-700 transition-colors"
          >
            View Full Shop <ArrowRight size={20} />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "tween", duration: 0.45, ease: "easeOut", delay: idx * 0.08 }}
              style={{ willChange: "transform, opacity" }}
              className="product-card group bg-white rounded-2xl overflow-hidden border border-border"
            >
              {/* Image wrapper — CSS-only scale on hover (no motion.img needed) */}
              <div className="relative h-64 overflow-hidden bg-slate-100 flex items-center justify-center p-8">
                {/* Tinted overlay */}
                <div className="absolute inset-0 bg-medical-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                {/* Plain img + CSS transform scale — composited, no JS on hover */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl shadow-sm relative z-0 product-img"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={400}
                />

                {/* Add to Cart — CSS translate only */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-[opacity,transform] duration-300 z-20" style={{ willChange: "transform, opacity" }}>
                  <button className="w-full bg-medical-500 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:bg-medical-600 transition-colors shadow-lg">
                    <ShoppingBag size={18} /> Quick Add
                  </button>
                </div>
              </div>

              <div className="p-6">
                <span className="text-xs font-bold uppercase tracking-wider text-medical-500 mb-2 block">
                  {product.category}
                </span>
                <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-1 group-hover:text-medical-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{product.price}</span>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
