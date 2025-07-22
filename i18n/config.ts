export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export type Locale = typeof locales[number];

// Mapeo de locales para metadatos (Open Graph, etc.)
export const localeMetadataMap: Record<string, string> = {
  'en': 'en_US',
  'es': 'es_ES',
  // En el futuro solo añadir aquí:
  // 'fr': 'fr_FR',
  // 'de': 'de_DE',
  // 'it': 'it_IT',
  // 'mt': 'mt_MT', // maltés
};

// URLs alternativas para hreflang y canonical
export const alternateUrls = {
  'en': 'https://www.hotellepantoguesthouse.com',
  'es': 'https://www.hotellepantoguesthouse.com/es',
  // En el futuro:
  // 'fr': 'https://www.hotellepantoguesthouse.com/fr',
  // 'de': 'https://www.hotellepantoguesthouse.com/de',
} as const;

// Utilidades para manejar locales dinámicamente
export const localeUtils = {
  // Verificar si una ruta es home considerando todos los locales
  isHomePath: (pathname: string): boolean => {
    if (pathname === '/') return true;
    return locales.some(locale => pathname === `/${locale}`);
  },

  // Extraer locale del pathname
  getLocaleFromPath: (pathname: string): Locale | null => {
    const segments = pathname.split('/');
    const potentialLocale = segments[1];
    return locales.includes(potentialLocale as Locale) ? (potentialLocale as Locale) : null;
  },

  // Construir nueva URL con locale
  buildPathWithLocale: (pathname: string, newLocale: Locale): string => {
    const cleanPath = localeUtils.removeLocaleFromPath(pathname);

    // Si es el locale por defecto (inglés), no añadir prefijo
    if (newLocale === defaultLocale) {
      return cleanPath;
    }

    // Para otros locales, añadir prefijo
    return `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`;
  },

  // Remover locale del pathname
  removeLocaleFromPath: (pathname: string): string => {
    const pathLocale = localeUtils.getLocaleFromPath(pathname);
    if (pathLocale && pathLocale !== defaultLocale) {
      return pathname.replace(`/${pathLocale}`, '') || '/';
    }
    return pathname;
  },

  // Obtener todos los locales excepto el actual
  getOtherLocales: (currentLocale: Locale): Locale[] => {
    return locales.filter(locale => locale !== currentLocale);
  }
};