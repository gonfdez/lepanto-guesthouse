"use client";

import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaWifi, FaSnowflake, FaLock, FaShower } from "react-icons/fa";
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface RoomCardProps {
  images: string[];
  title: string;
  description: string;
  link: string;
  reverse?: boolean;
}

export default function RoomCard({
  images,
  title,
  description,
  link,
  reverse = false,
}: RoomCardProps) {
  const t = useTranslations('roomCard');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const amenities = [
    { icon: <FaLock />, text: t('amenities.smartLock') },
    { icon: <FaWifi />, text: t('amenities.wifi') },
    { icon: <FaSnowflake />, text: t('amenities.ac') },
    { icon: <FaShower />, text: t('amenities.bathroom') },
  ];

  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-2xl shadow-xl overflow-hidden mb-16 border border-gray-100 transition-all hover:shadow-2xl`}>
      {/* Image Carousel */}
      <div className="relative w-full lg:w-1/2 h-80 lg:h-[500px] group">
        <Image 
          src={images[currentImageIndex]} 
          alt={title} 
          fill 
          style={{ objectFit: "cover" }} 
          priority
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg"
              aria-label="Previous image"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 shadow-lg"
              aria-label="Next image"
            >
              <FaChevronRight size={20} />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10 max-w-[90%] overflow-hidden px-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`flex-shrink-0 rounded-full transition-all ${
                    idx === currentImageIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{title}</h3>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {amenities.map((amenity, idx) => (
            <div key={idx} className="flex items-center text-gray-700">
              <div className="text-primary-500 mr-3 text-xl">{amenity.icon}</div>
              <span className="font-medium">{amenity.text}</span>
            </div>
          ))}
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 text-primary-600 hover:text-primary-800 font-bold text-lg uppercase tracking-wider transition-colors"
        >
          {t('bookNow')}
        </a>
      </div>
    </div>
  );
}