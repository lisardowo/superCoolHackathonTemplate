import React, { useState } from 'react';
import './PopupFrame.css';
import './PaymentsModal.css';

// Reemplaza con: import rutaCardImg from '../assets/ruta-card.png';
const RUTA_CARD_PLACEHOLDER = null;

export default function PaymentsModal({ isOpen, onClose, saldo = 8.0, tarjeta = null }) {
  const [showAddOptions, setShowAddOptions] = useState(false);

  if (!isOpen) return null;

  const tieneTargeta = !!tarjeta; // tarjeta = "9999" si tiene, null si no

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content talavera-border pay-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="modal-header">
          <h2 className="modal-title">Mis Tarjetas</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* ── Body ── */}
        <div className="modal-body pay-body">

          {/* 1. Tarjeta RUTA visual */}
          <div className="pay-card-wrap">
            {RUTA_CARD_PLACEHOLDER ? (
              <img
                src={RUTA_CARD_PLACEHOLDER}
                alt="Tarjeta RUTA Puebla"
                className="pay-ruta-img"
              />
            ) : (
              <div className="pay-ruta-placeholder" aria-label="Tarjeta RUTA Puebla">
                <div className="pay-ruta-chip" />
                <div className="pay-ruta-logo-row">
                  <span className="pay-ruta-logo-text">RUTA</span>
                  <span className="pay-ruta-logo-sub">PUEBLA</span>
                </div>
                <div className="pay-ruta-wave" aria-hidden="true">
                  {[0,1,2,3,4].map(i => (
                    <div key={i} className="pay-ruta-wave-line" style={{ '--i': i }} />
                  ))}
                </div>
                <div className="pay-ruta-number">•••• •••• •••• 4291</div>
              </div>
            )}
          </div>

          {/* 2. Saldo */}
          <div className="pay-saldo-row">
            <span className="pay-saldo-label">Saldo disponible</span>
            <span className="pay-saldo-amount">
              ${saldo.toFixed(2)}
            </span>
          </div>

          <div className="pay-divider" />

          {/* 3. Tarjeta de débito vinculada */}
          <div className="pay-debit-row">
            <div className="pay-debit-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/>
                <line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </div>
            <div className="pay-debit-info">
              <span className="pay-debit-label">Tarjeta de débito</span>
              {tieneTargeta ? (
                <span className="pay-debit-number">•••• {tarjeta}</span>
              ) : (
                <span className="pay-debit-none">No vinculada</span>
              )}
            </div>
          </div>

          <div className="pay-divider" />

          {/* 4. Botón circular para vincular / agregar fondos */}
          {!showAddOptions ? (
            <button
              className="pay-add-btn"
              onClick={() => setShowAddOptions(true)}
              aria-label="Agregar fondos o vincular tarjeta"
            >
              <span className="pay-add-plus" aria-hidden="true">+</span>
            </button>
          ) : (
            <div className="pay-add-options">
              <button className="pay-option-btn pay-option-btn--primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                Agregar fondos
              </button>
              <button className="pay-option-btn pay-option-btn--secondary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
                {tieneTargeta ? 'Cambiar tarjeta' : 'Vincular tarjeta'}
              </button>
              <button
                className="pay-option-cancel"
                onClick={() => setShowAddOptions(false)}
              >
                Cancelar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
