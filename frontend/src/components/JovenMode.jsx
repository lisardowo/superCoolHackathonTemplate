import React, { useState, useRef } from 'react';
import { AlertTriangle, CreditCard, QrCode, User, Flag } from 'lucide-react';
import MapContainer from './MapContainer';
import GlassIcons from './GlassIcons';
import PaymentsModal from './PaymentsModal';
import ReporteModal from './ReporteModal';
import CuentaModal from './CuentaModal';
import MisionesModal from './MisionesModal';
import ConfigModal from './ConfigModal';
import './JovenMode.css';

const NAV_ITEMS = [
  { label: 'Reportar',     color: 'talavera', icon: <AlertTriangle size={20} strokeWidth={2.4} />, menuItems: [] },
  { label: 'Mis tarjetas', color: 'talavera', icon: <CreditCard size={20} strokeWidth={2.2} />,   menuItems: [] },
  { label: 'Escanear',     color: 'talavera', icon: <QrCode size={22} strokeWidth={2.2} />, customClass: 'is-scan', menuItems: [] },
  { label: 'Cuenta',       color: 'talavera', icon: <User size={20} strokeWidth={2.2} />,           menuItems: [] },
  { label: 'Misiones',     color: 'talavera', icon: <Flag size={20} strokeWidth={2.2} />,           menuItems: [] },
];

const REPORTAR_IDX = 0;
const TARJETAS_IDX = 1;
const ESCANEAR_IDX = 2;
const CUENTA_IDX   = 3;
const MISIONES_IDX = 4;

export default function JovenMode({ onModoChange }) {
  const [activeNavIndex, setActiveNavIndex] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isReporteOpen, setIsReporteOpen] = useState(false);
  const [isCuentaOpen, setIsCuentaOpen] = useState(false);
  const [isMisionesOpen, setIsMisionesOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isTripActive, setIsTripActive] = useState(false);

  // Misión sugerida al escanear — coords del destino para "¿Cómo llegar?"
  const MISION_VIAJE = {
    titulo: 'Zócalo de Puebla',
    coords: { lat: 19.0435, lng: -98.1981 },
  };
  const [tripRutaEstado, setTripRutaEstado] = useState(null); // null | 'loading' | 'ok' | 'error'

  const handleTripRuta = async () => {
    if (!userLocation) return;
    setTripRutaEstado('loading');
    try {
      const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
      const res = await fetch(`${API_BASE}/map/route`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen:  [userLocation.lat, userLocation.lng],
          destino: [MISION_VIAJE.coords.lat, MISION_VIAJE.coords.lng],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.nodos?.length) throw new Error('Sin nodos');
      drawRouteRef.current?.({ nodos: data.nodos, nombre: MISION_VIAJE.titulo });
      setTripRutaEstado('ok');
    } catch (err) {
      console.error('❌ Ruta viaje:', err);
      setTripRutaEstado('error');
      setTimeout(() => setTripRutaEstado(null), 3000);
    }
  };

  // Ref que MapContainer rellena con su función drawRoute
  const drawRouteRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [rutaSana, setRutaSana] = useState(false);
  const [tarjetaVinculada, setTarjetaVinculada] = useState(false);

  // User state
  const [userXP, setUserXP] = useState(2340);
  const [userCreditos, setUserCreditos] = useState(148);
  const userSaldo   = 8.0;
  const userTarjeta = '9999';
  const userNivel   = 7;
  const userRep     = 87;
  const userName    = 'ajolote_veloz_42';

  const handleNavClick = (index) => {
    if (index === REPORTAR_IDX) { setIsReporteOpen(true);  return; }
    if (index === TARJETAS_IDX) { setIsPaymentsOpen(true); return; }
    if (index === CUENTA_IDX)   { setIsCuentaOpen(true);   return; }
    if (index === MISIONES_IDX) { setIsMisionesOpen(true); return; }
    setActiveNavIndex(index);
    setIsActive(true);
    setIsSectionMenuOpen(true);
  };

  const handleCloseSectionMenu = () => { setIsSectionMenuOpen(false); setIsActive(false); };
  const handleSimulateScan     = () => { setIsTripActive(true); handleCloseSectionMenu(); };

  const handleRecompensa = ({ xp, creditos }) => {
    setUserXP((prev) => prev + xp);
    setUserCreditos((prev) => prev + creditos);
  };

  const handleModoChange = (modo) => {
    setIsConfigOpen(false);
    onModoChange?.(modo);
  };

  const isScanSection = activeNavIndex === ESCANEAR_IDX;
  const activeItem    = NAV_ITEMS[activeNavIndex];

  return (
    <div className="joven-container">
      {/* Config button — usa IconConfig o SVG inline */}
      <button
        className={`floating-config-btn ${isConfigOpen ? 'is-active' : ''}`}
        onClick={() => setIsConfigOpen(true)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
        </svg>
      </button>

      <main className="j-map-area">
        <MapContainer
          isSeniorMode={false}
          drawRouteRef={drawRouteRef}
          onUserLocation={setUserLocation}
        />
        <nav className="j-tab-bar">
          <GlassIcons items={NAV_ITEMS} activeIndex={activeNavIndex} isActive={isActive} onItemClick={handleNavClick} />
        </nav>

        {isTripActive && (
          <div className="j-status-card glass trip-active">
            <div className="j-status-header"><span className="pulse-dot" /><h3>Viaje en curso</h3></div>

            {/* Misión sugerida + destino */}
            <p className="j-status-mission">Misión sugerida: Cambia batería en Zócalo.</p>
            <p className="j-status-place">📍 {MISION_VIAJE.titulo}</p>
            <div className="j-status-reward">Premio: <span>+50XP</span></div>

            {/* Botón ¿Cómo llegar? */}
            <button
              className={`btn-trip-ruta ${tripRutaEstado ? `btn-trip-ruta--${tripRutaEstado}` : ''}`}
              onClick={handleTripRuta}
              disabled={tripRutaEstado === 'loading' || tripRutaEstado === 'ok'}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {{ null: '¿Cómo llegar?', loading: 'Calculando…', ok: 'Ruta activa', error: 'Error, reintentar' }[tripRutaEstado] ?? '¿Cómo llegar?'}
            </button>

            <button className="btn-end-trip" onClick={() => { setIsTripActive(false); setTripRutaEstado(null); }}>Terminar viaje</button>
          </div>
        )}
      </main>

      {isSectionMenuOpen && (
        <div className="modal-overlay" onClick={handleCloseSectionMenu}>
          <div className="modal-content talavera-border j-section-menu" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{activeItem.label}</h2>
              <button className="close-btn" onClick={handleCloseSectionMenu}>&times;</button>
            </div>
            <div className="modal-body">
              {isScanSection ? (
                <div className="j-qr-scanner-mock" onClick={handleSimulateScan}>
                  <div className="j-qr-frame"><div className="j-qr-scan-line" /></div>
                  <p>Toca para simular escaneo de Scooter</p>
                </div>
              ) : (
                activeItem.menuItems.map((item) => (
                  <div key={item} className="config-option">
                    <span>{item}</span>
                    <button className="btn-secondary">Abrir</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <PaymentsModal isOpen={isPaymentsOpen} onClose={() => setIsPaymentsOpen(false)} saldo={userSaldo} tarjeta={userTarjeta} />
      <ReporteModal  isOpen={isReporteOpen}  onClose={() => setIsReporteOpen(false)}  ubicacion="Ubicación actual" />
      <CuentaModal   isOpen={isCuentaOpen}   onClose={() => setIsCuentaOpen(false)}   usuario={userName} nivel={userNivel} xp={userXP} creditos={userCreditos} reputacion={userRep} animalActual="Axolote" />
      <MisionesModal
        isOpen={isMisionesOpen}
        onClose={() => setIsMisionesOpen(false)}
        onRecompensa={handleRecompensa}
        userLocation={userLocation}
        onRutaCalculada={({ nodos, nombre }) => {
          drawRouteRef.current?.({ nodos, nombre });
          setIsMisionesOpen(false);
        }}
      />
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        rutaSana={rutaSana}
        onRutaSana={setRutaSana}
        modoActual="joven"
        onModoChange={handleModoChange}
        tarjetaVinculada={tarjetaVinculada}
      />
    </div>
  );
}
