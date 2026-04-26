import React, { useState } from 'react';
import { AlertTriangle, CreditCard, QrCode, User, Flag } from 'lucide-react';
import { IconConfig } from '../utils';
import MapContainer from './MapContainer';
import GlassIcons from './GlassIcons';
import PaymentsModal from './PaymentsModal';
import './JovenMode.css';

const NAV_ITEMS = [
  {
    label: 'Reportar',
    color: 'talavera',
    icon: <AlertTriangle size={20} strokeWidth={2.4} />,
    menuItems: ['Nuevo reporte', 'Mis reportes']
  },
  {
    label: 'Mis tarjetas',
    color: 'talavera',
    icon: <CreditCard size={20} strokeWidth={2.2} />,
    menuItems: []                          // manejado por PaymentsModal
  },
  {
    label: 'Escanear',
    color: 'talavera',
    icon: <QrCode size={22} strokeWidth={2.2} />,
    customClass: 'is-scan',
    menuItems: []
  },
  {
    label: 'Cuenta',
    color: 'talavera',
    icon: <User size={20} strokeWidth={2.2} />,
    menuItems: ['Perfil', 'Preferencias']
  },
  {
    label: 'Misiones',
    color: 'talavera',
    icon: <Flag size={20} strokeWidth={2.2} />,
    menuItems: ['Misiones activas', 'Recompensas']
  }
];

const TARJETAS_IDX = 1;   // índice de "Mis tarjetas" en NAV_ITEMS

export default function JovenMode({ openConfig, isConfigActive = false }) {
  const [activeNavIndex, setActiveNavIndex] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isTripActive, setIsTripActive] = useState(false);

  // Datos de usuario (reemplazar con contexto/API real)
  const userSaldo = 8.0;
  const userTarjeta = '9999';   // null si no tiene tarjeta vinculada

  const handleNavClick = (index) => {
    if (index === TARJETAS_IDX) {
      setIsPaymentsOpen(true);
      return;
    }
    setActiveNavIndex(index);
    setIsActive(true);
    setIsSectionMenuOpen(true);
  };

  const handleCloseSectionMenu = () => {
    setIsSectionMenuOpen(false);
    setIsActive(false);
  };

  const handleSimulateScan = () => {
    setIsTripActive(true);
    handleCloseSectionMenu();
  };

  const activeItem = NAV_ITEMS[activeNavIndex];
  const isScanSection = activeItem.label === 'Escanear';

  return (
    <div className="joven-container">
      <button className={`floating-config-btn ${isConfigActive ? 'is-active' : ''}`} onClick={openConfig}>
        <IconConfig />
      </button>

      <main className="j-map-area">
        <MapContainer isSeniorMode={false} />

        <nav className="j-tab-bar">
          <GlassIcons
            items={NAV_ITEMS}
            activeIndex={activeNavIndex}
            isActive={isActive}
            onItemClick={handleNavClick}
          />
        </nav>

        {isTripActive && (
          <div className="j-status-card glass trip-active">
            <div className="j-status-header">
              <span className="pulse-dot"></span>
              <h3>Viaje en curso</h3>
            </div>
            <p className="j-status-mission">Misión: Cambia batería en Zócalo.</p>
            <div className="j-status-reward">Premio: <span>+50XP</span></div>
            <button className="btn-end-trip" onClick={() => setIsTripActive(false)}>Terminar</button>
          </div>
        )}
      </main>

      {/* Modal genérico de sección */}
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
                  <div className="j-qr-frame">
                    <div className="j-qr-scan-line"></div>
                  </div>
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

      {/* Modal de Pagos */}
      <PaymentsModal
        isOpen={isPaymentsOpen}
        onClose={() => setIsPaymentsOpen(false)}
        saldo={userSaldo}
        tarjeta={userTarjeta}
      />
    </div>
  );
}
