import HeroCarousel from "@/components/home/HeroCarousel";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  images: string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen">
      {/* Carrusel de imágenes */}
      <HeroCarousel images={images} interval={6000} />

      {/* Contenido del hero */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold pb-4">
            {t('title')}
          </h1>
          <p className="text-xl pb-8">
            {t('subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/rooms"
              className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-medium transition-colors"
            >
              {t('viewRooms')}
            </Link>
            <Link
              href="/rooms"
              className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-medium transition-colors"
            >
              {t('viewOnMap')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}