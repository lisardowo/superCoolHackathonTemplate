import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createCustomMarker, resolveMarkerProps } from './mapMarkers.jsx';

// ─── Constantes ───────────────────────────────────────────────────────────────
const PUEBLA_COORDS = [-98.2062, 19.0413];
const ZOOM_INITIAL  = 13;
const MAPBOX_TOKEN  = (import.meta.env.VITE_MAPBOX_TOKEN || '').trim();

// ─── Popup HTML según tipo de punto ──────────────────────────────────────────
function buildPopupHTML(item) {
  const statusLabel = {
    available:   '🟢 Disponible',
    in_use:      '🔵 En uso',
    low_battery: '🟠 Batería baja',
    maintenance: '⚫ Mantenimiento',
  };

  if (item.type === 'scooter' || item.type === 'bici') {
    return `<div style="color:#0f2f67;padding:6px 8px;min-width:150px;">
      <strong>${item.id}</strong><br/>
      <span style="text-transform:capitalize;">${item.type}</span>
      ${item.hub_name ? `<br/><small>Hub: ${item.hub_name}</small>` : ''}
      <br/><small>${statusLabel[item.status] ?? item.status}</small>
      <br/><small>🔋 ${item.battery_pct}%</small>
    </div>`;
  }

  if (item.type === 'hub') {
    return `<div style="color:#0f2f67;padding:6px 8px;">
      <strong>⚡ ${item.name}</strong><br/>
      <small>Hub de micromovilidad</small>
    </div>`;
  }

  return `<div style="color:#0f2f67;padding:6px 8px;">
    <strong>${item.name}</strong><br/>
    <small>${item.type}</small>
  </div>`;
}

// ─── Normaliza puebla_data.json ───────────────────────────────────────────────
function buildPueblaPoints(data) {
  const pts = [];
  (data?.transporte?.lineas ?? []).forEach((linea) =>
    (linea.estaciones ?? []).forEach((est) =>
      pts.push({ id: est.id, name: `${est.nombre} · ${linea.nombre}`, type: 'RUTA_STATION', lat: est.lat, lng: est.lng })
    )
  );
  (data?.puntos_interes?.universidades ?? []).forEach((u) =>
    pts.push({ id: u.id, name: u.nombre, type: 'UNIVERSITY', lat: u.lat, lng: u.lng })
  );
  (data?.puntos_interes?.plazas ?? []).forEach((p) =>
    pts.push({ id: p.id, name: p.nombre, type: 'PLAZA', lat: p.lat, lng: p.lng })
  );
  return pts;
}

// ─── Componente ───────────────────────────────────────────────────────────────
const MapContainer = ({ isSeniorMode, onMapClick, userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef          = useRef(null);
  const markersRef      = useRef([]);
  const [mapError, setMapError]   = useState('');
  const [allPoints, setAllPoints] = useState([]);

  // ── 1. Cargar ambos JSONs desde /public ──────────────────────────────────
  // ⚠️  Necesitas ambos archivos en /public:
  //       /public/puebla_data.json
  //       /public/micromob.json
  useEffect(() => {
    Promise.all([
      fetch('/puebla_data.json').then((r) => r.json()),
      fetch('/micromob.json').then((r) => r.json()),
    ])
      .then(([pueblaData, micromobData]) => {
        const points = [
          ...buildPueblaPoints(pueblaData),
          ...(micromobData.hubs ?? []).map((h) => ({ ...h, type: 'hub' })),
          ...(micromobData.vehicles ?? []),
        ];
        console.log(`✅ Total puntos: ${points.length}`);
        setAllPoints(points);
      })
      .catch((err) => console.error('❌ Error cargando JSONs:', err));
  }, []);

  // ── 2. Inicializar mapa ───────────────────────────────────────────────────
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
          if (layer.type === 'symbol' && layer.layout?.['text-field']) {
            map.setLayoutProperty(layer.id, 'text-size', 20);
          }
        });
      }
    });

    if (!isSeniorMode) {
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.on('click', (e) => onMapClick?.(e.lngLat));
    }

    return () => map.remove();
  }, [isSeniorMode]);

  // ── 3. Pintar marcadores cuando mapa + datos listos ───────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || allPoints.length === 0) return;

    const addMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      allPoints.forEach((item) => {
        const { iconType, status } = resolveMarkerProps(item);
        const el = createCustomMarker(iconType, status);

        const marker = new mapboxgl.Marker({ element: el, anchor: 'bottom' })
          .setLngLat([item.lng, item.lat])
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(buildPopupHTML(item)))
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    if (map.isStyleLoaded()) {
      addMarkers();
    } else {
      map.once('load', addMarkers);
    }
  }, [allPoints]);

  if (mapError) return <div className="error-overlay">{mapError}</div>;

  return (
    <div
      ref={mapContainerRef}
      className="map-container"
      style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
    />
  );
};

export default MapContainer;
