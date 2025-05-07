// types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AvailabilityParams {
  checkIn: string;
  checkOut: string;
  guests?: number;
}

export interface AvailabilityResponse {
  rooms: {
    id: string;
    name: string;
    available: boolean;
    price: number;
    discountedPrice?: number;
  }[];
}

export interface LittleHotelierError extends Error {
  statusCode?: number;
  apiMessage?: string;
}
