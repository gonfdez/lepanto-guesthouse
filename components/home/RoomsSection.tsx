// components/home/RoomsSection.tsx
import Link from "next/link";
import RoomCard from "@/components/ui/RoomCard";

export default function RoomsSection() {
  const rooms = [
    {
      image: "/assets/room1.jpg",
      title: "Habitación Estándar",
      price: 65,
      rating: 4.8,
      link: "/rooms/standard",
    },
    {
      image: "/assets/room2.jpg",
      title: "Habitación Superior",
      price: 85,
      rating: 4.9,
      link: "/rooms/superior",
    },
    {
      image: "/assets/room3.jpg",
      title: "Suite Deluxe",
      price: 120,
      rating: 5.0,
      link: "/rooms/deluxe",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">
          Nuestras habitaciones
        </h2>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Todas nuestras habitaciones cuentan con cerraduras inteligentes, aire
          acondicionado, TV de pantalla plana y baño privado.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, index) => (
            <RoomCard
              key={index}
              image={room.image}
              title={room.title}
              price={room.price}
              rating={room.rating}
              link={room.link}
            />
          ))}
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
  );
}
