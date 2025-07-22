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
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">
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
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('links.rooms')}
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('links.booking')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('links.about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('links.faq')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('links.contact')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-primary-400 transition-colors"
                >
                  {t('links.privacyPolicy')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter y redes sociales */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {t('followUs')}
            </h3>
            <p className="mb-4">
              {t('followDescription')}
            </p>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
                aria-label={t('aria.facebook')}
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
                aria-label={t('aria.instagram')}
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-primary-400 transition-colors"
                aria-label={t('aria.twitter')}
              >
                <FaTwitter size={24} />
              </a>
            </div>

            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-800"
                aria-label={t('aria.emailNewsletter')}
              />
              {/* <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-r-md transition-colors"
              >
                {t('subscribe')}
              </button> */}
            </form>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {currentYear} Hotel Lepanto Guesthouse. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;