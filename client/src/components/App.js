import './App.css';
import Header from './Header.js';
import Modal from './Modal.js';
import GameScreen from './GameScreen.js';
import { useState } from 'react';
import LogIn from './LogIn.js';

function App() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <div className="App">
      <Header 
        showStats={() => {setStatsVisible(true)}} 
        showRules={() => {setRulesVisible(true)}} 
        showSettings={() => {setSettingsVisible(true)}}
      />
      <GameScreen />


      <Modal title='Statistics' show={statsVisible} onClose={() => {setStatsVisible(false)}} ></Modal>
      <Modal title='How to Play' show={rulesVisible} onClose={() => {setRulesVisible(false)}} ></Modal>
      <Modal title='Settings' show={settingsVisible} onClose={() => {setSettingsVisible(false)}} ></Modal>

      <LogIn />
    </div>
  );
}

export default App;
