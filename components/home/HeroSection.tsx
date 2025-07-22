import HeroCarousel from "@/components/home/HeroCarousel";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface HeroSectionProps {
  images: string[];
}

export default function HeroSection({ images }: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen min-h-[500px]">
      {/* Carrusel de imágenes */}
      <HeroCarousel images={images} interval={6000} />

      {/* Contenido del hero */}
      <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-center pointer-events-none pt-16 md:pt-20">
        <div className="max-w-2xl space-y-4 md:space-y-6 pointer-events-auto">

          {/* Título con contenedor ajustado al contenido */}
          <div className="inline-block backdrop-blur-md bg-black/10 p-3 md:p-4 rounded-xl border border-white/10">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white drop-shadow-2xl !mb-0">
              {t('title')}
            </h1>
          </div>

          {/* Subtítulo con contenedor ajustado al contenido */}
          <div className="inline-block backdrop-blur-md bg-black/10 p-2 md:p-3 rounded-xl border border-white/10">
            <p className="text-lg md:text-xl text-white/95 drop-shadow-lg !m-0">
              {t('subtitle')}
            </p>
          </div>

          {/* Botones más blancos (menos transparentes) */}
          <div className="flex flex-wrap gap-3 md:gap-4 mt-4 md:mt-6">
            <Link
              href="/rooms"
              className="backdrop-blur-md bg-black/15 !text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 border-2 border-primary-500 text-sm md:text-base hover:!text-white"
            >
              <span>{t('viewRooms')}</span>
            </Link>

            <Link
              href="/rooms"
              className="backdrop-blur-md bg-black/15 !text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 border-2 border-primary-500 text-sm md:text-base hover:!text-white"
            >
              <span>{t('viewOnMap')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}