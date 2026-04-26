// utils.jsx - Utilidades compartidas

export const IconConfig = ({ className = "icon", onClick }) => (
  <svg onClick={onClick} className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{cursor: 'pointer'}}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const formatPoints = (points) => `${points.toLocaleString()} pts`;

export const THEME = {
  white: '#FBFBFB',
  cobalt: '#0047AB',
  cyan: '#00BFFF',
  terracotta: '#A52A2A',
  gold: '#FFD700'
};
