import React from 'react';
import './ModoSelector.css';

export default function ModoSelector({ onSelect }) {
  return (
    <div className="ms-overlay">
      <div className="ms-card talavera-border">

        <div className="ms-header">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4l3 3"/>
          </svg>
          <h2 className="ms-title">¿Cómo quieres usar YAKU?</h2>
        </div>

        <p className="ms-sub">Puedes cambiarlo después en Configuración.</p>

        <div className="ms-options">

          {/* ── Joven ── */}
          <button className="ms-btn ms-btn--joven" onClick={() => onSelect('joven')}>
            <div className="ms-btn-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <span className="ms-btn-label">Modo Dinámico</span>
            <span className="ms-btn-sub">Mapa completo, misiones y estadísticas</span>
          </button>

          {/* ── Senior ── */}
          <button className="ms-btn ms-btn--senior" onClick={() => onSelect('senior')}>
            <div className="ms-btn-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="4"/>
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              </svg>
            </div>
            <span className="ms-btn-label">Modo Accesibilidad</span>
            <span className="ms-btn-sub">Pantalla simplificada, letra grande</span>
          </button>

        </div>
      </div>
    </div>
  );
}
