import React, { useState } from 'react';
import './PopupFrame.css';
import './MisionesModal.css';

// ─── Tipos de misión ──────────────────────────────────────────────────────────
const TIPO_META = {
  confirmar_reporte:   { label: 'Confirmar reporte', cls: 'mis-badge--confirm' },
  cambiar_bateria:     { label: 'Cambiar batería',   cls: 'mis-badge--bateria' },
  mover_dispositivo:   { label: 'Mover dispositivo', cls: 'mis-badge--mover'   },
  ayudar_usuario:      { label: 'Ayudar usuario',    cls: 'mis-badge--ayuda'   },
};

// ─── Misiones de demo ─────────────────────────────────────────────────────────
const MISIONES_DEMO = [
  {
    id: 'M001',
    tipo: 'confirmar_reporte',
    titulo: 'Bache reportado en Blvd. 5 de Mayo',
    descripcion: 'Un usuario reportó un bache grande. Ve al lugar y confirma si el reporte es verídico.',
    usuarioActivo: null,
    xp: 30,
    creditos: 10,
    coords: { lat: 19.0413, lng: -98.2062 },
    lugar: 'Blvd. Héroes del 5 de Mayo',
    simulable: true,
  },
  {
    id: 'M002',
    tipo: 'cambiar_bateria',
    titulo: 'Scooter #SC-047 — Zócalo',
    descripcion: 'Batería al 8%. Recoge la batería de recambio en el hub más cercano y sustitúyela.',
    usuarioActivo: 'veloz_tlacuache',
    xp: 60,
    creditos: 25,
    coords: { lat: 19.0435, lng: -98.1981 },
    lugar: 'Zócalo de Puebla',
    simulable: false,
  },
  {
    id: 'M003',
    tipo: 'mover_dispositivo',
    titulo: 'Bici #BC-012 fuera de zona',
    descripcion: 'La bicicleta quedó en zona sin cobertura. Muévela al hub de Analco (200m aprox).',
    usuarioActivo: null,
    xp: 45,
    creditos: 18,
    coords: { lat: 19.0392, lng: -98.1934 },
    lugar: 'Barrio de Analco',
    simulable: false,
  },
  {
    id: 'M004',
    tipo: 'ayudar_usuario',
    titulo: 'Adulto mayor necesita asistencia',
    descripcion: 'Usuario senior solicita ayuda para usar un scooter por primera vez cerca de Av. Juárez.',
    usuarioActivo: null,
    xp: 80,
    creditos: 5,
    coords: { lat: 19.0448, lng: -98.1972 },
    lugar: 'Av. Juárez 340',
    simulable: false,
  },
];

// ─── Ícono de navegación ──────────────────────────────────────────────────────
const IconRuta = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

// ─── Tarjeta de misión ────────────────────────────────────────────────────────
function MisionCard({ mision, onCompletar, completada }) {
  const meta = TIPO_META[mision.tipo];

  const handleTrazarRuta = () => {
    // TODO: conectar con MapContainer para trazar ruta a mision.coords
    console.log('Trazar ruta a', mision.coords, mision.lugar);
  };

  return (
    <div className={`mis-card ${completada ? 'is-completada' : ''}`}>
      <div className="mis-card-top">
        <span className={`mis-badge ${meta.cls}`}>{meta.label}</span>
        <button className="mis-ruta-btn" onClick={handleTrazarRuta} aria-label="Trazar ruta">
          <IconRuta />
          Trazar ruta
        </button>
      </div>

      <p className="mis-title">{mision.titulo}</p>
      <p className="mis-desc">{mision.descripcion}</p>

      <div className="mis-footer">
        <div className="mis-user-row">
          <div className={`mis-dot ${mision.usuarioActivo ? 'mis-dot--active' : 'mis-dot--free'}`} />
          <span className="mis-user-label">
            {mision.usuarioActivo ? `${mision.usuarioActivo} en camino` : 'Sin asignar'}
          </span>
        </div>
        <div className="mis-rewards">
          <span className="mis-xp">+{mision.xp} XP</span>
          <span className="mis-cr">+{mision.creditos} cr</span>
        </div>
      </div>

      {mision.simulable && !completada && (
        <button className="mis-btn-complete" onClick={() => onCompletar(mision)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Simular misión completada
        </button>
      )}

      {completada && (
        <div className="mis-completada-badge">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Completada
        </div>
      )}
    </div>
  );
}

// ─── Overlay de recompensa ────────────────────────────────────────────────────
function RewardOverlay({ mision, onAceptar }) {
  if (!mision) return null;
  return (
    <div className="mis-reward-overlay" onClick={onAceptar}>
      <div className="mis-reward-card" onClick={(e) => e.stopPropagation()}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#0047AB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
        <p className="mis-reward-title">¡Misión completada!</p>
        <p className="mis-reward-sub">Reporte verificado con éxito</p>
        <div className="mis-reward-chips">
          <span className="mis-reward-chip mis-reward-chip--xp">+{mision.xp} XP</span>
          <span className="mis-reward-chip mis-reward-chip--cr">+{mision.creditos} créditos</span>
        </div>
        <button className="mis-reward-accept" onClick={onAceptar}>Aceptar</button>
      </div>
    </div>
  );
}

// ─── Modal principal ──────────────────────────────────────────────────────────
export default function MisionesModal({ isOpen, onClose, onRecompensa }) {
  const [completadas, setCompletadas] = useState(new Set());
  const [rewardMision, setRewardMision] = useState(null);

  if (!isOpen) return null;

  const handleCompletar = (mision) => {
    setRewardMision(mision);
  };

  const handleAceptarReward = () => {
    if (rewardMision) {
      setCompletadas((prev) => new Set([...prev, rewardMision.id]));
      // Notificar al padre para actualizar XP / créditos del usuario
      onRecompensa?.({ xp: rewardMision.xp, creditos: rewardMision.creditos });
      setRewardMision(null);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content talavera-border mis-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="modal-header">
          <div className="mis-header-inner">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
              <line x1="4" y1="22" x2="4" y2="15"/>
            </svg>
            <h2 className="modal-title">Misiones</h2>
          </div>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* ── Lista ── */}
        <div className="modal-body mis-body">
          {MISIONES_DEMO.map((m) => (
            <MisionCard
              key={m.id}
              mision={m}
              onCompletar={handleCompletar}
              completada={completadas.has(m.id)}
            />
          ))}
        </div>
      </div>

      {/* ── Overlay de recompensa ── */}
      {rewardMision && (
        <RewardOverlay mision={rewardMision} onAceptar={handleAceptarReward} />
      )}
    </div>
  );
}
