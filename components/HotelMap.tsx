// components/HotelMap.tsx
'use client';

import { useTranslations } from 'next-intl';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { BusStop, PointOfInterest, MapProps } from '../types/map';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen';
import { useEffect, useRef } from 'react';

// Función para crear icono del hotel con fondo rojo
const createHotelIcon = (iconPath: string, size: number = 32) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill="#dc2626" stroke="white" strokeWidth="3"/>
        <g transform="translate(3.5, 3.5)">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path stroke="white" strokeLinecap="round" strokeLineJoin="round" strokeWidth="5" d="${iconPath}"/>
          </svg>
        </g>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Función para crear icono de bus con fondo blanco y B azul
const createBusIcon = (letter: string, size: number = 28) => {
  return new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="11" fill="white" stroke="#2563eb" strokeWidth="2"/>
        <text x="12" y="16" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">${letter}</text>
      </svg>
    `)}`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
};

// Función para crear iconos de POI usando SVGs de Heroicons
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

// SVGs para la leyenda del hotel (fondo rojo, icono blanco)
const getHotelIconSvg = (iconPath: string, size: number = 24) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="#dc2626" stroke="white" strokeWidth="2"/>
      <g transform="translate(3.5, 3.5)">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="white" strokeLinecap="round" strokeLineJoin="round" strokeWidth="2.5" d="${iconPath}"/>
        </svg>
      </g>
    </svg>
  `)}`;
};

// SVG para la leyenda del bus (fondo blanco, B azul)
const getBusIconSvg = (letter: string, size: number = 24) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="white" stroke="#2563eb" strokeWidth="2"/>
      <text x="12" y="16" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="#2563eb" text-anchor="middle">${letter}</text>
    </svg>
  `)}`;
};

const getHeroIconSvg = (iconPath: string, color: string, size: number = 24) => {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="11" fill="white" stroke="${color}" strokeWidth="2"/>
      <g transform="translate(3.5, 3.5)">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path stroke="${color}" strokeLinecap="round" strokeLineJoin="round" strokeWidth="2" d="${iconPath}"/>
        </svg>
      </g>
    </svg>
  `)}`;
};

// Iconos usando Heroicons oficiales
const hotelIcon = createHotelIcon(
  'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25', // home
  32
);

const busStopIcon = createBusIcon('B', 28);

const poiIcon = createHeroIcon(
  'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z', // map-pin
  '#16a34a',
  28
);

// SVGs para la leyenda (mismo diseño que los iconos del mapa)
const hotelIconSvg = getHotelIconSvg(
  'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
);

const busStopIconSvg = getBusIconSvg('B');

const poiIconSvg = getHeroIconSvg(
  'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
  '#16a34a'
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

const AutoOpenMarker: React.FC<{ position: [number, number]; icon: Icon; children: React.ReactNode }> = ({ 
  position, 
  icon, 
  children 
}) => {
  const markerRef = useRef<any>(null);

  useEffect(() => {
    // Abrir popup automáticamente cuando el componente se monta
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

  return (
    <Marker ref={markerRef} position={position} icon={icon}>
      <Popup>{children}</Popup>
    </Marker>
  );
};

const HotelMap: React.FC<MapProps> = ({
  hotelCoordinates,
  busStops,
  pointsOfInterest
}) => {
  const t = useTranslations('map');

  const mapRef = useRef<any>(null);

  return (
    <div className="w-full">
      {/* Mapa Principal */}
      <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <MapContainer
          ref={mapRef}
          center={[35.90739132566656, 14.492971844710388]}
          zoom={13.5}
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
          <AutoOpenMarker position={hotelCoordinates} icon={hotelIcon}>
            <div className="text-center">
              <h3 className="font-bold text-sm text-red-700 mb-1">
                {t('hotelLocation')}
              </h3>
              <p className="text-xs text-gray-600">
                {t('yourHome')}
              </p>
            </div>
          </AutoOpenMarker>

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
          {pointsOfInterest.map((poi) => (
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

      {/* Leyenda sincronizada con iconos idénticos a los del mapa */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center space-x-2 text-gray-700">
          <img
            src={hotelIconSvg}
            alt="Hotel"
            className="w-6 h-6"
          />
          <span>{t('hotelLocation')}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <img
            src={busStopIconSvg}
            alt="Bus Stop"
            className="w-6 h-6"
          />
          <span>{t('busStops')} ({busStops.length})</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-700">
          <img
            src={poiIconSvg}
            alt="Points of Interest"
            className="w-6 h-6"
          />
          <span>{t('nearbyAttractions')} ({pointsOfInterest.length})</span>
        </div>
      </div>
    </div>
  );
};

export default HotelMap;