import { MetadataRoute } from 'next';
import { locales, alternateUrls, defaultLocale } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hotellepantoguesthouse.com';

  // Páginas estáticas base
  const staticPages = [
    '',
  ];

  // Generamos el sitemap mapeando sobre cada página estática y cada idioma
  return staticPages.flatMap((route) => {
    return locales.map((locale) => {
      // Determinamos el path correcto: sin prefijo para el defaultLocale (inglés), y con prefijo para el resto
      const path = locale === defaultLocale ? route : `/${locale}${route}`;
      const url = `${baseUrl}${path}`;

      // Hreflang alternates para multiidioma (requisito de Google para saber las versiones de los idiomas)
      const alternates: Record<string, string> = {
        'x-default': `${baseUrl}${route}`, // versión global recomendada por Google
      };

      locales.forEach((l) => {
        const langPath = l === defaultLocale ? route : `/${l}${route}`;
        alternates[l] = `${baseUrl}${langPath}`;
      });

      return {
        url,
        lastModified: new Date().toISOString(),
        changeFrequency: 'weekly' as const,
        priority: 1.0,
        alternates: {
          languages: alternates,
        },
      };
    });
  });
}
