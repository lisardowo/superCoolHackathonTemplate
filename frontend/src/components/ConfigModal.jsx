import React, { useState } from 'react';
import './PopupFrame.css';
import './ConfigModal.css';
import NfcLinkModal from './NfcLinkModal';

export default function ConfigModal({
  isOpen,
  onClose,
  rutaSana      = false,
  onRutaSana,
  modoActual    = 'joven',   // 'joven' | 'senior'
  onModoChange,
  tarjetaVinculada = false,
}) {
  const [nfcOpen, setNfcOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div
          className="modal-content talavera-border cfg-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="cfg-header-inner">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
              </svg>
              <h2 className="modal-title">Configuración</h2>
            </div>
            <button className="close-btn" onClick={onClose}>&times;</button>
          </div>

          {/* Body */}
          <div className="modal-body cfg-body">

            {/* ── Tarjeta RUTA ── */}
            <div className="cfg-section">
              <span className="cfg-section-label">Transporte</span>
              <div className="cfg-link-row">
                <div className="cfg-link-info">
                  <div className="cfg-link-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2"/>
                      <path d="M12 18h.01"/>
                    </svg>
                  </div>
                  <div className="cfg-link-texts">
                    <span className="cfg-link-title">Tarjeta RUTA</span>
                    <span className="cfg-link-sub">
                      {tarjetaVinculada ? 'Vinculada · ****4382' : 'Sin vincular'}
                    </span>
                  </div>
                </div>
                <button
                  className={`cfg-link-btn ${tarjetaVinculada ? 'is-linked' : ''}`}
                  onClick={() => setNfcOpen(true)}
                >
                  {tarjetaVinculada ? 'Cambiar' : 'Vincular'}
                </button>
              </div>
            </div>

            {/* ── Preferencias ── */}
            <div className="cfg-section">
              <span className="cfg-section-label">Preferencias</span>
              <div className="cfg-toggle-row">
                <div className="cfg-toggle-info">
                  <span className="cfg-toggle-title">Ruta sana</span>
                  <span className="cfg-toggle-sub">Evitar baches y obstáculos</span>
                </div>
                <label className="cfg-toggle">
                  <input
                    type="checkbox"
                    checked={rutaSana}
                    onChange={(e) => onRutaSana?.(e.target.checked)}
                  />
                  <span className="cfg-toggle-track" />
                </label>
              </div>
            </div>

            {/* ── Modo ── */}
            <div className="cfg-section">
              <span className="cfg-section-label">Modo</span>
              <div className="cfg-mode-seg">
                <button
                  className={`cfg-mode-btn ${modoActual === 'senior' ? 'is-active' : ''}`}
                  onClick={() => onModoChange?.('senior')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4"/><path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
                  </svg>
                  Senior
                </button>
                <button
                  className={`cfg-mode-btn ${modoActual === 'joven' ? 'is-active' : ''}`}
                  onClick={() => onModoChange?.('joven')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  Joven
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <NfcLinkModal isOpen={nfcOpen} onClose={() => setNfcOpen(false)} />
    </>
  );
}
