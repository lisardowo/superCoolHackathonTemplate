import React from 'react';
import './GlassIcons.css';

const getLabelFallback = (label) => {
  if (!label) return '?';
  return label.slice(0, 1).toUpperCase();
};

export default function GlassIcons({ items = [], className = '', activeIndex = -1, isActive = false, onItemClick }) {
  return (
    <div className={`icon-btns j-glass-nav ${className || ''}`}>
      {items.map((item, index) => {
        const isCurrentTabActive = isActive && index === activeIndex;
        const initial = getLabelFallback(item.label);

        return (
          <button
            key={`${item.label}-${index}`}
            type="button"
            className={`icon-btn ${item.customClass || ''} ${isCurrentTabActive ? 'is-active' : ''}`}
            aria-label={item.label}
            onClick={() => onItemClick?.(index)}
          >
            <span className="icon-btn__back"></span>
            <span className="icon-btn__front">
              <span className="icon-btn__icon" aria-hidden="true">
                {item.icon || <span className="icon-btn__placeholder">{initial}</span>}
              </span>
            </span>
            <span className="icon-btn__label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
