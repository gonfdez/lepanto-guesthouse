// components/LocationSection.tsx
'use client';

import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useMaltaMapData } from '@/hooks/useMaltaMapData';
import { BusStop, PointOfInterest } from '@/types/map';

// Importación dinámica del mapa
const HotelMap = dynamic(() => import('../HotelMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-100 flex items-center justify-center rounded-xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

const LocationSection = () => {
  const t = useTranslations('map');
  const tCommon = useTranslations('common');
  

  
  const { busStops, pointsOfInterest, hotelCoordinates } = useMaltaMapData();

  return (
    <section id="location" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('hotelLocation')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {tCommon('discoverLocation')}
          </p>
        </div>

        {/* Mapa Principal - Ancho completo */}
        <div className="mb-12">
          <HotelMap
            hotelCoordinates={hotelCoordinates}
            busStops={busStops}
            pointsOfInterest={pointsOfInterest}
          />
        </div>

        {/* Información debajo del mapa */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Transporte Público */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {t('busRoutes')}
            </h3>
            <div className="space-y-3">
              {busStops.slice(0, 3).map((stop: BusStop) => (
                <div key={stop.id} className="border-l-4 border-blue-500 pl-3">
                  <h4 className="font-medium text-sm">{stop.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {stop.routes.slice(0, 4).map((route, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {route.number}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Atracciones Cercanas */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {t('nearbyAttractions')}
            </h3>
            <div className="space-y-2">
              {pointsOfInterest.slice(0, 5).map((poi: PointOfInterest) => (
                <div key={poi.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-sm">{poi.name}</h4>
                    <p className="text-xs text-gray-500 capitalize">{poi.type}</p>
                  </div>
                  {poi.distance && (
                    <span className="text-xs text-green-600 font-medium">
                      {poi.distance}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Información del Transporte */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <h3 className="text-lg font-semibold mb-3 text-blue-800">
              {tCommon('usefulInfo')}
            </h3>
            <ul className="text-sm space-y-1 text-blue-700">
              <li>• Tarifa única: €1.50 - €2.00</li>
              <li>• Pase diario: €2.60</li>
              <li>• Pase semanal: €12.00</li>
              <li>• Horario: 5:30 - 23:00</li>
              <li>• App: Malta Public Transport</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;