import React, { useState } from 'react';
import { AlertTriangle, CreditCard, QrCode, User, Flag } from 'lucide-react';
import { IconConfig } from '../utils';
import MapContainer from './MapContainer';
import GlassIcons from './GlassIcons';
import PaymentsModal from './PaymentsModal';
import ReporteModal from './ReporteModal';
import CuentaModal from './CuentaModal';
import MisionesModal from './MisionesModal';
import './JovenMode.css';

const NAV_ITEMS = [
  { label: 'Reportar',     color: 'talavera', icon: <AlertTriangle size={20} strokeWidth={2.4} />, menuItems: [] },
  { label: 'Mis tarjetas', color: 'talavera', icon: <CreditCard size={20} strokeWidth={2.2} />,   menuItems: [] },
  { label: 'Escanear',     color: 'talavera', icon: <QrCode size={22} strokeWidth={2.2} />, customClass: 'is-scan', menuItems: [] },
  { label: 'Cuenta',       color: 'talavera', icon: <User size={20} strokeWidth={2.2} />,           menuItems: [] },
  { label: 'Misiones',     color: 'talavera', icon: <Flag size={20} strokeWidth={2.2} />,           menuItems: [] },
];

const REPORTAR_IDX  = 0;
const TARJETAS_IDX  = 1;
const ESCANEAR_IDX  = 2;
const CUENTA_IDX    = 3;
const MISIONES_IDX  = 4;

export default function JovenMode({ openConfig, isConfigActive = false }) {
  const [activeNavIndex, setActiveNavIndex] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [isSectionMenuOpen, setIsSectionMenuOpen] = useState(false);
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [isReporteOpen, setIsReporteOpen] = useState(false);
  const [isCuentaOpen, setIsCuentaOpen] = useState(false);
  const [isMisionesOpen, setIsMisionesOpen] = useState(false);
  const [isTripActive, setIsTripActive] = useState(false);

  // Estado de usuario — reemplazar con contexto / API real
  const [userXP, setUserXP] = useState(2340);
  const [userCreditos, setUserCreditos] = useState(148);

  const userSaldo   = 8.0;
  const userTarjeta = '9999';
  const userNivel   = 7;
  const userRep     = 87;
  const userName    = 'ajolote_veloz_42';

  const handleNavClick = (index) => {
    if (index === REPORTAR_IDX)  { setIsReporteOpen(true);   return; }
    if (index === TARJETAS_IDX)  { setIsPaymentsOpen(true);  return; }
    if (index === CUENTA_IDX)    { setIsCuentaOpen(true);    return; }
    if (index === MISIONES_IDX)  { setIsMisionesOpen(true);  return; }
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

  const isScanSection = activeNavIndex === ESCANEAR_IDX;
  const activeItem    = NAV_ITEMS[activeNavIndex];

  return (
    <div className="joven-container">
      <button className={`floating-config-btn ${isConfigActive ? 'is-active' : ''}`} onClick={openConfig}>
        <IconConfig />
      </button>

      <main className="j-map-area">
        <MapContainer isSeniorMode={false} />
        <nav className="j-tab-bar">
          <GlassIcons items={NAV_ITEMS} activeIndex={activeNavIndex} isActive={isActive} onItemClick={handleNavClick} />
        </nav>

        {isTripActive && (
          <div className="j-status-card glass trip-active">
            <div className="j-status-header"><span className="pulse-dot"></span><h3>Viaje en curso</h3></div>
            <p className="j-status-mission">Misión: Cambia batería en Zócalo.</p>
            <div className="j-status-reward">Premio: <span>+50XP</span></div>
            <button className="btn-end-trip" onClick={() => setIsTripActive(false)}>Terminar</button>
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
                  <div className="j-qr-frame"><div className="j-qr-scan-line"></div></div>
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

      <PaymentsModal  isOpen={isPaymentsOpen}  onClose={() => setIsPaymentsOpen(false)}  saldo={userSaldo} tarjeta={userTarjeta} />
      <ReporteModal   isOpen={isReporteOpen}   onClose={() => setIsReporteOpen(false)}   ubicacion="Ubicación actual" />
      <CuentaModal    isOpen={isCuentaOpen}    onClose={() => setIsCuentaOpen(false)}    usuario={userName} nivel={userNivel} xp={userXP} creditos={userCreditos} reputacion={userRep} animalActual="Axolote" />
      <MisionesModal  isOpen={isMisionesOpen}  onClose={() => setIsMisionesOpen(false)}  onRecompensa={handleRecompensa} />
    </div>
  );
}
