// components/home/FeaturesSection.tsx
import { FaKey, FaWifi, FaCoffee, FaMapMarkedAlt } from "react-icons/fa";
import FeatureCard from "@/components/ui/FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      icon: <FaKey className="text-primary-500" size={36} />,
      title: "Check-in Automatizado",
      description:
        "Olvídate de horarios restrictivos y recepcionistas. Accede a cualquier hora con nuestro sistema de cerraduras inteligentes y disfruta de total privacidad y flexibilidad.",
    },
    {
      icon: <FaWifi className="text-primary-500" size={36} />,
      title: "Zona de Coworking",
      description:
        "Espacio relajante dedicado para trabajar con WiFi de alta velocidad y todo lo necesario para ser productivo durante tu estancia.",
    },
    {
      icon: <FaCoffee className="text-primary-500" size={36} />,
      title: "Servicio de Desayuno",
      description:
        "Comienza tu día con energía gracias a nuestro delicioso desayuno con productos locales y opciones para todos los gustos.",
    },
    {
      icon: <FaMapMarkedAlt className="text-primary-500" size={36} />,
      title: "Ubicación Privilegiada",
      description:
        "Nos encontramos a pocos minutos caminando de las principales atracciones, playas y restaurantes de Malta. La ubicación perfecta para explorar la isla.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Una experiencia única
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
