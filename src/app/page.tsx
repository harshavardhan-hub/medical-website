import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BlogPreview from "@/components/home/BlogPreview";
import AppointmentCTA from "@/components/home/AppointmentCTA";
import dynamic from "next/dynamic";

const SceneTransitionsSection = dynamic(() => import("@/components/home/SceneTransitionsSection"), { ssr: false });
const LuxuryScrollSection = dynamic(() => import("@/components/home/LuxuryScrollSection"), { ssr: false });
const MorphingUISection = dynamic(() => import("@/components/home/MorphingUISection"), { ssr: false });

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Categories />
      <SceneTransitionsSection />
      <WhyChooseUs />
      <LuxuryScrollSection />
      <FeaturedProducts />
      <MorphingUISection />
      <BlogPreview />
      <AppointmentCTA />
    </main>
  );
}
