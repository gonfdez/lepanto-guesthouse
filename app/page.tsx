// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import {
  FaKey,
  FaWifi,
  FaCoffee,
  FaUtensils,
  FaMapMarkedAlt,
  FaStar,
} from "react-icons/fa";
import HeroCarousel from "@/components/home/HeroCarousel";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface RoomCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  link: string;
}

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
}

interface TestimonialCardProps {
  text: string;
  author: string;
  location: string;
}

export default function Home() {
  // Lista de imágenes para el carrusel (asegúrate de que estas rutas sean correctas)
  const heroImages = [
    "/assets/hero-malta-1.jpg",
    "/assets/hero-malta-2.jpg",
    "/assets/hero-malta-3.jpg",
    "/assets/hero-malta-4.jpg",
  ];

  return (
    <>
      {/* Hero Section con carrusel */}
      <section className="relative h-screen">
        {/* Carrusel de imágenes */}
        <HeroCarousel images={heroImages} interval={6000} />

        {/* Contenido del hero */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl text-white z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Tu experiencia ideal en Malta
            </h1>
            <p className="text-xl mb-8">
              Disfruta de una estancia cómoda y moderna con acceso automatizado,
              en el corazón de Malta.
            </p>
            <div className="flex flex-wrap gap-4">
              {/* <Link
                href="/booking"
                className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-md font-medium transition-colors"
              >
                Reservar ahora
              </Link> */}
              <Link
                href="/rooms"
                className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Ver habitaciones
              </Link>
              <Link
                href="/rooms"
                className="bg-white hover:bg-gray-100 text-gray-800 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Ver en el mapa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Características principales */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Una experiencia única
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaKey className="text-primary-500" size={36} />}
              title="Check-in Automatizado"
              description="Olvídate de horarios restrictivos y recepcionistas. Accede a cualquier hora con nuestro sistema de cerraduras inteligentes y disfruta de total privacidad y flexibilidad."
            />
            <FeatureCard
              icon={<FaWifi className="text-primary-500" size={36} />}
              title="Zona de Coworking"
              description="Espacio relajante dedicado para trabajar con WiFi de alta velocidad y todo lo necesario para ser productivo durante tu estancia."
            />
            <FeatureCard
              icon={<FaCoffee className="text-primary-500" size={36} />}
              title="Servicio de Desayuno"
              description="Comienza tu día con energía gracias a nuestro delicioso desayuno con productos locales y opciones para todos los gustos."
            />
            <FeatureCard
              icon={<FaMapMarkedAlt className="text-primary-500" size={36} />}
              title="Ubicación Privilegiada"
              description="Nos encontramos a pocos minutos caminando de las principales atracciones, playas y restaurantes de Malta. La ubicación perfecta para explorar la isla."
            />
          </div>
        </div>
      </section>

      {/* Habitaciones destacadas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Nuestras habitaciones
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Todas nuestras habitaciones cuentan con cerraduras inteligentes,
            aire acondicionado, TV de pantalla plana y baño privado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RoomCard
              image="/assets/room1.jpg" // Ajustar ruta según la ubicación real de tus imágenes
              title="Habitación Estándar"
              price={65}
              rating={4.8}
              link="/rooms/standard"
            />
            <RoomCard
              image="/assets/room2.jpg" // Ajustar ruta según la ubicación real de tus imágenes
              title="Habitación Superior"
              price={85}
              rating={4.9}
              link="/rooms/superior"
            />
            <RoomCard
              image="/assets/room3.jpg" // Ajustar ruta según la ubicación real de tus imágenes
              title="Suite Deluxe"
              price={120}
              rating={5.0}
              link="/rooms/deluxe"
            />
          </div>

          <div className="text-center mt-8">
            <Link
              href="/rooms"
              className="inline-block border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-2 rounded-md transition-colors"
            >
              Ver todas las habitaciones
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de proceso de reserva */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cómo funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <ProcessStep
              number="1"
              title="Reserva online"
              description="Selecciona tu habitación y fechas a través de nuestro sistema de reservas."
            />
            <ProcessStep
              number="2"
              title="Check-in digital"
              description="Realiza el check-in digital desde tu móvil, sin necesidad de esperar en la recepción."
            />
            <ProcessStep
              number="3"
              title="Recibe tu código"
              description="Después de hacer el check-in, recibirás un código único para acceder a tu habitación."
            />
            <ProcessStep
              number="4"
              title="Disfruta tu estancia"
              description="Relájate y disfruta de tu estancia con total privacidad."
            />
          </div>
        </div>
      </section>

      {/* Sección de reseñas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Lo que dicen nuestros huéspedes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              text="La experiencia con las cerraduras inteligentes fue perfecta. Llegamos tarde y pudimos entrar sin problemas."
              author="María García"
              location="España"
            />
            <TestimonialCard
              text="Habitaciones muy limpias y modernas. La ubicación es perfecta para explorar la isla."
              author="John Smith"
              location="Reino Unido"
            />
            <TestimonialCard
              text="El sistema automatizado hizo que nuestra estancia fuera muy cómoda. Definitivamente volveremos."
              author="Laura Bianchi"
              location="Italia"
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary-600 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para vivir la experiencia?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Reserva ahora y disfruta de una estancia inolvidable.
          </p>
          <Link
            href="/booking"
            className="inline-block border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white px-6 py-2 rounded-md transition-colors"
          >
            Reservar ahora
          </Link>
        </div>
      </section>
    </>
  );
}

// Componente para características
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Componente para tarjetas de habitaciones
const RoomCard: React.FC<RoomCardProps> = ({
  image,
  title,
  price,
  rating,
  link,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-56">
        <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <span className="ml-1 text-gray-800">{rating}</span>
          </div>
        </div>
        <p className="text-gray-600 mb-4">Desde €{price} / noche</p>
        <Link
          href={link}
          className="block text-center bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md transition-colors"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

// Componente para pasos del proceso
const ProcessStep: React.FC<ProcessStepProps> = ({
  number,
  title,
  description,
}) => {
  return (
    <div className="text-center">
      <div className="bg-primary-500 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Componente para testimonios
const TestimonialCard: React.FC<TestimonialCardProps> = ({
  text,
  author,
  location,
}) => {
  return (
    <div className="flex flex-col justify-between bg-white p-6 rounded-lg shadow-md">
      <div className="text-yellow-400 flex mb-4">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <p className="text-gray-600 mb-4 italic">"{text}"</p>
      <div>
        <span className="font-semibold me-4">{author}</span>
        <span className="text-gray-500 text-sm">{location}</span>
      </div>
    </div>
  );
};
