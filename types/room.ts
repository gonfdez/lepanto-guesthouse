// types/room.ts
export interface Room {
  id: string;
  name: string;
  description: string;
  maxGuests: number;
  price: number;
  discountedPrice?: number;
  images: string[];
  amenities: string[];
  size: number; // en metros cuadrados
  bedType: string;
  rating: number;
  reviews?: Review[];
  availabilityCalendar?: AvailabilityCalendar;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface AvailabilityCalendar {
  [date: string]: boolean; // true si está disponible, false si no
}
