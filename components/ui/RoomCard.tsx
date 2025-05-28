// components/ui/RoomCard.tsx
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

interface RoomCardProps {
  image: string;
  title: string;
  price: number;
  rating: number;
  link: string;
}

export default function RoomCard({
  image,
  title,
  price,
  rating,
  link,
}: RoomCardProps) {
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
}
