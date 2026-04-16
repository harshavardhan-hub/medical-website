import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Categories from "@/components/home/Categories";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BlogPreview from "@/components/home/BlogPreview";
import AppointmentCTA from "@/components/home/AppointmentCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <Categories />
      <WhyChooseUs />
      <FeaturedProducts />
      <BlogPreview />
      <AppointmentCTA />
    </main>
  );
}
