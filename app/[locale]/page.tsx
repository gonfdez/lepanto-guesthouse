// app/page.tsx
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import RoomsSection from "@/components/home/RoomsSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  // Lista de imágenes para el carrusel
  const heroImages = [
    "/assets/hero-malta-1.jpg",
    "/assets/hero-malta-2.jpg",
    "/assets/hero-malta-3.jpg",
    "/assets/hero-malta-4.jpg",
  ];

  return (
    <>
      <HeroSection images={heroImages} />
      <FeaturesSection />
      <RoomsSection />
      <ProcessSection />
      <TestimonialsSection />
      {/* <CTASection /> */}
    </>
  );
}
