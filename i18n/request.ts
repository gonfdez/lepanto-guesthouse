import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from './config';

export default getRequestConfig(async ({requestLocale}) => {
  // `requestLocale` puede ser undefined, así que lo manejamos
  const locale = (await requestLocale) || defaultLocale;
  
  // Verificamos si el locale es válido
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});