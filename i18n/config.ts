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