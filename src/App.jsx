import React, { useState, useEffect } from "react";
import "./App.css";

const colors = ["red", "blue", "green", "yellow"];

function App() {
  const [gameSequence, setGameSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false); // Animation lock

  // Add random color to the game sequence
  const addRandomColor = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setGameSequence((prev) => [...prev, randomColor]);
    console.log("Game Sequence Updated:", [...gameSequence, randomColor]); // Logging sequence updates
  };

  // Handle user click
  const handleColorClick = (color) => {
    if (!isPlayerTurn || isAnimating) return; // Prevent clicks during animation

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    console.log("Player Sequence:", newPlayerSequence);

    // Validate the player's current input
    if (color !== gameSequence[newPlayerSequence.length - 1]) {
      alert("Game Over! Sequence Mismatch.");
      resetGame();
      return;
    }

    // If the player finishes the sequence correctly
    if (newPlayerSequence.length === gameSequence.length) {
      setScore(score + 1);
      setPlayerSequence([]);
      setCurrentIndex(0);
      setIsPlayerTurn(false);

      // Add new color after a delay
      setTimeout(() => {
        addRandomColor();
      }, 1000);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Start the game
  const startGame = () => {
    resetGame();
    addRandomColor();
  };

  // Play the game sequence
  useEffect(() => {
    if (gameSequence.length > 0 && !isPlayerTurn) {
      setIsAnimating(true);
      let index = 0;

      const interval = setInterval(() => {
        if (index < gameSequence.length) {
          highlightColor(gameSequence[index]);
          index++;
        } else {
          clearInterval(interval);
          setIsAnimating(false); // Animation finished
          setIsPlayerTurn(true); // Allow player to click
        }
      }, 1000);
    }
  }, [gameSequence]);

  // Highlight the given color
  const highlightColor = (color) => {
    const element = document.getElementById(color);
    if (element) {
      element.classList.add("active");
      setTimeout(() => {
        element.classList.remove("active");
      }, 500);
    }
  };

  // Reset the game
  const resetGame = () => {
    setGameSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setCurrentIndex(0);
    setIsPlayerTurn(false);
    setIsAnimating(false);
  };

  return (
    <div className="App">
      <h1>Simon Game</h1>
      <p>Score: {score}</p>
      <div className="game-board">
        {colors.map((color) => (
          <div
            key={color}
            id={color}
            className={`color-button ${color}`}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
      <button className="start-game-button " onClick={startGame}>Start Game</button>
    </div>
  );
}

export default App;
