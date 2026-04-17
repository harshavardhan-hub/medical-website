"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 1,
      }}
      style={{ willChange: "transform" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 pointer-events-none ${
        scrolled ? "pt-2 px-3 md:pt-4 md:px-6" : "pt-4 px-4 md:pt-6 md:px-8"
      }`}
    >
      <div 
        className={`relative w-full max-w-7xl flex items-center justify-between transition-all duration-300 pointer-events-auto ${
          scrolled || mobileMenuOpen
            ? "bg-white/90 backdrop-blur-xl border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-4 py-2 md:px-5 md:py-2.5"
            : "bg-transparent border border-transparent px-3 py-2"
        }`}
      >
        <div className="flex justify-between items-center w-full md:w-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative w-[160px] h-[40px] md:w-[200px] md:h-[48px]">
            <Image 
              src="/TotalLogo.png" 
              alt="Totall Dawaa Bazaar Logo" 
              fill
              className="object-contain object-left transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`md:hidden p-2 rounded-full transition-colors ${mobileMenuOpen ? "bg-muted text-foreground" : "text-foreground hover:bg-muted/50"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className={`hidden md:flex items-center gap-1 transition-all duration-300 ${scrolled ? 'bg-muted/40 backdrop-blur-md border border-border/40 px-1.5 py-1 rounded-full' : ''}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-semibold transition-colors rounded-full ${
                  isActive ? "text-medical-600" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-medical-50 shadow-sm border border-medical-100/50 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
        
        {/* Actions */}
        <div className="hidden md:flex items-center">
          <Link
            href="/#appointment"
            className="group relative flex items-center gap-2 bg-foreground text-background overflow-hidden px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg active:scale-95 border border-transparent hover:border-medical-600/30"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Appointment 
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-medical-600 transition-transform duration-300 ease-out z-0" />
          </Link>
        </div>

        {/* Mobile Nav - Absolute Floating Card */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-border shadow-2xl rounded-3xl p-3 flex flex-col gap-2 md:hidden origin-top"
            >
              <div className="flex flex-col gap-1 bg-muted/20 rounded-2xl p-2 border border-border/30">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block text-[15px] font-semibold px-4 py-3 rounded-xl transition-all active:scale-[0.98] ${
                          isActive 
                            ? "bg-white text-medical-600 shadow-sm border border-border/50" 
                            : "text-foreground hover:bg-white/50"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="/#appointment"
                  className="flex items-center justify-between bg-gradient-to-r from-medical-500 to-medical-600 text-white px-5 py-4 rounded-2xl font-semibold shadow-md active:scale-95 transition-transform"
                >
                  <span>Book Appointment</span>
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
