import React, { useState } from 'react';
import './App.css';
import JovenMode from './components/JovenMode';
import SeniorMode from './components/SeniorMode';
import ConfigModal from './components/ConfigModal';

export default function App() {
  const [isSeniorMode,     setIsSeniorMode]     = useState(false);
  const [isConfigOpen,     setIsConfigOpen]     = useState(false);
  const [rutaSana,         setRutaSana]         = useState(false);
  const [tarjetaVinculada, setTarjetaVinculada] = useState(false);

  const handleModoChange = (modo) => {
    setIsSeniorMode(modo === 'senior');
    setIsConfigOpen(false);
  };

  return (
    <div className="app-root">
      <div className={`smartphone-container ${isSeniorMode ? 'theme-senior' : 'theme-joven'} mode-transition`}>

        {isSeniorMode ? (
          <SeniorMode
            openConfig={() => setIsConfigOpen(true)}
            isConfigActive={isConfigOpen}
          />
        ) : (
          <JovenMode
            openConfig={() => setIsConfigOpen(true)}
            isConfigActive={isConfigOpen}
          />
        )}

        {/* ConfigModal vive SOLO aquí — JovenMode y SeniorMode solo llaman openConfig() */}
        <ConfigModal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
          rutaSana={rutaSana}
          onRutaSana={setRutaSana}
          modoActual={isSeniorMode ? 'senior' : 'joven'}
          onModoChange={handleModoChange}
          tarjetaVinculada={tarjetaVinculada}
        />

      </div>
    </div>
  );
}
