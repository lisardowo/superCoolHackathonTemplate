import React from 'react';
import './GlassIcons.css';

const getLabelFallback = (label) => {
  if (!label) return '?';
  return label.slice(0, 1).toUpperCase();
};

export default function GlassIcons({ items = [], className = '', activeIndex = -1, isActive = false, onItemClick }) {
  return (
    <nav className={`glass-nav ${className || ''}`} aria-label="Navegación principal">
      <div className="glass-nav__track">
        {items.map((item, index) => {
          const isCurrentTabActive = isActive && index === activeIndex;
          const isScan = item.customClass === 'is-scan';
          const initial = getLabelFallback(item.label);

          return (
            <button
              key={`${item.label}-${index}`}
              type="button"
              className={[
                'glass-btn',
                isScan           ? 'glass-btn--scan'   : '',
                isCurrentTabActive ? 'glass-btn--active' : '',
              ].filter(Boolean).join(' ')}
              aria-label={item.label}
              aria-current={isCurrentTabActive ? 'page' : undefined}
              onClick={() => onItemClick?.(index)}
            >
              {/* Halo difuso — activo con acento terracota */}
              <span className="glass-btn__halo" aria-hidden="true" />

              {/* Píldora de vidrio */}
              <span className="glass-btn__pill" aria-hidden="true">
                {/* Brillo superior interno */}
                <span className="glass-btn__shine" aria-hidden="true" />

                <span className="glass-btn__icon">
                  {item.icon || <span className="glass-btn__fallback">{initial}</span>}
                </span>
              </span>

              {/* Indicador dot activo */}
              {isCurrentTabActive && !isScan && (
                <span className="glass-btn__dot" aria-hidden="true" />
              )}

              {/* Etiqueta */}
              <span className="glass-btn__label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
