// hooks/useMaltaMapData.ts
import { BusStop, PointOfInterest } from '@/types/map';

interface UseMaltaMapDataReturn {
  hotelCoordinates: [number, number];
  busStops: BusStop[];
  pointsOfInterest: PointOfInterest[];
}

export const useMaltaMapData = (): UseMaltaMapDataReturn => {
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

  const pointsOfInterest: PointOfInterest[] = [
    // Muy cerca (5-15 minutos)
    {
      id: 'poi001',
      name: 'Msida Marina',
      coordinates: [35.89707731485054, 14.495067613527475],
      type: 'attraction',
      description: 'Beautiful marina with restaurants and waterfront dining',
      distance: '500m walk'
    },
    {
      id: 'poi002',
      name: 'Ta\' Xbiex Waterfront',
      coordinates: [35.89966230755065, 14.500473195011482],
      type: 'attraction',
      description: 'Scenic waterfront promenade with harbor views',
      distance: '800m walk'
    },
    // Cerca (15-25 minutos)
    {
      id: 'poi003',
      name: 'Manoel Island & Fort Manoel',
      coordinates: [35.9032101722092, 14.505441368043506],
      type: 'historical',
      description: '18th-century star-shaped fort built by the Knights of Malta',
      distance: '15 min walk'
    },
    {
      id: 'poi004',
      name: 'Gzira Waterfront',
      coordinates: [35.90653151470082, 14.498029991852837],
      type: 'attraction',
      description: 'Peaceful waterfront area connecting to Sliema',
      distance: '12 min bus'
    },
    {
      id: 'poi005',
      name: 'Sliema Promenade',
      coordinates: [35.908932999646, 14.504815396879035],
      type: 'attraction',
      description: 'Famous 3km seafront promenade perfect for evening strolls',
      distance: '15 min bus'
    },
    {
      id: 'poi006',
      name: 'The Point Shopping Mall',
      coordinates: [35.907372842638594, 14.51093248153767],
      type: 'shopping',
      description: 'Modern shopping complex at Tigné Point with international brands',
      distance: '20 min bus'
    },
    // Destinos principales (20-30 minutos)
    {
      id: 'poi007',
      name: 'Valletta - St. John\'s Co-Cathedral',
      coordinates: [35.89802616158123, 14.51240041163465],
      type: 'historical',
      description: 'Magnificent baroque cathedral with Caravaggio masterpieces',
      distance: '25 min bus'
    },
    {
      id: 'poi008',
      name: 'Upper Barrakka Gardens',
      coordinates: [35.89535289899513, 14.511932968043283],
      type: 'attraction',
      description: 'Historic gardens with stunning Grand Harbour views and cannon salute',
      distance: '25 min bus'
    },
    {
      id: 'poi009',
      name: 'Valletta Waterfront',
      coordinates: [35.89029521821361, 14.508017583384582],
      type: 'attraction',
      description: 'Historic waterfront with restored 18th-century buildings and restaurants',
      distance: '20 min bus'
    },
    {
      id: 'poi010',
      name: 'Spinola Bay',
      coordinates: [35.91939632356603, 14.491801996879422],
      type: 'attraction',
      description: 'Picturesque fishing village bay with traditional boats and restaurants',
      distance: '20 min bus'
    },
    {
      id: 'poi011',
      name: 'St. Julian\'s Promenade',
      coordinates: [35.916677203977564, 14.493734738954464],
      type: 'attraction',
      description: 'Vibrant promenade with restaurants, cafes and nightlife options',
      distance: '20 min bus'
    },
    {
      id: 'poi012',
      name: 'Balluta Bay',
      coordinates: [35.91509007920205, 14.494203143184604],
      type: 'beach',
      description: 'Popular bay with Blue Flag beach and Art Nouveau architecture',
      distance: '18 min bus'
    },
    {
      id: 'poi013',
      name: 'Paceville',
      coordinates: [35.923021522185266, 14.491076763553723],
      type: 'attraction',
      description: 'Malta\'s main nightlife district with clubs, bars and entertainment',
      distance: '25 min bus'
    },
    {
      id: 'poi014',
      name: 'Portomaso Marina',
      coordinates: [35.92158727741912, 14.492537565701243],
      type: 'attraction',
      description: 'Luxury marina with high-end restaurants and Malta\'s tallest building',
      distance: '22 min bus'
    },
    {
      id: 'poi015',
      name: 'Fort St. Elmo',
      coordinates: [35.902497611661786, 14.518631383384795],
      type: 'historical',
      description: 'Historic fort and National War Museum with Great Siege exhibits',
      distance: '30 min bus'
    }
  ];

  return {
    hotelCoordinates,
    busStops,
    pointsOfInterest,
  };
};