import React from 'react';
import './MapMarkers.css';

// Función para generar el HTML del marcador que Mapbox usará
export const createCustomMarker = (type) => {
  const el = document.createElement('div');
  el.className = `custom-marker marker-${type}`;
  
  // Contenido interno según el tipo
  const inner = document.createElement('div');
  inner.className = 'marker-inner';
  
  if (type === 'pila') {
    inner.innerHTML = '⚡';
  } else if (type === 'bache') {
    inner.innerHTML = '⚠️';
  } else {
    // Talavera default
    inner.innerHTML = '●';
  }
  
  el.appendChild(inner);
  return el;
};

// Componente opcional si quieres usarlos fuera del mapa (ej. leyendas)
export const MarkerIcon = ({ type }) => (
  <div className={`custom-marker marker-${type} marker-static`}>
    <div className="marker-inner">
      {type === 'pila' ? '⚡' : type === 'bache' ? '⚠️' : '●'}
    </div>
  </div>
);