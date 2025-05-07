// lib/api.ts - Cliente para Little Hotelier API
import axios, { AxiosError, AxiosInstance } from "axios";
import {
  ApiResponse,
  AvailabilityParams,
  AvailabilityResponse,
  LittleHotelierError,
} from "@/types/api";
import { Room } from "@/types/room";
import { BookingFormData, BookingResponse } from "@/types/booking";

// La API URL base de Little Hotelier (esto es un ejemplo, deberás usar la URL real)
const API_BASE_URL = process.env.NEXT_PUBLIC_LITTLE_HOTELIER_API_URL;
const API_KEY = process.env.LITTLE_HOTELIER_API_KEY;

// Configuración base para las peticiones axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Función de utilidad para formatear fechas
const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Formato YYYY-MM-DD
};

// Función para manejar errores de la API
const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const customError: LittleHotelierError = new Error(
      (axiosError.response?.data as any)?.message ||
        "Error en la comunicación con Little Hotelier"
    );

    customError.statusCode = axiosError.response?.status;
    customError.apiMessage = (axiosError.response?.data as any)?.message;

    console.error("API Error:", customError);
    throw customError;
  }

  console.error("Error desconocido:", error);
  throw new Error(
    "Ocurrió un error inesperado. Por favor, inténtalo de nuevo."
  );
};

/**
 * Obtiene la disponibilidad de habitaciones para un rango de fechas
 */
export async function checkAvailability(
  checkIn: Date,
  checkOut: Date,
  guests: number = 1
): Promise<ApiResponse<AvailabilityResponse>> {
  try {
    const response = await apiClient.get<ApiResponse<AvailabilityResponse>>(
      "/availability",
      {
        params: {
          check_in: formatDate(checkIn),
          check_out: formatDate(checkOut),
          guests: guests,
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Obtiene información detallada de las habitaciones
 */
export async function getRooms(): Promise<ApiResponse<Room[]>> {
  try {
    const response = await apiClient.get<ApiResponse<Room[]>>("/rooms");
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Obtiene información de una habitación específica
 */
export async function getRoom(roomId: string): Promise<ApiResponse<Room>> {
  try {
    const response = await apiClient.get<ApiResponse<Room>>(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Crea una nueva reserva
 */
export async function createBooking(
  bookingData: BookingFormData
): Promise<ApiResponse<BookingResponse>> {
  try {
    // Transformamos los datos al formato esperado por la API
    const formattedData = {
      check_in: formatDate(bookingData.checkIn),
      check_out: formatDate(bookingData.checkOut),
      guests: bookingData.guests,
      room_id: bookingData.roomId,
      guest_info: {
        first_name: bookingData.firstName,
        last_name: bookingData.lastName,
        email: bookingData.email,
        phone: bookingData.phone,
        special_requests: bookingData.specialRequests || "",
      },
      payment_info: {
        method: bookingData.paymentMethod,
        // Solo incluimos información de tarjeta si el método es tarjeta de crédito
        ...(bookingData.paymentMethod === "credit_card" && {
          card_number: bookingData.cardNumber,
          card_expiry: bookingData.cardExpiry,
          card_cvc: bookingData.cardCVC,
        }),
      },
    };

    const response = await apiClient.post<ApiResponse<BookingResponse>>(
      "/bookings",
      formattedData
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Obtiene una reserva existente por su ID
 */
export async function getBooking(
  bookingId: string
): Promise<ApiResponse<BookingResponse>> {
  try {
    const response = await apiClient.get<ApiResponse<BookingResponse>>(
      `/bookings/${bookingId}`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Cancela una reserva existente
 */
export async function cancelBooking(
  bookingId: string
): Promise<ApiResponse<BookingResponse>> {
  try {
    const response = await apiClient.post<ApiResponse<BookingResponse>>(
      `/bookings/${bookingId}/cancel`
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * Modifica una reserva existente
 */
export async function updateBooking(
  bookingId: string,
  updateData: Partial<BookingFormData>
): Promise<ApiResponse<BookingResponse>> {
  try {
    // Formateamos solo los datos que están presentes
    const formattedData: Record<string, any> = {};

    if (updateData.checkIn) {
      formattedData.check_in = formatDate(updateData.checkIn);
    }

    if (updateData.checkOut) {
      formattedData.check_out = formatDate(updateData.checkOut);
    }

    if (updateData.guests) {
      formattedData.guests = updateData.guests;
    }

    if (updateData.specialRequests) {
      formattedData.special_requests = updateData.specialRequests;
    }

    const response = await apiClient.put<ApiResponse<BookingResponse>>(
      `/bookings/${bookingId}`,
      formattedData
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
}
