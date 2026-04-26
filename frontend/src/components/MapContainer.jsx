import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createCustomMarker, resolveMarkerProps } from './mapMarkers.jsx';

// ─── Constantes ───────────────────────────────────────────────────────────────
const PUEBLA_COORDS  = [-98.2062, 19.0413];
const ZOOM_INITIAL   = 13;
const HUB_RADIUS_M   = 10;
const MAPBOX_TOKEN   = (import.meta.env.VITE_MAPBOX_TOKEN || '').trim();
const API_BASE       = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

// ─── Haversine (metros) ───────────────────────────────────────────────────────
function haversineM(lat1, lng1, lat2, lng2) {
  const R = 6_371_000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Suprime vehículos dentro del radio de un hub ────────────────────────────
function filterVehiclesNearHubs(points) {
  const hubs     = points.filter((p) => p.type === 'hub');
  const vehicles = points.filter((p) => p.type === 'scooter' || p.type === 'bici');
  const rest     = points.filter((p) => p.type !== 'hub' && p.type !== 'scooter' && p.type !== 'bici');
  const visible  = vehicles.filter(
    (v) => !hubs.some((h) => haversineM(v.lat, v.lng, h.lat, h.lng) <= HUB_RADIUS_M)
  );
  const n = vehicles.length - visible.length;
  if (n > 0) console.log(`🔋 ${n} vehículo(s) ocultos por estar en un hub`);
  return [...hubs, ...visible, ...rest];
}

// ─── Popup HTML — incluye botón "Ir aquí" con data-lat/lng ───────────────────
function buildPopupHTML(item) {
  const statusLabel = {
    available:   '🟢 Disponible',
    in_use:      '🔵 En uso',
    low_battery: '🟠 Batería baja',
    maintenance: '⚫ Mantenimiento',
  };

  const navBtn = `
    <button class="popup-nav-btn"
      data-lat="${item.lat}" data-lng="${item.lng}" data-name="${item.name ?? item.id ?? ''}"
      style="margin-top:8px;width:100%;padding:5px 0;background:#0047AB;color:white;
             border:none;border-radius:6px;font-size:0.75rem;font-weight:600;
             cursor:pointer;letter-spacing:0.03em;"
    >🧭 Ir aquí</button>`;

  if (item.type === 'scooter' || item.type === 'bici') {
    return `<div style="color:#0f2f67;padding:6px 8px;min-width:160px;">
      <strong>${item.id}</strong><br/>
      <span style="text-transform:capitalize;">${item.type}</span>
      ${item.hub_name ? `<br/><small>Hub: ${item.hub_name}</small>` : ''}
      <br/><small>${statusLabel[item.status] ?? item.status}</small>
      <br/><small>🔋 ${item.battery_pct}%</small>
      ${navBtn}
    </div>`;
  }
  if (item.type === 'hub') {
    return `<div style="color:#0f2f67;padding:6px 8px;min-width:160px;">
      <strong>⚡ ${item.name}</strong><br/>
      <small>Hub de micromovilidad</small>
      ${navBtn}
    </div>`;
  }
  if (item.type === 'bache') {
    const severity = { low: '🟡 Leve', medium: '🟠 Moderado', high: '🔴 Severo' };
    return `<div style="color:#0f2f67;padding:6px 8px;min-width:160px;">
      <strong>🕳️ Bache reportado</strong><br/>
      <small>${severity[item.severity] ?? item.severity}</small>
      ${item.address ? `<br/><small>${item.address}</small>` : ''}
    </div>`;
  }
  // RUTA_STATION y cualquier otro tipo navegable
  return `<div style="color:#0f2f67;padding:6px 8px;min-width:160px;">
    <strong>${item.name ?? item.id}</strong><br/>
    <small>${item.type}</small>
    ${navBtn}
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
  (data?.hubs ?? []).forEach((h) => pts.push({ ...h, type: 'hub' }));
  return pts;
}

// ─── Marcador de usuario ──────────────────────────────────────────────────────
function createUserMarker() {
  if (!document.head.querySelector('#user-marker-style')) {
    const s = document.createElement('style');
    s.id = 'user-marker-style';
    s.textContent = `
      .user-marker { position:relative;width:36px;height:36px;display:flex;align-items:center;justify-content:center;pointer-events:none; }
      .user-marker__pulse { position:absolute;inset:0;border-radius:50%;background:rgba(0,71,171,0.20);animation:user-pulse 2s ease-out infinite; }
      .user-marker__dot { position:relative;z-index:1;width:26px;height:26px;border-radius:50%;background:#0047AB;border:2.5px solid white;box-shadow:0 2px 10px rgba(0,71,171,0.50);display:flex;align-items:center;justify-content:center; }
      @keyframes user-pulse { 0%{transform:scale(0.7);opacity:0.8;} 100%{transform:scale(2.2);opacity:0;} }
    `;
    document.head.appendChild(s);
  }
  const el = document.createElement('div');
  el.className = 'user-marker';
  el.innerHTML = `
    <div class="user-marker__pulse"></div>
    <div class="user-marker__dot">
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    </div>`;
  return el;
}

// ─── Marcador de bache ────────────────────────────────────────────────────────
function createBacheMarker(severity = 'medium') {
  const colors = { low: '#F4A300', medium: '#E85000', high: '#C0392B' };
  const color  = colors[severity] ?? colors.medium;
  const el = document.createElement('div');
  el.style.cssText = `width:22px;height:22px;display:flex;align-items:center;justify-content:center;color:${color};cursor:pointer;filter:drop-shadow(0 1px 0 rgba(255,255,255,0.9)) drop-shadow(0 0 4px rgba(255,255,255,0.7));transition:transform 0.2s ease;`;
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  el.addEventListener('mouseenter', () => { el.style.transform = 'scale(1.3)'; });
  el.addEventListener('mouseleave', () => { el.style.transform = 'scale(1)'; });
  return el;
}

// ─── Dibujar ruta GeoJSON ─────────────────────────────────────────────────────
const ROUTE_SRC   = 'active-route';
const ROUTE_LAYER = 'active-route-line';

function drawRoute(map, coordsLatLng) {
  // Backend devuelve [[lat, lng], ...]  → GeoJSON necesita [lng, lat]
  const geojson = {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: coordsLatLng.map(([lat, lng]) => [lng, lat]),
    },
  };

  if (map.getSource(ROUTE_SRC)) {
    map.getSource(ROUTE_SRC).setData(geojson);
  } else {
    map.addSource(ROUTE_SRC, { type: 'geojson', data: geojson });

    // Sombra difusa
    map.addLayer({
      id: `${ROUTE_LAYER}-shadow`,
      type: 'line', source: ROUTE_SRC,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': '#000', 'line-width': 8, 'line-opacity': 0.1, 'line-blur': 5 },
    });

    // Línea azul principal
    map.addLayer({
      id: ROUTE_LAYER,
      type: 'line', source: ROUTE_SRC,
      layout: { 'line-join': 'round', 'line-cap': 'round' },
      paint: { 'line-color': '#0047AB', 'line-width': 5, 'line-opacity': 0.92 },
    });

    // Guiones blancos animados encima
    map.addLayer({
      id: `${ROUTE_LAYER}-dash`,
      type: 'line', source: ROUTE_SRC,
      layout: { 'line-join': 'round', 'line-cap': 'butt' },
      paint: { 'line-color': '#fff', 'line-width': 2, 'line-opacity': 0.55, 'line-dasharray': [2, 5] },
    });
  }

  // Ajustar vista
  const coords  = geojson.geometry.coordinates;
  const bounds  = coords.reduce(
    (b, c) => b.extend(c),
    new mapboxgl.LngLatBounds(coords[0], coords[0])
  );
  map.fitBounds(bounds, { padding: 90, duration: 900 });
}

function clearRoute(map) {
  [`${ROUTE_LAYER}-shadow`, ROUTE_LAYER, `${ROUTE_LAYER}-dash`].forEach((id) => {
    if (map.getLayer(id)) map.removeLayer(id);
  });
  if (map.getSource(ROUTE_SRC)) map.removeSource(ROUTE_SRC);
}

// ─── Componente ───────────────────────────────────────────────────────────────
const MapContainer = ({ isSeniorMode, onMapClick, userLocation }) => {
  const mapContainerRef = useRef(null);
  const mapRef          = useRef(null);
  const markersRef      = useRef([]);
  const userMarkerRef   = useRef(null);
  // Ref para siempre tener la ubicación actual sin recrear listeners
  const userLocRef      = useRef(userLocation ?? { lat: 19.0481, lng: -98.2138 });

  const [mapError,   setMapError]   = useState('');
  const [allPoints,  setAllPoints]  = useState([]);
  const [routeState, setRouteState] = useState(null);  // null | 'loading' | 'ok' | 'error'
  const [routeDest,  setRouteDest]  = useState('');

  useEffect(() => {
    if (userLocation) userLocRef.current = userLocation;
  }, [userLocation]);

  // ── 1. Cargar JSONs ──────────────────────────────────────────────────────
  useEffect(() => {
    Promise.all([
      fetch('/puebla_data.json').then((r) => r.json()),
      fetch('/micromob.json').then((r) => r.json()),
    ])
      .then(([pueblaData, micromobData]) => {
        const raw = [
          ...buildPueblaPoints(pueblaData),
          ...(micromobData.hubs     ?? []).map((h) => ({ ...h, type: 'hub' })),
          ...(micromobData.vehicles ?? []),
          ...(micromobData.baches   ?? []).map((b) => ({ ...b, type: 'bache' })),
        ];
        setAllPoints(filterVehiclesNearHubs(raw));
      })
      .catch((err) => console.error('❌ Error cargando JSONs:', err));
  }, []);

  // ── 2. Inicializar mapa ───────────────────────────────────────────────────
  useEffect(() => {
    if (!MAPBOX_TOKEN) { setMapError('Falta VITE_MAPBOX_TOKEN en el .env'); return; }

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const loc    = userLocRef.current;
    const center = loc ? [loc.lng, loc.lat] : PUEBLA_COORDS;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: isSeniorMode ? 'mapbox://styles/mapbox/light-v10' : 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom: isSeniorMode ? ZOOM_INITIAL + 1 : ZOOM_INITIAL,
    });
    mapRef.current = map;

    map.on('load', () => {
      if (isSeniorMode) {
        map.getStyle().layers.forEach((layer) => {
          if (layer.type === 'symbol' && layer.layout?.['text-field'])
            map.setLayoutProperty(layer.id, 'text-size', 20);
        });
      }
    });

    if (!isSeniorMode) {
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      map.on('click', (e) => onMapClick?.(e.lngLat));
    }

    // ── Delegación de clicks en botones "Ir aquí" dentro de popups ────────
    // Usamos el contenedor del mapa para capturar clicks en HTML de popups
    mapContainerRef.current.addEventListener('click', async (e) => {
      const btn = e.target.closest('.popup-nav-btn');
      if (!btn) return;

      e.stopPropagation();

      const destLat  = parseFloat(btn.dataset.lat);
      const destLng  = parseFloat(btn.dataset.lng);
      const destName = btn.dataset.name || 'destino';
      const origin   = userLocRef.current;

      if (!origin) { console.warn('Sin ubicación de usuario'); return; }

      // Cerrar todos los popups abiertos
      document.querySelectorAll('.mapboxgl-popup').forEach((p) => p.remove());

      setRouteDest(destName);
      setRouteState('loading');

      try {
        const res = await fetch(`${API_BASE}/map/route`, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            origen:  [origin.lat, origin.lng],
            destino: [destLat, destLng],
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();   // { nodos: [[lat, lng], ...] }

        if (!data.nodos?.length) throw new Error('Respuesta sin nodos');

        const paint = () => { drawRoute(map, data.nodos); setRouteState('ok'); };
        map.isStyleLoaded() ? paint() : map.once('load', paint);

      } catch (err) {
        console.error('❌ Ruta fallida:', err);
        setRouteState('error');
      }
    });

    return () => map.remove();
  }, [isSeniorMode]);

  // ── 3. Marcador de usuario ────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const loc = userLocRef.current;

    const place = () => {
      userMarkerRef.current?.remove();
      userMarkerRef.current = new mapboxgl.Marker({ element: createUserMarker(), anchor: 'center' })
        .setLngLat([loc.lng, loc.lat])
        .setPopup(new mapboxgl.Popup({ offset: 20 }).setHTML(
          `<div style="color:#0f2f67;padding:6px 8px;"><strong>📍 Tú estás aquí</strong></div>`
        ))
        .addTo(map);
    };

    map.isStyleLoaded() ? place() : map.once('load', place);
    return () => userMarkerRef.current?.remove();
  }, [userLocation]);

  // ── 4. Pintar marcadores ──────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map || allPoints.length === 0) return;

    const addMarkers = () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      allPoints.forEach((item) => {
        const el = item.type === 'bache'
          ? createBacheMarker(item.severity)
          : (() => { const { iconType, status } = resolveMarkerProps(item); return createCustomMarker(iconType, status); })();

        const marker = new mapboxgl.Marker({ element: el, anchor: 'center' })
          .setLngLat([item.lng, item.lat])
          .setPopup(new mapboxgl.Popup({ offset: 18 }).setHTML(buildPopupHTML(item)))
          .addTo(map);

        markersRef.current.push(marker);
      });
    };

    map.isStyleLoaded() ? addMarkers() : map.once('load', addMarkers);
  }, [allPoints]);

  if (mapError) return <div className="error-overlay">{mapError}</div>;

  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />

      {/* ── HUD de ruta ── */}
      {routeState && (
        <div style={{
          position: 'absolute', bottom: '150px', left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255,255,255,0.93)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(0,71,171,0.18)',
          borderRadius: '14px',
          padding: '10px 16px',
          display: 'flex', alignItems: 'center', gap: '10px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.13)',
          zIndex: 20, minWidth: '230px', maxWidth: '82vw',
          fontSize: '0.78rem', color: '#0f2f67',
          whiteSpace: 'nowrap',
        }}>

          {routeState === 'loading' && (
            <>
              <span style={{ fontSize: '1.1rem', display: 'inline-block', animation: 'hud-spin 0.9s linear infinite' }}>⟳</span>
              <span>Calculando ruta a <strong>{routeDest}</strong>…</span>
            </>
          )}

          {routeState === 'ok' && (
            <>
              <span>🧭</span>
              <span>Navegando a <strong>{routeDest}</strong></span>
              <button
                onClick={() => { clearRoute(mapRef.current); setRouteState(null); setRouteDest(''); }}
                style={{ marginLeft: 'auto', background: 'none' ,border: 'none', color: '#B84B2B', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem', paddingLeft: '10px' }}
              >✕ Cancelar</button>
            </>
          )}

          {routeState === 'error' && (
            <>
              <span>⚠️</span>
              <span style={{ color: '#B84B2B' }}>No se pudo calcular la ruta</span>
              <button
                onClick={() => setRouteState(null)}
                style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#B84B2B', cursor: 'pointer', fontWeight: 700 }}
              >✕</button>
            </>
          )}
        </div>
      )}

      <style>{`@keyframes hud-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default MapContainer;