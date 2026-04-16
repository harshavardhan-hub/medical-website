"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Cross, Menu, X, ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Terms & Privacy", href: "/terms" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // useScroll reads directly from the document scroll position.
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Simply turn on the frosted glass background when scrolled past 20px
    setScrolled(latest > 20);
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.nav
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      transition={{
        type: "tween",
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ willChange: "transform" }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled || mobileMenuOpen
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-medical-500 text-white p-2 rounded-lg group-hover:bg-medical-600 transition-colors">
            <Cross size={20} className="stroke-[2.5]" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground group-hover:text-medical-600 transition-colors">
            Medicare<span className="text-medical-500">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-medical-500 ${
                    isActive ? "text-medical-500" : "text-muted-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <Link
            href="/#appointment"
            className="flex items-center gap-2 bg-foreground text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-medical-600 transition-colors active:scale-95"
          >
            Order Now <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="md:hidden bg-white border-b border-border overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-lg font-medium py-2 border-b border-muted ${
                    pathname === link.href ? "text-medical-500" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#appointment"
                className="mt-4 flex items-center justify-center gap-2 bg-medical-500 text-white px-6 py-3 rounded-full font-medium"
              >
                Order Now <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
