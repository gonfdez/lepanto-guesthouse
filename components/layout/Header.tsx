"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { LepantoLogo } from "./LepantoLogo";
import { usePathname } from "next/navigation";


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
  const [language, setLanguage] = useState<"es" | "en">("es"); // Por defecto español
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const showTransparentHeader = isHome && !isScrolled && !isMenuOpen;

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para cambiar el idioma
  const toggleLanguage = (lang: "es" | "en") => {
    setLanguage(lang);
    setIsLanguageMenuOpen(false);
    // Aquí irá la lógica para cambiar el idioma cuando implementes i18n
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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${!showTransparentHeader
        ? "bg-white shadow-md py-2"
        : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo - Solo este título tiene override de estilos */}
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

          {/* Navegación de escritorio - Usando los estilos normales de enlaces */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" isScrolled={isScrolled}>
              Inicio
            </NavLink>
            <NavLink href="/rooms" isScrolled={isScrolled}>
              Habitaciones
            </NavLink>
            <NavLink href="/booking" isScrolled={isScrolled}>
              Reservas
            </NavLink>
            {/* <NavLink href="/about" isScrolled={isScrolled}>
              Nosotros
            </NavLink> */}
            <NavLink href="/faq" isScrolled={isScrolled}>
              FAQ
            </NavLink>
            {/* <NavLink href="/contact" isScrolled={isScrolled}>
              Contacto
            </NavLink> */}

            {/* Selector de idioma */}
            <div className="language-selector relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={`flex items-center font-medium transition-colors duration-300 ${isScrolled || !isHome
                  ? "text-gray-700 hover:text-primary-600"
                  : "!text-white hover:text-gray-50"
                  }`}
                aria-label="Seleccionar idioma"
              >
                <span className="mr-1">{language === "es" ? "🇪🇸" : "🇬🇧"}</span>
                <span className="sr-only md:not-sr-only">
                  {language === "es" ? "ES" : "EN"}
                </span>
              </button>

              {/* Menú desplegable de idiomas */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-md shadow-lg z-20">
                  <button
                    onClick={() => toggleLanguage("es")}
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === "es" ? "bg-gray-100" : ""
                      }`}
                  >
                    <span className="mr-2">🇪🇸</span> ES
                  </button>
                  <button
                    onClick={() => toggleLanguage("en")}
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === "en" ? "bg-gray-100" : ""
                      }`}
                  >
                    <span className="mr-2">🇬🇧</span> EN
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Botón de menú móvil y selector de idioma en móvil */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Selector de idioma móvil */}
            <div className="language-selector relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={`flex items-center transition-colors duration-300 ${!showTransparentHeader ? "text-gray-800" : "text-white"
                  }`}
                aria-label="Seleccionar idioma"
              >
                <span className="text-xl">
                  {language === "es" ? "🇪🇸" : "🇬🇧"}
                </span>
              </button>

              {/* Menú desplegable de idiomas */}
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 py-2 w-24 bg-white rounded-md shadow-lg z-20">
                  <button
                    onClick={() => toggleLanguage("es")}
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === "es" ? "bg-gray-100" : ""
                      }`}
                  >
                    <span className="mr-2">🇪🇸</span> ES
                  </button>
                  <button
                    onClick={() => toggleLanguage("en")}
                    className={`flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${language === "en" ? "bg-gray-100" : ""
                      }`}
                  >
                    <span className="mr-2">🇬🇧</span> EN
                  </button>
                </div>
              )}
            </div>

            {/* Botón del menú móvil */}
            <button
              className={`transition-colors duration-300 ${!showTransparentHeader ? "text-gray-800" : "text-white"
                }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md">
            <div className="flex flex-col py-4">
              <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </MobileNavLink>
              <MobileNavLink href="/rooms" onClick={() => setIsMenuOpen(false)}>
                Habitaciones
              </MobileNavLink>
              <MobileNavLink
                href="/booking"
                onClick={() => setIsMenuOpen(false)}
              >
                Reservas
              </MobileNavLink>
              {/* <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
                Nosotros
              </MobileNavLink> */}
              <MobileNavLink href="/faq" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </MobileNavLink>
              {/* <MobileNavLink
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </MobileNavLink> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Componente para enlaces de navegación de escritorio
const NavLink: React.FC<NavLinkProps> = ({ href, children, isScrolled }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
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

// Componente para enlaces de navegación móvil
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
