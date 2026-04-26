import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Constantes globales
const PUEBLA_COORDS = [-98.2062, 19.0413]; // [lng, lat]
const ZOOM_INITIAL = 13;

const MAPBOX_TOKEN = (import.meta.env.VITE_MAPBOX_TOKEN || '').trim();
const HAS_VALID_TOKEN = MAPBOX_TOKEN.startsWith('pk.');

const MOCK_DATA = {
  hubs: [
    { id: 1, name: 'Hub Zócalo', coords: [-98.1975, 19.0433] },
    { id: 2, name: 'Hub Angelópolis', coords: [-98.2335, 19.0322] }
  ],
  potholes: [
    { id: 101, reportedBy: 'user1', coords: [-98.2010, 19.0400] },
    { id: 102, reportedBy: 'user2', coords: [-98.1990, 19.0450] }
  ]
};

export default function MapContainer({ isSeniorMode, onMapClick }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState('');

  // Helper para crear marcadores Talavera
  const createTalaveraMarker = (type) => {
    const el = document.createElement('div');
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = type === 'hub' ? '#FFFFFF' : '#A52A2A'; // Blanco para Hubs, Terracota para Baches
    el.style.border = type === 'hub' ? '4px dashed #0047AB' : '3px solid #FFFFFF';
    el.style.boxShadow = '0 4px 6px rgba(0,0,0,0.3)';
    el.style.cursor = 'pointer';
    return el;
  };

  // Helper para crear el marcador del usuario Senior
  const createSeniorUserMarker = () => {
    const el = document.createElement('div');
    el.style.width = '40px';
    el.style.height = '40px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = '#0047AB';
    el.style.border = '4px solid #FFFFFF';
    el.style.boxShadow = '0 0 15px rgba(0, 71, 171, 0.8)';
    return el;
  };

  useEffect(() => {
    if (!HAS_VALID_TOKEN) {
      setMapError('Token de Mapbox invalido o ausente. Revisa VITE_MAPBOX_TOKEN en frontend/.env.');
      return undefined;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Inicialización del mapa
    let map;
    try {
      map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: isSeniorMode ? 'mapbox://styles/mapbox/light-v10' : 'mapbox://styles/mapbox/streets-v11',
        center: PUEBLA_COORDS,
        zoom: isSeniorMode ? ZOOM_INITIAL + 1 : ZOOM_INITIAL, // Un poco más de zoom en Senior
      });
      setMapError('');
    } catch (error) {
      setMapError('No se pudo inicializar el mapa. Verifica tu token de Mapbox.');
      return undefined;
    }

    mapRef.current = map;

    map.on('error', (event) => {
      const mapboxMessage = event?.error?.message || '';
      if (mapboxMessage.toLowerCase().includes('invalid mapbox access token')) {
        setMapError('Mapbox rechazo el token. Crea un token publico valido (pk.*) y reinicia Vite.');
      }
    });

    // Control de navegación (solo para Joven)
    if (!isSeniorMode) {
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
    }

    map.on('load', () => {
      // Ajustes específicos para Modo Senior
      if (isSeniorMode) {
        // Aumentar tamaño de letras de calles
        const layers = map.getStyle().layers;
        for (const layer of layers) {
          if (layer.type === 'symbol' && layer.layout['text-field']) {
            map.setLayoutProperty(layer.id, 'text-size', 18); // Letras grandes
            // Remover POIs innecesarios
            if (layer.id.includes('poi')) {
               map.setLayoutProperty(layer.id, 'visibility', 'none');
            }
          }
        }

        // Marcador del usuario (Simulado en Puebla centro)
        new mapboxgl.Marker({ element: createSeniorUserMarker() })
          .setLngLat(PUEBLA_COORDS)
          .addTo(map);

      }

      // Añadir Hubs (En ambos modos, son vitales)
      MOCK_DATA.hubs.forEach((hub) => {
        new mapboxgl.Marker({ element: createTalaveraMarker('hub') })
          .setLngLat(hub.coords)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<strong>${hub.name}</strong>`))
          .addTo(map);
      });

      // Añadir Baches (Solo Modo Joven)
      if (!isSeniorMode) {
        MOCK_DATA.potholes.forEach((pothole) => {
          new mapboxgl.Marker({ element: createTalaveraMarker('pothole') })
            .setLngLat(pothole.coords)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`<small>Bache reportado</small>`))
            .addTo(map);
        });

        // Evento de Click para reportar (Solo Joven)
        map.on('click', (e) => {
          if (onMapClick) {
            onMapClick(e.lngLat);
          }
        });
      }
    });

    // Limpieza
    return () => {
      if (map) map.remove();
    };
  }, [isSeniorMode]); // Re-renderiza si cambia el modo

  if (mapError) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          textAlign: 'center',
          background: '#f3f8ff',
          color: '#0f2f67',
          fontWeight: 700,
        }}
      >
        {mapError}
      </div>
    );
  }

  return (
    <div 
      ref={mapContainerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        zIndex: 0 
      }} 
    />
  );
}
