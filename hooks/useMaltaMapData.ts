// hooks/useMaltaData.ts
import { BusStop, PointOfInterest } from '@/types/map';

interface UseMaltaDataReturn {
  hotelCoordinates: [number, number];
  busStops: BusStop[];
  pointsOfInterest: PointOfInterest[];
}

export const useMaltaMapData = (): UseMaltaDataReturn => {
  const hotelCoordinates: [number, number] = [35.895699, 14.485098];
  const busStops: BusStop[] = [
    {
      id: '0001',
      coordinates: [35.89648166370564, 14.48603323200154],
      name: 'Hasselin - 1264',
      infoWeb: 'https://service-information.publictransport.com.mt/timetable?bus_stop=1264#',
      routes: [],
    },
    {
      id: '0002',
      coordinates: [35.895940000542865, 14.485487311884755],
      name: 'Hasselin - 1288',
      infoWeb: 'https://service-information.publictransport.com.mt/timetable?bus_stop=1288',
      routes: []
    }
  ];

  const pointsOfInterest: PointOfInterest[] = [];

  return {
    hotelCoordinates,
    busStops,
    pointsOfInterest,
  };
};