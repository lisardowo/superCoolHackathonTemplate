import React from 'react';
import './PopupFrame.css';
import './NfcLinkModal.css';

export default function NfcLinkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content talavera-border nfc-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2"/>
              <path d="M4 7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2"/>
              <rect x="7" y="5" width="10" height="14" rx="2"/>
            </svg>
            <h2 className="modal-title">Vincular tarjeta</h2>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body nfc-body">
          <div className="nfc-icon-wrap">
            <div className="nfc-pulse-ring" />
            <div className="nfc-pulse-ring" />
            {/* NFC symbol */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2"/>
              <path d="M8.5 8.5C7.57 9.43 7 10.65 7 12s.57 2.57 1.5 3.5"/>
              <path d="M15.5 8.5c.93.93 1.5 2.15 1.5 3.5s-.57 2.57-1.5 3.5"/>
              <circle cx="12" cy="12" r="1.5" fill="#0047AB"/>
            </svg>
          </div>

          <p className="nfc-instruction">Acerca tu credencial RUTA</p>
          <p className="nfc-sub">Al sensor NFC del dispositivo</p>
          <button className="nfc-cancel-btn" onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
