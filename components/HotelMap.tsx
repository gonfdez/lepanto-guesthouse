// components/HotelMap.tsx
'use client';

import { useTranslations } from 'next-intl';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { BusStop, PointOfInterest, MapProps } from '../types/map';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen';
import { useRef } from 'react';

// Función para crear iconos usando SVGs de Heroicons
const createHeroIcon = (iconPath: string, color: string, size: number = 28) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill="white" stroke="${color}" strokeWidth="2"/>
        <g transform="translate(3.5, 3.5)">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="${color}" strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="${iconPath}"/>
          </svg>
        </g>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Función para crear icono simple con letra
const createLetterIcon = (letter: string, color: string, size: number = 28) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill="${color}" stroke="white" strokeWidth="2"/>
        <text x="12" y="16" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">${letter}</text>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Iconos usando Heroicons oficiales
const hotelIcon = createHeroIcon(
  'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25', // home
  '#dc2626',
  32
);

const busStopIcon = createLetterIcon('B', '#2563eb', 28);

const poiIcon = createHeroIcon(
  'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z', // map-pin
  '#16a34a',
  28
);

interface BusStopPopupProps {
  busStop: BusStop;
}

const BusStopPopup: React.FC<BusStopPopupProps> = ({ busStop }) => {
  const t = useTranslations('map');

  return (
    <div className="min-w-[180px]">
      <h3 className="font-bold text-sm mb-2">{busStop.name}</h3>

      {busStop.infoWeb && (
        <a
          href={busStop.infoWeb}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-2 text-blue-600 hover:text-blue-800 underline"
        >
          {t('viewRealTimeSchedules')}
        </a>
      )}

      <div className="space-y-1">
        <p className="text-xs font-semibold text-gray-700">{t('busRoutes')}:</p>
        {busStop.routes.slice(0, 3).map((route, index) => (
          <div key={index} className="flex items-center justify-between bg-blue-50 p-1 rounded text-xs">
            <div className="flex items-center space-x-1">
              <span className="bg-blue-600 text-white px-1 py-0.5 rounded text-xs font-bold">
                {route.number}
              </span>
              <span className="text-xs">{route.destination}</span>
            </div>
            <span className="text-xs text-gray-500">{route.frequency}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

interface POIPopupProps {
  poi: PointOfInterest;
}

const POIPopup: React.FC<POIPopupProps> = ({ poi }) => {
  const t = useTranslations('map');

  return (
    <div className="min-w-[150px]">
      <h3 className="font-bold text-sm mb-1">{poi.name}</h3>
      <p className="text-xs text-green-600 mb-1 capitalize">{poi.type}</p>
      {poi.description && (
        <p className="text-xs text-gray-600 mb-1">{poi.description}</p>
      )}
      {poi.distance && (
        <p className="text-xs text-gray-500">{poi.distance}</p>
      )}
    </div>
  );
};

const HotelMap: React.FC<MapProps> = ({
  hotelCoordinates,
  busStops,
  pointsOfInterest
}) => {
  const t = useTranslations('map');

  const mapRef = useRef<any>(null);

  const handleMouseEnter = () => {
    if (mapRef.current) {
      mapRef.current.scrollWheelZoom.enable();
    }
  };

  const handleMouseLeave = () => {
    if (mapRef.current) {
      mapRef.current.scrollWheelZoom.disable();
    }
  };

  return (
    <div className="w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Mapa Principal */}
      <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          ref={mapRef}
          center={hotelCoordinates}
          zoom={15}
          className="w-full h-full"
          zoomControl={true}
          scrollWheelZoom={false} // Mejor UX en mobile
          fullscreenControl={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          {/* Marcador del Hotel */}
          <Marker position={hotelCoordinates} icon={hotelIcon}>
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-sm text-red-700 mb-1">
                  {t('hotelLocation')}
                </h3>
                <p className="text-xs text-gray-600">
                  {t('yourHome')}
                </p>
              </div>
            </Popup>
          </Marker>

          {/* Marcadores de Paradas de Autobús */}
          {busStops.map((busStop) => (
            <Marker
              key={busStop.id}
              position={busStop.coordinates}
              icon={busStopIcon}
            >
              <Popup>
                <BusStopPopup busStop={busStop} />
              </Popup>
            </Marker>
          ))}

          {/* Marcadores de Puntos de Interés */}
          {pointsOfInterest.slice(0, 5).map((poi) => (
            <Marker
              key={poi.id}
              position={poi.coordinates}
              icon={poiIcon}
            >
              <Popup>
                <POIPopup poi={poi} />
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Info rápida debajo del mapa */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-700">
          <div className="w-6 h-6 bg-red-600 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="white" strokeLinecap="round" strokeLineJoin="round" strokeWidth="3" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
            </svg>
          </div>
          <span>{t('hotelLocation')}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center">
            <span className="text-white text-xs font-bold">B</span>
          </div>
          <span>{t('busStops')} ({busStops.length})</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <div className="w-6 h-6 bg-green-600 rounded-full border-2 border-white flex items-center justify-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path stroke="white" strokeLinecap="round" strokeLineJoin="round" strokeWidth="3" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
            </svg>
          </div>
          <span>{t('nearbyAttractions')} ({pointsOfInterest.length})</span>
        </div>
      </div>
    </div>
  );
};

export default HotelMap;