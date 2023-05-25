// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const keysToPractice = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

function App() {
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);
  const [timerIntervalId, setTimerIntervalId] = useState(null);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerIntervalId);
    }
  }, [timer]);

  const handleInputChange = (event) => {
    let prevKeysPressed
    const typedKey = event.target.value.slice(-1);
    setInputValue(typedKey);

    if (typedKey === keysToPractice[currentKeyIndex]) {
      setCurrentKeyIndex((prevIndex) => prevIndex + 1);
      setKeysPressed((prevKeysPressed) => prevKeysPressed + 1);
      setAccuracy((prevAccuracy) =>
        Math.round(((prevKeysPressed + 1) / (prevKeysPressed + 1 + 1)) * 100)
      );
    }
  };

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimerIntervalId(intervalId);
  };

  const resetTimer = () => {
    clearInterval(timerIntervalId);
    setTimer(300);
    setTimerIntervalId(null);
  };

  const renderNextKey = () => {
    if (currentKeyIndex < keysToPractice.length) {
      return keysToPractice[currentKeyIndex];
    } else {
      return null;
    }
  };

  return (
    <div className="App">
      <h1>Touch Typing Practice</h1>
      <div className="timer">{timer}s</div>
      <div className="key-display">Next Key: {renderNextKey()}</div>
      <input
        type="text"
        className="typing-box"
        value={inputValue}
        onChange={handleInputChange}
        autoFocus
      />
      <div className="stats">
        <div>Keys Pressed: {keysPressed}</div>
        <div>Accuracy: {accuracy}%</div>
      </div>
      <div className="actions">
        {timerIntervalId === null ? (
          <button onClick={startTimer}>Start</button>
        ) : (
          <button onClick={resetTimer}>Reset</button>
        )}
      </div>
    </div>
  );
}

export default App;
