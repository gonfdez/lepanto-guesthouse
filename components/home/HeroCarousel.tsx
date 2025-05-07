"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface HeroCarouselProps {
  images: string[];
  interval?: number; // tiempo en ms entre cambios de imagen
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
  images,
  interval = 5000, // 5 segundos por defecto
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Función para pasar a la siguiente imagen
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Efecto para cambiar automáticamente las imágenes
  useEffect(() => {
    const timer = setInterval(nextImage, interval);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, [nextImage, interval]);

  // Manejador cuando la imagen termina de cargar
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Hero imagen ${index + 1}`}
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
            priority={index === 0}
            onLoad={index === currentImageIndex ? handleImageLoad : undefined}
          />
        </div>
      ))}

      {/* Overlay para darle un poco de oscuridad a las imágenes y que el texto sea legible */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Indicadores de imágenes (puntos) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ver imagen ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
