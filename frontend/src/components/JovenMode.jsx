import React, { useState } from 'react';
import { IconConfig } from '../utils';
import MapContainer from './MapContainer';

export default function JovenMode({ openConfig }) {
  const [scanned, setScanned] = useState(false);
  const [reportedPothole, setReportedPothole] = useState(null);

  const handleMapClick = (lngLat) => {
    // Demo de captura de coordenadas
    setReportedPothole(`Nuevo bache: ${lngLat.lng.toFixed(4)}, ${lngLat.lat.toFixed(4)}`);
    setTimeout(() => setReportedPothole(null), 3000); // Borra el msj en 3 seg
  };

  return (
    <div className="joven-container">
      {/* Header */}
      <header className="j-header talavera-border-bottom">
        <IconConfig className="icon j-menu-btn" onClick={openConfig} />
        <div className="j-profile">
          <div className="j-avatar"><span className="pixel-text">P26</span></div>
          <span className="j-username">Poblanit@_26</span>
        </div>
      </header>

      {/* Area del Mapa */}
      <main className="j-map-area">
        {/* Renderizamos Mapbox debajo del HUD */}
        <MapContainer isSeniorMode={false} onMapClick={handleMapClick} />

        {/* Notificacion temporal flotante (Demo) */}
        {reportedPothole && (
          <div style={{ position:'absolute', top: '10px', background: '#A52A2A', color: 'white', padding: '10px', borderRadius: '10px', zIndex: 30}}>
            {reportedPothole}
          </div>
        )}

        {/* Tarjeta de Status */}
        <div className="j-status-card glass talavera-border">
          <h3 className="j-status-title">¿En viaje?</h3>
          <p className="j-status-mission">Misión act: Cambia batería.</p>
          <div className="j-status-reward">Premio: <span>+50XP</span></div>
        </div>
      </main>

      {/* Botón QR Flotante */}
      <div className="j-qr-container">
        <button 
          className={`j-qr-btn ${scanned ? 'pressed' : ''}`}
          onClick={() => setScanned(!scanned)}
        >
          <div className="qr-icon"></div>
          <span>ESCANEAR QR</span>
        </button>
      </div>

      {/* Tab Bar Mocks */}
      <nav className="j-tab-bar talavera-border-top">
        <div className="tab-item"><div className="tab-icon acc"></div><span>Reportar</span></div>
        <div className="tab-item"><div className="tab-icon pay"></div><span>Pagos</span></div>
        <div className="tab-item active"><div className="tab-icon qr-ph"></div><span>Escanear</span></div>
        <div className="tab-item"><div className="tab-icon acc-u"></div><span>Cuenta</span></div>
        <div className="tab-item"><div className="tab-icon exp"></div><span>Explorar</span></div>
      </nav>
    </div>
  );
}
