import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Totall Dawaa Bazaar | Premium Medical Shop & Pharmacy",
  description: "Totall Dawaa Bazaar is your trusted partner in health and wellness. World-class pharmacy services, healthcare products, and medicines online.",
  keywords: "medical shop, pharmacy, medicines online, healthcare products, Totall Dawaa Bazaar, pharmacy near me, health and wellness",
  alternates: {
    canonical: "https://www.edawabazar.com/",
  },
  openGraph: {
    title: "Totall Dawaa Bazaar | Premium Medical Shop & Pharmacy",
    description: "Totall Dawaa Bazaar is your trusted partner in health and wellness. World-class pharmacy services, healthcare products, and medicines online.",
    url: "https://www.edawabazar.com",
    siteName: "Totall Dawaa Bazaar",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Totall Dawaa Bazaar | Premium Medical Shop & Pharmacy",
    description: "Totall Dawaa Bazaar is your trusted partner in health and wellness. World-class pharmacy services, healthcare products, and medicines online.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground selection:bg-medical-500 selection:text-white`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MedicalBusiness",
          "name": "Totall Dawaa Bazaar",
          "image": "https://www.edawabazar.com/TotalLogo.png",
          "description": "Your trusted partner in health and wellness. World-class pharmacy services and medicines online at Totall Dawaa Bazaar.",
          "url": "https://www.edawabazar.com",
          "telephone": ["+91 7880008860", "+91 9826798175"],
          "email": "tlcdindore@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "64 EC Scheme No 94, Bombay Hospital Square, Ring Road",
            "addressLocality": "Indore",
            "addressRegion": "MP",
            "addressCountry": "IN"
          }
        })}} />
        <Navbar />
        <SmoothScroll>
          <main className="overflow-x-clip w-full flex flex-col min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
