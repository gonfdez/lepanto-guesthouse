import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.hotellepantoguesthouse.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'], // Evitar que rastreen rutas internas de Next.js
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
