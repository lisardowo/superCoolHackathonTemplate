import React, { useState } from 'react';
import './App.css';
import JovenMode from './components/JovenMode';
import SeniorMode from './components/SeniorMode';
import ConfigModal from './components/ConfigModal';
import ModoSelector from './components/ModoSelector';

export default function App() {
  // null = no eligió todavía → muestra el selector
  const [isSeniorMode,     setIsSeniorMode]     = useState(null);
  const [isConfigOpen,     setIsConfigOpen]     = useState(false);
  const [rutaSana,         setRutaSana]         = useState(false);
  const [tarjetaVinculada, setTarjetaVinculada] = useState(false);

  const handleModoChange = (modo) => {
    setIsSeniorMode(modo === 'senior');
    setIsConfigOpen(false);
  };

  const senior = isSeniorMode === true;

  return (
    <div className="app-root">
      <div className={`smartphone-container ${senior ? 'theme-senior' : 'theme-joven'} mode-transition`}>

        {/* Selector inicial — se muestra hasta que el usuario elige */}
        {isSeniorMode === null && (
          <ModoSelector onSelect={handleModoChange} />
        )}

        {senior ? (
          <SeniorMode openConfig={() => setIsConfigOpen(true)} isConfigActive={isConfigOpen} />
        ) : (
          <JovenMode  openConfig={() => setIsConfigOpen(true)} isConfigActive={isConfigOpen} />
        )}

        <ConfigModal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          rutaSana={rutaSana}
          onRutaSana={setRutaSana}
          modoActual={senior ? 'senior' : 'joven'}
          onModoChange={handleModoChange}
          tarjetaVinculada={tarjetaVinculada}
        />

      </div>
    </div>
  );
}
