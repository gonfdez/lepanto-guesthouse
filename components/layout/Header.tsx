"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

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

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo - Solo este título tiene override de estilos */}
          <Link
            href="/"
            className="text-2xl font-bold transition-colors duration-300"
            style={{
              color: isScrolled || isMenuOpen ? "#1f2937" : "#ffffff",
              textDecoration: "none",
            }}
          >
            Lepanto Guest House
          </Link>

          {/* Navegación de escritorio - Usando los estilos normales de enlaces */}
          <nav className="hidden md:flex space-x-8">
            <NavLink href="/" isScrolled={isScrolled}>
              Inicio
            </NavLink>
            <NavLink href="/rooms" isScrolled={isScrolled}>
              Habitaciones
            </NavLink>
            <NavLink href="/booking" isScrolled={isScrolled}>
              Reservas
            </NavLink>
            <NavLink href="/about" isScrolled={isScrolled}>
              Nosotros
            </NavLink>
            <NavLink href="/faq" isScrolled={isScrolled}>
              FAQ
            </NavLink>
            <NavLink href="/contact" isScrolled={isScrolled}>
              Contacto
            </NavLink>
          </nav>

          {/* Botón de menú móvil */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isScrolled || isMenuOpen ? "text-gray-800" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
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
              <MobileNavLink href="/about" onClick={() => setIsMenuOpen(false)}>
                Nosotros
              </MobileNavLink>
              <MobileNavLink href="/faq" onClick={() => setIsMenuOpen(false)}>
                FAQ
              </MobileNavLink>
              <MobileNavLink
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
              >
                Contacto
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Componente para enlaces de navegación de escritorio
const NavLink: React.FC<NavLinkProps> = ({ href, children, isScrolled }) => {
  return (
    <Link
      href={href}
      className={`font-medium transition-colors duration-300 ${
        isScrolled
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
