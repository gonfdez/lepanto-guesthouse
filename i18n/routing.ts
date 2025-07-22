import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import { defaultLocale, locales } from './config';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // Esta configuración hace que inglés no tenga prefijo
  localePrefix: {
    mode: 'as-needed'
  }
});

export const {Link, redirect, usePathname, useRouter} = createNavigation(routing);