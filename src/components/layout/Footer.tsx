import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";

const FacebookIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwitterIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const InstagramIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>;
const LinkedinIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

export default function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center relative w-[180px] h-[48px] md:w-[220px] md:h-[60px]">
              <Image 
                src="/TotalLogo.png" 
                alt="Totall Dawaa Bazaar Logo" 
                fill
                className="object-contain object-left" 
              />
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Totall Dawaa Bazaar is your trusted partner in health and wellness. Providing world-class pharmaceutical care, medicines online, and healthcare products to the community since 2011.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={<FacebookIcon />} />
              <SocialLink href="#" icon={<TwitterIcon />} />
              <SocialLink href="#" icon={<InstagramIcon />} />
              <SocialLink href="#" icon={<LinkedinIcon />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/gallery">Our Gallery</FooterLink>
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/terms">Privacy Policy</FooterLink>
              <FooterLink href="/#appointment">Book Consultation</FooterLink>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-lg mb-6">Categories</h3>
            <ul className="flex flex-col gap-4">
              <FooterLink href="#">Prescription Medicines</FooterLink>
              <FooterLink href="#">Over the Counter</FooterLink>
              <FooterLink href="#">Vitamins & Supplements</FooterLink>
              <FooterLink href="#">Medical Devices</FooterLink>
              <FooterLink href="#">Baby & Mother Care</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin size={20} className="text-medical-500 shrink-0 mt-0.5" />
                <span>64 EC Scheme No 94, Bombay Hospital Square, Ring Road, Indore</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground">
                <Phone size={20} className="text-medical-500 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+917880008860" className="hover:text-medical-500 transition-colors">+91 7880008860</a>
                  <a href="tel:+919826798175" className="hover:text-medical-500 transition-colors">+91 9826798175</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail size={20} className="text-medical-500 shrink-0" />
                <a href="mailto:tlcdindore@gmail.com" className="hover:text-medical-500 transition-colors">tlcdindore@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Totall Dawaa Bazaar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Crafted with care for your health.
          </p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:text-medical-500 hover:border-medical-500 hover:shadow-md transition-all"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-muted-foreground hover:text-medical-500 transition-colors">
        {children}
      </Link>
    </li>
  );
}
