import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-16">
      <h1 className="text-4xl font-semibold mb-4">{t('title')}</h1>
      <p className="text-lg text-gray-600 mb-6">
        {t('description')}
      </p>
      <Link href="/" className="text-blue-500 underline">
        {t('backHome')}
      </Link>
    </section>
  );
}