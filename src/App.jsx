import "./App.css";

import { useState, useEffect } from "react";

import Player from "./Player/Player";

function App() {
  // Estado para el jugador activo (1 o 2)
  const [activePlayer, setActivePlayer] = useState(1);
  // Estado para las puntuaciones de ambos jugadores
  const [score, setScore] = useState([0, 0]);
  // Estado para la puntuación actual del jugador activo
  const [current, setCurrent] = useState(0);
  // Estado para el número del dado
  const [diceNumber, setDiceNumber] = useState(0);
  // Estado para el ganador del juego
  const [winner, setWinner] = useState(null);
    // Estado para indicar si el juego ha terminado
  const [gameOver, setGameOver] = useState(false);
  // Maneja la lógica cuando un jugador decide "hold" (mantener)
  const handleHold = () => {
    // Crea una copia del array de puntuaciones para actualizarlo
    const newScore = [...score];
    // Suma la puntuación actual del jugador activo a su puntuación total
    newScore[activePlayer - 1] += current;
    // Comprueba si el jugador ha ganado (alcanzó 100 puntos)
    if (newScore[activePlayer - 1] >= 100) {
      setScore(newScore);
      setWinner(activePlayer);
      setGameOver(true);
      return; // No cambia de jugador si el juego ha terminado
    }
    // Cambia al otro jugador y resetea la puntuación actual
    setActivePlayer(activePlayer === 1 ? 2 : 1);
    setCurrent(0);
  };

  // Reinicia el juego
  const handleNewGame = () => {
    setActivePlayer(1);
    setScore([0, 0]);
    setCurrent(0);
    setDiceNumber(0);
    setWinner(null);
    setGameOver(false);
  };

  // Lanza el dado generando un número aleatorio entre 1 y 6
  const handleRollDice = () => {
    setDiceNumber(Math.floor(Math.random() * 6) + 1);
  };

  // anejar la lógica cuando se lanza el dado
  useEffect(() => {
    if (diceNumber === 1) {
      // Si el jugador saca un 1, pierde el turno
      setActivePlayer((activePlayer) => (activePlayer === 1 ? 2 : 1));

      setCurrent(0);
    } else {
      // Si no es 1, se suma el valor del dado a la puntuación actual
      setCurrent((current) => current + diceNumber);
    }
  }, [diceNumber]); // Se ejecuta cada vez que cambia diceNumber

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
