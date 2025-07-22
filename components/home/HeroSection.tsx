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
      <div className="absolute inset-0 container mx-auto px-4 flex flex-col justify-center pointer-events-none">
        <div className="max-w-2xl space-y-6 pointer-events-auto">

          {/* Título con contenedor ajustado al contenido */}
          <div className="inline-block backdrop-blur-md bg-black/20 p-4 rounded-xl border border-white/10">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl !mb-0">
              {t('title')}
            </h1>
          </div>

          {/* Subtítulo con contenedor ajustado al contenido */}
          <div className="inline-block backdrop-blur-md bg-black/15 p-3 rounded-xl border border-white/10">
            <p className="text-xl text-white/95 drop-shadow-lg !m-0">
              {t('subtitle')}
            </p>
          </div>

          {/* Botones más blancos (menos transparentes) */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/rooms"
              className="group bg-white/80 hover:bg-white/90 text-gray-900 font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 border border-white/40"
            >
              <span>{t('viewRooms')}</span>
            </Link>

            <Link
              href="/rooms"
              className="group bg-white/80 hover:bg-white/90 text-gray-900 font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 border border-white/40"
            >
              <span>{t('viewOnMap')}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}