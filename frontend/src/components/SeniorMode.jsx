import React from 'react';
import { IconConfig } from '../utils';
import MapContainer from './MapContainer';

export default function SeniorMode({ openConfig }) {
  return (
    <div className="senior-container">
      {/* Header Simplificado */}
      <header className="s-header">
        <IconConfig className="icon-small s-menu-btn" onClick={openConfig} />
        <h1 className="s-profile-text">Hola, Juan!</h1>
      </header>

      {/* Mapa Simplificado */}
      <main className="s-map-area" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
        
        {/* Render del Mapa de Fondo Limitado */}
        <MapContainer isSeniorMode={true} />

        {/* HUD Overlay en Modo Senior */}
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

      {/* Acciones de Emergencia */}
      <footer className="s-actions-panel" style={{ zIndex: 20}}>
        <button className="s-btn s-btn-home">
          <div className="s-btn-icon home"></div>
          <span>LLÉVAME A CASA</span>
        </button>
        
        <button className="s-btn s-btn-help">
          <div className="s-btn-icon help"></div>
          <span>PEDIR AYUDA (EMBAJADOR)</span>
        </button>
        
        <button className="s-btn s-btn-voice">
          <div className="s-btn-icon tts"></div>
          <span>Leer Pantalla</span>
        </button>
      </footer>
    </div>
  );
}
