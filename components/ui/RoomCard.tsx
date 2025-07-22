import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('roomCard');

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
        <p className="text-gray-600 mb-4">
          {t('from')} {price}€ {t('perNight')}
        </p>
        <Link
          href={link}
          className="block text-center bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md transition-colors"
        >
          {t('viewDetails')}
        </Link>
      </div>
    </div>
  );
}