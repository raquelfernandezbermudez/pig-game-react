import "./App.css";

import { useState, useEffect } from "react";

import Player from "./Player/Player";

function App() {
  const [activePlayer, setActivePlayer] = useState(1);

  const [score, setScore] = useState([0, 0]);

  const [current, setCurrent] = useState(0);

  const [diceNumber, setDiceNumber] = useState(0);

  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleHold = () => {
    // para cambiar el score, se debe definir una nueva variable

    // no modificamos el array, creamos uno nuevo!!!!

    const newScore = [...score];

    // newScore[activaPlayer -1] = newScore[activePlayer -1] + current

    newScore[activePlayer - 1] += current;

    // Comprueba si el jugador ganó (alcanzó 100 puntos)
    if (newScore[activePlayer - 1] >= 10) {
      setScore(newScore);
      setWinner(activePlayer);
      setGameOver(true);
      return; // No cambiar de jugador si el juego ha terminado
    }

    setScore(newScore);
    setActivePlayer(activePlayer === 1 ? 2 : 1);
    setCurrent(0);
  };

  // Actualiza handleNewGame para reiniciar el estado del ganador
  const handleNewGame = () => {
    setActivePlayer(1);
    setScore([0, 0]);
    setCurrent(0);
    setDiceNumber(0);
    setWinner(null);
    setGameOver(false);
  };

  const handleRollDice = () => {
    // const randomNumber = Math.floor(Math.random() * 6) + 1

    // setDiceNumber(randomNumber)

    setDiceNumber(Math.floor(Math.random() * 6) + 1);
  };

  useEffect(() => {
    if (diceNumber === 1) {
      setActivePlayer((activePlayer) => (activePlayer === 1 ? 2 : 1));

      setCurrent(0);
    } else {
      // setCurrent (current + diceNumber)

      setCurrent((current) => current + diceNumber);
    }
  }, [diceNumber]);

  return (
    <main>
      <Player
        name="Player 1"
        score={score[0]}
        current={activePlayer === 1 && current}
        isActive={activePlayer === 1}
        isWinner={winner === 1}
        index={0}
      />

      <Player
        name="Player 2"
        score={score[1]}
        current={activePlayer === 2 && current}
        isActive={activePlayer === 2}
        isWinner={winner === 2}
        index={1}
      />
      {diceNumber && (
        <img
          src={`dice-${diceNumber}.png`}
          alt="Playing dice"
          className="dice"
        />
      )}
      <button className="btn btn--new" onClick={handleNewGame}>
        🔄 New game
      </button>
      <button
        className={`btn btn--roll ${gameOver ? "disabled" : ""}`}
        onClick={handleRollDice}
        disabled={gameOver}
      >
        🎲 Roll dice
      </button>

      <button
        className={`btn btn--hold ${gameOver ? "disabled" : ""}`}
        onClick={handleHold}
        disabled={gameOver}
      >
        📥 Hold
      </button>

      {winner && (
        <div id="winMessage" style={{ display: "block" }}>
          ¡El Jugador {winner} ha ganado!
        </div>
      )}
    </main>
  );
}

export default App;
