"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const categories = ["All", "Our Store", "Products", "Team", "Events", "Moments"];

const images = [
  { id: 1, category: "Our Store", url: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?auto=format&fit=crop&w=800&q=80", title: "Main Lobby" },
  { id: 2, category: "Products", url: "https://images.unsplash.com/photo-1584362917165-526a968579e8?auto=format&fit=crop&w=800&q=80", title: "Health Monitors" },
  { id: 3, category: "Team", url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80", title: "Dr. Sarah" },
  { id: 4, category: "Our Store", url: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80", title: "Aisles" },
  { id: 5, category: "Events", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80", title: "Health Camp 2023" },
  { id: 6, category: "Moments", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80", title: "Patient Care" },
  { id: 7, category: "Products", url: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80", title: "Supplements" },
  { id: 8, category: "Team", url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80", title: "Michael C." },
  { id: 9, category: "Our Store", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", title: "Consultation Room" },
  { id: 10, category: "Events", url: "https://images.unsplash.com/photo-1542884748-2b87b36c6b90?auto=format&fit=crop&w=800&q=80", title: "Community Seminar" },
  { id: 11, category: "Products", url: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80", title: "Skincare" },
  { id: 12, category: "Team", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80", title: "Emily R." },
  { id: 13, category: "Moments", url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80", title: "Happy Client" },
  { id: 14, category: "Products", url: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80", title: "Prescriptions" },
  { id: 15, category: "Our Store", url: "https://images.unsplash.com/photo-1538108149393-cebb47cdf141?auto=format&fit=crop&w=800&q=80", title: "Lab Area" },
  { id: 16, category: "Moments", url: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80", title: "Service" },
];

export default function GalleryGrid() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = images.filter(img => activeTab === "All" || img.category === activeTab);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = "auto";
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  }, [lightboxIndex, filteredImages.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  }, [lightboxIndex, filteredImages.length]);

  return (
    <section
      className="pt-32 pb-24 bg-white min-h-screen"
      style={{ transform: "translateZ(0)" }}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut" }}
            style={{ willChange: "transform, opacity" }}
            className="text-5xl font-bold text-foreground mb-6"
          >
            Totall Dawaa Bazaar Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "tween", duration: 0.6, ease: "easeOut", delay: 0.1 }}
            style={{ willChange: "transform, opacity" }}
            className="text-muted-foreground text-lg"
          >
            A glimpse into our world of care and excellence.
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === category ? "text-white" : "text-muted-foreground hover:text-foreground bg-slate-50"
              }`}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-medical-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
                style={{ willChange: "transform, opacity" }}
                key={img.id}
                className="relative group rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <ZoomIn size={24} />
                  </div>
                  <span className="text-medical-300 text-xs font-bold uppercase tracking-wider mb-1 block translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.category}
                  </span>
                  <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
            >
              <X size={24} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-6 text-white/70 hover:text-white transition-colors bg-white/10 p-4 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-4 rounded-full"
            >
              <ChevronRight size={32} />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ type: "tween", duration: 0.3 }}
              style={{ willChange: "transform, opacity" }}
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title}
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-2xl"
              decoding="async"
            />

            <div className="absolute bottom-8 text-center text-white">
              <h3 className="text-xl font-bold">{filteredImages[lightboxIndex].title}</h3>
              <p className="text-white/60 text-sm mt-1">{filteredImages[lightboxIndex].category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
