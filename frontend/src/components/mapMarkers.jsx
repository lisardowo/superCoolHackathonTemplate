import './MapMarkers.css';

// ─── SVG paths inline (lucide.dev) ───────────────────────────────────────────
const ICONS = {
  ruta_station: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 6v6"/><path d="M15 6v6"/>
    <path d="M2 12h19.6"/>
    <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4
             a2 2 0 0 0-2 2v10h3"/>
    <circle cx="7"  cy="18" r="2"/>
    <circle cx="15" cy="18" r="2"/>
  </svg>`,

  bici: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <circle cx="5.5"  cy="17.5" r="3.5"/>
    <circle cx="15"   cy="5"    r="1"/>
    <path d="M12 17.5V14l-3-3 4-3 2 3h2"/>
  </svg>`,

  scooter: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="7"  cy="17" r="2"/>
    <circle cx="17" cy="17" r="2"/>
    <path d="M5 17H3v-3a2 2 0 0 1 2-2h1"/>
    <polyline points="7 17 7 12 12 7 17 7"/>
    <path d="M17 7h2a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-1"/>
    <path d="M12 7v5"/>
  </svg>`,

  hub: `<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2"/>
    <path d="M6 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h1"/>
    <path d="m11 7-3 5h4l-3 5"/>
    <line x1="22" x2="22" y1="11" y2="13"/>
  </svg>`,
};

// ─── Paleta monocromática — solo color de trazo ───────────────────────────────
// Sin fondos sólidos; el color define el tipo visualmente
const PALETTE = {
  ruta_station: { color: '#0047AB' },          // Talavera azul
  bici:         { color: '#1A8A7D' },          // Verde teal oscuro
  scooter:      { color: '#6B21B0' },          // Violeta
  hub:          { color: '#C47F00' },          // Ámbar oscuro
  low_battery:  { color: '#D94F00' },          // Naranja quemado
  maintenance:  { color: '#757575' },          // Gris neutro
};

// ─── Crear marcador DOM ───────────────────────────────────────────────────────
export const createCustomMarker = (iconType, status = 'available') => {
  let p = PALETTE[iconType] ?? PALETTE.ruta_station;
  if (status === 'low_battery') p = PALETTE.low_battery;
  if (status === 'maintenance') p = PALETTE.maintenance;

  const el = document.createElement('div');
  el.className = `custom-marker marker-type--${iconType}`;
  el.style.setProperty('--m-color', p.color);
  el.innerHTML = ICONS[iconType] ?? ICONS.ruta_station;

  return el;
};

// ─── Resolver props desde JSON ────────────────────────────────────────────────
export const resolveMarkerProps = (item) => {
  if (item.type === 'scooter')      return { iconType: 'scooter',      status: item.status ?? 'available' };
  if (item.type === 'bici')         return { iconType: 'bici',         status: item.status ?? 'available' };
  if (item.type === 'hub')          return { iconType: 'hub',          status: 'available' };
  if (item.type === 'RUTA_STATION') return { iconType: 'ruta_station', status: 'available' };
  if (item.type === 'UNIVERSITY')   return { iconType: 'hub',          status: 'available' };
  if (item.type === 'PLAZA')        return { iconType: 'hub',          status: 'available' };
  return { iconType: 'ruta_station', status: 'available' };
};

// ─── Componente React para leyendas ───────────────────────────────────────────
export const MarkerIcon = ({ iconType, status = 'available' }) => {
  let p = PALETTE[iconType] ?? PALETTE.ruta_station;
  if (status === 'low_battery') p = PALETTE.low_battery;
  if (status === 'maintenance') p = PALETTE.maintenance;

  return (
    <div
      className={`custom-marker marker-legend marker-type--${iconType}`}
      style={{ '--m-color': p.color }}
      dangerouslySetInnerHTML={{ __html: ICONS[iconType] ?? ICONS.ruta_station }}
    />
  );
};
