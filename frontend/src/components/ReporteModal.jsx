import React, { useState } from 'react';
import './PopupFrame.css';
import './ReporteModal.css';

const TIPOS_REPORTE = [
  {
    value: 'reportar_bache',
    label: 'Bache en vía pública',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    value: 'reportar_dispositivo_danado',
    label: 'Dispositivo dañado',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
  },
  {
    value: 'zona_peligrosa',
    label: 'Zona peligrosa',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    value: 'reportar_accidente_vial',
    label: 'Accidente vial',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
];

export default function ReporteModal({ isOpen, onClose, ubicacion = 'Ubicación actual' }) {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [foto, setFoto] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [enviado, setEnviado] = useState(false);

  if (!isOpen) return null;

  const tipoSeleccionado = TIPOS_REPORTE.find((t) => t.value === tipo);

  const handleFoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setFoto(file);
  };

  const handleEnviar = () => {
    if (!titulo.trim() || !tipo) return;
    // TODO: conectar con API real
    setEnviado(true);
    setTimeout(() => {
      setEnviado(false);
      setTitulo('');
      setTipo('');
      setDescripcion('');
      setFoto(null);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content talavera-border rep-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="modal-header">
          <div className="rep-header-inner">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <h2 className="modal-title">Nuevo Reporte</h2>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* ── Ubicación pill ── */}
        <div className="rep-ubicacion-bar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span>{ubicacion}</span>
        </div>

        {/* ── Body ── */}
        <div className="modal-body rep-body">

          {enviado ? (
            <div className="rep-success">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
              <p>¡Reporte enviado!</p>
            </div>
          ) : (
            <>
              {/* Título */}
              <div className="rep-field">
                <label className="rep-label">Título</label>
                <input
                  className="rep-input"
                  type="text"
                  placeholder="Describe brevemente el problema…"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength={80}
                />
              </div>

              {/* Tipo — dropdown */}
              <div className="rep-field">
                <label className="rep-label">Tipo de reporte</label>
                <div className="rep-dropdown-wrap">
                  <button
                    className={`rep-dropdown-trigger ${dropdownOpen ? 'is-open' : ''}`}
                    onClick={() => setDropdownOpen((v) => !v)}
                    type="button"
                  >
                    <span className="rep-dropdown-value">
                      {tipoSeleccionado ? (
                        <>
                          <span className="rep-tipo-icon">{tipoSeleccionado.icon}</span>
                          {tipoSeleccionado.label}
                        </>
                      ) : (
                        <span className="rep-placeholder">Selecciona una categoría…</span>
                      )}
                    </span>
                    <svg className={`rep-chevron ${dropdownOpen ? 'is-up' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <ul className="rep-dropdown-list" role="listbox">
                      {TIPOS_REPORTE.map((t) => (
                        <li
                          key={t.value}
                          className={`rep-dropdown-item ${tipo === t.value ? 'is-selected' : ''}`}
                          role="option"
                          aria-selected={tipo === t.value}
                          onClick={() => { setTipo(t.value); setDropdownOpen(false); }}
                        >
                          <span className="rep-tipo-icon">{t.icon}</span>
                          {t.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <div className="rep-field">
                <label className="rep-label">Descripción</label>
                <textarea
                  className="rep-textarea"
                  placeholder="Más detalles del problema…"
                  rows={3}
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>

              {/* Foto */}
              <div className="rep-field">
                <label className="rep-label">Foto <span className="rep-optional">(opcional)</span></label>
                <label className="rep-foto-zone" htmlFor="rep-foto-input">
                  {foto ? (
                    <span className="rep-foto-name">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      {foto.name}
                    </span>
                  ) : (
                    <>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                      <span>Toca para adjuntar imagen</span>
                    </>
                  )}
                </label>
                <input
                  id="rep-foto-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={handleFoto}
                />
              </div>

              {/* Submit */}
              <button
                className={`rep-submit-btn ${!titulo.trim() || !tipo ? 'is-disabled' : ''}`}
                onClick={handleEnviar}
                disabled={!titulo.trim() || !tipo}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
                Enviar reporte
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
