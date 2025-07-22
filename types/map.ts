// types/map.ts
export interface BusRoute {
  number: string;
  destination: string;
  nextDeparture?: string;
  frequency: string;
}

export interface BusStop {
  id: string;
  name: string;
  coordinates: [number, number];
  routes: BusRoute[];
  infoWeb: string
}

export interface PointOfInterest {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'beach' | 'restaurant' | 'historical' | 'shopping' | 'attraction';
  description?: string;
  distance?: string;
}

export interface MapProps {
  hotelCoordinates: [number, number];
  busStops: BusStop[];
  pointsOfInterest: PointOfInterest[];
}