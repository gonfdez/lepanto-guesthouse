import RoomCard from "@/components/ui/RoomCard";
import { useTranslations } from 'next-intl';

export default function RoomsSection() {
  const t = useTranslations('rooms');

  const rooms = [
    {
      images: Array.from({ length: 19 }, (_, i) => `/assets/double-room/${i + 1}.jpg`),
      title: t('roomTypes.double.title'),
      description: t('roomTypes.double.description'),
      link: "https://vhcompanylimited.guestybookings.com/en/properties/69f205ecbcb1040012406e9b",
    },
    {
      images: Array.from({ length: 19 }, (_, i) => `/assets/twin-room/${i + 1}.jpg`),
      title: t('roomTypes.twin.title'),
      description: t('roomTypes.twin.description'),
      link: "https://vhcompanylimited.guestybookings.com/en/properties/69f2087317ee5600144bd494",
    },
    {
      images: Array.from({ length: 11 }, (_, i) => `/assets/penthouse/${i + 1}.jpg`),
      title: t('roomTypes.penthouse.title'),
      description: t('roomTypes.penthouse.description'),
      link: "https://vhcompanylimited.guestybookings.com/en/properties/69f209724ed58a001af1c2c9",
    },
  ];

  return (
    <section className="py-24 bg-white scroll-mt-14 md:scroll-mt-19" id="rooms">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 tracking-tight">
            {t('sectionTitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('sectionDescription')}
          </p>
        </div>

        <div className="flex flex-col">
          {rooms.map((room, index) => (
            <RoomCard
              key={index}
              images={room.images}
              title={room.title}
              description={room.description}
              link={room.link}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}