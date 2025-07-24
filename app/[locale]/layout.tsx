import "@/styles/globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, localeMetadataMap, alternateUrls } from '@/i18n/config';


const inter = Inter({ subsets: ["latin"] });

// Generar metadatos dinámicos basados en el locale
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const baseUrl = 'https://www.hotellepantoguesthouse.com';
  const currentUrl = alternateUrls[locale as keyof typeof alternateUrls] || baseUrl;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: currentUrl,
      siteName: 'Hotel Lepanto Guesthouse',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('title'),
        }
      ],
      locale: localeMetadataMap[locale] || localeMetadataMap['en'], // Fallback a inglés
      type: 'website',
    },

    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },

    alternates: {
      canonical: currentUrl,
      languages: alternateUrls, // Usa directamente el objeto de config
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        {/* Hreflang para SEO multiidioma */}
        <link
          rel="alternate"
          hrefLang="en"
          href="https://www.hotellepantoguesthouse.com"
        />
        <link
          rel="alternate"
          hrefLang="es"
          href="https://www.hotellepantoguesthouse.com/es"
        />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.hotellepantoguesthouse.com"
        />
      </head>
      <Analytics />
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}