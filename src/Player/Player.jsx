import React from 'react';
import "../App.css";

const Player = ({ name, score, current, isActive, isWinner, index }) => {
  return (
    <section className={`player ${isActive ? 'player--active' : ''} ${isWinner ? 'player--winner' : ''}`}>
      <h2 className="name" id={`name--${index}`}>{name}</h2>
      <p className="score" id={`score--${index}`}>{score}</p>
      <div className="current">
        <p className="current-label">Current</p>
        <p className="current-score" id={`current--${index}`}>{current || 0}</p>
      </div>
    </section>
  );
};

export default Player;