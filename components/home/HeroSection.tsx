// components/home/HeroSection.tsx
import Link from "next/link";
import HeroCarousel from "@/components/home/HeroCarousel";

interface HeroSectionProps {
  images: string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  return (
    <section className="relative h-screen">
      {/* Carrusel de imágenes */}
      <HeroCarousel images={images} interval={6000} />

      {/* Contenido del hero */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tu experiencia ideal en Malta
          </h1>
          <p className="text-xl mb-8">
            Disfruta de una estancia cómoda y moderna con acceso automatizado,
            en el corazón de Malta.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/rooms"
              className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Ver habitaciones
            </Link>
            <Link
              href="/rooms"
              className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Ver en el mapa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
