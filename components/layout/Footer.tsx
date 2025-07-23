"use client";

import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');

  return (
    <footer className="relative pt-12 pb-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/beige-marmol.jpg')`
        }}
      ></div>

      {/* ✨ Contenido del footer */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Información de contacto */}
            <div className="backdrop-blur-sm rounded-lg p-6 shadow-lg h-fit">
              <h3 className="text-gray-800 text-xl font-semibold mb-4">
                Hotel Lepanto Guesthouse
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-primary-400" />
                  <span>Triq Il-Wied Ta' L-Imsida, Malta</span>
                </li>
                <li className="flex items-center">
                  <FaPhone className="mr-2 text-primary-400" />
                  <a href="tel:+35612345678">+356 1234 5678</a>
                </li>
                <li className="flex items-center">
                  <FaEnvelope className="mr-2 text-primary-400" />
                  <a href="mailto:info@lepantoguesthouse.com">
                    info@lepantoguesthouse.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Enlaces rápidos */}
            <div className="backdrop-blur-sm rounded-lg p-6 shadow-lg h-fit">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {t('quickLinks')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/rooms"
                    className="hover:text-primary-400 transition-colors text-gray-700"
                  >
                    {t('links.rooms')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="hover:text-primary-400 transition-colors text-gray-700"
                  >
                    {t('links.booking')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-primary-400 transition-colors text-gray-700"
                  >
                    {t('links.about')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-primary-400 transition-colors text-gray-700"
                  >
                    {t('links.faq')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-primary-400 transition-colors text-gray-700"
                  >
                    {t('links.contact')}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-primary-400 transition-colors text-gray-700"
                  >
                    {t('links.privacyPolicy')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Redes sociales */}
            <div className="backdrop-blur-sm rounded-lg p-6 shadow-lg h-fit">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                {t('followUs')}
              </h3>
              <p className="mb-4 text-gray-700">
                {t('followDescription')}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary-400 transition-colors"
                  aria-label={t('aria.facebook')}
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary-400 transition-colors"
                  aria-label={t('aria.instagram')}
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-primary-400 transition-colors"
                  aria-label={t('aria.twitter')}
                >
                  <FaTwitter size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 text-center">
            <p className="text-sm">
              &copy; {currentYear} Hotel Lepanto Guesthouse. {t('copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;