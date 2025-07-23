// app/page.tsx
import styles from './page.module.css';
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import RoomsSection from "@/components/home/RoomsSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import LocationSection from "@/components/home/LocationSection";

export default function Home() {
  // Lista de imágenes para el carrusel
  const heroImages = [
    "/assets/hero-malta-1.jpg",
    "/assets/hero-malta-2.jpg",
    "/assets/hero-malta-3.jpg",
    "/assets/hero-malta-4.jpg",
  ];

  return (
    <div className={styles.smoothScrollPage}>
      <HeroSection images={heroImages} />
      <FeaturesSection />
      <RoomsSection />
      <LocationSection />
      <ProcessSection />
      <TestimonialsSection />
    </div>
  );
}
