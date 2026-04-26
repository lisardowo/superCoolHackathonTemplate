import React, { useState } from 'react';
import { IconConfig } from '../utils';
import MapContainer from './MapContainer';
import DestinationPopup from './Destinationpopup.jsx';
import './SeniorMode.css';

const HelpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="3.5" />
  </svg>
);

const RouteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="36" height="36">
    <circle cx="6" cy="19" r="3" />
    <circle cx="18" cy="5" r="3" />
    <path d="M6 16V9a6 6 0 0 1 6-6h0" />
    <path d="M18 8v7a6 6 0 0 1-6 6h0" />
  </svg>
);

const QRIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
    <path d="M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm-2 2h-2v2h2v2h-2v2h2v-2h2v2h2v-2h-2v-2h2v-2h-4v2h-2v-2zm4 4h2v2h-2zm-4 0h2v2h-2z"/>
  </svg>
);

export default function SeniorMode({ openConfig }) {
  const [showDestination, setShowDestination] = useState(false);

  return (
    <div className="senior-container">
      {/* Header Simplificado */}
      <header className="s-header">
        <IconConfig className="icon-small s-menu-btn" onClick={openConfig} />
        <h1 className="s-profile-text">Hola, Juan!</h1>
      </header>

      {/* Mapa Simplificado */}
      <main className="s-map-area" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
        
        <MapContainer isSeniorMode={true} />

        <div style={{ position: 'absolute', top: '10px', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
          <div className="s-current-location talavera-border">
            <h2 className="s-location-title">Usted está en:</h2>
            <p className="s-location-street">Avenida Reforma</p>
            <div className="s-hub-info">
              <span className="s-hub-badge">Punto Seguro: Zócalo (a 2 cuadras)</span>
            </div>
          </div>
        </div>

      </main>

      {/* Panel de Acciones Senior */}
      <footer className="s-actions-panel" style={{ zIndex: 20 }}>

        <button className="s-btn s-btn-help">
          <HelpIcon />
          <span>PEDIR AYUDA A ALGUIEN CERCANO</span>
        </button>

        <div className="s-btn-row">
          <button className="s-btn s-btn-route" onClick={() => setShowDestination(true)}>
            <RouteIcon />
            <span>INSERTAR DESTINO</span>
          </button>

          <button className="s-btn s-btn-qr">
            <QRIcon />
            <span>ESCANEAR QR</span>
          </button>
        </div>

      </footer>

      {/* Popup de destino */}
      <DestinationPopup
        isOpen={showDestination}
        onClose={() => setShowDestination(false)}
      />
    </div>
  );
}