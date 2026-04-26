import React, { useState } from 'react';
import './index.css';
import JovenMode from './components/JovenMode';
import SeniorMode from './components/SeniorMode';
import ConfigModal from './components/ConfigModal';

export default function App() {
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const toggleMode = () => setIsSeniorMode(!isSeniorMode);

  return (
    <div className="app-root">
      <div className={`smartphone-container ${isSeniorMode ? 'theme-senior' : 'theme-joven'} mode-transition`}>
        
        {isSeniorMode ? (
          <SeniorMode openConfig={() => setIsConfigOpen(true)} />
        ) : (
          <JovenMode openConfig={() => setIsConfigOpen(true)} />
        )}

        <ConfigModal 
          isOpen={isConfigOpen} 
          onClose={() => setIsConfigOpen(false)} 
          isSenior={isSeniorMode} 
          toggleMode={toggleMode} 
        />
        
      </div>
    </div>
  );
}
