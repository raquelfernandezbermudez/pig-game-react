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
  const [rollCount, setRollCount] = useState(0); // Contador de tiradas

  const handleHold = () => {
    // Crea una copia del array de puntuaciones para actualizarlo
    const newScore = [...score];
    // Suma la puntuación actual del jugador activo a su puntuación total
    newScore[activePlayer - 1] += current;

    // Actualiza el estado del score
    setScore(newScore);

    // Comprueba si el jugador ha ganado (alcanzó 10 puntos)
    if (newScore[activePlayer - 1] >= 100) {
      setWinner(activePlayer);
      setGameOver(true);
      return; // No cambia de jugador si el juego ha terminado
    }

    // Cambia al otro jugador y resetea la puntuación actual
    setActivePlayer((prevActivePlayer) => (prevActivePlayer === 1 ? 2 : 1));
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
    setRollCount(0); // Reiniciar el contador de tiradas
  };

  // Lanza el dado generando un número aleatorio entre 1 y 6
  const handleRollDice = () => {
    const newDiceNumber = Math.floor(Math.random() * 6) + 1;
    setDiceNumber(newDiceNumber); // Actualiza el estado 'diceNumber' con el nuevo número generado
    setRollCount((prev) => prev + 1); // Incrementa el contador de tiradas cada vez que se lanza el dado
  };

  // Manejar la lógica cuando se lanza el dado
  useEffect(() => {
    //Si el juegador saca uno 1... cambia de jugador
    if (diceNumber === 1) {
      setActivePlayer((activePlayer) => (activePlayer === 1 ? 2 : 1));
      setCurrent(0);
    } else {
      setCurrent((current) => current + diceNumber);
    }
  }, [rollCount]); // Ejecutar el efecto cada vez que cambia rollCount

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
