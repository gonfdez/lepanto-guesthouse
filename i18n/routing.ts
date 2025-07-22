import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { defaultLocale, locales } from './config';

export const routing = defineRouting({
    locales,
    defaultLocale
});

// Estas funciones proporcionan navegación con locale
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);