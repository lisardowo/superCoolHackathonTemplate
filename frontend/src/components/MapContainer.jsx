import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createCustomMarker } from './mapMarkers.jsx';

// ─── Importación directa del JSON local ───────────────────────────────────────
// Asegúrate de que puebla_data.json esté en /src (o ajusta la ruta relativa)
import pueblaData from '/src/data/puebla_data.json';

// ─── Constantes globales ───────────────────────────────────────────────────────
const PUEBLA_COORDS = [-98.2062, 19.0413]; // [lng, lat]
const ZOOM_INITIAL  = 13;
const MAPBOX_TOKEN  = (import.meta.env.VITE_MAPBOX_TOKEN || '').trim();

// ─── Conversión del JSON local al formato { name, type, lat, lng } ────────────
function buildHubsFromLocal() {
  const hubs = [];

  // Estaciones RUTA (cada línea tiene su color para el popup)
  const lineas = pueblaData?.transporte?.lineas ?? [];
  lineas.forEach((linea) => {
    (linea.estaciones ?? []).forEach((est) => {
      hubs.push({
        id:   est.id,
        name: `${est.nombre} · ${linea.nombre}`,
        type: 'RUTA_STATION',
        lat:  est.lat,
        lng:  est.lng,
        meta: { color: linea.color, transferencias: est.transferencias },
      });
    });
  });

  // Universidades
  const universidades = pueblaData?.puntos_interes?.universidades ?? [];
  universidades.forEach((uni) => {
    hubs.push({
      id:   uni.id,
      name: uni.nombre,
      type: 'UNIVERSITY',
      lat:  uni.lat,
      lng:  uni.lng,
      meta: { lineaCercana: uni.linea_cercana },
    });
  });

  // Plazas comerciales
  const plazas = pueblaData?.puntos_interes?.plazas ?? [];
  plazas.forEach((plaza) => {
    hubs.push({
      id:   plaza.id,
      name: plaza.nombre,
      type: 'PLAZA',
      lat:  plaza.lat,
      lng:  plaza.lng,
      meta: { lineaCercana: plaza.linea_cercana },
    });
  });

  return hubs;
}

// ─── Mapa de tipo → variante de marcador ──────────────────────────────────────
function getMarkerType(hubType) {
  if (hubType === 'RUTA_STATION') return 'talavera';
  if (hubType === 'UNIVERSITY')   return 'pila';
  if (hubType === 'PLAZA')        return 'bache';
  // Tipos heredados del backend (compatibilidad)
  if (hubType === 'POTHOLE')      return 'bache';
  if (hubType === 'CHARGER')      return 'pila';
  return 'talavera';
}

// ─── Componente ───────────────────────────────────────────────────────────────
const MapContainer = ({ isSeniorMode, onMapClick, userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef          = useRef(null);
  const markersRef      = useRef([]);
  const [mapError, setMapError] = useState('');

  // Carga sincrónica del JSON local (sin fetch, sin useEffect de datos)
  const [localHubs] = useState(() => buildHubsFromLocal());

  // ── Inicialización del mapa ──────────────────────────────────────────────────
  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      setMapError('Falta VITE_MAPBOX_TOKEN en el .env');
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isSeniorMode
        ? 'mapbox://styles/mapbox/light-v10'
        : 'mapbox://styles/mapbox/streets-v11',
      center: userLocation ? [userLocation.lng, userLocation.lat] : PUEBLA_COORDS,
      zoom:   isSeniorMode ? ZOOM_INITIAL + 1 : ZOOM_INITIAL,
    });

    mapRef.current = map;

    map.on('load', () => {
      if (isSeniorMode) {
        map.getStyle().layers.forEach((layer) => {
          if (layer.type === 'symbol' && layer.layout['text-field']) {
            map.setLayoutProperty(layer.id, 'text-size', 20);
          }
        });
      }
    });

    if (!isSeniorMode) {
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.on('click', (e) => onMapClick && onMapClick(e.lngLat));
    }

    return () => map.remove();
  }, [isSeniorMode]);

  // ── Renderizar marcadores desde el JSON local ────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const addMarkers = () => {
      // Limpiar marcadores anteriores
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      console.log(`Renderizando ${localHubs.length} puntos desde puebla_data.json`);

      localHubs.forEach((hub) => {
        const markerType = getMarkerType(hub.type);
        const el         = createCustomMarker(markerType);

        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([hub.lng, hub.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(`
              <div style="color:#0f2f67; padding:5px;">
                <strong>${hub.name}</strong><br/>
                <small>${hub.type}</small>
              </div>
            `)
          )
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    // Si el mapa ya cargó, añadir de inmediato; si no, esperar el evento 'load'
    if (map.isStyleLoaded()) {
      addMarkers();
    } else {
      map.once('load', addMarkers);
    }
  }, [localHubs]);

  if (mapError) return <div className="error-overlay">{mapError}</div>;

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{
        width:    '100%',
        height:   '100%',
        position: 'absolute',
        top:      0,
        left:     0,
        zIndex:   0,
      }}
    />
  );
};

export default MapContainer;
