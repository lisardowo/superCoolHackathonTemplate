import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { apiService } from '../services/api';

// Constantes globales
const PUEBLA_COORDS = [-98.2062, 19.0413]; // [lng, lat]
const ZOOM_INITIAL = 13;
const MAPBOX_TOKEN = (import.meta.env.VITE_MAPBOX_TOKEN || '').trim();

const MapContainer = ({ isSeniorMode, onMapClick, userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]); // Para limpiar marcadores viejos
  const [mapError, setMapError] = useState('');
  const [dynamicHubs, setDynamicHubs] = useState([]);

  // 1. Obtener datos del Backend
  useEffect(() => {
    const fetchHubs = async () => {
      try {
        const coords = userLocation || { lat: PUEBLA_COORDS[1], lng: PUEBLA_COORDS[0] };
        const data = await apiService.getNearbyHubs(coords.lat, coords.lng);
        setDynamicHubs(data.hubs); 
      } catch (err) {
        console.error("Error al traer Hubs del JSON:", err);
      }
    };
    fetchHubs();
  }, [userLocation]);

  // 2. Helpers Visuales (Talavera)
const createTalaveraMarker = (type, color = '#0047AB') => {
  const el = document.createElement('div');
  // 🌟 IMPORTANTE: Forzar dimensiones y z-index
  el.style.width = '32px';
  el.style.height = '32px';
  el.style.borderRadius = '50%';
  el.style.backgroundColor = '#FFFFFF';
  el.style.border = `4px dashed ${color}`;
  el.style.boxShadow = '0 4px 10px rgba(0,0,0,0.4)';
  el.style.cursor = 'pointer';
  el.style.zIndex = '10'; // Asegurar que esté sobre el mapa
  
  // Agregar un punto central para que sea visible si falla el borde
  const dot = document.createElement('div');
  dot.style.width = '8px';
  dot.style.height = '8px';
  dot.style.margin = '8px auto';
  dot.style.borderRadius = '50%';
  dot.style.backgroundColor = color;
  el.appendChild(dot);
  
  return el;
};

  // 3. Inicialización del Mapa
  useEffect(() => {
    if (!MAPBOX_TOKEN) {
      setMapError('Falta VITE_MAPBOX_TOKEN en el .env');
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isSeniorMode ? 'mapbox://styles/mapbox/light-v10' : 'mapbox://styles/mapbox/streets-v11',
      center: userLocation ? [userLocation.lng, userLocation.lat] : PUEBLA_COORDS,
      zoom: isSeniorMode ? ZOOM_INITIAL + 1 : ZOOM_INITIAL,
    });

    mapRef.current = map;

    map.on('load', () => {
      // Optimizaciones Modo Senior
      if (isSeniorMode) {
        const layers = map.getStyle().layers;
        layers.forEach(layer => {
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

  // 4. Actualizar Marcadores cuando lleguen datos del Back
 // MapContainer.jsx - Actualiza el bloque 4 (líneas 89-114)
useEffect(() => {
  if (!mapRef.current) return;

  // 🔍 DEBUG: Si esto imprime [], el problema es el filtro del Backend
  console.log("Hubs dinámicos recibidos:", dynamicHubs);

  // Limpiar marcadores anteriores
  markersRef.current.forEach(m => m.remove());
  markersRef.current = [];

  dynamicHubs.forEach((hub) => {
    // 1. Crear el elemento visual (Asegura dimensiones)
    const color = hub.type === 'RUTA_STATION' ? '#E63946' : '#0047AB';
    const el = createTalaveraMarker(hub.type, color);

    // 2. Crear e instanciar el marcador
    const marker = new mapboxgl.Marker({ 
      element: el,
      anchor: 'center' 
    })
      .setLngLat([hub.lng, hub.lat]) // Longitud primero (-98.x), luego Latitud (19.x)
      .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="color: #0f2f67; padding: 5px;">
          <strong>${hub.name}</strong><br/>
          <small>${hub.type}</small>
        </div>
      `))
      .addTo(mapRef.current);
    
    markersRef.current.push(marker);
  });
}, [dynamicHubs]);

  if (mapError) return <div className="error-overlay">{mapError}</div>;

  return (
    <div 
      ref={mapContainerRef} 
      className="map-container"
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
};

export default MapContainer;