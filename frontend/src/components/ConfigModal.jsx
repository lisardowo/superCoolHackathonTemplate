import React from 'react';
import '../index.css';

export default function ConfigModal({ isOpen, onClose, isSenior, toggleMode }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content talavera-border">
        <div className="modal-header">
          <h2 className="modal-title">Configuración</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="config-option">
            <span>Vincular Tarjeta RUTA</span>
            <button className="btn-secondary">Vincular</button>
          </div>
          
          <div className="config-option">
            <span>Ruta Sana (Evitar baches)</span>
            <input type="checkbox" defaultChecked />
          </div>
          
          <div className="config-option">
            <span>Autenticación Biométrica</span>
            <input type="checkbox" />
          </div>
          
          <div className="config-divider"></div>
          
          <div className="config-option mode-toggle-container">
            <span className="mode-label">Modo Senior (Accesibilidad)</span>
            <label className="switch">
              <input type="checkbox" checked={isSenior} onChange={toggleMode} />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
