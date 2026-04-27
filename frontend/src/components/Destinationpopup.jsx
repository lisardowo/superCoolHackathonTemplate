import React from 'react';
import './DestinationPopup.css';
 
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);
 
const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
  </svg>
);
 
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);
 
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);
 
export default function DestinationPopup({ isOpen, onClose }) {
  if (!isOpen) return null;
 
  return (
    <div className="dest-overlay" onClick={onClose}>
      <div className="dest-modal" onClick={(e) => e.stopPropagation()}>
 
        {/* Botón cerrar */}
        <button className="dest-close-btn" onClick={onClose} aria-label="Cerrar">
          <CloseIcon />
        </button>
 
        <h2 className="dest-title">¿A dónde quiere ir?</h2>
 
        <div className="dest-btn-list">
 
          <button className="dest-btn dest-btn-place">
            <PinIcon />
            <span>Explanada</span>
          </button>
 
          <button className="dest-btn dest-btn-place">
            <PinIcon />
            <span>Terminal 4</span>
          </button>
 
          <button className="dest-btn dest-btn-home">
            <HomeIcon />
            <span>Casa</span>
          </button>
 
          <button className="dest-btn dest-btn-search">
            <SearchIcon />
            <span>Buscar otro lugar</span>
          </button>
 
        </div>
      </div>
    </div>
  );
}
 
