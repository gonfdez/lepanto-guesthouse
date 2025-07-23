"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LepantoLogo } from "./LepantoLogo";
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { locales, localeUtils, type Locale } from "../../i18n/config";
import { US, ES } from 'country-flag-icons/react/3x2'

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}

interface MobileNavLinkProps extends Omit<NavLinkProps, "isScrolled"> {
  onClick: () => void;
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations('navigation');
  const tHeader = useTranslations('header');

  // Usar la utilidad para detectar home
  const isHome = localeUtils.isHomePath(pathname);
  const showTransparentHeader = isHome && !isScrolled && !isMenuOpen;

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    // ✅ SOLUCIÓN: Verificar posición inicial de scroll al montar el componente
    const checkInitialScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Verificar inmediatamente al montar
    checkInitialScroll();

    const handleScroll = (): void => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Solo se ejecuta una vez al montar

  // Función para cambiar el idioma
  const changeLanguage = (newLocale: Locale) => {
    setIsLanguageMenuOpen(false);
    setIsMenuOpen(false); // También cerrar el menú móvil
    router.push(pathname, { locale: newLocale });
  };

  // Cerrar el menú de idiomas al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-selector")) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Mapeo de locales a banderas y textos
  const localeDisplay = {
    'en': { flag: <US className="w-6 h-5" />, text: 'EN' },
    'es': { flag: <ES className="w-6 h-5" />, text: 'ES' },
    // 'fr': { flag: <FR className="w-5 h-4" />, text: 'FR' },
  } as const;

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${!showTransparentHeader
        ? "bg-white shadow-md py-2"
        : "bg-transparent py-4"
        }`}
      style={{ zIndex: 9999 }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <LepantoLogo
              className="h-10 md:h-15 me-4 md:me-8 w-auto transition-colors duration-300"
              style={{
                color: !showTransparentHeader ? "#1f2937" : "#ffffff",
              }}
            />
            <span
              className="text-xl md:text-2xl font-bold transition-colors duration-300 group-hover:opacity-90"
              style={{
                color: !showTransparentHeader ? "#1f2937" : "#ffffff",
              }}
            >
              Hotel Lepanto Guesthouse
            </span>
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" isScrolled={isScrolled}>
              {t('home')}
            </NavLink>
            <NavLink href="/rooms" isScrolled={isScrolled}>
              {t('rooms')}
            </NavLink>
            <NavLink href="/booking" isScrolled={isScrolled}>
              {t('booking')}
            </NavLink>
            <NavLink href="/faq" isScrolled={isScrolled}>
              {t('faq')}
            </NavLink>

            {/* Selector de idioma dinámico - solo desktop */}
            <div className="language-selector relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={`flex items-center font-medium transition-colors duration-300 ${isScrolled || !isHome
                  ? "text-gray-700 hover:text-primary-600"
                  : "!text-white hover:text-gray-50"
                  }`}
                aria-label={tHeader('selectLanguage')}
              >
                <span className="mr-1">{localeDisplay[locale]?.flag}</span>
                <span className="sr-only md:not-sr-only">
                  {localeDisplay[locale]?.text}
                </span>
              </button>

              {/* Menú desplegable dinámico */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-md shadow-lg z-20">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => changeLanguage(loc)}
                      className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${locale === loc ? "bg-gray-100" : ""
                        }`}
                    >
                      <span className="mr-2">{localeDisplay[loc]?.flag}</span>
                      {localeDisplay[loc]?.text}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Solo botón de menú móvil - sin selector de idioma */}
          <div className="md:hidden">
            <button
              className={`transition-colors duration-300 ${!showTransparentHeader ? "text-gray-800" : "text-white"
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? tHeader('closeMenu') : tHeader('openMenu')}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil con selector de idioma integrado */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
            <div className="flex flex-col py-4">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
                {t('home')}
              </MobileNavLink>
              <MobileNavLink href="/rooms" onClick={() => setIsMenuOpen(false)}>
                {t('rooms')}
              </MobileNavLink>
              <MobileNavLink
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('booking')}
              </MobileNavLink>
              <MobileNavLink href="/faq" onClick={() => setIsMenuOpen(false)}>
                {t('faq')}
              </MobileNavLink>

              {/* Separador */}
              <hr className="my-2 border-gray-200" />

              {/* Selector de idioma móvil */}
              <div className="px-4 py-2">
                <span className="text-sm text-gray-500 font-medium mb-2 block">
                  {tHeader('selectLanguage')}
                </span>
                <div className="flex space-x-2">
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => changeLanguage(loc)}
                      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${locale === loc
                          ? "bg-primary-100 text-primary-700 border border-primary-300"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                      <span className="mr-2">{localeDisplay[loc]?.flag}</span>
                      {localeDisplay[loc]?.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Componentes NavLink y MobileNavLink permanecen igual...
const NavLink: React.FC<NavLinkProps> = ({ href, children, isScrolled }) => {
  const pathname = usePathname();
  const isHome = localeUtils.isHomePath(pathname);
  return (
    <Link
      href={href}
      className={`font-medium transition-colors duration-300 ${isScrolled || !isHome
        ? "text-gray-700 hover:text-primary-600"
        : "!text-white hover:text-gray-50"
        }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  href,
  onClick,
  children,
}) => {
  return (
    <Link
      href={href}
      className="text-gray-700 hover:text-primary-600 px-4 py-2 text-lg"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Header;