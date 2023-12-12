import './App.css';
import Header from './Header.js';
import Modal from './Modal.js';
import GameScreen from './GameScreen.js';
import Rules from './Rules.js';
import Stats from './Stats.js';
import { useEffect, useState } from 'react';
import LogIn from './LogIn.js';
import Cookies from 'universal-cookie';
import { createContext } from 'react';
import { countryStatesDefault, countriesDist, countryNames, defaultMatrix, possiblePlayPairs } from '../data.js';
import Axios from 'axios';

export const AppContext = createContext();

function generateLevel() {
  const id = Math.floor(Math.random() * possiblePlayPairs.length)
  return { from: possiblePlayPairs[id].from, to: possiblePlayPairs[id].to, guesses: [] }
}

function getCurrentMatrix(countryStates) {
  const matrix = new Map();
  for (var x of defaultMatrix.keys()) {
    matrix.set(x, new Map(defaultMatrix.get(x)));
  }

  for (var k of countryNames.keys()) {
    for (var i of countryNames.keys()) {
      for (var j of countryNames.keys()) {
        const dist1 = matrix.get(i).get(k)
        if (dist1 === undefined) continue;
        const dist2 = matrix.get(k).get(j)
        if (dist2 === undefined) continue;
        const dist = matrix.get(i).get(j);
        const add = (countryStates.get(k) === 'hidden') ? 1 : 0;
        if (dist === undefined || dist > dist1 + dist2 + add) {
          matrix.get(i).set(j, dist1 + dist2 + add);
        }
      }
    }
  }

  return matrix;
}

function getGameState(currentGame, currentMatrix, maxGuesses) {
  if (currentMatrix.get(currentGame.from).get(currentGame.to) === 0) return 1;
  if (currentGame.guesses.length === maxGuesses) return -1;
  return 0;
}

function getCountryStates(currentGame) {
  const countryStates = new Map(countryStatesDefault);
  countryStates.set(currentGame.from, 'from');
  countryStates.set(currentGame.to, 'to');
  for (var i in currentGame.guesses) {
    countryStates.set(currentGame.guesses[i].country, 'guessed');
  }
  return countryStates;
}

function calculateGuessType(country, matrix, currentGame) {
  const dist1 = matrix.get(currentGame.from).get(country)
  if (dist1 === undefined) return 3;
  const dist2 = matrix.get(currentGame.to).get(country)
  const dist = matrix.get(currentGame.from).get(currentGame.to)
  const value = dist1 + dist2 + 1 - dist;
  if (value === 0) return 0;
  if (value <= 2) return 1;
  return 2;
}

function App() {
  const cookies = new Cookies();

  const [statsVisible, setStatsVisible] = useState(false);
  const [rulesVisible, setRulesVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  const [currentGame, setCurrentGame] = useState(cookies.get("currentGame"));

  if (currentGame === undefined) {
    setCurrentGame(generateLevel());
  }

  const [gameData, setGameData] = useState({
    matrix: undefined, 
    gameState: 0, 
    countryStates: new Map(countryStatesDefault),
    maxGuesses: 0
  });

  useEffect(() => {
    cookies.set("currentGame", currentGame);

    const maxGuesses = countriesDist.get(currentGame.from).get(currentGame.to) + 5;
    const countryStates = getCountryStates(currentGame);
    const matrix = getCurrentMatrix(countryStates);
    const gameState = getGameState(currentGame, matrix, maxGuesses);

    if (gameState !== 0) {
      for (var country of countryStates.keys()) {
        if (countryStates.get(country) === 'hidden') {
          countryStates.set(country, 'shown-gray');
        }
      }
    }

    setGameData({ matrix, gameState, countryStates, maxGuesses });
  }, [currentGame]);

  function submitGuess(countryName) {
    if (gameData.gameState !== 0) {
      alert('game is over');
      return false;
    }
    for (var country of countryNames.keys()) {
      if (countryNames.get(country).toLowerCase() === countryName.toLowerCase()) {
        const state = gameData.countryStates.get(country);
        if (state === 'from' || state === 'to') {
          alert('cannot guess start or end countries');
          return false;
        }
        if (state === 'guessed') {
          alert('you already guessed this country');
          return false;
        }
        const new_guesses = [...currentGame.guesses];
        const guess = {country: country, type: calculateGuessType(country, gameData.matrix, currentGame)};
        new_guesses.push({country: country, type: calculateGuessType(country, gameData.matrix, currentGame)});
        if (gameData.matrix.get(currentGame.from).get(currentGame.to) === 1 && guess.type === 0) {
          sendGameResult(gameData.maxGuesses - new_guesses.length + 1);
        } else if (new_guesses.length === gameData.maxGuesses) {
          sendGameResult(0);
        }
        setCurrentGame({ 
          ...currentGame,
          guesses: new_guesses
        });
        return true;
      }
    }
    alert('unknown country name');
    return false;
  }

  function newGame() {
    setCurrentGame(generateLevel());
  }

  function sendGameResult(result) {
    Axios.post("http://localhost:3001/recordGame", { userId: cookies.get('userData').userId, gameResult: result });
  }

  return (
    <div className="App">
      <Header 
        showStats={() => {setStatsVisible(true)}}
        showRules={() => {setRulesVisible(true)}} 
        showSettings={() => {setSettingsVisible(true)}}
      />
      <AppContext.Provider value={{currentGame, gameState: gameData.gameState, countryStates: gameData.countryStates, maxGuesses: gameData.maxGuesses, submitGuess, newGame }}>
        <GameScreen />
      </AppContext.Provider>

      <Modal title='Statistics' show={statsVisible} onClose={() => {setStatsVisible(false)}} ><Stats /></Modal>
      <Modal title='How to Play' show={rulesVisible} onClose={() => {setRulesVisible(false)}} ><Rules /></Modal>
      <Modal title='Settings' show={settingsVisible} onClose={() => {setSettingsVisible(false)}} ></Modal>

      <LogIn />
    </div>
  );
}

export default App;
