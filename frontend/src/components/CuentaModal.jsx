import React from 'react';
import './PopupFrame.css';
import './CuentaModal.css';

// ─── Datos de animales autóctonos por nivel ────────────────────────────────
// Cada nivel desbloquea el animal de ese nivel y todos los anteriores.
// El SVG es un placeholder inline; reemplazar con <img src={...} /> cuando existan los assets.
const ANIMALES = [
  { nivel: 1,  nombre: 'Tlacuache',  color: '#888780', svgId: 'tlacuache' },
  { nivel: 2,  nombre: 'Guacamaya',  color: '#D85A30', svgId: 'guacamaya' },
  { nivel: 3,  nombre: 'Axolote',    color: '#1A8A7D', svgId: 'axolote'   },
  { nivel: 4,  nombre: 'Águila',     color: '#854F0B', svgId: 'aguila'    },
  { nivel: 5,  nombre: 'Jaguar',     color: '#BA7517', svgId: 'jaguar'    },
  { nivel: 6,  nombre: 'Quetzal',    color: '#3B6D11', svgId: 'quetzal'   },
  { nivel: 7,  nombre: 'Mariposa',   color: '#533AB7', svgId: 'mariposa'  },
  { nivel: 8,  nombre: 'Lobo gris',  color: '#5F5E5A', svgId: 'lobo'      },
  { nivel: 9,  nombre: 'Ocelote',    color: '#993C1D', svgId: 'ocelote'   },
  { nivel: 10, nombre: 'Xoloitzcuintle', color: '#185FA5', svgId: 'xolo'  },
];

// PFP placeholder SVG del axolote (nivel 3, el default del boceto)
const PFP_AXOLOTE = (
  <svg width="52" height="52" viewBox="0 0 100 80" fill="none">
    <ellipse cx="50" cy="55" rx="28" ry="18" fill="#1A8A7D"/>
    <ellipse cx="50" cy="42" rx="22" ry="16" fill="#22A89A"/>
    <circle cx="38" cy="36" r="5" fill="#0D6B60"/>
    <circle cx="62" cy="36" r="5" fill="#0D6B60"/>
    <circle cx="38" cy="36" r="2.5" fill="white"/>
    <circle cx="62" cy="36" r="2.5" fill="white"/>
    <path d="M38 52 Q50 48 62 52" stroke="#0D6B60" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <rect x="22" y="50" width="6" height="18" rx="3" fill="#1A8A7D" transform="rotate(-20 22 50)"/>
    <rect x="72" y="50" width="6" height="18" rx="3" fill="#1A8A7D" transform="rotate(20 72 50)"/>
    <rect x="30" y="62" width="6" height="14" rx="3" fill="#1A8A7D" transform="rotate(-10 30 62)"/>
    <rect x="64" y="62" width="6" height="14" rx="3" fill="#1A8A7D" transform="rotate(10 64 62)"/>
    <path d="M32 42 Q22 36 18 28" stroke="#22A89A" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M68 42 Q78 36 82 28" stroke="#22A89A" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

// ─── Barra de progreso XP ─────────────────────────────────────────────────
const XP_POR_NIVEL = 3000; // XP necesaria para subir de nivel (simplificado, ajustar según lógica real)

function XpBar({ nivel, xp }) {
  const pct = Math.min(100, Math.round((xp / XP_POR_NIVEL) * 100));
  return (
    <div className="cuenta-xp-wrap">
      <div className="cuenta-xp-header">
        <div className="cuenta-xp-label-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span className="cuenta-section-label">Nivel</span>
        </div>
        <span className="cuenta-xp-value">Nv. {nivel} · {xp.toLocaleString()} XP</span>
      </div>
      <div className="cuenta-bar-track">
        <div className="cuenta-bar-fill cuenta-bar-fill--xp" style={{ width: `${pct}%` }} />
      </div>
      <div className="cuenta-bar-ends">
        <span>{xp.toLocaleString()} XP</span>
        <span>{XP_POR_NIVEL.toLocaleString()} XP → Nv. {nivel + 1}</span>
      </div>
    </div>
  );
}

// ─── Barra de reputación ──────────────────────────────────────────────────
function RepBar({ rep }) {
  const pct = Math.min(100, Math.max(0, rep));
  return (
    <div className="cuenta-rep-wrap">
      <div className="cuenta-xp-header">
        <span className="cuenta-section-label">Reputación ciudadana</span>
        <span className="cuenta-rep-value">{rep}/100</span>
      </div>
      <div className="cuenta-bar-track">
        <div className="cuenta-bar-fill cuenta-bar-fill--rep" style={{ width: `${pct}%` }} />
      </div>
      <div className="cuenta-bar-ends">
        <span>0 · crítica</span>
        <span>100 · ejemplar</span>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function CuentaModal({
  isOpen,
  onClose,
  usuario   = 'ajolote_veloz_42',
  nivel     = 7,
  xp        = 2340,
  creditos  = 148,
  reputacion = 87,
  animalActual = 'Axolote',
}) {
  if (!isOpen) return null;

  const creditosEnPesos = (creditos / 5).toFixed(2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content talavera-border cuenta-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="modal-header">
          <div className="rep-header-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <h2 className="modal-title">Mi Cuenta</h2>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* ── Body ── */}
        <div className="modal-body cuenta-body">

          {/* PFP */}
          <div className="cuenta-pfp-wrap">
            <div className="cuenta-pfp-ring">
              {/* Reemplazar con <img src={pfpAsset} /> cuando existan los assets */}
              {PFP_AXOLOTE}
            </div>
            <button className="cuenta-pfp-edit" aria-label="Cambiar foto de perfil">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
              </svg>
            </button>
          </div>

          {/* ID + animal */}
          <div className="cuenta-id-pill">#{usuario}</div>
          <p className="cuenta-animal-sub">{animalActual} · animal autóctono desbloqueado</p>

          {/* XP bar */}
          <XpBar nivel={nivel} xp={xp} />

          {/* Stats: créditos + reputación */}
          <div className="cuenta-stats-grid">
            <div className="cuenta-stat-card cuenta-stat-card--gold">
              <div className="cuenta-stat-label-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C47F00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 8v4l3 3"/>
                </svg>
                <span className="cuenta-stat-label">Créditos</span>
              </div>
              <span className="cuenta-stat-number cuenta-stat-number--gold">{creditos}</span>
              <span className="cuenta-stat-sub">≈ ${creditosEnPesos} en pasajes</span>
            </div>

            <div className="cuenta-stat-card cuenta-stat-card--teal">
              <div className="cuenta-stat-label-row">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A8A7D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span className="cuenta-stat-label">Reputación</span>
              </div>
              <span className="cuenta-stat-number cuenta-stat-number--teal">{reputacion}</span>
              <span className="cuenta-stat-sub">de 100 puntos</span>
            </div>
          </div>

          {/* Rep bar */}
          <RepBar rep={reputacion} />

          {/* Tasa de cambio */}
          <div className="cuenta-tasa-row">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
            <span className="cuenta-tasa-text">Tasa de cambio: 5 créditos = $1.00 MXN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
