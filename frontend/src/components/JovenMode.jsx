import React, { useState } from 'react';
import { IconConfig } from '../utils';
import MapContainer from './MapContainer';
import GlassIcons from './GlassIcons';

const NAV_ITEMS = [
  {
    label: 'Reportar',
    color: 'talavera',
    menuItems: ['Nuevo reporte', 'Subir evidencia', 'Mis reportes']
  },
  {
    label: 'Pagos',
    color: 'talavera',
    menuItems: ['Recargar saldo', 'Ver movimientos', 'Métodos de pago']
  },
  {
    label: 'Escanear',
    color: 'talavera',
    menuItems: []
  },
  {
    label: 'Cuenta',
    color: 'talavera',
    menuItems: ['Perfil', 'Seguridad', 'Preferencias']
  },
  {
    label: 'Explorar',
    color: 'talavera',
    menuItems: ['Rutas sugeridas', 'Puntos seguros', 'Eventos']
  }
];

export default function JovenMode({ openConfig }) {
  const [reportedPothole, setReportedPothole] = useState(null);
  const [activeNavIndex, setActiveNavIndex] = useState(2);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);

  const handleNavClick = (index) => {
    setActiveNavIndex(index);
    setIsSectionMenuOpen(true);
  };

  const handleMapClick = (lngLat) => {
    // Demo de captura de coordenadas
    setReportedPothole(`Nuevo bache: ${lngLat.lng.toFixed(4)}, ${lngLat.lat.toFixed(4)}`);
    setTimeout(() => setReportedPothole(null), 3000); // Borra el msj en 3 seg
  };

  const activeItem = NAV_ITEMS[activeNavIndex];
  const isScanSection = activeItem.label === 'Escanear';

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

      <nav className="j-tab-bar talavera-border-top" aria-label="Navegación principal">
        <GlassIcons
          className="j-glass-nav"
          items={NAV_ITEMS}
          activeIndex={activeNavIndex}
          onItemClick={handleNavClick}
        />
      </nav>

      {isSectionMenuOpen && (
        <div className="modal-overlay" onClick={() => setIsSectionMenuOpen(false)}>
          <div className="modal-content talavera-border j-section-menu" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{activeItem.label}</h2>
              <button className="close-btn" onClick={() => setIsSectionMenuOpen(false)}>&times;</button>
            </div>

            <div className="modal-body">
              {isScanSection ? (
                <div className="j-qr-scanner-mock" role="img" aria-label="Simulador de escaneo QR">
                  <div className="j-qr-frame">
                    <div className="j-qr-grid" aria-hidden="true"></div>
                    <div className="j-qr-scan-line" aria-hidden="true"></div>
                    <div className="j-qr-corners" aria-hidden="true"></div>
                  </div>
                  <p className="j-qr-caption">Alinea el codigo dentro del recuadro para escanear.</p>
                </div>
              ) : (
                activeItem.menuItems.map((menuItem) => (
                  <div key={menuItem} className="config-option">
                    <span>{menuItem}</span>
                    <button className="btn-secondary">Abrir</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
