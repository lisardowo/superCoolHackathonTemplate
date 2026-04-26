import './MapMarkers.css';

// ─── SVG paths de lucide.dev (inline, sin dependencia npm) ───────────────────
const ICONS = {
  // lucide/bus  →  Estación RUTA
  ruta_station: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 6v6"/><path d="M15 6v6"/>
    <path d="M2 12h19.6"/>
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4
             a2 2 0 0 0-2 2v10h3"/>
    <circle cx="7"  cy="18" r="2"/>
    <circle cx="15" cy="18" r="2"/>
  </svg>`,

  // lucide/bike  →  Bicicleta
  bici: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <circle cx="5.5"  cy="17.5" r="3.5"/>
    <circle cx="15"   cy="5"    r="1"/>
    <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
  </svg>`,

  // lucide/scooter  →  Scooter
  scooter: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="7"  cy="17" r="2"/>
    <circle cx="17" cy="17" r="2"/>
    <path d="M5 17H3v-3a2 2 0 0 1 2-2h1"/>
    <polyline points="7 17 7 12 12 7 17 7"/>
    <path d="M17 7h2a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-1"/>
    <path d="M12 7v5"/>
  </svg>`,

  // lucide/battery-charging  →  Hub
  hub: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
    <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/>
    <path d="m11 7-3 5h4l-3 5"/>
    <line x1="22" x2="22" y1="11" y2="13"/>
  </svg>`,
};

// ─── Paleta de colores por tipo / estado ─────────────────────────────────────
const PALETTE = {
  ruta_station: { bg: '#EEF3FF', border: '#0047AB', color: '#0047AB' },
  bici:         { bg: '#E8F8F5', border: '#2A9D8F', color: '#2A9D8F' },
  scooter:      { bg: '#F3E8FF', border: '#7B2FBE', color: '#7B2FBE' },
  hub:          { bg: '#FFF8E1', border: '#F4A300', color: '#D4880A' },
  low_battery:  { bg: '#FFF3E0', border: '#FF6B35', color: '#E85000' },
  maintenance:  { bg: '#F5F5F5', border: '#9E9E9E', color: '#616161' },
};

// ─── API pública ──────────────────────────────────────────────────────────────

/**
 * Crea el elemento DOM para un marcador Mapbox.
 *
 * @param {'ruta_station'|'bici'|'scooter'|'hub'} iconType
 * @param {'available'|'in_use'|'low_battery'|'maintenance'} [status]
 * @returns {HTMLElement}
 */
export const createCustomMarker = (iconType, status = 'available') => {
  let p = PALETTE[iconType] ?? PALETTE.ruta_station;
  if (status === 'low_battery') p = PALETTE.low_battery;
  if (status === 'maintenance') p = PALETTE.maintenance;

  const el = document.createElement('div');
  el.className = 'custom-marker';
  el.style.cssText = `background:${p.bg};border:3px solid ${p.border};color:${p.color};`;

  const inner = document.createElement('div');
  inner.className = 'marker-inner';
  inner.innerHTML = ICONS[iconType] ?? ICONS.ruta_station;

  el.appendChild(inner);
  return el;
};

/**
 * Resuelve iconType y status desde un objeto de micromob.json o puebla_data.json.
 *
 * @param {object} item
 * @returns {{ iconType: string, status: string }}
 */
export const resolveMarkerProps = (item) => {
  // micromob.json — vehículos
  if (item.type === 'scooter') return { iconType: 'scooter',      status: item.status ?? 'available' };
  if (item.type === 'bici')    return { iconType: 'bici',         status: item.status ?? 'available' };
  // micromob.json — hubs explícitos
  if (item.type === 'hub')     return { iconType: 'hub',          status: 'available' };
  // puebla_data.json
  if (item.type === 'RUTA_STATION') return { iconType: 'ruta_station', status: 'available' };
  if (item.type === 'UNIVERSITY')   return { iconType: 'hub',          status: 'available' };
  if (item.type === 'PLAZA')        return { iconType: 'hub',          status: 'available' };
  return { iconType: 'ruta_station', status: 'available' };
};

// ─── Componente React (leyendas, UI) ─────────────────────────────────────────
export const MarkerIcon = ({ iconType, status = 'available' }) => {
  let p = PALETTE[iconType] ?? PALETTE.ruta_station;
  if (status === 'low_battery') p = PALETTE.low_battery;
  if (status === 'maintenance') p = PALETTE.maintenance;
  return (
    <div
      className="custom-marker marker-static"
      style={{ background: p.bg, border: `2px solid ${p.border}`, color: p.color }}
      dangerouslySetInnerHTML={{ __html: ICONS[iconType] ?? ICONS.ruta_station }}
    />
  );
};
