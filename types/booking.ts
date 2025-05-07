// types/booking.ts
export interface BookingFormData {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  termsAccepted: boolean;
}

export interface BookingResponse {
  id: string;
  status: "confirmed" | "pending" | "cancelled";
  checkIn: string;
  checkOut: string;
  guests: number;
  roomId: string;
  roomName: string;
  totalPrice: number;
  accessCode?: string;
  bookingDate: string;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}
