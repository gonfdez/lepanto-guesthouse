import { FaKey, FaWifi, FaCoffee, FaMapMarkedAlt } from "react-icons/fa";
import FeatureCard from "@/components/ui/FeatureCard";
import { useTranslations } from 'next-intl';

export default function FeaturesSection() {
  const t = useTranslations('features');

  const features = [
    {
      icon: <FaKey className="text-primary-500" size={36} />,
      title: t('automatedCheckin.title'),
      description: t('automatedCheckin.description'),
    },
    {
      icon: <FaWifi className="text-primary-500" size={36} />,
      title: t('coworkingArea.title'),
      description: t('coworkingArea.description'),
    },
    {
      icon: <FaCoffee className="text-primary-500" size={36} />,
      title: t('breakfastService.title'),
      description: t('breakfastService.description'),
    },
    {
      icon: <FaMapMarkedAlt className="text-primary-500" size={36} />,
      title: t('primeLocation.title'),
      description: t('primeLocation.description'),
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center pb-12">
          {t('sectionTitle')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}